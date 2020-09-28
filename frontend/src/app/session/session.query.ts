import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  selectIsLoggedIn$ = this.select('loggedIn');
  selectUser$ = this.select('user');

  constructor(protected store: SessionStore) {
    super(store);
  }

}
