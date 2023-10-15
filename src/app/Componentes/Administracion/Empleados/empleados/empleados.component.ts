import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AxiosService } from 'src/app/Services/axios.service';
import { global, js } from 'src/main';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {
  @ViewChild('frmDatos', { static: true }) frmDatos: ElementRef = {} as ElementRef;
  listaTipoIdentificaciones:any=[];
  identificacion:any;
  private baseUrl=`${global.BASE_API_URL}api/`;
  constructor(private axios:AxiosService) {}
  ngOnInit(): void {
    this.identificacion=document.querySelector("#identificacion"); 
    js.activarValidadores(this.frmDatos.nativeElement);
  }


}


