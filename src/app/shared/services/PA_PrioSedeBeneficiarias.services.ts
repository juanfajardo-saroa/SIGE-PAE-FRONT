/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_PrioSedeBeneficiarias puede ser inyectada dinamicamente
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
import { PA_PrioSedeBeneficiariasModel } from "src/app/shared/model/PA_PrioSedeBeneficiariasModel";
import { PA_PrioSedeBeneficiarias } from'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_PrioSedeBeneficiariasService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Priorizacion + "PA_PrioSedeBeneficiarias";
  private filterArray: PA_PrioSedeBeneficiariasModel[] = [];
  private PA_PrioSedeBeneficiarias: PA_PrioSedeBeneficiariasModel[] = [];
  private PA_PrioSedeBeneficiariasList: PA_PrioSedeBeneficiariasModel[] = [];

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
  getPA_PrioSedeBeneficiariasList(prioSedeBeneficiarias: PA_PrioSedeBeneficiarias): Observable<PA_PrioSedeBeneficiariasModel> {
    let params = new HttpParams().set('id_ETC', prioSedeBeneficiarias.id_ETC);
      params = prioSedeBeneficiarias.Id_TipoMunicipio ? params.append('Id_TipoMunicipio', prioSedeBeneficiarias.Id_TipoMunicipio) : params;
      params = prioSedeBeneficiarias.Id_Municipio ? params.append('Id_Municipio', prioSedeBeneficiarias.Id_Municipio) : params;
      params = prioSedeBeneficiarias.Id_InstEducativa ? params.append('Id_InstEducativa', prioSedeBeneficiarias.Id_InstEducativa) : params;
      params = prioSedeBeneficiarias.Id_sede ? params.append('Id_sede', prioSedeBeneficiarias.Id_sede) : params;
      params = prioSedeBeneficiarias.Id_Jornada ? params.append('Id_Jornada', prioSedeBeneficiarias.Id_Jornada) : params;
      params = prioSedeBeneficiarias.Id_NivelEducativo ? params.append('Id_NivelEducativo', prioSedeBeneficiarias.Id_NivelEducativo) : params;
      params = prioSedeBeneficiarias.Id_Zona ? params.append('Id_Zona', prioSedeBeneficiarias.Id_Zona) : params;
      params = prioSedeBeneficiarias.Id_CriterioVul ? params.append('Id_CriterioVul', prioSedeBeneficiarias.Id_CriterioVul) : params;
      params = prioSedeBeneficiarias.priorizadaPAE != null ? params.append('priorizadaPAE', prioSedeBeneficiarias.priorizadaPAE) : params;

    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<PA_PrioSedeBeneficiariasModel>(url,{ params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}





