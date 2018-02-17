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
import { MyEventsComponent } from './my-events/my-events.component';
import { FormsComponent } from './forms/forms.component';
import { OsurveyInformationComponent } from './forms/osurvey-information/osurvey-information.component';
import { AsiteLocationInformationComponent } from './forms/asite-location-information/asite-location-information.component';
import { StructureInformationComponent } from './forms/structure-information/structure-information.component';
import { CompoundComponent } from './forms/compound/compound.component';
import { ServicesAvailablesComponent } from './forms/services-availables/services-availables.component';
import { PictureLogComponent } from './forms/picture-log/picture-log.component';
import { GridDataComponent } from './forms/structure-information/grid-data/grid-data.component';
import { ServiceAvailableGridComponent } from './forms/services-availables/service-available-grid/service-available-grid.component';
import { UpdateDataComponent } from './forms/structure-information/grid-data/update-data/update-data.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DetailAllEventsComponent } from './detail-all-events/detail-all-events.component';
import { OsurveyInformationOnlyreadingComponent } from './detail-all-events/osurvey-information-onlyreading/osurvey-information-onlyreading.component';
import { AsiteLocationInformationOnlyreadingComponent } from './detail-all-events/asite-location-information-onlyreading/asite-location-information-onlyreading.component';
import { StructureInformationOnlyreadingComponent } from './detail-all-events/structure-information-onlyreading/structure-information-onlyreading.component';
import { CompoundOnlyreadingComponent } from './detail-all-events/compound-onlyreading/compound-onlyreading.component';
import { ServicesAvailablesOnlyreadingComponent } from './detail-all-events/services-availables-onlyreading/services-availables-onlyreading.component';
import { EditAllEventsComponent } from './edit-all-events/edit-all-events.component';
import { UpdateDataSagComponent } from './forms/services-availables/service-available-grid/update-data-sag/update-data-sag.component';
import { UploadFileComponent } from './forms/picture-log/upload-file/upload-file.component';
import { DeleteFileComponent } from './forms/picture-log/delete-file/delete-file.component';
import { CreateFileComponent } from './forms/picture-log/create-file/create-file.component';
import { DeleteRowComponent } from './forms/structure-information/grid-data/delete-row/delete-row.component';
import { DeleteRowSaComponent } from './forms/services-availables/service-available-grid/delete-row-sa/delete-row-sa.component';

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
    FileUploadModule
  ],
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    SidenavMenuComponent,
    CreateUsersComponent,
    ListUsersComponent,
    UpdateUserComponent,
    AllEventsComponent,
    MyEventsComponent,
    FormsComponent,
    OsurveyInformationComponent,
    AsiteLocationInformationComponent,
    StructureInformationComponent,
    CompoundComponent,
    ServicesAvailablesComponent,
    PictureLogComponent,
    GridDataComponent,
    ServiceAvailableGridComponent,
    UpdateDataComponent,
    UpdatePasswordComponent,
    DetailAllEventsComponent,
    OsurveyInformationOnlyreadingComponent,
    AsiteLocationInformationOnlyreadingComponent,
    StructureInformationOnlyreadingComponent,
    CompoundOnlyreadingComponent,
    ServicesAvailablesOnlyreadingComponent,
    EditAllEventsComponent,
    UpdateDataSagComponent,
    UploadFileComponent,
    DeleteFileComponent,
    CreateFileComponent,
    DeleteRowComponent,
    DeleteRowSaComponent
  ],
  entryComponents: [
    UpdateUserComponent,
    UpdateDataComponent,
    UpdateDataSagComponent,
    UploadFileComponent,
    DeleteFileComponent,
    CreateFileComponent,
    DeleteRowComponent,
    DeleteRowSaComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BrowserXhr, useClass: CustomBrowserXhr },
    AuthGuardService,
  ]
})
export class DashboardsModule { }
