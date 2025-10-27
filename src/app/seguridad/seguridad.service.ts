import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  credencialesUsuario,
  respuestaAutenticacion,
  usuarioDTO
} from './seguridad';
import { DatePipe } from '@angular/common';
import { AspNetUsersModel } from 'src/app/shared/model/AspNetUsers';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';

import { PA_GetRolPermisosModel } from 'src/app/shared/model/PA_GetRolPermisosModel';
import { PA_GetRolPermisosService } from 'src/app/shared/services/PA_GetRolPermisos.services';
import * as utf8 from "utf8";
import { VigenciasService } from '../shared/services/Vigencias.services';
import { VigenciasModel } from '../shared/model/Vigencias';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AspNetUsersService } from './AspNetUsers/AspNetUsers.services';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  public dataSourceVig!: MatTableDataSource<VigenciasModel>;
  isLoading = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public SeguridadServicio: PA_GetRolPermisosService,
    public VigenciasServicio: VigenciasService,
    public _authService: AspNetUsersService,
  ) { }

  apiURL = environment.baseUrlAPI_Seguridad + 'cuentas';

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';
  private readonly llaveRol = 'RolBase';
  private readonly llaveRolTemporal = 'RolPersonalizado';
  private readonly llaveUsuario = 'NombreUsuario';
  private readonly llaveUbicacion = 'Ubicacion';
  private readonly llaveUbicacionShort = 'UbicacionShort';
  private readonly llaveUbicacionShow = 'UbicacionShow';
  private readonly llaveIdUbicacion = 'IdUbicacion';
  private readonly llaveIpPublica = 'IpPublica';
  private readonly llaveNombreMaquina = 'NombreMaquina';
  private readonly llaveIPDetrasProxy = 'IpInterna';
  private readonly llaveKeyMaster = 'KeyMaster';
  private readonly llaveKeyPersonalizado = 'KeyPersonalizado';
  private readonly llaveKeyBase = 'KeyBase';
  private readonly llaveMenuMipae = 'MenuMipae';
  private readonly llaveMenuSigepae = 'MenuSigepae';
  private readonly llaveMenuSigenaUapa = 'MenuSigenaUapa';
  private readonly llaveSistema = 'Sistema';
  private readonly VigenciaSeleccionada = 'VigSeleccionada';
  private readonly VigenciaNoSeleccionada = 'VigNoSeleccionada';
  private readonly VigenciaSeleccionadaJson = 'VigSeleccionadaJson';
  private readonly llaveRolSuperAdmonUAPA = 'RolSuperUapa';
  private readonly llaveRolSuperAdmonUAPAInicio = 'RolSuperAdmonUAPAInicio';
  private readonly llaveKeylayoutA = 'KeylayoutA';
  private readonly llaveKeylayoutB = 'KeylayoutB';
  private readonly llaveKeylayoutC = 'KeylayoutC';
  private readonly llaveKeylayoutD = 'KeylayoutD';
  private readonly LLaveRolUapa='RolUapa';





  private readonly llaveBrowser = 'Browser';
  private readonly llaveCargo = 'Cargo';


  public permisos: PA_GetRolPermisosModel[] = [];
  public dataSource: PA_GetRolPermisosModel[];
  public dataArray: any;

  public ipAddress = '';



  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.httpClient.get<usuarioDTO[]>(`${this.apiURL}/listadousuarios`, {
      observe: 'response',
      params,
    });
  }

  hacerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiURL}/hacerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  removerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiURL}/removerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }
    const sistema = localStorage.getItem('SistemaSelect');


    if (localStorage.getItem('SistemaSelect') == null || localStorage.getItem('SistemaSelect') == undefined) {
      return false
    }
    if (localStorage.getItem('Sistema') == null || localStorage.getItem('Sistema') == undefined) {
      return false
    }



    if (localStorage.getItem('Inicio') == null || localStorage.getItem('Inicio') == undefined || localStorage.getItem('Inicio') == 'true') { return false; }




    // if (localStorage.getItem('nombreSistema')==null || localStorage.getItem('nombreSistema')==undefined )
    // {
    //   return false
    // }



    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);
    if (this.tokenExpired(token)) {
      this.logout();
    }
    return true;
  }




  logout() {
    let userId = localStorage.getItem("KeyMaster")
    this._authService.logoutUser(userId).subscribe(
      (res) => {
        localStorage.clear();
        localStorage.setItem('KeylayoutA','No');
        localStorage.setItem('KeylayoutB','No');
        localStorage.setItem('KeylayoutC','No');
      //  window.location.reload();
        this.router.navigate(["/Login"]);
      },
      (error) => {
      }
    );
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveRol);
    localStorage.removeItem(this.llaveUsuario);
    localStorage.removeItem(this.llaveUbicacion);
    localStorage.removeItem(this.llaveIdUbicacion);
    localStorage.removeItem(this.llaveIpPublica);
    localStorage.removeItem(this.llaveBrowser);
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveNombreMaquina);
    localStorage.removeItem(this.llaveKeyMaster);
    localStorage.removeItem(this.llaveCargo);
    localStorage.removeItem(this.llaveKeyPersonalizado);
    localStorage.removeItem(this.llaveIdUbicacion);
    localStorage.removeItem(this.llaveMenuMipae);
    localStorage.removeItem(this.llaveMenuSigepae);
    localStorage.removeItem(this.llaveMenuSigenaUapa);

    localStorage.clear();
    localStorage.setItem('KeylayoutA','No');
    localStorage.setItem('KeylayoutB','No');
    localStorage.setItem('KeylayoutC','No');

  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(
    credenciales: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + '/crear',
      credenciales
    );
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + 'Login',
      credenciales
    );
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveSistema, 'false');
    localStorage.setItem(this.llaveMenuMipae, 'false');
    localStorage.setItem(this.llaveMenuSigepae, 'false');
    localStorage.setItem(this.llaveMenuSigenaUapa, 'false');
    localStorage.setItem(this.VigenciaNoSeleccionada, "0");
    localStorage.setItem(this.VigenciaSeleccionada, "0");
    localStorage.setItem(this.VigenciaSeleccionadaJson, "");
    localStorage.setItem(this.llaveRolSuperAdmonUAPA, "No");
    localStorage.setItem(this.llaveRolSuperAdmonUAPAInicio,'No')
    localStorage.setItem(this.llaveKeylayoutA,'Si');
    localStorage.setItem(this.llaveKeylayoutB,'Si');
    localStorage.setItem(this.llaveKeylayoutC,'Si');
    localStorage.setItem(this.llaveKeylayoutD,'Si');
    localStorage.setItem(this.LLaveRolUapa,'No');
    localStorage.setItem(this.llaveIpPublica, '127.0.0.0');
    localStorage.setItem(this.llaveIPDetrasProxy,'0.0.0.0');
    this.getIP().then(data => localStorage.setItem(this.llaveIPDetrasProxy, data.ip));//64
    fetch('https://api.ipify.org/?format=json')
    .then((results) => results.json())
    .then((data) => localStorage.setItem(this.llaveIpPublica, data.ip));//32


    let decodeJWT = JSON.parse(
      atob(respuestaAutenticacion.token.split('.')[1])
    );
    if (
      decodeJWT.NombreUsuario == null || decodeJWT.NombreUsuario == undefined
    ) {
      localStorage.setItem(this.llaveUsuario, 'Sin Nombre');
    } else {
      localStorage.setItem(this.llaveUsuario, utf8.decode(decodeJWT.NombreUsuario));
    }


    if (decodeJWT.Ubicacion == null || decodeJWT.Ubicacion == undefined) {
      localStorage.setItem(this.llaveUbicacion, 'Sin Ubicaci&oacute;n');
      localStorage.setItem(this.llaveIdUbicacion, utf8.decode(decodeJWT.IdUbicacion));
      localStorage.setItem(this.llaveUbicacionShow, 'Sin Ubicaci&oacute;n.');
    } else {
      localStorage.setItem(this.llaveUbicacion, utf8.decode(decodeJWT.Ubicacion));
      localStorage.setItem(this.llaveUbicacionShort, utf8.decode(decodeJWT.Ubicacion).split("|")[1]);
      localStorage.setItem(this.llaveUbicacionShow, utf8.decode(decodeJWT.Ubicacion).replace('Operadores', 'Operador'));
      localStorage.setItem(this.llaveIdUbicacion, decodeJWT.IdUbicacion);
    }
    localStorage.setItem(this.llaveKeyMaster, decodeJWT.KeyMaster);

    if (decodeJWT.KeyPersonalizado != null) {
      localStorage.setItem(this.llaveKeyBase, decodeJWT.KeyBase);
      localStorage.setItem(this.llaveRol, utf8.decode(decodeJWT.RolBase));
      localStorage.setItem(this.llaveKeyPersonalizado, decodeJWT.KeyPersonalizado);
      localStorage.setItem(this.llaveRolTemporal, utf8.decode(decodeJWT.RolPersonalizado));
      localStorage.setItem(this.LLaveRolUapa,utf8.decode(decodeJWT.RolUapa));
    } else {
      localStorage.setItem(this.llaveKeyPersonalizado, decodeJWT.KeyBase);
      localStorage.setItem(this.llaveRolTemporal, decodeJWT.RolBase);
      localStorage.setItem(this.LLaveRolUapa,utf8.decode(decodeJWT.RolUapa));
    }


    if (decodeJWT.keyBase != null) {
      localStorage.setItem(this.llaveKeyBase, decodeJWT.KeyBase);
      localStorage.setItem(this.llaveRol, decodeJWT.RolBase);
    }


    localStorage.setItem(this.llaveCargo, decodeJWT.Cargo);
    let TokenEXP = JSON.parse(
      atob(respuestaAutenticacion.token.split('.')[1])
    ).exp;
    let datetime = new Date();
    let time = datetime.toLocaleTimeString();




    let agent = window.navigator.userAgent.toLowerCase();
    let maquina = window.location.hostname;
    localStorage.setItem(this.llaveBrowser, 'Fecha: ('+datetime+ ') ;'+'Hora: ('+time+ ') ;'+agent);
    localStorage.setItem(this.llaveExpiracion, TokenEXP);
    localStorage.setItem(this.llaveNombreMaquina, maquina);
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  getIPAddress() {
    fetch('https://api.ipify.org/?format=json')
      .then((results) => results.json())
      .then((data) => localStorage.setItem(this.llaveIpPublica, data.ip));
  }

  async getIP() {
    const response = await fetch('https://api64.ipify.org/?format=json');
    const data = await response.json();
    return data;
  }


  public ValidateFullPermissions(): void {
    
    const k = localStorage.getItem(this.llaveKeyBase);

  
    this.SeguridadServicio.getPA_GetRolPermisosListSincro(k).then(
      async (response: any) => {
        response.forEach(e => {
       
          let r = `KeyModule_${e.id_Modulo}`;
          let p = `${e.id},${e.ver},${e.crear},${e.editar},${e.eliminar},${e.aprobar},${e.imprimir}`;
          localStorage.setItem(r, p);
        });
      },
      (err) => {
      }
    ).catch(err => {
      // handling error
    });
  }


  public ClearFullPermisions(): void {

    let cP = 150;

    for (let index = 0; index < cP; index++) {
      localStorage.removeItem(`KeyModule_${index}`);
    }

  }




  public getModulePermission(ModuloId: number, accion: string): boolean {
    let m = `KeyModule_${ModuloId}`;
    let r = false;
    if (localStorage.getItem(m) == null || localStorage.getItem(m) == undefined) { r = false; }
    else {
      let a = localStorage.getItem(m).split(",");

      switch (accion.toLowerCase()) {
        case 'ver': {
          if (a[1] == 'true') r = true;
          break;
        }
        case 'crear': {
          if (a[2] == 'true') r = true;
          break;
        }
        case 'editar': {
          if (a[3] == 'true') r = true;
          break;
        }
        case 'eliminar': {
          if (a[4] == 'true') r = true;
          break;
        }
        case 'aprobar': {
          if (a[5] == 'true') r = true;
          break;
        }
        case 'imprimir': {
          if (a[6] == 'true') r = true;
          break;
        }
        default: {
          break;
        }
      }
    }


    return r;

  }







}
