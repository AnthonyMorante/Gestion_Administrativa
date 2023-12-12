import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { global, js } from '../../app.config';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [DataTablesModule,NgSelectModule],
  templateUrl: './lotes.component.html',
  styleUrl: './lotes.component.css'
})
export class LotesComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = `${global.BASE_API_URL}api/Lotes/`;
  componentTitle: string = "";
  //Datatable
  lista: any = [];
  @ViewChild(DataTableDirective) dtElement: DataTableDirective = {} as DataTableDirective;
  @ViewChild('idProducto', { static: true }) idProducto: NgSelectComponent = {} as NgSelectComponent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();
  //Formulario
  idLote: number = 0;
  //Combos
  listaProductos: any = [];
  constructor(private axios: AxiosService) { }

  public async ngOnInit(): Promise<void> {
    this.listar();
    js.activarValidadores(js.frmDatos);
    await this.comboProductos();
  }
  public ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async listar() {
    try {
      const url = `${this.baseUrl}listar`;
      const columns = `idLote,fechaRegistro,cantidad,codigo,producto,usuario`;
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
        columnDefs: [{ targets: [0], searchable: false, orderable: false },
        { targets: [], visible: false }],
        order: [[1, "DESC"]]
      };
      //DataTables
    } catch (e) {
      js.handleError(e);
    }
  }
  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => dtInstance.ajax.reload());
  }
  async comboProductos(): Promise<void> {
    try {
      const url = `${this.baseUrl}comboProductos`;
      this.listaProductos = (await this.axios.get(url)).data;
      js.limpiarForm(js.frmDatos,100);
    } catch (e) {
      js.handleError(e);
    }
  }
  nuevo() {
    this.idLote = 0;
    js.limpiarForm(js.frmDatos);
    this.idProducto.handleClearClick();
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(js.frmDatos)) throw new Error("Verifique los campos requeridos");
      js.loaderShow();
      const url = `${this.baseUrl}guardar`;
      let data: any = await this.axios.formToJsonTypes(js.frmDatos);
      data.idProducto=this.idProducto.selectedValues[0];
      await this.axios.postJson(url, data);
      js.toastSuccess(`Registro ${!this.idLote ? "guardado" : "editado"} exitosamente`);
      this.reloadDataTable();
      this.nuevo();
      this.comboProductos();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async eliminar(idLote: number): Promise<void> {
    try {
      if(!await js.toastPreguntar(`
      <p class='fs-md pb-0 mt-3'>
       ¿Está seguro que desea eliminar el registro?
      </p>
      <p class='fs-sm text-danger fw-bold'>
        <i class='bi-exclamation-triangle-fill me-1'></i><br/>
        Está acción no se puede deshacer y la cantidad del registro será restada del stock del producto
      </p>
      `)) return;
      js.loaderShow();
      const url = `${this.baseUrl}eliminar/${idLote}`;
      await this.axios.delete(url);
      js.toastSuccess(`Registro eliminado exitosamente`);
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }
}
