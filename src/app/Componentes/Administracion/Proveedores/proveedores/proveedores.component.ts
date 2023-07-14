import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { Validator } from 'src/app/Compartidos/Validaciones/validations';
import { Ciudades } from 'src/app/Interfaces/Ciudades';
import { Proveedores } from 'src/app/Interfaces/Proveedores';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { TipoIdentificaciones } from 'src/app/Interfaces/TipoIdentificaciones';
import { CiudadesService } from 'src/app/Servicios/ciudades.service';
import { ProveedoresService } from 'src/app/Servicios/proveedores.service';
import { ProvinciasService } from 'src/app/Servicios/provincias.service';
import { TipoIdentificacionesService } from 'src/app/Servicios/tipo-identificaciones.service';
import { cedulaRuc } from 'src/app/Compartidos/Validaciones/cedulaRuc';
declare var $: any;

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  ProveedoresForm = new FormGroup({
    idProveedor: new FormControl(),
    identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    paginaWeb: new FormControl(),
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
  idProveedor: string = '';
  spinnerWarning: boolean = false;
  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private tipoIdentificacionesServices: TipoIdentificacionesService,
    private provinciasServices: ProvinciasService,
    private ciudadesServices: CiudadesService,
    private ProveedoresServices: ProveedoresService,
    private ngSelectConfig: NgSelectConfig,
    private elementRef: ElementRef
  ) {
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';
  }

  ngOnInit() {
    this.listarProveedores();
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

  listarProveedores() {
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
          data: 'idProveedor',
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

    this.ProveedoresServices.listar().subscribe({
      next: (res) => {
        this.dtOptions.data = res;
        this.dtTrigger.next();
        this.spinner = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Proveedores');
      },
    });
  }

  editar() {
    this.spinnerEspere = true;
    this.spinnerEditar = false;
    this.ProveedoresServices.actualizar(this.ProveedoresForm.value).subscribe({
      next: (res) => {
        

        if(res ==="ok"){

          this.toast.show_success('Proveedores', 'Editado con Éxito');
          $('#exampleModal').modal('hide');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          this.listarProveedores();
          return;

        }

        if(res ==="repetido"){

          this.toast.show_warning('Proveedore', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          return;

        }
      
  
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al actualizar el Proveedore');
        this.spinner = false;
        this.spinnerEspere = false;
      },
    });
  }

  cargar(idProveedor: string, idProvincia: string) {
    $('#exampleModal').modal('show');
    this.spinnerCargar = true;
    this.spinnerGuardar = false;
    this.spinnerEditar = true;
    this.ProveedoresServices.cargar(idProveedor).subscribe({
      next: (res) => {
        this.listarCiudades(idProvincia);
        this.ProveedoresForm.patchValue(
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
        this.toast.show_error('Error', 'Al listar el Proveedore');
      },
    });
  }

  eliminar(idProveedor: any) {
    $('#ModalWarning').modal('show');
    this.idProveedor = idProveedor;
  }

  confirmarEliminacion() {
    this.spinnerWarning = true;
    this.ProveedoresServices.eliminar(this.idProveedor).subscribe({
      next: (res) => {
        this.listarProveedores();
        this.toast.show_success('Proveedores', 'Eliminado con Éxito');
        $('#ModalWarning').modal('hide');
        this.spinnerWarning = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al eliminar el Proveedore');
      },
    });
  }

  cerrarModalWarning() {
    $('#ModalWarning').modal('hide');
    this.idProveedor = '';
  }

  listarTiposNotificaciones() {
    this.tipoIdentificacionesServices.listar().subscribe({
      next: (res) => {
        this.tipoIdentificacionesList = res;
        this.selectedTipoNotificacion = this.tipoIdentificacionesList.find(
          (item) => item.nombre === 'Cedula/Ruc'
        );
        this.ProveedoresForm
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
        this.ProveedoresForm
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
        this.ProveedoresForm
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

    this.ProveedoresForm.patchValue({
      idProvincia: this.provinciasList[0].idProvincia ?? '',
      idTipoIdentificacion:
        this.tipoIdentificacionesList[1].idTipoIdentificacion ?? '',
    });
  }

  guardar(Proveedore: Proveedores) {


    this.spinnerEspere = true;
    this.spinnerGuardar = false;

    if (this.ProveedoresForm.invalid) {
      this.validator.validarTodo(this.ProveedoresForm, this.el);
      this.spinnerEspere = false;
      this.spinnerGuardar = true;
      return;
    }

    
    Proveedore.telefono = Proveedore.telefono?.toString();

    this.ProveedoresServices.insertar(Proveedore).subscribe({
      next: (res) => {
        if (res == 'ok') {
          this.listarProveedores();
          this.toast.show_success('Proveedores', 'Proveedore Guardado Con Éxito');
          this.limpiar();
          this.spinnerEspere = true;
          this.spinnerGuardar = false;
          return;
        }

        if (res == 'repetido') {
          this.toast.show_warning('Proveedores', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.show_error('Proveedores', 'Error al guardar el Proveedor');
      },
    });
  }

  cambiarValidacion(evento: any) {
    this.ProveedoresForm.controls['identificacion'].clearValidators();
    this.ProveedoresForm.controls['identificacion'].setValidators([
      Validators.required,
    ]);
    if (evento == '893ed699-7e94-44a8-befd-414026a2a918') {
      this.ProveedoresForm.controls['identificacion'].setValidators([
        Validators.required,
        cedulaRuc(),
      ]);
    }

    if (parseInt(evento.value) == 2) {
      this.ProveedoresForm.controls['identificacion'].setValidators([
        Validators.required,
      ]);
    }

    this.ProveedoresForm.get('identificacion')?.setValue('');
  }

  limpiar() {
    this.ProveedoresForm.reset();
    $('#exampleModal').modal('hide');
    this.spinnerEspere = false;
  }

  setearValorRepresentante(evento: any) {
    this.ProveedoresForm.get('representante')?.setValue(evento.value);
  }

}
