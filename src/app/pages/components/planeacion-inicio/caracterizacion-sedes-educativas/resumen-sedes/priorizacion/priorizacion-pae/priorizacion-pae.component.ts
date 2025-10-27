import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priorizacion-pae',
  templateUrl: './priorizacion-pae.component.html',
  styleUrls: ['./priorizacion-pae.component.scss']
})
export class PriorizacionPaeComponent implements OnInit {

  @Input() textRight: string;
  @Input() modeloOperacion: string;
  @Input() dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
