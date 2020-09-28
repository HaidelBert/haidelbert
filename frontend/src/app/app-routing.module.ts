import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoggedInComponent} from './logged-in/logged-in.component';
import {LoginComponent} from './login/login.component';
import {LoggedInGuard} from './loggedInGuard';
import {DashboardComponent} from './logged-in/dashboard/dashboard.component';
import {AccountingComponent} from './logged-in/accounting/accounting.component';
import {VatComponent} from './logged-in/vat/vat.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: '',
    pathMatch: 'prefix',
    component: LoggedInComponent,
    canActivate: [LoggedInGuard],
    children: [
      {path: 'accounting', component: AccountingComponent},
      {path: 'vat', component: VatComponent},
      {path: '', component: DashboardComponent},
      { path: '**', component: DashboardComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
