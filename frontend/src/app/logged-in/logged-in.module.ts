import {NgModule} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from '../icons-provider.module';
import {LoggedInComponent} from './logged-in.component';
import {
  NzAutocompleteModule, NzBadgeModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDescriptionsModule,
  NzDividerModule,
  NzDrawerModule,
  NzDropDownModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzPopconfirmModule,
  NzSelectModule,
  NzSpinModule, NzStepsModule,
  NzTableModule,
  NzTagModule
} from 'ng-zorro-antd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountingComponent } from './accounting/accounting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountingTableComponent } from './accounting/accounting-table/accounting-table.component';
import { AccountingTableRowComponent } from './accounting/accounting-table/accounting-table-row/accounting-table-row.component';
import { NewAccountingRecordComponent } from './accounting/new-accounting-record/new-accounting-record.component';
import {AnnualFinancialStatementsComponent} from './annual-financial-statements/annual-financial-statements.component';
import {AnnualFinancialStatementsDetailsComponent} from './annual-financial-statements/annual-financial-statements-details/annual-financial-statements-details.component';
import {NewAnnualFinancialStatementComponent} from './annual-financial-statements/new-annual-financial-statement/new-annual-financial-statement.component';
import {RegisterOfAssetsComponent} from './register-of-assets/register-of-assets.component';
import {NewAssetComponent} from './register-of-assets/new-asset/new-asset.component';
import {SellAssetComponent} from './register-of-assets/sell-asset/sell-asset.component';
import {NewYearlyDepreciationComponent} from './register-of-assets/new-yearly-depreciation/new-yearly-depreciation.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoggedInComponent,
    DashboardComponent,
    AccountingComponent,
    AccountingTableComponent,
    AccountingTableRowComponent,
    NewAccountingRecordComponent,
    AnnualFinancialStatementsComponent,
    AnnualFinancialStatementsDetailsComponent,
    NewAnnualFinancialStatementComponent,
    RegisterOfAssetsComponent,
    NewAssetComponent,
    SellAssetComponent,
    NewYearlyDepreciationComponent
  ],
  imports: [
    NzLayoutModule,
    NzMenuModule,
    BrowserModule,
    AppRoutingModule,
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
    NzDropDownModule,
    NzBadgeModule,
    NzStepsModule
  ]
})
export class LoggedInModule {
}
