import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../shared/auth-guard.service';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forgot',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
  },
  {
    path: 'change-password',
    loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule', 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivateChild: [AuthGuard] },
      { path: 'permisos', loadChildren: './permisos/permisos.module#PermisosModule', canActivateChild: [AuthGuard] },
      { path: 'talleres', loadChildren: './talleres/talleres.module#TalleresModule', canActivateChild: [AuthGuard] },
      { path: 'vehiculos', loadChildren: './vehiculos/vehiculos.module#VehiculosModule', canActivateChild: [AuthGuard] },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivateChild: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
