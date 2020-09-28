import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionQuery} from './session/session.query';
import {SessionService} from './session/session.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private sessionQuery: SessionQuery, private sessionService: SessionService) {}

  async ngOnInit(): Promise<void> {
    await this.sessionService.init();
  }

  isInitialized(): boolean {
    return this.sessionQuery.getValue().initialized;
  }
}
