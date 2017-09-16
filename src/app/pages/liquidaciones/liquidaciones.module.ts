import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


import { routing } from './liquidaciones.routing';
import { LiquidacionesComponent } from './liquidaciones.component';

import { LiquidacionesEditModalComponent } from './components/liquidaciones-table/liquidaciones-edit-modal/liquidaciones-edit-modal.component';
import { LiquidacionesService } from './components/liquidaciones-table/liquidaciones.service';
import { LiquidacionesAddModalComponent } from './components/liquidaciones-table/liquidaciones-add-modal/liquidaciones-add-modal.component';

import { LiquidacionesTableComponent } from './components/liquidaciones-table/liquidaciones-table.component';
import { DataFilterPipe } from './components/liquidaciones-table/data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })    
  ],
  declarations: [
    LiquidacionesComponent,
    LiquidacionesTableComponent,
    DataFilterPipe,
    LiquidacionesEditModalComponent,
    LiquidacionesAddModalComponent,
  ],
  entryComponents: [
    LiquidacionesAddModalComponent,
    LiquidacionesEditModalComponent,
  ],
  providers: [
    LiquidacionesService
  ]
})
export class LiquidacionesModule {
}
