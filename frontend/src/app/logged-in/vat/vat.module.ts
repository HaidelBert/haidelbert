import {NgModule} from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoggedInComponent} from '../logged-in.component';
import {AccountingComponent} from '../accounting/accounting.component';
import {AccountingTableComponent} from '../accounting/accounting-table/accounting-table.component';
import {AccountingTableRowComponent} from '../accounting/accounting-table/accounting-table-row/accounting-table-row.component';
import {NewAccountingRecordComponent} from '../accounting/new-accounting-record/new-accounting-record.component';
import {VatComponent} from './vat.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {GraphQLModule} from '../../graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from '../../icons-provider.module';
import {
  NzAutocompleteModule,
  NzButtonModule, NzCardModule, NzCheckboxModule, NzDatePickerModule, NzDescriptionsModule, NzDividerModule, NzDrawerModule, NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzPopconfirmModule,
  NzSelectModule, NzSkeletonModule, NzSpinModule,
  NzTableModule,
  NzTagModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnnualCompletionComponent} from './annual-completion/annual-completion.component';
import {PreRegistrationComponent} from './pre-registration/pre-registration.component';
import {PreRegistrationDetailsComponent} from './pre-registration/pre-registration-details/pre-registration-details.component';
import {NewPreRegistrationComponent} from './pre-registration/new-pre-registration/new-pre-registration.component';
import {AnnualCompletionDetailsComponent} from './annual-completion/annual-completion-details/annual-completion-details.component';
import {NewAnnualCompletionComponent} from './annual-completion/new-annual-completion/new-annual-completion.component';

@NgModule({
  declarations: [
    VatComponent,
    AnnualCompletionComponent,
    PreRegistrationComponent,
    PreRegistrationDetailsComponent,
    NewPreRegistrationComponent,
    AnnualCompletionComponent,
    AnnualCompletionDetailsComponent,
    NewAnnualCompletionComponent
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
    NzSpinModule,
    NzSkeletonModule,
  ]
})
export class VatModule {
}
