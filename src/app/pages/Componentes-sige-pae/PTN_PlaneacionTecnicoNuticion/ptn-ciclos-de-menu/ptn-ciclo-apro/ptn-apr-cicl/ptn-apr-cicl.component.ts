
import { PA_CicloMenuAportesNutricionalesPivMAER } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesPivMAER.services';
import { PA_CicloMenuAportesNutricionalesPivSem } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesPivSem.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPivSem } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPivSem.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPiv } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPiv.services';
import { MenuProductosModel } from 'src/app/shared/model/MenuProductos';
import { MenuProductosService } from 'src/app/shared/services/MenuProductos.services';
import { Router, ActivatedRoute } from '@angular/router';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';
import { CicloMenuRequest, CiclosMenusService } from 'src/app/shared/services/CiclosMenus.services';
import { CiclosMenusModel } from 'src/app/shared/model/CiclosMenus';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { MatStepper } from "@angular/material/stepper";
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import Swal from 'sweetalert2';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import * as moment from 'moment';
import { MenuPreparacionesModel } from 'src/app/shared/model/MenuPreparaciones';
import { SemanasPTNModel } from 'src/app/shared/model/SemanasPTNModel';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { TiposComponenteModel } from 'src/app/shared/model/TiposComponente';
import { MinutaPatronAlimentosService } from 'src/app/shared/services/MinutaPatronAlimentos.services';
import { PA_CicloMenuAportesNutricionalesPiv } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPiv.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_CicloMenuListaMinutasAprobacion, PA_CicloMenuListaMinutasAprobacionService } from 'src/app/shared/services/PA_CicloMenuListaMinutasAprobacion.services';
import { PA_CicloMenuAporteNutricionalXAprobacion, PA_CicloMenuAporteNutricionalXAprobacionService } from 'src/app/shared/services/PA_CicloMenuAporteNutricionalXAprobacion.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { PA_MenuPTNSemanaService } from 'src/app/shared/services/PA_MenuPTNSemana.services';
import { PA_MenuPreparacionesService } from 'src/app/shared/services/PA_MenuPreparaciones.services';
import { PA_MenuComponentesService } from 'src/app/shared/services/PA_MenuComponentes.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_ValidaIntercambiosPiv, PA_ValidaIntercambiosService } from 'src/app/shared/services/PA_ValidaIntercambios.services';
import { PA_ComponentesCiclosService } from 'src/app/shared/services/PA_ComponentesCiclos.services';
import { PA_ValidaFrecuenciaService } from 'src/app/shared/services/PA_ValidaFrecuencia.services';
import { DecimalPipe } from '@angular/common';
import { PA_SemanasPTNGetAllWithRelationService } from 'src/app/shared/services/PA_SemanasPTNGetAllWithRelation.services';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';
import { PA_CiclosMenusNivelesEducativosGetAllWithRelationService } from 'src/app/shared/services/PA_CiclosMenusNivelesEducativosGetAllWithRelation.services';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-ptn-apr-cicl',
  templateUrl: './ptn-apr-cicl.component.html',
  styleUrls: ['./ptn-apr-cicl.component.scss']
})
export class PtnAprCiclComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  public tipoSeleccionado: number = 2;
  public nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Ciclos de menús';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  public EsSoloLectura: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  public dataArrayInterno: any;
  isLoading: boolean = true;
  public ActividadfisicaList: any = [];
  public fisica: any = [];
  public nivelmaem: any = [];
  nombreNivel2: string;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  displayedColumns: string[] = ['nombre', 'modelo', 'modalidad', 'estado'];
  displayedColumnsPreparacion: string[] = ['Preparacion'];
  displayedColumnsMacro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];
  displayedColumnsMicro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];

  displayedColumnsGrupo: string[] = ['nombre', 'valor'];
  dataSource = new MatTableDataSource<CiclosMenusModel>();
  dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>();
  dataSourceProducto = new MatTableDataSource<MenuProductosModel>();
  selModelo = -1;
  selModalidad = -1;
  id_Zona: 0;
  dataArray: any;
  dataArrayPreparaciones: any;
  dataArrayProd: any;
  Modelolist: any[] = [];
  ModeloModalidad: any[] = [];
  ModeloModalidadfilter: any[] = [];
  tablamodalidadList: any[] = [];
  ZonasList: any[] = [];
  ZonasList2: any[] = [];
  ListIntercambiosSemana: any[] = [];
  ListIntercambiosDiarios: any[] = [];
  public viewActiva: number = 0;
  escala: any[] = [
    { id: 1, respuesta: 'Si' },
    { id: 2, respuesta: 'No' },
  ]
  cicloParams: CicloMenuRequest = {}

  // Max number of steps to show at a time in view, Change this to fit your need
  MAX_STEP = 3;
  // Total steps included in mat-stepper in template, Change this to fit your need
  totalSteps = 0;
  // Current active step in mat-stepper
  public step: number = 0;
  page = 0;
  public Semanas = 0;
  // Min index of step to show in view
  minStepAllowed = 0;
  // Max index of step to show in view
  maxStepAllowed = this.MAX_STEP - 1;
  totalPages = Math.ceil(this.totalSteps / this.MAX_STEP);
  public nums: any[] = [];
  nums2: any[] = [];
  semana: boolean = false;
  @ViewChild("stepper") private myStepper: MatStepper;

  nombreCiclo: string = '';
  nombreReferencia: string = '';
  nombreEstado: string = '';
  nombreModeloOP: string = '';
  nombreModalidad: string = '';
  nombreTipoComplemento: string = '';
  nombreMinuta: string = '';
  fisicaNom2: string = '';
  nombreZonas: string = '';
  nombreNivelEducativo: string = '';
  NivelEducativo: number = null;
  Zonas: number = null;
  cantidad: number = 0;
  colorEstado: string = '';
  idCiclo = 0;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  cantAprobaciones = 0;
  yaCargoAprobaciones = false;
  form: FormGroup;
  aprobar = [];
  AprobacionesList: any;
  AprobacionesList2: any;
  lista = [];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  semanasList: SemanasPTNModel[];
  semanaList: any[] = [];
  weekArray: any[] = [];
  semanaSeleccionada: string = '';
  semanaAnterior: string = '';
  semanaSiguiente: string = '';
  semanaUltima: string = '';
  showFirst: boolean = true;
  showLast: boolean = true;
  componenteSeleccionado: number = 0;
  UsersList: AprobacionesModel[];
  componeteList: TiposComponenteModel[];
  componeteListob: TiposComponenteModel[];
  componeteListop: TiposComponenteModel[];
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  NivelEducativoList = [];
  diasList: any;
  public nuevoArray = [];
  public nuevoArray2 = [];
  public nuevoArray3 = [];
  listaCicloMenu = [];
  public tipoRacionList: any = [];
  public tipoRacionListfilter: any = [];
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

  selectedTabIndex: number = 1;
  tabs = [];
  diasText = '';
  idMenu = 0;
  idNivel = 0;
  Preparaciones: boolean = false;
  Preparaciones2: boolean = false;
  Preparaciones3: boolean = false;
  Productos: boolean = false;
  Productos2: boolean = false;
  gradoText = '';
  gradoid: number;
  gradoid2: number;
  CiclosMenusObject: CiclosMenusModel = {
    id: 0,
    iD_TipoModeloOperacion: 0,
    siD_TipoModeloOperacion: '',
    iD_TipoComplemento: 0,
    siD_TipoComplemento: '',
    iD_TipoModalidadComplemento: 0,
    siD_TipoModalidadComplemento: '',

    iD_TipoNivelEducativo: 0,
    iD_EstadoRegistro: 0,
    iD_Zona: 0,
    siD_Zona: '',
    nombre: '',
    menuReferencia: false,
    iD_CiclosMenuReferencia: 0,
    menusParaTodosNiveles: false,
    menusParaTodasZonas: false,
    cantidadMenus: 0,
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
    completed: false,
    iD_ETC: 0,
    id_menuReferencia: 0,
    id_menusParaTodosNiveles: 0,
    id_menusParaTodasZonas: 0,
    siD_ETC: '',
    siD_EstadoRegistro: '',
    validationErrors: '-',
    iD_MinutaAprobacion: 0,
    sID_MinutaAprobacion: ''
  }
  CicloMenuAportesNutricionalesPivReq: PA_CicloMenuAportesNutricionalesPiv = {}
  CicloMenuAportesNutricionalesPivReqsemana: PA_CicloMenuAportesNutricionalesPivSem = {}
  //procdimiento  aporte nutricional maem ind
  CicloMenuAportesNutricionalesIndustrialesPivReq: PA_CicloMenuAportesNutricionalesIndustrialesPiv = {}
  CicloMenuAportesNutricionalesIndustrialesPivSem: PA_CicloMenuAportesNutricionalesIndustrialesPivSem = {}

  //maer
  CicloMenuAportesNutricionalesPivMAERReq: PA_CicloMenuAportesNutricionalesPivMAER = {}
  CicloMenuAportesNutricionalesPivReqMAERsemana: PA_CicloMenuAportesNutricionalesPivSem = {}

  //minutas
  CicloMenuListaMinutasAprobacionReq: PA_CicloMenuListaMinutasAprobacion = {}
  //ciclos
  CicloMenuAporteNutricionalXAprobacionReq: PA_CicloMenuAporteNutricionalXAprobacion = {}
  PA_conteoIntercambiosPivreq: PA_ValidaIntercambiosPiv = {}
  preg: boolean = false;
  preg1: boolean = false;
  preg2: boolean = false;
  preg5: boolean = false;
  preg6: boolean = false;

  //maem
  dataSourceMacro = [];
  dataSourceMicro = [];
  dataSourceMacrosemana = [];
  dataSourceMicrosemana = [];
  maem: boolean = false;
  //maer
  dataSourceMacro2 = [];
  dataSourceMicro2 = [];
  dataSourceMacrosemana2 = [];
  dataSourceMicrosemana2 = [];
  dataComponentes: any;
  dataComponentes2 = [];
  maer: boolean = false;
  //paepi
  dataSourceMacro3 = [];
  dataSourceMicro3 = [];
  dataSourceMacrosemana3 = [];
  dataSourceMicrosemana3 = [];
  ps_cct_ampm: boolean = false;
  ps_cct_almuerzo: boolean = false;
  ind_ampm: boolean = false;

  ps_cct_ampm2: boolean = false;
  ps_cct_almuerzo2: boolean = false;
  ind_ampm2: boolean = false;

  ps_cct_ampm22: boolean = false;

  TipoModelos = 0;
  cantModelo = 0;
  public MinutasList: any = [];
  public MinutasList2: any = [];

  comp1 = 0;
  comp2 = 0;
  comp3 = 0;
  comp4 = 0;
  comp5 = 0;
  comp6 = 0;
  comp7 = 0;
  comp8 = 0;
  comp9 = 0;
  comp10 = 0;
  comp11 = 0;
  comp12 = 0;
  comp13 = 0;
  idaccion = 0
  public frecuencia: any = [];

  @ViewChild('modeloTList') modeloTList: MatSelectionList;
  constructor(

    private _ModeloOperadorServicios: TiposModeloOperacionService,
    private _ZonasService: ZonasService,
    private elementRef: ElementRef,
    private _CiclosMenusService: CiclosMenusService,
    private _ModalidadModeloService: ModalidadModeloService,
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private _MenuPTNSemanaService: PA_MenuPTNSemanaService,
    private _PA_MenuPreparacionesService: PA_MenuPreparacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private _TiposComponenteService: TiposComponenteService,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    private _PA_MenuComponentesService: PA_MenuComponentesService,
    private _MenuProductosService: MenuProductosService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_ValidaIntercambiosService: PA_ValidaIntercambiosService,
    private _PA_CicloMenuListaMinutasAprobacionService: PA_CicloMenuListaMinutasAprobacionService,
    private _PA_CicloMenuAporteNutricionalXAprobacionService: PA_CicloMenuAporteNutricionalXAprobacionService,
    private _TiposRacionService: TiposComplementoService,
    private seguridadService: SeguridadService,
    private _PA_ComponentesCiclosService: PA_ComponentesCiclosService,
    private _PA_ValidaFrecuenciaService: PA_ValidaFrecuenciaService,
    private _PA_SemanasPTNGetAllWithRelationService: PA_SemanasPTNGetAllWithRelationService,
    private _PA_AprobacionesGetAllFullService: PA_AprobacionesGetAllFullService,
    private _PA_CiclosMenusNivelesEducativosGetAllWithRelationService: PA_CiclosMenusNivelesEducativosGetAllWithRelationService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.idCiclo = +params.id;

    });




    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);
    this._ZonasService.getZonasList().subscribe(
      (Response: any) => {
        this.ZonasList = Response;
        this.traerDatos(this.idCiclo);

      },
      (err) => {

      }
    );


  }


  ngOnInit(): void {

    this._ModeloOperadorServicios.getTiposModeloOperacionList().subscribe(
      (response: any) => {
        this.Modelolist = response;
      },
      (err) => {

      }
    );
    this._ModalidadModeloService.getModalidadModeloListRelation().subscribe(
      (response: any) => {
        this.tablamodalidadList = response;
      },
      (err) => {
      }
    );

    this._TiposComponenteService.getTiposComponenteList().subscribe(
      (response: any) => {
        this.componeteList = response;
      },
      (err) => {
      }
    );
    this.fillTableAprobaciones();
    this.rerender();

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  public cargarPTNpreparacion(value: any) {
    var target = value.currentTarget;
    this.cambiarFocoPestana(target);

    switch (target.id) {
      case "disponible":
        this.tipoSeleccionado = 1;
        break;
      case "aprobacion":
        this.tipoSeleccionado = 2;
        break;
    }
  }

  public cambiarFocoPestana(target: any) {
    var clases = target.className.split(" ");
    var claseAdd = "";
    if (clases.length > 0) {
      var divPestanas: any = document.getElementsByClassName("pestanaCC");
      for (let div of divPestanas) {
        var claseDiv = div.className.split(" ");
        if (claseDiv[2] == "active") {
          claseAdd = "tab-item pestanaCC";
          div.className = claseAdd;
        }
      }

      claseAdd = "";
      claseAdd += "tab-item pestanaCC active";
    }

    target.className = claseAdd;
  }
  ngAfterViewInit() {
    this.rerender();
    
  }

  traerDatos(id: number) {
    this._TiposRacionService.getTiposComplementoList().subscribe(
      (response: any) => {

        this.tipoRacionList = response
        this.tipoRacionList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
      }, (err) => { });

    this._CiclosMenusService.getCiclosMenusListRelationFilterID(id).subscribe(
      (response: any) => {
        this.listaCicloMenu.push(response);
        this.CiclosMenusObject = response;
        this.nombreCiclo = response[0].nombre;

        // Configura los estados del ciclo de menú
        this.configurarEstadoCicloMenu(response[0]);

        // Configura la referencia del menú si existe
        this.configurarReferenciaMenu(response[0].menuReferencia, response[0].iD_CiclosMenuReferencia);

        // Configura los datos adicionales según el tipo de operación
        this.configurarDatosOperacion(response[0]);

        this.semanasI();
      },
      (err) => {
        this.isLoading = false;
      }
    );


  }
  private configurarEstadoCicloMenu(cicloMenu: any): void {
    switch (cicloMenu.iD_EstadoRegistro) {
      case 1:
        this.nombreEstado = 'Por Aprobar';
        this.colorEstado = 'yellow';
        this.cantAprobaciones = 1;
        this.yaCargoAprobaciones = true;
        break;
      case 2:
        this.nombreEstado = 'Rechazado';
        this.colorEstado = 'red';
        break;
      case 3:
        this.nombreEstado = 'Aprobado';
        this.colorEstado = 'green';
        break;
      case 6:
      case null:
        this.nombreEstado = 'Pendiente';
        this.colorEstado = '#E2E6FE';
        break;
    }
  }

  private configurarReferenciaMenu(menuReferencia: boolean, iD_CiclosMenuReferencia: number): void {
    if (!menuReferencia) {
      this.nombreReferencia = 'Ninguna';
    } else {
      this._CiclosMenusService.getCiclosMenusListRelationFilterID(iD_CiclosMenuReferencia).subscribe(
        (response2: any) => {
          this.nombreReferencia = response2[0].nombre;
        },
        (err) => {
          // Manejo de errores si es necesario
        }
      );
    }
  }

  private configurarDatosOperacion(cicloMenu: any): void {
    this.preg = cicloMenu.iD_TipoModeloOperacion === 1;
    this.preg1 = cicloMenu.iD_TipoModeloOperacion === 2;
    this.preg2 = cicloMenu.iD_TipoModeloOperacion === 3;

    if (this.preg) {
      this.configurarModeloOperacion1(cicloMenu);
    } else if (this.preg1) {
      this.configurarModeloOperacion2(cicloMenu);
    } else if (this.preg2) {
      this.configurarModeloOperacion3(cicloMenu);
    }
  }

  private configurarModeloOperacion1(cicloMenu: any): void {
    this.maem = true;
    this.cantidad = cicloMenu.cantidadMenus;
    this.configurarZonas(cicloMenu.iD_Zona);
    this.Zonas = cicloMenu.menusParaTodasZonas ? 1 : 2;
    this.NivelEducativo = cicloMenu.menusParaTodosNiveles ? 1 : 2;
    this.nombreModeloOP = cicloMenu.sID_TipoModeloOperacion;
    this.nombreModalidad = cicloMenu.sID_TipoModalidadComplemento;
    this.nombreTipoComplemento = cicloMenu.sID_TipoComplemento;
    this.configurarMinutasAprobacion(1);
  }

  private configurarModeloOperacion2(cicloMenu: any): void {
    this.semana = true;
    this.maer = true;
    this.Preparaciones2 = true;
    this.cantidad = cicloMenu.cantidadMenus;
    this.nombreModeloOP = cicloMenu.sID_TipoModeloOperacion;
    this.nombreModalidad = 'N/A';
    this.nombreTipoComplemento = cicloMenu.sID_TipoComplemento;
    this.configurarMinutasAprobacion(2);
  }
  private configurarModeloOperacion3(cicloMenu: any): void {
    this.cantidad = cicloMenu.cantidadMenus;
    this.nombreModeloOP = cicloMenu.sID_TipoModeloOperacion;
    this.nombreModalidad = cicloMenu.sID_TipoModalidadComplemento;
    this.nombreTipoComplemento = cicloMenu.sID_TipoComplemento;
    this.configurarZonas(cicloMenu.iD_Zona);
    this.Zonas = cicloMenu.menusParaTodasZonas ? 1 : 2;
    this.NivelEducativo = cicloMenu.menusParaTodosNiveles ? 1 : 2;
    this.configurarMinutasAprobacion(cicloMenu.iD_TipoModeloOperacion);

    this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(cicloMenu.id).subscribe(
      (response: any) => {
        this.nivelmaem = response;

        // Ordenar los niveles educativos por ID
        this.nivelmaem.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);

        this.nuevoArray3 = [];

        if (this.nivelmaem.length === 0) {
          this.nombreNivel2 = 'N/A';
        } else {
          // Agrupar niveles educativos por iD_CiclosMenu
          this.nivelmaem.forEach((item) => {
            let existingItem = this.nuevoArray3.find(nuevoItem => nuevoItem.iD_CiclosMenu === item.iD_CiclosMenu);

            if (existingItem) {
              existingItem.sID_TipoNivelEducativo.push(item.sID_TipoNivelEducativo);
            } else {
              this.nuevoArray3.push({
                iD_CiclosMenu: item.iD_CiclosMenu,
                sID_TipoNivelEducativo: [item.sID_TipoNivelEducativo]
              });
            }
          });

          // Eliminar duplicados en sID_TipoNivelEducativo y asegurarse de que sea un array de strings
          const nivelEducativoSet = new Set(this.nuevoArray3[0].sID_TipoNivelEducativo.map(item => String(item)));
          const uniqueNivelEducativoArray = Array.from(nivelEducativoSet);

          // Convertir el array a una cadena de texto separada por comas
          this.nombreNivel2 = uniqueNivelEducativoArray.join(', ');
        }
      }
    );

  }

  private configurarZonas(idZona: number): void {
    const zona = this.ZonasList.find(item => item.id === idZona);
    if (zona) {
      this.ZonasList2 = [zona];
      this.nombreZonas = zona.nombre;
    }
  }
  private configurarMinutasAprobacion(tipoModeloOperacion: number): void {
    this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion = tipoModeloOperacion;
    this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
      (response: any) => {
        this.fisica = response.filter(item => item.id_Minuta === this.listaCicloMenu[0][0].iD_MinutaAprobacion);
        this.nombreMinuta = this.fisica[0].minuta;

        let g = (this.listaCicloMenu[0][0].iD_TipoModalidadComplemento === 3) ? 1 : this.listaCicloMenu[0][0].iD_TipoModalidadComplemento;

        // Obtener la lista de alimentos basada en la minuta aprobada
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.listaCicloMenu[0][0].iD_MinutaAprobacion, g, this.listaCicloMenu[0][0].iD_TipoComplemento).subscribe(
          (response: any) => {
            let f = response;
            if (f[0].iD_TipoModeloOperacionBase === 1) {
              this.preg5 = true;
              this.preg6 = false;
            } else if (f[0].iD_TipoModeloOperacionBase === 2) {
              this.preg5 = false;
              this.preg6 = true;
              this.MacroMicro();
            }
          }
        );
      },
      (err) => {
        // Manejo de errores si es necesario
      }
    );
  }
  semanasI() {
    this._PA_SemanasPTNGetAllWithRelationService.getPA_SemanasPTNGetAllWithRelationList(this.idCiclo).subscribe(
      (response: any) => {
        this.semanasList = response
        this.semanaList = response;

        var x = 0;
        this.semanaList.forEach(element => {
          if (x == 0) {
            element.active = true;
          } else {
            element.active = false;
          }
          element.index = x;
          x++;
        });

        this.stepSelectionChange(0);
        response.forEach(element => {
          this.nums.push(element.numeroSemana)
        });
        this.totalSteps = this.nums.length;
        this.nums.sort((firstItem, secondItem) => firstItem - secondItem);
        this.nums2 = this.nums.slice(0, this.MAX_STEP);
        this.nums.forEach(element => this.weekArray.push("semana " + element));

        if (this.weekArray.length == 1) {
          this.semanaSeleccionada = this.weekArray[0];
          this.semanaUltima = this.weekArray[this.weekArray.length - 1];
          this.showFirst = false;
          this.showLast = false;
        } else if (this.weekArray.length == 2) {
          this.semanaAnterior = this.weekArray[0];
          this.semanaSeleccionada = this.weekArray[1];
          this.semanaUltima = this.weekArray[this.weekArray.length - 1];
          this.showLast = false;
          this.stepSelectionChange(1)

        } else if (this.weekArray.length > 2) {
          this.semanaAnterior = this.weekArray[0];
          this.semanaSeleccionada = this.weekArray[1];
          this.semanaSiguiente = this.weekArray[2];
          this.semanaUltima = this.weekArray[this.weekArray.length - 1];
          this.stepSelectionChange(1)
        }
        if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {
          this.MacroMicro();
        }

      },
      (err) => {
      }
    )

  }
  RegresarAprobaciones() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigate(['/PTNCiclosDeMenu'], { queryParams: { tab: 1 } })
  }

  /**
  * This will change min max step indexes allowed at any time in view
  */
  changeMinMaxSteps(isForward = true) {
    if (this.step < this.minStepAllowed || this.step > this.maxStepAllowed) {
      if (isForward) {
        this.page++;
      } else {
        this.page--;
      }

      const pageMultiple = this.page * this.MAX_STEP;

      // maxStepAllowed will be the least value between minStep + MAX_STEP and total steps
      // minStepAllowed will be the least value between pageMultiple and maxStep - MAX_STEP
      if (pageMultiple + this.MAX_STEP - 1 <= this.totalSteps - 1) {
        this.maxStepAllowed = pageMultiple + this.MAX_STEP - 1;
        this.minStepAllowed = pageMultiple;
      } else {
        this.maxStepAllowed = this.totalSteps - 1;
        this.minStepAllowed = this.maxStepAllowed - this.MAX_STEP + 1;
      }
    }


    this.rerender();
  }

  Editar() {
    this.EsSoloLectura = true;
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 10px !important; right: 30px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p style="text-align: left; font-size: 13px; color:#005ACA;">Este ciclo de menús está siendo usado en uno o más contratos. Recuerde que al editarlo se afectarán todos los planes de alistamiento que lo tienen asociado. </p> ' +
        '<p style="text-align: left; font-size: 13px; color:#005ACA;">¿Está seguro de que quiere editar el ciclo de menús? </p> ' +
        '<p style="text-align: left; font-size: 13px; color:#005ACA; margin-top: -10px">Está acción no se puede revertir. </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: '#005ACA',
      cancelButtonColor: '#E2ECFD',
      denyButtonColor: '#005ACA',
      denyButtonText: 'Cancelar',
      cancelButtonText: 'Aceptar',
    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.cancel) {
        //this.EsSoloLectura=true;
        this.rediccionar()
      }
      else {
        //this.EsSoloLectura=false;
      }
    })
  }

  rediccionar() {
    // localStorage.setItem('nombredeUbicacionActualizado', 'si')
    this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus planes de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo, "Operadores - Delegado");
    this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus planes de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo, "Rol SiPAE-Administrador");
    this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus planes de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo, "Operadores - Administrador");

    this.router.navigate(['/RegistroCiclomenu'], { queryParams: { id: this.CiclosMenusObject[0].id } })
  }

  seleccionarTab(tab: any) {
    for (let i = 0; i < this.semanaList.length; i++) {
      if (this.semanaList[i] == tab) {
        this.semanaList[i].active = true
      } else {
        this.semanaList[i].active = false
      }
    }
    this.componenteSeleccionado = tab.index;
  }

  SelectButton(semana: any) {
    let numberSemana = semana.match(/\d+/)[0];
    this.stepSelectionChange(numberSemana - 1);
  }

  goBack() {

    let indexActual = this.weekArray.indexOf(this.semanaSeleccionada);
    if (indexActual == 1) {
      this.showFirst = false;
      this.semanaSeleccionada = this.weekArray[indexActual - 1];
      this.semanaSiguiente = this.weekArray[indexActual];
      this.semanaAnterior = '';
      this.stepSelectionChange(indexActual - 1);
      this.showLast = true;
    } else if (indexActual > 1) {
      this.semanaAnterior = this.weekArray[indexActual - 2];
      this.semanaSeleccionada = this.weekArray[indexActual - 1];
      this.semanaSiguiente = this.weekArray[indexActual];
      this.stepSelectionChange(indexActual - 1);
      this.showLast = true;
    }
  }


  goForward() {


    let indexActual = this.weekArray.indexOf(this.semanaSeleccionada);
    if (indexActual == this.weekArray.length - 2) {
      this.showLast = false;
      this.semanaSeleccionada = this.weekArray[indexActual + 1];
      this.semanaAnterior = this.weekArray[indexActual];
      this.stepSelectionChange(indexActual + 1);
      this.showFirst = true;
    } else if (indexActual < this.weekArray.length - 2) {
      this.semanaSeleccionada = this.weekArray[indexActual + 1];
      this.semanaAnterior = this.weekArray[indexActual];
      this.semanaSiguiente = this.weekArray[indexActual + 2];
      this.stepSelectionChange(indexActual + 1);
      this.showFirst = true;
    }

  }
  /**
   * This will display the steps in DOM based on the min max step indexes allowed in view
   */
  rerender() {
    const headers = this.elementRef.nativeElement.querySelectorAll(
      "mat-step-header"
    );

    const lines = this.elementRef.nativeElement.querySelectorAll(
      ".mat-stepper-horizontal-line"
    );

    for (let h of headers) {
      let str = h.getAttribute("ng-reflect-index");
      // If the step index is in between min and max allowed indexes, display it into view, otherwise set as none
      if (
        str !== null &&
        Number.parseInt(str) >= this.minStepAllowed &&
        Number.parseInt(str) <= this.maxStepAllowed
      ) {
        h.style.display = "flex";
      } else {
        h.style.display = "none";
      }
    }

    // If the line index is between min and max allowed indexes, display it in view, otherwise set as none
    // One thing to note here: length of lines is 1 less than length of headers
    // For eg, if there are 8 steps, there will be 7 lines joining those 8 steps
    for (let [index, l] of lines.entries()) {
      if (index >= this.minStepAllowed && index < this.maxStepAllowed) {
        l.style.display = "block";
      } else {
        l.style.display = "none";
      }
    }

  }

  /**
   * Mat stepper step selection change event
   */

  stepSelectionChange(event: number) {
    this.maem = false;
    this.maer = false;
    this.step = event;
    localStorage.setItem('step', this.step.toString());

    if (this.step == 0) {
      this.Semanas = 1;
      let num = 0
      let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
      num = h[0].id
      this.diasList = [];
      this.tabs = [];

      this.dias(num);
    } else {
      this.Semanas = Number(this.step) + 1;
      let num = 0;
      let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas);
      num = h[0].id;
      if (h.length == 0) {
      } else {
        this.diasList = [];
        this.tabs = [];
        this.dias(num);
      }
    }
  }

  semanaclic(event: any) {

    this.id_Zona = event;
    this.semana = true;
    if (this.step == 0) {
      this.Semanas = 1;
      let num = 0
      let h = this.semanaList.filter(item => item.numeroSemana == this.Semanas)
      num = h[0].id
      this.diasList = [];
      this.tabs = [];
      this.dias(num);
    } else {
      this.Semanas = this.step + 1;
      let num = 0
      let h = this.semanaList.filter(item => item.numeroSemana == this.Semanas)
      num = h[0].id
      if (h.length == 0) {
      } else {
        this.diasList = [];
        this.tabs = [];
        this.dias(num);
      }
    }
  }

  dias(id: number) {

    this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(id).subscribe(
      (response) => {
        this.diasList = response;
        this.diasList.sort((firstItem, secondItem) => firstItem.numeroDia - secondItem.numeroDia);
        this.nuevoArray = [];
        this.nuevoArray2 = [];
        var arrayTemporal = [];
        var arrayTemporal2 = [];
        if (this.diasList.length == 0) {

        } else {
          for (var i = 0; i < this.diasList.length; i++) {
            arrayTemporal = this.nuevoArray.filter(resp => resp["iD_Semana"] == this.diasList[i]['iD_Semana'])
            if (arrayTemporal.length > 0) {
              this.nuevoArray[this.nuevoArray.indexOf(arrayTemporal[0])]["nombre"].push(this.diasList[i]['nombre'])

            } else {
              this.nuevoArray.push({
                "iD_Semana": this.diasList[i]["iD_Semana"], "nombre": [this.diasList[i]['nombre']]

              })
            }
          }

          this.tabs = this.nuevoArray[0].nombre;
          var arr = {};

          for (var i = 0, len = this.tabs.length; i < len; i++)
            arr[this.tabs[i]] = this.tabs[i];


          this.tabs = new Array();
          for (var key in arr)
            this.tabs.push(arr[key]);

          let com = this.tabs[this.selectedTabIndex];
          this.diasText = com;

          let com2 = this.diasList.filter(item => item.nombre == com)
          com2.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);
          if (com2.length == 0) {

          } else {
            for (var i = 0; i < com2.length; i++) {
              arrayTemporal2 = this.nuevoArray2.filter(resp => resp["nombre"] == com2[i]['nombre'])
              if (arrayTemporal2.length > 0) {
                this.nuevoArray2[this.nuevoArray2.indexOf(arrayTemporal2[0])]["sID_TipoNivelEducativo"].push(com2[i]['sID_TipoNivelEducativo'])
                this.nuevoArray2[this.nuevoArray2.indexOf(arrayTemporal2[0])]["iD_TipoNivelEducativo"].push(com2[i]['iD_TipoNivelEducativo'])
              } else {
                this.nuevoArray2.push({
                  "nombre": com2[i]["nombre"], "sID_TipoNivelEducativo": [com2[i]['sID_TipoNivelEducativo']],
                  "iD_TipoNivelEducativo": [com2[i]['iD_TipoNivelEducativo']]

                })
              }
            }

            this.NivelEducativoList = this.nuevoArray2[0].sID_TipoNivelEducativo;

            //this.MenuPreparacion();


          }

          if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == undefined) { } else {
            if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {
              this.maer = true;
            } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {
              this.maem = true;
            } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
              let g = 0
              if (this.listaCicloMenu[0][0].iD_TipoModalidadComplemento == 3) {
                g = 1
              } else { g = this.listaCicloMenu[0][0].iD_TipoModalidadComplemento }
              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.listaCicloMenu[0][0].iD_MinutaAprobacion, g, this.listaCicloMenu[0][0].iD_TipoComplemento).subscribe(
                (response: any) => {
                  let f = response
                  if (f[0].iD_TipoModeloOperacionBase == 1) {
                    this.maem = true;
                  } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                    this.maer = true;
                  }
                }
              )
            }
          }

        }







      },
      (err) => {
      }
    );
  }


  onNivelEducativoChange1(event: any): void {
    console.log('nivles.', event);

    this.gradoText = event[0].value;
    this.diasText

    let gr = this.diasList.filter(item => item.sID_TipoNivelEducativo == event[0].value && item.nombre == this.diasText);
    this.idMenu = gr[0].id
    this.idNivel = gr[0].iD_TipoNivelEducativo;
    //this.Preparaciones = true;
    this.Preparaciones = false;
    this.Productos = false;
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {

      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
        this.MenuPreparacion();
      } else {
        this.MenuProducto();
      }

      this.mostrarmenucom();
    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let g = 0
      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento == 3) {
        g = 1
      } else {
        g = this.CiclosMenusObject[0].iD_TipoModalidadComplemento;
      }
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, g, this.CiclosMenusObject[0].iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CiclosMenusObject[0].iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, this.CiclosMenusObject[0].iD_TipoModalidadComplemento, j[0].id).subscribe(
              (response: any) => {
                let f = response
                if (f.length == 0) {

                } else {
                  if (f[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
                      this.MenuPreparacion();
                    } else {
                      this.MenuProducto();
                    }
                  } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                    this.MenuPreparacion();

                  }
                }

              }
            )

          } else {
            if (f[0].iD_TipoModeloOperacionBase == 1) {
              if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
                this.MenuPreparacion();
              } else {
                this.MenuProducto();
              }
            } else if (f[0].iD_TipoModeloOperacionBase == 2) {
              this.MenuPreparacion();

            }
          }

        }
      )
      this.mostrarmenucom();
    } else { }


  }
  onNivelEducativoChange11(event: any): void {


    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {
      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
        this.Preparaciones3 = true;
        this.Productos2 = false;
      } else {
        this.Preparaciones3 = false;
        this.Productos2 = true;
      }
      /* this.MenuPreparacion();
      this.mostrarmenucom(); */

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)
      if (t[0].iD_TipoModeloOperacion == 1) {
        if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
          this.Preparaciones3 = true;
          this.Productos2 = false;
        } else {
          this.Preparaciones3 = false;
          this.Productos2 = true;
        }
      } else if (t[0].iD_TipoModeloOperacion == 2) {
        this.Preparaciones2 = true;
      }

    } else { }


  }
  MenuPreparacion() {
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {
      let com = this.tabs[this.selectedTabIndex];
      this.diasText = com;
      let gr = this.diasList.filter(item => item.nombre == this.diasText);
      if (gr.length == 0) { } else { this.idMenu = gr[0].id }


    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)
      if (t[0].iD_TipoModeloOperacion == 2) {
        let com = this.tabs[this.selectedTabIndex];
        this.diasText = com;

        let gr = this.diasList.filter(item => item.nombre == this.diasText);

        if (gr.length == 0) { } else { this.idMenu = gr[0].id }
      }
    }

    this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(this.idMenu).subscribe(
      (Response: any) => {


        this.dataArrayPreparaciones = Response

        this.isLoading = false;
        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPreparaciones);
        this.dataSourcePreparacion.paginator = this.paginator;
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
        this.dataSourcePreparacion.sort = this.sort;
        this.Preparaciones = true;
        this.Productos = false;
        this.MacroMicro();
      },
      (err) => {

      }
    );
  }

  MenuProducto() {
    this._MenuProductosService.getMenuProductosListRelationFilter(this.idMenu).subscribe(
      (Response: any) => {


        this.dataArrayProd = Response

        this.isLoading = false;
        this.dataSourceProducto = new MatTableDataSource<MenuProductosModel>(this.dataArrayProd);

        this.Productos = true;
        this.Preparaciones = false;

        this.MacroMicro();
      },
      (err) => {

      }
    );
  }

  MacroMicro() {
    this.dataComponentesCrea();


    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {

      if (this.dataSourceMacro.length == 3) {

      } else {

        this.dataSourceMacro.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          icoenergia: 0,
          icoproteina: 0,
          icocarbohidrato: 0,
          icograsaTotal: 0,
          icograsaSaturada: 0,
        });

      }

      if (this.dataSourceMicro.length == 3) {

      } else {
        this.dataSourceMicro.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          icocalcio: 0,
          icohierro: 0,
          icosodio: 0,
          icovitamina: 0,
          icozinc: 0,
        });

      }

      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {


        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
        let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

        let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
        this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;

        this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
          (response) => {



            let aporte = response[0];
            let reco = response[1];
            let por = response[4];
            let ico = response[5];
            if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

            } else {
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == aporte.componente) {
                  dato.energia = aporte.en_Energia;
                  dato.proteina = aporte.ma_Proteina;
                  dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                  dato.grasaTotal = aporte.ma_GrasasTotales;
                  dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                }

                return dato;
              })
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == reco.componente) {
                  dato.energia = reco.en_Energia;
                  dato.proteina = reco.ma_Proteina;
                  dato.carbohidrato = reco.ma_CarbohidratosTotales;
                  dato.grasaTotal = reco.ma_GrasasTotales;
                  dato.grasaSaturada = reco.ma_GrasasSaturadas;
                }

                return dato;
              })
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.energia = por.en_Energia;
                  dato.proteina = por.ma_Proteina;
                  dato.carbohidrato = por.ma_CarbohidratosTotales;
                  dato.grasaTotal = por.ma_GrasasTotales;
                  dato.grasaSaturada = por.ma_GrasasSaturadas;
                }

                return dato;
              })
              //porcentaje de iconos
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.icoenergia = ico.en_Energia;
                  dato.icoproteina = ico.ma_Proteina;
                  dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                  dato.icograsaTotal = ico.ma_GrasasTotales;
                  dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                }


                return dato;
              })
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == aporte.componente) {
                  dato.calcio = aporte.mi_Calcio;
                  dato.hierro = aporte.mi_Hierro;
                  dato.sodio = aporte.mi_Sodio;
                  dato.vitamina = aporte.mi_VitaminaA;
                  dato.zinc = aporte.mi_Zinc;
                }

                return dato;
              })
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == reco.componente) {
                  dato.calcio = reco.mi_Calcio;
                  dato.hierro = reco.mi_Hierro;
                  dato.sodio = reco.mi_Sodio;
                  dato.vitamina = reco.mi_VitaminaA;
                  dato.zinc = reco.mi_Zinc;
                }

                return dato;
              })
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.calcio = por.mi_Calcio;
                  dato.hierro = por.mi_Hierro;
                  dato.sodio = por.mi_Sodio;
                  dato.vitamina = por.mi_VitaminaA;
                  dato.zinc = por.mi_Zinc;
                }

                return dato;
              })
              //ico
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.icocalcio = ico.mi_Calcio;
                  dato.icohierro = ico.mi_Hierro;
                  dato.icosodio = ico.mi_Sodio;
                  dato.icovitamina = ico.mi_VitaminaA;
                  dato.icozinc = ico.mi_Zinc;
                }


                return dato;
              })
            }



          },
          (err) => {
          }
        )

      } else {

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
        let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
        let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
        this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;
        this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
          (response) => {

            let aporte = response[0];
            let reco = response[1];
            let por = response[4];
            let ico = response[5];
            if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

            } else {
              //aporte
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == aporte.componente) {
                  dato.energia = aporte.en_Energia;
                  dato.proteina = aporte.ma_Proteina;
                  dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                  dato.grasaTotal = aporte.ma_GrasasTotales;
                  dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                }

                return dato;
              })
              //recomendacion
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == reco.componente) {
                  dato.energia = reco.en_Energia;
                  dato.proteina = reco.ma_Proteina;
                  dato.carbohidrato = reco.ma_CarbohidratosTotales;
                  dato.grasaTotal = reco.ma_GrasasTotales;
                  dato.grasaSaturada = reco.ma_GrasasSaturadas;
                }

                return dato;
              })
              //porcentaje
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.energia = por.en_Energia;
                  dato.proteina = por.ma_Proteina;
                  dato.carbohidrato = por.ma_CarbohidratosTotales;
                  dato.grasaTotal = por.ma_GrasasTotales;
                  dato.grasaSaturada = por.ma_GrasasSaturadas;
                }


                return dato;
              })
              //porcentaje de iconos
              this.dataSourceMacro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.icoenergia = ico.en_Energia;
                  dato.icoproteina = ico.ma_Proteina;
                  dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                  dato.icograsaTotal = ico.ma_GrasasTotales;
                  dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                }


                return dato;
              })

              //aporte
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == aporte.componente) {
                  dato.calcio = aporte.mi_Calcio;
                  dato.hierro = aporte.mi_Hierro;
                  dato.sodio = aporte.mi_Sodio;
                  dato.vitamina = aporte.mi_VitaminaA;
                  dato.zinc = aporte.mi_Zinc;
                }

                return dato;
              })
              //recomendacion
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == reco.componente) {
                  dato.calcio = reco.mi_Calcio;
                  dato.hierro = reco.mi_Hierro;
                  dato.sodio = reco.mi_Sodio;
                  dato.vitamina = reco.mi_VitaminaA;
                  dato.zinc = reco.mi_Zinc;
                }

                return dato;
              })
              //porcentaje
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.calcio = por.mi_Calcio;
                  dato.hierro = por.mi_Hierro;
                  dato.sodio = por.mi_Sodio;
                  dato.vitamina = por.mi_VitaminaA;
                  dato.zinc = por.mi_Zinc;
                }

                return dato;
              })
              //ico
              this.dataSourceMicro.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.icocalcio = ico.mi_Calcio;
                  dato.icohierro = ico.mi_Hierro;
                  dato.icosodio = ico.mi_Sodio;
                  dato.icovitamina = ico.mi_VitaminaA;
                  dato.icozinc = ico.mi_Zinc;
                }


                return dato;
              })
            }



          },
          (err) => {
          }
        );
      }

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

      if (this.dataSourceMacro2.length == 3) {

      } else {
        this.dataSourceMacro2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro2.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          energia2: null,
          proteina2: null,
          carbohidrato2: null,
          grasaTotal2: null,
          grasaSaturada2: null,
        });
        this.dataSourceMacro2.push({
          id: 8,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          energia2: null,
          proteina2: null,
          carbohidrato2: null,
          grasaTotal2: null,
          grasaSaturada2: null,
          icoenergia: 0,
          icoproteina: 0,
          icocarbohidrato: 0,
          icograsaTotal: 0,
          icograsaSaturada: 0,
          icoenergia2: 0,
          icoproteina2: 0,
          icocarbohidrato2: 0,
          icograsaTotal2: 0,
          icograsaSaturada2: 0,
        });

      }
      if (this.dataSourceMicro2.length == 3) {

      } else {
        this.dataSourceMicro2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro2.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          calcio2: null,
          hierro2: null,
          sodio2: null,
          vitamina2: null,
          zinc2: null,
        });
        this.dataSourceMicro2.push({
          id: 8,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          calcio2: null,
          hierro2: null,
          sodio2: null,
          vitamina2: null,
          zinc2: null,
          icocalcio: 0,
          icohierro: 0,
          icosodio: 0,
          icovitamina: 0,
          icozinc: 0,
          icocalcio2: 0,
          icohierro2: 0,
          icosodio2: 0,
          icovitamina2: 0,
          icozinc2: 0,
        });

      }
      this.dataComponentesCrea();



      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona */
      if (this.semanaList.length == 0) { } else {
        let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
        let f = this.diasList.filter(item => item.nombre == this.diasText)
        if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; }
      }
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id


      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.idNivel; */
      this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
        (response) => {

          let aporte = response[0];
          let recomin = response[1];
          let recomax = response[2];
          let pormin = response[7];
          let pormax = response[8];
          let icomin = response[9];
          let icomax = response[10];
          if (aporte == undefined || recomin == undefined ||
            recomax == undefined || pormin == undefined || pormax == undefined
            || icomin == undefined || icomax == undefined) {

          } else {
            this.dataSourceMacro2.map(function (dato) {
              if (dato.id == aporte.componente) {
                dato.energia = aporte.en_Energia;
                dato.proteina = aporte.ma_Proteina;
                dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                dato.grasaTotal = aporte.ma_GrasasTotales;
                dato.grasaSaturada = aporte.ma_GrasasSaturadas;
              }

              return dato;
            })
            this.dataSourceMacro2.map(function (dato) {
              if (dato.id == recomin.componente) {
                dato.energia = recomin.en_Energia;
                dato.proteina = recomin.ma_Proteina;
                dato.carbohidrato = recomin.ma_CarbohidratosTotales;
                dato.grasaTotal = recomin.ma_GrasasTotales;
                dato.grasaSaturada = recomin.ma_GrasasSaturadas;
                dato.energia2 = recomax.en_Energia;
                dato.proteina2 = recomax.ma_Proteina;
                dato.carbohidrato2 = recomax.ma_CarbohidratosTotales;
                dato.grasaTotal2 = recomax.ma_GrasasTotales;
                dato.grasaSaturada2 = recomax.ma_GrasasSaturadas;
              }

              return dato;
            })
            this.dataSourceMacro2.map(function (dato) {
              if (dato.id == pormin.componente) {
                dato.energia = pormin.en_Energia;
                dato.proteina = pormin.ma_Proteina;
                dato.carbohidrato = pormin.ma_CarbohidratosTotales;
                dato.grasaTotal = pormin.ma_GrasasTotales;
                dato.grasaSaturada = pormin.ma_GrasasSaturadas;

                dato.energia2 = pormax.en_Energia;
                dato.proteina2 = pormax.ma_Proteina;
                dato.carbohidrato2 = pormax.ma_CarbohidratosTotales;
                dato.grasaTotal2 = pormax.ma_GrasasTotales;
                dato.grasaSaturada2 = pormax.ma_GrasasSaturadas;
              }

              return dato;
            })
            //porcentaje de iconos
            this.dataSourceMacro2.map(function (dato) {
              if (dato.id == pormin.componente) {
                dato.icoenergia = icomin.en_Energia;
                dato.icoproteina = icomin.ma_Proteina;
                dato.icocarbohidrato = icomin.ma_CarbohidratosTotales;
                dato.icograsaTotal = icomin.ma_GrasasTotales;
                dato.icograsaSaturada = icomin.ma_GrasasSaturadas;

                dato.icoenergia2 = icomax.en_Energia;
                dato.icoproteina2 = icomax.ma_Proteina;
                dato.icocarbohidrato2 = icomax.ma_CarbohidratosTotales;
                dato.icograsaTotal2 = icomax.ma_GrasasTotales;
                dato.icograsaSaturada2 = icomax.ma_GrasasSaturadas;
              }


              return dato;
            })
            this.dataSourceMicro2.map(function (dato) {
              if (dato.id == aporte.componente) {
                dato.calcio = aporte.mi_Calcio;
                dato.hierro = aporte.mi_Hierro;
                dato.sodio = aporte.mi_Sodio;
                dato.vitamina = aporte.mi_VitaminaA;
                dato.zinc = aporte.mi_Zinc;
              }

              return dato;
            })
            this.dataSourceMicro2.map(function (dato) {
              if (dato.id == recomin.componente) {
                dato.calcio = recomin.mi_Calcio;
                dato.hierro = recomin.mi_Hierro;
                dato.sodio = recomin.mi_Sodio;
                dato.vitamina = recomin.mi_VitaminaA;
                dato.zinc = recomin.mi_Zinc;

                dato.calcio2 = recomax.mi_Calcio;
                dato.hierro2 = recomax.mi_Hierro;
                dato.sodio2 = recomax.mi_Sodio;
                dato.vitamina2 = recomax.mi_VitaminaA;
                dato.zinc2 = recomax.mi_Zinc;
              }

              return dato;
            })
            this.dataSourceMicro2.map(function (dato) {
              if (dato.id == pormin.componente) {
                dato.calcio = pormin.mi_Calcio;
                dato.hierro = pormin.mi_Hierro;
                dato.sodio = pormin.mi_Sodio;
                dato.vitamina = pormin.mi_VitaminaA;
                dato.zinc = pormin.mi_Zinc;

                dato.calcio2 = pormax.mi_Calcio;
                dato.hierro2 = pormax.mi_Hierro;
                dato.sodio2 = pormax.mi_Sodio;
                dato.vitamina2 = pormax.mi_VitaminaA;
                dato.zinc2 = pormax.mi_Zinc;
              }

              return dato;
            })
            //ico
            this.dataSourceMicro2.map(function (dato) {
              if (dato.id == pormin.componente) {
                dato.icocalcio = icomin.mi_Calcio;
                dato.icohierro = icomin.mi_Hierro;
                dato.icosodio = icomin.mi_Sodio;
                dato.icovitamina = icomin.mi_VitaminaA;
                dato.icozinc = icomin.mi_Zinc;

                dato.icocalcio2 = icomax.mi_Calcio;
                dato.icohierro2 = icomax.mi_Hierro;
                dato.icosodio2 = icomax.mi_Sodio;
                dato.icovitamina2 = icomax.mi_VitaminaA;
                dato.icozinc2 = icomax.mi_Zinc;
              }


              return dato;
            })
          }



        },
        (err) => {
        }
      );
      let dia = 0
      if (this.diasList.length == 0) { } else {
        let f = this.diasList.filter(item => item.nombre == this.diasText)
        if (f.length == 0) { } else {
          dia = f[0].numeroDia
        }
      }

      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
      this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
      this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      if (this.dataSourceMacro.length == 3) {

      } else {

        this.dataSourceMacro.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          icoenergia: 0,
          icoproteina: 0,
          icocarbohidrato: 0,
          icograsaTotal: 0,
          icograsaSaturada: 0,
        });

      }

      if (this.dataSourceMicro.length == 3) {

      } else {
        this.dataSourceMicro.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          icocalcio: 0,
          icohierro: 0,
          icosodio: 0,
          icovitamina: 0,
          icozinc: 0,
        });

      }
      if (this.dataSourceMacro2.length == 3) {

      } else {
        this.dataSourceMacro2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacro2.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          energia2: null,
          proteina2: null,
          carbohidrato2: null,
          grasaTotal2: null,
          grasaSaturada2: null,
        });
        this.dataSourceMacro2.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
          energia2: null,
          proteina2: null,
          carbohidrato2: null,
          grasaTotal2: null,
          grasaSaturada2: null,
          icoenergia: 0,
          icoproteina: 0,
          icocarbohidrato: 0,
          icograsaTotal: 0,
          icograsaSaturada: 0,
          icoenergia2: 0,
          icoproteina2: 0,
          icocarbohidrato2: 0,
          icograsaTotal2: 0,
          icograsaSaturada2: 0,
        });

      }
      if (this.dataSourceMicro2.length == 3) {

      } else {
        this.dataSourceMicro2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicro2.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          calcio2: null,
          hierro2: null,
          sodio2: null,
          vitamina2: null,
          zinc2: null,
        });
        this.dataSourceMicro2.push({
          id: 5,
          nombre: 'Porcentaje de cumplimiento de la adecuación',
          titulo: 'Porcentaje de cumplimiento de la adecuación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
          calcio2: null,
          hierro2: null,
          sodio2: null,
          vitamina2: null,
          zinc2: null,
          icocalcio: 0,
          icohierro: 0,
          icosodio: 0,
          icovitamina: 0,
          icozinc: 0,
          icocalcio2: 0,
          icohierro2: 0,
          icosodio2: 0,
          icovitamina2: 0,
          icozinc2: 0,
        });

      }
      this.dataComponentesCrea()

      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)

      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, this.CiclosMenusObject[0].iD_TipoModalidadComplemento, this.CiclosMenusObject[0].iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CiclosMenusObject[0].iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, this.CiclosMenusObject[0].iD_TipoModalidadComplemento, j[0].id).subscribe(
              (response: any) => {
                let e = response
                if (e.length == 0) {

                } else {
                  //Moderada 2 level 1

                  if (e[0].iD_TipoModeloOperacionBase == 1) {



                    if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                      let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                      let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                      this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;

                      this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                        (response) => {



                          let aporte = response[0];
                          let reco = response[1];
                          let por = response[4];
                          let ico = response[5];
                          if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                          } else {
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.energia = aporte.en_Energia;
                                dato.proteina = aporte.ma_Proteina;
                                dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                                dato.grasaTotal = aporte.ma_GrasasTotales;
                                dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.energia = reco.en_Energia;
                                dato.proteina = reco.ma_Proteina;
                                dato.carbohidrato = reco.ma_CarbohidratosTotales;
                                dato.grasaTotal = reco.ma_GrasasTotales;
                                dato.grasaSaturada = reco.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.energia = por.en_Energia;
                                dato.proteina = por.ma_Proteina;
                                dato.carbohidrato = por.ma_CarbohidratosTotales;
                                dato.grasaTotal = por.ma_GrasasTotales;
                                dato.grasaSaturada = por.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            //porcentaje de iconos
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.icoenergia = ico.en_Energia;
                                dato.icoproteina = ico.ma_Proteina;
                                dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                                dato.icograsaTotal = ico.ma_GrasasTotales;
                                dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                              }


                              return dato;
                            })
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.calcio = aporte.mi_Calcio;
                                dato.hierro = aporte.mi_Hierro;
                                dato.sodio = aporte.mi_Sodio;
                                dato.vitamina = aporte.mi_VitaminaA;
                                dato.zinc = aporte.mi_Zinc;
                              }

                              return dato;
                            })
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.calcio = reco.mi_Calcio;
                                dato.hierro = reco.mi_Hierro;
                                dato.sodio = reco.mi_Sodio;
                                dato.vitamina = reco.mi_VitaminaA;
                                dato.zinc = reco.mi_Zinc;
                              }

                              return dato;
                            })
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.calcio = por.mi_Calcio;
                                dato.hierro = por.mi_Hierro;
                                dato.sodio = por.mi_Sodio;
                                dato.vitamina = por.mi_VitaminaA;
                                dato.zinc = por.mi_Zinc;
                              }

                              return dato;
                            })
                            //ico
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.icocalcio = ico.mi_Calcio;
                                dato.icohierro = ico.mi_Hierro;
                                dato.icosodio = ico.mi_Sodio;
                                dato.icovitamina = ico.mi_VitaminaA;
                                dato.icozinc = ico.mi_Zinc;
                              }


                              return dato;
                            })
                          }



                        },
                        (err) => {
                        }
                      )



                    } else {


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                      let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                      let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                      this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;
                      this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                        (response) => {

                          let aporte = response[0];
                          let reco = response[1];
                          let por = response[4];
                          let ico = response[5];
                          if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                          } else {
                            //aporte
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.energia = aporte.en_Energia;
                                dato.proteina = aporte.ma_Proteina;
                                dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                                dato.grasaTotal = aporte.ma_GrasasTotales;
                                dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            //recomendacion
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.energia = reco.en_Energia;
                                dato.proteina = reco.ma_Proteina;
                                dato.carbohidrato = reco.ma_CarbohidratosTotales;
                                dato.grasaTotal = reco.ma_GrasasTotales;
                                dato.grasaSaturada = reco.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            //porcentaje
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.energia = por.en_Energia;
                                dato.proteina = por.ma_Proteina;
                                dato.carbohidrato = por.ma_CarbohidratosTotales;
                                dato.grasaTotal = por.ma_GrasasTotales;
                                dato.grasaSaturada = por.ma_GrasasSaturadas;
                              }


                              return dato;
                            })
                            //porcentaje de iconos
                            this.dataSourceMacro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.icoenergia = ico.en_Energia;
                                dato.icoproteina = ico.ma_Proteina;
                                dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                                dato.icograsaTotal = ico.ma_GrasasTotales;
                                dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                              }


                              return dato;
                            })

                            //aporte
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.calcio = aporte.mi_Calcio;
                                dato.hierro = aporte.mi_Hierro;
                                dato.sodio = aporte.mi_Sodio;
                                dato.vitamina = aporte.mi_VitaminaA;
                                dato.zinc = aporte.mi_Zinc;
                              }

                              return dato;
                            })
                            //recomendacion
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.calcio = reco.mi_Calcio;
                                dato.hierro = reco.mi_Hierro;
                                dato.sodio = reco.mi_Sodio;
                                dato.vitamina = reco.mi_VitaminaA;
                                dato.zinc = reco.mi_Zinc;
                              }

                              return dato;
                            })
                            //porcentaje
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.calcio = por.mi_Calcio;
                                dato.hierro = por.mi_Hierro;
                                dato.sodio = por.mi_Sodio;
                                dato.vitamina = por.mi_VitaminaA;
                                dato.zinc = por.mi_Zinc;
                              }

                              return dato;
                            })
                            //ico
                            this.dataSourceMicro.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.icocalcio = ico.mi_Calcio;
                                dato.icohierro = ico.mi_Hierro;
                                dato.icosodio = ico.mi_Sodio;
                                dato.icovitamina = ico.mi_VitaminaA;
                                dato.icozinc = ico.mi_Zinc;
                              }


                              return dato;
                            })
                          }



                        },
                        (err) => {
                        }
                      );
                    }
                  } else if (e[0].iD_TipoModeloOperacionBase == 2) {

                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                    /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona */
                    let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                    if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                    let f = this.diasList.filter(item => item.nombre == this.diasText)
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                    if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; }

                    /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.idNivel; */
                    this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                      (response) => {

                        let aporte = response[0];
                        let recomin = response[1];
                        let recomax = response[2];
                        let pormin = response[7];
                        let pormax = response[8];
                        let icomin = response[9];
                        let icomax = response[10];
                        if (aporte == undefined || recomin == undefined ||
                          recomax == undefined || pormin == undefined || pormax == undefined
                          || icomin == undefined || icomax == undefined) {

                        } else {
                          this.dataSourceMacro2.map(function (dato) {
                            if (dato.id == aporte.componente) {
                              dato.energia = aporte.en_Energia;
                              dato.proteina = aporte.ma_Proteina;
                              dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                              dato.grasaTotal = aporte.ma_GrasasTotales;
                              dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                            }

                            return dato;
                          })
                          this.dataSourceMacro2.map(function (dato) {
                            if (dato.id == recomin.componente) {
                              dato.energia = recomin.en_Energia;
                              dato.proteina = recomin.ma_Proteina;
                              dato.carbohidrato = recomin.ma_CarbohidratosTotales;
                              dato.grasaTotal = recomin.ma_GrasasTotales;
                              dato.grasaSaturada = recomin.ma_GrasasSaturadas;
                              dato.energia2 = recomax.en_Energia;
                              dato.proteina2 = recomax.ma_Proteina;
                              dato.carbohidrato2 = recomax.ma_CarbohidratosTotales;
                              dato.grasaTotal2 = recomax.ma_GrasasTotales;
                              dato.grasaSaturada2 = recomax.ma_GrasasSaturadas;
                            }

                            return dato;
                          })
                          this.dataSourceMacro2.map(function (dato) {
                            if (dato.id == pormin.componente) {
                              dato.energia = pormin.en_Energia;
                              dato.proteina = pormin.ma_Proteina;
                              dato.carbohidrato = pormin.ma_CarbohidratosTotales;
                              dato.grasaTotal = pormin.ma_GrasasTotales;
                              dato.grasaSaturada = pormin.ma_GrasasSaturadas;

                              dato.energia2 = pormax.en_Energia;
                              dato.proteina2 = pormax.ma_Proteina;
                              dato.carbohidrato2 = pormax.ma_CarbohidratosTotales;
                              dato.grasaTotal2 = pormax.ma_GrasasTotales;
                              dato.grasaSaturada2 = pormax.ma_GrasasSaturadas;
                            }

                            return dato;
                          })
                          //porcentaje de iconos
                          this.dataSourceMacro.map(function (dato) {
                            if (dato.id == pormin.componente) {
                              dato.icoenergia = icomin.en_Energia;
                              dato.icoproteina = icomin.ma_Proteina;
                              dato.icocarbohidrato = icomin.ma_CarbohidratosTotales;
                              dato.icograsaTotal = icomin.ma_GrasasTotales;
                              dato.icograsaSaturada = icomin.ma_GrasasSaturadas;

                              dato.icoenergia2 = icomax.en_Energia;
                              dato.icoproteina2 = icomax.ma_Proteina;
                              dato.icocarbohidrato2 = icomax.ma_CarbohidratosTotales;
                              dato.icograsaTotal2 = icomax.ma_GrasasTotales;
                              dato.icograsaSaturada2 = icomax.ma_GrasasSaturadas;
                            }


                            return dato;
                          })
                          this.dataSourceMicro2.map(function (dato) {
                            if (dato.id == aporte.componente) {
                              dato.calcio = aporte.mi_Calcio;
                              dato.hierro = aporte.mi_Hierro;
                              dato.sodio = aporte.mi_Sodio;
                              dato.vitamina = aporte.mi_VitaminaA;
                              dato.zinc = aporte.mi_Zinc;
                            }

                            return dato;
                          })
                          this.dataSourceMicro2.map(function (dato) {
                            if (dato.id == recomin.componente) {
                              dato.calcio = recomin.mi_Calcio;
                              dato.hierro = recomin.mi_Hierro;
                              dato.sodio = recomin.mi_Sodio;
                              dato.vitamina = recomin.mi_VitaminaA;
                              dato.zinc = recomin.mi_Zinc;

                              dato.calcio2 = recomax.mi_Calcio;
                              dato.hierro2 = recomax.mi_Hierro;
                              dato.sodio2 = recomax.mi_Sodio;
                              dato.vitamina2 = recomax.mi_VitaminaA;
                              dato.zinc2 = recomax.mi_Zinc;
                            }

                            return dato;
                          })
                          this.dataSourceMicro2.map(function (dato) {
                            if (dato.id == pormin.componente) {
                              dato.calcio = pormin.mi_Calcio;
                              dato.hierro = pormin.mi_Hierro;
                              dato.sodio = pormin.mi_Sodio;
                              dato.vitamina = pormin.mi_VitaminaA;
                              dato.zinc = pormin.mi_Zinc;

                              dato.calcio2 = pormax.mi_Calcio;
                              dato.hierro2 = pormax.mi_Hierro;
                              dato.sodio2 = pormax.mi_Sodio;
                              dato.vitamina2 = pormax.mi_VitaminaA;
                              dato.zinc2 = pormax.mi_Zinc;
                            }

                            return dato;
                          })
                          //ico
                          this.dataSourceMicro.map(function (dato) {
                            if (dato.id == pormin.componente) {
                              dato.icocalcio = icomin.mi_Calcio;
                              dato.icohierro = icomin.mi_Hierro;
                              dato.icosodio = icomin.mi_Sodio;
                              dato.icovitamina = icomin.mi_VitaminaA;
                              dato.icozinc = icomin.mi_Zinc;

                              dato.icocalcio2 = icomax.mi_Calcio;
                              dato.icohierro2 = icomax.mi_Hierro;
                              dato.icosodio2 = icomax.mi_Sodio;
                              dato.icovitamina2 = icomax.mi_VitaminaA;
                              dato.icozinc2 = icomax.mi_Zinc;
                            }


                            return dato;
                          })
                        }



                      },
                      (err) => {
                      }
                    );
                    let dia = 0
                    if (f.length == 0) { } else {
                      dia = f[0].numeroDia
                    }
                    this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
                    this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
                    this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
                    this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);



                  }
                }

              }
            )

          } else {
            //Moderada 2 level 1

            if (f[0].iD_TipoModeloOperacionBase == 1) {


              if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;

                this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                  (response) => {



                    let aporte = response[0];
                    let reco = response[1];
                    let por = response[4];
                    let ico = response[5];
                    if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                    } else {
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.energia = aporte.en_Energia;
                          dato.proteina = aporte.ma_Proteina;
                          dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                          dato.grasaTotal = aporte.ma_GrasasTotales;
                          dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.energia = reco.en_Energia;
                          dato.proteina = reco.ma_Proteina;
                          dato.carbohidrato = reco.ma_CarbohidratosTotales;
                          dato.grasaTotal = reco.ma_GrasasTotales;
                          dato.grasaSaturada = reco.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.energia = por.en_Energia;
                          dato.proteina = por.ma_Proteina;
                          dato.carbohidrato = por.ma_CarbohidratosTotales;
                          dato.grasaTotal = por.ma_GrasasTotales;
                          dato.grasaSaturada = por.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      //porcentaje de iconos
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.icoenergia = ico.en_Energia;
                          dato.icoproteina = ico.ma_Proteina;
                          dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                          dato.icograsaTotal = ico.ma_GrasasTotales;
                          dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                        }


                        return dato;
                      })
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.calcio = aporte.mi_Calcio;
                          dato.hierro = aporte.mi_Hierro;
                          dato.sodio = aporte.mi_Sodio;
                          dato.vitamina = aporte.mi_VitaminaA;
                          dato.zinc = aporte.mi_Zinc;
                        }

                        return dato;
                      })
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.calcio = reco.mi_Calcio;
                          dato.hierro = reco.mi_Hierro;
                          dato.sodio = reco.mi_Sodio;
                          dato.vitamina = reco.mi_VitaminaA;
                          dato.zinc = reco.mi_Zinc;
                        }

                        return dato;
                      })
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.calcio = por.mi_Calcio;
                          dato.hierro = por.mi_Hierro;
                          dato.sodio = por.mi_Sodio;
                          dato.vitamina = por.mi_VitaminaA;
                          dato.zinc = por.mi_Zinc;
                        }

                        return dato;
                      })
                      //ico
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.icocalcio = ico.mi_Calcio;
                          dato.icohierro = ico.mi_Hierro;
                          dato.icosodio = ico.mi_Sodio;
                          dato.icovitamina = ico.mi_VitaminaA;
                          dato.icozinc = ico.mi_Zinc;
                        }


                        return dato;
                      })
                    }



                  },
                  (err) => {
                  }
                )


              } else {


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                let f = this.diasList.filter(item => item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.idNivel)
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;
                this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                  (response) => {

                    let aporte = response[0];
                    let reco = response[1];
                    let por = response[4];
                    let ico = response[5];
                    if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                    } else {
                      //aporte
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.energia = aporte.en_Energia;
                          dato.proteina = aporte.ma_Proteina;
                          dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                          dato.grasaTotal = aporte.ma_GrasasTotales;
                          dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      //recomendacion
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.energia = reco.en_Energia;
                          dato.proteina = reco.ma_Proteina;
                          dato.carbohidrato = reco.ma_CarbohidratosTotales;
                          dato.grasaTotal = reco.ma_GrasasTotales;
                          dato.grasaSaturada = reco.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      //porcentaje
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.energia = por.en_Energia;
                          dato.proteina = por.ma_Proteina;
                          dato.carbohidrato = por.ma_CarbohidratosTotales;
                          dato.grasaTotal = por.ma_GrasasTotales;
                          dato.grasaSaturada = por.ma_GrasasSaturadas;
                        }


                        return dato;
                      })
                      //porcentaje de iconos
                      this.dataSourceMacro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.icoenergia = ico.en_Energia;
                          dato.icoproteina = ico.ma_Proteina;
                          dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                          dato.icograsaTotal = ico.ma_GrasasTotales;
                          dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                        }


                        return dato;
                      })

                      //aporte
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.calcio = aporte.mi_Calcio;
                          dato.hierro = aporte.mi_Hierro;
                          dato.sodio = aporte.mi_Sodio;
                          dato.vitamina = aporte.mi_VitaminaA;
                          dato.zinc = aporte.mi_Zinc;
                        }

                        return dato;
                      })
                      //recomendacion
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.calcio = reco.mi_Calcio;
                          dato.hierro = reco.mi_Hierro;
                          dato.sodio = reco.mi_Sodio;
                          dato.vitamina = reco.mi_VitaminaA;
                          dato.zinc = reco.mi_Zinc;
                        }

                        return dato;
                      })
                      //porcentaje
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.calcio = por.mi_Calcio;
                          dato.hierro = por.mi_Hierro;
                          dato.sodio = por.mi_Sodio;
                          dato.vitamina = por.mi_VitaminaA;
                          dato.zinc = por.mi_Zinc;
                        }

                        return dato;
                      })
                      //ico
                      this.dataSourceMicro.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.icocalcio = ico.mi_Calcio;
                          dato.icohierro = ico.mi_Hierro;
                          dato.icosodio = ico.mi_Sodio;
                          dato.icovitamina = ico.mi_VitaminaA;
                          dato.icozinc = ico.mi_Zinc;
                        }


                        return dato;
                      })
                    }



                  },
                  (err) => {
                  }
                );
              }
            } else if (f[0].iD_TipoModeloOperacionBase == 2) {

              this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
              /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona */
              let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
              if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
              let f = this.diasList.filter(item => item.nombre == this.diasText)
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
              if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; }

              /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.idNivel; */
              this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                (response) => {

                  let aporte = response[0];
                  let recomin = response[1];
                  let recomax = response[2];
                  let pormin = response[7];
                  let pormax = response[8];
                  let icomin = response[9];
                  let icomax = response[10];
                  if (aporte == undefined || recomin == undefined ||
                    recomax == undefined || pormin == undefined || pormax == undefined
                    || icomin == undefined || icomax == undefined) {

                  } else {
                    this.dataSourceMacro2.map(function (dato) {
                      if (dato.id == aporte.componente) {
                        dato.energia = aporte.en_Energia;
                        dato.proteina = aporte.ma_Proteina;
                        dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                        dato.grasaTotal = aporte.ma_GrasasTotales;
                        dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                      }

                      return dato;
                    })
                    this.dataSourceMacro2.map(function (dato) {
                      if (dato.id == recomin.componente) {
                        dato.energia = recomin.en_Energia;
                        dato.proteina = recomin.ma_Proteina;
                        dato.carbohidrato = recomin.ma_CarbohidratosTotales;
                        dato.grasaTotal = recomin.ma_GrasasTotales;
                        dato.grasaSaturada = recomin.ma_GrasasSaturadas;
                        dato.energia2 = recomax.en_Energia;
                        dato.proteina2 = recomax.ma_Proteina;
                        dato.carbohidrato2 = recomax.ma_CarbohidratosTotales;
                        dato.grasaTotal2 = recomax.ma_GrasasTotales;
                        dato.grasaSaturada2 = recomax.ma_GrasasSaturadas;
                      }

                      return dato;
                    })
                    this.dataSourceMacro2.map(function (dato) {
                      if (dato.id == pormin.componente) {
                        dato.energia = pormin.en_Energia;
                        dato.proteina = pormin.ma_Proteina;
                        dato.carbohidrato = pormin.ma_CarbohidratosTotales;
                        dato.grasaTotal = pormin.ma_GrasasTotales;
                        dato.grasaSaturada = pormin.ma_GrasasSaturadas;

                        dato.energia2 = pormax.en_Energia;
                        dato.proteina2 = pormax.ma_Proteina;
                        dato.carbohidrato2 = pormax.ma_CarbohidratosTotales;
                        dato.grasaTotal2 = pormax.ma_GrasasTotales;
                        dato.grasaSaturada2 = pormax.ma_GrasasSaturadas;
                      }

                      return dato;
                    })
                    //porcentaje de iconos
                    this.dataSourceMacro.map(function (dato) {
                      if (dato.id == pormin.componente) {
                        dato.icoenergia = icomin.en_Energia;
                        dato.icoproteina = icomin.ma_Proteina;
                        dato.icocarbohidrato = icomin.ma_CarbohidratosTotales;
                        dato.icograsaTotal = icomin.ma_GrasasTotales;
                        dato.icograsaSaturada = icomin.ma_GrasasSaturadas;

                        dato.icoenergia2 = icomax.en_Energia;
                        dato.icoproteina2 = icomax.ma_Proteina;
                        dato.icocarbohidrato2 = icomax.ma_CarbohidratosTotales;
                        dato.icograsaTotal2 = icomax.ma_GrasasTotales;
                        dato.icograsaSaturada2 = icomax.ma_GrasasSaturadas;
                      }


                      return dato;
                    })
                    this.dataSourceMicro2.map(function (dato) {
                      if (dato.id == aporte.componente) {
                        dato.calcio = aporte.mi_Calcio;
                        dato.hierro = aporte.mi_Hierro;
                        dato.sodio = aporte.mi_Sodio;
                        dato.vitamina = aporte.mi_VitaminaA;
                        dato.zinc = aporte.mi_Zinc;
                      }

                      return dato;
                    })
                    this.dataSourceMicro2.map(function (dato) {
                      if (dato.id == recomin.componente) {
                        dato.calcio = recomin.mi_Calcio;
                        dato.hierro = recomin.mi_Hierro;
                        dato.sodio = recomin.mi_Sodio;
                        dato.vitamina = recomin.mi_VitaminaA;
                        dato.zinc = recomin.mi_Zinc;

                        dato.calcio2 = recomax.mi_Calcio;
                        dato.hierro2 = recomax.mi_Hierro;
                        dato.sodio2 = recomax.mi_Sodio;
                        dato.vitamina2 = recomax.mi_VitaminaA;
                        dato.zinc2 = recomax.mi_Zinc;
                      }

                      return dato;
                    })
                    this.dataSourceMicro2.map(function (dato) {
                      if (dato.id == pormin.componente) {
                        dato.calcio = pormin.mi_Calcio;
                        dato.hierro = pormin.mi_Hierro;
                        dato.sodio = pormin.mi_Sodio;
                        dato.vitamina = pormin.mi_VitaminaA;
                        dato.zinc = pormin.mi_Zinc;

                        dato.calcio2 = pormax.mi_Calcio;
                        dato.hierro2 = pormax.mi_Hierro;
                        dato.sodio2 = pormax.mi_Sodio;
                        dato.vitamina2 = pormax.mi_VitaminaA;
                        dato.zinc2 = pormax.mi_Zinc;
                      }

                      return dato;
                    })
                    //ico
                    this.dataSourceMicro.map(function (dato) {
                      if (dato.id == pormin.componente) {
                        dato.icocalcio = icomin.mi_Calcio;
                        dato.icohierro = icomin.mi_Hierro;
                        dato.icosodio = icomin.mi_Sodio;
                        dato.icovitamina = icomin.mi_VitaminaA;
                        dato.icozinc = icomin.mi_Zinc;

                        dato.icocalcio2 = icomax.mi_Calcio;
                        dato.icohierro2 = icomax.mi_Hierro;
                        dato.icosodio2 = icomax.mi_Sodio;
                        dato.icovitamina2 = icomax.mi_VitaminaA;
                        dato.icozinc2 = icomax.mi_Zinc;
                      }


                      return dato;
                    })
                  }



                },
                (err) => {
                }
              );
              let dia = 0
              if (f.length == 0) { } else {
                dia = f[0].numeroDia
              }
              this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
              this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
              this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
              this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);


            }
          }

        }
      )

    }

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
  mensaje() {
    this.ngOnInit()
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="position: absolute !important ; top: 19px !important; right: 20px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">Confirmar aprobación del Ciclo de menú: </p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">${this.nombreCiclo}</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',

      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.aprobaciones()
      }
      else {
      }
    })
  }
  aprobaciones() {

  
      this.AprobacionObject.id = 0;
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Ninguno'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }

      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.AprobacionObject.id_Secciones = 18;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 13;
      this.AprobacionObject.ubicacionOrigen = this.idCiclo.toString();
      this.AprobacionObject.documentoParaAprobar = 'no tiene documento';

      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {
          this.fillTableAprobaciones()
          this.clearForm()
          let estaApro = ''
          if (response.iD_AccionAprobacion === 1) {

            this.CiclosMenusObject.iD_EstadoRegistro = 3;
            estaApro = 'Aprobado'
          } else {

            this.CiclosMenusObject.iD_EstadoRegistro = 2;
            estaApro = 'Rechazado'
          }
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú fue " + estaApro + " " + this.nombreCiclo, "Nutricionista - Profesional Técnico");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú fue " + estaApro + " " + this.nombreCiclo, "Rol SiPAE-Administrador");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú fue " + estaApro + " " + this.nombreCiclo, "Nutricionista - Profesional Técnico - ET");

          this.CiclosMenusObject.cantidadMenus = this.listaCicloMenu[0][0].cantidadMenus;
          this.CiclosMenusObject.iD_CiclosMenuReferencia = this.listaCicloMenu[0][0].iD_CiclosMenuReferencia
          this.CiclosMenusObject.iD_ETC = this.listaCicloMenu[0][0].iD_ETC
          this.CiclosMenusObject.iD_MinutaAprobacion = this.listaCicloMenu[0][0].iD_MinutaAprobacion
          this.CiclosMenusObject.iD_TipoComplemento = this.listaCicloMenu[0][0].iD_TipoComplemento
          this.CiclosMenusObject.iD_TipoModalidadComplemento = this.listaCicloMenu[0][0].iD_TipoModalidadComplemento
          this.CiclosMenusObject.iD_TipoModeloOperacion = this.listaCicloMenu[0][0].iD_TipoModeloOperacion
          this.CiclosMenusObject.iD_TipoNivelEducativo = this.listaCicloMenu[0][0].iD_TipoNivelEducativo
          this.CiclosMenusObject.iD_Zona = this.listaCicloMenu[0][0].iD_Zona
          this.CiclosMenusObject.id = this.listaCicloMenu[0][0].id
          this.CiclosMenusObject.menuReferencia = this.listaCicloMenu[0][0].menuReferencia
          this.CiclosMenusObject.menusParaTodasZonas = this.listaCicloMenu[0][0].menusParaTodasZonas
          this.CiclosMenusObject.menusParaTodosNiveles = this.listaCicloMenu[0][0].menusParaTodosNiveles
          this.CiclosMenusObject.nombre = this.listaCicloMenu[0][0].nombre

          this._CiclosMenusService.updateCiclosMenus(this.CiclosMenusObject).subscribe((response) => {
            this.cantAprobaciones = 0;
            this.yaCargoAprobaciones = false;
            this.traerDatos(this.idCiclo)
          },
            (err) => {


            });

        },
        (err) => {
        }
      );
    


  }
  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response || [];  // Inicializa como un array vacío si no hay datos
        if (!this.AccionesAprobacionesList) {
          this.AccionesAprobacionesList = [];
        }

        if (this.AccionesAprobacionList && this.AccionesAprobacionList.length > 0) {
          this.AccionesAprobacionesList = this.AccionesAprobacionList.slice(); // Crear una copia
          this.AccionesAprobacionesList.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });
        }


        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullListUbicacion(this.idCiclo.toString(),18).subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosp.getGetAprobacionesGetAllWithRelListfilterUbi(18, this.idETC,this.idCiclo.toString()).subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response;

                this.dataArrayAprobaciones.forEach(element => {
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }

                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;

                });
                this.dataArrayAprobaciones.sort(function (a, b) {
                  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator;
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
  clearForm() {
    this.form.reset({
      'observaciones': '',
      'accionAprobacion': '',
    });
  }

  dataComponentesCrea() {
    // if (this.dataComponentes.length == 7) {

    // } else {
    this.dataComponentes = [];
    this.dataComponentes.push({
      id: 1,
      nombre: 'Grupo I. Cereales, raíces, tubérculos y plátanos',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 2,
      nombre: 'Grupo II. Frutas y verduras',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 3,
      nombre: 'Grupo III. Leche y productos lácteos',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 4,
      nombre: 'Grupo IV. Carnes, huevos, leguminosas secas, frutos secos y semillas',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 5,
      nombre: 'Grupo V. Grasas (Cantidades incluidas dentro de las preparaciones)',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 6,
      nombre: 'Grupo VI. Azúcares (Postre)',
      valor: 0,

    });
    this.dataComponentes.push({
      id: 7,
      nombre: 'Grupo VII. Agua apta para el consumo humano',
      valor: 0,

    });
    // }
  }
  dataComponentesActualizaxIntercambios(ParametrosIntercambios: PA_ValidaIntercambiosPiv) {
    /* this.dataComponentesCrea();
    let tempoDataComponentesTodos = [...this.dataComponentes]
    this.ListIntercambiosDiarios = []; */
    this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(ParametrosIntercambios).subscribe(
      (response) => {

        /* this.ListIntercambiosDiarios.push(response)
        for (let i = 0; i < this.ListIntercambiosDiarios[0].length; i++) {

          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 1) { tempoDataComponentesTodos[0] = { ...tempoDataComponentesTodos[0], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 2) { tempoDataComponentesTodos[1] = { ...tempoDataComponentesTodos[1], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 3) { tempoDataComponentesTodos[2] = { ...tempoDataComponentesTodos[2], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 4) { tempoDataComponentesTodos[3] = { ...tempoDataComponentesTodos[3], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 5) { tempoDataComponentesTodos[4] = { ...tempoDataComponentesTodos[4], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 6) { tempoDataComponentesTodos[5] = { ...tempoDataComponentesTodos[5], valor: this.ListIntercambiosDiarios[0][i].intercambios } }
          if (this.ListIntercambiosDiarios[0][i].iD_GrupoAlimento == 7) { tempoDataComponentesTodos[6] = { ...tempoDataComponentesTodos[6], valor: this.ListIntercambiosDiarios[0][i].intercambios } }

        } */

        this.dataComponentes = response;


      },
      (err) => {
      }
    )

  }



  myTabFocusChange(tabChangeEvent: any): void {
    //debugger
     // Restablecer el valor seleccionado de la lista y limpiar
     
    this.NivelEducativoList = [];
    this.cdr.detectChanges(); 
    this.selectedTabIndex = tabChangeEvent
    let com = this.tabs[this.selectedTabIndex];
    this.diasText = com;
    let com2 = this.diasList.filter(item => item.nombre == com)
    this.nuevoArray = [];
    this.nuevoArray2 = [];
    var arrayTemporal = [];
    var arrayTemporal2 = [];
    com2.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);
    for (var i = 0; i < com2.length; i++) {
      arrayTemporal2 = this.nuevoArray2.filter(resp => resp["nombre"] == com2[i]['nombre'])
      if (arrayTemporal2.length > 0) {
        this.nuevoArray2[this.nuevoArray2.indexOf(arrayTemporal2[0])]["sID_TipoNivelEducativo"].push(com2[i]['sID_TipoNivelEducativo'])
        this.nuevoArray2[this.nuevoArray2.indexOf(arrayTemporal2[0])]["iD_TipoNivelEducativo"].push(com2[i]['iD_TipoNivelEducativo'])
      } else {
        this.nuevoArray2.push({
          "nombre": com2[i]["nombre"], "sID_TipoNivelEducativo": [com2[i]['sID_TipoNivelEducativo']],
          "iD_TipoNivelEducativo": [com2[i]['iD_TipoNivelEducativo']]
        })
      }
    }

    if (com2.length > 0) {
      this.NivelEducativoList = this.nuevoArray2[0].sID_TipoNivelEducativo;
      this.Preparaciones = false;
      this.Productos = false;
    }
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {
      this.MenuPreparacion();
    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)

      if (t[0].iD_TipoModeloOperacion == 2) {
        this.MenuPreparacion();
      }
    }
    this.cdr.detectChanges(); 
    
  }

  mostrarmenucom() {
    this.comp1 = 0;
    this.comp2 = 0;
    this.comp3 = 0;
    this.comp4 = 0;
    this.comp5 = 0;
    this.comp6 = 0;
    this.comp7 = 0;
    this.comp8 = 0;
    this.comp9 = 0;
    this.comp10 = 0;
    this.comp11 = 0;
    this.comp12 = 0;
    this.comp13 = 0;

    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {
      /*  BEBIDA CON LECHE - com1 - 1
          ALIMENTO PROTEICO - com2 - 2
          CEREAL ACOMPAÑANTE - com3 - 3
          FRUTA - com4 - 4
          AZÚCARES - com5 5-
          GRASAS - com6 - 6
          AGUA - com7 - 7
          "TUBÉRCULOS, RAÍCES, PLÁTANOS O DERIVADOS DE CEREAL" - com8 - 10
          ENSALADA O VERDURA CALIENTE - com9 - 11
          BEBIDA - com10 - 8
          CEREALES - com11 - 9
          LECHE Y PRODUCTOS LÁCTEOS - com12- 13
          POSTRE  - com13 - 12
          1	Bebida con Leche
      */
      let h = this.diasList.filter(item2 => item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.idNivel);
      if (h.length == 0) {

      } else {
        this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel).subscribe(
          (response) => {

            this.frecuencia = response;


          })
        if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento == 2) {
          this._PA_MenuComponentesService.getPA_MenuComponentesList(h[0].id).subscribe(
            (response: any) => {

              let k = response;

              //Agrupamos
              let agrupacion = k.reduce((acc, currentValue) => {
                let groupKey = currentValue.iD_TipoComponente;

                if (!acc[groupKey]) {
                  acc[groupKey] = [];
                }
                acc[groupKey].push(currentValue);
                return acc;
              }, {});

              //cambiamos el formato
              let resp = Object.keys(agrupacion).map((el) => [el, agrupacion[el].length]);
              resp.forEach(item => {
                if (item[0] == 1) {
                  this.comp1 = item[1];

                } else if (item[0] == 2) {
                  this.comp2 = item[1];

                } else if (item[0] == 3) {
                  this.comp3 = item[1];

                } else if (item[0] == 4) {
                  this.comp4 = item[1];

                } else if (item[0] == 5) {
                  this.comp5 = item[1];

                } else if (item[0] == 6) {
                  this.comp6 = item[1];

                } else if (item[0] == 7) {
                  this.comp7 = item[1];

                } else if (item[0] == 8) {
                  this.comp10 = item[1];

                } else if (item[0] == 9) {
                  this.comp11 = item[1];

                } else if (item[0] == 10) {
                  this.comp8 = item[1];

                } else if (item[0] == 11) {
                  this.comp9 = item[1];

                } else if (item[0] == 12) {
                  this.comp13 = item[1];

                } else if (item[0] == 13) {
                  this.comp12 = item[1];

                }
              })





            },
            (err) => {
            }
          )
        } else {
          this._PA_ComponentesCiclosService.getPA_ComponentesCiclosList(this.CiclosMenusObject[0].id, this.idNivel, h[0].iD_Semana, h[0].numeroDia).subscribe(
            (response: any) => {

              let k = response;

              k.forEach(item => {
                if (item.iD_TipoComponente == 1) {
                  this.comp1 = item.cantidad;

                } else if (item.iD_TipoComponente == 2) {
                  this.comp2 = item.cantidad;

                } else if (item.iD_TipoComponente == 3) {
                  this.comp3 = item.cantidad;

                } else if (item.iD_TipoComponente == 4) {
                  this.comp4 = item.cantidad;

                } else if (item.iD_TipoComponente == 5) {
                  this.comp5 = item.cantidad;

                } else if (item.iD_TipoComponente == 6) {
                  this.comp6 = item.cantidad;

                } else if (item.iD_TipoComponente == 7) {
                  this.comp7 = item.cantidad;

                } else if (item.iD_TipoComponente == 8) {
                  this.comp8 = item.cantidad;

                } else if (item.iD_TipoComponente == 9) {
                  this.comp9 = item.cantidad;

                } else if (item.iD_TipoComponente == 10) {
                  this.comp10 = item.cantidad;

                } else if (item.iD_TipoComponente == 11) {
                  this.comp11 = item.cantidad;

                } else if (item.iD_TipoComponente == 12) {
                  this.comp12 = item.cantidad;

                } else if (item.iD_TipoComponente == 13) {
                  this.comp13 = item.cantidad;

                }
              })

              k.forEach(item2 => {
                this.componeteList.map(item => {
                  if (item.id == item2.iD_TipoComponente) {
                    if (item2.cantidad > 0) {
                      item.cantidad = item2.cantidad
                    } else {
                      item.cantidad = 0
                    }
                  }

                })
                this.componeteList.map(item => {
                  if (item.cantidad == null) {
                    item.cantidad = 0

                  }

                })
              })




            },
            (err) => {
            }
          )
        }
      }

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let h = this.diasList.filter(item2 => item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.idNivel);
      if (h.length == 0) {

      } else {
        this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel).subscribe(
          (response) => {

            this.frecuencia = response;


          })
        if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento == 2) {
          this._PA_MenuComponentesService.getPA_MenuComponentesList(h[0].id).subscribe(
            (response: any) => {

              let k = response;

              //Agrupamos
              let agrupacion = k.reduce((acc, currentValue) => {
                let groupKey = currentValue.iD_TipoComponente;

                if (!acc[groupKey]) {
                  acc[groupKey] = [];
                }
                acc[groupKey].push(currentValue);
                return acc;
              }, {});

              //cambiamos el formato
              let resp = Object.keys(agrupacion).map((el) => [el, agrupacion[el].length]);
              resp.forEach(item => {
                if (item[0] == 1) {
                  this.comp1 = item[1];

                } else if (item[0] == 2) {
                  this.comp2 = item[1];

                } else if (item[0] == 3) {
                  this.comp3 = item[1];

                } else if (item[0] == 4) {
                  this.comp4 = item[1];

                } else if (item[0] == 5) {
                  this.comp5 = item[1];

                } else if (item[0] == 6) {
                  this.comp6 = item[1];

                } else if (item[0] == 7) {
                  this.comp7 = item[1];

                } else if (item[0] == 8) {
                  this.comp10 = item[1];

                } else if (item[0] == 9) {
                  this.comp11 = item[1];

                } else if (item[0] == 10) {
                  this.comp8 = item[1];

                } else if (item[0] == 11) {
                  this.comp9 = item[1];

                } else if (item[0] == 12) {
                  this.comp13 = item[1];

                } else if (item[0] == 13) {
                  this.comp12 = item[1];

                }
              })





            },
            (err) => {
            }
          )
        } else {
          this._PA_ComponentesCiclosService.getPA_ComponentesCiclosList(this.CiclosMenusObject[0].id, this.idNivel, h[0].iD_Semana, h[0].numeroDia).subscribe(
            (response: any) => {

              let k = response;

              k.forEach(item => {
                if (item.iD_TipoComponente == 1) {
                  this.comp1 = item.cantidad;

                } else if (item.iD_TipoComponente == 2) {
                  this.comp2 = item.cantidad;

                } else if (item.iD_TipoComponente == 3) {
                  this.comp3 = item.cantidad;

                } else if (item.iD_TipoComponente == 4) {
                  this.comp4 = item.cantidad;

                } else if (item.iD_TipoComponente == 5) {
                  this.comp5 = item.cantidad;

                } else if (item.iD_TipoComponente == 6) {
                  this.comp6 = item.cantidad;

                } else if (item.iD_TipoComponente == 7) {
                  this.comp7 = item.cantidad;

                } else if (item.iD_TipoComponente == 8) {
                  this.comp8 = item.cantidad;

                } else if (item.iD_TipoComponente == 9) {
                  this.comp9 = item.cantidad;

                } else if (item.iD_TipoComponente == 10) {
                  this.comp10 = item.cantidad;

                } else if (item.iD_TipoComponente == 11) {
                  this.comp11 = item.cantidad;

                } else if (item.iD_TipoComponente == 12) {
                  this.comp12 = item.cantidad;

                } else if (item.iD_TipoComponente == 13) {
                  this.comp13 = item.cantidad;

                }
              })

              k.forEach(item2 => {
                this.componeteList.map(item => {
                  if (item.id == item2.iD_TipoComponente) {
                    if (item2.cantidad > 0) {
                      item.cantidad = item2.cantidad
                    } else {
                      item.cantidad = 0
                    }
                  }

                })
                this.componeteList.map(item => {
                  if (item.cantidad == null) {
                    item.cantidad = 0

                  }

                })
              })




            },
            (err) => {
            }
          )
        }
      }
    }
  }
}