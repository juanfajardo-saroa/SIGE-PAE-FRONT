import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { environment } from 'src/environments/environment';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-tab-planeacion-financiera',
  templateUrl: './tab-planeacion-financiera.component.html',
  styleUrls: ['./tab-planeacion-financiera.component.scss']
})
export class TabPlaneacionFinancieraComponent implements OnInit {
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  idETC = Number(localStorage.getItem('IdUbicacion'));
 private subs = new Subscription()
 public nombreUbicacion = 'UApA | Plan Anualizado de Caja (PAC)';
 public ViSeleccionada = localStorage.getItem('VigSeleccionada');
 public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
 mostarEncabezadoMenu: boolean = true;
 VigSelect: string = 'si';
 VigNoSelect: string = 'no';
 Vigencia: any;
 nombreVigAnoSeleccionada: number = 0;
 public dataArrayInterno: any;
 public dataArraySelectVig: any;
 public dataArrayInternoVigSelect: any;
 public dataArrayInternoVigNoSelect: any;
 isLoading = true;
 
 public tipoSeleccionado: number = 1;
 idtab=0;
 apr:boolean=false;
 dis:boolean=false;
  constructor(public VigenciasServicio: VigenciasService,
    private route: ActivatedRoute,
    private seguridadService: SeguridadService,
    ) {
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
    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArraySelectVig = response.filter(items => items.id == Number(localStorage.getItem('VigSeleccionada')));
        this.nombreVigAnoSeleccionada = this.dataArraySelectVig[0].nombre;
        this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);

     

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  Check: boolean = true;
  CambioVigencia(value: any) {


    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();

        if(this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre){
          this.Check = false;
        }return this.Check
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  CambioNoVigencia() {


    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigNoSelect = response.filter(items => items.id != Number(localStorage.getItem('VigSeleccionada')));;
        localStorage.setItem('VigNoSeleccionada', this.dataArrayInternoVigNoSelect[0].id);
        window.location.reload();
        this.Check = false;

      },
      (err) => {
        this.isLoading = false;
      }
    );
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
          claseAdd = "tab-item pestanaCC";
          div.className = claseAdd;
        }
      }

      claseAdd = "";
      claseAdd += "tab-item pestanaCC active";
    }

    target.className = claseAdd;
  }

  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action); 
  }
}
