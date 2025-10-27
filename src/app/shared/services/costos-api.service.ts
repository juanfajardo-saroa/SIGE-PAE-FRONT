import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators'

import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';
import { NumericLiteral } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class CostosApiService {

   
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };
  
    constructor(private http: HttpClient) { }
  
    // Post
    public AddETCDiasPAE(param: any): Observable<dataresult> {

      return this.http.post<dataresult>(`${environment.apiURI_Costos}Calendario/AddETCDiasPAE`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // Get
    public get_CoberturaFinancieraResumenETC(idETC: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCoberturaFinancieraResumenETC/${idETC}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );

    }

    // Get
    public get_GetCostosCoberturaMAEMPorETC(idETC: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}/CostosCobertura/GetCostosCoberturaMAEMPorETC/${idETC}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // List
    public get_GetCostosCoberturaMAERPorETC(idETC: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}/CostosCobertura/GetCostosCoberturaMAERPorETC/${idETC}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // Get
    public GetETCDiasPAE(idETC: number, idTipoModeloOperacion: number, idVigencia: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Costos}Calendario/GetETCDiasPAE/${idETC}/${idTipoModeloOperacion}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    // Get
    public ReplicarDiasCalendario(idETC: number, idTipoModeloOperacion: number, idVigencia: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Costos}Calendario/ReplicarDiasCalendario/${idETC}/${idTipoModeloOperacion}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }


    // METODOS COSTOS COBERTURA
    public get_CostoTotalProgramaETC(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCostoTotalProgramaETC/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }
    //METODOS MAEM
    public get_GetPreciosCostosCoberturaMAEM(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetPreciosCostosCoberturaMAEM/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    public get_GetCostosCoberturaMAEM(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCostosCoberturaMAEM/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    //METODOS MAER
    public get_GetPreciosCostosCoberturaMAER(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetPreciosCostosCoberturaMAER/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    public get_GetCostosCoberturaMAER(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCostosCoberturaMAER/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    //METODOS MAIP
    public get_GetPreciosCostosCoberturaMAIP(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
        return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetPreciosCostosCoberturaMAIP/${idETC}/${idTipo}/${idVigencia}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public get_GetCostosCoberturaMAIP(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCostosCoberturaMAIP/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
  }

  //METODOS PAEC
  public get_GetPreciosCostosCoberturaPAEC(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetPreciosCostosCoberturaPAEC/${idETC}/${idTipo}/${idVigencia}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  public get_GetCostosCoberturaPAEC(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
    return this.http.get<dataresult>(`${environment.apiURI_Costos}CostosCobertura/GetCostosCoberturaPAEC/${idETC}/${idTipo}/${idVigencia}`)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }


    public put_PutCostosCoberturaMAEM(param: any): Observable<dataresult> {
        return this.http.put<dataresult>(`${environment.apiURI_Costos}CostosCobertura/UpdatePreciosCostosCoberturaMAEM/`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public put_PutCostosCoberturaMAER(param: any): Observable<dataresult> {
        return this.http.put<dataresult>(`${environment.apiURI_Costos}CostosCobertura/UpdatePreciosCostosCoberturaMAER`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public put_PutCostosCoberturaMAIP(param: any): Observable<dataresult> {
        return this.http.put<dataresult>(`${environment.apiURI_Costos}CostosCobertura/UpdatePreciosCostosCoberturaMAIP`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public put_PutCostosCoberturaPAEC(param: any): Observable<dataresult> {
      return this.http.put<dataresult>(`${environment.apiURI_Costos}CostosCobertura/UpdatePreciosCostosCoberturaPAEC`, param)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
  }


    // METODOS RESUMEN
    public get_GetResumenPriorizacionMAEM(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}Priorizacion/GetResumenPriorizacionMAEM/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), 
          catchError(this.handleError) 
      );
    }

    public get_GetResumenPriorizacionMAER(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}Priorizacion/GetResumenPriorizacionMAER/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), 
          catchError(this.handleError) 
      );
    }

    public get_GetResumenPriorizacionMAIP(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}Priorizacion/GetResumenPriorizacionMAIP/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0),
          catchError(this.handleError) 
      );
    }

    public get_GetResumenPriorizacionPAEC(idETC: number, idTipo: number, idVigencia: number): Observable<dataresult> {
      return this.http.get<dataresult>(`${environment.apiURI_Costos}Priorizacion/GetResumenPriorizacionPAEC/${idETC}/${idTipo}/${idVigencia}`)
      .pipe(
          retry(0), 
          catchError(this.handleError) 
      );
    }



      // METODOS OTROS COSTOS

      public get_GetOtrosCostos(idETC: number, idTipo: number): Observable<dataresult> {
        return this.http.get<dataresult>(`${environment.apiURI_Costos}OtrosCostos/GetListOtrosCostos/${idETC}/${idTipo}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
      }

      public get_GetOtrosCostosPorId(idOtrosCostos: number): Observable<dataresult> {
        return this.http.get<dataresult>(`${environment.apiURI_Costos}OtrosCostos/GetOtrosCostosPorId/${idOtrosCostos}}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
      }

      public delete_OtrosCostosPorId(idOtrosCostos: number): Observable<dataresult> {          
          return this.http.delete<dataresult>(`${environment.apiURI_Costos}OtrosCostos/DeleteOtrosCostosPorId/${idOtrosCostos}` )          
          .pipe(
              retry(0), // retry a failed request up to 3 times
              catchError(this.handleError) // then handle the error
          );
      }

      public put_OtrosCostos(param: any): Observable<dataresult> {
        return this.http.put<dataresult>(`${environment.apiURI_Costos}OtrosCostos/PutOtrosCostos/`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
      }

      public post_OtrosCostos(param: any): Observable<dataresult> {
        
        return this.http.post<dataresult>(`${environment.apiURI_Costos}OtrosCostos/PostOtrosCostos`, param )
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
      }

      public put_OtrosCostosAll(param: any): Observable<dataresult> {        
       // 
        return this.http.put<dataresult>(`${environment.apiURI_Costos}OtrosCostos/PutOtrosCostosAll`, param )
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
