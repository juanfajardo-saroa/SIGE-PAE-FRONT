import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-costos-pae',
  templateUrl: './costos-pae.component.html',
  styleUrls: ['./costos-pae.component.scss']
})
export class CostosPaeComponent implements OnInit {

  @Input() dataSourceCS: any;
  @Input() idTipoModeloOperacion: number;
  @Input() costoTotalCS: number;

  constructor() { }

  ngOnInit(): void {

  }

}
