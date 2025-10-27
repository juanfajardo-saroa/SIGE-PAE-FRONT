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
import { ParametroModel } from "src/app/shared/model/Parametro";
import { ParametroService } from "src/app/shared/services/Parametro.services";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-list-Parametro",
  templateUrl: "./list-Parametro.component.html",
  styleUrls: ["./list-Parametro.component.scss"],
})

export class ListParametroComponent implements OnInit, AfterViewInit, OnDestroy {

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
  ParametroDetail: ParametroModel | null = null;
  ParametroList: ParametroModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;

  private dataArray: any;
  displayedColumns: string[] = ['select', "nombre", "valor", "unidad", 'action'];
  public dataSource!: MatTableDataSource<ParametroModel>;
  selection = new SelectionModel<ParametroModel>(true, []);

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public ParametroService: ParametroService) { }

  ngOnInit(): void {
    this.ParametroService.getParametroList().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<ParametroModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
        this.isLoading = false;
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
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogParametroContent, {
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

  addRowData(row_obj: ParametroModel): void {
    this.ParametroService.addParametro(row_obj).subscribe(
      (response) => {
        console.log('Registro creado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo insertar: ' + err);
      }
    );
  }

  updateRowData(row_obj: ParametroModel): boolean | any {
    this.ParametroService.updateParametro(row_obj).subscribe(
      (response) => {
        console.log('Registro acutalizado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo actualizar: ' + err);
      }
    );
  }

  deleteRowData(row_obj: ParametroModel): boolean | any {
    const ideliminar = row_obj.id;
    const nameDelete = row_obj.nombre;
    this.ParametroService.deleteParametro(ideliminar, nameDelete).subscribe(
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

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'list-Parametro.dialog.component.html',
  styleUrls: ["./list-Parametro.dialog.component.scss"],
})

export class DialogParametroContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogParametroContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ParametroModel,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      valor: [data.valor],
      unidad: [data.unidad],
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

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
}