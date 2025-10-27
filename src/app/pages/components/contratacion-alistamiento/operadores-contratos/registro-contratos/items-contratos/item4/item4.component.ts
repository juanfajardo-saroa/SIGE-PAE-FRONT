import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item4',
  templateUrl: './item4.component.html',
  styleUrls: ['./item4.component.sass']
})
export class Item4Component implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  Anterior(){
    this.router.navigate(['contratosSupervision2']);
  }
  
  Siguiente(){
    this.router.navigate(['contratosSupervision4']);
  }


}
