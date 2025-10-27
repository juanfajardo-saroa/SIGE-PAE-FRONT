import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-plan-giros-anual-principal',
  templateUrl: './list-plan-giros-anual-principal.component.html',
  styleUrls: ['./list-plan-giros-anual-principal.component.scss']
})
export class ListPlanGirosAnualPrincipalComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
