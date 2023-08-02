import { Injectable } from '@angular/core';
import { Secuenciales } from '../Interfaces/Secuenciales';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecuencialesService {

  ruta: string = 'api/Secuenciales';

  constructor(public http: HttpClient) {}

  listar(idEmpresa:string): Observable<Secuenciales[]> {
    return this.http.get<Secuenciales[]>(`${this.ruta}/listar/${idEmpresa}`);
  }
}
