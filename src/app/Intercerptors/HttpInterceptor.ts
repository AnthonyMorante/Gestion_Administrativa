import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { global } from 'src/main';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiRequest = request.clone({

      headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem(global.token.user)}`),
      url: `https://localhost:7161/${request.url}`
    });

    return next.handle(apiRequest);
  }
}
