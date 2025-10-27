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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MinutaPatronAlimentos
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase MinutaPatronAlimentos puede ser inyectada dinamicamente
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
import { MinutaPatronAlimentosModel } from "../model/MinutaPatronAlimentos";

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
export class MinutaPatronAlimentosService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_AlimentosMenu + "MinutaPatronAlimentos";
  private filterArray: MinutaPatronAlimentosModel[] = [];
  private MinutaPatronAlimentos: MinutaPatronAlimentosModel[] = [];
  private MinutaPatronAlimentosList: MinutaPatronAlimentosModel[] = [];
  private MinutaPatronAlimentosObject: MinutaPatronAlimentosModel;

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
  getMinutaPatronAlimentosList(): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter2(id:number,iD_ETC:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoMinutaPatron%20eq%20${id}%20and%20iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getMinutaPatronAlimentosListFilter(iD_ETC:number,modop:number,esta:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoModeloOperacion%20eq%20${modop}and%20iD_ETC%20eq%20${iD_ETC}%20and%20iD_TipoEstadoMinuta%20eq%20${esta}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilterDife(iD_ETC:number,iD_TipoMinutaPatron:number,modalidadComplementoId:number,tipoComplementoId:number,iD_TipoEstadoMinuta:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_ETC%20eq%20${iD_ETC}%20and%20iD_TipoMinutaPatron%20eq%20${iD_TipoMinutaPatron}%20and%20modalidadComplementoId%20eq%20${modalidadComplementoId}
    %20and%20tipoComplementoId%20eq%20${tipoComplementoId}%20and%20iD_TipoEstadoMinuta%20eq%20${iD_TipoEstadoMinuta}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilterDife1(iD_ETC:number,iD_TipoMinutaPatron:number,iD_TipoEstadoMinuta:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_ETC%20eq%20${iD_ETC}%20and%20iD_TipoMinutaPatron%20eq%20${iD_TipoMinutaPatron}%20and%20iD_TipoEstadoMinuta%20eq%20${iD_TipoEstadoMinuta}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter9(iD_ETC:number,tipo:number,esta:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoMinutaPatron%20eq%20${tipo}and%20iD_ETC%20eq%20${iD_ETC}%20and%20iD_TipoEstadoMinuta%20eq%20${esta}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter6(iD_ETC:number,tipo:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoMinutaPatron%20eq%20${tipo}and%20iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter8(iD_ETC:number,tipo:number,ope:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoMinutaPatron%20eq%20${tipo}and%20iD_ETC%20eq%20${iD_ETC}and%20iD_TipoModeloOperacion%20eq%20${ope}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter7(iD_ETC:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter4(id:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_MinutaAprobacion%20eq%20${id}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter3(id:number,mod:number,com:number,iD_ETC:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoModeloOperacion%20eq%20${id}and%20modalidadComplementoId%20eq%20${mod}%20and%20tipoComplementoId%20eq%20${com}and%20iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter31(id:number,mod:number,com:number,iD_ETC:number,iD_TipoMinutaPatron:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoModeloOperacion%20eq%20${id}and%20modalidadComplementoId%20eq%20${mod}%20and%20tipoComplementoId%20eq%20${com}and%20iD_ETC%20eq%20${iD_ETC}and%20iD_TipoMinutaPatron%20eq%20${iD_TipoMinutaPatron}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilter5(mod:number,com:number,iD_ETC:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=modalidadComplementoId%20eq%20${mod}%20and%20tipoComplementoId%20eq%20${com}and%20iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilterbucar(iD_MinutaAprobacion:number,modalidadComplementoId:number,tipoComplementoId:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_MinutaAprobacion%20eq%20${iD_MinutaAprobacion}%20and%20modalidadComplementoId%20eq%20${modalidadComplementoId}%20and%20tipoComplementoId%20eq%20${tipoComplementoId}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  getMinutaPatronAlimentosListFilterbucar1(iD_MinutaAprobacion:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_MinutaAprobacion%20eq%20${iD_MinutaAprobacion}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getMinutaPatronAlimentosListFilterbucarfiltro(iD_TipoModeloOperacion:number,modalidadComplementoId:number,tipoComplementoId:number,esta:number,iD_TipoMinutaPatron:number,iD_ETC:number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAll?%24filter=iD_TipoModeloOperacion%20eq%20${iD_TipoModeloOperacion}%20and%20modalidadComplementoId%20eq%20${modalidadComplementoId}%20and%20tipoComplementoId%20eq%20${tipoComplementoId}%20and%20iD_TipoEstadoMinuta%20eq%20${esta}and%20iD_TipoMinutaPatron%20eq%20${iD_TipoMinutaPatron}and%20iD_ETC%20eq%20${iD_ETC}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
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
  getMinutaPatronAlimentosListFull(): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
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
  getMinutaPatronAlimentosListRelation(): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
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
  getMinutaPatronAlimentos(id: number): Observable<MinutaPatronAlimentosModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<MinutaPatronAlimentosModel>(url)
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
  deleteMinutaPatronAlimentos(id: number): Observable<MinutaPatronAlimentosModel> {

    var MinutaPatronAlimentosObject = new MinutaPatronAlimentosModel(id,'',0,'',0,'',0,'',0,'',0,0,'',0,'','',
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreMaquina"),
    localStorage.getItem('NombreUsuario'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("Ubicacion"),"",true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<MinutaPatronAlimentosModel>(url, JSON.stringify(MinutaPatronAlimentosObject),this.httpOptions)
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
  addMinutaPatronAlimentos(MinutaPatronAlimentos: MinutaPatronAlimentosModel): Observable<MinutaPatronAlimentosModel> {
    MinutaPatronAlimentos.id = 0;
    MinutaPatronAlimentos.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    MinutaPatronAlimentos._usuario=localStorage.getItem('NombreUsuario');
    MinutaPatronAlimentos._accion="Adicionar";
    MinutaPatronAlimentos._ippublica=localStorage.getItem('IpPublica');
    MinutaPatronAlimentos._browser=localStorage.getItem("Browser");
    MinutaPatronAlimentos._nombremaquina=localStorage.getItem("NombreMaquina");
    MinutaPatronAlimentos._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<MinutaPatronAlimentosModel>(url, JSON.stringify(MinutaPatronAlimentos),this.httpOptions)
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
  updateMinutaPatronAlimentos(MinutaPatronAlimentos: MinutaPatronAlimentosModel): Observable<MinutaPatronAlimentosModel> {
    MinutaPatronAlimentos.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("NombreUsuario")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    MinutaPatronAlimentos._usuario=localStorage.getItem('NombreUsuario');
    MinutaPatronAlimentos._accion="Actuializar";
    MinutaPatronAlimentos._ippublica=localStorage.getItem('IpPublica');
    MinutaPatronAlimentos._browser=localStorage.getItem("Browser");
    MinutaPatronAlimentos._nombremaquina=localStorage.getItem("NombreMaquina");
    MinutaPatronAlimentos._sessionid=localStorage.getItem("Ubicacion");

    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<MinutaPatronAlimentosModel>(url, JSON.stringify(MinutaPatronAlimentos),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => MinutaPatronAlimentos),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}





