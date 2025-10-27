import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

const ID_TIPOCONTRATO: number = 2;
const PROVEER_OPERACION_LOGISTICA: number = 5;
const PROVEER_MATERIA_PRIMA: number = 4;
const ID_ESTADO_PENDIENTE: number = 0;
const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
  selector: 'app-suministro-rural',
  //providers: [ContratosApiService],
  templateUrl: './suministro-rural.component.html',
  styleUrls: ['./suministro-rural.component.scss']
})
export class SuministroRuralComponent implements OnInit,OnDestroy {
  public showPDFValidation: boolean  = false;

  dataPestanas: any = [
    {id: 1, descripcion: 'Contratos', active: true}
  ];

  loadingVisible = false;
  mostrarForms = {
    formRegistro: false,
    formDetalleProceso: false,
    formCaracteristicas: false,
    formInfPresupuestal: false,
  }

  sub: any;
  modoEdit = false;
  public fileName: string = '';
  public srcPDF: string = '';
  private subs = new Subscription()
  iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  iD_Vigencia = this.itemVigencia?.id;

  dataContrato: any = {
    id: 0,
    TipoContratoId: ID_TIPOCONTRATO,
    iD_TipoContratoCHIP: '',
    iD_TipoConceptoGasto: '',
    iD_ETC: this.iD_ETC,
    iD_ET: 0,
    iD_MinutaPatronAlimento: 0,
    iD_Operador: 0,
    iD_TipoCategoriaContrato: 0,
    iD_EstadoContrato: ID_ESTADO_PENDIENTE,
    iD_UTConsorcio: 0,
    iD_PlanAlistamiento: 0,
    iD_Vigencia: this.itemVigencia?.id,
    subTipoContratoId: 14,
    numeroContrato: '',
    objetoContrato: '',
    conAnticipo: false,
    fechalnicioContrato_Format: null,
    fechaFinalContrato_Format: null,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    estado:	true,
    auditoria: LocalStorage.getAuditoria(''),
    valorTotalContrato: null,
    manejaPAEC:	false,
    iD_TipoModeloOperacion: 0,
    nombreArchivo: '',
    archivo: ''
  };

  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  constructor(
    private _modalService: NgbModal,
    private _route : ActivatedRoute,
    private _router: Router,
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.dataContrato.id = +params['idc'];

      if(this.dataContrato.id > 0){
        this.modoEdit = true;
      }

      if(this.dataContrato.id == 0){
        let tipo = +params['tipo'];
        this.dataContrato.tipoContratoId = +params['ids'];
        this.dataContrato.iD_ETC = tipo == 1 ? this.iD_ETC : 0;
        this.dataContrato.iD_ET = +params['val'];
        this.mostrarForms.formRegistro = true;
      }
      else{
        this.get_Contrato();
      }

      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  get_Contrato(){
    this._contratosApiService.get_SedesContratosHojaContrato(this.dataContrato.id).subscribe(response => {
      if(!response.success){
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }

      const result = response.result[0];
      this.dataContrato.numeroContrato = result.numeroContrato;
      this.dataContrato.iD_Operador = result.id_operador;
      this.dataContrato.objetoContrato = result.objetoContrato;
      this.dataContrato.iD_TipoContratoCHIP = result.iD_TipoContratoCHIP;
      this.dataContrato.iD_TipoConceptoGasto = result.iD_TipoConceptoGasto;
      this.dataContrato.noMeses = result.noMeses;
      this.dataContrato.iD_Vigencia = result.iD_Vigencia != null ? result.iD_Vigencia : this.itemVigencia?.id;
      this.dataContrato.iD_EstadoContrato = result.iD_EstadoContrato;
      this.dataContrato.valorTotalContrato = result.valorTotalContrato;
      const fechalnicioContrato = result.fechalnicioContrato?.substring(0, 10);
      this.dataContrato.fechalnicioContrato = fechalnicioContrato && fechalnicioContrato != '0001-01-01' ? fechalnicioContrato : null;

      const fechaFinalContrato = result.fechaFinalContrato?.substring(0, 10);
      this.dataContrato.fechaFinalContrato = fechaFinalContrato && fechaFinalContrato != '0001-01-01' ? fechaFinalContrato : null;

      this.mostrarForms.formRegistro = true;
    })
  }

  guardarContinuar() {
    this.actualizarContratoFinalizar()
  }

  onRegresarEvent(event){
    if(event == 'REGISTRO'){

    } else if(event == 'DETALLE_PROCESO'){
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formRegistro = true;
    } else if(event == 'CARACTERISTICAS_FINANCIERAS'){
      this.mostrarForms.formCaracteristicas = false;
      this.mostrarForms.formDetalleProceso = true;
    }
    else if(event.form == 'GUARDAR Y CONTINUAR'){
      this.dataContrato.valorTotalContrato = event.data.valorTotalContrato;
      this.mostrarForms.formCaracteristicas = false;
      this.mostrarForms.formRegistro = false;
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formInfPresupuestal = false;
      this.actualizarContratoFinalizar()
    }
    else
    {
      this.mostrarForms.formCaracteristicas = true;
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formRegistro = false;
      this.mostrarForms.formInfPresupuestal = false;
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
    if (!this.dataContrato.nombreArchivoContrato|| this.dataContrato.nombreArchivoContrato == '') {
      this.showPDFValidation = true;
      return;
    }



    this.dataTotalGeneralContratado.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
    this.dataContrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
    this.actualizarContratoFinalizar();
  }


  actualizarContratoFinalizar() {
    this.dataContrato.idOperador = this.dataContrato.iD_Operador;
    this.dataContrato.idEtc =this.dataContrato.iD_ETC;
    this.dataContrato.idContrato =this.dataContrato.id
    this._contratosApiService.updateContrato(this.dataContrato)

      .subscribe(response => {
        if (response.success) {
          this._messageService.showInfo('El contrato se ha guardado.', 'top center');
          this._router.navigate(['/registro-contratos']);
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }


  onSubmitEvent(event){
    if(event.form == 'REGISTRO'){
      this.dataContrato = event.data;
      this.mostrarForms.formRegistro = false;
      this.mostrarForms.formDetalleProceso = true;
    } else if(event.form == 'DETALLE_PROCESO'){
      this.dataContrato = event.data;
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formCaracteristicas = true;
    } else if(event.form == 'CARACTERISTICAS_FINANCIERAS'){
      this.dataContrato.valorTotalContrato = event.data?.valorTotalContrato ?? this.dataContrato.valorTotalContrato;
      this.mostrarForms.formCaracteristicas = false;
      this.mostrarForms.formInfPresupuestal = true;
    }
    else if(event.form == 'GUARDAR Y CONTINUAR'){
      this.dataContrato = event.data;
      this.mostrarForms.formCaracteristicas = false;
      this.mostrarForms.formRegistro = false;
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formInfPresupuestal = false;
      this.actualizarContratoFinalizar()
    }
    else
    {
      this.mostrarForms.formCaracteristicas = false;
      this.mostrarForms.formRegistro = false;
      this.mostrarForms.formDetalleProceso = false;
      this.mostrarForms.formInfPresupuestal = true;
    }
  }

  actualizarGranTotal(data: any) {
    this.dataTotalGeneralContratado.diferencia = data.diferencia;
    this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = data.diferenciaFuentesFinanciacion;
    this.dataTotalGeneralContratado.totalCRP = data.totalCRP;
    this.dataTotalGeneralContratado.totalFuentesFinanciacion = data.totalFuentesFinanciacion;
    this.dataTotalGeneralContratado.valorTotal = data.valorTotal;
    this.dataTotalGeneralContratado.valorTotalPriorizacion = data.valorTotalPriorizacion;
  }


  get_TotalGeneralContratado(idContrato: number) {
    this._contratosApiService.getTotalGeneralContratado(idContrato)
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
        this.dataContrato.archivoContrato = '';

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {

            this.fileName = file.name;
            this.dataContrato.nombreArchivoContrato = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.dataContrato.archivoContrato = reader.result?.toString().replace('data:application/pdf;base64,', '');
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
    if (this.dataContrato.archivoContrato != null) {
      this.srcPDF = "data:application/pdf;base64," + this.dataContrato.archivoContrato;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }


}
