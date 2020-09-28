import {NgModule} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {GraphQLModule} from '../graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from '../icons-provider.module';
import {LoggedInComponent} from './logged-in.component';
import {
  NzAutocompleteModule,
  NzButtonModule, NzCardModule, NzCheckboxModule, NzDatePickerModule, NzDescriptionsModule, NzDividerModule, NzDrawerModule, NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzPopconfirmModule,
  NzSelectModule, NzSpinModule,
  NzTableModule,
  NzTagModule
} from 'ng-zorro-antd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountingComponent } from './accounting/accounting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountingTableComponent } from './accounting/accounting-table/accounting-table.component';
import { AccountingTableRowComponent } from './accounting/accounting-table/accounting-table-row/accounting-table-row.component';
import { NewAccountingRecordComponent } from './accounting/new-accounting-record/new-accounting-record.component';
import {VatComponent} from './vat/vat.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoggedInComponent,
    DashboardComponent,
    AccountingComponent,
    AccountingTableComponent,
    AccountingTableRowComponent,
    NewAccountingRecordComponent,
  ],
  imports: [
    NzLayoutModule,
    NzMenuModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTagModule,
    FormsModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzCardModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzAutocompleteModule,
    NzDatePickerModule,
    NzSpinModule
  ]
})
export class LoggedInModule {
}
