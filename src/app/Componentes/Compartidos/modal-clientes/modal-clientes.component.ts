import {
  Component,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { cedulaRuc } from 'src/app/Compartidos/Validaciones/cedulaRuc';
import { Validator } from 'src/app/Compartidos/Validaciones/validations';
import { Ciudades } from 'src/app/Interfaces/Ciudades';
import { Clientes } from 'src/app/Interfaces/Clientes';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { TipoIdentificaciones } from 'src/app/Interfaces/TipoIdentificaciones';
import { CiudadesService } from 'src/app/Servicios/ciudades.service';
import { ClientesService } from 'src/app/Servicios/clientes.service';
import { ProvinciasService } from 'src/app/Servicios/provincias.service';
import { TipoIdentificacionesService } from 'src/app/Servicios/tipo-identificaciones.service';

declare var $: any;
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css'],
})
export class ModalClientesComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;
  dynamicComponentRef!: ComponentRef<ModalClientesComponent>;

  clienteForm = new FormGroup({
    idCliente: new FormControl(),
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
  spinner: boolean = true;
  spinnerCargar: boolean = true;
  spinnerEditar: boolean = false;
  spinnerGuardar: boolean = true;
  spinnerEspere: boolean = false;
  idCliente: string = '';
  spinnerWarning: boolean = false;
  token: string | null = '';
  idEmpresa: string | null = '';
  selectedTipoNotificacion: any;
  idProvincia = '';

  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private tipoIdentificacionesServices: TipoIdentificacionesService,
    private provinciasServices: ProvinciasService,
    private ciudadesServices: CiudadesService,
    private clientesServices: ClientesService,
    private ngSelectConfig: NgSelectConfig,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';
    this.idProvincia = 'd2d84fb9-8d21-4fe8-b200-50f041659673';
  }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      const res = jwt_decode(this.token) as { idEmpresa: string };
      this.idEmpresa = res.idEmpresa;

      this.listarTiposNotificaciones();
      this.listarProvincias();
    }
  }

  listarCiudadesSet(idProvincia: any) {
    this.ciudadesServices.listar(idProvincia).subscribe({
      next: (res) => {
        this.ciudadesList = res;
        this.clienteForm
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

  limpiar() {
    this.clienteForm.reset();
    $('#exampleModal').modal('hide');
    this.spinnerEspere = false;
    this.listarCiudades(this.provinciasList[0].idProvincia ?? '');
    this.clienteForm.patchValue({
      idProvincia: this.provinciasList[0].idProvincia ?? '',
      idTipoIdentificacion:
        this.tipoIdentificacionesList[1].idTipoIdentificacion ?? '',
    });
  }

  destruirComponente() {
    const component = this.viewContainerRef.createComponent(
      ModalClientesComponent
    );
    if (component) {
      component.destroy();
      alert('destruido');
    }
  }

  guardar(cliente: Clientes) {
    this.spinnerEspere = true;
    this.spinnerGuardar = false;

    if (this.clienteForm.invalid) {
      this.validator.validarTodo(this.clienteForm, this.el);
      this.spinnerEspere = false;
      this.spinnerGuardar = true;
      return;
    }

    cliente.telefono = cliente.telefono?.toString();

    this.clientesServices.insertar(cliente).subscribe({
      next: (res) => {
        if (res == 'ok') {
          this.toast.show_success('Clientes', 'Cliente Guardado Con Éxito');
          this.limpiar();
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }

        if (res == 'repetido') {
          this.toast.show_warning('Clientes', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.show_error('Clientes', 'Error al guardar el Cliente');
      },
    });
  }

  listarCiudades(idProvincia: any) {
    this.ciudadesServices.listar(idProvincia).subscribe({
      next: (res) => {
        this.ciudadesList = res;
        this.clienteForm
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

  cambiarValidacion(evento: any) {
    this.clienteForm.controls['identificacion'].clearValidators();
    this.clienteForm.controls['identificacion'].setValidators([
      Validators.required,
    ]);
    if (evento == '893ed699-7e94-44a8-befd-414026a2a918') {
      this.clienteForm.controls['identificacion'].setValidators([
        Validators.required,
        cedulaRuc(),
      ]);
    }

    if (parseInt(evento.value) == 2) {
      this.clienteForm.controls['identificacion'].setValidators([
        Validators.required,
      ]);
    }

    this.clienteForm.get('identificacion')?.setValue('');
  }

  setearValorRepresentante(evento: any) {
    this.clienteForm.get('representante')?.setValue(evento.value);
  }

  listarTiposNotificaciones() {
    this.tipoIdentificacionesServices.listar().subscribe({
      next: (res) => {
        this.tipoIdentificacionesList = res;

        this.selectedTipoNotificacion = this.tipoIdentificacionesList.find(
          (item) => item.nombre === 'Cedula/Ruc'
        );

        this.clienteForm
          .get('idTipoIdentificacion')
          ?.setValue(this.selectedTipoNotificacion.idTipoIdentificacion);

        this.spinnerCargar = false;
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
        this.spinnerCargar = false;
      },
    });
  }

  listarProvincias() {
    this.provinciasServices.listar().subscribe({
      next: (res) => {
        this.provinciasList = res;
        this.clienteForm.patchValue(
          Object.assign({ idProvincia: this.idProvincia })
        );
        this.listarCiudades(this.idProvincia);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Al listar los Tipos de Identificaciones'
        );
      },
    });
  }
}
