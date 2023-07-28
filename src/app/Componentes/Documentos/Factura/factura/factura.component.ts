import { DatePipe } from '@angular/common';
import {
  Component,
  ComponentRef,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { cedulaRuc } from 'src/app/Compartidos/Validaciones/cedulaRuc';
import { ClientesService } from 'src/app/Servicios/clientes.service';
import { SriService } from 'src/app/Servicios/sri.service';
import { ModalClientesComponent } from 'src/app/Componentes/Compartidos/modal-clientes/modal-clientes.component';
import { CedulaService } from 'src/app/Componentes/Servicios/Cedula/cedula.service';
declare var $: any;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;
  dynamicComponentRef!: ComponentRef<ModalClientesComponent>;

  fechaActual: Date = new Date();
  fechaFormateada: any;
  spinnerIdentificacion: boolean = false;
  component: any;

  facturaForm = new FormGroup({
    idCliente: new FormControl(),
    identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', Validators.required),


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
    public viewContainerRef: ViewContainerRef,
    private cedulaService: CedulaService,
    
    
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('.formaPago').click();
    this.fechaFormateada = this.datePipe.transform(
      this.fechaActual,
      'yyyy-MM-dd'
    );


  }


  emitirCedulaComponente(identificacion:string | null){

    this.cedulaService.disparadorCedula.emit({

 
        cedula:identificacion


    });
  }



  cargarContribuyente(evento: any) {
    this.spinnerIdentificacion = true;

    this.clientesServices.cargarPorIdentificacion(evento.value).subscribe({
      next: (res) => {
        this.spinnerIdentificacion = false;

        if (res == null) {
          // this.toast.show_warning('Cliente', 'No Registrado');
          $('#ModalNuevoCliente').modal('show');
          // this.sriServices.consultarContribuyente(evento.value).subscribe({
          //   next: (res) => {

          //     console.log(res);
          //   },
          //   error: (err) => {},
          // });
        }
        // console.log(res);
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

  abrirModalCliente() {
    this.viewContainerRef.createComponent(ModalClientesComponent);
    $('#ModalCliente').modal('show');
    $('#ModalNuevoCliente').modal('hide');
    let identificacion= this.facturaForm?.get("identificacion")?.value;
    this.emitirCedulaComponente(`${identificacion}`);
  }

  destruirComponente() {

    const component = this.viewContainerRef.createComponent(ModalClientesComponent);
    if(component){

      component.destroy();
      alert("destruido");
    }
  }
}
