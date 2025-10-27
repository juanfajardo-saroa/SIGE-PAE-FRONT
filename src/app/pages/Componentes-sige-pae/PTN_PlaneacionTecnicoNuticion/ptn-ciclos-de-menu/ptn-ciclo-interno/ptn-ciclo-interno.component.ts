import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ptn-ciclo-interno',
  templateUrl: './ptn-ciclo-interno.component.html',
  styleUrls: ['./ptn-ciclo-interno.component.scss']
})
export class PtnCicloInternoComponent implements OnInit {
  @Input() idOpcionSeleccionado!: number;
  opcion1:boolean=false;
  opcion2:boolean=false;
  constructor() { }

  ngOnInit(): void {
    if(this.idOpcionSeleccionado==1){
      this.opcion1=true;
      this.opcion2=false;
    }else{
      this.opcion2=true;
      this.opcion1=false;
    }
  }

}
