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
import { ModuloModel } from "src/app/shared/model/Modulo";
import { ModuloService } from "src/app/shared/services/Modulo.services";
import { environment } from 'src/environments/environment';
import { SistemaModel } from "src/app/shared/model/Sistema";
import { SistemaService } from "src/app/shared/services/Sistema.services";
import { SeguridadService } from 'src/app/seguridad/seguridad.service';


@Component({
  selector: "app-list-Modulo",
  templateUrl: "./list-Modulo.component.html",
  styleUrls: ["./list-Modulo.component.scss"],
})

export class ListModuloComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

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
  ModuloDetail: ModuloModel | null = null;
  ModuloList: ModuloModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;

  sistemasList : SistemaModel[];

  private dataArray: any;
  displayedColumns: string[] = ["nombre", "sid_Sistema", 'action'];
  public dataSource!: MatTableDataSource<ModuloModel>;
  selection = new SelectionModel<ModuloModel>(true, []);

  constructor(public dialog: MatDialog, private route: ActivatedRoute, public ModuloService: ModuloService, private sistemaService: SistemaService, private seguridadService:SeguridadService ) { }

  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);
  }

  ngOnInit(): void {
    this.sistemaService.getSistemaList().subscribe(
      (response: any) => {
        this.sistemasList = response;
        this.ModuloService.getModuloList().subscribe(
          (response: any) => {
            this.dataArray = response;
            console.log("O----O", this.dataArray);
            this.dataArray.forEach(element => element.sid_Sistema = this.sistemasList.find(sistema => sistema.id == element.id_Sistema).nombre);
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<ModuloModel>(this.dataArray);
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
        console.log("Error al cargar los registros del selected de sistemas", err);
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
  //  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogModuloContent, {
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



  addRowData(row_obj: ModuloModel): void {
    this.ModuloService.addModulo(row_obj).subscribe(
      (response) => {
        console.log('Registro creado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo insertar: ' + err);
      }
    );
  }


  updateRowData(row_obj: ModuloModel): boolean | any {
    this.ModuloService.updateModulo(row_obj).subscribe(
      (response) => {
        console.log('Registro actualizado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo actualizar: ' + err);
      }
    );
  }


  deleteRowData(row_obj: ModuloModel): boolean | any {
    const ideliminar = row_obj.id;
    this.ModuloService.deleteModulo(ideliminar).subscribe(
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

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; De lo contrario, limpia. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'list-Modulo.dialog.component.html',
  styleUrls: ["./list-Modulo.dialog.component.scss"],
})

export class DialogModuloContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales
  SistemaList: SistemaModel[];



  constructor(public dialogRef: MatDialogRef<DialogModuloContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ModuloModel,
    private fb: FormBuilder
    , private sistemaService: SistemaService

  ) {

    this.sistemaService.getSistemaList().subscribe(
      (response: any) => {
        this.SistemaList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Sistema", err);
      }
    );


    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      id_Sistema: [data.id_Sistema, Validators.required],
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
