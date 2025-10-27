/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios 
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase QuincenaEntregaRaciones puede ser inyectada dinamicamente
import { Injectable } from "@angular/core";
// HttpClient es el mecanismo para comunicarse con un servidor remoto a través de HTTP
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
//  observables para manejar operaciones asíncronas
import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { NgModule, ErrorHandler } from "@angular/core";
import { switchMap } from "rxjs/operators";
// importa variables de entrono requeridas
import { environment } from "src/environments/environment";
// manejo de mensajes de error
import { MessageService } from 'src/app/services/message.service';
import { QuincenaEntregaRacionesModel } from "../model/QuincenaEntregaRaciones";
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//


// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})
 
// Definición de la Clase Servicios del MOdelo
export class QuincenaEntregaRacionesService {
  constructor(public http: HttpClient,public messageService:MessageService) {}

  // Definición de Variables requeridas
  public apiurl = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetBySedeJornadaOperador";
  public apiurlH = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetBySedeJornadaOperadorH";
  public apiurlQuincena = environment.baseUrlAPI_Seguimiento + "QuincenaEntregaRaciones";
  public filterArray: QuincenaEntregaRacionesModel[] = [];
  public QuincenaEntregaRaciones: QuincenaEntregaRacionesModel[] = [];
  public QuincenaEntregaRacionesList: QuincenaEntregaRacionesModel[] = [];

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

  // Error handling
  // clase global de control de errores denominada errorHandler que proporciona un gancho para el control centralizado de excepciones dentro de la aplicación
  public handleError(error: any) {
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

  // CRUD:  Metodo GetAll para traer todos los registros
  getQuincenaEntregaRacionesList(): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/GetAll/`;
    return this.http
      .get<QuincenaEntregaRacionesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAllFull para traer todos los registros con todos los tipos de campo
  getQuincenaEntregaRacionesListFull(): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/GetAllFull/`;
    return this.http
      .get<QuincenaEntregaRacionesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
  getQuincenaEntregaRacionesListRelation(): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/GetAllRelation`;
    return this.http
      .get<QuincenaEntregaRacionesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   // CRUD:  Metodo GetById para traer un solo registro
  getQuincenaEntregaRaciones(id: number): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/GetById/${id}`;
    return this.http
      .get<QuincenaEntregaRacionesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Delete Eliminar Registro
  deleteQuincenaEntregaRaciones(id: number): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/Delete/${id}`;
    this.QuincenaEntregaRaciones = this.QuincenaEntregaRaciones.filter((QuincenaEntregaRacionesModel) => QuincenaEntregaRacionesModel.id !== id);
    return this.http
      .delete<QuincenaEntregaRacionesModel>(url)
      .pipe(
        tap(()=> this.messageService.showError("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Post  para Adicionar  Registro
  addQuincenaEntregaRaciones(QuincenaEntregaRaciones: QuincenaEntregaRacionesModel): Observable<QuincenaEntregaRacionesModel> {
    QuincenaEntregaRaciones.id = 0;
    QuincenaEntregaRaciones.auditoria = "";
    const url = `${this.apiurlQuincena}/Post/`;
    return this.http
      .post<QuincenaEntregaRacionesModel>(url, JSON.stringify(QuincenaEntregaRaciones),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Put  para Actualizar  Registro
  updateQuincenaEntregaRaciones(QuincenaEntregaRaciones: QuincenaEntregaRacionesModel): Observable<QuincenaEntregaRacionesModel> {
    const url = `${this.apiurlQuincena}/Put/`;
    QuincenaEntregaRaciones.auditoria="";
    QuincenaEntregaRaciones.pathReporteQuincenal="";
    return this.http
      .put<QuincenaEntregaRacionesModel>(url, JSON.stringify(QuincenaEntregaRaciones),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => QuincenaEntregaRaciones),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





