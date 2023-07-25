import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincias } from '../Interfaces/Provincias';

@Injectable({
  providedIn: 'root',
})
export class ProvinciasService {

  ruta: string = 'api/Provincias';

  constructor(public http: HttpClient) {}

  listar(): Observable<Provincias[]> {
    return this.http.get<Provincias[]>(`${this.ruta}/listar`);
  }
}
