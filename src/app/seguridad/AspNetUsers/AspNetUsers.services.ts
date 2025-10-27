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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AspNetUsers
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase AspNetUsers puede ser inyectada dinamicamente
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
import { credencialesUsuario,respuestaAutenticacion } from "../seguridad";
import { ForgotPasswordDto } from "../authentication/forgot-password/forgotPasswordDto";
import { AspNetUsersModel } from "src/app/shared/model/AspNetUsers";
import { ResetPasswordDto } from "../authentication/reset-password/ResetPasswordDto";
import { AspNetUsersUpdateInactiveToActiveModel } from "src/app/shared/model/AspNetUsersUpdateInactiveToActive";


/**
 *  Se registra la clase como proveedor en el modulo
 *
 *
 */

@Injectable({
  providedIn: "root",
})

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class AspNetUsersService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
 // private apiurl = environment.baseUrlAPI + "AspNetUsers";
 private apiurl = environment.baseUrlAPI_Seguridad + "AspNetUsers";
  private filterArray: AspNetUsersModel[] = [];
  private AspNetUsers: AspNetUsersModel[] = [];
  private AspNetUsersList: AspNetUsersModel[] = [];

  //dtOptions: Usado para los DataTables.Settings = {};
  dtOptions: any = {};

  //dtTrigger= new Subject();
  dtTrigger: Subject<any> = new Subject<any>();
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
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
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAspNetUsersList(): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getAspNetUsersListFilterByEmailandDocumentIden(documento:string, email:string): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetAll?%24filter=documentoIden%20eq%20%20%27${documento}%27%20and%20email%20eq%20%27${email}%27`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getAspNetUsersListFilterByEmail(email:string): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetAll?%24filter=email%20eq%20%27${email}%27`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


   /**
    *   CRUD:  Metodo GetAllFull para traer todos los registros con todos los tipos de campo
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAspNetUsersListFull(): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAspNetUsersListRelation(): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo GetById para traer un solo registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getAspNetUsers(id: number): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *    CRUD:  Metodo Delete Eliminar Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  deleteAspNetUsers(id: string): Observable<AspNetUsersModel> {
    const url = `${this.apiurl}/Delete/${id}`;
    this.AspNetUsers = this.AspNetUsers.filter((AspNetUsersModel) => AspNetUsersModel.id !== id);
    return this.http
      .delete<AspNetUsersModel>(url)
      .pipe(
        tap(()=> this.messageService.showError("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Post  para Adicionar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  addAspNetUsers(AspNetUsers: any): Observable<AspNetUsersModel> {
    AspNetUsers.id = null;
    AspNetUsers.auditoria = "";
    AspNetUsers.idRol = "3DEDF561-77FC-4251-B843-166F7631351E";
    AspNetUsers.Password =  AspNetUsers.passwordHash;
    AspNetUsers.PhotoPath = "";
    AspNetUsers.UserName = AspNetUsers.email;
    AspNetUsers.UsuarioAD = true;
    AspNetUsers.UbicacionBase = "";
    AspNetUsers.NumeroTelefono = AspNetUsers.phoneNumber;
    AspNetUsers.RespuestaSeguridad = "";

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<AspNetUsersModel>(url, JSON.stringify(AspNetUsers),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  agregarUsuario(params): Observable<AspNetUsersModel> {
    params.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<AspNetUsersModel>(url, JSON.stringify(params), this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se  insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateAspNetUsers(AspNetUsers: any): Observable<AspNetUsersModel> {
    AspNetUsers.auditoria = "";
    AspNetUsers.idRol = "3DEDF561-77FC-4251-B843-166F7631351E";
    AspNetUsers.Password =  AspNetUsers.passwordHash;
    AspNetUsers.PhotoPath = "";
    AspNetUsers.UserName = AspNetUsers.email;
    AspNetUsers.UsuarioAD = true;
    AspNetUsers.UbicacionBase = "";
    AspNetUsers.NumeroTelefono = AspNetUsers.phoneNumber;
    AspNetUsers.RespuestaSeguridad = "";
    AspNetUsers.LockoutEnd = AspNetUsers.LockoutEnd?AspNetUsers.LockoutEnd:"";
    AspNetUsers.concurrencyStamp = AspNetUsers.concurrencyStamp?AspNetUsers.concurrencyStamp:"";
    AspNetUsers.securityStamp = AspNetUsers.securityStamp?AspNetUsers.securityStamp:"";
    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<AspNetUsersModel>(url, JSON.stringify(AspNetUsers),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => AspNetUsers),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  //activar user

  updateInactiveToActive(AspNetUsers: any): Observable<AspNetUsersUpdateInactiveToActiveModel> {
   
    AspNetUsers.mail =  AspNetUsers.mail;
    
    const url = `${this.apiurl}/updateInactiveToActive/`;
    return this.http
      .put<AspNetUsersModel>(url, JSON.stringify(AspNetUsers),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => AspNetUsers),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

/**
    *   CRUD:  Metodo LoginUser
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  public loginUser = (body: credencialesUsuario):Observable<respuestaAutenticacion> => {
    const url = `${this.apiurl}/Login/`;
    return this.http
      //.post<AspNetUsersModel>(url, JSON.stringify(AspNetUsers),this.httpOptions)
      .post<respuestaAutenticacion>(url, JSON.stringify(body),this.httpOptions)
      .pipe(
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  public logoutUser = (id: string):Observable<any> => {
    const url = `${this.apiurl}/LogOut/`;
    return this.http
      .post<any>(url, JSON.stringify(id),this.httpOptions)
      .pipe(
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  /**
    *   CRUD:  Metodo loginUserEXP
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  public loginUserEXP = (body: credencialesUsuario)=> {
    const url = `${this.apiurl}/Login/`;
    return this.http
      .post(url, body);
  }

/**
    *   CRUD:  Metodo forgotPassword
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  public forgotPassword = (body: ForgotPasswordDto) => {
    const url = `${this.apiurl}/ForgotPassword/`;
    return this.http
    .post(url, JSON.stringify(body),this.httpOptions)
    .pipe(
      tap((data)=> {
        if(data){
          this.messageService.showError("El correo electrónico ingresado no esta registrado.",'top center');
        }
      }),  // solo para validaciones
      retry(0), // reintenta en caso de falla hasta 2 veces
      catchError(this.handleError)  // en caso de error usa el Handle error
    );
  }


  public resetPassword = (body: ResetPasswordDto) => {
    const url = `${this.apiurl}/ResetPassword/`;

    return this.http
    .post(url, body)
    .pipe(
      tap((data)=> this.messageService.showInfo("Su contraseña ha sido cambiada exitosamente, por favor inicie sesión con sus nuevas credenciales .",'top center')),  // solo para validaciones
      retry(1), // reintenta en caso de falla hasta 2 veces
      catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

}





