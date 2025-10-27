import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MessageService } from 'src/app/services/message.service';
import { RutaEliminar } from '../desplegable-ruta/desplegable-ruta.component';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { AspNetUsersService } from "src/app/shared/services/AspNetUsers.services";
import { environment } from 'src/environments/environment';
import { LocalStorage } from 'src/app/static/local-storage';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';

import * as moment from 'moment';
import {
  PlanAlistamientoService,
  Ruta,
} from 'src/app/shared/services/plan-alistamiento.service';
export interface AsignacionSedes {
  iD_PlanAlistamiento: number;
  sedesAsignadas: number;
  sedesPorAsignar: number;
  rutasporModeloOperacion: boolean;
  estadoProceso: boolean;
}

const ID_ESTADO_PENDIENTE: number = 1;
const ID_ESTADO_INCOMPLETO: number = 2;
const ID_ESTADO_PENDIENTE_APROBACION: number = 3;
const ID_ESTADO_APROBADO: number = 4;
const ID_ESTADO_RECHAZADO: number = 5;

const ID_ESTADO_DOCUMENTO_APROBADO: number = 4;
const ID_ESTADO_DOCUMENTO_RECHAZADO: number = 3;

@Component({
  selector: 'app-plan-rutas',
  templateUrl: './plan-rutas.component.html',
  styleUrls: ['./plan-rutas.component.scss'],
})
export class PlanRutasComponent implements OnInit {
  @Input() idPlanAlistamiento: number;
  @Input() idMOperacion: number;
  @Input() idMOperacion1: number;
  @Input() idEstadoRuta: number;
  @Input() idEtc: number;
  @Input() idRowAprobacion: number;
  @Input() idOperador: number;
  @Output() estado: EventEmitter<any> = new EventEmitter();
  panelAbierto: boolean = false;
  idSeccion = 8;
  conModeloOperacion: string = 'no';
  sedesPorAsignar: number = 0;
  sedesPorAsignarMAEM: number = 0;
  sedesPorAsignarPAEPI: number = 0;
  sedesConRuta: number = 0;
  sedesConRutaMAEM: number = 0;
  sedesConRutaPAEPI: number = 0;
  rutas: Partial<Ruta>[] = [];
  rutasMAEM: Partial<Ruta>[] = [];
  rutasPAEPI: Partial<Ruta>[] = [];
  cantidadRutas: number = 0;
  cantidadRutasMAEM: number = 0;
  cantidadRutasPAEPI: number = 0;
  modeloOperacionTab: number = 0;
  numberBadge: string = '1';
  public ESTADO_VALIDACION_CREACION: number = 1;
  public ESTADO_VALIDACION_RECHAZADO: number = 3;
  public ESTADO_VALIDACION_APROBADO: number = 4;
  public NombreUsuario = localStorage.getItem('NombreUsuario');

  loadingVisible: boolean = false;
  idEstadoDocumentoAprobado: number = ID_ESTADO_DOCUMENTO_APROBADO;
  idEstadoDocumentoRechazado: number = ID_ESTADO_DOCUMENTO_RECHAZADO;

  idEstadoPendiente: number = ID_ESTADO_PENDIENTE;
  idEstadoIncompleto: number = ID_ESTADO_INCOMPLETO;
  idEstadoPendienteAprobacion: number = ID_ESTADO_PENDIENTE_APROBACION;
  idEstadoAprobado: number = ID_ESTADO_APROBADO;
  idEstadoRechazado: number = ID_ESTADO_RECHAZADO;
  AprobacionObject: AprobacionesModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: null,
    fecha: new Date,
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: LocalStorage.getAuditoria('Crear'),
    filtro: '',
    id_Rol: 0,
    sID_rol: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: false,
    isSelected: false,
    completed: false,
    plazoPorAprobar: new Date,


  };


  constructor(
    
    private mensajeServicio: MessageService,
    private planAlistamientoService: PlanAlistamientoService,
    private _seguridadService: SeguridadService,
    private aprobacionesService: AprobacionesService,
    private _contratosApiService : ContratosApiService,
    private aspNetUsersService: AspNetUsersService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
  ) {
  }
  displayedColumnsHistorico: string[] = [
    'Fecha',
    'Responsable',
    'Rol del <br> responsable',
    'Acci&oacute;n',
    'Observaciones / <br> justificaciones'
  ];
  dataHistoricoAprobaciones: any = [];
  itemAprobacion: any = {
    id:0,
    iD_PlanAlistamiento: 0,
    fechaAprobacion: new Date(),
    iD_EstadoRutas: 0,
    iD_EstadoDocumento:0,
    responsable: environment.responsable,
    rolResponsable: environment.rolResponsable,
    accion: "",
    observaciones: "",
    estado: true,
    auditoria: LocalStorage.getAuditoria('Crear')
  }

  planAlistamiento: any = {
    id:0,
    iD_EstadoRutas:0,
    auditoria: LocalStorage.getAuditoria('Crear')
  }
  itemRuta: any = {
    ID_PlanAlistamiento : 0,
    ID_EstadoValidacion: this.ESTADO_VALIDACION_CREACION,
    Estado:true,
    auditoria: LocalStorage.getAuditoria('Crear')
  };

  ngOnInit(): void {
    
    

    this.planAlistamientoService.setIdPlanAlistamiento(this.idPlanAlistamiento);
    this.planAlistamiento.iD_EstadoRutas=this.idEstadoRuta;
    this.RecargarDatos();
  }

  RecargarDatos () {
    this.planAlistamientoService
    .getSedesPorAsignar(this.idPlanAlistamiento)
    .subscribe((response) => {
      if (response.success) {
        this.obtenerSedesPorAsignar(response.result[0]);
        this.get_HistoricoAprobacionesPorRuta();
      } else {
        this.mensajeServicio.showError(
          'ERROR: ' + response.error,
          'top center'
        );
      }
    });
  this.obtenerInfoRutas();
  this.planAlistamientoService
    .getSedesPorAsignarModeloOperacion(
      this.idPlanAlistamiento,
      this.idMOperacion
    )
    .subscribe((response) => {
    });


  }

  obtenerInfoRutas(): void {
    const setRutas: any = [];
    
    this.planAlistamientoService.getRutas( this.idPlanAlistamiento).subscribe((result) => {
      this.rutas = result;
      /* this.rutas.map((ruta) =>
      setRutas.filter((item: Ruta) => item.id == ruta.id).length > 0
        ? null
        : setRutas.push(ruta)
    ); */
    this.cantidadRutas = setRutas.length;
    //this.rutas = setRutas;
    });
  
  }

  getModulePermission(module:number,action:string):boolean{
    return this._seguridadService.getModulePermission(module,action);
  }

  obtenerSedesPorAsignar(response: AsignacionSedes): void {
    this.sedesConRuta = response.sedesAsignadas;
    this.sedesPorAsignar = response.sedesPorAsignar;
  }

  seleccionModeloOperacion(event: MatButtonToggleChange): void {
    this.conModeloOperacion = event.source.value;
  }

  agregarRuta(): void {
    
    if (this.conModeloOperacion === 'no') {
      if (this.sedesPorAsignar > 0) {
        this.cantidadRutas++;
        this.itemRuta.iD_PlanAlistamiento = this.idPlanAlistamiento;
        this.planAlistamientoService.AddRutas(this.itemRuta).subscribe(response => {
          if(response.success){              
            this.cantidadRutas = response.result;
            const ruta: Partial<Ruta> = { iD_Ruta: this.cantidadRutas };
            this.rutas.push(ruta);
          }
          else{ this.mensajeServicio.showError('ERROR: '+ response.error, 'top center'); }
        });
      } else {
        this.mensajeServicio.showWarning(
          'No hay sedes por asignar a una ruta',
          'top center'
        );
      }
    } else {
      this.agregarRutaPorModeloOperacion(this.conModeloOperacion);
    }
  }

  agregarRutaPorModeloOperacion(modeloOperacion: string): void {
    switch (modeloOperacion) {
      case 'MAEM':
        if (this.sedesPorAsignarMAEM > 0) {
          this.cantidadRutasMAEM++;
          const rutaMAEM: Partial<Ruta> = { iD_Ruta: this.cantidadRutasMAEM };
          this.rutasMAEM.push(rutaMAEM);
          break;
        } else {
          this.mensajeServicio.showWarning(
            'No hay sedes por asignar a una ruta',
            'top center'
          );
          break;
        }
      case 'PAEPI':
        if (this.sedesConRutaPAEPI > 0) {
          this.cantidadRutasPAEPI++;
          const rutaPAEPI: Partial<Ruta> = { iD_Ruta: this.cantidadRutasPAEPI };
          this.rutasPAEPI.push(rutaPAEPI);
          break;
        } else {
          this.mensajeServicio.showWarning(
            'No hay sedes por asignar a una ruta',
            'top center'
          );
          break;
        }
      default:
        this.mensajeServicio.showWarning(
          'seleccione un modelo de operación',
          'top center'
        );
    }
  }

  changeItemAprobacionrutas(idEstado: number,Notificar: boolean)
  {
    this.planAlistamiento.iD_EstadoRutas = idEstado;
    this.planAlistamiento.id=this.idPlanAlistamiento;
    this._contratosApiService.putUpdateAlistamiento(this.planAlistamiento).subscribe(response => {
      if(response.success){      
        //this.registrarNotificacionService.registerNotification("Se ha enviado la ruta a aprobacion", "Coordinador PAE");        
        if(Notificar) {
          this._PA_RegistrarNotificacionService.registerNotification("Se ha enviado la ruta a aprobacion", "Coordinador PAE",this.idEtc.toString());
          this.crearlineaprobacion();
        }
        this.estado.emit(idEstado);
        this.RecargarDatos();
      }
      else{ this.mensajeServicio.showError('ERROR: '+ response.error, 'top center'); }
    });
  }

  cambioModeloOperacion(seleccion: number): void {
    this.modeloOperacionTab = seleccion;
  }

  eliminarRuta(rutaEliminar: RutaEliminar): void {
    
    let ruta = this.rutas.find(
      (ruta) => ruta.iD_Ruta === rutaEliminar.numeroRuta
    );
    let numSedesRuta = rutaEliminar.sedesRuta;
    let estadoActualizar = numSedesRuta == 1 ? this.idEstadoPendiente : numSedesRuta > 1 && this.sedesPorAsignar > 0 ? this.idEstadoIncompleto : this.idEstadoPendiente;
    if (rutaEliminar.sedesRuta > 0) {
      this.planAlistamientoService.eliminarRuta(ruta.iD_Ruta,0).subscribe(() => {
        this.changeItemAprobacionrutas(estadoActualizar,false);
        this.ngOnInit();
      });
    } else {
      this.rutas = this.rutas.filter((ruta) => ruta.iD_Ruta > 0);
    }
  }

  /*
  sedesPorAsignar: number = 0;
  sedesConRuta: number = 0;
  */

  actualizarestadorutas(Agregada: boolean): void {
    if(Agregada) {
      this.RecargarDatos();
      if (this.sedesPorAsignar==0 && this.planAlistamiento.iD_EstadoRutas == ID_ESTADO_APROBADO) {
          this.planAlistamiento.iD_EstadoRutas = ID_ESTADO_INCOMPLETO;
          this.estado.emit(this.idEstadoIncompleto);
      }
      else if(this.sedesPorAsignar > 0){
        this.changeItemAprobacionrutas(this.idEstadoIncompleto,false);
      }
    }
  }

  get_HistoricoAprobacionesPorRuta(){
    this.loadingVisible = true;

    this._contratosApiService.get_HistoricoAprobacionesPlanRutas(this.idPlanAlistamiento)
    .subscribe(response => {
      this.loadingVisible = false;

      if(response.success){
        response.result.map(function(item: any){
          item.fechaAprobacionString = moment(item.fechaAprobacion).format('DD-MMM-yyyy').toUpperCase();
          return item;
        });

        this.dataHistoricoAprobaciones = response.result.length > 0 ? response.result : [{}];
      }
      else{ this.mensajeServicio.showError('ERROR: ' + response.error, 'top center'); }
    });


  }

  changeItemAprobacion(name: string, value: any){
    this.itemAprobacion[name] = name == 'observaciones' ? value.trim() : value;
    if (name=='iD_EstadoDocumento' && value == this.idEstadoDocumentoAprobado )
    {
      this.itemAprobacion.accion ='Aprobado'
      this.itemAprobacion.iD_EstadoRutas= ID_ESTADO_DOCUMENTO_APROBADO;
      
    }
    else
    {
      this.itemAprobacion.accion ='Rechazado'
      this.itemAprobacion.iD_EstadoRutas= ID_ESTADO_DOCUMENTO_RECHAZADO;
      
    }
  }

  enviarResultado(){
    if(this.itemAprobacion.iD_TipoEstadoContrato <= 0){
      this.mensajeServicio.showWarning('Seleccione un tipo de estado aprobación.', 'top center');
      return;
    }

    if(this.itemAprobacion.observaciones.length == 0){
      this.mensajeServicio.showWarning('Digite la observacion/justificacion.', 'top center');
      return;
    }

    this.grabarAprobacion();
  }

  grabarAprobacion(){
    this.loadingVisible = true;
    this.itemAprobacion.iD_PlanAlistamiento=this.idPlanAlistamiento;
    this._contratosApiService.createAprobacionPlanRutas(this.itemAprobacion)
    .subscribe(response => {
      this.loadingVisible = false;
      if(response.success){
        this.numberBadge = '';
        this.planAlistamiento.id=this.idPlanAlistamiento;
        if (this.itemAprobacion.iD_EstadoRutas== ID_ESTADO_DOCUMENTO_APROBADO)
        {
          this.planAlistamiento.iD_EstadoRutas = ID_ESTADO_APROBADO;
          localStorage.setItem("PlanRutasState", "Aprobada");
          this.mensajeServicio.storageSub.next('changed');
        }
        else
        {
          this.planAlistamiento.iD_EstadoRutas = ID_ESTADO_RECHAZADO;
          localStorage.setItem("PlanRutasState", "Rechazado");
          this.mensajeServicio.storageSub.next('changed');
        }
        this._contratosApiService.putUpdateAlistamiento(this.planAlistamiento).subscribe(response => {
          if(response.success){              
            //Generar Notificacion a el usuario(s) asociados al operador
            this.registerNotificationByUbicacion("El coordinador ha " + this.itemAprobacion.accion + " la ruta" );
            //this._PA_RegistrarNotificacionService.registerNotificationByUser("El coordinador ha" + this.itemAprobacion.accion + " la ruta" , this.NombreUsuario);
            this.RecargarDatos();
            this.estado.emit(this.planAlistamiento.iD_EstadoRutas)
          }
          else{ this.mensajeServicio.showError('ERROR: '+ response.error, 'top center'); }
        });
      }
      else{ this.mensajeServicio.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  crearlineaprobacion(){
    this.AprobacionObject.id = 0;
    this.AprobacionObject.iD_AccionAprobacion = 1;
    if (this.itemAprobacion.observaciones == '') {
      this.AprobacionObject.observaciones = 'Ninguno'
    } else {
      this.AprobacionObject.observaciones = this.itemAprobacion.observaciones;
    }
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    if (this.idEtc!=0)
    {
      this.AprobacionObject.iD_ETC = this.idEtc;
    }
    this.AprobacionObject.id_Secciones = this.idSeccion;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 6;
    this.AprobacionObject.ubicacionOrigen = this.idPlanAlistamiento.toString();
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
      (response) => {
      });

  }

  registerNotificationByUbicacion(mensaje: string) {
    const Ubicacion: string ="Operadores";
    
    
    this.aspNetUsersService.getAspNetUsersListFilterByUbicacion(Ubicacion , this.idOperador)
    .forEach(res => {
          this._PA_RegistrarNotificacionService.registerNotificationByUserId(mensaje, res[0].id.toString()); 
        });
  }

  Actualizarlineaprobacionplan(){
    if (this.idRowAprobacion!=0)
    {
      this.AprobacionObject.id = this.idRowAprobacion;
      this.AprobacionObject.iD_AccionAprobacion = 1;
      if (this.itemAprobacion.observaciones == '') {
        this.AprobacionObject.observaciones = 'Ninguno'
      } else {
        this.AprobacionObject.observaciones = this.itemAprobacion.observaciones;
      }
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      if (this.idEtc!=0)
      {
        this.AprobacionObject.iD_ETC = this.idEtc;
      }
        this.AprobacionObject.id_Secciones = this.idSeccion;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 6;
      this.AprobacionObject.fechaAprobacion = this.itemAprobacion.fechaAprobacion
      this.AprobacionObject.ubicacionOrigen = this.idPlanAlistamiento.toString();
      this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
      this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(
        (response) => {
        });
    }

  }

}
