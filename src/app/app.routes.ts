import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnterPasswordComponent } from './enter-password/enter-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'enter-password',
    component: EnterPasswordComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const appRoutingProviders: any[] = [
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
