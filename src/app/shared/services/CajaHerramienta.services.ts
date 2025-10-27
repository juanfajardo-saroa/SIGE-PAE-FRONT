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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad CajaHerramienta
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase CajaHerramienta puede ser inyectada dinamicamente
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
import { CajaHerramientaModel } from "src/app/shared/model/CajaHerramienta";

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
export class CajaHerramientaService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_ModuloUApa + "CajaHerramienta";
  private filterArray: CajaHerramientaModel[] = [];
  private CajaHerramienta: CajaHerramientaModel[] = [];
  private CajaHerramientaList: CajaHerramientaModel[] = [];
  private CajaHerramientaObject: CajaHerramientaModel;

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
  getCajaHerramientaList(): Observable<CajaHerramientaModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<CajaHerramientaModel>(url)
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
  getCajaHerramientaListFull(): Observable<CajaHerramientaModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<CajaHerramientaModel>(url)
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
  getCajaHerramientaListRelation(): Observable<CajaHerramientaModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<CajaHerramientaModel>(url)
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
  getCajaHerramienta(id: number): Observable<CajaHerramientaModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<CajaHerramientaModel>(url)
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
  deleteCajaHerramienta(id: number): Observable<CajaHerramientaModel> {

    var CajaHerramientaObject = new CajaHerramientaModel(id,0,'','','','',new Date(),'','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreUsuario"),
    localStorage.getItem('KeyMaster'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("NombreUsuario"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<CajaHerramientaModel>(url, JSON.stringify(CajaHerramientaObject),this.httpOptions)
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
  addCajaHerramienta(CajaHerramienta: CajaHerramientaModel): Observable<CajaHerramientaModel> {
    CajaHerramienta.id = 0;
    CajaHerramienta.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    CajaHerramienta._usuario=localStorage.getItem('KeyMaster');
    CajaHerramienta._accion="Adicionar";
    CajaHerramienta._ippublica=localStorage.getItem('IpPublica');
    CajaHerramienta._browser=localStorage.getItem("Browser");
    CajaHerramienta._nombremaquina=localStorage.getItem("NombreUsuario");
    CajaHerramienta._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<CajaHerramientaModel>(url, JSON.stringify(CajaHerramienta),this.httpOptions)
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
  updateCajaHerramienta(CajaHerramienta: CajaHerramientaModel): Observable<CajaHerramientaModel> {
    CajaHerramienta.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    CajaHerramienta._usuario=localStorage.getItem('KeyMaster');
    CajaHerramienta._accion="Actuializar";
    CajaHerramienta._ippublica=localStorage.getItem('IpPublica');
    CajaHerramienta._browser=localStorage.getItem("Browser");
    CajaHerramienta._nombremaquina=localStorage.getItem("NombreUsuario");
    CajaHerramienta._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<CajaHerramientaModel>(url, JSON.stringify(CajaHerramienta),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizo correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => CajaHerramienta),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





