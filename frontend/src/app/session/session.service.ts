import {Injectable} from '@angular/core';
import {SessionStore} from './session.store';
import {HttpClient} from '@angular/common/http';
import {getUserApiBaseUrl} from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private sessionStore: SessionStore, private httpClient: HttpClient){}

  async login(username: string, password: string): Promise<any> {
    const result = await this.httpClient
      .post<any>(`${getUserApiBaseUrl()}/user/api/public/token`, { usernameOrEmail: username, password })
      .toPromise();
    localStorage.setItem('accessToken', result.accessToken);
    const meResult = await this.httpClient.get(`${getUserApiBaseUrl()}/user/api/protected/me`).toPromise();
    this.sessionStore.update({
      user: meResult,
      loggedIn: true
    });
  }

  async init(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const result = await this.httpClient.get(`${getUserApiBaseUrl()}/user/api/protected/me`).toPromise();
        console.log('SessionService: logging in');
        this.sessionStore.update({
          user: result,
          loggedIn: true
        });
        return true;
      }catch (e) {
        console.error(e);
        return false;
      } finally {
        this.sessionStore.update({
          initialized: true
        });
      }
    } else {
      this.sessionStore.update({
        initialized: true
      });
      return false;
    }
  }

  logout(): void {
    console.log('SessionService: logging out');
    localStorage.removeItem('accessToken');
    this.sessionStore.update({
      user: undefined,
      loggedIn: false
    });
  }
}
