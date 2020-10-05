import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(req).pipe(retry(0), catchError((error: HttpErrorResponse) => {
      const errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        console.error(error);
      } else if (error.status === 401){
        localStorage.removeItem('accessToken');
      }

      return throwError(errorMessage);
    }));
  }
}
