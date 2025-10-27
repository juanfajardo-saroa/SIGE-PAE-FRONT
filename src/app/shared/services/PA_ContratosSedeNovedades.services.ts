/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase PA_ContratosSedeNovedades puede ser inyectada dinamicamente
import { Injectable } from "@angular/core";
// HttpClient es el mecanismo para comunicarse con un servidor remoto a través de HTTP
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
//  observables para manejar operaciones asíncronas
import { from, Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { NgModule, ErrorHandler } from "@angular/core";
import { switchMap } from "rxjs/operators";
// importa variables de entrono requeridas
import { environment } from "src/environments/environment";
// manejo de mensajes de error
import { MessageService } from 'src/app/services/message.service';
//
// Importa el Modelo del Objeto a gestionar principal y objetos relacionados requeridos
//
import { fileUploadModel } from "src/app/shared/model/fileUpload";
import { PA_ContratosSedeNovedadesModel } from 'src/app/shared/model/PA_ContratosSedeNovedadesModel';

// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class PA_ContratosSedeNovedadesService {
  constructor(private http: HttpClient,private messageService:MessageService) {}

  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI_Contratos + "PA_ContratosSedeNovedades";
  public apiurlFile = environment.baseUrlAPI_ModuloUApa + "File";
  private filterArray: PA_ContratosSedeNovedadesModel[] = [];
  private PA_ContratosSedeNovedades: PA_ContratosSedeNovedadesModel[] = [];
  private PA_ContratosSedeNovedadesList: PA_ContratosSedeNovedadesModel[] = [];

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
    this.messageService.showInfo(errorMessage,'top center');
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.'+errorMessage);
  }

  // CRUD:  Metodo GetAll para traer todos los registros
  getPA_ContratosSedeNovedadesList(ObjetoModel: PA_ContratosSedeNovedades): Observable<PA_ContratosSedeNovedadesModel> {
    let params = new HttpParams().set('id_Contrato', ObjetoModel.id_Contrato);
   

    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_ContratosSedeNovedadesModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
downloadFileBlobRepositorios(fileUpload:fileUploadModel, fileType:string): Observable<any>{
    let fileExtension = fileType;
    const url = `${this.apiurlFile}/Download`;
    let urldef = url + "?fileName=" + fileUpload.fileName + "&Container=" + fileUpload.container + "&cnx=" + fileUpload.cnx
    return this.http
      .get(urldef,{responseType:'arraybuffer'})
      .pipe(
        tap(()=> this.messageService.showInfo("Se descargó correctamente el archivo en el repositorio",'top center')),
        retry(0),
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }


}

export class  PA_ContratosSedeNovedades{
  id_Contrato?: number;
  id_divipola?: number = null;
  id_IE?: number = null;
  id_sede?: number = null;
 
}





