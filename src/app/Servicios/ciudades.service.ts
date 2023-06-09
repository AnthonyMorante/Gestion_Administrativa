import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudades } from '../Interfaces/Ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(public http: HttpClient) {}

  listar(idProvincia:any): Observable<Ciudades[]> {
    const params = new HttpParams().set('idProvincia', idProvincia);
    return this.http.get<Ciudades[]>('api/Ciudades/listar',{ params });
  }
}
