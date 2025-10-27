import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolMenuComponent implements OnInit {
  public nombreRol="";

  constructor() {  this.nombreRol = localStorage.getItem('RolBase');}



  ngOnInit() {
    this.nombreRol = localStorage.getItem('RolBase');
  }

  refrescar(){
    this.nombreRol = localStorage.getItem('RolBase');

  }

}
