import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-precios-racion',
  templateUrl: './precios-racion.component.html',
  styleUrls: ['./precios-racion.component.scss']
})
export class PreciosRacionComponent implements OnInit {

  @Input() dataSourcePxP: any;
  @Input() idTipoModeloOperacion: number;
  @Input() editarPrecios: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
