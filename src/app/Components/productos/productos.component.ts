import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { js,global } from '../../app.config';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit, AfterViewInit, OnDestroy {
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
  @ViewChild('frmDatos', { static: true }) frmDatos: ElementRef = {} as ElementRef;
  @ViewChild('frmDetalle', { static: true }) frmDetalle: ElementRef = {} as ElementRef;
  @ViewChild('totalIva', { static: true }) totalIva: ElementRef = {} as ElementRef;
  modal: any;
  tituloModal: string = "Nuevo registro";
  idProducto: string = "";
  detallePrecios: any = [];
  identificacion: any;
  fechaRegistro: Date = new Date();
  //Combos
  listaIvas: any = [];
  listaPrecios:any=[];
  constructor(private axios: AxiosService, private el: ElementRef) { }

  public async ngOnInit():Promise<void> {
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    this.listarProductos();
    js.activarValidadores(this.frmDatos.nativeElement);
    js.activarValidadores(this.frmDetalle.nativeElement);
    await this.comboIvas();
  }
  public ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async listarPrecios():Promise<void>{
    try {
      const url=`${this.baseUrl}Productos/listarPrecios`;
      this.listaPrecios=(await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  getPreciosProducto(_idProducto:any){
    return this.listaPrecios.filter((x:any)=>x.idProducto==_idProducto);
  }
  async listarProductos() {
    try {
      this.listarPrecios();
      const url = `${this.baseUrl}Productos/listar`;
      const columns = `idProducto,activo,activoProducto,codigo,nombre,cantidad,precio`;
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
        columnDefs: [{ targets: [0,1,2], searchable: false, orderable: false },
        { targets: [], visible: false }],
        order: [[4,"ASC"]]
      };
      //DataTables
    } catch (e) {
      js.handleError(e);
    }
  }
  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => dtInstance.ajax.reload());
  }
  async comboIvas(): Promise<void> {
    try {
      const url = `${this.baseUrl}Ivas/listar`;
      this.listaIvas = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }


  nuevo() {
    this.tituloModal = "Nuevo registro";
    this.idProducto = "";
    js.limpiarForm(this.frmDatos.nativeElement, 100);
    this.detallePrecios = [];
    js.limpiarForm(this.frmDetalle.nativeElement, 100);
  }

  async editar(idProducto: string): Promise<void> {
    try {
      js.limpiarForm(this.frmDetalle.nativeElement);
      js.limpiarForm(this.frmDatos.nativeElement);
      this.tituloModal = "Editar registro"
      this.idProducto = "";
      const url = `${this.baseUrl}Productos/cargar/${idProducto}`;
      const res = (await this.axios.get(url)).data;
      this.detallePrecios = res.detallePrecios;
      js.cargarFormulario(this.frmDatos.nativeElement, res.producto);
      this.idProducto = res.producto.idProducto;
      this.modal.show();
    } catch (e) {
      js.handleError(e);
    }
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      if (this.detallePrecios.length == 0) throw new Error("Debe agregar al menos 1 precio de venta para poder guardar el producto");
      js.loaderShow();
      const url = `${this.baseUrl}Productos/guardar`;
      let data: any = await this.axios.formToJsonTypes(this.frmDatos.nativeElement);
      if (!!this.idProducto) data.idProducto = this.idProducto;
      data.DetallePrecioProductos = [...this.detallePrecios].map((x: any) => {
        if (!!this.idProducto) x.idProducto = this.idProducto;
        delete x.idDetallePrecioProducto;
        return x;
      });
      await this.axios.postJson(url, data);
      js.toastSuccess(`Registro ${!this.idProducto ? "guardado" : "editado"} exitosamente`);
      this.modal.hide();
      this.reloadDataTable();
      this.listarPrecios();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }


  async visualizar(idProducto: string, input: any): Promise<void> {
    try {
      const url = `${this.baseUrl}Productos/visualizar/${idProducto}`;
      await this.axios.get(url);
      js.toastSuccess(`Producto ${input.checked ? 'visible' : 'oculto'} con éxito.`)
    } catch (e) {
      js.handleError(e);
      input.checked = !input.checked;
    }
  }

  async activar(idProducto: string, input: any): Promise<void> {
    try {
      const url = `${this.baseUrl}Productos/activar/${idProducto}`;
      await this.axios.get(url);
      js.toastSuccess(`Producto ${input.checked ? 'activado' : 'desactivado'} con éxito.`)
    } catch (e) {
      js.handleError(e);
      input.checked = !input.checked;
    }
  }

  async eliminar(idProducto: string): Promise<void> {
    try {
      if (!await js.toastPreguntar(`
      <h3><i class='bi-exclamation-triangle-fill text-warning'></i></h3>
      <p class='fs-md'>¿Está seguro que desea eliminar este Producto?</p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-circle-fill me-2'>
      </i>Esta acción no se puede deshacer ni revertir.</p>
      `, "Si, Eliminar")) return;
      const url = `${this.baseUrl}Productos/eliminar/${idProducto}`;
      await this.axios.delete(url);
      js.toastSuccess("Producto eliminado exitosamente");
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }
  }

  async eliminarPrecio(precio: any): Promise<void> {
    try {
      if (!await js.toastPreguntar(`
      <h3><i class='bi-exclamation-triangle-fill text-warning'></i></h3>
      <p class='fs-md'>¿Está seguro que desea eliminar este precio?</p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-circle-fill me-2'>
      </i>Esta acción no se puede deshacer ni revertir.</p>
      `, "Si, Eliminar")) return;
      const url = `${this.baseUrl}Productos/eliminarPrecio/${precio.idDetallePrecioProducto}`;
      if (!precio.idDetallePrecioProducto.startsWith("_")) await this.axios.delete(url);
      this.detallePrecios.splice(this.detallePrecios.indexOf(precio), 1);
      js.toastSuccess("Producto eliminado exitosamente");
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }
  }

  handleIva() {
    try {
      const totalIva = this.el.nativeElement.querySelector("#totalIva");
      const precio = this.el.nativeElement.querySelector("#precio");
      const idIva = this.el.nativeElement.querySelector("#idIva");
      if (!!precio.value) {
        const iva = this.listaIvas.find((x: any) => x.idIva == idIva.value)?.valor;
        const valorPrecio = parseFloat(precio.value.replaceAll(",", "."));
        const valorIva = valorPrecio * parseFloat(iva);
        totalIva.value = (valorPrecio + valorIva).toFixed(2).replaceAll(".", ",");
        this.detallePrecios = [...this.detallePrecios].map((x: any) => {

          const iva = this.listaIvas.find((x: any) => x.idIva == idIva.value)?.valor;
          const valorPrecio = parseFloat(totalIva.value.replaceAll(",", "."));
          const valorPorcentaje = (valorPrecio * parseFloat(x.porcentaje.toFixed(2))) / 100;
          const valorPvp=valorPorcentaje+valorPrecio;
          x.total = parseFloat(((valorPvp-valorPrecio)/(1+iva)).toFixed(2).replaceAll(",","."));
          x.totalIva=parseFloat((parseFloat(valorPvp.toFixed(2).replaceAll(",","."))-((valorPvp-valorPrecio)/(1+iva))).toFixed(2));
          return x;
        });
      } else {
        totalIva.value = "0";
      }
      totalIva.classList.remove("is-invalid");
    } catch (e) {
      js.handleError(e);
    }
  }

  handleIvaGanancia() {
    try {
      const totalIva = this.el.nativeElement.querySelector("#totalIva");
      const porcentaje = this.el.nativeElement.querySelector("#porcentaje");
      const totalIvaD = this.el.nativeElement.querySelector("#totalIvaD");
      const total = this.el.nativeElement.querySelector("#total");
      // const precio = this.el.nativeElement.querySelector("#precio");
      const idIva = this.el.nativeElement.querySelector("#idIva");
      // const total = this.el.nativeElement.querySelector("#total");
      if (!!totalIva.value && !!porcentaje.value) {
        const iva = this.listaIvas.find((x: any) => x.idIva == idIva.value)?.valor;
        const valorPrecio = parseFloat(totalIva.value.replaceAll(",", "."));
        const valorPorcentaje = (valorPrecio * parseFloat(parseFloat(porcentaje.value.replaceAll(",", ".")).toFixed(2))) / 100;
        const valorPvp=valorPorcentaje+valorPrecio;
        total.value = ((valorPvp-valorPrecio)/(1+iva)).toFixed(2).replaceAll(".",",");
        totalIvaD.value=valorPvp.toFixed(2).replaceAll(".",",");
        // const iva = this.listaIvas.find((x: any) => x.idIva == idIva.value)?.valor;
        // const valorIva = parseFloat(precio.value.replaceAll(",", ".")) * iva;
        //
        // totalIva.value = (valorPrecio + valorPorcentaje).toFixed(2).replaceAll(".", ",");

      } else {
        totalIvaD.value = "0";
      }
      js.limpiarValidadores(this.frmDetalle.nativeElement);
    } catch (e) {
      js.handleError(e);
    }
  }
  handlePorcentajePorPrecio() {
    try {
      // const totalIva = this.el.nativeElement.querySelector("#totalIva");
      // const precioSinIva=this.el.nativeElement.querySelector("#precio");
      // const precio = this.el.nativeElement.querySelector("#totalIvaD");
      // const porcentaje = this.el.nativeElement.querySelector("#porcentaje");
      //const idIva = this.el.nativeElement.querySelector("#idIva");
      // const total = this.el.nativeElement.querySelector("#total");
      const totalIva = this.el.nativeElement.querySelector("#totalIva");
      const porcentaje = this.el.nativeElement.querySelector("#porcentaje");
      const totalIvaD = this.el.nativeElement.querySelector("#totalIvaD");
      const total = this.el.nativeElement.querySelector("#total");
      const idIva = this.el.nativeElement.querySelector("#idIva");
      if (!!totalIvaD.value) {
        const iva = this.listaIvas.find((x: any) => x.idIva == idIva.value)?.valor;
        const valorPvp = parseFloat(totalIvaD.value.replaceAll(",","."));
        const valorPrecio = parseFloat(totalIva.value.replaceAll(",","."));
        const porcentajeValor=((valorPvp/valorPrecio)*100)-100;
        porcentaje.value=porcentajeValor.toFixed(2).replaceAll(".",",");
        total.value=((valorPvp-valorPrecio)/(1+iva)).toFixed(2).replaceAll(".",",");
      } else {
        porcentaje.value = "0";
      }
      js.limpiarValidadores(this.frmDetalle.nativeElement);
    } catch (e) {
      js.handleError(e);
    }
  }

  async agregarPrecio(): Promise<void> {
    try {
      if (!this.totalIva.nativeElement.value) throw new Error("Primero debe generar un precio para el producto.");
      if (!await js.validarTodo(this.frmDetalle.nativeElement)) throw new Error("Verifique los campos requeridos");
      if(this.detallePrecios.length==3) throw new Error("Sólo se permiten 3 precios");
      let obj: any = await this.axios.formToJsonTypes(this.frmDetalle.nativeElement);
      let idIva=js.document.querySelector("#idIva").value;
      const iva = this.listaIvas.find((x: any) => x.idIva == idIva);
      let totalIva = parseFloat(obj.totalIvaD) - parseFloat(obj.total);
      this.detallePrecios.push({
        idDetallePrecioProducto: `_${(new Date()).getTime()}`,
        totalIva: totalIva,
        porcentaje: obj.porcentaje,
        total: obj.total,
        activo: true,
        idIva: iva.idIva
      });
      js.limpiarForm(this.frmDetalle.nativeElement);
    } catch (e) {
      js.handleError(e);
    }
  }

  getIva(idIva: string): any {
    return this.listaIvas.find((x: any) => x.idIva == idIva);
  }

}
