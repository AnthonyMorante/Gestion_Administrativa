import { Injectable } from '@angular/core';
import { Establecimientos } from '../Interfaces/Establecimientos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  ruta: string = 'api/Establecimientos';

  constructor(public http: HttpClient) {}

  listar(idEmpresa:string): Observable<Establecimientos[]> {
    return this.http.get<Establecimientos[]>(`${this.ruta}/listar/${idEmpresa}`);
  }
}
