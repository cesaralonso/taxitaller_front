import { VehiculosAddModalComponent } from './vehiculos-add-modal/vehiculos-add-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculosInterface } from './vehiculos.interface';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './vehiculos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    vehiculosTable: VehiculosInterface[];

  constructor(
    private service: VehiculosService, 
    private modalService: NgbModal, 
    private toastrService: ToastrService,
    private dialogService: DialogService,
  ) {
    this.vehiculosTable = [];
  }

    toInt(num: string) {
        return +num;
    }

    addVehiculosModalShow() {
      const activeModal = this.modalService.open(VehiculosAddModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Vehiculo';
    }

    editVehiculosModalShow(id: any) {
      const activeModal = this.modalService.open(VehiculosEditModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Editar Usuario';
      activeModal.componentInstance.idVehiculos = id;
    }
    
    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.deleteVehiculos(id)
          .subscribe(
            (data) => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );

      } else {
        console.log('item.id cancelando', id);
      }
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
              (data: VehiculosResponseInterface) => this.data = data.data,
              error => console.log(error),
              () => console.log('Get all Items complete'));
    }
    
    showModalSearch() {
      const disposable = this.dialogService.addDialog( VehiculosAddModalComponent ).subscribe( data => {
          if ( data.status === 'success' ) {
            this.vehiculosTable.push( data.data );
            this.showToast( data.message );
          }
      });
    }
}
