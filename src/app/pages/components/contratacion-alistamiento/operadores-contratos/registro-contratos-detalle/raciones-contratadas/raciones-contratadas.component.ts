import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-raciones-contratadas',
  templateUrl: './raciones-contratadas.component.html',
  styleUrls: ['./raciones-contratadas.component.scss']
})
export class RacionesContratadasComponent implements OnInit {

  @Input() idTipoModeloOperacion: number;
  @Input() dataSource: any;
  @Input() total: number;
  @Input() width: string;

  constructor() { }

  ngOnInit(): void {
  }

}
