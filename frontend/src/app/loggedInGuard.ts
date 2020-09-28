import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionQuery} from './session/session.query';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {

  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionQuery.getValue().loggedIn) {
      return true;
    } else if (this.sessionQuery.getValue().initialized) {
      return this.router.parseUrl('/login?redirectTo=' + window.location.pathname);
    } else {
      return this.router.parseUrl(window.location.pathname);
    }
  }
}
