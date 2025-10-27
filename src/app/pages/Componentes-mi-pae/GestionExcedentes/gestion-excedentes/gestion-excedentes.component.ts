import { ExcedentesComplementosService } from './../../../../shared/services/ExcedentesComplementos.services';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GestionExcedentesService } from '../../../../shared/services/GestionExcedentes.service';
import { GestionExcedentesModel } from '../../../../shared/model/GestionExcedentes';
import { HistoricoAprobacionesModel } from '../../../../shared/model/HistoricoAprobaciones';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { UsersModel } from 'src/app/shared/model/Users';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { UsersService } from 'src/app/shared/services/Users.services';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { GestionExcedentesParamsModel } from '../../../../shared/model/GestionExcedentesParams';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { AspNetUsersService } from 'src/app/seguridad/AspNetUsers/AspNetUsers.services';
import { AprobacionesModel } from 'src/app/shared/model/aprobaciones.model';
import { AprobacionesService } from 'src/app/shared/services/aprobaciones.service';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { Router } from '@angular/router';
import { PA_ReporteExcedentesModel } from 'src/app/shared/model/PA_ReporteExcedentesModel';
import { PA_ReporteExcedentesService } from 'src/app/shared/services/PA_ReporteExcedentes.services';
import { TiposDestinosComplementosModel } from 'src/app/shared/model/TiposDestinosComplementosModel';
import { TiposDestinosComplementosService } from 'src/app/shared/services/TiposDestinosComplementos.services';
import { ExcedentesComplementosModel } from 'src/app/shared/model/ExcedentesComplementos';
import { PA_SedesJornadaGetAllWithRelationService } from 'src/app/shared/services/PA_SedesJornadaGetAllWithRelation.services';
import { PA_GradosSedesJornadasGetAllWithRelationService } from 'src/app/shared/services/PA_GradosSedesJornadasGetAllWithRelation.services';

@Component({
  selector: 'app-gestion-excedentes',
  templateUrl: './gestion-excedentes.component.html',
  styleUrls: ['./gestion-excedentes.component.scss']
})
export class GestionExcedentesComponent implements OnInit {
  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  myDatepipe!: any;
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  GestionExcedentesDetail: GestionExcedentesModel | null = null;
  GestionExcedentesList: GestionExcedentesModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  idETC = Number(localStorage.getItem('IdUbicacion'));
  private dataArray: any;
  private dataArrayAprobaciones: any;
  displayedColumns: string[] = ["id", "fechaReporte", "sedeEducativa", "gradoEscolar", "cantidadRaciones", "destinoRaciones", "estadoReporte"];
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  public dataSource!: MatTableDataSource<GestionExcedentesModel>;
  public dataSourceAprobaciones: MatTableDataSource<HistoricoAprobacionesModel>;
  selection = new SelectionModel<GestionExcedentesModel>(true, []);
  excedenteRacionList: ExcedentesComplementosModel[];
  excedenteRacionListFull: ExcedentesComplementosModel[];
  excedenteRacion: ExcedentesComplementosModel;
  SedesList: SedesModel[];
  SedesJornadaList: SedesJornadaModel[];
  GradosSedesJornadasList: GradosSedesJornadasModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  RolList: GetAprobacionesGetAllWithRelModel[];
  UsersRolesList: UsersModel[];
  ExcedenteRacion: ExcedentesComplementosModel;
  excedentesList: PA_ReporteExcedentesModel[];
  stateColorsMap = new Map<string, string>([
    ["Aprobado", "green"],
    ["Tramitada", "green"],
    ["Por aprobar", "yellow"],
    ["En tramite", "yellow"],
    ["Rechazado", "red"],
  ]);
  ExcedenteRacionesObject: ExcedentesComplementosModel = {
    id: 0,
    iD_Comite: 0,
    siD_Comite: "",
    iD_GradoSedeJornada: 0,
    siD_GradoSedeJornada: "",
    iD_TipoDestinoComplemento: 0,
    siD_TipoDestinoComplemento: "",
    fechaReporte: new Date(),
    cantExcedentes: 0,
    auditoria: "",
    justificacion: "",
    id_TipoEstadoExcedentesComplementos: 2,
    _ippublica: "",
    _nombremaquina: "",
    _usuario: "",
    _ipdetrasproxy: "",
    _browser: "",
    _accion: "",
    _sessionid: "",
    _XMLAuditoria: "",
    isValid: false,
    isSelected: false,
    completed: false,
    sid_TipoEstadoExcedentesComplementos: ''
  };

  constructor(public dialog: MatDialog,
    public ExcedentesRacionesService: ExcedentesComplementosService,
    private sedesService: SedesService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    private aprobacionesService: AprobacionesService,
    private accionesAprobacionService: AccionesAprobacionService,
    private usersService: UsersService,
    private aspNetUsersService: AspNetUsersService,
    private seguridadService: SeguridadService,
    private datepipe: DatePipe,
    private aprobacionesGetAllRel: AprobacionesGetAllWithRelService,
    private sedesJornadaService: SedesJornadaService,
    private reporteExcedentesService: PA_ReporteExcedentesService,
    private router: Router,
  ) {
    this.myDatepipe = datepipe;
  }

  fillTable() {
    this.reporteExcedentesService.getPA_ReporteExcedentesList(this.idETC).subscribe(
      (response: any) => {
        this.excedenteRacionList = response;
        this.dataArray = response;
        /*         this.dataArray.forEach(element => {
                  let ConvertDate = this.myDatepipe.transform(element.fechaReporte, 'dd-MMM-yyyy');
                  element.fechaReporte = ConvertDate.toUpperCase().replace(".", "");
                }); */
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<GestionExcedentesModel>(this.dataArray);
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
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.fillTable();
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogGestionExcedentesContent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Enviar para aprobación del rector') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Borrar') {
        this.deleteRowData(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: GestionExcedentesModel): void {
    this.ExcedenteRacionesObject.id = row_obj.id
    // let ConvertDate = this.myDatepipe.transform(row_obj.fechaReporte, 'dd-MMM-yyyy');
    this.ExcedenteRacionesObject.fechaReporte = new Date();
    this.ExcedenteRacionesObject.iD_GradoSedeJornada = row_obj.gradoEscolar;
    this.ExcedenteRacionesObject.cantExcedentes = row_obj.cantidadRaciones;
    this.ExcedenteRacionesObject.iD_TipoDestinoComplemento = row_obj.destinoRaciones;
    this.ExcedenteRacionesObject.justificacion = row_obj.justificacion;
    this.ExcedentesRacionesService.addExcedentesComplementos(this.ExcedenteRacionesObject).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: ExcedentesComplementosModel): boolean | any {
    this.ExcedentesRacionesService.updateExcedentesComplementos(row_obj).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: GestionExcedentesModel): boolean | any {
    const ideliminar = row_obj.id;
    this.ExcedentesRacionesService.deleteExcedentesComplementos(ideliminar).subscribe(
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

  openGestionDetalle(myRowData) {
    localStorage.setItem('sgcp', myRowData.sedeEducativa)
    localStorage.setItem('nombredeUbicacionActualizado', 'si')
    this.router.navigate(['/GestionExcedentesDetalle'], { queryParams: { id: myRowData.id, es: myRowData.id_TipoEstadoExcedentesComplementos } })
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'gestion-excedentes.dialog.component.html',
  styleUrls: ["./gestion-excedentes.dialog.component.scss"],
})
export class DialogGestionExcedentesContent implements OnInit {
  idETC = Number(localStorage.getItem('IdUbicacion'));
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  GradosSedesJornadasList: GradosSedesJornadasModel[];
  SelectGradosSedesJornadasList: GradosSedesJornadasModel[];
  InstitucionEducativaList: InstitucionEducativaModel[];
  SedesList: SedesModel[];
  SelectSedesList: SedesModel[];
  SedesJornadaList: SedesJornadaModel[];
  SelectSedesJornadaList: SedesJornadaModel[];
  DestinoRacionList: TiposDestinosComplementosModel[];
  ParametrosList: GestionExcedentesParamsModel[];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  dateToday: number;
  myDatepipe!: any;

  constructor(public dialogRef: MatDialogRef<DialogGestionExcedentesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    private tiposDestinoService: TiposDestinosComplementosService,
    private GestionExcedentesService: GestionExcedentesService,
    private ExcedentesRacionesService: ExcedentesComplementosService,
    private AccionesAprobacionService: AccionesAprobacionService,
    private datepipe: DatePipe,
    private _PA_SedesJornadaGetAllWithRelationService: PA_SedesJornadaGetAllWithRelationService,
    private _PA_GradosSedesJornadasGetAllWithRelationService: PA_GradosSedesJornadasGetAllWithRelationService,
  ) {
    this.myDatepipe = datepipe;
    this.dateToday = this.myDatepipe.transform(Date.now(), 'dd-MMM-yyyy').toUpperCase().replace(".", "");
    if (data.action == 'Enviar solicitud') {
      let ConvertDate = this.myDatepipe.transform(data.fechaReporte, 'dd-MMM-yyyy');
      this.dateToday = ConvertDate.toUpperCase().replace(".", "");
    }
    this.form = this.fb.group({
      id: [data.id],
      fechaReporte: [this.dateToday, Validators.required],
      institucionEducativa: ['', Validators.required],
      sedeEducativa: ['', Validators.required],
      jornadaEducativa: [''],
      gradoEscolar: ['', Validators.required],
      racionesDiarias: ['', Validators.required],
      estudiantesMatriculados: ['', Validators.required],
      cantidadRaciones: ['', Validators.required],
      destinoRaciones: ['', Validators.required],
      justificacion: [''],
      nuevaCantidadRaciones: ['', Validators.required],
      observaciones: [''],
      accionAprobacion: [''],
    });

    this.institucionEducativaService.getInstitucionEducativaListRelationFilter(this.idETC).subscribe(
      (response: any) => {
        this.InstitucionEducativaList = response;
      });

    this.tiposDestinoService.getTiposDestinosComplementosList().subscribe(
      (response: any) => {
        this.DestinoRacionList = response;
      },
      (err) => {
      }
    );

    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionesList = response;
      },
      (err) => {
      }
    );
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (data.action == 'Enviar solicitud') {
      this.form.get('accionAprobacion').setValidators(Validators.required)
      this.form.controls['institucionEducativa'].disable();
      this.form.controls['sedeEducativa'].disable();
      this.form.controls['jornadaEducativa'].disable();
      this.form.controls['gradoEscolar'].disable();
      this.form.controls['cantidadRaciones'].disable();
      this.form.controls['destinoRaciones'].disable();
      this.form.controls['justificacion'].disable();
      this.onGradoClick(data.iD_GradoSedeJornada);
      this.form.controls['gradoEscolar'].setValue(data.iD_GradoSedeJornada);
      this.form.controls['destinoRaciones'].setValue(data.iD_TipoDestinoComplemento);
      this.form.controls['cantidadRaciones'].setValue(data.cantExcedentes);
      this.ExcedentesRacionesService.getExcedentesComplementos(data.id).subscribe(
        (response) => {
          this.form.controls['justificacion'].setValue(response.justificacion);
        },
        (err) => {
        }
      );
      this.substractRaciones(data.iD_GradoSedeJornada, data.cantExcedentes);
    }
  }

  ngOnInit(): void {
    this.form.get('fechaReporte').setValue(this.dateToday);
  }

  onInstitucionClick(value: any): void {
    this.sedesService.getSedesListRelationFilter3_1(value).subscribe(
      (response: any) => {

        this.SedesList = response;
        this.SelectSedesList = response;
      },
      (err) => {
      }
    );

  }

  onSedeClick(value: any): void {
    this._PA_SedesJornadaGetAllWithRelationService.getPA_SedesJornadaGetAllWithRelationList(value).subscribe(
      (response: any) => {
        this.SedesJornadaList = response;
        this.SelectSedesJornadaList = response;
      },
      (err) => {
      }
    );

  }

  onJornadaClick(value: any): void {
    this._PA_GradosSedesJornadasGetAllWithRelationService.getPA_GradosSedesJornadasGetAllWithRelationList(value).subscribe(
      (response: any) => {
        this.GradosSedesJornadasList = response;
        this.SelectGradosSedesJornadasList = response;
      },
      (err) => {
      }
    );

  }

  onGradoClick(value: any): void {
    this.GestionExcedentesService.getGestionExcedentesParams(value).subscribe(
      (response: any) => {
        this.ParametrosList = response;
        this.form.controls['racionesDiarias'].setValue(this.ParametrosList[0].cantidadRacionesAsignadas);
        this.form.controls['estudiantesMatriculados'].setValue(this.ParametrosList[0].numeroEstudiantes);
      },
      (err) => {
      }
    );
  }

  doAction(): void {
    this.form.get('fechaReporte').setValue(Date.now());
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  keyRaciones(value: number) {
    this.form.controls['nuevaCantidadRaciones'].setValue(this.form.get('racionesDiarias').value - value);
  }

  substractRaciones(value: any, value2: number) {
    this.GestionExcedentesService.getGestionExcedentesParams(value).subscribe(
      (response: any) => {
        this.ParametrosList = response;
        this.form.controls['nuevaCantidadRaciones'].setValue(this.ParametrosList[0].cantidadRacionesAsignadas - value2);
      },
      (err) => {
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
