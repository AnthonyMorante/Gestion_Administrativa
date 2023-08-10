import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiempoFormaPagos } from '../Interfaces/TiempoFormaPagos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiempoFormaPagosService {

  ruta: string = 'api/TiempoFormaPagos';

  constructor(public http: HttpClient) {}

  listar(): Observable<TiempoFormaPagos[]> {
    return this.http.get<TiempoFormaPagos[]>(`${this.ruta}/listar`);
  }
}
