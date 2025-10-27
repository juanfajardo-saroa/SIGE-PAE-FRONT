/**
 * Recursos Prinicpales de Angular
 *
 *
 */
import { Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * Recursos Adicionales de Angular para MaterialDatatable
 *
 * y Formularios Reactivos o Dinámicos
 */
import { Inject, Optional, ViewChild, OnDestroy, AfterViewInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * LLamados de Modelos y Servicios que son Requeridos para el Componente
 *
 *
 */
import { CentroDeAcopioModel } from "src/app/shared/model/CentroDeAcopio";
import { CentroDeAcopioService } from "src/app/shared/services/CentroDeAcopio.services";
/**
 * Variables de Entorno Global
 *
 *
 */
import { environment } from 'src/environments/environment';
/**
 * LLamados a Modelos y Servicios Relacionados
 *
 *
 */
import { CentroPobladosDeZonaModel } from "src/app/shared/model/CentroPobladosDeZona";

import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { CentroPobladosDeZonaService } from 'src/app/shared/services/CentroPobladosDeZona.services';



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
  selector: "app-list-CentroDeAcopio",
  templateUrl: "./list-CentroDeAcopio.component.html",
  styleUrls: ["./list-CentroDeAcopio.component.scss"],
})

/**
*   Definición de la Clase Servicios del MOdelo
*
*
*/
export class ListCentroDeAcopioComponent implements OnInit, AfterViewInit, OnDestroy {

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
  CentroDeAcopioDetail: CentroDeAcopioModel | null = null;
  CentroDeAcopioList: CentroDeAcopioModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;

  private dataArray: any;
  displayedColumns: string[] = ["id", "nombre", 'action'];
  public dataSource!: MatTableDataSource<CentroDeAcopioModel>;
  selection = new SelectionModel<CentroDeAcopioModel>(true, []);
  CentroAcopioObject: CentroDeAcopioModel = {
    id:0,
    iD_CPobladosZona:0,
    siD_CPobladosZona:  '',
    nombre:'',
    auditoria:'',

    // atributos para gestión de auditoria del objeto
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    // atributos adicionales genericos para gestión del objeto
    isValid:false,
    isSelected:false,
    completed:false,
  }
  /**
   *   Definición deL Hook Constructor
   *
   *  Es el Primer Hook que se ejecuta
   */

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    public CentroDeAcopioService: CentroDeAcopioService,
    public router: Router,private seguridadService:SeguridadService,) { }

  /**
   *   Definición deL Hook NgInit
   *
   *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
   */
  ngOnInit(): void {
    this.CentroDeAcopioService.getCentroDeAcopioList().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<CentroDeAcopioModel>(this.dataArray);
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

  /**
   *   Definición deL Hook ngOnDestroy
   *
   *  Este método se ejecutará justo antes de que Angular destruya los componentes. Es muy útil para darse de baja de los observables y desconectar los event handlers para evitar memory leaks o fugas de memoria
   */
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  /**
   *   Definición deL Hook ngAfterViewInit
   *
   *  Se ejecuta cuando la vista del componente se ha inicializado por completo. Este método se inicializa después de que Angular ha inicializado la vista del componente y las vistas secundarias
   */
  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogCentroDeAcopioContent, {
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



  addRowData(row_obj: CentroDeAcopioModel): void {
    this.CentroAcopioObject.nombre=row_obj.nombre
    this.CentroDeAcopioService.addCentroDeAcopio(this.CentroAcopioObject).subscribe(
      (response) => {
        console.log('Registro creado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo insertar: ' + err);
      }
    );
  }


  updateRowData(row_obj: CentroDeAcopioModel): boolean | any {
    this.CentroDeAcopioService.updateCentroDeAcopio(row_obj).subscribe(
      (response) => {
        console.log('Registro actualizado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se pudo actualizar: ' + err);
      }
    );
  }


  deleteRowData(row_obj: CentroDeAcopioModel): boolean | any {
    const ideliminar = row_obj.id;
    const nombre = row_obj.nombre;
    this.CentroAcopioObject.nombre=row_obj.nombre
    this.CentroDeAcopioService.deleteCentroDeAcopio(ideliminar,nombre).subscribe(
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
  irZonas(row: CentroDeAcopioModel){
    this.router.navigate(['ZonasEtc'],{ queryParams: {id:row.id} })
  }
  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);

  }
}



/**
 * @Component() Del Dialog o Popup es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */


@Component({
  selector: 'dialog-content',
  templateUrl: 'list-CentroDeAcopio.dialog.component.html',
  styleUrls: ["./list-CentroDeAcopio.dialog.component.scss"],
})


/**
*   Definición de la Clase Dialog
*
*
*/
export class DialogCentroDeAcopioContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales
  CentroPobladosDeZonaList: CentroPobladosDeZonaModel[];



  constructor(public dialogRef: MatDialogRef<DialogCentroDeAcopioContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CentroDeAcopioModel,
    private fb: FormBuilder, private centroPobladosDeZonaService: CentroPobladosDeZonaService, private ngZone: NgZone,

  ) {
    this.centroPobladosDeZonaService.getCentroPobladosDeZonaList().subscribe(
      (response: any) => {
        this.CentroPobladosDeZonaList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las CentroPobladosDeZona", err);
      }
    );


    this.form = this.fb.group({
      id: [data.id],
      iD_CPobladosZona: [data.iD_CPobladosZona],
      nombre: [data.nombre, Validators.required],
      auditoria: [''],
    });




    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ event: this.action, data: this.form.value });
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
