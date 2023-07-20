import { Component, ElementRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { Validator } from 'src/app/Compartidos/Validaciones/validations';
import { Ivas } from 'src/app/Interfaces/Ivas';
import { Productos } from 'src/app/Interfaces/Productos';
import { IvasService } from 'src/app/Servicios/ivas.service';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { dosDigitos } from 'src/app/Compartidos/Validaciones/dosDigitos';
import { dosDigitosHasta100 } from 'src/app/Compartidos/Validaciones/dosDigitosHasta100';
import jwt_decode from "jwt-decode";
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  spinner: boolean = true;
  spinnerCargar: boolean = true;
  spinnerEditar: boolean = false;
  spinnerGuardar: boolean = true;
  spinnerEspere: boolean = false;
  idProducto: string = '';
  spinnerWarning: boolean = false;
  ivasList: Ivas[] = [];
  detalleAdicionalesList: any[] = [];
  productoForm: FormGroup;
  token:string | null="";
  idEmpresa:string | null="";

  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private productosServices: ProductosService,
    private ngSelectConfig: NgSelectConfig,
    private ivasServices: IvasService,
    private fb: FormBuilder
  ) {
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';
    this.productoForm = this.fb.group({
      idProducto: new FormControl(),
      codigo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      activo: new FormControl(),
      precio: new FormControl(0, [Validators.required, dosDigitos()]),
      idIva: new FormControl(),
      precioIva: new FormControl([Validators.required]),
      valorIva: new FormControl(),

      totalIva: new FormControl(0, [Validators.required,dosDigitos()]),
      porcentaje: new FormControl(1, [
        Validators.required,
        dosDigitosHasta100(),
      ]),
      utilidad: new FormControl(0),
      detallePrecioProductos: this.fb.array([]),
    });
  }

  ngOnInit() {


    this.token = localStorage.getItem("token");
    if(this.token != null){
      const res = jwt_decode(this.token) as { idEmpresa: string };
      this.idEmpresa = res.idEmpresa;
      this.listarProductos(this.idEmpresa);
      this.listarIvas();
    }




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

  agregarDetallePrecio() {

    if (this.productoForm.invalid) {
      this.validator.validarTodo(this.productoForm, this.el);
      return;
    }


    if (this.detallePrecioProductos.length > 2) {
      this.toast.show_error('Error', 'Registros Permitidos (3)');
      return;
    }

    if (this.productoForm.get('')) {
      this.toast.show_error('Error', 'Registros Permitidos (3)');
      return;
    }

    (this.productoForm.get('detallePrecioProductos') as FormArray).push(
      this.fb.group({
        id: this.numerosAleatorios(),
        totalIva: this.productoForm.get('totalIva')?.value,
        porcentaje: this.productoForm.get('porcentaje')?.value,
        utilidad: this.productoForm.get('utilidad')?.value,
      })
    );

    this.productoForm.get('porcentaje')?.setValue(1);
    this.productoForm.get('utilidad')?.setValue(0);
    this.calcularUtilidad();
  }

  cancelarDetallePrecio() {
    this.productoForm.get('porcentaje')?.setValue(1);
    this.productoForm.get('utilidad')?.setValue(0);
  }

  get detallePrecioProductos(): any[] {
    return (this.productoForm.get('detallePrecioProductos') as FormArray).value;
  }

  quitarDetallePrecioProducto(id: any) {
    const detallePrecioProductos = this.productoForm.get(
      'detallePrecioProductos'
    ) as FormArray;
    const index = detallePrecioProductos.value.findIndex(
      (x: any) => x.id === id
    );

    if (index !== -1) {
      detallePrecioProductos.removeAt(index);
    }
  }

  numerosAleatorios() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  asignarValor(evento: any) {
    this.productoForm.get('porcentaje')?.setValue(1);
    let valor = evento.value;
    this.calcularTotalIva(valor);
  }

  calcularUtilidad() {



    let precioIva = parseFloat(this.productoForm.get('precioIva')?.value).toFixed(2);
    let porcentaje = parseFloat(
      this.productoForm.get('porcentaje')?.value
    ).toFixed(2);
    let valorPorcentaje = ((parseFloat(precioIva) * parseFloat(porcentaje)) / 100).toFixed(2);
    let utilidadValorTotal= (parseFloat (valorPorcentaje )+ parseFloat (precioIva)).toFixed(2)
    this.productoForm.get('utilidad')?.setValue(valorPorcentaje);
    if(isNaN(parseFloat (utilidadValorTotal))){
      return
    }

    this.productoForm.get('totalIva')?.setValue(parseFloat (utilidadValorTotal));


    
  }

  calcularPocentajeUtilidad(){

   let totalIva =  parseFloat(this.productoForm.get('totalIva')?.value).toFixed(2);
   let precioIva =  parseFloat(this.productoForm.get('precioIva')?.value).toFixed(2);
   let ganancia = (parseFloat (totalIva) - parseFloat (precioIva)).toFixed(2);
   let porcentajeGanacia = ((parseFloat(ganancia) /  parseFloat (precioIva)) *100).toFixed(2);
   if(isNaN(parseFloat (porcentajeGanacia))){
    return
  }
   this.productoForm.get('porcentaje')?.setValue(parseFloat(porcentajeGanacia));
   this.calcularUtilidad();
   
  }

  calcularTotalIva(valor: any) {
    const valorSeleccionado = this.productoForm.get('idIva')?.value;
    const buscarValor = this.ivasList.find(
      (item) => item.idIva === valorSeleccionado
    );

    if (valor === '' || valor == undefined || valor == null) {
      this.productoForm.get('precioIva')?.setValue('');
      return;
    }

    if (buscarValor != undefined) {
      this.calcularTotalMasIva(buscarValor.valor);
    }
  }

  calcularTotalMasIva(valorIva: any) {
    const precioControl = this.productoForm.get('precio');

    if (
      precioControl !== null &&
      precioControl !== undefined &&
      precioControl.value !== null
    ) {


      let iva = parseFloat(valorIva) * precioControl.value;
      let totalIva = precioControl.value + iva;
      this.productoForm.get('precioIva')?.setValue(totalIva.toFixed(2));
      this.productoForm.get('valorIva')?.setValue(iva.toFixed(2));
      this.productoForm.get('totalIva')?.setValue(totalIva.toFixed(2));
    }
    this.calcularUtilidad();
  }

  listarIvas() {
    this.ivasServices.listar().subscribe({
      next: (res) => {
        this.ivasList = res;
        this.productoForm.get('idIva')?.setValue(this.ivasList[0].idIva);
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Ivas');
      },
    });
  }

  desactivar(idProducto: string, activo: boolean) {
    this.productosServices.desactivar(idProducto, activo).subscribe({
      next: (res) => {
        let activoString = '';
        res == true
          ? (activoString = 'Activado')
          : (activoString = 'Desactivado');
        this.listarProductos(this.idEmpresa);
        this.toast.show_success('Success', `Registro ${activoString}`);
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al desactivar el Registro');
      },
    });
  }

  listarProductos(idEmpresa:string | null) {
    this.dtOptions = {
      lengthMenu: [10, 25, 50, 75, 100],
      destroy: true,
      scrollX: true,
      columnDefs: [
        {
          targets: [0, 1, 2, 3, 4, 5, 6],
          className: 'text-center dt-nowrap',
          width: 'auto',
        },
        { targets: [5], orderable: false },
        { targets: '_all', className: 'dt-nowrap' }

        
      ],
      columns: [
        {
          title: 'Codigo',
          data: 'codigo',
        },
        {
          title: 'Nombre',
          data: 'nombre',
        },
        {
          title: 'Descripcion',
          data: 'descripcion',
        },
        {
          title: 'Precio',
          data: 'precio',
        },
        {
          title: 'IVA',
          data: 'idIvaNavigation.nombre',
        },
        
        {
          title: 'Total',
          data: 'totalIva',
        },

        {
          title: 'Estado',
          data: 'activoProducto',
          render: (data: any, type: any, full: any, meta: any) => {
            if (data) {
              return `
              <div style="cursor: pointer;" class="mb-4 ml-4 mt-3">
              
              <input type="checkbox" checked class="form-check-input" id="exampleCheck1">
              <span class="badge badge-success">Activo</span>
              
              </div>`;
            }

            return `
                      <div style="cursor: pointer;" class="mb-4 ml-4 mt-3">
                      
                      <input type="checkbox"  class="form-check-input" id="exampleCheck1">
                      <span class="badge badge-danger">No Activo</span>
                      
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
              .find('input')
              .click(async () => {
                await this.desactivar(rowData.idProducto, rowData.activoProducto);
              });
          },
        },

        {
          title: 'Opciones',
          data: 'idProducto',
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
                this.cargar(cellData, rowData.precio);
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

    this.productosServices.listar(idEmpresa).subscribe({
      next: (res) => {
        this.dtOptions.data = res;
        this.dtTrigger.next();
        this.spinner = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar los Productos');
      },
    });
  }

  editar() {
    this.spinnerEspere = true;
    this.spinnerEditar = false;
    let valor = this.productoForm.value;
    this.productosServices.actualizar(valor).subscribe({
      next: (res) => {
        if (res === 'ok') {
          this.toast.show_success('Productos', 'Editado con Éxito');
          $('#exampleModal').modal('hide');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          this.listarProductos(this.idEmpresa);
          return;
        }

        if (res === 'repetido') {
          this.toast.show_warning('Producto', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          return;
        }
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al actualizar el Producto');
        this.spinner = false;
        this.spinnerEspere = false;
      },
    });
  }

  cargar(idProducto: string, precio: number) {
    this.productoForm.get('porcentaje')?.setValue(1);
    $('#exampleModal').modal('show');
    this.borrarObjeto();
    this.spinnerCargar = true;
    this.spinnerGuardar = false;
    this.spinnerEditar = true;
    this.productosServices.cargar(idProducto).subscribe({
      next: (res) => {
        this.productoForm.patchValue(Object.assign({}, res.productos));
        this.spinnerCargar = false;
        this.calcularTotalIva(precio);



        res.detalleprecioProductos.forEach((detalle: any) => {


              (this.productoForm.get('detallePrecioProductos') as FormArray).push(
          this.fb.group({
            idDetallePrecioProducto: detalle.idDetallePrecioProducto,
            totalIva: detalle.totalIva,
            porcentaje: detalle.porcentaje,
            utilidad: detalle.porcentaje,
          })
        );
         

        });
        

    

      },
      error: (err) => {
        this.toast.show_error('Error', 'Al listar el Producto');
      },
    });
  }

  eliminar(idProducto: any) {
    $('#ModalWarning').modal('show');
    this.idProducto = idProducto;
  }

  confirmarEliminacion() {
    this.spinnerWarning = true;
    this.productosServices.eliminar(this.idProducto).subscribe({
      next: (res) => {
        this.listarProductos(this.idEmpresa);
        this.toast.show_success('Productos', 'Eliminado con Éxito');
        $('#ModalWarning').modal('hide');
        this.spinnerWarning = false;
      },
      error: (err) => {
        this.toast.show_error('Error', 'Al eliminar el Producto');
      },
    });
  }

  cerrarModalWarning() {
    $('#ModalWarning').modal('hide');
    this.idProducto = '';
  }

  abrirModal() {
    this.productoForm
    .get('idIva')
    ?.setValue(this.ivasList[0].idIva);
    this.borrarObjeto();
    this.spinnerCargar = false;
    this.spinnerEditar = false;
    this.spinnerGuardar = true;
    $('#exampleModal').modal('show');
  }

  borrarObjeto(){

    const detallePrecioProductos = this.productoForm.get('detallePrecioProductos') as FormArray;
    detallePrecioProductos.clear();

  }

  guardar(producto: Productos) {
    
    this.spinnerEspere = true;
    this.spinnerGuardar = false;

    if (this.productoForm.invalid) {
      this.validator.validarTodo(this.productoForm, this.el);
      this.spinnerEspere = false;
      this.spinnerGuardar = true;
      return;
    }

    this.productosServices.insertar(producto).subscribe({
      next: (res) => {
        if (res == 'ok') {
          this.listarProductos(this.idEmpresa);
          this.toast.show_success('Productos', 'Producto Guardado Con Éxito');
          this.limpiar();
          this.borrarObjeto();
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }

        if (res == 'repetido') {
          this.toast.show_warning('Productos', 'Ya se encuentra registrado');
          this.spinnerEspere = false;
          this.spinnerGuardar = true;
          return;
        }
      },
      error: (err) => {
        this.spinnerEspere = false;
        this.spinnerGuardar = true;
        console.log(err);
        this.toast.show_error('Productos', 'Error al guardar el Producto');
      },
    });
  }

  limpiar() {
    this.productoForm.reset();
    $('#exampleModal').modal('hide');
    this.spinnerEspere = false;
  }
}
