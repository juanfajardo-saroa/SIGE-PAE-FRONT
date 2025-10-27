import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paec',
  templateUrl: './paec.component.html'
})
export class PaecComponent implements OnInit {

  public iD_TipoModeloOperacion: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
