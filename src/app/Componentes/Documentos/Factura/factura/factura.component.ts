import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { cedulaRuc } from 'src/app/Compartidos/Validaciones/cedulaRuc';
import { ClientesService } from 'src/app/Servicios/clientes.service';
import { SriService } from 'src/app/Servicios/sri.service';
declare var $: any;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent {
  fechaActual: Date = new Date();
  fechaFormateada: any;
  spinnerIdentificacion: boolean = false;



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

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private datePipe: DatePipe,
    private clientesServices: ClientesService,
    private toast: ToastComponent,
    private sriServices: SriService
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('.formaPago').click();
    this.fechaFormateada = this.datePipe.transform(
      this.fechaActual,
      'yyyy-MM-dd'
    );
  }

  cargarContribuyente(evento: any) {
    this.spinnerIdentificacion = true;

    this.clientesServices.cargarPorIdentificacion(evento.value).subscribe({
      next: (res) => {
        this.spinnerIdentificacion = false;

        if (res == null) {
          this.toast.show_warning('Cliente', 'No Registrado');
          $('#ModalNuevoCliente').modal('show');
          // this.sriServices.consultarContribuyente(evento.value).subscribe({
          //   next: (res) => {

          //     console.log(res);
          //   },
          //   error: (err) => {},
          // });
        }
      },
      error: (err) => {
        this.spinnerIdentificacion = false;
        this.toast.show_error('Error', 'Al Cargar el Cliente');
      },
    });
  }


  cerrarModalWarning() {
    $('#ModalNuevoCliente').modal('hide');
  }
}
