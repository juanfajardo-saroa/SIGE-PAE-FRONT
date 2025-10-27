import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { Subscription } from 'rxjs';

const ID_NUTRIENTE_ZINC : number = 13;
const ID_NUTRIENTE_VITAMINA_A : number = 15;

@Component({
  selector: 'app-aporte-nutricional',
  templateUrl: './aporte-nutricional.component.html'
})
//,OnChanges
export class AporteNutricionalComponent implements OnInit,OnDestroy {
  readonly ID_TIPO_NUTRIENTE_MICRONUTRIENTE: number = 2;
  readonly ID_NUTRIENTE_SODIO: number = 4;
  readonly ID_NUTRIENTE_ZINC: number = 13;
  readonly ID_NUTRIENTE_VITAMINA_A_ER: number = 15;
  @Input() iD_MinutaPatronAlimento: number;
  @Input() itemsDisabled: boolean;
  @Output() dataMacroNutrientesMod = new EventEmitter<any>();
  @Output() dataMicroNutrientesMod = new EventEmitter<any>();
  loadingVisible = false;
  private readonly carbohidratos: string = 'Carbohidratos (g)';
  private readonly grasas: string = 'Grasas (g)';
  infoRowspanMacro = ['Calorías(Kcal)', 'Calorías', 'Energía', 'Energía(Kcal)']
  dataRowspanMacro = [];
  private subs = new Subscription() 



  dataColumnsMacro = [];
  dataColumnsMicro = [];

  dataMacroNutrientes = [];
  dataMicroNutrientes = [];
  dataMacroNutrientesBackup = [];
  dataMicroNutrientesBackup = [];

  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.get_NutrientesMinuta();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* ngOnChanges(changes: SimpleChanges): void {
    this.get_NutrientesMinuta();
  }
 */
  get_NutrientesMinuta() {

    this.dataMacroNutrientes = [];
    this.dataColumnsMicro= [];
    this.dataMicroNutrientes = [];
    this.dataMacroNutrientesBackup = [];
    this.dataMicroNutrientesBackup = [];


    this.loadingVisible = true;
    
    this._minutasApiService.get_NutrientesMinuta(this.iD_MinutaPatronAlimento).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        for (let i = 0; i < response.result.length; i++) {
          const obj = {
            id: response.result[i].idAportesNutricional, ...response.result[i]
          }

          if (obj.iD_tiponutriente == 1 || obj.iD_tiponutriente == 3) {
            if (this.infoRowspanMacro.indexOf(obj.nomNutriente.toString().replaceAll(' ', '')) >= 0) {
              if (obj.nomNutriente.toLowerCase() == 'calorías' || obj.nomNutriente.toLowerCase() == 'energía') {
                obj.nomNutriente = 'Energía (Kcal)';
              }
              this.dataRowspanMacro.push(obj.nomNutriente);
            } else {
              this.dataColumnsMacro.push(obj.nomNutriente);
            }

            this.dataMacroNutrientes.push(obj);
            this.dataMacroNutrientesBackup.push(obj);
          }
          else if (obj.iD_tiponutriente == 2) {
            this.dataColumnsMicro.push(obj.nomNutriente);
            this.dataMicroNutrientes.push(obj);
            this.dataMicroNutrientesBackup.push(obj);
          }
        }
        const columnaZinc: string = response.result.find(element => element.iD_tiponutriente == this.ID_TIPO_NUTRIENTE_MICRONUTRIENTE && element.idNutriente == this.ID_NUTRIENTE_ZINC)?.nomNutriente;
        const columnaVitaminaA: string = response.result.find(element => element.iD_tiponutriente == this.ID_TIPO_NUTRIENTE_MICRONUTRIENTE && element.idNutriente == this.ID_NUTRIENTE_VITAMINA_A_ER)?.nomNutriente;
        this.invertirOrdenColumnasMicronutrientes(columnaZinc, columnaVitaminaA);
        this.invertirOrdenDatosMicronutrientes(columnaZinc, columnaVitaminaA);
        this.ordenarColumnasMacronutrientes();
        this.ordenarDatosMacronutrientes();

       /*  for (let i = 0; i < response.result.length; i++) {
          this.setValueRecomendado(response.result[i]);
        }
 */
        this.dataMacroNutrientesMod.emit(this.dataMacroNutrientes);
        this.dataMicroNutrientesMod.emit(this.dataMicroNutrientes);
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  invertirOrdenColumnasMicronutrientes(nombreColumnaAnterior: string, nombreColumnaSiguiente: string) {
    for (let i = 0; i < this.dataColumnsMicro.length; i++) {
      if(this.dataColumnsMicro[i] == nombreColumnaAnterior && this.dataColumnsMicro[i + 1] == nombreColumnaSiguiente) {
        this.dataColumnsMicro[i] = nombreColumnaSiguiente;
        this.dataColumnsMicro[i + 1] = nombreColumnaAnterior;
      }
    }
  }

  invertirOrdenDatosMicronutrientes(nombreColumnaAnterior: string, nombreColumnaSiguiente: string) {
    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      if(this.dataMicroNutrientes[i].nomNutriente == nombreColumnaAnterior && this.dataMicroNutrientes[i + 1]?.nomNutriente == nombreColumnaSiguiente) {
        let dataPosicionActual = this.dataMicroNutrientes[i];
        this.dataMicroNutrientes[i] = this.dataMicroNutrientes[i + 1];
        this.dataMicroNutrientes[i + 1] = dataPosicionActual;
      }
    }
  }

  ordenarColumnasMacronutrientes() {
    for (let i = 0; i < this.dataColumnsMacro.length; i++) {
      if(this.dataColumnsMacro[i] == this.carbohidratos && this.dataColumnsMacro[i + 1] == this.grasas) {
        this.dataColumnsMacro[i] =  this.grasas;
        this.dataColumnsMacro[i + 1] =this.carbohidratos;
      }
    }
  }

  ordenarDatosMacronutrientes() {
    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      if(this.dataMacroNutrientes[i]?.nomNutriente == this.carbohidratos && this.dataMacroNutrientes[i + 1]?.nomNutriente == this.grasas) {
        let dataPosicionActual = this.dataMacroNutrientes[i];
        this.dataMacroNutrientes[i] = this.dataMacroNutrientes[i + 1];
        this.dataMacroNutrientes[i + 1] = dataPosicionActual;
      }
    }
  }

  changeModelMinutaNutriente(name: string, value: any, item: any) {
    item[name] = value;

    // if (name == 'aporteRecomendadoMin') {
    //   this.setValueRecomendado(item);
    // }
    //todo: omcp ajuste aporte para MAEM

    if (item["aporteRecomendadoMin"] > 0) {
      const sValor = (item["aporteMinimo"] / item["aporteRecomendadoMin"]).toString();
      item["porcentajeAdecuacion"] = parseFloat(sValor).toFixed(2);
    }
    else { item["porcentajeAdecuacion"] = 0; }

    this.dataMacroNutrientesMod.emit(this.dataMacroNutrientes);
    this.dataMicroNutrientesMod.emit(this.dataMicroNutrientes);

  }

  setValueRecomendado(item: any) {
    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      if (this.dataMacroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = ((item.aporteRecomendadoMin * this.dataMacroNutrientes[i].porcentaje) / this.dataMacroNutrientes[i].valorConstante).toString();
        this.dataMacroNutrientes[i].aporteRecomendadoMin = parseFloat(sValor).toFixed(2);
      }
    }

    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      if (this.dataMicroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = ((item.aporteRecomendadoMin * this.dataMicroNutrientes[i].porcentaje) / this.dataMicroNutrientes[i].valorConstante).toString();
        this.dataMicroNutrientes[i].aporteRecomendadoMin = parseFloat(sValor).toFixed(2);
      }
    }
  }

  esCampoOpcional(idNutriente: number) {
    const camposOpcionales: number [] = [ID_NUTRIENTE_ZINC, ID_NUTRIENTE_VITAMINA_A];
    return camposOpcionales.includes(idNutriente);
  }

}
