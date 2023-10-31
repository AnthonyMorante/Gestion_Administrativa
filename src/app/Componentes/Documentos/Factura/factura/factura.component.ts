
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
  @ViewChild('frmEmisor', { static: true }) frmEmisor: ElementRef = {} as ElementRef;
  @ViewChild('frmDetalleFormaPagos', { static: true }) frmDetalleFormaPagos: ElementRef = {} as ElementRef;
  @ViewChild('frmInformacionAdicional', { static: true }) frmInformacionAdicional: ElementRef = {} as ElementRef;
  modal: any;
  idCliente: string = "";
  identificacion: any;
  fechaRegistro: Date = new Date();
  //Combos
  @ViewChild('idProducto', { static: true }) idProducto: NgSelectComponent = {} as NgSelectComponent;
  listaTipoIdentificaciones: any = [];
  listaProductos: any = [];
  listaDetalleFactura: any = [];
  listaDetallePagos: any = [];
  listaAdicionales: any = [];
  listaTiposDocumentos: any = [];
  listaEstablecimientos: any = [];
  listaPuntosEmisiones: any = [];
  listaFormaPagos: any = [];
  listaTiempoFormaPagos: any = [];
  establecimiento: string = "001";
  puntoEmision: string = "001";
  secuencial: number = 0;
  listaPreciosProductos: any = [];
  nuevoCliente: boolean = false;
  productoSeleccionado: boolean = false;
  valorIva: string = "";
  identifiacion: string = "";
  factura: any = {
    subtotal12: 0,
    subtotal0: 0,
    subtotal: 0,
    iva12: 0,
    totalFactura: 0,
    totDescuento: 0
  }
  formaPagoDefault: boolean = true;
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
    this.comboFormaPagos();
    this.comboTiempoFormaPagos();
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

  async comboFormaPagos() {
    try {
      const url = `${this.baseUrl}Facturas/formaPagos`;
      this.listaFormaPagos = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }
  async comboTiempoFormaPagos() {
    try {
      const url = `${this.baseUrl}Facturas/tiempoFormaPagos`;
      this.listaTiempoFormaPagos = (await this.axios.get(url)).data;
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
      const columns = "idFactura,secuencial,cliente,telefonoCliente,emailCliente,claveAcceso,fechaEmision,fechaAutorizacion,estadoSri";
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
    this.identifiacion = "";
    this.nuevoCliente = false;
    this.idProducto.handleClearClick();
    this.listaDetalleFactura = [];
    this.listaDetallePagos = [];
    this.listaAdicionales = [];
    this.formaPagoDefault = true;
    this.factura = {
      subtotal12: 0,
      subtotal0: 0,
      subtotal: 0,
      iva12: 0,
      totalFactura: 0,
      totDescuento: 0
    }
    js.limpiarForm(this.frmProducto.nativeElement, 100);
    js.limpiarForm(this.frmEmisor.nativeElement, 100);
    js.limpiarForm(this.frmDetalleFormaPagos.nativeElement, 100);
    js.limpiarForm(this.frmInformacionAdicional.nativeElement, 100);
    setTimeout(() => this.handleSecuencial(), 200);
    this.calcularTotales();

  }

  async handleSecuencial(): Promise<void> {
    try {
      const url = `${this.baseUrl}Facturas/secuenciales`;
      const secuenciales = (await this.axios.get(url)).data;
      this.secuencial = secuenciales.find((x: any) => x.idTipoDocumento == this.el.nativeElement.querySelector("#idTipoDocumento").value).nombre;
    } catch (e) {
      js.handleError(e);
    }
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

  handleProducto(idProducto: any): void {
    js.limpiarValidadores(this.frmCliente.nativeElement);
    let cantidad = this.el.nativeElement.querySelector("#cantidad");
    let precio = this.el.nativeElement.querySelector("#precio");
    let iva = this.el.nativeElement.querySelector("#iva");
    const totalProducto = this.el.nativeElement.querySelector("#totalProducto");
    cantidad.value = "";
    precio.value = "";
    totalProducto.value = "";
    iva.value = "";
    this.productoSeleccionado = !!idProducto
    if (!idProducto) return;
    const producto = this.listaProductos.find((x: any) => x.idProducto == idProducto);
    this.valorIva = producto.nombreIva;
    this.el.nativeElement.querySelector("#precio").value = !!producto ? producto.precio.toString().replace(".", ",") : "";

  }

  async buscarCliente(identificacion: any, limpiar?: boolean | false): Promise<void> {
    try {
      if (identificacion == "") return;
      if (limpiar && (this.identifiacion != identificacion) && !this.nuevoCliente) {
        js.limpiarForm(this.frmCliente.nativeElement);
        this.idCliente = "";
        this.identifiacion = "";
        return;
      }
      this.idCliente = "";
      this.identifiacion = "";
      const url = `${this.baseUrl}Facturas/buscarCliente/${identificacion.value}`;
      const res = (await this.axios.get(url)).data;
      if (!res) {
        this.nuevoCliente = true;
        return;
      }
      this.nuevoCliente = false;
      this.idCliente = res.idCliente;
      this.identifiacion = res.identificacion;
      js.cargarFormulario(this.frmCliente.nativeElement, res);
    } catch (e) {
      js.handleError(e);
    }
  }

  handleTotalAgregar(): void {
    let cantidad = this.el.nativeElement.querySelector("#cantidad");
    let precio = this.el.nativeElement.querySelector("#precio");
    const totalProducto = this.el.nativeElement.querySelector("#totalProducto");
    let iva = this.el.nativeElement.querySelector("#iva");
    const producto = this.listaProductos.find((x: any) => x.idProducto == this.idProducto.selectedValues[0]);
    totalProducto.value = "0";
    iva.value = "0";
    if (!cantidad.value || !precio.value) return;
    cantidad = parseFloat(cantidad.value.replaceAll(",", "."));
    precio = parseFloat(precio.value.replaceAll(",", "."));
    const valorIva = (precio * cantidad) * producto.iva;
    iva.value = valorIva.toFixed(2).replaceAll(".", ",");
    totalProducto.value = ((cantidad * precio) + valorIva).toFixed(2).replaceAll(".", ",");
    js.validarTodo(this.frmProducto.nativeElement);
  }

  async agregar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmProducto.nativeElement)) throw new Error("Verifique los campos requeridos");
      const cantidad = this.el.nativeElement.querySelector("#cantidad");
      const precio = this.el.nativeElement.querySelector("#precio");
      const totalProducto = this.el.nativeElement.querySelector("#totalProducto");
      const iva = this.el.nativeElement.querySelector("#iva");
      const producto = this.listaProductos.find((x: any) => x.idProducto == this.idProducto.selectedValues[0]);
      let descuento = 0;
      const valorTotal = parseFloat(totalProducto.value.replaceAll(",", "."));
      const valorCantidad = parseFloat(cantidad.value);
      const valorIva = parseFloat(iva.value.replaceAll(",", "."));
      const subtotal = valorTotal - valorIva;
      const precioSugerido = (producto.precio * valorCantidad) + ((producto.precio * valorCantidad) * producto.iva);
      if (valorTotal < precioSugerido) descuento = precioSugerido - valorTotal;
      this.listaDetalleFactura.push({
        cantidad: valorCantidad,
        descuento,
        subtotal: subtotal,
        valorPorcentaje: producto.iva,
        nombreIva: producto.nombreIva,
        idIva: producto.idIva,
        precio: parseFloat(precio.value.replaceAll(",", ".")),
        porcentaje: valorIva,
        total: valorTotal,
        idProducto: producto.idProducto,
        idDetallePrecioProducto: producto.idProducto,
        codigo: producto.codigo,
        producto: producto.nombre
      });
      this.idProducto.handleClearClick();
      js.limpiarForm(this.frmProducto.nativeElement, 10);
      this.valorIva = "";
      setTimeout(() => js.activarValidadores(this.el.nativeElement.querySelector("#frmDetalleFactura")), 100);
      this.calcularTotales();
    } catch (e) {
      js.handleError(e);
    }
  }
  precios(idProducto: any): any {
    return this.listaPreciosProductos.filter((x: any) => x.idProducto == idProducto);
  }

  handleRow(index: number, factor?: number | undefined): void {
    let detalle = this.listaDetalleFactura[index];
    const row = this.el.nativeElement.querySelector("#frmDetalleFactura").querySelectorAll("tr")[index];
    let precioActual = this.listaPreciosProductos.find((x: any) => x.idDetallePrecioProducto == row.querySelector("select").value);
    const descuento = row.querySelector("[data-ref='descuento']").querySelector("input");
    let valorDescuento = parseFloat(descuento.value.replaceAll(',', '.'));
    const precio = row.querySelector("[data-ref='precio']").querySelector("input");
    let valorPrecio = parseFloat(precio.value.replaceAll(",", "."));
    const cantidad = row.querySelector("[data-ref='cantidad']").querySelector("input");
    detalle.cantidad = parseInt(cantidad.value);
    if (valorDescuento > (precioActual.precio * detalle.cantidad)) {
      detalle.descuento = precioActual.precio;
      js.toastWarning("El valor del descuento no puede ser mayor al valor del subtotal");
    }
    detalle.precio = precioActual.precio;
    switch (factor) {
      case 0: {
        detalle.precio = precioActual.precio;
        detalle.descuento = 0;
        break;
      }
      case 1: {
        detalle.descuento = valorDescuento;
        detalle.precio = detalle.precio - (detalle.descuento / detalle.cantidad);
        break;
      } default: {
        detalle.precio = valorPrecio;
        if (valorPrecio < precioActual.precio) {
          detalle.descuento = (precioActual.precio - detalle.precio) * detalle.cantidad;
        } else {
          detalle.descuento = 0;
        }
      }
    }
    detalle.subtotal = detalle.precio * detalle.cantidad;
    detalle.nombreIva = precioActual.nombreIva;
    detalle.idIva = precioActual.idIva;
    detalle.porcentaje = detalle.subtotal > 0 ? detalle.subtotal * precioActual.iva : 0;
    detalle.total = (detalle.subtotal + detalle.porcentaje);
    detalle.idDetallePrecioProducto = precioActual.idDetallePrecioProducto;
    this.listaDetalleFactura[index] = detalle;
    this.calcularTotales();
  }

  calcularTotales(): void {
    try {
      this.factura.subtotal = this.listaDetalleFactura.map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0);
      this.factura.subtotal12 = this.listaDetalleFactura.filter((x: any) => x.valorPorcentaje > 0).map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0);
      this.factura.subtotal0 = this.listaDetalleFactura.filter((x: any) => x.valorPorcentaje == 0).map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0);
      this.factura.iva12 = this.listaDetalleFactura.map((x: any) => { return x.porcentaje }).reduce((pre: number, value: number) => pre + value, 0);
      this.factura.totDescuento = this.listaDetalleFactura.map((x: any) => { return x.descuento }).reduce((pre: number, value: number) => pre + value, 0);
      this.factura.totalFactura = this.listaDetalleFactura.map((x: any) => { return x.total }).reduce((pre: number, value: number) => pre + value, 0);
    } catch (e) {
      js.handleError(e);
    }
  }

  handleDefaultFormaPago(defaultFormaPago: any): void {
    this.formaPagoDefault = defaultFormaPago.checked;
  }
  agregarPago(): void {

  }
  agregarAdicional(): void {

  }
}


