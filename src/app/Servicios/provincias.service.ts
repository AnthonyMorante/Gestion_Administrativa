import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincias } from '../Interfaces/Provincias';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(public http: HttpClient) { }



  listar(): Observable<Provincias[]> {


    return this.http.get<Provincias[]>('api/Provincias/listar');
  }

}
