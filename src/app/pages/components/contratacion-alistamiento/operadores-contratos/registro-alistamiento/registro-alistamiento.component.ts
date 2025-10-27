import { Component, Input, OnInit,OnDestroy  } from '@angular/core';
import { MasterDataApiService } from '../../../../../shared/services/master-data-api.service';
import { ContratosApiService } from '../../../../../shared/services/contratos-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/services/message.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Observable, Subscription } from 'rxjs';
import { PA_ActaInicioGetAllWithRelationService } from 'src/app/shared/services/PA_ActaInicioGetAllWithRelation.services';

const ID_ESTADO_PENDIENTE: number = 1;
const ID_ESTADO_INCOMPLETO: number = 2;
const ID_ESTADO_PENDIENTE_APROBACION: number = 3;
const ID_ESTADO_APROBADO: number = 4;
const ID_ESTADO_RECHAZADO: number = 5;

@Component({
  selector: 'app-registro-alistamiento',
  //providers: [ContratosApiService, MasterDataApiService],
  templateUrl: './registro-alistamiento.component.html',
  styleUrls: ['./registro-alistamiento.component.scss'],
})
export class RegistroAlistamientoComponent implements OnInit,OnDestroy  {
  idContratoActual = 0;
  inicioState = 0;
  private subs = new Subscription() 
  constructor(
  
    private _contratosService: ContratosApiService,
    private _contratosApiService: ContratosApiService,
    private _masterDataService: MasterDataApiService,
    private _route: ActivatedRoute,
    public router: Router,
    public _modalService: NgbModal,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService,
    private mensajeServicio: MessageService,
    private _PA_ActaInicioGetAllWithRelationService:PA_ActaInicioGetAllWithRelationService,
  ) {

  }

  getActaByContrato() {
    this._PA_ActaInicioGetAllWithRelationService.getPA_ActaInicioGetAllWithRelationList(this.idContrato).subscribe(
      (response: any) => {
        if (response.length == 0) { } else {
          this.inicioState = response[0].estadoInicioOperacion == true ? 4 : this.inicioState = response[0].estadoInicioOperacion == false ? 2 : 0;
          this.dataDetalleAlistamiento.estadoDiligenciamientoInicioOperacion = response[0].estadoInicioOperacion == true ? 4 : 0;
        }
        localStorage.setItem("InicioOperacionState", this.dataDetalleAlistamiento.estadoDiligenciamientoInicioOperacion);
      },
      (err) => {
      }
    );
  }


  numeroContrato: string = '0';
  private sub: any;
  public idContrato: number = 0;
  public idTipoContrato: number = 0;
  public idMOperacion: number = 0;
  public idOperador: number = 0;
  public idOperadorContrato: number = 0;
  public idMOperacion1: number = 0;
  public idEstadoRuta: number = 0;
  public sinoperador: boolean = false;
  operadoresList: any = [];
  hojaContrato: any;
  dsModeloOperacion: any;
  idRowSelect = 0;
  idRowAprobacion = 0;
  gridViewDetalle: boolean = false;
  listSedesContratosHojaContrato: any = [];
  dataContratos: any = [];
  dataContratoSelect: any = [];
  dataTabla: any[] = [];
  displayedColumnsContratos: any[] = [
    { descripcion: 'Número de\n contrato' },
    { descripcion: 'Operador' },
    { descripcion: 'Modelo de\n operación' },
    { descripcion: 'Fecha de inicio' },
    { descripcion: 'Plazo\nRestante\nAlistamiento' },
    { descripcion: 'Bodegas/\nPlantas' },
    { descripcion: 'Doc.\nObligatoria' },
    { descripcion: 'Ciclos\n Menús' },
    { descripcion: 'Plan de\n Rutas' },
    { descripcion: 'Estado del\n Alistamiento' },
  ];

  public dsTipoContrato: any[] = [
    { id: 1, nombre: 'Suministro' },
    { id: 2, nombre: 'Materia Prima y Logística' },
    { id: 3, nombre: 'Dotación, equipos y servicios' },
    { id: 5, nombre: 'Supervisión y personal' },
  ];

  public dataDetalleAlistamiento: any = {
    estadoDiligenciamientoDocumentacion: 0,
    estadoDiligenciamientoMenus: 0,
    estadoDiligenciamientoRutas: 0,
    estadoDiligenciamientoInicioOperacion: 0,
  };
  public itemsPerPages: number[] = [5, 10, 20, 50, 100];
  public itemCant: number = 5;
  public itemIni: number = 0;
  public itemFin: number = 0;
  public pages: number = 0;
  public page: number = 0;
  public disabledFirstPage: boolean = true;
  public disabledNextPage: boolean = true;
  public disabledLastPage: boolean = true;
  public disabledPreviousPage: boolean = true;
  public displayDD: boolean = true;
  public displayDetalle: boolean = false;
  public displaySearch: boolean = true;
  public displayHeader: boolean = false;
  public selectedTabIndex: number = 0;
  public ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR: string = 'Pendiente';
  public ESTADO_DILIGENCIAMIENTO_INCOMPLETO: string = 'Incompleta';
  public ESTADO_DILIGENCIAMIENTO_POR_APROBAR: string = 'Por Aprobar';
  public ESTADO_DILIGENCIAMIENTO_RECHAZADO: string = 'Rechazado';
  public ESTADO_DILIGENCIAMIENTO_COMPLETO: string = 'Aprobada';
  idEstadoPendiente: number = ID_ESTADO_PENDIENTE;
  idEstadoIncompleto: number = ID_ESTADO_INCOMPLETO;
  idEstadoPendienteAprobacion: number = ID_ESTADO_PENDIENTE_APROBACION;
  idEstadoAprobado: number = ID_ESTADO_APROBADO;
  idEstadoRechazado: number = ID_ESTADO_RECHAZADO;
  idEtc = 0;
  idPlanAlistamiento: number = 0;
  docState = 0;
  cicState = 0;
  public storageSubObs: Observable<any>


  ngOnInit(): void {
    this.storageSubObs = this.mensajeServicio.storageSub.asObservable();
    this.storageSubObs.subscribe((data:string) => {
      let tempDocState = localStorage.getItem("documentacionState")
      this.docState = Number(tempDocState);
    })

    
    this.sub = this._route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.idRowAprobacion = +params['id'];
      }
      if (params['idubicacion']) {
        this.idRowSelect = +params['idubicacion'];
      }
    });

    this.inicializarControl();

  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  ngOnChanges(): void {
    this.inicializarControl();
  }

  public inicializarControl() {
    this.getTipoContrato();
    this.getModeloOperacion();
    this.get_ContratosAlistamientoAll(
      0,
      this.numeroContrato,
      this.idTipoContrato,
      this.idMOperacion
    );
    this.get_AllOperadores();
  }

  getModeloOperacion() {
    this._masterDataService.get_ModeloOperacion().subscribe((response) => {
      if (response.success) {
        this.dsModeloOperacion = response.result;
      }
    });
  }

  get_AllOperadores() {
    this._contratosApiService.Get_AllOperadores().subscribe((response) => {
      if (response.success) {
        this.operadoresList = response.result;
      } else {
        this._messageService.showError(
          'ERROR: ' + response.error,
          'top center'
        );
      }
    });
  }

  changeSearch(name: string, value: string) {
    if (name === 'contrato') {
      if (value === null || value === undefined) this.numeroContrato = '0';
      else this.numeroContrato = value;
    } else {
      if (value === null || value === undefined) this.idMOperacion = 0;
      else this.idMOperacion = parseInt(value);
    }
  }

  getTipoContrato() {
    this._contratosService.GetTiposContrato().subscribe((response) => {
      if (response.success) {
        this.dsTipoContrato = response.result;
      }
    });
  }

  changeCantItems(value: any) {
    this.itemCant = value;
    this.pages = Math.ceil(this.dataContratos.length / value);
    this.page = this.dataContratos.length > 0 ? 1 : 0;

    this.changePageInfo();
  }

  changePageInfo() {
    this.dataTabla = [];
    this.disabledFirstPage = true;
    this.disabledPreviousPage = true;
    this.disabledNextPage = true;
    this.disabledLastPage = true;

    if (this.page > 0) {
      this.itemIni = (this.page - 1) * this.itemCant + 1;
      this.itemFin = this.page * this.itemCant;
      if (this.itemFin > this.dataContratos.length) {
        this.itemFin = this.dataContratos.length;
      }

      for (let i = this.itemIni - 1; i < this.itemFin; i++) {
        this.dataTabla.push(this.dataContratos[i]);
      }

      if (this.page > 1) {
        this.disabledFirstPage = false;
        this.disabledPreviousPage = false;
      }

      if (this.page < this.pages) {
        this.disabledNextPage = false;
        this.disabledLastPage = false;
      }
    } else {
      this.itemIni = 0;
      this.itemFin = 0;
    }
  }

  changePage(tipo: number, page: number, disabled: boolean) {
    if (!disabled) {
      if (tipo == 1) {
        this.page =
          page > 0 ? Math.ceil(this.dataContratos.length / this.itemCant) : 1;
        this.changePageInfo();
      } else if (tipo == 2) {
        this.page += page > 0 ? 1 : -1;
        this.changePageInfo();
      }
    }
  }

  get_ContratosAlistamientoAll(
    idMunicipio: number,
    numeroContrato: string,
    idContrato: any,
    idOperador: number
  ) {

    const operadorId = localStorage.getItem('Ubicacion').includes('Operadores')
      ? +localStorage.getItem('IdUbicacion')
      : 0;
    const ID_ETC = localStorage.getItem('Ubicacion').includes('ETC')
      ? +localStorage.getItem('IdUbicacion')
      : 0;
    const ID_ET = localStorage.getItem('Ubicacion').includes('ET')
      ? +localStorage.getItem('IdUbicacion')
      : 0;

    if (operadorId != 0) {
      this.idOperador = operadorId;
      idOperador = operadorId;
      this.sinoperador = true;
    }
    if (
      numeroContrato === null ||
      numeroContrato === undefined ||
      numeroContrato === ''
    )
      numeroContrato = '0';

    this._contratosService
      .get_ContratosAlistamientoAll(
        idMunicipio,
        numeroContrato,
        idContrato,
        idOperador,
        ID_ETC,
        ID_ET
      )
      .subscribe((response) => {
        if (response.success) {
          response.result.map(function (item: any) {
            item.fechalnicioContratoString = '-';
            item.fechaFinalContratoString = '-';
            if (
              moment(item.fechalnicioContrato).isValid() &&
              moment(item.fechalnicioContrato).year() >= 1910
            ) {
              item.fechalnicioContratoString = moment(
                item.fechalnicioContrato
              ).format('YYYY-MM-DD');
            }

            if (
              moment(item.fechaFinalContrato).isValid() &&
              moment(item.fechaFinalContrato).year() >= 1900
            ) {
              item.fechaFinalContratoString = moment(
                item.fechaFinalContrato
              ).format('YYYY-MM-DD');
            }

            return item;
          });
          if (this.dataContratos.length == 0)
            this.dataContratoSelect = response.result;
          this.dataContratos = response.result;
          this.changeCantItems(this.itemsPerPages[1]);
          /* if (this.idRowSelect>0)
          {
            this.verContrato(this.dataContratos)         
          } */
        }
      });
  }

  verContrato(item: any) {

    if (!this.getModulePermission(13, 'ver')) return;
    this.displayHeader = true;
    this.get_FichaContrato(item.numeroContrato, item.contratoId, item.plazoRestante, item.fechaAlistamiento, item.modeloOperacion, item.iD_EstadoRutas);
    this.dataDetalleAlistamiento.estadoDiligenciamientoDocumentacion = item.estadoBodegas;
    this.dataDetalleAlistamiento.estadoDiligenciamientoMenus = item.estadoMenus;
    this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = item.estadoRutas;
    localStorage.setItem("PlanRutasState", item.estadoRutas);
    //this.dataDetalleAlistamiento.estadoDiligenciamientoInicioOperacion = item.estadoActaInicio;
    this.consultaContratos();
    this.idContrato = item.contratoId;
    if (this.dataContratos.length > 0) this.gridViewDetalle = true;

  }

  noVerContrato() {
    this.displayHeader = false;
    this.displaySearch = true;
    this.displayDetalle = false;
    this.consultaContratos();
  }

  consultaContratos() {
    this.getTipoContrato();
    this.get_ContratosAlistamientoAll(
      this.idMOperacion,
      this.numeroContrato,
      this.idTipoContrato,
      this.idOperador
    );
    this.gridViewDetalle = false;
  }
  getModulePermission(module: number, action: string): boolean {
    return this._seguridadService.getModulePermission(module, action);
  }

  get_FichaContrato(numContrato: string, iD_Contrato: number, plazoRestante: number, fechaAlistamiento: string, modelo: string, iD_EstadoRutas: number) {
    this._contratosApiService
      .get_SedesContratosHojaContrato(iD_Contrato)
      .subscribe((response) => {
        if (response.success) {
          if (response.result.length > 0) {
            this.hojaContrato = response.result[0];
            this.idPlanAlistamiento = this.hojaContrato.iD_PlanAlistamiento;
            this.idMOperacion = this.hojaContrato.iD_TipoModeloOperacion;
            this.idMOperacion1 = this.hojaContrato.iD_TipoModeloOperacion1;
            this.hojaContrato.plazoRestante = plazoRestante;
            this.hojaContrato.fechaAlistamiento = fechaAlistamiento;
            this.idEstadoRuta = iD_EstadoRutas;
            this.idEtc = this.hojaContrato.iD_ETC
            this.idOperadorContrato = this.hojaContrato.id_operador;
            localStorage.setItem('numCpl', numContrato);
            localStorage.setItem('idCpl', iD_Contrato.toString());
            localStorage.setItem('fechaInicialCpl', this.hojaContrato.fechalnicioContrato);
            localStorage.setItem('fechaFinalCpl', this.hojaContrato.fechaFinalContrato);
            localStorage.setItem('nombreOperador', this.hojaContrato.nomOperador);
            localStorage.setItem('idPlan', this.hojaContrato.iD_PlanAlistamiento);
            localStorage.setItem('modeloContrato', this.hojaContrato.modeloOperacion);
            localStorage.setItem("addedEstablecimiento", "false");
            /*if (this.hojaContrato.modeloOperacion != null)
              this.hojaContrato.modeloOperacion =
                this.hojaContrato.modeloOperacion.toString().substring(0, 4);*/
            this.hojaContrato.modeloOperacion = modelo;
            this.listSedesContratosHojaContrato = response.result;
            this.listSedesContratosHojaContrato.modeloOperacion = modelo
            this.formatDateListSedesContratosHojaContrato();
            this.displaySearch = false;
            this.displayDetalle = true;
            this.gridViewDetalle = true;
            this.getActaByContrato();
          } else {
            this._messageService.showError(
              'ERROR: No hay registro',
              'top center'
            );
          }
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  formatDateListSedesContratosHojaContrato() {
    this.listSedesContratosHojaContrato.map(function (item) {
      item.fechalnicioContratoFormat = moment(item.fechalnicioContrato)
        .format('DD-MMM-YYYY')
        .toUpperCase();
      item.fechaFinalContratoFormat = moment(item.fechaFinalContrato)
        .format('DD-MMM-YYYY')
        .toUpperCase();
      return item;
    });
  }

  myTabFocusChange(selectedTabIndex: number) {
    this.selectedTabIndex = selectedTabIndex;
  }

  obtenerClaseEstadoDiligenciamiento(estadosiligenciamiento: string[]): string {
    const pendientePorDiligenciar: string = 'pendiente_diligenciar';
    if (estadosiligenciamiento.includes(undefined)) {
      return pendientePorDiligenciar;
    } else if (estadosiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR)) {
      return pendientePorDiligenciar;
    } else if (estadosiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_INCOMPLETO)) {
      return 'incompleto';
    } else if (estadosiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_RECHAZADO)) {
      return 'rechazado';
    } else if (estadosiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_POR_APROBAR)) {
      return 'poraprobar';
    } else {
      return 'completo';
    }
  }

  getState(state: number): string {
    if (state == 4) {
      return "completo"
    } else if (state == 3) {
      return "rechazado"
    } else if (state == 2) {
      return "poraprobar"
    } else {
      return "pendiente"
    }
  }

  stateDocChange(state) {
    this.docState = state;
  }

  stateCicChange(state) {
    this.cicState = state;
  }

  stateIniChange(state) {
    this.inicioState = state;
  }

  actualizarEstado(estadoDiligenciamiento: any) {

    if (estadoDiligenciamiento == this.idEstadoIncompleto) {
      this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = this.ESTADO_DILIGENCIAMIENTO_INCOMPLETO;
    }
    else if (estadoDiligenciamiento == this.idEstadoPendienteAprobacion) {
      this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = this.ESTADO_DILIGENCIAMIENTO_POR_APROBAR;
    }
    else if (estadoDiligenciamiento == this.idEstadoAprobado) {
      this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = this.ESTADO_DILIGENCIAMIENTO_COMPLETO;
    }
    else if (estadoDiligenciamiento == this.idEstadoRechazado) {
      this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = this.ESTADO_DILIGENCIAMIENTO_RECHAZADO;
    }
    else if (estadoDiligenciamiento == this.idEstadoPendiente) {
      this.dataDetalleAlistamiento.estadoDiligenciamientoRutas = this.ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR;
    }
    localStorage.setItem("PlanRutasState", this.dataDetalleAlistamiento.estadoDiligenciamientoRutas);
    /*
    const arrayIndex = this.dataContratos.findIndex(contrato => contrato.contratoId == this.idContrato)
    const arrayIndexTabla = this.dataTabla.findIndex(contrato => contrato.contratoId == this.idContrato)
    this.dataContratos[arrayIndex].estadoRutas = (estadoContrato == 2 ? 'Incompleta' : 'pendiente_diligenciar');
    this.dataTabla[arrayIndexTabla].estadoRutas = (estadoContrato == 2 ? 'Incompleta' : 'pendiente_diligenciar');
    */
  }
}
