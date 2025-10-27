import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aprobaciones-planeacion-e-inicio',
  templateUrl: './aprobaciones-planeacion-e-inicio.component.html',
  styleUrls: ['./aprobaciones-planeacion-e-inicio.component.scss']
})
export class AprobacionesPlaneacionEInicioComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
