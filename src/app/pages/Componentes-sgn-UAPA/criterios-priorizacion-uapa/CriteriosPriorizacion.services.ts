/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios 
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase CriteriosPriorizacion puede ser inyectada dinamicamente
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
import { CriteriosPriorizacionModel } from "./CriteriosPriorizacion";

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})
 
// Definición de la Clase Servicios del MOdelo
export class CriteriosPriorizacionService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Priorizacion + "CriteriosPriorizacion";
  private filterArray: CriteriosPriorizacionModel[] = [];
  private CriteriosPriorizacion: CriteriosPriorizacionModel[] = [];
  private CriteriosPriorizacionList: CriteriosPriorizacionModel[] = [];

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
  getCriteriosPriorizacionList(): Observable<CriteriosPriorizacionModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<CriteriosPriorizacionModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAllFull para traer todos los registros con todos los tipos de campo
  getCriteriosPriorizacionListFull(): Observable<CriteriosPriorizacionModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<CriteriosPriorizacionModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
  getCriteriosPriorizacionListRelation(): Observable<CriteriosPriorizacionModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<CriteriosPriorizacionModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   // CRUD:  Metodo GetById para traer un solo registro
  getCriteriosPriorizacion(id: number): Observable<CriteriosPriorizacionModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<CriteriosPriorizacionModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Delete Eliminar Registro
  deleteCriteriosPriorizacion(id: number, nombre: string): Observable<CriteriosPriorizacionModel> {
    
    var CriteriosPriorizacionObjetos = new CriteriosPriorizacionModel(id,0,nombre,true,'', localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true)
    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<CriteriosPriorizacionModel>(url, JSON.stringify(CriteriosPriorizacionObjetos),this.httpOptions)
      .pipe(
        tap(()=> this.messageService.showInfo("Borrado Correctamente",'top center')),    // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Post  para Adicionar  Registro
  addCriteriosPriorizacion(CriteriosPriorizacion: CriteriosPriorizacionModel): Observable<CriteriosPriorizacionModel> {
    CriteriosPriorizacion.id = 0;
    CriteriosPriorizacion.auditoria ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Actualizar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";;
    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<CriteriosPriorizacionModel>(url, JSON.stringify(CriteriosPriorizacion),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se insertó correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo Put  para Actualizar  Registro
  updateCriteriosPriorizacion(CriteriosPriorizacion: CriteriosPriorizacionModel): Observable<CriteriosPriorizacionModel> {
    CriteriosPriorizacion.auditoria="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Actualizar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";

    
    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<CriteriosPriorizacionModel>(url, JSON.stringify(CriteriosPriorizacion),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => CriteriosPriorizacion),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





