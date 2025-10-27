import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-menadminuautorizado',
  templateUrl: './menuadminautorizado.component.html',

})
export class MenuAdminAutorizadoComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  @Input()
  rol: string;

  ngOnInit(): void {
  }

  estaMenuAdminAutorizado(): boolean {
    if (this.rol){
      return this.seguridadService.obtenerRol() === this.rol;
    } else{
      return this.seguridadService.estaLogueado();
    }
  }

}


