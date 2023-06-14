import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedores } from '../Interfaces/Proveedores';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  ruta: string = 'api/Proveedores';

  constructor(public http: HttpClient) {}

  listar(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(`${this.ruta}/listar`);
  }

  insertar(Proveedores: Proveedores) {
    return this.http.post(`${this.ruta}/insertar`, Proveedores);
  }

  cargar(idCliente: string) {
    return this.http.get<Proveedores>(`${this.ruta}/cargar/${idCliente}`);
  }

  actualizar(Proveedores: Proveedores): Observable<string> {




    return this.http.put<string>(
      `${this.ruta}/actualizar`,
      Proveedores
    );
  }

  eliminar(idCliente: string): Observable<Proveedores> {

    return this.http.delete<Proveedores>(`${this.ruta}/eliminar/${idCliente}`);
  }
}
