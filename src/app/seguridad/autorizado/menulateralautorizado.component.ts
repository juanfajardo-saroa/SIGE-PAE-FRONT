import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-menulateralautorizado',
  templateUrl: './menulateralautorizado.component.html',

})
export class MenuLateralAutorizadoComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  @Input()
  rol: string;

  ngOnInit(): void {
  }

  estaMenuAutorizado(): boolean {
    if (this.rol){
      return this.seguridadService.obtenerRol() === this.rol;
    } else{
      return this.seguridadService.estaLogueado();
    }
  }

}


