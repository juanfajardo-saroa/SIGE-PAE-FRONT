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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_InsertarMenuProductos
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT.
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase PA_InsertarMenuProductos puede ser inyectada dinamicamente
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
import { PA_InsertarMenuProductosModel } from "src/app/shared/model/PA_InsertarMenuProductos";

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
export class PA_InsertarMenuProductosService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN + "PA_InsertarMenuProductos";
  private filterArray: PA_InsertarMenuProductosModel[] = [];
  private PA_InsertarMenuProductos: PA_InsertarMenuProductosModel[] = [];
  private PA_InsertarMenuProductosList: PA_InsertarMenuProductosModel[] = [];
  private PA_InsertarMenuProductosObject: PA_InsertarMenuProductosModel;

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
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ.
    */
 getPA_InsertarMenuProductosList(ID_CiclosMenu:number,ID_Producto:number,auditoria:string): Observable<PA_InsertarMenuProductosModel> {
  let auditoria1 ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
  "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
  "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
  "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
  "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
  "(Accion:"+"Actualizar"+"),"+
  "(Browser:"+localStorage.getItem("Browser")+"),"+
  "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";
    const url = `${this.apiurl}/GetAll?ID_CiclosMenu=${ID_CiclosMenu}&ID_Producto=${ID_Producto}&auditoria=${auditoria1}`;
    return this.http
      .get<PA_InsertarMenuProductosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}





