import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad/seguridad.service';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuardToken implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient, private notification: MessageService) {
  }
  async canActivate() {
    const token = localStorage.getItem("accessToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(['/Login']);
    }

    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      //const response = await lastValueFrom(this.http.post(environment.baseUrl + "authenticate/refresh-token", tokenModel));
//      const newToken = (<any>response).accessToken;
  //    const newRefreshToken = (<any>response).refreshToken;
    //  localStorage.setItem("accessToken", newToken);
      //localStorage.setItem("refreshToken", newRefreshToken);

      this.notification.showInfo('Token renewed successfull','top center');
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}




@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.seguridadService.obtenerRol() === 'admin'){
        return true;
      }

    this.router.navigate(['/Login']);
      return false;
  }

}


@Injectable({
  providedIn: 'root'
})
export class EstaLogueadoGuard implements CanActivate {

  constructor(private seguridadService: SeguridadService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.seguridadService.estaLogueado()){
        return true;
      }

    this.router.navigate(['/Login']);
      return false;
  }

}



@Injectable({
  providedIn: 'root'
})
export class EsSedesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(!this.seguridadService.estaLogueado())
        {
          this.router.navigate(['/Login']);
          return false;
        }
        if(this.seguridadService.getModulePermission(32,'ver'))
        {
          return true;
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsResumenETCGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(18,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsCentroAcopioGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(104,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}
@Injectable({
  providedIn: 'root'
})
export class EsZonasETCGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(105,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}
@Injectable({
  providedIn: 'root'
})
export class EsAccesoSedesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(32,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsAccesoMenusGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(23,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsMinutaMaemGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(40,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsMinutaPaecGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(103,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}



@Injectable({
  providedIn: 'root'
})
export class EsNotificacionesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(66,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsMinutaMaerGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
        if(this.seguridadService.getModulePermission(41,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsMinutaExcepcionalGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
        if(this.seguridadService.getModulePermission(42,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsMatrizRiegosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(16,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsCalendarioPAEGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
        if(this.seguridadService.getModulePermission(9,'ver'))       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsAsignacionRecursosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      let km=this.seguridadService.getModulePermission(10,'ver')
      let km1=this.seguridadService.getModulePermission(87,'ver')

      if(km||km1)


        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsContratosAlistamientoGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      let km=this.seguridadService.getModulePermission(55,'ver')
      let km1=this.seguridadService.getModulePermission(73,'ver')

      if(km||km1)


        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsBolsaComunGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       if(this.seguridadService.getModulePermission(112,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsCostosCoberturaComunGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       //if(this.seguridadService.getModulePermission(113,'ver'))
       if(this.seguridadService.getModulePermission(11,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}



@Injectable({
  providedIn: 'root'
})
export class EsFinanciacionGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
        if(this.seguridadService.getModulePermission(11,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsPlanGirosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(45,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsProgramaAnualCajaGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(98,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsPACETCGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(44,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsRegistroContratosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(13,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsRegistroOperadoresGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(14,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsSeguridadUsuariosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      let km=this.seguridadService.getModulePermission(19,'ver')
      let km1=this.seguridadService.getModulePermission(29,'ver')

      if(km||km1)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsSeguridadRolesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      let km=this.seguridadService.getModulePermission(20,'ver')
      let km1=this.seguridadService.getModulePermission(30,'ver')
      let km2=this.seguridadService.getModulePermission(50,'ver')

       if(km||km1||km2)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsSeguridadModulosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      let km = this.seguridadService.getModulePermission(27,'ver')
      let km1 = this.seguridadService.getModulePermission(28,'ver')
      let km2 = this.seguridadService.getModulePermission(48,'ver')

        if(km||km1||km2)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsSeguridadPermisosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(21,'ver')
       let km1= this.seguridadService.getModulePermission(31,'ver')
       let km2= this.seguridadService.getModulePermission(51,'ver')
       if(km||km1||km2)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}



@Injectable({
  providedIn: 'root'

})

export class EsSeguridadAuditoriaGuaRD implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

       let km = this.seguridadService.getModulePermission(61,'ver')
       let km1= this.seguridadService.getModulePermission(62,'ver')
       let km2= this.seguridadService.getModulePermission(63,'ver')

       if(km||km1||km2)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'

})
export class EsParametrosGuaRD implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

       let km = this.seguridadService.getModulePermission(114,'ver')

       if(km)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'

})
export class EsTablerosUapaGuaRD implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

       let km = this.seguridadService.getModulePermission(85,'ver')

       if(km)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}



@Injectable({
  providedIn: 'root'

})
export class EsInformacionETCUapaGuaRD implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

       let km = this.seguridadService.getModulePermission(84,'ver')

       if(km)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}



@Injectable({
  providedIn: 'root'
})
export class EsAprobacionesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(95,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsRepositorioGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      // let km = this.seguridadService.getModulePermission(17,'ver')
       let km1= this.seguridadService.getModulePermission(5,'ver')
       let km2= this.seguridadService.getModulePermission(52,'ver')
       let km3= this.seguridadService.getModulePermission(53,'ver')

       if(km1||km2||km3)
       {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsTrayectosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

      if(this.seguridadService.getModulePermission(96,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsPriorizacionGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

      if(this.seguridadService.getModulePermission(1,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsAsignacionRacionesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
      if(this.seguridadService.getModulePermission(89,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsCriteriosPriorizacionsGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

      if(this.seguridadService.getModulePermission(90,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsGestionExcedentessGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }

      if(this.seguridadService.getModulePermission(93,'ver'))
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsVigenciasGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(58,'ver')
       let km1= this.seguridadService.getModulePermission(59,'ver')
       let km2= this.seguridadService.getModulePermission(60,'ver')
       if(km||km1||km2)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}









@Injectable({
  providedIn: 'root'
})
export class EsPTNProductosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(108,'ver')

       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}
@Injectable({
  providedIn: 'root'
})
export class EsPTNPrepararacionGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(107,'ver')

       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}
@Injectable({
  providedIn: 'root'
})
export class EsPTNCiclosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(109,'ver')

       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsCotizacionMenuGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(47,'ver')

       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsBeneficiarioRacionesGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(3,'ver')

       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


@Injectable({
  providedIn: 'root'
})
export class EsEncuestaCostosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(46,'ver')
       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsEntregaRacionesViveresGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(25,'ver')
       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsLiquidacionContratosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(26,'ver')
       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EsSeguimientoComplementosGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.seguridadService.estaLogueado())
      {
        this.router.navigate(['/Login']);
        return false;
      }
       let km = this.seguridadService.getModulePermission(2,'ver')
       if(km)
        {
          return true
        }
        else
        {
          this.router.navigate(['/SinPermisos']);
          return false;
        }
  }
}


// export class EsSSeguimientoGuaRD implements CanActivate {
//   constructor(private seguridadService: SeguridadService,private router: Router){}

//   canActivate(

//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       if(!this.seguridadService.estaLogueado())
//       {
//         this.router.navigate(['/Login']);
//         return false;
//       }
//       else
//       {
//         return true;
//       }

//   }
// }




