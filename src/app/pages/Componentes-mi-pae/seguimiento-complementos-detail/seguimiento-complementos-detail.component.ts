import { Component, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent,} from 'angular-calendar';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { PA_SeguimientoRacionesDetalleSemanaService } from 'src/app/shared/services/PA_SeguimientoRacionesDetalleSemana.services';
import { PA_ComplementosEntregadosGradoService } from 'src/app/shared/services/PA_ComplementosEntregadosGrado.services';
import { PA_SeguimientoRacionesDetalleSemanaModel } from 'src/app/shared/model/PA_SeguimientoRacionesDetalleSemanaModel';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { DialogtabsquincenadetalleContent } from '../QuincenaEntregaRaciones/tabsQuincena/tabs-quincena-detalle/tabs-quincena-detalle.component';
import { EntregasRacionesExtendModel } from 'src/app/shared/model/EntregasRacionesExtend';
import { EntregasComplementosService } from 'src/app/shared/services/EntregasComplementos.services';
import { MatDialog } from '@angular/material/dialog';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_ComplementosEntregadosGradoModel } from 'src/app/shared/model/PA_ComplementosEntregadosGradoModel';
import { SemanaEntregaComplementosService } from 'src/app/shared/services/SemanaEntregaComplementos.services';
import { PA_IngresoSemanaModel } from 'src/app/shared/model/PA_IngresoSemanaModel';
import { PA_IngresoSemanaService } from 'src/app/shared/services/PA_IngresoSemana.services';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { PA_ActualizaAprobacionSemanaService } from 'src/app/shared/services/PA_ActualizaAprobacionSemana.services';
import { DecimalPipe } from '@angular/common';
import { PA_SedesJornadaGetAllWithRelationService } from 'src/app/shared/services/PA_SedesJornadaGetAllWithRelation.services';
import { PA_GradosSedesJornadasGetAllWithRelationService } from 'src/app/shared/services/PA_GradosSedesJornadasGetAllWithRelation.services';




const colors: any = {
  red: {
    primary: '#fc4b6c',
    secondary: '#f9e7eb'
  },
  blue: {
    primary: '#1e88e5',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#ffb22b',
    secondary: '#FDF1BA'
  }
};

@Pipe({
  name: 'withoutDots'
})
export class WithoutDotsPipe implements PipeTransform {
  transform(dateTo: string): string {
    return dateTo.replace('.', '');
  }
}


@Component({
  selector: 'app-seguimiento-complementos-detail',
  templateUrl: './seguimiento-complementos-detail.component.html',
  styleUrls: ['./seguimiento-complementos-detail.component.scss']
})
export class SeguimientoComplementosDetailComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChildren('paginator') paginator: QueryList<MatPaginator>;
  @ViewChildren('paginator2') paginator2: QueryList<MatPaginator>;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  panelOpenState: boolean[] = [];
  resumenPanel: boolean[] = [];
  viewDate: Date = new Date();
  view = 'month';
  activeDayIsOpen = true;
  idaccion = 0;
  totalDiasPae = 0;
  complementosDiariosAPreparar = 0;
  complementoAlmuerzo = 0;
  complementoAmPm = 0;
  totalComplementosProgramados = 0;
  totalComplementosPreparados = 0;
  totalComplementosNoPreparados = 0;

  idSede = null;
  idContrato = null;
  idJornada = null;
  ano = null;
  mes = null;
  nameMonth = '';

  nombreSede: string;
  nombreInstitucion: string;
  nombreMunicipio: string;
  IngresoSemanaModelList: PA_IngresoSemanaModel[];
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  dataArray: any[];
  events: CalendarEvent[] = [];

  seguimientoRacionesDetalleSemanaList: PA_SeguimientoRacionesDetalleSemanaModel[];
  GradosSedesJornadasList: GradosSedesJornadasModel[];
  GradosSedesJornadasListBySede: GradosSedesJornadasModel[];

  sedesJornadaList: SedesJornadaModel[];
  selectSedesJornadaList: SedesJornadaModel[];
  selGrado: number[] = [];
  selJornada: number[] = [];

  complementosEntregadosList: PA_ComplementosEntregadosGradoModel[];
  complementosBySemana = {};
  dataSourceBySemana = {};
  displayedColumns: string[] = ['fecha', 'complementosAsignados', 'complementosPreparados', 'reporte', 'justificacion'];

  isEdit: boolean[] = [];
  isSaveAndApprove: boolean[] = [];
  filteredWeek: boolean[] = [];
  statesByWeek: string[] = [];
  colorsByWeek: string[] = [];
  validButton: boolean[] = [];
  arrayOfMaps: Array<Map<number, number>> = [];


  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  idETC = 0;
  yaCargoAprobaciones: boolean[] = [];
  lista = [];
  aprobar = [];
  form: FormGroup;
  dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  AprobacionesList: any;
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  AprobacionObject: AprobacionesModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: new Date,
    fecha: new Date,
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: '',
    filtro: '',
    id_Rol: 0,
    sID_rol: '',

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
    completed: false,
    plazoPorAprobar: undefined
  };
  diasPaeList: string[];

  selVigencia = Number(localStorage.getItem('VigSeleccionada'));
  cantAprobaciones = 0;
  constructor(
    private router: ActivatedRoute,
    private seguimientoRacionesDetalleSemanaService: PA_SeguimientoRacionesDetalleSemanaService,
    private complementosEntregadosGradosService: PA_ComplementosEntregadosGradoService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    public dialog: MatDialog,
    public entregasRacionesService: EntregasComplementosService,
    private seguridadService: SeguridadService,
    private aprobacionesService: AprobacionesService,
    private AccionesAprobacionService: AccionesAprobacionService,
    private serviciosAprobaciones: AprobacionesGetAllWithRelService,
    private PA_IngresoSemanaService: PA_IngresoSemanaService,
    private _ContratosService: ContratosService,
    private fb: FormBuilder,
    private _PA_ActualizaAprobacionSemanaService: PA_ActualizaAprobacionSemanaService,
    private _PA_SedesJornadaGetAllWithRelationService:PA_SedesJornadaGetAllWithRelationService,
    private _PA_GradosSedesJornadasGetAllWithRelationService:PA_GradosSedesJornadasGetAllWithRelationService,

  ) {
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);
    this.router.queryParams.subscribe(params => {
      this.idSede = +params.idSede;
      this.idContrato = +params.idContrato;
      this.idJornada = +params.idJornada;
      this.ano = +params.ano;
      this.mes = +params.mes;
    });
    this.nombreSede = localStorage.getItem('src');
    this.nombreMunicipio = localStorage.getItem('mrc');
    this.nombreInstitucion = localStorage.getItem('irc');
    this.fillTabs();
    this.fillFilters();
    this.nameMonth = this.months[this.mes - 1];


    this.getAcciones();
    this._ContratosService.getContratosList().subscribe(
      (response: any) => {
        var h = response.filter(item => item.id === this.idContrato)
        this.idETC = h[0].iD_ETC;
      },
      (err) => {
      }
    );


  }

  fillTabs() {
    const newDate = this.ano + "-" + this.mes + "-01";
    this.seguimientoRacionesDetalleSemanaService.getPA_SeguimientoRacionesDetalleSemanaList(this.idContrato, this.idSede, newDate, this.idJornada).subscribe(
      (response: any) => {
        this.seguimientoRacionesDetalleSemanaList = response;
        this.viewDate = new Date(response[0].fecha_inicial);
        this.dataArray = this.seguimientoRacionesDetalleSemanaList;
        this.seguimientoRacionesDetalleSemanaList.forEach((element, index) => {
          this.dataArray[index].first_day = new Date(element.fecha_inicial).getDate();
          this.dataArray[index].last_day = new Date(element.fecha_final).getDate();
          this.dataArray[index].dias_pae_number = element.dias_pae.length;
          this.addEvent(index);
        });
      },
      (err) => {
      }
    );
  }

  ngOnInit(): void {
  }

  expandPanel(numSemana: number, firstDay: number): void {
    this.filteredWeek[numSemana] = false;
    this.fillTableAprobaciones(numSemana);
    this.resumenPanel[numSemana] = !this.resumenPanel[numSemana];
    var selDate = this.ano + "-" + this.mes + "-" + firstDay;

    this.PA_IngresoSemanaService.getPA_IngresoSemana(this.idContrato, selDate, this.selVigencia).subscribe(
      (response: any) => {
        this.IngresoSemanaModelList = response;
      },
      (err) => {
      }
    );

    this.lista=[]
    this.aprobacionesService.getAprobacionesList().subscribe(
      (response: any) => {

        let p = response.filter(item => item.ubicacionOrigen === this.idContrato + ' ' + this.idSede + ' ' + this.ano + ' ' + this.mes + ' ' + this.idJornada + ' ' + numSemana);
        this.AprobacionesList = p.filter(item => item.id_Secciones === 12);
        this.lista.push(this.AprobacionesList)
      },
      (err) => {
      }
    );
  }

  applyStyles(color: string) {
    let styles;
    if (color) {
      if (color.startsWith('#')) {
        styles = { 'color': color };
      } else {
        styles = { 'color': "#" + color };
      }
    }
    return styles;
  }

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  idJornadaGrado = 0;
  fillFilters() {
    this._PA_SedesJornadaGetAllWithRelationService.getPA_SedesJornadaGetAllWithRelationListidJor(this.idSede, this.idJornada).subscribe(
      (response: any) => {
        this.sedesJornadaList = response;
        this.selectSedesJornadaList = response;
        this.idJornadaGrado = response[0].id
        this._PA_GradosSedesJornadasGetAllWithRelationService.getPA_GradosSedesJornadasGetAllWithRelationList(this.idJornadaGrado).subscribe(
          (response: any) => {
            this.GradosSedesJornadasList = response;
            this.GradosSedesJornadasListBySede = response;
            //this.onJornadaClick(this.idJornada);
          },
          (err) => {
          }
        );
      },
      (err) => {
      }
    );


  }

  onJornadaClick(value: any): void {
    this.GradosSedesJornadasListBySede = this.GradosSedesJornadasList.filter(grado => grado.iD_SedeJornada == this.selectSedesJornadaList.find(element => element.iD_Jornada == value).id);
  }

  fillTable(numSemana: number) {
    this.isEdit = [];
    let paramJornada = this.selJornada[numSemana] ? this.selJornada[numSemana] : this.idJornada;
    this.complementosEntregadosGradosService.getPA_ComplementosEntregadosGradoList(this.idContrato, this.idSede, paramJornada, this.selGrado[numSemana], this.seguimientoRacionesDetalleSemanaList.find(element => element.numero_semana == numSemana).fecha_inicial, this.seguimientoRacionesDetalleSemanaList.find(element => element.numero_semana == numSemana).fecha_final).subscribe(
      (response: any) => {
        this.filteredWeek[numSemana] = true;
        this.complementosBySemana[numSemana] = response;
        this.dataSourceBySemana[numSemana] = new MatTableDataSource<PA_ComplementosEntregadosGradoModel>(response);
        this.dataSourceBySemana[numSemana].paginator = this.paginator.toArray()[numSemana - 1];
        this.paginator.toArray()[numSemana - 1]._intl.nextPageLabel = "Siguiente";
        this.paginator.toArray()[numSemana - 1]._intl.itemsPerPageLabel = "Registros por página";
        this.paginator.toArray()[numSemana - 1]._intl.previousPageLabel = "Anterior";
        this.paginator.toArray()[numSemana - 1]._intl.firstPageLabel = "Primero";
        this.paginator.toArray()[numSemana - 1]._intl.lastPageLabel = "Último";
        this.paginator.toArray()[numSemana - 1]._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.updateEggState(numSemana);
        if (this.complementosBySemana[numSemana].length > 0) {
          if (this.complementosBySemana[numSemana].find(element => element.estadoReporte == "Por diligenciar") || this.complementosBySemana[numSemana].find(element => element.estadoReporte == "Incompleta")) {
            this.yaCargoAprobaciones[numSemana] = false;
            //TODO: Change state to 'Pendiente'
          } else {
            //TODO: Change state to 'Por diligenciar'
            this.yaCargoAprobaciones[numSemana] = true;


          }
        }

      },
      (err) => {
      }
    );

  }

  updateEggState(numSemana: number) {
    let minState = 10
    this.complementosBySemana[numSemana].forEach(element => {
      if (this.getIdState(element.estadoReporte) < minState) {
        minState = this.getIdState(element.estadoReporte);
      }
    });
    switch (minState) {
      case 5:
        this.statesByWeek[numSemana] = "Completo";
        this.colorsByWeek[numSemana] = "#009922";
        break;
      case 4:
        this.statesByWeek[numSemana] = "Completo";
        this.colorsByWeek[numSemana] = "#009922";
        break;
      case 3:
        this.statesByWeek[numSemana] = "Justificado";
        this.colorsByWeek[numSemana] = "#FFD400";
        break;
      case 2:
        this.statesByWeek[numSemana] = "Incompleto";
        this.colorsByWeek[numSemana] = "#ff9100";
        break;
      case 1:
        this.statesByWeek[numSemana] = "Por diligenciar";
        this.colorsByWeek[numSemana] = "#E2ECFD";
        break;
      case 0:
        this.statesByWeek[numSemana] = "Rechazado";
        this.colorsByWeek[numSemana] = "#ff0000";
        break;
    }
  }

  getIdState(state: string): number {
    let idState: number;
    switch (state) {
      case "Aprobado":
        idState = 5;
        break;
      case "Completa":
        idState = 4;
        break;
      case "Justificada":
        idState = 3;
        break;
      case "Incompleta":
        idState = 2;
        break;
      case "Por diligenciar":
        idState = 1;
        break;
      case "Rechazado":
        idState = 0;
        break;
    }
    return idState;
  }
  changeAllStates(numSemana: number, estado: number) {
    let paramJornada = this.selJornada[numSemana] ? this.selJornada[numSemana] : this.idJornada;
    this.GradosSedesJornadasListBySede.forEach(grado => {
      this.complementosEntregadosGradosService.getPA_ComplementosEntregadosGradoList(this.idContrato, this.idSede, paramJornada, grado.iD_Grado, this.seguimientoRacionesDetalleSemanaList.find(element => element.numero_semana == numSemana).fecha_inicial, this.seguimientoRacionesDetalleSemanaList.find(element => element.numero_semana == numSemana).fecha_final).subscribe(
        (response: any) => {
          this.complementosBySemana[numSemana] = response;
          if (this.complementosBySemana[numSemana].length > 0) {
            this.complementosBySemana[numSemana].forEach(element => {
              this.entregasRacionesService.getEntregasComplementos(element.id_EntregaRacion).subscribe(
                (response) => {
                  response.iD_TipoReporteEntrega = estado;
                  if (!response.justificacion) {
                    response.justificacion = "";
                  }
                  if (!response.pathDocumentoContrato) {
                    response.pathDocumentoContrato = "";
                  }
                  this.entregasRacionesService.updateEntregasComplementos(response).subscribe(
                    (response) => {
                      this.fillTable(numSemana);
                      this.fillTabs();
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
        },
        (err) => {
        }
      );
    });
  }
  onEditClick(numSemana: number) {
    this.isEdit[numSemana] = true;
    this.validButton[numSemana] = true;
  }
  onSaveClick(numSemana: number) {
    this.isEdit[numSemana] = false;
    if (this.arrayOfMaps[numSemana]) {
      this.saveChanges(numSemana);
    }
  }

  onSaveAndApproveClick(numSemana: number) {
    this.isEdit[numSemana] = false;
    this.isSaveAndApprove[numSemana] = true;
    this.cantAprobaciones = 1
    if (this.arrayOfMaps[numSemana]) {
      this.saveChanges(numSemana);
    }
    this.aprobaciones2(numSemana);
  }

  saveChanges(numSemana: number) {
    for (let id of this.arrayOfMaps[numSemana].keys()) {
      this.entregasRacionesService.getEntregasComplementos(id).subscribe(
        (response) => {
          switch (this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == id).estadoReporte) {
            case "Completa":
              response.iD_TipoReporteEntrega = 4;
              break;
            case "Justificada":
              response.iD_TipoReporteEntrega = 3;
              break;
            case "Incompleta":
              response.iD_TipoReporteEntrega = 2;
              break;
            case "Por diligenciar":
              response.iD_TipoReporteEntrega = 1;
              break;
          }
          response.complementosPreparadas = this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == id).complementosPreparados;
          response.justificacion = this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == id).justificacion;
          response.pathDocumentoContrato = this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == id).pathDocumentoContrato;
          if (response.justificacion) {
            if (response.iD_TipoReporteEntrega == 2) {
              response.iD_TipoReporteEntrega = 3;
            }
          } else {
            response.justificacion = "";
          }
          if (!response.pathDocumentoContrato) {
            response.pathDocumentoContrato = "";
          }
          this.entregasRacionesService.updateEntregasComplementos(response).subscribe(
            (response) => {
              this.isEdit = [];
              this.fillTable(numSemana);
              this.fillTabs();
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    }
  }

  openDialog(action: string, obj: any, numSemana: number): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogtabsquincenadetalleContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.updateDataJustify(result.data, numSemana);
      } else if (result.event === 'Actualizar') {
        this.updateData(result.data, numSemana);
      }
    });
  }
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: EntregasRacionesExtendModel) {
    this.entregasRacionesService.addEntregasComplementos(row_obj).subscribe(
      (response) => {
      },
      (err) => {
      }
    );
  }

  updateDataJustify(row: any, numSemana: number) {
    if (this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == row.id_EntregaRacion).estadoReporte == "Incompleta") {
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == row.id_EntregaRacion).estadoReporte = "Justificada";
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == row.id_EntregaRacion).colorEstado = "#ffd400";
    }
    this.updateData(row, numSemana);
  }

  updateData(row: any, numSemana: number) {
    this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == row.id_EntregaRacion).justificacion = row.justificacion;
    this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == row.id_EntregaRacion).pathDocumentoContrato = row.pathDocumentoContrato;
    this.addHistoryId(row.id_EntregaRacion, row.complementosPreparados, numSemana);
  }

  onComplementosPreparados(item: any, numSemana: number) {
    if (item.complementosPreparados > item.complementosAsignados) {
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte = "Completa";
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).colorEstado = "#009922";
    } else if (item.complementosPreparados < item.complementosAsignados && this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte != "Justificada" && (this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).justificacion == null || this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).justificacion == '')) {
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte = "Incompleta";
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).colorEstado = "#ff9100";
      this.yaCargoAprobaciones[numSemana] = false;
    } else if (item.complementosPreparados < item.complementosAsignados && this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte != "Justificada" && (this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).justificacion != null && this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).justificacion != '')) {
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte = "Justificada";
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).colorEstado = "#ffd400";
    } else if (item.complementosPreparados == item.complementosAsignados) {
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).estadoReporte = "Completa";
      this.complementosBySemana[numSemana].find(element => element.id_EntregaRacion == item.id_EntregaRacion).colorEstado = "#009922";
    }
    this.updateEggState(numSemana);
    this.addHistoryId(item.id_EntregaRacion, item.complementosPreparados, numSemana);
  }

  addHistoryId(id: number, value: number, numSemana: number) {
    if (this.arrayOfMaps[numSemana]) {
      this.arrayOfMaps[numSemana].set(id, value);
    } else {
      this.arrayOfMaps[numSemana] = new Map();
      this.arrayOfMaps[numSemana].set(id, value);
    }
    this.validSaveButton(numSemana);
  }

  validSaveButton(numSemana: number) {
    this.validButton[numSemana] = true;
    for (let value of this.arrayOfMaps[numSemana].values()) {
      if (value == null) {
        this.validButton[numSemana] = false;
      }
    }
  }

  updateRowData(row_obj: EntregasRacionesExtendModel) {

    this.entregasRacionesService.updateEntregasComplementos(row_obj).subscribe(
      (response) => {
      },
      (err) => {
      }
    );
  }

  addEvent(index: number): void {
    var i: number;
    var dia = new Date();
    this.dataArray[index].events = [];
    for (i = 0; i <= this.dataArray[index].dias_pae.length - 1; i++) {
      dia = new Date(this.dataArray[index].dias_pae[i].fecha);
      this.dataArray[index].events = [
        ...this.dataArray[index].events,
        {
          start: dia,
          color: colors.red,
          draggable: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  fillTableAprobaciones(numSemana: number) {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this.aprobacionesService.getAprobacionesListFull().subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosAprobaciones.getGetAprobacionesGetAllWithRelList().subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response.filter(item => item.id_Secciones === 12);

                this.dataArrayAprobaciones.forEach(element => {

                  element.fecha = this.dataArrayAprobaciones.find(user => user.id == element.id).fechaAprobacion;
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;

                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator2.toArray()[numSemana - 1];
                this.paginator2.toArray()[numSemana - 1]._intl.itemsPerPageLabel = "Registros por página";
                this.paginator2.toArray()[numSemana - 1]._intl.nextPageLabel = "Siguiente";
                this.paginator2.toArray()[numSemana - 1]._intl.previousPageLabel = "Anterior";
                this.paginator2.toArray()[numSemana - 1]._intl.firstPageLabel = "Primero";
                this.paginator2.toArray()[numSemana - 1]._intl.lastPageLabel = "Último";
                this.paginator2.toArray()[numSemana - 1]._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                  const start = page * pageSize + 1;
                  const end = (page + 1) * pageSize;
                  return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
                };
                this.dataSourceAprobaciones.sort = this.sort;
              },
              (err) => {
              }
            );
          },
          (err) => {
          }
        );

      },
      (err) => {
      }
    );

  }
  mensaje(numSemana: number) {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
        '<p style="text-align: center; font-size: 13px; color:#005ACA;";">Confirmar Aprobaciones del Operador: </p> ' +
        ` <div style="text-align: center; font-size: 13px; color:#005ACA; font-weight: 700;">${'Seguimiento complementos entregados por semana'}</div> ` +
        '<p style="text-align: center; font-size: 13px; color:#005ACA;";">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.isSaveAndApprove[numSemana] = false;
        this.aprobaciones(numSemana)
      }
    })
  }

  joinRoom(item) {
    if (item.id === 1) {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {

        this.form.controls['observaciones'].setValue(' ');
      }
    } else {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {

        this.form.controls['observaciones'].setValue(' ');
      }
    }
  }
  aprobaciones2(numSemana: number) {



    if (this.aprobar[0].value.observaciones == ' ') {
      this.AprobacionObject.observaciones = 'Nada'
    } else {
      this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones ? this.aprobar[0].value.observaciones : "Nada";
    }
    this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion ? this.aprobar[0].value.accionAprobacion : 1;
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = this.idETC;
    this.AprobacionObject.id_Secciones = 12;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 12;
    this.AprobacionObject.ubicacionOrigen = this.idContrato + ' ' + this.idSede + ' ' + this.ano + ' ' + this.mes + ' ' + this.idJornada + ' ' + numSemana;
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.AprobacionObject.plazoPorAprobar = new Date();
    this.AprobacionObject.fechaAprobacion = null;


    if (this.AprobacionesList == '') {
      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones(numSemana)
          this.llamaraprobaciones(numSemana);
          this.clearForm()
          this.lista = []
          this.yaCargoAprobaciones[numSemana] = false;
        },
        (err) => {
        }
      );
    } else {
      //this.AprobacionObject.id = this.lista[0][0].id
      this.AprobacionObject.id = this.lista[0][0].id;
      this.AprobacionObject.iD_ETC = this.lista[0][0].iD_ETC;
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion ? this.aprobar[0].value.accionAprobacion : 1;
      this.AprobacionObject.id_Secciones = this.lista[0][0].id_Secciones;
      this.AprobacionObject.documentoParaAprobar = this.lista[0][0].documentoParaAprobar;
      this.AprobacionObject.fecha = this.lista[0][0].fecha;
      this.AprobacionObject.fechaAprobacion = null
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Nada'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones ? this.aprobar[0].value.observaciones : "Nada";
      }

      this.AprobacionObject.id_Ubicacion = this.lista[0][0].id_Ubicacion;
      this.AprobacionObject.ubicacionOrigen = this.lista[0][0].ubicacionOrigen;



      this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(

        (response) => {

          this.fillTableAprobaciones(numSemana)
          this.llamaraprobaciones(numSemana)
          this.clearForm()
          this.lista = []
          this.yaCargoAprobaciones[numSemana] = false;
        },
        (err) => {
        }
      );
    }
  }
  llamaraprobaciones(numSemana:any){
    this.lista=[]
    this.aprobacionesService.getAprobacionesList().subscribe(
      (response: any) => {

        let p = response.filter(item => item.ubicacionOrigen === this.idContrato + ' ' + this.idSede + ' ' + this.ano + ' ' + this.mes + ' ' + this.idJornada + ' ' + numSemana);
        this.AprobacionesList = p.filter(item => item.id_Secciones === 12);
        this.lista.push(this.AprobacionesList);
      },
      (err) => {
      }
    );
  }

  aprobaciones(numSemana: number) {
    if (this.aprobar[0].value.observaciones == ' ') {
      this.AprobacionObject.observaciones = 'Nada'
    } else {
      this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones ? this.aprobar[0].value.observaciones : "Ninguna";
    }
    this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion ? this.aprobar[0].value.accionAprobacion : 1;
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = this.idETC;
    this.AprobacionObject.id_Secciones = 12;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 12;
    this.AprobacionObject.ubicacionOrigen = this.idContrato + ' ' + this.idSede + ' ' + this.ano + ' ' + this.mes + ' ' + this.idJornada + ' ' + numSemana;
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.AprobacionObject.plazoPorAprobar = new Date();
    this.AprobacionObject.fechaAprobacion = null;

    
    if (this.AprobacionesList == '') {
      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones(numSemana)
          this.clearForm()
          
          this.yaCargoAprobaciones[numSemana] = false;
          let estado = 0;
          if (this.AprobacionObject.iD_AccionAprobacion == 1) {
            estado = 4;
          } else if (this.AprobacionObject.iD_AccionAprobacion == 7) {
            estado = 0;
          }
          this.cantAprobaciones=0;
          this._PA_ActualizaAprobacionSemanaService.getPA_ActualizaAprobacionSemanaList(this.ano, this.mes, numSemana, this.idSede, this.idJornada, estado).subscribe(
            (response) => {

              this.fillTabs()
              
            },
            (err) => {
            }
          )
        },
        (err) => {
        }
      );
    } else {
      //this.AprobacionObject.id = this.lista[0][0].id

      this.AprobacionObject.id = this.lista[0][0].id;
      this.AprobacionObject.iD_ETC = this.lista[0][0].iD_ETC;
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion ? this.aprobar[0].value.accionAprobacion : 1;
      this.AprobacionObject.id_Secciones = this.lista[0][0].id_Secciones;
      this.AprobacionObject.documentoParaAprobar = this.lista[0][0].documentoParaAprobar;
      this.AprobacionObject.fecha = this.lista[0][0].fecha;
      this.AprobacionObject.fechaAprobacion = new Date()
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Nada'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }

      this.AprobacionObject.id_Ubicacion = this.lista[0][0].id_Ubicacion;
      this.AprobacionObject.ubicacionOrigen = this.lista[0][0].ubicacionOrigen;


      this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(

        (response) => {

          this.fillTableAprobaciones(numSemana)
          this.clearForm()
   
          let estado = 0;
          this.yaCargoAprobaciones[numSemana] = false;
          if (this.AprobacionObject.iD_AccionAprobacion == 1) {
            estado = 4;
          } else if (this.AprobacionObject.iD_AccionAprobacion == 7) {
            estado = 0;
          }
          this.cantAprobaciones=0;
          this._PA_ActualizaAprobacionSemanaService.getPA_ActualizaAprobacionSemanaList(this.ano, this.mes, numSemana, this.idSede, this.idJornada, estado).subscribe(
            (response) => {

              this.fillTabs()
            },
            (err) => {
            }
          )
        },
        (err) => {
        }
      );
    }
  }
  clearForm() {
    this.form.reset({
      'observaciones': '',
      'accionAprobacion': '',
    });
  }
  getAcciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionesList = response;
        this.AccionesAprobacionesList.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
      (err) => {
      }
    );
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
