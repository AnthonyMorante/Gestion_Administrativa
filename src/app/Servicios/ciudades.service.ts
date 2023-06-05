import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provincias } from '../Interfaces/Provincias';
import { Observable } from 'rxjs';
import { Ciudades } from '../Interfaces/Ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(public http: HttpClient) { }



  listar(): Observable<Ciudades[]> {


    return this.http.get<Ciudades[]>('api/Ciudades/listar');
  }

}
