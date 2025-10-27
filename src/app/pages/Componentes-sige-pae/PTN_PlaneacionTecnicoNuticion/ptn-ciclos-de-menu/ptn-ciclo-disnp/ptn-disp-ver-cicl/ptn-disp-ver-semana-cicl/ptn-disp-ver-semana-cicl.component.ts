import { PA_CicloMenuAporteNutricionalXAprobacion, PA_CicloMenuAporteNutricionalXAprobacionService } from './../../../../../../../shared/services/PA_CicloMenuAporteNutricionalXAprobacion.services';
import { PA_CicloMenuListaMinutasAprobacionService } from './../../../../../../../shared/services/PA_CicloMenuListaMinutasAprobacion.services';
import { MenuProductosModel } from 'src/app/shared/model/MenuProductos';
import { MenuProductosService } from 'src/app/shared/services/MenuProductos.services';
import { MenuComponentesService } from 'src/app/shared/services/MenuComponentes.services';
import { CiclosMenusNivelesEducativosService } from 'src/app/shared/services/CiclosMenusNivelesEducativos.services';

import { Router, ActivatedRoute } from '@angular/router';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';
import { CicloMenuRequest, CiclosMenusService } from 'src/app/shared/services/CiclosMenus.services';
import { CiclosMenusModel } from 'src/app/shared/model/CiclosMenus';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoModalidadComplementoService } from 'src/app/shared/services/TipoModalidadComplemento.services';
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
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { MenuPTNService } from 'src/app/shared/services/MenuPTN.services';
import { MenuPreparacionesService } from 'src/app/shared/services/MenuPreparaciones.services';
import { MenuPreparacionesModel } from 'src/app/shared/model/MenuPreparaciones';
import { SemanasPTNService } from 'src/app/shared/services/SemanasPTN.services';
import { SemanasPTNModel } from 'src/app/shared/model/SemanasPTNModel';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { TiposComponenteModel } from 'src/app/shared/model/TiposComponente';
import { TiposActividadFisicaService } from 'src/app/shared/services/TiposActividadFisica.services';
import { MinutaPatronAlimentosService } from 'src/app/shared/services/MinutaPatronAlimentos.services';
import { PA_CicloMenuAportesNutricionalesPiv, PA_CicloMenuAportesNutricionalesPivService } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPiv.services';
import { IngredientesService } from 'src/app/shared/services/Ingredientes.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_conteoIntercambiosPiv, PA_conteoIntercambiosService } from 'src/app/shared/services/PA_conteoIntercambios.services';
import { PA_CicloMenuAportesNutricionalesPivSem } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivSem.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPiv, PA_CicloMenuAportesNutricionalesIndustrialesPivService } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPiv.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPivSem, PA_CicloMenuAportesNutricionalesIndustrialesPivSemService } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPivSem.services';
import { PA_CicloMenuAportesNutricionalesPivMAER, PA_CicloMenuAportesNutricionalesPivMAERService } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivMAER.services';
import { PreparacionesService } from 'src/app/shared/services/Preparaciones.services';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { SubGrupoAlimentosService } from 'src/app/shared/services/SubGrupoAlimentos.services';
import { PA_CicloMenuAportesNutricionalesPivMAERSem, PA_CicloMenuAportesNutricionalesPivMAERsemService } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivMAERsem.services';
import { PA_CicloMenuListaMinutasAprobacion } from 'src/app/shared/services/PA_CicloMenuListaMinutasAprobacion.services';
import { PA_ValidaFrecuenciaService } from 'src/app/shared/services/PA_ValidaFrecuencia.services';
import { PA_MenuPTNSemanaService } from 'src/app/shared/services/PA_MenuPTNSemana.services';
import { PA_MenuPreparacionesService } from 'src/app/shared/services/PA_MenuPreparaciones.services';
import { PA_MenuComponentesService } from 'src/app/shared/services/PA_MenuComponentes.services';
import { PA_ValidaIntercambiosPiv, PA_ValidaIntercambiosService } from 'src/app/shared/services/PA_ValidaIntercambios.services';
import { DecimalPipe } from '@angular/common';
import { PA_CiclosMenusNivelesEducativosGetAllWithRelationService } from 'src/app/shared/services/PA_CiclosMenusNivelesEducativosGetAllWithRelation.services';

@Component({
  selector: 'app-ptn-disp-ver-semana-cicl',
  templateUrl: './ptn-disp-ver-semana-cicl.component.html',
  styleUrls: ['./ptn-disp-ver-semana-cicl.component.scss']
})
export class PtnDispVerSemanaCiclComponent implements OnInit {
  @Input() idSemanas: number =0;
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
  step = 0;
  page = 0;
  Semanas = 0;
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
  PA_conteoIntercambiosPivreq:PA_ValidaIntercambiosPiv={}
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  NivelEducativoList = [];
  diasList: any;
  public nuevoArray = [];
  public nuevoArray2 = [];
  public nuevoArray3 = [];
  listaCicloMenu = [];
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
  public tipoRacionList: any = [];
  public tipoRacionListfilter: any = [];
  CicloMenuAportesNutricionalesPivReq: PA_CicloMenuAportesNutricionalesPiv = {}
  CicloMenuAportesNutricionalesPivReqsemana: PA_CicloMenuAportesNutricionalesPivSem = {}
  //procdimiento  aporte nutricional maem ind
  CicloMenuAportesNutricionalesIndustrialesPivReq: PA_CicloMenuAportesNutricionalesIndustrialesPiv = {}
  CicloMenuAportesNutricionalesIndustrialesPivSem: PA_CicloMenuAportesNutricionalesIndustrialesPivSem = {}

  //maer
  CicloMenuAportesNutricionalesPivMAERReq: PA_CicloMenuAportesNutricionalesPivMAER = {}
  CicloMenuAportesNutricionalesPivReqMAERsemana: PA_CicloMenuAportesNutricionalesPivMAERSem = {}

  //minutas
  CicloMenuListaMinutasAprobacionReq:PA_CicloMenuListaMinutasAprobacion={}

  //ciclos
  CicloMenuAporteNutricionalXAprobacionReq:PA_CicloMenuAporteNutricionalXAprobacion={}
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
  dataComponentes = [];
  dataComponentes2:any;
  maer:boolean=false;
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

  comp1 = null;
  comp2 = null;
  comp3 = null;
  comp4 = null;
  comp5 = null;
  comp6 = null;
  comp7 = null;
  comp8 = null;
  comp9 = null;
  comp10 = null;
  comp11 = null;
  comp12 = null;
  comp13 = null;

  alefrec1: boolean = false;
  alefrec2: boolean = false;
  alefrec3: boolean = false;
  alefrec4: boolean = false;
  alefrec5: boolean = false;
  alefrec6: boolean = false;
  alefrec7: boolean = false;
  alefrec8: boolean = false;
  alefrec9: boolean = false;
  alefrec10: boolean = false;
  alefrec11: boolean = false;
  alefrec12: boolean = false;
  alefrec13: boolean = false;

  alefrecsi1: boolean = false;
  alefrecsi2: boolean = false;
  alefrecsi3: boolean = false;
  alefrecsi4: boolean = false;
  alefrecsi5: boolean = false;
  alefrecsi6: boolean = false;
  alefrecsi7: boolean = false;
  alefrecsi8: boolean = false;
  alefrecsi9: boolean = false;
  alefrecsi10: boolean = false;
  alefrecsi11: boolean = false;
  alefrecsi12: boolean = false;
  alefrecsi13: boolean = false;

  alefrecno1: boolean = true;
  alefrecno2: boolean = true;
  alefrecno3: boolean = true;
  alefrecno4: boolean = true;
  alefrecno5: boolean = true;
  alefrecno6: boolean = true;
  alefrecno7: boolean = true;
  alefrecno8: boolean = true;
  alefrecno9: boolean = true;
  alefrecno10: boolean = true;
  alefrecno11: boolean = true;
  alefrecno12: boolean = true;
  alefrecno13: boolean = true;
  valorfrec1: number = 0;
  valorfrec2: number = 0;
  valorfrec3: number = 0;
  valorfrec4: number = 0;
  valorfrec5: number = 0;
  valorfrec6: number = 0;
  valorfrec7: number = 0;
  valorfrec8: number = 0;
  valorfrec9: number = 0;
  valorfrec10: number = 0;
  valorfrec11: number = 0;
  valorfrec12: number = 0;
  valorfrec13: number = 0;
  public Subgrupo: any = [];
  public frecuencia: any = [];
  public grupoaliment: any = [];
  public componentali: any = [];

  idaccion = 0
  constructor(
    public VigenciasServicio: VigenciasService,
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
    private _SemanasPTNService: SemanasPTNService,
    private _TiposComponenteService: TiposComponenteService,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    private _CiclosMenusNivelesEducativosService: CiclosMenusNivelesEducativosService,
     private _PA_MenuComponentesService: PA_MenuComponentesService,
    private _MenuProductosService: MenuProductosService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_ValidaIntercambiosService:PA_ValidaIntercambiosService,
    private _PA_CicloMenuListaMinutasAprobacionService:PA_CicloMenuListaMinutasAprobacionService,
    private _PA_CicloMenuAporteNutricionalXAprobacionService:PA_CicloMenuAporteNutricionalXAprobacionService,
    private _PA_ValidaFrecuenciaService: PA_ValidaFrecuenciaService,
    private _PA_CiclosMenusNivelesEducativosGetAllWithRelationService:PA_CiclosMenusNivelesEducativosGetAllWithRelationService,
  ) {


    this.route.queryParams.subscribe(params => {
      this.idCiclo = +params.id;

    });

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

    this._SemanasPTNService.getSemanasPTNListRelationfilter(this.idCiclo).subscribe(
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

        response.forEach(element => {
          this.nums.push(element.numeroSemana)
        });
        this.totalSteps = this.nums.length;
        this.nums.sort((firstItem, secondItem) => firstItem - secondItem);
        this.nums2 = this.nums.slice(0, this.MAX_STEP);
        this.nums.forEach(element => this.weekArray.push("semana " + element));

        if(this.weekArray.length == 1) {
          this.semanaSeleccionada = this.weekArray[0];
          this.showFirst = false;
          this.showLast = false;
          this.stepSelectionChange(0);
        } else if(this.weekArray.length == 2) {
          this.semanaAnterior = this.weekArray[0];
          this.semanaSeleccionada = this.weekArray[1];
          this.showLast = false;
          this.stepSelectionChange(1)


        } else if(this.weekArray.length > 2) {
          this.semanaAnterior = this.weekArray[0];
          this.semanaSeleccionada = this.weekArray[1];
          this.semanaSiguiente = this.weekArray[2];
          this.semanaUltima = this.weekArray[this.weekArray.length];

          this.stepSelectionChange(1)

        }

      },
      (err) => {
      }

    )

    this.aprobacionesService.getAprobacionesListfilter(18).subscribe(
      (response: any) => {
        this.AprobacionesList = response.filter(item => item.ubicacionOrigen === this.idCiclo.toString());
        this.lista.push(this.AprobacionesList)
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
          // a must be equal to b
          return 0;
        });
      },
      (err) => {
      }
    );
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

    this.rerender();

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

  validafrecuenciasCiclos(CicloMenuFrecuecnias :number, SemanaFrecuecnias: number, NivelFrecuencia :number)
  {
    var gradofrecuencia=null;
    if (NivelFrecuencia == undefined || NivelFrecuencia===0  ||NivelFrecuencia==null ){gradofrecuencia=0}
    else
    {gradofrecuencia=NivelFrecuencia}

    this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(CicloMenuFrecuecnias, SemanaFrecuecnias, gradofrecuencia).subscribe(
      (response) => {

        this.frecuencia = response;
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

            */
                let mode = 0
                if(this.CiclosMenusObject[0].iD_TipoModalidadComplemento==3){mode=1}else{mode=this.CiclosMenusObject[0].iD_TipoModalidadComplemento}
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion,mode , this.CiclosMenusObject[0].iD_TipoComplemento).subscribe(
          (response: any) => {
            let f = response
            if (f.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CiclosMenusObject[0].iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, mode, j[0].id).subscribe(
                (response: any) => {
                  let e = response
                  if (e.length == 0) {

                  } else {
                        //tipo racion 1 almuerzo 2 ampm 4 cualificado

                          /* this.ps_cct_almuerzo = true;--------
                          this.ps_cct_ampm = false;
                          this.ind_ampm = false;
                          this.ps_cct_almuerzo2 = true;--------
                          this.ps_cct_ampm2 = false;
                          this.ind_ampm2 = false; */
                          this.frecuencia.forEach(item => {
                            if (item.idComponente == 1) {
                              this.valorfrec1 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi1 = true;
                                this.alefrecno1 = false;

                              } else {
                                this.alefrecsi1 = false;
                                this.alefrecno1 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec1 = false;
                              } else {
                                this.alefrec1 = true;
                              }


                            } else if (item.idComponente == 2) {
                              this.valorfrec2 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi2 = true;
                                this.alefrecno2 = false;

                              } else {
                                this.alefrecsi2 = false;
                                this.alefrecno2 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec2 = false;
                              } else {
                                this.alefrec2 = true;
                              }
                            } else if (item.idComponente == 3) {
                              this.valorfrec3 = item.frecuencia
                              this.valorfrec11 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi3 = true;
                                this.alefrecno3 = false;
                                this.alefrecsi11 = true;
                                this.alefrecno11 = false;

                              } else {
                                this.alefrecsi3 = false;
                                this.alefrecno3 = true;
                                this.alefrecsi11 = false;
                                this.alefrecno11 = true;
                              }
                              if (item.pasa == 'Si') {
                                this.alefrec3 = false;
                                this.alefrec11 = false;
                              } else {
                                this.alefrec3 = true;
                                this.alefrec11 = true;
                              }



                            } else if (item.idComponente == 4) {
                              this.valorfrec4 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi4 = true;
                                this.alefrecno4 = false;

                              } else {
                                this.alefrecsi4 = false;
                                this.alefrecno4 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec4 = false;
                              } else {
                                this.alefrec4 = true;
                              }




                            } else if (item.idComponente == 5) {
                              this.valorfrec5 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi5 = true;
                                this.alefrecno5 = false;

                              } else {
                                this.alefrecsi5 = false;
                                this.alefrecno5 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec5 = false;
                              } else {
                                this.alefrec5 = true;
                              }


                            } else if (item.idComponente == 6) {
                              this.valorfrec6 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi6 = true;
                                this.alefrecno6 = false;

                              } else {
                                this.alefrecsi6 = false;
                                this.alefrecno6 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec6 = false;
                              } else {
                                this.alefrec6 = true;
                              }


                            } else if (item.idComponente == 7) {
                              this.valorfrec7 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi7 = true;
                                this.alefrecno7 = false;

                              } else {
                                this.alefrecsi7 = false;
                                this.alefrecno7 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec7 = false;
                              } else {
                                this.alefrec7 = true;
                              }



                            } else if (item.idComponente == 8) {
                              this.valorfrec10 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi10 = true;
                                this.alefrecno10 = false;

                              } else {
                                this.alefrecsi10 = false;
                                this.alefrecno10 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec10 = false;
                              } else {
                                this.alefrec10 = true;
                              }
                            } else if (item.idComponente == 9) {
                              this.valorfrec11 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi11 = true;
                                this.alefrecno11 = false;

                              } else {
                                this.alefrecsi11 = false;
                                this.alefrecno11 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec11 = false;
                              } else {
                                this.alefrec11 = true;
                              }


                            } else if (item.idComponente == 10) {
                              this.valorfrec8 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi8 = true;
                                this.alefrecno8 = false;

                              } else {
                                this.alefrecsi8 = false;
                                this.alefrecno8 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec8 = false;
                              } else {
                                this.alefrec8 = true;
                              }



                            } else if (item.idComponente == 11) {
                              this.valorfrec9 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi9 = true;
                                this.alefrecno9 = false;

                              } else {
                                this.alefrecsi9 = false;
                                this.alefrecno9 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec9 = false;
                              } else {
                                this.alefrec9 = true;
                              }



                            } else if (item.idComponente == 12) {
                              this.valorfrec13 = item.frecuencia
                              if (item.pasa == 'Si') {
                                this.alefrecsi13 = true;
                                this.alefrecno13 = false;

                              } else {
                                this.alefrecsi13 = false;
                                this.alefrecno13 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec13 = false;
                              } else {
                                this.alefrec13 = true;
                              }






                            } else if (item.idComponente == 13) {
                              this.valorfrec12 = item.frecuencia

                              if (item.pasa == 'Si') {
                                this.alefrecsi12 = true;
                                this.alefrecno12 = false;

                              } else {
                                this.alefrecsi12 = false;
                                this.alefrecno12 = true;

                              }
                              if (item.pasa == 'Si') {
                                this.alefrec12 = false;
                              } else {
                                this.alefrec12 = true;
                              }




                            }
                          })





                  }

                }
              )

            } else {
              this.frecuencia.forEach(item => {
                if (item.idComponente == 1) {
                  this.valorfrec1 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi1 = true;
                    this.alefrecno1 = false;

                  } else {
                    this.alefrecsi1 = false;
                    this.alefrecno1 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec1 = false;
                  } else {
                    this.alefrec1 = true;
                  }


                } else if (item.idComponente == 2) {
                  this.valorfrec2 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi2 = true;
                    this.alefrecno2 = false;

                  } else {
                    this.alefrecsi2 = false;
                    this.alefrecno2 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec2 = false;
                  } else {
                    this.alefrec2 = true;
                  }
                } else if (item.idComponente == 3) {
                  this.valorfrec3 = item.frecuencia
                  this.valorfrec11 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi3 = true;
                    this.alefrecno3 = false;
                    this.alefrecsi11 = true;
                    this.alefrecno11 = false;

                  } else {
                    this.alefrecsi3 = false;
                    this.alefrecno3 = true;
                    this.alefrecsi11 = false;
                    this.alefrecno11 = true;
                  }
                  if (item.pasa == 'Si') {
                    this.alefrec3 = false;
                    this.alefrec11 = false;
                  } else {
                    this.alefrec3 = true;
                    this.alefrec11 = true;
                  }



                } else if (item.idComponente == 4) {
                  this.valorfrec4 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi4 = true;
                    this.alefrecno4 = false;

                  } else {
                    this.alefrecsi4 = false;
                    this.alefrecno4 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec4 = false;
                  } else {
                    this.alefrec4 = true;
                  }




                } else if (item.idComponente == 5) {
                  this.valorfrec5 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi5 = true;
                    this.alefrecno5 = false;

                  } else {
                    this.alefrecsi5 = false;
                    this.alefrecno5 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec5 = false;
                  } else {
                    this.alefrec5 = true;
                  }


                } else if (item.idComponente == 6) {
                  this.valorfrec6 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi6 = true;
                    this.alefrecno6 = false;

                  } else {
                    this.alefrecsi6 = false;
                    this.alefrecno6 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec6 = false;
                  } else {
                    this.alefrec6 = true;
                  }


                } else if (item.idComponente == 7) {
                  this.valorfrec7 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi7 = true;
                    this.alefrecno7 = false;

                  } else {
                    this.alefrecsi7 = false;
                    this.alefrecno7 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec7 = false;
                  } else {
                    this.alefrec7 = true;
                  }



                } else if (item.idComponente == 8) {
                  this.valorfrec10 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi10 = true;
                    this.alefrecno10 = false;

                  } else {
                    this.alefrecsi10 = false;
                    this.alefrecno10 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec10 = false;
                  } else {
                    this.alefrec10 = true;
                  }

                } else if (item.idComponente == 9) {
                  this.valorfrec11 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi11 = true;
                    this.alefrecno11 = false;

                  } else {
                    this.alefrecsi11 = false;
                    this.alefrecno11 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec11 = false;
                  } else {
                    this.alefrec11 = true;
                  }


                } else if (item.idComponente == 10) {
                  this.valorfrec8 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi8 = true;
                    this.alefrecno8 = false;

                  } else {
                    this.alefrecsi8 = false;
                    this.alefrecno8 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec8 = false;
                  } else {
                    this.alefrec8 = true;
                  }



                } else if (item.idComponente == 11) {
                  this.valorfrec9 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi9 = true;
                    this.alefrecno9 = false;

                  } else {
                    this.alefrecsi9 = false;
                    this.alefrecno9 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec9 = false;
                  } else {
                    this.alefrec9 = true;
                  }



                } else if (item.idComponente == 12) {
                  this.valorfrec13 = item.frecuencia
                  if (item.pasa == 'Si') {
                    this.alefrecsi13 = true;
                    this.alefrecno13 = false;

                  } else {
                    this.alefrecsi13 = false;
                    this.alefrecno13 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec13 = false;
                  } else {
                    this.alefrec13 = true;
                  }






                } else if (item.idComponente == 13) {
                  this.valorfrec12 = item.frecuencia

                  if (item.pasa == 'Si') {
                    this.alefrecsi12 = true;
                    this.alefrecno12 = false;

                  } else {
                    this.alefrecsi12 = false;
                    this.alefrecno12 = true;

                  }
                  if (item.pasa == 'Si') {
                    this.alefrec12 = false;
                  } else {
                    this.alefrec12 = true;
                  }




                }
              })

            }

          }
        )
      }, (err) => {
      }
    )


  }

  traerDatos(id: number) {
    this._CiclosMenusService.getCiclosMenusListRelationFilterID(id).subscribe(
      (response: any) => {
        this.listaCicloMenu.push(response)
        this.CiclosMenusObject = response;

        this.nombreCiclo = response[0].nombre;
        if (response[0].iD_TipoModeloOperacion == 1) {
          this.preg = true;
          this.preg1 = false;
          this.preg2 = false;
          this.maem = true;
          if (response[0].menuReferencia == false) {
            this.nombreReferencia = 'Ninguna';
          } else {
            this._CiclosMenusService.getCiclosMenusListRelationFilterID(response[0].iD_CiclosMenuReferencia).subscribe(
              (response2: any) => {

                this.nombreReferencia = response2[0].nombre;
              },
              (err) => {

              }
            )

          }
          if (response[0].iD_EstadoRegistro == 1) {
            this.nombreEstado = 'Por Aprobar';
            this.colorEstado = 'yellow';
            this.cantAprobaciones = 1;
            this.yaCargoAprobaciones = true;
          } else if (response[0].iD_EstadoRegistro == 2) {
            this.nombreEstado = 'Rechazado';
            this.colorEstado = 'red';
          } else if (response[0].iD_EstadoRegistro == 3) {
            this.nombreEstado = 'Aprobado';
            this.colorEstado = 'green';
          } else if (response[0].iD_EstadoRegistro == 6 || response[0].iD_EstadoRegistro == null) {
            this.nombreEstado = 'Pendiente';
            this.colorEstado = '#E2E6FE';
          } else { }
          this.nombreModeloOP = response[0].sID_TipoModeloOperacion;
          this.nombreModalidad = response[0].sID_TipoModalidadComplemento;
          this.nombreTipoComplemento = response[0].sID_TipoComplemento;

          this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion=1
          this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
            (response: any) => {

              this.fisica = response.filter(item=>item.id_Minuta==this.listaCicloMenu[0][0].iD_MinutaAprobacion);
              this.nombreMinuta = this.fisica[0].minuta
            }, (err) => { }
          )

          this.cantidad = response[0].cantidadMenus;
          let z = this.ZonasList.filter(item => item.id == response[0].iD_Zona)
          if(z.length==0){}else{
            this.ZonasList2 = z

            this.nombreZonas = z[0].nombre
          }

          if (response[0].menusParaTodasZonas == false) {
            this.Zonas = 2;
          } else {
            this.Zonas = 1;
          }

          if (response[0].menusParaTodosNiveles == false) {
            this.NivelEducativo = 2;
          } else {
            this.NivelEducativo = 1;
          }

        } else if (response[0].iD_TipoModeloOperacion == 2) {
          this.preg = false;
          this.preg1 = true;
          this.preg2 = false;
          this.semana = true;
          this.maer=true;
          this.Preparaciones2 = true;
          this.nombreModeloOP = response[0].sID_TipoModeloOperacion;
          if (response[0].menuReferencia == false) {
            this.nombreReferencia = 'Ninguna';
          } else {
            this._CiclosMenusService.getCiclosMenusListRelationFilterID(response[0].iD_CiclosMenuReferencia).subscribe(
              (response2: any) => {

                this.nombreReferencia = response2[0].nombre;
              },
              (err) => {

              }
            )

          }
          if (response[0].iD_EstadoRegistro == 1) {
            this.nombreEstado = 'Por Aprobar';
            this.colorEstado = 'yellow';
            this.cantAprobaciones = 1;
            this.yaCargoAprobaciones = true;
          } else if (response[0].iD_EstadoRegistro == 2) {
            this.nombreEstado = 'Rechazado';
            this.colorEstado = 'red';
          } else if (response[0].iD_EstadoRegistro == 3) {
            this.nombreEstado = 'Aprobado';
            this.colorEstado = 'green';
          } else if (response[0].iD_EstadoRegistro == 6 || response[0].iD_EstadoRegistro == null) {
            this.nombreEstado = 'Pendiente';
            this.colorEstado = '#E2E6FE';
          } else { }
          this.nombreModalidad = 'N/A'
          this.nombreTipoComplemento = response[0].sID_TipoComplemento;
          this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion=2
          this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
            (response: any) => {

              this.fisica = response.filter(item=>item.id_Minuta==this.listaCicloMenu[0][0].iD_MinutaAprobacion);
              this.nombreMinuta = this.fisica[0].minuta
            }, (err) => { }
          )
            this.MacroMicro()
           // this.MenuPreparacion()

          this.cantidad = response[0].cantidadMenus;
        } else if (response[0].iD_TipoModeloOperacion == 3) {
          this.preg = false;
          this.preg1 = false;
          this.preg2 = true;
          if (response[0].menuReferencia == false) {
            this.nombreReferencia = 'Ninguna';
          } else {
            this._CiclosMenusService.getCiclosMenusListRelationFilterID(response[0].iD_CiclosMenuReferencia).subscribe(
              (response2: any) => {

                this.nombreReferencia = response2[0].nombre;
              },
              (err) => {

              }
            )

          }
          if (response[0].iD_EstadoRegistro == 1) {
            this.nombreEstado = 'Por Aprobar';
            this.colorEstado = 'yellow';
            this.cantAprobaciones = 1;
            this.yaCargoAprobaciones = true;
          } else if (response[0].iD_EstadoRegistro == 2) {
            this.nombreEstado = 'Rechazado';
            this.colorEstado = 'red';
          } else if (response[0].iD_EstadoRegistro == 3) {
            this.nombreEstado = 'Aprobado';
            this.colorEstado = 'green';
          } else if (response[0].iD_EstadoRegistro == 6 || response[0].iD_EstadoRegistro == null) {
            this.nombreEstado = 'Pendiente';
            this.colorEstado = '#E2E6FE';
          } else { }
          this.nombreModeloOP = response[0].sID_TipoModeloOperacion;
          this.nombreModalidad = response[0].sID_TipoModalidadComplemento;
          this.nombreTipoComplemento = response[0].sID_TipoComplemento;
          this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(response[0].id).subscribe(
            (response: any) => {
              this.nivelmaem = response;
              this.nuevoArray3 = [];
              var arrayTemporal = [];

              if (this.nivelmaem.length == 0) {

                this.nombreNivel2 = 'N/A';


              } else {
                for (var i = 0; i < this.nivelmaem.length; i++) {
                  arrayTemporal = this.nuevoArray3.filter(resp => resp["iD_CiclosMenu"] == this.nivelmaem[i]['iD_CiclosMenu'])

                  if (arrayTemporal.length > 0) {
                    this.nuevoArray3[this.nuevoArray3.indexOf(arrayTemporal[0])]["sID_TipoNivelEducativo"].push(this.nivelmaem[i]['sID_TipoNivelEducativo'])

                  } else {
                    this.nuevoArray3.push({
                      "iD_CiclosMenu": this.nivelmaem[i]["iD_CiclosMenu"], "sID_TipoNivelEducativo": [this.nivelmaem[i]['sID_TipoNivelEducativo']],

                    })
                  }
                }


                let o =this.nuevoArray3[0].sID_TipoNivelEducativo;



                var arr = {};

                for (var i = 0, len = o.length; i < len; i++)
                  arr[ o[i]] = o[i];


                o = new Array();
                for (var key in arr)
                  o.push(arr[key]);
                  this.nombreNivel2 = o


              }
            }
          )
          this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion=this.listaCicloMenu[0][0].iD_TipoModeloOperacion;
          this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento=this.listaCicloMenu[0][0].iD_TipoModalidadComplemento;
          this.CicloMenuListaMinutasAprobacionReq.ID_TipoComplemento=this.listaCicloMenu[0][0].iD_TipoComplemento;
          this.CicloMenuListaMinutasAprobacionReq.ID_ETC=this.idETC;
              this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
                (response: any) => {

                  this.fisica = response.filter(item=>item.id_Minuta==this.listaCicloMenu[0][0].iD_MinutaAprobacion);
                  this.fisicaNom2  = this.fisica[0].minuta
                  let g =0
                  if(this.listaCicloMenu[0][0].iD_TipoModalidadComplemento==3){
                    g=1
                  }else{g=this.listaCicloMenu[0][0].iD_TipoModalidadComplemento}
                  this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.listaCicloMenu[0][0].iD_MinutaAprobacion,g,this.listaCicloMenu[0][0].iD_TipoComplemento).subscribe(
                    (response: any) => {
                      let f = response
                      if (f[0].iD_TipoModeloOperacionBase == 1) {
                        this.preg5 = true;
                        this.preg6 = false;
                        this.semana = false;
                        this.maem = true;
                      } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                        this.preg5 = false;
                    this.preg6 = true;
                    this.semana = true;
                    this.maem = false;
                    this.maer=true;
                    this.Preparaciones2 = true;
                    this.MacroMicro()

                      }
                    }
                  )


                }, (err) => { }
              )
          let z = this.ZonasList.filter(item => item.id == response[0].iD_Zona)
          if(z.length==0){}else{
            this.ZonasList2 = z

            this.nombreZonas = z[0].nombre
          }

          if (response[0].menusParaTodasZonas == false) {
            this.Zonas = 2;
          } else {
            this.Zonas = 1;
          }

          if (response[0].menusParaTodosNiveles == false) {
            this.NivelEducativo = 2;
          } else {
            this.NivelEducativo = 1;
          }



        }



      },
      (err) => {
        this.isLoading = false;
      }
    );


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
   this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus plames de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo , "Operadores - Delegado");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus plames de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo , "Rol SiPAE-Administrador");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú en uso (asignado a algún de sus plames de alistamiento) que hubo una modificación en el ciclo " + this.nombreCiclo , "Operadores - Administrador");

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

  this.step = this.idSemanas;


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
          this.diasText=com;
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




        }







      },
      (err) => {
      }
    );
  }


  onNivelEducativoChange1(event: any): void {
    this.gradoText = event[0].value;
    this.diasText

    let gr = this.diasList.filter(item => item.sID_TipoNivelEducativo == event[0].value && item.nombre == this.diasText);
    this.idMenu = gr[0].id
    this.idNivel = gr[0].iD_TipoNivelEducativo;
    this.Preparaciones = true;
    this.Preparaciones =false;
    this.Productos =false;
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {
      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
        this.MenuPreparacion();
      } else {
        this.MenuProducto();
      }

      this.mostrarmenucom();
    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
        this.MenuPreparacion();
      } else {
        this.MenuProducto();
      }
      this.mostrarmenucom();
    } else { }


  }
  onNivelEducativoChange11(event: any): void {

    this.gradoText = event[0].value;
    this.diasText

    let gr = this.diasList.filter(item => item.sID_TipoNivelEducativo == event[0].value && item.nombre == this.diasText);
    this.idMenu = gr[0].id
    this.idNivel = gr[0].iD_TipoNivelEducativo;
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {
      if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
        this.Preparaciones3=true;
        this.Productos2=false;
      } else {
        this.Preparaciones3=false;
        this.Productos2=true;
      }
      /* this.MenuPreparacion();
      this.mostrarmenucom(); */
      this.MacroMicrosemana();
    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      let g= 0
      if(this.CiclosMenusObject[0].iD_TipoModalidadComplemento==3){
        g=1
      }else{
        g=this.CiclosMenusObject[0].iD_TipoModalidadComplemento;
      }
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion,g,this.CiclosMenusObject[0].iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if(f.length==0){
            let j = this.tipoRacionListfilter.filter(item=>item.id != this.CiclosMenusObject[0].iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion,g,j[0].id).subscribe(
              (response: any) => {
                let f = response
                if(f.length==0){

                }else{
                  if (f[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
                      this.Preparaciones3=true;
                      this.Productos2=false;
                    } else {
                      this.Preparaciones3=false;
                      this.Productos2=true;
                    }
                  } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                    this.Preparaciones2=true;

                  }
                }

              }
            )

          }else{
            if (f[0].iD_TipoModeloOperacionBase == 1) {
              if (this.CiclosMenusObject[0].iD_TipoModalidadComplemento != 2) {
                this.Preparaciones3=true;
                this.Productos2=false;
              } else {
                this.Preparaciones3=false;
                this.Productos2=true;
              }
            } else if (f[0].iD_TipoModeloOperacionBase == 2) {
              this.Preparaciones2=true;

            }
          }

        }
      )
      this.MacroMicrosemana();
    } else { }


  }
  MenuPreparacion() {
    if(this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2){
      let com = this.tabs[this.selectedTabIndex];
      this.diasText = com;
      let gr = this.diasList.filter(item =>item.nombre == this.diasText);
      if(gr.length==0){}else{ this.idMenu = gr[0].id}

    }else if(this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3){
      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)
      if(t[0].iD_TipoModeloOperacion==2){
        let com = this.tabs[this.selectedTabIndex];
        this.diasText = com;

        let gr = this.diasList.filter(item =>item.nombre == this.diasText);

        if(gr.length==0){}else{ this.idMenu = gr[0].id}
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
        this.Productos=false;
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

    this.MacroMicrosemana()

  }

  MacroMicrosemana() {
    this.dataComponentesCreaSemana();

    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 1) {


      if (this.dataSourceMacrosemana.length == 3) {

      } else {
        this.dataSourceMacrosemana.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana.push({
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
      if (this.dataSourceMicrosemana.length == 3) {

      } else {
        this.dataSourceMicrosemana.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana.push({
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


        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc=this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
        let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
        if(h.length==0){}else{  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id}

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
       /*  this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.idNivel;

        this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
          (response) => {
            let aporte = response[0];
            let reco = response[1];
            let por = response[4];
            let ico = response[5];


            if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

            } else {
              //aporte
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
        this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);
      }else{

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc=this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
        let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
        if(h.length==0){}else{  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id}

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
       /*  this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.idNivel;

        this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
          (response) => {

            let aporte = response[0];
            let reco = response[1];
            let por = response[4];
            let ico = response[5];

            if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

            } else {
              //aporte
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMacrosemana.map(function (dato) {
                if (dato.id == por.componente) {
                  dato.energia = por.en_Energia;
                  dato.proteina = por.ma_Proteina;
                  dato.carbohidrato = por.ma_CarbohidratosTotales;
                  dato.grasaTotal = por.ma_GrasasTotales;
                  dato.grasaSaturada = por.ma_GrasasSaturadas;
                }

                return dato;
              })
              //ico
              this.dataSourceMacrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
              this.dataSourceMicrosemana.map(function (dato) {
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
        this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);
      }

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {

      if (this.dataSourceMacrosemana2.length == 3) {

      } else {
        this.dataSourceMacrosemana2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana2.push({
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
        this.dataSourceMacrosemana2.push({
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
      if (this.dataSourceMicrosemana2.length == 3) {

      } else {
        this.dataSourceMicrosemana2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana2.push({
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
        this.dataSourceMicrosemana2.push({
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
      this.dataComponentesCreaSemana();




this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc=this.idETC;
this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
/* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona */
if(this.semanaList.length==0){}else{
  let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
  if(h.length==0){}else{  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id}
}


this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
/*  this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
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
      recomax == undefined|| pormin == undefined || pormax == undefined
      || icomin == undefined || icomax == undefined) {

    } else {
      this.dataSourceMacrosemana2.map(function (dato) {
        if (dato.id == aporte.componente) {
          dato.energia = aporte.en_Energia;
          dato.proteina = aporte.ma_Proteina;
          dato.carbohidrato = aporte.ma_CarbohidratosTotales;
          dato.grasaTotal = aporte.ma_GrasasTotales;
          dato.grasaSaturada = aporte.ma_GrasasSaturadas;
        }

        return dato;
      })
      this.dataSourceMacrosemana2.map(function (dato) {
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
      this.dataSourceMacrosemana2.map(function (dato) {
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
      this.dataSourceMacrosemana2.map(function (dato) {
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
      this.dataSourceMicrosemana2.map(function (dato) {
        if (dato.id == aporte.componente) {
          dato.calcio = aporte.mi_Calcio;
          dato.hierro = aporte.mi_Hierro;
          dato.sodio = aporte.mi_Sodio;
          dato.vitamina = aporte.mi_VitaminaA;
          dato.zinc = aporte.mi_Zinc;
        }

        return dato;
      })
      this.dataSourceMicrosemana2.map(function (dato) {
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
      this.dataSourceMicrosemana2.map(function (dato) {
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
      this.dataSourceMicrosemana2.map(function (dato) {
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
    let dia = null
    this.PA_conteoIntercambiosPivreq={};
this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
// this.PA_conteoIntercambiosPivreq.NumeroDia=null;

this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);

    } else if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3) {
      if (this.dataSourceMacrosemana.length == 3) {

      } else {
        this.dataSourceMacrosemana.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana.push({
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
      if (this.dataSourceMicrosemana.length == 3) {

      } else {
        this.dataSourceMicrosemana.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana.push({
          id: 2,
          nombre: 'Recomendación',
          titulo: 'Recomendación*',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana.push({
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

      if (this.dataSourceMacrosemana2.length == 3) {

      } else {
        this.dataSourceMacrosemana2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          energia: null,
          proteina: null,
          carbohidrato: null,
          grasaTotal: null,
          grasaSaturada: null,
        });
        this.dataSourceMacrosemana2.push({
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
        this.dataSourceMacrosemana2.push({
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
      if (this.dataSourceMicrosemana2.length == 3) {

      } else {
        this.dataSourceMicrosemana2.push({
          id: 1,
          nombre: 'Aporte estimado',
          titulo: 'Aporte estimado promedio diario',
          calcio: null,
          hierro: null,
          sodio: null,
          vitamina: null,
          zinc: null,
        });
        this.dataSourceMicrosemana2.push({
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
        this.dataSourceMicrosemana2.push({
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
      this.dataComponentesCreaSemana();


      let g=0
      if(this.CiclosMenusObject[0].iD_TipoModalidadComplemento==3){
        g=1
      }else{
        g=this.CiclosMenusObject[0].iD_TipoModalidadComplemento;
      }

      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, g, this.CiclosMenusObject[0].iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CiclosMenusObject[0].iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CiclosMenusObject[0].iD_MinutaAprobacion, g, j[0].id).subscribe(
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


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                      /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;

                      this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                        (response) => {



                          let aporte = response[0];
                          let reco = response[1];
                          let por = response[4];
                          let ico = response[5];
                          if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                          } else {
                            this.dataSourceMacrosemana.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.energia = aporte.en_Energia;
                                dato.proteina = aporte.ma_Proteina;
                                dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                                dato.grasaTotal = aporte.ma_GrasasTotales;
                                dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            this.dataSourceMacrosemana.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.energia = reco.en_Energia;
                                dato.proteina = reco.ma_Proteina;
                                dato.carbohidrato = reco.ma_CarbohidratosTotales;
                                dato.grasaTotal = reco.ma_GrasasTotales;
                                dato.grasaSaturada = reco.ma_GrasasSaturadas;
                              }

                              return dato;
                            })
                            this.dataSourceMacrosemana.map(function (dato) {
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
                            this.dataSourceMacrosemana.map(function (dato) {
                              if (dato.id == por.componente) {
                                dato.icoenergia = ico.en_Energia;
                                dato.icoproteina = ico.ma_Proteina;
                                dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                                dato.icograsaTotal = ico.ma_GrasasTotales;
                                dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                              }


                              return dato;
                            })
                            this.dataSourceMicrosemana.map(function (dato) {
                              if (dato.id == aporte.componente) {
                                dato.calcio = aporte.mi_Calcio;
                                dato.hierro = aporte.mi_Hierro;
                                dato.sodio = aporte.mi_Sodio;
                                dato.vitamina = aporte.mi_VitaminaA;
                                dato.zinc = aporte.mi_Zinc;
                              }

                              return dato;
                            })
                            this.dataSourceMicrosemana.map(function (dato) {
                              if (dato.id == reco.componente) {
                                dato.calcio = reco.mi_Calcio;
                                dato.hierro = reco.mi_Hierro;
                                dato.sodio = reco.mi_Sodio;
                                dato.vitamina = reco.mi_VitaminaA;
                                dato.zinc = reco.mi_Zinc;
                              }

                              return dato;
                            })
                            this.dataSourceMicrosemana.map(function (dato) {
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
                            this.dataSourceMicrosemana.map(function (dato) {
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

                      this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);

                    } else {


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                      let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                      /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
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
                            this.dataSourceMacrosemana.map(function (dato) {
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
                            this.dataSourceMacrosemana.map(function (dato) {
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
                            this.dataSourceMacrosemana.map(function (dato) {
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
                            this.dataSourceMacrosemana.map(function (dato) {
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
                            this.dataSourceMicrosemana.map(function (dato) {
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
                            this.dataSourceMicrosemana.map(function (dato) {
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
                            this.dataSourceMicrosemana.map(function (dato) {
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
                            this.dataSourceMicrosemana.map(function (dato) {
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
                      this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);
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
                    /* if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; } */

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
                          this.dataSourceMacrosemana2.map(function (dato) {
                            if (dato.id == aporte.componente) {
                              dato.energia = aporte.en_Energia;
                              dato.proteina = aporte.ma_Proteina;
                              dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                              dato.grasaTotal = aporte.ma_GrasasTotales;
                              dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                            }

                            return dato;
                          })
                          this.dataSourceMacrosemana2.map(function (dato) {
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
                          this.dataSourceMacrosemana2.map(function (dato) {
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
                          this.dataSourceMacrosemana2.map(function (dato) {
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
                          this.dataSourceMicrosemana2.map(function (dato) {
                            if (dato.id == aporte.componente) {
                              dato.calcio = aporte.mi_Calcio;
                              dato.hierro = aporte.mi_Hierro;
                              dato.sodio = aporte.mi_Sodio;
                              dato.vitamina = aporte.mi_VitaminaA;
                              dato.zinc = aporte.mi_Zinc;
                            }

                            return dato;
                          })
                          this.dataSourceMicrosemana2.map(function (dato) {
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
                          this.dataSourceMicrosemana2.map(function (dato) {
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
                          this.dataSourceMicrosemana2.map(function (dato) {
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
                    let dia = null
                    this.PA_conteoIntercambiosPivreq={};
                    this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
                    this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
                    this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);



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


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.idNivel;

                this._PA_CicloMenuAporteNutricionalXAprobacionService.getPA_CicloMenuAporteNutricionalXAprobacionList(this.CicloMenuAporteNutricionalXAprobacionReq).subscribe(
                  (response) => {



                    let aporte = response[0];
                    let reco = response[1];
                    let por = response[4];
                    let ico = response[5];
                    if (aporte == undefined || reco == undefined || por == undefined || ico == undefined) {

                    } else {
                      this.dataSourceMacrosemana.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.energia = aporte.en_Energia;
                          dato.proteina = aporte.ma_Proteina;
                          dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                          dato.grasaTotal = aporte.ma_GrasasTotales;
                          dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      this.dataSourceMacrosemana.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.energia = reco.en_Energia;
                          dato.proteina = reco.ma_Proteina;
                          dato.carbohidrato = reco.ma_CarbohidratosTotales;
                          dato.grasaTotal = reco.ma_GrasasTotales;
                          dato.grasaSaturada = reco.ma_GrasasSaturadas;
                        }

                        return dato;
                      })
                      this.dataSourceMacrosemana.map(function (dato) {
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
                      this.dataSourceMacrosemana.map(function (dato) {
                        if (dato.id == por.componente) {
                          dato.icoenergia = ico.en_Energia;
                          dato.icoproteina = ico.ma_Proteina;
                          dato.icocarbohidrato = ico.ma_CarbohidratosTotales;
                          dato.icograsaTotal = ico.ma_GrasasTotales;
                          dato.icograsaSaturada = ico.ma_GrasasSaturadas;
                        }


                        return dato;
                      })
                      this.dataSourceMicrosemana.map(function (dato) {
                        if (dato.id == aporte.componente) {
                          dato.calcio = aporte.mi_Calcio;
                          dato.hierro = aporte.mi_Hierro;
                          dato.sodio = aporte.mi_Sodio;
                          dato.vitamina = aporte.mi_VitaminaA;
                          dato.zinc = aporte.mi_Zinc;
                        }

                        return dato;
                      })
                      this.dataSourceMicrosemana.map(function (dato) {
                        if (dato.id == reco.componente) {
                          dato.calcio = reco.mi_Calcio;
                          dato.hierro = reco.mi_Hierro;
                          dato.sodio = reco.mi_Sodio;
                          dato.vitamina = reco.mi_VitaminaA;
                          dato.zinc = reco.mi_Zinc;
                        }

                        return dato;
                      })
                      this.dataSourceMicrosemana.map(function (dato) {
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
                      this.dataSourceMicrosemana.map(function (dato) {
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
                this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);

              } else {


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CiclosMenusObject[0].iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CiclosMenusObject[0].iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CiclosMenusObject[0].iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CiclosMenusObject[0].iD_MinutaAprobacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CiclosMenusObject[0].iD_Zona
                let h = this.semanasList.filter(item => item.numeroSemana == this.Semanas)
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CiclosMenusObject[0].id
                /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
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
                      this.dataSourceMacrosemana.map(function (dato) {
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
                      this.dataSourceMacrosemana.map(function (dato) {
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
                      this.dataSourceMacrosemana.map(function (dato) {
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
                      this.dataSourceMacrosemana.map(function (dato) {
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
                      this.dataSourceMicrosemana.map(function (dato) {
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
                      this.dataSourceMicrosemana.map(function (dato) {
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
                      this.dataSourceMicrosemana.map(function (dato) {
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
                      this.dataSourceMicrosemana.map(function (dato) {
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
                this.validafrecuenciasCiclos(this.CiclosMenusObject[0].id, this.Semanas, this.idNivel);
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
             /*  if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; } */

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
                    this.dataSourceMacrosemana2.map(function (dato) {
                      if (dato.id == aporte.componente) {
                        dato.energia = aporte.en_Energia;
                        dato.proteina = aporte.ma_Proteina;
                        dato.carbohidrato = aporte.ma_CarbohidratosTotales;
                        dato.grasaTotal = aporte.ma_GrasasTotales;
                        dato.grasaSaturada = aporte.ma_GrasasSaturadas;
                      }

                      return dato;
                    })
                    this.dataSourceMacrosemana2.map(function (dato) {
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
                    this.dataSourceMacrosemana2.map(function (dato) {
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
                    this.dataSourceMacrosemana2.map(function (dato) {
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
                    this.dataSourceMicrosemana2.map(function (dato) {
                      if (dato.id == aporte.componente) {
                        dato.calcio = aporte.mi_Calcio;
                        dato.hierro = aporte.mi_Hierro;
                        dato.sodio = aporte.mi_Sodio;
                        dato.vitamina = aporte.mi_VitaminaA;
                        dato.zinc = aporte.mi_Zinc;
                      }

                      return dato;
                    })
                    this.dataSourceMicrosemana2.map(function (dato) {
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
                    this.dataSourceMicrosemana2.map(function (dato) {
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
                    this.dataSourceMicrosemana2.map(function (dato) {
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
              let dia = null
              this.PA_conteoIntercambiosPivreq={};
              this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CiclosMenusObject[0].id
              this.PA_conteoIntercambiosPivreq.NumeroSemana = this.Semanas;
              this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);
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


  dataComponentesCreaSemana()
  {
    // if (this.dataComponentes2.length == 7) {

    // } else {
      this.dataComponentes2 = [];
    this.dataComponentes2.push({
      id: 1,
      nombre: 'Grupo I. Cereales, raíces, tubérculos y plátanos',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 2,
      nombre: 'Grupo II. Frutas y verduras',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 3,
      nombre: 'Grupo III. Leche y productos lácteos',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 4,
      nombre: 'Grupo IV. Carnes, huevos, leguminosas secas, frutos secos y semillas',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 5,
      nombre: 'Grupo V. Grasas (Cantidades incluidas dentro de las preparaciones)',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 6,
      nombre: 'Grupo VI. Azúcares (Postre)',
      valor: 0,

    });
    this.dataComponentes2.push({
      id: 7,
      nombre: 'Grupo VII. Agua apta para el consumo humano',
      valor: 0,

    });
 // }
  }
  dataComponentesActualizaxIntercambiosSemana(  ParametrosIntercambios: PA_ValidaIntercambiosPiv)
  {
    /* this.dataComponentesCreaSemana();
    let tempoDataComponentesTodosSemana = [...this.dataComponentes2]
    this.ListIntercambiosSemana=[]; */
    this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(ParametrosIntercambios).subscribe(
      (response) => {

       /*  this.ListIntercambiosSemana.push(response)
        for (let i = 0; i < this.ListIntercambiosSemana[0].length; i++) {

          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==1){tempoDataComponentesTodosSemana[0]={...tempoDataComponentesTodosSemana[0],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==2){tempoDataComponentesTodosSemana[1]={...tempoDataComponentesTodosSemana[1],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==3){tempoDataComponentesTodosSemana[2]={...tempoDataComponentesTodosSemana[2],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==4){tempoDataComponentesTodosSemana[3]={...tempoDataComponentesTodosSemana[3],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==5){tempoDataComponentesTodosSemana[4]={...tempoDataComponentesTodosSemana[4],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==6){tempoDataComponentesTodosSemana[5]={...tempoDataComponentesTodosSemana[5],valor:this.ListIntercambiosSemana[0][i].intercambios}}
          if(this.ListIntercambiosSemana[0][i].iD_GrupoAlimento==7){tempoDataComponentesTodosSemana[6]={...tempoDataComponentesTodosSemana[6],valor:this.ListIntercambiosSemana[0][i].intercambios}}

        } */

        this.dataComponentes2=response;


      },
      (err) => {
      }
    )

  }


  myTabFocusChange(tabChangeEvent: any): void {
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
    if (i == com2.length - 1) {
      this.NivelEducativoList = this.nuevoArray2[0].sID_TipoNivelEducativo;
      this.Preparaciones = false;
    }
    if (this.CiclosMenusObject[0].iD_TipoModeloOperacion == 2) {
      this.MenuPreparacion();
    }else if(this.CiclosMenusObject[0].iD_TipoModeloOperacion == 3){
      let t = this.fisica.filter(item => item.id == this.CiclosMenusObject[0].iD_MinutaPatronAlimento)

      if(t[0].iD_TipoModeloOperacion==2){
        this.MenuPreparacion();
      }
    }
  }

  mostrarmenucom() {
    this._PA_MenuComponentesService.getPA_MenuComponentesList(this.idMenu).subscribe(
      (response: any) => {

        let k = response;
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
        if(resp.length==0){
          this.comp1 = null;
          this.comp2 = null;
          this.comp3 = null;
          this.comp4 = null;
          this.comp5 = null;
          this.comp6 = null;
          this.comp7 = null;
          this.comp8 = null;
          this.comp9 = null;
          this.comp10 = null;
          this.comp11 = null;
          this.comp12 = null;
          this.comp13 = null;
        }else{
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
      }
      },
      (err) => {
      }
    )

  }
}
