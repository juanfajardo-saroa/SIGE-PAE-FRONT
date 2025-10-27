import { PA_PrioSedeAsignaRacionPivExtndModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModelExtend';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PA_ETCMunicipioRacionRequest, PA_ETCMunicipioRacionService } from 'src/app/shared/services/PA_ETCMunicipioRacion.services';
import { PA_ETCMunicipioRacionModel } from 'src/app/shared/model/PA_ETCMunicipioRacionModel';
import { PA_Paso1FinService } from 'src/app/shared/services/PA_Paso1Fin.service';
import { PAPrioAsistidaService } from 'src/app/shared/services/PA_PrioAsistida.service';
import { PA_PrioSedeAsignaRacion, PA_PrioSedeAsignaRacionService } from 'src/app/shared/services/PA_PrioSedeAsignaRacion.services';
import { PA_PrioSedeAsignaRacionModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionModel';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { SedesModelosOperacionModel } from 'src/app/shared/model/SedesModelosOperacion';
import { TipoEstadoPriorizacionModel } from 'src/app/shared/model/TipoEstadoPriorizacion';
import { TipoMunicipioModel } from 'src/app/shared/model/TipoMunicipio';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { SedesModelosOperacionService } from 'src/app/shared/services/SedesModelosOperacion.services';
import { TipoEstadoPriorizacionService } from 'src/app/shared/services/TipoEstadoPriorizacion.services';
import { TipoMunicipioService } from 'src/app/shared/services/TipoMunicipio.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HistoricoAprobacionesModel } from '../../../../shared/model/HistoricoAprobaciones';
import { DialogData } from '../list-SedesBeneficiarias-component/custom-sedes-beneficiarias/DialogData';
import { DetalleResumenModel } from '../list-SedesBeneficiarias-component/custom-sedes-beneficiarias/models/detalle-resumen.model';
import { ResultadosRacionesModel } from '../list-SedesBeneficiarias-component/custom-sedes-beneficiarias/models/resultados-raciones';
import { AsignacionRacionesDialog } from './asignacion-raciones.dialog';
import { AprobacionesModel } from 'src/app/shared/model/aprobaciones.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { PA_PriorizaUpdateEstadoPrioModel } from 'src/app/shared/model/PA_PriorizaUpdateEstadoPrioModel';
import { PA_PriorizaUpdateEstadoPrioService } from 'src/app/shared/services/PA_PriorizaUpdateEstadoPrio.services';
import { PA_PrioSedeAsignaRacionPivRequest } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import * as moment from 'moment';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_InstutucionesEduGetbyETCRequest, PA_InstutucionesEduGetbyETCService } from 'src/app/shared/services/PA_InstutucionesEduGetbyETC.services';
import { PA_SedeGetbyETCRequest, PA_SedeGetbyETCService } from 'src/app/shared/services/PA_SedeGetbyETC.services';
import { PA_JornadaGetbyETCRequest, PA_JornadaGetbyETCService } from 'src/app/shared/services/PA_JornadaGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_SedeGetbyETCModel } from 'src/app/shared/model/PA_SedeGetbyETCModel';
import { PA_InstutucionesEduGetbyETCModel } from 'src/app/shared/model/PA_InstutucionesEduGetbyETCModel';
import { PA_JornadaGetbyETCModel } from 'src/app/shared/model/PA_JornadaGetbyETCModel';
import { PA_NivelEduGetbyETCModel } from 'src/app/shared/model/PA_NivelEduGetbyETCModel';
import { PA_ZonaGetbyETCModel } from 'src/app/shared/model/PA_ZonaGetbyETCModel';
import { PA_NivelEduGetbyETCRequest, PA_NivelEduGetbyETCService } from 'src/app/shared/services/PA_NivelEduGetbyETC.services';
import { PA_ZonaGetbyETCRequest, PA_ZonaGetbyETCService } from 'src/app/shared/services/PA_ZonaGetbyETC.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';


@Component({
  selector: 'app-custom-asignacion-raciones',
  templateUrl: './custom-asignacion-raciones.component.html',
  styleUrls: ['./custom-asignacion-raciones.component.scss']
})
export class CustomAsignacionRacionesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  hidden = false;


  myDatepipe!: any;
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  currentYear = new Date().getFullYear();
  columnNames = ['nombre', 'valor'];
  resultadosColumnNames = ['municipio', 'institucionEducativa', 'sede', 'matriculaSimat', 'modeloTradicional', 'modalidadSugerida', 'racionesDiarias'];
  cantAprobaciones = 0;
  dataSourceMunicipios: DetalleResumenModel[] = [];
  dataSourceSedes: DetalleResumenModel[] = [];
  dataSourceMatriculas: DetalleResumenModel[] = [];
  dataSourceEstudiantes: DetalleResumenModel[] = [];
  isLoading = true;

  dataSourceResultados: MatTableDataSource<ResultadosRacionesModel>;
  private dataArrayAprobaciones: any;
  private dataArrayAsigna: any;
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;
  atLeastOneAlert: boolean;
  atLeastOneAlertYellow: boolean;
  SedesList: SedesModel[];
  InstitucionEducativaList: InstitucionEducativaModel[];
  municipioRacion: PA_ETCMunicipioRacionModel;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  tipoMunicipioList: TipoMunicipioModel[];
  divipolaList: PA_DivipolasGetbyETCModel[];
  institucionList: PA_InstutucionesEduGetbyETCModel[];
  sedesList: PA_SedeGetbyETCModel[];
  sedesJornadaList: PA_JornadaGetbyETCModel[];
  gradosSedesJornadaList: GradosSedesJornadasModel[];
  nivelEducativoList: PA_NivelEduGetbyETCModel[];
  zonasList: PA_ZonaGetbyETCModel[];
  criteriosDeVulnerabilidadList = [
    { id: 1, nombre: " Sedes en las que por lo menos el 50% de la población es étnica" },
    { id: 2, nombre: "Sedes en las que por lo menos el 50% de la población tiene alguna discapacidad" },
    { id: 3, nombre: "Sedes en las que por lo menos el 50% de la población es víctima" }
  ];
  tipoEstadoPriorizacionList: TipoEstadoPriorizacionModel[];
  sedesModelosOperacionList: SedesModelosOperacionModel[];
  sedesModelosOperacionTemp: SedesModelosOperacionModel[];

  prioSedeAsignaRacion: PA_PrioSedeAsignaRacionModel[];

  filterParams: PA_PrioSedeAsignaRacion = {};

  dataArray: ResultadosRacionesModel[] = [];

  estadoDePriorizacionList: string[] = ['Priorizada', 'No priorizada'];
  modeloTradicionalList: string[] = ['MAEM', 'MAER', 'PAEPI', 'NA'];
  modeloEmergenciaList: string[] = ['PAEC', 'NA'];
  public dataSourceAprobaciones: MatTableDataSource<HistoricoAprobacionesModel>;
  paso1Fin: boolean;

  prioSedeAsignaRacionPivParams: PA_PrioSedeAsignaRacionPivRequest = {};
  PA_ETCMunicipioRacionParams: PA_ETCMunicipioRacionRequest = {};
  prioSedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivExtndModel[];
  yaCargoAprobaciones: boolean = false;
  form: FormGroup;
  aprobacionEnviada = false;

  isApprove: boolean = false;
  isEdit: boolean = false;
  sedesPanel: boolean = true;
  resumenPanel: boolean = true;
  aprobacionesPanel: boolean = true;
  idETC = Number(localStorage.getItem('IdUbicacion'));
  AccionesAprobacionList: AccionesAprobacionModel[];
  panelOpenState: boolean = true;
  panelOpenState2: boolean = true;
  panelOpenState3: boolean = true;
  UsersList: AprobacionesModel[];
  RolList: GetAprobacionesGetAllWithRelModel[];
  stateColorsMap = new Map<boolean, string>([
    [true, "green"],
    [false, "red"],
  ]);
  stateColor = "red";

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
    plazoPorAprobar: new Date,
  };

  PrioSedeAsignaRacionObject: PA_PrioSedeAsignaRacionModel = {
    id_Municipio: 0,
    Municipio: '',
    id_InstEducativa: 0,
    InstEducativa: '',
    id_sede: 0,
    Sede: '',
    MatriculaSIMAT: 0,
    ModeloOperacion: '',
    ModeloOperacionER: '',
    ModalidadSugerida: '',
    RacionDiaria: 0,
    id_TipoMunicipio: 0,
    id_Jornada: 0,
    id_NivelEducativo: 0,
    id_Zona: 0,
    id_CriterioVul: 0,
    id_EstadoPrio: 0,
    estadoPriorizacion: '',


    // atributos adicionales genericos para gestión del objeto
    isValid: false,
    isSelected: false,
    completed: false,
  }
  prioAprobacionesObject: PA_PriorizaUpdateEstadoPrioModel = {
    Actualizadas: 0,



    // atributos adicionales genericos para gestión del objeto
    isValid: false,
    isSelected: false,
    completed: false,
  }


  AccionesAprobacionesList: AccionesAprobacionModel[];

  //filtros
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  prioInstsParams: PA_InstutucionesEduGetbyETCRequest = {};
  prioSedesParams: PA_SedeGetbyETCRequest = {};
  prioJornadaParams: PA_JornadaGetbyETCRequest = {};
  prioNivelParams: PA_NivelEduGetbyETCRequest = {};
  prioZonasParams: PA_ZonaGetbyETCRequest = {};
  idaccion = 0;
  constructor(
    private fb: FormBuilder,
    private tipoMunicipioService: TipoMunicipioService,
    private prioSedeAsignaRacionService: PA_PrioSedeAsignaRacionService,
    private municipioRacionService: PA_ETCMunicipioRacionService,
    private tipoEstadoPriorizacionService: TipoEstadoPriorizacionService,
    private paso1FinService: PA_Paso1FinService,
    private prioAsistidaService: PAPrioAsistidaService,
    private aprobacionesService: AprobacionesService,
    private seguridadService: SeguridadService,
    private messageService: MessageService,
    private datepipe: DatePipe,
    private aprobacionesGetAllRel: AprobacionesGetAllWithRelService,
    private router: Router,
    private PrioAprobaciones: PA_PriorizaUpdateEstadoPrioService,
    private AccionesAprobacionService: AccionesAprobacionService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private _PA_InstutucionesEduGetbyETCService: PA_InstutucionesEduGetbyETCService,
    private _PA_SedeGetbyETCService: PA_SedeGetbyETCService,
    private _PA_JornadaGetbyETCService: PA_JornadaGetbyETCService,
    private _PA_NivelEduGetbyETCService: PA_NivelEduGetbyETCService,
    private _PA_ZonaGetbyETCService: PA_ZonaGetbyETCService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_AprobacionesGetAllFullService: PA_AprobacionesGetAllFullService,
    public dialog: MatDialog) {
    this.yaCargoAprobaciones = false;
    this.myDatepipe = datepipe;

    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });

    this.sedesForm = this.fb.group({
      tipoMunicipio: [this.dateToday, Validators.required],
      municipio: [this.dateToday, Validators.required],
      institucionEducativa: ['', Validators.required],
      sede: ['', Validators.required],
      jornada: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      zona: ['', Validators.required],
      criteriosDeVulnerabilidad: ['', Validators.required],
      estadoPriorizacion: ['', Validators.required],
    });

    this.paso1FinService.getPA_Paso1Fin(Number(localStorage.getItem('IdUbicacion'))).subscribe(
      (response: any) => {

        this.paso1Fin = response[0].paso1Fin;
        if (!this.paso1Fin) this.openWarning();
      },
      (err) => {
      }
    );

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

          return 0;
        });
      },
      (err) => {
      }
    );

    this.allFilters();
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
      this.fillTable(this.filterParams);

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {

      this.filterParams.id_ETC = 0
      this.filterParams.Id_InstEducativa = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
      this.fillTable(this.filterParams);
    }

    this.fillTableAprobaciones();
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
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

  ngOnInit(): void {
    this.yaCargoAprobaciones = false;
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.PA_ETCMunicipioRacionParams.ID_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.PA_ETCMunicipioRacionParams.ID_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
      this.traerdatos()
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {

      this.PA_ETCMunicipioRacionParams.ID_ETC = 0
      this.PA_ETCMunicipioRacionParams.ID_institucionEducativa = Number(localStorage.getItem('IdUbicacion'));
      this.PA_ETCMunicipioRacionParams.ID_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
      this.traerdatos()
    }


  }

  traerdatos() {
    this.municipioRacionService.getPA_ETCMunicipioRacionList(this.PA_ETCMunicipioRacionParams).subscribe(
      (response: any) => {
        this.municipioRacion = response[0];
        this.dataSourceMunicipios = [{ nombre: "Total municipios beneficiarios de la ETC", valor: this.municipioRacion.totalMunicipiosBeneficiarios }]
        this.dataSourceMunicipios.push(
          { nombre: "Municipios en los que el 100% de las sedes tiene los complementos asignados", valor: this.municipioRacion.totalMunicipios100Sedes },
          { nombre: "Municipios en los que menos del 100% de las sedes tiene los complementos asignados", valor: this.municipioRacion.totalMunicipiosmenos100Sedes },
          { nombre: "Municipios en los que ninguna de las sedes tiene los complementos asignados", valor: this.municipioRacion.totalMunicipiosNingunaSede });
        this.dataSourceSedes = [{ nombre: "Total sedes beneficiarias de la ETC", valor: this.municipioRacion.totalSedesBeneficiarias }]
        this.dataSourceSedes.push(
          { nombre: "Sedes con el proceso de asignación de complementos completo*", valor: this.municipioRacion.totalSedesRacionCompleta },
          { nombre: "Sedes con el proceso de asignación de complementos incompleto**", valor: this.municipioRacion.totalSedesRacionIncompleta },
          { nombre: "Sedes pendientes por iniciar el proceso de asignación de complementos", valor: this.municipioRacion.totalSedespendientes });
      },
      (err) => {
      }
    );
  }
  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  downloadFile() {

  }


  allFilters(): void {
    //tipo de municipios
    this.tipoMunicipioService.getTipoMunicipioList().subscribe(
      (response: any) => {
        this.tipoMunicipioList = response;
      },
      (err) => {
      }
    );

    // municipio
    this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
      },
      (err) => {
      }
    );
    //instituto
    this.prioInstsParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_InstutucionesEduGetbyETCService.getPA_InstutucionesEduGetbyETCList(this.prioInstsParams).subscribe(
      (response: any) => {
        this.institucionList = response;
      },
      (err) => {
      }
    );
    //sedes
    this.prioSedesParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_SedeGetbyETCService.getPA_SedeGetbyETCList(this.prioSedesParams).subscribe(
      (response: any) => {
        this.sedesList = response;
      },
      (err) => {
      }
    );
    //jornada
    this.prioJornadaParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(this.prioJornadaParams).subscribe(
      (response: any) => {
        this.sedesJornadaList = response;
      },
      (err) => {
      }
    );

    /*  this.gradosSedesJornadasService.getGradosSedesJornadasListRelation().subscribe(
       (response: any) => {
         this.gradosSedesJornadaList = response;
       },
       (err) => {
       }
     ); */
    //nivel
    this.prioNivelParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(this.prioNivelParams).subscribe(
      (response: any) => {
        this.nivelEducativoList = response;
      },
      (err) => {
      }
    );

    //zonas
    this.prioZonasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(this.prioZonasParams).subscribe(
      (response: any) => {
        this.zonasList = response;
      },
      (err) => {
      }
    );


    this.tipoEstadoPriorizacionService.getTipoEstadoPriorizacionList().subscribe(
      (response: any) => {
        this.tipoEstadoPriorizacionList = response;
      },
      (err) => {
      }
    );

    // this.sedesModelosOperacionService.getSedesModelosOperacionList().subscribe(
    //   (response: any) => {
    //     this.sedesModelosOperacionList = response;
    //   },
    //   (err) => {
    //   }
    // );
  }

  idTMunicipio: number;
  onTipoMunicipioClick(value: any): void {
    this.idTMunicipio = value;
    this.filterParams.Id_TipoMunicipio = value;
    this.prioDivolasParams.id_TipoMunicipio = value;
    this.prioInstsParams.id_tipoMunicipio = value;
    this.prioSedesParams.id_tipoMunicipio = value;
    this.prioJornadaParams.id_tipoMunicipio = value;
    this.prioNivelParams.id_tipoMunicipio = value;
    this.prioZonasParams.id_tipoMunicipio = value;
    this.fillDivolas(this.prioDivolasParams);

  }
  idMunicipio: number;
  onMunicipioClick(value: any): void {
    this.idMunicipio = value;
    this.filterParams.Id_Municipio = value;
    this.prioInstsParams.id_Divipola = value;
    this.prioSedesParams.id_Divipola = value;
    this.prioJornadaParams.id_Divipola = value;
    this.prioNivelParams.id_Divipola = value;
    this.prioZonasParams.id_Divipola = value;
    this.fillDivolas(this.prioDivolasParams);
    this.fillInstituto(this.prioInstsParams);


  }
  idInstEdu: number;
  onInstitucionClick(value: any): void {
    this.idInstEdu = value;
    this.filterParams.Id_InstEducativa = value;
    this.prioSedesParams.id_IE = value;
    this.prioJornadaParams.id_IE = value;
    this.prioNivelParams.id_IE = value;
    this.prioZonasParams.id_IE = value;
    this.fillInstituto(this.prioInstsParams);
    this.fillSede(this.prioSedesParams)

  }
  idSedes: number;
  onSedeClick(value: any): void {
    this.idSedes = value;
    this.filterParams.Id_sede = value;
    this.prioJornadaParams.id_sede = value;
    this.prioNivelParams.id_sede = value;
    this.prioZonasParams.id_sede = value;
    this.fillSede(this.prioSedesParams)
    this.fillJornada(this.prioJornadaParams);


  }
  idJornada: number;
  onJornadaClick(value: any): void {
    this.idJornada = value;
    this.filterParams.Id_Jornada = value;
    this.fillTable(this.filterParams);
  }
  idNivelEdu: number;
  onNivelClick(value: any): void {
    this.idNivelEdu = value;
    this.filterParams.Id_NivelEducativo = value;
    this.fillTable(this.filterParams);
  }
  idZonas: number;
  onZonaClick(value: any): void {
    this.idZonas = value;
    this.filterParams.Id_Zona = value;

    this.fillTable(this.filterParams);
  }
  idCriterio: number;
  onCriteriosDeVulnerabilidadClick(value: any): void {
    this.idCriterio = value;
    this.filterParams.Id_CriterioVul = value;
    this.fillTable(this.filterParams);
  }
  idTipoEstadoPrio: number;

  onTipoEstadoPriorizacionClick(value: any) {
    this.idTipoEstadoPrio = value;
    this.filterParams.Id_EstadoPrio = value;

    this.fillTable(this.filterParams);
  }



  fillTable(filterParamsTable: PA_PrioSedeAsignaRacion): void {
    this.yaCargoAprobaciones = false;

    this.prioSedeAsignaRacionService.getPA_PrioSedeAsignaRacionList(filterParamsTable).subscribe(
      (response: any) => {
        this.dataArrayAsigna = response.filter(item => item.modeloOperacion != null);
        this.dataArray = [];
        this.atLeastOneAlert = false;
        this.atLeastOneAlertYellow = false;

        this.dataArrayAsigna.forEach(
          element => {
            if (element.banderaRoja && element.estadoPriorizacion != "Incompleto" && element.estadoPriorizacion != "Pendiente" && element.estadoPriorizacion != "Aprobado" && element.estadoPriorizacion != "Rechazado" && element.estadoPriorizacion != null) {
              this.atLeastOneAlert = true;
            }
            if (element.banderaAmarilla) {
              this.atLeastOneAlertYellow = true;

            }
            if (element.estadoPriorizacion == "Completo" || element.id_EstadoPrio == 3) {
              element.estadoPriorizacion = element.racionDiaria;

            } else if (element.estadoPriorizacion == "Aprobado" || element.estadoPriorizacion == "Rechazo" || element.estadoPriorizacion == "Incompleto" || element.estadoPriorizacion == "Pendiente") {
              //element.estadoPriorizacion = element.racionDiaria;
              this.yaCargoAprobaciones = false;
            }
            this.dataArray.push({
              municipio: element.municipio,
              institucionEducativa: element.instEducativa,
              sede: element.sede,
              idSede: element.id_sede,
              matriculaSIMAT: element.matriculaSIMAT,
              modeloOperacionTradicional: element.modeloOperacion,
              modeloOperacionEmergencia: element.modeloOperacionER,
              modalidadSugerida: element.modalidadSugerida,
              racionesDiarias: element.racionDiaria,
              estadoPriorizacion: element.estadoPriorizacion,
              id_EstadoPrio: element.id_EstadoPrio,
              haveAlert: element.banderaRoja,
              haveYellowAlert: element.banderaAmarilla
            });
          }
        );



        if (this.dataArray.every(item => item.id_EstadoPrio >= 3) && !this.dataArray.every(item => item.id_EstadoPrio === 4)) {
          this.yaCargoAprobaciones = true;
          this.cantAprobaciones = 1
          this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización está lista para aprobar", "26497bcf-bb09-473a-af94-4e194be66a21");
          this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización está lista para aprobar", "18cb22b3-3f7e-468a-af32-b4e7c1bc6d32");

        } else {
          this.yaCargoAprobaciones = false;
          this.cantAprobaciones = 0
        }
        if (this.dataArray.length == 0) {
          this.yaCargoAprobaciones = false;
          this.cantAprobaciones = 0
        }
        this.dataSourceResultados = new MatTableDataSource<ResultadosRacionesModel>(this.dataArray);
        this.dataSourceResultados.paginator = this.paginator;
        this.dataSourceResultados.sort = this.sort;
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
      },
      (err) => {
      }
    );
  }

  fillDivolas(filterDivolasParams: PA_DivipolasGetbyETCRequest): void {
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(filterDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillInstituto(filterInstParams: PA_InstutucionesEduGetbyETCRequest): void {
    this._PA_InstutucionesEduGetbyETCService.getPA_InstutucionesEduGetbyETCList(filterInstParams).subscribe(
      (response: any) => {
        this.institucionList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillSede(filterSedesParams: PA_SedeGetbyETCRequest): void {
    this._PA_SedeGetbyETCService.getPA_SedeGetbyETCList(filterSedesParams).subscribe(
      (response: any) => {
        this.sedesList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillJornada(filterJornadaParams: PA_JornadaGetbyETCRequest): void {
    this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(filterJornadaParams).subscribe(
      (response: any) => {
        this.sedesJornadaList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillNivel(filterNivelParams: PA_NivelEduGetbyETCRequest): void {
    this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(filterNivelParams).subscribe(
      (response: any) => {
        this.nivelEducativoList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillZona(filterZonasParams: PA_ZonaGetbyETCRequest): void {
    this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(filterZonasParams).subscribe(
      (response: any) => {
        this.zonasList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }

  cleanFilters(): void {
    this.sedesForm.reset();

    this.filterParams = {};
    this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.filterParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
    this.fillTable(this.filterParams);
    this.idTMunicipio = 0;
    this.idMunicipio = 0;
    this.idInstEdu = 0;
    this.idSedes = 0;
    this.idJornada = 0;
    this.idNivelEdu = 0;
    this.idZonas = 0;
    this.idCriterio = 0;
    this.idTipoEstadoPrio = 0;
    this.cantAprobaciones = 0;
    this.prioInstsParams.id_Divipola = null;
    this.prioSedesParams.id_Divipola = null;
    this.prioJornadaParams.id_Divipola = null;
    this.prioNivelParams.id_Divipola = null;
    this.prioZonasParams.id_Divipola = null;
    this.filterParams.Id_InstEducativa = null;
    this.prioSedesParams.id_IE = null;
    this.prioJornadaParams.id_IE = null;
    this.prioNivelParams.id_IE = null;
    this.prioZonasParams.id_IE = null;
    this.filterParams.Id_sede = null;
    this.prioJornadaParams.id_sede = null;
    this.prioNivelParams.id_sede = null;
    this.prioZonasParams.id_sede = null;
    this.allFilters();


  }

  onEditarSedes(): void {
    this.isEdit = true;
  }
  expandPanel(): void {
    this.resumenPanel = !this.resumenPanel;
  }
  expandPanel2(): void {
    this.sedesPanel = !this.sedesPanel;
  }
  expandPanel3(): void {
    this.aprobacionesPanel = !this.aprobacionesPanel;
  }

  openDialog(action: string, obj: any): void {
    this.isApprove = true;
    obj.action = action;
    const dialogRef = this.dialog.open(DialogAprobaciones, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isApprove = false;
      if (result.event === 'Enviar solicitud') {
        this.crearAprobacion(result.data);
      }
    });
  }

  crearAprobacion(row_obj: any): void {
    let ConvertDate = this.myDatepipe.transform(this.dateToday, 'yyyy-MM-dd');
    this.AprobacionObject.fecha = ConvertDate;
    this.AprobacionObject.iD_AccionAprobacion = row_obj.accionAprobacion;
    if (row_obj.observaciones == ' ') {
      this.AprobacionObject.observaciones = 'Ninguno'
    } else {
      this.AprobacionObject.observaciones = row_obj.observaciones;
    }
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.AprobacionObject.accion = "";
    this.AprobacionObject.ubicacionOrigen = "";
    this.AprobacionObject.documentoParaAprobar = "";
    this.AprobacionObject.id_Secciones = 3;
    this.AprobacionObject.id_Ubicacion = 14


    this.PrioSedeAsignaRacionObject.Municipio = row_obj.mucipio


    this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
      (response) => {
        this.fillTableAprobaciones();
        let estaApro = ''
        if (row_obj.accionAprobacion === 1) {
          this.prioAprobacionesObject.Actualizadas = 4;
          estaApro = 'Aprobado'
        } else if (row_obj.accionAprobacion === 7) {
          this.prioAprobacionesObject.Actualizadas = 0;
          estaApro = 'Rechazado'
        }
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "26497bcf-bb09-473a-af94-4e194be66a21");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "18cb22b3-3f7e-468a-af32-b4e7c1bc6d32");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "3b9013be-448a-4de4-99d4-23dbd555e6ec");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "2b9ba6fb-bdb2-471b-9af5-4fcc6049c837");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "7c2b24b6-62c4-4737-8a18-157f46bba8ae");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "a7acbdb9-7239-4e9e-9025-26118396c232");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "d17275ce-0864-4ab6-bc83-c185246106a9");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "ac6bfdf9-1a92-4e7d-b1df-acedfdfe1064");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "92877e1a-fd3d-45a1-b7ea-69254a80172e");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "f8340ffb-5ba2-4dd9-9f59-f2578bd4b323");
        this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue " + estaApro, "3b9013be-448a-4de4-99d4-23dbd555e6ec");
        this.PrioAprobaciones.getPA_PriorizaUpdateEstadoPrioList(this.idETC, this.prioAprobacionesObject.Actualizadas, null, Number(localStorage.getItem('VigSeleccionada'))).subscribe(
          (response) => {
            this.yaCargoAprobaciones = false;
            this.cantAprobaciones = 0
            this.filterParams = {};
            this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
            this.filterParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
            this.fillTable(this.filterParams);
          },
          (err) => {
          }
        );




      },
      (err) => {
      }
    );
  }

  fillTableAprobaciones() {
    this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(3).subscribe(
      (response: any) => {
        this.UsersList = response;
        this.aprobacionesGetAllRel.getGetAprobacionesGetAllWithRelListfilter(3, this.idETC).subscribe(
          (response: any) => {
            this.dataArrayAprobaciones = response;
            this.dataArrayAprobaciones.forEach(element => {

              let p = this.dataArrayAprobaciones.find(user => user.id == element.id).fechaAprobacion;
              if (p == null) {
                element.fecha = null;
              } else {
                element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
              }
              element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
              element.accion = this.AccionesAprobacionesList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
              element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
              element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;
            });
            this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
            this.dataSourceAprobaciones.paginator = this.paginator2;
            this.paginator._intl.itemsPerPageLabel = "Registros por página";
            this.paginator2._intl.nextPageLabel = "Siguiente";
            this.paginator2._intl.previousPageLabel = "Anterior";
            this.paginator2._intl.firstPageLabel = "Primero";
            this.paginator2._intl.lastPageLabel = "Último";
            this.paginator2._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
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
  }


  onPriorizacionAutomatizada(): void {
    const dialogRef = this.dialog.open(AsignacionRacionesDialog, {
      data: { idTMunicipio: this.idTMunicipio, idMunicipio: this.idMunicipio, idInstEdu: this.idInstEdu, dSedes: this.idSedes, idJornada: this.idJornada, idNivelEdu: this.idNivelEdu, idZonas: this.idZonas, idCriterio: this.idCriterio, idTipoEstadoPrio: this.idTipoEstadoPrio },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "Save") {
        this.prioAsistidaService.getPA_PrioSedeAsistida(result.data).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: ' + response[0].afectadas, 'top right');
            this.fillTable(this.filterParams);
            this.idTMunicipio = 0;
            this.idMunicipio = 0;
            this.idInstEdu = 0;
            this.idSedes = 0;
            this.idJornada = 0;
            this.idNivelEdu = 0;
            this.idZonas = 0;
            this.idCriterio = 0;
            this.idTipoEstadoPrio = 0;
          },
          (err) => {
          }
        );
      }
    });
  }

  openWarning() {
    //this.dialog.open(DialogWarning, { disableClose: true });
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 8% !important; right: 20px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin: 1rem 2rem 1rem 0rem;"">El proceso de asignación de complementos estará disponible cuando se hayan definido las sedes beneficiarias del PAE en todos los Municipios de la ETC. </p> ' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA;"> Vaya al módulo de "Sedes Beneficiarias" y complete la selección de sedes. </p> ',
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

      this.router.navigate(['/SedesBeneficiarias']);
    })
  }

  clickedSede(row: ResultadosRacionesModel) {
    if (!this.isApprove) {
      //localStorage.setItem('nombredeUbicacionActualizado', 'si')
      this.router.navigate(['/AsignacionRacionesId/'], { queryParams: { id: row.idSede } });
      localStorage.setItem('ars', row.sede);
      localStorage.setItem('arm', row.municipio);
      localStorage.setItem('ari', row.institucionEducativa);
    }
  }

  mensaje() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important;position: absolute!important; top: 40px!important; right: 30px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">Confirmar aprobación en Asignación de Complementos: </p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA;font-weight: 700;">${'Complementos entregados por grado'}</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir) </p> ',
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
        this.aprobacionEnviada = true;
        this.crearAprobacion(this.form.value)
      }
    })
  }



}


@Component({
  selector: 'dialog-warning',
  templateUrl: 'dialog-warning.html',
  styleUrls: ['./dialog-warning.scss']
})
export class DialogWarning {
  constructor(public dialogRef: MatDialogRef<DialogWarning>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}

@Component({
  selector: 'dialog-aprobaciones',
  templateUrl: 'dialog-aprobaciones.component.html',
  styleUrls: ['./dialog-aprobaciones.component.scss']
})
export class DialogAprobaciones {
  action: string;
  local_data: any;
  form: FormGroup;
  InstitucionEducativaList: InstitucionEducativaModel[];
  AccionesAprobacionesList: AccionesAprobacionModel[];

  constructor(public dialogRef: MatDialogRef<DialogAprobaciones>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private institucionEducativaService: InstitucionEducativaService,) {
    this.institucionEducativaService.getInstitucionEducativaList().subscribe(
      (response: any) => {
        this.InstitucionEducativaList = response;
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
    this.form = this.fb.group({
      idsedes: [data.idSede],
      municipio: [data.municipio,],
      institucionEducativa: [data.institucionEducativa,],
      sedeEducativa: [data.sede,],
      matriculaSimat: [data.matriculaSIMAT,],
      modeloTradicional: [data.modeloOperacionTradicional,],
      modeloEmergencia: [data.modeloOperacionEmergencia,],
      modalidadSugerida: [data.modalidadSugerida, Validators.required],
      racionesDiarias: [data.racionesDiarias,],
      accionAprobacion: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }


  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
