import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Coockie conigured
import { AuthGuardService } from './utils/auth-guard.service';


// Components
import { DashboardComponent } from './dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';

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
        path: 'update-password',
        component: UpdatePasswordComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'new-company',
        component: CreateCompaniesComponent,
        canActivate: [AuthGuardService]
      },
    ],
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);

