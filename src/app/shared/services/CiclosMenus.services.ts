import { HttpParams } from '@angular/common/http';
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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad CiclosMenus
 *
 * Capa			    :Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
 *
 * </Derechos_Reservados>
 */

/**
 *  decorador injectable indica que esta clase CiclosMenus puede ser inyectada dinamicamente
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
import { CiclosMenusModel } from "src/app/shared/model/CiclosMenus";


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
export class CiclosMenusService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_PTN + "CiclosMenus";
  private filterArray: CiclosMenusModel[] = [];
  private CiclosMenus: CiclosMenusModel[] = [];
  private CiclosMenusList: CiclosMenusModel[] = [];
  private CiclosMenusObject: CiclosMenusModel;

  //dtOptions: Usado para los DataTables.Settings = {};
  dtOptions: any = {};

  //dtTrigger= new Subject();
  dtTrigger: Subject<any> = new Subject<any>();
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
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
  getCiclosMenusList(): Observable<CiclosMenusModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<CiclosMenusModel>(url)
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
  getCiclosMenusListFull(): Observable<CiclosMenusModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<CiclosMenusModel>(url)
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
    getCiclosMenusListRelationFilterID(id:number): Observable<CiclosMenusModel> {

      const url = `${this.apiurl}/GetAllRelation?%24filter=id%20eq%20${id}`;
      return this.http
        .get<CiclosMenusModel>(url)
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }


    getCiclosMenusListRelationFilter(CicloMenuRequest:CicloMenuRequest): Observable<CiclosMenusModel> {



      let url = `${this.apiurl}/GetAllRelation?%24filter=iD_EstadoRegistro%20eq%20${CicloMenuRequest.iD_EstadoRegistro}`;
      if(CicloMenuRequest.iD_TipoModeloOperacion>0){

        if(url.includes("%20")){
          url = url.concat("%20and%20");
        }
        url = url.concat(`iD_TipoModeloOperacion%20eq%20${CicloMenuRequest.iD_TipoModeloOperacion}`);
      }

      if(CicloMenuRequest.iD_TipoModeloOperacion1>0){

        if(url.includes("%20")){
          url = url.concat("%20or%20");
        }
        url = url.concat(`iD_TipoModeloOperacion%20eq%20${CicloMenuRequest.iD_TipoModeloOperacion1}`);
      }
      if(CicloMenuRequest.iD_TipoModalidadComplemento>0){

        if(url.includes("%20")){
          url = url.concat("%20and%20");
        }
        url = url.concat(`iD_TipoModalidadComplemento%20eq%20${CicloMenuRequest.iD_TipoModalidadComplemento}`);
      }
      if(CicloMenuRequest.ID_ETC>0){
        if(url.includes("%20")){
          url = url.concat("%20and%20");
        }

        url = url.concat(`iD_ETC%20eq%20${CicloMenuRequest.ID_ETC}`);
      }
      if(CicloMenuRequest.iD_EstadoRegistro1>0){
        if(url.includes("%20")){
          url = url.concat("%20or%20");
        }

        url = url.concat(`iD_EstadoRegistro%20eq%20${CicloMenuRequest.iD_EstadoRegistro1}`);
      }
      if(CicloMenuRequest.iD_EstadoRegistro2>0){
        if(url.includes("%20")){
          url = url.concat("%20or%20");
        }

        url = url.concat(`iD_EstadoRegistro%20eq%20${CicloMenuRequest.iD_EstadoRegistro2}`);
      }
      if(CicloMenuRequest.iD_EstadoRegistro3>0){
        if(url.includes("%20")){
          url = url.concat("%20or%20");
        }

        url = url.concat(`iD_EstadoRegistro%20eq%20${CicloMenuRequest.iD_EstadoRegistro3}`);
      }
      return this.http
        .get<CiclosMenusModel>(url)
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }
    getCiclosMenusListRelationFilter2(CicloMenuRequest:CicloMenuRequest): Observable<CiclosMenusModel> {



            let url = `${this.apiurl}/GetAllRelation?%24filter=iD_ETC%20eq%20${CicloMenuRequest.ID_ETC}`;
            if(CicloMenuRequest.iD_TipoModeloOperacion>0){

              if(url.includes("%20")){
                url = url.concat("%20and%20");
              }
              url = url.concat(`iD_TipoModeloOperacion%20eq%20${CicloMenuRequest.iD_TipoModeloOperacion}`);
            }

            if(CicloMenuRequest.iD_TipoModeloOperacion1>0){

              if(url.includes("%20")){
                url = url.concat("%20or%20");
              }
              url = url.concat(`iD_TipoModeloOperacion%20eq%20${CicloMenuRequest.iD_TipoModeloOperacion1}`);
            }
            if(CicloMenuRequest.iD_TipoModalidadComplemento>0){

              if(url.includes("%20")){
                url = url.concat("%20and%20");
              }
              url = url.concat(`iD_TipoModalidadComplemento%20eq%20${CicloMenuRequest.iD_TipoModalidadComplemento}`);
            }

            return this.http
              .get<CiclosMenusModel>(url)
              .pipe(
                tap(),   // para poder realizar efectos secundrios
                retry(0), // reintenta en caso de falla hasta 2 veces
                catchError(this.handleError)  // en caso de error usa el Handle error
              );
          }
  getCiclosMenusListRelation(): Observable<CiclosMenusModel> {


    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<CiclosMenusModel>(url)
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
  getCiclosMenus(id: number): Observable<CiclosMenusModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<CiclosMenusModel>(url)
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
  deleteCiclosMenus(id: number): Observable<CiclosMenusModel> {

    var CiclosMenusObject = new CiclosMenusModel(id,0,'',0,'',0,'',0,'',0,'',0,0,0,'',0,'','',false,false,false,0,'',0,0,0,
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreUsuario"),
    localStorage.getItem('KeyMaster'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("NombreUsuario"),"",'',true,true,true);

    const url = `${this.apiurl}/Delete/`;
    return this.http
      .post<CiclosMenusModel>(url, JSON.stringify(CiclosMenusObject),this.httpOptions)
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
  addCiclosMenus(CiclosMenus: CiclosMenusModel): Observable<CiclosMenusModel> {
    CiclosMenus.id = 0;
    CiclosMenus.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Adicionar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    CiclosMenus._usuario=localStorage.getItem('KeyMaster');
    CiclosMenus._accion="Adicionar";
    CiclosMenus._ippublica=localStorage.getItem('IpPublica');
    CiclosMenus._browser=localStorage.getItem("Browser");
    CiclosMenus._nombremaquina=localStorage.getItem("NombreUsuario");
    CiclosMenus._sessionid=localStorage.getItem("NombreUsuario");

    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<CiclosMenusModel>(url, JSON.stringify(CiclosMenus),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   /**
    *   CRUD:  Metodo Put  para Actualizar  Registro
    *
    *   Como esta clase esta soportada sobre dapper permite realizar filtros en formato LINQ
    */
  updateCiclosMenus(CiclosMenus: CiclosMenusModel): Observable<CiclosMenusModel> {
    var nuevociclo = new CiclosMenusModel(0,0,'',0,'',0,'',0,'',0,'',0,0,0,'',0,'','',false,false,false,0,'',0,0,0,
    localStorage.getItem('IpPublica'),localStorage.getItem("NombreUsuario"),
    localStorage.getItem('KeyMaster'),localStorage.getItem('IpPublica'),
    localStorage.getItem("Browser"),"Eliminar",localStorage.getItem("NombreUsuario"),"","",true,true);

    nuevociclo.iD_EstadoRegistro=CiclosMenus.iD_EstadoRegistro;
    nuevociclo.iD_ETC=CiclosMenus.iD_ETC;
    nuevociclo.nombre=CiclosMenus.nombre;
    nuevociclo.iD_TipoModeloOperacion=CiclosMenus.iD_TipoModeloOperacion;
    nuevociclo.iD_TipoComplemento=CiclosMenus.iD_TipoComplemento;
    nuevociclo.iD_TipoModalidadComplemento=CiclosMenus.iD_TipoModalidadComplemento;
    nuevociclo.iD_MinutaAprobacion=CiclosMenus.iD_MinutaAprobacion;
    nuevociclo.iD_CiclosMenuReferencia=CiclosMenus.iD_CiclosMenuReferencia;
    nuevociclo.iD_TipoNivelEducativo=CiclosMenus.iD_TipoNivelEducativo;
    nuevociclo.iD_Zona=CiclosMenus.iD_Zona;
    nuevociclo.menuReferencia=CiclosMenus.menuReferencia;
    nuevociclo.menusParaTodosNiveles=CiclosMenus.menusParaTodosNiveles;
    nuevociclo.menusParaTodasZonas=CiclosMenus.menusParaTodasZonas;
    nuevociclo.cantidadMenus=CiclosMenus.cantidadMenus;
    nuevociclo.id=CiclosMenus.id;
    nuevociclo.id_menuReferencia=CiclosMenus.id_menuReferencia;
    nuevociclo.id_menusParaTodasZonas=CiclosMenus.id_menusParaTodasZonas;
    nuevociclo.id_menusParaTodosNiveles=CiclosMenus.id_menusParaTodosNiveles;
    nuevociclo.auditoria ="auditoria";
    nuevociclo._usuario=localStorage.getItem('KeyMaster');
    nuevociclo._accion="Actuializar";
    nuevociclo._ippublica=localStorage.getItem('IpPublica');
    nuevociclo._browser=localStorage.getItem("Browser");
    nuevociclo._nombremaquina=localStorage.getItem("NombreUsuario");
    nuevociclo._sessionid=localStorage.getItem("NombreUsuario");
    nuevociclo.auditoria ="{'RolBase':'"+localStorage.getItem("RolBase")+"'},"+
    "{'RolPersonalizado':'"+          localStorage.getItem("RolPersonalizado")+"'},"+
    "{'NombreUsuario':'"+        localStorage.getItem("KeyMaster")+"'},"+
    "{'Ubicacion':'"+    localStorage.getItem("Ubicacion")+"'},"+
    "{'IpPublica':'"+    localStorage.getItem("IpPublica")+"'},"+
    "{'Accion':'"+    "Actualizar"+"'},"+
    "{'Browser':'"+  localStorage.getItem("Browser")+"'},"+
    "{'NombreMaquina':'"+        localStorage.getItem("NombreMaquina")+"'}";
    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<CiclosMenusModel>(url, JSON.stringify(nuevociclo),this.httpOptions)
      .pipe(
        tap((data)=> this.messageService.showInfo("se actualizaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        map(() => nuevociclo),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

}

export class CicloMenuRequest{
  ID_ETC?:number = null;
  iD_TipoModeloOperacion?:number = null;
  iD_TipoModeloOperacion1?:number = null;
  iD_TipoModalidadComplemento?:number = null;
  iD_EstadoRegistro?:number = null;
  iD_EstadoRegistro1?:number = null;
  iD_EstadoRegistro2?:number = null;
  iD_EstadoRegistro3?:number = null;
}

