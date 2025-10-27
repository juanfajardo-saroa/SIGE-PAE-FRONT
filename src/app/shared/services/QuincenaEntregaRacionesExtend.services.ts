/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase QuincenaEntregaRaciones puede ser inyectada dinamicamente
import { Injectable } from "@angular/core";
// HttpClient es el mecanismo para comunicarse con un servidor remoto a través de HTTP
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
//  observables para manejar operaciones asíncronas
import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { NgModule, ErrorHandler } from "@angular/core";
import { switchMap } from "rxjs/operators";

// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//
import { QuincenaEntregaRacionesService } from "./QuincenaEntregaRaciones.services";
import { MessageService } from "src/app/services/message.service";
import { ContratosService } from "src/app/shared/services/Contratos.services";
import { environment } from "src/environments/environment";
import { ContratosModel } from "src/app/shared/model/Contratos";
import { DivipolasModel } from "src/app/shared/model/Divipolas";
import { InstitucionEducativaModel } from "src/app/shared/model/InstitucionEducativa";
import { SedesModel } from "src/app/shared/model/Sedes";
import { EstadoQuincenaModel } from "src/app/shared/model/EstadoQuincena";
import { JornadaModel } from "src/app/shared/model/Jornada";
import { EntregasRacionesExtendModel } from "src/app/shared/model/EntregasRacionesExtend";
import { QuincenaEntregaRacionesExtendModel } from "../model/QuincenaEntregaRacionesExtend";
import { diasPaeListModel } from "../model/diasPaeList";
import { datosCompletosListModel } from "../model/datosCompletosList";
import { fechasQuincenaListModel } from "../model/fechasQuincenaList";


// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class QuincenaEntregaRacionesExtendService extends QuincenaEntregaRacionesService {
  constructor(public http: HttpClient,public messageService:MessageService, private contratosService:ContratosService) {
    super(http, messageService);
  }
  public apiurlContrato = environment.baseUrlAPI_Contratos + "PA_ContratosGetbyOperador";
  public apiurlDivipola = environment.baseUrlAPI_Configuracion + "PA_MunicipiosGetbyContrato";
  public apiurlIE = environment.baseUrlAPI_SistemaEducativo + "PA_InstitucionEducativaGetbyOperadorContratoMunicipio";
  public apiurlSede = environment.baseUrlAPI_SistemaEducativo + "PA_SedesGetbyContratoMunicipio";
  public apiurlJornada = environment.baseUrlAPI_SistemaEducativo + "PA_JornadaGetbyContratoMunicipio";
  public apiurlDiligenciamiento = environment.baseUrlAPI_Seguimiento + "EstadoQuincena";
  public apiurlDiasPAE  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetDiasPae";
  public apiurlDiasPAEH  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetDiasPaeH";
  public apiurlDatosCompletos  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetDatosCompletos";
  public apiurlDatosCompletosH  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetDatosCompletosH";
  public apiurlDatosEntrega  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetxGrado";
  public apiurlDatosEntregaH  = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetxGradoH";
  public apiurlFechas  = environment.baseUrlAPI_Seguimiento + "PA_FechasQuincenaRaciones";

  //dtOptions: Usado para los DataTables.Settings = {};
  dtOptions: any = {};

  //dtTrigger= new Subject();
  dtTrigger: Subject<any> = new Subject<any>();
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };

  // CRUD:  Metodo Delete Eliminar Registro
  deleteQuincenaEntregaRaciones(id: number): Observable<QuincenaEntregaRacionesExtendModel> {
    const url = `${this.apiurl}/Delete/${id}`;
    this.QuincenaEntregaRaciones = this.QuincenaEntregaRaciones.filter((QuincenaEntregaRacionesModel) => QuincenaEntregaRacionesModel.id !== id);
    return this.http
      .delete<QuincenaEntregaRacionesExtendModel>(url)
      .pipe(
        tap(()=> this.messageService.showError("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(super.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros
  getContratosList(id_Operador: number): Observable<ContratosModel> {
    const url = `${this.apiurlContrato}/GetAll?Id_Operador=${id_Operador}`;
    return this.http
      .get<ContratosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getMunicipiosList(id_Operador: number, id_Contrato: number): Observable<DivipolasModel> {
    const url = `${this.apiurlDivipola}/GetAll?Id_Operador=${id_Operador}&Id_Contrato=${id_Contrato}`;
    return this.http
      .get<DivipolasModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getIEList(id_Operador: number, id_Contrato: number, id_Divipola: number): Observable<InstitucionEducativaModel> {
    const url = `${this.apiurlIE}/GetAll?Id_Operador=${id_Operador}&Id_Contrato=${id_Contrato}&Id_Divipola=${id_Divipola}`;
    return this.http
      .get<InstitucionEducativaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getSedeList(id_Operador: number, id_Contrato: number, id_Divipola: number, id_IE: number): Observable<SedesModel> {
    const url = `${this.apiurlSede}/GetAll?Id_Operador=${id_Operador}&Id_Contrato=${id_Contrato}&Id_Divipola=${id_Divipola}&Id_IE=${id_IE}`;
    return this.http
      .get<SedesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getJornadaList(id_Operador: number, id_Contrato: number, id_Divipola: number,id_Sede:number, id_IE: number): Observable<JornadaModel> {
    const url = `${this.apiurlJornada}/GetAll?Id_Operador=${id_Operador}&Id_Contrato=${id_Contrato}&Id_Divipola=${id_Divipola}&id_Sede=${id_Sede}&Id_IE=${id_IE}`;
    return this.http
      .get<JornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getDiligenciamientoList(): Observable<EstadoQuincenaModel> {
    const url = `${this.apiurlDiligenciamiento}/GetAllFull`;
    return this.http
      .get<EstadoQuincenaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDiasPaeList(): Observable<diasPaeListModel> {
    const url = `${this.apiurlDiasPAE}/GetAll`;
    return this.http
      .get<diasPaeListModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDiasPaeHList(fecha_ini:string, fecha_fin:string): Observable<diasPaeListModel> {
    const url = `${this.apiurlDiasPAEH}/GetAll=Fecha_Ini=${fecha_ini}&Fecha_Fin=${fecha_fin}`;
    return this.http
      .get<diasPaeListModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDatosCompletosList(Id_SedeJornada:number, Id_Operador:number): Observable<datosCompletosListModel> {
    const url = `${this.apiurlDatosCompletos}/GetAll?Id_SedeJornada=${Id_SedeJornada}&Id_Operador=${Id_Operador}`;
    return this.http
      .get<datosCompletosListModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDatosCompletosListH(Id_SedeJornada:number, Id_Operador:number, Fecha_Ini:Date, Fecha_Fin:Date): Observable<datosCompletosListModel> {
    const url = `${this.apiurlDatosCompletosH}/GetAll?Id_SedeJornada=${Id_SedeJornada}&Id_Operador=${Id_Operador}&Fecha_Ini=${Fecha_Ini}&Fecha_Fin=${Fecha_Fin}`;
    return this.http
      .get<datosCompletosListModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


  getFechasQuincenaHistorico(Id_Operador: number): Observable<fechasQuincenaListModel> {
      const url = `${this.apiurlFechas}/GetAll?Id_Operador=${Id_Operador}`;

      return this.http
      .get<fechasQuincenaListModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDatosEntregaRacionesListAll(): Observable<EntregasRacionesExtendModel> {
    let url: string = `${this.apiurlDatosEntrega}/GetAll`;
    return this.http
      .get<EntregasRacionesExtendModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


  getDatosEntregaRacionesList(id_contrato:number, Id_Operador: number, racionesDiarias:number, Id_SedeJornada:number,id_Grado:number, selTiposReporteEntrega:number): Observable<EntregasRacionesExtendModel> {
    let url: string = '';
    if(selTiposReporteEntrega>0){
        if (id_Grado>0){
          url = `${this.apiurlDatosEntrega}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&Id_Grado=${id_Grado}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&%24filter=iD_TipoReporteEntrega%20eq%20${selTiposReporteEntrega}`;
        }
        else{
          url = `${this.apiurlDatosEntrega}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&%24filter=iD_TipoReporteEntrega%20eq%20${selTiposReporteEntrega}`;
        }
    }
    else
    {
      if (id_Grado>0){
        url = `${this.apiurlDatosEntrega}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&Id_Grado=${id_Grado}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}`;
      }
      else{
        url = `${this.apiurlDatosEntrega}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}`;
      }
    }
    return this.http
      .get<EntregasRacionesExtendModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getDatosEntregaRacionesListH(id_contrato:number, Id_Operador: number, racionesDiarias:number, Id_SedeJornada:number,id_Grado:number, selTiposReporteEntrega:number, Fecha_Ini:Date, Fecha_Fin:Date): Observable<EntregasRacionesExtendModel> {
    let url: string = '';
    if(selTiposReporteEntrega>0){
        if (id_Grado>0){
          url = `${this.apiurlDatosEntregaH}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&Id_Grado=${id_Grado}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&Fecha_Ini=${Fecha_Ini}&Fecha_Fin=${Fecha_Fin}&%24filter=iD_TipoReporteEntrega%20eq%20${selTiposReporteEntrega}`;
        }
        else{
          url = `${this.apiurlDatosEntregaH}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&Fecha_Ini=${Fecha_Ini}&Fecha_Fin=${Fecha_Fin}&%24filter=iD_TipoReporteEntrega%20eq%20${selTiposReporteEntrega}`;
        }
    }
    else
    {
      if (id_Grado>0){
        url = `${this.apiurlDatosEntregaH}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&Id_Grado=${id_Grado}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&Fecha_Ini=${Fecha_Ini}&Fecha_Fin=${Fecha_Fin}`;
      }
      else{
        url = `${this.apiurlDatosEntregaH}/GetAll?Id_Contrato=${id_contrato}&Id_Operador=${Id_Operador}&racionesDiarias=${racionesDiarias}&Id_SedeJornada=${Id_SedeJornada}&Fecha_Ini=${Fecha_Ini}&Fecha_Fin=${Fecha_Fin}`;
      }
    }
    return this.http
      .get<EntregasRacionesExtendModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
  getQuincenaEntregaRacionesListTotal(IdGradoSedeJornada:number, idOperador:number, idContrato: number, idDivipola: number, idIE: number, idSede: number, idJornada: number, idDiligenciamiento: number): Observable<QuincenaEntregaRacionesExtendModel> {
    var Complemento='';
    let url=this.apiurl.concat("/GetAll");
    if(IdGradoSedeJornada>0){
      url = url.concat(`?Id_GradoSedeJornada=${IdGradoSedeJornada}&Id_Operador=${idOperador}`);
    }else{
      url =  url.concat(`?Id_Operador=${idOperador}`);
    }
    if(idContrato>0 || idDivipola>0 || idIE>0 || idSede>0 || idJornada>0 || idDiligenciamiento>0) {
      url = url.concat("&%24filter=");
    }
    if(idContrato>0){
      url = url.concat(`idContrato%20eq%20${idContrato}`);
    }
    if(idDivipola>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idDivipola%20eq%20${idDivipola}`);
    }
    if(idIE>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idInstitucionEducativa%20eq%20${idIE}`);
    }
    if(idSede>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idSede%20eq%20${idSede}`);
    }
    if(idJornada>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idJornada%20eq%20${idJornada}`);
    }
    if(idDiligenciamiento>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idEstadoQuincena%20eq%20${idDiligenciamiento}`);
    }


    return this.http
      .get<QuincenaEntregaRacionesExtendModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
  getQuincenaEntregaRacionesListTotalH(IdGradoSedeJornada:number, idOperador:number, idContrato: number, idDivipola: number, idIE: number, idSede: number, idJornada: number, idDiligenciamiento: number, fecha_ini:string, fecha_fin:string): Observable<QuincenaEntregaRacionesExtendModel> {
    var Complemento='';
    let url=this.apiurlH.concat("/GetAll");

    if(IdGradoSedeJornada>0){
      url = url.concat(`?Id_GradoSedeJornada=${IdGradoSedeJornada}&Id_Operador=${idOperador}`);
    }else{
      url =  url.concat(`?Id_Operador=${idOperador}&FechaIni=${fecha_ini}&FechaFin=${fecha_fin}`);
     //url =  url.concat(`?Id_Operador=${idOperador}`);
    }
    if(idContrato>0 || idDivipola>0 || idIE>0 || idSede>0 || idJornada>0 || idDiligenciamiento>0) {
      url = url.concat("&%24filter=");
    }
    if(idContrato>0){
      url = url.concat(`idContrato%20eq%20${idContrato}`);
    }
    if(idDivipola>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idDivipola%20eq%20${idDivipola}`);
    }
    if(idIE>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idInstitucionEducativa%20eq%20${idIE}`);
    }
    if(idSede>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idSede%20eq%20${idSede}`);
    }
    if(idJornada>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idJornada%20eq%20${idJornada}`);
    }
    if(idDiligenciamiento>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`idEstadoQuincena%20eq%20${idDiligenciamiento}`);
    }

    return this.http
      .get<QuincenaEntregaRacionesExtendModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}
