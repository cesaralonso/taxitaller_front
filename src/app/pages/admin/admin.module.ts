import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './admin.routing';
import { Admin } from './admin.component';

import { ProfileEdit } from './components/profile-edit/profile-edit.component';
import { UsuariosEditForm } from './components/profile-edit/components/usuarios-edit-form';

import { Users } from './components/users/users.component';
import { UsuariosTable } from './components/users/components/usuarios-table/usuarios-table.component';
import { UserAddModalComponent } from './components/users/components/usuarios-table/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from './components/users/components/usuarios-table/user-edit-modal/user-edit-modal.component';
import { UserService } from './components/users/components/usuarios-table/user.service';

import { DataFilterPipe } from './data-filter.pipe';

import { GroupsComponent } from './components/groups/groups.component';
import { GroupsService } from './components/groups/components/groups-table/groups.service';
import { GroupsTableComponent } from './components/groups/components/groups-table/groups-table.component';
import { GroupsEditModalComponent } from './components/groups/components/groups-table/groups-edit-modal/groups-edit-modal.component';
import { GroupsAddModalComponent } from './components/groups/components/groups-table/groups-add-modal/groups-add-modal.component';



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
    Users,
    ProfileEdit,
    Admin,
    UsuariosEditForm,
    UsuariosTable,
    DataFilterPipe,
    UserAddModalComponent,
    UserEditModalComponent,
    GroupsComponent,
    GroupsTableComponent,
    GroupsAddModalComponent,
    GroupsEditModalComponent
  ],
  entryComponents: [
    UserAddModalComponent,
    UserEditModalComponent,
    GroupsAddModalComponent,
    GroupsEditModalComponent,
  ],
  providers: [
    UserService,
    GroupsService,
  ]
})
export class AdminModule {
}
