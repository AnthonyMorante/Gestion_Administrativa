import { Component, ElementRef, ViewChild } from '@angular/core';
declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent  {



  ngOnInit() {

    

    $("#tabla").DataTable({
      keys: !0,
      language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
      drawCallback: function () {
          $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      
  });

  }

}
