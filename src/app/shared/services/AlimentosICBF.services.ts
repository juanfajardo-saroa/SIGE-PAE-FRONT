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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AlimentosICBF
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase AlimentosICBF puede ser inyectada dinamicamente
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
import { AlimentosICBFModel } from "../model/AlimentosICBF";
import { SpinnerService } from "./spinner.service";

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
export class AlimentosICBFService {
  constructor(private http: HttpClient,private messageService:MessageService,
    private spinnerService: SpinnerService, ) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_AlimentosMenu + "AlimentosICBF";
  private filterArray: AlimentosICBFModel[] = [];
  private AlimentosICBF: AlimentosICBFModel[] = [];
  private AlimentosICBFList: AlimentosICBFModel[] = [];
  private AlimentosICBFObject: AlimentosICBFModel;

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
  getAlimentosICBFList(): Observable<AlimentosICBFModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<AlimentosICBFModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getAlimentosICBFList2(iD_EstadoRegistro:number): Observable<AlimentosICBFModel> {
    let url = `${this.apiurl}/GetAll/`;
    if(iD_EstadoRegistro>0) {
      url = url.concat("?%24filter=");
    }
    if(iD_EstadoRegistro>0){
      url = url.concat(`iD_EstadoRegistro%20eq%20${iD_EstadoRegistro}`);
    }
    return this.http
      .get<AlimentosICBFModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getAlimentosRelatioICBFListFilter(subgrupo: number, tipo: number): Observable<AlimentosICBFModel> {
    let url = `${this.apiurl}/GetAllRelation`;
    if(subgrupo>0 || tipo>0) {
      url = url.concat("?%24filter=");
    }
    if(subgrupo>0){
      url = url.concat(`iD_SubGrupoAlimentos%20eq%20${subgrupo}`);
    }
    if(tipo>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`iD_TipoAlimento%20eq%20${tipo}`);
    }
    return this.http
      .get<AlimentosICBFModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getAlimentosRelatioICBFListFilterByState(subgrupo: number, tipo: number, states: number[]): Observable<AlimentosICBFModel> {
    let url = `${this.apiurl}/GetAllRelation`;
    url = url.concat("?%24filter=");
    if(subgrupo>0){
      url = url.concat(`iD_SubGrupoAlimentos%20eq%20${subgrupo}`);
    }
    if(tipo>0){
      if(url.includes("%20")){
        url = url.concat("%20and%20");
      }
      url = url.concat(`iD_TipoAlimento%20eq%20${tipo}`);
    }
    if(url.includes("%20")){
      url = url.concat("%20and%20");
    }
    states.forEach((element, index) => {
      if (index == 0) {
        url = url.concat(`iD_EstadoRegistro%20eq%20${element}`);
      } else {
        url = url.concat(`%20or%20iD_EstadoRegistro%20eq%20${element}`);
      }
    });
    return this.http
      .get<AlimentosICBFModel>(url)
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
  getAlimentosICBFListFull(): Observable<AlimentosICBFModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<AlimentosICBFModel>(url)
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
  getAlimentosICBFListRelation(): Observable<AlimentosICBFModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<AlimentosICBFModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getAlimentosICBFListRelationfilter(id:number): Observable<AlimentosICBFModel> {
    const url = `${this.apiurl}/GetAllRelation?%24filter=id%20eq%20${id}`;
    return this.http
      .get<AlimentosICBFModel>(url)
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
  getAlimentosICBF(id: number): Observable<AlimentosICBFModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<AlimentosICBFModel>(url)
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
    */2
  deleteAlimentosICBF(id: number): Observable<AlimentosICBFModel> {

    var AlimentosICBFObject = new AlimentosICBFModel(id,'',0,'',0,'',0,'',0,'','','','',0,0,0,'',0,'',0,'','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<AlimentosICBFModel>(url, JSON.stringify(AlimentosICBFObject),this.httpOptions)
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
  addAlimentosICBF(AlimentosICBF: AlimentosICBFModel): Observable<AlimentosICBFModel> {
    AlimentosICBF.id = 0;
    AlimentosICBF.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AlimentosICBF._usuario=localStorage.getItem('NombreUsuario');
    AlimentosICBF._accion="Adicionar";
    AlimentosICBF._ippublica=localStorage.getItem('IpPublica');
    AlimentosICBF._browser=localStorage.getItem("Browser");
    AlimentosICBF._nombremaquina=localStorage.getItem("NombreMaquina");
    AlimentosICBF._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<AlimentosICBFModel>(url, JSON.stringify(AlimentosICBF),this.httpOptions)
      .pipe(
        tap(),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateAlimentosICBF(AlimentosICBF: AlimentosICBFModel): Observable<AlimentosICBFModel> {
    AlimentosICBF.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AlimentosICBF._usuario=localStorage.getItem('NombreUsuario');
    AlimentosICBF._accion="Actuializar";
    AlimentosICBF._ippublica=localStorage.getItem('IpPublica');
    AlimentosICBF._browser=localStorage.getItem("Browser");
    AlimentosICBF._nombremaquina=localStorage.getItem("NombreMaquina");
    AlimentosICBF._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<AlimentosICBFModel>(url, JSON.stringify(AlimentosICBF),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => AlimentosICBF),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





