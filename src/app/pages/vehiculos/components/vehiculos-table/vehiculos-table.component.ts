import { ConfirmModalComponent } from './../../../../shared/confirm-modal/confirm-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculosInterface } from './vehiculos.interface';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './vehiculos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosAddModalComponent } from './vehiculos-add-modal/vehiculos-add-modal.component';
import { VehiculosEditModalComponent } from './vehiculos-edit-modal/vehiculos-edit-modal.component';

@Component({
  selector: 'vehiculos-table',
  templateUrl: './vehiculos-table.html',
  styleUrls: ['./vehiculos-table.scss'],
})
export class VehiculosTableComponent implements OnInit {

    data: VehiculosInterface;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idVehiculo';
    sortOrder = 'asc';

  constructor(
    private service: VehiculosService, 
    private modalService: NgbModal, 
    private toastrService: ToastrService,
    private dialogService: DialogService,
  ) {

  }

    toInt(num: string) {
        return +num;
    }

    
    onDeleteConfirm(event, id): void {
      const disposable = this.dialogService.addDialog( ConfirmModalComponent, {
        title: ' Eiminar vehiculo',
        message: '¿Estas seguro que deseas eliminar este vehiculo?',
      }).subscribe( isDeleted => {
        if ( isDeleted ) {
          console.log('Deleted');
          this.service.deleteVehiculos(id)
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
        this.getAllVehiculos();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllVehiculos();
    }
    
    private getAllVehiculos(): void {
        this.service
          .getAllVehiculos()
          .subscribe(
              (data: VehiculosResponseInterface) => this.data =  data.data,
              error => console.log(error),
              () => console.log('Get all Items complete'));
    }
    
    editTalleresModal( vehiculo ) {
      const disposable = this.dialogService.addDialog(VehiculosEditModalComponent, vehiculo)
      .subscribe( data => {
          if ( data ) 
            this.showToast(data);
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }

    addVehiculosModal() {
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent, { })
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
}
