import { Component, EventEmitter, Input, OnInit, Output,OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { GrupoMinutaMAER } from 'src/app/shared/constants/grupo-minuta-maer.constant';
import { SubgrupoMinutaMAER } from 'src/app/shared/constants/subgrupo-minuta-maer.constant';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-patron-maer',
  templateUrl: './footer-patron-maer.component.html',
  styleUrls: ['./footer-patron-maer.component.scss']
})
export class FooterPatronMaerComponent implements OnInit,OnDestroy {

  @Input() iD_MinutaPatronAlimento:any;
  @Input() TipoComplementoId: number;
  @Input() dataSourceComponentes: any;
  @Input() dataSourceComponentesPrep: any;
  @Input() dataMacroNutrientes: any;
  @Input() dataMicroNutrientes: any;
  @Output() cancelarEdicionMod = new EventEmitter<any>();

  public readonly  TipoComplementoAlmuerzo = 1;
  public readonly subgrupoMinutaMAER = SubgrupoMinutaMAER;
  public readonly grupoMinutaMAER = GrupoMinutaMAER;
  private subs = new Subscription() 
  loadingVisible = false;
  public SubGrupoAlimentoAzucaressiemples: number =10;
  public GrupoAlimentoAzucaressiemples: number =6;
  public ID_NutrienteZinc: number = 13;
  public ID_NutrienteSodio: number = 4;
  public ID_NutrienteVitaminaA: number = 15;
  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  guardarAlimentosNutrientesMinuta() {
    let dataAlimentos = this.getDataMinutaAlimentos();

    for (let i = 0; i < dataAlimentos.length; i++) {
      const obj = dataAlimentos[i];

      if (!(obj.frecuencia > 0)) {
        this._messageService.showWarning('Por favor seleccionar la frecuencia en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }

      if ((!(obj.numIntercambios > 0) && obj.minVisible) ) {
        this._messageService.showWarning('Por favor digitar el valor del intercambio "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }

    }
    
    let dataNutrientes = this.getDataMinutaNutrientes();

    for (let i = 0; i < dataNutrientes.length; i++) {
      let obj = dataNutrientes[i];
      
      if (obj.idNutriente !=this.ID_NutrienteSodio) 
      {
        if (!obj.calculado && (!(obj.aporteMinimo > 0) || !(obj.aporteRecomendadoMin > 0))) {
          this._messageService.showWarning('Digite los aportes minimos y recomendados (' + obj.nomNutriente + ')', 'top center', 5000);
          return;
        }
      }
    }

    let data = {
      DataAlimentosPatron: dataAlimentos, DataNutrientesPatron: dataNutrientes
    };

    this.loadingVisible = true;
    this._minutasApiService.UpdateAlimentosNutrientesPatron(this.iD_MinutaPatronAlimento, data).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en UpdateAlimentosNutrientesPatron: ' + response.error, 'top center', 5000);
          return;
        }

        this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center', 5000);
        this.cancelarEdicion();
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en UpdateAlimentosNutrientesPatron: ' + error, 'top center', 5000);
      }
    });
  }

  /* get_AlimentosMinuta(){
    this._minutasApiService.get_AlimentosMinutaMAER(this.IdMinutaPatronAlimento).subscribe({
      next: response => {
        if(response.success){
          this.itemComponent = response.result.alimentoMinutaAgrupado;
          this.dataSourceComponents = response.result.listGruposAlimentoMinutaAgrupado.filter(grupo => grupo.id != 99 && grupo.id != 5);
          this.dataComponentInPreparations = response.result.listGruposAlimentoMinutaAgrupado.filter(grupo => grupo.id == 99 || grupo.id == 5);
          this.valTotalRowsDataSourceComponentes();
          this.setTotalIntercambios();
        }
        else {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }
      }
    });
  }
 */
  getDataMinutaAlimentos() {
    let data = [];
    
    

    for (let i = 0; i < this.dataSourceComponentes.length; i++) {
      const obj = this.dataSourceComponentes[i];
      var frecuenciahuevos=0;
      var frecuenciaactual=0;
      const frecuenciaHuevosYLeguminosas = obj.listSubGrupo.find(subgrupo => subgrupo.iD_Grupo == this.grupoMinutaMAER.CARNES_HUEVOS_LEGUMINOSAS_SECAS_FRUTOS_SECOS_Y_SEMILLAS && subgrupo.id == this.subgrupoMinutaMAER.HUEVOS)?.frecuencia;
      for (let j = 0; j < obj.listSubGrupo.length; j++) {
        frecuenciaactual = obj.listSubGrupo[j].frecuencia;
        if (this.TipoComplementoId== this.TipoComplementoAlmuerzo)
        {
          if (obj.listSubGrupo[j].id == this.subgrupoMinutaMAER.HUEVOS)
          {
            frecuenciahuevos = obj.listSubGrupo[j].frecuencia;
          }
          if (obj.listSubGrupo[j].id == this.subgrupoMinutaMAER.LEGUMINOSAS_COCIDAS_Y_MEZCLAS_VEGETALES_COCIDAS)
          {
            frecuenciaactual = frecuenciahuevos
          } 
        }
        data.push({
          iD_TipoComponente: obj.iD_TipoComponente,
          iD_GrupoAlimento: obj.id,
          ID_SubGrupoAlimento:obj.listSubGrupo[j].id,
          frecuencia: frecuenciaactual,
          numIntercambios: obj.listSubGrupo[j].numIntercambios,
          numIntercambiosMax: obj.listSubGrupo[j].numIntercambiosMax,
          iD_TipoSentidoValidacion :obj.listSubGrupo[j].iD_TipoSentidoValidacion
          //minVisible: obj.nombreComponente.trim().toUpperCase() == 'GRASAS' ? false : true,
        });
      }
    }
    for (let i = 0; i < this.dataSourceComponentesPrep.length; i++) {
      const obj = this.dataSourceComponentesPrep[i];
      for (let j = 0; j < obj.listSubGrupo.length; j++) {
        data.push({
          iD_TipoComponente: obj.iD_TipoComponente,
          iD_GrupoAlimento:  obj.listSubGrupo[j].id == this.SubGrupoAlimentoAzucaressiemples ? this.GrupoAlimentoAzucaressiemples : obj.id ,
          ID_SubGrupoAlimento:obj.listSubGrupo[j].id,
          frecuencia: obj.listSubGrupo[j].iD_Grupo == this.grupoMinutaMAER.GRASAS ? obj.listSubGrupo[0].frecuencia : obj.listSubGrupo[j].frecuencia,
          //numIntercambios: obj.listSubGrupo[j].iD_Grupo == this.grupoMinutaMAER.GRASAS ? obj.listSubGrupo[0].numIntercambios : obj.listSubGrupo[j].numIntercambios,
          //numIntercambiosMax: obj.listSubGrupo[j].iD_Grupo == this.grupoMinutaMAER.GRASAS ? obj.listSubGrupo[0].numIntercambiosMax : obj.listSubGrupo[j].numIntercambiosMax,
          numIntercambios: obj.listSubGrupo[j].numIntercambios,
          numIntercambiosMax: obj.listSubGrupo[j].numIntercambiosMax,
          iD_TipoSentidoValidacion :obj.listSubGrupo[j].iD_TipoSentidoValidacion
          //minVisible: obj.nombreComponente.trim().toUpperCase() == 'GRASAS' ? false : true,
        });
      }
    }

    

    return data;
  }

  getDataMinutaNutrientes() {
    let dataNutrientes = [];

    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      dataNutrientes.push(this.dataMacroNutrientes[i]);
    }

    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      dataNutrientes.push(this.dataMicroNutrientes[i]);
    }

    return dataNutrientes;
  }

  cancelarEdicion() {
    this.cancelarEdicionMod.emit();
  }

}
