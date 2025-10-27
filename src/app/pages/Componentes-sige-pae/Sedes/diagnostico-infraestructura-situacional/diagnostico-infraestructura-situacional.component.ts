import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-diagnostico-infraestructura-situacional',
  templateUrl: './diagnostico-infraestructura-situacional.component.html',
  styleUrls: ['./diagnostico-infraestructura-situacional.component.scss']
})
export class DiagnosticoInfraestructuraSituacionalComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  constructor() { }

  ngOnInit(): void {
  }

}
