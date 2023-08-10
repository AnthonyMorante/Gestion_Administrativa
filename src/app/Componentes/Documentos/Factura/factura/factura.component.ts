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
import { IvasService } from 'src/app/Servicios/ivas.service';
import { FormaPagosService } from 'src/app/Servicios/forma-pagos.service';
import { TiempoFormaPagosService } from 'src/app/Servicios/tiempo-forma-pagos.service';
import { TiempoFormaPagos } from 'src/app/Interfaces/TiempoFormaPagos';
import { FormaPagos } from 'src/app/Interfaces/FormaPagos';
import { event } from 'jquery';

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
  DetallePreciosList: any[] = [];
  DetalleProductosList: any[] = [];
  DetalleIvasList: any[] = [];
  FormaPagosList: FormaPagos[] = [];
  TiempoFormaPagosList: TiempoFormaPagos[] = [];
  totalVentas: any;
  facturaForm: FormGroup;
  editarDetalleProductoForm: FormGroup;
  acumulador12:number=0;
  subtotal12:number=0;
  subtotal0:number=0;
  subtotal:number=0;
  descuento:number=0;
  idDetalleProducto:string="";
  informacionAdicional: any;
  formaPagos: any;
  acumFormaPago:number=0;




 

  


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
    private ivasService: IvasService,
    private formaPagosService: FormaPagosService,
    private tiempoFormaPagosService: TiempoFormaPagosService,
  ) {


    this.facturaForm = this.fb.group({
      idCliente: new FormControl(),
      // identificacion: new FormControl('', [Validators.required, cedulaRuc()]),
      // razonSocial: new FormControl('', Validators.required),
      // telefono: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required, Validators.email]),
      // direccion: new FormControl('', Validators.required),

      identificacion: new FormControl(''),
      razonSocial: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      direccion: new FormControl(''),

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
      totalFactura: new FormControl(this.decimalPipe.transform(0.00, '1.2-2'), [Validators.required]),      
      informacionAdicional: this.fb.array([]),
      nombreInformacionAdicional:new FormControl(),
      valorInformacionAdicional:new FormControl(),
      idFormaPago: new FormControl([Validators.required]),
      idTiempoFormaPago: new FormControl(),
      plazoFormaPago: new FormControl(),
      valorFormaPago: new FormControl(),
      formaPago: this.fb.array([]),

      
    });




    this.informacionAdicional = this.facturaForm.get('informacionAdicional') as FormArray;
    this.formaPagos = this.facturaForm.get('formaPago') as FormArray;

    



    this.editarDetalleProductoForm = this.fb.group({

      idPrecio: new FormControl(),
      nombre: new FormControl(),
      precio: new FormControl(),
      cantidad: new FormControl(),
      total: new FormControl(),
      descuento: new FormControl(),
      iva: new FormControl(),
      totalIva: new FormControl(),
      idIva: new FormControl(),
      
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
      this.listarIvas();
      this.listarEstablecimiento(this.idEmpresa);
      this.listarPuntoEmision(this.idEmpresa);
      this.listarSecuenciales(this.idEmpresa);
      this.listarDocumentosEmitir(1);
      this.listarProductos(); 
      this.listarFormaPagos();
      this.listarTiempoFormaPagos();
      
    }
  }


  numerosAleatorios() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }




  


  agregarInformacionAdicional(){


   let  nombreInformacionAdicional = this.facturaForm.get("nombreInformacionAdicional");
   let  valorInformacionAdicional = this.facturaForm.get("valorInformacionAdicional");


   (this.facturaForm.get('informacionAdicional') as FormArray).push(
    this.fb.group({
      id:this.numerosAleatorios(),
      nombre:nombreInformacionAdicional?.value,
      valor: valorInformacionAdicional?.value
    })
  );

  nombreInformacionAdicional?.setValue("");
  valorInformacionAdicional?.setValue("");


 
  }


  
  quitarFormaPago(idFormaPago: any) {

    const formaPago = this.facturaForm.get(
      'formaPago'
    ) as FormArray;
    const index = formaPago.value.findIndex(
      (x: any) => x.idFormaPago === idFormaPago
    );

    if (index !== -1) {
      formaPago.removeAt(index);
    }

    this.calcularFormaPago();
 
  }


  quitarInformacionAdicional(id: any) {

    const informacionAdicional = this.facturaForm.get(
      'informacionAdicional'
    ) as FormArray;
    const index = informacionAdicional.value.findIndex(
      (x: any) => x.id === id
    );

    if (index !== -1) {
      informacionAdicional.removeAt(index);
    }
  }


  quitarDetalleProducto(idProducto:string){

    const detalleProducto = this.facturaForm.get('detalleFactura') as FormArray;
    const indexDetalleProductoForm = detalleProducto.value.findIndex((x: any) => x.idProducto === idProducto);
    if (indexDetalleProductoForm !== -1) {
      detalleProducto.removeAt(indexDetalleProductoForm);
      let index= this.DetalleProductosList.findIndex(x=>x.idProducto === idProducto);
      this.DetalleProductosList.splice(index,1);
    }
    
    this.calcularDetalle();
  }



  comprobarSiExisteProductoDetalle(idProducto:string){

    const detalleProducto = this.facturaForm.get('detalleFactura') as FormArray;
    const indexDetalleProductoForm = detalleProducto.value.findIndex((x: any) => x.idProducto === idProducto);
    if (indexDetalleProductoForm !== -1) {


      return true;
      

    }
    return false;

  }


  calcularEditarDetallePrecio(){

    const selectPrecios: HTMLSelectElement = this.el.nativeElement.querySelector("#detallePrecio");
    const selectDetalleIva: HTMLSelectElement = this.el.nativeElement.querySelector("#detalleIva");
    


    let cantidad = this.editarDetalleProductoForm.get("cantidad")?.value;
    let descuento = this.editarDetalleProductoForm.get("descuento")?.value;
    const precioSeleccionado = selectPrecios.options[selectPrecios.selectedIndex].getAttribute('data-item-totalIva') ?? "" ;
    const ivaSeleccionado = selectDetalleIva.options[selectDetalleIva.selectedIndex].getAttribute('data-item-porcentaje')??"";
    let valorSinIva= parseFloat(((parseFloat(precioSeleccionado)) / (1 + parseFloat(ivaSeleccionado))).toFixed(2));
    let valoCantidadSinIva= parseFloat((valorSinIva * parseFloat(cantidad)).toFixed(2));
    let sutotal = parseFloat((valoCantidadSinIva - parseFloat(descuento)).toFixed(2))
    let valoriva = parseFloat((sutotal * parseFloat (ivaSeleccionado)).toFixed(2));
    let valorTotalIva = parseFloat((sutotal + valoriva).toFixed(2));

    if(descuento==null || descuento ==""){

      this.editarDetalleProductoForm.get("descuento")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.calcularEditarDetallePrecio();
      return;
    }

    if(cantidad==null || cantidad =="" || cantidad==0 || cantidad=="0"){

      this.editarDetalleProductoForm.get("cantidad")?.setValue(1);
      this.calcularEditarDetallePrecio();
      return;
    }

    


 this.editarDetalleProductoForm.get("precio")?.setValue(this.decimalPipe.transform(valorSinIva, '1.2-2'));
 this.editarDetalleProductoForm.get("total")?.setValue(this.decimalPipe.transform(sutotal, '1.2-2'));
 this.editarDetalleProductoForm.get("iva")?.setValue(this.decimalPipe.transform(valoriva, '1.2-2'));
 this.editarDetalleProductoForm.get("totalIva")?.setValue(this.decimalPipe.transform(valorTotalIva, '1.2-2'));

    
  


    


  }



  agregarProducto(){


    if (this.facturaForm.invalid) {
      this.validator.validarTodo(this.facturaForm, this.el);
      return;
    }


 


    let idProducto = this.facturaForm.get("idProducto")?.value;
    
    let comprobar= this.comprobarSiExisteProductoDetalle(idProducto)


    if (idProducto==null) {

      this.toast.show_warning(
        'Producto',
        'Agregue un Producto'
      );
      return;
    }
    

    if (comprobar) {

      this.toast.show_warning(
        'Producto',
        'Ya Se Encuentra Agregado'
      );
      return;
    }
    

    let valor = this.facturaForm.get("valor")?.value;
    let cantidad = this.facturaForm.get("cantidad")?.value;
    let total = this.facturaForm.get("total")?.value;
    total = total.replace(",","");  
    let producto = this.ProductosList.find(x=>x.idProducto===idProducto);
    let valorOriginal= (parseFloat((parseFloat(total) / ( 1 + (producto?.idIvaNavigation?.valor ?? 0))).toFixed(2)));
  

    

   
    const selectElement: HTMLSelectElement = this.el.nativeElement.querySelector("#precios");
    const idDetallePrecioProducto = selectElement.options[selectElement.selectedIndex].getAttribute('data-item-idDetallePrecioProducto');



    (this.facturaForm.get('detalleFactura') as FormArray).push(
      this.fb.group({
        codigo:producto?.codigo,
        idProducto: producto?.idProducto,
        nombre: producto?.nombre,
        nombrePorcentaje: producto?.idIvaNavigation?.nombre,
        valorPorcentaje:producto?.idIvaNavigation?.valor ?? 0,
        porcentaje: parseFloat((total - valorOriginal).toFixed(2)),
        valor:valor,
        cantidad:cantidad,
        total:parseFloat (total),
        totalSinIva:valorOriginal,
        idIva:producto?.idIvaNavigation?.idIva,
        precios: this.fb.array(this.PreciosList),
        idDetallePrecioProducto:idDetallePrecioProducto,
      })
    );


   


    this.calcularDetalle();
    this.DetalleProductosList=this.facturaForm.value.detalleFactura;
    this.facturaForm.get("valor")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
    this.facturaForm.get("total")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
    this.facturaForm.get("cantidad")?.setValue(1);
    this.facturaForm.get("idProducto")?.setValue(null);
  }



  calcularDetalle(){
 

    let detalleFactura =this.facturaForm.value.detalleFactura;


    this.acumulador12=0;
    this.subtotal12=0;
    this.subtotal0=0;
    this.subtotal=0;
    this.descuento=0;


    if(detalleFactura.length===0){

      this.facturaForm.get("subtotal12")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("subtotal0")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("subtotal")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("iva12")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("totalFactura")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("totDescuento")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("valorFormaPago")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
      this.facturaForm.get("plazoFormaPago")?.setValue(1);
      
      return;


    }

    detalleFactura.forEach((item:any) => {

  
      if(item.nombrePorcentaje==="12%"){

        let valorSinIva= parseFloat((item.total - item.porcentaje).toFixed(2));
        this.subtotal12= parseFloat((this.subtotal12 + valorSinIva).toFixed(2));
 
      }

      if(item.nombrePorcentaje==="0%"){

        this.subtotal0= parseFloat((this.subtotal0 + item.total).toFixed(2));
  

      }
      
      // let descuento =  parseFloat(this.facturaForm.get("descuento")?.value);
  
      this.facturaForm.get("subtotal12")?.setValue(parseFloat(this.subtotal12.toFixed(2)));
      this.facturaForm.get("subtotal0")?.setValue(parseFloat(this.subtotal0.toFixed(2)));
      this.subtotal =this.subtotal0 + this.subtotal12;
      this.facturaForm.get("subtotal")?.setValue(parseFloat (this.subtotal.toFixed(2)));
      this.acumulador12 = parseFloat((this.subtotal12 * 0.12).toFixed(2)) ;
      this.facturaForm.get("iva12")?.setValue(parseFloat (this.acumulador12.toFixed(2)));
      let totalFactura = (this.subtotal + this.acumulador12);
      this.facturaForm.get("totalFactura")?.setValue(parseFloat (totalFactura.toFixed(2)));
      this.facturaForm.get("valorFormaPago")?.setValue(totalFactura);
      this.facturaForm.get("plazoFormaPago")?.setValue(1);

  
 
    


      
      

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



  asignarvalorFormaPago(evento: any){
    
    let valor =  this.facturaForm.get('valorFormaPago');
    let totalFactura = parseFloat (this.facturaForm.get("totalFactura")?.value);

    if(evento.value ==""){
      return;
    } 
    if(parseFloat(valor?.value)> parseFloat((totalFactura  - this.acumFormaPago  ).toFixed(2))){
      valor?.setValue(parseFloat((totalFactura  - this.acumFormaPago  ).toFixed(2)));
      return
      
    }

    if(this.acumFormaPago== totalFactura){

      this.facturaForm.get('valorFormaPago')?.setValue(parseFloat ((this.acumFormaPago - totalFactura).toFixed(2)));
      return
    }

    if(parseFloat (evento.value) > totalFactura){

      valor?.setValue(this.decimalPipe.transform(totalFactura, '1.2-2'))
    
    }

  }



  agregarFormaPago(){


    

    const selectPrecios: HTMLSelectElement = this.el.nativeElement.querySelector("#idFormaPago");
    const selectTiempo: HTMLSelectElement = this.el.nativeElement.querySelector("#idTiempoFormaPago");
    let formaPago = selectPrecios.options[selectPrecios.selectedIndex].getAttribute('data-item-formaPago') ?? "" ;
    let tiempo = selectTiempo.options[selectTiempo.selectedIndex].getAttribute('data-item-tiempo') ?? "" ;
    let plazo =  this.facturaForm.get('plazoFormaPago')?.value;
    let valor =  this.facturaForm.get('valorFormaPago')?.value;
    // valor=valor.replace(",",".");




    if(valor<=0){

      this.toast.show_warning("Forma Pago","Ya se asignado la Totalidad");
      return
      
    }
    

    (this.facturaForm.get('formaPago') as FormArray).push(
      this.fb.group({
        idFormaPago:selectPrecios.value,
        formaPago:formaPago,
        plazo: plazo,
        valor:  parseFloat(valor),
        tiempo: tiempo
      })
    );

   
  this.calcularFormaPago();


  }


  calcularFormaPago(){

    let totalFactura =  this.facturaForm.get('totalFactura')?.value;

    if(this.formaPagos?.controls.length.length !=0 ){

      this.acumFormaPago=0;

      this.formaPagos?.controls.forEach((item:any) => {

        this.acumFormaPago= this.acumFormaPago + item.value.valor;
      
      });
 
  
      let restante = parseFloat((parseFloat(totalFactura) - this.acumFormaPago).toFixed(2));

      if(restante<0){
      alert("");
       return
        
      }




      this.facturaForm.get('valorFormaPago')?.setValue(restante);

  

    }

  }

  guardarFactura(){


    console.log(this.facturaForm.value);

  }


  asignarCantidad(evento: any) {
    this.calcularTotalVenta();
  }

  calcularTotalVenta() {



    if(this.facturaForm.get('cantidad')?.value == null){
      return
    }

    let valor = this.facturaForm.get('valor')?.value?.toFixed(2);
    let cantidad = this.facturaForm.get('cantidad')?.value?.toFixed(2);

 

    if (Number.isNaN(parseFloat(cantidad)) || cantidad==undefined) {
      this.facturaForm.get('total')?.setValue(1);
      return;
    }


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
          idDetallePrecioProducto:"default", 
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
              idDetallePrecioProducto:item.idDetallePrecioProducto,
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


  seleccionarTexto(){

    this.el.nativeElement.querySelector("#descuento").select();

  }


  seleccionarTextoCantidadDetalle(){

    this.el.nativeElement.querySelector("#cantidadDetalle").select();

  }




  abrirModalEditarDetalle(){

    $('#ModalEditarDetalle').modal('show');

  }



  listarIvas() {
    this.ivasService.listar().subscribe({
      next: (res) => {
       
       this.DetalleIvasList= res;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Ivas');
      },
    });
  }

  cargarModalEditarDetalle(idProducto:string){
    this.idDetalleProducto=idProducto;
    let producto = this.DetalleProductosList.find(x=>x.idProducto ===idProducto);
    this.DetallePreciosList= producto.precios;
    let valorIndividualOriginal= (parseFloat((parseFloat(producto.valor) / ( 1 + (producto?.valorPorcentaje ?? 0))).toFixed(2)));
    this.editarDetalleProductoForm.get("nombre")?.setValue(producto.nombre);
    this.editarDetalleProductoForm.get("idPrecio")?.setValue(producto.idDetallePrecioProducto);
    this.editarDetalleProductoForm.get("precio")?.setValue(valorIndividualOriginal);
    this.editarDetalleProductoForm.get("cantidad")?.setValue(producto.cantidad);
    this.editarDetalleProductoForm.get("total")?.setValue(producto.totalSinIva);
    this.editarDetalleProductoForm.get("descuento")?.setValue(this.decimalPipe.transform(0.00, '1.2-2'));
    this.editarDetalleProductoForm.get("iva")?.setValue( this.decimalPipe.transform(producto.porcentaje, '1.2-2') );
    this.editarDetalleProductoForm.get("totalIva")?.setValue(this.decimalPipe.transform(producto.total, '1.2-2'));
    this.editarDetalleProductoForm.get("totalIva")?.setValue(this.decimalPipe.transform(producto.total, '1.2-2'));
    this.editarDetalleProductoForm.get("idIva")?.setValue(producto.idIva);
    setTimeout(() => {this.calcularEditarDetallePrecio();}, 0);
    $('#ModalEditarDetalle').modal('show');
  }


  guardarModalEditarDetalle(){

    let producto= this.DetalleProductosList.find(x=>x.idProducto== this.idDetalleProducto);
    producto.totalSinIva=  parseFloat (this.editarDetalleProductoForm.get("precio")?.value.replace(",",""));
    console.log(this.editarDetalleProductoForm.get("precio")?.value.replace(",",""))
    producto.cantidad=  parseFloat (this.editarDetalleProductoForm.get("cantidad")?.value);
    producto.porcentaje=  parseFloat (this.editarDetalleProductoForm.get("iva")?.value);
    producto.total=  parseFloat (this.editarDetalleProductoForm.get("totalIva")?.value.replace(",",""));
    const detalleFacturaForm = this.facturaForm.get('detalleFactura' ) as FormArray;
    let productoForm = detalleFacturaForm.value.find((x:any)=>x.idProducto===this.idDetalleProducto);
    productoForm.totalSinIva=  parseFloat (this.editarDetalleProductoForm.get("precio")?.value.replace(",",""));
    productoForm.cantidad=  parseFloat (this.editarDetalleProductoForm.get("cantidad")?.value);
    productoForm.porcentaje=  parseFloat (this.editarDetalleProductoForm.get("iva")?.value.replace(",",""));
    productoForm.total=  parseFloat (this.editarDetalleProductoForm.get("totalIva")?.value.replace(",",""));
    const selectDetalleIva: HTMLSelectElement = this.el.nativeElement.querySelector("#detalleIva");
    const ivaSeleccionado = selectDetalleIva.options[selectDetalleIva.selectedIndex].getAttribute('data-item-porcentaje')??"";
    const ivaSeleccionadoNombre = selectDetalleIva.options[selectDetalleIva.selectedIndex].getAttribute('data-item-nombre')??"";
    productoForm.valorPorcentaje= parseFloat (ivaSeleccionado);
    productoForm.nombrePorcentaje= ivaSeleccionadoNombre;
    productoForm.idIva= this.editarDetalleProductoForm.get("idIva")?.value;
    this.calcularDetalle();
    $('#ModalEditarDetalle').modal('hide');
    


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


  listarFormaPagos() {
    this.formaPagosService.listar().subscribe({
      next: (res) => {
        this.FormaPagosList = res;
        this.facturaForm.get('idFormaPago')?.setValue(this.FormaPagosList[4]?.idFormaPago);
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar las Formas Pagos');
      },
    });
  }


  listarTiempoFormaPagos() {
    this.tiempoFormaPagosService.listar().subscribe({
      next: (res) => {
        this.TiempoFormaPagosList = res;
        this.facturaForm.get('idTiempoFormaPago')?.setValue(this.TiempoFormaPagosList[0]?.idTiempoFormaPago);
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar las Formas Pagos');
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
