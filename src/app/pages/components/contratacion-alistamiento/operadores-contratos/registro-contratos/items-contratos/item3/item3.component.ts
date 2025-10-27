import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-item3',
  templateUrl: './item3.component.html',
  styleUrls: ['./item3.component.sass']
})
export class Item3Component implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }


  Anterior(){
    this.router.navigate(['contratosSupervision1']);
  }
  
  Siguiente(){
    this.router.navigate(['contratosSupervision3']);
  }




}
