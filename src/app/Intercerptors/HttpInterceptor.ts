import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    const apiRequest = request.clone({
     
      headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`),
      url: `https://localhost:7028/${request.url}`
    });

    return next.handle(apiRequest);
  }
}