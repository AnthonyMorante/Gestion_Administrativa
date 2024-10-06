import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { js, global } from '../../app.config';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, DataTablesModule, NgSelectModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit, AfterViewInit, OnDestroy {

  baseUrl = `${global.BASE_API_URL}api/`;
  reporteUrl=`${this.baseUrl}Reportes/ExcelProveedores`;
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
  tituloModal: string = "Nuevo registro";
  idProveedor: string = "";
  identificacion: any;
  fechaRegistro: Date = new Date();
  constructor(private axios: AxiosService) { }

  ngOnInit() {
    this.identificacion = document.querySelector("#identificacion");
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    js.activarValidadores(this.frmDatos.nativeElement);
    this.listarProveedores();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async listarProveedores() {
    try {
      const url = `${this.baseUrl}Proveedores/listar`;
      const columns = "identificacion,razonSocial,telefono,email,direccion";
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
        order: [[2, "asc"]]
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
    this.tituloModal = "Nuevo registro";
    this.idProveedor = "";
    js.limpiarForm(this.frmDatos.nativeElement, 100);
    js.identificacion.classList.remove("readonly");
  }
  async editar(idProveedor: string): Promise<void> {
    try {
      this.tituloModal = "Editar registro"
      this.idProveedor = "";
      const url = `${this.baseUrl}Proveedores/cargar/${idProveedor}`;
      const res = (await this.axios.get(url)).data;
      this.idProveedor = res.identificacion;
      js.cargarFormulario(this.frmDatos.nativeElement, res);
      js.identificacion.classList.add("readonly");
      this.modal.show();
    } catch (e) {
      js.handleError(e);
    }
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      js.loaderShow();
      const url = `${this.baseUrl}Proveedores/${!this.idProveedor ? "insertar" : "actualizar"}`;
      const data = new FormData(this.frmDatos.nativeElement);
      if (!!this.idProveedor) data.append("idProveedor", this.idProveedor);
      if (!this.idProveedor) await this.axios.postFormJson(url, data);
      else await this.axios.putFormJson(url, data);
      js.toastSuccess(`Registro ${!this.idProveedor ? "guardado" : "editado"} exitosamente`);
      this.modal.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async eliminar(idProveedor: string): Promise<void> {
    try {
      if (!await js.toastPreguntar(`
      <h3><i class='bi-exclamation-triangle-fill text-warning'></i></h3>
      <p class='fs-md'>¿Está seguro que desea eliminar este Proveedor?</p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-circle-fill me-2'>
      </i>Esta acción no se puede deshacer ni revertir.</p>
      `, "Si, Eliminar")) return;
      const url = `${this.baseUrl}Proveedores/eliminar/${idProveedor}`;
      await this.axios.delete(url);
      js.toastSuccess("Proveedor eliminado exitosamente");
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }

  }

}
