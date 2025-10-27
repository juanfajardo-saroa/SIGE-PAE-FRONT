import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ptn-prepacion-interno',
  templateUrl: './ptn-prepacion-interno.component.html',
  styleUrls: ['./ptn-prepacion-interno.component.scss']
})
export class PtnPrepacionInternoComponent implements OnInit {

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
