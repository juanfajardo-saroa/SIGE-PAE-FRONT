import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { User } from '../../../../../../shared/model/core/constante.model';
import { MessageService } from 'src/app/services/message.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { LocalStorage } from 'src/app/static/local-storage';

const ID_ESTADO_PENDIENTE: number = 0;
const ID_TIPOCONTRATO: number = 1;
const ID_SUBTIPO_CONTRATO: number = 3;

@Component({
  selector: 'app-registro-unico-contratos',
  /* providers: [
    MasterDataApiService,
    ContratosApiService
  ], */
  templateUrl: './registro-unico-contratos.component.html',
  styleUrls: ['./registro-unico-contratos.component.scss']
})
export class RegistroUnicoContratosComponent implements OnInit ,OnDestroy{

  private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));

  public TipoContrato: any = [{'Id':1, 'Descripcion': 'Suministro'},
                              {'Id':2, 'Descripcion': 'MateriaPrima'},
                              {'Id':3, 'Descripcion': 'Dotacion'},
                              {'Id':5, 'Descripcion': 'Supervision'}];

  public TipoContratoText: any = [{'Id': 1, 'Texto': 'Suministro'},
                                  {'Id': 2, 'Texto': 'Materia<br/>prima y<br/>logística'},
                                  {'Id': 3, 'Texto': 'Dotación,<br/>equipos y<br/>servicios'},
                                  {'Id': 4, 'Texto': 'Supervisión<br />y personal'}];


  public tiposSuministros: any = [
    {'id': 1, 'nombre': 'Regular'},
    {'id': 2, 'nombre': 'Rural'},
    {'id': 3, 'nombre': 'Descentralizado'}
  ];

  public contrato: number = 0;
  public submit: boolean = false;
  public tipoSupervision: number = 0;
  public showValidation: boolean = false
  public showValidation2: boolean = false
  public selectedOption: boolean = false
  public showETCValidation: boolean = false;

  private subs = new Subscription()
  public subTiposContratacion: any = [];

  public itemSuministro: any = {
    corresponde: 0,
    iD_ET: 0,
    tipoSuministro: 0
  }
  public listETs: any = [];

  dataPestanas = [{ id: 1, descripcion: 'Contratos', active: true }];

  constructor(
    public router: Router,
    private _masterDataApi: MasterDataApiService,
    private _contratosService : ContratosApiService,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  Anterior(){
    this.router.navigate(['/registro-contratos' ]);
  }

  changeItemSuministro(name: string, value: any){
    this.itemSuministro[name] = value;
    if(name == 'corresponde'){
      this.itemSuministro.iD_ET = 0;
    }
  }

  Siguiente(){
    if (this.contrato === 5 && this.tipoSupervision === 0) {
      this.showValidation2 = true; // supervicion y personas- Indique qué tipo de supervisión le corresponde a este contrato
      return;
    }

    if (this.itemSuministro.corresponde === 1) {
      this.showETCValidation = false;
      }
    switch (this.contrato) {
      case 1:
        this.validacionContratosSuministroConvenio();
        break;
      case 2:
        this.validacionContratosSuministroConvenio();
          break;
      case 3:
        this.router.navigate(['/dotacion-y-equipos']);
          break;
      case 4:
        this.validacionContratosSuministroConvenio();
          break;
      case 5:
        this.router.navigate(['/contratosSupervision', this.tipoSupervision]);
          break;
      case 6:
        this.router.navigate(['/servicios']);
          break;
    }
  }

  validacionContratosSuministroConvenio() {
    if(this.itemSuministro.corresponde == 0){
      this.showValidation = true;
      return;
    }

    if(this.itemSuministro.corresponde == 2 && this.itemSuministro.iD_ET == 0){
      this.selectedOption = true;
      this.showETCValidation = true;
      return;
    }

    if(this.contrato == 1) {
      this.siguienteContratoSuministro();
    } else if(this.contrato == 4) {
      this.siguienteContratoConvenio();
    } else if(this.contrato == 2) {
      this.siguienteContratoLogistica();
    }
  }

  siguienteContratoSuministro(){
    if(this.itemSuministro.tipoSuministro == 1){
      this.router.navigate(['/suministro-dia-vigencia', 0, this.contrato, this.itemSuministro.corresponde, this.itemSuministro.iD_ET]);
    } else if(this.itemSuministro.tipoSuministro == 2){
      this.router.navigate(['/contratos/suministro-rural', 0, this.contrato, this.itemSuministro.corresponde, this.itemSuministro.iD_ET]);
    } else {
      this.createContrato();
    }
  }

  createContrato() {
    this._contratosService.CreateContrato({
      iD_TipoContratoCHIP: null,
      ID_TipoConceptoGasto: null,
      ID_ETC: this.itemSuministro.corresponde==1? this.iD_ETC: 0,
      ID_ET:  this.itemSuministro.corresponde==2? this.itemSuministro.iD_ET:0,
      ID_MinutaPatronAlimentos: null,
      ID_Operador: null,
      ID_TipoCategoriaContrato: null,
      ID_UTConsorcio: null,
      ID_PlanAlistamiento: null,
      ID_Vigencia: User.iD_Vigencia,

      iD_EstadoContrato: ID_ESTADO_PENDIENTE,
      TipoContratoId: ID_TIPOCONTRATO,
      SubTipoContratoId: ID_SUBTIPO_CONTRATO,

      NumeroContrato: "",
      ObjetoContrato: "",
      ConAnticipo: false,
      FechalnicioContrato: new Date(),
      FechaFinalContrato: new Date(),
      Estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      ValorTotalContrato: null,
      SuministroDesentralizadoId: 0,
      ID_TipoModeloOperacion: 0,
      ManejaPAEC: false
    })
    .subscribe(response => {
      if(response.success) {
        this.router.navigate(['/registro-unico-contratos-descentralizado', response.result]);
      }
    });
  }

  siguienteContratoConvenio() {
    this.router.navigate(['/convenio', this.itemSuministro.corresponde, this.itemSuministro.iD_ET]);
  }

  siguienteContratoLogistica() {
    this.router.navigate(['/logistica', this.itemSuministro.corresponde, this.itemSuministro.iD_ET]);
  }

  tipoContrato(item: any){
    this.submit = false;
    this.contrato = item.Id;

    if(this.contrato == 1 || this.contrato == 2 || this.contrato == 4){
      if(this.listETs.length == 0){
        this.get_ETs();
      }
    } else if(this.contrato == 6 || this.contrato == 3) {
      this.submit = true;
    } else if(this.contrato == 5){
      this.getSubTipoContratacion(this.contrato)
    }
  }

  validarInformacion(ts: number){
    this.tipoSupervision = ts;
    if(this.tipoSupervision > 0)
      this.submit = true;
    else
      this.submit = false;
  }

  get_ETs(){
    this._masterDataApi.get_ETs()
    .subscribe(response => {
      if(response.success){
        this.listETs = response.result;
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  getModulePermission(module:number,action:string):boolean{
    return this._seguridadService.getModulePermission(module,action);
  }

  getSubTipoContratacion(tipoContratoId: number){
    this.subTiposContratacion = [];
    let response;
    response = this._contratosService.GetSubTiposContratacionByTipoContratoId(tipoContratoId);
    response.subscribe(response => {
      if(response.success){
        this.subTiposContratacion = response.result;
      }
      else{
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }
}
