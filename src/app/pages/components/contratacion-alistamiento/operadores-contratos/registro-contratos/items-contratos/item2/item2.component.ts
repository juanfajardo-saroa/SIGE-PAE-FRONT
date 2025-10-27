import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html',
  styleUrls: ['./item2.component.sass']
})
export class Item2Component implements OnInit {

  public checkbox: any;

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.checkbox = new MatCheckboxModule();
  }



  Anterior(){
    this.router.navigate(['contratosSupervision']);
  }
  
  Siguiente(){
    this.router.navigate(['contratosSupervision2']);
  }




}
