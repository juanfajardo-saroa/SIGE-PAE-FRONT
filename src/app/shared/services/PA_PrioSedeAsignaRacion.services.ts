/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_PrioSedeAsignaRacion puede ser inyectada dinamicamente
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
import { PA_PrioSedeAsignaRacionModel } from "src/app/shared/model/PA_PrioSedeAsignaRacionModel";
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//


// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_PrioSedeAsignaRacionService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Priorizacion + "PA_PrioSedeAsignaRacion";
  private filterArray: PA_PrioSedeAsignaRacionModel[] = [];
  private PA_PrioSedeAsignaRacion: PA_PrioSedeAsignaRacionModel[] = [];
  private PA_PrioSedeAsignaRacionList: PA_PrioSedeAsignaRacionModel[] = [];

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
  getPA_PrioSedeAsignaRacionList(prioSedeAsignaRacion: PA_PrioSedeAsignaRacion): Observable<PA_PrioSedeAsignaRacionModel> {
    let params = new HttpParams().set('id_ETC', prioSedeAsignaRacion.id_ETC);
    params = prioSedeAsignaRacion.Id_TipoMunicipio ? params.append('Id_TipoMunicipio', prioSedeAsignaRacion.Id_TipoMunicipio) : params;
    params = prioSedeAsignaRacion.Id_Municipio ? params.append('Id_Municipio', prioSedeAsignaRacion.Id_Municipio) : params;
    params = prioSedeAsignaRacion.Id_InstEducativa ? params.append('Id_InstEducativa', prioSedeAsignaRacion.Id_InstEducativa) : params;
    params = prioSedeAsignaRacion.Id_sede ? params.append('Id_sede', prioSedeAsignaRacion.Id_sede) : params;
    params = prioSedeAsignaRacion.Id_Jornada ? params.append('Id_Jornada', prioSedeAsignaRacion.Id_Jornada) : params;
    params = prioSedeAsignaRacion.Id_NivelEducativo ? params.append('Id_NivelEducativo', prioSedeAsignaRacion.Id_NivelEducativo) : params;
    params = prioSedeAsignaRacion.Id_Zona ? params.append('Id_Zona', prioSedeAsignaRacion.Id_Zona) : params;
    params = prioSedeAsignaRacion.Id_CriterioVul ? params.append('Id_CriterioVul', prioSedeAsignaRacion.Id_CriterioVul) : params;
    params = prioSedeAsignaRacion.Id_EstadoPrio ? params.append('Id_EstadoPrio', prioSedeAsignaRacion.Id_EstadoPrio) : params;

    params = prioSedeAsignaRacion.id_Vigencia ? params.append('id_Vigencia', prioSedeAsignaRacion.id_Vigencia) : params;


    if(prioSedeAsignaRacion.Id_EstadoPrio == 0) {
      params = params.append('Id_EstadoPrio', prioSedeAsignaRacion.Id_EstadoPrio);
    }
    const url = `${this.apiurl}/GetAll`;

    return this.http
      .get<PA_PrioSedeAsignaRacionModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}

export class PA_PrioSedeAsignaRacion{
  id_ETC?: number;
  Id_TipoMunicipio?: number = null;
  Id_Municipio?: number = null;
  Id_InstEducativa?: number = null;
  Id_sede?: number = null;
  Id_Jornada?: number = null;
  Id_NivelEducativo?: number = null;
  Id_Zona?: number = null;
  Id_CriterioVul?: number = null;
  Id_EstadoPrio?: number = null;
  id_Vigencia?:number = null;
}






