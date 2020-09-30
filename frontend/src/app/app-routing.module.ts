import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoggedInComponent} from './logged-in/logged-in.component';
import {LoginComponent} from './login/login.component';
import {LoggedInGuard} from './loggedInGuard';
import {DashboardComponent} from './logged-in/dashboard/dashboard.component';
import {AccountingComponent} from './logged-in/accounting/accounting.component';
import {VatComponent} from './logged-in/vat/vat.component';
import {AnnualFinancialStatementsComponent} from './logged-in/annual-financial-statements/annual-financial-statements.component';
import {RegisterOfAssetsComponent} from './logged-in/register-of-assets/register-of-assets.component';

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
      {path: 'annual-financial-statements', component: AnnualFinancialStatementsComponent},
      {path: 'register-of-assets', component: RegisterOfAssetsComponent},
      {path: 'dashboard', component: DashboardComponent},
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
