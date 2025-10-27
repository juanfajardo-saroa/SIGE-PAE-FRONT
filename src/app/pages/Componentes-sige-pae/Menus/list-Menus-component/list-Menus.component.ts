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
import { MenusModel } from "src/app/shared/model/Menus";
import { MenusService } from "src/app/shared/services/Menus.services";
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
import { ETCModel } from "src/app/shared/model/ETC";
import { ETCService } from "src/app/shared/services/ETC.services";
import { TiposMenuModel } from "src/app/shared/model/TiposMenu";
import { TiposMenuService } from "src/app/shared/services/TiposMenu.services";
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
    selector: "app-list-Menus",
    templateUrl: "./list-Menus.component.html",
    styleUrls: ["./list-Menus.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class ListMenusComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    MenusDetail : MenusModel | null=null;
    MenusList : MenusModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","iD_TipoMenu","siD_TipoMenu","iD_TipoComplemento","siD_TipoComplemento","iD_ETC","siD_ETC","totalCostoMenu","costoTransporte","costoAlimentos","auditoria", 'action'];
    public dataSource!: MatTableDataSource<MenusModel>;
    selection = new SelectionModel<MenusModel >(true, []);

     /**
      *   Definición deL Hook Constructor
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public MenusService: MenusService) { }

     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.MenusService.getMenusList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<MenusModel>(this.dataArray);
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
          const dialogRef = this.dialog.open(DialogMenusContent, {
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



      addRowData(row_obj: MenusModel ): void {
          this.MenusService.addMenus(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );
      }


      updateRowData(row_obj: MenusModel ): boolean | any {
          this.MenusService.updateMenus(row_obj).subscribe(
              (response) => {
                  console.log('Registro actualizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }


      deleteRowData(row_obj: MenusModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.MenusService.deleteMenus(ideliminar).subscribe(
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
    templateUrl: 'list-Menus.dialog.component.html',
    styleUrls: ["./list-Menus.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog
 *
 *
 */
export class DialogMenusContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    ETCList: ETCModel[];
TiposMenuList: TiposMenuModel[];
TiposRacionList: TiposComplementoModel[];



    constructor(public dialogRef: MatDialogRef<DialogMenusContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: MenusModel,
        private fb:FormBuilder
        , private eTCService:ETCService
, private tiposMenuService:TiposMenuService
, private TiposComplementoService:TiposComplementoService

        ) {

        this.eTCService.getETCList().subscribe(
    (response:any) => {
        this.ETCList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las ETC", err);
    }
 );
this.tiposMenuService.getTiposMenuList().subscribe(
    (response:any) => {
        this.TiposMenuList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las TiposMenu", err);
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
iD_TipoMenu:[data.iD_TipoMenu,Validators.required],
iD_TipoComplemento:[data.iD_TipoComplemento,Validators.required],
iD_ETC:[data.iD_ETC,Validators.required],
totalCostoMenu:[data.totalCostoMenu,Validators.required],
costoTransporte:[data.costoTransporte,Validators.required],
costoAlimentos:[data.costoAlimentos,Validators.required],
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
