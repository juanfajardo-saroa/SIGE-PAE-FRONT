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
import { CiclosMenusModel } from "src/app/shared/model/CiclosMenus";
import { CiclosMenusService } from "src/app/shared/services/CiclosMenus.services";
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
import { MenuModel } from "src/app/shared/model/Menu";
import { MenuService } from "src/app/shared/services/Menu.services";
import { MinutaPatronAlimentosModel } from "src/app/shared/model/MinutaPatronAlimentos";
import { MinutaPatronAlimentosService } from "src/app/shared/services/MinutaPatronAlimentos.services";
import { TiposComplementoModel } from "src/app/shared/model/TiposComplemento";
import { TiposComplementoService } from "src/app/shared/services/TiposComplemento.services";
import { TiposModalidadComplementoModel } from "src/app/shared/model/TiposModalidadComplemento";
import { TiposModalidadComplementoService } from "src/app/shared/services/TiposModalidadComplemento.services";
import { TiposModeloOperacionModel } from "src/app/shared/model/TiposModeloOperacion";
import { TiposModeloOperacionService } from "src/app/shared/services/TiposModeloOperacion.services";
import { ZonasModel } from "src/app/shared/model/Zonas";
import { ZonasService } from "src/app/shared/services/Zonas.services";



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-CiclosMenus",
    templateUrl: "./list-CiclosMenus.component.html",
    styleUrls: ["./list-CiclosMenus.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class ListCiclosMenusComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    CiclosMenusDetail : CiclosMenusModel | null=null;
    CiclosMenusList : CiclosMenusModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"id","iD_Menu","siD_Menu","iD_TipoModeloOperacion","siD_TipoModeloOperacion","iD_TipoComplemento","siD_TipoComplemento","iD_TipoModalidadComplemento","siD_TipoModalidadComplemento","iD_MinutaPatronAlimento","siD_MinutaPatronAlimento","iD_TipoNivelEducativo","iD_EstadoRegistro","iD_Zona","siD_Zona","nombre","menuReferencia","iD_CiclosMenuReferencia","menusParaTodosNiveles","menusParaTodasZonas","cantidadMenus","auditoria", 'action'];
    public dataSource!: MatTableDataSource<CiclosMenusModel>;
    selection = new SelectionModel<CiclosMenusModel >(true, []);

     /**
      *   Definición deL Hook Constructor
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(public dialog: MatDialog,  private route : ActivatedRoute, public CiclosMenusService: CiclosMenusService) { }

     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.CiclosMenusService.getCiclosMenusList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<CiclosMenusModel>(this.dataArray);
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
          const dialogRef = this.dialog.open(DialogCiclosMenusContent, {
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



      addRowData(row_obj: CiclosMenusModel ): void {
          this.CiclosMenusService.addCiclosMenus(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );
      }


      updateRowData(row_obj: CiclosMenusModel ): boolean | any {
          this.CiclosMenusService.updateCiclosMenus(row_obj).subscribe(
              (response) => {
                  console.log('Registro acutalizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }


      deleteRowData(row_obj: CiclosMenusModel ): boolean | any {
          const ideliminar= row_obj.id;
          this.CiclosMenusService.deleteCiclosMenus(ideliminar).subscribe(
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
    templateUrl: 'list-CiclosMenus.dialog.component.html',
    styleUrls: ["./list-CiclosMenus.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog
 *
 *
 */
export class DialogCiclosMenusContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    MenuList: MenuModel[];
MinutaPatronAlimentosList: MinutaPatronAlimentosModel[];
TiposRacionList: TiposComplementoModel[];
TiposModalidadRacionList: TiposModalidadComplementoModel[];
TiposModeloOperacionList: TiposModeloOperacionModel[];
ZonasList: ZonasModel[];



    constructor(public dialogRef: MatDialogRef<DialogCiclosMenusContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: CiclosMenusModel,
        private fb:FormBuilder
        , private menuService:MenuService
, private minutaPatronAlimentosService:MinutaPatronAlimentosService
, private TiposComplementoService:TiposComplementoService
, private TiposModalidadComplementoService:TiposModalidadComplementoService
, private tiposModeloOperacionService:TiposModeloOperacionService
, private zonasService:ZonasService

        ) {

        this.menuService.getMenuList().subscribe(
    (response:any) => {
        this.MenuList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Menu", err);
    }
 );
this.minutaPatronAlimentosService.getMinutaPatronAlimentosList().subscribe(
    (response:any) => {
        this.MinutaPatronAlimentosList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las MinutaPatronAlimentos", err);
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
this.TiposModalidadComplementoService.getTiposModalidadComplementoList().subscribe(
    (response:any) => {
        this.TiposModalidadRacionList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las TiposModalidadRacion", err);
    }
 );
this.tiposModeloOperacionService.getTiposModeloOperacionList().subscribe(
    (response:any) => {
        this.TiposModeloOperacionList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las TiposModeloOperacion", err);
    }
 );
this.zonasService.getZonasList().subscribe(
    (response:any) => {
        this.ZonasList = response;
    },
    (err)=>{
        console.log("Error al cargar los registros del selected de las Zonas", err);
    }
 );


        this.form = this.fb.group({
id:[data.id],
//iD_Menu:[data.iD_Menu],
iD_TipoModeloOperacion:[data.iD_TipoModeloOperacion],
iD_TipoComplemento:[data.iD_TipoComplemento],
iD_TipoModalidadComplemento:[data.iD_TipoModalidadComplemento],
iD_MinutaPatronAlimento:[data.iD_MinutaAprobacion],
iD_TipoNivelEducativo:[data.iD_TipoNivelEducativo],
iD_EstadoRegistro:[data.iD_EstadoRegistro],
iD_Zona:[data.iD_Zona],
nombre:[data.nombre],
menuReferencia:[data.menuReferencia],
iD_CiclosMenuReferencia:[data.iD_CiclosMenuReferencia],
menusParaTodosNiveles:[data.menusParaTodosNiveles],
menusParaTodasZonas:[data.menusParaTodasZonas],
cantidadMenus:[data.cantidadMenus],
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
