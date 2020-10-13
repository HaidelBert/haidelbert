import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, retry} from 'rxjs/operators';
import {SessionService} from './session/session.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sessionService: SessionService) {}


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
      } else if (error.status === 401 || error.status === 403){
        localStorage.removeItem('accessToken');
        this.sessionService.logout();
        this.router.navigate([`/login?redirectTo=${window.location.pathname}`]);
      }

      return throwError(errorMessage);
    }));
  }
}
