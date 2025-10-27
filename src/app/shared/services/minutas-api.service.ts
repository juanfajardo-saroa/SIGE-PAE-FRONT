import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators'

import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';

@Injectable({
  providedIn: 'root'
})
export class MinutasApiService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };
  
  constructor(private http: HttpClient) { }

  // List
  public get_MinutaPatronAlimentoConfiguracion(iD_TipoModeloOperacion: number, modalidadComplementoId: number, tipoLista: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Contratos}AlimentosMenuMinutaPatronConfiguracion/AlimentosMenuMinutaPatronConfiguracionGetID/${iD_TipoModeloOperacion}/${modalidadComplementoId}/${tipoLista}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  // List
  public get_MinutaExepcionalPAEPI(idETC: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/MinutaExepcionalPAEPI/${idETC}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  // List
  public get_VigenciasAnteriores(iD_Vigencia: number, iD_TipoModeloOperacion: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetMinutaExcepcionalAgrupado/${iD_Vigencia}/${iD_TipoModeloOperacion}/`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  // List
  public get_IdMinutaPatronAlimento(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Minutas}Minuta/GetValidacionMinutaPatronAlimento`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_AlimentosMinuta(iD_MinutaPatronAlimento: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetCreacionMinutaAlimentos/${iD_MinutaPatronAlimento}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_AlimentosMinutaMAER(iD_MinutaPatronAlimento: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetCreacionMinutaAlimentosMAER/${iD_MinutaPatronAlimento}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_NutrientesMinuta(iD_MinutaPatronAlimento: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetCreacionMinutaNutrientes/${iD_MinutaPatronAlimento}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_NivelEducativos(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetNivelEducativos`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_TiposActividadFisica(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetTiposActividadFisica`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_TiposModalidadRacion(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetTiposModalidadRacion`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_TiposRacion(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetTiposRacion`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_Frecuencias(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetFrecuencias`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public UpdateAlimentosNutrientesPatron(id: number, param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateAlimentosNutrientesPatron/${id}`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public UpdateAlimentosNutrientesPatronComponente(id: number,iD_TipoComponente: number, param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateAlimentosNutrientesMinutaComponente/${id}/${iD_TipoComponente}`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }


  public updateAlimentosNutrientesMinuta(id: number, param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateAlimentosNutrientesMinuta/${id}`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_MinutasExcepcional(iD_ETC: number, iD_Vigencia: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetMinutasExcepcionales/${iD_ETC}/${iD_Vigencia}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_ValidacionMinutaExcepcionalCreacion(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Minutas}Minuta/GetValidacionMinutaExcepcionalCreacion`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public updateCreacionMinutaExcepcional(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateCreacionMinutaExcepcional`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public updateTipoEstadoExcepcional(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateTipoEstadoExcepcional`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public eliminarMinutaExcepcional(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/MinutaExcepcionalBorrar`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_ValidacionEstadoMinutaExcepcional(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${environment.apiURI_Minutas}Minuta/GetValidacionEstadoMinutaExcepcional`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_MinutaExcepcionalAgrupado(iD_Vigencia: number, iD_TipoModeloOperacion: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetMinutaExcepcionalAgrupado/${iD_Vigencia}/${iD_TipoModeloOperacion}/`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public UpdateCambiarEstadoAprobacion(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateCambiarEstadoAprobacion`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public UpdateEstadoMinutaExcepcional(param: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateEstadoMinutaExcepcional`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_MinutaAprobacionGetID(iD_MinutaAprobacion: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/MinutaAprobacionGetID/${iD_MinutaAprobacion}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_GrupoAlimentos(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetGrupoAlimentos/`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_GruposModeloTipo(ID_TipoModeloOperacion : number, ID_ModalidadComplemento : number, ID_TipoComplemento : number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GruposModeloTipoGet/${ID_TipoModeloOperacion}/${ID_ModalidadComplemento}/${ID_TipoComplemento}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_SubGruposModeloTipo(ID_TipoModeloOperacion : number, ID_ModalidadComplemento : number, ID_TipoComplemento : number, ID_GrupoAlimento : number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/SubGruposModeloTipoGet/${ID_TipoModeloOperacion}/${ID_ModalidadComplemento}/${ID_TipoComplemento}/${ID_GrupoAlimento}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }


  public get_SubGrupos(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetSubGrupos`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_listGranajeUnidad(): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}General/GetTiposUnidad/`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_listMinutaDiferencialenUso(idETC: number, idVigencia: number){
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/MinutaDiferencialenUsoGet/${idETC}/${idVigencia}`)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public UpdateAlimentosMinutaComponenteEstado(iD_MinutaPatronAlimento: number, iD_TipoComponente: number, body: any): Observable<dataresult> {
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}Minuta/UpdateAlimentosMinutaComponenteEstado/${iD_MinutaPatronAlimento}/${iD_TipoComponente}`, body)
    .pipe(
        retry(0),
        catchError(this.handleError)
    );
  }

  public GetMinutaAlimentosComponente(minutaPatronAlimentoID: number, ID_TipoComponente: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}Minuta/GetMinutaAlimentosComponente/${minutaPatronAlimentoID}/${ID_TipoComponente}`)
    .pipe(
        retry(0),
        catchError(this.handleError)
    );
  }

  //#region MinutaExcepcional Minuta MAEM Leve
  public get_AlimentosMenuMinutaPatronAlimentosLeve(idETC: number, idTipoModeloOperacion: number, idTipoActividadFisica: number){
    return this.http.get<dataresult>(`${environment.apiURI_Minutas}MinutaPatronAlimentosLeve/GetAlimentosMenuMinutaPatronAlimentosLeve/${idETC}/${idTipoModeloOperacion}/${idTipoActividadFisica}`)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
  
  public add_AlimentosMenuMinutaPatronAlimentosLeve(param: any){
    return this.http.post<dataresult>(`${environment.apiURI_Minutas}MinutaPatronAlimentosLeve/AddAlimentosMenuMinutaPatronAlimentosLeve`, param)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public put_AlimentosMenuMinutaPatronAlimentosLeve(param: any){
    return this.http.put<dataresult>(`${environment.apiURI_Minutas}MinutaPatronAlimentosLeve/UpdateAlimentosMenuMinutaPatronAlimentosLeve`, param)
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
  //#endregion
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
