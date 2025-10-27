import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { dataresult } from '../model/core/dataresult.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionRecursosApiService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };
    constructor(private http: HttpClient) { }

    // Post
    public AgregarAsignacionRecursos(param: any): Observable<dataresult> {

      return this.http.post<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/AgregarAsignacionRecursos/`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Put
    public EditarAsignacionRecursos(param: any): Observable<dataresult> {

      return this.http.put<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/EditarAsignacionRecursos/`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );


    }

    // Post
    public ExisteNombreReslucionPorVigencia(param: any): Observable<dataresult> {
      return this.http.post<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/ExisteNombreResolucionPorVigencia`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Get
    public GetAsignacionRecurso(id: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/GetAsignacionRecurso/${id}/`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Get
    public GetAsignacionesRecursos(idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/GetAsignacionesRecursos/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Get
    public VerAsignacionRecursosPublicadas(idETC: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/VerAsignacionRecursosPublicadas/${idETC}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Delete
    public EliminarAsignacionRecursos(id: number): Observable<dataresult> {
      return this.http.delete<dataresult>(`${environment.apiURI_AsignacionRecursos}AsignacionRecursos/EliminarAsignacionRecursos/${id}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // FUENTES DE FINANCIACION

    // List
    public get_FuentesFinanciacion(): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}FuentesFinanciacion/GetFuentesFinanciacion/`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

  }

  public get_FuentesFinanciacionPorETCyTipo(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}FuentesFinanciacion/GetFuentesFinanciacionPorETCyTipo/${idETC}/${idTipo}/${idVigencia}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_PresupuestoGeneralETC(idETC: number, idVigencia: number){
    return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}FuentesFinanciacion/GetPresupuestoGeneralETC/${idETC}/${idVigencia}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public post_ActualizacionIngresos(params: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_AsignacionRecursos}FuentesFinanciacion/AgregarFuentesFinanciacion/`, params)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );

  }

    // FuentesCHIP

    // Get
    public get_FuenteIngresos(id: any): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_AsignacionRecursos}FuenteIngresos/GetFuenteIngresos/${id}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }


    // Errors
    private handleError(error: HttpErrorResponse) {

        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
    }

}
