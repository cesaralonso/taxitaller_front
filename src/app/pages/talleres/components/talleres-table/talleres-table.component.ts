import { TallerAddModalComponent } from './taller-add-modal/taller-add-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from './talleres.interface';
import { TalleresResponseInterface } from './talleres-response.interface';
import { Component, OnInit } from '@angular/core';
import { TalleresService } from './talleres.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TalleresAddModalComponent } from './talleres-add-modal/talleres-add-modal.component';
import { TalleresEditModalComponent } from './talleres-edit-modal/talleres-edit-modal.component';

@Component({
  selector: 'talleres-table',
  templateUrl: './talleres-table.html',
  styleUrls: ['./talleres-table.scss'],
})
export class TalleresTableComponent implements OnInit {

    data: TalleresInterface;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idTaller';
    sortOrder = 'asc';
    talleresTable: any;

  constructor(
    private service: TalleresService, 
    private modalService: NgbModal, 
    private toastrService: ToastrService,
    private dialogService: DialogService,
  ) {
    this.talleresTable = [];
  }

    toInt(num: string) {
        return +num;
    }

    addTalleresModalShow() {
      const activeModal = this.modalService.open(TalleresAddModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Taller';
    }

    editTalleresModalShow(id: any) {
      const activeModal = this.modalService.open(TalleresEditModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Editar Usuario';
      activeModal.componentInstance.idTalleres = id;
    }
    
    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.deleteTalleres(id)
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
        this.getAllTalleres();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllTalleres();
    }
    
    private getAllTalleres(): void {
        this.service
          .getAllTalleres()
          .subscribe(
              data => this.data =  data.data ),
              error => console.log(error),
              () => console.log('Get all Items complete');
    }
    
    showModalSearch() {
      const disposable = this.dialogService.addDialog(TallerAddModalComponent)
        .subscribe( data => {
            this.showToast( data );
        });
    }
}
