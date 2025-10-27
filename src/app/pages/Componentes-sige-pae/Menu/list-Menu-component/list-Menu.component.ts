import { filter } from 'rxjs/operators';
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
import { MenuModel } from "src/app/shared/model/Menu";
import { MenuService } from "src/app/shared/services/Menu.services";
import { environment } from 'src/environments/environment';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { DiagnosticoSituacionalExtendService } from 'src/app/shared/services/DiagnosticoSituacional-Extend.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { SistemaModel } from 'src/app/shared/model/Sistema';
import { SistemaService } from 'src/app/shared/services/Sistema.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';

@Component({
  selector: "app-list-Menu",
  templateUrl: "./list-Menu.component.html",
  styleUrls: ["./list-Menu.component.scss"],
})

export class ListMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);




  private dataArray: any;
  displayedColumns: string[] = ["nombre", "grupoEsquema", "orden", "ordenPadre", "padre", "icono", 'action'];
  public dataSource!: MatTableDataSource<MenuModel>;
  MenuObject: MenuModel = {
    id: 0,
    nombre: '',
    controlador: '',
    accion: '',
    grupoEsquema: '',
    link: '',
    orden: 0,
    ordenPadre: 0,
    padre: 0,
    icono: '',
    estadoMenu: true,
    auditoria: '',


    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',

    isValid: false,
    isSelected: false,
    completed: false,
  }

  constructor(public dialog: MatDialog, private route: ActivatedRoute, public MenuService: MenuService,private seguridadService:SeguridadService,) { }

  ngOnInit(): void {
    console.clear();
    this.MenuService.getMenuList().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.dataSource = new MatTableDataSource<MenuModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
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

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);
  }
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogMenuContent, {
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



  addRowData(row_obj: MenuModel): void {

    this.MenuObject.link = row_obj.link;
    this.MenuObject.nombre = row_obj.nombre;
    this.MenuObject.controlador = row_obj.controlador;
  if(row_obj.icono === '' && row_obj.link==='-' ){
    if(row_obj.accion == '1'){

      this.MenuObject.accion = '2';
    }else if(row_obj.accion == '2'){
      this.MenuObject.accion = '1';
    }else{
      this.MenuObject.accion = row_obj.accion;
    }
  }else if(row_obj.icono != '' && row_obj.link==='-'){
    this.MenuObject.accion = row_obj.accion;
  }else if(row_obj.icono === '' && row_obj.link!='-'){
    this.MenuObject.accion = row_obj.accion;
  }


    this.MenuObject.grupoEsquema = row_obj.grupoEsquema;
    this.MenuObject.orden = row_obj.orden;
    this.MenuObject.ordenPadre = row_obj.ordenPadre;
    this.MenuObject.padre = row_obj.padre;
    this.MenuObject.icono = row_obj.icono;
    this.MenuService.addMenu(this.MenuObject).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }
  esq = [];

  updateRowData(row_obj: MenuModel): boolean | any {
    this.MenuObject.link = row_obj.link;
    this.MenuObject.nombre = row_obj.nombre;
    this.MenuObject.controlador = row_obj.controlador;
    this.MenuObject.accion = row_obj.accion;
    this.MenuObject.grupoEsquema = row_obj.grupoEsquema;
    this.MenuObject.orden = row_obj.orden;
    this.MenuObject.ordenPadre = row_obj.ordenPadre;
    this.MenuObject.padre = row_obj.padre;
    this.MenuObject.icono = row_obj.icono;
    this.MenuObject.id = row_obj.id;

    this.MenuService.updateMenu(this.MenuObject).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }


  deleteRowData(row_obj: MenuModel): boolean | any {
    this.MenuObject.link = row_obj.link;
    this.MenuObject.nombre = row_obj.nombre;
    this.MenuObject.controlador = row_obj.controlador;
    this.MenuObject.accion = row_obj.accion;
    this.MenuObject.grupoEsquema = row_obj.grupoEsquema;
    this.MenuObject.orden = row_obj.orden;
    this.MenuObject.ordenPadre = row_obj.ordenPadre;
    this.MenuObject.padre = row_obj.padre;
    this.MenuObject.icono = row_obj.icono;
    this.MenuObject.id = row_obj.id;
    this.MenuService.deleteMenu(this.MenuObject.id, this.MenuObject.nombre, this.MenuObject.link, this.MenuObject.grupoEsquema, this.MenuObject.controlador, this.MenuObject.accion,this.MenuObject.orden,this.MenuObject.ordenPadre,this.MenuObject.padre).subscribe(
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
}



@Component({
  selector: 'dialog-content',
  templateUrl: 'list-Menu.dialog.component.html',
  styleUrls: ["./list-Menu.dialog.component.scss"],
})

export class DialogMenuContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  Nombre = [];
  MenuPrincipal = [];
  MenuSegundario = [];
  GrupoEsquema = [];
  GrupoEsquema2 = [];
  orden = [];
  Ms: MenuModel[];
  Mp: MenuModel[];
  sub = false;
  principal = false;
  segundario = false;
  SistemaList: SistemaModel[];
  constructor(public dialogRef: MatDialogRef<DialogMenuContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private MenuService: MenuService,
    public servicios: RepositoriosExtendService,
    private sistemaService: SistemaService,
  ) {

    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      controlador: [data.controlador],
      accion: [data.accion],
      grupoEsquema: [data.grupoEsquema, Validators.required],
      link: [data.link],
      orden: [data.orden],
      ordenPadre: [data.ordenPadre],
      padre: [data.padre],
      icono: [data.icono],
      menuRol: [data.menuRol],
      estadoMenu: [data.estadoMenu, Validators.required],
      auditoria: [''],
      principal: [''],
      secundario: [''],
    });
    this.allFilter();


    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  allFilter() {
    this.MenuService.getMenuList().subscribe(
      (response: any) => {
        console.log(response);

        let p = response.filter(item => item.icono === '')
        this.Nombre = p
        this.Mp = response
        this.MenuPrincipal = this.Mp.filter(item => item.padre === 0);
        console.log('nombres', this.Nombre);

      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
      }
    );
    this.sistemaService.getSistemaList().subscribe(
      (response: any) => {
        this.SistemaList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Sistema", err);
      }
    );
  }
  onMenuPrincipal($event: any): void {
    console.log($event);
    this.MenuSegundario = this.Mp.filter(item => item.padre === $event)
  }
  onMenuPrincipal2($event: any): void {
    console.log($event);


    this.form.controls['grupoEsquema'].setValue($event);
    this.form.controls['padre'].setValue(0);
    this.orden = this.Mp.filter(item => item.padre === 0)
    console.log(this.orden);

    if (this.orden.length === 0) {
      console.log('entro');
      this.form.controls['orden'].setValue(1);
      this.form.controls['ordenPadre'].setValue(1);
      this.form.controls['estadoMenu'].setValue(true);
      this.form.controls['controlador'].setValue('0');
      this.form.controls['link'].setValue('-');
      this.form.controls['icono'].setValue('');

    } else {
      let p = this.orden.length-1
      let nu = this.orden[p].orden + 100
      console.log(nu,p);
      this.form.controls['orden'].setValue(nu);
      this.form.controls['ordenPadre'].setValue(nu);
      this.form.controls['estadoMenu'].setValue(true);
      this.form.controls['controlador'].setValue('0');
      this.form.controls['link'].setValue('-');
      this.form.controls['icono'].setValue('');


    }

  }
  onMenuPrincipal3($event: any): void {
    console.log($event)
    this.GrupoEsquema2 = this.Mp.filter(item => item.id === $event);
    console.log('esquema2',this.GrupoEsquema2);
    this.form.controls['grupoEsquema'].setValue(this.GrupoEsquema2[0].nombre);
    this.form.controls['padre'].setValue(this.GrupoEsquema2[0].id);
    this.form.controls['estadoMenu'].setValue(true);
    this.form.controls['controlador'].setValue('1');
    this.form.controls['link'].setValue('-');
    this.form.controls['accion'].setValue(this.GrupoEsquema2[0].accion);
    this.orden = this.Mp.filter(item => item.padre === $event)
    if (this.orden.length === 0) {
      console.log('entro');
      this.form.controls['orden'].setValue(this.GrupoEsquema2[0].orden + 10);
      this.form.controls['ordenPadre'].setValue(this.GrupoEsquema2[0].orden + 10);


    } else {
      let p = this.orden.length-1
      let nu = this.orden[p].orden + 10
      console.log(nu);
      this.form.controls['orden'].setValue(nu);
      this.form.controls['ordenPadre'].setValue(nu);
    }
  }

  onMenuPrincipalCambio($event: any): void{
    console.log($event);

  }
  onMenuSecundario($event: any): void {
    console.log($event);
    this.GrupoEsquema = this.Mp.filter(item => item.id === $event)
    console.log(this.GrupoEsquema);

    this.form.controls['grupoEsquema'].setValue(this.GrupoEsquema[0].nombre);

    console.log($event);
    this.form.controls['padre'].setValue($event);
    this.orden = this.Mp.filter(item => item.padre === $event)
    if (this.orden.length === 0) {
      console.log('entro');
      this.form.controls['orden'].setValue(this.GrupoEsquema[0].orden + 10);
      this.form.controls['ordenPadre'].setValue(this.GrupoEsquema[0].orden + 10);
      this.form.controls['estadoMenu'].setValue(true);
      this.form.controls['controlador'].setValue('2');
      this.form.controls['accion'].setValue(this.GrupoEsquema[0].accion);
      this.form.controls['icono'].setValue('');

    } else {

      let p = this.orden.length-1
      let nu = this.orden[p].orden + 1
      console.log(nu);
      this.form.controls['orden'].setValue(nu);
      this.form.controls['ordenPadre'].setValue(nu);
      this.form.controls['estadoMenu'].setValue(true);
      this.form.controls['controlador'].setValue('2');
      this.form.controls['accion'].setValue(this.GrupoEsquema[0].accion);
      this.form.controls['icono'].setValue('');


    }
  }


  MenuPrincipalDialog() {
    console.log(this.sub);
    this.sub = false;
    this.principal = true;
    this.segundario = false;
    this.form.controls['grupoEsquema'].setValue('');
    this.form.controls['orden'].setValue('');
    this.form.controls['ordenPadre'].setValue('');
    this.form.controls['padre'].setValue('');
    this.form.controls['nombre'].setValue('');
  }
  MenuSegundarioDialog() {
    console.log(this.sub);
    this.sub = false;
    this.principal = false;
    this.segundario = true;
    this.form.controls['grupoEsquema'].setValue('');
    this.form.controls['orden'].setValue('');
    this.form.controls['ordenPadre'].setValue('');
    this.form.controls['padre'].setValue('');
    this.form.controls['nombre'].setValue('');


  }
  SubMenuDialog() {
    console.log(this.sub);
    this.sub = true;
    this.principal = false;
    this.segundario = false;
    this.form.controls['grupoEsquema'].setValue('');
    this.form.controls['orden'].setValue('');
    this.form.controls['ordenPadre'].setValue('');
    this.form.controls['padre'].setValue('');
    this.form.controls['nombre'].setValue('');

  }
  sistema($event: any){
    console.log('sistema',$event);


  }
  public onFileSelected(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: fileupload.name, cnx: environment.cnxBS, container: environment.containerDS };
      this.addFileBlobRepositorios(_fileUpload);
    }
  }
  addFileBlobRepositorios(fileUpload): void {
    this.servicios.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.form.controls['icono'].setValue(String.fromCharCode.apply(null, new Uint8Array(response)));
      },
      (err) => {
        console.log("-----> error ", err);
      }
    );
  }
  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
