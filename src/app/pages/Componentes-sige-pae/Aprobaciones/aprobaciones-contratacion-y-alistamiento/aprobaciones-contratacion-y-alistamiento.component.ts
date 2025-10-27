import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aprobaciones-contratacion-y-alistamiento',
  templateUrl: './aprobaciones-contratacion-y-alistamiento.component.html',
  styleUrls: ['./aprobaciones-contratacion-y-alistamiento.component.scss']
})
export class AprobacionesContratacionYAlistamientoComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
