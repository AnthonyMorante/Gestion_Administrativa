import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPagos } from '../Interfaces/FormaPagos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormaPagosService {

  ruta: string = 'api/FormaPagos';

  constructor(public http: HttpClient) {}

  listar(): Observable<FormaPagos[]> {
    return this.http.get<FormaPagos[]>(`${this.ruta}/listar`);
  }
}
