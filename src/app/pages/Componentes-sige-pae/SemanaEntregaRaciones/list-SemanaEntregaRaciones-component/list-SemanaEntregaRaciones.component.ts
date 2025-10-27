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
import { SemanaEntregaComplementosModel } from 'src/app/shared/model/SemanaEntregaComplementos';

import { SemanaEntregaComplementosService } from 'src/app/shared/services/SemanaEntregaComplementos.services';
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
import { ContratosModel } from "src/app/shared/model/Contratos";
import { ContratosService } from "src/app/shared/services/Contratos.services";
import { EstadoSemanaModel } from "src/app/shared/model/EstadoSemana";
import { EstadoSemanaService } from "src/app/shared/services/EstadoSemana.services";
import { GradosSedesJornadasModel } from "src/app/shared/model/GradosSedesJornadas";
import { GradosSedesJornadasService } from "src/app/shared/services/GradosSedesJornadas.services";



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-SemanaEntregaRaciones",
    templateUrl: "./list-SemanaEntregaRaciones.component.html",
    styleUrls: ["./list-SemanaEntregaRaciones.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class ListSemanaEntregaRacionesComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    SemanaEntregaRacionesDetail : SemanaEntregaComplementosModel | null=null;
    SemanaEntregaRacionesList : SemanaEntregaComplementosModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","iD_EstadoSemana","siD_EstadoSemana","iD_Contrato","siD_Contrato","iD_GradoSedeJornada","siD_GradoSedeJornada","auditoria","pathReporteSemanal","fechaCarga", 'action'];
    public dataSource!: MatTableDataSource<SemanaEntregaComplementosModel>;
    selection = new SelectionModel<SemanaEntregaComplementosModel >(true, []);

     /**
      *   Definición deL Hook Constructor
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public SemanaEntregaRacionesService: SemanaEntregaComplementosService) { }

     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.SemanaEntregaRacionesService.getSemanaEntregaComplementosList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<SemanaEntregaComplementosModel>(this.dataArray);
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
          const dialogRef = this.dialog.open(DialogSemanaEntregaComplementosContent, {
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



      addRowData(row_obj: SemanaEntregaComplementosModel ): void {
          this.SemanaEntregaRacionesService.addSemanaEntregaComplementos(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );
      }


      updateRowData(row_obj: SemanaEntregaComplementosModel ): boolean | any {
          this.SemanaEntregaRacionesService.updateSemanaEntregaComplementos(row_obj).subscribe(
              (response) => {
                  console.log('Registro acutalizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }


      deleteRowData(row_obj: SemanaEntregaComplementosModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.SemanaEntregaRacionesService.deleteSemanaEntregaComplementos(ideliminar).subscribe(
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
    templateUrl: 'list-SemanaEntregaRaciones.dialog.component.html',
    styleUrls: ["./list-SemanaEntregaRaciones.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog
 *
 *
 */
export class DialogSemanaEntregaComplementosContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    ContratosList: ContratosModel[];
EstadoSemanaList: EstadoSemanaModel[];
GradosSedesJornadasList: GradosSedesJornadasModel[];



    constructor(public dialogRef: MatDialogRef<DialogSemanaEntregaComplementosContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: SemanaEntregaComplementosModel,
        private fb:FormBuilder
        , private contratosService:ContratosService
, private estadoSemanaService:EstadoSemanaService
, private gradosSedesJornadasService:GradosSedesJornadasService

        ) {

        this.contratosService.getContratosList().subscribe(
    (response:any) => {
        this.ContratosList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Contratos", err);
    }
 );
this.estadoSemanaService.getEstadoSemanaList().subscribe(
    (response:any) => {
        this.EstadoSemanaList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las EstadoSemana", err);
    }
 );
this.gradosSedesJornadasService.getGradosSedesJornadasList().subscribe(
    (response:any) => {
        this.GradosSedesJornadasList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las GradosSedesJornadas", err);
    }
 );


        this.form = this.fb.group({
id:[data.id],
iD_EstadoSemana:[data.iD_EstadoSemana,Validators.required],
iD_Contrato:[data.iD_Contrato,Validators.required],
iD_GradoSedeJornada:[data.iD_GradoSedeJornada,Validators.required],
auditoria:[''],
pathReporteSemanal:[data.pathReporteSemanal],
fechaCarga:[data.fechaCarga],
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
