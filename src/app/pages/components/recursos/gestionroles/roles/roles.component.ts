import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
import { AspNetUsersModel } from 'src/app/shared/model/AspNetUsers';
import { TipoActorModel } from 'src/app/shared/model/TipoActor';
import { TipoDocumentoIdenModel } from 'src/app/shared/model/TipoDocumentoIden';
import { AspNetUsersService } from 'src/app/shared/services/AspNetUsers.services';
import { TipoActorService } from 'src/app/shared/services/TipoActor.services';
import { TipoDocumentoIdenService } from "src/app/shared/services/TipoDocumentoIden.services";
import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
import { PA_GetRolPermisosService } from 'src/app/shared/services/PA_GetRolPermisos.services';
import { PA_RolPermisosActualizaService } from 'src/app/shared/services/PA_RolPermisosActualiza.services';
import { PA_MenuRolActualizaService } from 'src/app/shared/services/PA_MenuRolActualiza.services';

import { GestionUsuariosApiService } from '../../../../../shared/services/gestion-usuarios-api.service';
import { TipoRolesModel } from 'src/app/shared/model/TipoRoles';
import { TipoRolesService } from 'src/app/shared/services/TipoRoles.services';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PA_GetRolPermisosModel } from 'src/app/shared/model/PA_GetRolPermisosModel';
import { PA_RolPermisosActualizaRequestModel } from 'src/app/shared/model/PA_RolPermisosActualizaRequestModel';
import { ThrowStmt } from '@angular/compiler';
import { AprobacionPriorizacionesModel } from 'src/app/shared/model/AprobacionPriorizaciones';
import { PA_GetMenuRolAllModel } from 'src/app/shared/model/PA_GetMenuRolModelAll';
import { PA_GetMenuRolService } from 'src/app/shared/services/PA_GetMenuRol.services';
import { PA_MenuRolActualizaModel } from 'src/app/shared/model/PA_MenuRolActualizaModel';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';


export interface UsuarioElemento {
  tipoID: string;
  numeroIdentificacion: string;
  centroAcopioId: number;
  tipoETCId: number;
  numPosicion: number;
  destino: string;
  cabecera: number | null;
  costo: number;
  kilometros: number;
  horas: number;
  medioTransporteId: number;
  centroAcopio: number | null;
  tipoTransporteId: number;
  iconName: string;
  readonly: boolean;
  editInfo: boolean;
  addInfo: boolean;
}

@Component({
  selector: 'app-roles',
  providers: [GestionUsuariosApiService],
  templateUrl: './roles.component.html',
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  AspNetRolesList: AspNetRolesModel[] = [];

  displayedColumns: string[] = ["name", "sid_TipoRoles", 'action'];
  dataArray: any;
  dataSource!: MatTableDataSource<AspNetRolesModel>;
  dataSourceList: any = [];


  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private aspNetUsersService: AspNetUsersService,
    private AspNetRolesService: AspNetRolesService,
    private rolPermisosActualizaService: PA_RolPermisosActualizaService,
    private menuRolActualizaService: PA_MenuRolActualizaService,
    private seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.getListRoles();

    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  getListRoles() {
    this.AspNetRolesService.getAspNetRolesListRelation().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.dataArray.sort(function (a, b) {

          const nameA = a.name.toUpperCase(); // ignore upper and lowercase

          const nameB = b.name.toUpperCase(); // ignore upper and lowercase

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        this.dataSource = new MatTableDataSource<AspNetRolesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openMenuDialog(obj: any): void {

    const dialogRef = this.dialog.open(DialogAspNetMenuRolesContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.menus) {
        this.updateRowMenuData(result.menus);
      }
    });
  }

  updateRowMenuData(menus: any): boolean | any {
    menus.forEach(element => {
      let menuRolActualiza: PA_MenuRolActualizaModel = {
        id: null,
        Id_Menu: null,
        AspNetRoles: null,
        Estado: null,
        auditoria: null
      };
      menuRolActualiza.id = element.id_Menu;
      menuRolActualiza.Id_Menu = element.id_Menu;
      menuRolActualiza.AspNetRoles = element.rol;
      menuRolActualiza.Estado = element.estado;
      menuRolActualiza.auditoria = "auditoria";

      this.menuRolActualizaService.getPA_MenuRolActualizaList(menuRolActualiza).subscribe(
        (response: any) => {

        },
        (err) => {
        }
      );
    })
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(DialogAspNetRolesContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data, result.permisos);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data, result.permisos);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }


  addRowData(row_obj: any, permisos: any): void {
    row_obj.normalizedName = row_obj.name;
    this.AspNetRolesService.addAspNetRoles(row_obj).subscribe(
      (response) => {
        permisos.forEach(element => {
          element.id_Rol = response.id
          this.rolPermisosActualizaService.getPA_RolPermisosActualizaList(element).subscribe(
            (response: any) => {
            },
            (err) => {
            }
          );
        })
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }


  updateRowData(row_obj: any, permisos: any): boolean | any {
    row_obj.normalizedName = row_obj.name;
    this.AspNetRolesService.updateAspNetRoles(row_obj).subscribe(
      (response) => {
        permisos.forEach(element => {
          this.rolPermisosActualizaService.getPA_RolPermisosActualizaList(element).subscribe(
            (response: any) => {
            },
            (err) => {
            }
          );
        })
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }


  deleteRowData(row_obj: AspNetRolesModel): boolean | any {
    const ideliminar = row_obj.id;
    this.AspNetRolesService.deleteAspNetRoles(ideliminar).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {

      }
    );

  }

}
////////////////////////////////////////////////PERMISOS ROL DIALOG//////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'dialog-content',
  templateUrl: 'list-AspNetRoles.dialog.component.html',
  styleUrls: ["./list-AspNetRoles.dialog.component.scss"],
})

export class DialogAspNetRolesContent implements OnInit {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  loading = true;
  disableForm = false;

  TipoRolesList: TipoRolesModel[];
  permisosList: PA_GetRolPermisosModel[];
  //SistemasList: string[] = ["Administración", "MiPAE", "PAEalaMano", 'PAEstaralDia', 'SIGE-PAE', 'UApa'];
  SistemasList: string[] = ["MiPAE", 'SiGEPAE', 'UApA'];
  displayedColumns: string[] = ["modulo", "ver", "crear", "editar", "eliminar", "aprobar", "imprimir"];
  permisosBySistema = {};
  requestRolPermisosActualiza: PA_RolPermisosActualizaRequestModel;
  requestRolPermisosActualizaList: PA_RolPermisosActualizaRequestModel[] = [];

  constructor(public dialogRef: MatDialogRef<DialogAspNetRolesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AspNetRolesModel,
    private fb: FormBuilder
    , private tipoRolesService: TipoRolesService,
    private PA_GetRolPermisosService: PA_GetRolPermisosService,
    private rolPermisosActualizaService: PA_RolPermisosActualizaService,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    this.PA_GetRolPermisosService.getPA_GetRolPermisosList(data.id).subscribe(
      (response: any) => {

        this.permisosList = response;


        if (this.permisosList.length > 0) {

          this.permisosList.forEach(element => {
            if (!this.permisosBySistema.hasOwnProperty(element.sistema)) {
              this.permisosBySistema[element.sistema] = {
                permisos: []
              }
            }

            this.permisosBySistema[element.sistema].permisos.push({
              id: element.id,
              id_Rol: element.id_Rol,
              id_Modulo: element.id_Modulo,
              modulo: element.modulo,
              ver: element.ver,
              crear: element.crear,
              editar: element.editar,
              eliminar: element.eliminar,
              aprobar: element.aprobar,
              imprimir: element.imprimir
            });
            this.permisosBySistema[element.sistema].permisos.sort(function (a, b) {
              const nameA = a.modulo.toUpperCase(); // ignore upper and lowercase
              const nameB = b.modulo.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            if (element == this.permisosList[this.permisosList.length - 1]) {
              this.loading = false;
            }

          });
        }
      },
      (err) => {
      }
    );


    this.tipoRolesService.getTipoRolesList().subscribe(
      (response: any) => {
        this.TipoRolesList = response;
      },
      (err) => {
      }
    );

    this.form = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      id_TipoRoles: [data.id_TipoRoles, Validators.required],
    });

  }

  valueChange(id: number, sistema: string, accion: string, $event) {
    this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id)[accion] = $event.checked;
    if (this.requestRolPermisosActualizaList.find(element => element.id_Modulo == id)) {
      this.requestRolPermisosActualizaList.find(element => element.id_Modulo == id)[accion] = this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id)[accion] ? true : false;
    }
    else {
      this.requestRolPermisosActualiza = {
        id: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).id,
        id_Rol: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).id_Rol == "undefined" ? null : this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).id_Rol,
        id_Modulo: id,
        ver: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).ver ? true : false,
        crear: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).crear ? true : false,
        editar: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).editar ? true : false,
        eliminar: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).eliminar ? true : false,
        aprobar: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).aprobar ? true : false,
        imprimir: this.permisosBySistema[sistema].permisos.find(permiso => permiso.id_Modulo == id).imprimir ? true : false,
        auditoria: "auditoria"
      }
      this.requestRolPermisosActualizaList.push(this.requestRolPermisosActualiza);
    }
  }

  ngOnInit(): void {
    if (this.action == "Ver" || this.action == "Actualizar") {
      this.disableForm = true;
    } else if (this.action == "Adicionar") {
      this.disableForm = false;
    }

  }
  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value, permisos: this.requestRolPermisosActualizaList });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}

////////////////////////////////////////////////MENU ROL DIALOG//////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-menurol-content',
  templateUrl: 'list-AspNetRolesMenu.dialog.component.html',
  styleUrls: ["./list-AspNetRolesMenu.dialog.component.scss"],
})

export class DialogAspNetMenuRolesContent implements OnInit {

  loading = true;

  menuRolAllList: PA_GetMenuRolAllModel[];
  menuRolAllChangedList: PA_GetMenuRolAllModel[] = [];
  displayedColumns: string[] = ["menu", "estado"];
  dataSourceMenuRol!: MatTableDataSource<PA_GetMenuRolAllModel>;

  constructor(public dialogRef: MatDialogRef<DialogAspNetMenuRolesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AspNetRolesModel,
    private fb: FormBuilder,
    private PA_GetMenuRolService: PA_GetMenuRolService
  ) {

    this.PA_GetMenuRolService.getPA_GetMenuRolAllList(data.id).subscribe(
      (response: any) => {
        this.loading = false;
        this.menuRolAllList = response;

        this.dataSourceMenuRol = new MatTableDataSource<PA_GetMenuRolAllModel>(this.menuRolAllList);
      },
      (err) => {
      }
    );
  }

  valueChange(menuRol: PA_GetMenuRolAllModel, $event) {
    if (this.menuRolAllChangedList.find(element => element.id_Menu == menuRol.id_Menu)) {
      this.menuRolAllChangedList.find(element => element.id_Menu == menuRol.id_Menu).estado = $event.checked
    } else {
      menuRol.estado = $event.checked;
      this.menuRolAllChangedList.push(menuRol);
    }
  }

  ngOnInit(): void {


  }
  doAction(): void {
    this.dialogRef.close({ menus: this.menuRolAllChangedList });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
