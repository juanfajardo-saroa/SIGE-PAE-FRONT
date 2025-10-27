import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { ContratosApiService } from '../../../../../shared/services/contratos-api.service';
import { MasterDataApiService } from '../../../../../shared/services/master-data-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { environment } from 'src/environments/environment';
import { LocalStorage } from 'src/app/static/local-storage';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import * as saveAs from 'file-saver';
import { DiagnosticoSituacionalExtendService } from 'src/app/shared/services/DiagnosticoSituacional-Extend.services';
import tableSort from "table-sort-js/table-sort.js"; // Utilidad usada mediante CSS en construccion HTML
import { DateUtilService } from 'src/app/shared/services/DateUtil.service';

const ID_ESTADO_PENDIENTE_APROBACION: number = 1;
const ID_ESTADO_APROBADO: number = 3;

const ID_ESTADO_RECHAZADO: number = 2;
const ID_MODELOOPERACIONMAEM: number = 1;
const ID_MODELOOPERACIONMAER: number = 2;
const ID_MODELOOPERACIONMAIP: number = 3;
const ID_MODELOOPERACIONPAEC: number = 4;
const ID_TIPO_MODIFICACION_PRORROGA = 1;
const ID_TIPO_MODIFICACION_ADICION = 2;
const ID_TIPO_MODIFICACION_REDUCCION = 3;
const ID_TIPO_MODIFICACION_OTRAS_CONDICIONES = 4;
const ID_TIPOCONTRATOSUMINISTRO =1;
const ID_TIPOCONTRATOMATERIAPRIMALOG =2;



@Component({
  selector: 'app-registro-contratos-detalle',
  templateUrl: './registro-contratos-detalle.component.html',
  styleUrls: ['./registro-contratos-detalle.component.sass']
})
export class RegistroContratosDetalleComponent implements OnInit,OnDestroy {
  @Input() itemDeContrato: any;
  @Input() itemFichaContrato: boolean = false;
  @Input() hojaContrato: any;
  @Input() idContrato: number = 0;
  @Input() tipoContratoId: number = 0;
  @Input() subTipoContratoId: number = 0;
  @Input() idOperacion: number = 1;
  @Input() idRowAprobacion: number = 0;
  @Output() cancelar: any = new EventEmitter<number>();
  modeloOperacionPAEC: number = 4;
  private sub : any;
  public VALOR_CERO: number = 0;
  public VALOR_FALSE: boolean = false;
  idAnticipoContrato: number = 0;
  idEstadoAprobado: number = ID_ESTADO_APROBADO;
  idEstadoRechazado: number = ID_ESTADO_RECHAZADO;
  idEstadoPendienteAprobacion: number = ID_ESTADO_PENDIENTE_APROBACION;
  disabledOperador: boolean = true;
  formVisibleDSMAEM: boolean = false;
  formVisibleDSPAEC: boolean = false;
  formVisibleDSMAER: boolean = false;
  formVisibleDSMAIP: boolean = false;
  formVisibleDSPRDTMP: boolean = false;
  formVisibleDSPRDTLogistica: boolean = false;
  formVisibleDSPRDTDOT: boolean = false;
  seccion88: boolean = false;
  formVisibleCFMAEM: boolean = false;
  formVisibleCFMAER: boolean = false;
  formVisibleCTMAER: boolean = false;
  formVisibleCFMAIP: boolean = false;
  formVisibleCTMAIP: boolean = false;
  formVisibleCFPAEC: boolean = false;

  private subs = new Subscription()
  
  listPlanPagosAnticipo: any = [];
  contratosDetallesSumServicios: any[] = [];
  itemContrato: any= [];
  srcPDF: any;
  listSubTiposRegistroMercantil: any[]= [];
  listTiposRegistroMercantil: any[]= [];
  loadingVisible: boolean = false;
  allFuentePresupuestalPoliz: any[] = [];
  listConsorcios: any[]= [];
  contratosSedes: any[]= [];
  listaInformacionPresupuestalModificaciones: any[]= [];
  dataEts: any[] = [];
  seccion1: boolean = true;
  seccion2: boolean = true;
  seccion3: boolean = true;
  seccion4: boolean = true;
  seccion5: boolean = true;
  seccion6: boolean = true;
  seccion7: boolean = true;
  seccion8: boolean = true;
  seccion9: boolean = true;
  seccion10: boolean = true;
  seccion11: boolean = true;
  seccion12: boolean = true;
  seccion13: boolean = true;
  seccion14: boolean = true;
  seccion15: boolean = true;
  seccion16: boolean = true;

  numseccion1: number = 1;
  numseccion2: number = 2;
  numseccion3: number = 3;
  numseccion4: number = 4;
  numseccion5: number = 5;
  numseccion6: number = 6;
  numseccion7: number = 7;
  numseccion8: number = 8;
  numseccion9: number = 9;
  numseccion10: number = 10;
  numseccion11: number = 11;
  numseccion12: number = 12;
  numseccion13: number = 13;
  numseccion14: number = 14;
  numseccion15: number = 15;
  numseccion16: number = 16;

  dataSuministroDetalle: any[] = [];
  dataTotalFinanciero: any[] = [];
  dataServicios: any[] = [];
  dataDotacion: any[] = [];
  dataMunicipios: any[] = [];
  dataSedesBeneficiariasMAE: any[] = [];
  dataSedesBeneficiariasMAIP: any[] = [];
  dataSedesBeneficiariasPAEC: any[] = [];
  dataContratoRacionesValorTotalMAEM: any[] = [];
  dataSumRacionesSedesBeneficiarias: any[] = [];
  dataSumRacionesSedesBeneficiariasPAEC: any[] = [];
  dataSumRacionesContratadasDiarias: any[] = [];
  dataSumRacionesContratadasDiariasPAEC: any[] = [];
  dataSumContratoRacionesValorTotalMAER: any[] = [];
  modeloGet: any[] = [];
  totalSedes: number = 0;
  manejaPreciosporzona:string = 'No';
  manejaPreciosporNivelEducativo:string = 'No';
  dataAllMateriPrima: any[] = [];
  dataTotalRacionesMAIP: any[] = [];
  dataDetallesSumRacionesMAIP: any[] = [];
  dataDetallesSumRacionesMAER:  any[] = [];
  dataTotalRacionesPAEC: any[] = [];
  dataAsociacionContratos: any[] = [];
  editarPrecios: boolean = false;
  numeroRacionesMaem: number=0;
  numeroRacionesPaec: number=0;
  numeroRacionesMaer: number=0;
  numeroRacionesMaip: number=0;
  dataSourceRaciones: any[] = [];
  dataSourceRacionesMAIP: any[] = [];
  dataSourcePAEC: any[] = [];
  dataTotalRacionesMAER: any[] = [];
  detallesSumRacionesMAE: any[] = [];
  detallesSumRacionesPAEC: any[] = [];
  dataPolizasByIdContrato: any[] = [];
  dataSumRacionesPreciosMAER: any[] = [];
  dataSumRacionesPreciosMAIP: any[] = [];
  dataSumContratoRacionesValorTotalMAIP: any[] = [];
  dataInformacionPresupuestal: any[] = [];
  dataContratosPolizasCompraLocalesContrato: any[] = [];
  dataContratosAprobacion: any[] = [];
  dataContratosModificacion: any[] = [];
  dataContratosModificacionProroga: any[] = [];
  dataContratosModificacionAdicion: any[] = [];
  dataContratosModificacionReduccion: any[] = [];
  dataContratosOtrasCondiciones: any[] = [];
  dataSource: any[] = [];
  preciosPorRacion: any[] = [];
  columnsPAEPI: string[] = ['jornada', 'PS', 'CCT'];
  columnsMAIP: string[] = ['jornada', 'PS', 'CCT'];
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'zona', 'centro', 'trayectos', 'clasificacion'];
  displayedColumnsFinanciera: string[] = ['descripcion', 'fMAEM', 'fMAER'];
  dataHistoricoAprobaciones: any = [];
  displayedColumnsHistorico: string[] = [
    'Fecha',
    'Responsable',
    'Rol del <br> responsable',
    'Acci&oacute;n',
    'Observaciones / <br> justificaciones'
  ];
  itemAprobacion: any = {
    id:0,
    iD_Contrato: 0,
    fechaAprobacion: new Date(),
    iD_TipoEstadoContrato: 0,
    responsable: environment.responsable,
    rolResponsable: environment.rolResponsable,
    accion: "",
    observaciones: "",
    estado: true,
    auditoria: LocalStorage.getAuditoria('Crear')
  }

  numberBadge: string = '1';

  constructor(
    private _modalService: NgbModal,
    private _contratosService: ContratosApiService,
    private _masterDataService: MasterDataApiService,
    public router: Router,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService,
    private _servicios: DiagnosticoSituacionalExtendService,
    public dateUtil: DateUtilService
  ) {
  }

  goToPage() {
    this.router.navigate(['registroUnicoContratos']);
  }

  ngOnInit(): void {
    this.itemAprobacion.iD_Contrato = this.idContrato;
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
 

  ordenarTabla() {
    tableSort();
  }

  ngOnChanges(): void {
    this.itemContrato.push({nomOperador:0});
    this.allFuentePresupuestalPoliz.push({fuenteFinanciacion:0});
    this.getContratosHojaContrato(this.idContrato);


  }


  changeItemAprobacion(name: string, value: any){
    this.itemAprobacion[name] = name == 'observaciones' ? value.trim() : value;
  }

  enviarResultado(){
    if(this.itemAprobacion.iD_TipoEstadoContrato <= 0){
      this._messageService.showWarning('Seleccione un tipo de estado aprobación.', 'top center');
      return;
    }

    if(this.itemAprobacion.observaciones.length == 0){
      this._messageService.showWarning('Digite la observacion/justificacion.', 'top center');
      return;
    }

    this.grabarAprobacion();
  }

  grabarAprobacion(){
    this.loadingVisible = true;

    this._contratosService.createAprobacionContrato(this.itemAprobacion)
    .subscribe(response => {
      this.loadingVisible = false;

      if(response.success){
        this.numberBadge = '';
        this.estadoContratoActualizar();
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  estadoContratoActualizar() {
    this._contratosService.put_UpdateEstadoContrato({
      id: this.idContrato,
      iD_EstadoContrato: this.itemAprobacion.iD_TipoEstadoContrato,
      accion : this.itemAprobacion.iD_TipoEstadoContrato == ID_ESTADO_APROBADO ? 'Aprobado':  'Rechazado',
      idEtc : this.itemContrato[0].iD_ETC,
      idContrato: this.itemContrato[0].id_Contrato,
      idOperador: this.itemContrato[0].id_operador,
      auditoria: LocalStorage.getAuditoria('Aprobar'),
      idRowAprobacion :this.idRowAprobacion,
      fechaAprobacion : this.itemAprobacion.fechaAprobacion
    })
    .subscribe(response => {
      if(response.success){
        this.onCancelar();
      } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  onCancelar() {
    this.cancelar.emit(this.itemContrato[0].tipoContratoId);
  }

  get_HistoricoAprobacionesPorContrato(){
    this.loadingVisible = true;

    this._contratosService.get_HistoricoAprobacionesPorContrato(this.idContrato)
    .subscribe(response => {
      this.loadingVisible = false;

      if(response.success){
        response.result.map(function(item: any){
          item.fechaAprobacionString = moment(item.fechaAprobacion).format('DD-MMM-yyyy').toUpperCase();
          return item;
        });

        this.dataHistoricoAprobaciones = response.result.length > 0 ? response.result : [{}];
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });

  }

  getContratosHojaContrato(item: number) {

    this._contratosService.get_SedesContratosHojaContrato(item)
      .subscribe(response => {
        if (response.success) {
          this.itemContrato = response.result;
          this.get_ContratosConfiguracion(this.tipoContratoId,this.subTipoContratoId);
          if(this.itemContrato[0].tipoContratoId==ID_TIPOCONTRATOMATERIAPRIMALOG || this.itemContrato[0].tipoContratoId==ID_TIPOCONTRATOSUMINISTRO ){
            this.permmitSections();
          }
          this.inicializarControl();
          this.get_HistoricoAprobacionesPorContrato();

        }
      });
  }

  getListaConsorcio(item: any) {
    this._contratosService.get_ContratosUTConsorciosOperadores(item)
      .subscribe(response => {
        if (response.success) {
          this.listConsorcios = response.result;
        }
      });
  }

  get_AnticiposContrato(idContrato: number) {

    this._contratosService.get_AnticiposContratos(idContrato)
    .subscribe(response => {
      if(response.success) {
        let data: any = response.result.length > 0 ? response.result.shift():{};
        this.idAnticipoContrato = data.id != null ? data.id : 0;
        this.get_PlanAnticiposGetID();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_PlanAnticiposGetID() {
    this._contratosService.get_PlanAnticiposGetID(this.idAnticipoContrato).subscribe(response => {
      if(response.success) {
        this.listPlanPagosAnticipo = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
    });
  }

  get_DetallesSumRacionesMAEM(item: any, item_two: any) {
    this._contratosService.get_DetallesSumRacionesMAEM(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.numeroRacionesMaem =  response.result[0].diasSuministro;
          this.numeroRacionesPaec = response.result[0].mesesSuministro;
          this.detallesSumRacionesMAE = response.result;
        }
      });
  }

  get_EtsContrato(idContrato: number) {
    this._contratosService.get_EtsByIdContrato(idContrato)
      .subscribe(response => {
        if(response.success) {
          this.dataEts = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_TotalRacionesMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: any) {
    this._contratosService.get_TotalRacionesMAEM(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        if (response.success) {
          this.detallesSumRacionesMAE = response.result;
        }
      });
  }

  get_detallesSumRacionesPAEC(item: any, item_two: any) {
    this._contratosService.get_detallesSumRacionesPAEC(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.detallesSumRacionesPAEC = response.result;
        }
      });
  }



  get_SumRaciones(item: any, item_two: any) {
    if (item_two == ID_MODELOOPERACIONMAEM)
    {
    this._contratosService.get_SumRacionesPreciosMAEM(item, item_two, 0, 0 , false, false)
      .subscribe(response => {
        if (response.success) {
          this.dataSourceRaciones = response.result;
        }
      });
    }
    if (item_two == ID_MODELOOPERACIONMAER)
    {
    this._contratosService.get_SumRacionesPreciosMAER(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.dataSourceRaciones = response.result;
        }
      });
    }
    if (item_two == ID_MODELOOPERACIONMAIP)
    {

      this._contratosService.get_SumRacionesPreciosMAIP(item, item_two, 0, 0 , false, false)
        .subscribe(response => {
          if (response.success) {
            this.dataSourceRacionesMAIP = response.result;
          }
        });
      }
  }


  get_TotalSeguimientoFinanciero(item: any) {
    this._contratosService.getTotalGeneralContratadoSeguimientoFinancieron(item).subscribe(response => {
      if(response.success) {
        this.dataTotalFinanciero = response.result;
      }
    });
  }

  get_SedesContratoModeloOperacion(item: any, item_two: any) {
    this._contratosService.get_SedesContratoModeloOperacion(item, (item_two>0?item_two:1))
      .subscribe(response => {
        if (response.success) {
          this.contratosSedes = response.result;
        }
      });
  }

  get_SedesBeneficiariasMAE(item: any, item_two: any) {
    this._contratosService.get_SedesContratoModeloOperacion(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.dataSedesBeneficiariasMAE = response.result;
        }
        this.ordenarTabla();
      });
  }

  get_SedesBeneficiariasPAEPI(item: any, item_two: any) {
    this._contratosService.get_SedesContratoModeloOperacion(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.dataSedesBeneficiariasMAIP = response.result;
        }
      });
  }

  get_SedesBeneficiariasPAEC(item: any, item_two: any) {
    this._contratosService.get_SedesContratoModeloOperacion(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.dataSedesBeneficiariasPAEC = response.result;
        }
      });
  }

  get_SumRacionesPAEC(item: any, item_two: any) {

    this._contratosService.get_SumRacionesPreciosPAEC(item, item_two)
      .subscribe(response => {
        if (response.success) {
          this.dataSourcePAEC = response.result;
        }
      });
  }

  getAllPolizasByIdContrato(item: any) {
    this._contratosService.getAllPolizasByIdContrato(item)
      .subscribe(response => {
        if (response.success) {
          this.dataPolizasByIdContrato = response.result;
        }
      });
  }

  getContratosPolizasCompraLocalesContrato(item: any) {
    this._contratosService.getContratosPolizasCompraLocalesContrato(item)
      .subscribe(response => {
        if (response.success) {
          this.dataContratosPolizasCompraLocalesContrato = response.result;
        }
      });
  }

  getInformacionPresupuestalGetId(item: any) {
    this._contratosService.getInformacionPresupuestalGetId(item)
      .subscribe(response => {
        if (response.success) {
          this.dataInformacionPresupuestal = response.result;
        }
      });
  }

  GetAllFuentePresupuestalPoliz(item: any) {
    this._contratosService.GetAllFuentePresupuestalPoliz(item)
      .subscribe(response => {
        if (response.success) {
          this.allFuentePresupuestalPoliz = response.result;
        }
      });
  }



  //Aprobaciones
  get_ContratosAprobacionGetIDs(item: any) {
    this._contratosService.get_ContratosAprobacionGetIDs(item)
      .subscribe(response => {
        if (response.success) {
          this.dataContratosAprobacion = response.result[0];
        }
      });
  }

  get_ContratosConfiguracion(iD_TipoContrato: number, iD_SubTipoContrato: number) {
    this._contratosService.get_ContratosConfiguracion(iD_TipoContrato, iD_SubTipoContrato)
      .subscribe(response => {
        if (response.success) {
          this.seccion1 = response.result[0].seccion1;
          this.seccion2 = response.result[0].seccion2;
          this.seccion3 = response.result[0].seccion3;
          this.seccion4 = response.result[0].seccion4;
          this.seccion5 = response.result[0].seccion5;
          this.seccion6 = response.result[0].seccion6;
          this.seccion7 = response.result[0].seccion7;
          this.seccion8 = response.result[0].seccion8;
          this.seccion9 = response.result[0].seccion9;
          this.seccion10 = response.result[0].seccion10;
          this.seccion11 = response.result[0].seccion11;
          this.seccion12 = response.result[0].seccion12;
          this.seccion13 = response.result[0].seccion13;
          this.seccion14 = response.result[0].seccion14;
          this.seccion15 = response.result[0].seccion15;
          this.seccion16 = response.result[0].seccion16;


          this.numseccion1 = response.result[0].numSec1;
          this.numseccion2 = response.result[0].numSec2;
          this.numseccion3 = response.result[0].numSec3;
          this.numseccion4 = response.result[0].numSec4;
          this.numseccion5 = response.result[0].numSec5;
          this.numseccion6 = response.result[0].numSec5;
          this.numseccion7 = response.result[0].numSec7;
          this.numseccion8 = response.result[0].numSec8;
          this.numseccion9 = response.result[0].numSec9;
          this.numseccion10 = response.result[0].numSec10;
          this.numseccion11 = response.result[0].numSec11;
          this.numseccion12 = response.result[0].numSec12;
          this.numseccion13 = response.result[0].numSec13;
          this.numseccion14 = response.result[0].numSec14;
          this.numseccion15 = response.result[0].numSec15;
          this.numseccion16 = response.result[0].numSec16;
        }
      });
    }

  get_ContratosModificacion(item: any) {
    this._contratosService.get_ContratosModificacion(item)
      .subscribe(response => {
        if (response.success) {
          this.dataContratosModificacion = response.result;
          this.dataContratosModificacionProroga = this.dataContratosModificacion.filter(contrato => contrato.iD_TipoModificacion == ID_TIPO_MODIFICACION_PRORROGA);
          this.dataContratosModificacionAdicion = this.dataContratosModificacion.filter(contrato => contrato.iD_TipoModificacion == ID_TIPO_MODIFICACION_ADICION);
          this.dataContratosModificacionReduccion = this.dataContratosModificacion.filter(contrato => contrato.iD_TipoModificacion == ID_TIPO_MODIFICACION_REDUCCION);
          this.dataContratosOtrasCondiciones = this.dataContratosModificacion.filter(contrato => contrato.iD_TipoModificacion == ID_TIPO_MODIFICACION_OTRAS_CONDICIONES);
          this.dataContratosModificacionAdicion.forEach(contratoModificacion => {
            this.get_InformacionPresupuestalModificacionGetId(contratoModificacion.id);
          });
          this.dataContratosModificacionReduccion.forEach(contratoModificacion => {
            this.get_InformacionPresupuestalModificacionGetId(contratoModificacion.id);
          });
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      }, error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      });
  }

  get_InformacionPresupuestalModificacionGetId(idModificacion: number) {
    this._contratosService.get_FuentesFinanciacionModif(this.idContrato, idModificacion ?? this.VALOR_CERO)
    .subscribe(response => {
      if(response.success) {
        this.listaInformacionPresupuestalModificaciones.push({
          idModificacion: idModificacion,
          informacionPresupuestal: response.result,
          informacionPresupuestalesUnicos: this.obtenerInformacionPresupuestalUnica(response.result)
        });
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }, error => {
      this._messageService.showError('ERROR: ' + error, 'top center');
    });
  }

  get_AllServicio(idContrato: number) {
    this._contratosService.GetAllServicio(idContrato).subscribe(response => {
      if(response.success) {
        this.contratosDetallesSumServicios = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }, error => {
      this._messageService.showError('ERROR: ' + error, 'top center');
    });
  }

  obtenerInformacionPresupuestalUnica(listInformacionPresupuestal: any[]): any[] {
    return listInformacionPresupuestal
      .filter((informacionPresupuestal, index, array) =>
        array.findIndex(informacionPresupuestalFromArray => (informacionPresupuestalFromArray.id === informacionPresupuestal.id)) === index
      );
  }

  obtenerPosicionInformacionPresupuestalPorIdModificacion(idModificacion: number): number {
    let index = this.listaInformacionPresupuestalModificaciones.findIndex(e => e.idModificacion == idModificacion);
    return index ?? this.VALOR_CERO;
  }

  public inicializarControl() {
    //this.get_TotalRacionesPAEC(this.idContrato,this.modeloOperacionPAEC,0);
    this.get_TotalRacionesMAEM(this.idContrato,this.hojaContrato.iD_TipoModeloOperacion,0);
    this.get_TotalRacionesMAER(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_TotalRacionesMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_SumContratoRacionesValorTotalMAEM(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_ContratosSumRacionesContratadasDiarias(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_ContratosSumRacionesSedesBeneficiarias(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_SumContratoRacionesValorTotalMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, 0);
    this.get_DetallesSumRacionesMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_DetallesSumRacionesMAER(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_SumRacionesPreciosMAER(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_SumRacionesPreciosMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_AllMateriPrima(this.idContrato);
    this.GetContratosContratoDescentralizadoGetId(this.idContrato);
    this.get_SuministroDetalle(this.idContrato);
    this.GetAllProducto(this.idContrato);
    this.GetAllServicio(this.idContrato);
    this.GetAllFuentePresupuestalPoliz(this.idContrato);
    this.getListaConsorcio(this.idContrato);
    this.get_AnticiposContrato(this.idContrato);
    this.get_SumRaciones(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    //this.get_SumRacionesPAEC(this.idContrato, ID_MODELOOPERACIONPAEC);
    this.get_SedesBeneficiariasMAE(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_SedesBeneficiariasPAEPI(this.idContrato, ID_MODELOOPERACIONMAIP);
    this.get_SedesContratoModeloOperacion(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    this.get_DetallesSumRacionesMAEM(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion);
    if (this.hojaContrato.iD_TipoModeloOperacion1==ID_MODELOOPERACIONMAIP){
      this.get_SumRaciones(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion1);
      this.get_TotalRacionesMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion1, 0);
      this.get_SumRacionesPreciosMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion1);
      this.get_DetallesSumRacionesMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion1);
    }

    /* if(this.hojaContrato.manejaPAEC == 'TRUE'){
      this.get_ContratosSumRacionesContratadasDiarias(this.idContrato, ID_MODELOOPERACIONPAEC, 0);
      this.get_ContratosSumRacionesSedesBeneficiarias(this.idContrato, ID_MODELOOPERACIONPAEC, 0)
      this.get_SedesBeneficiariasPAEC(this.idContrato, ID_MODELOOPERACIONPAEC);
      this.get_detallesSumRacionesPAEC(this.idContrato, ID_MODELOOPERACIONPAEC);
    } */
    this.getAllPolizasByIdContrato(this.idContrato);
    this.getContratosPolizasCompraLocalesContrato(this.idContrato);
    this.getInformacionPresupuestalGetId(this.idContrato);
    this.get_ContratosAprobacionGetIDs(this.idContrato);
    this.get_ContratosModificacion(this.idContrato);
    this.get_EtsContrato(this.idContrato);
    this.GetAllMunicipio(this.idContrato);
    this.get_AllServicio(this.idContrato);
    this.get_TotalSeguimientoFinanciero(this.idContrato);

  }

  changeItemContratosHojaContrato(name: string, value: any) {
    if (!this.disabledOperador) {
      this.itemContrato[0][name] = value == null ? value : value.toString().includes(' ') ? value.trim() : value;
    }
  }

  changeItemDetalleSuministro() {
    this.get_TotalRacionesMAEM(this.idContrato, this.tipoContratoId, this.numeroRacionesMaem);
  }


  changeItemTotalRacionesPAEC() {
    this.get_TotalRacionesPAEC(this.idContrato, this.tipoContratoId, this.numeroRacionesPaec);
  }

  changeItemTotalRacionesMAER() {
    this.get_TotalRacionesMAER(this.idContrato, this.tipoContratoId, this.numeroRacionesPaec);
  }

  changeSumRacionesMAIP() {
    this.get_TotalRacionesMAIP(this.idContrato, this.tipoContratoId, this.numeroRacionesMaip);
  }


  changeContratoRacionesValorTotalMAEM() {
    this.get_SumContratoRacionesValorTotalMAEM(this.idContrato, this.tipoContratoId, this.numeroRacionesMaem);
  }

  changeSumRacionesPreciosMAER() {
    this.get_SumContratoRacionesValorTotalMAER(this.idContrato, this.tipoContratoId, this.numeroRacionesMaer);
  }

  changeSumContratoRacionesValorTotalMAIP() {
    this.get_SumContratoRacionesValorTotalMAIP(this.idContrato, this.hojaContrato.iD_TipoModeloOperacion, this.numeroRacionesMaip);
  }

  uploadPDF(name: string) {
    const fileUpload = document.getElementById('fileUpload_' + name) as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {

        const file = fileUpload.files[0];
        this.itemContrato[0][name] = '';

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {

            this.itemContrato[0][name + "Name"] = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.itemContrato[0][name] = reader.result?.toString().replace('data:application/pdf;base64,', '');
            };
          }
          else {
            fileUpload.value = '';
            this._messageService.showWarning('El tamaño del archivo supera los 100MB', 'top center');
          }
        }
        else {
          fileUpload.value = '';
          this._messageService.showWarning('El formato del archivo no es un PDF', 'top center');
        }

      }
    }

    fileUpload.click();
  }

  abrirPDF(contenido: any, name: string) {
    if (name != null) {
      this.srcPDF = "data:application/pdf;base64," + name;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  downloadFileRuta(nombreArchivo: string):void{
    let _fileUpload : fileUploadModel = {
      file: null,
      fileName: nombreArchivo,
      cnx: environment.cnxBS,
      container: environment.containerFiles
    };

    this._servicios.downloadFileBlobRepositorios(_fileUpload, 'sd').subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, nombreArchivo);
      },
      (err) => {
        console.log("-----> error en la descarga del archivo desde el repositorio azure", err);
      }
    )
  };

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  get_TiposRegistroMercantil() {
    this.loadingVisible = true;

    this._contratosService.get_TiposRegistroMercantil()
      .subscribe(response => {
        this.loadingVisible = false;
        this.listTiposRegistroMercantil = response.result;
      });
  }

  get_SubTiposRegistroMercantil() {
    this.loadingVisible = true;

    this._contratosService.get_SubTiposRegistroMercantil(1)
      .subscribe(response => {
        this.loadingVisible = false;
        this.listSubTiposRegistroMercantil = response.result;
      });
  }

  get_TotalRacionesPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: any) {
    this._contratosService.get_TotalRacionesPAEC(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        this.loadingVisible = false;
        this.dataTotalRacionesPAEC = response.result;
      });
  }


  get_DetallesSumRacionesMAER(iD_Contrato: number, iD_TipoModeloOperacion: number) {
    this._contratosService.get_DetallesSumRacionesMAER(iD_Contrato, iD_TipoModeloOperacion)
      .subscribe(response => {
        this.numeroRacionesMaer =  response.result[0].diasSuministro;
        this.dataDetallesSumRacionesMAER = response.result;
      });
  }

  get_TotalRacionesMAER(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_TotalRacionesMAER(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        this.dataTotalRacionesMAER = response.result;
      });
  }

  get_DetallesSumRacionesMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number) {
    this._contratosService.get_DetallesSumRacionesMAIP(iD_Contrato, iD_TipoModeloOperacion)
      .subscribe(response => {
        this.dataDetallesSumRacionesMAIP = response.result;
      });
  }

  get_TotalRacionesMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_TotalRacionesMAIP(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        this.dataTotalRacionesMAIP = response.result;
      });
  }

  get_AllMateriPrima(iD_Contrato: number) {
    this._contratosService.get_AllMateriPrima(iD_Contrato)
      .subscribe(response => {
        this.dataAllMateriPrima = response.result;
      });
  }


  get_SuministroDetalle(iD_Contrato: number) {
    this._contratosService.get_SuministroDetalle(iD_Contrato)
      .subscribe(response => {
        this.dataSuministroDetalle = response.result;
      });
  }

  GetAllProducto(iD_Contrato: number) {
    this._contratosService.GetAllProducto(iD_Contrato)
      .subscribe(response => {
        this.dataDotacion = response.result;
      });
  }

  GetAllMunicipio(iD_Contrato: number) {
    this._contratosService.getAllConveniosAportes(iD_Contrato)
      .subscribe(response => {
        this.dataMunicipios = response.result;
      });
  }

  GetAllServicio(iD_Contrato: number) {
    this._contratosService.GetAllServicio(iD_Contrato)
      .subscribe(response => {
        this.dataServicios = response.result;
      });
  }

  get_ContratosSumRacionesSedesBeneficiarias(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_ContratosSumRacionesSedesBeneficiarias(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        if(iD_TipoModeloOperacion <= 3){
          this.dataSumRacionesSedesBeneficiarias = response.result;
        } else{
          this.dataSumRacionesSedesBeneficiariasPAEC = response.result;
        }

      });
  }

  get_ContratosSumRacionesContratadasDiarias(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {

    this._contratosService.get_ContratosSumRacionesContratadasDiarias(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        if(iD_TipoModeloOperacion <= 3){
          this.dataSumRacionesContratadasDiarias = response.result;
        } else{
          this.dataSumRacionesContratadasDiariasPAEC = response.result;
        }
      });
  }

  get_SumContratoRacionesValorTotalMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_SumContratoRacionesValorTotalMAEM(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados, this.VALOR_CERO, this.VALOR_CERO, this.VALOR_FALSE, this.VALOR_FALSE)
      .subscribe(response => {
        this.dataContratoRacionesValorTotalMAEM = response.result;
      });
  }

  get_SumContratoRacionesValorTotalMAER(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_SumContratoRacionesValorTotalMAER(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados)
      .subscribe(response => {
        this.dataSumContratoRacionesValorTotalMAER = response.result;
      });
  }


  get_SumRacionesPreciosMAER(iD_Contrato: number, iD_TipoModeloOperacion: number) {
    this._contratosService.get_SumRacionesPreciosMAER(iD_Contrato, iD_TipoModeloOperacion)
      .subscribe(response => {
        this.dataSumRacionesPreciosMAER = response.result;
      });
  }

  get_SumRacionesPreciosMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number) {
    this._contratosService.get_SumRacionesPreciosMAIP(iD_Contrato, iD_TipoModeloOperacion, this.VALOR_CERO, this.VALOR_CERO,  this.VALOR_FALSE,this.VALOR_FALSE)
      .subscribe(response => {
        this.dataSumRacionesPreciosMAIP = response.result;
      });
  }

  get_SumContratoRacionesValorTotalMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number) {
    this._contratosService.get_SumContratoRacionesValorTotalMAIP(iD_Contrato, iD_TipoModeloOperacion, nro_DiasContratados, this.VALOR_CERO, this.VALOR_CERO,  this.VALOR_FALSE ,this.VALOR_FALSE)
      .subscribe(response => {
        this.dataSumContratoRacionesValorTotalMAIP = response.result;
      });
  }

  GetContratosContratoDescentralizadoGetId(iD_Contrato: number) {
    this._contratosService.GetContratosContratoDescentralizadoGetId(iD_Contrato)
      .subscribe(response => {
        this.dataAsociacionContratos = response.result;
      });
  }

  getTotalSedes(){
    for (let item of this.modeloGet) {

      this.totalSedes = item.canSedes;

      if(item.manejaPreciosporzona == true)
      this.manejaPreciosporzona = 'Si';

      if(item.manejaPreciosporNivelEducativo == true)
      this.manejaPreciosporNivelEducativo = 'Si';

    }

  }

  permmitSections() {

  switch (this.hojaContrato['iD_TipoModeloOperacion']) {
    case 1:

      this.formVisibleDSMAEM = true;
      this.formVisibleCFMAEM = true;
    break;
    case 2:
      this.formVisibleDSMAER = true;
      //this.formVisibleDSPRDTLogistica = true;
      this.formVisibleCFMAER = true;
    break;
    case 3:
      this.formVisibleDSMAIP = true;
      this.formVisibleCFMAIP = true;
      //this.seccion12 = true;
    break;
   }
   if(this.hojaContrato['iD_TipoModeloOperacion1']==3){
      this.formVisibleDSMAIP = true;
      this.formVisibleCFMAIP = true;
   }
   if(this.stringToBoolean(this.hojaContrato['manejaPAEC'])) { this.formVisibleDSPAEC = true; }
   if(this.stringToBoolean(this.hojaContrato['manejaPAEC'])) { this.formVisibleCFPAEC = true; }

  }

  getModulePermission(module:number,action:string):boolean{
    return this._seguridadService.getModulePermission(module,action);
  }

  stringToBoolean(valString: string) {
    switch (valString.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(valString);
    }
  }
}
