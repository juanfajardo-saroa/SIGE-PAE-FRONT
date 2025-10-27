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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MenuPreparaciones
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase MenuPreparaciones puede ser inyectada dinamicamente
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
import { MenuPreparacionesModel } from "../model/MenuPreparaciones";

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
export class MenuPreparacionesService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN+ "MenuPreparaciones";
  private filterArray: MenuPreparacionesModel[] = [];
  private MenuPreparaciones: MenuPreparacionesModel[] = [];
  private MenuPreparacionesList: MenuPreparacionesModel[] = [];
  private MenuPreparacionesObject: MenuPreparacionesModel;

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
  getMenuPreparacionesList(): Observable<MenuPreparacionesModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<MenuPreparacionesModel>(url)
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
  getMenuPreparacionesListFull(): Observable<MenuPreparacionesModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<MenuPreparacionesModel>(url)
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
    getMenuPreparacionesListRelationFilter(id:number): Observable<MenuPreparacionesModel> {
      const url = `${this.apiurl}/GetAllRelation?%24filter=iD_Menu%20eq%20${id}`;
      return this.http
        .get<MenuPreparacionesModel>(url)
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }
    getMenuPreparacionesListFilterEnter2(id1:number,id2:number): Observable<MenuPreparacionesModel> {
      const url = `${this.apiurl}/GetAllRelation?%24filter=iD_Menu%20ge%20%20${id1}%20and%20iD_Menu%20le%20%20${id2}`;
      return this.http
        .get<MenuPreparacionesModel>(url)
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }
  getMenuPreparacionesListRelation(): Observable<MenuPreparacionesModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<MenuPreparacionesModel>(url)
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
  getMenuPreparaciones(id: number): Observable<MenuPreparacionesModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<MenuPreparacionesModel>(url)
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
  deleteMenuPreparaciones(id: number): Observable<MenuPreparacionesModel> {

    var MenuPreparacionesObject = new MenuPreparacionesModel('',id,0,'',0,'','','',0,
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreUsuario"),
    localStorage.getItem('KeyMaster'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("NombreUsuario"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<MenuPreparacionesModel>(url, JSON.stringify(MenuPreparacionesObject),this.httpOptions)
      .pipe(
        tap(),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


   /**
    *   CRUD:  Metodo Post  para Adicionar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  addMenuPreparaciones(MenuPreparaciones: MenuPreparacionesModel): Observable<MenuPreparacionesModel> {
    MenuPreparaciones.id = 0;
    MenuPreparaciones.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    MenuPreparaciones._usuario=localStorage.getItem('KeyMaster');
    MenuPreparaciones._accion="Adicionar";
    MenuPreparaciones._ippublica=localStorage.getItem('IpPublica');
    MenuPreparaciones._browser=localStorage.getItem("Browser");
    MenuPreparaciones._nombremaquina=localStorage.getItem("NombreUsuario");
    MenuPreparaciones._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<MenuPreparacionesModel>(url, JSON.stringify(MenuPreparaciones),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateMenuPreparaciones(MenuPreparaciones: MenuPreparacionesModel): Observable<MenuPreparacionesModel> {
    MenuPreparaciones.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    MenuPreparaciones._usuario=localStorage.getItem('KeyMaster');
    MenuPreparaciones._accion="Actuializar";
    MenuPreparaciones._ippublica=localStorage.getItem('IpPublica');
    MenuPreparaciones._browser=localStorage.getItem("Browser");
    MenuPreparaciones._nombremaquina=localStorage.getItem("NombreUsuario");
    MenuPreparaciones._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<MenuPreparacionesModel>(url, JSON.stringify(MenuPreparaciones),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => MenuPreparaciones),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





