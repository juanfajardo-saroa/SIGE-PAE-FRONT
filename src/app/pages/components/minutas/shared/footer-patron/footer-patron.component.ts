import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,OnDestroy  } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { TipoComponenteMinuta } from 'src/app/shared/constants/tipo-componente-minuta.constant';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { Subscription } from 'rxjs';

const ID_TIPO_COMPONENTE_FRUTA: number = 4;

@Component({
  selector: 'app-footer-patron',
  templateUrl: './footer-patron.component.html'
})
export class FooterPatronComponent implements OnInit,OnDestroy  {
  readonly TipoComponenteMinuta = TipoComponenteMinuta;

  @Input() iD_MinutaPatronAlimento: any;
  @Input() itemComponente: any;
  @Input() dataSourceComponentes: any;
  @Input() dataSourceAlimentoProteico: any;
  @Input() dataSourceAlimentoLecheInd: any;
  @Input() dataMacroNutrientes: any;
  @Input() dataMicroNutrientes: any;
  @Input() set cambioNivelEducativo(value: boolean) {
    this.esEdicionCambioEducativo = value;
    if(value) {
      this.guardarAlimentosNutrientesMinuta();
    }
  };
  @Output() cancelarEdicionMod = new EventEmitter<any>();
  esEdicionCambioEducativo: boolean = false;
  loadingVisible = false;
  private subs = new Subscription() 
  public ID_NutrienteZinc: number = 13;
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

      if ( obj.maxVisible && (!(obj.maxgramoPesoNeto > 0))) {
        this._messageService.showWarning('Por favor digitar el tamaño maximo de porción en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }
      if ( obj.minVisible &&  (!(obj.mingramoPesoNeto > 0) )) {
        this._messageService.showWarning('Por favor digitar el tamaño minimo de porción en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }
      if ( obj.minVisible && obj.maxVisible  && !(obj.maxgramoPesoNeto >= obj.mingramoPesoNeto) ) {
        this._messageService.showWarning('El tamaño maximo de porción no puede ser menor que el tamaño minimo en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }
    }

    let dataNutrientes = this.getDataMinutaNutrientes();

    for (let i = 0; i < dataNutrientes.length; i++) {
      let obj = dataNutrientes[i];
      
      if (obj.idNutriente != this.ID_NutrienteVitaminaA && obj.idNutriente != this.ID_NutrienteZinc) {
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

  arComponentesNoMinVisible = ['GRASAS', 'FRUTAS', 'FRUTA', 'LECHE O PRODUCTOS LÁCTEOS', 'ENSALADA O VERDURA CALIENTE'];
  isComponenteMinVisible(nomComponente: string) {
    for (let i = 0; i < this.arComponentesNoMinVisible.length; i++) {
      if (this.arComponentesNoMinVisible[i] == nomComponente) {
        return false;
      }
    }
    return true;
  }

  getDataMinutaAlimentos() {
    let data = [];
    if (this.itemComponente!=null)
    {
      for (let i = 0; i < this.itemComponente.listAlimentoComponente?.length; i++) {
        data.push({
          nombre_TipoComponente: this.itemComponente.nombreComponente,
          iD_TipoComponente: this.itemComponente.iD_TipoComponente,
          iD_GrupoAlimento: this.itemComponente.listAlimentoComponente[i].id,
          frecuencia: this.itemComponente.frecuencia,
          mingramoPesoNeto: this.itemComponente.listAlimentoComponente[i].min_Gramo,
          maxgramoPesoNeto: this.itemComponente.listAlimentoComponente[i].max_Gramo,
          minVisible: this.itemComponente.listAlimentoComponente[i].minVisible,
          maxVisible: this.itemComponente.listAlimentoComponente[i].maxVisible,
          estado:this.itemComponente.estado
        });
      }
    }
    for (let i = 0; i < this.dataSourceComponentes.length; i++) {
      const obj = this.dataSourceComponentes[i];
        for (let j = 0; j < obj.listAlimentoComponente.length; j++) {
        if(obj.iD_TipoComponente == this.TipoComponenteMinuta.LECHE_O_PRODUCTOS_LACTEOS) {
          obj.listAlimentoComponente[j].listSubGrupo.forEach(element => {
            data.push({
              nombre_TipoComponente: obj.nombreComponente,
              iD_TipoComponente: obj.iD_TipoComponente,
              iD_GrupoAlimento: element.iD_Grupo,
              frecuencia: obj.frecuencia,
              mingramoPesoNeto: element.max_Gramo,
              maxgramoPesoNeto: element.max_Gramo,
              minVisible: element.minVisible,
              maxVisible: element.maxVisible,
              ID_SubGrupoAlimento: element.id,
              manejaValor:element.manejaValor,
              estado: obj.estado
            });
          });
        } else if(obj.iD_TipoComponente == this.TipoComponenteMinuta.ALIMENTO_PROTEICO && !obj.minVisible && !obj.maxVisible) {
          if(obj.listAlimentoComponente[j].listSubGrupo.length > 2) {
            for(let posicion = 0; posicion < obj.listAlimentoComponente[j].listSubGrupo.length; posicion++) {
              if(posicion == 0) {
                data.push({
                  nombre_TipoComponente: obj.nombreComponente,
                  iD_TipoComponente: obj.iD_TipoComponente,
                  iD_GrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].iD_Grupo,
                  frecuencia: obj.listAlimentoComponente[j].listSubGrupo[posicion].frecuencia,
                  mingramoPesoNeto: obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].min_Gramo,
                  maxgramoPesoNeto: obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].max_Gramo,
                  minVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].minVisible,
                  maxVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].maxVisible,
                  ID_SubGrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].id,
                  manejaValor: obj.listAlimentoComponente[j].listSubGrupo[posicion].manejaValor,
                  estado: obj.estado
                });
              } else {
                data.push({
                  nombre_TipoComponente: obj.nombreComponente,
                  iD_TipoComponente: obj.iD_TipoComponente,
                  iD_GrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].iD_Grupo,
                  frecuencia: obj.listAlimentoComponente[j].listSubGrupo[posicion].frecuencia,
                  mingramoPesoNeto: posicion == 1 ? obj.listAlimentoComponente[j].listSubGrupo[posicion].min_Gramo :  obj.listAlimentoComponente[j].listSubGrupo[posicion].max_Gramo,
                  maxgramoPesoNeto: obj.listAlimentoComponente[j].listSubGrupo[posicion].max_Gramo,
                  minVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].minVisible,
                  maxVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].maxVisible,
                  ID_SubGrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].id,
                  manejaValor: obj.listAlimentoComponente[j].listSubGrupo[posicion].manejaValor,
                  estado: obj.estado
                });
              }
            }
          } else {
            obj.listAlimentoComponente[j].listSubGrupo.forEach(element => {
              data.push({
                nombre_TipoComponente: obj.nombreComponente,
                iD_TipoComponente: obj.iD_TipoComponente,
                iD_GrupoAlimento: element.iD_Grupo,
                frecuencia: obj.frecuencia,
                mingramoPesoNeto: element.max_Gramo,
                maxgramoPesoNeto: element.max_Gramo,
                minVisible: element.minVisible,
                maxVisible: element.maxVisible,
                ID_SubGrupoAlimento: element.id,
                manejaValor:element.manejaValor,
                estado: obj.estado
              });
            });
          }
        } else {
          data.push({
            nombre_TipoComponente: obj.nombreComponente,
            iD_TipoComponente: obj.iD_TipoComponente,
            iD_GrupoAlimento: obj.listAlimentoComponente[j].id,
            frecuencia: obj.frecuencia,
            mingramoPesoNeto: obj.min_Gramo,
            maxgramoPesoNeto: obj.iD_TipoComponente == 4 ? obj.min_Gramo : obj.max_Gramo,
            //minVisible: this.isComponenteMinVisible(obj.nombreComponente.trim().toUpperCase()),
            minVisible: obj.minVisible,
            maxVisible: obj.maxVisible,
            estado: obj.estado
          });
        }
      }
    }

    const obj = this.dataSourceAlimentoProteico;
      if(obj)
      {
          for (let j = 0; j < obj.listAlimentoComponente?.length; j++) {
           if(obj.iD_TipoComponente == this.TipoComponenteMinuta.ALIMENTO_PROTEICO ) {
              obj.listAlimentoComponente[j].listSubGrupo.forEach(element => {
                data.push({
                  nombre_TipoComponente: obj.nombreComponente,
                  iD_TipoComponente: obj.iD_TipoComponente,
                  iD_GrupoAlimento: element.iD_Grupo,
                  frecuencia: element.frecuencia,
                  mingramoPesoNeto: element.min_Gramo,
                  maxgramoPesoNeto: element.max_Gramo,
                  minVisible: element.minVisible,
                  maxVisible: element.maxVisible,
                  ID_SubGrupoAlimento: element.id,
                  manejaValor:element.manejaValor,
                  estado: obj.estado
                });
              });
            }
        }
      }
    
      const objind = this.dataSourceAlimentoLecheInd;
      if(objind) 
      {
        var valfrec = this.dataSourceAlimentoLecheInd?.listAlimentoComponente[0].listSubGrupo[0].frecuencia;
        for (let j = 0; j < objind.listAlimentoComponente.length; j++) {
          if(objind.iD_TipoComponente == this.TipoComponenteMinuta.LECHE_O_PRODUCTOS_LACTEOS) {
            objind.listAlimentoComponente[j].listSubGrupo.forEach(element => {
              data.push({
                nombre_TipoComponente: objind.nombreComponente,
                iD_TipoComponente: objind.iD_TipoComponente,
                iD_GrupoAlimento: element.iD_Grupo,
                frecuencia: valfrec,
                mingramoPesoNeto: element.min_Gramo,
                maxgramoPesoNeto: element.max_Gramo,
                minVisible: element.minVisible,
                maxVisible: element.maxVisible,
                ID_SubGrupoAlimento: element.id,
                manejaValor:element.manejaValor,
                estado: objind.estado
              });
            });
        }
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
    this.cancelarEdicionMod.emit(this.esEdicionCambioEducativo);
  }

}
