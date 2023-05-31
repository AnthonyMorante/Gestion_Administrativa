import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TipoIdentificaciones } from '../Interfaces/TipoIdentificaciones';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionesService {

  constructor(public http: HttpClient) { }



  listar(): Observable<TipoIdentificaciones[]> {


    return this.http.get<TipoIdentificaciones[]>('api/TipoIdentificaciones/listar');
  }

}
