import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuntoEmisiones } from '../Interfaces/PuntoEmisiones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntoEmisionesService {

  ruta: string = 'api/PuntoEmisiones';

  constructor(public http: HttpClient) {}

  listar(idEmpresa:string): Observable<PuntoEmisiones[]> {
    return this.http.get<PuntoEmisiones[]>(`${this.ruta}/listar/${idEmpresa}`);
  }
}
