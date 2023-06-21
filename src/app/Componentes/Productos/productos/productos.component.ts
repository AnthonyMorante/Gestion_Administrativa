import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/Compartidos/Shared/toast';
import { Validator } from 'src/app/Compartidos/Shared/validations';
import { Ivas } from 'src/app/Interfaces/Ivas';
import { Productos } from 'src/app/Interfaces/Productos';
import { IvasService } from 'src/app/Servicios/ivas.service';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { cedulaRuc } from 'src/app/Validaciones/cedulaRuc';
import { dosDigitos } from 'src/app/Validaciones/dosDigitos';
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  productoForm = new FormGroup({
    idProducto: new FormControl(),
    codigo: new FormControl('', [Validators.required]),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    activo: new FormControl(),
    precio: new FormControl(0,[Validators.required, dosDigitos()]),
    idIva: new FormControl(),
    precioIva: new FormControl(),
    valorIva: new FormControl()
  });

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  spinner: boolean = true;
  spinnerCargar: boolean = true;
  spinnerEditar: boolean = false;
  spinnerGuardar: boolean = true;
  spinnerEspere: boolean = false;
  idProducto: string = '';
  spinnerWarning: boolean = false;
  ivasList:Ivas[] =[]
  detalleAdicionalesList:any[] =[]
  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private productosServices: ProductosService,
    private ngSelectConfig: NgSelectConfig,
    private ivasServices: IvasService
  ) {
    this.ngSelectConfig.notFoundText = 'No existen coincidencias';
  }

  ngOnInit() {
    this.listarProductos();
    this.listarIvas();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();

    $('table').DataTable(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  asignarValor(evento:any){

    let valor = evento.value;
    this.calcularTotalIva(valor);

  }

  calcularTotalIva(valor:any)
  {

    const valorSeleccionado = this.productoForm.get('idIva')?.value;
    const buscarValor = this.ivasList.find(item => item.idIva === valorSeleccionado);

    if(valor==="" || valor == undefined || valor == null ){

      this.productoForm.get("precioIva")?.setValue("");
      return
  
    }
  
    if(buscarValor != undefined){

      this.calcularTotalMasIva(buscarValor.valor);


    }

  }

  calcularTotalMasIva(valorIva:any){

    const precioControl = this.productoForm.get('precio');

    if (precioControl !== null && precioControl !== undefined && precioControl.value !== null) {

      let iva = (parseFloat(valorIva) * precioControl.value);
      let totalIva = precioControl.value + iva;
      this.productoForm.get("precioIva")?.setValue(totalIva.toFixed(2));
      this.productoForm.get("valorIva")?.setValue(iva.toFixed(2));

    }
  }


  listarIvas(){

    this.ivasServices.listar().subscribe({
     
      next:(res)=>{

        this.ivasList=res;
        this.productoForm
        .get('idIva')
        ?.setValue(this.ivasList[0].idIva);

      },error:(err)=>{

        this.toast.show_error('Error', 'Al listar los Ivas');

      }


    })

  }


  desactivar(idProducto:string, activo:boolean){
    


    this.productosServices.desactivar(idProducto,activo).subscribe({
     
      next:(res)=>{
      
        let activoString="";
        res==true ? activoString="Activado" :activoString="Desactivado";
        this.listarProductos();
        this.toast.show_success('Success', `Registro ${activoString}`);

      },error:(err)=>{

        this.toast.show_error('Error', 'Al desactivar el Registro');

      }

    });


  }

  listarProductos() {
    this.dtOptions = {
      lengthMenu: [10, 25, 50, 75, 100],
      destroy: true,
      scrollX: true,
      columnDefs: [
        {
          targets: [0, 1, 2, 3, 4, 5,6],
          className: 'text-center',
          width: 'auto',
        },
        { targets: [5], orderable: false },
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
          title: 'Activo',
          data: 'activo',
        },
        {
          title: 'Precio',
          data: 'precio',
        },

        {
          title: 'Activo',
          data: 'activo',
          render: (data: any, type: any, full: any, meta: any) => {



            if(data){

              return `
              <div style="cursor: pointer;" class="mb-4 ml-4">
              
              <input type="checkbox" checked class="form-check-input" id="exampleCheck1">
              
              </div>`;

            }

            return `
                      <div style="cursor: pointer;" class="mb-4 ml-4">
                      
                      <input type="checkbox"  class="form-check-input" id="exampleCheck1">
                      
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
       
               await this.desactivar(rowData.idProducto,rowData.activo);
 

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

                this.cargar(cellData,rowData.precio);
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

    this.productosServices.listar().subscribe({
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
    let valor= this.productoForm.value;
    this.productosServices.actualizar(valor).subscribe({
      next: (res) => {
        if (res === 'ok') {
          this.toast.show_success('Productos', 'Editado con Éxito');
          $('#exampleModal').modal('hide');
          this.spinnerEspere = false;
          this.spinnerGuardar = false;
          this.listarProductos();
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

  cargar(idProducto: string,precio:number) {
    $('#exampleModal').modal('show');
    this.spinnerCargar = true;
    this.spinnerGuardar = false;
    this.spinnerEditar = true;
    this.productosServices.cargar(idProducto).subscribe({
      next: (res) => {

 

        this.productoForm.patchValue(
          Object.assign({},res)
        );

        this.spinnerCargar = false;
        this.calcularTotalIva(precio);
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
        this.listarProductos();
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
    this.spinnerCargar = false;
    this.spinnerEditar = false;
    this.spinnerGuardar = true;
    $('#exampleModal').modal('show');
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
          this.listarProductos();
          this.toast.show_success('Productos', 'Producto Guardado Con Éxito');
          this.limpiar();
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
