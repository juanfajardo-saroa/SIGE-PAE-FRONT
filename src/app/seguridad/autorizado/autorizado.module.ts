
import { NgModule, OnInit } from '@angular/core';
import { AutorizadoComponent } from './autorizado.component';


@NgModule({
  declarations: [
    AutorizadoComponent,
  ],
  exports: [
    AutorizadoComponent,
  ]
})


export class AutorizadoModule implements OnInit {
  test : Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
