import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FeatherIconsEnum } from './enums/feather-icons.enums';
import { ToastEnum } from './enums/toast.enums';
import { SuccessHandlingServices } from './services/successHandiling.service';
import { AuthServices } from './services/auth/auth.services';
import { environment } from '../environments/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private successHandlingServices: SuccessHandlingServices,
    private authService: AuthServices
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();
    let headers;
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      };
    }
    // we add this code to handle cyber notes about sensitive data
    // if (request.url.startsWith(environment.apiUrl)) {
    //   const url = new URL(request.url, window.location.origin);
    //   const queryParams: any = {};
    //   const params = request.params;

    //   // Iterate over each query parameter and store them in an object
    //   if (params) {
    //     params.keys().forEach((key) => {
    //       queryParams[key] = params.get(key);
    //     });


    //   if (Object.keys(queryParams).length > 0) {
    //     // Convert the query params object to JSON string
    //     const queryString = JSON.stringify(queryParams);
    //     // Encrypt the entire query string
    //     const encryptedQuery = this.encryptionHelper.encrypt(queryString);

    //     // Create a new request with the encrypted query string in the 'enc' parameter
    //     const modifiedUrl =
    //     url.origin +
    //     url.pathname +
    //     '?enc=' +
    //       encodeURIComponent(encryptedQuery);

    //     request = request.clone({
    //       url: modifiedUrl,
    //       setHeaders: headers,
    //       params: new HttpParams(),
    //     });
    //   } else {
    //     request = request.clone({
    //       setHeaders: headers,
    //     });
    //   }

    // }
    // }
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 && err.status != 403 && err.status != 412) {
              if (err.status == 404) {
                this.successHandlingServices.handleNewMessages(
                  err.error?.errors?.validation ?? [
                    ' البيانات المطلوبة غير متوفرة',
                  ],
                  ToastEnum.error,
                  FeatherIconsEnum.alertCircle,
                  'خطأ'
                );
              }
              return;
            }

            if (err.status == 412) {
              this.successHandlingServices.handleNewMessages(
                err.error?.errors?.validation ?? [' يجب تغيير كلمة المرور'],
                ToastEnum.warning,
                FeatherIconsEnum.alertCircle,
                'تنبيه'
              );

              this.router.navigateByUrl('/profile');
            } else {
              this.authService.logout();
            }
          }
        },
      })
    );
  }
}
