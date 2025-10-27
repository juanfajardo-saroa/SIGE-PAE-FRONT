import { LocalStorage } from './../../../static/local-storage';
import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Menu } from '../../components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuLateralAutorizadoComponent } from 'src/app/seguridad/autorizado/menulateralautorizado.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})



export class AdminLayoutComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();

  public nombreUbicacion = localStorage.getItem('Ubicacion');
  public nombreUsuario = localStorage.getItem('NombreUsuario');

  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');



  mostrarmenu: boolean = false;
  events: string[] = [];
  opened: boolean;
  isMenuOpen = true;
  public sideNavState: boolean = false;
  public sideNavOpen: boolean = true;
  public CargueMenuInicial: boolean = false;
  public linkText: boolean = false;
  public sidenavWidth = 20;
  public sidenavContent = 0;
  public sidenavMarginRight = 0;
  private readonly llaveToken = 'token';
  private readonly llaveRol = 'RolBase';
  private readonly llaveKeyBase = 'KeyBase';
  isShown: boolean = false; // hidden by default
  selectedItem: number = null;
  currentComponent: string;
  showLayout: boolean = true;
  showLayoutMenubar: boolean = true;
  mostarEncabezadoMenu: boolean = true;
  mostrarImprimir: boolean = true;
  mostrarKeyLayoutA: boolean = true;
  mostrarKeyLayoutB: boolean = true;
  mostrarKeyLayoutC: boolean = true;
  mostrarKeyLayoutD: boolean = true;


  isOpenSideNav = false;

  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  isLoading = true;
  public dataSourceVig!: MatTableDataSource<VigenciasModel>;
  public dataArrayInterno: any;
  nombreVigAnoSeleccionada: number = 0;
  // public menuChild: any;
  // private sub:any;
  public nuevoeventomenu: boolean;
  public menuelegido: string = 'Sin';




  constructor(public location: Location, private router: Router, public VigenciasServicio: VigenciasService,) {


  }

  public dataArray: any;
  public dataArrayInternoVigSelect: any;
  //public dataArrayInternoVigNoSelect: any;

  public menu: any;
  ngOnInit() {

    this.showLayout = true;

    const routeUrl = this.router.url;
    const currentUrl = routeUrl.split(/[/?]/);

    if (localStorage.getItem('KeylayoutA') == 'No') { this.mostrarKeyLayoutA = false; };
    if (localStorage.getItem('KeylayoutB') == 'No') { this.showLayoutMenubar = false; };
    if (localStorage.getItem('KeylayoutC') == 'No') { this.mostrarKeyLayoutC = false; };

    this.currentComponent = currentUrl[1];

    // if (this.currentComponent == 'login' || this.currentComponent == 'Login' || this.currentComponent == 'sistemas' || this.currentComponent == ''  || localStorage.getItem('Inicio') =='true' || this.currentComponent == 'iniciosgn' || this.currentComponent == 'Iniciosgn' ) {
    if (this.currentComponent == 'login' || this.currentComponent == 'Login' || this.currentComponent == 'sistemas' || this.currentComponent == '' || localStorage.getItem('Inicio') == 'true') {
      this.showLayout = false;
      this.showLayoutMenubar = false;
    }

    if (this.currentComponent == 'PTNProductos' || this.currentComponent == 'RegistroProducto' || this.currentComponent == 'RegistroProductoMateriaPrima' || this.currentComponent == 'RegistroProductoComplementoIndustrializado' || this.currentComponent == 'AprobacionProductoMateriaPrima' || this.currentComponent == 'AprobacionProductoIndustrializado') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Productos';
    } else if (this.currentComponent == 'BeneficiariosRaciones' || this.currentComponent == 'Beneficiarios' || this.currentComponent == 'DetalleBeneficiarioRaciones' || this.currentComponent == 'seguimientoComplementos' || this.currentComponent == 'seguimientoComplementosDetalle') {

      if (localStorage.getItem('RolSuperAdmonUAPAInicio') == 'Si') {
        this.mostrarImprimir = false;

      }
      else {
        this.mostrarImprimir = true;

      }


      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      localStorage.setItem('UbicacionShort', nombrecortado[1])


      if (primernombre == 'Operadores' || primernombre == 'operadores') {

        this.nombreUbicacion = localStorage.getItem('UbicacionShow');

      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
        this.nombreUbicacion = localStorage.getItem('UbicacionShort');
      }
    } else if (this.currentComponent == 'PTNPreparaciones' || this.currentComponent == 'RegistroPreparacion' || this.currentComponent == 'AprobacionesPreparacion') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Preparaciones';
    } else if (this.currentComponent == 'PTNCiclosDeMenu' || this.currentComponent == 'RegistroCiclomenu' || this.currentComponent == 'AprobacionesCiclomenu') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Ciclos de menús';
    } else if (this.currentComponent == 'minuta-patron-maem') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Minuta patrón MAEM';
    } else if (this.currentComponent == 'minuta-patron-maer') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Minuta patrón MAER';
    } else if (this.currentComponent == 'minuta-excepcional') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Minutas diferenciales';
    } else if (this.currentComponent == 'RepositoriosLineamientosUAPA' || this.currentComponent == 'RepositoriosDocumentosUAPA' || this.currentComponent == 'RepositoriosNormatividadUAPA' || this.currentComponent == 'RepositoriosCircularesUAPA' || this.currentComponent == 'RepositoriosInteresUAPA') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Repositorio';
    } else if (this.currentComponent == 'AprobacionesPendientesUAPA') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Aprobaciones';
    } else if (this.currentComponent == 'CriteriosPriorizacionUAPA') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Criterios de priorización';
    } else if (this.currentComponent == 'PACUAPA') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Plan Anualizado de Caja (PAC)';
    } else if (this.currentComponent == 'InformacionETC') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Consulta de Información Detallada';
    } else if (this.currentComponent == 'Parametro') {
      this.nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Parámetros';
    } else {
      this.nombreUbicacion = localStorage.getItem('Ubicacion');
    }


    if (localStorage.getItem('nombredeUbicacionActualizado') === 'si') {
      this.mostarEncabezadoMenu = false;
      if (localStorage.getItem(this.llaveRol) == environment.RolBaseUapa || localStorage.getItem(this.llaveKeyBase) == environment.KeyBaseUapa || localStorage.getItem('RolUapa') == 'Si' || localStorage.getItem('RolUapa') == 'SI') {
        this.mostarEncabezadoMenu = true;
        if (localStorage.getItem('RolSuperAdmonUAPAInicio') == 'Si') {
          this.mostrarImprimir = false;

        }
        else {
          this.mostrarImprimir = true;

        }

      }
    } else {
      if (localStorage.getItem(this.llaveRol) == environment.RolBaseUapa || localStorage.getItem(this.llaveKeyBase) == environment.KeyBaseUapa || localStorage.getItem('RolUapa') == 'Si' || localStorage.getItem('RolUapa') == 'SI') {
        this.mostarEncabezadoMenu = false;
      }
      else

        this.mostarEncabezadoMenu = true;



    }

    if (localStorage.getItem('Inicio') == null || localStorage.getItem('Inicio') == undefined || localStorage.getItem('Inicio') == 'true') {
      this.mostrarmenu = false;


    }


    if (localStorage.getItem('SistemaSelect') == null || localStorage.getItem('SistemaSelect') == undefined) {
      this.mostrarmenu = false;


    } else if (localStorage.getItem('Sistema') == null || localStorage.getItem('Sistema') == undefined) {
      this.mostrarmenu = false;


    } else {
      this.mostrarmenu = true;


    }


    if (this.mostrarmenu) {
      if (localStorage.getItem('SistemaSelect') == 'mipae') {
        if (localStorage.getItem('MenuMipae') == 'false') {
          localStorage.setItem('MenuMipae', 'true');
          this.CargueMenuInicial = true;
        }
        else {
          this.CargueMenuInicial = false;
        }

      } else if (localStorage.getItem('SistemaSelect') == 'sigepae') {
        if (localStorage.getItem('MenuSigepae') == 'false') {
          localStorage.setItem('MenuSigepae', 'true');
          this.CargueMenuInicial = true;
        }
        else {
          this.CargueMenuInicial = false;
        }
      }
      else if (localStorage.getItem('SistemaSelect') == 'sgnUAPA') {
        if (localStorage.getItem('MenuSigenaUapa') == 'false') {
          localStorage.setItem('MenuSigenaUapa', 'true');
          this.CargueMenuInicial = true;
        }
        else {
          this.CargueMenuInicial = false;
        }
      }



    }



    // TODO: This cant be called here because its cause an error for the pages when the user is not logged in

    if (localStorage.getItem('Sistema') == 'true') {
      let vigenciaactual = localStorage.getItem('VigSeleccionada');
      if (vigenciaactual == '' || vigenciaactual == '0' || vigenciaactual == null) {
        this.VigenciasServicio.AsyncgetVigenciasList().then(
          async (response: any) => {
            this.dataArray = response.filter(items => items.vigenciaActual === true);
            localStorage.setItem('VigNoSeleccionada', this.dataArray[1].id);
            localStorage.setItem('VigSeleccionada', this.dataArray[0].id);
            localStorage.setItem('VigSeleccionadaJson', JSON.stringify(this.dataArray[0]));
          },
          (err) => {
          }
        );
      } else {
        this.VigenciasServicio.AsyncgetVigenciasList().then(
          async (response: any) => {
            let vigenciaactual = Number(localStorage.getItem('VigSeleccionada'));
            this.dataArray = response.filter(items => items.id == vigenciaactual);
            this.nombreVigAnoSeleccionada = this.dataArray[0].nombre;
            this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);
            this.isLoading = false;
            localStorage.setItem('VigNoSeleccionada', this.dataArrayInterno.find(elem => elem.id != vigenciaactual).id);
            localStorage.setItem('VigSeleccionada', this.dataArrayInterno.find(elem => elem.id == vigenciaactual).id);
            localStorage.setItem('VigSeleccionadaJson', JSON.stringify(this.dataArrayInterno.find(elem => elem.id == vigenciaactual)));
          },
          (err) => {
          }
        );
      }





    }
  }

  increase() {
    this.sidenavWidth = 20;
    this.sidenavContent = -14;
  }
  decrease() {
    this.sidenavWidth = 7;
    this.sidenavContent = 7;
  }




  toggleShow() {

    if (this.isMenuOpen) {
      this.sidenavWidth = 7;
      this.sidenavContent = -8;
      this.sidenavMarginRight = -8;
      this.isMenuOpen = !this.isMenuOpen;
    }
    else {
      this.sidenavWidth = 20;
      this.sidenavContent = 0;
      this.sidenavMarginRight = 0;
      this.isMenuOpen = !this.isMenuOpen;
    }
    this.isShown = !this.isShown;

  }



  newItem(menu: any) {
    this.menu = menu;

    // localStorage.setItem('KeylayoutB','Si');
    this.showLayoutMenubar = true;
    this.ngOnInit();
  }


  newItemNavBar(mensaje: any) {
    if (mensaje == '/iniciosgn' || mensaje == 'iniciosgn') {
      this.mostrarKeyLayoutC = false;
    }
    else {
      this.mostrarKeyLayoutC = true;
    }


    this.ngOnInit();
  }



  newItemMenuBar(mensaje: any) {
    if (mensaje == '/InformacionETC' || mensaje == 'InformacionETC' || mensaje == '/iniciosgn' || mensaje == 'iniciosgn') {
      this.mostrarKeyLayoutC = false;
    }
    else {
      this.mostrarKeyLayoutC = true;
    }


    this.ngOnInit();
  }

  selectionChanged(i) {
    this.selectedItem = i;
  }

  openSideNav(isOpen: boolean) {
    this.isOpenSideNav = isOpen;

    this.sidenavWidth = 20;
    this.sidenavContent = 0;
    this.sidenavMarginRight = 0;
  }
  routerMenu(router: any) {
    for (let i = 0; i < this.menu.length; i++) {

      if (this.menu[i].router[0] != '' || this.menu[i].router[0] != '-') {
        this.menu[i].activeclass = 'active';
      } else {
        this.menu[i].activeclass = '';
      }
    }

    this.router.navigate(router);
  }

  routerSubMenu(router: any) {
    for (let i = 0; i < this.menu.length; i++) {
      this.menu[i]['menuDetalle'].forEach(function (value: any) {
        value.activeclass = '';

        if (value.router[0] == router[0]) {
          value.activeclass = 'active';
        } else {
          value.activeclass = '';
        }
      });
    }

    this.router.navigate(router);
  }
  Check: boolean = true;


  CambioVigencia(value: any) {

    this.CambioNoVigencia();
    // this.VigenciasServicio.AsyncgetVigenciasList().then(
    //   async (response: any) => {

    //     this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
    //     this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
    //     localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
    //     this.CambioNoVigencia();

    //     if(this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre){
    //       this.Check = false;
    //     }return this.Check
    //   },
    //   (err) => {
    //     this.isLoading = false;
    //   }
    // );
  }

  CambioNoVigencia() {

    let currenVig = localStorage.getItem('VigSeleccionada');
    let NocurrenVig = localStorage.getItem('VigNoSeleccionada');
    const itemVigSeleccionada = this.dataArrayInterno.filter(function (item) {
      return item.id == NocurrenVig;
    })[0];
    localStorage.setItem('VigSeleccionada', NocurrenVig);
    localStorage.setItem('VigNoSeleccionada', currenVig);
    localStorage.setItem('VigSeleccionadaJson', JSON.stringify(itemVigSeleccionada));
    window.location.reload();
    this.Check = false;

  }
}
