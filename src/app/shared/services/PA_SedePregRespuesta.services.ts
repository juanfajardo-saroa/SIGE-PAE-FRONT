/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_SedePregRespuesta puede ser inyectada dinamicamente
import { Injectable } from "@angular/core";
// HttpClient es el mecanismo para comunicarse con un servidor remoto a través de HTTP
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpParams,
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
import { PA_SedePregRespuestaModel } from 'src/app/shared/model/PA_SedePregRespuestaModel';

//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//


// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_SedePregRespuestaService {
  constructor(public http: HttpClient,public messageService:MessageService) {}

  // Definición de Variables requeridas
  public apiurl = environment.baseUrlAPI_Infraestructura + "PA_SedePregRespuesta";
  public filterArray: PA_SedePregRespuestaModel[] = [];
  public PA_SedePregRespuesta: PA_SedePregRespuestaModel[] = [];
  public PA_SedePregRespuestaList: PA_SedePregRespuestaModel[] = [];

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
  getPA_SedePregRespuestaList( PA_SedePregRespuestaRequest:PA_SedePregRespuestaRequest): Observable<PA_SedePregRespuestaModel> {
    let params = new HttpParams().set('id_ETC', PA_SedePregRespuestaRequest.ID_ETC,);
    params = PA_SedePregRespuestaRequest.id_caracteristica ? params.append('id_caracteristica', PA_SedePregRespuestaRequest.id_caracteristica) : params;
    params = PA_SedePregRespuestaRequest.ID_institucionEducativa ? params.append('Id_institucionEducativa', PA_SedePregRespuestaRequest.ID_institucionEducativa) : params;
    params = PA_SedePregRespuestaRequest.id_valorescala ? params.append('id_valorescala', PA_SedePregRespuestaRequest.id_valorescala ) : params;
    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_SedePregRespuestaModel>(url,{params:params})
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }




}
export class PA_SedePregRespuestaRequest{
  ID_ETC?:number = null;
  id_caracteristica?:number = null;
  ID_institucionEducativa?:number = null;
  id_valorescala?:number=null;

}






