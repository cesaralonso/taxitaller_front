import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


import { routing } from './vehiculos.routing';
import { VehiculosComponent } from './vehiculos.component';

import { VehiculosAddModalComponent } from './components/vehiculos-table/vehiculos-add-modal/vehiculos-add-modal.component';
import { VehiculosEditModalComponent } from './components/vehiculos-table/vehiculos-edit-modal/vehiculos-edit-modal.component';
import { VehiculosService } from './components/vehiculos-table/vehiculos.service';

import { VehiculosTableComponent } from './components/vehiculos-table/vehiculos-table.component';
import { DataFilterPipe } from './components/vehiculos-table/data-filter.pipe';

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
    VehiculosComponent,
    VehiculosTableComponent,
    DataFilterPipe,
    VehiculosAddModalComponent,
    VehiculosEditModalComponent,
  ],
  entryComponents: [
    VehiculosAddModalComponent,
    VehiculosEditModalComponent,
  ],
  providers: [
    VehiculosService
  ]
})
export class VehiculosModule {
}
