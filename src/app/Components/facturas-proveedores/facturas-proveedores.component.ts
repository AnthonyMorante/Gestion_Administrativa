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
  implements OnInit, AfterViewInit, OnDestroy
{
  lista: any = [];
  modal: any;
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

  constructor(
    private _axios: AxiosService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
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

  async cargaRetencion(autorizacion: number) {
    try {
      const url = `${this.baseUrlRetencion}Retenciones/unDato?claveAcceso=${autorizacion}`;
      this.listaUnaRetencion = (await this._axios.get(url)).data;
      const nComprobante = this.el.nativeElement.querySelector('#nComprobante');
      const claveAcceso = this.el.nativeElement.querySelector('#claveAcceso');
      const base = this.el.nativeElement.querySelector('#base');
      const bBaseImponible =
        this.el.nativeElement.querySelector('#bBaseImponible');
      nComprobante.value = `${this.listaUnaRetencion.estab}${this.listaUnaRetencion.ptoEmi}${this.listaUnaRetencion.secuencial}`;
      claveAcceso.value = this.listaUnaRetencion.claveAcceso;
      base.value = this.listaUnaRetencion.totalSinImpuesto;
      bBaseImponible.value = this.listaUnaRetencion.valor;
      this.retenciones.totalFactura = this.listaUnaRetencion.importeTotal;
      console.log(this.listaUnaRetencion);
      console.log(nComprobante);
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
}
