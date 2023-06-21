import { Injectable } from '@angular/core';
import { Productos } from '../Interfaces/Productos';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  ruta: string = 'api/Productos';

  constructor(public http: HttpClient) {}

  listar(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.ruta}/listar`);
  }

  insertar(productos: Productos) {
    return this.http.post(`${this.ruta}/insertar`, productos);
  }

  cargar(idProducto: string) {
    return this.http.get<Productos>(`${this.ruta}/cargar/${idProducto}`);
  }

  actualizar(productos: Productos): Observable<string> {

    return this.http.put<string>(
      `${this.ruta}/actualizar`,
      productos
    );
  }

  desactivar(idProducto: string,activo:boolean): Observable<boolean> {

    const params = new HttpParams().set('activo', activo);
    return this.http.put<boolean>(`${this.ruta}/desactivar/${idProducto}`,null,{params});
    
  }

  eliminar(idProducto: string): Observable<Productos> {

    return this.http.delete<Productos>(`${this.ruta}/eliminar/${idProducto}`);
  }
}
