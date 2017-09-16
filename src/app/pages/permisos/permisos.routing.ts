import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PermisosComponent } from './permisos.component';
// import { TalleresTableComponent } from './components/talleres-table/talleres-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    children: [
    //   { path: 'talleres-table', component: TalleresTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
