import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.less']
})
export class LoggedInComponent implements OnInit {
  isCollapsed = false;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    this.sessionService.logout();
    await this.router.navigate(['/login']);
  }
}
