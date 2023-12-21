import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { js, global } from '../../app.config';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, DataTablesModule, NgSelectModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit, AfterViewInit, OnDestroy {
  _js: any = js;
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
  @ViewChild('modalCambios', { static: true }) modalCambios: ElementRef = {} as ElementRef;
  modal: any;
  modalC: any;
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
  tipoDocumento: string = "FACTURA";
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
  valorRecibido:number=0;
  saldo:number=0;
  cambio:number=0;
  formaPagoDefault: boolean = true;
  working: boolean = false;
  interval = setInterval(() => { this.verificarEstados() }, 10000);
  constructor(private axios: AxiosService, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.identificacion = document.querySelector("#identificacion");
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    this.modalC = new js.bootstrap.Modal(this.modalCambios.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    js.activarValidadores(this.frmCliente.nativeElement);
    js.activarValidadores(this.frmProducto.nativeElement);
    js.activarValidadores(this.frmDetalleFormaPagos.nativeElement);
    js.activarValidadores(this.frmInformacionAdicional.nativeElement);
    this.frmProducto.nativeElement.addEventListener("submit", (e: any) => {
      e.preventDefault();
    });
    this.frmInformacionAdicional.nativeElement.addEventListener("submit", (e: any) => {
      e.preventDefault();
    });
    this.frmDetalleFormaPagos.nativeElement.addEventListener("submit", (e: any) => {
      e.preventDefault();
    });
    this.listarFacturas();
    this.comboTipoIdentificaciones();
    this.comboTiposDocumentos();
    this.comboEstablecimientos();
    this.comboPuntosEmisiones();
    this.comboProductos();
    this.comboFormaPagos();
    this.comboTiempoFormaPagos();
    this.verificarEstados();
  }

  async verificarEstados(): Promise<void> {
    try {
      if (this.working == true || this.lista.filter((x: any) => x.idTipoEstadoSri != 2).length == 0) return;
      const url = `${this.baseUrl}Facturas/verificarEstados`
      this.working = true;
      const res = (await this.axios.get(url)).data;
      if (res == "empty") return;
      this.reloadDataTable();
    } catch (e) {
      console.warn(e);
    } finally {
      this.working = false;
    }
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
    js.limpiarForm(this.frmCliente.nativeElement, 100);
    js.limpiarForm(this.frmEmisor.nativeElement, 100);
    js.limpiarForm(this.frmDetalleFormaPagos.nativeElement, 100);
    js.limpiarForm(this.frmInformacionAdicional.nativeElement, 100);
    js.identificacion.value="";
    js.idTipoIdenticacion.classList.remove("readonly");
    setTimeout(() => {
      this.el.nativeElement.querySelector("#fechaEmision").value = js.todayDate();
      this.handleSecuencial()
    }, 200);
    this.calcularTotales();
    this.comboProductos();
  }

  async handleSecuencial(): Promise<void> {
    try {
      const url = `${this.baseUrl}Facturas/secuenciales`;
      const secuenciales = (await this.axios.get(url)).data;
      const idTipoDocumento = this.el.nativeElement.querySelector("#idTipoDocumento");
      this.tipoDocumento = idTipoDocumento.options[idTipoDocumento.selectedIndex].text;
      this.secuencial = secuenciales.find((x: any) => x.idTipoDocumento == idTipoDocumento.value)?.nombre;
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
  async xml(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}facturas/descargarXml/${claveAcceso}`;
      const res = (await this.axios.getFile(url)).data;
      const blob = new Blob([res], { type: 'application/xml' });
      const urlFile = URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = urlFile;
      a.download = `${claveAcceso}.xml`;
      a.click();
      window.URL.revokeObjectURL(urlFile);
      a.remove();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async pdf(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}facturas/descargarPdf/${claveAcceso}`;
      const res = (await this.axios.getFile(url)).data;
      const blob = new Blob([res], { type: 'application/pdf' });
      const urlFile = URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = urlFile;
      a.download = `${claveAcceso}.pdf`;
      a.click();
      window.URL.revokeObjectURL(urlFile);
      a.remove();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }
  async reenviar(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}Facturas/reenviar/${claveAcceso}`;
      await this.axios.get(url);
      this.listarFacturas();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
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
      if (identificacion.value == "") return;
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
      js.idTipoIdenticacion.classList.add("readonly");
      this.nuevoCliente = false;
      this.idCliente = res.idCliente;
      this.identifiacion = res.identificacion;
      js.cargarFormulario(this.frmCliente.nativeElement, res);
      js.idTipoIdenticacion.value = res.idTipoIdentificacion;
    } catch (e) {
      js.handleError(e);
    }
  }

  handleTotalAgregar(): void {
    try {
      let cantidad = this.el.nativeElement.querySelector("#cantidad");
      let precio = this.el.nativeElement.querySelector("#precio");
      const totalProducto = this.el.nativeElement.querySelector("#totalProducto");
      let iva = this.el.nativeElement.querySelector("#iva");
      const producto = this.listaProductos.find((x: any) => x.idProducto == this.idProducto.selectedValues[0]);
      totalProducto.value = "0";
      iva.value = "0";
      if (!cantidad.value || !precio.value) return;
      if (producto.cantidad < parseFloat(cantidad.value.replaceAll(",", "."))) {
        js.toastWarning(`El producto sólo dispone de <b>${producto.cantidad}</b> unidades en stock`);
        cantidad.value = producto.cantidad.toString().replaceAll(".", ",");
      }
      cantidad = parseFloat(cantidad.value.replaceAll(",", "."));
      precio = parseFloat(precio.value.replaceAll(",", "."));
      const valorIva = (precio * cantidad) * producto.iva;
      iva.value = valorIva.toFixed(2).replaceAll(".", ",");
      totalProducto.value = ((cantidad * precio) + valorIva).toFixed(2).replaceAll(".", ",");
      js.validarTodo(this.frmProducto.nativeElement);
    } catch (e) {
      js.handleError(e);
    }

  }

  async agregar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmProducto.nativeElement)) throw new Error("Verifique los campos requeridos");
      const cantidad = this.el.nativeElement.querySelector("#cantidad");
      const precio = this.el.nativeElement.querySelector("#precio");
      const totalProducto = this.el.nativeElement.querySelector("#totalProducto");
      const iva = this.el.nativeElement.querySelector("#iva");
      const producto = this.listaProductos.find((x: any) => x.idProducto == this.idProducto.selectedValues[0]);
      if (this.listaDetalleFactura.find((x: any) => x.idProducto == producto.idProducto)) {
        js.toastInfo("El producto ya existe en factura puede editar la cantidad en la lista");
        return;
      }
      let descuento = 0;
      const valorTotal = parseFloat(totalProducto.value.replaceAll(",", "."));
      const valorCantidad = parseFloat(cantidad.value);
      const valorIva = parseFloat(iva.value.replaceAll(",", "."));
      const subtotal = valorTotal - valorIva;
      const precioSugerido = (producto.precio * valorCantidad) + ((producto.precio * valorCantidad) * producto.iva);
      if (valorTotal < precioSugerido) descuento = precioSugerido - valorTotal;
      this.listaDetalleFactura.push({
        cantidad: valorCantidad,
        descuento: parseFloat(descuento.toFixed(2)),
        subtotal: parseFloat(subtotal.toFixed(2)),
        valorPorcentaje: producto.iva,
        nombreIva: producto.nombreIva,
        idIva: producto.idIva,
        precio: parseFloat(parseFloat(precio.value.replaceAll(",", ".")).toFixed(2)),
        porcentaje: parseFloat(valorIva.toFixed(2)),
        total: parseFloat(valorTotal.toFixed(2)),
        idProducto: producto.idProducto,
        idDetallePrecioProducto: producto.idProducto,
        codigo: producto.codigo,
        producto: producto.nombre,
        nombrePorcentaje: producto.nombreIva,
        nombre: producto.nombre,
        totalSinIva: parseFloat(subtotal.toFixed(2)),
        valorProductoSinIva: parseFloat(parseFloat(precio.value.replaceAll(",", ".")).toFixed(2)),
        valor: parseFloat((parseFloat(precio.value.replaceAll(",", ".")) + producto.iva).toFixed(2)),
        tarifaPorcentaje: producto.tarifaPorcentaje
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
    const producto = this.listaProductos.find((x: any) => x.idProducto == this.listaDetalleFactura[index].idProducto);
    if (producto.cantidad < parseFloat(cantidad.value.replaceAll(",", "."))) {
      js.toastWarning(`El producto sólo dispone de <b>${producto.cantidad}</b> unidades en stock`);
      cantidad.value = producto.cantidad.toString().replaceAll(".", ",");
    }
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
    detalle.subtotal = parseFloat((detalle.precio * detalle.cantidad).toFixed(2));
    detalle.nombreIva = precioActual.nombreIva;
    detalle.idIva = precioActual.idIva;
    detalle.porcentaje = parseFloat((detalle.subtotal > 0 ? detalle.subtotal * precioActual.iva : 0).toFixed(2));
    detalle.total = parseFloat((detalle.subtotal + detalle.porcentaje).toFixed(2));
    detalle.idDetallePrecioProducto = precioActual.idDetallePrecioProducto;
    detalle.nombrePorcentaje = precioActual.nombreIva;
    detalle.valorProductoSinIva = parseFloat(precioActual.precio.toFixed(2));
    detalle.totalSinIva = parseFloat(detalle.precio.toFixed(2));
    detalle.valor = parseFloat((detalle.valorPorcentaje + detalle.valorProductoSinIva).toFixed(2));
    detalle.tarifaPorcentaje = precioActual.tarifaPorcentaje
    this.listaDetalleFactura[index] = detalle;
    this.calcularTotales();
  }


  calcularTotalesCambios(e:any):void{

    try {
      let valorRecibido=this.el.nativeElement.querySelector("#valorRecibido");
      let totalCobrar=this.el.nativeElement.querySelector("#totalCobrar");
      let cambio=this.el.nativeElement.querySelector("#cambio");
      let saldo=this.el.nativeElement.querySelector("#saldo");
      valorRecibido.value =e.value.toString().replace(".", ",");
      let valorCambio = valorRecibido.value.replace(",", ".") - totalCobrar.value.replace(",", ".");
      cambio.value= valorCambio.toFixed(2).replaceAll(".", ",");
      if(valorCambio<0) {

        saldo.value= (valorCambio * - 1).toFixed(2).replaceAll(".", ",");
        cambio.value= (valorCambio * - 1).toFixed(2).replaceAll(".", ",");
        this.renderer.addClass(cambio, 'is-invalid');
        

      }else{

          saldo.value= 0.00.toFixed(2).replaceAll(".", ",");
          this.renderer.removeClass(cambio, 'is-invalid');

      }

      this.factura.valorRecibido=parseFloat (valorRecibido.value.replaceAll(",", "."));
      this.factura.saldo=parseFloat (saldo.value.replaceAll(",", "."));
      this.factura.cambio=parseFloat (cambio.value.replaceAll(",", "."));
      console.log(this.factura);
  

    } catch (e) {
      js.handleError(e);
    }
      
    

  }

  calcularTotales(): void {
    try {
      this.factura.subtotal = parseFloat((this.listaDetalleFactura.map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0)).toFixed(2));
      this.factura.subtotal12 = parseFloat(this.listaDetalleFactura.filter((x: any) => x.valorPorcentaje > 0).map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0).toFixed(2));
      this.factura.subtotal0 = parseFloat(this.listaDetalleFactura.filter((x: any) => x.valorPorcentaje == 0).map((x: any) => { return x.subtotal }).reduce((pre: number, value: number) => pre + value, 0).toFixed(2));
      this.factura.iva12 = parseFloat(this.listaDetalleFactura.map((x: any) => { return x.porcentaje }).reduce((pre: number, value: number) => pre + value, 0).toFixed(2));
      this.factura.totDescuento = parseFloat(this.listaDetalleFactura.map((x: any) => { return x.descuento }).reduce((pre: number, value: number) => pre + value, 0).toFixed(2));
      this.factura.totalFactura = parseFloat((this.listaDetalleFactura.map((x: any) => { return x.total }).reduce((pre: number, value: number) => pre + value, 0)).toFixed(2));
      this.el.nativeElement.querySelector("#totalCobrar").value = this.factura.totalFactura.toFixed(2).replaceAll(".", ",");
      this.el.nativeElement.querySelector("#saldo").value = 0.00.toFixed(2).replaceAll(".", ",");
      this.el.nativeElement.querySelector("#cambio").value = 0.00.toFixed(2).replaceAll(".", ",");


      if (this.listaDetallePagos.length == 0) {
        this.el.nativeElement.querySelector("#valor").value = this.factura.totalFactura.toFixed(2).replaceAll(".", ",");
      } else {
        let totalDetallePagos = this.listaDetallePagos.map((x: any) => { return x.valor }).reduce((pre: number, value: number) => pre + value, 0);
        if (parseFloat(totalDetallePagos.toFixed(2)) < parseFloat(this.factura.totalFactura)) {
          this.el.nativeElement.querySelector("#valor").value = (this.factura.totalFactura - totalDetallePagos).toFixed(2).replaceAll(".", ",");
        }
      }
      if (this.listaDetalleFactura.length == 0) {
        this.listaDetallePagos = [];
        this.formaPagoDefault = true;
      }
    } catch (e) {
      js.handleError(e);
    }
  }

  handleDefaultFormaPago(defaultFormaPago: any): void {
    this.formaPagoDefault = defaultFormaPago.checked;
    this.el.nativeElement.querySelector("#valor").value = this.factura.totalFactura.toFixed(2).replaceAll(".", ",");
  }
  async agregarPago(): Promise<void> {
    try {
      if (this.listaDetalleFactura.length == 0) throw new Error("Aún no se ha agregado ningún producto a la factura");
      if (!await js.validarTodo(this.frmDetalleFormaPagos.nativeElement)) throw new Error("Verifique los campos requeridos");
      const pago: any = await this.axios.formToJsonTypes(this.frmDetalleFormaPagos.nativeElement);
      pago.plazo = pago.plazo == "" ? 0 : pago.plazo;
      if (pago.valor > this.factura.totalFactura || pago.valor == 0) throw new Error("El valor del pago no puede 0 o mayor al valor de la factura");
      const sumatoriaPagos = this.listaDetallePagos.map((x: any) => { return x.valor }).reduce((pre: number, value: number) => pre + value, 0);
      if ((sumatoriaPagos + pago.valor) > this.factura.totalFactura) {
        const valorRecomendado = parseFloat((this.factura.totalFactura - sumatoriaPagos).toFixed(2));
        const textoValorRecomendado = valorRecomendado.toFixed(2).replaceAll(".", ",");
        js.toastWarning(`El valor máximo que puede agregar es ${textoValorRecomendado}`);
        this.calcularTotales();
        js.limpiarValidadores(this.frmDetalleFormaPagos.nativeElement);
        return;
      }
      this.listaDetallePagos.push(pago);
      pago.formaPago = this.listaFormaPagos.find((x: any) => x.idFormaPago == pago.idFormaPago).nombre;
      pago.tiempo = this.listaTiempoFormaPagos.find((x: any) => x.idTiempoFormaPago == pago.idTiempoFormaPago).nombre;
      js.limpiarForm(this.frmDetalleFormaPagos.nativeElement);
      this.calcularTotales();
    } catch (e) {
      js.handleError(e);
    }
  }
  async agregarAdicional(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmInformacionAdicional.nativeElement)) throw new Error("Verifique los campos requeridos");
      const adicional: any = await this.axios.formToJsonTypes(this.frmInformacionAdicional.nativeElement);
      this.listaAdicionales.push({
        nombre: adicional.nombreAdicional,
        valor: adicional.valorAdicional
      });
      js.limpiarForm(this.frmInformacionAdicional.nativeElement);
    } catch (e) {
      js.handleError(e);
    }
  }

  async abrirModalCambios(): Promise<void> {
    try {

      if (!await js.validarTodo(this.frmCliente.nativeElement)) throw new Error("Verifique los campos requeridos");
      if (!await js.validarTodo(this.frmEmisor.nativeElement)) throw new Error("Verifique los campos requeridos");
      if (this.listaDetalleFactura.length == 0) throw new Error("No se puede enviar una factura sin productos/servicios.")
      if (this.formaPagoDefault && this.listaDetallePagos.length == 0) {
        const pago: any = await this.axios.formToJsonTypes(this.frmDetalleFormaPagos.nativeElement);
        pago.valor = this.factura.totalFactura;
        this.listaDetallePagos.push(pago)
      }
      if (this.listaDetallePagos.length == 0) throw new Error("Debe agregar el pago o dejar el pago por defecto");
      this.modalC.show();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }    
  }

  async guardar(): Promise<void> {
    try {

 

      if (!await js.validarTodo(this.frmCliente.nativeElement)) throw new Error("Verifique los campos requeridos");
      if (!await js.validarTodo(this.frmEmisor.nativeElement)) throw new Error("Verifique los campos requeridos");
      if (this.listaDetalleFactura.length == 0) throw new Error("No se puede enviar una factura sin productos/servicios.")
      if (this.formaPagoDefault && this.listaDetallePagos.length == 0) {
        const pago: any = await this.axios.formToJsonTypes(this.frmDetalleFormaPagos.nativeElement);
        pago.valor = this.factura.totalFactura;
        this.listaDetallePagos.push(pago)
      }
      if (this.listaDetallePagos.length == 0) throw new Error("Debe agregar el pago o dejar el pago por defecto");
      const emisor: any = await this.axios.formToJsonTypes(this.frmEmisor.nativeElement);
      const cliente: any = await this.axios.formToJsonTypes(this.frmCliente.nativeElement);
      const factura = { ...this.factura, ...emisor, ...cliente };
      factura.formaPago = this.listaDetallePagos;
      factura.informacionAdicional = this.listaAdicionales;
      factura.detalleFactura = this.listaDetalleFactura;
      js.loaderShow();
      const url = `${this.baseUrl}Facturas/insertar`;
      await this.axios.postJson(url, factura);
      js.toastSuccess(`Registro de ${this.tipoDocumento} exitoso`);
      this.modal.hide();
      this.modalC.hide();
      this.reloadDataTable();
      this.verificarEstados();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }
}
