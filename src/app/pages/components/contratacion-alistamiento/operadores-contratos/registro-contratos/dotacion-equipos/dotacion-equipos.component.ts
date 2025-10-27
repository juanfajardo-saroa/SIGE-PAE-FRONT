import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratosApiService } from '../../../../../../shared/services/contratos-api.service';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

const ID_TIPOCONTRATO: number = 3;
const SUB_TIPOCONTRATO: number = 6;
const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
   selector: 'app-dotacion-equipos',
   templateUrl: './dotacion-equipos.component.html',
   styleUrls: ['./dotacion-equipos.component.sass'],
  /*  providers: [
      ContratosApiService
   ] */
})
export class DotacionEquiposComponent implements OnInit,OnDestroy {

   private iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));
   itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
   private resultQuery1: boolean = false;
   private resultQuery2: boolean = false;
   private subs = new Subscription()

   public dataTabla: any[] = [];
   public valTotalServ: number = 0;
   public digitoVerificacion = '';
   public numeroContratoInvalid: boolean = false;
   public iD_OperadorInvalid: boolean = false;
   public objetoContratoInvalid: boolean = false;
   public iD_TipoContratoCHIPInvalid: boolean = false;
   public iD_TipoContratacionInvalid: boolean = false;
   public publicadorSECOPInvalid: boolean = false;
   public iD_PlataformaContratoInvalid : boolean = false;
   public numeroProcesoRegistradoSECOPInvalid : boolean = false;
   public linkContratoSECOPInvalid : boolean = false;
   public fechaAdjudicacionInvalid : boolean = false;
   public fechaSuscripcionInvalid : boolean = false;
   public submitted : boolean = false;
   public showValidation: boolean = false;
   public plataformaSeleccionada: boolean = false;
   public valorTotalContratoInvalid: boolean = false;
   public fechalnicioContratoInvalid: boolean = false;
   public fechaFinalContratoInvalid: boolean = false;
   public nombreServicioInvalid: boolean = false;
   public conceptoInvalid: boolean = false;
   public valorTotalInvalid: boolean = false;
   public showPDFValidation: boolean = false;

   public dataService: any = {
      id: 0,
      iD_Contrato: 0,
      nombreServicio: '',
      concepto: '',
      valorTotal: null,
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      readonly: false,
      editInfo: false,
      addInfo: true
   }
   public activeAddService: boolean = false;
   public displayResults: boolean = false;
   public displayedColumnsContratos: any[] = [
      { descripcion: 'Nombre' },
      { descripcion: 'Concepto' },
      { descripcion: 'Valor' },
      { descripcion: '' }
   ];
   public dataServicios: any[] = [];
   public rubroAdd: boolean = false;
   public tieneRubros: boolean = false;
   public valTotalRubros: number = 0;


   public viewActiva: number = 0;
   public btnProductosDisab: boolean = true;
   public btnPolizasDisab: boolean = true;
   public srcPDF: any;
   public dataFuenteFinanciacion: any[] = [];
   public dataPestanas: any = [
      { id: 1, descripcion: 'Contratos', active: true }
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
      subTipoContratoId: SUB_TIPOCONTRATO,
      iD_TipoContratoCHIP: null,
      iD_TipoConceptoGasto: null,
      iD_ETC: this.iD_ETC,
      iD_ET: null,
      iD_MinutaPatronAlimento: null,
      iD_Operador: '',
      iD_TipoCategoriaContrato: null,
      iD_EstadoContrato: 0,
      iD_UTConsorcio: null,
      iD_PlanAlistamiento: null,
      iD_Vigencia: this.itemVigencia?.id,
      numeroContrato: '',
      objetoContrato: '',
      conAnticipo: false,
      fechalnicioContrato: null,
      fechaFinalContrato: null,
      estado: false,
      auditoria: LocalStorage.getAuditoria(''),
      valorTotalContrato: null,
      manejaPAEC: false,
      iD_TipoModeloOperacion: null,
      nombreArchivo: '',
      archivo: ''
   }
   public itemDetalleProcesoContrato: any = {
      id: 0,
      iD_Contrato: 0,
      iD_TipoContratacion: null,
      iD_PlataformaContrato: null,
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


   public listOperadores: any = [];
   public listContratoChip: any = [];
   public listModalidaContratacionChip: any = [];
   public listPerioricidadAmortizacion: any = [];
   public listFuentePresupuestal: any = [];
   public listTipoFuentePresupuestal: any = [];
   public listCrpsAsociados: any = [];

   constructor(
      private _contratosApiService: ContratosApiService,
      private router: Router,
      private _activeRouter: ActivatedRoute,
      private _modalService: NgbModal,
      private _messageService: MessageService
   ) { }

   ngOnInit(): void {
    this.activeAddService = false;
    this.displayResults = false;
    this.get_Operadores();
    this.get_ContratoChip();
      this._activeRouter.params.subscribe(params => {
         if (params['idContrato'] != undefined) {
            this.get_ContratoInfo(+params['idContrato']);
            this.get_ServiciosContrato(+params['idContrato']);
         }
      });
      this.get_ModalidaContratacionChip();
      this.get_PerioricidadAmortizacion();
   }

   ngOnDestroy(): void {
      if (this.subs) { this.subs.unsubscribe(); }
    }

   get_ServiciosContrato(idContrato: number) {
      this._contratosApiService.GetAllServicio(idContrato)
         .subscribe(response => {
              let servicios: any[] = response.result;
              if (servicios.length > 0) {
              servicios.forEach(element => {
                element.readonly = true;
                element.editInfo = false;
                element.addInfo = false;
              });
              this.dataTabla = servicios;
              this.valTotalServ = 0;
              this.dataTabla.forEach(serv => {
                this.valTotalServ += serv.valorTotal
              });
              this.displayResults = true;
            } else {
              this.dataTabla = [];
            }
         });
   }

   validarRubrosContrato() {
      if (this.valTotalServ < this.contrato.valorTotalContrato) {
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

   addServicio() {
      this.activeAddService = true;
//      this.displayResults = false;
/*       if(this.valTotalServ == this.contrato.valorTotalContrato){
         this._messageService.showWarning("Al agregar otro servicio, sobrepasara el valor total del contrato ingresado.", 'top center');
      } else if(this.rubroAdd != false){
         this._messageService.showWarning("Rubros adicionales activos - Debe tener en cuenta el valor de los rubros y el valor de Dotación," +
            " equipos o servicios. Si desea agregar mas servicios, desactive los rubros.", 'top center');

      } else {
 */       this.displayResults = true;
         if (this.rubroAdd) {
            this.rubroAdd = false;
         }
      //}
   }

   ChangeItem(value: any, name: any) {
      this.dataService[name] = value;
   }

   saveServicio() {
      let valid: boolean = this.validar();
      if (valid) {

         this._contratosApiService.CreateServicio(this.dataService)
            .subscribe(response => {
               if (response.success) {
                  this.activeAddService = false;
                  this._messageService.showInfo("Servicio agregado correctamente.", 'top center');
                  this.get_ServiciosContrato(this.contrato.id);

               } else {
                  this._messageService.showError('ERROR: ' + response.error, 'top center');
               }
               this.cancelItem();
            });
      }
   }


   deleteServ(idServicio: number) {
      var servicio = this.dataTabla.find(item => item.id == idServicio);
      this._contratosApiService.deleteServicio(servicio.id)
         .subscribe(response => {
            if (!response.result?.length) {
              this.displayResults = false;
              this.valTotalServ = 0;
            }

            if (response.success) {
              this.activeAddService = false;
              this._messageService.showInfo("Equipo, Dotación o Servicio '" + servicio.nombreServicio + "' eliminado exitosamente.", 'top center');
              this.get_ServiciosContrato(this.contrato.id);
            } else {
               this._messageService.showError('ERROR: ' + response.error, 'top center');
            }
         });
   }

   cancelItem() {
    this.activeAddService = false;
      this.dataService = {
         id: 0,
         iD_Contrato: 0,
         nombreServicio: '',
         concepto: '',
         valorTotal: null,
         estado: true,
         auditoria: LocalStorage.getAuditoria(''),
         readonly: false,
         editInfo: false,
         addInfo: true

      }
   }


   validar() {
        if (!this.dataService.nombreServicio || this.dataService.nombreServicio.trim() === '') {
          this.nombreServicioInvalid = true;
        } else {
          this.nombreServicioInvalid = false;
        }

        if (!this.dataService.concepto || this.dataService.concepto.trim() === '') {
          this.conceptoInvalid = true;
        } else {
          this.conceptoInvalid = false;
        }


        if (!this.dataService.valorTotal || this.dataService.valorTotal <= 0) {
          this.valorTotalInvalid = true;
        } else {
          this.valorTotalInvalid = false;
        }

     /*  if (this.valTotalServ + this.dataService.valorTotal > this.contrato.valorTotalContrato) {
         this._messageService.showWarning("Al agregar este servicio se supera el valor total del contrato.\n", 'top center');
         return false;
      } */


      if (this.dataService.iD_Contrato == 0) {
         this.dataService.iD_Contrato = this.contrato.id;
      }
      return true;
   }



   get_ContratoInfo(idContrato: number) {
      this._contratosApiService.get_SedesContratosHojaContrato(idContrato)
         .subscribe(response => {
            if (response.success) {
               let data: any = response.result.length > 0 ? response.result.shift() : {};
               this.contrato.subTipoContratoId = data.subTipoContratoId != null ? data.subTipoContratoId : 0;
               this.contrato.id = data.id_Contrato != null ? data.id_Contrato : 0;
               this.contrato.id_ETC = data.iD_ETC;
               this.contrato.TipoContratoId = data.tipoContratoId != null ? data.tipoContratoId : 0;
               this.contrato.iD_Vigencia = data.iD_Vigencia != null ? data.iD_Vigencia : this.itemVigencia?.id;
               this.contrato.iD_EstadoContrato = data.iD_EstadoContrato != null ? data.iD_EstadoContrato : 0;
               this.contrato.nombreArchivo = data.nombreArchivo != null ? data.nombreArchivo : '';
               this.contrato.archivo = data.nombreArchivo != null ? data.nombreArchivo : '';
               this.digitoVerificacion = data.digitoVerificacion;
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
               this.contrato.iD_TipoConceptoGasto = data.iD_TipoConceptoGasto != null ? data.iD_TipoConceptoGasto : 0;
               this.contrato.fechalnicioContrato = data.fechalnicioContrato != null ? new Date(data.fechalnicioContrato) : '';

               /**
                * vista caracteristicas financieras
                */
               this.contrato.valorTotalContrato = data.valorTotalContrato != null ? data.valorTotalContrato : 0;
               this.contrato.conAnticipo = data.conAnticipo != null ? data.conAnticipo : false;

               this.contrato.fechalnicioContrato = data.fechalnicioContrato != null ? moment(data.fechalnicioContrato).isBetween('1753-01-01', '9999-12-31') ? new Date(data.fechalnicioContrato) : null : null;
               this.contrato.fechaFinalContrato = data.fechaFinalContrato != null ? moment(data.fechaFinalContrato).isBetween('1753-01-01', '9999-12-31') ? new Date(data.fechaFinalContrato) : null : null;

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
            if (response.success) {
               let data: any = response.result.length > 0 ? response.result.shift() : {};

               this.itemDetalleProcesoContrato.id = data.id != null ? data.id : 0;
               this.itemDetalleProcesoContrato.iD_Contrato = idContrato;
               this.itemDetalleProcesoContrato.iD_TipoContratacion = data.iD_TipoContratacion != null ? data.iD_TipoContratacion : 0;
               this.itemDetalleProcesoContrato.iD_PlataformaContrato = data.iD_PlataformaContrato != null ? data.iD_PlataformaContrato : 0;
               this.itemDetalleProcesoContrato.publicadorSECOP = data.publicadorSECOP != null ? data.publicadorSECOP : false;
               this.itemDetalleProcesoContrato.numeroProcesoRegistradoSECOP = data.numeroProcesoRegistradoSECOP != null ? data.numeroProcesoRegistradoSECOP : '';
               this.itemDetalleProcesoContrato.linkContratoSECOP = data.linkContratoSECOP != null ? data.linkContratoSECOP : '';
               this.itemDetalleProcesoContrato.fechaAdjudicacion = data.fechaAdjudicacion != null ? new Date(data.fechaAdjudicacion) : '';
               this.itemDetalleProcesoContrato.fechaSuscripcion = data.fechaSuscripcion != null ? new Date(data.fechaSuscripcion) : '';
            } else {
               this._messageService.showError('ERROR: ' + response.error, 'top center');
            }
         });
   }

   get_AnticiposContrato(idContrato: number) {
      this._contratosApiService.get_AnticiposContratos(idContrato)
         .subscribe(response => {
            if (response.success) {
               let data: any = response.result.length > 0 ? response.result.shift() : {};
               this.anticipoContrato.id = data.id != null ? data.id : 0;
               this.anticipoContrato.iD_Contrato = idContrato;
               this.anticipoContrato.iD_tipoperiodicidad = data.iD_tipoperiodicidad != null ? data.iD_tipoperiodicidad : 0;
               this.anticipoContrato.valorAnticipo = data.valorAnticipo != null ? data.valorAnticipo : 0;
               this.anticipoContrato.porcentajeAnticipo = data.porcentajeAnticipo != null ? data.porcentajeAnticipo : 0;
               this.anticipoContrato.tipoPeriodicidadld = data.tipoPeriodicidadld != null ? data.tipoPeriodicidadld : 0;
               this.anticipoContrato.numeroPagos = data.numeroPagos != null ? data.numeroPagos : 0;
            } else {
               this._messageService.showError('ERROR: ' + response.error, 'top center');
            }
         });
   }

   productoServicio(disabled: boolean) {
      this.btnProductosDisab = disabled;
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

   anterior() {
      this.router.navigate(['/registroUnicoContratos']);
   }


   onSubmit(form: any): void {

     switch (this.viewActiva) {
         case 0:

         if (form.valid == true) {
            if (this.contrato.id === 0) { this.crearContrato(); } else { this.actualizarContrato(); }
            break;
          }
          else{
            if (!this.contrato.numeroContrato || this.contrato.numeroContrato.trim() === '') {
              form.numeroContrato;
              this.numeroContratoInvalid = true;
           } else {
              this.numeroContratoInvalid = false;
           }

           if (!this.contrato.iD_Operador) {
              this.iD_OperadorInvalid = true;
           } else {
              this.iD_OperadorInvalid = false;
           }

           if (!this.contrato.objetoContrato || this.contrato.objetoContrato.trim() === '') {
              this.objetoContratoInvalid = true;
           } else {
              this.objetoContratoInvalid = false;
           }

           if (!this.contrato.iD_TipoContratoCHIP) {
              this.iD_TipoContratoCHIPInvalid = true;
           } else {
              this.iD_TipoContratoCHIPInvalid = false;
           }
           break
          }
         case 1:

         if (form.valid == true) {
            if (this.itemDetalleProcesoContrato.id === 0) { this.crearProcesoContractual(); } else { this.actualizarProcesoContractual(); }
            this.validarRubrosContrato();
            break;
         }
         else{
          if (!this.itemDetalleProcesoContrato.iD_TipoContratacion) {
            this.iD_TipoContratacionInvalid = true;
          }else {
            this.iD_TipoContratacionInvalid = false;
          }
          if (!this.itemDetalleProcesoContrato.publicadorSECOP) {
            this.publicadorSECOPInvalid = true;
          }else {
            this.publicadorSECOPInvalid = false;
          }
            if (!this.itemDetalleProcesoContrato.iD_PlataformaContrato && this.itemDetalleProcesoContrato.publicadorSECOP) {
              this.iD_PlataformaContratoInvalid = true;
              this.publicadorSECOPInvalid = true;
            } else {
              this.iD_PlataformaContratoInvalid = false;
              this.publicadorSECOPInvalid = false;
            }
            if (!this.itemDetalleProcesoContrato.numeroProcesoRegistradoSECOP && this.itemDetalleProcesoContrato.publicadorSECOP) {
              this.numeroProcesoRegistradoSECOPInvalid = true;
              this.publicadorSECOPInvalid = true;
            } else {
              this.numeroProcesoRegistradoSECOPInvalid = false;
              this.publicadorSECOPInvalid = false;
            }
            if (!this.itemDetalleProcesoContrato.linkContratoSECOP && this.itemDetalleProcesoContrato.publicadorSECOP) {
              this.linkContratoSECOPInvalid = true;
              this.publicadorSECOPInvalid = true;
            } else {
              this.linkContratoSECOPInvalid = false;
              this.publicadorSECOPInvalid = false;
            }


          if (!this.itemDetalleProcesoContrato.fechaSuscripcion) {
            this.fechaSuscripcionInvalid = true;
          } else {
            this.fechaSuscripcionInvalid = false;
          }
          if (!this.itemDetalleProcesoContrato.fechaAdjudicacion) {
            this.fechaAdjudicacionInvalid = true;
          } else {
            this.fechaAdjudicacionInvalid = false;
          }
          break
         }

         case 2:
            if (moment(this.contrato.fechaFinalContrato).isBefore(this.contrato.fechalnicioContrato)) {
               this._messageService.showWarning('La fecha inicial del contrato debe ser inferior a la fecha de finalización', 'top center');
               return;
            }else{
              if (!this.contrato.valorTotalContrato) {
                this.valorTotalContratoInvalid = true;
              }else {
                this.valorTotalContratoInvalid = false;
              }
              if (!this.contrato.fechalnicioContrato) {
                this.fechalnicioContratoInvalid = true;
              }else {
                this.fechalnicioContratoInvalid = false;
              }
              if (!this.contrato.fechaFinalContrato) {
                this.fechaFinalContratoInvalid = true;
              }else {
                this.fechaFinalContratoInvalid = false;
              }

            }

            if (this.contrato.id != 0) {
               this.get_TotalGeneralContratado(this.contrato.id);
               if(this.tieneRubros && this.contrato.valorTotalContrato != (this.valTotalServ + this.valTotalRubros)){
                  this._messageService.showWarning("El valor del contrato no coincide con el costo total calculado por el sistema entre Servicios y Rubros registrados",
                     'top center');
                  return;
               }
               else if (!this.tieneRubros && (this.contrato.valorTotalContrato != this.valTotalServ)) {
                  this._messageService.showWarning("El valor del contrato no coincide con el costo total calculado por el sistema", 'top center');
                  return;
               }
               this.actualizarContrato();
               if (this.anticipoContrato.id === 0) { this.createCaracteristicasFinancieras(); } else { this.updateCaracteristicasFinancieras(); }
            }
            break;

         case 3:
            if (this.dataTotalGeneralContratado.totalCRP != this.dataTotalGeneralContratado.totalFuentesFinanciacion) {
               this._messageService.showWarning('La suma total de los crp debe ser igual a la suma total de las fuentes de financiación', 'top center');
               return;
            } else if (this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.dataTotalGeneralContratado.valorTotal) {
               this._messageService.showWarning('La suma total de las fuentes de financiación debe ser igual al valor total del contrato', 'top center');
               return;
            }

            if (this.contrato.nombreArchivo == '') {
               this.showPDFValidation = true;
               return;
            }

            this.contrato.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
            this.actualizarContrato();
            break;

    }
   }

   avanzar() {
      switch (this.viewActiva) {
         case 0:
            if (this.resultQuery1) {
               this.resetQuery();
               this.set_ViewActiva(1);
            }
            return;

         case 1:
            if (this.resultQuery1) {
               this.resetQuery();
               this.set_ViewActiva(2);
            }
            return;

         case 2:
            if (this.resultQuery1) {
               this.resetQuery();
               this.set_ViewActiva(3);
            }
            return;

         case 3:
            if (this.resultQuery1) {
               this.resetQuery();
               this.mostrarMensajeFinalizacion();
            }
            return;
      }
   }

   resetQuery() {
      this.resultQuery1 = false;
      this.resultQuery2 = false;
   }

   finalizar() {
      if (this.viewActiva == 1) {
            if (this.itemDetalleProcesoContrato.id === 0) {
            this.crearProcesoContractual();
        }
        else {
         this.actualizarProcesoContractual();
        }
      }
      this.actualizarContrato();
      this.mostrarMensajeFinalizacion();
   }

   mostrarMensajeFinalizacion() {
      this._messageService.showInfo('Se guardo el contrato.', 'top center');
      this.router.navigate(['/registro-contratos']);
   }

   crearContrato() {
      this.contrato.iD_ETC = this.iD_ETC;
      this._contratosApiService.CreateContrato(this.contrato)
         .subscribe(response => {
            if (response.success) {
               if (response.result != 0) {
                  this.contrato.id = response.result;
                  this.itemDetalleProcesoContrato.iD_Contrato = response.result;
                  this.anticipoContrato.iD_Contrato = response.result;
                  this.resultQuery1 = true;
                  this.avanzar();
               }
               else {
                  this._messageService.showError('ERROR: El numero de contrato ya existe ', 'top center');
               }
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   actualizarContrato() {
      this._contratosApiService.putContrato(this.contrato)
         .subscribe(response => {
            if (response.success) {
               this.resultQuery1 = true;
               this.avanzar();
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   crearProcesoContractual() {
      this._contratosApiService.postProcesoContractual(this.itemDetalleProcesoContrato)
         .subscribe(response => {
            if (response.success) {
               this.itemDetalleProcesoContrato.id = response.result;
               this.resultQuery1 = true;
               this.avanzar();
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   actualizarProcesoContractual() {
      this._contratosApiService.putProcesoContractual(this.itemDetalleProcesoContrato)
         .subscribe(response => {
            if (response.success) {
               this.resultQuery1 = true;
               this.avanzar();
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   createCaracteristicasFinancieras() {
      this._contratosApiService.postCaracteristicaFinanciera(this.anticipoContrato)
         .subscribe(response => {
            if (response.success) {
               this.anticipoContrato.id = response.result;
               this.resultQuery2 = true;
               this.avanzar();
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   updateCaracteristicasFinancieras() {
      this._contratosApiService.putCaracteristicaFinanciera(this.anticipoContrato)
         .subscribe(response => {
            if (response.success) {
               this.resultQuery2 = true;
               this.avanzar();
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   disabledSubPuntos(value: any, name: string, valBoolean: boolean) {
      switch (name) {
         case 'conAnticipo':
            this.contrato.conAnticipo = valBoolean;
            if (!valBoolean) {
               this.anticipoContrato.valorAnticipo = 0;
               this.contrato.valorTotalContrato = 0;
               this.anticipoContrato.porcentajeAnticipo = 0;
            }
            break;
      }
   }

   disableRubrosAdd(value: any, name: string, valBoolean: boolean) {
      if (!valBoolean && this.tieneRubros) {
         this._messageService.showWarning("Debe eliminar los Rubros Adcionales antes de realizar esta operación.", 'top center');
      }
      else {
         /* if (valBoolean && this.displayResults) {
            this.displayResults = false;
         } */
         this[name] = valBoolean;
      }
   }

   changeValorAnticipo(value: any) {
      this.anticipoContrato.valorAnticipo = this.contrato.valorTotalContrato * (this.anticipoContrato.porcentajeAnticipo / 100);
   }

   changeItemDetalleProcesoContrato(name: string, value: any) {
      this.itemDetalleProcesoContrato[name] = value;

      if (!value) {
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
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   get_Operadores() {
      this._contratosApiService.Get_AllOperadores()
         .subscribe(response => {
            if (response.success) {
               this.listOperadores = response.result;
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   get_ContratoChip() {
      this._contratosApiService.Get_AllContratoChip()
         .subscribe(response => {
            if (response.success) {
               this.listContratoChip = response.result;

            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   get_ModalidaContratacionChip() {
      this._contratosApiService.GetModalidadContratacionChip()
         .subscribe(response => {
            if (response.success) {
               this.listModalidaContratacionChip = response.result;
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   get_PerioricidadAmortizacion() {
      this._contratosApiService.GetAllPerioricidadAmortizacion()
         .subscribe(response => {
            if (response.success) {
               this.listPerioricidadAmortizacion = response.result;
            } else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
         });
   }

   set_ViewActiva(viewActiva: number) {
      this.viewActiva = viewActiva;
   }

   uploadPDF(nameElm: string, item: any, itemName: string, itemVal: string) {
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

   abrirPDF(contenido: any, item: any, nameItem: string) {

      if (item[nameItem] != null) {
         this.srcPDF = "data:application/pdf;base64," + item[nameItem];
         this._modalService.open(contenido, { size: 'xl' });
      }
   }

   dismissAllModal() {
      this._modalService.dismissAll();
   }

   validaRespuestaRubros(valRubros: any) {
      this.valTotalRubros = valRubros;
      this.validarRubrosContrato();
   }

   actualizarDigitoVerificacion(idOperador: number) {
      this.digitoVerificacion = this.listOperadores.find(operador => operador.id == idOperador).dv ?? 0;
   }
}
