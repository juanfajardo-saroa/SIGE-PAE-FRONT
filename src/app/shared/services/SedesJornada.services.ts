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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad SedesJornada
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase SedesJornada puede ser inyectada dinamicamente
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
import { SedesJornadaModel } from "../model/SedesJornada";

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
export class SedesJornadaService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_SistemaEducativo + "SedesJornada";
  private filterArray: SedesJornadaModel[] = [];
  private SedesJornada: SedesJornadaModel[] = [];
  private SedesJornadaList: SedesJornadaModel[] = [];
  private SedesJornadaObject: SedesJornadaModel;

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
  getSedesJornadaList(): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getSedesJornadaListRelationFilterSede(idSede: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=iD_Sede%20eq%20${idSede}`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getSedesJornadaListFilter(idsede:number,idJornada): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=iD_Sede%20eq%20${idsede}%20and%20iD_Jornada%20eq%20${idJornada}`;
    return this.http
      .get<SedesJornadaModel>(url)
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
  getSedesJornadaListFull(): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<SedesJornadaModel>(url)
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
  getSedesJornadaListRelation(): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }



  getSedesJornadaListRelationFilter(idEtc: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=iD_ETC%20eq%20${idEtc}`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getSedesJornadaListRelationFilterById(id: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=id%20eq%20${id}`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getSedesJornadaListRelationFilterByIdJornada(id: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=iD_Sede%20eq%20${id}`;
    return this.http
      .get<SedesJornadaModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getSedesJornadaListRelationFilterByIdJornada1(id: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetAllFull?%24filter=iD_Sede%20eq%20${id}`;
    return this.http
      .get<SedesJornadaModel>(url)
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
  getSedesJornada(id: number): Observable<SedesJornadaModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<SedesJornadaModel>(url)
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
  deleteSedesJornada(id: number): Observable<SedesJornadaModel> {

    var SedesJornadaObject = new SedesJornadaModel(id,0,'',0,'','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<SedesJornadaModel>(url, JSON.stringify(SedesJornadaObject),this.httpOptions)
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
  addSedesJornada(SedesJornada: SedesJornadaModel): Observable<SedesJornadaModel> {
    SedesJornada.id = 0;
    SedesJornada.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    SedesJornada._usuario=localStorage.getItem('NombreUsuario');
    SedesJornada._accion="Adicionar";
    SedesJornada._ippublica=localStorage.getItem('IpPublica');
    SedesJornada._browser=localStorage.getItem("Browser");
    SedesJornada._nombremaquina=localStorage.getItem("NombreMaquina");
    SedesJornada._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<SedesJornadaModel>(url, JSON.stringify(SedesJornada),this.httpOptions)
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
  updateSedesJornada(SedesJornada: SedesJornadaModel): Observable<SedesJornadaModel> {
    SedesJornada.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    SedesJornada._usuario=localStorage.getItem('NombreUsuario');
    SedesJornada._accion="Actuializar";
    SedesJornada._ippublica=localStorage.getItem('IpPublica');
    SedesJornada._browser=localStorage.getItem("Browser");
    SedesJornada._nombremaquina=localStorage.getItem("NombreMaquina");
    SedesJornada._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<SedesJornadaModel>(url, JSON.stringify(SedesJornada),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => SedesJornada),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





