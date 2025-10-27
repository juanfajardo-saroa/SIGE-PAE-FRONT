/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_GetPreparacion puede ser inyectada dinamicamente
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
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//
import { PA_GetPreparacionModel } from "src/app/shared/model/PA_GetPreparacionModel";

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_GetPreparacionService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN + "PA_GetPreparacion";
  private filterArray: PA_GetPreparacionModel[] = [];
  private PA_GetPreparacion: PA_GetPreparacionModel[] = [];
  private PA_GetPreparacionList: PA_GetPreparacionModel[] = [];

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

  // CRUD:  Metodo GetAll para traer todos los registros
  getPA_GetPreparacionList(PA_GetPreparacion:PA_GetPreparacionRequest): Observable<PA_GetPreparacionModel> {
    let params = new HttpParams().set('Id_ETC', PA_GetPreparacion.Id_ETC,);
    params = PA_GetPreparacion.id_TipoComponente ? params.append('id_TipoComponente', PA_GetPreparacion.id_TipoComponente) : params;
    params = PA_GetPreparacion.Id_GrupoAlimento ? params.append('Id_GrupoAlimento', PA_GetPreparacion.Id_GrupoAlimento) : params;
    params = PA_GetPreparacion.Id_SubgrupoAlimento ? params.append('Id_SubgrupoAlimento', PA_GetPreparacion.Id_SubgrupoAlimento) : params;
    params = PA_GetPreparacion.Id_TipoPreparacion ? params.append('Id_TipoPreparacion', PA_GetPreparacion.Id_TipoPreparacion) : params;
    params = PA_GetPreparacion.Preparacion ? params.append('Preparacion', PA_GetPreparacion.Preparacion) : params;


   
    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_GetPreparacionModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}


export class PA_GetPreparacionRequest{
  Id_ETC?: number = null;
  id_TipoComponente?: number = null;
  Id_GrupoAlimento?: number = null;
  Id_SubgrupoAlimento?: number = null;
  Id_TipoPreparacion?: number = null;
  Preparacion?: string = null;
 
}


