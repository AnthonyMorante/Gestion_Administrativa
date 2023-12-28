import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  styleUrl: './facturas-proveedores.component.css'
})
export class FacturasProveedoresComponent implements OnInit, AfterViewInit, OnDestroy {
  lista: any = [];
  modal: any;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective = {} as DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();
  public factura: any;
  public productosProveedores: any = [];
  public productos: any = [];
  public formasPagos: any = [];
  public idFactura: number = 0;
  private baseUrl: string = `${global.BASE_API_URL}api/FacturasProveedores/`;
  constructor(private _axios: AxiosService) { }
  ngOnInit() {
    this.modal = new js.bootstrap.Modal(js.modalDatos, {
      keyboard: false,
      backdrop: 'static',
    });
    this.listarFacturas();

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async listarFacturas() {
    try {
      const url = `${this.baseUrl}listar`;
      const columns = "idFactura,fechaRegistro,fechaEmision,nombreComercial,razonSocial,importeTotal";
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
  nuevo() {
    js.modalDatosLabel.innerText = "NUEVA FACTURA DE PROVEEDOR";
    this.factura = null;
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
      let url = `${this.baseUrl}leerXml`
      let data = new FormData(js.frmXml);
      const res = (await this._axios.postForm(url, data)).data;
      this.factura = res.factura;

      this.productosProveedores = res.productosProveedores;
      this.productos = res.productos;
      this.formasPagos = res.formasPagos;
      this.factura.sriPagos = this.factura.sriPagos.map((x: any) => {
        x.formaPagoTexto = this.formasPagos.find((f: any) => x.formaPago == f.codigo).formaPago;
        return x;
      });
      setTimeout(() => {
        js.tbodyDetalle.querySelectorAll("select").forEach((item: any) => {
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

  public async ver(idFactura:number): Promise<void> {
    try {
      this.factura = null;
      this.productos = [];
      this.productosProveedores = [];
      this.formasPagos = [];
      js.loaderShow();
      let url = `${this.baseUrl}unDato/${idFactura}`;
      const res = (await this._axios.get(url)).data;
      this.idFactura=idFactura;
      this.factura = res.factura;
      this.productosProveedores = res.productosProveedores;
      this.productos = res.productos;
      this.formasPagos = res.formasPagos;
      this.factura.sriPagos = this.factura.sriPagos.map((x: any) => {
        x.formaPagoTexto = this.formasPagos.find((f: any) => x.formaPago == f.codigo).formaPago;
        return x;
      });
      setTimeout(() => {
        js.tbodyDetalle.querySelectorAll("select").forEach((item: any) => {
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
    this.productosProveedores[selectId] = { idProducto: idProducto.value, codigoPrincipal, identificacion: this.factura.ruc };
  }

  selectedItem(codigoPrincipal: any, idProducto: any): boolean {
    return !!this.productosProveedores.find((x: any) => x?.codigoPrincipal == codigoPrincipal && x?.idProducto == idProducto);
  }

  subTotal0(): string {
    return this.factura.sriTotalesConImpuestos.filter((x: any) => x.codigo == 0).reduce((total: number, item: any) => { return total + item.baseImponible }, 0).toFixed(2);
  }
  subTotal12(): string {
    return this.factura.sriTotalesConImpuestos.filter((x: any) => x.codigo == 2).reduce((total: number, item: any) => { return total + item.baseImponible }, 0).toFixed(2);
  }
  iva12(): string {
    return this.factura.sriTotalesConImpuestos.filter((x: any) => x.codigo == 2).reduce((total: number, item: any) => { return total + item.valor }, 0).toFixed(2);
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(js.tbodyDetalle)) throw new Error("Verifique que todos los productos tengan una referencia interna");
      if (!await js.toastPreguntar(`<p class='mt-2 fs-md'>¿Está seguro que desea guardar está factura?
      </br>El stock de productos se aumentará acorde a las referencias internas seleccionadas<p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-triangle-fill me-1'></i>Está acción no se puede deshacer.</p>`)) return;
      const url = `${this.baseUrl}guardar`;
      const json = { factura: this.factura, listaProductos: this.productosProveedores };
      await this._axios.postJson(url, json);
      this.modal.hide();
      this.listarFacturas();
    } catch (e) {
      js.handleError(e);
    }
  }
}






