import { DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  ComponentRef,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { SecuencialesService } from 'src/app/Servicios/secuenciales.service';
import { Secuenciales } from 'src/app/Interfaces/Secuenciales';
import { Validator } from 'src/app/Compartidos/Validaciones/validations';

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
  token: string | null = '';
  idEmpresa: string | null = '';
  EstablecimientosList: Establecimientos[] = [];
  PuntoEmisionList: PuntoEmisiones[] = [];
  SecuencialesList: Secuenciales[] = [];
  DocumentosEmitirList: DocumentosEmitir[] = [];
  ProductosList: Productos[] = [];
  establecimiento: string | null = '';
  puntoEmision: string | null = '';
  secuencial: string | null = '';
  PreciosList: any[] = [];
  DetalleProductosList: any[] = [];
  totalVentas: any;
  facturaForm: FormGroup;
  acumulador12:number=0;
  subtotal12:number=0;
  subtotal0:number=0;
  subtotal:number=0;




 

  


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
    private secuencialesService: SecuencialesService,
    private documentosEmitirService: DocumentosEmitirService,
    private productosServices: ProductosService,
    private ngSelectConfig: NgSelectConfig,
    private detallePrecioProductosServices: DetallePrecioProductosService,
    private decimalPipe: DecimalPipe,
    private fb: FormBuilder,
    private validator: Validator,
    private el: ElementRef,
  ) {


    this.facturaForm = this.fb.group({
      idCliente: new FormControl(),
      identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
      razonSocial: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', Validators.required),
      idEstablecimiento: new FormControl(),
      idPuntoEmision: new FormControl(),
      observacion: new FormControl(),
      idCiudad: new FormControl(''),
      idProvincia: new FormControl(''),
      idTipoIdentificacion: new FormControl(''),
      idDocumentoEmitir: new FormControl(),
      idProducto: new FormControl(),
      precios: new FormControl([Validators.required]),
      valor: new FormControl(0, [Validators.required]),
      cantidad: new FormControl(1, [Validators.required]),
      total: new FormControl('0', [Validators.required]),
      detalleFactura: this.fb.array([]),
      subtotal: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      subtotal12: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      subtotal0: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      descuento: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      totDescuento: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      iva12: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),
      totalFactura: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required])
      
    });


  }

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
      this.listarSecuenciales(this.idEmpresa);
      this.listarDocumentosEmitir(1);
      this.listarProductos();
    }
  }


  eliminarProducto(idProducto:string){

   let index= this.DetalleProductosList.findIndex(x=>x.idProducto === idProducto);
   this.DetalleProductosList.splice(index,1);
   console.log(this.DetalleProductosList);
   console.log(this.facturaForm.value.detalleFactura);
  return
  }


  agregarProducto(){


    if (this.facturaForm.invalid) {
      this.validator.validarTodo(this.facturaForm, this.el);
      return;
    }


    let idProducto = this.facturaForm.get("idProducto")?.value;
    let valor = this.facturaForm.get("valor")?.value;
    let cantidad = this.facturaForm.get("cantidad")?.value;
    let total = this.facturaForm.get("total")?.value;
    let producto = this.ProductosList.find(x=>x.idProducto===idProducto);


    (this.facturaForm.get('detalleFactura') as FormArray).push(
      this.fb.group({
        codigo:producto?.codigo,
        idProducto: producto?.idProducto,
        nombre: producto?.nombre,
        nombrePorcentaje: producto?.idIvaNavigation?.nombre,
        valorPorcentaje:producto?.idIvaNavigation?.valor ?? 0,
        porcentaje: parseFloat((parseFloat(total) * (producto?.idIvaNavigation?.valor ?? 0)).toFixed(2)),
        valor:valor,
        cantidad:cantidad,
        total:parseFloat (total),
      })
    );

    this.calcularDetalle(this.facturaForm.value.detalleFactura);
    this.DetalleProductosList=this.facturaForm.value.detalleFactura;



  }



  calcularDetalle(detalleFactura:any){



    this.acumulador12=0;
    this.subtotal12=0;
    this.subtotal0=0;
    this.subtotal=0;

    detalleFactura.forEach((item:any) => {

      if(item.nombrePorcentaje==="12%"){

        let valorSinIva= parseFloat((item.total - item.porcentaje).toFixed(2));
        this.acumulador12= parseFloat((this.acumulador12 + item.porcentaje).toFixed(2));
        this.subtotal12= parseFloat((this.subtotal12 + valorSinIva).toFixed(2));
 
      }

      if(item.nombrePorcentaje==="0%"){

        this.subtotal0= parseFloat((this.subtotal0 + item.total).toFixed(2));
  

      }
      
      this.subtotal= this.subtotal0 + this.subtotal12;
      this.facturaForm.get("subtotal")?.setValue(this.subtotal.toFixed(2));
      this.facturaForm.get("subtotal12")?.setValue(this.subtotal12.toFixed(2));
      this.facturaForm.get("subtotal0")?.setValue(this.subtotal0.toFixed(2));
      this.facturaForm.get("iva12")?.setValue(this.acumulador12.toFixed(2));
      let totalFactura = (this.subtotal + this.acumulador12);
      this.facturaForm.get("totalFactura")?.setValue(totalFactura.toFixed(2));


      

      
    

    });
}


  
  eventPredefault(event: KeyboardEvent) {

    if (event.key === "Enter") {

      event.preventDefault();
    }
  }

  asignarValor(evento: any) {
    let valor = parseFloat(evento.value).toFixed(2);

    this.facturaForm.get('valor')?.setValue(parseFloat(valor));

    this.calcularTotalVenta();
  }

  asignarCantidad(evento: any) {
    this.calcularTotalVenta();
  }

  calcularTotalVenta() {
    let valor = this.facturaForm.get('valor')?.value?.toFixed(2);
    let cantidad = this.facturaForm.get('cantidad')?.value?.toFixed(2);
    let total = parseFloat(cantidad ?? '') * parseFloat(valor ?? '');
    let valorTotalConvertido = total.toFixed(2);
    this.facturaForm.get('total')?.setValue(this.decimalPipe.transform(valorTotalConvertido, '1.2-2'));


    if (Number.isNaN(total)) {
      this.facturaForm.get('total')?.setValue('0');
      return;
    }
  }

  cambiarEstablecimiento(evento: any) {
    let establecimiento = this.EstablecimientosList.find(
      (x) => x.idEstablecimiento === evento.value
    );
    this.establecimiento = this.padLeft.convert(establecimiento?.nombre, 3);
  }

  cambiarPuntoEmision(evento: any) {
    let puntoEmision = this.PuntoEmisionList.find(
      (x) => x.idPuntoEmision === evento.value
    );
    this.puntoEmision = this.padLeft.convert(puntoEmision?.nombre, 3);
  }

  limpiarVenta() {

    this.facturaForm.get('valor')?.setValue(0);
    this.facturaForm.get('cantidad')?.setValue(1);
    this.facturaForm.get('total')?.setValue('0');
  }

  cargarProducto(evento: any) {
    this.PreciosList = [];

    if (evento === undefined || evento ==="") {

      this.limpiarVenta();
      return;
    }

    let producto = this.ProductosList.find((x) => x.idProducto === evento);

    this.detallePrecioProductosServices.listar(evento).subscribe({
      next: (res) => {
        let precio = {

          codigo:producto?.codigo,
          idProducto: producto?.idProducto,
          total: producto?.precio,
          totalIva: producto?.totalIva,
          porcentaje: producto?.idIvaNavigation?.valor,
          idIva: producto?.idIva,
        };

        this.PreciosList.push(precio);

        if (res.length != 0) {
          res.forEach((item) => {
            let precioDetalle = {
              idProducto: item.idProducto,
              total: item.total,
              totalIva: item.totalIva,
              porcentaje: item.porcentaje,
              idIva: item.idIva,
            };

            this.PreciosList.push(precioDetalle);
          });
        }

        this.facturaForm.get('precios')?.setValue(this.PreciosList[0].totalIva);

        this.facturaForm.get('valor')?.setValue(this.PreciosList[0].totalIva);

        this.calcularTotalVenta();
      },
      error: () => {
        this.toast.show_error(
          'Error',
          'Al listar el Detalle del Precio Producto'
        );
      },
    });
  }

  listarProductos() {
    this.productosServices.listarFactura(this.idEmpresa).subscribe({
      next: (res) => {
        this.ProductosList = res;
        this.facturaForm.get('idProducto')?.setValue('');
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Productos');
      },
    });
  }

  listarDocumentosEmitir(codigo: number) {
    this.documentosEmitirService.listar(codigo).subscribe({
      next: (res) => {
        this.DocumentosEmitirList = res;
        this.facturaForm
          .get('idDocumentoEmitir')
          ?.setValue(this.DocumentosEmitirList[0].idDocumentoEmitir);
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Establecimiento');
      },
    });
  }

  listarEstablecimiento(idEmpresa: string) {
    this.establecimientoService.listar(idEmpresa).subscribe({
      next: (res) => {
        this.EstablecimientosList = res;

        this.facturaForm
          .get('idEstablecimiento')
          ?.setValue(this.EstablecimientosList[0].idEstablecimiento);
        this.establecimiento = this.padLeft.convert(
          this.EstablecimientosList[0].nombre,
          3
        );
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Establecimiento');
      },
    });
  }

  listarSecuenciales(idEmpresa: string) {
    this.secuencialesService.listar(idEmpresa).subscribe({
      next: (res) => {
        this.SecuencialesList = res;
        this.secuencial = this.padLeft.convert(
          this.SecuencialesList[0].nombre,
          9
        );
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Establecimiento');
      },
    });
  }

  listarPuntoEmision(idEmpresa: string) {
    this.puntoEmisionService.listar(idEmpresa).subscribe({
      next: (res) => {
        this.PuntoEmisionList = res;
        this.facturaForm
          .get('idPuntoEmision')
          ?.setValue(this.PuntoEmisionList[0].idPuntoEmision);
        this.puntoEmision = this.padLeft.convert(
          this.PuntoEmisionList[0].nombre,
          3
        );
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Punto Emision');
      },
    });
  }

  emitirCedulaComponente(identificacion: string | null) {
    this.cedulaService.disparadorCedula.emit({
      cedula: identificacion,
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

        this.facturaForm.get('razonSocial')?.setValue(res?.razonSocial ?? '');
        this.facturaForm.get('telefono')?.setValue(res.telefono ?? '');
        this.facturaForm.get('email')?.setValue(res.email ?? '');
        this.facturaForm.get('direccion')?.setValue(res.direccion ?? '');
      },
      error: (err) => {
        this.spinnerIdentificacion = false;
        this.toast.show_error('Error', 'Al Cargar el Cliente');
      },
    });
  }

  limpiarDatosContribuyentes(evento: any) {
    if (evento.value == '') {
      this.facturaForm.get('razonSocial')?.setValue('');
      this.facturaForm.get('telefono')?.setValue('');
      this.facturaForm.get('email')?.setValue('');
      this.facturaForm.get('direccion')?.setValue('');

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
    let identificacion = this.facturaForm?.get('identificacion')?.value;
    this.emitirCedulaComponente(`${identificacion}`);
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
}
