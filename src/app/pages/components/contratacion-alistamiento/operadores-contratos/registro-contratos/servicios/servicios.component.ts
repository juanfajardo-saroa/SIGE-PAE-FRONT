import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratosApiService } from '../../../../../../shared/services/contratos-api.service';
import { AsignacionRecursosApiService } from '../../../../../../shared/services/asignacion-recursos-api.service';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { LocalStorage } from 'src/app/static/local-storage';

const ID_TIPOCONTRATO: number = 6;
const ID_VIGENCIA: number = 1;
const ID_ESTADO_PENDIENTE: number = 0;
const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.sass'],
  /* providers:[
    ContratosApiService,
    AsignacionRecursosApiService
  ] */
})
export class ServiciosComponent implements OnInit ,OnDestroy{
  private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
  public viewActiva: number = 0;
  private resultQuery1: boolean = false;
  private resultQuery2: boolean = false;
  public btnServiciosDisab: boolean = true;
  public btnPolizasDisab: boolean = true;
  public listaContratosPlanAnticipo: any = [];
  public VALOR_CERO: number = 0;
  public dataPestanas: any = [
    {id: 1, descripcion: 'Contratos', active: true}
  ]

  public listaNumerosPagoAmortizacion: number[] = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ];

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
    iD_TipoConceptoGasto: 0,
    iD_ETC: 0,
    iD_ET: 0,
    iD_MinutaPatronAlimento: 0,
    iD_Operador: '',
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
    auditoria: LocalStorage.getAuditoria(''),
    conAnticipo: false
  }
  public srcPDF: any;
  private subs = new Subscription() 
  public listOperadores: any = [];
  public listContratoChip: any = [];
  public listModalidaContratacionChip: any = [];
  public listPerioricidadAmortizacion: any = [];
  
  constructor(
    private _contratosApiService: ContratosApiService,
    private router: Router,
    private _activeRouter: ActivatedRoute,
    private _modalService: NgbModal,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._activeRouter.params.subscribe(params => {
      if(params['idContrato']!=undefined) {
        this.get_ContratoInfo(+params['idContrato']);        
      }
    });

    this.get_Operadores();
    this.get_ContratoChip();
    this.get_ModalidaContratacionChip();  
    this.get_PerioricidadAmortizacion();
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  get_ContratoInfo(idContrato: number) {
    this._contratosApiService.get_SedesContratosHojaContrato(idContrato)
      .subscribe(response=>{
        
        if(response.success) {      
          let data: any = response.result.length>0?response.result.shift():{};

          this.contrato.id = data.id_Contrato != null ? data.id_Contrato : 0;
          this.contrato.TipoContratoId = data.tipoContratoId != null ? data.tipoContratoId : 0;
          this.contrato.subTipoContratoId = data.subTipoContratoId != null ? data.subTipoContratoId : 0;
          this.contrato.iD_Vigencia = data.iD_Vigencia != null ? data.iD_Vigencia : ID_VIGENCIA;
          this.contrato.iD_EstadoContrato =  data.iD_EstadoContrato != null ? data.iD_EstadoContrato : 0; 
          
          /**
           * vista contrato
           */
          this.contrato.numeroContrato = data.numeroContrato != null ? data.numeroContrato : '';
          this.contrato.iD_Operador = data.id_operador != null ? data.id_operador : 0;
          this.contrato.objetoContrato = data.objetoContrato != null ? data.objetoContrato : '';
          this.contrato.iD_TipoContratoCHIP = data.iD_TipoContratoCHIP != null ? data.iD_TipoContratoCHIP : 0;
          
          /**
           * vista detalle suministro
           */
          this.contrato.fechalnicioContrato = data.fechalnicioContrato != null  ? moment(data.fechalnicioContrato).isBetween('1753-01-01', '9999-12-31')?  new Date(data.fechaFinalContrato): null : null;
          this.contrato.fechaFinalContrato = data.fechaFinalContrato != null ? moment(data.fechaFinalContrato).isBetween('1753-01-01', '9999-12-31')?  new Date(data.fechaFinalContrato): null : null;          
                   
          this.contrato.iD_TipoConceptoGasto = data.iD_TipoConceptoGasto != null ? data.iD_TipoConceptoGasto : 0;                  
          this.contrato.estado = data.estado != null ? data.estado : true;
          this.contrato.valorTotalContrato = data.valorTotalContrato != null ? data.valorTotalContrato : 0;
          this.contrato.iD_TipoModeloOperacion = data.iD_TipoModeloOperacion != null ? data.iD_TipoModeloOperacion : 0;
          this.contrato.conAnticipo = data.conAnticipo != null ? data.conAnticipo : false;
          this.contrato.nombreArchivo = data.nombreArchivo != null ? data.nombreArchivo : '';
          this.contrato.archivo = data.nombreArchivo != null ? data.nombreArchivo : '';        

          this.get_ProcesoContractual(idContrato);
          this.get_AnticiposContrato(idContrato);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
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
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }); 
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
 
  servicio(disabled: boolean) {
    this.btnServiciosDisab = disabled;    
  }

  poliza(disabled: boolean) {
    this.btnPolizasDisab = disabled;    
  }

  actualizarGranTotal(data: any) {
    this.dataTotalGeneralContratado.diferencia = data.diferencia;
    this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = data.diferenciaFuentesFinanciacion;
    this.dataTotalGeneralContratado.totalCRP = data.totalCRP;
    this.dataTotalGeneralContratado.totalFuentesFinanciacion = data.totalFuentesFinanciacion;
    this.dataTotalGeneralContratado.valorTotal = data.valorTotal;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;  
  }

  onSubmit(): void{ 
    switch(this.viewActiva) {
      case 0:
        if(this.contrato.id === 0) { this.crearContrato(); } else { this.actualizarContrato(); }
        break;

      case 1:
        if(this.itemDetalleProcesoContrato.id === 0) { this.crearProcesoContractual(); } else { this.actualizarProcesoContractual(); }
        break;

      case 2:
        if(moment(this.contrato.fechaFinalContrato).isBefore(this.contrato.fechalnicioContrato)) {
          this._messageService.showInfo('La fecha inicial del contrato debe ser inferior a la fecha de finalización', 'top center');
          return;
        }

        if(this.contrato.id != 0) {
          this.get_TotalGeneralContratado(this.contrato.id);
          this.actualizarContrato(); 
        }
        break;

      case 3:
        if(this.contrato.valorTotalContrato != this.dataTotalGeneralContratado.valorTotal) {
          this._messageService.showWarning('El valor del contrato no coincide con el costo total calculado por el sistema', 'top center');
          return;
        }

        if(this.anticipoContrato.id === 0) {
          this.createCaracteristicasFinancieras();
        } else {
          this.updateCaracteristicasFinancieras();
        }

        if(this.contrato.id != 0)  {
          this.actualizarContrato();
        }
        break;

      case 4:
        this.get_TotalGeneralContratado(this.contrato.id); 
        this.avanzar();
        break;

      case 5:
        if(this.dataTotalGeneralContratado.totalCRP != this.dataTotalGeneralContratado.totalFuentesFinanciacion) {
          this._messageService.showWarning('La suma total de los crp es diferente a la suma total de las fuentes de financiación', 'top center');
          return;
        }
    
        if(this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.dataTotalGeneralContratado.valorTotal) {
          this._messageService.showWarning('El total de las fuentes de financiacion es diferente a al valor total del contrato', 'top center');
          return;
        }

        if(this.contrato.nombreArchivo=='') {
          this._messageService.showWarning('El pdf del contrato es requerido', 'top center');
          return;
        }
        
        this.contrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
        this.actualizarContrato();
        break;
    }
  }

  avanzar() {
    switch(this.viewActiva) {
      case 0:
        if(this.resultQuery1) {
          this.resetQuery(); 
          this.set_ViewActiva(1); 
        }
        return;

      case 1:
        if(this.resultQuery1) {
          this.resetQuery(); 
          this.set_ViewActiva(2); 
        }
        return;
      
      case 2:
        if(this.resultQuery1) {
          this.resetQuery(); 
          this.set_ViewActiva(3); 
        }
        return;

      case 3:
        if(this.resultQuery1 && this.resultQuery2) {
          this.resetQuery(); 
          this.set_ViewActiva(4); 
        }
        return;
      
      case 4:
        this.set_ViewActiva(5); 
        return;

      case 5: 
        if(this.resultQuery1) {
          this.resetQuery(); 
          this.finalizar(); 
        }
        return;
    } 
  }

  resetQuery() {
    this.resultQuery1 = false;
    this.resultQuery2 = false;
  }
  
  finalizar(){
    this._messageService.showInfo('Se guardo el contrato.', 'top center');
    this.router.navigate(['/registro-contratos']);   
  }   

  crearContrato() {
    this.contrato.iD_ETC = this.iD_ETC;
    this._contratosApiService.CreateContrato(this.contrato)
    .subscribe(response => {
      if(response.success) {       
        if(response.result!=0)
        {
          this.contrato.id = response.result;
          this.itemDetalleProcesoContrato.iD_Contrato = response.result;
          this.anticipoContrato.iD_Contrato = response.result;
          this.resultQuery1 = true;
          this.avanzar();
        }
      else
        {
          this._messageService.showError('ERROR: El numero de contrato ya existe ' , 'top center');  
        }
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }); 
  }

  actualizarContrato() {
    this._contratosApiService.putContrato(this.contrato)
    .subscribe(response => {
      if(response.success) {  
        this.resultQuery1 = true;
        this.avanzar();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

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

  /**
  * uploadPDF('nameinput', item, 'pahtArchivoCDP', 'archivoCDP')
  * uploadPDF('nameinput', item, 'pathArchivoCRP', 'archivoCDP')
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
            this._messageService.showWarning('El tamaño del archivo supera los 10MB', 'top center');
          }
        }
        else{
          fileUpload.value = '';
          this._messageService.showWarning('El formato del archivo no es un PDF', 'top center');
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
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }  

  set_ViewActiva(viewActiva: number){
    this.viewActiva = viewActiva;
  }

  validarActualizarCaracterisiticasFinancieras(form: any){
    if(this.anticipoContrato.valorTotalContrato > 0 && this.anticipoContrato.porcentajeAnticipo > 0){
      var valor = (this.anticipoContrato.valorTotalContrato * this.anticipoContrato.porcentajeAnticipo) /100;
      this.anticipoContrato.valorAnticipo = valor;
    }
    if(!this.contrato.conAnticipo){
      return;
    }
    if(!(this.anticipoContrato.porcentajeAnticipo > this.VALOR_CERO)){
      return;
    }
    if(!(this.anticipoContrato.valorAnticipo > this.VALOR_CERO)){
      return;
    }
    if(!(this.anticipoContrato.iD_tipoperiodicidad > this.VALOR_CERO)){
      return;
    }
    if(form.value.txtNumeroPagoAmortizacion <= this.VALOR_CERO){
      return;
    }
    this.anticipoContrato.conAnticipo = this.contrato.conAnticipo;
    if(this.anticipoContrato.id == this.VALOR_CERO){
      this.crearCaracteristicasFinancieras();
    } else {
      this.actualizarCaracteristicasFinancieras();
    }
  }

  get_PlanAnticiposGetID() {
    // this._contratosApiService.get_PlanAnticiposGetID(this.anticipoContrato.id).subscribe(response => {
    //   if(response.success) {
    //     this.listaContratosPlanAnticipo = response.result;
    //   } else {
    //     this._messageService.showError('ERROR: ' + response.error, 'top center');
    //   }
      
    // });
  }


  crearCaracteristicasFinancieras() {
    this._contratosApiService.postCaracteristicaFinanciera(this.anticipoContrato)
    .subscribe(response => {
      if(response.success) {       
        this.anticipoContrato.id = response.result;
        this.get_PlanAnticiposGetID();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  actualizarCaracteristicasFinancieras() {
    this.anticipoContrato.tipoPeriodicidadld = this.anticipoContrato.periodicidadAmortizacion;
    this._contratosApiService.putCaracteristicaFinanciera(this.anticipoContrato)
    .subscribe(response => {
      if(response.success) {
        this.get_PlanAnticiposGetID();
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }); 
  }
}
