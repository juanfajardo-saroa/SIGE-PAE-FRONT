import { Component, ElementRef, Output, EventEmitter, OnInit, OnChanges, Optional, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AspNetUserRolesService } from 'src/app/shared/services/AspNetUserRoles.services';
import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
import { AspNetUserRolesModel } from 'src/app/shared/model/AspNetUserRoles';
import { MenuService } from 'src/app/shared/services/Menu.services';
import { MenuModel } from 'src/app/shared/model/Menu';
import { ETService } from 'src/app/shared/services/ET.services';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { OperadoresService } from 'src/app/shared/services/Operadores.services';
import { Title } from '@angular/platform-browser';
import { PA_GetRolPermisosService } from 'src/app/shared/services/PA_GetRolPermisos.services';
import { PA_ObtenerNotificacionesModel } from 'src/app/shared/model/PA_ObtenerNotificacionesModel';
import { Observable, Subscription } from 'rxjs';
import { PA_ObtenerNotificacionesService } from 'src/app/shared/services/PA_ObtenerNotificaciones.services';
import { PA_EstadoNotificacionesService } from 'src/app/shared/services/PA_EstadoNotificaciones.services';
import { PA_DepartamentosService } from 'src/app/shared/services/PA_Departamentos.services';
import { PA_DepartamentosModel } from 'src/app/shared/model/PA_DepartamentosModel';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';

export interface MenubarElement {
  codigo: string;
  nombre: string;
  active: boolean;
  router: string[];
  activeclass: string;
  menu: Menu[];
}

export interface Menu {
  nombre: string;
  image: string;
  router: string[];
  activeclass: string;
  menuDetalle: MenuDetalle[];
}

export interface MenuDetalle {
  nombre: string;
  router: string[];
  activeclass: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  public nombreUbicacion = "";
  public nombreCategoriaSistema = "";
  public nombreRol = "";
  public nombreUsuario = "";
  public nombreCategoria = "";
  public nombreCargo = "";
  public nombreApp = localStorage.getItem('nombreSistema');
  public nombreAppUapa = "";
  public sistemaSelect = "";
  public RolSuperUapa = "";
  mostrarmenu: boolean = false;
  events: string[] = [];
  opened: boolean;
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  sistemaSeleccionado: string;
  yaCargoUbicacion: boolean = false;
  isLoading = true;
  userId: string;
  rolbase = localStorage.getItem('RolBase');
  private subs = new Subscription();
  // Creamos las variabls mensaje
  public mensajeNuevoEventoMenu: boolean = false;
  public mensajeMenuElegido: string = '';
  //
  IrASistemas() {
    this.router.navigateByUrl('/sistemas');
  }

  @Output() newItemEvent = new EventEmitter<Menu[]>();
  @Output() openSideNavEvent = new EventEmitter<boolean>();
  //Envio de emnsajes al padre admin-layput-component.ts

  @Output() miEventoNavBar = new EventEmitter<string>();









  isOpenSideNav = false;
  menubar: MenubarElement[] = [];
  menuArray: MenuModel[] = [];
  public isCollapsed = true;
  public hiddenMenubar = false;
  mostrarImprimir: boolean = true;
  ObtenerNotificacionesLista: PA_ObtenerNotificacionesModel[] = undefined;
  numberNotifications = 0;
  constructor(
    public notificaciones: PA_ObtenerNotificacionesService,
    public seguridadService: SeguridadService,
    location: Location,
    private dialog: MatDialog,
    private element: ElementRef,
    private router: Router,
    public MenuService: MenuService,
    private titleService: Title,
    private RolPermisosService: PA_GetRolPermisosService,
    private PA_EstadoNotificacionesService: PA_EstadoNotificacionesService,

  ) {


    let agent = window.navigator.userAgent.toLowerCase();
    let maquina = window.location.hostname;
    let datetime = new Date();
    let time = datetime.toLocaleTimeString();
    localStorage.setItem('Browser', 'Fecha: (' + datetime + ') ;' + 'Hora: (' + time + ') ;' + agent);

    this.nombreAppUapa = "ETC " + localStorage.getItem('NombreUbicacion') + " | SIGE-PAE"
    this.sistemaSeleccionado = localStorage.getItem('SistemaSelect');
    this.RolSuperUapa = localStorage.getItem('RolSuperUapa');
    this.titleService.setTitle(this.sistemaSeleccionado);
    if (localStorage.getItem('Inicio') == null || localStorage.getItem('Inicio') == undefined || localStorage.getItem('Inicio') == 'true') { this.mostrarmenu = false; }
    else { this.mostrarmenu = true; }

    if (localStorage.getItem('RolSuperAdmonUAPAInicio') == 'Si') {
      this.mostrarImprimir = false;
      this.nombreCategoriaSistema = '';

    }
    else {
      this.mostrarImprimir = true;
      this.nombreCategoriaSistema = 'PAE | ';

    }
    this.sistemaSelect = this.sistemaSeleccionado;


    this.nombreUbicacion = localStorage.getItem('Ubicacion');
    this.nombreRol = localStorage.getItem('RolBase');
    this.nombreUsuario = localStorage.getItem('NombreUsuario');
    this.nombreCategoria = "";
    this.nombreCargo = "";
    if (!this.nombreUbicacion) // if a is negative,undefined,null,empty value then...
    {
      this.nombreCategoria = "";
      this.nombreCargo = "";
    }
    else {
      this.nombreCategoria = this.definirCategorias(this.nombreUbicacion.trim().substring(0, 3));
      this.nombreCargo = this.definirCategorias(this.nombreUbicacion.trim().substring(0, 3));
    }
    if (seguridadService.estaLogueado()) {
      this.FillMenu();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sistemaSelect = localStorage.getItem('SistemaSelect');
    this.RolSuperUapa = localStorage.getItem('RolSuperUapa');
    this.userId = localStorage.getItem('KeyMaster');
    this.nombreRol = localStorage.getItem('RolBase');
    this.fillTable();
  }

  ngOnChanges(): void {
    this.nombreRol = localStorage.getItem('RolBase');
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }


  }

  onMiPAEClick() {
    localStorage.setItem('SistemaSelect', 'mipae');
    localStorage.setItem('nombreSistema', 'MiPAE: Sistema de Gestión y Seguimiento de Beneficiarios');
    localStorage.setItem('Sistema', 'true');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'UApA') {
      localStorage.setItem('Ubicacion', 'Sin definir | Sin Ubicación');
      localStorage.removeItem('nombredeUbicacionActualizado');
      this.router.navigate(['/inicio']).then(() => {
        window.location.reload();
      });
    }
  }

  goToNotifications() {
    this.router.navigate(['/Notificaciones'])
  }


  disableRead(idEstado: number) {
    let color: string;
    switch (idEstado) {
      case 1: // No leida
        color = "#E2ECFD";
        break;
      case 2: // Leida
        color = "#FFFFFF";
        break;
      default:
        color = "";
    }
    return color;
  }

  getColor(id: string) {
    let ca = id.substring(0, 3).toUpperCase();
    let color: string;
    switch (ca) {
      case "MIP":
        color = "#00A9AB";
        break;
      case "SIG":
        color = "#FC4B6C";
        break;
      case "PAE":
        color = "#FF9100";
        break;
      case "ADM":
        color = "#005ACA";
        break;
      case "UAP":
        color = "#00A9AB";
        break;
      default:
        color = "";
    }
    return color;
  }

  notificationClick(id: number, url: string, estado: number, mensaje: string) {
    if (estado == 1) {
      this.PA_EstadoNotificacionesService.updatePA_EstadoNotificacionesList(id, this.userId, 2).subscribe(
        (res: any) => {
          this.fillTable();
          if (url != null && url != "") {
            // Verificar si la URL contiene 'DetalleSede'
            if (url.includes("DetalleSede")) {
              // Reemplazar cualquier valor de 'dia' con 'dia=3'
              url = url.replace(/(dia=)(\d+)/, "$13");

              // Si no hay ningún valor 'dia=3' en la URL, agregarlo al final
              if (!url.includes("dia=3")) {
                url += "&dia=3";
              }

              // Verificar el mensaje
              if (mensaje.includes('fue Aprobado') || mensaje.includes('fue Rechazado')) {
                this.router.navigateByUrl('/Sedes');
              } else {
                this.router.navigateByUrl(url);
              }
            } else {
              this.router.navigateByUrl(url);
            }
          }
        });
    } else {
      // Verificar si la URL contiene 'DetalleSede'
      if (url.includes("DetalleSede")) {
        // Reemplazar cualquier valor de 'dia' con 'dia=3'
        url = url.replace(/(dia=)(\d+)/, "$13");

        // Si no hay ningún valor 'dia=3' en la URL, agregarlo al final
        if (!url.includes("dia=3")) {
          url += "&dia=3";
        }

        // Verificar el mensaje
        if (mensaje.includes('fue Aprobado') || mensaje.includes('fue Rechazado')) {
          this.router.navigateByUrl('/Sedes');
        } else {
          this.router.navigateByUrl(url);
        }
      } else {
        this.router.navigateByUrl(url);
      }
    }
  }

  disableUrl(url: string) {
    if (url == "" || url == null) {
      return true;
    }
    else {
      return false;
    }
  }

  fillTable() {
    if (this.seguridadService.estaLogueado()) {
      this.notificaciones.getNotificaciones(5).subscribe(ObtenerNotificacionesLista => {
        this.ObtenerNotificacionesLista = ObtenerNotificacionesLista;
        this.ObtenerNotificacionesLista.forEach(ele => {
          ele.modulo = ele.modulo.replace(".", "");
        })
      });

      // this.notificaciones.getNotificaciones(null).subscribe(ObtenerNotificacionesLista => {
      //   this.notificaciones.numberOfNotifications = ObtenerNotificacionesLista.length;
      // });
    }


  }

  onSiGEPAEClick() {
    localStorage.setItem('SistemaSelect', 'sigepae');
    localStorage.setItem('nombreSistema', 'SiGE-PAE: Subsistema de gestión para Entidades Territoriales (ETC/ETnC)');
    localStorage.setItem('Sistema', 'true');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'UApA') {
      localStorage.setItem('Ubicacion', 'Sin definir | Sin Ubicación');
      localStorage.removeItem('nombredeUbicacionActualizado');
      this.router.navigate(['/inicio']).then(() => {
        window.location.reload();
      });
    }
  }

  onSGNUAPAClick() {
    localStorage.setItem('SistemaSelect', 'sgnUAPA');
    this.RolSuperUapa = localStorage.getItem('RolSuperUapa');
    localStorage.setItem('nombreSistema', 'SGN UApA: Subsistema de gestión Nacional');
    localStorage.setItem('Sistema', 'true');
    localStorage.setItem('Ubicacion', 'UApA');
    this.router.navigate(['/iniciosgn']).then(() => {
      window.location.reload();
    });
  }



  RetornoBotonETC() {
    localStorage.setItem('SistemaSelect', 'sgnUAPA');
    this.RolSuperUapa = localStorage.getItem('RolSuperUapa');
    localStorage.setItem('nombreSistema', 'SGN UApA: Subsistema de gestión Nacional');
    localStorage.setItem('Sistema', 'true');
    localStorage.setItem('Ubicacion', 'UApA');
    localStorage.setItem('Inicio', 'false');
    localStorage.setItem('MenuSigepae', 'false');
    localStorage.setItem('MenuMipae', 'false');
    localStorage.setItem('MenuSigenaUapa', 'true');
    this.seguridadService.ValidateFullPermissions();
    document.getElementById("menusuperior1").click();
    this.router.navigate(['/InformacionETC']).then(() => {
      window.location.reload();
    });
    document.getElementById("menusuperior1").click();

  }

  openInicio() {
    this.router.navigate(['/inicio']);
  }

  onPAEstarAlDiaClick() { }

  getMenuBar() {
    const mbeA: MenubarElement[] = [];
    this.menuArray.forEach(e2 => {
      if (e2.controlador == "0") {
        const mbe: MenubarElement = { codigo: e2.id.toString().toString(), nombre: e2.nombre, menu: this.getMenu(e2.id), active: false, activeclass: '', router: [`${e2.link}`] };
        mbeA.push(mbe);
      }
    });
    this.menubar = mbeA;
    const valueSubMenu = this.MenuService.getSubMenu();
    if (Object.keys(valueSubMenu).length === 0) {
      if (this.menubar.length > 0) {
        this.mostrarSubMenu(this.menubar[0], false);
      }
    } else {
      this.mostrarSubMenu(valueSubMenu, false);
    }
    if (this.menubar.length > 0) {
      setTimeout(() => {
        this.hiddenMenubar = true;
      });
    }
  }

  getMenu(idPadre: Number): Menu[] {
    const mA: Menu[] = [];
    this.menuArray.filter(item => item.controlador === "1").forEach(e3 => {
      if (e3.padre == idPadre) {
        const m: Menu = { nombre: e3.nombre, image: e3.icono, menuDetalle: this.getMenuDetalle(e3.id), activeclass: "", router: [`${e3.link}`] };
        mA.push(m);
      }
    });
    return mA;
  }

  getMenuDetalle(idPadre: Number): MenuDetalle[] {
    //alert('MENU DETALLE'+this.menuArray.length)
    const mdA: MenuDetalle[] = [];
    this.menuArray.filter(item => item.controlador === "2").forEach(e => {
      if (e.padre == idPadre) {
        const md: MenuDetalle = { nombre: e.nombre, router: [`${e.link}`], activeclass: "" }
        mdA.push(md);
      }
    });
    this.isLoading = false;
    return mdA;
  }

  mostrarSubMenu(item: MenubarElement, clicked: boolean) {
    //alert('subMenu' + this.menubar.length)
    //this.MenuService.eraseSubMenu();
    if (item.nombre == "Inicio" && clicked) {
      this.MenuService.eraseSubMenu();
      localStorage.setItem('KeylayoutB', 'No');
      this.router.navigate(['/iniciosgn']);
    }

    if (item.nombre == "Inicio" || item.nombre == "inicio" || item.nombre == "Iniciosgn" || item.nombre == "iniciosgn") {
      // this.MenuService.eraseSubMenu();
      // this.router.navigate(['/iniciosgn']);
    }
    else {
      localStorage.setItem('KeylayoutB', 'Si');
    }


    for (let i = 0; i < this.menubar.length; i++) {
      if (this.menubar[i].codigo == item.codigo) {
        this.menubar[i].active = true;
      }
      else {
        this.menubar[i].active = false;
      }
      // if(this.menubar[i].router[0] != '' || this.menubar[i].router[0] != '-'){
      //   this.menubar[i].activeclass = 'active';
      // }else{
      //   this.menubar[i].activeclass = '';
      // }

    }
    // localStorage.setItem('KeylayoutB','Si');

    this.MenuService.addSubMenu(item);
    this.newItemEvent.emit(item.menu);
    // this.miEventoNavBar.emit();
    this.isCollapsed = true;
  }

  FillMenu() {
    //Filtramos por el sistema 1 paraSIgePae 2 para sispae
    let identSistema = "0";
    if (localStorage.getItem("SistemaSelect") == 'sigepae') {
      identSistema = "1";
    } else if (localStorage.getItem("SistemaSelect") == 'mipae') {
      identSistema = "2";
    } else if (localStorage.getItem("SistemaSelect") == 'sgnUAPA') {
      identSistema = "6"
    }
    else {
      ;
    };
    this.MenuService.getMenuListFilter(identSistema).subscribe(
      (response: any) => {
        this.isLoading = false;

        this.menuArray = response;//.filter(item=>item.accion===2);
      },
      (err) => {
        this.isLoading = false;
      }
    ).add(
      () => {
        this.getMenuBar();
      },
    );
  }

  Print() {
    window.print();
  }

  definirCategorias(clase) {
    let categoria: string;
    switch (clase) {
      case "ETC":
        categoria = "Funcionario |";
        break;
      case "Ope":
        categoria = "Operador |";
        break;
      case "Ins":
        categoria = "Docente |";
        break;
      case "Rec":
        categoria = "Rector |";
        break;
      case "Sed":
        categoria = "Funcionario |";
        break;
      case "UAp":
        categoria = ""; //UApA
        break;
      case "ET ":
        categoria = "Funcionario |";
        break;
      case "Sin":
        categoria = "Funcionario |";
        break;
      case null:
        categoria = "Funcionario |";
        break;
      case undefined:
        categoria = "Funcionario |";
        break;
      default:
        categoria = "Funcionario |";
        break;
    }
    return categoria;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RolesContent, {});
  }

  dataArrayUbicacion: any;
  openDialogUbicaciones(): void {
    const sistema = localStorage.getItem('SistemaSelect')
    if (sistema === 'sigepae') {
      const seguridad = this.seguridadService.getModulePermission(100, 'ver');
      if (seguridad === true) {
        if (
          this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
          this.rolbase === 'Directivo Docente' ||
          this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
          this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
          this.dialog.open(UbicacionesContent, {});
        } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
          this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
          this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
          this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
          this.rolbase === 'Supervisor de Campo') {
        } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
          this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
          this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
          this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
          this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
        ) {
        } else {
          this.dialog.open(UbicacionesContent, {});
        }
      } else {
      }
    } else if (sistema === 'mipae') {
      const seguridad = this.seguridadService.getModulePermission(99, 'ver');
      if (seguridad === true) {
        if (
          this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
          this.rolbase === 'Directivo Docente' ||
          this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
          this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
          this.dialog.open(UbicacionesContent, {});
        } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
          this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
          this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
          this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
          this.rolbase === 'Supervisor de Campo') {
        } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
          this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
          this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
          this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
          this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
        ) {
        } else {
          this.dialog.open(UbicacionesContent, {});
        }
      } else {
      }
    } else if (sistema === 'administracion') {
      const seguridad = this.seguridadService.getModulePermission(101, 'ver');
      if (seguridad === true) {
        if (
          this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
          this.rolbase === 'Directivo Docente' ||
          this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
          this.rolbase === 'Suplente Comités de Alimentación Escolar') {
          this.yaCargoUbicacion = false;
        } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
          this.yaCargoUbicacion = true;
          this.dialog.open(UbicacionesContent, {});
        } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
          this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
          this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
          this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
          this.rolbase === 'Supervisor de Campo') {
        } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
          this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
          this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
          this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
          this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
        ) {
        } else {
          this.dialog.open(UbicacionesContent, {});
        }
      } else {
      }
    } else if (sistema === 'sgnUAPA') {
      const seguridad = this.seguridadService.getModulePermission(102, 'ver');
      if (seguridad === true) {
        if (
          this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
          this.rolbase === 'Directivo Docente' ||
          this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
          this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
          this.dialog.open(UbicacionesContent, {});
        } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
          this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
          this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
          this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
          this.rolbase === 'Supervisor de Campo') {
        } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
          this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
          this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
          this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
          this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
        ) {
        } else {
          this.dialog.open(UbicacionesContent, {});
        }
      } else {
      }
    } else {
    }
  }

  openDialogUbicaciones2(): void {
    const sistema = localStorage.getItem('SistemaSelect')
    if (sistema === 'sigepae') {
      if (
        this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
        this.rolbase === 'Directivo Docente' ||
        this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
        this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
        this.yaCargoUbicacion = true;
      } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
        this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
        this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
        this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
        this.rolbase === 'Supervisor de Campo') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
        this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
        this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
        this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
        this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
      ) {
        this.yaCargoUbicacion = false;
      } else {
        this.yaCargoUbicacion = true;
      }
    } else if (sistema === 'mipae') {
      const seguridad = this.seguridadService.getModulePermission(99, 'ver');
      if (seguridad === true) {
        if (
          this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
          this.rolbase === 'Directivo Docente' ||
          this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
          this.rolbase === 'Suplente Comités de Alimentación Escolar') {
          this.yaCargoUbicacion = false;
        } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === ' Líder Jurídico ETC/ET' || this.rolbase === ' Proveedores' || this.rolbase === ' Operador') {
          this.yaCargoUbicacion = true;
        } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
          this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
          this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
          this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
          this.rolbase === 'Supervisor de Campo') {
          this.yaCargoUbicacion = false;
        } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
          this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
          this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
          this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
          this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
        ) {
          this.yaCargoUbicacion = false;
        } else {
          this.yaCargoUbicacion = true;
        }
      } else {
      }
    } else if (sistema === 'administracion') {
      if (
        this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
        this.rolbase === 'Directivo Docente' ||
        this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
        this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === 'Líder Jurídico ETC/ET' || this.rolbase === 'Proveedores' || this.rolbase === 'Operador') {
        this.yaCargoUbicacion = true;
      } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
        this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
        this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
        this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
        this.rolbase === 'Supervisor de Campo') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
        this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
        this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
        this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
        this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
      ) {
        this.yaCargoUbicacion = false;
      } else {
        this.yaCargoUbicacion = true;
      }
    } else if (sistema === 'sgnUAPA') {
      if (
        this.rolbase === 'Rector' || this.rolbase === 'Coordinador' ||
        this.rolbase === 'Directivo Docente' ||
        this.rolbase === 'Docente' || this.rolbase === 'Líder Comités de Alimentación Escolar' ||
        this.rolbase === 'Suplente Comités de Alimentación Escolar') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === 'Líder Jurídico ETC/ET' || this.rolbase === 'Proveedores' || this.rolbase === 'Operador') {
        this.yaCargoUbicacion = true;
      } else if (this.rolbase === 'Coordinador PAE' || this.rolbase === 'Líder de Información' || this.rolbase === 'Coordinador ETC' ||
        this.rolbase === 'Lider contratación/Legal' || this.rolbase === 'Líder financiero' ||
        this.rolbase === 'Líder Gestión Social y Comunicaciones' || this.rolbase === 'Líder Técnico' ||
        this.rolbase === 'Nutricionista - Profesional Técnico' || this.rolbase === 'Asistente Administrativo' ||
        this.rolbase === 'Supervisor de Campo') {
        this.yaCargoUbicacion = false;
      } else if (this.rolbase === 'Coordinador PAE - ET' || this.rolbase === 'Coordinador ET' ||
        this.rolbase === 'Líder de Información - ET' || this.rolbase === 'Lider contratación/Legal - ET' ||
        this.rolbase === 'Líder financiero - ET' || this.rolbase === 'Líder Gestión Social y Comunicaciones - ET' ||
        this.rolbase === 'Líder Técnico - ET' || this.rolbase === 'Nutricionista - Profesional Técnico - ET' ||
        this.rolbase === 'Asistentes Administrativos - ET' || this.rolbase === 'Supervisor de Campo - ET'
      ) {
        this.yaCargoUbicacion = false;
      } else {
        this.yaCargoUbicacion = true;
      }
    } else {
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  openSideNav() {
    this.isOpenSideNav = !this.isOpenSideNav;
    this.openSideNavEvent.emit(this.isOpenSideNav);
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'roles.dialog.component.html',
  styleUrls: ["./roles.dialog.component.scss"],
})

export class RolesContent implements OnInit {

  form: FormGroup;
  userId: string;
  userRolesList: AspNetUserRolesModel[];
  rolesByUserList: AspNetUserRolesModel[];
  rolesList: AspNetRolesModel[];
  rolesFinalList: AspNetRolesModel[] = [];
  constructor(public dialogRef: MatDialogRef<RolesContent>,
    private fb: FormBuilder,
    private userRolesService: AspNetUserRolesService,
    private AspNetRolesService: AspNetRolesService,
    private seguridadService: SeguridadService,
    private router: Router
  ) {
    this.userId = localStorage.getItem('KeyMaster');
    this.userRolesService.getAspNetUserRolesList().subscribe(
      (response: any) => {
        this.userRolesList = response;
        this.rolesByUserList = this.userRolesList.filter(element => element.userId == this.userId);
        this.AspNetRolesService.getAspNetRolesListRelation().subscribe(
          (response: any) => {
            this.rolesList = response;
            this.rolesByUserList.forEach(element => {
              this.rolesFinalList.push(this.rolesList.find(rol => rol.id == element.roleId));
            });
          },
          (err) => {
          }
        );
      },
      (err) => {
      }
    );
    this.form = this.fb.group({
      rol: ["", Validators.required],
    });
  }


  doAction(): void {
    var llaveKeyPersonalizado = 'KeyPersonalizado';
    var llaveKeyBase = 'KeyBase';
    var llaveRol = 'RolBase';
    var llaveRolTemporal = 'RolPersonalizado';
    var rs = this.form.get('rol').value;
    if (rs != localStorage.getItem(llaveKeyBase)) {
      let rAntiguo = localStorage.getItem(llaveRol);
      let LLaveAntiguo = localStorage.getItem(llaveKeyBase);
      localStorage.setItem(llaveKeyBase, rs);
      localStorage.setItem(llaveRol, localStorage.getItem(llaveRolTemporal));
      localStorage.setItem(llaveKeyPersonalizado, LLaveAntiguo);
      localStorage.setItem(llaveRolTemporal, rAntiguo);
    }
    this.dialogRef.close({ data: this.form.value });
    this.router.navigate(['/inicio']).then(() => {
      this.seguridadService.ValidateFullPermissions();
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit(): void {
  }

  public normalize() {
    let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);
    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i)))
          ret.push(mapping[c]);
        else
          ret.push(c);
      }
      return ret.join('');
    }
  };
}

@Component({
  selector: 'dialog-ubicaciones-content',
  templateUrl: 'ubicaciones.dialog.component.html',
  styleUrls: ["./ubicaciones.dialog.component.scss"],
})

export class UbicacionesContent {

  form: FormGroup;
  userId: string;
  userRolesList: AspNetUserRolesModel[];
  rolesByUserList: AspNetUserRolesModel[];
  rolesList: AspNetRolesModel[];
  rolesFinalList: AspNetRolesModel[] = [];
  rolbase = localStorage.getItem('RolBase');
  UbicacionesList: any[];
  departamentosList2: any[];
  ubicacionHardList = [
    { id: "ETC", nombre: "ETC" },
    { id: "ET", nombre: "ET" },
    { id: "Operadores", nombre: "Operadores" },
    { id: "InstitucionEducativa", nombre: "Institución educativa" }];
  UbixRol: any[];
  isInstitucion = false;
  isET = false;
  isOperador = false;
  departamentosList: PA_DepartamentosModel[];
  DivipolasList: DivipolasModel[];
  institucionList: InstitucionEducativaModel[];
  myControl = new FormControl('');
  mesajesalert4 = false;
  filteredOptions: Observable<InstitucionEducativaModel[]>;
  PA_DivipolasGetbyETCObject: PA_DivipolasGetbyETCRequest = {}
  PA_InstitucionEducativaRequest: PA_InstitucionEducativaGetAllWithRelationRequest = {}
  constructor(public dialogRef: MatDialogRef<UbicacionesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router,
    private ETCService: ETCService,
    private ETService: ETService,
    private OperadoresService: OperadoresService,
    private InstitucionEducativaService: InstitucionEducativaService,
    private _PA_DepartamentosService: PA_DepartamentosService,
    private _DivipolasService: DivipolasService,
    private _PA_DivipolasGetbyETCService: PA_DivipolasGetbyETCService,
    private _PA_InstitucionEducativaGetAllWithRelationService: PA_InstitucionEducativaGetAllWithRelationService,
  ) {
    this.userId = localStorage.getItem('KeyMaster');
    this.form = this.fb.group({
      id_Ubicacion: ["", Validators.required],
      ubicacionBase: ["", Validators.required],
    });
    if (
      this.rolbase === 'Manipulador de alimentos') {
      let n = this.ubicacionHardList.filter(item => item.id === 'InstitucionEducativa')
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'Operadores'));
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'ETC'));
      this.UbixRol = n;
    } else if (this.rolbase === 'Operadores - Delegado' || this.rolbase === 'Operadores - Administrador' || this.rolbase === 'Líder Jurídico ETC/ET' || this.rolbase === 'Proveedores' || this.rolbase === 'Operador') {
      let n = this.ubicacionHardList.filter(item => item.id === 'Operadores')
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'ETC'));
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'ET'));
      this.UbixRol = n;
    } else if (this.rolbase === 'Subdirección Técnica de Fortalecimiento' || this.rolbase === 'Oficina Asesora Comunicaciones UApA' || this.rolbase === 'Dirección General' ||
      this.rolbase === 'Oficina Asesora Control Interno' || this.rolbase === 'Oficina Asesora Jurídica' ||
      this.rolbase === 'Oficina Asesora Planeación' || this.rolbase === 'Subdirección General' ||
      this.rolbase === 'Subdirección Técnica de Gestión Corporativa' || this.rolbase === 'Subdirección de Información' ||
      this.rolbase === 'MEN' || this.rolbase === 'Administrador General SiPAE (Administrador UApA)') {
      let n = this.ubicacionHardList.filter(item => item.id === 'ETC')
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'ET'));
      this.UbixRol = n;
    } else if (this.rolbase === 'Coordinador ET/ETC' || this.rolbase === 'Coordinador General' ||
      this.rolbase === 'Interventoría' || this.rolbase === 'Coordinador Técnico' ||
      this.rolbase === 'Supervisor de Campo' || this.rolbase === 'Coordinador Financiero' ||
      this.rolbase === 'Coordinador Jurídico' || this.rolbase === 'Asistente Administrativo' ||
      this.rolbase === 'Profesional Técnico'
    ) {
      let n = this.ubicacionHardList.filter(item => item.id === 'ET')
      n = n.concat(this.ubicacionHardList.filter(item => item.id === 'ETC'));
      this.UbixRol = n;
    } else {
      this.UbixRol = this.ubicacionHardList;
    }

  }

  definirCategorias(clase) {
    let categoria: string;
    switch (clase) {
      case "ETC":
        categoria = "Funcionario";
        break;
      case "Ope":
        categoria = "Operador";
        break;
      case "Ins":
        categoria = "Docente";
        break;
      case "Rec":
        categoria = "Rector";
        break;
      case "Sed":
        categoria = "Funcionario";
        break;
      case "UAp":
        categoria = "UApA";
        break;
      case "ET ":
        categoria = "Funcionario";
        break;
      case "Sin":
        categoria = "Funcionario";
        break;
      case null:
        categoria = "Funcionario";
        break;
      case undefined:
        categoria = "Funcionario";
        break;
      default:
        categoria = "Funcionario";
        break;
    }
    return categoria;
  }

  doAction(): void {
    var ubi = this.form.get('id_Ubicacion').value;
    if (ubi === '0') {
      var nombreUbi = 'Sin definir | Sin Ubicación';
      var nombreUbi2 = 'Sin definir | Sin Ubicación';
      var nombreUbi3 = 'Sin Ubicación';
    } else {
      var nombreUbi = this.ubicacionHardList.find(element => element.id == this.form.get('ubicacionBase').value).nombre + " | " + this.UbicacionesList.find(element => element.id == this.form.get('id_Ubicacion').value).nombre;
      var nombreUbi2 = this.definirCategorias(this.ubicacionHardList.find(element => element.id == this.form.get('ubicacionBase').value).nombre.trim().substring(0, 3)) + " | " + this.UbicacionesList.find(element => element.id == this.form.get('id_Ubicacion').value).nombre;
      var nombreUbi3: string = this.UbicacionesList.find(element => element.id == this.form.get('id_Ubicacion').value).nombre;
    }

    let ubf = localStorage.getItem('IdUbicacion');
    //this.seguridadService.ValidateFullPermissions();
    if (ubf == '0') {
      localStorage.setItem("IdUbicacion", ubi);
      localStorage.setItem('Ubicacion', nombreUbi);
      localStorage.setItem('UbicacionShow', nombreUbi2);
      localStorage.setItem('UbicacionShowRector', nombreUbi3);
      localStorage.setItem('UbicacionShort', nombreUbi3);
      //this.router.navigate(["/inicio"]);
      var loc = window.location;
      var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
      let h = loc.hash;
      if (h === '#/inicio') {
        window.location.reload();
        this.dialogRef.close({ data: this.form.value });
      } else {
        this.router.navigate(["/inicio"]);
        this.dialogRef.close({ data: this.form.value });
      }
      //window.location.reload();
      //
    } else {
      localStorage.setItem("IdUbicacion", ubi);
      localStorage.setItem('Ubicacion', nombreUbi);
      localStorage.setItem('UbicacionShow', nombreUbi2);
      localStorage.setItem('UbicacionShowRector', nombreUbi3);
      localStorage.setItem('UbicacionShort', nombreUbi3);
      var loc = window.location;
      var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
      let h = loc.hash;
      if (h === '#/inicio') {
        window.location.reload();
        this.dialogRef.close({ data: this.form.value });
      } else {

        this.router.navigate(["/inicio"]).then(() => {
          window.location.reload();
        });
        this.dialogRef.close({ data: this.form.value });
      }
    }
    //this.dialogRef.close({ data: this.form.value });
    //window.location.reload();
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onUbicacionBaseClick(value: any): void {
    this.UbicacionesList = [];
    this.form.controls['id_Ubicacion'].setValue(null);
    if (value == "ETC") {
      this.isInstitucion = false;
      this.isET = false;
      this.isOperador = false;
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          this.UbicacionesList.sort(function (a, b) {
            const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        },
        (err) => {
        }
      );
    } else if (value == "ET") {
      this.isInstitucion = false;
      this.isET = true;
      this.isOperador = false;
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.departamentosList2 = response;
          this.departamentosList2.sort(function (a, b) {
            const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        },
        (err) => {
        }
      );
    } else if (value == "Operadores") {

      this.isInstitucion = false;
      this.isET = false;
      this.isOperador = true;
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.departamentosList2 = response;
          this.departamentosList2.sort(function (a, b) {
            const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        },
        (err) => {
        }
      );

    } else if (value == "InstitucionEducativa") {
      this.isInstitucion = true;
      this.isET = false;
      this.isOperador = false;
      this._PA_DepartamentosService.getPA_DepartamentosList().subscribe(
        (response: any) => {
          this.departamentosList = response;
        },
        (err) => {
        }
      );
      /* this.InstitucionEducativaService.getInstitucionEducativaList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          this.UbicacionesList.sort(function (a, b) {
            const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
            const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
        },
        (err) => {
        }
      ); */
    }
  }
  onDepartamentoClick(value: any): void {
    this._DivipolasService.getDivipolasLisFilterByDepartamento(value).subscribe(
      (response: any) => {
        this.DivipolasList = response;
      },
      (err) => {
      }
    );
  }
  onDepartamento2Click(value: any): void {
    this.ETService.getETListRelationFilter(value).subscribe(
      (response: any) => {
        this.UbicacionesList = response;

        this.UbicacionesList.sort(function (a, b) {
          const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
          const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        if (this.UbicacionesList.length == 0) {
          this.mesajesalert4 = true;
        } else { this.mesajesalert4 = false; }
      },
      (err) => {
      }
    );
  }
  onUbicacionClick(value: any): void {


    this.form.controls['id_Ubicacion'].setValue(value);


  }
  onETCClick(value: any): void {
    this.PA_DivipolasGetbyETCObject.id_ETC = value
    this._PA_DivipolasGetbyETCService.getPA_DivipolasGetbyETCList(this.PA_DivipolasGetbyETCObject).subscribe(
      (response: any) => {
        this.DivipolasList = response;
        this.DivipolasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

        let primero = this.DivipolasList[0].id
        let ultimo = this.DivipolasList[this.DivipolasList.length - 1].id
        this.OperadoresService.getOperadoresListFilterEnter2(primero, ultimo).subscribe(
          (response: any) => {
            this.UbicacionesList = response;
            this.UbicacionesList.forEach(element => element.nombre = element.nombreRazonSocial);
            this.UbicacionesList.sort(function (a, b) {
              const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
              const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
            });
            if (this.UbicacionesList.length == 0) {
              this.mesajesalert4 = true;
            } else { this.mesajesalert4 = false; }
          },
          (err) => {
          }
        );
      },
      (err) => {
      }
    );
  }
  onMunicipioClick(value: any): void {
    /*     this.prioInstsParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
        this.prioInstsParams.id_Divipola = value; */
    this.fillInstituto(value);
  }

  private _filter(value: string): InstitucionEducativaModel[] {
    const filterValue = value.toLowerCase();
    return this.institucionList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  fillInstituto(id: number): void {
    this.PA_InstitucionEducativaRequest.Id_DiviPola = id;
    this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
      (response: any) => {
        this.UbicacionesList = response
        this.UbicacionesList.sort(function (a, b) {
          const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
          const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        if (this.UbicacionesList.length == 0) {
          this.mesajesalert4 = true;
        } else { this.mesajesalert4 = false; }
      },
      (err) => {
      }
    );
  }
  displayFn(id) {
    if (!id) return '';

    let index = this.institucionList.findIndex(institucion => institucion.id === id);
    return this.institucionList[index].codigoDane + " - " + this.institucionList[index].nombre;
  }
}
