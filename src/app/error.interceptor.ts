import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingServices } from './services/errorHandling.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandlingService: ErrorHandlingServices) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500 && error.status <= 599) {
          this.handle500Error();
          return of(error as unknown as HttpEvent<any>);
        }
        return throwError(() => error);
      })
    );
  }

  private handle500Error(): void {
    this.errorHandlingService.handleError(
      'Internal Server Error'
    );
  }
}
