import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el cursor de carga
    document.body.style.cursor = 'wait';

    return next.handle(req).pipe(
      finalize(() => {
        // Restablecer el cursor
        document.body.style.cursor = 'default';
      })
    );
  }
}
