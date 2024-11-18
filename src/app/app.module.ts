import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import  { AppComponent } from './app.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthService } from './service/AuthService';
import { DashboardComponent } from './dashboard/dashboard.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'my-sso-realm',
        clientId: 'achraf2-client' // Different client ID for App 2
      },
      initOptions: {
        checkLoginIframe: false,
        onLoad: 'check-sso'
      }
    });
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,DashboardModule,KeycloakAngularModule
  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
