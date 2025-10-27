import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aprobaciones-cierre-y-evaluacion',
  templateUrl: './aprobaciones-cierre-y-evaluacion.component.html',
  styleUrls: ['./aprobaciones-cierre-y-evaluacion.component.scss']
})
export class AprobacionesCierreYEvaluacionComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
