import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(httpReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const req = httpReq.clone({
        setHeaders: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      return next.handle(req);
    } else {
      const req = httpReq.clone({
        headers: httpReq.headers.set('Content-Type', 'application/json')
      });
      return next.handle(req);
    }
  }
}
