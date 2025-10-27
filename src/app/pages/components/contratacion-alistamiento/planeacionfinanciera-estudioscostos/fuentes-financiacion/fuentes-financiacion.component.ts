import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CostosApiService  } from '../../../../../shared/services/costos-api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-fuentes-financiacion',
  //providers: [ CostosApiService ],
  templateUrl: './fuentes-financiacion.component.html',
  styleUrls: ['./fuentes-financiacion.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FuentesFinanciacionComponent implements OnInit ,OnDestroy{

  public displayedColumnsFinanciera: string[] = ['descripcion', 'fMAEM', 'fMAER', 'fMAIP', 'totalPAEC'];
  

  dataFinanciera: any;
  objFinanciera: any;

  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  private subs = new Subscription() 
  loadingVisible:boolean = false;
  tipoSeleccionado = 1;
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;
  anio: number = this.itemVigencia?.ano;

  
  porcRecaudados: any;
  porcReconocidos: any;

  constructor(
    private _costosApiService : CostosApiService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.get_CoberturaFinancieraResumenETC();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  get_CoberturaFinancieraResumenETC(){
    this.loadingVisible = true;

    this._costosApiService.get_CoberturaFinancieraResumenETC(this.idETC, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if(!response.success){
          this.messageService.showError(response.error, 'top center', 5000);
          return;
        }

        response.result[0].tipoFila = 'V';
        response.result[1].tipoFila = 'P';
        response.result[2].tipoFila = 'P';

        for(let i = 0; i < response.result.length; i++){
          response.result[i].colorMAEM = this.get_Color(response.result[i].colorMAEM);
          response.result[i].colorMAER = this.get_Color(response.result[i].colorMAER);
          response.result[i].colorMAIP = this.get_Color(response.result[i].colorMAIP);
          response.result[i].colorPAEC = this.get_Color(response.result[i].colorPAEC);
          response.result[i].colorTotal = this.get_Color(response.result[i].colorTotal);
        }

        let data = response.result;

        this.dataFinanciera = new MatTableDataSource(data);
        this.objFinanciera = {
          ingRecaudados:[
            {valor: data[1].ingresosMAEM, bgColor: data[1].colorMAEM},
            {valor: data[1].ingresosMAER, bgColor: data[1].colorMAER},
            {valor: data[1].ingresosMAIP, bgColor: data[1].colorMAIP}
          ],
          ingReconocidos:[
            {valor: data[2].ingresosMAEM, bgColor: data[2].colorMAEM},
            {valor: data[2].ingresosMAER, bgColor: data[2].colorMAER},
            {valor: data[2].ingresosMAIP, bgColor: data[2].colorMAIP}
          ],
        }

        this.porcRecaudados = this.objFinanciera.ingRecaudados[0];
        this.porcReconocidos = this.objFinanciera.ingReconocidos[0];
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError(error, 'top center', 5000);
      }
    });
  }

  public get_Color(color: string){
    if(color == '1'){
      return 'bg-green';
    }
    if(color == '2'){
      return 'bg-green-light';
    }

    if(color == '3'){
      return 'bg-yellow';
    }
    if(color == '4'){
      return 'bg-yellow-light';
    }

    if(color == '5'){
      return 'bg-orange';
    }
    if(color == '6'){
      return 'bg-orange-light';
    }

    return undefined;
  }


  public recargarCostoCobertura(recargar: boolean){
      if(recargar){
        this.get_CoberturaFinancieraResumenETC();
      }
  }

  public cargarCostosCobertura(value: any) {
    var target = value.currentTarget;
    this.cambiarFocoPestana(target);

    switch (target.id) {
      case "MAEM":
        this.porcRecaudados = this.objFinanciera.ingRecaudados[0];
        this.porcReconocidos = this.objFinanciera.ingReconocidos[0];
        this.tipoSeleccionado = 1;
        break;
      case "MAER":
        this.porcRecaudados = this.objFinanciera.ingRecaudados[1];
        this.porcReconocidos = this.objFinanciera.ingReconocidos[1];
        this.tipoSeleccionado = 2;
        break;
      case "MAIP":
        this.porcRecaudados = this.objFinanciera.ingRecaudados[2];
        this.porcReconocidos = this.objFinanciera.ingReconocidos[2];
        this.tipoSeleccionado = 3;
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

}
