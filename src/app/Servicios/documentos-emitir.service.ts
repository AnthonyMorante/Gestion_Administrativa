import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentosEmitir } from '../Interfaces/DocumentosEmitir';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosEmitirService {
  ruta: string = 'api/DocumentosEmitir';

  constructor(public http: HttpClient) {}

  listar(codigo:number): Observable<DocumentosEmitir[]> {
    return this.http.get<DocumentosEmitir[]>(`${this.ruta}/listar/${codigo}`);
  }
}

