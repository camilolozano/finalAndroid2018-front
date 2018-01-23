import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Coockie conigured
import { AuthGuardService } from './utils/auth-guard.service';


// Components
import { DashboardComponent } from './dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { FormsComponent } from './forms/forms.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DetailAllEventsComponent } from './detail-all-events/detail-all-events.component';
import { EditAllEventsComponent } from './edit-all-events/edit-all-events.component';

export const dashboardRoutes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'create-users',
        component: CreateUsersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'all-events',
        component: AllEventsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my-events',
        component: MyEventsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'forms-data/:idEvent',
        component: FormsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'detail-all-events/:idEvent',
        component: DetailAllEventsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit-all-events',
        component: EditAllEventsComponent,
        canActivate: [AuthGuardService]
      }
    ],
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);

