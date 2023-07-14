import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { Validator } from 'src/app/Compartidos/Validaciones/validations';
import { Ciudades } from 'src/app/Interfaces/Ciudades';
import { Empleados } from 'src/app/Interfaces/Empleados';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { TipoIdentificaciones } from 'src/app/Interfaces/TipoIdentificaciones';
import { CiudadesService } from 'src/app/Servicios/ciudades.service';
import { EmpleadosService } from 'src/app/Servicios/empleados.service';
import { ProvinciasService } from 'src/app/Servicios/provincias.service';
import { TipoIdentificacionesService } from 'src/app/Servicios/tipo-identificaciones.service';
import { cedulaRuc } from 'src/app/Compartidos/Validaciones/cedulaRuc';
declare var $: any;
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  empleadoForm = new FormGroup({
    idEmpleado: new FormControl(),
    identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    observacion: new FormControl(),
    idCiudad: new FormControl('', [Validators.required]),
    idProvincia: new FormControl('', [Validators.required]),
    idTipoIdentificacion: new FormControl('', [Validators.required]),
  });

  tipoIdentificacionesList: TipoIdentificaciones[] = [];
  provinciasList: Provincias[] = [];
  ciudadesList: Ciudades[] = [];
  provinciaDefault: any;
  ciudadDefault: any;
  tipoIdentificacionDefault: any;
  selectedProvincia: any;
  selectedTipoNotificacion: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  spinner: boolean = true;
  spinnerCargar: boolean = true;
  spinnerEditar: boolean = false;
  spinnerGuardar: boolean = true;
  spinnerEspere: boolean = false;
  idEmpleado: string = '';
  spinnerWarning: boolean = false;
  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private tipoIdentificacionesServices: TipoIdentificacionesService,
    private provinciasServices: ProvinciasService,
    private ciudadesServices: CiudadesService,
    private empleadosServices: EmpleadosService,
    private ngSelectConfig: NgSelectConfig,
    private elementRef: ElementRef
  ) {
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';
  }

  ngOnInit() {
    this.listarEmpleados();
    this.listarTiposNotificaciones();
    this.listarProvicias();
  }

  ngAfterViewInit(): void {
     // if instance exist destroy
     if ($.fn.DataTable.isDataTable('table')) {
      $('table').DataTable().destroy();
    }

    this.dtTrigger.next();
    setTimeout(() => {
      $('table').DataTable(this.dtOptions);
    }, 0);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listarEmpleados() {
    this.dtOptions = {
      lengthMenu: [10, 25, 50, 75, 100],
      destroy: true,
      scrollX: true,
      columnDefs: [
        {
          targets: [0, 1, 2, 3, 4, 5, 6, 7],
          className: 'text-center',
          width: 'auto',
        },
        { targets: [7], orderable: false },
        { targets: '_all', className: 'dt-nowrap' }
      ],
      columns: [
        {
          title: 'Identificación',
          data: 'identificacion',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Razon Social',
          data: 'razonSocial',
        },
        {
          title: 'Telefono',
          data: 'telefono',
        },
        {
          title: 'Ciudad',
          data: 'idCiudadNavigation.nombre',
        },
        {
          title: 'Dirección',
          data: 'direccion',
        },
        {
          title: 'Registro',
          data: 'fechaRegistro',
          render: (data: any, type: any, full: any, meta: any) => {
            data = data.split('T');
            return data[0];
          },
        },
        {
          title: 'Opciones',
          data: 'idEmpleado',
          render: (data: any, type: any, full: any, meta: any) => {
            return `
                      <div style="cursor: pointer;">
                      
                          <i id="edit-icon" data-toggle="tooltip" data-placement="bottom" title="Editar"  class="fas fa-edit mr-2"></i> <i data-toggle="tooltip" data-placement="bottom" title="Eliminar"  class="fas fa-trash-alt"></i>
                      
                      </div>`;
          },
          createdCell: (
            cell: any,
            cellData: any,
            rowData: any,
            rowIndex: any,
            colIndex: any
          ) => {
            $(cell)
              .find('.fa-edit')
              .click(() => {
                this.cargar(cellData, rowData.idCiudadNavigation.idProvincia);
              });
            $(cell)
              .find('.fa-trash-alt')
              .click(() => {
                this.eliminar(cellData);
              });
          },
        },
      ],
    };

    this.empleadosServices.listar().subscribe({
      next: (res) => {
        this.dtOptions.data = res;
        this.dtTrigger.next();
        this.spinner = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Empleados');
      },
    });
  }

  editar() {
    this.spinnerEspere = true;
    this.spinnerEditar = false;
    this.empleadosServices.actualizar(this.empleadoForm.value).subscribe({
      next: (res) => {
        

        if(res ==="ok"){

          this.toast.show_success('Empleados', 'Editado con Éxito');
          $('#exampleModal').modal('hide');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          this.listarEmpleados();
          return;

        }

        if(res ==="repetido"){

          this.toast.show_warning('Empleado', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          return;

        }
      
  
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al actualizar el Empleado');
        this.spinner = false;
        this.spinnerEspere = false;
      },
    });
  }

  cargar(idEmpleado: string, idProvincia: string) {
    $('#exampleModal').modal('show');
    this.spinnerCargar = true;
    this.spinnerGuardar = false;
    this.spinnerEditar = true;
    this.empleadosServices.cargar(idEmpleado).subscribe({
      next: (res) => {
        this.listarCiudades(idProvincia);
        this.empleadoForm.patchValue(
          Object.assign(
            {
              idProvincia: idProvincia,
            },
            res
          )
        );

        this.spinnerCargar = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Empleado');
      },
    });
  }

  eliminar(idEmpleado: any) {
    $('#ModalWarning').modal('show');
    this.idEmpleado = idEmpleado;
  }

  confirmarEliminacion() {
    this.spinnerWarning = true;
    this.empleadosServices.eliminar(this.idEmpleado).subscribe({
      next: (res) => {
        this.listarEmpleados();
        this.toast.show_success('Empleados', 'Eliminado con Éxito');
        $('#ModalWarning').modal('hide');
        this.spinnerWarning = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al eliminar el Empleado');
      },
    });
  }

  cerrarModalWarning() {
    $('#ModalWarning').modal('hide');
    this.idEmpleado = '';
  }

  listarTiposNotificaciones() {
    this.tipoIdentificacionesServices.listar().subscribe({
      next: (res) => {
        this.tipoIdentificacionesList = res;
        this.selectedTipoNotificacion = this.tipoIdentificacionesList.find(
          (item) => item.nombre === 'Cedula/Ruc'
        );
        this.empleadoForm
          .get('idTipoIdentificacion')
          ?.setValue(this.selectedTipoNotificacion.idTipoIdentificacion);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  listarProvicias() {
    this.provinciasServices.listar().subscribe({
      next: (res) => {
        this.provinciasList = res;
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  listarCiudades(idProvincia: any) {
    this.ciudadesServices.listar(idProvincia).subscribe({
      next: (res) => {
        this.ciudadesList = res;
        this.empleadoForm
          .get('idCiudad')
          ?.setValue(this.ciudadesList[0].idCiudad);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  listarCiudadesSet(idProvincia: any) {
    this.ciudadesServices.listar(idProvincia).subscribe({
      next: (res) => {
        this.ciudadesList = res;
        this.empleadoForm
          .get('idCiudad')
          ?.setValue(this.ciudadesList[0].idCiudad);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  abrirModal() {
    this.spinnerCargar = false;
    this.spinnerEditar = false;
    this.spinnerGuardar = true;
    $('#exampleModal').modal('show');

    this.listarCiudades(this.provinciasList[0].idProvincia ?? '');

    this.empleadoForm.patchValue({
      idProvincia: this.provinciasList[0].idProvincia ?? '',
      idTipoIdentificacion:
        this.tipoIdentificacionesList[1].idTipoIdentificacion ?? '',
    });
  }

  guardar(empleado: Empleados) {


    this.spinnerEspere = true;
    this.spinnerGuardar = false;

    if (this.empleadoForm.invalid) {
      this.validator.validarTodo(this.empleadoForm, this.el);
      this.spinnerEspere = false;
      this.spinnerGuardar = true;
      return;
    }

    
    empleado.telefono = empleado.telefono?.toString();

    this.empleadosServices.insertar(empleado).subscribe({
      next: (res) => {
        if (res == 'ok') {
          this.listarEmpleados();
          this.toast.show_success('Empleados', 'Empleado Guardado Con Éxito');
          this.limpiar();
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }

        if (res == 'repetido') {
          this.toast.show_warning('Empleados', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.show_error('Empleados', 'Error al guardar el Empleado');
      },
    });
  }

  cambiarValidacion(evento: any) {
    this.empleadoForm.controls['identificacion'].clearValidators();
    this.empleadoForm.controls['identificacion'].setValidators([
      Validators.required,
    ]);
    if (evento == '893ed699-7e94-44a8-befd-414026a2a918') {
      this.empleadoForm.controls['identificacion'].setValidators([
        Validators.required,
        cedulaRuc(),
      ]);
    }

    if (parseInt(evento.value) == 2) {
      this.empleadoForm.controls['identificacion'].setValidators([
        Validators.required,
      ]);
    }

    this.empleadoForm.get('identificacion')?.setValue('');
  }

  limpiar() {
    this.empleadoForm.reset();
    $('#exampleModal').modal('hide');
    this.spinnerEspere = false;
  }

  setearValorRepresentante(evento: any) {
    this.empleadoForm.get('representante')?.setValue(evento.value);
  }

}
