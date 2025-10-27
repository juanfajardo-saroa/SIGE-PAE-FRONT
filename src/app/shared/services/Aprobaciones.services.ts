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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Aprobaciones
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase Aprobaciones puede ser inyectada dinamicamente
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
 import { AprobacionesModel } from "../model/Aprobaciones";
 
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
 export class AprobacionesService {
   constructor(private http: HttpClient,private messageService:MessageService) {}
 
   // Definición de Variables requeridas
   private apiurl = environment.baseUrlAPI_Aprobaciones + "Aprobaciones";
   private filterArray: AprobacionesModel[] = [];
   private Aprobaciones: AprobacionesModel[] = [];
   private AprobacionesList: AprobacionesModel[] = [];
   private AprobacionesObject: AprobacionesModel;
 
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
   getAprobacionesList(): Observable<AprobacionesModel> {
     const url = `${this.apiurl}/GetAll/`;
     return this.http
       .get<AprobacionesModel>(url)
       .pipe(
         tap(),   // para poder realizar efectos secundrios
         retry(0), // reintenta en caso de falla hasta 2 veces
         catchError(this.handleError)  // en caso de error usa el Handle error
       );
   }
   getAprobacionesListcaracterizacion(ubicacionOrigen:string, id_Secciones:number): Observable<AprobacionesModel> {
    const url = `${this.apiurl}/GetAll?%24filter=ubicacionOrigen%20eq%20%27${ubicacionOrigen}%27%20and%20id_Secciones%20eq%20${id_Secciones}`;
    return this.http
      .get<AprobacionesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
   getAprobacionesListfilter(id_Secciones:number): Observable<AprobacionesModel> {
    const url = `${this.apiurl}/GetAll?%24filter=id_Secciones%20eq%20${id_Secciones}`;
    return this.http
      .get<AprobacionesModel>(url)
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
   getAprobacionesListFull(): Observable<AprobacionesModel> {
     const url = `${this.apiurl}/GetAllFull/`;
     return this.http
       .get<AprobacionesModel>(url)
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
   getAprobacionesListRelation(): Observable<AprobacionesModel> {
     const url = `${this.apiurl}/GetAllRelation`;
     return this.http
       .get<AprobacionesModel>(url)
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
   getAprobaciones(id: number): Observable<AprobacionesModel> {
     const url = `${this.apiurl}/GetById/${id}`;
     return this.http
       .get<AprobacionesModel>(url)
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
   deleteAprobaciones(id: number): Observable<AprobacionesModel> {
 
     var AprobacionesObject = new AprobacionesModel(id,'',0,'','','',0,'',0,'','',new Date(),new Date(),'','',0,'','','','',0,'',new Date(),
     localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
     localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
     localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);
 
     const url = `${this.apiurl}/Delete/`;
     return this.http
       .post<AprobacionesModel>(url, JSON.stringify(AprobacionesObject),this.httpOptions)
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
   addAprobaciones(Aprobaciones: AprobacionesModel): Observable<AprobacionesModel> {
     Aprobaciones.id = 0;
     Aprobaciones.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
     "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
     "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
     "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
     "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
     "{'Accion':'"+    "Adicionar"+"'},"+    
     "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
     "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
     Aprobaciones._usuario=localStorage.getItem('NombreUsuario');
     Aprobaciones._accion="Adicionar";
     Aprobaciones._ippublica=localStorage.getItem('IpPublica');
     Aprobaciones._browser=localStorage.getItem("Browser");
     Aprobaciones._nombremaquina=localStorage.getItem("NombreMaquina");
     Aprobaciones._sessionid=localStorage.getItem("Ubicacion");
 
     const url = `${this.apiurl}/Post/`;
     return this.http
       .post<AprobacionesModel>(url, JSON.stringify(Aprobaciones),this.httpOptions)
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
   updateAprobaciones(Aprobaciones: AprobacionesModel): Observable<AprobacionesModel> {
     Aprobaciones.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
     "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
     "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
     "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
     "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
     "{'Accion':'"+    "Actualizar"+"'},"+    
     "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
     "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
     Aprobaciones._usuario=localStorage.getItem('NombreUsuario');
     Aprobaciones._accion="Actuializar";
     Aprobaciones._ippublica=localStorage.getItem('IpPublica');
     Aprobaciones._browser=localStorage.getItem("Browser");
     Aprobaciones._nombremaquina=localStorage.getItem("NombreMaquina");
     Aprobaciones._sessionid=localStorage.getItem("Ubicacion");
 
     const url = `${this.apiurl}/Put/`;
     return this.http
       .put<AprobacionesModel>(url, JSON.stringify(Aprobaciones),this.httpOptions)
       .pipe(
         tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
         map(() => Aprobaciones),
         retry(0), // reintenta en caso de falla hasta 2 veces
         catchError(this.handleError)  // en caso de error usa el Handle error
       );
   }
 }
 
 
 
 
 
 