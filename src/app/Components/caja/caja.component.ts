import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { js, global } from '../../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, DataTablesModule, NgSelectModule],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent implements OnInit, AfterViewInit, OnDestroy {
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
  modal: any;
  modalCierre: any;
  tituloModal: string = "Nuevo registro";
  tituloModalCierre: string = "";
  idCaja: number = 0;
  detalleCaja: any = [];
  detalleCajaCierre: any = [];
  identificacion: any;
  total: number = 0;
  totalCierre: number = 0;
  caja: any = {};
  fechaRegistro: Date = new Date();
  aperturaDia: boolean = true;
  denominaciones: boolean = false;
  constructor(private axios: AxiosService) { }

  ngOnInit() {
    this.identificacion = document.querySelector("#identificacion");
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    this.modalCierre = new js.bootstrap.Modal(js.modalCierre, {
      keyboard: false,
      backdrop: 'static',
    });
    this.listarCajas();
    js.activarValidadores(js.total.closest("div"));
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async listarCajas() {
    try {
      const url = `${this.baseUrl}Cajas/listar`;
      const columns = 'idCaja,fechaRegistro,totalApertura,fechaCierre,totalCierre';
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
            let urlApertura = `${this.baseUrl}Cajas/aperturaDia`;
            this.aperturaDia = (await this.axios.get(urlApertura)).data;
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
  mostarDenominaciones() {
    this.denominaciones = js.detallado.checked;
    if (this.denominaciones) {
      setTimeout(() => {
        js.activarValidadores(js.detalleCaja);
      }, 100);
    }
    this.total = 0;
    js.total.value = 0;
  }
  mostarDenominacionesCierre() {
    this.denominaciones = js.detalladoCierre.checked;
    if (this.denominaciones) {
      setTimeout(() => {
        js.activarValidadores(js.detalleCajaCierre);
      }, 100);
    }
    this.totalCierre = 0;
    js.totalCierre.value = 0;
  }
  async nuevo() {
    this.tituloModal = "APERTURA DE CAJA";
    this.idCaja = 0;
    this.total = 0;
    this.listarDenominaciones();
    js.activarValidadores(js.total.closest("div"));
  }


  async listarDenominaciones(): Promise<void> {
    try {
      this.detalleCaja = [];
      const url = `${this.baseUrl}Cajas/listarDenominaciones/${this.idCaja}`;
      this.detalleCaja = (await this.axios.get(url)).data;
      this.detalleCaja = [...this.detalleCaja].map((x: any) => {
        x.idCaja = this.idCaja;
        return x;
      });
      setTimeout(() => {
        js.activarValidadores(js.detalleCaja);
      }, 100);
    } catch (e) {
      js.handleError(e);
    }
  }

  handleTotales(idDenominacion: any, index: number) {
    try {
      const input = js.detalleCaja.querySelectorAll('[name="cantidad"]')[index];
      if (input.value == "") input.value = 0;
      const cantidad = input.value;
      const detalle = this.detalleCaja.find((x: any) => x.idDenominacion == idDenominacion);
      const valor = detalle.valor;
      detalle.cantidad = parseInt(cantidad);
      detalle.total = parseFloat((valor * cantidad).toFixed(2));
      this.calcularTotal();
    } catch (e) {
      js.handleError(e);
    }
  }

  handleTotalesCierre(idDenominacion: any, index: number) {
    try {
      const input = js.detalleCajaCierre.querySelectorAll('[name="cantidad"]')[index];
      if (input.value == "") input.value = 0;
      const cantidad = input.value;
      const detalle = this.detalleCajaCierre.find((x: any) => x.idDenominacion == idDenominacion);
      const valor = detalle.valor;
      detalle.cantidad = parseInt(cantidad);
      detalle.total = parseFloat((valor * cantidad).toFixed(2));
      this.calcularTotalCierre();
    } catch (e) {
      js.handleError(e);
    }
  }

  calcularTotal() {
    this.total = this.detalleCaja.reduce((acumulador: number, item: any) => {
      return acumulador + item.total
    }, 0);
    js.total.value = this.total.toFixed(2);
  }

  calcularTotalCierre() {
    this.totalCierre = this.detalleCajaCierre.reduce((acumulador: number, item: any) => {
      return acumulador + item.total
    }, 0);
    js.total.cierre = this.totalCierre.toFixed(2);
  }

  async editar(idCaja: string): Promise<void> {
    try {
      this.idCaja = 0;
      const url = `${this.baseUrl}Cajas/unDato/${idCaja}`;
      const res = (await this.axios.get(url)).data;
      this.detalleCaja = res.detalleCaja;
      this.caja = res.caja;
      this.idCaja = res.caja.idCaja;
      this.denominaciones = res.caja.detallado == true;
      this.tituloModal = `EDITAR APERTURA DE CAJA ${this.caja.fechaRegistro.substring(0, 10).split('-').reverse().join('-')}`;
      if (this.denominaciones) this.calcularTotal();
      js.total.value = res.caja.totalApertura.toFixed(2).replaceAll(".", ",");
      this.modal.show();
    } catch (e) {
      js.handleError(e);
    }
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.toastPreguntar(
        `<p class='fs-sm mt-2'>Está seguro que desea guardar la apertura de caja con </br><b class='fs-5'>$${js.total.value.replaceAll(",", ".")}</b></p>`
      )) return;
      js.loaderShow();
      const url = `${this.baseUrl}Cajas/guardar`;
      this.caja.idCaja = this.idCaja;
      this.caja.detallado = js.detallado.checked;
      if (this.denominaciones) {
        this.caja.totalApertura = this.total;
      } else {
        this.detalleCaja = [...this.detalleCaja].map((x: any) => {
          x.total = 0;
          x.cantidad = 0;
          return x;
        });
        this.caja.totalApertura = js.total.value.replaceAll(",", ".");
      }
      this.caja.DetallesCajas = this.detalleCaja;
      await this.axios.postJson(url, this.caja);
      js.toastSuccess(`Registro ${this.idCaja == 0 ? "guardado" : "editado"} exitosamente`);
      this.modal.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }


  async guardarCierre(): Promise<void> {
    try {
      if (!await js.toastPreguntar(
        `<p class='fs-sm mt-2'>Está seguro que desea guardar el cierre de caja con </br><b class='fs-5'>$${js.totalCierre.value.replaceAll(",", ".")}</b></p>`
      )) return;
      js.loaderShow();
      const url = `${this.baseUrl}Cajas/guardarCierre`;
      const data = {
        idCaja: this.idCaja,
        totalCierre: js.totalCierre.value.replaceAll(",", "."),
        DetallesCajasCierres: this.detalleCajaCierre
      }
      await this.axios.postJson(url, data);
      js.toastSuccess(`Cierre realizado exitosamente`);
      this.modalCierre.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async eliminar(idCaja: string): Promise<void> {
    try {
      if (!await js.toastPreguntar(`
      <h3><i class='bi-exclamation-triangle-fill text-warning'></i></h3>
      <p class='fs-md'>¿Está seguro que desea eliminar esta caja?</p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-circle-fill me-2'>
      </i>Esta acción no se puede deshacer ni revertir.</p>
      `, "Si, Eliminar")) return;
      const url = `${this.baseUrl}Cajas/eliminar/${idCaja}`;
      await this.axios.delete(url);
      js.toastSuccess("Caja eliminado exitosamente");
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }

  }

  async cargarCierre(idCaja: string): Promise<void> {
    try {
      js.activarValidadores(js.totalCierre.closest("div"));
      this.idCaja = 0;
      const url = `${this.baseUrl}Cajas/unDato/${idCaja}`;
      const res = (await this.axios.get(url)).data;
      this.caja = res.caja;
      this.idCaja = res.caja.idCaja;
      this.detalleCajaCierre = res.detalleCaja.map((x: any) => {
        x.cantidad = 0;
        x.total = 0;
        x.idCaja = this.idCaja;
        return x;
      });
      this.denominaciones = false;
      this.tituloModalCierre = `CERRAR CAJA ${this.caja.fechaRegistro.substring(0, 10).split('-').reverse().join('-')}`;
      js.totalCierre.value = 0;
      this.modalCierre.show();
    } catch (e) {
      js.handleError(e);
    }
  }

}
