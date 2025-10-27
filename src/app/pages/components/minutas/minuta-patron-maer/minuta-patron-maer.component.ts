import { Component, OnInit,OnDestroy } from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { TipoMinutaMAER } from 'src/app/shared/constants/tipo-minuta-maer.constant';
import { User } from 'src/app/shared/model/core/constante.model';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minuta-patron-maer',
  templateUrl: './minuta-patron-maer.component.html'
})
export class MinutaPatronMaerComponent implements OnInit,OnDestroy {
  
  public readonly tipoMinutaMAER = TipoMinutaMAER.PATRON;
  menusigepae = localStorage.getItem('MenuSigepae');
  menuuapa = localStorage.getItem('MenuSigenaUapa');
  private subs = new Subscription() 
  loadingVisible = false;
  iD_MinutaPatronAlimento = 0;
  editaMinuta = false;
  VerMinuta = false;
  datosPestanas = [
    {
      id: 1,
      descripcion: 'Complemento Almuerzo',
      tipoRacion: 'Minuta Complemento Almuerzo',
      tipoComplementoId: 1,
      modalidadComplementoId: 0,
      modalidad: 'Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      active: true
    },
    {
      id: 2,
      descripcion: 'Comp. Almuerzo Cualificado',
      tipoRacion: 'Minuta Comp. Almuerzo Cualificado',
      tipoComplementoId: 4,
      modalidad: 'Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      modalidadComplementoId: 0,      
      active: false
    }
    
  ];

  aportes = [
    { title: 'Aporte estimado:', description: 'Corresponde al aporte promedio diario de la minuta patrón.' },
    { title: 'Recomendación diaria:', description: 'Corresponde a los valores de calorías, macro y micronutrientes que necesita un niño, niña o adolescente (NNA) diariamente, según las recomendaciones de ingesta de energia y nutrientes (RIEN) que establece a nivel nacional el Ministerio de Salud y Protección Social.' },
    { title: 'Regla de adecuación:', description: 'Corresponde al porcentaje de adecuación mínimo o máximo establecido por la UApA.' }
  ];

  iD_TipoModeloOperacion = 2;
  iD_TipoMinutaPatron = 1;

  iD_TipoMinuta = 1;
  dataMinuta: any;
  minutaVisible = false;
  eliminaMinuta = false;
  listNivelEducativos: any;
  itemNivelEducativos: any = {};
  listTiposActividadFisica: any;
  itemActividadFisica: any = {};


  itemsDisabled = true;

  itemComponente: any;
  dataSourceComponentes = [];
  dataSourceComponentesPrep = [];
  dataMacroNutrientes = [];
  dataMicroNutrientes = [];

  bgColorChapterRed: boolean;
  bgColorChapterBlue: boolean;

  constructor(
    private _minutasApiService: MinutasApiService,
    private _seguridadService: SeguridadService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.seleccionarTab(this.datosPestanas[0]);
    if(this.menusigepae=="true") {
      this.editaMinuta = this._seguridadService.getModulePermission(41, 'editar');
      this.bgColorChapterRed = true;
      this.VerMinuta = this._seguridadService.getModulePermission(41, 'ver');
  }
  if(this.menuuapa=="true") {
    this.bgColorChapterBlue = true;
    this.editaMinuta =this._seguridadService.getModulePermission(111, 'editar');
    this.VerMinuta =this._seguridadService.getModulePermission(111, 'ver');
  }
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  dataSourceComponentesMod(data){
    this.dataSourceComponentes = data;
  }
  dataSourceComponentesPrepMod(data){
    this.dataSourceComponentesPrep = data;
  }

  dataMacroNutrientesMod(data){
    this.dataMacroNutrientes = data;
  }
  dataMicroNutrientesMod(data){
    this.dataMicroNutrientes = data;
  }

  seleccionarTab(item: any) {
    if(item){
      this.dataMinuta = { ...item };
    }

    this.datosPestanas = this.datosPestanas.map(modeloOperacion => {
      modeloOperacion.active = modeloOperacion.id == this.dataMinuta.id ? true : false;
      return modeloOperacion;
    });

    this.minutaVisible = false;
    this.itemsDisabled = true;
    

    const param = {
      iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
      iD_TipoMinutaPatron: this.iD_TipoMinutaPatron,
      modalidadComplementoId: this.dataMinuta.modalidadComplementoId,
      tipoComplementoId: this.dataMinuta.tipoComplementoId,
      tipoNivelEducativoId: 0,
      tipoActividadFisicaId: 0,
      id_Vigencia: User.iD_Vigencia,
      auditoria: LocalStorage.getAuditoria('')
    };

    this.get_IdMinutaPatronAlimento(param);
  }

  get_IdMinutaPatronAlimento(param: any) {
    this.iD_MinutaPatronAlimento = 0;
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
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  editarMinuta() {
    this.itemsDisabled = false;
  }

  eliminarMinuta(): void {
    let minutaPatronBorrar = {
      iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
      iD_TiposModalidadComplemento: 0,
      iD_TiposRacion: this.dataMinuta.tipoComplementoId,
      iD_NivelActividadFisica: 0
    };
    // TODO: llamar servicio Eliminar Minuta Patrón y enviar objeto minutaPatronBorrar
  }

  cancelarEdicionMod(data){
    this.seleccionarTab(null);
  }

}
