import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item5',
  templateUrl: './item5.component.html',
  styleUrls: ['./item5.component.sass']
})
export class Item5Component implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }


  Anterior(){
    this.router.navigate(['contratosSupervision2']);
  }

}
