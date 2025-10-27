import { LocalStorage } from 'src/app/static/local-storage';
import { Component, AfterViewInit, OnInit } from '@angular/core';
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
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-Inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit, OnInit {
  userId: string;
  userRolesList: AspNetUserRolesModel[];
  rolesByUserList: AspNetUserRolesModel[];
  rolesList: AspNetRolesModel[];
  rolesFinalList: AspNetRolesModel[] = [];

  constructor(
    private dialog: MatDialog,
    private userRolesService: AspNetUserRolesService,
    private AspNetRolesService: AspNetRolesService,
    private router: Router,
    private seguridadService: SeguridadService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = localStorage.getItem('KeyMaster');
    let validaInicio = localStorage.getItem('Inicio');
    if (validaInicio === 'true') {
      this.userRolesService.getAspNetUserRolesList().subscribe(
        (response: any) => {
          this.userRolesList = response;
          this.rolesByUserList = this.userRolesList.filter(element => element.userId == this.userId);
          this.AspNetRolesService.getAspNetRolesListRelation().subscribe(
            (response: any) => {
              this.rolesList = response;
              this.rolesByUserList.forEach(element => {
                this.rolesFinalList.push(this.rolesList.find(rol => rol.id == element.roleId));
                if (this.rolesFinalList.length > 1) {
                  const dialogRef = this.dialog.open(RolesContent, {});
                  dialogRef.afterClosed().subscribe(res=> {
                    localStorage.setItem('Sistema', 'true');
                    this.router.navigate(['/sistemas']);
                  });
                }
              });
            },
            (err) => {
              console.log("-----> error en cargar los registros", err);
            }
          );
        },
        (err) => {
          console.log("Error al cargar los registros de los roles", err);
        }
      );
      localStorage.setItem('Inicio', 'false');

    }


    // else{
    //   if (this.seguridadService.estaLogueado()){

    //     this.router.navigate(['/inicial']).then(() => {
    //       window.location.reload();
    //     });
    //   }
    //   else
    //   {
    //     this.router.navigate(['/Login'])
    //   }
    // }


  }

  ngOnInit(): void {


  }
  ngAfterViewInit() { }
}
