/**
 * Recursos Prinicpales de Angular
 *
 *
 */
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
/**
 * Recursos Adicionales de Angular para MaterialDatatable
 *
 * y Formularios Reactivos o Dinámicos
 */
import { Inject,Optional,ViewChild,OnDestroy,AfterViewInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * LLamados de Modelos y Servicios que son Requeridos para el Componente
 *
 *
 */
import { PreparacionComplementosModel } from "src/app/shared/model/PreparacionComplementos";
import { PreparacionComplementosService } from "src/app/shared/services/PreparacionComplementos.services";
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
import { PreparacionesModel } from "src/app/shared/model/Preparaciones";
import { PreparacionesService } from "src/app/shared/services/Preparaciones.services";
import { TiposComplementoModel } from "src/app/shared/model/TiposComplemento";
import { TiposComplementoService } from "src/app/shared/services/TiposComplemento.services";



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-PreparacionComplementos",
    templateUrl: "./list-PreparacionComplementos.component.html",
    styleUrls: ["./list-PreparacionComplementos.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class ListPreparacionComplementosComponent implements OnInit, AfterViewInit,OnDestroy  {

    private subs = new Subscription();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort) sort: MatSort = Object.create(null);

    searchText: any;
    totalCount = -1;
    Closed = -1;
    Inprogress = -1;
    Open = -1;
    isLoading = true;
    checked=false;
    gridVisible:boolean = true;
    formVisible:boolean = false;
    dialogVisible:boolean = false;
    PreparacionComplementosDetail : PreparacionComplementosModel | null=null;
    PreparacionComplementosList : PreparacionComplementosModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","sid","iD_TipoComplemento","siD_TipoComplemento","auditoria", 'action'];
    public dataSource!: MatTableDataSource<PreparacionComplementosModel>;
    selection = new SelectionModel<PreparacionComplementosModel >(true, []);

     /**
      *   Definición deL Hook Constructor
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public PreparacionComplementosService: PreparacionComplementosService) { }

     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.PreparacionComplementosService.getPreparacionComplementosList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<PreparacionComplementosModel>(this.dataArray);
              this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort;
            },
            (err) => {
              console.log("-----> error en cargar los registros", err);
              this.isLoading = false;
            }
          );
          this.paginator._intl.itemsPerPageLabel="Registros por página";
          this.paginator._intl.nextPageLabel="Siguiente";
          this.paginator._intl.previousPageLabel="Anterior";
          this.paginator._intl.firstPageLabel="Primero";
          this.paginator._intl.lastPageLabel="Último";
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
          const dialogRef = this.dialog.open(DialogPreparacionComplementosContent, {
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



      addRowData(row_obj: PreparacionComplementosModel ): void {
          this.PreparacionComplementosService.addPreparacionComplementos(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );
      }


      updateRowData(row_obj: PreparacionComplementosModel ): boolean | any {
          this.PreparacionComplementosService.updatePreparacionComplementos(row_obj).subscribe(
              (response) => {
                  console.log('Registro acutalizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }


      deleteRowData(row_obj: PreparacionComplementosModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.PreparacionComplementosService.deletePreparacionComplementos(ideliminar).subscribe(
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



/**
 * @Component() Del Dialog o Popup es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */


@Component({
    selector: 'dialog-content',
    templateUrl: 'list-PreparacionComplementos.dialog.component.html',
    styleUrls: ["./list-PreparacionComplementos.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog
 *
 *
 */
export class DialogPreparacionComplementosContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    PreparacionesList: PreparacionesModel[];
TiposRacionList: TiposComplementoModel[];



    constructor(public dialogRef: MatDialogRef<DialogPreparacionComplementosContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: PreparacionComplementosModel,
        private fb:FormBuilder
        , private preparacionesService:PreparacionesService
, private TiposComplementoService:TiposComplementoService

        ) {

        this.preparacionesService.getPreparacionesList().subscribe(
    (response:any) => {
        this.PreparacionesList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Preparaciones", err);
    }
 );
this.TiposComplementoService.getTiposComplementoList().subscribe(
    (response:any) => {
        this.TiposRacionList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las TiposRacion", err);
    }
 );


        this.form = this.fb.group({
id:[data.id],
iD_TipoComplemento:[data.iD_TipoComplemento],
auditoria:[''],
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
