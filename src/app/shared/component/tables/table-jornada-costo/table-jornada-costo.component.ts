import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-jornada-costo',
  templateUrl: './table-jornada-costo.component.html',
  styleUrls: ['./table-jornada-costo.component.scss']
})
export class TableJornadaCostoComponent {

  @Input() dataSource: any = [];
  @Input() editar: boolean = false;
  @Input() signoPrecio: boolean = true;
}
