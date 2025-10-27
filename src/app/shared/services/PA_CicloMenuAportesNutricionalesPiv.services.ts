/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios 
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_CicloMenuAportesNutricionalesPiv puede ser inyectada dinamicamente
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
import { PA_CicloMenuAportesNutricionalesPivModel } from "../model/PA_CicloMenuAportesNutricionalesPivModel";

//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//


// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})
 
// Definición de la Clase Servicios del MOdelo
export class PA_CicloMenuAportesNutricionalesPivService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN + "PA_CicloMenuAportesNutricionalesPiv";
  private filterArray: PA_CicloMenuAportesNutricionalesPivModel[] = [];
  private PA_CicloMenuAportesNutricionalesPiv: PA_CicloMenuAportesNutricionalesPivModel[] = [];
  private PA_CicloMenuAportesNutricionalesPivList: PA_CicloMenuAportesNutricionalesPivModel[] = [];

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
  getPA_CicloMenuAportesNutricionalesPivList(PA_CicloMenuAportesNutricionalesPiv: PA_CicloMenuAportesNutricionalesPiv): Observable<PA_CicloMenuAportesNutricionalesPivModel> {
    let params = new HttpParams().set('ID_Etc', PA_CicloMenuAportesNutricionalesPiv.ID_Etc);
    params = PA_CicloMenuAportesNutricionalesPiv.ID_TipoModeloOperacion ? params.append('ID_TipoModeloOperacion', PA_CicloMenuAportesNutricionalesPiv.ID_TipoModeloOperacion) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_TipoComplemento ? params.append('ID_TipoComplemento', PA_CicloMenuAportesNutricionalesPiv.ID_TipoComplemento) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_TipoModalidadComplemento ? params.append('ID_TipoModalidadComplemento', PA_CicloMenuAportesNutricionalesPiv.ID_TipoModalidadComplemento) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_MinutaPatronAlimento ? params.append('ID_MinutaPatronAlimento', PA_CicloMenuAportesNutricionalesPiv.ID_MinutaPatronAlimento) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_CiclosMenuReferencia ? params.append('ID_CiclosMenuReferencia', PA_CicloMenuAportesNutricionalesPiv.ID_CiclosMenuReferencia) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_TipoNivelEducativo ? params.append('ID_TipoNivelEducativo', PA_CicloMenuAportesNutricionalesPiv.ID_TipoNivelEducativo) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_Zona ? params.append('ID_Zona', PA_CicloMenuAportesNutricionalesPiv.ID_Zona) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_CicloMenu ? params.append('ID_CicloMenu', PA_CicloMenuAportesNutricionalesPiv.ID_CicloMenu) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_Preparacion ? params.append('ID_Preparacion', PA_CicloMenuAportesNutricionalesPiv.ID_Preparacion) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.ID_Semana ? params.append('ID_Semana', PA_CicloMenuAportesNutricionalesPiv.ID_Semana) : params;
    params = PA_CicloMenuAportesNutricionalesPiv.Dia ? params.append('Dia', PA_CicloMenuAportesNutricionalesPiv.Dia) : params;
    const url = `${this.apiurl}/GetAll`;

    return this.http
      .get<PA_CicloMenuAportesNutricionalesPivModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  
}

export class PA_CicloMenuAportesNutricionalesPiv{
  ID_Etc?: number;
  ID_TipoModeloOperacion?: number = null;
  ID_TipoComplemento?: number = null;
  ID_TipoModalidadComplemento?: number = null;
  ID_MinutaPatronAlimento?: number = null;
  ID_CiclosMenuReferencia?: number = null;
  ID_TipoNivelEducativo?: number = null;
  ID_Zona?: number = null;
  ID_CicloMenu?: number = null;
  ID_Preparacion?: number = null;
  ID_Semana?:number = null;
  Dia?:number = null;
}






