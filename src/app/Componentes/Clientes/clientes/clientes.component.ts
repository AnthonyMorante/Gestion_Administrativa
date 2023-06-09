import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastComponent } from 'src/app/Compartidos/Shared/toast';
import { Validator } from 'src/app/Compartidos/Shared/validations';
import { Ciudades } from 'src/app/Interfaces/Ciudades';
import { Clientes } from 'src/app/Interfaces/Clientes';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { TipoIdentificaciones } from 'src/app/Interfaces/TipoIdentificaciones';
import { CiudadesService } from 'src/app/Servicios/ciudades.service';
import { ProvinciasService } from 'src/app/Servicios/provincias.service';
import { TipoIdentificacionesService } from 'src/app/Servicios/tipo-identificaciones.service';
import { cedulaRuc } from 'src/app/Validaciones/cedulaRuc';

declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {
  clienteForm = new FormGroup({
    idCliente: new FormControl(),
    identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    observacion: new FormControl(),
    fechaRegistro: new FormControl(),
    codigo: new FormControl(),
    idCiudad: new FormControl('', [Validators.required]),
    idProvincia: new FormControl('', [Validators.required]),
    idTipoidentificacion: new FormControl('', [Validators.required]),
    idCiudadNavigation: new FormControl(),
    idTipoIdentificacionNavigation: new FormControl(),
  });

  tipoIdentificacionesList: TipoIdentificaciones[] = [];
  provinciasList: Provincias[] = [];
  ciudadesList: Ciudades[] = [];

  provinciaDefault:any;
  ciudadDefault:any;
  tipoIdentificacionDefault:any;
  selectedProvincia:any;
  selectedTipoNotificacion:any;

  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private tipoIdentificacionesServices: TipoIdentificacionesService,
    private provinciasServices: ProvinciasService,
    private ciudadesServices: CiudadesService,
    private ngSelectConfig: NgSelectConfig,
  ) {

    this.ngSelectConfig.notFoundText = 'No existen coincidencias';

  }

  ngOnInit() {
    this.listarTiposNotificaciones();
    this.listarProvicias();

  }

  listarTiposNotificaciones() {
    this.tipoIdentificacionesServices.listar().subscribe({
      next: (res) => {
        this.tipoIdentificacionesList = res;
        this.selectedTipoNotificacion = this.tipoIdentificacionesList.find(item => item.nombre === "Cedula/Ruc");
        this.clienteForm.get('idTipoidentificacion')?.setValue(this.selectedTipoNotificacion.idTipoIdentificacion);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Error al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  listarProvicias() {
    this.provinciasServices.listar().subscribe({
      next: (res) => {
        this.provinciasList = res;
         this.selectedProvincia = this.provinciasList.find(item => item.nombre === "Tungurahua");
         this.clienteForm.get('idProvincia')?.setValue(this.selectedProvincia.idProvincia);
        this.listarCiudades(this.clienteForm.get('idProvincia')?.value);
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Error al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  listarCiudades(idProvincia:any) {

  
    this.ciudadesServices.listar(idProvincia).subscribe({
      next: (res) => {
        this.ciudadesList = res;
        this.clienteForm.get('idCiudad')?.setValue("3f144d9e-aeec-49ee-ac96-7d43290b36bb");
      },
      error: (err) => {
        this.toast.show_error(
          'Error',
          'Error al listar los Tipos de Identificaciones'
        );
      },
    });
  }

  abrirModal() {
    $('#exampleModal').modal('show');
  }


  guardar(cliente: Clientes) {


    return
    if (this.clienteForm.invalid) {
      this.validator.validarTodo(this.clienteForm, this.el);
      return;
    }

  }

  cambiarValidacion(evento: any) {

  
    this.clienteForm.controls['identificacion'].clearValidators();
    this.clienteForm.controls['identificacion'].setValidators([Validators.required]);
    if (evento == "893ed699-7e94-44a8-befd-414026a2a918") {
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

  limpiar() {
    this.clienteForm.reset();
  }

  setearValorRepresentante(evento: any) {
    this.clienteForm.get('representante')?.setValue(evento.value);
  }
}
