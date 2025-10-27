import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aprobaciones-ejecucion-y-seguimiento',
  templateUrl: './aprobaciones-ejecucion-y-seguimiento.component.html',
  styleUrls: ['./aprobaciones-ejecucion-y-seguimiento.component.scss']
})
export class AprobacionesEjecucionYSeguimientoComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
