import { SedesService } from 'src/app/shared/services/Sedes.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';


import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { environment } from 'src/environments/environment';


import { PA_DiagnosticoInfraEstModel } from 'src/app/shared/model/PA_DiagnosticoInfraEstModel';
import { MatrizRiesgo } from '../model/MatrizRiesgoModel';




@Injectable({
  providedIn: 'root'
})
export class SedesExtendService extends SedesService{

  constructor(public http: HttpClient,public messageService:MessageService) {
    super( http, messageService);
  }
  public apiurls = environment.baseUrlAPI_Infraestructura + "PA_DiagnosticoInfraEst";
  public apiurlsMatriz = environment.baseUrlAPI_Infraestructura + "PA_MatrizRiesgosSede";

  // CRUD:  Metodo GetAll para traer todos los registros
  getSedesDiagnosticoOpertivas(): Observable<PA_DiagnosticoInfraEstModel> {
    const url = `${this.apiurls}/GetAll/`;
    return this.http
      .get<PA_DiagnosticoInfraEstModel>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


  getMatrizRiesgosSede(idETC : number): Observable<MatrizRiesgo> {
    const url = `${this.apiurlsMatriz}/GetAll?id_ETC=${idETC}`;
    return this.http
      .get<MatrizRiesgo>(url)
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}
