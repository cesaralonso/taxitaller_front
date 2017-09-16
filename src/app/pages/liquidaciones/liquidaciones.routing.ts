import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LiquidacionesComponent } from './liquidaciones.component';
import { LiquidacionesTableComponent } from './components/liquidaciones-table/liquidaciones-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LiquidacionesComponent,
    children: [
      { path: 'liquidaciones-table', component: LiquidacionesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
