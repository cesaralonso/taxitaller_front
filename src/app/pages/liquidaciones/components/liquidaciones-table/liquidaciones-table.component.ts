import { ConfirmModalComponent } from './../../../../shared/confirm-modal/confirm-modal.component';
import { LiquidacionesAddModalComponent } from './liquidaciones-add-modal/liquidaciones-add-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { LiquidacionesInterface } from './liquidaciones.interface';
import { LiquidacionesResponseInterface } from './liquidaciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { LiquidacionesService } from './liquidaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LiquidacionesEditModalComponent } from './liquidaciones-edit-modal/liquidaciones-edit-modal.component';

@Component({
  selector: 'liquidaciones-table',
  templateUrl: './liquidaciones-table.html',
  styleUrls: ['./liquidaciones-table.scss'],
})
export class LiquidacionesTableComponent implements OnInit {

    data: LiquidacionesInterface;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idLiquidacion';
    sortOrder = 'asc';
    liquidacionesTable: any;

  constructor(
    private service: LiquidacionesService, 
    private modalService: NgbModal, 
    private toastrService: ToastrService,
    private dialogService: DialogService,
  ) {
    this.liquidacionesTable = [];
  }

    toInt(num: string) {
        return +num;
    }

    editLiquidacionesModalShow( taller ) {
      const disposable = this.dialogService.addDialog(LiquidacionesEditModalComponent, taller)
      .subscribe( data => {
          if ( data ) 
            this.showToast(data);
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    
    onDeleteConfirm(event, id): void {
      const disposable = this.dialogService.addDialog( ConfirmModalComponent, {
        title: ' Eiminar taller',
        message: '¿Estas seguro que deseas eliminar este taller?',
      }).subscribe( isDeleted => {
        if ( isDeleted ) {
          this.service.deleteLiquidaciones(id)
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
        this.getAllLiquidaciones();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllLiquidaciones();
    }
    
    private getAllLiquidaciones(): void {
        this.service
          .getAllLiquidaciones()
          .subscribe(
              data => this.data =  data.data ),
              error => console.log(error),
              () => console.log('Get all Items complete');
    }
    
    addLiquidacionesModal() {
      const disposable = this.dialogService.addDialog(LiquidacionesAddModalComponent, { })
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
