import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clientes } from 'src/app/Interfaces/Clientes';
declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent  {




  clienteForm = new FormGroup({

    IdCliente: new FormControl('', Validators.required),
    Identificacion: new FormControl('',[Validators.required]),
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
    

    console.log(cliente);

  }

}
