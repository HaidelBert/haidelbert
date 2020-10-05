import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../session/session.service';
import {Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private sessionService: SessionService, private router: Router) {}

  async submitForm(e: any): Promise<void> {
    debugger;
    e.preventDefault();
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (!this.validateForm.valid) {
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.sessionService.login(this.validateForm.controls.userName.value, this.validateForm.controls.password.value);
      this.loading = false;
      this.error = '';
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirectTo');
      if (redirectTo) {
        this.router.navigate([redirectTo]);
      } else {
        this.router.navigate(['/']);
      }

    } catch (e) {
      this.loading = false;
      this.error = 'Username or password wrong!';
      console.error(e);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
