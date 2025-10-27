import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-costo-total-tab',
  templateUrl: './costo-total-tab.component.html',
  styleUrls: ['./costo-total-tab.component.scss']
})
export class CostoTotalTabComponent implements OnInit {

  @Input() Titulo: string = '';
  @Input() TotalGeneral: number = null;
  @Input() Orientacion: string = 'V'; //H = Horizontal. V = Vertical

  constructor() { }

  ngOnInit(): void {
  }

}
