import { AfterViewInit, Component, OnInit, AfterContentInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratosApiService } from '../../../../../../shared/services/contratos-api.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import tableSort from "table-sort-js/table-sort.js"; // Utilidad usada mediante CSS en construccion HTML

const ID_TIPOCONTRATO: number = 2;
const PROVEER_OPERACION_LOGISTICA: number = 5;
const PROVEER_MATERIA_PRIMA: number = 4;
const ID_ESTADO_PENDIENTE: number = 0;
const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.sass'],
  /* providers: [
    ContratosApiService,
    MasterDataApiService
  ] */
})
export class LogisticaComponent implements OnInit ,OnDestroy{
  public ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR: number = 0;
  public ESTADO_DILIGENCIAMIENTO_INCOMPLETO: number = 1;
  public ESTADO_DILIGENCIAMIENTO_COMPLETO: number = 2;
  private subs = new Subscription()
  private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  public SumRacionesSedesBeneficSinJornada: number = 0;
  public proveerOperacionLogistica: number = PROVEER_OPERACION_LOGISTICA;
  public proveerMateriaPrima: number = PROVEER_MATERIA_PRIMA;
  public srcPDF: any;
  public dataFuenteFinanciacion: any[] = [];
  public btnMateriaPrimaDisab: boolean = true;
  public btnPolizasDisab: boolean = true;
  public btnSedesBenefDisab: boolean = true;
  public showValidation : boolean = true;
  public showPDFValidation: boolean = false;
  public dataPestanas: any = [
    {id: 1, descripcion: 'Contratos', active: true}
  ]
  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };
  public contrato: any = {
    id: 0,
    TipoContratoId: ID_TIPOCONTRATO,
    iD_TipoContratoCHIP: '',
    iD_TipoConceptoGasto: '',
    iD_ETC: 0,
    iD_ET: 0,
    iD_MinutaPatronAlimento: 0,
    iD_Operador: '',
    iD_TipoCategoriaContrato: 0,
    iD_EstadoContrato: ID_ESTADO_PENDIENTE,
    iD_UTConsorcio: 0,
    iD_PlanAlistamiento: 0,
    iD_Vigencia: this.itemVigencia?.id,
    subTipoContratoId: 0,
    numeroContrato: '',
    objetoContrato: '',
    conAnticipo: false,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    estado:	false,
    auditoria: LocalStorage.getAuditoria(''),
    valorTotalContrato: null,
    manejaPAEC:	false,
    iD_TipoModeloOperacion: 0,
    nombreArchivo: '',
    archivo: ''
  }
  public itemDetalleProcesoContrato: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoContratacion: '',
    iD_PlataformaContrato: 0,
    publicadorSECOP: false,
    numeroProcesoRegistradoSECOP: '',
    linkContratoSECOP: '',
    fechaAdjudicacion: null,
    fechaSuscripcion: null,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  };
  public anticipoContrato: any = {
    id: 0,
    iD_Contrato: 0,
    iD_tipoperiodicidad: 0,
    valorAnticipo: 0,
    porcentajeAnticipo: 0,
    tipoPeriodicidadld: 0,
    numeroPagos: 0,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  }
  public suministros: any = {
    id: 0,
    iD_Contrato: 0,
    NumeroDiasSuministro: 0,
    TotalComplementosContratadas: 0,
    CostoUnitarioEnsambleOperacion: 0,
    auditoria: LocalStorage.getAuditoria(''),
    estado: true
  }
  public valorTotalSuministros: any = 0;
  public valorTotalProductosMateriaPrima: number = 0;
  public valorTotalMateriaPrimaDiasSuministro: number = 0;
  public comprasLocales: any = {
    id:0,
    iD_contrato: 0,
    iD_TipoReglaCompraLocal: '',
    iD_TipoCriterioEvaluacion: '',
    iD_TipoPeriodicidad: '',
    porcentajeMinimo: 0,
    numeroEmpresasMinimo: 0,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  }

  public listOperadores: any = [];
  public listContratoChip: any = [];
  public listSubtiposContratacion: any = [];
  public listModalidaContratacionChip: any = [];
  public listPerioricidadAmortizacion: any = [];
  public listConceptoGasto: any = [];
  public listCriterioEmpleadoCuota: any = [];
  public listCriterioEvaluacion: any = [];
  public listPeriodicidadEvaluacion: any = [];
  public listMunicios: any = [];

  //CONSULTA EXITOSA
  private resultQuery1: boolean = false;
  private resultQuery2: boolean = false;
  private resultQuery3: boolean = false;

  //FORM ACTIVO
  public contratoForm: boolean = false; //acive default
  public procesoContractualForm: boolean = false;
  public detalleSuministroForm: boolean = false;
  public sedesBeneficiariasForm: boolean = false;
  public caracteristicasFinancierasForm: boolean = false;
  public polizasForm: boolean = false;
  public comprasLocalesForm: boolean = false;
  public infPresupuestalForm: boolean = false;
  headerText2 = '';

  //SEDES BENEFICIARIAS
  public itemUtil: any = {
    nombre_TipoModeloOperacion: 'MAEM',
    seleccionTodo: false,
    seleccionTodoBen: false,
  }
  public selectedTabIndex: number = 0;

  public dataSedesNoBen: any = [];
  public dataSedesBen: any = [];

  public colsJornadas: any = [
    'Jornada', 'Almuerzo', 'Complemento'
  ]

  public dataSumRacionesDiarias: any = [];
  public dataSumRacionesContratadas: any = [];

  //RUBROS
  public rubroAdd: boolean = false;
  public tieneRubros: boolean = false;
  public valTotalRubros: number = 0;

  constructor(
    private _contratosApiService: ContratosApiService,
    private _masterDataAPI: MasterDataApiService,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private _modalService: NgbModal,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._activeRouter.params.subscribe(params => {
      if(params['corresponde']!=undefined && params['etId']!=undefined){
        let tipo = +params['corresponde'];
        let iD_ET = +params['etId'];
        this.contrato.iD_ETC = tipo == 1 ? this.iD_ETC : 0;
        this.contrato.iD_ET =  tipo == 2 ? iD_ET : 0;
      }

      if(params['idContrato']!=undefined) {
        this.contrato.id = +params['idContrato'];
        this.get_ContratoInfo();
      }
      else{ this.contratoForm = true; }
    });

    this.get_Operadores();
    this.get_ContratoChip();
    this.get_ModalidaContratacionChip();
    this.get_ConceptosGasto();
    this.get_SubtiposContratacion();
    this.get_PerioricidadAmortizacion();
    this.get_ListadoTipoReglaComprasLocales();
    this.get_ListadoTiposCriterioEvaluacion();
    this.get_Divipolas();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  get_ContratoInfo(){

    this._contratosApiService.get_SedesContratosHojaContrato(this.contrato.id)
      .subscribe(response=>{
        if(response.success) {

          let data: any = response.result.length>0?response.result.shift():{};
          this.contrato.id = data.id_Contrato != null ? data.id_Contrato : 0;
          this.contrato.TipoContratoId = data.tipoContratoId != null ? data.tipoContratoId : 0;
          this.contrato.iD_Vigencia = data.iD_Vigencia != null ? data.iD_Vigencia : this.itemVigencia?.id;
          this.contrato.iD_EstadoContrato =  data.iD_EstadoContrato != null ? data.iD_EstadoContrato : 0;
          this.contrato.digitoVerificacion = data.digitoVerificacion;
          this.contrato.dv = data.digitoVerificacion;
          /**
           * vista contrato
           */
          this.contrato.numeroContrato = data.numeroContrato != null ? data.numeroContrato : '';
          this.contrato.iD_Operador = data.id_operador != null ? data.id_operador : 0;
          this.contrato.objetoContrato = data.objetoContrato != null ? data.objetoContrato : '';
          this.contrato.subTipoContratoId = data.subTipoContratoId != null ? data.subTipoContratoId : 0;
          this.contrato.iD_TipoContratoCHIP = data.iD_TipoContratoCHIP != null ? data.iD_TipoContratoCHIP : 0;
          this.contrato.iD_TipoConceptoGasto = data.iD_TipoConceptoGasto != null ? data.iD_TipoConceptoGasto : 0;

          /**
           * vista detalle suministro
           */
          let fechainic = this.getFormatedDate(data.fechalnicioContrato,'yyyy-MM-dd');
          let fechaFin = this.getFormatedDate(data.fechaFinalContrato, 'yyyy-MM-dd');

          if(moment(fechainic).isBetween('1753-01-01', '9999-12-31')){
            this.contrato.fechalnicioContrato = fechainic;
          } else {
            this.contrato.fechalnicioContrato = null;
          }

          if(moment(fechaFin).isBetween('1753-01-01', '9999-12-31')){
            this.contrato.fechaFinalContrato = fechaFin;
          } else {
            this.contrato.fechaFinalContrato = null;
          }

          this.contrato.iD_ETC = data.iD_ETC != null ? data.iD_ETC : 0;
          this.contrato.iD_ET = data.iD_ET != null ? data.iD_ET : 0;
          this.contrato.estado = data.estado != null ? data.estado : true;
          this.contrato.valorTotalContrato = data.valorTotalContrato != null ? data.valorTotalContrato : 0;
          this.contrato.manejaPAEC = data.manejaPAEC != null ? this.stringToBoolean(data.manejaPAEC.toString()) : false;
          this.contrato.iD_TipoModeloOperacion = data.iD_TipoModeloOperacion != null ? data.iD_TipoModeloOperacion : 0;
          this.contrato.conAnticipo = data.conAnticipo != null ? data.conAnticipo : false;
          this.contrato.nombreArchivo = data.nombreArchivo != null ? data.nombreArchivo : '';
          this.contrato.archivo = data.nombreArchivo != null ? data.nombreArchivo : '';

          this.contratoForm = true;

          this.get_ProcesoContractual(this.contrato.id);
          this.get_DetalleSumisnitro(this.contrato.id);
          this.get_AnticiposContrato(this.contrato.id);
          this.get_ComprasLocales(this.contrato.id);
          this.get_SedesContratoModeloOperacion();
          this.validarRubrosContrato();
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  get_ProcesoContractual(idContrato: number) {
    this._contratosApiService.getProcesoContractual(idContrato)
    .subscribe(response => {
      if(response.success) {
        let data: any = response.result.length>0?response.result.shift():{};

        this.itemDetalleProcesoContrato.id = data.id!=null? data.id:0;
        this.itemDetalleProcesoContrato.iD_Contrato = idContrato;
        this.itemDetalleProcesoContrato.iD_TipoContratacion = data.iD_TipoContratacion!=null? data.iD_TipoContratacion:0;
        this.itemDetalleProcesoContrato.iD_PlataformaContrato = data.iD_PlataformaContrato!=null? data.iD_PlataformaContrato:0;
        this.itemDetalleProcesoContrato.publicadorSECOP = data.publicadorSECOP!=null? data.publicadorSECOP:false;
        this.itemDetalleProcesoContrato.numeroProcesoRegistradoSECOP = data.numeroProcesoRegistradoSECOP!=null? data.numeroProcesoRegistradoSECOP:'';
        this.itemDetalleProcesoContrato.linkContratoSECOP = data.linkContratoSECOP!=null? data.linkContratoSECOP:'';
        this.itemDetalleProcesoContrato.fechaAdjudicacion = data.fechaAdjudicacion!=null? new Date(data.fechaAdjudicacion):'';
        this.itemDetalleProcesoContrato.fechaSuscripcion = data.fechaSuscripcion!=null? new Date(data.fechaSuscripcion):'';
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_DetalleSumisnitro(idContrato: number) {
    if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica) {
        this._contratosApiService.get_SuministroDetalle(idContrato)
        .subscribe(response => {
          if(response.success) {
            let data: any = response.result.length>0?response.result.shift():{};
            this.suministros.id = data.id!=null? data.id:0;
            this.suministros.iD_Contrato= idContrato;
            this.suministros.NumeroDiasSuministro= data.numeroDiasSuministro!=null? data.numeroDiasSuministro:0;
            this.suministros.TotalComplementosContratadas= data.totalComplementosContratadas!=null? data.totalComplementosContratadas:0;
            this.suministros.CostoUnitarioEnsambleOperacion= data.costoUnitarioEnsambleOperacion!=null? data.costoUnitarioEnsambleOperacion:0;

            this.valorTotalSuministros = this.suministros.NumeroDiasSuministro * this.suministros.TotalComplementosContratadas * this.suministros.CostoUnitarioEnsambleOperacion;
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
    }
    else
    {
      this._contratosApiService.get_AllMateriPrima(idContrato)
      .subscribe(response => {
        if(response.success) {
          let data: any = response.result.length>0?response.result.shift():{};
          this.suministros.iD_Contrato= idContrato;
          this.suministros.NumeroDiasSuministro= data.diasSuministro!=null? data.diasSuministro:0;
          this.suministros.TotalComplementosContratadas= 0;
          this.suministros.CostoUnitarioEnsambleOperacion= 0;

          this.valorTotalSuministros = 0;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });

    }
  }

  get_AnticiposContrato(idContrato: number) {
    this._contratosApiService.get_AnticiposContratos(idContrato)
    .subscribe(response => {
      if(response.success) {
        let data: any = response.result.length>0?response.result.shift():{};
        this.anticipoContrato.id = data.id!=null? data.id:0;
        this.anticipoContrato.iD_Contrato = idContrato;
        this.anticipoContrato.iD_tipoperiodicidad = data.iD_tipoperiodicidad!=null? data.iD_tipoperiodicidad:0;
        this.anticipoContrato.valorAnticipo = data.valorAnticipo!=null? data.valorAnticipo:0;
        this.anticipoContrato.porcentajeAnticipo = data.porcentajeAnticipo!=null? data.porcentajeAnticipo:0;
        this.anticipoContrato.tipoPeriodicidadld = data.tipoPeriodicidadld!=null? data.tipoPeriodicidadld:0;
        this.anticipoContrato.numeroPagos = data.numeroPagos!=null? data.numeroPagos:0;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_ComprasLocales(idContrato: number) {
    this._contratosApiService.get_ContratosModificacionPolizasCompraLocalesContrato(idContrato)
    .subscribe(response => {
      if(response.success) {
        let data: any = response.result.length>0?response.result.shift():{};

        this.comprasLocales.id = data.id!=null? data.id:0;
        this.comprasLocales.iD_contrato = idContrato;
        this.comprasLocales.iD_TipoReglaCompraLocal= data.iD_TipoReglaCompraLocal!=null? data.iD_TipoReglaCompraLocal:0;
        this.comprasLocales.iD_TipoCriterioEvaluacion= data.iD_TipoCriterioEvaluacion!=null? data.iD_TipoCriterioEvaluacion:0;
        this.comprasLocales.iD_TipoPeriodicidad= data.iD_TipoPeriodicidad!=null? data.iD_TipoPeriodicidad:0;
        this.comprasLocales.porcentajeMinimo= data.porcentajeMinimo!=null? data.porcentajeMinimo:0;
        this.comprasLocales.numeroEmpresasMinimo= data.numeroEmpresasMinimo!=null? data.numeroEmpresasMinimo:0;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  materiaPrima(disabled: boolean) {
    this.btnMateriaPrimaDisab = disabled;
  }

  obtenerValorTotalMateriaPrima(valorTotalMateriaPrima: number): void {
    this.valorTotalProductosMateriaPrima = valorTotalMateriaPrima;
  }

  calcularValorTotalMateriaPrimaDiasSuministro() {
    this.valorTotalMateriaPrimaDiasSuministro = this.valorTotalProductosMateriaPrima * this.suministros.NumeroDiasSuministro;
  }

  ActualizarDiasMateriaprima(idContrato: number) {
    this._contratosApiService.get_AllMateriPrima(idContrato)
    .subscribe(response => {
      if(response.success){
         response.result.forEach( result => {
          result.diasSuministro =this.suministros.NumeroDiasSuministro;
          result.iD_Contrato =idContrato;
          this._contratosApiService.post_UpdateMateriPrima(result).subscribe({
            next: response => {
              if(!response.success){
                this._messageService.showError('ERROR: ' + response.error, 'top center');
                return;

                  }
                }
              })
         }
       )
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }


  poliza(disabled: boolean) {
    this.btnPolizasDisab = disabled;
  }

  sedesBenef(disabled: boolean) {
    this.btnSedesBenefDisab = disabled;
  }

  muestra(data: any){
  }

  actualizarGranTotal(data: any) {
    this.dataTotalGeneralContratado.diferencia = data.diferencia;
    this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = data.diferenciaFuentesFinanciacion;
    this.dataTotalGeneralContratado.totalCRP = data.totalCRP;
    this.dataTotalGeneralContratado.totalFuentesFinanciacion = data.totalFuentesFinanciacion;
    this.dataTotalGeneralContratado.valorTotal = data.valorTotal;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;
  }

  onSubmitEvent(event){
    this.onSubmit(event);
  }

  onSubmit(form: string): void {
    switch(form.toUpperCase().toString()) {
      case 'CONTRATO':
        if(this.contrato.id === 0) {
          this.crearContrato();
        } else {
          this.actualizarContrato();
        }
        break;

      case 'PROCESO-CONTRACTUAL':
        if(this.itemDetalleProcesoContrato.id === 0) {
          this.crearProcesoContractual();
        } else {
          this.actualizarProcesoContractual();
        }
        break;

      case 'DETALLE-SUMINISTRO':
        if(moment(this.contrato.fechaFinalContrato).isBefore(this.contrato.fechalnicioContrato)) {
          this._messageService.showWarning('La fecha inicial del contrato debe ser inferior a la fecha de finalización', 'top center');
          return;
        }

        if(this.suministros.NumeroDiasSuministro <= 0 || this.suministros.NumeroDiasSuministro > 180){
          this._messageService.showWarning('El número de días de suministro no esta dentro del rango (1 y 180)', 'top center');
          return;
        }

        if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica) {
          if(this.suministros.TotalComplementosContratadas <= 0){
            this._messageService.showWarning('El total de raciones diarias contratadas para ensamble y/o operación logística debe ser superior a cero(0)', 'top center');
            return;
          }

          if(this.suministros.CostoUnitarioEnsambleOperacion <= 0){
            this._messageService.showWarning('El costo unitario de ensamble y/o operación logística por ración debe ser superior a cero(0)', 'top center');
            return;
          }

          if(this.tieneRubros && this.valTotalRubros + this.valorTotalSuministros != this.contrato.valorTotalContrato){
            this._messageService.showWarning("El valor total del contrato no coincide con la suma del valor total de los suministros y los rubros.", 'top center');
            return;
          }

          if(!this.tieneRubros && this.valorTotalSuministros != this.contrato.valorTotalContrato){
            this._messageService.showWarning("El valor total del contrato no coincide el de los suministros." +
            " Agregue rubros adicionales de ser necesario o verifique los valores.", 'top center');
            return;
          }
        }

        if(this.contrato.id != 0) { this.actualizarContrato();  }

        if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica) {
            if(this.suministros.id === 0) { this.crearSuministro(); } else { this.actualizarSuministro()};
            this.get_ContratosSedesJoranada();
        }
        else
        {
          this.resultQuery2 = true;
          this.ActualizarDiasMateriaprima(this.contrato.id)
          this.avanzar();
        }
        this.get_TotalGeneralContratado(this.contrato.id);

        break;

      case 'CARACTERISTICAS-FINANCIERAS':
        if(this.contrato.valorTotalContrato != this.dataTotalGeneralContratado.valorTotal) {
          this._messageService.showWarning('El valor del contrato no coincide con el costo total calculado por el sistema', 'top center');
          return;
        }

        if(this.contrato.valorTotalContrato <= 0) {
          this._messageService.showWarning('El valor del contrato debe ser mayor a cero(0)', 'top center');
          return;
        }

        if(this.contrato.id != 0)  {
          this.actualizarContrato();
        }

        if(this.anticipoContrato.id === 0) {
          this.createCaracteristicasFinancieras();
        } else {
          this.updateCaracteristicasFinancieras();
        }
        this.get_TotalGeneralContratado(this.contrato.id);
        break;

      case 'POLIZAS':
        this.avanzar();
        break;

      case 'COMPRAS-LOCALES':
        if(this.comprasLocales.porcentajeMinimo <= 0) {
          this._messageService.showWarning('El porcentaje mínimo de compras locales debe ser mayor a cero(0)', 'top center');
          return;
        }

        if(this.comprasLocales.numeroEmpresasMinimo <= 0) {
          this._messageService.showWarning('El número mínimo de empresas locales para compra debe ser mayor a cero(0)', 'top center');
          return;
        }

        if(this.comprasLocales.id === 0) {
          this.createCompraLocal();
        } else {
          this.updateCompraLocal();
        }
        break;

      case 'SEDES-BENEFICIARIAS':
        if(this.dataSedesBen.length == 0){
          this._messageService.showWarning('Debe agregar al menos una sede beneficiaria.', 'top center');
          return;
        }

        if(this.suministros.TotalComplementosContratadas!=this.SumRacionesSedesBeneficSinJornada){
          this._messageService.showWarning('Hay diferencia entre total raciones diarias contratadas y total raciones diarias necesarias para cubrir las sedes beneficiarias', 'top center');
          return;
        }

        this.get_TotalGeneralContratado(this.contrato.id);
        this.avanzar();
        break;

      case 'FUENTE-FINANCIERA':
        if(this.dataTotalGeneralContratado.totalCRP != this.dataTotalGeneralContratado.totalFuentesFinanciacion){
          this._messageService.showWarning('La suma total de los crp debe ser igual a la suma total de las fuentes de financiación.', 'top center');
          return;
        } else if(this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.contrato.valorTotalContrato) {
          this._messageService.showWarning('La suma total de las fuentes de financiación debe ser igual al valor total del contrato.', 'top center');
          return;
        }
        if(!this.contrato.nombreArchivo || this.contrato.nombreArchivo=='') {
          this.showPDFValidation = true;
          return;
        }

        this.contrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
        this.actualizarContrato();
        break;
    }

  }

  avanzar() {
    if(this.contratoForm) {
      if(this.resultQuery1) {
        if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica){
          this.headerText2 = 'Registro único de Contratos - Logística';
        }
        if(this.contrato.subTipoContratoId == this.proveerMateriaPrima){
          this.headerText2 = 'Registro único de Contratos - Materia prima';
        }
        this.contratoForm = false;
        this.procesoContractualForm = true;
        this.resetQuery();
      }
      return;
    }

    if(this.procesoContractualForm) {
      if(this.resultQuery1) {
        this.procesoContractualForm = false;
        this.detalleSuministroForm = true;
        this.resetQuery();
      }
      return;
    }

    if(this.contrato.subTipoContratoId == this.proveerMateriaPrima) {
      if(this.detalleSuministroForm) {
        if(this.resultQuery1 && this.resultQuery2) {
          this.detalleSuministroForm = false;
          this.infPresupuestalForm = true;
          this.resetQuery();
        }
        return;
      }
    } else if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica){

      if(this.detalleSuministroForm) {
        if(this.resultQuery1 && this.resultQuery2) {
          this.detalleSuministroForm = false;
          this.sedesBeneficiariasForm = true;
          this.resetQuery();
        }
        return;
      }

      if(this.sedesBeneficiariasForm) {
        this.sedesBeneficiariasForm = false;
        this.infPresupuestalForm = true;
        this.resetQuery();
        return;
      }
    }

    if(this.caracteristicasFinancierasForm) {
      if(this.resultQuery1 && this.resultQuery2) {
        this.caracteristicasFinancierasForm = false;
        this.infPresupuestalForm = true;
        this.resetQuery();
      }
      return;
    }

    if(this.polizasForm) {
      this.polizasForm = false;
      this.comprasLocalesForm = true;
      this.resetQuery();
      return;
    }

    if(this.comprasLocalesForm) {
      if(this.resultQuery1) {
        this.comprasLocalesForm = false;
        this.infPresupuestalForm = true;
        this.resetQuery();
      }
      return;
    }

    if(this.infPresupuestalForm) {
      if(this.resultQuery1) {
        this.resetQuery();
        this.mostrarMensajeFinalizacion();
      }
      return;
    }

  }

  resetQuery() {
    this.resultQuery1 = false;
    this.resultQuery2 = false;
    this.resultQuery3 = false;
  }

  regresarEvent(event){
    this.regresar();
  }
  regresar() {
    if(this.procesoContractualForm) {
      this.contratoForm = true;
      this.contrato.subTipoContratoId=0;
      this.procesoContractualForm = false;
    }

    if(this.detalleSuministroForm) {
      this.procesoContractualForm = true;
      this.detalleSuministroForm = false;
    }

    if(this.contrato.subTipoContratoId == this.proveerMateriaPrima) {
      if(this.sedesBeneficiariasForm) {
        this.detalleSuministroForm = true;
        this.sedesBeneficiariasForm = false;
      }
    } else if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica) {
      if(this.sedesBeneficiariasForm) {
        this.detalleSuministroForm = true;
        this.sedesBeneficiariasForm = false;
      }

      if(this.caracteristicasFinancierasForm) {
        this.sedesBeneficiariasForm = true;
        this.caracteristicasFinancierasForm = false;
      }
    }

    if(this.polizasForm) {
      this.caracteristicasFinancierasForm = true;
      this.polizasForm = false;
    }

    if(this.comprasLocalesForm){
      this.polizasForm = true;
      this.comprasLocalesForm = false;
    }

    if(this.infPresupuestalForm){
      if(this.contrato.subTipoContratoId == this.proveerMateriaPrima) {
        this.detalleSuministroForm = true;
        this.infPresupuestalForm = false;
      }
      else {
        this.sedesBeneficiariasForm = true;
        this.infPresupuestalForm = false;
    }
    }
  }

  finalizarEvent(event){
    this.finalizar();
  }

  finalizar(){
    if(this.contrato.id != 0) {
      this.actualizarContrato(true);
    }

    if(this.suministros.id === 0) {
      this.crearSuministro();
    } else {
      this.actualizarSuministro();
    }
  }

  mostrarMensajeFinalizacion() {
    this._messageService.showInfo('Se guardo el contrato.', 'top center');
    this._router.navigate(['/registro-contratos']);
  }

  /* CONTRATO */
  crearContrato()  {
    this._contratosApiService.CreateContrato(this.contrato).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        if(response.result == 0){
          this._messageService.showError('ERROR: El numero de contrato ya existe ' , 'top center');
          return;
        }

        this.contrato.id = response.result;
        this.itemDetalleProcesoContrato.iD_Contrato = response.result;
        this.anticipoContrato.iD_Contrato = response.result;
        this.comprasLocales.iD_contrato = response.result;
        this.suministros.iD_Contrato = response.result;
        this.resultQuery1 = true;
        this.avanzar();
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  actualizarContrato(finish?: boolean) {
    this.contrato.idOperador = this.contrato.iD_Operador;
    this.contrato.idEtc =this.contrato.iD_ETC;
    this.contrato.idContrato =this.contrato.id

    this._contratosApiService.putContrato(this.contrato).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        if(finish) {
          this.mostrarMensajeFinalizacion();
        } else {
          this.resultQuery1 = true;
          this.avanzar();
        }
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  /* END CONTRATO */

  /* PROCESO CONTRACTUAL */

  crearProcesoContractual() {
    this._contratosApiService.postProcesoContractual(this.itemDetalleProcesoContrato)
    .subscribe(response => {
      if(response.success) {
        this.itemDetalleProcesoContrato.id = response.result;
        this.resultQuery1 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  actualizarProcesoContractual() {
    this._contratosApiService.putProcesoContractual(this.itemDetalleProcesoContrato)
    .subscribe(response => {
      if(response.success) {
        this.resultQuery1 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  /* END PROCESO CONTRACTUAL */

  /* SUMINISTROS */

  crearSuministro() {
    this._contratosApiService.post_SuministroDetalle(this.suministros)
    .subscribe(response => {
      if(response.success) {
        this.suministros.id = response.result;
        this.resultQuery2 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  actualizarSuministro() {
    this._contratosApiService.put_SuministroDetalle(this.suministros)
    .subscribe(response => {
      if(response.success) {
        this.resultQuery2 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  /* END SUMINSITROS */

  /* CARACTERISTICA FINANCIERA */

  createCaracteristicasFinancieras() {
    this._contratosApiService.postCaracteristicaFinanciera(this.anticipoContrato)
    .subscribe(response => {
      if(response.success) {
        this.anticipoContrato.id = response.result;
        this.resultQuery2 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  updateCaracteristicasFinancieras() {
    this._contratosApiService.putCaracteristicaFinanciera(this.anticipoContrato)
    .subscribe(response => {
      if(response.success) {
        this.resultQuery2 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  /* END CARACTERISTICA FINANCIERA */


  /* COMPRAS LOCALES */

  createCompraLocal() {
    this._contratosApiService.post_AddContratosModificacionPolizasCompraLocalesContrato(this.comprasLocales)
    .subscribe(response => {
      if(response.success) {
        this.comprasLocales.id = response.result;
        this.resultQuery1 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  updateCompraLocal() {
    this._contratosApiService.put_UpdateContratosModificacionPolizasCompraLocalesContrato(this.comprasLocales)
    .subscribe(response => {
      if(response.success) {
        this.resultQuery1 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  /* END COMPRAS LOCALES */

  /* SEDES BENEFICIARIAS */

  changeItem(item: any, name: string, value: any){
    item[name] = value;
  }

  changeItemUtil(name: string, value: any){
    this.itemUtil[name] = value;
    if(name == 'seleccionTodo'){
      this.dataSedesNoBen.map(function(item: any){
        item.seleccion = value;
        return item;
      });
    }
    else if(name == 'seleccionTodoBen'){
      this.dataSedesBen.map(function(item: any){
        item.seleccion = value;
        return item;
      });
    }
  }

  agregarSedes(){
    let data = this.dataSedesNoBen.filter(item => item.seleccion);

    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        data[i].id = 0;
        data[i].iD_Contrato = this.contrato.id;
        data[i].numeroContrato = this.contrato.numeroContrato;
        data[i].iD_TipoModeloOperacion = this.contrato.iD_TipoModeloOperacion;
      }

      this._contratosApiService.agregarSedesBeneficiarias(data)
      .subscribe(response => {
        if(response.success){
          this.get_ContratosSedesJoranada();
          this.get_SedesContratoModeloOperacion();
        }
        else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
    }
    else{ this._messageService.showWarning("Debe seleccionar al menos una sede.", 'top center');  }
  }


  get_ContratosSedesJoranada(){
    this.dataSedesNoBen = [];
    this._contratosApiService.get_ContratosSedesJoranada(this.contrato.iD_ETC, this.contrato.iD_TipoModeloOperacion)
      .subscribe(response => {
        if(response.success){
          this.dataSedesNoBen = response.result;
          if(response.result.length == 0){ this.dataSedesNoBen = [{}]; }
          this.ordenarTabla();
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_SedesContratoModeloOperacion(){
    this.dataSedesBen = [];

    this._contratosApiService.get_SedesContratoModeloOperacion(this.contrato.id, this.contrato.iD_TipoModeloOperacion)
    .subscribe(response => {
      if(response.success){
        this.dataSedesBen = response.result;
        this.sedesBenef(this.dataSedesBen.length == 0 ? true : false);
        if(response.result.length == 0){
          this.dataSedesBen = [];
          this.sedesBenef( true );
        }
        this.get_SumRacionesSedesBeneficSinJornada();
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  eliminarSedes(){
    let data = this.dataSedesBen.filter(function(item: any){
      return item.seleccion;
    });

    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        data[i].borrado = true;
      }

      this._contratosApiService.eliminarSedesBeneficiarias(data)
      .subscribe(response => {
        if(response.success){
          this.get_ContratosSedesJoranada();
          this.get_SedesContratoModeloOperacion();
        }
        else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
    }
    else{ this._messageService.showWarning("Debe seleccionar al menos una sede.", 'top center'); }
  }

  get_ContratosSumRacionesContratadasDiarias(iD_TipoModeloOperacion: number) {

    this._contratosApiService.get_ContratosSumRacionesContratadasDiarias(this.contrato.id, iD_TipoModeloOperacion, 0)
    .subscribe(response => {

      if(response.success) {
        /* if(iD_TipoModeloOperacion != this.modeloOperacion.PAEC.id){
          this.dataSumRacionesDiarias = response.result;
        } else{
          this.dataSumRacionesDiariasPAEC = response.result;
        } */

      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_SumRacionesSedesBeneficSinJornada() {
    this._contratosApiService.get_SumRacionesSedesBeneficSinJornada(this.contrato.id)
    .subscribe(response =>{
      if(response.success) {
        this.SumRacionesSedesBeneficSinJornada = response.result.length == 0 ? 0 : response.result.shift().totalMatriculas;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  /* END SEDES BENEFICIARIAS */

  disabledSubPuntos(value: any, name: string, valBoolean: boolean) {
    switch(name){
      case 'conAnticipo':
        this.contrato.conAnticipo = valBoolean;
        if(!valBoolean){
          this.anticipoContrato.valorAnticipo = 0;
          this.contrato.valorTotalContrato = 0;
          this.anticipoContrato.porcentajeAnticipo = 0;
        }
        break;
    }
  }

  changeValorAnticipo(value: any) {
    this.anticipoContrato.valorAnticipo = this.contrato.valorTotalContrato * (this.anticipoContrato.porcentajeAnticipo/100);
  }

  changeItemDetalleProcesoContrato(name: string, value: any){
    this.itemDetalleProcesoContrato[name] = value;

    if(!value) {
      this.itemDetalleProcesoContrato.iD_PlataformaContrato = 0;
      this.itemDetalleProcesoContrato.numeroProcesoRegistradoSECOP = '';
      this.itemDetalleProcesoContrato.linkContratoSECOP = '';
    }
  }

  changeItemContrato(name: string, value: any) {
    this.contrato[name] = value;
  }

  get_TotalGeneralContratado(id: number) {
    this._contratosApiService.getTotalGeneralContratado(id)
    .subscribe(response => {
      if(response.success) {
        let totalgeneral: any[] = response.result;
        totalgeneral.forEach(element => {
          this.dataTotalGeneralContratado.diferencia = element.diferencia;
          this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = element.diferenciaFuentesFinanciacion;
          this.dataTotalGeneralContratado.totalCRP = element.totalCRP;
          this.dataTotalGeneralContratado.totalFuentesFinanciacion = element.totalFuentesFinanciacion;
          this.dataTotalGeneralContratado.valorTotal = element.valorTotal;
          this.dataTotalGeneralContratado.valorTotalPriorizacion = element.valorTotalPriorizacion;
        });
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_Operadores() {
    this._contratosApiService.Get_AllOperadores()
    .subscribe(response => {
      if(response.success) {
        this.listOperadores = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_ContratoChip() {
    this._contratosApiService.Get_AllContratoChip()
    .subscribe(response => {
      if(response.success) {
        this.listContratoChip = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_ModalidaContratacionChip() {
    this._contratosApiService.GetModalidadContratacionChip()
    .subscribe(response => {
      if(response.success) {
        this.listModalidaContratacionChip = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_PerioricidadAmortizacion() {
    this._contratosApiService.GetAllPerioricidadAmortizacion()
    .subscribe(response => {
      if(response.success) {
        this.listPerioricidadAmortizacion = response.result;
        this.listPeriodicidadEvaluacion = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_ConceptosGasto(){
    this._contratosApiService.get_ConceptosGasto()
    .subscribe(response => {
      if(response.success){
        this.listConceptoGasto = response.result;
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  get_SubtiposContratacion(){
    this._contratosApiService.get_SubtiposContratacion(2)
    .subscribe(response => {
      if(response.success){
        this.listSubtiposContratacion = response.result;
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  get_ListadoTipoReglaComprasLocales() {
    this._masterDataAPI.get_ListadoTipoReglaComprasLocales()
    .subscribe(response => {
      if(response.success) {
        this.listCriterioEmpleadoCuota = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_ListadoTiposCriterioEvaluacion() {
    this._masterDataAPI.get_ListadoTiposCriterioEvaluacion()
    .subscribe(response => {
      if(response.success) {
        this.listCriterioEvaluacion = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_Divipolas() {
    this._masterDataAPI.get_Divipolas()
    .subscribe(response => {
      if(response.success) {
        this.listMunicios = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  soloNumeros(e: any) {
    var key = window.event ? e.which : e.keyCode;
     if (key < 48 || key > 57) {
         e.preventDefault();
     }
  }

  /**
  * uploadPDF('nameinput', item, 'pahtArchivoCDP', '')
  * uploadPDF('nameinput', item, 'pathArchivoCRP', '')
  */

   uploadPDF(nameElm: string, item: any, itemName: string, itemVal: string){
    const fileUpload = document.getElementById(nameElm) as HTMLInputElement;
    const MAXIMO_BYTES = 10000000;

    fileUpload.onchange = () => {
      if(fileUpload.files?.length && fileUpload.files.length > 0){
        const file = fileUpload.files[0];
        item[itemName] = file.name;
        if(file.type == 'application/pdf'){
          if(file.size <= MAXIMO_BYTES){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              item[itemName] = file.name;
              //item[itemVal]= reader.result?.toString().replace('data:application/pdf;base64,', '');
              fileUpload.value = '';
            };
          }
          else{
            fileUpload.value = '';
            this._messageService.showWarning("El tamaño del archivo supera los 10MB", 'top center');
          }
        }
        else{
          fileUpload.value = '';
          this._messageService.showWarning("El formato del archivo no es un PDF", 'top center');
        }

      }
    }
    fileUpload.click();
  }

  /**
  * abrirPDF(modalPDF, cdp, 'pahtArchivoCDP')
  * abrirPDF(modalPDF, crp, 'pathArchivoCRP')
  */

  abrirPDF(contenido: any, item: any, nameItem: string){

    if(item[nameItem] != null){
      this.srcPDF = "data:application/pdf;base64," + item[nameItem];
      this._modalService.open(contenido, {size: 'xl'});
    }
  }

  dismissAllModal(){
    this._modalService.dismissAll();
  }

  stringToBoolean(valString: string) {
    switch (valString.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(valString);
    }
  }

  myTabFocusChange(selectedTabIndex: number) {
    this.selectedTabIndex = selectedTabIndex;
  }

  obtenerClaseEstadoDiligenciamiento(): string {
    return this.suministros.TotalComplementosContratadas == this.SumRacionesSedesBeneficSinJornada ?
      'completo' :
      'incompleto';
  }

  calcSumValTotal(name: string, value: any){
    this.suministros[name] = value;
    if(this.contrato.subTipoContratoId == this.proveerOperacionLogistica) {
      if(this.suministros.TotalComplementosContratadas != 0 &&
        this.suministros.NumeroDiasSuministro != 0 &&
        this.suministros.CostoUnitarioEnsambleOperacion != 0){
          let valCalculo = this.suministros.TotalComplementosContratadas * this.suministros.NumeroDiasSuministro * this.suministros.CostoUnitarioEnsambleOperacion;
          if(valCalculo >= this.contrato.valorTotalContrato && this.tieneRubros){
            this._messageService.showError("Tenga en cuenta que este cambio afecta el valor del contrato y por lo" +
              " tanto el calculo de los rubros adicionales existentes. Elimine los rubros para hacer este cambio.", 'top center');
            this.suministros[name] = this.suministros[name];
            return;
          }
          this.valorTotalSuministros = valCalculo;
        }else{
          this.showValidation = true;
          return;
        }
     }
  }

  disableRubrosAdd(value: any, name: string, valBoolean: boolean) {
    if (!valBoolean && this.tieneRubros) {
       this._messageService.showWarning("Debe eliminar los Rubros Adcionales antes de realizar esta operación.", 'top center');
    }
    else {
       if (valBoolean) {

       }
       this[name] = valBoolean;
    }
 }

 validaRespuestaRubros(valRubros: any) {
  this.valTotalRubros = valRubros;
  this.validarRubrosContrato();
}

 validarRubrosContrato() {
  if (this.valorTotalSuministros < this.contrato.valorTotalContrato) {
     this._contratosApiService.Get_RubrosAdicionales(this.contrato.id).subscribe(response => {
        if (response.success && response.result.length > 0) {
           this.rubroAdd = true;
           this.tieneRubros = true;
        }
        else if(response.success && response.result.length == 0){
           this.tieneRubros = false;
        }
     });
    }
  }

  ordenarTabla() {
    tableSort();
  }
}
