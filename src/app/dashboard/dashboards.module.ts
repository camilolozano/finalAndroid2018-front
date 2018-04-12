import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dashboardRouting } from './dashboard.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Prime ng Upload
import { FileUploadModule } from 'primeng/fileupload';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuardService } from './utils/auth-guard.service';
import { BrowserXhr } from '@angular/http';
// Configuración para el manejo de coockies
import { CustomBrowserXhr } from './utils/CustomBrowserXhr';
import { DashboardComponent } from './dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';

import { MaterialModuleModule } from '../material-mudule/material-module.module';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUserComponent } from './list-users/update-user/update-user.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';

// google maps
import { AgmCoreModule } from '@agm/core';

import { GoogleMapComponent } from './google-map/google-map.component';
import { ListOffersCompaniesComponent } from './list-offers-companies/list-offers-companies.component';
import { ListsolicitationsComponent } from './listsolicitations/listsolicitations.component';
import { ChatComponent } from './chat/chat.component';
import { ElementPriceComponent } from './listsolicitations/element-price/element-price.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    dashboardRouting,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    HttpClientModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCttDRK3LlN7nK5t0WKkdygE9ht9uX-ggE'
    })
  ],
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    SidenavMenuComponent,
    CreateUsersComponent,
    ListUsersComponent,
    UpdateUserComponent,
    AllEventsComponent,
    UpdatePasswordComponent,
    CreateCompaniesComponent,
    GoogleMapComponent,
    ListOffersCompaniesComponent,
    ListsolicitationsComponent,
    ChatComponent,
    ElementPriceComponent,
  ],
  entryComponents: [
    UpdateUserComponent,
    ChatComponent,
    ElementPriceComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BrowserXhr, useClass: CustomBrowserXhr },
    AuthGuardService,
  ]
})
export class DashboardsModule { }
