import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
import { AspNetUserRolesModel } from 'src/app/shared/model/AspNetUserRoles';
import { AspNetUserRolesService } from 'src/app/shared/services/AspNetUserRoles.services';
import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
import { RolesContent } from './navbar.component';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.scss']
})
export class SistemasComponent implements OnInit {
  userId: string;
  userRolesList: AspNetUserRolesModel[];
  rolesByUserList: AspNetUserRolesModel[];
  rolesList: AspNetRolesModel[];
  rolesFinalList: AspNetRolesModel[] = [];
  validaInicio = localStorage.getItem('Inicio');

  constructor(
    private dialog: MatDialog,
    private userRolesService: AspNetUserRolesService,
    private AspNetRolesService: AspNetRolesService,
    private router: Router,
    private seguridadService: SeguridadService,
    private vigenciasService: VigenciasService
  ) {
    this.userId = localStorage.getItem('KeyMaster');
  }

  public dataArray: any;

  ngOnInit(): void {
    this.validaInicio = localStorage.getItem('Inicio');

    if (this.validaInicio === 'true') {
      window.location.reload();
      localStorage.setItem('Inicio', 'false');
    }
  }
  onMiPAEClick() {
    localStorage.setItem('SistemaSelect', 'mipae');
    localStorage.setItem('nombreSistema', 'MiPAE: Sistema de Gestión y Seguimiento de Beneficiarios');

    this.selectedSistema();
    this.GuardarVigencias()


  }
  onSiGEPAEClick() {
    localStorage.setItem('SistemaSelect', 'sigepae');
    localStorage.setItem('nombreSistema', 'SiGE-PAE: Subsistema de gestión para Entidades Territoriales (ETC/ETnC)');
    this.selectedSistema();
    this.GuardarVigencias()


  }

  onPAEstarClick() {
    this.GuardarVigencias();
  }

  selectedSistema() {
    this.userRolesService.getAspNetUserRolesList().subscribe(
      (response: any) => {
        this.userRolesList = response;
        this.rolesByUserList = this.userRolesList.filter(element => element.userId == this.userId);
        this.AspNetRolesService.getAspNetRolesListRelation().subscribe(
          (response: any) => {
            this.rolesList = response;
            this.rolesByUserList.forEach(element => {
              this.rolesFinalList.push(this.rolesList.find(rol => rol.id == element.roleId));
              const dialogRef = this.dialog.open(RolesContent, {});
              dialogRef.afterClosed().subscribe(res => {
                if (res.event != 'Cancel') {
                  localStorage.setItem('Sistema', 'true');
                  window.location.reload();
                }
              });
            });
            this.seguridadService.ValidateFullPermissions();

          },
          (err) => {
          }
        );
      },
      (err) => {
      }
    );
  }

  GuardarVigencias() {
    localStorage.setItem('VigNoSeleccionada', "0");
    localStorage.setItem('VigSeleccionada', "0");
    localStorage.setItem('VigSeleccionadaJson', "");

    this.vigenciasService.AsyncgetVigenciasList().then(
      async (response: any) => {
        this.dataArray = response.filter(items => items.vigenciaActual === true);
        localStorage.setItem('VigNoSeleccionada', this.dataArray[1].id);
        localStorage.setItem('VigSeleccionada', this.dataArray[0].id);
        localStorage.setItem('VigSeleccionadaJson', JSON.stringify(this.dataArray[0]));
      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
      }
    );
  }
}
