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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ObtenerNotificaciones
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT.
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase PA_ObtenerNotificaciones puede ser inyectada dinamicamente
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
import { PA_ObtenerNotificacionesModel } from "src/app/shared/model/PA_ObtenerNotificacionesModel";
import { CriteriosPriorizacionModel } from "../model/CriteriosPriorizacion";

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
export class PA_ObtenerNotificacionesService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Alertas + "PA_ObtenerNotificaciones";
  private filterArray: PA_ObtenerNotificacionesModel[] = [];
  private PA_ObtenerNotificaciones: PA_ObtenerNotificacionesModel[] = [];
  private PA_ObtenerNotificacionesList: PA_ObtenerNotificacionesModel[] = [];
  private PA_ObtenerNotificacionesObject: PA_ObtenerNotificacionesModel;
  public numberOfNotifications: number;
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
 getPA_ObtenerNotificacionesList(usuario:string,Estado:number,Modulo:number,MaxReg:number): Observable<PA_ObtenerNotificacionesModel> {
      let params = new HttpParams().set('usuario', usuario);
      params = Estado ? params.append('Estado', Estado) : params;
      params = MaxReg ? params.append('MaxReg', MaxReg) : params;
  
      const url = `${this.apiurl}/GetAll`;
      return this.http
        .get<PA_ObtenerNotificacionesModel>(url,{ params: params })
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
  }

  getNotificaciones(max: number): Observable<Array<PA_ObtenerNotificacionesModel>> {
    const usuario = localStorage.getItem('KeyMaster');
    const valnull = null;
    return this.getPA_ObtenerNotificacionesList(usuario, 1, valnull, max).pipe(
      map((result: any) => this.mapResultToModel(result))
    );
  }

  mapResultToModel(result: CriteriosPriorizacionModel[]): any {
    var arreglo: Array<CriteriosPriorizacionModel> = [];
    result.forEach((item) =>
      arreglo.push(item)
    );
    arreglo.sort((c1, c2) => c1.prioridad - c2.prioridad);
    return arreglo;
  }

}





