import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingComponent } from './accounting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzCardModule, NzCheckboxModule, NzDescriptionsModule, NzDividerModule, NzDrawerModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzPopconfirmModule, NzSelectModule,
  NzTableModule,
  NzTagModule
} from 'ng-zorro-antd';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {GraphQLModule} from '../../graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from '../../icons-provider.module';

describe('AccountingComponent', () => {
  let component: AccountingComponent;
  let fixture: ComponentFixture<AccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingComponent ], imports: [NzLayoutModule,
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
        NzDividerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
