/**
 * <Derechos_Reservados>
 * 
 * Aplicacion		:SISPAE 
 * 
 * Autor			:TiGlobal SAS y SoftManagement
 * 
 * Generacion		:Este archivo es generado por el Equipo de Desarrollo
 * 
 * Ano			    :2022
 * 
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_EstadoNotificaciones
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT.
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase PA_EstadoNotificaciones puede ser inyectada dinamicamente
 *
 *  
 */
import { Injectable } from "@angular/core";
/**
 *  HttpClient es el mecanismo para comunicarse con un servidor remoto a través de HTTP
 *
 *  
 */
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
/**
 *  observables para manejar operaciones asíncronas
 *
 *  
 */
import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { NgModule, ErrorHandler } from "@angular/core";
import { switchMap } from "rxjs/operators";
/**
 *  importa variables de entrono requeridas
 *
 *  
 */

/**
 *  manejo de mensajes de error
 *
 *  
 */
import { MessageService } from 'src/app/services/message.service';
/**
 *  Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
 *
 *  
 */
import { PA_EstadoNotificacionesModel } from "src/app/shared/model/PA_EstadoNotificacionesModel";
import { EstadoNotificacionModel } from "src/app/shared/model/EstadoNotificacionModel";
import { auditoriaModel } from "../model/auditoria";
import { environment } from "src/environments/environment";

/**
 *  Se registra la clase como proveedor en el modulo
 *
 *  
 */

@Injectable({
  providedIn: "root",
})

/**
*   Definición de la Clase Servicios del Modelo
*
*  
*/
export class PA_EstadoNotificacionesService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Alertas + "PA_EstadoNotificaciones";
  private filterArray: PA_EstadoNotificacionesModel[] = [];
  private PA_EstadoNotificaciones: PA_EstadoNotificacionesModel[] = [];
  private PA_EstadoNotificacionesList: PA_EstadoNotificacionesModel[] = [];
  private PA_EstadoNotificacionesObject: PA_EstadoNotificacionesModel;

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
  /**
   *   Definición de  Error handling
   *
   *   clase global de control de errores denominada errorHandler que proporciona un gancho para el control centralizado de excepciones dentro de la aplicación
   */
  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'Error en Cliente: ' + error.error.message;
    } else {
      // Get server-side error
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage, 'top center');
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.' + errorMessage);
  }

  /**
   *   CRUD:  Metodo GetAll para traer todos los registros
   *
   *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ.
   */
  updatePA_EstadoNotificacionesList(Id: number, Usuario: string, Estado: number): Observable<EstadoNotificacionModel> {
    let auditoria1 ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Actualizar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";
    const url = `${this.apiurl}/GetAll?Id=${Id}&usuario=${Usuario}&Estado=${Estado}&auditoria=${auditoria1}`;
    let audit = <auditoriaModel>{};
    audit._ippublica = localStorage.getItem('IpPublica');
    audit._nombremaquina = localStorage.getItem("NombreMaquina");
    audit._usuario = localStorage.getItem('NombreUsuario');
    audit._browser = localStorage.getItem("Browser");
    audit._accion = "Adicionar";
    audit._sessionid = localStorage.getItem("Ubicacion");
    let EstadoNotificacion: EstadoNotificacionModel = {
      id: Id,
      usuario: Usuario,
      estado: Estado,
    }
    return this.http
      .put<EstadoNotificacionModel>(url, JSON.stringify(EstadoNotificacion), this.httpOptions)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





