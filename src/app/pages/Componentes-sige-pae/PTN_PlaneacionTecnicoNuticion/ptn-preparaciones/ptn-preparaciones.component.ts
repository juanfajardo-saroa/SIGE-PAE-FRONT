import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ptn-preparaciones',
  templateUrl: './ptn-preparaciones.component.html',
  styleUrls: ['./ptn-preparaciones.component.scss']
})
export class PTNPreparacionesComponent implements OnInit {

  public tipoSeleccionado: number = 1;
  idtab=0;
  apr:boolean=false;
  dis:boolean=false;
  constructor( private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      this.idtab = +params.tab;

    });
    if(this.idtab==1){
      this.tipoSeleccionado = 2;
      this.apr=true;
      this.dis=false;

    }else{
      this.tipoSeleccionado = 1;
      this.apr=false;
      this.dis=true;
    }
   }

  ngOnInit(): void {
  }
  public cargarPTNpreparacion(value: any) {
    var target = value.currentTarget;
    this.cambiarFocoPestana(target);

    switch (target.id) {
      case "disponible":
        this.tipoSeleccionado = 1;
        break;
      case "aprobacion":
        this.tipoSeleccionado = 2;
        break;
    }
  }

  public cambiarFocoPestana(target: any){
    var clases = target.className.split(" ");
    var claseAdd = "";
    if(clases.length > 0){
      var divPestanas: any = document.getElementsByClassName("pestanaCC");
      for (let div of divPestanas) {
        var claseDiv = div.className.split(" ");
        if(claseDiv[2] == "active"){
          claseAdd = "tab-item pestanaCC w-down-auto d-flex";
          div.className = claseAdd;
        }
      }

      claseAdd = "";
      claseAdd += "tab-item pestanaCC active w-down-auto d-flex";
    }

    target.className = claseAdd;
  }
}
