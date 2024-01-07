import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { global, js } from '../../app.config';
import { AxiosService } from '../../Services/axios.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-facturas-proveedores',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './facturas-proveedores.component.html',
  styleUrl: './facturas-proveedores.component.css',
})
export class FacturasProveedoresComponent
  implements OnInit, AfterViewInit, OnDestroy {
  lista: any = [];
  modal: any;
  @ViewChild('frmInformacionAdicional', { static: true }) frmInformacionAdicional: ElementRef = {} as ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective =
    {} as DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();
  public factura: any;
  public productosProveedores: any = [];
  public productos: any = [];
  public formasPagos: any = [];
  public idFactura: number = 0;
  private baseUrl: string = `${global.BASE_API_URL}api/FacturasProveedores/`;

  //retenciones
  _js: any = js;
  baseUrlRetencion = `${global.BASE_API_URL}api/`;
  componentTitle: string = '';
  @ViewChild('modalRetenciones', { static: true })
  modalRetenciones: ElementRef = {} as ElementRef;
  modalRetencion: any;
  tipoDocumento: string = 'RETENCIÓN';
  establecimiento: string = '001';
  puntoEmision: string = '001';
  secuencial: number = 0;
  listaEstablecimientos: any = [];
  listaPuntosEmisiones: any = [];
  listaTiempoFormaPagos: any = [];
  listaUnaRetencion: any = [];
  listaPorcentajeImpuestos: any = [];
  listaTipoIdentificaciones:any=[];
  listaAdicionales:any=[];
  formaPagoDefault: boolean = true;
  listaFormaPagos: any = [];
  retenciones: any = {
    subtotal12: 0,
    subtotal0: 0,
    subtotal: 0,
    iva12: 0,
    totalFactura: 0,
    totDescuento: 0,
  };
  listaRetencionesRenta: any = [];

  constructor(
    private _axios: AxiosService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }
  ngOnInit() {
    js.activarValidadores(this.frmInformacionAdicional.nativeElement);
    this.frmInformacionAdicional.nativeElement.addEventListener("submit", (e: any) => {e.preventDefault();});
    this.modal = new js.bootstrap.Modal(js.modalDatos, {
      keyboard: false,
      backdrop: 'static',
    });
    this.listarFacturas();
    //retenciones
    this.modalRetencion = new js.bootstrap.Modal(
      this.modalRetenciones.nativeElement,
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    this.el.nativeElement.querySelector('#docSustento').value = 'FACTURA';
    this.el.nativeElement.querySelector('#docSustento').disabled = true;
    this.comboEstablecimientos();
    this.comboPuntosEmisiones();
    this.comboFormaPagos();
    this.comboTiempoFormaPagos();
    this.comboPorcentajeImpuestos();
    this.comboTipoIdentificaciones();

    setTimeout(() => {
      this.el.nativeElement.querySelector('#fechaEmision').value =
        js.todayDate();
      this.handleSecuencial();
    }, 200);
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  handleDefaultFormaPago(defaultFormaPago: any): void {
    this.formaPagoDefault = defaultFormaPago.checked;
    this.el.nativeElement.querySelector('#valor').value =
      this.retenciones.totalFactura.toFixed(2).replaceAll('.', ',');
  }


  async agregarAdicional(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmInformacionAdicional.nativeElement)) throw new Error("Verifique los campos requeridos");
      const adicional: any = await this._axios.formToJsonTypes(this.frmInformacionAdicional.nativeElement);
      this.listaAdicionales.push({
        nombre: adicional.nombreAdicional,
        valor: adicional.valorAdicional
      });
      js.limpiarForm(this.frmInformacionAdicional.nativeElement);
    } catch (e) {
      js.handleError(e);
    }
  }
  


  async handleSecuencial(): Promise<void> {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/secuenciales`;
      const secuenciales = (await this._axios.get(url)).data;
      this.secuencial = secuenciales[0]?.nombre;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboFormaPagos() {
    try {
      const url = `${this.baseUrlRetencion}Facturas/formaPagos`;
      this.listaFormaPagos = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboTiempoFormaPagos() {
    try {
      const url = `${this.baseUrlRetencion}Facturas/tiempoFormaPagos`;
      this.listaTiempoFormaPagos = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboEstablecimientos() {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/establecimientos`;
      this.listaEstablecimientos = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboPuntosEmisiones() {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/puntosEmisiones`;
      this.listaPuntosEmisiones = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboPorcentajeImpuestos() {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/porcentajeImpuestosRetenciones`;
      this.listaPorcentajeImpuestos = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }


  async comboTipoIdentificaciones() {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/listarTipoIdentificaciones`;
      this.listaTipoIdentificaciones = (await this._axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  




  handleNumeroFactura(): void {
    const establecimiento =
      this.el.nativeElement.querySelector('#idEstablecimiento').value;
    const puntoEmision =
      this.el.nativeElement.querySelector('#idPuntoEmision').value;
    this.establecimiento = this.listaEstablecimientos
      .find((x: any) => x.idEstablecimiento == establecimiento)
      .nombre.toString()
      .padStart(3, '0');
    this.puntoEmision = this.listaPuntosEmisiones
      .find((x: any) => x.idPuntoEmision == puntoEmision)
      .nombre.toString()
      .padStart(3, '0');
  }

  async limpiarRetencion() {

    this.retenciones.subtotal12 = 0;
    this.retenciones.subtotal0 = 0;
    this.retenciones.subtotal = 0;
    this.retenciones.iva12 = 0;
    this.retenciones.totalFactura = 0;
    this.retenciones.totDescuento = 0;
    this.listaRetencionesRenta = 0;
    this.el.nativeElement.querySelector('#nComprobante').value = "";
    this.el.nativeElement.querySelector('#claveAcceso').value = "";
    this.el.nativeElement.querySelector('#base').value = "";
    this.el.nativeElement.querySelector('#bBaseImponible').value = "";

  }



  async agregarImpuestoRenta() {
    try {

      const currentTimestamp = new Date().getTime();
      const idPorcentajeImpuestoRetencion = this.el.nativeElement.querySelector('#porcentajeImpuestoRetencion').value;
      const base = this.el.nativeElement.querySelector('#base');
      const nComprobante = this.el.nativeElement.querySelector('#nComprobante');
      let objImpuestoRetencion = this.listaPorcentajeImpuestos.find((x: any) => x.idPorcentajeImpuestoRetencion == idPorcentajeImpuestoRetencion);
      objImpuestoRetencion.porcentajeRetener=objImpuestoRetencion.valor;
      objImpuestoRetencion.codigoRetencion=objImpuestoRetencion.codigo;
      objImpuestoRetencion.numDocSustento=nComprobante.value;
      objImpuestoRetencion.valorRetenido = parseFloat(((parseFloat(base.value) * objImpuestoRetencion.valor) / 100).toFixed(2));
      objImpuestoRetencion.baseImponible = parseFloat(parseFloat(base.value).toFixed(2));
      objImpuestoRetencion.id = currentTimestamp;
      this.listaRetencionesRenta.push(objImpuestoRetencion);
      base.value = "";

    } catch (e) {
      js.handleError(e);
    }

  }

  async eliminarImpuestoRenta(id: any) {
    try {

      const index = this.listaRetencionesRenta.findIndex((x: any) => x.id === id);
      const obj = this.listaRetencionesRenta.find((x: any) => x.id === id);
      const base = this.el.nativeElement.querySelector('#base');
      base.value = obj.baseImponible;
      if (index !== -1) this.listaRetencionesRenta.splice(index, 1);

    } catch (e) {
      js.handleError(e);
    }

  }


  async cargaRetencion(autorizacion: number, idFactura: string) {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/unDato?claveAcceso=${autorizacion}&idFactura=${idFactura}`;
      const nComprobante = this.el.nativeElement.querySelector('#nComprobante');
      const claveAcceso = this.el.nativeElement.querySelector('#claveAcceso');
      const base = this.el.nativeElement.querySelector('#base');
      const bBaseImponible = this.el.nativeElement.querySelector('#bBaseImponible');
      const fechaEmisionC = this.el.nativeElement.querySelector('#fechaEmisionC');
      const tipoDocumentoC = this.el.nativeElement.querySelector('#tipoDocumentoC');
      const identificacionC = this.el.nativeElement.querySelector('#identificacionC');
      this.listaUnaRetencion = (await this._axios.get(url)).data;
      const totales = this.listaUnaRetencion.res;
      const subtotales = this.listaUnaRetencion.subtotales;
      nComprobante.value = `${totales.estab}${totales.ptoEmi}${totales.secuencial}`;
      claveAcceso.value = totales.claveAcceso;
      fechaEmisionC.value=totales.fechaEmision.split("T")[0];
      tipoDocumentoC.value=parseFloat(totales.tipoIdentificacionComprador);
      identificacionC.value= totales.identificacionComprador;
      base.value = totales.totalSinImpuesto;
      bBaseImponible.value = totales.valor;
      this.retenciones.totalFactura = totales.importeTotal;
      this.retenciones.iva12 = totales.valor;

      if (subtotales.length != 0)
        subtotales.map((x: any) => {

          if (x.codigo == "2") this.retenciones.subtotal12 = x.sumatoria;
          if (x.codigo == "0") this.retenciones.subtotal0 = x.sumatoria;

        });



    } catch (e) {
      js.handleError(e);
    }
  }

  async listarFacturas() {
    try {
      const url = `${this.baseUrl}listar`;
      const columns =
        'idFactura,fechaRegistro,fechaEmision,claveAcceso,nombreComercial,razonSocial,importeTotal';
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
            const res = (await this._axios.postJson(url, _data)).data;
            this.lista = res.data;
            res.data.length == 0 && !!_data.search.value
              ? (this.mensajeDataTable = js.notFoundDataTable())
              : res.data.length == 0 && !_data.search.value
                ? (this.mensajeDataTable = js.notDataDataTable())
                : (this.mensajeDataTable = js.loaderDataTable());
            resolve({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: [],
            });
          } catch (e) {
            js.handleError(e);
          }
        },
        columns: columns.split(',').map((x: string) => {
          return { data: x };
        }),
        columnDefs: [{ targets: [0], searchable: false, orderable: false }],
        order: [[1, 'desc']],
      };
      //DataTables
    } catch (e) {
      js.handleError(e);
    }
  }
  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) =>
      dtInstance.ajax.reload()
    );
  }
  nuevo() {
    js.modalDatosLabel.innerText = 'NUEVA FACTURA DE PROVEEDOR';
    js.limpiarForm(js.frmXml);
    this.factura = null;
    this.productos = [];
    this.productosProveedores = [];
    this.formasPagos = [];
    this.idFactura = 0;
    js.activarValidadores(js.frmXml);
  }



  public async handleXml(): Promise<void> {
    try {
      this.factura = null;
      this.productos = [];
      this.productosProveedores = [];
      this.formasPagos = [];
      if (!js.fileXml.files[0]) {
        return;
      }
      js.loaderShow();
      let url = `${this.baseUrl}leerXml`;
      let data = new FormData(js.frmXml);
      const res = (await this._axios.postForm(url, data)).data;
      this.factura = res.factura;
      this.productosProveedores = res.productosProveedores.filter((x: any) =>
        this.factura.sriDetallesFacturas
          .map((x: any) => x.codigoPrincipal)
          .includes(x.codigoPrincipal)
      );
      this.productos = res.productos;
      this.formasPagos = res.formasPagos;
      this.factura.sriPagos = this.factura.sriPagos.map((x: any) => {
        x.formaPagoTexto = this.formasPagos.find(
          (f: any) => x.formaPago == f.codigo
        ).formaPago;
        return x;
      });
      setTimeout(() => {
        js.tbodyDetalle.querySelectorAll('select').forEach((item: any) => {
          js.select2(item.id, js.modalDatos);
        });
        js.activarValidadores(js.tbodyDetalle);
      }, 100);
    } catch (e) {
      js.handleError(e);
    } finally {
      setTimeout(() => {
        js.loaderHide();
      }, 100);
    }
  }

  public async ver(idFactura: number): Promise<void> {
    try {
      this.factura = null;
      this.productos = [];
      this.productosProveedores = [];
      this.formasPagos = [];
      js.loaderShow();
      let url = `${this.baseUrl}unDato/${idFactura}`;
      const res = (await this._axios.get(url)).data;
      this.idFactura = idFactura;
      this.factura = res.factura;
      js.modalDatosLabel.innerHTML = `FACTURA N°</b>${this.factura.estab}-${this.factura.ptoEmi}-${this.factura.secuencial}`;
      this.productosProveedores = res.productosProveedores;
      this.productos = res.productos;
      this.formasPagos = res.formasPagos;
      this.factura.sriPagos = [...this.factura.sriPagos].map((x: any) => {
        x.formaPagoTexto = this.formasPagos.find(
          (f: any) => x.formaPago == f.codigo
        )?.formaPago;
        return x;
      });
      setTimeout(() => {
        js.tbodyDetalle.querySelectorAll('select').forEach((item: any) => {
          js.select2(item.id, js.modalDatos);
        });
        js.activarValidadores(js.tbodyDetalle);
        this.modal.show();
      }, 100);
    } catch (e) {
      js.handleError(e);
    } finally {
      setTimeout(() => {
        js.loaderHide();
      }, 100);
    }
  }

  handleReferenciaInterna(codigoPrincipal: any, selectId: any) {
    const idProducto = js.tbodyDetalle.querySelector(`#s2_${selectId}_select`);
    this.productosProveedores[selectId] = {
      idProducto: idProducto.value,
      codigoPrincipal,
      identificacion: this.factura.ruc,
    };
  }

  selectedItem(codigoPrincipal: any, idProducto: any): boolean {
    return !!this.productosProveedores.find(
      (x: any) =>
        x?.codigoPrincipal == codigoPrincipal && x?.idProducto == idProducto
    );
  }

  subTotal0(): string {
    return this.factura.sriDetallesFacturas
      .map((x: any) => {
        return x.sriDetallesFacturasImpuestos[0];
      })
      .filter((x: any) => x?.codigo == 0)
      .reduce((total: number, item: any) => {
        return total + item.baseImponible;
      }, 0)
      .toFixed(2);
  }
  subTotal12(): string {
    return this.factura.sriTotalesConImpuestos
      .filter((x: any) => x.codigo == 2)
      .reduce((total: number, item: any) => {
        return total + item.baseImponible;
      }, 0)
      .toFixed(2);
  }
  iva12(): string {
    return this.factura.sriTotalesConImpuestos
      .filter((x: any) => x.codigo == 2)
      .reduce((total: number, item: any) => {
        return total + item.valor;
      }, 0)
      .toFixed(2);
  }

  async guardar(): Promise<void> {
    try {
      if (!(await js.validarTodo(js.tbodyDetalle)))
        throw new Error(
          'Verifique que todos los productos tengan una referencia interna'
        );
      if (
        !(await js.toastPreguntar(`<p class='mt-2 fs-md'>¿Está seguro que desea guardar está factura?
      </br>El stock de productos se aumentará acorde a las referencias internas seleccionadas<p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-triangle-fill me-1'></i>Está acción no se puede deshacer.</p>`))
      )
        return;
      const url = `${this.baseUrl}guardar`;
      const json = {
        factura: this.factura,
        listaProductos: this.productosProveedores,
      };
      await this._axios.postJson(url, json);
      this.modal.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }
  }




  async guardarRetencion() {
    try {


      let fechaEmision= this.el.nativeElement.querySelector("#fechaEmision").value;
      let nComprobante= this.el.nativeElement.querySelector("#nComprobante").value;
      const fechaEmisionC = this.el.nativeElement.querySelector('#fechaEmisionC').value;
      const tipoDocumentoC = this.el.nativeElement.querySelector('#tipoDocumentoC').value;
      const identificacionC = this.el.nativeElement.querySelector('#identificacionC').value;
      const claveAcceso = this.el.nativeElement.querySelector('#claveAcceso').value;

      if (
        !(await js.toastPreguntar(`<p class='mt-2 fs-md'>¿Está seguro que desea guardar está retención?
      </br>
      <p class='fs-sm text-danger'><i class='bi-exclamation-triangle-fill me-1'></i>Está acción no se puede deshacer.</p>`))
      )
        return;

      this.retenciones.fechaEmision=fechaEmision;
      this.retenciones.establecimiento=this.establecimiento;
      this.retenciones.puntoEmision=this.puntoEmision;
      this.retenciones.secuencial= this.secuencial.toString();
      this.retenciones.impuestos= this.listaRetencionesRenta;
      this.retenciones.fechaEmisionDocSustento= fechaEmisionC;
      this.retenciones.fechaEmisionDocSustento= fechaEmision;
      this.retenciones.numAutDocSustento= claveAcceso;
      this.retenciones.identificacionSujetoRetenido= identificacionC;
      this.retenciones.tipoDocumentoSujetoRetenido= tipoDocumentoC;      
      this.retenciones.numDocSustento=nComprobante;
      this.retenciones.infoAdicional= this.listaAdicionales;
      console.log(this.retenciones);
      const url = `${this.baseUrlRetencion}Retenciones/insertar`;
      await this._axios.postJson(url, this.retenciones);

    } catch (e) {
      js.handleError(e);
    }
  }
}
