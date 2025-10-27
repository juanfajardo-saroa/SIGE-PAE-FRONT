import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
  HttpClient,
  HttpResponse,
  HttpContext
} from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { LocalStorageJwt } from '../static/local-storage';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';
import { AspNetUsersService } from '../seguridad/AspNetUsers/AspNetUsers.services';
import { AspNetUsersUpdateInactiveToActiveModel } from '../shared/model/AspNetUsersUpdateInactiveToActive';
import { Router } from '@angular/router';




export interface IRQLogin {
  userName: string;
  password: string;
}

/* @Component({
  styleUrls: ['./interceptor.component.scss']
}) */
export class app implements IRQLogin {
  userName = LocalStorageJwt.LS_USER_TOKEN;
  password = LocalStorageJwt.LS_ACCES_TOKEN_PRIVATE;
}


export interface IRLogin {
  success: true,
  code: string;
  message: string;
  data: string;
  accessToken: string;
}



@Injectable()
export class SISPAEInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private aspNetUsersService: AspNetUsersService,
    private router: Router,
  ) { }



  // Definición de Variables requeridas
  private apiurl = environment.baseUrlAPI + "Authentication";
  ClavePrivada = new app();

  ActualizarUsu: AspNetUsersUpdateInactiveToActiveModel = {
    mail: ''
  }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),


  };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const tokenautorizado = localStorage.getItem('token');
    let requestClone = req;
    let headerSecurity = "{'RolBase':'" + localStorage.getItem("RolBase") + "'}," +
      "{'RolPersonalizado':'" + localStorage.getItem("RolPersonalizado") + "'}," +
      "{'NombreUsuario':'" + localStorage.getItem("NombreUsuario") + "'}," +
      "{'Ubicacion':'" + localStorage.getItem("Ubicacion") + "'}," +
      "{'IpPublica':'" + localStorage.getItem("IpPublica") + "'}," +
      "{'Browser':'" + localStorage.getItem("Browser") + "'}," +
      "{'NombreMaquina':'" + localStorage.getItem("NombreMaquina") + "'}";

    requestClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenautorizado}`)
      //.set('SisPAESecurity', headerSecurity) //JCB Por conflictos con Doker con las tildes se deshabilita 
    });

    return next.handle(requestClone).pipe(catchError((error) => this.herrorHandler(error)));
  }





  // CRUD:  Metodo Post  para Adicionar  Registro
  private loginnew(tokeninicial: IRQLogin): Observable<IRQLogin> {

    const url = `${this.apiurl}/Login`;
    return this.http
      .post<IRQLogin>(url, JSON.stringify(tokeninicial), this.httpOptions)
      .pipe(
        tap((data) => console.log(`Bearer ${data}`)),  // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.herrorHandler)  // en caso de error usa el Handle error
      );
  }




  private herrorHandler(error: HttpErrorResponse): Observable<never> {

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        this.messageService.showInterceptorError('Microservico: Error de Cliente', 'top right');
      } else {
        //console.log('estatus',error.status,error.error);
        if (error.status === 0) {

        } else if (error.status === 401) {
          this.messageService.showInterceptorError('Microservicio: Usted no cuenta con permisos para ingresar', 'top right');
        } else if (error.status === 413) {
          this.messageService.showWarning('El archivo supera el  máximo peso permitido ', 'top right');
        } else if (error.status === 400) {
          var nombresincortar = error.error;
          console.log('nombre cort', nombresincortar);

          // Buscar la posición de la palabra "already" en el mensaje de error
          var indiceAlready = nombresincortar[0].indexOf('already');

          // Verificar si la palabra "already" está presente en el mensaje de error
          if (indiceAlready !== -1) {
            // Si la palabra "already" está presente, mostrar el mensaje de advertencia
            this.messageService.showWarning('Ya existe un usuario activo con el email dado.', 'top right');
          }

        }else {

          this.messageService.showInterceptorError('Microservicio No Responde', 'top right');
          console.log('Status:  ', error.status, 'Error:  ', error.error)
        }
      }
    } else {
      this.messageService.showInterceptorError('Error: LLamada de microservicio', 'top right');
    }
    console.log(error);

    return throwError(error);
  }

  actualizar(email: any): void {
    this.ActualizarUsu.mail = email
    this.aspNetUsersService.updateInactiveToActive(this.ActualizarUsu).subscribe(
      (response) => {
        console.log('rrs');

        this.router.navigate(['/usuarios']).then(() => {
          window.location.reload();
        });

      },
      (err) => {
        console.log('err', err);
      }
    );
  }

}


