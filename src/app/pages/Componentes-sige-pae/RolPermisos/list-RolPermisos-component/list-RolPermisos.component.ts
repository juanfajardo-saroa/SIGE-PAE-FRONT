import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Inject, Optional, ViewChild, OnDestroy, AfterViewInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolPermisosModel } from "src/app/shared/model/RolPermisos";
import { RolPermisosService } from "src/app/shared/services/RolPermisos.services";
import { environment } from 'src/environments/environment';
import { ModuloModel } from "src/app/shared/model/Modulo";
import { ModuloService } from "src/app/shared/services/Modulo.services";
import { AspNetRolesModel } from "src/app/shared/model/AspNetRoles";
import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
import { RolesService } from 'src/app/shared/services/Roles.services';
import { RolesModel } from 'src/app/shared/model/Roles';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';


@Component({
  selector: "app-list-RolPermisos",
  templateUrl: "./list-RolPermisos.component.html",
  styleUrls: ["./list-RolPermisos.component.scss"],
})


export class ListRolPermisosComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  checked = false;
  gridVisible: boolean = true;
  formVisible: boolean = false;
  dialogVisible: boolean = false;
  RolPermisosDetail: RolPermisosModel | null = null;
  RolPermisosList: RolPermisosModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;

  private dataArray: any;
  displayedColumns: string[] = ["sid_Rol", "sid_Modulo", "ver", "crear", "editar", "eliminar", "aprobar", "imprimir", 'action'];
  public dataSource!: MatTableDataSource<RolPermisosModel>;
  selection = new SelectionModel<RolPermisosModel>(true, []);

  ModuloList: ModuloModel[];
  AspNetRolesList: AspNetRolesModel[];


  constructor(public dialog: MatDialog, private route: ActivatedRoute, public RolPermisosService:
    RolPermisosService, private moduloService: ModuloService, private aspNetRolesService: AspNetRolesService,
    private seguridadService:SeguridadService,) { }

  ngOnInit(): void {

    this.moduloService.getModuloList().subscribe(
      (response: any) => {
        this.ModuloList = response;
        this.aspNetRolesService.getAspNetRolesList().subscribe(
          (response: any) => {
            this.AspNetRolesList = response;
            this.RolPermisosService.getRolPermisosList().subscribe(
              (response: any) => {
                this.dataArray = response;
                this.dataArray.forEach(element => element.sid_Rol = this.AspNetRolesList.find(rol => rol.id == element.id_Rol).name);
                this.dataArray.forEach(element => element.sid_Modulo = this.ModuloList.find(modulo => modulo.id == element.id_Modulo).nombre);
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<RolPermisosModel>(this.dataArray);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              (err) => {
                console.log("-----> error en cargar los registros", err);
                this.isLoading = false;
              }
            );
          },
          (err) => {
            console.log("Error al cargar los registros del selected de las AspNetRoles", err);
          }
        );
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Modulo", err);
      }
    );

    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
  }


  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogRolPermisosContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }

  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);

  }

  addRowData(row_obj: RolPermisosModel): void {
    this.RolPermisosService.addRolPermisos(row_obj).subscribe(
      (response) => {
        console.log('Registro creado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo insertar: ' + err);
      }
    );
  }


  updateRowData(row_obj: RolPermisosModel): boolean | any {
    this.RolPermisosService.updateRolPermisos(row_obj).subscribe(
      (response) => {
        console.log('Registro actualizado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo actualizar: ' + err);
      }
    );
  }


  deleteRowData(row_obj: RolPermisosModel): boolean | any {
    const ideliminar = row_obj.id;
    this.RolPermisosService.deleteRolPermisos(ideliminar).subscribe(
      (response) => {
        console.log("Registro Eliminado Satisfactoriamente");
        this.ngOnInit();
      },
      (err) => {
        console.log(
          "No fue posible eliminar el registro, es posible que tenga dependencias hijas: <br>" +
          err
        );
      }
    );

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

const elementData: any[] = [
  {ver: false},
];


@Component({
  selector: 'dialog-content',
  templateUrl: 'list-RolPermisos.dialog.component.html',
  styleUrls: ["./list-RolPermisos.dialog.component.scss"],
})

export class DialogRolPermisosContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  ModuloList: ModuloModel[];
  AspNetRolesList: AspNetRolesModel[];
  displayedColumnsForm: string[] = ["ver", "crear", "editar", "eliminar", "aprobar", "imprimir"];

  dataSourceForm = new MatTableDataSource<any>(elementData);

  constructor(public dialogRef: MatDialogRef<DialogRolPermisosContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RolPermisosModel,
    private fb: FormBuilder
    , private moduloService: ModuloService
    , private aspNetRolesService: AspNetRolesService

  ) {

    this.moduloService.getModuloList().subscribe(
      (response: any) => {
        this.ModuloList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Modulo", err);
      }
    );
    this.aspNetRolesService.getAspNetRolesList().subscribe(
      (response: any) => {
        this.AspNetRolesList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las AspNetRoles", err);
      }
    );


    this.form = this.fb.group({
      id: [data.id],
      id_Rol: [data.id_Rol, Validators.required],
      id_Modulo: [data.id_Modulo, Validators.required],
      ver: [data.ver],
      crear: [data.crear],
      editar: [data.editar],
      eliminar: [data.eliminar],
      aprobar: [data.aprobar],
      imprimir: [data.imprimir],
      auditoria: [''],
    });



    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
