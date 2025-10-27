import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `<div class="content" role="main">
    <router-outlet></router-outlet>
  </div>`
})

export class PagesComponent implements OnInit {


  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  constructor() {

   }

  ngOnInit(): void {

  }

}
