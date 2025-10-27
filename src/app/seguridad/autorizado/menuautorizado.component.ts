import { Component, AfterViewInit, OnInit, Input,OnDestroy } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-menuautorizado',
  templateUrl: './menuautorizado.component.html',

})
export class MenuAutorizadoComponent implements  AfterViewInit, OnInit,OnDestroy {


  public rolactual =localStorage.getItem('RolBase');
  public sistema = localStorage.getItem('SistemaSelect');



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

  ngAfterViewInit() { }

  ngOnDestroy() {

  }

}


