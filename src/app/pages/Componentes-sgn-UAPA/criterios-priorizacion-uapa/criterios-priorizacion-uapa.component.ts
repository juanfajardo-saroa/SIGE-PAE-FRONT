import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { CriteriosPriorizacionModel } from './CriteriosPriorizacion';
import { CriteriosPriorizacionService } from './CriteriosPriorizacion.services';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-criterios-priorizacion-uapa',
  templateUrl: './criterios-priorizacion-uapa.component.html',
  styleUrls: ['./criterios-priorizacion-uapa.component.scss']
})
export class CriteriosPriorizacionUapaComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  private dataArray: any;
  private dataT:any
  public dataSource!: MatTableDataSource<CriteriosPriorizacionModel>;
  //Columnas que se van a manejar en la mat-table
  columnNames = ['nombre', 'activo'];

  //Determina si el formulario esta en modo de edición.
  esEdicion: boolean = false;
  isLoading = true;

  //Listado de los criterios de priorización
  criterios: CriteriosPriorizacionModel[] | undefined;

  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;

  //Arreglo con los criterios modificados
  criteriosModificados: Array<CriteriosPriorizacionModel> = [];
  public nombreUbicacion = 'UApA | Criterios de priorización';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();

  public dataArrayInterno: any;
  
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  constructor(private servicio: CriteriosPriorizacionService, private seguridadService: SeguridadService,
    private messageService: MessageService, private servicioCriterios: CriteriosPriorizacionService, public dialog: MatDialog, private router: Router,
    public VigenciasServicio: VigenciasService) {

  }

  ngOnInit(): void {
    /* this.getCriterios().subscribe(criterios => this.criterios = criterios); */
    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArraySelectVig = response.filter(items => items.id == Number(localStorage.getItem('VigSeleccionada')));
        this.nombreVigAnoSeleccionada = this.dataArraySelectVig[0].nombre;
        this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);


      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.fillTable();
  }
  fillTable() {
    this.servicioCriterios.getCriteriosPriorizacionList().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.dataArray.map(function (dato) {

          dato.ModificadoEstado = false;

          return dato;
        });
        this.isLoading = true;
        
        this.dataArray.sort((firstItem, secondItem) => firstItem.prioridad - secondItem.prioridad);
       this.dataT=response;
       this.dataT.sort((firstItem, secondItem) => firstItem.prioridad - secondItem.prioridad);
        this.dataSource = new MatTableDataSource<CriteriosPriorizacionModel>(this.dataArray);
       /*  this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        }; */
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  dropTable(event: any) {
    
    if(this.esEdicion) {
      const prevIndex = this.dataArray.findIndex((d) => d === event.item.data);
      moveItemInArray(this.dataArray, prevIndex, event.currentIndex);
      
      this.updatePrioridad();
      this.table.renderRows();
    }
  }

  updatePrioridad() {
    this.dataArray.forEach((element, index) => {
      this.servicioCriterios.getCriteriosPriorizacion(element.id).subscribe(
        (response) => {
          
          response.prioridad = index + 1;
          this.servicioCriterios.updateCriteriosPriorizacion(response).subscribe(
            (response) => {
              this.fillTable();
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    })
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  /**
   * Activa el modo de edición de los criterios de priorización.
   */
  onEditar() {
    this.esEdicion = true;
  }

  /**
   * Guarda los cambios realizados en el activo de los criterios de priorización
   */
  onGuardar() {
    if (this.criteriosModificados.length == 0) {
      this.messageService.showInfo("No hay cambios en los criterios de priorización", 'top center')
    }
    else {

      this.criteriosModificados.forEach(
        c => {

          let criterio = this.copiarModelo(c);


          this.servicio.updateCriteriosPriorizacion(criterio).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (err) => {
            });
        }
      )

      //alert(`Se van a guardar ${this.criteriosModificados.length} cambios`);
      this.criteriosModificados.length = 0;
    }

    //alert("Se guardaron los cambios");


    this.esEdicion = false;
  }


  /**
   * Permite copiar un modelo para realizar la actualización
   * @param c modelo de criterio de priorización
   * @returns copia del modelo unicamente con la informaicón que se va a actualizar
   */
  private copiarModelo(c: CriteriosPriorizacionModel) {
    return new CriteriosPriorizacionModel(
      c.id,
      c.prioridad,
      c.nombre,
      c.activo,
      "",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  /**
   * Permite capturar el evento de cambio del checkbox
   * @param event evento de cambio del checkbox
   */
  selectionChange(event: MatCheckboxChange): void {

    let id = +event.source.value;

    //se busca en elemento  en el arreglo
    let criterio = this.criterios.find(c => c.id == id);

    if (criterio) {
      criterio.activo = event.checked;

      if (!this.criteriosModificados.includes(criterio))
        this.criteriosModificados.push(criterio);
    }

  }
  onnombreCriterio($event: any, item: any): void {

    this.dataArray.map(function (dato) {
      if (dato.id == item.id) {
        dato.nombre = $event
      }

      return dato;
    });

    this.dataSource = new MatTableDataSource<CriteriosPriorizacionModel>(this.dataArray);

  }

  Eliminar(item: any): void {


    for (let i = item.prioridad + 1; i <= this.dataArray[this.dataArray.length - 1].prioridad; i++) {
      this.servicioCriterios.getCriteriosPriorizacion(this.dataArray.find(element => element.prioridad == i).id).subscribe(
        (response) => {
          response.prioridad--;
          this.servicioCriterios.updateCriteriosPriorizacion(response).subscribe(
            (response) => {
              if (i == this.dataArray[this.dataArray.length - 1].prioridad) {
                this.fillTable();
              }
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    }

    this.servicioCriterios.deleteCriteriosPriorizacion(item.id, item.nombre).subscribe(
      (response: any) => {
        this.ngOnInit();
      },
      (err) => {

        this.isLoading = false;
      }
    )
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogCriteriosPriorizacionUapaContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: CriteriosPriorizacionModel): void {
    for (let i = row_obj.prioridad; i <= this.dataArray[this.dataArray.length - 1].prioridad; i++) {
      this.servicioCriterios.getCriteriosPriorizacion(this.dataArray.find(element => element.prioridad == i).id).subscribe(
        (response) => {
          response.prioridad++;
          this.servicioCriterios.updateCriteriosPriorizacion(response).subscribe(
            (response) => {
              if (i == this.dataArray[this.dataArray.length - 1].prioridad) {
                this.fillTable();
              }
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    }

    this.servicioCriterios.addCriteriosPriorizacion(row_obj).subscribe(
      (response) => {
        this.fillTable();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: CriteriosPriorizacionModel): boolean | any {
    this.servicioCriterios.updateCriteriosPriorizacion(row_obj).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: CriteriosPriorizacionModel): boolean | any {
    for (let i = row_obj.prioridad; i <= this.dataArray[this.dataArray.length - 1].prioridad; i++) {
      this.servicioCriterios.getCriteriosPriorizacion(this.dataArray.find(element => element.prioridad == i).id).subscribe(
        (response) => {
          response.prioridad--;
          this.servicioCriterios.updateCriteriosPriorizacion(response).subscribe(
            (response) => {
              if (i == this.dataArray[this.dataArray.length - 1].prioridad) {
                this.fillTable();
              }
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    }

    const ideliminar = row_obj.id;
    const nombre = row_obj.nombre;
    this.servicioCriterios.deleteCriteriosPriorizacion(ideliminar, nombre).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
          
      }
    );

  }

  /**
   * Obtiene el listado de criterios del servicio en un formato de arreglo
   * @returns arreglo del modelo
   */
  getCriterios(): Observable<Array<CriteriosPriorizacionModel>> {

    return this.servicio.getCriteriosPriorizacionListFull().pipe(
      map((result: any) => this.mapResultToModel(result))
    );
  }

  /**
   * Mapea el resultado dado por el API en un arreglo.
   * @param result  es el arreglo dado por el servicio
   * @returns Un arreglo con el modelo ordenado por la prioridad
   */
  mapResultToModel(result: CriteriosPriorizacionModel[]): any {

    var arreglo: Array<CriteriosPriorizacionModel> = [];
    result.forEach((item) =>
      arreglo.push(item)
    );

    //Ahroa se ordenan

    arreglo.sort((c1, c2) => c1.prioridad - c2.prioridad);

    return arreglo;
  }
  Check: boolean = true;
  CambioVigencia(value: any) {


    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();

        if(this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre){
          this.Check = false;
        }return this.Check
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  CambioNoVigencia() {


    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigNoSelect = response.filter(items => items.id != Number(localStorage.getItem('VigSeleccionada')));;
        localStorage.setItem('VigNoSeleccionada', this.dataArrayInternoVigNoSelect[0].id);
        window.location.reload();
        this.Check = false;

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'list-CriteriosPriorizacion.dialog.component.html',
  styleUrls: ["./list-CriteriosPriorizacion.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogCriteriosPriorizacionUapaContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales



  constructor(public dialogRef: MatDialogRef<DialogCriteriosPriorizacionUapaContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CriteriosPriorizacionModel,
    private fb: FormBuilder

  ) {



    this.form = this.fb.group({
      id: [data.id],
      prioridad: [data.prioridad, Validators.required],
      nombre: [data.nombre, Validators.required],
      activo: [data.activo, Validators.required],
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

}
