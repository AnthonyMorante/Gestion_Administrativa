import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  login(credenciales: any): Observable<any> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('client_id', 'Jwt');
    body.set('client_secret', 'My Client Secret');
    body.set('grant_type', 'password');
    body.set('scope', 'app.all');
    body.set('username',credenciales["usuario"]);
    body.set('password', credenciales["clave"]);

    return this.http.post<any>("connect/token", body.toString(), { headers });
  }
}
