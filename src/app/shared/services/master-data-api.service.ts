import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators'

import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';

@Injectable({
  providedIn: "root",
})

export class MasterDataApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };
  
  // List
  public get_Divipolas(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}Divipolas/GetDivipolas/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_MunicipiosByETC(idETC: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}Generic/GetMunicipiosByETC/${idETC}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

 // List
 public GetMunicipiosByDepartamentoETC(idETC: number): Observable<dataresult> {
  return this.http.get<dataresult>(`${environment.apiURI_MasterData}Generic/GetMunicipiosByDepartamentoETC/${idETC}`)
    .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

}

  // List
  public get_InstitucionByMunicipioETC(idETC: number, idMunicipio: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}Generic/GetInstitucionByMunicipioETC/${idETC}/${idMunicipio}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_Sedes(idInstitucion: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}Generic/GetSedesByInstitucionETC/${idInstitucion}`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_ZonasDivipolasPorETC(idETC: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}ETC/GetZonasDivipolasByETC/${idETC}/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // Put
  public UpdateZonasDivipolas(params): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_MasterData}ETC/UpdateZonasDivipolas/`, params)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_ETs(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}ETCET/ETCETGetAll/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_ETCs(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}ETC/ListadoETC/`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  // List
  public get_ModeloOperacion(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}TiposModeloOperacion/GetTiposModeloOperacion`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // List
  public get_ListadoTipoReglaComprasLocales(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}TipoReglaComprasLocales/ListadoTipoReglaComprasLocales`)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // List
  public get_ListadoTiposCriterioEvaluacion(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_MasterData}TiposCriterioEvaluacion/ListadoTiposCriterioEvaluacion`)
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
