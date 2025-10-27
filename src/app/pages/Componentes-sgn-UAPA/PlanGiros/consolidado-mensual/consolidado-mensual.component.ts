import { data } from 'jquery';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


import { IngresosModel } from 'src/app/shared/model/Ingresos';
import { MesesModel } from 'src/app/shared/model/Meses';
import { PlanGirosModel } from 'src/app/shared/model/PlanGiros';
import { IngresosService } from 'src/app/shared/services/Ingresos.services';
import { MesesService } from 'src/app/shared/services/Meses.services';
import { PlanGirosService } from 'src/app/shared/services/PlanGiros.services';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { ETCModel } from 'src/app/shared/model/ETC';
import { ActivatedRoute, Router } from '@angular/router';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { NotificacionService } from 'src/app/shared/services/Notificacion.service';
import { NotificacionModel } from 'src/app/shared/model/Notificacion';
import { SistemaModel } from 'src/app/shared/model/Sistema';
import { DatePipe, DecimalPipe } from '@angular/common';
import { SistemaService } from 'src/app/shared/services/Sistema.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Moment } from 'moment';

import { PACService } from 'src/app/shared/services/PAC.services';
import { PACModel } from 'src/app/shared/model/PACModel';
import { AsignacionRecursosService } from 'src/app/shared/services/AsignacionRecursos.services';
import { AsignacionRecursosModel } from 'src/app/shared/model/AsignacionRecursosModel';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';

@Component({
  selector: 'app-consolidado-mensual',
  templateUrl: './consolidado-mensual.component.html',
  styleUrls: ['./consolidado-mensual.component.scss']
})
export class ConsolidadoMensualComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  private apiurl = environment.baseUrlAPI + "PlanGiros";
  PlanGirosDetail: PACModel | null = null;
  PlanGirosList: PACModel[] = [];
  ETCList: ETCModel[] = []
  ingresoList: AsignacionRecursosModel[] = [];
  mesesList: MesesModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = localStorage.getItem('Ubicacion');
  nombrePAC = environment.nombrePAC;
  idETC = environment.idETC;
  idsede: number;
  consultarResoluciones: any;
  ingresoTotal: number = 0;
  solicitadoTotal: number = 0;
  transferidoTotal: number = 0;
  diferenciaTotal: number = 0;
  private dataArray: any;
  private dataArrayFilter: any;
  displayedColumns: string[] = ["siD_ETC", "mes", "giroProyectado", "giroConfirmado", "fecha", "orden", "diferencia"];
  public dataSource!: MatTableDataSource<PACModel>;
  selection = new SelectionModel<PACModel>(true, []);
  idAprobaciones = 0;
  idSedesUbicacion = 0;
  yaCargoAprobaciones = false;
  form: FormGroup;
  aprobar = [];
  lista = [];

  selMes = 0;
  selETC = 0;
  esEdicion: boolean = false;
  esNotificacion: boolean = false;
  private dataArrayAprobaciones: any;
  AccionesAprobacionList: AccionesAprobacionModel[];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  UsersList: GetAprobacionesGetAllWithRelModel[];
  AprobacionesList: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  plangirosObject: PACModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_Vigencia: 0,
    sID_Vigencia: '',
    mes: 0,
    sMes: '',
    giroProyectado: 0,
    giroConfirmado: 0,
    documentoGiro: '0',
    fechaGiro: new Date(),
    auditoria: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: false,
    isSelected: false,
    completed: false

  }

  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  constructor(public dialog: MatDialog,
    private PlanGirosService: PlanGirosService,
    private servicioIngreso: IngresosService,
    private servicioETC: ETCService,
    private meses: MesesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router,
    private _PACService: PACService,
    private _AsignacionRecursosService: AsignacionRecursosService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
  ) {

    this.filterTable()
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idAprobaciones = +params.id;
      this.idSedesUbicacion = +params.idubicacion;

    });



    this._AsignacionRecursosService.getAsignacionRecursosListfilter(4, Number(this.ViSeleccionada)).subscribe(
      (response: any) => {

        this.ingresoList = response
        let initialValue = 0;

        this.ingresoList.forEach((item) => {
          initialValue += item.valorPresupuestal;
        });
        this.ingresoTotal = initialValue

      },
      (err) => {
      }
    );
    this.allFilters();

  }
  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.dataSource.paginator = this.paginator;

  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();

    }
    //this.dataSource.paginator = this.paginator;
  }



  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;

  }
  pipe = new DatePipe('en-US');
  filterTable() {
    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response;


        this.dataArray.forEach(dato => dato.fechaGiro = this.pipe.transform(dato.fechaGiro, 'yyyy-MM-dd'));
        let p = this.dataArray.forEach(dato => dato.fechaGiro = this.pipe.transform(dato.fechaGiro, 'yyyy-MM-dd'));
        for (let repositorio in this.dataArray) {
          this.dataArray[repositorio].diferencia = this.dataArray[repositorio].giroConfirmado - this.dataArray[repositorio].giroProyectado;
          this.dataArray[repositorio].check = false;
        }
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);

        let initialValue = 0;
        let initialValue2 = 0;
        let initialValue3 = 0;
        const confirmado = response.some((element) => element.giroConfirmado === null);

        response.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;

        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
        response.forEach((item2) => {
          if (item2.giroConfirmado != null) {
            let diferencia = item2.giroConfirmado - item2.giroProyectado;
            initialValue3 += diferencia
          }


        });
        this.diferenciaTotal = initialValue3;
        //this.paginator = response.length;
        this.dataSource.paginator = this.paginator
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort = this.sort;

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  allFilters(): void {
    this.servicioETC.getETCList().subscribe(
      (response: any) => {
        this.ETCList = response
        this.ETCList.sort(function (a, b) {
          const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
          const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      },
      (err) => {

        this.isLoading = false;
      }
    );
    this.meses.getMesesList().subscribe(
      (response: any) => {

        this.mesesList = response;
        this.mesesList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogConsolidadoMensualContent, {
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
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: PACModel): void {
    this._PACService.addPAC(row_obj).subscribe(
      (response) => {


        this.ngOnInit();
      },
      (err) => {
      }
    );
  }


  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: PACModel): boolean | any {
    this._PACService.updatePAC(row_obj).subscribe(
      (response) => {
        this.filterTable()
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: PACModel): boolean | any {
    const ideliminar = row_obj.id;

    this._PACService.deletePAC(ideliminar).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {

      }
    );

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  onchangeMes(event: number) {
    //this.dataSource

    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response.filter(item => item.mes == event);

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort = this.sort;
        let initialValue = 0;
        let initialValue2 = 0;
        let initialValue3 = 0;
        this.dataArray.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;

        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
        this.dataArray.forEach((item2) => {
          if (item2.giroConfirmado !== null) {
            let diferencia = item2.giroConfirmado - item2.giroProyectado;
            initialValue3 += diferencia
          }

        });
        this.diferenciaTotal = initialValue3;

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  onchangeETC(event: number) {
    //this.dataSource

    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response.filter(item => item.iD_ETC == event);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort = this.sort;
        let initialValue = 0;
        let initialValue2 = 0;
        let initialValue3 = 0;
        this.dataArray.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;

        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
        this.dataArray.forEach((item2) => {
          if (item2.giroConfirmado !== null) {
            let diferencia = item2.giroConfirmado - item2.giroProyectado;
            initialValue3 += diferencia
          }

        });
        this.diferenciaTotal = initialValue3;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  onchangeMesETC(mes: number, etc: number) {
    if (etc === -1 && mes === 0) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    } else if (etc !== -1 && mes === 0) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.iD_ETC == etc);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    } else if (mes === -1 && etc === 0) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    } else if (mes !== -1 && etc === 0) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.mes == mes);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
    else if (mes === -1 && etc === -1) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
    else if (mes === -1 && etc !== -1) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.iD_ETC == etc);;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
    else if (etc === -1 && mes !== -1) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.mes == mes);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
    else if (etc !== -1 && mes !== -1) {
      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.iD_ETC == etc);
          this.dataArrayFilter = this.dataArray.filter(item => item.mes == mes)
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArrayFilter);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArrayFilter.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArrayFilter.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
    else if (etc !== -1 && mes === 0) {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.iD_ETC == etc);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Registros por página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
          this.paginator._intl.firstPageLabel = "Primero";
          this.paginator._intl.lastPageLabel = "Último";
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
          };
          this.dataSource.sort = this.sort;
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            if (item2.giroConfirmado !== null) {
              let diferencia = item2.giroConfirmado - item2.giroProyectado;
              initialValue3 += diferencia
            }

          });
          this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }



  }


  openInfraesturaDetalle() {

    this.router.navigate(['/asignacionrecursos'])
    //this.router.navigateByUrl('http://front-sigepae-dev.azurewebsites.net/#/asignacionrecursos');
  }

  cleanFilters(): void {
    this.allFilters();
    this.selETC = 0;
    this.selMes = 0;
    //this.filterTable();
    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response;

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);

        let initialValue = 0;
        let initialValue2 = 0;
        let initialValue3 = 0;
        const confirmado = response.some((element) => element.giroConfirmado === null);

        response.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;

        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
        response.forEach((item2) => {
          if (item2.giroConfirmado != null) {
            let diferencia = item2.giroConfirmado - item2.giroProyectado;
            initialValue3 += diferencia
          }


        });
        this.diferenciaTotal = initialValue3;
        //this.paginator = response.length;
        this.dataSource.paginator = this.paginator
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort = this.sort;



      },
      (err) => {
        this.isLoading = false;
      }
    );
  }


  onEditar() {
    this.esEdicion = true;
    this.esNotificacion = true;
  }


  ongiroConfirmado($event: any, element2: any): void {

    this.dataArray.map(function (dato) {
      if (dato.id == element2.id) {

        dato.giroConfirmado = $event;
        dato.diferencia = dato.giroConfirmado - dato.giroProyectado;
        dato.check = true;

      }

      return dato;
    });

    this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
  }
  onfechaTransferencia($event: any, element2: any): void {

    this.dataArray.map(function (dato) {
      if (dato.id == element2.id) {

        dato.fechaGiro = $event;

        dato.check = true;
      }

      return dato;
    });

    this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
  }

  handleDOBChange(event, element2: any) {

    const m: Moment = event.value;

    if (m) {
      let p = this.pipe.transform(event.value, 'yyyy-MM-dd');
      this.dataArray.map(function (dato) {
        if (dato.id == element2.id) {
          dato.fechaGiro = p
          dato.check = true;
        }

        return dato;
      });

      this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);


    }
  }
  onnumeroOrden($event: any, element2: any): void {

    this.dataArray.map(function (dato) {
      if (dato.id == element2.id) {
        dato.documentoGiro = $event
        dato.check = true;
      }

      return dato;
    });

    this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
  }
  /**
   * Guarda los cambios realizados en el activo de los criterios de priorización
   */
  onGuardar() {
    this.savePlanGiros();
    this.esEdicion = false;
    this.esNotificacion = false;
  }
  savePlanGiros() {
    let setrue = this.dataArray.filter(item => item.check === true)
    setrue.forEach(dato => {

      this.plangirosObject.id = dato.id;
      this.plangirosObject.fechaGiro = dato.fechaGiro ? dato.fechaGiro : new Date();

      this.plangirosObject.giroConfirmado = dato.giroConfirmado;
      this.plangirosObject.giroProyectado = dato.giroProyectado;
      this.plangirosObject.iD_ETC = dato.iD_ETC;
      this.plangirosObject.iD_Vigencia = dato.iD_Vigencia;
      this.plangirosObject.mes = dato.mes;

      this.plangirosObject.documentoGiro = dato.documentoGiro ? dato.documentoGiro : "0";


      if (dato.fechaGiro == '1900-01-01' || dato.documentoGiro == '') {
        Swal.fire({
          showCloseButton: true,
          html:

            '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +

            '<p style="text-align: left!important; font-size: 12px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
            '<p style="text-align: left!important; font-size: 12px; color:#005ACA;"> formulario para poder continuar</p> ',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonColor: '#009922',
          cancelButtonColor: '#FF0000',
          denyButtonColor: '#009922',
          confirmButtonText: 'Aceptar Aprobaciones',
          cancelButtonText: 'Cancelar',
          showDenyButton: false,
          denyButtonText: `Aceptar`,
        }).then((result) => {

          let valid: boolean = this.validar(this.plangirosObject);
          if (valid) {
            this._PA_RegistrarNotificacionService.registerNotificationWithUrl("Se ha transferido por parte de UApA a la ETC | " + dato.sID_ETC, "Coordinador PAE", "/PACETC?id=" + dato.iD_ETC + "&idubicacion=" + dato.iD_ETC, dato.iD_ETC);
            this._PA_RegistrarNotificacionService.registerNotificationWithUrl("Se ha transferido por parte de UApA a la ETC | " + dato.sID_ETC, "Rol SiPAE-Administrador", "/PACETC?id=" + dato.iD_ETC + "&idubicacion=" + dato.iD_ETC, dato.iD_ETC);
            this._PACService.updatePAC(this.plangirosObject).subscribe(
              (response) => {


                this.filterTable()
              },
              (err) => {
              }
            );
          } else {
            this.esEdicion = true;
          }
        });

      } else {
        let valid: boolean = this.validar(this.plangirosObject);
        if (valid) {
          this._PA_RegistrarNotificacionService.registerNotificationWithUrl("Se ha transferido por parte de UApA a la ETC | " + dato.sID_ETC, "Coordinador PAE", "/PACETC?id=" + dato.iD_ETC + "&idubicacion=" + dato.iD_ETC, dato.iD_ETC);
          this._PA_RegistrarNotificacionService.registerNotificationWithUrl("Se ha transferido por parte de UApA a la ETC | " + dato.sID_ETC, "Rol SiPAE-Administrador", "/PACETC?id=" + dato.iD_ETC + "&idubicacion=" + dato.iD_ETC, dato.iD_ETC);
          /*  this._PA_RegistrarNotificacionService.registerNotification("Se ha transferido por parte de UApA ", "Coordinador PAE",dato.iD_ETC);
               this._PA_RegistrarNotificacionService.registerNotification("Se ha transferido por parte de UApA", "Rol SiPAE-Administrador",dato.iD_ETC); */
          this._PACService.updatePAC(this.plangirosObject).subscribe(
            (response) => {

              this.filterTable();
            },
            (err) => {
            }
          );
        }
      }

    });

  }
  validar(plangirosObject) {
    if (plangirosObject.fechaGiro == '1900-01-01' || plangirosObject.documentoGiro == '') {

      return false;
    }
    return true;
  }
  onNotificacion() {

    this.esEdicion = false;
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important;position: absolute!important; top: 30px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: left !important; font-size: 13px !important; max-width: 60% !important;">¿Está seguro de que desea notificar los cambios en el ' +
        'Plan Anualizado de Caja (PAC) a la ETC? </p>',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonColor: '#005ACB',
      cancelButtonColor: '#005ACB',
      confirmButtonText: 'Si, notificar a la ETC',
      denyButtonText: 'Si, notificar a la ETC',
      cancelButtonText: `No, regresar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        //Swal.fire('Saved!', '', 'success')
        this.savePlanGiros();
        this.esNotificacion = false;

      } else {
        this.esNotificacion = true;
        this.esEdicion = true;
      }

    });


  }



}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'consolidado-mensual.dialog.component.html',
  styleUrls: ["./consolidado-mensual.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogConsolidadoMensualContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales
  ETCList: ETCModel[];
  MesList: MesesModel[];

  lista = [];


  constructor(public dialogRef: MatDialogRef<DialogConsolidadoMensualContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PlanGirosModel,
    private fb: FormBuilder,
    private eTCService: ETCService,
    public meses: MesesService,
    private aprobacionesService: AprobacionesService,
    public dialog: MatDialog,
    private notificacionService: NotificacionService,
  ) {

    this.eTCService.getETCList().subscribe(
      (response: any) => {
        this.ETCList = response;
      },
      (err) => {
      }
    );
    this.meses.getMesesList().subscribe(
      (response: any) => {

        this.MesList = response

      },
      (err) => {
      }
    );


    this.form = this.fb.group({
      id: [data.id],
      iD_ETC: [data.iD_ETC],
      siD_ETC: [''],
      mes: [data.mes, Validators.required],
      giroProyectado: [data.giroProyectado],
      giroConfirmado: [data.giroConfirmado, Validators.required],
      auditoria: [''],
      sID: [''],
      sID_ETC: [''],
      sMes: [''],
      idVigencia: [data.idVigencia, Validators.required],
      sidVigencia: [''],
      fechaTransferencia: [data.fechaTransferencia, Validators.required],
      numeroOrden: [data.numeroOrden, Validators.required],
      filtro: [''],
      pathSoporteGiro: [''],

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