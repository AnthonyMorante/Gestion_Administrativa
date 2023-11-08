import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from 'src/app/Services/axios.service';
import { global, js } from 'src/main';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit, AfterViewInit, OnDestroy {
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
  tituloModal: string = "Nuevo registro";
  idEmpleado: string = "";
  identificacion: any;
  fechaRegistro: Date = new Date();
  //Combos
  @ViewChild('idProvincia', { static: true }) idProvincia: NgSelectComponent = {} as NgSelectComponent;
  @ViewChild('idCiudad', { static: true }) idCiudad: NgSelectComponent = {} as NgSelectComponent;
  listaTipoIdentificaciones: any = [];
  listaProvincias: any = [];
  listaCiudades: any = [];
  constructor(private axios: AxiosService) { }

  ngOnInit() {
    this.identificacion = document.querySelector("#identificacion");
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    js.activarValidadores(this.frmDatos.nativeElement);
    this.listarEmpleados();
    this.comboTipoIdentificaciones();
    this.comboProvincia();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async listarEmpleados() {
    try {
      const url = `${this.baseUrl}Empleados/listar`;
      const columns = "idEmpresa,identificacion,telefono,razonSocial,direccion";
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
        columns: columns.split(",").map((x:string)=>{return{data:x}}),
        columnDefs: [{ targets: [0], searchable: false, orderable: false }],
        order: [[1, "asc"]]
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

  async comboProvincia(): Promise<void> {
    this.idProvincia.handleClearClick();
    this.idCiudad.handleClearClick();
    this.idProvincia.handleClearClick();
    const url = `${this.baseUrl}Provincias/listar`;
    this.listaProvincias = (await this.axios.get(url)).data;
  }
  async comboCiudades(idProvincia: any): Promise<void> {
    this.listaCiudades = [];
    if (!idProvincia) {
      this.idCiudad.handleClearClick();
      return;
    }
    this.idCiudad.handleClearClick();
    const url = `${this.baseUrl}Ciudades/listar?idProvincia=${idProvincia}`;
    this.listaCiudades = (await this.axios.get(url)).data;
  }


  nuevo() {
    this.tituloModal = "Nuevo registro";
    this.idEmpleado = "";
    this.idCiudad.handleClearClick();
    this.idProvincia.handleClearClick();
    this.listaCiudades = [];
    js.limpiarForm(this.frmDatos.nativeElement, 100);
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

  async editar(idEmpleado: string): Promise<void> {
    try {
      this.tituloModal = "Editar registro"
      this.idEmpleado = "";
      const url = `${this.baseUrl}Empleados/cargar/${idEmpleado}`;
      const res = (await this.axios.get(url)).data;
      res.idProvincia = res.idCiudadNavigation.idProvincia;
      js.cargarFormulario(this.frmDatos.nativeElement, res);
      this.idProvincia.select(this.idProvincia.itemsList.findItem(res.idProvincia));
      setTimeout(() => this.idCiudad.select(this.idCiudad.itemsList.findItem(res.idCiudad)), 100);
      this.idEmpleado = res.idEmpleado;
      this.modal.show();
    } catch (e) {
      js.handleError(e);
    }
  }

  async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      js.loaderShow();
      const url = `${this.baseUrl}Empleados/${!this.idEmpleado ? "insertar" : "actualizar"}`;
      const data = new FormData(this.frmDatos.nativeElement);
      if (!!this.idEmpleado) data.append("idEmpleado", this.idEmpleado);
      data.append("idProvincia", this.idProvincia.selectedValues[0]);
      data.append("idCiudad", this.idCiudad.selectedValues[0]);
      if (!this.idEmpleado) await this.axios.postFormJson(url, data);
      else await this.axios.putFormJson(url, data);
      js.toastSuccess(`Registro ${!this.idEmpleado ? "guardado" : "editado"} exitosamente`);
      this.modal.hide();
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }

  async eliminar(idEmpleado: string): Promise<void> {
    try {
      if (!await js.toastPreguntar(`
      <h3><i class='bi-exclamation-triangle-fill text-warning'></i></h3>
      <p class='fs-md'>¿Está seguro que desea eliminar este Empleado?</p>
      <p class='fs-sm text-danger'><i class='bi-exclamation-circle-fill me-2'>
      </i>Esta acción no se puede deshacer ni revertir.</p>
      `, "Si, Eliminar")) return;
      const url = `${this.baseUrl}Empleados/eliminar/${idEmpleado}`;
      await this.axios.delete(url);
      js.toastSuccess("Empleado eliminado exitosamente");
      this.reloadDataTable();
    } catch (e) {
      js.handleError(e);
    }

  }

}


