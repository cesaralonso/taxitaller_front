import { PermisosService } from './../permisos.service';
import { PermisosInterface } from './permisos.interface';
import { ConfirmModalComponent } from './../../../../shared/confirm-modal/confirm-modal.component';
// import { TalleresAddModalComponent } from './talleres-add-modal/talleres-add-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
// import { TalleresInterface } from './talleres.interface';
// import { TalleresResponseInterface } from './talleres-response.interface';
import { Component, OnInit } from '@angular/core';
// import { TalleresService } from './talleres.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { TalleresEditModalComponent } from './talleres-edit-modal/talleres-edit-modal.component';

@Component({
  selector: 'permisos-table',
  templateUrl: './permisos-table.component.html',
  styleUrls: ['./permisos-table.scss'],
})
export class PermisosTableComponent implements OnInit {

    data: PermisosInterface;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idTaller';
    sortOrder = 'asc';
    talleresTable: any;

  constructor(
    // private service: TalleresService, 
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

    editTalleresModalShow( taller ) {
    //   const disposable = this.dialogService.addDialog(TalleresEditModalComponent, taller)
    //   .subscribe( data => {
    //       if ( data ) 
    //         this.showToast(data);
    //   },
    //   error => console.log(error),
    //   () => console.log('Modified complete'));
    }
    
    onDeleteConfirm(event, id): void {
      const disposable = this.dialogService.addDialog( ConfirmModalComponent, {
        title: ' Eiminar taller',
        message: '¿Estas seguro que deseas eliminar este taller?',
      }).subscribe( isDeleted => {
        // if ( isDeleted ) {
        //   this.service.deleteTalleres(id)
        //       .subscribe(
        //         (data) => this.showToast(data),
        //         error => console.log(error),
        //         () => console.log('Delete completed')
        //       );
        // } else {
        //   console.log('item.id cancelando', id);
        // }
      })
    }

    showToast(data) {
      if (data.status === 'success') {
        this.toastrService.success(data.message);
        // this.getAllTalleres();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }
    
    // private getAllTalleres(): void {
    //     this.service
    //       .getAllTalleres()
    //       .subscribe(
    //           data => this.data =  data.data ),
    //           error => console.log(error),
    //           () => console.log('Get all Items complete');
    // }
    
    // addTalleresModal() {
    //   const disposable = this.dialogService.addDialog(TalleresAddModalComponent, { })
    //     .subscribe( data => {
    //       if ( data !== undefined) {
    //         this.showToast( data );
    //       } else {
    //         console.log('is undefined');
    //       }
    //     },
    //     error => console.log(error),
    //     () => console.log('Added complete'));
    // }
    addPermisosModal(){}
}
