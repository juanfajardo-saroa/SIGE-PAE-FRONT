/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			:TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    :2022
/// Arquitectura	:Microservicios
/// Capa			:Servicios Observables e injectables de Angular para comunicarse con API REST FULL y capacaidad de incorporara JWT
/// </Derechos_Reservados>


// decorador injectable indica que esta clase Repositorios puede ser inyectada dinamicamente
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


import { RepositoriosService } from "./Repositorios.services";
import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { RepositoriosExtendModel } from "../model/Repositorios-Extend";
import { fileUploadModel } from "../model/fileUpload";



// Se registra la clase como proveedor en el modulo
@Injectable({
  providedIn: "root",
})

// Definición de la Clase Servicios del MOdelo
export class RepositoriosExtendService extends RepositoriosService{

  constructor(
    public http: HttpClient,public messageService:MessageService) {
    super(http, messageService);
  }


  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };


   // CRUD:  Metodo Post  para Adicionar  Registro
   addRepositoriosE(Repositorios: RepositoriosExtendModel): Observable<RepositoriosExtendModel> {
    Repositorios.id = 0;
    Repositorios.auditoria = "";
    const url = `${this.apiurl}/Post/`;
    return this.http
      .post<RepositoriosExtendModel>(url, JSON.stringify(Repositorios),this.httpOptions1)
      .pipe(
        tap((data)=> this.messageService.showInfo("Se  insertaron correctamente los datos",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }
  //ADD:  Metodo Put para Adicionar Archivo en FileStorage de tipo Blob

  addFileBlobRepositorios(fileUpload:fileUploadModel){
    const url = `${this.apiurlFile}/Upload`;

    let urldef = url + "?fileName=" + fileUpload.fileName 

    return this.http
      .put(urldef,fileUpload.file,{responseType:'arraybuffer'})
      .pipe(
        tap((data)=> this.messageService.showInfo("Se cargó correctamente el archivo en el repositorio",'top center')),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 0 veces
        catchError(this.handleError1.bind(this)) // Usamos bind para tener acceso a 'this'  // en caso de error usa el Handle error
      );
  }

  downloadFileBlobRepositorios(fileUpload:fileUploadModel, fileType:string): Observable<any>{
    let fileExtension = fileType;
    //const url = `${this.apiurlFile}/Download`;
    const url = `https://core.sipae.gov.co/sispae-api-modulouapa/api/File/Download`
    let urldef = url + "?fileName=" + fileUpload.fileName 
    return this.http
      .get(urldef,{responseType:'arraybuffer'})
      .pipe(
        tap(()=> this.messageService.showInfo("Se descargó correctamente el archivo en el repositorio",'top center')),
        retry(0),
        catchError(this.handleError1.bind(this))  // en caso de error usa el Handle error
      );
  }

  downloadFileBlobRepositorios2(fileUpload:fileUploadModel, fileType:string): Observable<any>{
    let fileExtension = fileType;
    const url = `${this.apiurlFile}/Download`;
    let urldef = url + "?fileName=" + fileUpload.fileName 
    return this.http
      .get(urldef,{responseType:'arraybuffer'})
      .pipe(
        tap(),
        retry(0),
        catchError(this.handleError1.bind(this))  // en caso de error usa el Handle error
      );
  }

  downloadFileBloUrl(fileUpload:fileUploadModel, fileType:string): Observable<any>{
    let fileExtension = fileType;
    const url = `${this.apiurlFile}/Download`;
    let urldef = url + "?fileName=" + fileUpload.fileName + "&Container=" + fileUpload.container + "&cnx=" + fileUpload.cnx
    return this.http
      .get(urldef,{responseType:'arraybuffer'})
      .pipe(
        tap(),
        retry(0),
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

}





