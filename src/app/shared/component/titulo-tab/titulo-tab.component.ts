import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-tab',
  templateUrl: './titulo-tab.component.html',
  styleUrls: ['./titulo-tab.component.scss']
})
export class TituloTabComponent implements OnInit {

  @Input() titulo!: string;

  constructor() { }

  ngOnInit(): void {

  }

}
