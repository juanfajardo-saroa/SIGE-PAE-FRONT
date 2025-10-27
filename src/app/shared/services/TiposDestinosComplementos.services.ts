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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad TiposDestinosComplementos
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase TiposDestinosComplementos puede ser inyectada dinamicamente
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
import { TiposDestinosComplementosModel } from "src/app/shared/model/TiposDestinosComplementosModel";

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
export class TiposDestinosComplementosService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_GestionExcedentes + "TiposDestinosComplementos";
  private filterArray: TiposDestinosComplementosModel[] = [];
  private TiposDestinosComplementos: TiposDestinosComplementosModel[] = [];
  private TiposDestinosComplementosList: TiposDestinosComplementosModel[] = [];
  private TiposDestinosComplementosObject: TiposDestinosComplementosModel;

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
  getTiposDestinosComplementosList(): Observable<TiposDestinosComplementosModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<TiposDestinosComplementosModel>(url)
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
  getTiposDestinosComplementosListFull(): Observable<TiposDestinosComplementosModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<TiposDestinosComplementosModel>(url)
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
  getTiposDestinosComplementosListRelation(): Observable<TiposDestinosComplementosModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<TiposDestinosComplementosModel>(url)
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
  getTiposDestinosComplementos(id: number): Observable<TiposDestinosComplementosModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<TiposDestinosComplementosModel>(url)
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
  deleteTiposDestinosComplementos(id: number): Observable<TiposDestinosComplementosModel> {

    var TiposDestinosComplementosObject = new TiposDestinosComplementosModel(id,'','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreUsuario"),
    localStorage.getItem('KeyMaster'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("NombreUsuario"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<TiposDestinosComplementosModel>(url, JSON.stringify(TiposDestinosComplementosObject),this.httpOptions)
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
  addTiposDestinosComplementos(TiposDestinosComplementos: TiposDestinosComplementosModel): Observable<TiposDestinosComplementosModel> {
    TiposDestinosComplementos.id = 0;
    TiposDestinosComplementos.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    TiposDestinosComplementos._usuario=localStorage.getItem('KeyMaster');
    TiposDestinosComplementos._accion="Adicionar";
    TiposDestinosComplementos._ippublica=localStorage.getItem('IpPublica');
    TiposDestinosComplementos._browser=localStorage.getItem("Browser");
    TiposDestinosComplementos._nombremaquina=localStorage.getItem("NombreUsuario");
    TiposDestinosComplementos._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<TiposDestinosComplementosModel>(url, JSON.stringify(TiposDestinosComplementos),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se inserto correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateTiposDestinosComplementos(TiposDestinosComplementos: TiposDestinosComplementosModel): Observable<TiposDestinosComplementosModel> {
    TiposDestinosComplementos.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    TiposDestinosComplementos._usuario=localStorage.getItem('KeyMaster');
    TiposDestinosComplementos._accion="Actuializar";
    TiposDestinosComplementos._ippublica=localStorage.getItem('IpPublica');
    TiposDestinosComplementos._browser=localStorage.getItem("Browser");
    TiposDestinosComplementos._nombremaquina=localStorage.getItem("NombreUsuario");
    TiposDestinosComplementos._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<TiposDestinosComplementosModel>(url, JSON.stringify(TiposDestinosComplementos),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizo correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => TiposDestinosComplementos),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





