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
import { RepositoriosModel } from "src/app/shared/model/Repositorios";
import { RepositoriosService } from "src/app/shared/services/Repositorios.services";
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
import { CategoriasModel } from "src/app/shared/model/Categorias"; 
import { CategoriasService } from "src/app/shared/services/Categorias.services"; 
import { TipoArchivoModel } from "src/app/shared/model/TipoArchivo"; 
import { TipoArchivoService } from "src/app/shared/services/TipoArchivo.services"; 
import { VigenciasModel } from "src/app/shared/model/Vigencias"; 
import { VigenciasService } from "src/app/shared/services/Vigencias.services"; 



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances ` 
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-Repositorios",
    templateUrl: "./list-Repositorios.component.html",
    styleUrls: ["./list-Repositorios.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *  
 */
export class ListRepositoriosComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    RepositoriosDetail : RepositoriosModel | null=null;
    RepositoriosList : RepositoriosModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","idTipoArchivo","sidTipoArchivo","idCategoria","sidCategoria","idVigencia","sidVigencia","pAHTArchivo","nombre","descripcion","auditoria","fechaArchivo","fechaCarga", 'action'];
    public dataSource!: MatTableDataSource<RepositoriosModel>;
    selection = new SelectionModel<RepositoriosModel >(true, []);

     /**
      *   Definición deL Hook Constructor 
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public RepositoriosService: RepositoriosService) { }
 
     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.RepositoriosService.getRepositoriosList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<RepositoriosModel>(this.dataArray);
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
          const dialogRef = this.dialog.open(DialogRepositoriosContent, {
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


      
      addRowData(row_obj: RepositoriosModel ): void {
          this.RepositoriosService.addRepositorios(row_obj).subscribe(
              (response) => {
                  this.ngOnInit();
                },
              (err) => {
              }
            );    
      }


      updateRowData(row_obj: RepositoriosModel ): boolean | any {
          this.RepositoriosService.updateRepositorios(row_obj).subscribe(
              (response) => {
                  this.ngOnInit();
                },
              (err) => {
              }
            );
      }
  
  
      deleteRowData(row_obj: RepositoriosModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.RepositoriosService.deleteRepositorios(ideliminar,row_obj.pahtArchivo,row_obj.nombreResolucion).subscribe(
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
    templateUrl: 'list-Repositorios.dialog.component.html',
    styleUrls: ["./list-Repositorios.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog 
 *
 *  
 */
export class DialogRepositoriosContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    CategoriasList: CategoriasModel[];
TipoArchivoList: TipoArchivoModel[];
VigenciasList: VigenciasModel[];



    constructor(public dialogRef: MatDialogRef<DialogRepositoriosContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: RepositoriosModel,
        private fb:FormBuilder 
        , private categoriasService:CategoriasService
, private tipoArchivoService:TipoArchivoService
, private vigenciasService:VigenciasService

        ) {
   
        this.categoriasService.getCategoriasList().subscribe(
    (response:any) => {
        this.CategoriasList = response;
    },
    (err)=>{
    }
 );
this.tipoArchivoService.getTipoArchivoList().subscribe(
    (response:any) => {
        this.TipoArchivoList = response;
    },
    (err)=>{
    }
 );
this.vigenciasService.getVigenciasList().subscribe(
    (response:any) => {
        this.VigenciasList = response;
    },
    (err)=>{
    }
 );


        this.form = this.fb.group({
id:[data.id],
idTipoArchivo:[data.idTipoArchivo,Validators.required],
idCategoria:[data.idCategoria,Validators.required],
idVigencia:[data.idVigencia,Validators.required],
pAHTArchivo:[data.pahtArchivo,Validators.required],
nombre:[data.nombre],
descripcion:[data.descripcion],
auditoria:[''],
fechaArchivo:[data.fechaArchivo,Validators.required],
fechaCarga:[data.fechaCarga,Validators.required],
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
