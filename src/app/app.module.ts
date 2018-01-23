import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/toPromise';
import { BrowserXhr } from '@angular/http';
import { CustomBrowserXhr } from './dashboard/utils/CustomBrowserXhr';

// Router
import { AppRoutes, appRoutingProviders } from './app.routes';

// Component
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardsModule } from './dashboard/dashboards.module';

import { MaterialModuleModule } from './material-mudule/material-module.module';
import { EnterPasswordComponent } from './enter-password/enter-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    InicioComponent,
    EnterPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardsModule,
    HttpClientModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
