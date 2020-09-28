import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {IconsProviderModule} from './icons-provider.module';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {LoggedInModule} from './logged-in/logged-in.module';
import {LoginComponent} from './login/login.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzAlertModule, NzButtonModule, NzCardModule, NzFormModule, NzInputModule, NzSpinModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoggedInGuard} from './loggedInGuard';
import {TokenInterceptor} from './tokenInterceptor';
import {VatModule} from './logged-in/vat/vat.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    LoggedInModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzAlertModule,
    NzSpinModule,
    VatModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    LoggedInGuard
  ],
})
export class AppModule {
}
