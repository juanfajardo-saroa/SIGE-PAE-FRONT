import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { AsignacionRecursosApiService } from 'src/app/shared/services/asignacion-recursos-api.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { DateUtilService } from 'src/app/shared/services/DateUtil.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

const ID_TIPOCONTRATO: number = 3;
const ID_VIGENCIA: number = 1;
const ESTADO_POR_APROBAR: number = 1;
const APROBADO: number = 3;

@Component({
  selector: 'app-bolsa-comun-tabla',
  templateUrl: './bolsa-comun-tabla.component.html',
  styleUrls: ['./bolsa-comun-tabla.component.sass'],
  /* providers: [
    ContratosApiService,
    MasterDataApiService,
    AsignacionRecursosApiService,
  ], */
})
export class BolsaComunTablaComponent implements OnInit,OnDestroy {
  @Input() fichaContratoOperadores: any = {};
  public srcPDF: any;
  private subs = new Subscription() 
  public dsTipoContrato: any[] = [
    { id: 1, nombre: 'Suministro' },
    { id: 2, nombre: 'Materia Prima y Logística' },
    { id: 3, nombre: 'Dotación, equipos y servicios' },
    { id: 5, nombre: 'Supervisión y personal' },
  ];

  public typeModificacion: string = '';
  public EsAdicion: boolean = false;

  public paramsProrroga: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModificacion: 0,
    numeroDiasProrroga: 0,
    fechaTerminacionProrroga: new Date(),
    soporteModificacionArchivo: '',
    soporteModificacionPath: '',

    valorAdicionReduccion: 0,

    estado: true,
    auditoria: 'string',
  };

  public paramsDataVariable: any = {
    id: 0,
    iD_Contrato: 0,
    iD_Modificacion: 0,
    actual: 0,
    valorAdicionReduccion: 0,
    soporteModificacionPath: '',
    tipoModificacionContrato: '',
    fechaTerminacionContrato: new Date(),
    valorTotalContrato: 0,
    numeroDiasSuministro: 0,
    descripcion: '',
    estado: true,
    auditoria: 'string',
  };
  numeroContrato: string = '';
  hojaContrato: any;
  TotalGeneralContratadosModificacion: any = [];
  listSedesContratosHojaContrato: any = [];
  dsModeloOperacion: any;
  idContrato: number = 0;
  idBolsa: number = 0;
 idTipoContrato: number = 0;
  idMOperacion: number = 0;
  tipoContratoId: number = 0;
  subTipoContratoId: number = 0;
  opcionSeleccionado: number = 0;
  nuevoValorContrato: number = 0;
  nuevoNumeroDiascontrato: number = 0;
  fileName: string = '';
  disabled: boolean = false;
  entity: any;
  gridViewDetalle: boolean = false;
  dataContratos: any = [];
  dataTabla: any[] = [];
  operadoresList: any = [];
  listFuentePresupuestal: any = [];
  displayedColumnsBolsa: any[] = [
    { descripcion: 'Número de mecanismo' },
    { descripcion: 'Tipo de mecanismo' },
    { descripcion: 'Fecha de suscripción' },
    { descripcion: 'Valor' },
    { descripcion: 'Estado' },
  ];

  public itemsPerPages: number[] = [5, 10, 20, 50, 100];
  public itemCant: number = 5;
  public itemIni: number = 0;
  public itemFin: number = 0;
  public pages: number = 0;
  public page: number = 0;

  public displayDD: boolean = true;
  public displayM: boolean = false;
  public displayMC: boolean = false;
  public displayMCP: boolean = false;
  public displayMCPAR: boolean = false;
  public displayINFPRES: boolean = false;
  public displayHeader: boolean = false;
  public displaySearch: boolean = true;
  public displayDetalleContrato: boolean = false;
  public displayOtrasCondiciones: boolean = false;

  public displayDetalle: boolean = false;
  public disabledFirstPage: boolean = true;
  public disabledNextPage: boolean = true;
  public disabledLastPage: boolean = true;
  public disabledPreviousPage: boolean = true;

  public contrato: any = {
    id: 0,
    TipoContratoId: ID_TIPOCONTRATO,
    iD_TipoContratoCHIP: 0,
    iD_TipoConceptoGasto: 0,
    iD_ETC: 0,
    iD_ET: 0,
    iD_MinutaPatronAlimento: 0,
    iD_Operador: 0,
    iD_TipoCategoriaContrato: 0,
    iD_EstadoContrato: 0,
    iD_UTConsorcio: 0,
    iD_PlanAlistamiento: 0,
    iD_Vigencia: ID_VIGENCIA,
    numeroContrato: '',
    objetoContrato: '',
    conAnticipo: false,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    estado: false,
    auditoria: '',
    valorTotalContrato: null,
    manejaPAEC: false,
    iD_TipoModeloOperacion: 0,
  };

  constructor(
    private _contratosService: ContratosApiService,
    private _masterDataService: MasterDataApiService,
    private _contratosApiService: ContratosApiService,
    private _asignacionRecursosApi: AsignacionRecursosApiService,
    public router: Router,
    public _modalService: NgbModal,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService,
    public dateUtil: DateUtilService
  ) {}

  habilitarSig(num: any) {
    this.TotalGeneralContratadosModificacion[0].valorCRPAdicion = num;
  }

  goToPage() {
    this.router.navigate(['/convenio', 1, 0]);
  }

  ngOnInit(): void {
    this.verFichaBolsa();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  ngOnChanges(): void {
    this.inicializarControl();
  }

  verFichaBolsa() {
    if (this.fichaContratoOperadores.visible) {
      this.idBolsa = this.fichaContratoOperadores.data.iD_Contrato;
      this.get_FichaBolsa(this.idBolsa);
      this.displaySearch = false;
    } else {
      this.inicializarControl();
    }
  }

  get_FichaBolsa(iD_Bolsa: number) {
    this._contratosApiService
      .get_BolsaComunGetID(iD_Bolsa)
      .subscribe((response) => {
        if (response.success) {
          if (response.result.length > 0) {
            this.hojaContrato = response.result[0];
            this.gridViewDetalle = true;
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

  changeSearch(name: string, value: string) {
    if (name === 'contrato') {
      if (value === null || value === undefined) this.numeroContrato = '0';
      else this.numeroContrato = value;
    } else {
      if (value === null || value === undefined) this.idMOperacion = 0;
      else this.idMOperacion = parseInt(value);
    }
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


  get_BolsaComunAll() {
    this._contratosService
      .get_BolsaComunGetAll()
      .subscribe((response) => {
        if (response.success) {
          response.result.map(function (item: any) {
            item.fechaSuscripcionstring = '-';
            if (
              moment(item.fechaSuscripcion).isValid() &&
              moment(item.fechaSuscripcion).year() >= 1900
            ) {
              item.fechaSuscripcionstring = moment(
                item.fechaSuscripcion
              ).format('YYYY-MM-DD');
            }

            return item;
          });

          this.dataContratos = response.result;
          this.changeCantItems(this.itemsPerPages[1]);
        }
      });
  }

  public inicializarControl() {
    this.get_BolsaComunAll();
  }

  consultaBolsa() {
    this.get_BolsaComunAll();
    this.gridViewDetalle = false;
  }


  
  verdetalle(item: any) {
    // && this.getModulePermission(112, 'editar')
    if ((item.fichaColor == 0 || item.fichaColor == 3) ) 
    {
      this.router.navigate(['/convenio', item.iD_Mecanismo]);
      this.loadContratoHoja(item.iD_Mecanismo);
      this.displaySearch = false;
      this.displayDetalle = true;
      this.idBolsa = item.iD_Mecanismo;
      if (this.dataContratos.length > 0) this.gridViewDetalle = true;
    }
  }

  uploadPDF() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        //this.fileName = file.name;
        //this.entity.archivoResolucion = '';

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {
            this.fileName = file.name;
            this.paramsProrroga.soporteModificacionPath = file.name;
            this.paramsDataVariable.soporteModificacionPath = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.paramsProrroga.soporteModificacionArchivo = reader.result
                ?.toString()
                .replace('data:application/pdf;base64,', '');
              this.paramsDataVariable.soporteModificacionArchivo = reader.result
                ?.toString()
                .replace('data:application/pdf;base64,', '');
            };
          } else {
            fileUpload.value = '';
            this._messageService.showWarning(
              'El tamaño del archivo supera los 100MB',
              'top center'
            );
          }
        } else {
          fileUpload.value = '';
          this._messageService.showWarning(
            '"El formato del archivo no es un PDF',
            'top center'
          );
        }
      }
    };

    fileUpload.click();
  }

  abrirPDF(contenido: any) {
    if (this.paramsProrroga.soporteModificacionPath != null) {
      this.srcPDF =
        'data:application/pdf;base64,' +
        this.paramsProrroga.soporteModificacionPath;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  /*
  GetTotalGeneralContratadosModificacion(
    itemOne: any,
    itemTwo: any,
    itemThree: any,
    itemFour: any
  ) {
    this._contratosApiService
      .GetTotalGeneralContratadosModificacion(
        itemOne,
        itemTwo,
        itemThree,
        itemFour
      )
      .subscribe((response) => {
        if (response.success) {
          this.TotalGeneralContratadosModificacion = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  PostContratosModificacion() {
    this._contratosApiService
      .PostContratosModificacion(this.paramsProrroga)
      .subscribe((response) => {
        if (response.success) {
          this.paramsProrroga.id = response.result;
          this.paramsDataVariable.iD_Modificacion = response.result;
          if (this.displayMCP) {
            this.resetData();
            this._messageService.showInfo(
              `PRORROGAAD CREA ${new Date()}`,
              'top center'
            );
          }
        }
      });
  }

  updateContratosModificacion() {
    this._contratosApiService
      .UpdateContratosModificacion(this.paramsProrroga)
      .subscribe((response) => {
        if (!response.success) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  PostContratosDataVariable() {
    this._contratosApiService
      .PostContratosDataVariable(this.paramsDataVariable)
      .subscribe((response) => {
        if (response.success) {
          this._messageService.showInfo(
            `${this.typeModificacion} CREADA ${new Date()}`,
            'top center'
          );
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  editModificaciones(item: any) {
    if (item == null || item == undefined) return;
    this.loadContratoHoja(this.idContrato);
    this.displaySearch = false;
    this.displayDetalle = false;
    this.displayHeader = true;
    this.displayM = true;
    this.displayMC = true;
    this.displayDD = false;
    this.displayOtrasCondiciones = false;

    this.paramsProrroga.iD_Contrato = this.idContrato;
    this.paramsDataVariable.iD_Contrato = this.idContrato;
    //this.contrato.id = item.contratoId;
  }

  
 *
 *  verContrato(item: any){
    if(item.tipoContratoId == 1 && (item.fichaColor == 0 || item.fichaColor == 3)){
      this.router.navigate(['/suministro-dia-vigencia', item.contratoId, item.tipoContratoId, 0, 0]);
    }
    else if(item.tipoContratoId == 2 && (item.fichaColor == 0 || item.fichaColor == 3))
    {
      this.router.navigate(['/logistica', item.contratoId]);
    }
    else{
      this.loadContratoHoja(item.contratoId);
      this.tipoContratoId=item.tipoContratoId;
      this.subTipoContratoId=item.subTipoContratoId;
      this.idContrato = item.contratoId;
      if(this.dataContratos.length>0)
      this.gridViewDetalle=true;
    }
  }
 */

  /*
  selectModificacion(item: string) {
    
    this.typeModificacion = item;
    if (item == '2') {
      this.EsAdicion = true;
    }
  }

  SaveOtrasCondiciones() {
    if (this.paramsDataVariable.descripcion == '') {
      this._messageService.showWarning(
        'La descripción de las otras condiciones es obligatoria.',
        'top center'
      );
      return;
    }

    if (this.paramsDataVariable.soporteModificacionPath == '') {
      this._messageService.showWarning(
        'Debe adjuntar el soporte de las otras condiciones',
        'top center'
      );
      return;
    }
    this.paramsProrroga.auditoria = LocalStorage.getAuditoria('');
    this.paramsProrroga.descripcion = this.paramsDataVariable.descripcion;
    this.paramsProrroga.iD_TipoModificacion =
      this.paramsDataVariable.iD_TipoModificacion;
    this.paramsProrroga.soporteModificacionPath =
      this.paramsDataVariable.soporteModificacionPath;
    this.PostContratosModificacion();
    this.updateEstadoContrato();
  }

  SaveDataVariable() {
    if (this.nuevoValorContrato <= 0) {
      this._messageService.showWarning(
        'El nuevo valor del contrato debe ser superior a cero(0).',
        'top center'
      );
      return;
    }

    if (this.nuevoNumeroDiascontrato <= 0) {
      this._messageService.showWarning(
        'La cantidad de días suministro debe ser superior a cero(0).',
        'top center'
      );
      return;
    }

    if (
      this.nuevoValorContrato !=
      this.TotalGeneralContratadosModificacion[0]?.valorTotalContrato
    ) {
      this._messageService.showWarning(
        'El nuevo valor del contrato difiere del costo total.',
        'top center'
      );
      return;
    }

    if (
      this.nuevoNumeroDiascontrato !=
      this.TotalGeneralContratadosModificacion[0].diasSuministroContrato
    ) {
      this._messageService.showWarning(
        'Nueva cantidad de días difiere del total de loa días de suminstro.',
        'top center'
      );
      return;
    }

    this.PostContratosModificacion();
    this.updateEstadoContrato();
    setTimeout(() => {
      this.PostContratosDataVariable();
    }, 1000);
  }

  nextModificacion(evento: string) {
    if (evento == 'Atrás') {
      if (this.displayMCP == true) {
        this.displaySearch = false;
        this.displayDetalle = false;
        this.displayM = true;
        this.displayMC = true;
        this.displayMCP = false;
        this.displayMCPAR = false;
        this.displayDD = false;
        this.displayOtrasCondiciones = false;
        return;
      }
      if (this.displayMCPAR == true) {
        this.displaySearch = false;
        this.displayDetalle = false;
        this.displayMCPAR = false;
        this.displayM = true;
        this.displayMCP = false;
        this.displayMC = true;
        this.displayDD = false;
        this.displayOtrasCondiciones = false;
        return;
      }
      if (this.displayOtrasCondiciones == true) {
        this.displaySearch = false;
        this.displayDetalle = false;
        this.displayMCPAR = false;
        this.displayM = true;
        this.displayMCP = false;
        this.displayMC = true;
        this.displayDD = false;
        this.displayOtrasCondiciones = false;
        return;
      }
      if (this.displayMC == true) {
        this.displaySearch = true;
        this.displayDetalle = false;
        this.displayMCP = false;
        this.displayMCPAR = false;
        this.displayMC = false;
        this.displayM = false;
        this.displayOtrasCondiciones = false;
      }
    }

    if (this.displayMCP == true) {
      if (this.paramsProrroga.numeroDiasProrroga <= 0) {
        this._messageService.showWarning(
          'El número de días calendario de prorroga debe ser superior a cero(0).',
          'top center'
        );
        return;
      }

      if (
        this.paramsProrroga.fechaTerminacionProrroga == null ||
        this.paramsProrroga.fechaTerminacionProrroga == ''
      ) {
        this._messageService.showWarning(
          'La fecha estimada de finalización del contrato es requerida.',
          'top center'
        );
        return;
      }

      this.PostContratosModificacion();
      this.resetData();
      return;
    }
    if (this.displayMCPAR == true) {
      if (
        this.TotalGeneralContratadosModificacion[0].valorCRPAdicion !=
        this.paramsProrroga.valorAdicionReduccion
      ) {
        this._messageService.showWarning(
          'El valor de la adicion o reduccion es difiere del valor total de las fuentes de financiacion.',
          'top center'
        );
        return;
      }

      this.updateEstadoContrato();
      this.updateContratosModificacion();

      this.displayHeader = false;
      //this.displayMCP= false;
      //this.displayMC= true;
      //this.displayM= false;
      this.displayDD = true;
      this.resetData();
      return;
    }
    if (evento != 'Atrás') {
      switch (this.typeModificacion) {
        case 'Prorroga':
          this.displayMCP = true;
          this.displayMC = false;
          this.paramsProrroga.iD_TipoModificacion = 1;
          break;
        case 'Adición':
          this.displayMCPAR = true;
          this.displayMC = false;
          this.paramsDataVariable.iD_TipoModificacion = 2;
          this.paramsProrroga.iD_TipoModificacion = 2;
          this.paramsDataVariable.tipoModificacionContrato = 'Adición';
          break;
        case 'Reducción':
          this.displayMCPAR = true;
          this.displayMC = false;
          this.paramsDataVariable.iD_TipoModificacion = 3;
          this.paramsProrroga.iD_TipoModificacion = 3;
          this.paramsDataVariable.tipoModificacionContrato = 'Reducción';
          break;
        case 'Otras condiciones':
          this.displayMCPAR = false;
          this.displayMC = false;
          this.displayOtrasCondiciones = true;
          this.paramsDataVariable.iD_TipoModificacion = 4;
          this.paramsDataVariable.tipoModificacionContrato =
            'Otras condiciones contractuales';
          break;
        default:
          this.displayMCPAR = true;
          this.displayMC = false;
          //this.get_FuentePresupuestal();
          break;
      }
    }
  }

  

  resetData() {
    this.paramsDataVariable.iD_Modificacion = 0;

   
    this.paramsProrroga.numeroDiasProrroga = 0;
    this.paramsProrroga.fechaTerminacionProrroga = new Date();
    this.paramsProrroga.soporteModificacionPath = '';
    this.paramsProrroga.soporteModificacionArchivo = '';
    this.paramsDataVariable.soporteModificacionPath = '';
    this.paramsDataVariable.soporteModificacionArchivo = '';
    this.paramsDataVariable.descripcion = '';

    
    this.paramsProrroga.valorAdicionReduccion = 0;
    this.paramsDataVariable.numeroDiasSuministro = 0;
    this.nuevoValorContrato = 0;
    this.nuevoNumeroDiascontrato = 0;
    if (this.TotalGeneralContratadosModificacion.length > 0) {
      this.TotalGeneralContratadosModificacion[0].diasSuministroContrato = 0;
      this.TotalGeneralContratadosModificacion[0].valorTotalContrato = 0;
    }

    this.retornaViewPrincipal();
  }
  */

  retornaViewPrincipal() {
    this.displaySearch = true;
    this.displayDetalle = false;
    this.displayMCP = false;
    this.displayMCPAR = false;
    this.displayMC = false;
    this.displayM = false;
    this.displayOtrasCondiciones = false;
  }

  /*
  changeItemModificaciones(name: string, value: any) {
    this.paramsProrroga[name] = value;
    this.paramsDataVariable[name] =
      this.typeModificacion === 'Adición' ? value : -value;
  }
  */

  loadContratoHoja(idContrato: number) {
    this.displayHeader = true;
    this.consultaBolsa();
    
  }

  /*
  changeItemModificacionesAR(name: string, value: any) {
    switch (name) {
      case 'numeroDiasSuministro':
        this.GetTotalGeneralContratadosModificacion(
          this.paramsProrroga.iD_Contrato,
          this.paramsDataVariable.iD_Modificacion,
          this.paramsProrroga.valorAdicionReduccion,
          this.paramsDataVariable.numeroDiasSuministro
        );
        break;
      default:
        this.GetTotalGeneralContratadosModificacion(
          this.paramsProrroga.iD_Contrato,
          this.paramsDataVariable.iD_Modificacion,
          this.paramsProrroga.valorAdicionReduccion,
          this.paramsDataVariable.numeroDiasSuministro
        );
        this.paramsDataVariable[name] = value;
        break;
    }
  }

  get_SedesContratosHojaContrato(iD_Contrato: number) {
    this._contratosApiService
      .get_SedesContratosHojaContrato(iD_Contrato)
      .subscribe((response) => {
        if (response.success) {
          if (response.result.length > 0) {
            this.hojaContrato = response.result[0];
            if (this.hojaContrato.modeloOperacion != null)
              this.hojaContrato.modeloOperacion =
                this.hojaContrato.modeloOperacion.toString().substring(0, 4);
            if (this.hojaContrato.manejaPAEC != null)
              this.hojaContrato.manejaPAEC = this.hojaContrato.manejaPAEC
                .toString()
                .toUpperCase();
            this.listSedesContratosHojaContrato = response.result;
            this.formatDateListSedesContratosHojaContrato();
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

  get_FuentePresupuestal() {
    this._asignacionRecursosApi
      .get_FuentesFinanciacion()
      .subscribe((response) => {
        if (response.success) {
          this.listFuentePresupuestal = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
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
  */

  activarGridViewDetalleAndSearch(iD_TipoContrato: number) {
    this.idContrato = iD_TipoContrato;
    this.displaySearch = true;
    this.displayHeader = true;
    this.displayMCPAR = false;
    this.displayMCP = false;
    this.consultaBolsa();
  }

  getModulePermission(module: number, action: string): boolean {
    return this._seguridadService.getModulePermission(module, action);
  }
}
