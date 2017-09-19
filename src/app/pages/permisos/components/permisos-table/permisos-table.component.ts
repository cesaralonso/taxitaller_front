import { PermisosAddModalComponent } from './permisos-add-modal/permisos-add-modal.component';
import { PermisosEditModalComponent } from './permisos-edit-modal/permisos-edit-modal.component';
import { PermisosService } from './../permisos.service';
import { PermisosInterface } from './permisos.interface';
import { ConfirmModalComponent } from './../../../../shared/confirm-modal/confirm-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'permisos-table',
  templateUrl: './permisos-table.component.html',
  styleUrls: ['./permisos-table.scss'],
})
export class PermisosTableComponent implements OnInit {

    data: PermisosInterface;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtaller';
    sortOrder = 'asc';
    talleresTable: any;

  constructor(
    private modalService: NgbModal, 
    private toastrService: ToastrService,
    private dialogService: DialogService,
    private permisosService: PermisosService,
  ) {
    this.talleresTable = [];
  }
    ngOnInit() {
      this.getPermisos();
    }

    private getPermisos() {
      this.permisosService.getAllPermisos()
        .subscribe( 
          data => this.data = data.data,
          error => console.log(error),
          () => console.log('Get all Items complete')
        );
    }

    toInt(num: string) {
        return +num;
    }

    editPermisosModalShow( taller ) {
      const disposable = this.dialogService.addDialog(PermisosEditModalComponent, taller)
      .subscribe( data => {
          if ( data ) {
            this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    
    addPermisosModal() {
      const disposable = this.dialogService.addDialog(PermisosAddModalComponent, { })
        .subscribe( data => {
          if ( data !== undefined) {
            this.showToast( data );
          } else {
            console.log('is undefined');
          }
        },
        error => console.log(error),
        () => console.log('Added complete'));
    }

    onDeleteConfirm(event, id): void {
      const disposable = this.dialogService.addDialog( ConfirmModalComponent, {
        title: ' Eiminar permiso',
        message: '¿Estas seguro que deseas eliminar este permiso?',
      }).subscribe( isDeleted => {
        if ( isDeleted ) {
          this.permisosService.deletePermisos(id)
              .subscribe(
                (data) => this.showToast(data),
                error => console.log(error),
                () => console.log('Delete completed')
              );
        } else {
          console.log('item.id cancelando', id);
        }
      })
    }

    showToast(data) {
      if (data.status === 'success') {
        this.toastrService.success(data.message);
        this.getPermisos();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }
    
}



