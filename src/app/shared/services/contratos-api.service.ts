import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators'
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { AspNetUsersService } from "src/app/shared/services/AspNetUsers.services";
import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';

const ID_ESTADO_EN_APROBACION: number = 1;
const ID_ESTADO_APROBADO: number = 3;
const ID_ESTADO_RECHAZADO: number = 2;


@Injectable({
  providedIn: "root",
})

export class ContratosApiService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };

  constructor(
    private http: HttpClient,
    private aprobacionesService: AprobacionesService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private aspNetUsersService: AspNetUsersService,
    ) { }

  private buildAudit(accion: string): string {
    let auditoria: string = "{'RolBase':'"+ localStorage.getItem("RolBase") +"'},"+
                            "{'RolPersonalizado':'"+ localStorage.getItem("RolPersonalizado") +"'},"+
                            "{'NombreUsuario':'"+ localStorage.getItem("NombreUsuario") +"'},"+
                            "{'Ubicacion':'"+ localStorage.getItem("Ubicacion") +"'},"+
                            "{'IpPublica':'"+ localStorage.getItem("IpPublica") +"'},"+
                            "{'Accion':'"+ accion +"'},"+
                            "{'Browser':'"+ localStorage.getItem("Browser") +"'},"+
                            "{'NombreMaquina':'"+ localStorage.getItem("NombreMaquina") +"'}";

    return auditoria;
}


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
  auditoria: '',
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


private crearlineaprobacioncontrato( observaciones : string , idEtc: number , idSeccion: number , idUbicacion: number){
  this.AprobacionObject.id = 0;
  this.AprobacionObject.iD_AccionAprobacion = 1;
  if (observaciones == '') {
    this.AprobacionObject.observaciones = 'Ninguno'
  } else {
    this.AprobacionObject.observaciones = observaciones;
  }
  this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
  if (idEtc!=0)
  {
    this.AprobacionObject.iD_ETC = idEtc;
  }
  this.AprobacionObject.id_Secciones = idSeccion;
  this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
  this.AprobacionObject.id_Ubicacion = 6;
  this.AprobacionObject.ubicacionOrigen = idUbicacion.toString();
  this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
  this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
    (response) => {
    });

}

private actualizarlineaprobacioncontrato(idRowAprobacion: number ,observaciones : string, idEtc: number,  idSeccion: number , idUbicacion: number, fechaAprobacion: string){
  if (idRowAprobacion!=0)
  {
    this.AprobacionObject.id = idRowAprobacion;
    this.AprobacionObject.iD_AccionAprobacion = 1;
    if (observaciones == '') {
      this.AprobacionObject.observaciones = 'Ninguno'
    } else {
      this.AprobacionObject.observaciones = observaciones;
    }
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    if (idEtc!=0)
    {
      this.AprobacionObject.iD_ETC = idEtc;
    }
      this.AprobacionObject.id_Secciones = idSeccion;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 6;
    //this.AprobacionObject.fechaAprobacion = fechaAprobacion
    this.AprobacionObject.ubicacionOrigen = idUbicacion.toString();
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(
      (response) => {
      });
  }

}

private registerNotificationByUbicacion(mensaje: string,idOperador : number ) {
  const Ubicacion: string ="Operadores";
  
  
  this.aspNetUsersService.getAspNetUsersListFilterByUbicacion(Ubicacion , idOperador)
  .forEach(res => {
        this._PA_RegistrarNotificacionService.registerNotificationByUserId(mensaje, res[0].id.toString()); 
      });
}

  // Get
  public Get_AllContratoChip(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposContratoCHIP/GetAllContratosTiposContratoCHIP`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public Get_AllOperadores(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}Operador/GetAll`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public Get_Operadores(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}Operador/OperadoresGetAll`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public Get_Operador(idOperador: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}Operador/GetOperador/${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosPorOperador(iD_Operador: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosUTConsorciosOperadores/GetContratosPorOperador/${iD_Operador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

    // Get
    public GetContratosContratoDescentralizadoGetId(iD_Contrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/GetContratosContratoDescentralizadoGetId?Id_Contrato=${iD_Contrato}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }


    // Get
    public get_ContratosConfiguracion(iD_TipoContrato: number, iD_SubTipoContrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosConfiguracion/${iD_TipoContrato}/${iD_SubTipoContrato}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }

  // Get
  public get_ParticipacionOperador(iD_Operador: number, iD_Vigencia: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}Operador/GetParticipacionOperador/${iD_Operador}/${iD_Vigencia}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosPorOperadorUnion(iD_Operador: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosUTConsorciosOperadores/GetContratosPorOperadorUnion/${iD_Operador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

    // Get
    public get_ContratosDescentralizadoGetID(id_contrato: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosDescentralizadoGetID/${id_contrato}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // Post
    public createContratoDescentralizado(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratoDescentralizado/AddContratoDescentralizado/`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // Get
    public get_ContratosListDescentralizado(nro_contrato?: string, id_operador?: number,id_tipoContrato?: number,id_vigencia?: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosListDescentralizado/${nro_contrato == undefined ? '-' : nro_contrato}/${id_operador == undefined ? 0 : id_operador}/${id_tipoContrato  == undefined ? 0 : id_tipoContrato}/${id_vigencia == undefined ? 0 : id_vigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    //Delete
    public deleteContratoDescentralizado(id: any): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratoDescentralizado/DeleteContratoDescentralizado/${id}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    // Get
  public get_SubtiposContratacion(iD_Contrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosSubTiposContratacion/ContratosSubTiposContratacionGetID/${iD_Contrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Post
  public createOperador(param: any): Observable<dataresult> {
    param.auditoria = this.buildAudit('Crear');
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Origin', '*');

      return this.http.post<dataresult>(`${environment.apiURI_Contratos}Operador/Create/`, param, {headers})
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Post
  public createAprobacion(param: any): Observable<dataresult> {
    param.auditoria = this.buildAudit('Aprobar');
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}Operador/CreateOperadoresAprobacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Post
  public createContrato(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/AddContratosContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public updateContrato(param: any): Observable<dataresult> {
    if (param.iD_EstadoContrato==ID_ESTADO_EN_APROBACION) {
      if(param.idOperador) {
        this.registerNotificationByUbicacion("se ha creado un nuevo contrato",param.idOperador)
      }  
      this.crearlineaprobacioncontrato('Ninguno',param.idEtc,4,param.idContrato);
   }

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_DetallesSumRacionesMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DetallesSumRacionesMAEMGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_DetallesSumRacionesMAER(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DetallesSumRacionesMAERGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_DetallesSumRacionesMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DetallesSumRacionesMAIPGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get //Inicio - PAEC a eliminar
  public get_DetallesSumRacionesPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DetallesSumRacionesPAECGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }//Fin - PAEC a eliminar

  // Get
  public get_TiposPlataformaContratacion(): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposPlataformaContratacion/GetAllContratosTiposPlataformaContratacion`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public get_ContratosSumRacionesContratadasDiarias(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumRacionesContratadasDiariasGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public get_ContratosSumRacionesSedesBeneficiarias(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumRacionesSedesBeneficiariasGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosDetallesSumRacionesMAEM(param: any): Observable<dataresult> {
     
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosDetallesSumRacionesMAEM/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosDetallesSumRacionesMAER(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosDetallesSumRacionesMAER/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosDetallesSumRacionesMAIP(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosDetallesSumRacionesMAIP/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put //Inicio - PAEC a eliminar
  public put_UpdateContratosDetallesSumRacionesPAEC(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosDetallesSumRacionesPAEC/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }//Inicio - PAEC a eliminar

  // Put
  public put_UpdateContratosCaracteristicasFinancierasMAEM(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosCaracteristicasFinancierasMAEM/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosCaracteristicasFinancierasMAER(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosCaracteristicasFinancierasMAER/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosCaracteristicasFinancierasMAIP(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosCaracteristicasFinancierasMAIP/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosCaracteristicasFinancierasPAEC(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosCaracteristicasFinancierasPAEC/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  //Compras Locales
   // Get
   public get_ContratosModificacionPolizasCompraLocalesContrato(idContrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasCompraLocalesContrato/ContratosModificacionPolizasCompraLocalesContratoGetId/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Post
  public post_AddContratosModificacionPolizasCompraLocalesContrato(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasCompraLocalesContrato/AddContratosModificacionPolizasCompraLocalesContrato/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public put_UpdateContratosModificacionPolizasCompraLocalesContrato(param: any): Observable<dataresult> {

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasCompraLocalesContrato/UpdateContratosModificacionPolizasCompraLocalesContrato/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

    // Get
    public get_detallesSumRacionesPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DetallesSumRacionesPAECGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }

    // Get
    public getAllPolizasByIdContrato(iD_Contrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/GetAllPolizasByIdContrato/${iD_Contrato}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }

    // Get
    public getContratosPolizasCompraLocalesContrato(iD_Contrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasCompraLocalesContrato/ContratosModificacionPolizasCompraLocalesContratoGetId/${iD_Contrato}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }


    public getInformacionPresupuestalGetId(iD_Contrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/InformacionPresupuestalGetId/${iD_Contrato}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );

    }




  // Get
  public get_SumRacionesPreciosMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number, iD_Zona: number, iD_NivelEducativo: number, manejaPreciosPorZona: boolean, manejaPreciosPorNivelEducativo: boolean): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesPreciosMAEMGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${iD_Zona}/${iD_NivelEducativo}/${manejaPreciosPorZona}/${manejaPreciosPorNivelEducativo}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumContratoRacionesValorTotalMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_Dias_Contratado: number,iD_Zona: number, iD_NivelEducativo: number, manejaPreciosPorZona: boolean, manejaPreciosPorNivelEducativo: boolean): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesValorTotalMAEMGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_Dias_Contratado}/${iD_Zona}/${iD_NivelEducativo}/${manejaPreciosPorZona}/${manejaPreciosPorNivelEducativo}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumRacionesPreciosMAER(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesPreciosMAERGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumContratoRacionesValorTotalMAER(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_Dias_Contratado: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesValorTotalMAERGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_Dias_Contratado}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumRacionesPreciosMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number,iD_Zona: number, iD_NivelEducativo: number, manejaPreciosPorZona: boolean, manejaPreciosPorNivelEducativo: boolean): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesPreciosMAIPGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${iD_Zona}/${iD_NivelEducativo}/${manejaPreciosPorZona}/${manejaPreciosPorNivelEducativo}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumContratoRacionesValorTotalMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_Dias_Contratado: number,iD_Zona: number, iD_NivelEducativo: number, manejaPreciosPorZona: boolean, manejaPreciosPorNivelEducativo: boolean): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesValorTotalMAIPGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_Dias_Contratado}/${iD_Zona}/${iD_NivelEducativo}/${manejaPreciosPorZona}/${manejaPreciosPorNivelEducativo}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumRacionesPreciosPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesPreciosPAECGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumContratoRacionesValorTotalPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_Dias_Contratado: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumContratoRacionesValorTotalPAECGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_Dias_Contratado}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumCaracteristicaFinancieras(iD_Contrato: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosDescentralizadoGetID/${iD_Contrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get
  public get_TotalRacionesMAEM(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: any): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalRacionesContratadasMAEMGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_TotalRacionesMAER(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalRacionesContratadasMAERGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_TotalRacionesMAIP(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalRacionesContratadasMAIPGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get //Inicio - PAEC a eliminar
  public get_TotalRacionesPAEC(iD_Contrato: number, iD_TipoModeloOperacion: number, nro_DiasContratados: any): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalRacionesContratadasPAECGet/${iD_Contrato}/${iD_TipoModeloOperacion}/${nro_DiasContratados}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }//Fin - PAEC a eliminar

  // Get
  public get_ContratosSedesJoranada(iD_ETC: number, iD_TipoModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSedesJornadaGet/${iD_ETC}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SedesContratoModeloOperacion(iD_Contrato: number, iD_TipoModeloOperacion: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSedesContratoModeloOperacionGet/${iD_Contrato}/${iD_TipoModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosContratosModelosGetID(iD_Contrato: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratosModelos/ContratosContratosModelosGetID/${iD_Contrato}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) //then handle the error
      );
  }

  // Post
  public agregarContratoModelo(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratosModelos/AddContratosContratosModelos`, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  // Delete
  public eliminarContratoModeloPorId(idContratoModelo: any): Observable<dataresult> {
    return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosContratosModelos/DeleteContratosContratosModelos/${idContratoModelo}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }


  // Put
  public actualizarContratoModelo(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratosModelos/UpdateContratosContratosModelos`, param)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  // Get
  public get_SedesContratosHojaContrato(iD_Contrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosHojaContrato/${iD_Contrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SedeContratoModeloMaer(iD_Contrato: number, iD_ModeloOperacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/GetSedeContratoModeloMaer/${iD_Contrato}/${iD_ModeloOperacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }


  // Post
  public agregarSedesBeneficiarias(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/AddContratosSedesJornada/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Delete
  public eliminarSedesBeneficiarias(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DeleteContratosSedesJornada/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Delete
  public eliminarSedesBeneficiariasPAEC(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/DeleteContratosSedesJornada/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Post
  public createDetalleprocesoContrato(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/AddContratosDetallesProcesoContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public updateOperador(param: any): Observable<dataresult> {
    param.auditoria = this.buildAudit('Actualizar');
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}Operador/Update/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosUTConsorciosOperadores(idOperador: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosUTConsorciosOperadores/GetContratosUTConsorciosOperadores?Id_Consorcio=${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosAprobacionGetIDs(idOperador: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosAprobacion/ContratosAprobacionGetID/${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ContratosGetAll(idMunicipio: any, numeroContrato: any, idContrato: any, idOperador: any): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosGetAll/${idMunicipio}/${numeroContrato}/${idContrato}/${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  //param: any
  public get_ContratosAlistamientoAll(idModelo: any, numeroContrato: any, idContrato: any, idOperador: any ,ID_ETC: any , ID_ET : any ): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosPlanesAlistamiento/ContratosPlanesAlistamientoGetAll/${idModelo}/${numeroContrato}/${idOperador}/${ID_ETC}/${ID_ET}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // put
  //put
  public putUpdateAlistamiento(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosPlanesAlistamiento/UpdateContratosAlistamiento/`, param)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }


  // Get
  public get_ContratosModificacion(idOperador: number): Observable<dataresult> {

    //https://sige-pae-contratos-api.azurewebsites.net/api/
    //return this.http.get<dataresult>(`http://52.151.243.21/sige-pae-contratos-api/ContratosModificacionGetID/${idOperador}`)

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacion/ContratosModificacionGetID/${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }


  // Get
  public get_HistoricoAprobacionesPorOperador(idOperador: number): Observable<dataresult> {
    
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}Operador/GetHistoricoAprobacionesPorOperador/${idOperador}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SubTiposRegistroMercantil(iD_TipoRegistroMercantil: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}SubTiposRegistroMercantil/GetSubTiposRegistroMercantil/${iD_TipoRegistroMercantil}/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_TiposIdentificacion(): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}TiposIdentificacion/GetTiposIdentificacion/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_TiposRegistroMercantil(): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}TiposRegistroMercantil/GetTiposRegistroMercantil/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public GetTiposContrato(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}TiposContratos/GetTiposContratos/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public GetTiposContratacion(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposContratacion/GetAllContratosTiposContratacion/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_ConceptosGasto(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposConceptoGasto/GetAllContratosTiposConceptoGasto/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  //Post
  public CreateContrato(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/AddContratosContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //put
    public putContrato(param: any): Observable<dataresult> {
     if (param.iD_EstadoContrato==ID_ESTADO_EN_APROBACION) {
      this.registerNotificationByUbicacion("se ha creado un nuevo contrato",param.iD_Operador)
      this.crearlineaprobacioncontrato('Ninguno',param.iD_ETC,4,param.id);
     }
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //Post
    public postProcesoContractual(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/AddContratosDetallesProcesoContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //put
    public putProcesoContractual(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/UpdateContratosDetallesProcesoContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //put
    public getProcesoContractual(idContrato: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/GetIdContratosDetallesProcesoContratos/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //Post
    public postCaracteristicaFinanciera(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosAnticiposContratos/AddContratosAnticiposContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

  //Post
  public PostContratosModificacion(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Modificaciones}ContratosModificacion/AddContratosModificacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Put
  public UpdateContratosModificacion(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Modificaciones}ContratosModificacion/UpdateContratosModificacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

    //Post
    public PostContratosDataVariable(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Modificaciones}ContratosModificacion/AddContratosDataVariable/`, param)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
    }

    //put
    public putCaracteristicaFinanciera(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosAnticiposContratos/UpdateContratosAnticiposContratos/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

  //get
  public GetTotalGeneralContratadosModificacion(itemOne:any, itemTwo:any, itemThree:any, itemFour:any): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Modificaciones}ContratosModificacion/TotalGeneralContratadoAdicionReduccion/${itemOne}/${itemTwo}/${itemThree}/${itemFour}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  //get
  public GetModalidadContratacionChip(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposContratacion/GetAllContratosTiposContratacion/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  //get
  public GetAllPerioricidadAmortizacion(): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTiposPeriodicidadGetAll/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //get
  public GetAllTipoPoliza(): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasTiposPolizas/GetAllContratosModificacionPolizasTiposPolizas/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  //get
  public GetAllFuentePresupuestalPoliz(IdContrato: number): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/ContratosFuentesFinanciacionGetId/${IdContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

 //put
 public UpdateFuentesFinanciacion(param: any): Observable<dataresult> {
  return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/UpdateContratosFuentesFinanciacion/`, param)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}


  //get
  public GetContratosModificacionGetID(IdContrato: number): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacion/ContratosModificacionGetID/${IdContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //get
  public GetAllTipoFuentePresupuestal(idFuenteFinanciacio: number): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}RegistroPagosCDPs/GetAllRegistroPagosCDPs/${idFuenteFinanciacio}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //get
  public GetCrpsAsociados(idCDP: number): Observable<dataresult>  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosCRPs/GetAllContratosCRPs/${idCDP}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  //Crud Polizas Contrato
  //Get GetAllPolizasByIdContrato
  public GetAllPolizas(param: any): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/ContratosPolizasModifiGetId/${param}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Post
  public CreatePoliza(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/AddContratosModificacionPolizasPolizas/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //put
  public UpdatePoliza(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/UpdateContratosModificacionPolizasPolizas/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //delete
  public deletePoliza(param: any): Observable<dataresult> {
    return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/DeleteContratosModificacionPolizasPolizas/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  //Crud Productos
  //Get
  public GetAllProducto(param: any): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumDotacion/GetIdContratosDetallesSumDotacion/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Post
  public CreateProducto(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumDotacion/AddContratosDetallesSumDotacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //put
  public UpdateProducto(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumDotacion/UpdateContratosDetallesSumDotacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //delete
  public deleteProducto(param: any): Observable<dataresult> {
    return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumDotacion/DeleteContratosDetallesSumDotacion/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

    // Crud fuente financiacion
    //Post
    public postFuenteFinanciacion(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/AddContratosFuentesFinanciacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //Put
    public putFuenteFinanciacion(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/UpdateContratosFuentesFinanciacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //Delete
    public deleteFuenteFinanciacion(param: any): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/DeleteContratosFuentesFinanciacion/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }


    //post
    public postCdpFuente(param: any): Observable<dataresult> {

      return this.http.post<dataresult>(`${environment.apiURI_Contratos}RegistroPagosCDPs/AddRegistroPagosCDPs/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    public putCdpFuente(param: any): Observable<dataresult> {

      return this.http.put<dataresult>(`${environment.apiURI_Contratos}RegistroPagosCDPs/UpdateRegistroPagosCDPs/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    public deleteCdpFuente(id: number): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_Contratos}RegistroPagosCDPs/DeleteRegistroPagosCDPs/${id}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //post
    public postCrpCdpFuente(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosCRPs/AddContratosCRPs/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //put
    public putCrpCdpFuente(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosCRPs/UpdateContratosCRPs/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //delete
    public deleteCrpCdpFuente(idCrp: number): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosCRPs/DeleteContratosCRPs/${idCrp}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //post
    public getAllConveniosAportes(idBolsa: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosAportes/ContratosConveniosAportesGetID/${idBolsa}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //post
    public postConveniosAportes(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosAportes/AddContratosConveniosAportes/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //post
    public deleteConveniosAportes(param: any): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosAportes/DeleteContratosConveniosAportes/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //get
    public getTotalGeneralContratado(iD_Contrato: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalGeneralContratado/${iD_Contrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //get
    public getTotalGeneralContratadoSeguimientoFinancieron(param: any): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}SeguimientoFinancieroInformacionPresupuestal/InformacionPresupContDescenResumenID/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //get
    public get_EtEtc(): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosET/ContratosConveniosETETCGetAll/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //get
    public get_EtsByIdContrato(idContrato: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosET/ContratosConveniosETETCGetID/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //put
    public post_Ets(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosConveniosET/UpdateContratosConveniosETETC/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

    //Crud Servicios
  //Get
  public GetAllServicio(param: any): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/ContratosDetallesSumServiciosGetID/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Post
  public CreateServicio(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/AddContratosDetallesSumServicios/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //put
  public UpdateServicio(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/UpdateContratosDetallesSumServicios/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //delete
  public deleteServicio(param: any): Observable<dataresult> {
    return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/DeleteContratosDetallesSumServicios/${param}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

// Get
public Get_AllTiposPeriodicidad(): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTiposPeriodicidadGetAll`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

// Get
public Get_AllContratosTiposContratacion(): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosTiposContratacion/GetAllContratosTiposContratacion`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

// Put
public put_UpdateContratos(param: any): Observable<dataresult> {
  if (param.iD_EstadoContrato==ID_ESTADO_EN_APROBACION) {
    this.registerNotificationByUbicacion("se ha creado un nuevo contrato",param.idOperador)
    this.crearlineaprobacioncontrato('Ninguno',param.idEtc,4,param.idContrato);
}

  return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateContratosContratos`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

//Post
public post_AddContratos(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/AddContratosContratos`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

//Anticipos contratos
//Get
public get_AnticiposContratos(idContrato: number): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosAnticiposContratos/ContratosAnticiposContratosGetID/${idContrato}`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

public get_PlanAnticiposGetID(iD_Contrato: number): Observable<dataresult> {

  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosPlanAnticiposGetIDGet/${iD_Contrato}`)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}

//Post
public post_AddAnticiposContratos(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosAnticiposContratos/AddContratosAnticiposContratos`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

//Post Detalles proceso contratos
public post_AddDetallesProcesoContratos(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesProcesoContratos/AddContratosDetallesProcesoContratos`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

// Get
public GetTiposPolizas(): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasTiposPolizas/GetAllContratosModificacionPolizasTiposPolizas/`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );

}

//Post Polizas
public post_AddPolizas(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/AddContratosModificacionPolizasPolizas`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

// Get
public GetAllPolizasByIdContrato(IdContrato: number): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosModificacionPolizasPolizas/GetAllPolizasByIdContrato/${IdContrato}`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

// Get
public GetTotalesByIdContrato(IdContrato: number): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosTotalGeneralContratado/${IdContrato}`)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}


public postCrpFuente(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosCRPs/AddContratosCRPs/`, param)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

// Materia Prima
public get_AllMateriPrima(param: any): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumMaPriOperador/ContratosDetallesSumMatPrimaGetIDGet/${param}`)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

public post_MateriPrima(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumMaPriOperador/AddContratosDetallesSumMaPriOperador/`, param)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

public post_UpdateMateriPrima(param: any): Observable<dataresult> {
  return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumMaPriOperador/UpdateContratosDetallesSumMaPriOperador/`, param)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

public delete_MateriaPrima(param: any): Observable<dataresult> {
  return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumMaPriOperador/DeleteContratosDetallesSumMaPriOperador/${param}`)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

//Suministros detalle
//Get
public get_SuministroDetalle(IdContrato: number): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumLogistico/ContratosDetallesSumLogisticoGetID/${IdContrato}`)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

//Post
public post_SuministroDetalle(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumLogistico/AddContratosDetallesSumLogistico/`, param)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

//put
public put_SuministroDetalle(param: any): Observable<dataresult> {
  return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumLogistico/UpdateContratosDetallesSumLogistico/`, param)
  .pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
}

// Post
public createAprobacionContrato(param: any): Observable<dataresult> {

  return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosAprobacion/AddContratosAprobacion/`, param)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

  // Get
  public get_HistoricoAprobacionesPorContrato(idContrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosAprobacion/ContratosAprobacionGetID/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Get
  public get_SumRacionesSedesBeneficSinJornada(idContrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosSumRacionesSedesBenefiSinJornada/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Put
  public put_UpdateEstadoContrato(param: any): Observable<dataresult> {

   if (param.iD_EstadoContrato==ID_ESTADO_EN_APROBACION) {
      this.registerNotificationByUbicacion("se ha creado un nuevo contrato",param.idOperador)
      this.crearlineaprobacioncontrato('Ninguno',param.idEtc,4,param.idContrato);
   }
   else
   {
      this.registerNotificationByUbicacion("El contrato ha sido " + param.accion ,param.idOperador)
      this._PA_RegistrarNotificacionService.registerNotification("El contrato ha sido " + param.accion, "Coordinador PAE",'');
      this._PA_RegistrarNotificacionService.registerNotification("El contrato ha sido " + param.accion, "Líder Técnico",'');
      this._PA_RegistrarNotificacionService.registerNotification("El contrato ha sido " + param.accion, "Líder financiero",'');
      this._PA_RegistrarNotificacionService.registerNotification("El contrato ha sido " + param.accion, "Subdirección Técnica de Fortalecimiento",'');
      this.actualizarlineaprobacioncontrato(param.idRowAprobacion,'aprobado',param.idEtc,4,param.idOperador,param.fechaAprobacion.toString())
   }

    return this.http.put<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/UpdateEstadoContratos/`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  // Get
  public get_FuentesFinanciacion(idContrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/InformacionPresupuestalGetId/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get
  public get_FuentesFinanciacionModif(idContrato: number, idModificacion: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosFuentesFinanciacion/InformacionPresupuestalModificacionGetId/${idContrato}/${idModificacion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

   // Get
   public getInformacionContratroById(idContrato: number): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/ContratosGetId/${idContrato}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Get
  public GetSubTiposContratacionByTipoContratoId(tipoContratoId: number) : Observable<dataresult>
  {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/GetSubTiposContratacionByTipoContratoId?TipoContratoId=${tipoContratoId}`)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  //Get
  public Get_RubrosAdicionales(idContrato: number) : Observable<dataresult>{
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/Get_RubrosAdicionales/${idContrato}`)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  //Post
  public Add_RubrosAdicionales(param: any) : Observable<dataresult>{
    return this.http.post<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/Add_RubrosAdicionales/`, param).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  //Delete
  public Delete_RubrosAdicionales(idRubro: number) : Observable<dataresult>{
    return this.http.delete<dataresult>(`${environment.apiURI_Contratos}ContratosDetallesSumServicios/Delete_RubrosAdicionales/${idRubro}`).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  //Get
  public Get_SedesContratoZonaNivelEducativoModelo(idContrato: number, idTipoModeloOperacion: number, idZona: number) : Observable<dataresult>{
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/SedesContratoZonaNivelEducativoModeloGet/${idContrato}/${idTipoModeloOperacion}/${idZona}`)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

    //Get
    public Get_SedesContratoZonaModeloOperacion(idContrato: number, idTipoModeloOperacion: number) : Observable<dataresult>{
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}ContratosContratos/SedesContratoZonaModeloOperacionGet/${idContrato}/${idTipoModeloOperacion}`)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
    }
  
  // Errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

   // Bolsa comun
   // Get
  public get_BolsaComunGetAll(): Observable<dataresult> {

    return this.http.get<dataresult>(`${environment.apiURI_Contratos}BolsaComun/BolsaComunGetAll`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

     // Get
     public get_BolsaComunGetID(idBolsa: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}BolsaComun/BolsaComunGetID/${idBolsa}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
  
    }
  
// Post
public createBolsaComun(param: any): Observable<dataresult> {

  return this.http.post<dataresult>(`${environment.apiURI_Contratos}BolsaComun/AddBolsaComun/`, param)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

}

// Put
public updateBolsaComun(param: any): Observable<dataresult> {
  return this.http.put<dataresult>(`${environment.apiURI_Contratos}BolsaComun/UpdateBolsaComun/`, param)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

}

  // Put
  public put_UpdateEstadoBolsaComun(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Contratos}BolsaComun/UpdateEstadoBolsaComun/`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  // aprobacion Alistamiento
  public createAprobacionPlanRutas(param: any): Observable<dataresult> {

    return this.http.post<dataresult>(`${environment.apiURI_Contratos}PlanAlistamientoAprobacion/AddPlanesAlistamientosAprobacion/`, param)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }
  
    // Get
    public get_HistoricoAprobacionesPlanRutas(idPlanAlistamiento: number): Observable<dataresult> {
  
      return this.http.get<dataresult>(`${environment.apiURI_Contratos}PlanAlistamientoAprobacion/PlanesAlistamientosAprobacionGetID/${idPlanAlistamiento}`)
        .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
  
    }
  
  


}
