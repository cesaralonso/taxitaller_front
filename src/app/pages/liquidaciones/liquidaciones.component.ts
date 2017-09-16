import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'liquidaciones',
  templateUrl: './liquidaciones.html'
})
export class LiquidacionesComponent implements OnInit {

  constructor() {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  
  }

}
