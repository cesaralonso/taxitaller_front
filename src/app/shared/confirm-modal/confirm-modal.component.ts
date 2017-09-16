import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

export interface ConfirmModel {
    title:string;
    message:string;
}

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html'
})

export class ConfirmModalComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
        title: string;
        message: string;
    constructor( dialogService: DialogService ) {
        super( dialogService );
     }

    ngOnInit() { }
    
    confirm() {
        // on click on confirm button we set dialog result as true,
        // ten we can get dialog result from caller code
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
}