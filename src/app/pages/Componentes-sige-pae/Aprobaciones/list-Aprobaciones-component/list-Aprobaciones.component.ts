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
import { AprobacionesModel } from "src/app/shared/model/Aprobaciones";
import { AprobacionesService } from "src/app/shared/services/Aprobaciones.services";
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
import { AccionesAprobacionModel } from "src/app/shared/model/AccionesAprobacion"; 
import { AccionesAprobacionService } from "src/app/shared/services/AccionesAprobacion.services"; 
import { ETCModel } from "src/app/shared/model/ETC"; 
import { ETCService } from "src/app/shared/services/ETC.services"; 
import { SeccionesModel } from "src/app/shared/model/Secciones"; 
import { SeccionesService } from "src/app/shared/services/Secciones.services"; 
import { UbicacionesModel } from "src/app/shared/model/Ubicaciones"; 
import { UbicacionesService } from "src/app/shared/services/Ubicaciones.services"; 
import { UsersModel } from "src/app/shared/model/Users"; 
import { UsersService } from "src/app/shared/services/Users.services"; 



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances ` 
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-Aprobaciones",
    templateUrl: "./list-Aprobaciones.component.html",
    styleUrls: ["./list-Aprobaciones.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *  
 */
export class ListAprobacionesComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    AprobacionesDetail : AprobacionesModel | null=null;
    AprobacionesList : AprobacionesModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","iD_ETC","siD_ETC","iD_User","siD_User","iD_AccionAprobacion","siD_AccionAprobacion","id_Secciones","sid_Secciones","documentoParaAprobar","fechaAprobacion","fecha","accion","observaciones","id_Ubicacion","sid_Ubicacion","ubicacionOrigen","auditoria", 'action'];
    public dataSource!: MatTableDataSource<AprobacionesModel>;
    selection = new SelectionModel<AprobacionesModel >(true, []);

     /**
      *   Definición deL Hook Constructor 
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public AprobacionesService: AprobacionesService) { }
 
     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.AprobacionesService.getAprobacionesList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<AprobacionesModel>(this.dataArray);
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
          const dialogRef = this.dialog.open(DialogAprobacionesContent, {
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


      
      addRowData(row_obj: AprobacionesModel ): void {
          this.AprobacionesService.addAprobaciones(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );    
      }


      updateRowData(row_obj: AprobacionesModel ): boolean | any {
          this.AprobacionesService.updateAprobaciones(row_obj).subscribe(
              (response) => {
                  console.log('Registro actualizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }
  
  
      deleteRowData(row_obj: AprobacionesModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.AprobacionesService.deleteAprobaciones(ideliminar).subscribe(
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
    templateUrl: 'list-Aprobaciones.dialog.component.html',
    styleUrls: ["./list-Aprobaciones.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog 
 *
 *  
 */
export class DialogAprobacionesContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    AccionesAprobacionList: AccionesAprobacionModel[];
ETCList: ETCModel[];
SeccionesList: SeccionesModel[];
UbicacionesList: UbicacionesModel[];
UsersList: UsersModel[];



    constructor(public dialogRef: MatDialogRef<DialogAprobacionesContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: AprobacionesModel,
        private fb:FormBuilder 
        , private accionesAprobacionService:AccionesAprobacionService
, private eTCService:ETCService
, private seccionesService:SeccionesService
, private ubicacionesService:UbicacionesService
, private usersService:UsersService

        ) {
   
        this.accionesAprobacionService.getAccionesAprobacionList().subscribe(
    (response:any) => {
        this.AccionesAprobacionList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las AccionesAprobacion", err);
    }
 );
this.eTCService.getETCList().subscribe(
    (response:any) => {
        this.ETCList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las ETC", err);
    }
 );
this.seccionesService.getSeccionesList().subscribe(
    (response:any) => {
        this.SeccionesList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Secciones", err);
    }
 );
this.ubicacionesService.getUbicacionesList().subscribe(
    (response:any) => {
        this.UbicacionesList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Ubicaciones", err);
    }
 );
this.usersService.getUsersList().subscribe(
    (response:any) => {
        this.UsersList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Users", err);
    }
 );


        this.form = this.fb.group({
id:[data.id],
iD_ETC:[data.iD_ETC,Validators.required],
iD_User:[data.iD_User,Validators.required],
iD_AccionAprobacion:[data.iD_AccionAprobacion,Validators.required],
id_Secciones:[data.id_Secciones],
documentoParaAprobar:[data.documentoParaAprobar],
fechaAprobacion:[data.fechaAprobacion],
fecha:[data.fecha,Validators.required],
accion:[data.accion],
observaciones:[data.observaciones,Validators.required],
id_Ubicacion:[data.id_Ubicacion],
ubicacionOrigen:[data.ubicacionOrigen],
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
