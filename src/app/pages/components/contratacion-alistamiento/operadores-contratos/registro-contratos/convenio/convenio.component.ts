import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { AsignacionRecursosApiService } from 'src/app/shared/services/asignacion-recursos-api.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Subscription } from 'rxjs';

const ID_VIGENCIA: number = 1;
const ID_ESTADO_PENDIENTE: number = 0;
const ID_ESTADO_EN_APROBACION: number = 1;
const ESTADO_POR_APROBAR: number = 1;
const APROBADO: number = 3;

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.sass'],
  /* providers: [
    ContratosApiService,
    MasterDataApiService,
    AsignacionRecursosApiService
  ] */
})
export class ConvenioComponent implements OnInit ,OnDestroy{

  private resultQuery1: boolean = false;
  private resultQuery2: boolean = false;
  private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  public VALOR_CERO: number = 0;
  public viewActiva: number = 0;
  public srcPDF: any;
  public addEt: boolean = true;
  public btnCaractFinanc: boolean = true;
  public EtLengthBool: boolean = false;
  public itemEt: any = '';

  public rubroAdd: boolean = true;
  public tieneRubros: boolean = false;
  public valTotalRubros: number = 0;
  public sumBolsaValorTotal: number = 0;
  public VALOR_FALSE: boolean = false;

  public formularioEnviado: boolean = false;
  public formularioEnviado2: boolean = false;
  public tieneErrores: boolean = false;
  public showValidationTable: boolean = false;


  public dataEts: any[] = [];
  public dataMunicipios: any[] = [];
  public dataFuenteFinanciacion: any[] = [];
  public dataPestanas: any = [
    { id: 1, descripcion: 'Mecanismos de Bolsa Común', active: true }
  ]
  public dataEtEtc: any[] = [
    { id: 1, nombre: 'ET-Sampablo', tipo: 1, iD_Contrato: 0 },
    { id: 2, nombre: 'ETC-Bolivar', tipo: 2, iD_Contrato: 0 }
  ];

  public tipoConvenio: any[] = [
    { id: 1, nombre: 'Convenio interadministrativo' },
    { id: 2, nombre: 'Acuerdo Formal' }
  ];
  public tipoMecanismo: any[] = [
    { id: 1, nombre: 'A. La Gobernación transfiere y el Municipio cofinancia' },
    { id: 2, nombre: 'B. El Municipio transfiere y la Gobernación cofinancia' }
  ];


  public fuentes: any[] = [
    { id: 1, nombre: 'Fuente 1' },
    { id: 2, nombre: 'Fuente 2' }
  ];

  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  public bolsa: any = {
    id: 0,
    iD_ETC: this.iD_ETC,
    iD_ET: null,
    iD_TipoConvenio: null,
    iD_EstadoContrato: ID_ESTADO_PENDIENTE,
    iD_Vigencia: ID_VIGENCIA,
    numeroMecanismo: '',
    objetoMecanismo: '',
    fechaSuscripcion: null,
    plazo: 0,
    diasAtencionPae: 0,
    iD_TipoMecanismo: null,
    valorTotalMecanismo: 0,
    estado: false,
    auditoria: LocalStorage.getAuditoria(''),
    iD_DiviPola :null
  }


  public contrato: any = {
    id: 0,
    TipoContratoId: 0,
    subTipoContratoId: '',
    iD_TipoContratoCHIP: 0,
    iD_TipoConceptoGasto: 0,
    iD_ETC: 0,
    iD_ET: 0,
    iD_MinutaPatronAlimento: 0,
    iD_Operador: 0,
    iD_TipoCategoriaContrato: 0,
    iD_EstadoContrato: ID_ESTADO_PENDIENTE,
    iD_UTConsorcio: 0,
    iD_PlanAlistamiento: 0,
    iD_Vigencia: ID_VIGENCIA,
    numeroContrato: '',
    objetoContrato: '',
    conAnticipo: false,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    estado: false,
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
    estado: true,
    auditoria: ''
  };

  public listTipoConvenio: any[] = [];
  public listEtEtc: any[] = [];
  public listmModalidadContratacionChip: any[] = [];
  public listMunicipios: any[] = [];

  constructor(
    private _contratosApi: ContratosApiService,
    private _masterDataApi: MasterDataApiService,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private _modalService: NgbModal,
    private _messageService: MessageService,
    private _asignacionRecursosApi: AsignacionRecursosApiService,
    private _seguridadService: SeguridadService,
  ) { }

  ngOnInit(): void {
    this.get_FuentePresupuestal()
    this.get_TipoConvenio();
    this.get_Municipios();

    this._activateRouter.params.subscribe(params => {
      if (params['corresponde'] != undefined && params['etId'] != undefined) {
        let tipo = +params['corresponde'];
        let iD_ET = +params['etId'];
        this.contrato.iD_ETC = tipo == 1 ? this.iD_ETC : 0;
        this.contrato.iD_ET = tipo == 2 ? iD_ET : 0;
      }

      if(params['idContrato']!=undefined) {
        this.get_BolsaInfo(+params['idContrato']);
      }
    });
  }

   ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  get_FuentePresupuestal() {
    this._asignacionRecursosApi.get_FuentesFinanciacion()
      .subscribe(response => {
        if (response.success) {
          this.fuentes = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }



  get_BolsaInfo(idBolsa: number) {
    this._contratosApi.get_BolsaComunGetID(idBolsa)
      .subscribe(response=>{

        if(response.success) {
          let data: any = response.result.length>0?response.result.shift():{};

          this.bolsa.id = data.id != null ? data.id : 0;
          this.bolsa.iD_Vigencia = data.iD_Vigencia != null ? data.iD_Vigencia : ID_VIGENCIA;
          this.bolsa.iD_EstadoContrato =  data.iD_EstadoContrato != null ? data.iD_EstadoContrato : 0;

          /**
           * vista convenio
           */
          this.bolsa.iD_TipoConvenio = data.iD_TipoConvenio != null ? data.iD_TipoConvenio : 0;
          this.bolsa.numeroMecanismo = data.numeroMecanismo != null ? data.numeroMecanismo : '';
          this.bolsa.objetoMecanismo = data.objetoMecanismo != null ? data.objetoMecanismo : 0;
          this.bolsa.iD_ETC = data.iD_ETC
          this.bolsa.plazo = data.plazo != null ? data.plazo : '';
          this.bolsa.valorTotalMecanismo = data.valorTotalMecanismo != null ? data.valorTotalMecanismo : 0;
          this.bolsa.diasAtencionPae = data.diasAtencionPae != null ? data.diasAtencionPae : 0;
          this.bolsa.iD_TipoMecanismo = data.iD_TipoMecanismo != null ? data.iD_TipoMecanismo : 0;
          this.bolsa.fechaSuscripcion = data.fechaSuscripcion != null ? moment(data.fechaSuscripcion).isBetween('1753-01-01', '9999-12-31') ? new Date(data.fechaSuscripcion) : null : null;
          this.bolsa.iD_DiviPola = data.iD_DiviPola != null ? data.iD_DiviPola : 0;
          this.get_AllMunicipios(idBolsa);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }



  actualizarGranTotal(data: any) {
    this.dataTotalGeneralContratado.diferencia = data.diferencia;
    this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = data.diferenciaFuentesFinanciacion;
    this.dataTotalGeneralContratado.totalCRP = data.totalCRP;
    this.dataTotalGeneralContratado.totalFuentesFinanciacion = data.totalFuentesFinanciacion;
    this.dataTotalGeneralContratado.valorTotal = data.valorTotal;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;
  }

  onSubmit() {
    this.formularioEnviado = true;
    if (
      !this.bolsa.iD_TipoConvenio ||
      !this.bolsa.numeroMecanismo ||
      !this.bolsa.objetoMecanismo ||
      !this.bolsa.fechaSuscripcion ||
      !this.bolsa.plazo ||
      !this.bolsa.diasAtencionPae ||
      !this.bolsa.iD_TipoMecanismo
    ) {
      return;
      }
    switch (this.viewActiva) {
      case 0:
        if (this.bolsa.id === 0) { this.crearBolsa(); } else { this.actualizarBolsa(); }
        this.avanzar()
        break;

      case 1:
        break;

      case 2:
        this.avanzar();
        break;

      case 3:
        if (this.dataTotalGeneralContratado.totalCRP != this.dataTotalGeneralContratado.totalFuentesFinanciacion) {
          this._messageService.showWarning('La suma total de los crp es diferente a la suma total de las fuentes de financiación', 'top center');
          return;
        }

        if(this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.dataTotalGeneralContratado.valorTotal) {
          this._messageService.showWarning('El total de las fuentes de financiacion es diferente al valor total del contrato', 'top center');
          return;
        }

        if (this.contrato.nombreArchivo == '') {
          this._messageService.showWarning('El pdf del contrato es requerido', 'top center');
          return;
        }

        this.contrato.valorTotalContrato = this.dataTotalGeneralContratado.valorTotal;
        this.contrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
        this.actualizarBolsa();
        break;
    }
  }

  avanzar() {
    switch (this.viewActiva) {
      case 0:
          this.set_ViewActiva(1);
        return;

      case 1:
          this.set_ViewActiva(2);
        return;

      case 2:
        this.set_ViewActiva(3);
        return;

      case 3:
        if(this.resultQuery1) {
          this.resetQuery();
          this.finalizar(2);
        }
        return;
    }
  }

  resetQuery() {
    this.resultQuery1 = false;
    this.resultQuery2 = false;
  }

  crearBolsa() {
    this.bolsa.numeroMecanismo = this.bolsa.numeroMecanismo.toString();
    this._contratosApi.createBolsaComun(this.bolsa)
    .subscribe(response => {
      if(response.success){
        if(response.result!=0)
        {
        this.bolsa.id = response.result;
        //this.saveEts();
      }
      else
        {
          this._messageService.showError('ERROR: El numero de contrato ya existe ' , 'top center');
        }
      }
      else{  this._messageService.showError("ERROR: " + response.error, 'top center'); }
    });
  }


  actualizarBolsa() {
    this._contratosApi.updateBolsaComun(this.bolsa)
      .subscribe(response => {
        if (response.success) {
          //this.saveEts();
        }
        else { this._messageService.showError("ERROR: " + response.error, 'top center'); }
      });
  }


  updateEstadoBolsa() {
    this._contratosApi.put_UpdateEstadoBolsaComun({
      id: this.bolsa.id,
      iD_EstadoContrato: APROBADO,
      auditoria: LocalStorage.getAuditoria(''),
    })
      .subscribe((response) => {
        if (response.error) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }


  addMunicipio() {
    this.dataMunicipios.push({
      id: 0,
      iD_Bolsa: this.bolsa.id,
      iD_DiviPola: 0,
      aporteMunicipio: 0,
      aporteGobiernacion: 0,
      cofinanciacionMunicipio: 0,
      cofinanciacionGobernacion: 0,
      iD_FuenteFinanciacionAporte: 0,
      iD_FuenteFinanciacionCofinanciacion: 0,
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      addInfo: true
    });
  }

  validarMunicipio(item: any) {
    if (item.iD_DiviPola <= 0) {
      this.showValidationTable = true;
      return;
    }

    if (this.bolsa.iD_TipoMecanismo == 7) {
      if (item.aporteGobiernoMunicipio <= 0) {
        this.showValidationTable = true;
        return;
      }

      if (item.cofinanciacionMunicipio <= 0) {
        this.showValidationTable = true;
        return;
      }
    } else {
      if (item.aporteMunicipioGobernacion <= 0) {
        this.showValidationTable = true;
        return;
      }
    }
    this.crearMunicipio(item);
  }

  get_AllMunicipios(idBolsa: number) {
    this._contratosApi.getAllConveniosAportes(idBolsa)
    .subscribe(response => {
      if(response.success) {
        this.dataMunicipios = response.result;
        this.dataMunicipios.forEach(result => {
          this.calculoValorTotal(result);
        });
        this.sumBolsaValorTotal = this.dataMunicipios.length > this.VALOR_CERO ? this.calcularValorTotalBolsa() : this.VALOR_CERO
        this.btnCaractFinanc = this.dataMunicipios.length == 0 ? true : false;
        //this.get_TotalGeneralContratado(this.contrato.id);
      } else {
        this._messageService.showError("ERROR: " + response.error, 'top center');
      }
    });
  }

  crearMunicipio(item: any) {
    item.id_Bolsa = this.bolsa.id
    this._contratosApi.postConveniosAportes(item)
    .subscribe(response => {
      if(response.success) {
        item.id = response.result;
        item.addInfo = false;
        this.sumBolsaValorTotal = this.dataMunicipios.length > this.VALOR_CERO ? this.calcularValorTotalBolsa() : this.VALOR_CERO
        this.btnCaractFinanc = this.dataMunicipios.length == 0 ? true : false;
        //this.get_TotalGeneralContratado(this.contrato.id);
      } else {
        this._messageService.showError("ERROR: " + response.error, 'top center');
      }
    });
  }

  eliminarMunicipio(id: number, i: number) {
    this._contratosApi.deleteConveniosAportes(id)
    .subscribe(response => {
      if(response.success) {
        this.dataMunicipios.splice(i, 1);
        this.sumBolsaValorTotal =this.dataMunicipios.length > this.VALOR_CERO ? this.calcularValorTotalBolsa() : this.VALOR_CERO ;
        this.btnCaractFinanc = this.dataMunicipios.length == 0 ? true : false;
      } else {
        this._messageService.showError("ERROR: " + response.error, 'top center');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/BolsaComun']);
  }
  finalizar(tipo: number) {
    this.formularioEnviado2 = true;
    if (!this.bolsa.valorTotalMecanismo ||
        !this.bolsa.iD_DiviPola){
      return;
      }
    this.actualizarBolsa();
    if (tipo == 2) {
      this.updateEstadoBolsa();
    }
    this._messageService.showInfo('Se guardo el contrato.', 'top center');
    this.router.navigate(['/BolsaComun']);
   }

  changeItemConvenio(name: string, value: string) {
    this.bolsa[name] = value;
  }

  changeItemMunicipioNv1(i: number, name: string, value: any) {
    this.dataMunicipios[i][name] = value;
  }
  calculoValorTotal(item: any) {
    item['valorTotalMecanismo'] = item['aporteMunicipio'] + item['aporteGobiernacion'] + item['cofinanciacionMunicipio'] + item['cofinanciacionGobernacion'];
  }

  calcularValorTotalBolsa(): number {
    return this.dataMunicipios.reduce((accumulator, item) => {
      return accumulator + item.valorTotalMecanismo;
    }, this.VALOR_CERO) ?? this.VALOR_CERO;

  }





  /* END ETs */

  get_TotalGeneralContratado(id: number) {
    this._contratosApi.getTotalGeneralContratado(id)
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

  get_TipoConvenio() {
    this._contratosApi.get_SubtiposContratacion(4)
      .subscribe(response => {
        if (response.success) {
          this.listTipoConvenio = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  changeItemTotal(name: string, value: any) {
    this.bolsa[name] = value;
  }

  get_Municipios() {
    this._masterDataApi.get_Divipolas()
      .subscribe(response => {
        if (response.success) {
          this.listMunicipios = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  set_ViewActiva(viewActiva: number) {
    this.viewActiva = viewActiva;
  }


  disableRubrosAdd(value: any, name: string, valBoolean: boolean) {

    if (!valBoolean && this.tieneRubros) {
      this._messageService.showWarning("Debe eliminar los Rubros Adcionales antes de realizar esta operación.", 'top center');
    }
    else {
      this[name] = valBoolean;

    }
  }

  validaRespuestaRubros(valRubros: any, valBoolean: boolean) {
    this.valTotalRubros = valRubros;
    this.validarRubrosBolsa(valBoolean);

  }

  validarRubrosBolsa(valBoolean: boolean) {
    if (this.sumBolsaValorTotal < this.bolsa.valorTotalMecanismo) {
      this._contratosApi.Get_RubrosAdicionales(this.bolsa.id).subscribe(response => {
        if (response.success && response.result.length > this.VALOR_CERO) {
          this.rubroAdd = true;
          this.tieneRubros = true;
        }
        else if (response.success && response.result.length == this.VALOR_CERO) {
          this.tieneRubros = false;
          if (!valBoolean) {
            this.rubroAdd = false;
          }

        }
      });
    }
  }


  /**
  * uploadPDF('nameinput', item, 'pahtArchivoCDP', indice?)
  * uploadPDF('nameinput', item, 'pathArchivoCRP', indice?)
  */
  uploadPDF(nameElm: string, item: any, itemName: string, itemVal: string){

    const fileUpload = document.getElementById(nameElm) as HTMLInputElement;
    const MAXIMO_BYTES = 10000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        item[itemName] = file.name;
        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              item[itemName] = file.name;
              //item[itemVal]= reader.result?.toString().replace('data:application/pdf;base64,', '');
              fileUpload.value = '';
            };
          }
          else {
            fileUpload.value = '';
            this._messageService.showWarning("El tamaño del archivo supera los 10MB", 'top center');
          }
        }
        else {
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
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  getModulePermission(module: number, action: string): boolean {
    return this._seguridadService.getModulePermission(module, action);
  }
}
