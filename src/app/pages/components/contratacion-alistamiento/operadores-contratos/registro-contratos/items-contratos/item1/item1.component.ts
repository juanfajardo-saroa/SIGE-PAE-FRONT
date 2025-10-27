import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContratosApiService  } from '../../../../../../../shared/services/contratos-api.service';


@Component({
  selector: 'app-item1',
  providers: [
    ContratosApiService,
  ],
  templateUrl: './item1.component.html',
  styleUrls: ['./item1.component.sass']
})
export class Item1Component implements OnInit {

  public tipoContrato!: number;
  public tipoSupervision!: number ;
  public dataOperadores: any = [];
  public dataContratoChip: any = [];
  public empresaInterventora: any = [];

  model = {
    numeroContrato: "",
    empresaInterventora: "",
    objetoContrato: "",
    tipoContratoChip: ""
  }

  constructor(
    public router: Router,
    private rutaActiva: ActivatedRoute,
    private _contratosApiService : ContratosApiService,
  ) {   }


  ngOnInit(): void {

    this.tipoContrato = this.rutaActiva.snapshot.params.tipoContrato;
    this.tipoSupervision = this.rutaActiva.snapshot.params.tipoSupervision;
    this.getOperadores();
    this.getContratoChip();

  }

  Anterior(){
    this.router.navigate(['registroUnicoContratos']);
  }

  Siguiente(){
    this.router.navigate(['contratosSupervision1']);
  }

  getOperadores(){
    this._contratosApiService.Get_AllOperadores()
    .subscribe(response => {
      if(response.success){
        this.dataOperadores = response.result;
      }
      else{ alert("ERROR: " + response.error); }
    });
  }

  getContratoChip(){
    this._contratosApiService.Get_AllContratoChip()
    .subscribe(response => {
      if(response.success){
        this.dataContratoChip = response.result;
      }
      else{ alert("ERROR: " + response.error); }
    });
  }

  onSubmit(values: any): void{


  }




}


interface contratoForm
{
  "numeroContrato": string,
  "empresaInterventora": number,
  "objetoContrato": string,
  "tipoContratoChip": number
}



