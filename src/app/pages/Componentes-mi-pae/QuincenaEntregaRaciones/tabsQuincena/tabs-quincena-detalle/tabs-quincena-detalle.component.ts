import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { throwError } from "rxjs";
import { CalendarEvent, CalendarNativeDateFormatter, CalendarView, DateFormatterParams, } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Guid } from 'guid-typescript';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as saveAs from 'file-saver';
import { GradosModel } from 'src/app/shared/model/Grados';
import { TiposReporteEntregaModel } from 'src/app/shared/model/TiposReporteEntrega';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { TiposReporteEntregaService } from 'src/app/shared/services/TiposReporteEntrega.services';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { GradosService } from 'src/app/shared/services/Grados.services'
import { EntregasComplementosService } from 'src/app/shared/services/EntregasComplementos.services';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { EntregasRacionesExtendModel } from 'src/app/shared/model/EntregasRacionesExtend';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import * as moment from 'moment';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { EntregasComplementosModel } from 'src/app/shared/model/EntregasComplementosModel';
import { diasPaeListModel } from 'src/app/shared/model/diasPaeList';
import { datosCompletosListModel } from 'src/app/shared/model/datosCompletosList';
import { QuincenaEntregaRacionesExtendModel } from 'src/app/shared/model/QuincenaEntregaRacionesExtend';
import { QuincenaEntregaRacionesModel } from 'src/app/shared/model/QuincenaEntregaRaciones';
import { fechasQuincenaListModel } from 'src/app/shared/model/fechasQuincenaList';
import { QuincenaEntregaRacionesExtendService } from 'src/app/shared/services/QuincenaEntregaRacionesExtend.services';
import { QuincenaEntregaRacionesService } from 'src/app/shared/services/QuincenaEntregaRaciones.services';

registerLocaleData(localeEs);

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

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(date);
  }

}

@Component({
  selector: 'app-tabs-quincena-detalle',
  templateUrl: './tabs-quincena-detalle.component.html',
  styleUrls: ['./tabs-quincena-detalle.component.scss']
})
export class TabsQuincenaDetalleComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  nombreETC = environment.nameETC;
  idETC = environment.idETC;
  nombreOperador = environment.nombreOperador;
  idOperador = environment.nombreOperador;
  displayedColumns: string[] = ['fechaEntrega', 'racionesDiarias', 'complementosPreparadas', 'nombreTipoReporte', 'justificacion'];
  displayedColumns2: string[] = ['fechaEntrega', 'racionesDiarias', 'complementosPreparadas', 'nombreTipoReporte', 'justificacion'];
  public dataSource!: MatTableDataSource<EntregasRacionesExtendModel>;
  selection = new SelectionModel<EntregasRacionesExtendModel>(true, []);
  ngOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  viewDate: Date = new Date();
  activeDayIsOpen = true;
  view = 'month';
  checked = true;
  varDiasPAE = '';
  varDiasPAE2 = '';
  varTotalDiasPae = 0;
  varRacionesDiariasAPreparar = 0;
  varRacionesDiariasAlmuerzo = 0;
  varRacionesDiariasComplemento = 0;
  varTotalRacionesProgramadas = 0;
  varTotalRacionesPreparadas = 0;
  varTotalRacionesNoPreparadas = 0;
  varEstadoQuincena = '';
  varDiasPAEH = '';
  varTotalDiasPaeH = 0;
  varRacionesDiariasAPrepararH = 0;
  varRacionesDiariasAlmuerzoH = 0;
  varRacionesDiariasComplementoH = 0;
  varTotalRacionesProgramadasH = 0;
  varTotalRacionesPreparadasH = 0;
  varTotalRacionesNoPreparadasH = 0;
  varEstadoQuincenaH = '';
  idSedeJornada = 0;
  idContrato = 0;
  diasPaeList: diasPaeListModel[];
  datosCompletosList: datosCompletosListModel[];
  datosCompletosListH: datosCompletosListModel[];
  pahtArchivo = '';
  GradosList: GradosModel[];
  selGrado = 0;
  TiposReporteEntregaList: TiposReporteEntregaModel[];
  selTiposReporteEntrega = 0;
  idQuincenaEntregaRacion = 0;
  id_operador = Number(localStorage.getItem('IdUbicacion'));
  datosEntregaList: EntregasRacionesExtendModel[];
  datosEntregaListTotal: EntregasRacionesExtendModel[];
  numResultado: number = 0;
  fechaConv: any;
  estado: number;
  selArchivo: string = '';
  datosActualesQuincenaEntregaRaciones: QuincenaEntregaRacionesExtendModel;
  ultimaFechaArchivo: Date;
  selEstadoQuincena = 6;
  datosQuincenaEntregaRaciones: QuincenaEntregaRacionesModel;
  fechaQuincenaList: fechasQuincenaListModel[] = [];
  ConvertDateBegin: Date = null;
  ConvertDateEnd: Date = null;
  myDatepipe!: any;
  selQuincena = '';
  filtrado = false;
  filtradoH = false;
  incompleta = true;
  QuincenaEntregaRacionesList: QuincenaEntregaRacionesModel[];

  feQH = '';
  GradosSedesJornadasListBySede: GradosSedesJornadasModel[];
  /* aprobaciones  */
  yaCargoAprobaciones = false
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  form: FormGroup;
  aprobar = [];
  lista = [];
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
    plazoPorAprobar: new Date(),
  };
  EntregasRacionesObject: EntregasComplementosModel = {
    id: 0,
    iD_SemanaEntregaComplemento: 0,
    sID_SemanaEntregaComplemento: '',
    iD_TipoReporteEntrega: 0,
    sID_TipoReporteEntrega: '',
    fechaEntrega: undefined,
    complementosPreparadas: 0,
    auditoria: '',
    justificacion: '',
    pathDocumentoContrato: '',
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
  selectedTabIndex: number;
  idTabs = 0;
  sedeActual: SedesJornadaModel[];
  nombreSede: string;
  nombrejornada: string;
  nombreInstituc: string;
  isEdit: boolean = false;
  // Error handling
  // clase global de control de errores denominada errorHandler que proporciona un gancho para el control centralizado de excepciones dentro de la aplicación
  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'Error en Cliente: ' + error.error.message;
    } else {
      // Get server-side error
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error en Server Code: ${error.status}\nMensaje: ${error.message}`;
    }
    this.messageService.showInfo(errorMessage, 'top center');
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError('Algo malo sucedió; inténtelo de nuevo más tarde.' + errorMessage);
  }

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).substr(0, 1);
  }

  constructor(private router: ActivatedRoute,
    public QuincenaEntregaRacionesExtendService: QuincenaEntregaRacionesExtendService,
    public RepositorioExtendServices: RepositoriosExtendService,
    public messageService: MessageService, private route: Router,
    private cdr: ChangeDetectorRef,
    public GradosService: GradosService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    private datepipe: DatePipe,
    public TiposReporteEntrega: TiposReporteEntregaService,
    public dialog: MatDialog,
    public EntregasRacionesService: EntregasComplementosService, public fechaPi: DatePipe,
    private fb: FormBuilder,
    private aprobacionesService: AprobacionesService,
    private AccionesAprobacionService: AccionesAprobacionService,
    private serviciosAprobaciones: AprobacionesGetAllWithRelService,
    private seguridadService: SeguridadService,
    private quincenaEntregaRacionesService: QuincenaEntregaRacionesService,
    private sedeJornadaService: SedesJornadaService


  ) {
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);

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
    this.myDatepipe = datepipe;
    this.QuincenaEntregaRacionesExtendService.getFechasQuincenaHistorico(this.id_operador).subscribe(
      (response: any) => {
        this.fechaQuincenaList = response;

      },
      (err) => {

      }
    );
    this.cdr.markForCheck();
    this.router.queryParams.subscribe(params => {
      this.idSedeJornada = +params.id;
      this.idContrato = +params.idContrato;
      this.estado = +params.estado;


      this.idTabs = +params.tab;
      if (this.idTabs === 1) {
        this.selectedTabIndex = this.idTabs;
      } else if (this.idTabs === 0) {
        this.selectedTabIndex = this.idTabs;
      } else {

      }

      this.sedeJornadaService.getSedesJornadaListRelationFilterById(this.idSedeJornada).subscribe(
        (response: any) => {
          this.sedeActual = response;
        },
        (err) => {
        }
      );

    });
    this.QuincenaEntregaRacionesExtendService.getDiasPaeList().subscribe(
      (response: any) => {
        this.diasPaeList = response;
        this.activeDayIsOpen = false;
        this.addEvent();
        this.varTotalDiasPae = this.diasPaeList.length;
        this.varTotalDiasPaeH = this.diasPaeList.length;
      },
      (err) => {

      }
    );
    this.fillDatosTable();
    this.fechaConv = fechaPi;
  }

  events: CalendarEvent[] = [
  ];

  addEvent(): void {
    var i: number;
    var dia = new Date();
    for (i = 0; i <= this.diasPaeList.length - 1; i++) {
      dia = new Date(this.diasPaeList[i].id);
      this.events = [
        ...this.events,
        {
          title: 'New event',
          start: dia,
          color: colors.red,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
  }

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  fillDatosTable() {
    this.QuincenaEntregaRacionesExtendService.getDatosCompletosList(this.idSedeJornada, this.idContrato).subscribe(
      (response: any) => {
        this.datosCompletosList = response;
        this.varDiasPAE = this.datosCompletosList[0].quincena;
        var temp = this.varDiasPAE.split(' ');
        this.varDiasPAE2 = Array.from(new Set(temp)).join(' ');
        this.varRacionesDiariasAPreparar = this.datosCompletosList[0].racionesDiariasaPreparar == null ? 0 : this.datosCompletosList[0].racionesDiariasaPreparar;
        this.varRacionesDiariasAlmuerzo = this.datosCompletosList[0].racionesDiariasAlmuerzo == null ? 0 : this.datosCompletosList[0].racionesDiariasAlmuerzo;
        this.varRacionesDiariasComplemento = this.datosCompletosList[0].racionesDiariasComplemento == null ? 0 : this.datosCompletosList[0].racionesDiariasComplemento;
        this.varTotalRacionesNoPreparadas = this.datosCompletosList[0].totalRacionesNoPreparadas == null ? 0 : this.datosCompletosList[0].totalRacionesNoPreparadas;
        this.varTotalRacionesPreparadas = this.datosCompletosList[0].totalRacionesPreparadas == null ? 0 : this.datosCompletosList[0].totalRacionesPreparadas;
        this.varTotalRacionesProgramadas = this.datosCompletosList[0].totalRacionesProgramadas == null ? 0 : this.datosCompletosList[0].totalRacionesProgramadas;
        this.varEstadoQuincena = this.datosCompletosList[0].estadoQuincena == null ? 'Pendiente' : this.datosCompletosList[0].estadoQuincena;
      },
      (err) => {

      }
    );
  }
  ngOnInit(): void {

    this.nombrejornada = localStorage.getItem('qrjor');
    this.nombreInstituc = localStorage.getItem('qri');
    this.nombreSede = localStorage.getItem('qrse');
    this.selQuincena = localStorage.getItem('feQH');
    this.traeGrado();
    this.traeGradoSedeJornada();
    this.traeTipoReporteEntrega();
    this.fillTable();
    this.fillTableAprobaciones();
  }

  actualizaEstadoQuincena(estado: number) {
    this.QuincenaEntregaRacionesList.filter(element => element.iD_Contrato == this.idContrato).forEach(result => {
      result.iD_EstadoQuincena = estado;
      this.quincenaEntregaRacionesService.updateQuincenaEntregaRaciones(result).subscribe(
        (response: any) => {

        },
        (err) => {

        }
      );
    })

  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  Regresar() {
    //this.router.navigateByUrl('/apps/QuincenaEntregaRaciones')
  }
  RegresarQuicena() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('qrjor');
    localStorage.removeItem('qri');
    localStorage.removeItem('qrse');
    localStorage.removeItem('feQH');
    this.route.navigateByUrl('/QuincenaEntregaRaciones')
  }
  setView(view: CalendarView): void {
    this.view = view;
  }
  cargarReporteQuincenal(idC: number, idGSJ: number) {
  }

  traeGrado(): void {
    this.GradosService.getGradosListFull().subscribe(
      (response: any) => {
        this.GradosList = response;
      },
      (err) => {

      }
    );
  }
  traeGradoSedeJornada(): void {
    this.gradosSedesJornadasService.getGradosSedesJornadasListRelationFilter(this.idSedeJornada).subscribe(
      (response: any) => {

        this.GradosSedesJornadasListBySede = response;

        this.quincenaEntregaRacionesService.getQuincenaEntregaRacionesList().subscribe(
          (response: any) => {
            this.QuincenaEntregaRacionesList = response;
            this.buscarSedeTotal();

          },
          (err) => {

          }
        );
      },
      (err) => {

      }
    );
  }

  traeTipoReporteEntrega(): void {
    this.TiposReporteEntrega.getTiposReporteEntregaListFull().subscribe(
      (response: any) => {
        this.TiposReporteEntregaList = response;
      },
      (err) => {

      }
    );
  }

  actualizaQuincenaEntregaRacionArchivo(_QuincenaEntregaRacion: QuincenaEntregaRacionesModel): void {


    _QuincenaEntregaRacion.auditoria = "(RolBase:" + localStorage.getItem("RolBase") + "," +
      "RolPersonalizado:" + localStorage.getItem("RolPersonalizado") + "," +
      "NombreUsuario:" + localStorage.getItem("NombreUsuario") + "," +
      "Ubicacion:" + localStorage.getItem("Ubicacion") + "," +
      "IpPublica:" + localStorage.getItem("IpPublica") + "," +
      "Accion:" + "Actualizar" + "," +
      "Browser:" + localStorage.getItem("Browser") + "," +
      "NombreMaquina:" + localStorage.getItem("NombreMaquina") + ")";
    _QuincenaEntregaRacion._usuario = localStorage.getItem('NombreUsuario');
    _QuincenaEntregaRacion._accion = "Adicionar";
    _QuincenaEntregaRacion._ippublica = localStorage.getItem('IpPublica');
    _QuincenaEntregaRacion._browser = localStorage.getItem("Browser");
    _QuincenaEntregaRacion._nombremaquina = localStorage.getItem("NombreMaquina");
    _QuincenaEntregaRacion._sessionid = localStorage.getItem("Ubicacion");



    this.QuincenaEntregaRacionesExtendService.updateQuincenaEntregaRaciones(_QuincenaEntregaRacion).subscribe(
      (response: any) => {
        this.datosQuincenaEntregaRaciones = response;
        this.ultimaFechaArchivo = this.datosQuincenaEntregaRaciones.fechaCarga;
      },
      (err) => {

      }
    );
  }

  traeFechaArchivoQuincenal(id: number): void {
    if (id != null) {
      this.QuincenaEntregaRacionesExtendService.getQuincenaEntregaRaciones(id).subscribe(
        (response: any) => {
          this.datosQuincenaEntregaRaciones = response;

          this.ultimaFechaArchivo = this.datosQuincenaEntregaRaciones?.fechaCarga;

        },
        (err) => {

        }
      );
    }
  }

  buscarSedeTotal() {
    this.datosEntregaListTotal = [];
    this.GradosSedesJornadasListBySede.forEach(element => {
      this.QuincenaEntregaRacionesExtendService.getDatosEntregaRacionesList(this.idContrato, this.id_operador, this.varRacionesDiariasAPreparar, this.idSedeJornada, element.iD_Grado, this.selTiposReporteEntrega).subscribe(
        (response: any) => {
          this.datosEntregaListTotal = this.datosEntregaListTotal.concat(response);

          if (this.datosEntregaListTotal.length > 0) {
            if (element == this.GradosSedesJornadasListBySede[this.GradosSedesJornadasListBySede.length - 1]) {
              if (this.datosEntregaListTotal.find(element => element.nombreTipoReporte == 'Por diligenciar') || this.datosEntregaListTotal.find(element => element.nombreTipoReporte == null)) {
                this.incompleta = true;
                if (this.estado != 2) {
                  this.estado = 2
                  this.actualizaEstadoQuincena(6);
                }
              } else {
                this.incompleta = false;
                if (this.estado != 1 && this.estado != 0) {
                  if (this.estado != 3) {
                    this.estado = 3 //Por aprobar
                    this.actualizaEstadoQuincena(4);
                  }
                  this.AbrirAprobaciones(Number(localStorage.getItem('IdUbicacion')));

                }
              }
            }
          }
        },
        (err) => {

        }
      );
    });
  }
  estadoJustificacionList = [{ value: 1, label: 'No aplica ' }, { value: 2, label: 'Redactar justificación' }, { value: 3, label: 'Ver justificación' }, { value: 4, label: '' }];
  coloresList = [{ value: 1, label: 'yellow' }, { value: 2, label: 'green' }, { value: 3, label: 'red' }, { value: 4, label: '#E2E6FE' }];
  buscarSedes(id_SedeJornada: number, id_Grado: number): void {
    this.filtrado = true;


    this.QuincenaEntregaRacionesExtendService.getDatosEntregaRacionesList(this.idContrato, this.id_operador, this.varRacionesDiariasAPreparar, id_SedeJornada, id_Grado, this.selTiposReporteEntrega).subscribe(
      (response: any) => {
        this.datosEntregaList = response;

        for (let datosEntrega in this.datosEntregaList) {
          //this.datosEntregaList[datosEntrega].fechaEntrega = this.fechaConv.transform(this.datosEntregaList[datosEntrega].fechaEntrega,'dd-MMM-yyyy')
          this.datosEntregaList[datosEntrega].nombreTipoReporte = this.traeNombreTipoReporte(this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega);
          //formatear la fecha
          this.datosEntregaList[datosEntrega].select = false
          if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 3) {

            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[0].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[0].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[1].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[1].label;
          } else if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 4 && this.datosEntregaList[datosEntrega].justificacion == '') {
            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[1].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[1].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[2].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[2].label;
          }
          else if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 1) {
            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[3].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[3].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[3].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[3].label;

          } else if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 6 && this.datosEntregaList[datosEntrega].justificacion == '') {
            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[1].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[1].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[0].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[0].label;
          }
          else if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 6 && this.datosEntregaList[datosEntrega].justificacion != '') {
            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[2].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[2].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[0].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[0].label;
          }
          else if (this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega == 4 && this.datosEntregaList[datosEntrega].justificacion != '') {
            this.datosEntregaList[datosEntrega].iD_justificacion = this.estadoJustificacionList[2].value;
            this.datosEntregaList[datosEntrega].siD_justificacion = this.estadoJustificacionList[2].label;
            this.datosEntregaList[datosEntrega].iD_Color = this.coloresList[2].value;
            this.datosEntregaList[datosEntrega].siD_Color = this.coloresList[2].label;
          }
          if (this.datosEntregaList[datosEntrega].id === null) {

            let g = this.datosEntregaList.filter(item => item.id === null)
            g.map((item, idx = 1) => {
              item.id = idx * -1
            });

          } else { }


        }


        this.idQuincenaEntregaRacion = this.datosEntregaList[0] ? this.datosEntregaList[0].iD_SemanaEntregaComplemento : this.idQuincenaEntregaRacion;
        this.isLoading = false;


        this.dataSource = new MatTableDataSource<EntregasRacionesExtendModel>(this.datosEntregaList);



        this.traeFechaArchivoQuincenal(this.idQuincenaEntregaRacion);
      },
      (err) => {

      }
    );

  }

  buscarSedesH(id_SedeJornada: number, id_Grado: number): void {
    if (this.ConvertDateBegin == null || this.ConvertDateEnd == null) {
      this.messageService.showInfo("Seleccione una quincena", 'top center');
    } else {
      this.filtradoH = true;
      this.buscarDatosH(id_SedeJornada, id_Grado);
      this.QuincenaEntregaRacionesExtendService.getDatosEntregaRacionesListH(this.idContrato, this.id_operador, this.varRacionesDiariasAPreparar, id_SedeJornada, id_Grado, this.selTiposReporteEntrega, this.ConvertDateBegin, this.ConvertDateEnd).subscribe(
        (response: any) => {
          this.datosEntregaList = response;
          for (let datosEntrega in this.datosEntregaList) {
            //this.datosEntregaList[datosEntrega].fechaEntrega = this.fechaConv.transform(this.datosEntregaList[datosEntrega].fechaEntrega,'dd-MMM-yyyy')
            this.datosEntregaList[datosEntrega].nombreTipoReporte = this.traeNombreTipoReporte(this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega);
            //formatear la fecha
          }
          this.idQuincenaEntregaRacion = this.datosEntregaList[0].iD_SemanaEntregaComplemento;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<EntregasRacionesExtendModel>(this.datosEntregaList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.traeFechaArchivoQuincenal(this.idQuincenaEntregaRacion);
        },
        (err) => {

        }
      );
    }
  }

  buscarDatosH(id_SedeJornada: number, id_Grado: number): void {



    if (this.ConvertDateBegin === null && this.ConvertDateEnd === null) {
      this.ConvertDateBegin = this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == this.selQuincena).fechaInicio, 'yyyy-MM-dd');
      this.ConvertDateEnd = this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == this.selQuincena).fechaFin, 'yyyy-MM-dd');
    }
    this.QuincenaEntregaRacionesExtendService.getDatosCompletosListH(this.idSedeJornada, this.idContrato, this.ConvertDateBegin, this.ConvertDateEnd).subscribe(
      (response: any) => {
        this.datosCompletosListH = response;
        this.varDiasPAEH = this.datosCompletosListH[0].quincena;
        this.varRacionesDiariasAPrepararH = this.datosCompletosListH[0].racionesDiariasaPreparar == null ? 0 : this.datosCompletosListH[0].racionesDiariasaPreparar;
        this.varRacionesDiariasAlmuerzoH = this.datosCompletosListH[0].racionesDiariasAlmuerzo == null ? 0 : this.datosCompletosListH[0].racionesDiariasAlmuerzo;
        this.varRacionesDiariasComplementoH = this.datosCompletosListH[0].racionesDiariasComplemento == null ? 0 : this.datosCompletosListH[0].racionesDiariasComplemento;
        this.varTotalRacionesNoPreparadasH = this.datosCompletosListH[0].totalRacionesNoPreparadas == null ? 0 : this.datosCompletosListH[0].totalRacionesNoPreparadas;
        this.varTotalRacionesPreparadasH = this.datosCompletosListH[0].totalRacionesPreparadas == null ? 0 : this.datosCompletosListH[0].totalRacionesPreparadas;
        this.varTotalRacionesProgramadasH = this.datosCompletosListH[0].totalRacionesProgramadas == null ? 0 : this.datosCompletosListH[0].totalRacionesProgramadas;
        this.varEstadoQuincenaH = this.datosCompletosListH[0].estadoQuincena == null ? 'Pendiente' : this.datosCompletosListH[0].estadoQuincena;
      },
      (err) => {

      }
    );
  }

  fillTable(): void {
    this.QuincenaEntregaRacionesExtendService.getDatosEntregaRacionesListAll().subscribe(
      (response: any) => {
        this.datosEntregaList = response;
        for (let datosEntrega in this.datosEntregaList) {
          //this.datosEntregaList[datosEntrega].fechaEntrega = this.fechaConv.transform(this.datosEntregaList[datosEntrega].fechaEntrega,'dd-MMM-yyyy')
          this.datosEntregaList[datosEntrega].nombreTipoReporte = this.traeNombreTipoReporte(this.datosEntregaList[datosEntrega].iD_TipoReporteEntrega);
          //formatear la fecha
        }
        this.idQuincenaEntregaRacion = this.datosEntregaList[0].iD_SemanaEntregaComplemento;
        this.isLoading = false;
        this.traeFechaArchivoQuincenal(this.idQuincenaEntregaRacion);
      },
      (err) => {

      }
    );
  }

  traeNombreTipoReporte(iD_TipoReporteEntrega: number) {
    for (let tipos in this.TiposReporteEntregaList) {
      if (this.TiposReporteEntregaList[tipos].id === iD_TipoReporteEntrega) {
        return this.TiposReporteEntregaList[tipos].nombre;
        break;
      }
    }
    return null;
  }


  public onFileSelected(File: string | any[]): void {


    if (this.selGrado > 0) {
      if (File[0]) {
        const fileupload = File[0] as File;
        const formData = new FormData();
        formData.append('file', fileupload);
        let _fileUpload: fileUploadModel;
        let nombrerepo = Guid.create().toString();
        nombrerepo = nombrerepo + '.' + fileupload.name.split('.').pop();
        _fileUpload = { file: formData, fileName: nombrerepo, cnx: environment.cnxBS, container: environment.containerBS };
        this.addFileBlobRepositorios(_fileUpload);
      }
    }
    else {
      Swal.fire({
        title: 'Información',
        icon: 'info',
        html:
          'Debe realizar la busqueda previamente por grado escolar para poder cargarle un archivo a esta quincena, por favor verifique',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          'Gracias',
        confirmButtonAriaLabel: '',
        cancelButtonText:
          '',
        cancelButtonAriaLabel: ''
      })
    }

  }

  traeQuincenaEntregaRaciones(id: number): any {
    this.QuincenaEntregaRacionesExtendService.getQuincenaEntregaRaciones(id).subscribe(
      (response: any) => {
        this.datosQuincenaEntregaRaciones = response;
        this.datosQuincenaEntregaRaciones.pathReporteQuincenal = this.pahtArchivo;
        this.datosQuincenaEntregaRaciones.fechaCarga = new Date();

        this.actualizaQuincenaEntregaRacionArchivo(this.datosQuincenaEntregaRaciones);
      },
      (err) => {

      }
    );
  }


  addFileBlobRepositorios(fileUpload): void {
    this.RepositorioExtendServices.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.pahtArchivo = String.fromCharCode.apply(null, new Uint8Array(response));
        this.traeQuincenaEntregaRaciones(this.idQuincenaEntregaRacion);
      },
      (err) => {

      }
    );
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogtabsquincenadetalleContent, {
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
  addRowData(row_obj: EntregasRacionesExtendModel): void {



    this.datosEntregaList.map(function (dato) {


      if (dato.id == row_obj.id) {
        dato.justificacion = row_obj.justificacion;
        dato.pathDocumentoContrato = row_obj.pathDocumentoContrato;

        if (dato.iD_justificacion === 2) {
          dato.iD_justificacion = 3
          dato.siD_justificacion = 'Ver justificación'
        }

      }

      return dato;
    });


    this.dataSource = new MatTableDataSource<EntregasRacionesExtendModel>(this.datosEntregaList);


  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: EntregasRacionesExtendModel): boolean | any {
    row_obj.pathDocumentoContrato = row_obj.pathDocumentoContrato ? row_obj.pathDocumentoContrato : "-";

    this.EntregasRacionesService.updateEntregasComplementos(row_obj).subscribe(
      (response) => {

        this.buscarSedes(this.idSedeJornada, this.selGrado);
        this.buscarSedeTotal();
        this.fillDatosTable();
      },
      (err) => {

      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: EntregasRacionesExtendModel): boolean | any {
    const ideliminar = row_obj.id;

    this.EntregasRacionesService.deleteEntregasComplementos(ideliminar).subscribe(
      (response) => {

        this.buscarSedes(this.idSedeJornada, this.selGrado);
        this.buscarSedeTotal();
      },
      (err) => {

      }
    );

  }


  traeDatos(quincena: string) {




    this.ConvertDateBegin = this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == quincena).fechaInicio, 'yyyy-MM-dd');
    this.ConvertDateEnd = this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == quincena).fechaFin, 'yyyy-MM-dd');


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

  fillTableAprobaciones() {
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
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }

                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;

                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator;
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
  mensaje() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="float: right !important; height: 30px; position: absolute; top:15px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
        '<p style="text-align: center; font-size: 13px; color:#005ACA;">Confirmar aprobación del Operador: </p> ' +
        ` <div style="text-align: center; font-size: 13px; color:#005ACA; font-weight: 700;">${'Complementos entregados por grado'}</div> ` +
        '<p style="text-align: center; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir) </p> ',
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
        this.aprobaciones()
      }
    })
  }

  joinRoom(item) {
    this.form.controls['accionAprobacion'].setValue(item.id);
  }

  AbrirAprobaciones(id: any): void {
    this.yaCargoAprobaciones = true;
    localStorage.setItem('idp', id)
    this.aprobacionesService.getAprobacionesList().subscribe(
      (response: any) => {
        this.AprobacionesList = response.filter(item => item.ubicacionOrigen == Number(localStorage.getItem('idp')));
        this.lista.push(this.AprobacionesList)

      },
      (err) => {
      }
    );

  }
  aprobaciones() {




    this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
    this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = this.idETC;
    this.AprobacionObject.id_Secciones = 12;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 1;
    this.AprobacionObject.ubicacionOrigen = localStorage.getItem('idp')
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';


    if (this.AprobacionesList == '') {
      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones()
          this.clearForm()
          this.lista = []
          this.yaCargoAprobaciones = false
          if (this.AprobacionObject.iD_AccionAprobacion == 1) {
            this.estado = 1; //Aprobado
            this.actualizaEstadoQuincena(1);
          } else if (this.AprobacionObject.iD_AccionAprobacion == 7) {
            this.estado = 0; //Rechazado
            this.actualizaEstadoQuincena(3);
          }
        },
        (err) => {
        }
      );
    } else {
      this.AprobacionObject.id = this.lista[0][0].id
      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {


          this.fillTableAprobaciones()
          this.clearForm()
          this.lista = []
          this.yaCargoAprobaciones = false
          if (this.AprobacionObject.iD_AccionAprobacion == 1) {
            this.estado = 1; //Aprobado
            this.actualizaEstadoQuincena(1);
          } else if (this.AprobacionObject.iD_AccionAprobacion == 7) {
            this.estado = 0; //Rechazado


            this.actualizaEstadoQuincena(3);
          }
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
  cleanFilters(): void {
    this.filtrado = false;
    this.filtradoH = false;
    this.selGrado = 0;
    this.selTiposReporteEntrega = 0;
    this.fillTable()

  }

  onEditarSedes(): void {
    this.isEdit = true;
    this.datosEntregaList.forEach(dato => {
      /* if(dato.id==null){
        this.EntregasRacionesObject.id=0;
        this.EntregasRacionesObject.fechaEntrega = dato.fechaEntrega;
      this.EntregasRacionesObject.iD_QuincenaEntregaRacion = dato.iD_QuincenaEntregaRacion;
      this.EntregasRacionesObject.iD_TipoReporteEntrega = dato.iD_TipoReporteEntrega;
      this.EntregasRacionesObject.complementosPreparadas = 0;
      this.EntregasRacionesObject.pathDocumentoContrato = dato.pathDocumentoContrato
      this.EntregasRacionesObject.justificacion = dato.justificacion;
        this.EntregasRacionesService.addEntregasRaciones(this.EntregasRacionesObject).subscribe(
          (response) => {
            this.buscarSedes(this.idSedeJornada, this.selGrado);
            this.buscarSedeTotal();
            this.fillDatosTable();
          },
          (err) => {
          }
        );
      } */

    })
  }
  onGuardarSedes(): void {
    this.saveQuincena();
    this.isEdit = false;
  }
  indices = [];
  onracionesPreparadas(event: any, element2: any) {
    this.datosEntregaList.map(function (dato) {
      if (element2.id === null) {
      } else {
        if (dato.id == element2.id) {
          dato.complementosPreparadas = event;
          dato.select = true;
        }
      }



      return dato;
    });


    this.dataSource = new MatTableDataSource<EntregasRacionesExtendModel>(this.datosEntregaList);
  }
  onTipoEntrega(event: any, element2: any) {
    this.datosEntregaList.map(function (dato) {
      if (element2.id === null) {

      } else {
        if (dato.id == element2.id) {
          dato.iD_TipoReporteEntrega = event;
          dato.select = true;
          //{value: 1, label:'No aplica'}, {value: 2, label:'Redactar justificación'}, {value: 3, label:'Ver justificación'}, {value: 4, label:''}
          //[{ value: 1, label: 'yellow' }, { value: 2, label: 'green' }, { value: 3, label: 'red' }, { value: 4, label: '#E2E6FE' }];
          if (event === 3) {
            //COMPLETA
            dato.iD_justificacion = 1;
            dato.siD_justificacion = 'No aplica';
            dato.iD_Color = 2;
            dato.siD_Color = 'green';
          } else if (event === 1) {
            //Pendiente
            dato.iD_justificacion = 4
            dato.siD_justificacion = ''
            dato.iD_Color = 4;
            dato.siD_Color = '#E2E6FE'
          }
          else if (event === 4) {
            //incompleta
            dato.iD_justificacion = 2
            dato.justificacion = ''
            dato.siD_justificacion = 'Redactar justificación'
            dato.iD_Color = 3;
            dato.siD_Color = 'red'
          }
          else if (event === 6) {
            //justificada
            dato.iD_justificacion = 2
            dato.justificacion = ''
            dato.siD_justificacion = 'Redactar justificación'
            dato.iD_Color = 1;
            dato.siD_Color = 'yellow'
          }
        }
      }


      return dato;
    });


    this.dataSource = new MatTableDataSource<EntregasRacionesExtendModel>(this.datosEntregaList);
  }
  onjustificacion(event: any, element2: any) {

  }
  saveQuincena() {
    let setrue = this.datosEntregaList.filter(item => item.select === true)

    setrue.forEach(dato => {
      this.EntregasRacionesObject.id = dato.id;
      this.EntregasRacionesObject.fechaEntrega = dato.fechaEntrega;
      this.EntregasRacionesObject.iD_SemanaEntregaComplemento = dato.iD_SemanaEntregaComplemento;
      this.EntregasRacionesObject.iD_TipoReporteEntrega = dato.iD_TipoReporteEntrega;
      this.EntregasRacionesObject.complementosPreparadas = dato.complementosPreparadas;
      this.EntregasRacionesObject.pathDocumentoContrato = dato.pathDocumentoContrato
      this.EntregasRacionesObject.justificacion = dato.justificacion;

      if (dato.id <= 0) {
        this.EntregasRacionesObject.id = 0;
        if (dato.complementosPreparadas === null) {
          this.EntregasRacionesObject.complementosPreparadas = 0;
        } else {
          this.EntregasRacionesObject.complementosPreparadas = dato.complementosPreparadas;
        }

        this.EntregasRacionesObject.iD_TipoReporteEntrega = dato.iD_TipoReporteEntrega;
        if (dato.pathDocumentoContrato === null) {
          this.EntregasRacionesObject.pathDocumentoContrato = '-'
        } else {
          this.EntregasRacionesObject.pathDocumentoContrato = dato.pathDocumentoContrato
        }
        if (dato.justificacion === null) {
          this.EntregasRacionesObject.pathDocumentoContrato = ''
        } else {
          this.EntregasRacionesObject.justificacion = dato.justificacion;
        }


        this.EntregasRacionesService.addEntregasComplementos(this.EntregasRacionesObject).subscribe(
          (response) => {
            this.buscarSedes(this.idSedeJornada, this.selGrado);
            this.buscarSedeTotal();
            this.fillDatosTable();
          },
          (err) => {
          }
        );
      } else {

        this.EntregasRacionesService.updateEntregasComplementos(this.EntregasRacionesObject).subscribe(
          (response) => {
            this.buscarSedes(this.idSedeJornada, this.selGrado);
            this.buscarSedeTotal();
            this.fillDatosTable();
          },
          (err) => {
          }
        );

      }
    });
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'tabs-quincena-detalle.dialog.component.html',
  styleUrls: ["./tabs-quincena-detalle.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogtabsquincenadetalleContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;
  fh = new Date;
  // Listas relacionales
  TiposReporteEntregaList: TiposReporteEntregaModel[];
  selIdJustificacion = 0;
  pathDocContrato = '';
  archivoContrato: File;
  contenidoRespuesta: string = '';


  constructor(public dialogRef: MatDialogRef<DialogtabsquincenadetalleContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
    , private quincenaEntregaRacionesService: QuincenaEntregaRacionesExtendService
    , private tiposReporteEntregaService: TiposReporteEntregaService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private RepositoriosService: RepositoriosExtendService,
  ) {

    this.tiposReporteEntregaService.getTiposReporteEntregaList().subscribe(
      (response: any) => {
        this.TiposReporteEntregaList = response;
      },
      (err) => {
      }
    );
    this.form = this.fb.group({
      id: [data.id],
      id_EntregaRacion: [data.id_EntregaRacion],
      complementosPreparados: [data.complementosPreparados],
      complementosPreparadas: [data.complementosPreparadas],
      iD_QuincenaEntregaRacion: [data.iD_QuincenaEntregaRacion],
      iD_TipoReporteEntrega: [data.iD_TipoReporteEntrega],
      fechaEntrega: [data.fechaEntrega],
      auditoria: [''],
      justificacion: [data.justificacion, Validators.required],
      pathDocumentoContrato: ['', Validators.required],
      pathDocumentoContrato2: [data.pathDocumentoContrato],

    });
    this.fh = data.fechaEntrega;



    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {

    if (!this.form.valid) {
      //this.action = 'error';
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:15px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del formulario para poder continuar.</p> ',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: false,
        denyButtonText: `Aceptar`,
      }).then(
        (res) => {
        }
      )
    } else {
      this.dialogRef.close({ event: this.action, data: this.form.value });
    }

  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }



  public onFileSelectedContrato(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let nombre = fileupload.name
      let sinEspa = nombre.replace(/ /g, "")
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerBS };

      this.addFileBlobRepositorios(_fileUpload);
    }
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.pathDocContrato = String.fromCharCode.apply(null, new Uint8Array(response));


        //this.form.controls['pathDocumentoContrato'].setValue(String.fromCharCode.apply(null, new Uint8Array(response)));
        this.contenidoRespuesta = String.fromCharCode.apply(null, new Uint8Array(response));
        this.form.controls['pathDocumentoContrato'].setValue(this.contenidoRespuesta);

      },
      (err) => {
      }
    );
  }


  downloadFile(): void {
    let _fileUpload: fileUploadModel;

    if (this.form.value.pathDocumentoContrato2 === '-' || this.form.value.pathDocumentoContrato2 === '') {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right; margin-top: -15px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">No tiene soporte para ver </p> ',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isDenied) {

        }
      })

    } else {
      let nombre = this.form.value.pathDocumentoContrato2
      _fileUpload = { file: null, fileName: nombre, cnx: environment.cnxBS, container: environment.containerBS };


      (this.RepositoriosService.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
        (response: any) => {

          const blob = new Blob([response], { type: this.getType(nombre) });
          saveAs(blob, nombre);
        },
        (err) => {
        }
      )
    }

  };
  getType(_response: any): string {
    let fileName = _response;
    //file type extension
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == ".txt") {
      fileType = "text/plain";
    }
    if (checkFileType == ".pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == ".doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == ".png") {
      fileType = "image/png";
    }
    if (checkFileType == ".jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".gif") {
      fileType = "image/gif";
    }
    if (checkFileType == ".csv") {
      fileType = "text/csv";
    }
    return fileType;
  }
  getFileExtension1(filename: string) {
    filename = filename.substring(filename.lastIndexOf('.') + 1);
    if (filename != 'pdf' && filename != 'pptx' && filename != 'docx' && filename != 'xlsx') { filename = 'othe' }
    return (filename);
  }

}
