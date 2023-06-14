import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../Interfaces/Clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  ruta: string = 'api/Clientes';

  constructor(public http: HttpClient) {}

  listar(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.ruta}/listar`);
  }

  insertar(clientes: Clientes) {
    return this.http.post(`${this.ruta}/insertar`, clientes);
  }

  cargar(idCliente: string) {
    return this.http.get<Clientes>(`${this.ruta}/cargar/${idCliente}`);
  }

  actualizar(clientes: Clientes): Observable<Clientes> {




    return this.http.put<Clientes>(
      `${this.ruta}/actualizar`,
      clientes
    );
  }

  eliminar(idCliente: string): Observable<Clientes> {

    return this.http.delete<Clientes>(`${this.ruta}/eliminar/${idCliente}`);
  }
}
