import { Injectable } from '@angular/core';
import { DetallePrecioProductos } from '../Interfaces/DetallePrecioProductos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetallePrecioProductosService {
  ruta: string = 'api/DetallePrecioProductos';

  constructor(public http: HttpClient) {}

  listar(idProducto:string): Observable<DetallePrecioProductos[]> {
    return this.http.get<DetallePrecioProductos[]>(`${this.ruta}/listar/${idProducto}`);
  }
}
