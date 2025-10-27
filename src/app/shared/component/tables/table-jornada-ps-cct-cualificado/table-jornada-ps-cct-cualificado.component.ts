import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-jornada-ps-cct-cualificado',
  templateUrl: './table-jornada-ps-cct-cualificado.component.html'
})
export class TableJornadaPsCctCualificadoComponent implements OnInit {

  @Input() dataSource = [];
  @Input() editar = false;
  @Input() signoPrecio: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
