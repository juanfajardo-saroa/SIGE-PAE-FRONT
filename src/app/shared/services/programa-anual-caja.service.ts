import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaAnualCajaService {

  
  constructor(private http: HttpClient) { }

// List
    public get_PlanAnualCaja(idETC: number, idVigencia: number){
      return this.http.get<dataresult>(`${environment.apiURI_Pac}PlanAnualCaja/GetPreciosCostosCoberturaMAEM/${idETC}/${idVigencia}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    public post_PlanAnualCaja(param: any): Observable<dataresult> {    
      
      return this.http.post<dataresult>(`${environment.apiURI_Pac}PlanAnualCaja/GuardarPAC`, param )
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
