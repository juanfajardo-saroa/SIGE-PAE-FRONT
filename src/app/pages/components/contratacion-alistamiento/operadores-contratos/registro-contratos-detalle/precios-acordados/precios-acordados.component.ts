import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-precios-acordados',
  templateUrl: './precios-acordados.component.html',
  styleUrls: ['./precios-acordados.component.scss']
})
export class PreciosAcordadosComponent implements OnInit {

  @Input() idTipoModeloOperacion: number;
  @Input() dataSource: any;
  @Input() costoTotal: number;
  @Input() width: string;

  constructor() { }

  ngOnInit(): void {
  }

}
