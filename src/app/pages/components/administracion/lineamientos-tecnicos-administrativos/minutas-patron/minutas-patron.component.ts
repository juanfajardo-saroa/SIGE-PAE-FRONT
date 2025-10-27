import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/model/core/constante.model';

import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minutas-patron',
  templateUrl: './minutas-patron.component.html',
  styleUrls: ['./minutas-patron.component.sass']
})
export class MinutasPatronComponent implements OnInit,OnDestroy {

  loadingVisible = false;
  iD_MinutaPatronAlimento = 0;
  iD_Modulo = 0;
  editaMinuta = false;
  idTipoModeloOperacionMAEM = 1;
  idTipoModeloOperacionMAER = 2;

  @Input() iD_TipoModeloOperacion!: number;
  iD_TipoMinutaPatron = 1;
  
  tipoNivelEducativoId = 0;
  tipoActividadFisicaId = 2;
  private subs = new Subscription() 

  datosPestanasMAEM = [
    {
      id: 1,
      descripcion: 'Complemento AM/PM PS o CCT',
      tipoRacion: 'Minuta Complemento AM/PM',
      tipoComplementoId: 2,
      modalidad: 'modalidad Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      modalidadComplementoId: 1,      
      active: false
    },
    {
      id: 2,
      descripcion: 'Complemento Almuerzo PS o CCT',
      tipoRacion: 'Minuta Complemento Almuerzo',
      tipoComplementoId: 1,
      modalidad: 'modalidad Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      modalidadComplementoId: 1,
      active: false
    },
    {
      id: 3,
      descripcion: 'Complemento AM/PM IND',
      tipoRacion: 'Minuta Complemento AM/PM',
      tipoComplementoId: 2,
      modalidad: 'modalidad Industrializado',
      modalidadComplementoId: 2,
      active: false
    }
  ];

  aportes = [
    {title: 'Aporte mínimo:', description: 'Corresponse al aporte promedio diario de la minuta patrón.'},
    {title: 'Recomendación diaria:', description: 'Corresponse a los valores de calorías, macro y micronutrientes que necesita un niño, niña o adolescente (NNA) diariamente, según las recomendaciones de ingesta de energia y nutrientes (RIEN) que establece a nivel nacional el Ministerio de Salud y Protección Social.'},
    {title: 'Regla de adecuación:', description: 'Corresponde al porcentaje de adecuación mínimo o máximo establecido por la UApA.'}
  ]

  datosPestanasMAER = [
    {
      id: 1,
      descripcion: 'Complemento Almuerzo',
      tipoRacion: 'Minuta Complemento Almuerzo',
      tipoComplementoId: 2,
      modalidadComplementoId: 1,
      modalidad: 'modalidad Preparado en Sitio (PS)',
      active: true
    },
    {
      id: 2,
      descripcion: 'Comp. Almuerzo Cualificado',
      tipoRacion: 'Minuta Comp. Almuerzo Cualificado',
      tipoComplementoId: 1,
      modalidad: 'modalidad Preparado en Sitio (PS)',
      modalidadComplementoId: 1,      
      active: false
    }
  ];

  iD_TipoMinuta = 1;
  dataMinuta: any;
  infoRowspanMacro = ['Calorías(Kcal)']
  dataRowspanMacro = []

  minutaVisible = false;
  listNivelEducativos: any;
  itemNivelEducativos: any = {};
  listTiposActividadFisica: any;
  itemActividadFisica: any = {};
  listFrecuencias = [];

  itemsDisabled = true;
  itemComponente: any = {};
  dataSourceComponentes: any;

  dataColumnsMacro = [];
  dataColumnsMicro = [];
  dataMacroNutrientes = [];
  dataMicroNutrientes = [];

  dataSourceComponentesBackup = [];
  dataMacroNutrientesBackup = [];
  dataMicroNutrientesBackup = [];

  constructor(
    private _minutasApiService: MinutasApiService,
    private _seguridadService: SeguridadService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    //this.nombre_TipoMinuta = this.datosPestanasMAER[0].descripcion;

    this.get_NivelEducativo();
    this.get_TiposActividadFisica();
    this.get_Frecuencias();

    if (this.iD_TipoModeloOperacion == 1) {
      this.seleccionarTab(this.datosPestanasMAEM[0]);
      this.iD_Modulo = 40;
    }
    else if (this.iD_TipoModeloOperacion == 2) {
      this.seleccionarTab(this.datosPestanasMAER[0]);
      this.iD_Modulo = 41;
    }
    else if(this.iD_TipoModeloOperacion == 4){
      this.iD_Modulo = 103;
    }

    this.editaMinuta = this._seguridadService.getModulePermission(this.iD_Modulo, 'editar');
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  
  seleccionarTab(item: any) {

    if (this.iD_TipoModeloOperacion == this.idTipoModeloOperacionMAEM) {
      this.datosPestanasMAEM = this.datosPestanasMAEM.map(modeloOperacion => {
        modeloOperacion.active = modeloOperacion.id == item.id ? true : false;
        return modeloOperacion;
      });
    }
    else if (this.iD_TipoModeloOperacion == this.idTipoModeloOperacionMAER) {
      this.datosPestanasMAER = this.datosPestanasMAER.map(modeloOperacion => {
        modeloOperacion.active = modeloOperacion.id == item.id ? true : false;
        return modeloOperacion;
      });
    }

    this.minutaVisible = false;
    this.itemsDisabled = true;

    this.dataMinuta = { ...item };
    //this.iD_TipoMinuta = item.id;
    //this.nombre_TipoMinuta = item.descripcion;
    //this.modalidadComplementoId = item.modalidadComplementoId;
    //this.tipoComplementoId = item.tipoComplementoId;
    this.tipoNivelEducativoId = 0;
  }

  changeModelFiltro(tipoFiltro: string, value: any) {
    if (tipoFiltro == 'TipoNivelEducativo') {
      this.tipoNivelEducativoId = value;
    }
    else if (tipoFiltro == 'TipoActividadFisica') {
      this.tipoActividadFisicaId = value;
    }
  }

  changeDescripcionFiltros() {
    for (let i = 0; i < this.listNivelEducativos.length; i++) {
      if (this.listNivelEducativos[i].id == this.tipoNivelEducativoId) {
        this.itemNivelEducativos = {
          id: this.listNivelEducativos[i].id,
          nombre: this.listNivelEducativos[i].nombre
        };

        break;
      }
    }

    for (let i = 0; i < this.listTiposActividadFisica.length; i++) {
      if (this.listTiposActividadFisica[i].id == this.tipoActividadFisicaId) {
        this.itemActividadFisica = {
          id: this.listTiposActividadFisica[i].id,
          nombre: this.listTiposActividadFisica[i].nombre
        };

        break;
      }
    }
  }

  filtrarMinutas() {
    if (!this.tipoNivelEducativoId || this.tipoNivelEducativoId <= 0) {
      this._messageService.showWarning('Seleccione Tipo Nivel Educativo', 'top center', 5000);
      return;
    }

    if (!this.tipoActividadFisicaId || this.tipoActividadFisicaId <= 0) {
      this._messageService.showWarning('Seleccione Tipo Actividad Fisica', 'top center', 5000);
      return;
    }

    this.minutaVisible = false;
    this.itemsDisabled = true;

    let param = {
      iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
      iD_TipoMinutaPatron: this.iD_TipoMinutaPatron,
      modalidadComplementoId: this.dataMinuta.modalidadComplementoId,
      tipoComplementoId: this.dataMinuta.tipoComplementoId,
      tipoNivelEducativoId: this.tipoNivelEducativoId,
      tipoActividadFisicaId: this.tipoActividadFisicaId,
      id_Vigencia: User.iD_Vigencia,
      auditoria: LocalStorage.getAuditoria('')
    };

    this.get_IdMinutaPatronAlimento(param);
  }

  get_IdMinutaPatronAlimento(param: any) {
    this.itemComponente = {};
    this.dataSourceComponentes = [];
    this.dataMacroNutrientes = [];
    this.dataMicroNutrientes = [];

    this.dataSourceComponentesBackup = [];
    this.dataMacroNutrientesBackup = [];
    this.dataMicroNutrientesBackup = [];

    this.loadingVisible = true;

    this._minutasApiService.get_IdMinutaPatronAlimento(param).subscribe({
      next: response => {
        this.loadingVisible = false;
        this.iD_MinutaPatronAlimento = response.result;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        this.minutaVisible = true;
          this.changeDescripcionFiltros();
          this.get_AlimentosMinuta(response.result);
          this.get_NutrientesMinuta(response.result);
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  get_AlimentosMinuta(id: number) {
    this.dataSourceComponentes = [];

    this.loadingVisible = true;
    this._minutasApiService.get_AlimentosMinuta(id).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        this.itemComponente = response.result.alimentoMinutaAgrupado;
        this.dataSourceComponentes = response.result.listAlimentoMinutaAgrupado;
        this.dataSourceComponentesBackup = response.result.listAlimentoMinutaAgrupado;
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  get_NutrientesMinuta(id: number) {
    this.loadingVisible = true;

    this._minutasApiService.get_NutrientesMinuta(id).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        for (let i = 0; i < response.result.length; i++) {
          //const item = response.result[i];

          const obj = {
            id: response.result[i].idAportesNutricional, ...response.result[i]
          }

          if (obj.iD_tiponutriente == 1) {
            if(this.infoRowspanMacro.indexOf(obj.nomNutriente.toString().replaceAll(' ', '')) >= 0){
              this.dataRowspanMacro.push(obj.nomNutriente);
            } else{
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

        for (let i = 0; i < response.result.length; i++) {
          this.setValueRecomendado(response.result[i]);
        }
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  changeModelMinuta(name: string, value: any, item: any) {
    item[name] = value;
    if (name == 'frecuencia') {
      for (let i = 0; i < this.listFrecuencias.length; i++) {
        if (this.listFrecuencias[i].id == value) {
          item["nombreFrecuencia"] = this.listFrecuencias[i].nombre;
          break;
        }
      }
    }
  }

  changeModelMinutaNutriente(name: string, value: any, item: any) {
    item[name] = value;

    if (name == 'aporteRecomendado') {
      this.setValueRecomendado(item);
    }

    if (item["aporteRecomendado"] > 0) {
      const sValor = (item["aporteMinimo"] / item["aporteRecomendado"]).toString();
      item["porcentajeAdecuacion"] = parseFloat(sValor).toFixed(2);
    }
    else { item["porcentajeAdecuacion"] = 0; }

  }

  setValueRecomendado(item: any) {
    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      if (this.dataMacroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = ((item.aporteRecomendado * this.dataMacroNutrientes[i].porcentaje) / this.dataMacroNutrientes[i].valorConstante).toString();
        this.dataMacroNutrientes[i].aporteRecomendado = parseFloat(sValor).toFixed(2);
      }
    }

    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      if (this.dataMicroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = ((item.aporteRecomendado * this.dataMicroNutrientes[i].porcentaje) / this.dataMicroNutrientes[i].valorConstante).toString();
        this.dataMicroNutrientes[i].aporteRecomendado = parseFloat(sValor).toFixed(2);
      }
    }
  }

  getDataMinutaAlimentos() {
    let data = [];

    data.push({
      nombre_TipoComponente: this.itemComponente.nombreComponente,
      iD_TipoComponente: this.itemComponente.iD_TipoComponente,
      iD_GrupoAlimento: this.itemComponente.iD_GrupoAlimento,
      frecuencia: this.itemComponente.frecuencia,
      mingramoPesoNeto: this.itemComponente.min_Gramo,
      maxgramoPesoNeto: this.itemComponente.max_Gramo,
      minVisible: false
    });

    for (let i = 0; i < this.itemComponente.listAlimentoComponente.length; i++) {
      data.push({
        nombre_TipoComponente: this.itemComponente.nombreComponente,
        iD_TipoComponente: this.itemComponente.iD_TipoComponente,
        iD_GrupoAlimento: this.itemComponente.listAlimentoComponente[i].id,
        frecuencia: this.itemComponente.frecuencia,
        mingramoPesoNeto: this.itemComponente.listAlimentoComponente[i].min_Gramo,
        maxgramoPesoNeto: this.itemComponente.listAlimentoComponente[i].max_Gramo,
        minVisible: this.itemComponente.listAlimentoComponente[i].minVisible,
      });
    }

    for (let i = 0; i < this.dataSourceComponentes.length; i++) {
      const obj = this.dataSourceComponentes[i];
      for (let j = 0; j < obj.listGrupoAlimentos.length; j++) {
        data.push({
          nombre_TipoComponente: obj.nombreComponente,
          iD_TipoComponente: obj.iD_TipoComponente,
          iD_GrupoAlimento: obj.listGrupoAlimentos[j].id,
          frecuencia: obj.frecuencia,
          mingramoPesoNeto: obj.min_Gramo,
          maxgramoPesoNeto: obj.max_Gramo,
          minVisible: obj.nombreComponente.trim().toUpperCase() == 'GRASAS' ? false : true,
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

  editarMinuta() {
    this.itemsDisabled = false;
  }

  guardarAlimentosNutrientesMinuta() {
    let dataAlimentos = this.getDataMinutaAlimentos();

    for (let i = 0; i < dataAlimentos.length; i++) {
      const obj = dataAlimentos[i];

      if (!(obj.frecuencia > 0)) {
        this._messageService.showWarning('Por favor seleccionar la frecuencia en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }

      if ((!(obj.mingramoPesoNeto > 0) && obj.minVisible) || (!(obj.maxgramoPesoNeto > 0))) {
        this._messageService.showWarning('Por favor digitar el tamaño maximo de porción en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }

      if (!(obj.maxgramoPesoNeto >= obj.mingramoPesoNeto) && obj.minVisible) {
        this._messageService.showWarning('El tamaño maximo de porción no puede ser menor que el tamaño minimo en el componente "' + obj.nombre_TipoComponente + '"', 'top center', 5000);
        return;
      }
    }

    let dataNutrientes = this.getDataMinutaNutrientes();

    for (let i = 0; i < dataNutrientes.length; i++) {
      let obj = dataNutrientes[i];
      if (!(obj.aporteMinimo > 0) || !(obj.aporteRecomendado > 0)) {
        this._messageService.showWarning('Digite los aportes minimos y recomendados (' + obj.nomNutriente + ')', 'top center', 5000);
        return;
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

  cancelarEdicion() {
    this.filtrarMinutas();
  }

  get_NivelEducativo() {
    this.loadingVisible = true;
    this._minutasApiService.get_NivelEducativos().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de nivel educativo: ' + response.error, 'top center', 5000);
          return;
        }

        this.listNivelEducativos = response.result;
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de nivel educativo: ' + error, 'top center', 5000);
      }
    });
  }

  get_TiposActividadFisica() {
    this.loadingVisible = true;
    this._minutasApiService.get_TiposActividadFisica().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de tipos actividad fisica: ' + response.error, 'top center', 5000);
          return;
        }

        this.listTiposActividadFisica = response.result.filter(function (x: any) {
          return x.nombre.toLowerCase() == 'moderada';
        });

        if (this.listTiposActividadFisica.length == 1) {
          this.itemActividadFisica = {
            id: this.listTiposActividadFisica[0].id,
            nombre: this.listTiposActividadFisica[0].nombre,
          }
        }
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de tipos actividad fisica: ' + error, 'top center', 5000);
      }
    });
  }

  get_Frecuencias() {
    this.loadingVisible = true;
    this._minutasApiService.get_Frecuencias().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de frecuencias: ' + response.error, 'top center', 5000);
          return;
        }

        this.listFrecuencias = response.result;
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de frecuencias: ' + error, 'top center', 5000);
      }
    });
  }

}
