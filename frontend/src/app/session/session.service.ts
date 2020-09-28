import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SessionStore} from './session.store';

const tokenQuery = (username: string, password: string) => {
  return {
    query: gql`
      query {
        token(credentials: { usernameOrEmail: "${username}", password: "${password}"}) {
          accessToken
        }
      }`
  };
};

const meQuery = () => {
  return {
    query: gql`
      query {
        me {
          id
          username
          email
        }
      }`
  };
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private sessionStore: SessionStore, private apollo: Apollo){}

  async login(username: string, password: string): Promise<any> {
    const result = await this.apollo.use('user').query<any>(tokenQuery(username, password)).toPromise();
    localStorage.setItem('accessToken', result.data.token.accessToken);
    const meResult = await this.apollo.use('user').query<any>(meQuery()).toPromise();
    this.sessionStore.update({
      user: meResult.data.me,
      loggedIn: true
    });
  }

  async init(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const result = await this.apollo.use('user').query<any>(meQuery()).toPromise();
        console.log('SessionService: logging in');
        this.sessionStore.update({
          user: result.data.me,
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
