/**
 * Recursos Prinicpales de Angular
 *
 *
 */
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import * as xml2js from 'xml2js';
import { NgxXml2jsonService } from 'ngx-xml2json';
// import { NgxJsonViewerModule } from 'ngx-json-viewer';
// import { AceEditorModule } from 'ng2-ace-editor';

/**
 * Recursos Adicionales de Angular para MaterialDatatable
 *
 * y Formularios Reactivos o Dinámicos
 */
import { Inject,Injectable ,Optional,ViewChild,OnDestroy,AfterViewInit,} from '@angular/core';
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
import { SeguridadELMAH_ErrorModel } from "src/app/shared/model/SeguridadELMAH_Error";
import { SeguridadELMAH_ErrorService } from "src/app/shared/services/SeguridadELMAH_Error.services";
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



/**
 * @Component() Prinicpal es un annotation, que define el componente y su metadata de la clase.tiene los siguientes datos
 * selector => es quien se encarga del "nombre" del tag del componente, pero solo vamos a poner el nombre, ya que de los tags se encarga angular.
 * template => en template, podemos poner una porcion de html directo en nuestro componente, con los apostrofes frances `
 * templateUrl => a diferencia del "template" aquí va la dirección y el archivo donde se encuentra la porcion de HTML que dara la estructura .
 * StyleUrls => se pone un array de estilos para el componente, en el caso una hoja de estilos css, que afectan a todo el componente o proyecto, estos estilos solo serán utilizados solo para el mismo.
 */
@Component({
    selector: "app-list-SeguridadELMAH_Error",
    templateUrl: "./list-SeguridadELMAH_Error.component.html",
    styleUrls: ["./list-SeguridadELMAH_Error.component.scss"],
  })

 /**
 *   Definición de la Clase Servicios del MOdelo
 *
 *
 */
export class ListSeguridadELMAH_ErrorComponent implements OnInit, AfterViewInit,OnDestroy  {

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
    SeguridadELMAH_ErrorDetail : SeguridadELMAH_ErrorModel | null=null;
    SeguridadELMAH_ErrorList : SeguridadELMAH_ErrorModel[]=[];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC =environment.nameETC;

    private dataArray: any;
    displayedColumns: string[] = ['select',"application","host","type","source","message","user","statusCode","timeUtc","sequence","allXml","data","auditoria", 'action'];
    public dataSource!: MatTableDataSource<SeguridadELMAH_ErrorModel>;
    selection = new SelectionModel<SeguridadELMAH_ErrorModel >(true, []);

     /**
      *   Definición deL Hook Constructor
      *
      *  Es el Primer Hook que se ejecuta
      */

    constructor(private ngxXml2jsonService: NgxXml2jsonService,public dialog: MatDialog,  private route : ActivatedRoute, public SeguridadELMAH_ErrorService: SeguridadELMAH_ErrorService) { }




     /**
      *   Definición deL Hook NgInit
      *
      *  Se ejecuta una vez que Angular ha desplegado los data-bound properties(variables vinculadas a datos) o cuando el componente ha sido inicializado
      */
    ngOnInit(): void {
        this.SeguridadELMAH_ErrorService.getSeguridadELMAH_ErrorList().subscribe(
            (response: any) => {
              this.dataArray = response;
              this.isLoading = false;
              this.dataSource = new MatTableDataSource<SeguridadELMAH_ErrorModel>(this.dataArray);
              this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort;
              console.log('datos',this.dataArray)
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
          const dialogRef = this.dialog.open(DialogSeguridadELMAH_ErrorContent, {
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



      addRowData(row_obj: SeguridadELMAH_ErrorModel ): void {
          this.SeguridadELMAH_ErrorService.addSeguridadELMAH_Error(row_obj).subscribe(
              (response) => {
                  console.log('Registro creado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo insertar: '+err);
              }
            );
      }


      updateRowData(row_obj: SeguridadELMAH_ErrorModel ): boolean | any {
          this.SeguridadELMAH_ErrorService.updateSeguridadELMAH_Error(row_obj).subscribe(
              (response) => {
                  console.log('Registro acutalizado satisfactoriamente');
                  this.ngOnInit();
                },
              (err) => {
                console.log('No se pudo actualizar: '+err);
              }
            );
      }


      deleteRowData(row_obj: SeguridadELMAH_ErrorModel ): boolean | any {
          const ideliminar= row_obj.errorid;
          this.SeguridadELMAH_ErrorService.deleteSeguridadELMAH_Error(ideliminar).subscribe(
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


    jsonvisor(data:string) {
      return JSON.stringify(data, null, 2);

    }

    jsonvisorparse(data:string) {
      return JSON.parse(data);
    }

    xmltojson(data:string) {
      //var obj1 = require('xml2js').parse(data); console.log('obj1',obj1);
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      console.log('obj1',obj);
      return obj;

    }

  //   parseXml(xmlStr) {
  //     var result;
  //     var parser = require('xml2js');
  //     parser.Parser().parseString(xmlStr, (e, r) => {result = r});
  //     return result;
  // }


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
    templateUrl: 'list-SeguridadELMAH_Error.dialog.component.html',
    styleUrls: ["./list-SeguridadELMAH_Error.dialog.component.scss"],
})


 /**
 *   Definición de la Clase Dialog
 *
 *
 */
export class DialogSeguridadELMAH_ErrorContent {
    action: string;
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;
    datosjson:string;

    // Listas relacionales



    constructor(private ngxXml2jsonService: NgxXml2jsonService,public dialogRef: MatDialogRef<DialogSeguridadELMAH_ErrorContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: SeguridadELMAH_ErrorModel,
        private fb:FormBuilder

        ) {

          this.datosjson=data.allXml;

data.data=data.allXml;
console.log('ingreso',data)
        this.form = this.fb.group({
application:[data.application,Validators.required],
host:[data.host,Validators.required],
type:[data.type,Validators.required],
source:[data.source,Validators.required],
message:[data.message,Validators.required],
user:[data.user,Validators.required],
statusCode:[data.statusCode,Validators.required],
timeUtc:[data.timeUtc,Validators.required],
sequence:[data.sequence,Validators.required],
allXml:[data.allXml,Validators.required],
data:[data.data],
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


    xmltojson(data:string) {
     console.log('obj0 data',data);
      //var obj1 = require('xml2js').parse(data); console.log('obj1',obj1);
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
    //  console.log('obj0 xml',xml);
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
    //  console.log('obj2 ',obj);
      var serializedJson = JSON.stringify(obj);
    //  console.log('obj2 string ',serializedJson);
      return serializedJson;

    }
}
