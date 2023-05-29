import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'src/app/Compartidos/Shared/validations';
import { Clientes } from 'src/app/Interfaces/Clientes';
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

    IdCliente: new FormControl(),
    Identificacion: new FormControl('',[Validators.required,cedulaRuc()]),
    RazonSocial: new FormControl('', Validators.required),
    Representante: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Telefono: new FormControl('', [Validators.required]),
    Observacion: new FormControl(),
    FechaRegistro: new FormControl(),
    IdCiudad: new FormControl(),
    IdTipoIdentificacion: new FormControl(),
    IdCiudadNavigation: new FormControl(),
    IdTipoIdentificacionNavigation: new FormControl(),
  });
  


  constructor(

    private el: ElementRef,
    private validator: Validator
    
    ){}

    



  ngOnInit() {

  
    $("#tabla").DataTable({
      keys: !0,
      language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
      drawCallback: function () {
          $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      
  });

  }


  guardar(cliente: Clientes){


    
    if (this.clienteForm.invalid) {

      this.validator.validarTodo(this.clienteForm, this.el);
      return;

    }
    

    console.log(cliente);

  }


  cambiarValidacion(evento:any){

    this.clienteForm.controls['Identificacion'].clearValidators();
   
  if(parseInt (evento.value)==1){


    this.clienteForm.controls['Identificacion'].setValidators([
      Validators.required,
      cedulaRuc()
    ]);


  }


  if(parseInt (evento.value)==2){
 
    this.clienteForm.controls['Identificacion'].setValidators([

      Validators.required

    ]);
    
  }


  this.clienteForm.get('Identificacion')?.setValue('');

  }




  limpiar(){


    this.clienteForm.reset();

  }

}
