import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleados } from '../Interfaces/Empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  ruta: string = 'api/Empleados';

  constructor(public http: HttpClient) {}

  listar(idEmpresa:String | null): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(`${this.ruta}/listar/${idEmpresa}`);
  }

  insertar(clientes: Empleados) {
    return this.http.post(`${this.ruta}/insertar`, clientes);
  }

  cargar(idCliente: string) {
    return this.http.get<Empleados>(`${this.ruta}/cargar/${idCliente}`);
  }

  actualizar(clientes: Empleados): Observable<string> {




    return this.http.put<string>(
      `${this.ruta}/actualizar`,
      clientes
    );
  }

  eliminar(idCliente: string): Observable<Empleados> {

    return this.http.delete<Empleados>(`${this.ruta}/eliminar/${idCliente}`);
  }
}
