import { LocalStorage } from 'src/app/static/local-storage';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
import { AspNetUserRolesModel } from 'src/app/shared/model/AspNetUserRoles';
import { AspNetUserRolesService } from 'src/app/shared/services/AspNetUserRoles.services';
import { RolesContent } from 'src/app/theme/components/navbar/navbar.component';
import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-Iniciosgn',
  templateUrl: './iniciosgn.component.html',
  styleUrls: ['./iniciosgn.component.scss']
})
export class IniciosgnComponent implements AfterViewInit, OnInit,OnDestroy {
  userId: string;
  userRolesList: AspNetUserRolesModel[];
  rolesByUserList: AspNetUserRolesModel[];
  rolesList: AspNetRolesModel[];
  rolesFinalList: AspNetRolesModel[] = [];
  validaInicio = localStorage.getItem('Inicio');
  mostarEncabezadoMenu: boolean = false;
  private subs = new Subscription();
  sidenav: MatSidenav;
  @ViewChild('sidenavm') sidenavm: any;

  constructor(
    private dialog: MatDialog,
    private userRolesService: AspNetUserRolesService,
    private AspNetRolesService: AspNetRolesService,
    private router: Router,
    private seguridadService: SeguridadService
  ) {
    localStorage.setItem('RolSuperAdmonUAPAInicio', 'Si');
    localStorage.setItem('KeylayoutB','No');
    localStorage.setItem('KeylayoutC','No');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = localStorage.getItem('KeyMaster');
    let validaInicio = localStorage.getItem('Inicio');
    this.seguridadService.ValidateFullPermissions();
  
    if (validaInicio === 'true') {
      window.location.reload();
      localStorage.setItem('Inicio', 'false');

    }

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() { }

  ngOnDestroy() {

    if (this.subs) {
      this.subs.unsubscribe();
    }

  }

  onConsultarClick(){
    localStorage.setItem('nombreSistema', 'SGN UApA: Subsistema de gestión Nacional');
    localStorage.setItem('RolSuperAdmonUAPAInicio', 'No');
    localStorage.setItem('KeylayoutC','No');
    localStorage.setItem('KeylayoutB','Si');
    document.getElementById("menusuperior1").click();

    this.router.navigateByUrl('/InformacionETC');

  }

  onCGestionarClick(){
    localStorage.setItem('nombreSistema', 'SGN UApA: Subsistema de gestión Nacional');
    localStorage.setItem('RolSuperAdmonUAPAInicio', 'No');
    localStorage.setItem('KeylayoutB','Si');
    document.getElementById("menusuperior2").click();
    this.router.navigateByUrl('/Iniciosgn');
    document.getElementById("menusuperior2").click();
  }

}
