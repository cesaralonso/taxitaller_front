import { UserResponseInterface } from './user-response.interface';
import { ToastrService } from 'ngx-toastr';
import { UserInterface } from './user.interface';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddModalComponent } from './user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';


@Component({
  selector: 'usuarios-table',
  templateUrl: './usuarios-table.html',
  styleUrls: ['./usuarios-table.scss']
})
export class UsuariosTable implements OnInit {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "nombre";
    sortOrder = "asc";

    constructor(private service: UserService, private modalService: NgbModal, private toastrService: ToastrService) {
    }

    toInt(num: string) {
        return +num;
    }

    addUserModalShow() {
      const activeModal = this.modalService.open(UserAddModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Usuario';
    }

    editUserModalShow(id: any) {
      const activeModal = this.modalService.open(UserEditModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Editar Usuario';
      activeModal.componentInstance.idUser = id;
    }
    
    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.deleteUser(id)
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
        this.getAllUsers();
      } else if (data.status === 'warning') {
        this.toastrService.warning(data.message);
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllUsers();
    }
    
    private getAllUsers(): void {
        this.service
          .getAllUsers()
          .subscribe(
              (data: UserResponseInterface) => this.data = data.data,
              error => console.log(error),
              () => console.log('Get all Items complete'));
    }

    
}
