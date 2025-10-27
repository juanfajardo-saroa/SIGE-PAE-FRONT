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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ValidaFrecuencia
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT.
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase PA_ValidaFrecuencia puede ser inyectada dinamicamente
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
import { PA_ValidaIntercambiosModel } from "../model/PA_ValidaIntercambiosModel";
/**
 *  Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
 *
 *
 */

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
export class PA_ValidaIntercambiosService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN + "PA_ValidaIntercambios";
  private filterArray: PA_ValidaIntercambiosModel[] = [];
  private PA_ValidaIntercambios: PA_ValidaIntercambiosModel[] = [];
  private PA_ValidaIntercambiosList: PA_ValidaIntercambiosModel[] = [];
  private PA_ValidaIntercambiosObject: PA_ValidaIntercambiosModel;

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
 getPA_ValidaIntercambiosList(PA_conteoIntercambios:PA_ValidaIntercambiosPiv): Observable<PA_ValidaIntercambiosModel> {
    //const url = `${this.apiurl}/GetAll?ID_CiclosMenu=${ID_CiclosMenu}&NumeroSemana=${NumeroSemana}&nivel=${nivel}`;
    let params = new HttpParams().set('ID_CiclosMenu', PA_conteoIntercambios.ID_CiclosMenu);
    params = PA_conteoIntercambios.NumeroSemana ? params.append('NumeroSemana', PA_conteoIntercambios.NumeroSemana) : params;
    params = PA_conteoIntercambios.NumeroDia ? params.append('NumeroDia', PA_conteoIntercambios.NumeroDia) : params;
    params = PA_conteoIntercambios.nivel ? params.append('nivel', PA_conteoIntercambios.nivel) : params;
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<PA_ValidaIntercambiosModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}

export class PA_ValidaIntercambiosPiv{

  ID_CiclosMenu?: number = null;
  NumeroSemana?:number = null;
  NumeroDia? :number = null;
  nivel? :number = null;
}



