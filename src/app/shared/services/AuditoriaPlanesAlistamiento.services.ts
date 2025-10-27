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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AuditoriaPlanesAlistamiento
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase AuditoriaPlanesAlistamiento puede ser inyectada dinamicamente
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
import { environment } from "src/environments/environment";
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
import { AuditoriaPlanesAlistamientoModel } from "../model/AuditoriaPlanesAlistamiento";

/**
 *  Se registra la clase como proveedor en el modulo
 *
 *  
 */

@Injectable({
  providedIn: "root",
})
 
 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *  
 */
export class AuditoriaPlanesAlistamientoService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Auditoria + "AuditoriaPlanesAlistamiento";
  private filterArray: AuditoriaPlanesAlistamientoModel[] = [];
  private AuditoriaPlanesAlistamiento: AuditoriaPlanesAlistamientoModel[] = [];
  private AuditoriaPlanesAlistamientoList: AuditoriaPlanesAlistamientoModel[] = [];
  private AuditoriaPlanesAlistamientoObject: AuditoriaPlanesAlistamientoModel;

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
      errorMessage = 'Error en Cliente: '+error.error.message;
    } else {
      // Get server-side error
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage,'top center');
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.'+errorMessage);
  }

   /**
    *   CRUD:  Metodo GetAll para traer todos los registros
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAuditoriaPlanesAlistamientoList(): Observable<AuditoriaPlanesAlistamientoModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<AuditoriaPlanesAlistamientoModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo GetAllFull para traer todos los registros con todos los tipos de campo
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAuditoriaPlanesAlistamientoListFull(): Observable<AuditoriaPlanesAlistamientoModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<AuditoriaPlanesAlistamientoModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAuditoriaPlanesAlistamientoListRelation(): Observable<AuditoriaPlanesAlistamientoModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<AuditoriaPlanesAlistamientoModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo GetById para traer un solo registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAuditoriaPlanesAlistamiento(id: number): Observable<AuditoriaPlanesAlistamientoModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<AuditoriaPlanesAlistamientoModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *    CRUD:  Metodo Delete Eliminar Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  deleteAuditoriaPlanesAlistamiento(id: number): Observable<AuditoriaPlanesAlistamientoModel> {

    var AuditoriaPlanesAlistamientoObject = new AuditoriaPlanesAlistamientoModel(id,0,'',0,'',new Date(),0,'','','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<AuditoriaPlanesAlistamientoModel>(url, JSON.stringify(AuditoriaPlanesAlistamientoObject),this.httpOptions)
      .pipe(
        tap(()=> this.messageService.showInfo("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Post  para Adicionar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  addAuditoriaPlanesAlistamiento(AuditoriaPlanesAlistamiento: AuditoriaPlanesAlistamientoModel): Observable<AuditoriaPlanesAlistamientoModel> {
    AuditoriaPlanesAlistamiento.id = 0;
    AuditoriaPlanesAlistamiento.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AuditoriaPlanesAlistamiento._usuario=localStorage.getItem('NombreUsuario');
    AuditoriaPlanesAlistamiento._accion="Adicionar";
    AuditoriaPlanesAlistamiento._ippublica=localStorage.getItem('IpPublica');
    AuditoriaPlanesAlistamiento._browser=localStorage.getItem("Browser");
    AuditoriaPlanesAlistamiento._nombremaquina=localStorage.getItem("NombreMaquina");
    AuditoriaPlanesAlistamiento._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<AuditoriaPlanesAlistamientoModel>(url, JSON.stringify(AuditoriaPlanesAlistamiento),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se  insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateAuditoriaPlanesAlistamiento(AuditoriaPlanesAlistamiento: AuditoriaPlanesAlistamientoModel): Observable<AuditoriaPlanesAlistamientoModel> {
    AuditoriaPlanesAlistamiento.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AuditoriaPlanesAlistamiento._usuario=localStorage.getItem('NombreUsuario');
    AuditoriaPlanesAlistamiento._accion="Actuializar";
    AuditoriaPlanesAlistamiento._ippublica=localStorage.getItem('IpPublica');
    AuditoriaPlanesAlistamiento._browser=localStorage.getItem("Browser");
    AuditoriaPlanesAlistamiento._nombremaquina=localStorage.getItem("NombreMaquina");
    AuditoriaPlanesAlistamiento._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<AuditoriaPlanesAlistamientoModel>(url, JSON.stringify(AuditoriaPlanesAlistamiento),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => AuditoriaPlanesAlistamiento),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





