import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './talleres.routing';
import { TalleresComponent } from './talleres.component';

import { TalleresAddModalComponent } from './components/talleres-table/talleres-add-modal/talleres-add-modal.component';
import { TalleresEditModalComponent } from './components/talleres-table/talleres-edit-modal/talleres-edit-modal.component';
import { TalleresService } from './components/talleres-table/talleres.service';

import { TalleresTableComponent } from './components/talleres-table/talleres-table.component';
import { DataFilterPipe } from './components/talleres-table/data-filter.pipe';

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
    NgbModalModule
  ],
  declarations: [
    TalleresComponent,
    TalleresTableComponent,
    DataFilterPipe,
    TalleresAddModalComponent,
    TalleresEditModalComponent
  ],
  entryComponents: [
    TalleresAddModalComponent,
    TalleresEditModalComponent
  ],
  providers: [
    TalleresService
  ]
})
export class TalleresModule {
}
