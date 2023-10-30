
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { global } from 'src/main';
import { AxiosService } from 'src/app/Services/axios.service';
import { DataTableDirective } from 'angular-datatables';
import { js } from '../../../../../main';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = `${global.BASE_API_URL}api/`;
  componentTitle: string = "";
  //Datatable
  lista: any = [];
  @ViewChild(DataTableDirective) dtElement: DataTableDirective = {} as DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();
  //Modal
  @ViewChild('modalDatos', { static: true }) modalDatos: ElementRef = {} as ElementRef;
  @ViewChild('frmCliente', { static: true }) frmCliente: ElementRef = {} as ElementRef;
  @ViewChild('frmProducto', { static: true }) frmProducto: ElementRef = {} as ElementRef;
  modal: any;
  tituloModal: string = "Nueva Factura";
  idCliente: string = "";
  identificacion: any;
  fechaRegistro: Date = new Date();
  //Combos
  @ViewChild('idProducto', { static: true }) idProducto: NgSelectComponent = {} as NgSelectComponent;
  listaTipoIdentificaciones: any = [];
  listaProductos: any = [];
  listaDetalleFactura: any = [];
  listaTiposDocumentos: any = [];
  listaEstablecimientos: any = [];
  listaPuntosEmisiones: any = [];
  establecimiento: string = "001";
  puntoEmision: string = "001";
  listaPreciosProductos:any=[];
  constructor(private axios: AxiosService, private el: ElementRef) { }

  ngOnInit() {
    this.identificacion = document.querySelector("#identificacion");
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    js.activarValidadores(this.frmCliente.nativeElement);
    js.activarValidadores(this.frmProducto.nativeElement);
    this.listarFacturas();
    this.comboTipoIdentificaciones();
    this.comboTiposDocumentos();
    this.comboEstablecimientos();
    this.comboPuntosEmisiones();
    this.comboProductos();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async comboTiposDocumentos() {
    try {
      const url = `${this.baseUrl}Facturas/tiposDocumentos`;
      this.listaTiposDocumentos = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }
  async comboEstablecimientos() {
    try {
      const url = `${this.baseUrl}Facturas/establecimientos`;
      this.listaEstablecimientos = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboPuntosEmisiones() {
    try {
      const url = `${this.baseUrl}Facturas/puntosEmisiones`;
      this.listaPuntosEmisiones = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboProductos() {
    try {
      let url = `${this.baseUrl}Facturas/listaProductos`;
      this.listaProductos = (await this.axios.get(url)).data;
      url = `${this.baseUrl}Facturas/listaPreciosProductos`;
      this.listaPreciosProductos = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }


  async listarFacturas() {
    try {
      const url = `${this.baseUrl}Facturas/listar`;
      const columns = "idFactura,secuencial,cliente,telefonoCliente,emailCliente,claveAcceso,fechaEmsion,fechaAutorizacion,estadoSri";
      //DataTables
      this.dtOptions = {
        destroy: true,
        serverSide: true,
        pageLength: 10,
        pagingType: 'full_numbers',
        language: js.dataTableEs(),
        ajax: async (_data: any, resolve) => {
          try {
            this.lista = [];
            const res = (await this.axios.postJson(url, _data)).data;
            this.lista = res.data;
            (res.data.length == 0 && !!_data.search.value) ? this.mensajeDataTable = js.notFoundDataTable() : (res.data.length == 0 && !_data.search.value) ? this.mensajeDataTable = js.notDataDataTable() : this.mensajeDataTable = js.loaderDataTable();
            resolve({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: [],
            });
          } catch (e) {
            js.handleError(e);
          }
        },
        columns: columns.split(",").map((x: string) => { return { data: x } }),
        columnDefs: [{ targets: [0], searchable: false, orderable: false }],
        order: [[1, "desc"]]
      };
      //DataTables
    } catch (e) {
      js.handleError(e);
    }
  }
  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => dtInstance.ajax.reload());
  }
  async comboTipoIdentificaciones(): Promise<void> {
    try {
      const url = `${this.baseUrl}TipoIdentificaciones/listar`;
      this.listaTipoIdentificaciones = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }
  nuevo() {

    this.idCliente = "";
    // js.limpiarForm(this.frmDatos.nativeElement, 100);
  }
  handleDocumento(idTipoIdentificacion: any): void {
    const tipo = this.listaTipoIdentificaciones.find((x: any) => x.idTipoIdentificacion == idTipoIdentificacion.value)?.codigo;
    if (tipo == 5) {
      this.identificacion.setAttribute("data-validate", "cedula");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarCedula(this.identificacion);
    } else if (tipo == 4) {
      this.identificacion.setAttribute("data-validate", "ruc");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarRuc(this.identificacion);
    } else {
      this.identificacion.removeAttribute("data-validate");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarVacio(this.identificacion);
    }
  }



  async guardar(): Promise<void> {
    try {
      // if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      // js.loaderShow();
      // const url = `${this.baseUrl}Facturas/${!this.idCliente ? "insertar" : "actualizar"}`;
      // const data = new FormData(this.frmDatos.nativeElement);
      // if (!!this.idCliente) data.append("idCliente", this.idCliente);
      // data.append("idProvincia", this.idProvincia.selectedValues[0]);
      // data.append("idCiudad", this.idCiudad.selectedValues[0]);
      // if (!this.idCliente) await this.axios.postFormJson(url, data);
      // else await this.axios.putFormJson(url, data);
      // js.toastSuccess(`Registro ${!this.idCliente ? "guardado" : "editado"} exitosamente`);
      this.modal.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async xml(claveAcceso: string): Promise<void> {
    try {
      const url = `${this.baseUrl}Facturas/xml/${claveAcceso}`;
      const res = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async pdf(claveAcceso: string): Promise<void> {
    try {
      const url = `${this.baseUrl}Facturas/pdf/${claveAcceso}`;
      const res = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }

  }

  getDate(date: string) {
    return js.getDate(date);
  }
  getHour(date: string) {
    return js.getHour(date);
  }
  getColor(estado: number) {
    return `background-color:${global.estados[estado]}`
  }
  handleNumeroFactura(): void {
    const establecimiento = this.el.nativeElement.querySelector("#idEstablecimiento").value;
    const puntoEmision = this.el.nativeElement.querySelector("#idPuntoEmision").value;
    this.establecimiento = (this.listaEstablecimientos.find((x: any) => x.idEstablecimiento == establecimiento).nombre).toString().padStart(3, '0');
    this.puntoEmision = (this.listaPuntosEmisiones.find((x: any) => x.idPuntoEmision == puntoEmision).nombre).toString().padStart(3, '0');
  }

  handleProducto(idProducto:any):void{
    js.limpiarValidadores(this.frmCliente.nativeElement);
    const producto=this.listaProductos.find((x:any)=>x.idProducto==idProducto);
    this.el.nativeElement.querySelector("#precio").value=!!producto?producto.precio.toString().replace(".",","):"";
  }

  async buscarCliente(identificacion:any):Promise<void>{
    try {
      this.idCliente="";
      const url=`${this.baseUrl}Facturas/buscarCliente/${identificacion.value}`;
      const res=(await this.axios.get(url)).data;
      js.limpiarForm(this.frmCliente.nativeElement);
      if(!res){

        return;
      }
      js.llenarFormulario(this.frmCliente.nativeElement,res);
    } catch (e) {
      js.handleError(e);
    }
  }

  handleTotalAgregar(){

  }
}


