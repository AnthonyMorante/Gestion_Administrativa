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
import { ModalClientesComponent } from 'src/app/Componentes/Compartidos/modal-clientes/modal-clientes.component';
import { CedulaService } from 'src/app/Componentes/Servicios/Cedula/cedula.service';
import jwt_decode from 'jwt-decode';
import { EstablecimientosService } from 'src/app/Servicios/establecimientos.service';
import { PuntoEmisionesService } from 'src/app/Servicios/punto-emisiones.service';
import { Establecimientos } from 'src/app/Interfaces/Establecimientos';
import { PuntoEmisiones } from 'src/app/Interfaces/PuntoEmisiones';
import { PadLeftLibrary } from 'src/app/Compartidos/Librerias/padLeft';
import { DocumentosEmitirService } from 'src/app/Servicios/documentos-emitir.service';
import { DocumentosEmitir } from 'src/app/Interfaces/DocumentosEmitir';
import { Productos } from 'src/app/Interfaces/Productos';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DetallePrecioProductosService } from 'src/app/Servicios/detalle-precio-productos.service';
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
  token:string | null="";
  idEmpresa:string | null="";
  EstablecimientosList:Establecimientos [] =[];
  PuntoEmisionList:PuntoEmisiones [] =[];
  DocumentosEmitirList:DocumentosEmitir [] =[];
  ProductosList:Productos [] =[];
  establecimiento:string | null="";
  puntoEmision:string | null ="";
  secuencial:string | null ="";
  hola:string | null="";
  

  facturaForm = new FormGroup({

    idCliente: new FormControl(),
    identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', Validators.required),
    idEstablecimiento: new FormControl(),
    idPuntoEmision: new FormControl(),
    observacion: new FormControl(),
    idCiudad: new FormControl('', [Validators.required]),
    idProvincia: new FormControl('', [Validators.required]),
    idTipoIdentificacion: new FormControl('', [Validators.required]),
    idDocumentoEmitir: new FormControl(),
    idProducto: new FormControl(),
    
  });

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private datePipe: DatePipe,
    private clientesServices: ClientesService,
    private toast: ToastComponent,
    public padLeft: PadLeftLibrary,
    public viewContainerRef: ViewContainerRef,
    private cedulaService: CedulaService,
    private establecimientoService: EstablecimientosService,
    private puntoEmisionService: PuntoEmisionesService,
    private documentosEmitirService: DocumentosEmitirService,
    private productosServices: ProductosService,
    private ngSelectConfig: NgSelectConfig,
    private detallePrecioProductosServices: DetallePrecioProductosService
    
    
  ) {}

  async ngOnInit() {
    this.elementRef.nativeElement.querySelector('.formaPago').click();
    this.fechaFormateada = this.datePipe.transform(
      this.fechaActual,
      'yyyy-MM-dd'
    );

    this.token = localStorage.getItem('token');
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';

    if (this.token != null) {
      const res = jwt_decode(this.token) as { idEmpresa: string };
      this.idEmpresa = res.idEmpresa;
      this.listarEstablecimiento(this.idEmpresa);
      this.listarPuntoEmision(this.idEmpresa);
      this.listarDocumentosEmitir(1);
      this.listarProductos(); 
    }




  }


  cargarProducto(evento: any){

   console.log (this.ProductosList.find(x=> x.idProducto= evento));
  this.detallePrecioProductosServices.listar(evento).subscribe(
     {

      next:(res)=>{


        console.log(res);


      },error:()=>{

        this.toast.show_error('Error', 'Al listar el Detalle del Precio Producto');
      }
     }


   );
  }


  listarProductos(){

    this.productosServices.listarFactura(this.idEmpresa).subscribe({
      next: (res) => {

        this.ProductosList=res;
        this.facturaForm.get("idProducto")?.setValue("");
        
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Productos');
      },
    });

  }



  listarDocumentosEmitir(codigo:number){

    this.documentosEmitirService.listar(codigo).subscribe({


      next:(res)=>{

       this.DocumentosEmitirList= res;
       this.facturaForm.get("idDocumentoEmitir")?.setValue(this.DocumentosEmitirList[0].idDocumentoEmitir)

      },error:(err)=>{

        this.toast.show_error('Error', 'Al listar el Establecimiento');

      }
    })

  }




  listarEstablecimiento(idEmpresa:string){

    this.establecimientoService.listar(idEmpresa).subscribe({


      next:(res)=>{

        this.EstablecimientosList= res;
        this.facturaForm.get("idEstablecimiento")?.setValue(this.EstablecimientosList[0].idEstablecimiento)
        

      },error:(err)=>{

        this.toast.show_error('Error', 'Al listar el Establecimiento');

      }
    })

  }


  listarPuntoEmision(idEmpresa:string){


    this.puntoEmisionService.listar(idEmpresa).subscribe({


      next:(res)=>{

        this.PuntoEmisionList= res;
        this.facturaForm.get("idPuntoEmision")?.setValue(this.PuntoEmisionList[0].idPuntoEmision)
        
      },error:(err)=>{

        this.toast.show_error('Error', 'Al listar el Punto Emision');

      }
    })

    
    
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
      
          $('#ModalNuevoCliente').modal('show');
          return;
        }


        this.facturaForm.get("razonSocial")?.setValue(res?.razonSocial ?? '');
        this.facturaForm.get("telefono")?.setValue(res.telefono ?? '');
        this.facturaForm.get("email")?.setValue(res.email ?? '');
        this.facturaForm.get("direccion")?.setValue(res.direccion ?? '');

      },
      error: (err) => {
        this.spinnerIdentificacion = false;
        this.toast.show_error('Error', 'Al Cargar el Cliente');
      },
    });
  }


  limpiarDatosContribuyentes(evento:any){

    if(evento.value==""){


      this.facturaForm.get("razonSocial")?.setValue('');
      this.facturaForm.get("telefono")?.setValue('');
      this.facturaForm.get("email")?.setValue( '');
      this.facturaForm.get("direccion")?.setValue( '');

      return;

    }



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
