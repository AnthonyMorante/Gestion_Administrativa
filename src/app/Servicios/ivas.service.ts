import { Injectable } from '@angular/core';
import { Ivas } from '../Interfaces/Ivas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IvasService {

  ruta: string = 'api/Ivas';

  constructor(public http: HttpClient) {}

  listar(): Observable<Ivas[]> {
    return this.http.get<Ivas[]>(`${this.ruta}/listar`);
  }

}
