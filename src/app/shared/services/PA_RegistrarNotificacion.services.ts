import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { tap, catchError, map, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MessageService } from 'src/app/services/message.service';
import { PA_RegistrarNotificacionModel } from "src/app/shared/model/PA_RegistrarNotificacionModel";
import { AspNetRolesService } from "./AspNetRoles.services";
import { PA_ObtenerNotificacionesService } from "./PA_ObtenerNotificaciones.services";
import { AspNetUsersService } from "./AspNetUsers.services";
import { auditoriaModel } from "../model/auditoria";

@Injectable({
  providedIn: "root",
})

export class PA_RegistrarNotificacionService {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  private apiurl = environment.baseUrlAPI_Alertas + "PA_RegistrarNotificacion";
  private filterArray: PA_RegistrarNotificacionModel[] = [];
  private PA_RegistrarNotificacion: PA_RegistrarNotificacionModel[] = [];
  private PA_RegistrarNotificacionList: PA_RegistrarNotificacionModel[] = [];
  private PA_RegistrarNotificacionObject: PA_RegistrarNotificacionModel;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private aspNetRolesService: AspNetRolesService,
    private aspNetUsersService: AspNetUsersService,
    public notificaciones: PA_ObtenerNotificacionesService,
  ) { }

  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error en Cliente: ' + error.error.message;
    } else {
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage, 'top center');
    console.error(errorMessage);
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.' + errorMessage);
  }

  registerNotification(mensaje: string, rol: string, etcParam?: string) {
    let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
    this.aspNetRolesService.getAspNetRolesListFilterByName(rol).subscribe(res => {
      this.getPA_RegistrarNotificacionList(mensaje, "", res[0].id, etc).subscribe(
        res => {
          this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
            this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
          });
        }
      )
    })
  }

  registerNotificationOnly(mensaje: string, rol: string, etcParam?: string) {
    let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
    this.aspNetRolesService.getAspNetRolesListFilterByName(rol).subscribe(res => {
      this.getPA_RegistrarNotificacionList(mensaje, "", res[0].id, etc).subscribe(
        res => {
        }
      )
    })
  }


  registerNotificationOnlyRolId(mensaje: string, rol: string, etcParam?: string) {
    let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
    this.getPA_RegistrarNotificacionList(mensaje, "", rol, etc).subscribe(
      res => {
      }
    )



  }


  registerNotificationOnlyRolIdWithUrl(mensaje: string, rol: string, urlParam: string, etcParam?: string) {
    let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
    this.getPA_RegistrarNotificacionListWithUrl(mensaje, "", rol, null, urlParam).subscribe(
      res => {
      }
    )



  }


  registerNotificationWithUrl(mensaje: string, rol: string, urlParam: string, etcParam?: string) {
    let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
    this.aspNetRolesService.getAspNetRolesListFilterByName(rol).subscribe(res => {
      this.getPA_RegistrarNotificacionListWithUrl(mensaje, "", res[0].id, etc, urlParam).subscribe(
        res => {
          this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
            this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
          });
        }
      )
    })
  }


  registerNotificationByUser(mensaje: string, user: string) {
    this.aspNetUsersService.getAspNetUsersListFilterByName(user).subscribe(res => {
      this.getPA_RegistrarNotificacionList(mensaje, "", res[0].id, "").subscribe(
        res => {
          this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
            this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
          });
        }
      )
    })
  }



  registerNotificationByUserId(mensaje: string, user: string) {

    this.getPA_RegistrarNotificacionList(mensaje, user, "", "").subscribe(
      res => {
        this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
          this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
        });
      }
    )

  }


  getPA_RegistrarNotificacionList(Mensaje: string, userId: string, rolId: string, etc: string): Observable<PA_RegistrarNotificacionModel> {
    let urlActual = window.location.href.substr(window.location.href.indexOf('#') + 1, window.location.href.length);
    let moduloActualString = localStorage.getItem("SistemaSelect").substring(0, 3).toUpperCase();
    let moduloActual = null;
    let auditoria1 ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Adicionar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";
    switch (moduloActualString) {
      case "MIP":
        moduloActual = 2;
        break;
      case "SIG":
        moduloActual = 6;
        break;
      case "UAP":
        moduloActual = 31;
        break;
      default:
        moduloActual = null;
    }
    let params = new HttpParams().set('Mensaje', Mensaje);
    params = moduloActual ? params.append('id_Modulo', moduloActual) : params;
    params = urlActual ? params.append('URL', urlActual) : params;
    params = rolId ? params.append('ID_Rol', rolId) : params;
    params = userId ? params.append('ID_User', userId) : params;
    params = auditoria1 ? params.append('Auditoria', auditoria1) : params;
    params = etc ? params.append('ETC', etc) : params;

    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_RegistrarNotificacionModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getPA_RegistrarNotificacionListWithUrl(Mensaje: string, userId: string, rolId: string, etc: string, urlParam: string): Observable<PA_RegistrarNotificacionModel> {
    let moduloActualString = localStorage.getItem("SistemaSelect").substring(0, 3).toUpperCase();
    let moduloActual = null;
    let auditoria1 ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Adicionar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";
    switch (moduloActualString) {
      case "MIP":
        moduloActual = 2;
        break;
      case "SIG":
        moduloActual = 6;
        break;
      case "UAP":
        moduloActual = 31;
        break;
      default:
        moduloActual = null;
    }
    let params = new HttpParams().set('Mensaje', Mensaje);
    params = moduloActual ? params.append('id_Modulo', moduloActual) : params;
    params = urlParam ? params.append('URL', urlParam) : params;
    params = rolId ? params.append('ID_Rol', rolId) : params;
    params = userId ? params.append('ID_User', userId) : params;
    params = auditoria1 ? params.append('Auditoria', auditoria1) : params;
    params = etc ? params.append('ETC', etc) : params;

    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_RegistrarNotificacionModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  getPA_RegistrarNotificacionListWithoutUrl(Mensaje: string, userId: string, rolId: string): Observable<PA_RegistrarNotificacionModel> {
    let urlActual = null;
    let moduloActualString = localStorage.getItem("SistemaSelect").substring(0, 3).toUpperCase();
    let etc = localStorage.getItem("IdUbicacion");
    let moduloActual = null;
    let auditoria1 ="(RolBase:"+localStorage.getItem("RolBase")+"),"+
    "(RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+"),"+
    "(NombreUsuario:"+localStorage.getItem("NombreUsuario")+"),"+
    "(Ubicacion:"+localStorage.getItem("Ubicacion")+"),"+
    "(IpPublica:"+localStorage.getItem("IpPublica")+"),"+
    "(Accion:"+"Adicionar"+"),"+
    "(Browser:"+localStorage.getItem("Browser")+"),"+
    "(NombreMaquina:"+localStorage.getItem("NombreMaquina")+")";
    switch (moduloActualString) {
      case "MIP":
        moduloActual = 2;
        break;
      case "SIG":
        moduloActual = 6;
        break;
      case "UAP":
        moduloActual = 31;
        break;
      default:
        moduloActual = null;
    }
    let audit = null;
    let params = new HttpParams().set('Mensaje', Mensaje);
    params = moduloActual ? params.append('id_Modulo', moduloActual) : params;
    params = urlActual ? params.append('URL', urlActual) : params;
    params = rolId ? params.append('ID_Rol', rolId) : params;
    params = userId ? params.append('ID_User', userId) : params;
    params = auditoria1 ? params.append('Auditoria', auditoria1) : params;
    params = etc ? params.append('ETC', etc) : params;

    const url = `${this.apiurl}/GetAll`;
    return this.http
      .get<PA_RegistrarNotificacionModel>(url, { params: params })
      .pipe(
        tap(),   // para poder realizar efectos secundrios
        retry(0), // reintenta en caso de falla hasta 2 veces
        catchError(this.handleError)  // en caso de error usa el Handle error
      );
  }

  registerNotificationWithUrlAsync(mensaje: string, rol: string, urlParam: string, etcParam?: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
        this.aspNetRolesService.getAspNetRolesListFilterByName(rol).subscribe(res => {
            this.getPA_RegistrarNotificacionListWithUrl(mensaje, "", res[0].id, etc, urlParam).subscribe(
                res => {
                    this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
                        this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
                        resolve(res);
                    }, err => reject(err));
                }, err => reject(err)
            );
        }, err => reject(err));
    });
}

registerNotificationOnlyRolIdWithUrlAsync(mensaje: string, rol: string, urlParam: string, etcParam?: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let etc = etcParam ? etcParam : localStorage.getItem("IdUbicacion");
        this.getPA_RegistrarNotificacionListWithUrl(mensaje, "", rol, null, urlParam).subscribe(
            res => {
                resolve(res);
            }, err => reject(err)
        );
    });
}
}
