/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_GetRolPermisos puede ser inyectada dinamicamente
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
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//
import { PA_GetRolPermisosModel } from "src/app/shared/model/PA_GetRolPermisosModel";

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_GetRolPermisosService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Seguridad + "PA_GetRolPermisos";
  private filterArray: PA_GetRolPermisosModel[] = [];
  private PA_GetRolPermisos: PA_GetRolPermisosModel[] = [];
  private PA_GetRolPermisosList: PA_GetRolPermisosModel[] = [];

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
      errorMessage = 'Error en Cliente: ' + error.error.message;
    } else {
      // Get server-side error
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage, 'top center');
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.' + errorMessage);
  }

  // CRUD:  Metodo GetAll para traer todos los registros
  getPA_GetRolPermisosList(id_Rol:string): Observable<PA_GetRolPermisosModel> {


    const url = `${this.apiurl}/GetAll?id_Rol=${id_Rol}`;
    return this.http
      .get<PA_GetRolPermisosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  async getPA_GetRolPermisosListSync(id_Rol: string): Promise<PA_GetRolPermisosModel> {
    const url = `${this.apiurl}/GetAll?id_Rol=${id_Rol}`;
    await this.delay(20000)
    return await this.http
      .get<PA_GetRolPermisosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      ).toPromise();
  }

  delay(delay: number) {
    return new Promise(r => {
      setTimeout(r, delay);
    })
  }


 public async  getPA_GetRolPermisosListSincro(id_Rol:string): Promise<PA_GetRolPermisosModel> {
    const url = `${this.apiurl}/GetAll?id_Rol=${id_Rol}`;
    return await  this.http
      .get<PA_GetRolPermisosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      ).toPromise();
  }



}





