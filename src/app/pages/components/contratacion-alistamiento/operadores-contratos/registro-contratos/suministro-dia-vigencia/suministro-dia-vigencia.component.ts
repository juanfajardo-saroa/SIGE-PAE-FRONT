import { Component, OnInit,OnDestroy } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { AsignacionRecursosApiService } from 'src/app/shared/services/asignacion-recursos-api.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, ModeloOperacion } from 'src/app/shared/model/core/constante.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';
const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
  selector: 'app-suministro-dia-vigencia',
  /* providers: [
    MasterDataApiService,
    AsignacionRecursosApiService,
    ContratosApiService
  ], */
  templateUrl: './suministro-dia-vigencia.component.html',
  styleUrls: ['./suministro-dia-vigencia.component.scss']
})
export class SuministroDiaVigenciaComponent implements OnInit,OnDestroy {

  private sub: any;
  private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  private subs = new Subscription()
  public modeloOperacion: any = ModeloOperacion;
  public loadingVisible: boolean = false;
  public modoEdit: boolean = false;
  public rubroAdd: boolean = false;
  public tieneRubros: boolean = false;

  public form0Visible: boolean = true;
  public form1Visible: boolean = false;
  public form2Visible: boolean = false;
  public form31Visible: boolean = false;
  public form4Visible: boolean = false;
  public form7Visible: boolean = false;

  public listModelosOperacion: any[] = [
    { id: ModeloOperacion.MAEM.id, nombre: 'Modelo de Alimentación Escolar Mayoritario (MAEM)' },
    { id: ModeloOperacion.MAIP.id, nombre: 'PAE para Pueblos Indígenas (PAEPI)' }
  ];

  public idsSubTiposContratacionPermitidos: number[] = [1, 2];

  public modelosOperacionActivos = [];
  public listContratosCHIP: any = [];
  public listConceptoGasto: any = [];
  public listOperadores: any = [];
  public listSubtiposContratacion: any = [];
  public listTiposContratacion: any = [];
  public listTiposPlataformaContratacion: any = [];
  public listPerioricidadAmortizacion: any = [];
  public listTipoReglaComprasLocales: any = [];
  public listTiposCriterioEvaluacion: any = [];
  public listDivipolas: any = [];
  public dataSumRacionesPreciosMAEM: any = [];
  public dataSumRacionesPreciosPAEPI: any = [];
  public dataSumRacionesValorTotalMAEM: any = [];
  public dataSumRacionesValorTotalPAEPI: any = [];
  public dataSumRacionesPreciosPAEC: any = [];
  public dataSumRacionesValorTotalPAEC: any = [];

  public digitoVerificacioOperador = '';
  public VACIO: string = '';
  public selectedTabIndex: number = 0;
  public valTotalRubros: number = 0;
  public VALOR_CERO: number = 0;
  public VALOR_FALSE: boolean = false;
  public ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR: number = 0;
  public ESTADO_DILIGENCIAMIENTO_INCOMPLETO: number = 1;
  public ESTADO_DILIGENCIAMIENTO_COMPLETO: number = 2;
  public CATEGORIA_SUMINISTRO_COMPLEMENTOS_AL_DIA: number = 1;
  public CATEGORIA_SUMINISTRO_COMPLEMENTOS_DURANTE_LA_VIGENCIA_DEL_CONTRATO: number = 2;


  public listaNumerosPagoAmortizacion: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];

  public dataPestanas: any = [
    { id: 1, descripcion: 'Contratos', active: true }
  ];

  public editRac: boolean = false;
  public editRacPaec: boolean = false;
  public editRacPrecio: boolean = false;
  public editRacPrecioPaec: boolean = false;
  public ColumnMode = ColumnMode;
  public colsSedesBeneficiarias: any = [
    { name: '' },
    { name: 'Municipio' },
    { name: 'Institucón Educativa' },
    { name: 'Sede Educativa' },
    { name: 'Jornada' }
  ];
  public colsJornadas: any = [
    'Jornada', 'Almuerzo', 'Complemento'
  ]

  public dataDetalleSumRacionesMAEM: any = [];
  public dataDetalleSumRacionesPAEPI: any = [];
  public dataTotalRacionesMAEM: any = [];
  public dataTotalRacionesPAEPI: any = [];

  public dataDetalleSumRacionesPAEC: any = [];
  public dataTotalRacionesPAEC: any = [];

  public dataSedesNoBenMAEM: any = [];
  public dataSedesNoBenPAEPI: any = [];
  public dataSedesBenMAEM: any = [];
  public dataSedesBenPAEPI: any = [];
  public dataSedesNoBenPAEC: any = [];
  public dataSedesBenPAEC: any = [];

  public sumContratosValorTotalMAEM: number = 0;
  public sumContratosValorTotalPAEPI: number = 0;

  public dataSumRacionesDiariasMAEM: any = [];
  public dataSumRacionesDiariasPAEPI: any = [];
  public dataSumRacionesContratadasMAEM: any = [];
  public dataSumRacionesContratadasPAEPI: any = [];

  public dataSumRacionesDiariasPAEC: any = [];
  public dataSumRacionesContratadasPAEC: any = [];

  public sedesNivelEducativoMAEM: any = [];
  public sedesNivelEducativoPAEPI: any = [];

  public sedesZonaMAEM: any = [];
  public sedesZonaPAEPI: any = [];

  public fileName: string = '';
  public srcPDF: string = '';


  public iD_ZonaMAEM: number = 0;
  public iD_NivelEducativoMAEM: number = 0;

  public iD_ZonaPAEPI: number = 0;
  public iD_NivelEducativoPAEPI: number = 0;
  public showValidation0 : boolean = false;
  public showValidation1 : boolean = false;
  public showValidation2 : boolean = false;
  public showValidation3: boolean = false;
  public showValidationTable: boolean = false;
  public showValidationTotal: boolean = false;



  public itemContrato: any = {
    id: 0,
    iD_Vigencia: this.itemVigencia?.id,
    iD_ETC: 0,
    iD_ET: 0,
    numeroContrato: 0,
    iD_Operador: 0,
    objetoContrato: '',
    tipoContratoId: 0,
    subTipoContratoId: 0,
    iD_TipoCategoriaContrato: 0,
    iD_TipoContratoCHIP: 0,
    iD_TipoConceptoGasto: 0,
    fechalnicioContrato_Format: null,
    fechaFinalContrato_Format: null,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    manejaPaec: false,
    iD_TipoModeloOperacion: [],
    valorTotalContrato: 0,
    noMeses: 0,
    noMesesPaec: 0,

    conAnticipo: false,
    archivoContrato: '',
    nombreArchivoContrato: '',

    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
  }

  public itemDetalleProcesoContrato: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoContratacion: 0,
    iD_PlataformaContrato: 0,
    publicadorSECOP: false,
    numeroProcesoRegistradoSECOP: '',
    linkContratoSECOP: '',
    fechaAdjudicacion_Format: null,
    fechaAdjudicacion: null,
    fechaSuscripcion: null,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  };

  public itemAnticipoContrato: any = {
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

  public itemCompraLocal: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoReglaCompraLocal: 0,
    iD_TipoCriterioEvaluacion: 0,
    iD_TipoPeriodicidad: 0,
    iD_ZonaGeografica: 0,
    porcentajeMinimo: 0,
    numeroEmpresasMinimo: 0,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  }

  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  public dataTotalGeneralContratadoPAEPI: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  public itemUtil: any = {
    col_CSS_Rac: 'col-md-10',
    seleccionTodo: false,
    seleccionTodoBen: false,
  }

  public contratoModeloMAEM: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModeloOperacion: 0,
    manejaPreciosporzona: false,
    manejaPreciosporNivelEducativo: false,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  };

  public contratoModeloPAEPI: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModeloOperacion: 0,
    manejaPreciosporzona: false,
    manejaPreciosporNivelEducativo: false,
    estado: true,
    auditoria: LocalStorage.getAuditoria('')
  };

  public columnsInfoPresupuestal: any = [
    'Nº CDP', 'Fecha CDP', 'Valor CDP', 'Archivo CDP', 'CRPs asociados', 'Nº CRP', 'Fecha CRP', 'Valor CRP', 'Archivo CRP'
  ];

  constructor(
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
    private _masterDataApi: MasterDataApiService,
    private _contratosApi: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.sub = this._route.params.subscribe(params => {
      this.itemContrato.id = +params['idc'];
      this.itemDetalleProcesoContrato.iD_Contrato = +params['idc'];
      this.itemAnticipoContrato.iD_Contrato = +params['idc'];
      this.itemCompraLocal.iD_Contrato = +params['idc'];

      if (this.itemContrato.id > 0) {
        this.modoEdit = true;
      }

      if (this.itemContrato.id == 0) {
        let tipo = +params['tipo'];
        this.itemContrato.tipoContratoId = +params['ids'];
        this.itemContrato.iD_ETC = tipo == 1 ? this.iD_ETC : 0;
        this.itemContrato.iD_ET = +params['val'];
      }
      else {
        this.get_Contrato();
      }

      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });

    this.get_ContratosCHIP();
    this.get_ConceptosGasto();
    this.get_Operadores();
    this.get_SubtiposContratacion();
    this.get_TiposContratacion();
    this.get_TiposPlataformaContratacion();
    this.get_PerioricidadAmortizacion();
    this.get_ListadoTipoReglaComprasLocales();
    this.get_ListadoTiposCriterioEvaluacion();
    this.get_Divipolas();

    this.get_SumRacionesPrecios();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  actualizarGranTotal(data: any) {
    this.dataTotalGeneralContratado.diferencia = data.diferencia;
    this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = data.diferenciaFuentesFinanciacion;
    this.dataTotalGeneralContratado.totalCRP = data.totalCRP;
    this.dataTotalGeneralContratado.totalFuentesFinanciacion = data.totalFuentesFinanciacion;
    this.dataTotalGeneralContratado.valorTotal = data.valorTotal;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;
  }

  get_Contrato() {
    this.loadingVisible = true;

    this._contratosApi.get_SedesContratosHojaContrato(this.itemContrato.id)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          let result = response.result[0];

          let fechaInicialContrato = null;
          let fechaInicialContrato_Format = null;
          if (result.fechalnicioContrato) {
            fechaInicialContrato = moment(result.fechalnicioContrato);
            if (fechaInicialContrato.format('YYYY') > '1900') {
              fechaInicialContrato_Format = {
                year: parseInt(fechaInicialContrato.format('YYYY')),
                month: parseInt(fechaInicialContrato.format('MM')),
                day: parseInt(fechaInicialContrato.format('DD')),
              };

              fechaInicialContrato = fechaInicialContrato.format('YYYY-MM-DD');
            }
            else { fechaInicialContrato = null; }
          }

          let fechaFinalContrato = null;
          let fechaFinalContrato_Format = null;
          if (result.fechaFinalContrato) {
            fechaFinalContrato = moment(result.fechaFinalContrato);
            if (fechaFinalContrato.format('YYYY') >= '1900') {
              fechaFinalContrato_Format = {
                year: parseInt(fechaFinalContrato.format('YYYY')),
                month: parseInt(fechaFinalContrato.format('MM')),
                day: parseInt(fechaFinalContrato.format('DD')),
              };

              fechaFinalContrato = fechaFinalContrato.format('YYYY-MM-DD');
            }
            else { fechaFinalContrato = null; }
          }

          this.itemContrato = {
            id: result.id_Contrato,
            iD_Vigencia: result.iD_Vigencia ? result.iD_Vigencia : this.itemVigencia?.id,
            iD_ETC: result.iD_ETC,
            iD_ET: result.iD_ET,
            numeroContrato: result.numeroContrato,
            iD_Operador: result.id_operador,
            objetoContrato: result.objetoContrato,
            tipoContratoId: result.tipoContratoId,
            subTipoContratoId: result.subTipoContratoId,
            iD_TipoCategoriaContrato: result.iD_TipoCategoriaContrato,
            iD_TipoContratoCHIP: result.iD_TipoContratoCHIP,
            iD_TipoConceptoGasto: result.iD_TipoConceptoGasto,

            fechalnicioContrato_Format: fechaInicialContrato_Format,
            fechaFinalContrato_Format: fechaFinalContrato_Format,
            fechalnicioContrato: fechaInicialContrato,
            fechaFinalContrato: fechaFinalContrato,
            manejaPaec: result.manejaPAEC == 1 ? true : false,
            iD_TipoModeloOperacion: result.iD_TipoModeloOperacion,
            valorTotalContrato: result.valorTotalContrato,
            noMeses: 0,
            noMesesPaec: 0,

            conAnticipo: false,
            archivoContrato: '',
            nombreArchivoContrato: '',

            estado: true,
            auditoria: LocalStorage.getAuditoria(''),
          };
          this.consultarTiposModeloOperacionPorIdContrato(this.itemContrato.id);
          this.itemAnticipoContrato.contratoAnticipo = result.conAnticipo;
          this.get_ComprasLocales(this.itemContrato.id);
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      })
  }

  get_ComprasLocales(idContrato: number) {
    this._contratosApi.get_ContratosModificacionPolizasCompraLocalesContrato(idContrato)
      .subscribe(response => {
        if (response.success) {
          let data: any = response.result.length > 0 ? response.result.shift() : {};

          this.itemCompraLocal.id = data.id != null ? data.id : 0;
          this.itemCompraLocal.iD_contrato = idContrato;
          this.itemCompraLocal.iD_TipoReglaCompraLocal = data.iD_TipoReglaCompraLocal != null ? data.iD_TipoReglaCompraLocal : 0;
          this.itemCompraLocal.iD_TipoCriterioEvaluacion = data.iD_TipoCriterioEvaluacion != null ? data.iD_TipoCriterioEvaluacion : 0;
          this.itemCompraLocal.iD_TipoPeriodicidad = data.iD_TipoPeriodicidad != null ? data.iD_TipoPeriodicidad : 0;
          this.itemCompraLocal.porcentajeMinimo = data.porcentajeMinimo != null ? data.porcentajeMinimo : 0;
          this.itemCompraLocal.numeroEmpresasMinimo = data.numeroEmpresasMinimo != null ? data.numeroEmpresasMinimo : 0;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  anterior(tipo: number) {
    switch (tipo) {
      case 0:
        this._router.navigate(['/registroUnicoContratos']);
        break;
      case 1:
        this.form1Visible = false;
        this.form0Visible = true;
        break;
      case 2:
        this.form2Visible = false;
        this.form1Visible = true;
        break;
      case 31:
        this.form31Visible = false;
        this.form2Visible = true;
        break;
      case 4:
        this.form4Visible = false;
        this.form31Visible = true;
        break;
      case 5:
        this.form4Visible = true;
        break;
      case 7:
        this.form7Visible = false;
        this.form4Visible = true;
        break;
    }
  }

  guardarContinuar() {
    this._messageService.showInfo('Los datos del contrato han sido guardados correctamente.', 'top center');
    this._router.navigate(['/registro-contratos']);
  }

  changeItemContrato(name: string, value: any) {
    if (name == 'iD_TipoModeloOperacion') {
      this.actualizarIdsTiposModeloOperacion(value);
      this.get_DetalleSumRaciones();
    } else {
      this.itemContrato[name] = value;
    }
  }

  private actualizarIdsTiposModeloOperacion(id: number): void {
    this.modelosOperacionActivos.includes(id)
      ? this.eliminarIdTipoModeloOperacion(id)
      : this.agregarIdModeloOperacion(id);
  }

  private eliminarIdTipoModeloOperacion(id: number) {
    this.modelosOperacionActivos = this.modelosOperacionActivos.filter(idModeloOperacion => { return idModeloOperacion !== id });
  }

  changeItemDetalleProcesoContrato(name: string, value: any) {
    this.itemDetalleProcesoContrato[name] = value;
  }

  changeContratoAnticipo(_cs: boolean) {

    this.itemAnticipoContrato.contratoAnticipo = _cs;
  }

  changeItemUtil(name: string, value: any) {
    this.itemUtil[name] = value;
    if (name == 'seleccionTodo') {
      this.dataSedesNoBenMAEM.map(function (item: any) {
        item.seleccion = value;
        return item;
      });
    }
    else if (name == 'seleccionTodoBen') {
      this.dataSedesBenMAEM.map(function (item: any) {
        item.seleccion = value;
        return item;
      });
    }
  }

  changeItem(item: any, name: string, value: any) {
    item[name] = value;
  }

  actualizarIdZonaYConsultarRaciones(idModeloOperacion: number, idZona: number) {
    if (idModeloOperacion == ModeloOperacion.MAEM.id) {
      this.iD_ZonaMAEM = idZona;
    } else if (idModeloOperacion == ModeloOperacion.MAIP.id) {
      this.iD_ZonaPAEPI = idZona;
    }
    this.get_SumRacionesPrecios();
  }

  actualizarIdNivelEducativoYConsultarRaciones(idModeloOperacion: number, idNivelEducativo: number) {
    if (idModeloOperacion == ModeloOperacion.MAEM.id) {
      this.iD_NivelEducativoMAEM = idNivelEducativo;
    } else if (idModeloOperacion == ModeloOperacion.MAIP.id) {
      this.iD_NivelEducativoPAEPI = idNivelEducativo;
    }
    this.get_SumRacionesPrecios();
  }

  guardarSiguiente0() {

    if (this.itemContrato.numeroContrato == '') {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.iD_Operador == 0) {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.objetoContrato == '') {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.subTipoContratoId == 0) {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.iD_TipoContratoCHIP == 0) {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.iD_TipoConceptoGasto == 0) {
      this.showValidation0 = true;
      return;
    }

    if (this.itemContrato.id == 0) {
      this.crearContrato();
    }
    else {
      this.updateContrato();
    }
  }

  crearContrato() {
    let itemContrato = this.itemContrato;
    this.loadingVisible = true;
    itemContrato.iD_TipoModeloOperacion = this.VALOR_CERO;
    this._contratosApi.createContrato(itemContrato)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          if (response.result != 0) {
            this.itemContrato.id = response.result;
            this.itemDetalleProcesoContrato.iD_Contrato = response.result;
            this.itemAnticipoContrato.iD_Contrato = response.result;
            this.itemCompraLocal.iD_Contrato = response.result;

            this.form0Visible = false;
            this.form1Visible = true;
          }
          else {
            this._messageService.showError('ERROR: El numero de contrato ya existe ', 'top center');
          }
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  updateContrato() {
    this.loadingVisible = true;

    this._contratosApi.updateContrato(this.itemContrato)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this.get_DetallesProcesoContratos();
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  obtenerTituloCategoria(): string {
    if (this.itemContrato.subTipoContratoId == this.CATEGORIA_SUMINISTRO_COMPLEMENTOS_AL_DIA) {
      return 'Complementos al día';
    } else if (this.itemContrato.subTipoContratoId == this.CATEGORIA_SUMINISTRO_COMPLEMENTOS_DURANTE_LA_VIGENCIA_DEL_CONTRATO) {
      return 'Complementos durante la vigencia del contrato';
    } else {
      return this.VACIO;
    }
  }

  // Item 1

  get_DetallesProcesoContratos() {
    this.loadingVisible = true;

    this._contratosApi.getProcesoContractual(this.itemContrato.id)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          this.itemDetalleProcesoContrato.iD_Contrato = this.itemContrato.id;

          if (response.result.length > 0) {
            let result = response.result[0];
            let fechaAdjudicacion = moment(result.fechaAdjudicacion);
            let fechaSuscripcion = moment(result.fechaSuscripcion);

            this.itemDetalleProcesoContrato = {
              id: result.id,
              iD_Contrato: result.iD_Contrato,
              iD_TipoContratacion: result.iD_TipoContratacion,
              iD_PlataformaContrato: result.iD_PlataformaContrato,
              publicadorSECOP: result.publicadorSECOP,
              numeroProcesoRegistradoSECOP: result.numeroProcesoRegistradoSECOP,
              linkContratoSECOP: result.linkContratoSECOP,
              fechaAdjudicacion_Format: { year: parseInt(fechaAdjudicacion.format('YYYY')), month: parseInt(fechaAdjudicacion.format('MM')), day: parseInt(fechaAdjudicacion.format('DD')) },
              fechaAdjudicacion: fechaAdjudicacion.format('YYYY-MM-DD'),
              fechaSuscripcion: fechaSuscripcion.format('YYYY-MM-DD'),
              estado: result.estado,
              auditoria: LocalStorage.getAuditoria('')
            };
          }

          this.form0Visible = false;
          this.form1Visible = true;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_TiposPlataformaContratacion() {
    this.loadingVisible = true;

    this._contratosApi.get_TiposPlataformaContratacion()
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          this.listTiposPlataformaContratacion = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  guardarSiguiente1() {
    if (this.itemDetalleProcesoContrato.iD_TipoContratacion == 0) {
      this.showValidation1 = true;
      return;
    }

    if (this.itemDetalleProcesoContrato.publicadorSECOP) {
      if (!(this.itemDetalleProcesoContrato.iD_PlataformaContrato > 0)) {
        this.showValidation1 = true;
        return;
      }

      if (this.itemDetalleProcesoContrato.numeroProcesoRegistradoSECOP == '') {
        this.showValidation1 = true;
        return;
      }

      if (this.itemDetalleProcesoContrato.linkContratoSECOP == '') {
        this.showValidation1 = true;
        return;
      }
    }

    if (this.itemDetalleProcesoContrato.fechaSuscripcion == null ||
      this.itemDetalleProcesoContrato.fechaSuscripcion == undefined ||
      this.itemDetalleProcesoContrato.fechaSuscripcion == '') {
        this.showValidation1 = true;
      return;
    }

    if (this.itemDetalleProcesoContrato.fechaAdjudicacion == null ||
      this.itemDetalleProcesoContrato.fechaAdjudicacion == undefined ||
      this.itemDetalleProcesoContrato.fechaAdjudicacion == '') {
        this.showValidation1 = true;
      return;
    }

    /*let fechaFormat = this.itemDetalleProcesoContrato.fechaAdjudicacion_Format;

    this.itemDetalleProcesoContrato.fechaAdjudicacion =
      fechaFormat.year + '-' +
      (fechaFormat.month <= 9 ? '0': '') + fechaFormat.month + '-' +
      (fechaFormat.day <= 9 ? '0': '') + fechaFormat.day;*/

    if (this.itemDetalleProcesoContrato.id == 0) {
      this.crearDetalleProcesoContrato();
    }
    else {
      this.actualizarDetalleProcesoContrato();
    }
  }

  crearDetalleProcesoContrato() {
    this.loadingVisible = true;

    this._contratosApi.createDetalleprocesoContrato(this.itemDetalleProcesoContrato)
      .subscribe(response => {
        this.loadingVisible = false

        if (response.success) {
          this._contratosApi.get_ContratosContratosModelosGetID(this.itemContrato.id).subscribe(res => {
            res.result.forEach(result => {
              this.agregarIdModeloOperacion(result?.iD_TipoModeloOperacion);
              this.get_DetalleSumRaciones();
            });
          });
          this.form1Visible = false;
          this.form2Visible = true;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  actualizarDetalleProcesoContrato() {
    this.loadingVisible = true;



    this._contratosApi.putProcesoContractual(this.itemDetalleProcesoContrato)
      .subscribe(response => {

        if (response.success) {
          //this.consultarTiposModeloOperacionPorIdContrato(this.itemContrato.id);
          this._contratosApi.get_ContratosContratosModelosGetID(this.itemContrato.id).subscribe(res => {
            res.result.forEach(result => {
              this.agregarIdModeloOperacion(result?.iD_TipoModeloOperacion);
              this.get_DetalleSumRaciones();
            });
          });
          this.loadingVisible = false;
          this.form1Visible = false;
          this.form2Visible = true;

          /* if(this.modelosOperacionActivos.length > this.VALOR_CERO){
                this.get_DetalleSumRaciones();

              setTimeout(() => {
                if(this.loadingVisible==false){
                  this.form1Visible = false;
                  this.form2Visible = true;
                }
              }, 3000);
            }

          else {
            this.loadingVisible=false;
            this.form1Visible = false;
            this.form2Visible = true;
          }
    */
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  consultarTiposModeloOperacionPorIdContrato(idContrato: number) {
    this._contratosApi.get_ContratosContratosModelosGetID(idContrato).subscribe(res => {
      res.result.forEach(result => {
        if (result?.iD_TipoModeloOperacion == ModeloOperacion.MAEM.id) {
          this.contratoModeloMAEM.id = result?.id
          this.contratoModeloMAEM.iD_Contrato = this.itemContrato.id;
          this.contratoModeloMAEM.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.contratoModeloMAEM.manejaPreciosporzona = result?.manejaPreciosporzona
          this.contratoModeloMAEM.manejaPreciosporNivelEducativo =result?.manejaPreciosporNivelEducativo
        } else if (result?.iD_TipoModeloOperacion == ModeloOperacion.MAIP.id) {
          this.contratoModeloPAEPI.id = result?.id
          this.contratoModeloPAEPI.iD_Contrato = this.itemContrato.id;
          this.contratoModeloPAEPI.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.contratoModeloPAEPI.manejaPreciosporzona = result?.manejaPreciosporzona;
          this.contratoModeloPAEPI.manejaPreciosporNivelEducativo =result?.manejaPreciosporNivelEducativo;
        }
      });
    });
  }

  agregarIdModeloOperacion(idModeloOperacion: number) {
    if (idModeloOperacion && !this.modelosOperacionActivos.includes(idModeloOperacion)) {
      this.modelosOperacionActivos.push(idModeloOperacion);
    }
  }


  // Item 2

  editarRac() {
    this.editRac = true;
  }

  cancelarEditRac() {
    this.editRac = false;
    this.get_DetalleSumRaciones();
  }

  guardarEditRac(iD_TipoModeloOperacion) {
    if (this.itemContrato.noMeses >= 1 && this.itemContrato.noMeses <= 180) {
      let diasSuministro = this.itemContrato.noMeses;


      this.loadingVisible = true;

      if (iD_TipoModeloOperacion == ModeloOperacion.MAEM.id) {
        this.dataDetalleSumRacionesMAEM.map(function (item: any) {
          item.iD_TipoModeloOperacion = ModeloOperacion.MAEM.id;
          item.diasSuministro = diasSuministro;
          item.mesesSuministro = diasSuministro;
          item.estado = true;

          return item;
        });
        this._contratosApi.put_UpdateContratosDetallesSumRacionesMAEM(this.dataDetalleSumRacionesMAEM).subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
            this.cancelarEditRac();
            this.get_ContratosSumRacionesContratadasDiarias(ModeloOperacion.MAEM.id);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
      }

      if (iD_TipoModeloOperacion == ModeloOperacion.MAIP.id) {
        this.dataDetalleSumRacionesPAEPI.map(function (item: any) {
          item.iD_TipoModeloOperacion = ModeloOperacion.MAIP.id;
          item.diasSuministro = diasSuministro;
          item.mesesSuministro = diasSuministro;
          item.estado = true;

          return item;
        });
        this._contratosApi.put_UpdateContratosDetallesSumRacionesMAIP(this.dataDetalleSumRacionesPAEPI).subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
            this.cancelarEditRac();
            this.get_ContratosSumRacionesContratadasDiarias(ModeloOperacion.MAIP.id);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
      }


    } else {
      this.showValidationTable = true;
      return;
    }
  }

  validarModeloOperacionSeleccionado() {
    if (this.modelosOperacionActivos.length === 0) {
      this.showValidation3 = true;
    } else {
      this.showValidation3 = false;
    }
  }

  guardarSiguiente2() {
    if (this.itemContrato.fechalnicioContrato == null && this.itemContrato.fechalnicioContrato == undefined) {
      this.showValidation2 = true;
      return;
    }

    if (this.itemContrato.fechaFinalContrato == null && this.itemContrato.fechaFinalContrato == undefined) {
      this.showValidation2 = true;
      return;
    }

    if (!this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id) && !this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
      this.showValidation2 = true;
      return;
    }

    if (this.itemContrato.fechalnicioContrato > this.itemContrato.fechaFinalContrato) {
      this._messageService.showWarning('La fecha de inicio del contrato no puede ser mayor que la fecha de terminación del contrato', 'top center');
      return;
    }

    this._contratosApi.updateContrato(this.itemContrato).subscribe(response => {
      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
        // Validar que se haya seleccionado al menos una opción del campo
      this.validarModeloOperacionSeleccionado();
      if (this.showValidation2) {
        return;
      }

      let idTipoModeloOperacion;
      if (this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id)) {
        idTipoModeloOperacion = ModeloOperacion.MAEM.id;
        this.get_ContratosSedesJoranada(idTipoModeloOperacion);
        this.get_SedesContratoModeloOperacion(idTipoModeloOperacion);
        this.get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion);
        this.get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion);
      }

      if (this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
        idTipoModeloOperacion = ModeloOperacion.MAIP.id;
        this.get_ContratosSedesJoranada(idTipoModeloOperacion);
        this.get_SedesContratoModeloOperacion(idTipoModeloOperacion);
        this.get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion);
        this.get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion);
      }
      this.form2Visible = false;
      this.form31Visible = true;
    });
  }

  guardarContinuar2() {
    this._contratosApi.updateContrato(this.itemContrato).subscribe(response => {
      if (response.success) {
        this._messageService.showInfo('Los datos del contrato han sido guardados correctamente.', 'top center');
        this._router.navigate(['/registro-contratos']);
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  agregarContratoModelo(idTipoModeloOperacion: number): void {
    let contratoModelo: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      this.contratoModeloMAEM.id_Contrato = this.itemContrato.id;
      this.contratoModeloMAEM.iD_TipoModeloOperacion = idTipoModeloOperacion;
      contratoModelo = this.contratoModeloMAEM;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      this.contratoModeloPAEPI.id_Contrato = this.itemContrato.id;
      this.contratoModeloPAEPI.iD_TipoModeloOperacion = idTipoModeloOperacion;
      contratoModelo = this.contratoModeloPAEPI;
    }
    this._contratosApi.agregarContratoModelo(contratoModelo)
      .subscribe(response => {
        if (response.success) {
          idTipoModeloOperacion == ModeloOperacion.MAEM.id
            ? this.contratoModeloMAEM.id = response.result
            : this.contratoModeloPAEPI.id = response.result;
          this.get_ContratosSedesJoranada(idTipoModeloOperacion);
          this.get_SedesContratoModeloOperacion(idTipoModeloOperacion);
          this.get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion);
          this.get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion);
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  eliminarContratoModelo(idTipoModeloOperacion: number): void {
    let id: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      id = this.contratoModeloMAEM.id;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      id = this.contratoModeloPAEPI.id;
    }
    this.loadingVisible = true;
    this._contratosApi.eliminarContratoModeloPorId(id)
      .subscribe(response => {
        this.loadingVisible = false;
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarContratoModelo(idTipoModeloOperacion: number): void {
    let contratoModelo: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      contratoModelo = this.contratoModeloMAEM;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      contratoModelo = this.contratoModeloPAEPI;
    }
    this._contratosApi.actualizarContratoModelo(contratoModelo)
      .subscribe(respuesta => {
        if (!respuesta.success) {
          this._messageService.showError('ERROR: ' + respuesta.error, 'top center');
        }
      });
  }

  actualizarContratoFinalizar() {
    this.itemContrato.idOperador = this.itemContrato.iD_Operador;
    this.itemContrato.idEtc =this.itemContrato.iD_ETC;
    this.itemContrato.idContrato =this.itemContrato.id
    this._contratosApi.updateContrato(this.itemContrato)
      .subscribe(response => {
        if (response.success) {
          this._messageService.showInfo('El contrato se ha guardado.', 'top center');
          this._router.navigate(['/registro-contratos']);
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }



  get_ContratosCHIP() {
    this._contratosApi.Get_AllContratoChip()
      .subscribe(response => {
        if (response.success) {
          this.listContratosCHIP = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_ConceptosGasto() {
    this._contratosApi.get_ConceptosGasto()
      .subscribe(response => {
        if (response.success) {
          this.listConceptoGasto = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_Operadores() {
    let param = {
      numIdentificacion: '',
      nit: '',
      digitoVerificacion: ''
    }

    this._contratosApi.Get_Operadores(param)
      .subscribe(response => {
        if (response.success) {
          this.listOperadores = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_SubtiposContratacion() {
    this._contratosApi.get_SubtiposContratacion(1)
      .subscribe(response => {
        if (response.success) {
          this.listSubtiposContratacion = response.result.filter(subtipo => this.idsSubTiposContratacionPermitidos.includes(subtipo.id));
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_TiposContratacion() {
    this.loadingVisible = true;
    this._contratosApi.GetTiposContratacion()
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this.listTiposContratacion = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_DetalleSumRaciones() {
    this.dataDetalleSumRacionesMAEM = [];
    this.dataDetalleSumRacionesPAEPI = [];

    this.loadingVisible = true;
    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id)) {
      this.itemUtil.col_CSS_Rac = 'col-md-10';
      this._contratosApi.get_DetallesSumRacionesMAEM(this.itemContrato.id, this.modeloOperacion.MAEM.id)
        .subscribe(response => {
          this.itemContrato.noMeses = response.result.length > this.VALOR_CERO ? response.result[this.VALOR_CERO].diasSuministro : this.VALOR_CERO;
          this.dataDetalleSumRacionesMAEM = response.result;
        }, (error) => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });

      this._contratosApi.get_TotalRacionesMAEM(this.itemContrato.id, this.modeloOperacion.MAEM.id, this.itemContrato.noMeses ?? this.VALOR_CERO)
        .subscribe(response => {
          this.dataTotalRacionesMAEM = response.result;
          this.loadingVisible = false;
        }, (error) => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });
    }

    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
      this.itemUtil.col_CSS_Rac = 'col-md-6';
      this._contratosApi.get_DetallesSumRacionesMAIP(this.itemContrato.id, this.modeloOperacion.MAIP.id)
        .subscribe(response => {
          this.itemContrato.noMeses = response.result.length > this.VALOR_CERO ? response.result[this.VALOR_CERO].diasSuministro : this.VALOR_CERO;
          this.dataDetalleSumRacionesPAEPI = response.result;

        }, (error) => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });

      this._contratosApi.get_TotalRacionesMAIP(this.itemContrato.id, this.modeloOperacion.MAIP.id, this.itemContrato.noMeses ?? this.VALOR_CERO)
        .subscribe(response => {
          this.dataTotalRacionesPAEPI = response.result;
          this.loadingVisible = false;
        }, (error) => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });
    }

  }


  get_ContratosSedesJoranada(idTipoModeloOperacion: number) {
    this.loadingVisible = true;
    this._contratosApi.get_ContratosSedesJoranada(this.iD_ETC, idTipoModeloOperacion)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
            this.dataSedesNoBenMAEM = response.result;
          } else {
            this.dataSedesNoBenPAEPI = response.result;
          }
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_ContratosSedesJoranadaPAEC() {
    this.loadingVisible = true;
    this._contratosApi.get_ContratosSedesJoranada(this.iD_ETC, ModeloOperacion.PAEC.id)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this.dataSedesNoBenPAEC = response.result;
          if (response.result.length == 0) {
            this.dataSedesNoBenPAEC = [{}];
          }
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_SedesContratoModeloOperacion(idTipoModeloOperacion: number) {
    this.loadingVisible = true;
    this._contratosApi.get_SedesContratoModeloOperacion(this.itemContrato.id, idTipoModeloOperacion)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
            this.dataSedesBenMAEM = response.result;
          } else {
            this.dataSedesBenPAEPI = response.result;
          }
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_SedesContratoModeloOperacionPAEC() {
    this.loadingVisible = true;
    this._contratosApi.get_SedesContratoModeloOperacion(this.itemContrato.id, ModeloOperacion.PAEC.id)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this.dataSedesBenPAEC = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion: number) {
    this.loadingVisible = true;

    this._contratosApi.get_ContratosSumRacionesContratadasDiarias(this.itemContrato.id, idTipoModeloOperacion, 0)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
            this.dataSumRacionesDiariasMAEM = response.result;
          } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
            this.dataSumRacionesDiariasPAEPI = response.result;
          }

        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion: number) {
    this.loadingVisible = true;

    this._contratosApi.get_ContratosSumRacionesSedesBeneficiarias(this.itemContrato.id, idTipoModeloOperacion, 0)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
            this.dataSumRacionesContratadasMAEM = response.result;
          } else {
            this.dataSumRacionesContratadasPAEPI = response.result;
          }

        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }


  agregarSedes(idModeloOperacion: number) {
    let data = [];
    let tieneData = true;

    if (idModeloOperacion == ModeloOperacion.MAEM.id) {
      data = this.dataSedesNoBenMAEM.filter(function (item: any) {
        return item.seleccion;
      });
    } else {
      data = this.dataSedesNoBenPAEPI.filter(function (item: any) {
        return item.seleccion;
      });
    }

    if (data.length === 0) {
      tieneData = false;
    }

    // Se filtran los colegios seleccionados para evitar duplicados
    data = data.filter(x => !this.dataSedesBenMAEM.some(y =>
      y.municipio === x.municipio &&
      y.institucionEducativa === x.institucionEducativa &&
      y.sede === x.sede &&
      y.jornada === x.jornada
    ));

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].id = 0;
        data[i].iD_Contrato = this.itemContrato.id;
        data[i].numeroContrato = this.itemContrato.numeroContrato;
        data[i].iD_TipoModeloOperacion = idModeloOperacion;
      }

      this.loadingVisible = true;
      this._contratosApi.agregarSedesBeneficiarias(data)
        .subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this.get_ContratosSedesJoranada(idModeloOperacion);
            this.get_SedesContratoModeloOperacion(idModeloOperacion);

            this.get_ContratosSumRacionesContratadasDiarias(idModeloOperacion);
            this.get_ContratosSumRacionesSedesBeneficiarias(idModeloOperacion);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
    }
    // se valida si inicialmente tiene data para mostrar o no el mensaje para no confundir al usuario
    else if (!tieneData) { this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center'); }
  }

  eliminarSedes(idModeloOperacion: number) {
    let data = [];
    if (idModeloOperacion == ModeloOperacion.MAEM.id) {
      data = this.dataSedesBenMAEM.filter(function (item: any) {
        return item.seleccion;
      });
    } else {
      data = this.dataSedesBenPAEPI.filter(function (item: any) {
        return item.seleccion;
      });
    }

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].borrado = true;
      }

      this.loadingVisible = true;
      this._contratosApi.eliminarSedesBeneficiarias(data)
        .subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this.get_ContratosSedesJoranada(idModeloOperacion);
            this.get_SedesContratoModeloOperacion(idModeloOperacion);

            this.get_ContratosSumRacionesContratadasDiarias(idModeloOperacion);
            this.get_ContratosSumRacionesSedesBeneficiarias(idModeloOperacion);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
    }
    else { this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center'); }
  }

  agregarSedesPAEC() {
    let data = this.dataSedesNoBenPAEC.filter(function (item: any) {
      return item.seleccion;
    });

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].iD_Contrato = this.itemContrato.id;
        data[i].numeroContrato = this.itemContrato.numeroContrato;
        data[i].iD_TipoModeloOperacion = ModeloOperacion.PAEC.id;
      }

      this.loadingVisible = true;
      this._contratosApi.agregarSedesBeneficiarias(data)
        .subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this.get_ContratosSedesJoranadaPAEC();
            this.get_SedesContratoModeloOperacionPAEC();

            this.get_ContratosSumRacionesContratadasDiarias(ModeloOperacion.PAEC.id);
            this.get_ContratosSumRacionesSedesBeneficiarias(ModeloOperacion.PAEC.id);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
    }
    else { this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center'); }
  }

  eliminarSedesPAEC() {
    let data = this.dataSedesBenPAEC.filter(function (item: any) {
      return item.seleccion;
    });

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].borrado = true;
      }

      this.loadingVisible = true;
      this._contratosApi.eliminarSedesBeneficiarias(data)
        .subscribe(response => {
          this.loadingVisible = false;
          if (response.success) {
            this.get_ContratosSedesJoranadaPAEC();
            this.get_SedesContratoModeloOperacionPAEC();

            this.get_ContratosSumRacionesContratadasDiarias(ModeloOperacion.PAEC.id);
            this.get_ContratosSumRacionesSedesBeneficiarias(ModeloOperacion.PAEC.id);
          }
          else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
        });
    }
    else { this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center'); }
  }

  guardarSiguiente3_1() {
    let valorCero = 0;
    if (this.dataSedesBenMAEM.length == this.VALOR_CERO && this.dataSedesBenPAEPI.length == this.VALOR_CERO) {
      this._messageService.showWarning('Debe agregar al menos una sede beneficiaria.', 'top center');
      return;
    }

    let dataMAEM = this.dataSumRacionesContratadasMAEM.filter(function (item: any) {
      return item.diferenciaAlmuerzo != valorCero || item.diferenciaComplemento != valorCero;
    });

    let dataPAEPI = this.dataSumRacionesContratadasPAEPI.filter(function (item: any) {
      return item.diferenciaAlmuerzo != valorCero || item.diferenciaComplemento != valorCero;
    });

    if (dataMAEM.length > this.VALOR_CERO || dataPAEPI.length > this.VALOR_CERO) {
      this._messageService.showWarning('Hay diferencia en el Almuerzo y/o Complemento', 'top center');
      return;
    }

    this.form31Visible = false;


    this.get_SumRacionesPrecios();
    this.get_TotalGeneralContratado(this.itemContrato.id);
    this.get_AnticiposContratos();
    this.getSedesContratoZonaNivelEducativoModelo();
    this.getSedesContratoZonaModeloOperacion();
  }

  // Item 4
  get_AnticiposContratos() {
    if (!this.modoEdit) {
      this.form31Visible = false;
      this.form4Visible = true;
      return;
    } else {
      this.form4Visible = true;
    }

    this.loadingVisible = true;
    this._contratosApi.get_AnticiposContratos(this.itemContrato.id)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          if (response.result.length > this.VALOR_CERO) {
            let result = response.result[this.VALOR_CERO];
            this.itemAnticipoContrato = {
              id: result.id,
              iD_Contrato: result.iD_Contrato,
              iD_tipoperiodicidad: result.iD_tipoperiodicidad,
              valorAnticipo: result.valorAnticipo,
              porcentajeAnticipo: result.porcentajeAnticipo,
              tipoPeriodicidadld: result.tipoPeriodicidadld,
              numeroPagos: result.numeroPagos,
              estado: result.estado,
              auditoria: LocalStorage.getAuditoria('')
            };

            this.form31Visible = false;
            this.form4Visible = true;
          }
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_PerioricidadAmortizacion() {
    this.loadingVisible = true;
    this._contratosApi.GetAllPerioricidadAmortizacion()
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this.listPerioricidadAmortizacion = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_SumRacionesPrecios() {
    this.loadingVisible = true;

    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id)) {
      this._contratosApi
        .get_SumRacionesPreciosMAEM(this.itemContrato.id, ModeloOperacion.MAEM.id, this.iD_ZonaMAEM ?? this.VALOR_CERO, this.iD_NivelEducativoMAEM ?? this.VALOR_CERO, this.contratoModeloMAEM.manejaPreciosporzona ?? this.VALOR_FALSE, this.contratoModeloMAEM.manejaPreciosporNivelEducativo ?? this.VALOR_FALSE)
        .subscribe(sumRacionesPrecios => {
          this.dataSumRacionesPreciosMAEM = sumRacionesPrecios.result;
        }, error => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });

      this._contratosApi
        .get_SumContratoRacionesValorTotalMAEM(this.itemContrato.id, ModeloOperacion.MAEM.id, this.VALOR_CERO, this.iD_ZonaMAEM ?? this.VALOR_CERO, this.iD_NivelEducativoMAEM ?? this.VALOR_CERO, this.contratoModeloMAEM.manejaPreciosporzona ?? this.VALOR_FALSE, this.contratoModeloMAEM.manejaPreciosporNivelEducativo ?? this.VALOR_FALSE)
        .subscribe(sumContratosRacionesValorTotal => {
          this.sumContratosValorTotalMAEM = this.VALOR_CERO;
          sumContratosRacionesValorTotal.result.forEach(element => {
            this.sumContratosValorTotalMAEM += element.costo;
          });
          this.dataSumRacionesValorTotalMAEM = sumContratosRacionesValorTotal.result;
        }, error => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });
    }

    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
      this._contratosApi.get_SumRacionesPreciosMAIP(this.itemContrato.id, ModeloOperacion.MAIP.id, this.iD_ZonaPAEPI ?? this.VALOR_CERO, this.iD_NivelEducativoPAEPI ?? this.VALOR_CERO, this.contratoModeloPAEPI.manejaPreciosporzona ?? this.VALOR_FALSE, this.contratoModeloPAEPI.manejaPreciosporNivelEducativo ?? this.VALOR_FALSE)
        .subscribe(sumRacionesPrecios => {
          this.dataSumRacionesPreciosPAEPI = sumRacionesPrecios.result;
        }, error => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });

      this._contratosApi.get_SumContratoRacionesValorTotalMAIP(this.itemContrato.id, ModeloOperacion.MAIP.id, this.VALOR_CERO, this.iD_ZonaPAEPI ?? this.VALOR_CERO, this.iD_NivelEducativoPAEPI ?? this.VALOR_CERO, this.contratoModeloPAEPI.manejaPreciosporzona ?? this.VALOR_FALSE, this.contratoModeloPAEPI.manejaPreciosporNivelEducativo ?? this.VALOR_FALSE)
        .subscribe(sumContratosRacionesValorTotal => {
          this.sumContratosValorTotalPAEPI = this.VALOR_CERO;
          sumContratosRacionesValorTotal.result.forEach(element => {
            this.sumContratosValorTotalPAEPI += element.costo;
          });
          this.dataSumRacionesValorTotalPAEPI = sumContratosRacionesValorTotal.result;
        }, error => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });
    }
    this.validarRubrosContrato(false);
    this.loadingVisible = false;
  }

  editarRacPrecio() {
    this.editRacPrecio = true;
  }

  cancelarEditRacPrecio() {
    this.editRacPrecio = false;
    this.get_SumRacionesPrecios();
  }

  guardarEditRacPrecio(idTipoModeloOperacion: number) {

    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      let idZona = this.iD_ZonaMAEM;
      let idNivelEducativo = this.iD_NivelEducativoMAEM;
      this.dataSumRacionesPreciosMAEM.map(function (item: any) {
        item.auditoria = LocalStorage.getAuditoria('');
        item.estado = true;
        item.iD_TipoModeloOperacion = idTipoModeloOperacion;
        item.idZona = idZona;
        item.idNivelEducativo = idNivelEducativo;

        return item;
      });

      this.loadingVisible = true;

      this._contratosApi.put_UpdateContratosCaracteristicasFinancierasMAEM(this.dataSumRacionesPreciosMAEM).subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.cancelarEditRacPrecio();
          this.get_TotalGeneralContratado(this.itemContrato.id);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
    }

    if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      let idZona = this.iD_ZonaPAEPI;
      let idNivelEducativo = this.iD_NivelEducativoPAEPI;
      this.dataSumRacionesPreciosPAEPI.map(function (item: any) {
        item.auditoria = LocalStorage.getAuditoria('');
        item.estado = true;
        item.iD_TipoModeloOperacion = idTipoModeloOperacion;
        item.idZona = idZona;
        item.idNivelEducativo = idNivelEducativo;
        return item;
      });

      this.loadingVisible = true;

      this._contratosApi.put_UpdateContratosCaracteristicasFinancierasMAIP(this.dataSumRacionesPreciosPAEPI).subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.cancelarEditRacPrecio();
          this.get_TotalGeneralContratado(this.itemContrato.id);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
    }
  }

  editarRacPrecioPaec() {
    this.editRacPrecioPaec = true;
  }

  cancelarEditRacPrecioPaec() {
    this.editRacPrecioPaec = false;
  }

  guardarEditRacPrecioPaec() {
    this.dataSumRacionesPreciosPAEC.map(function (item: any) {
      item.auditoria = LocalStorage.getAuditoria('') ;
      item.estado = true;

      return item;
    });

    this._contratosApi.put_UpdateContratosCaracteristicasFinancierasPAEC(this.dataSumRacionesPreciosPAEC)
      .subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.cancelarEditRacPrecioPaec();
          this.get_TotalGeneralContratado(this.itemContrato.id);
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  //form: any, itemActivo: number
  onSubmit(): void{
    this.guardarSiguiente4();
   /* if(form.valid == true){
      switch(itemActivo) {
        case 1: {
           this.guardarSiguiente4();
           break;
        }
      }
    } */
  }

  guardarSiguiente4() {
    if (!(this.itemContrato.valorTotalContrato > 0)) {
      this.showValidationTotal = true;
      return;
    }

    if(this.itemContrato.valorTotalContrato != (this.valTotalRubros + this.sumContratosValorTotalMAEM + this.sumContratosValorTotalPAEPI)){
      this._messageService.showWarning('El valor del contrato debe coincidir con el costo total de la priorización de las sedes beneficiarias. y los rubros adicionales', 'top center');
      return;
    }

    // if(this.itemContrato.conAnticipo){
    //   if(!this.itemAnticipoContrato.porcentajeAnticipo){
    //     this._messageService.showWarning('Digite porcentaje de anticipo', 'top center');
    //     return;
    //   }

    //   if(!(this.itemAnticipoContrato.iD_tipoperiodicidad > 0)){
    //     this._messageService.showWarning('Seleccione la periodicidad de amortización', 'top center');
    //     return;
    //   }

    //   if(!(this.itemAnticipoContrato.numeroPagos > 0)){
    //     this._messageService.showWarning('Digite el número de pagos de amortización', 'top center');
    //     return;
    //   }
    // }

    this.actualizarContratoPorCarasteristicas();
  }

  actualizarContratoPorCarasteristicas() {
    this.loadingVisible = true;

    this._contratosApi.updateContrato(this.itemContrato)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          if (this.itemAnticipoContrato.id == 0) {
            this.createCaracteristicasFinancieras();
          } else {
            this.updateCaracteristicasFinancieras();
            this.form4Visible = false;

          }
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  createCaracteristicasFinancieras() {
    this.loadingVisible = true;

    this._contratosApi.postCaracteristicaFinanciera(this.itemAnticipoContrato)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          this.itemAnticipoContrato.id = response.result;
          this.form4Visible = false;
          this.form7Visible = true;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  updateCaracteristicasFinancieras() {
    this.loadingVisible = true;

    this._contratosApi.putCaracteristicaFinanciera(this.itemAnticipoContrato)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {

          this.form4Visible = false;
          this.form7Visible = true;

        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }


  // Item 5

  guardarSiguiente5() { }


  // Item 6

  get_ListadoTipoReglaComprasLocales() {
    this._masterDataApi.get_ListadoTipoReglaComprasLocales()
      .subscribe(response => {
        if (response.success) {
          this.listTipoReglaComprasLocales = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_ListadoTiposCriterioEvaluacion() {
    this._masterDataApi.get_ListadoTiposCriterioEvaluacion()
      .subscribe(response => {
        if (response.success) {
          this.listTiposCriterioEvaluacion = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_Divipolas() {
    this._masterDataApi.get_Divipolas()
      .subscribe(response => {
        if (response.success) {
          this.listDivipolas = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  guardarSiguiente6() {
    if (!(this.itemCompraLocal.iD_TipoReglaCompraLocal > 0)) {
      this._messageService.showWarning('Seleccione un tipo de regla de compra local.', 'top center');
      return;
    }

    if (!(this.itemCompraLocal.porcentajeMinimo > 0)) {
      this._messageService.showWarning('Digite el porcentaje minímo.', 'top center');
      return;
    }

    if (!(this.itemCompraLocal.numeroEmpresasMinimo > 0)) {
      this._messageService.showWarning('Digite el número de empresas minímo.', 'top center');
      return;
    }

    if (!(this.itemCompraLocal.iD_TipoCriterioEvaluacion > 0)) {
      this._messageService.showWarning('Seleccione un criterio de evaluación.', 'top center');
      return;
    }

    if (!(this.itemCompraLocal.iD_TipoPeriodicidad > 0)) {
      this._messageService.showWarning('Seleccione un tipo de periodicidad..', 'top center');
      return;
    }

    if (!(this.itemCompraLocal.iD_ZonaGeografica > 0)) {
      this._messageService.showInfo('Seleccione una zona geografica.', 'top center');
      return;
    }

    if (this.itemCompraLocal.id == 0) {
      this.createCompraLocal();
    }
    else {
      this.updateCompraLocal();
    }
  }

  createCompraLocal() {
    this.loadingVisible = true;

    this._contratosApi.post_AddContratosModificacionPolizasCompraLocalesContrato(this.itemCompraLocal)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          this.form7Visible = true;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  updateCompraLocal() {
    this.loadingVisible = true;

    this._contratosApi.put_UpdateContratosModificacionPolizasCompraLocalesContrato(this.itemCompraLocal)
      .subscribe(response => {
        this.loadingVisible = false;

        if (response.success) {
          this.form7Visible = true;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }


  // Item 7
  get_TotalGeneralContratado(idContrato: number) {
    this._contratosApi.getTotalGeneralContratado(idContrato)
      .subscribe(response => {
        if (response.success) {
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

  uploadPDF() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {

        const file = fileUpload.files[0];
        this.fileName = file.name;
        this.itemContrato.archivoContrato = '';

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {

            this.fileName = file.name;
            this.itemContrato.nombreArchivoContrato = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.itemContrato.archivoContrato = reader.result?.toString().replace('data:application/pdf;base64,', '');
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

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  abrirPDF(contenido: any) {
    if (this.itemContrato.archivoContrato != null) {
      this.srcPDF = "data:application/pdf;base64," + this.itemContrato.archivoContrato;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  guardarSiguiente7() {
    if (this.dataTotalGeneralContratado.totalCRP != this.dataTotalGeneralContratado.totalFuentesFinanciacion) {
      this._messageService.showWarning('La suma total de los crp debe ser igual a la suma total de las fuentes de financiación', 'top center');
      return;
    } else if (this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.dataTotalGeneralContratado.valorTotal) {
      this._messageService.showWarning('La suma total de las fuentes de financiación debe ser igual al valor total del contrato', 'top center');
      return;
    }

    if (this.itemContrato.nombreArchivo == '') {
      this._messageService.showWarning('El pdf del contrato es requerido', 'top center');
      return;
    }

    this.itemContrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
    this.actualizarContratoFinalizar();
  }


  myTabFocusChange(selectedTabIndex: number) {
    this.selectedTabIndex = selectedTabIndex;
  }

  obtenerClaseEstadoDiligenciamiento(estadosDiligenciamiento: any[]): string {
    estadosDiligenciamiento = estadosDiligenciamiento.map(objeto => objeto?.estadoDiligenciamiento);
    if (estadosDiligenciamiento.includes(undefined) || estadosDiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR)) {
      return 'pendiente_diligenciar';
    } else if (estadosDiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_INCOMPLETO)) {
      return 'incompleto';
    } else {
      return 'completo';
    }
  }

  validarAgregarContratoModelo(event: any, idModeloOperacion: number): void {
    if (event.target.checked) {
      this.agregarContratoModelo(idModeloOperacion);
    } else {
      this.eliminarContratoModelo(idModeloOperacion);
    }
  }

  getSedesContratoZonaNivelEducativoModelo(): void {
    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id)) {
      this._contratosApi.Get_SedesContratoZonaNivelEducativoModelo(this.itemContrato.id, ModeloOperacion.MAEM.id, this.VALOR_CERO).subscribe(response => {
        this.sedesNivelEducativoMAEM = response.result;
      });
    }

    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
      this._contratosApi.Get_SedesContratoZonaNivelEducativoModelo(this.itemContrato.id, ModeloOperacion.MAIP.id, this.VALOR_CERO).subscribe(response => {
        this.sedesNivelEducativoPAEPI = response.result;
      });
    }
  }

  getSedesContratoZonaModeloOperacion(): void {
    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAEM.id)) {
      this._contratosApi.Get_SedesContratoZonaModeloOperacion(this.itemContrato.id, ModeloOperacion.MAEM.id).subscribe(response => {
        this.sedesZonaMAEM = response.result;
      });
    }

    if (this.modelosOperacionActivos.includes(ModeloOperacion.MAIP.id)) {
      this._contratosApi.Get_SedesContratoZonaModeloOperacion(this.itemContrato.id, ModeloOperacion.MAIP.id).subscribe(response => {
        this.sedesZonaPAEPI = response.result;
      });
    }
  }

  disableRubrosAdd(value: any, name: string, valBoolean: boolean) {
    if (!valBoolean && this.tieneRubros) {
      this._messageService.showWarning("Debe eliminar los Rubros Adcionales antes de realizar esta operación.", 'top center');
    }
    else {
      this[name] = valBoolean;
    }
  }

  validaRespuestaRubros(valRubros: any,valBoolean: boolean) {
    this.valTotalRubros = valRubros;
    this.validarRubrosContrato(valBoolean);
  }
  validarRubrosContrato(valBoolean: boolean) {
    if (this.sumContratosValorTotalMAEM + this.sumContratosValorTotalPAEPI < this.itemContrato.valorTotalContrato) {
      this._contratosApi.Get_RubrosAdicionales(this.itemContrato.id).subscribe(response => {
        if (response.success && response.result.length > this.VALOR_CERO) {
          this.rubroAdd = true;
          this.tieneRubros = true;
        }
        else if (response.success && response.result.length == this.VALOR_CERO) {
          this.tieneRubros = false;
          if (!valBoolean)
          {
            this.rubroAdd = false;
          }
        }
      });
    }
  }

  changeDigitoVerificacion(idOperador: number): void {
    let identificacionOperador = this.listOperadores.find(operador => operador.operadorId == idOperador).identificacion;
    this.digitoVerificacioOperador = identificacionOperador.substring((identificacionOperador.indexOf('-') + 1), identificacionOperador.length);
  }

  transformarIdentificacionSinDV(identificacion: string): string {
    return identificacion.substring(0, identificacion.indexOf('-'));
  }
}
