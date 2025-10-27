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
import { SedesBeneficiariasModel } from "src/app/shared/model/SedesBeneficiarias";
import { SedesBeneficiariasService } from "src/app/shared/services/SedesBeneficiarias.services";
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

import { SedesModel } from "src/app/shared/model/Sedes"; 
import { SedesService } from "src/app/shared/services/Sedes.services"; 



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances ` 
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-SedesBeneficiarias",
    templateUrl: "./list-SedesBeneficiarias.component.html",
    styleUrls: ["./list-SedesBeneficiarias.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *  
 */
export class ListSedesBeneficiariasComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    SedesBeneficiariasDetail : SedesBeneficiariasModel | null=null;
    SedesBeneficiariasList : SedesBeneficiariasModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","iD_sede","siD_sede","iD_DetalleSumRacion","siD_DetalleSumRacion","auditoria", 'action'];
    public dataSource!: MatTableDataSource<SedesBeneficiariasModel>;
    selection = new SelectionModel<SedesBeneficiariasModel >(true, []);

     /**
      *   Definición deL Hook Constructor 
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public SedesBeneficiariasService: SedesBeneficiariasService) { }
 
     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.SedesBeneficiariasService.getSedesBeneficiariasList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<SedesBeneficiariasModel>(this.dataArray);
              this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort;
            },
            (err) => {
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
          const dialogRef = this.dialog.open(DialogSedesBeneficiariasContent, {
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


      
      addRowData(row_obj: SedesBeneficiariasModel ): void {
          this.SedesBeneficiariasService.addSedesBeneficiarias(row_obj).subscribe(
              (response) => {
                  this.ngOnInit();
                },
              (err) => {
              }
            );    
      }


      updateRowData(row_obj: SedesBeneficiariasModel ): boolean | any {
          this.SedesBeneficiariasService.updateSedesBeneficiarias(row_obj).subscribe(
              (response) => {
                  this.ngOnInit();
                },
              (err) => {
              }
            );
      }
  
  
      deleteRowData(row_obj: SedesBeneficiariasModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.SedesBeneficiariasService.deleteSedesBeneficiarias(ideliminar).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (err) => {
                
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
    templateUrl: 'list-SedesBeneficiarias.dialog.component.html',
    styleUrls: ["./list-SedesBeneficiarias.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog 
 *
 *  
 */
export class DialogSedesBeneficiariasContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    //DetallesSumRacionesList: DetallesSumRacionesModel[];
SedesList: SedesModel[];



    constructor(public dialogRef: MatDialogRef<DialogSedesBeneficiariasContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: SedesBeneficiariasModel,
        private fb:FormBuilder, 
        //private detallesSumRacionesService:DetallesSumRacionesService,
 private sedesService:SedesService

        ) {
   
     /*    this.detallesSumRacionesService.getDetallesSumRacionesList().subscribe(
    (response:any) => {
        this.DetallesSumRacionesList = response;
    },
    (err)=>{
    }
 ); */
this.sedesService.getSedesList().subscribe(
    (response:any) => {
        this.SedesList = response;
    },
    (err)=>{
    }
 );


        this.form = this.fb.group({
id:[data.id],
iD_sede:[data.iD_sede],
iD_DetalleSumRacion:[data.iD_DetalleSumRacion,Validators.required],
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
