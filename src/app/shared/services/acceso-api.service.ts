import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { dataresult } from '../model/core/dataresult.model';


@Injectable({
    providedIn: "root",
  })

export class AccesosApiService {
    
    httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
    
    
      };


    constructor(private http: HttpClient) { }

    private buildAudit(accion: string): string {
        let auditoria: string = "{'RolBase':'"+ localStorage.getItem("RolBase") +"'},"+
                                "{'RolPersonalizado':'"+ localStorage.getItem("RolPersonalizado") +"'},"+
                                "{'NombreUsuario':'"+ localStorage.getItem("NombreUsuario") +"'},"+
                                "{'Ubicacion':'"+ localStorage.getItem("Ubicacion") +"'},"+
                                "{'IpPublica':'"+ localStorage.getItem("IpPublica") +"'},"+
                                "{'Accion':'"+ accion +"'},"+
                                "{'Browser':'"+ localStorage.getItem("Browser") +"'},"+
                                "{'NombreMaquina':'"+ localStorage.getItem("NombreMaquina") +"'}";

        return auditoria;
    }

    
    // List
    public get_Transporte(id: number): Observable<dataresult> {
        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectosSede/ConsultaResRutaAcceso/${id}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public getList_MedioTransporte(): Observable<dataresult> {

        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosMedioTransporte/ListarMedioTransporte`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public getList_TipoTransporte(): Observable<dataresult> {

        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTiposTransporte/ListarTiposTransportre`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public getList_Trayectos(): Observable<dataresult> {

        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/ListarTrayectos`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    //
    public get_PorDefecto(Sedeid: number, CentroAcopioId: number, TipoETCId: number): Observable<dataresult> {

        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/TrayectoXDefecto?SedeId=${Sedeid}&CentroAcopioId=${CentroAcopioId}&TipoETCId=${TipoETCId}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    // CRUD Trayectos
    public put_Trayectos(param: any): Observable<dataresult> {
        param.auditoria = this.buildAudit('Actualizar');
        return this.http.put<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/ActualizarTrayectos`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public post_Trayectos(param: any): Observable<dataresult> {
        param.auditoria = this.buildAudit('Adicionar');
        return this.http.post<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/InsertarTrayectos`, param)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public del_Trayectos(id: any): Observable<dataresult> {
        return this.http.delete<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/EliminarTrayectos?TrayectoId=${id}`)
        .pipe(
            retry(0), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );

    }

    public get_TrayectoSede(id: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectosSede/TrayectosXSedeList/${id}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    public get_TiposAccesoSedeList(id: number): Observable<dataresult> {

      return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectosSede/TiposAccesoSedeList/${id}`)
      .pipe(
          retry(0), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    public get_SedeList(idEtc: number, idAcceso: number): Observable<dataresult> {

        return this.http.get<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectosSede/TiposAccesoSedeListGetId/${idEtc}/${idAcceso}`)
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
