import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { select } from 'src/app/Compartidos/Shared/select';
import { ToastComponent } from 'src/app/Compartidos/Shared/toast';
import { Validator } from 'src/app/Compartidos/Shared/validations';
import { Clientes } from 'src/app/Interfaces/Clientes';
import { TipoIdentificaciones } from 'src/app/Interfaces/TipoIdentificaciones';
import { TipoIdentificacionesService } from 'src/app/Servicios/tipo-identificaciones.service';
import { cedulaRuc } from 'src/app/Validaciones/cedulaRuc';



declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent  {


  clienteForm = new FormGroup({

    idCliente: new FormControl(),
    identificacion: new FormControl('',[Validators.required,cedulaRuc()]),
    razonSocial: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    observacion: new FormControl(),
    fechaRegistro: new FormControl(),
    codigo: new FormControl(),
    idCiudad: new FormControl(),
    idTipoidentificacion:  new FormControl('', [Validators.required]),
    idCiudadNavigation: new FormControl(),
    idTipoIdentificacionNavigation: new FormControl(),
  });


  tipoIdentificacionesList: TipoIdentificaciones[] = [];
  


  constructor(
    private toast: ToastComponent,
    private el: ElementRef,
    private validator: Validator,
    private tipoIdentificacionesServices: TipoIdentificacionesService,

    
    ){}

    



  ngOnInit() {



  this.listarTiposNotificaciones();

  

    

    $("#tabla").DataTable({
      keys: !0,
      language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
      drawCallback: function () {
          $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      
  });

  }


  listarTiposNotificaciones(){

    this.tipoIdentificacionesServices.listar().subscribe({
     
      next:(res)=>{


        this.tipoIdentificacionesList=res;

     
 
      },error:(err)=>{
      
        this.toast.show_error("Error", "Error al listar los Tipos de Identificaciones");

      }

    });

  }


  abrirModal() {


    $('#standard-modal').modal('show');
    

  }



  guardar(cliente: Clientes){


    
    if (this.clienteForm.invalid) {

      this.validator.validarTodo(this.clienteForm, this.el);
      return;

    }


    console.log(cliente);
    

  }


  cambiarValidacion(evento:any){

    this.clienteForm.controls['identificacion'].clearValidators();
   
  if(parseInt (evento.value)==1){


    this.clienteForm.controls['identificacion'].setValidators([
      Validators.required,
      cedulaRuc()
    ]);


  }


  if(parseInt (evento.value)==2){
 
    this.clienteForm.controls['identificacion'].setValidators([

      Validators.required

    ]);
    
  }


  this.clienteForm.get('identificacion')?.setValue('');

  }

 


  limpiar(){this.clienteForm.reset();}

  setearValorRepresentante(evento:any){    
    

    this.clienteForm.get('representante')?.setValue(evento.value);
    


}

}
