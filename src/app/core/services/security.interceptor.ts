import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers: Record<string, string> = {
      'Cache-Control': 'no-store',
      Pragma: 'no-cache',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    const token = this.auth.snapshot?.token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const secureReq = req.clone({
      setHeaders: headers,
      withCredentials: false,
    });

    return next.handle(secureReq);
  }
}
