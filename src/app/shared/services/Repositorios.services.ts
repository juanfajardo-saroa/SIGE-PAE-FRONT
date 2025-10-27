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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
 * 
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 * 
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase Repositorios puede ser inyectada dinamicamente
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
import { RepositoriosModel } from "../model/Repositorios";
import Swal from 'sweetalert2';

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
export class RepositoriosService {
  constructor(public http: HttpClient,public messageService:MessageService) {}

  // Definición de Variables requeridas
  public apiurl = environment.baseUrlAPI_ModuloUApa + "Repositorios";
  public filterArray: RepositoriosModel[] = [];
  public apiurlFile = environment.baseUrlAPI_ModuloUApa + "File";
  public Repositorios: RepositoriosModel[] = [];
  public RepositoriosList: RepositoriosModel[] = [];
  private RepositoriosObject: RepositoriosModel;

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
  public handleError1(error: any) {
    let errorMessage = 'Ocurrió un error inesperado';
    let status = error.status || 'Desconocido'; // Obtiene el estado del error si está disponible

    // Registrar todo el error para inspección
    console.log('Error completo:', error);

    // Verificar si el código de estado del error es 500
    if (status === 500) {
        errorMessage = 'No se encontró el archivo, por favor actualice el archivo y vuelva a intentarlo.';
        // Mostrar el mensaje de error personalizado
       // this.messageService.showInfo(errorMessage, 'top center');
       Swal.fire({
        showCloseButton: true,
        html: errorMessage,
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar'
      }).then((res) => {
        // Opcional: Manejar la respuesta del usuario si es necesario
      });
    } else {
        // Revisar si `error.error` existe y tiene la propiedad `message` o `errorMessage`
        if (error.error && typeof error.error === 'object') {
            if (error.error.errorMessage) {
                // Caso cuando el error tiene una propiedad `errorMessage`
                errorMessage = error.error.errorMessage;
            } else if (error.error.message) {
                // Caso cuando el error tiene una propiedad `message`
                errorMessage = error.error.message;
            } else {
                // Caso cuando `error.error` es un objeto pero no tiene `message` ni `errorMessage`
                errorMessage = `Estado del error: ${status}`;
            }
        } else if (error.message) {
            // Caso cuando `error.error` no es un objeto, pero `error` tiene un mensaje
            errorMessage = error.message;
        } else {
            // Caso genérico
            errorMessage = `Error en la respuesta: ${status}\nMensaje: ${error.statusText || 'Desconocido'}`;
        }
        
        // Mostrar un mensaje de error genérico para otros códigos de estado
        this.messageService.showInfo('Microservicio No Responde.', 'top center');
    }

    // Mostrar el mensaje final que fue seleccionado
    console.error('Mensaje de error:', errorMessage);
    // Lanzar el error para que sea manejado en el componente que llamó la función
    return throwError(errorMessage);
}


   /**
    *   CRUD:  Metodo GetAll para traer todos los registros
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  getRepositoriosList(): Observable<RepositoriosModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<RepositoriosModel>(url)
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
  getRepositoriosListFull(): Observable<RepositoriosModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<RepositoriosModel>(url)
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
  getRepositoriosListRelation(): Observable<RepositoriosModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<RepositoriosModel>(url)
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
  getRepositorios(id: number): Observable<RepositoriosModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<RepositoriosModel>(url)
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
  deleteRepositorios(id: number,archivo:any,nombre:string): Observable<RepositoriosModel> {


    var RepositoriosObject = new RepositoriosModel(id,0,'',0,0,nombre,'',0,'',archivo,'','','',new Date(),new Date(),'',0,
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<RepositoriosModel>(url, JSON.stringify(RepositoriosObject),this.httpOptions)
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
  addRepositorios(Repositorios: RepositoriosModel): Observable<RepositoriosModel> {
    Repositorios.id = 0;
    Repositorios.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    Repositorios._usuario=localStorage.getItem('NombreUsuario');
    Repositorios._accion="Adicionar";
    Repositorios._ippublica=localStorage.getItem('IpPublica');
    Repositorios._browser=localStorage.getItem("Browser");
    Repositorios._nombremaquina=localStorage.getItem("NombreMaquina");
    Repositorios._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<RepositoriosModel>(url, JSON.stringify(Repositorios),this.httpOptions)
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
  updateRepositorios(Repositorios: RepositoriosModel): Observable<RepositoriosModel> {
    Repositorios.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+    
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    Repositorios._usuario=localStorage.getItem('NombreUsuario');
    Repositorios._accion="Actuializar";
    Repositorios._ippublica=localStorage.getItem('IpPublica');
    Repositorios._browser=localStorage.getItem("Browser");
    Repositorios._nombremaquina=localStorage.getItem("NombreMaquina");
    Repositorios._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<RepositoriosModel>(url, JSON.stringify(Repositorios),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => Repositorios),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





