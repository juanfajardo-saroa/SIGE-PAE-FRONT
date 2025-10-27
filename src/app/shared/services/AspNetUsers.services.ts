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
import { AspNetUsersModel } from "../model/AspNetUsers";
import { AspNetUsersUpdateInactiveToActiveModel } from "../model/AspNetUsersUpdateInactiveToActive";

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
  private apiurl = environment.baseUrlAPI_Seguridad + "AspNetUsers";
  private filterArray: AspNetUsersModel[] = [];
  private AspNetUsers: AspNetUsersModel[] = [];
  private AspNetUsersList: AspNetUsersModel[] = [];
  private AspNetUsersObject: AspNetUsersModel;

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
      if(error.status===0){}else{
        var nombresincortar = error.error
        var nombrecortado = nombresincortar[0].split("is ");
        var nombrecortadoes = nombresincortar.split("->");
        
      }
      if(error.status === 400 && nombrecortado[1] =='already taken.'){
        this.messageService.showWarning(nombrecortado[1] , 'top right');
      }else{
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;}
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

 

  getAspNetUsersListFilterByName(name: string): Observable<AspNetUsersModel> {
    name = name.replace(" ", "%20");
    const url = `${this.apiurl}/GetAll?%24filter=name%20eq%20%27${name}%27`;
    return this.http
      .get<AspNetUsersModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getAspNetUsersListFilterByUbicacion(Ubicacion: string , IdUbicacion:number): Observable<AspNetUsersModel> {
    Ubicacion = Ubicacion.replace(" ", "%20");
    const url = `${this.apiurl}/GetAll?%24filter=id_Ubicacion%20eq%20${IdUbicacion}%20and%20%20ubicacionBase%20eq%20%27${Ubicacion}%27`;
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

    var AspNetUsersObject = new AspNetUsersModel(id,'','','abc@gmail.com','',false,'','','','',false,false,'',false,0,'','','','','','','','','',new Date(),'',0,'',0,'','',0,'','','',0,0,
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<AspNetUsersModel>(url, `"${id}"`,this.httpOptions)
      .pipe(
        tap(()=> this.messageService.showInfo("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
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
    AspNetUsers.idRol = AspNetUsers.roleId;
    AspNetUsers.idRolTempo = AspNetUsers.roleIdTempo;
    AspNetUsers.Password =  AspNetUsers.passwordHash;
    AspNetUsers.PhotoPath = "";
    AspNetUsers.UserName = AspNetUsers.email;
    AspNetUsers.UsuarioAD = true;
    AspNetUsers.NumeroTelefono = AspNetUsers.phoneNumber;
    AspNetUsers.RespuestaSeguridad = "";
    AspNetUsers.segundoNombre = AspNetUsers.segundoNombre?AspNetUsers.segundoNombre:"";
    AspNetUsers.segundoApellido = AspNetUsers.segundoApellido?AspNetUsers.segundoApellido:"";
    AspNetUsers.idAspNetUserRolesBase = AspNetUsers.idAspNetUserRolesBase?AspNetUsers.idAspNetUserRolesBase:0;
    AspNetUsers.idAspNetUserRolesTempo = AspNetUsers.idAspNetUserRolesTempo?AspNetUsers.idAspNetUserRolesTempo:0;
    AspNetUsers.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AspNetUsers._usuario=localStorage.getItem('NombreUsuario');
    AspNetUsers._accion="Adicionar";
    AspNetUsers._ippublica=localStorage.getItem('IpPublica');
    AspNetUsers._browser=localStorage.getItem("Browser");
    AspNetUsers._nombremaquina=localStorage.getItem("NombreMaquina");
    AspNetUsers._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<AspNetUsersModel>(url, JSON.stringify(AspNetUsers),this.httpOptions)
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
    AspNetUsers.idRol = AspNetUsers.roleId;
    AspNetUsers.idRolTempo = AspNetUsers.roleIdTempo;
    AspNetUsers.Password =  AspNetUsers.passwordHash;
    AspNetUsers.PhotoPath = "";
    AspNetUsers.UserName = AspNetUsers.email;
    AspNetUsers.UsuarioAD = true;
    AspNetUsers.NumeroTelefono = AspNetUsers.phoneNumber;
    AspNetUsers.RespuestaSeguridad = "";
    AspNetUsers.LockoutEnd = AspNetUsers.LockoutEnd?AspNetUsers.LockoutEnd:"";
    AspNetUsers.concurrencyStamp = AspNetUsers.concurrencyStamp?AspNetUsers.concurrencyStamp:"";
    AspNetUsers.securityStamp = AspNetUsers.securityStamp?AspNetUsers.securityStamp:"";
    AspNetUsers.idAspNetUserRolesBase = AspNetUsers.idAspNetUserRolesBase?AspNetUsers.idAspNetUserRolesBase:0;
    AspNetUsers.idAspNetUserRolesTempo = AspNetUsers.idAspNetUserRolesTempo?AspNetUsers.idAspNetUserRolesTempo:0;
    AspNetUsers.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    AspNetUsers._usuario=localStorage.getItem('NombreUsuario');
    AspNetUsers._accion="Actuializar";
    AspNetUsers._ippublica=localStorage.getItem('IpPublica');
    AspNetUsers._browser=localStorage.getItem("Browser");
    AspNetUsers._nombremaquina=localStorage.getItem("NombreMaquina");
    AspNetUsers._sessionid=localStorage.getItem("Ubicacion");
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
}





