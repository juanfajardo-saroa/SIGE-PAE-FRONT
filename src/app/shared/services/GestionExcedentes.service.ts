
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MessageService } from 'src/app/services/message.service';
import { GestionExcedentesModel } from "../model/GestionExcedentes";
import { GestionExcedentesParamsModel } from "../model/GestionExcedentesParams";

@Injectable({
  providedIn: "root",
})
 
export class GestionExcedentesService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  private apiurl = environment.baseUrlAPI_Configuracion + "ExcedentesRaciones";
  private apipaurl = environment.baseUrlAPI_Configuracion + "PA_SedeExcedentes";
  private GestionExcedentes: GestionExcedentesModel[] = [];

  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error en Cliente: '+error.error.message;
    } else {
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage,'top center');
    console.error(errorMessage);
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.'+errorMessage);
  }

  getGestionExcedentesParams(idGrado: number): Observable<GestionExcedentesParamsModel> {
    let params = new HttpParams().set('Id_GradoSedeJornada', idGrado);
    const url = `${this.apipaurl}/GetAll/`;
    return this.http
      .get<GestionExcedentesParamsModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
}


