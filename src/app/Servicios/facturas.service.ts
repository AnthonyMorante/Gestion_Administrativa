import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  ruta: string = 'api/Facturas';

  constructor(public http: HttpClient) {}

 
  insertar(productos: any) {

    return this.http.post(`${this.ruta}/insertar`, productos);
  }
}
