// decorador injectable indica que esta clase :tabla puede ser inyectada dinamicamente
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
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//
import { SedesModel } from "./Sedes";

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class SedesService {
  constructor(private http: HttpClient) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI + "Sedes";
  private filterArray: SedesModel[] = [];
  private sedes: SedesModel[] = [];
  private sedesList: SedesModel[] = [];

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
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.'+errorMessage);
  }


  // CRUD:  Metodo GetAll para traer todos los registros
  getSedesList(): Observable<SedesModel> {
    const url = `${this.apiurl}/GetAll/`;
    return this.http
      .get<SedesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAllFull para traer todos los registros con todos los tipos de campo
  getSedesListFull(): Observable<SedesModel> {
    const url = `${this.apiurl}/GetAllFull/`;
    return this.http
      .get<SedesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  // CRUD:  Metodo GetAll para traer todos los registros con los nombres de las foraneas asociadas
  getSedesListRelation(): Observable<SedesModel> {
    const url = `${this.apiurl}/GetAllRelation`;
    return this.http
      .get<SedesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   // CRUD:  Metodo GetAll para traer todos los registros con suscripción
  getAllList(): Observable<SedesModel> {
    const url = `${this.apiurl}/GetAll/`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.filterArray = response;
        this.dtTrigger.next();
        },
      (err) => {
        console.log("-----> error en cargar los registros", err);
      }
    );
    return from(this.sedes);
  }


   // CRUD:  Metodo GetById para traer un solo registro
  getSedes(id: number): Observable<SedesModel> {
    const url = `${this.apiurl}/GetById/${id}`;
    return this.http
      .get<SedesModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


   // CRUD:  Metodo Delete Eliminar Registro
  deleteSedes(id: number): Observable<SedesModel> {
    const url = `${this.apiurl}/Delete/${id}`;
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
    };
    this.sedes = this.sedes.filter((SedesModel) => SedesModel.id !== id);
    return this.http
      .delete<SedesModel>(url, this.httpOptions)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


  // CRUD:  Metodo Post  para Adicionar  Registro
  addSedes(Sedes: SedesModel): Observable<SedesModel> {
    Sedes.id = 0;
    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<SedesModel>(url, JSON.stringify(Sedes), this.httpOptions)
      .pipe(
        tap((data) => console.log(data)),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

   // CRUD:  Metodo Put  para Actualizar  Registro
  updateSedes(index: number, Sedes: SedesModel): Observable<SedesModel> {
    const url = `${this.apiurl}/Put/`;
    return this.http
      .put<SedesModel>(url, JSON.stringify(Sedes), this.httpOptions)
      .pipe(
        map(() => Sedes),
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}
