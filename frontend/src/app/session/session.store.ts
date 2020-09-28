import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  accessToken?: string;
  user?: any;
  loggedIn: boolean;
  initialized: boolean;
}

export function createInitialState(): SessionState {
  return {
    accessToken: undefined,
    loggedIn: false,
    user: undefined,
    initialized: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState>  {

  constructor() {
    super(createInitialState());
  }
}
