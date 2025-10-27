import { PA_CicloMenuAporteNutricionalXAprobacion, PA_CicloMenuAporteNutricionalXAprobacionService } from './../../../../../../../shared/services/PA_CicloMenuAporteNutricionalXAprobacion.services';
import { PA_CicloMenuAportesNutricionalesPivMAER, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivMAER.services';
import { PA_CicloMenuAportesNutricionalesPiv, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPiv.services';
import { CiclosMenusNivelesEducativosService } from 'src/app/shared/services/CiclosMenusNivelesEducativos.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { TiposActividadFisicaService } from 'src/app/shared/services/TiposActividadFisica.services';
import { CiclosMenusService, CicloMenuRequest } from 'src/app/shared/services/CiclosMenus.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { MinutaPatronAlimentosService } from 'src/app/shared/services/MinutaPatronAlimentos.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { SemanasPTNModel } from 'src/app/shared/model/SemanasPTNModel';
import { SemanasPTNService } from 'src/app/shared/services/SemanasPTN.services';
import { MenuPTNService } from 'src/app/shared/services/MenuPTN.services';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MenuPreparacionesModel } from 'src/app/shared/model/MenuPreparaciones';
import { MatDialog, } from '@angular/material/dialog';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { CiclosMenusNivelesEducativosModel } from 'src/app/shared/model/CiclosMenusNivelesEducativos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuComponentesModel } from 'src/app/shared/model/MenuComponentes';
import { MenuProductosModel } from 'src/app/shared/model/MenuProductos';
import { PA_CicloMenuAportesNutricionalesPivSem, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivSem.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPiv, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPiv.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPivSem, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPivSem.services';
import { TiposModalidadComplementoService } from 'src/app/shared/services/TiposModalidadComplemento.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { TiposComponenteModel } from 'src/app/shared/model/TiposComponente';
import { CiclosMenusModel } from 'src/app/shared/model/CiclosMenus';
import { MenuPTNModel } from 'src/app/shared/model/MenuPTNModel';
import { PA_ValidaFrecuenciaService } from 'src/app/shared/services/PA_ValidaFrecuencia.services';
import { PA_MenuPTNSemanaService } from 'src/app/shared/services/PA_MenuPTNSemana.services';
import { PA_MenuPreparacionesService } from 'src/app/shared/services/PA_MenuPreparaciones.services';
import { PA_ValidaIntercambiosPiv, PA_ValidaIntercambiosService } from 'src/app/shared/services/PA_ValidaIntercambios.services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PA_CiclosMenusNivelesEducativosGetAllWithRelationService } from 'src/app/shared/services/PA_CiclosMenusNivelesEducativosGetAllWithRelation.services';



@Component({
  selector: 'app-ptn-reg-semana-cicl',
  templateUrl: './ptn-reg-semana-cicl.component.html',
  styleUrls: ['./ptn-reg-semana-cicl.component.scss']
})
export class PtnRegSemanaCiclComponent implements OnInit {

  @Input() idCicloSemanas: number = 0;
  @Input() Nsemana: number = 0;
  @Input() SiguienteSemana=0;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  public tipoSeleccionado: number = 1;
  @Input() numberChapter: number = 0;
  public nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Ciclos de menús';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  public dataArrayInterno: any;
  displayedColumnsPreparacion: string[] = ['Nombre', 'accion'];
  displayedColumnsMacro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];
  displayedColumnsMicro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];
  displayedColumnsGrupo: string[] = ['nombre', 'valor'];
  dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>();
  dataSourceProducto = new MatTableDataSource<MenuProductosModel>();
  //maem
  dataSourceMacro = [];
  dataSourceMicro = [];
  dataSourceMacrosemana = [];
  dataSourceMicrosemana = [];
  dataSourceComponente = [];
  dataSourceComponentesemana = [];
  //maer
  dataSourceMacro2 = [];
  dataSourceMicro2 = [];
  dataSourceMacrosemana2 = [];
  dataSourceMicrosemana2 = [];
  dataComponentes = [];
  dataComponentes2:any;
  //paepi
  dataSourceMacro3 = [];
  dataSourceMicro3 = [];
  dataSourceMacrosemana3 = [];
  dataSourceMicrosemana3 = [];
  numeroSemana: number = 1;
  numeroSemanaInferior: number =1;
  limiteSemana: number = null
  public viewActiva: number = 0;
  private resultQuery1: boolean = false;
  componeteList: TiposComponenteModel[];
  componeteListob: TiposComponenteModel[];
  componeteListop: TiposComponenteModel[];
  escala: any[] = [
    { id: 1, respuesta: 'Si' },
    { id: 2, respuesta: 'No' },
  ]
  public CicloMenuObject: CiclosMenusModel = {
    id: 0,
    iD_TipoModeloOperacion: 0,
    siD_TipoModeloOperacion: '',
    iD_TipoComplemento: 0,
    siD_TipoComplemento: '',
    iD_TipoModalidadComplemento: 0,
    siD_TipoModalidadComplemento: '',
    iD_MinutaAprobacion: 0,
    sID_MinutaAprobacion: '',
    iD_TipoNivelEducativo: null,
    iD_EstadoRegistro: 1,
    iD_Zona: 0,
    siD_Zona: '',
    nombre: '',
    menuReferencia: null,
    iD_CiclosMenuReferencia: null,
    menusParaTodosNiveles: null,
    menusParaTodasZonas: false,
    cantidadMenus: null,
    iD_ETC: Number(localStorage.getItem('IdUbicacion') ?? "0"),
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
    id_menuReferencia: null,
    id_menusParaTodosNiveles: null,
    id_menusParaTodasZonas: null,
    siD_ETC: '',
    siD_EstadoRegistro: '',
    validationErrors: '-'
  }
  public MenuPreparacionesObject: MenuPreparacionesModel = {
    sID: '',
    id: 0,
    iD_Preparacion: 0,
    sID_Preparacion: '',
    iD_Menu: 0,
    sID_Menu: '',
    nombre: '',
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
    semana: 0,
  }
  public MenuProductosObject: MenuProductosModel = {
    id: 0,
    iD_Menu: 0,
    siD_Menu: '',
    iD_Producto: 0,
    sID_Producto: '',
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
  public MenuPreparacionesObject2 = [];
  public MenuPreparacionesObject3: MenuPreparacionesModel[] = [];
  public semanaList: SemanasPTNModel[] = [];
  gradoText: string;
  gradoid: number;
  gradoid2: number;
  diasText: string;
  PresentaPreparacionesSemana: boolean = false;
  Preparaciones2: boolean = false;
  Preparaciones3: boolean = false;
  Productos: boolean = false
  Productos2: boolean = false
  dataArrayPre: any;
  dataArrayEmptyProduct: MenuProductosModel[] = [{
    id: 0,
    iD_Menu: 0,
    siD_Menu: '',
    iD_Producto: 0,
    sID_Producto: '-',
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
  }]
  dataArrayEmpty: MenuPreparacionesModel[] = [
    {

      sID: '',
      id: 0,
      iD_Preparacion: 0,
      sID_Preparacion: '',
      iD_Menu: 0,
      sID_Menu: '',
      nombre: '-',
      auditoria: '',
      semana: 0,

      // atributos para gestión de auditoria del objeto
      _ippublica: '',
      _nombremaquina: '',
      _usuario: '',
      _ipdetrasproxy: '',
      _browser: '',
      _accion: '',
      _sessionid: '',
      _XMLAuditoria: '',
      // atributos adicionales genericos para gestión del objeto
      isValid: true,
      isSelected: false,
      completed: false
    }
  ];
  dataArrayProd: any;
  componenpre: any[];
  compoList: any[] = [];
  public semanaObject: SemanasPTNModel = {
    sID: '',
    id: 0,
    iD_CiclosMenu: 0,
    sID_CiclosMenu: '',
    numeroSemana: 0,
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
  public MenuPTNObject: MenuPTNModel[] = []
  public MenuPTNObject2: MenuPTNModel = {
    sID: '',
    id: 0,
    iD_Semana: 0,
    sID_Semana: '',
    iD_Semana2: 0,
    iD_TipoNivelEducativo: 0,
    sID_TipoNivelEducativo: '',
    numeroDia: 0,
    nombre: '',
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
    productos: []
  }
  public MenuPTNObject3: MenuPTNModel[] = []
  public MenuPTNObject4: MenuPTNModel[] = []
  selectedTabIndex: number = 0;
  public tabs = []
  public tabs2 = []
  preg: boolean = false;
  preg1: boolean = false;
  preg2: boolean = false;
  preg3: boolean = false;
  preg4: boolean = false;
  preg5: boolean = false;
  preg6: boolean = false;
  preg7: boolean = false;
  preg8: boolean = false;
  mensajefuerarango: boolean = false;
  mensajefuerarango1: boolean = false;
  mensajefuerarango2: boolean = false;
  mensajeDatosNoPermitido: boolean = false;
  public ModeloOperadorList: any = [];
  public ModeloModalidadList: any = [];
  public ModeloModalidadfilter: any = [];
  textModelo: string;
  textComplemento: string;
  textCompleto: string;
  public tipoRacionList: any = [];
  public tipoRacionListfilter: any = [];
  public MinutasList: any = [];
  public MinutasList2: any = [];
  public MinutasListfilter: any = [];
  public nuevoArray = []
  public NivelEducativoList: any[] = [];
  public NivelEducativoList2: any[] = [];
  public menuReferencia: any[] = [];
  cicloParams: CicloMenuRequest = {}
  ZonasList: any[] = [];
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  isLoading: boolean = true;
  semanacant: boolean = false;
  semanaap: boolean = false;
  maem: boolean = false;
  maer: boolean = false;

  mesajesalert: boolean = false;
  mesajesalert2: boolean = false;
  mesajesalert3: boolean = false;
  mesajesalert4: boolean = false;
  mesajesalert5: boolean = false;
  mesajesalert6: boolean = false;
  mesajesalert7: boolean = false;
  mesajesalert8: boolean = false;
  mesajesalert9: boolean = false;
  mesajesalert10: boolean = false;
  mesajesalert11: boolean = false;
  mesajesalert12: boolean = false;
  mesajesalert13: boolean = false;
  mesajesalert14: boolean = false;
  mesajesalert15: boolean = false;
  mesajesalert16: boolean = false;
  mesajesalert17: boolean = false;
  mesajesalert18: boolean = false;
  mesajesalert19: boolean = false;
  mesajesalert20: boolean = false;
  mesajesalert21: boolean = false;
  mesajesalert22: boolean = false;
  public ActividadfisicaList: any = [];
  cantidadfre = 0;
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

  alecomp1 = null;
  alecomp2 = null;
  alecomp3 = null;
  alecomp4 = null;
  alecomp5 = null;
  alecomp6 = null;
  alecomp7 = null;
  alecomp8 = null;
  alecomp9 = null;
  alecomp10 = null;
  alecomp11 = null;
  alecomp12 = null;
  alecomp13 = null;

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


  ps_cct_ampm: boolean = false;
  ps_cct_almuerzo: boolean = false;
  ind_ampm: boolean = false;

  ps_cct_ampm2: boolean = false;
  ps_cct_almuerzo2: boolean = false;
  ind_ampm2: boolean = false;

  ps_cct_ampm22: boolean = false;
  public Subgrupo: any = [];
  public grupoaliment: any = [];
  public componentali: any = [];
  public frecuencia: any = [];
  CiclosMenusNivelesEducativosObject: CiclosMenusNivelesEducativosModel[] = []
  CiclosMenusNivelesEducativosObject2: CiclosMenusNivelesEducativosModel = {
    id: 0,
    iD_CiclosMenu: 0,
    siD_CiclosMenu: '',
    iD_TipoNivelEducativo: 0,
    siD_TipoNivelEducativo: '',
    auditoria: '',
    activo: false,
    estado: '',
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
  Minutatemp = [];
  TipoModelos = 0;
  cantModelo = 0;
  public MenuComponentesObject: MenuComponentesModel[] = []
  MenuComponentesObject2: MenuComponentesModel = {
    id: 0,
    iD_Menu: 0,
    siD_Menu: '',
    iD_TipoComponente: 0,
    siD_TipoComponente: '',
    iD_Preparacion: 0,
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
  //procdimiento  aporte nutricional maem ps y cct
  CicloMenuAportesNutricionalesPivReq: PA_CicloMenuAportesNutricionalesPiv = {}
  CicloMenuAportesNutricionalesPivReqsemana: PA_CicloMenuAportesNutricionalesPivSem = {}
  //procdimiento  aporte nutricional maem ind
  CicloMenuAportesNutricionalesIndustrialesPivReq: PA_CicloMenuAportesNutricionalesIndustrialesPiv = {}
  CicloMenuAportesNutricionalesIndustrialesPivSem: PA_CicloMenuAportesNutricionalesIndustrialesPivSem = {}
  //procdimiento  aporte nutricional maer
  CicloMenuAportesNutricionalesPivMAERReq: PA_CicloMenuAportesNutricionalesPivMAER = {}
  CicloMenuAportesNutricionalesPivReqMAERsemana: PA_CicloMenuAportesNutricionalesPivSem = {}
  //aprobaciones
  AprobacionesList: any;
  AprobacionesList2: any;

  //ciclos
  CicloMenuAporteNutricionalXAprobacionReq: PA_CicloMenuAporteNutricionalXAprobacion = {}
  PA_conteoIntercambiosPivreq: PA_ValidaIntercambiosPiv = {}
  lista = [];

  idCiclo = 0;
  ListIntercambiosSemana: any[];
  ListIntercambiosDiarios: any[];
  Semanas: number = 1;

  //maem alerta nutrientes 2 rojo macro
  Menergia: boolean = false;
  Mproteina: boolean = false;
  Mcarbohidrato: boolean = false;
  MgrasasTotales: boolean = false;
  MgrasasSaturadas: boolean = false;
  //maem alerta nutrientes 3 amarillo macro
  Menergia1: boolean = false;
  Mproteina1: boolean = false;
  Mcarbohidrato1: boolean = false;
  MgrasasTotales1: boolean = false;
  MgrasasSaturadas1: boolean = false;

  //maer alerta nutrientes 2 rojo macro min
  Menergiamin: boolean = false;
  Mproteinamin: boolean = false;
  Mcarbohidratomin: boolean = false;
  MgrasasTotalesmin: boolean = false;
  MgrasasSaturadasmin: boolean = false;
  //maer alerta nutrientes 3 amarillo micro min
  Menergia1min: boolean = false;
  Mproteina1min: boolean = false;
  Mcarbohidrato1min: boolean = false;
  MgrasasTotales1min: boolean = false;
  MgrasasSaturadas1min: boolean = false;
  //maer alerta nutrientes 2 rojo macro max
  Menergiamax: boolean = false;
  Mproteinamax: boolean = false;
  Mcarbohidratomax: boolean = false;
  MgrasasTotalesmax: boolean = false;
  MgrasasSaturadasmax: boolean = false;
  //maer alerta nutrientes 3 amarillo micro max
  Menergia1max: boolean = false;
  Mproteina1max: boolean = false;
  Mcarbohidrato1max: boolean = false;
  MgrasasTotales1max: boolean = false;
  MgrasasSaturadas1max: boolean = false;





  //maem alerta nutrientes 2 rojo micro
  Mcalcio: boolean = false;
  Mhierro: boolean = false;
  Msodio: boolean = false;
  Mvitamina: boolean = false;
  Mzinc: boolean = false;
  //maem alerta nutrientes 3 amarillo micro
  Mcalcio1: boolean = false;
  Mhierro1: boolean = false;
  Msodio1: boolean = false;
  Mvitamina1: boolean = false;
  Mzinc1: boolean = false;

  //maer alerta nutrientes 2 rojo micro min
  Mcalciomin: boolean = false;
  Mhierromin: boolean = false;
  Msodiomin: boolean = false;
  Mvitaminamin: boolean = false;
  Mzincmin: boolean = false;
  //maer alerta nutrientes 3 amarillo micro min
  Mcalcio1min: boolean = false;
  Mhierro1min: boolean = false;
  Msodio1min: boolean = false;
  Mvitamina1min: boolean = false;
  Mzinc1min: boolean = false;

  //maem alerta nutrientes 2 rojo micro max
  Mcalciomax: boolean = false;
  Mhierromax: boolean = false;
  Msodiomax: boolean = false;
  Mvitaminamax: boolean = false;
  Mzincmax: boolean = false;
  //maem alerta nutrientes 3 amarillo micro max
  Mcalcio1max: boolean = false;
  Mhierro1max: boolean = false;
  Msodio1max: boolean = false;
  Mvitamina1max: boolean = false;
  Mzinc1max: boolean = false;
  constructor(
    private _ModeloOperacionService: TiposModeloOperacionService,
    private _TipoModalidad: TiposModalidadComplementoService,
    private _TiposRacionService: TiposComplementoService,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    public VigenciasServicio: VigenciasService,
    private _NivelEducativoService: NivelEducativoService,
    private _CiclosMenusService: CiclosMenusService,
    private _TiposActividadFisicaService: TiposActividadFisicaService,
    private _ZonasService: ZonasService,
    private _SemanasPTNService: SemanasPTNService,
    private _MenuPTNSemanaService: PA_MenuPTNSemanaService,
    public dialog: MatDialog,
    private _CiclosMenusNivelesEducativosService: CiclosMenusNivelesEducativosService,
    private _TiposComponenteService: TiposComponenteService,
    private route: ActivatedRoute,
    private _PA_ValidaFrecuenciaService: PA_ValidaFrecuenciaService,
    private _PA_CicloMenuAporteNutricionalXAprobacionService: PA_CicloMenuAporteNutricionalXAprobacionService,
    private _PA_CiclosMenusNivelesEducativosGetAllWithRelationService:PA_CiclosMenusNivelesEducativosGetAllWithRelationService,
    private _PA_ValidaIntercambiosService:PA_ValidaIntercambiosService,
  ) {

    this.route.queryParams.subscribe(params => {

      if (params.id == undefined) {
        this.idCiclo = 0;
      } else {
        this.idCiclo = +params.id;
      }


    });
  }

  ngOnInit(): void {

    this._ModeloOperacionService.getTiposModeloOperacionList().subscribe(
      (response: any) => {
        this.ModeloOperadorList = response;
      },
      (err) => {
      }

    );
    this._TipoModalidad.getTiposModalidadComplementoList().subscribe(
      (Response: any) => {
        this.ModeloModalidadList = Response;
      }, (err) => { });
    this._TiposRacionService.getTiposComplementoList().subscribe(
      (response: any) => {

        this.tipoRacionList = response
        this.tipoRacionList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
      }, (err) => { });

    this._NivelEducativoService.getNivelEducativoList().subscribe(
      (response: any) => {

        this.NivelEducativoList = response;


        for (let estado in this.NivelEducativoList) {
          this.NivelEducativoList[estado].estado = 'pendiente';
          this.NivelEducativoList[estado].complemento = null;
        }
        this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

        this.NivelEducativoList2 = response;


        for (let estado in this.NivelEducativoList2) {
          this.NivelEducativoList2[estado].estado = 'pendiente';
          this.NivelEducativoList2[estado].complemento = null;
          this.NivelEducativoList2[estado].activo = null;
        }
        this.NivelEducativoList2.sort((firstItem, secondItem) => firstItem.id - secondItem.id);


      },
      (err) => {
      }
    );

    this.cicloParams.ID_ETC = this.idETC;
    this.cicloParams.iD_EstadoRegistro = 3
    this._CiclosMenusService.getCiclosMenusListRelationFilter(this.cicloParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
        this.menuReferencia = response.filter(item => item.iD_EstadoRegistro == 3);
        if (this.menuReferencia.length == 0) {
          this.mesajesalert4 = true;
        } else { }



      },
      (err) => {
        this.isLoading = false;
      }
    );
    this._ZonasService.getZonasList().subscribe(
      (Response: any) => {
        this.ZonasList = Response;


      },
      (err) => {

      }
    );
    this.componeteList=[]
    this._TiposComponenteService.getTiposComponenteList().subscribe(
      (response: any) => {
        this.componeteList = response;
        this.componeteList.map(item => {
          item.cantidad = null;
        })

      },
      (err) => {
      }
    );
    this.idCiclo = this.idCicloSemanas;
    this.numeroSemana = this.Nsemana;
    this.numeroSemanaInferior =this.Nsemana;
    console.log(this.numeroSemana,this.Nsemana);
    
    localStorage.getItem('nsemana')

    if (this.idCiclo > 0) {
      this.traerdatosciclo()
    } else { }
  }

  ngAfterViewInit() {
    // La vista del componente está disponible en este punto
    // Aquí puedes realizar cualquier operación específica que necesites con la vista del componente
  }



  validafrecuenciasCiclos(CicloMenuFrecuecnias: number, SemanaFrecuecnias: number, NivelFrecuencia: number) {

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

        //Agrupamos
        let mode = 0
        if(this.CicloMenuObject.iD_TipoModalidadComplemento==3){mode=1}else{mode=this.CicloMenuObject.iD_TipoModalidadComplemento}
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, mode, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let f = response

            if (f.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, mode, j[0].id).subscribe(
                (response: any) => {
                  let e = response
                  if (e.length == 0) {

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



                        this.cantidadfre = item.frecuencia


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



                  this.cantidadfre = item.frecuencia


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

  traerdatosciclo() {

    this.maem = false;
    this._ModeloOperacionService.getTiposModeloOperacionList().subscribe(
      (response: any) => {
        this.ModeloOperadorList = response;
        this._TipoModalidad.getTiposModalidadComplementoList().subscribe(
          (Response: any) => {
            this.ModeloModalidadList = Response;
            this._TiposRacionService.getTiposComplementoList().subscribe(
              (response: any) => {

                this.tipoRacionList = response
                this.tipoRacionList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                this._CiclosMenusService.getCiclosMenusListRelationFilterID(this.idCiclo).subscribe(
                  (response: any) => {

                    this.CicloMenuObject.id = response[0].id;
                    this.CicloMenuObject.id = response[0].id;
                    this.CicloMenuObject.iD_ETC = response[0].iD_ETC;
                    this.CicloMenuObject.iD_TipoModeloOperacion = response[0].iD_TipoModeloOperacion;
                    this.CicloMenuObject.iD_TipoComplemento = response[0].iD_TipoComplemento;
                    this.CicloMenuObject.iD_TipoModalidadComplemento = response[0].iD_TipoModalidadComplemento;
                    this.CicloMenuObject.iD_MinutaAprobacion = response[0].iD_MinutaAprobacion;
                    this.CicloMenuObject.iD_CiclosMenuReferencia = response[0].iD_CiclosMenuReferencia;
                    this.CicloMenuObject.iD_TipoNivelEducativo = response[0].iD_TipoNivelEducativo;
                    this.CicloMenuObject.iD_Zona = response[0].iD_Zona;
                    this.CicloMenuObject.nombre = response[0].nombre;
                    this.CicloMenuObject.menuReferencia = response[0].menuReferencia;
                    this._TiposActividadFisicaService.getTiposActividadFisicaList().subscribe(
                      (response: any) => {

                        this.ActividadfisicaList = response;
                        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter4(this.CicloMenuObject.iD_MinutaAprobacion).subscribe(
                          (response: any) => {
                            this.MinutasList = response;
                            this.MinutasList.forEach(element => {

                              if (element.tipoActividadFisicaId === 0) {
                                element.fisicaNom = 'N/A'
                              } else {
                                element.fisicaNom = this.ActividadfisicaList.find(user => user.id == element.tipoActividadFisicaId).nombre;
                              }

                            });

                            this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                            if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
                              this.maem = true;
                              this.TipoModelos = 1;
                              this.cantModelo = 1;
                              if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                                this.Productos = false;
                                this.PresentaPreparacionesSemana = true;
                              } else {
                                this.Productos = true;
                                this.PresentaPreparacionesSemana = false;
                              }
                            } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
                              this.Preparaciones2 = true;
                              this.mostrarmacromicrosemana();
                            } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
                              let g=0
                              if(this.CicloMenuObject.iD_TipoModalidadComplemento==3){
                                g=1
                              }else{g=this.CicloMenuObject.iD_TipoModalidadComplemento}

                              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
                                (response: any) => {
                                  let f = response
                                  if (f.length == 0) {
                                    let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

                                    this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                                      (response: any) => {
                                        let e = response
                                        if (e.length == 0) {

                                        } else {
                                          this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(this.CicloMenuObject.id).subscribe(
                                            (response: any) => {
                                              response.forEach(element => {
                                                this.CiclosMenusNivelesEducativosObject.push({
                                                  id: element.id,
                                                  iD_CiclosMenu: element.iD_CiclosMenu,
                                                  siD_CiclosMenu: '',
                                                  iD_TipoNivelEducativo: element.iD_TipoNivelEducativo,
                                                  siD_TipoNivelEducativo: element.sID_TipoNivelEducativo,
                                                  auditoria: '',
                                                  activo: true,
                                                  // atributos para gestión de auditoria del objeto
                                                  _ippublica: '',
                                                  _nombremaquina: '',
                                                  _usuario: '',
                                                  _ipdetrasproxy: '',
                                                  _browser: '',
                                                  _accion: '',
                                                  _sessionid: '',
                                                  _XMLAuditoria: '',
                                                  // atributos adicionales genericos para gestión del objeto
                                                  isValid: false,
                                                  isSelected: false,
                                                  completed: false,
                                                  estado: 'pendiente',
                                                })

                                              });
                                            }
                                          )
                                          this.CiclosMenusNivelesEducativosObject.forEach(item => {
                                            this.NivelEducativoList2.map(function (dato) {

                                              if (dato.id == item.iD_TipoNivelEducativo) {

                                                dato.id = item.iD_TipoNivelEducativo;
                                                dato.activo = true;

                                              }

                                              return dato;
                                            });
                                          })
                                          var arr = {};

                                          for (var i = 0, len = this.CiclosMenusNivelesEducativosObject.length; i < len; i++)
                                            arr[this.CiclosMenusNivelesEducativosObject[i]['iD_TipoNivelEducativo']] = this.CiclosMenusNivelesEducativosObject[i];

                                          this.CiclosMenusNivelesEducativosObject = new Array();
                                          for (var key in arr)
                                            this.CiclosMenusNivelesEducativosObject.push(arr[key]);

                                          this.CiclosMenusNivelesEducativosObject.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);


                                          if (e.length == 0) { } else {
                                            if (e[0].iD_TipoModeloOperacionBase == 1) {

                                              this.maem = true;
                                              this.maer = false;
                                              if (this.CiclosMenusNivelesEducativosObject.length == 1) {
                                                this.TipoModelos = 2;
                                                this.cantModelo = 1;
                                              } else if (this.CiclosMenusNivelesEducativosObject.length > 1) {
                                                this.TipoModelos = 2;
                                                this.cantModelo = 2;
                                              }
                                              if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                                                this.Productos = false;
                                                this.PresentaPreparacionesSemana = true;
                                              } else {
                                                this.Productos = true;
                                                this.PresentaPreparacionesSemana = false;
                                              }
                                            } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                                              this.Preparaciones2 = true;
                                            }
                                          }
                                        }
                                      }
                                    )

                                  } else {
                                    this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(this.CicloMenuObject.id).subscribe(
                                      (response: any) => {

                                        response.forEach(element => {
                                          this.CiclosMenusNivelesEducativosObject.push({
                                            id: element.id,
                                            iD_CiclosMenu: element.iD_CiclosMenu,
                                            siD_CiclosMenu: '',
                                            iD_TipoNivelEducativo: element.iD_TipoNivelEducativo,
                                            siD_TipoNivelEducativo: element.sID_TipoNivelEducativo,
                                            auditoria: '',
                                            activo: true,
                                            // atributos para gestión de auditoria del objeto
                                            _ippublica: '',
                                            _nombremaquina: '',
                                            _usuario: '',
                                            _ipdetrasproxy: '',
                                            _browser: '',
                                            _accion: '',
                                            _sessionid: '',
                                            _XMLAuditoria: '',
                                            // atributos adicionales genericos para gestión del objeto
                                            isValid: false,
                                            isSelected: false,
                                            completed: false,
                                            estado: 'pendiente',
                                          })

                                        });
                                        this.CiclosMenusNivelesEducativosObject.forEach(item => {
                                          this.NivelEducativoList2.map(function (dato) {

                                            if (dato.id == item.iD_TipoNivelEducativo) {

                                              dato.id = item.iD_TipoNivelEducativo;
                                              dato.activo = true;

                                            }

                                            return dato;
                                          });
                                        })
                                        var arr = {};

                                        for (var i = 0, len = this.CiclosMenusNivelesEducativosObject.length; i < len; i++)
                                          arr[this.CiclosMenusNivelesEducativosObject[i]['iD_TipoNivelEducativo']] = this.CiclosMenusNivelesEducativosObject[i];

                                        this.CiclosMenusNivelesEducativosObject = new Array();
                                        for (var key in arr)
                                          this.CiclosMenusNivelesEducativosObject.push(arr[key]);

                                        this.CiclosMenusNivelesEducativosObject.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);
                                        if (f.length == 0) { } else {
                                          if (f[0].iD_TipoModeloOperacionBase == 1) {
                                            this.maem = true;
                                            this.maer = false;
                                            if (this.CiclosMenusNivelesEducativosObject.length == 1) {
                                              this.TipoModelos = 2;
                                              this.cantModelo = 1;
                                            } else if (this.CiclosMenusNivelesEducativosObject.length > 1) {
                                              this.TipoModelos = 2;
                                              this.cantModelo = 2;
                                            }
                                            if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                                              this.Productos = false;
                                              this.PresentaPreparacionesSemana = true;
                                            } else {
                                              this.Productos = true;
                                              this.PresentaPreparacionesSemana = false;
                                            }
                                          } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                                            this.Preparaciones2 = true;
                                          }
                                        }
                                      }
                                    )


                                  }
                                }
                              )
                            }


                          }, (err) => { });
                      },
                      (err) => {
                      }
                    );

                    this._SemanasPTNService.getSemanasPTNListRelationfilter(this.CicloMenuObject.id).subscribe(
                      (response: any) => {

                        response.forEach(element => {
                          this.semanaList.push({
                            sID: '',
                            id: element.id,
                            iD_CiclosMenu: this.CicloMenuObject.id,
                            numeroSemana: element.numeroSemana,
                            auditoria: '',
                            _ippublica: '',
                            _nombremaquina: '',
                            _usuario: '',
                            _ipdetrasproxy: '',
                            _browser: '',
                            _accion: '',
                            _sessionid: '',
                            _XMLAuditoria: '',
                            // atributos adicionales genericos para gestión del objeto
                            isValid: false,
                            isSelected: false,
                            completed: false,
                            sID_CiclosMenu: '',
                          })
                        });
                        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1 || this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
                          this.semanaList.forEach(item => {
                            this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(item.id).subscribe(
                              (response: any) => {
                                response.forEach(element => {
                                  if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

                                    this.MenuPTNObject3.push({
                                      sID: '',
                                      id: element.id,
                                      iD_Semana: item.numeroSemana,
                                      iD_Semana2: element.iD_Semana,
                                      sID_Semana: '',
                                      iD_TipoNivelEducativo: element.iD_TipoNivelEducativo,
                                      sID_TipoNivelEducativo: '',
                                      numeroDia: element.numeroDia,
                                      nombre: element.nombre,
                                      auditoria: '',

                                      // atributos para gestión de auditoria del objeto
                                      _ippublica: '',
                                      _nombremaquina: '',
                                      _usuario: '',
                                      _ipdetrasproxy: '',
                                      _browser: '',
                                      _accion: '',
                                      _sessionid: '',
                                      _XMLAuditoria: '',
                                      // atributos adicionales genericos para gestión del objeto
                                      isValid: true,
                                      isSelected: false,
                                      completed: false,
                                      productos: [],
                                    })
                                    this.tabs.push({
                                      nombre: element.nombre,
                                      estado: 'pendiente',
                                      semana: item.numeroSemana,
                                      numeroDia: element.numeroDia,
                                    })


                                  } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

                                    this.tabs.push({
                                      nombre: element.nombre,
                                      estado: 'pendiente',
                                      semana: item.numeroSemana,
                                      numeroDia: element.numeroDia,
                                    })
                                    this.MenuPTNObject.push({
                                      sID: '',
                                      id: element.id,
                                      iD_Semana: item.numeroSemana,
                                      sID_Semana: '',
                                      iD_Semana2: element.iD_Semana,
                                      iD_TipoNivelEducativo: 0,
                                      sID_TipoNivelEducativo: '',
                                      numeroDia: element.numeroDia,
                                      nombre: element.nombre,
                                      auditoria: '',

                                      // atributos para gestión de auditoria del objeto
                                      _ippublica: '',
                                      _nombremaquina: '',
                                      _usuario: '',
                                      _ipdetrasproxy: '',
                                      _browser: '',
                                      _accion: '',
                                      _sessionid: '',
                                      _XMLAuditoria: '',
                                      // atributos adicionales genericos para gestión del objeto
                                      isValid: true,
                                      isSelected: false,
                                      completed: false,
                                      productos: []
                                    })


                                  } else { }

                                });
                                var arr = {};

                                for (var i = 0, len = this.tabs.length; i < len; i++)
                                  arr[this.tabs[i]['nombre']] = this.tabs[i];

                                this.tabs = new Array();
                                for (var key in arr)
                                  this.tabs.push(arr[key]);

                                this.tabs.sort((firstItem, secondItem) => firstItem.numeroDia - secondItem.numeroDia);

                              },
                              (err) => {

                              }
                            )
                          })

                        } else {

                        }

                      },
                      (err) => {

                      }
                    );


                  },
                  (err) => {
                    this.isLoading = false;
                  }
                );
              }, (err) => { });
          }, (err) => { });
      },
      (err) => {
      }

    );





  }


  procesaPropagarMAER(mensaje,semana:number) {

    if(this.CicloMenuObject.id != null && this.CicloMenuObject.id!=0){
                    this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
                    this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
                    this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);
                    this.mostrarmacromicrosemana();
                  }


  }

  procesaPropagarMAEMAnterior(mensaje,semana:number) {
    this.PresentaPreparacionesSemana=false;
    this.Preparaciones3=false;
    this.numeroSemana=semana;
    this.mostrarmacromicrosemana();

    this.frecuencia=null;
    this.validafrecuenciasCiclos(this.CicloMenuObject.id, semana, this.gradoid2);
    this.PresentaPreparacionesSemana=true;
    this.Preparaciones3=true;


  }

  procesaPropagarMAEMSiguiente(mensaje,semana:number) {
    this.PresentaPreparacionesSemana=false;
    this.Preparaciones3=false;
    this.numeroSemana=semana;
    this.mostrarmacromicrosemana();
    this.frecuencia=null;
    this.validafrecuenciasCiclos(this.CicloMenuObject.id, semana, this.gradoid2);
    this.PresentaPreparacionesSemana=true;
    this.Preparaciones3=true;


  }



  dataComponentesActualizaxIntercambiosSemana(ParametrosIntercambios: PA_ValidaIntercambiosPiv) {

    this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(ParametrosIntercambios).subscribe(
      (response) => {

        this.dataComponentes2 = response;
        this.Preparaciones2 = true;
      },
      (err) => {
      }
    )

  }

  mostrarmacromicrosemana() {

    //TODO: OMCP - ajustar cuando se cambie la semana

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

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


      /* if (this.MinutasList.length == 0) {
        let mode = 0
        if(this.CicloMenuObject.iD_TipoModalidadComplemento==3){mode=1}else{mode=this.CicloMenuObject.iD_TipoModalidadComplemento}

        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, mode, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {

            this.MinutasList2 = response;
            let d = this.MinutasList2


            //Moderada 2 level 1
            if (d[0].tipoActividadFisicaId == 2) {
              //modalidad ps 1 ind 2 cct3
              if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                //tipo racion 1 almuerzo 2 ampm 4 cualificado

                if (this.CicloMenuObject.iD_TipoComplemento == 1) {

                  this.ps_cct_almuerzo = true;
                  this.ps_cct_ampm = false;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = true;
                  this.ps_cct_ampm2 = false;
                  this.ind_ampm2 = false;
                } else {
                  this.ps_cct_almuerzo = false;
                  this.ps_cct_ampm = true;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = false;
                  this.ps_cct_ampm2 = true;
                  this.ind_ampm2 = false;
                }

              } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {
                this.ps_cct_almuerzo = false;
                this.ps_cct_ampm = false;
                this.ind_ampm = true;
                this.ps_cct_almuerzo2 = false;
                this.ps_cct_ampm2 = false;
                this.ind_ampm2 = true;

              }
            } else {
              //modalidad ps 1 ind 2 cct3
              if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                //tipo racion 1 almuerzo 2 ampm 4 cualificado
                if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                  this.ps_cct_almuerzo = true;
                  this.ps_cct_ampm = false;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = true;
                  this.ps_cct_ampm22 = false;
                  this.ind_ampm2 = false;
                } else {
                  this.ps_cct_almuerzo = false;
                  this.ps_cct_ampm = true;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = false;
                  this.ps_cct_ampm22 = true;
                  this.ind_ampm2 = false;
                }

              } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                this.ps_cct_almuerzo = false;
                this.ps_cct_ampm = false;
                this.ind_ampm = true;
                this.ps_cct_almuerzo2 = false;
                this.ps_cct_ampm22 = false;
                this.ind_ampm2 = true;

              }
            }


          }, (err) => { });

      } else {
        let mode = 0
        if(this.CicloMenuObject.iD_TipoModalidadComplemento==3){mode=1}else{mode=this.CicloMenuObject.iD_TipoModalidadComplemento}
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, mode, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {

            this.MinutasList2 = response;

            this.MinutasList2.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
            let d = this.MinutasList2
            if (d[0].tipoActividadFisicaId == 2) {
              //modalidad ps 1 ind 2 cct3
              if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                //tipo racion 1 almuerzo 2 ampm 4 cualificado
                if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                  this.ps_cct_almuerzo = true;
                  this.ps_cct_ampm = false;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = true;
                  this.ps_cct_ampm2 = false;
                  this.ind_ampm2 = false;
                } else {
                  this.ps_cct_almuerzo = false;
                  this.ps_cct_ampm = true;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = false;
                  this.ps_cct_ampm2 = true;
                  this.ind_ampm2 = false;
                }

              } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                this.ps_cct_almuerzo = false;
                this.ps_cct_ampm = false;
                this.ind_ampm = true;
                this.ps_cct_almuerzo2 = false;
                this.ps_cct_ampm2 = false;
                this.ind_ampm2 = true;
              }
            } else {
              //modalidad ps 1 ind 2 cct3
              if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                //tipo racion 1 almuerzo 2 ampm 4 cualificado
                if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                  this.ps_cct_almuerzo = true;
                  this.ps_cct_ampm = false;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = true;
                  this.ps_cct_ampm22 = false;
                  this.ind_ampm2 = false;
                } else {
                  this.ps_cct_almuerzo = false;
                  this.ps_cct_ampm = true;
                  this.ind_ampm = false;
                  this.ps_cct_almuerzo2 = false;
                  this.ps_cct_ampm22 = true;
                  this.ind_ampm2 = false;
                }

              } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                this.ps_cct_almuerzo = false;
                this.ps_cct_ampm = false;
                this.ind_ampm = true;
                this.ps_cct_almuerzo2 = false;
                this.ps_cct_ampm22 = false;
                this.ind_ampm2 = true;

              }
            }

          }, (err) => { });
      } */
      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {


        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
        let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
        let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
        /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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
            this.mostraraletrasmacromicro()

          },
          (err) => {
          }
        );
        this.validafrecuenciasCiclos(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2);



      } else {


        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
        let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
        let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
        /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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
            this.mostraraletrasmacromicro()


          },
          (err) => {
          }
        );
        this.validafrecuenciasCiclos(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2);

      }

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

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


      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
      let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

      let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText)
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
      /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.gradoid2; */

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
          this.mostraraletrasmacromicro()


        },
        (err) => {
        }
      );
      let dia = null
      this.PA_conteoIntercambiosPivreq = {};
      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
      this.MenuPTNObject.sort((firstItem, secondItem) => firstItem.numeroDia - secondItem.numeroDia);
      let k = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana);
      this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);



    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
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
      let g=0
      if(this.CicloMenuObject.iD_TipoModalidadComplemento==3){
        g=1
      }else{g=this.CicloMenuObject.iD_TipoModalidadComplemento}

      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
              (response: any) => {
                let e = response
                if (e.length == 0) {

                } else {
                  //Moderada 2 level 1

                  if (e[0].iD_TipoModeloOperacionBase == 1) {



                    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                      let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                      let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                      /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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
                          this.mostraraletrasmacromicro()
                        },
                        (err) => {
                        }
                      );
                      this.validafrecuenciasCiclos(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2);

                    } else {


                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                      let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                      let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                      /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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
                          this.mostraraletrasmacromicro()


                        },
                        (err) => {
                        }
                      );
                      this.validafrecuenciasCiclos(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2);
                    }
                  } else if (e[0].iD_TipoModeloOperacionBase == 2) {

                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
                    /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
                    let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
                    if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                    let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText)
                    this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                    /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                    /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.gradoid2; */

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
                        this.mostraraletrasmacromicro()


                      },
                      (err) => {
                      }
                    );
                    let dia = null
                    this.PA_conteoIntercambiosPivreq = {};
                    this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
                    this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
                    this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);




                  }
                }

              }
            )

          } else {
            //Moderada 2 level 1

            if (f[0].iD_TipoModeloOperacionBase == 1) {


              if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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

                    this.mostraraletrasmacromicro()
                  },
                  (err) => {
                  }
                );
                this.validafrecuenciasCiclos(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2);


              } else {


                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }
                let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid)
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid2;

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

                    this.mostraraletrasmacromicro()

                  },
                  (err) => {
                  }
                );


                this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, this.gradoid2).subscribe(
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
                            1	Bebida con Leche
                        */

                    //Agrupamos



                    const miFrecuenciaSinDuplicados = this.frecuencia.reduce((acumulador, valorActual) => {
                      const elementoYaExiste = acumulador.find(elemento => elemento.idComponente === valorActual.idComponente);
                      if (elementoYaExiste) {
                        return acumulador.map((elemento) => {
                          if (elemento.idComponente === valorActual.idComponente) {
                            return {
                              ...elemento,
                              prestados: elemento.prestados + valorActual.prestados
                            }
                          }

                          return elemento;
                        });
                      }

                      return [...acumulador, valorActual];
                    }, []);

                    this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, this.CicloMenuObject.iD_TipoComplemento).subscribe(
                      (response: any) => {
                        let f = response
                        if (f.length == 0) {
                          let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

                          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
                            (response: any) => {
                              let e = response
                              if (e.length == 0) {

                              } else {
                                if (e[0].tipoActividadFisicaId == 2) {
                                  if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                                    //tipo racion 1 almuerzo 2 ampm 4 cualificado
                                    if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                                      /* this.ps_cct_almuerzo = true;--------
                                      this.ps_cct_ampm = false;
                                      this.ind_ampm = false;
                                      this.ps_cct_almuerzo2 = true;--------
                                      this.ps_cct_ampm2 = false;
                                      this.ind_ampm2 = false; */
                                      miFrecuenciaSinDuplicados.forEach(item => {
                                        if (item.idComponente == 1) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi1 = true;
                                            this.alefrecno1 = false;
                                          } else {
                                            this.alefrecsi1 = false;
                                            this.alefrecno1 = true;
                                            this.alefrec1 = true;
                                          }

                                        } else if (item.idComponente == 2) {
                                          if (item.prestados > 0 && item.prestados < 3) {
                                            this.alefrecsi2 = true;
                                            this.alefrecno2 = false;//falta mirar bien
                                          } else {
                                            this.alefrecsi2 = false;
                                            this.alefrecno2 = true;
                                            this.alefrec2 = true;
                                          }

                                        } else if (item.idComponente == 3) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi3 = true;
                                            this.alefrecno3 = false;
                                          } else {
                                            this.alefrecsi3 = false;
                                            this.alefrecno3 = true;
                                            this.alefrec3 = true;
                                          }

                                        } else if (item.idComponente == 4) {
                                          if (item.prestados == 2) {
                                            this.alefrecsi4 = true;
                                            this.alefrecno4 = false;
                                          } else {
                                            this.alefrecsi4 = false;
                                            this.alefrecno4 = true;
                                            this.alefrec4 = true;
                                          }

                                        } else if (item.idComponente == 5) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi5 = true;
                                            this.alefrecno5 = false;
                                          } else {
                                            this.alefrecsi5 = false;
                                            this.alefrecno5 = true;
                                            this.alefrec5 = true;
                                          }

                                        } else if (item.idComponente == 6) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi6 = true;
                                            this.alefrecno6 = false;
                                          } else {
                                            this.alefrecsi6 = false;
                                            this.alefrecno6 = true;
                                            this.alefrec6 = true;
                                          }

                                        } else if (item.idComponente == 7) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi7 = true;
                                            this.alefrecno7 = false;
                                          } else {
                                            this.alefrecsi7 = false;
                                            this.alefrecno7 = true;
                                            this.alefrec7 = true;
                                          }

                                        } else if (item.idComponente == 8) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi10 = true;
                                            this.alefrecno10 = false;
                                          } else {
                                            this.alefrecsi10 = false;
                                            this.alefrecno10 = true;
                                            this.alefrec10 = true;
                                          }

                                        } else if (item.idComponente == 9) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi11 = true;
                                            this.alefrecno11 = false;
                                          } else {
                                            this.alefrecsi11 = false;
                                            this.alefrecno11 = true;
                                            this.alefrec11 = true;
                                          }

                                        } else if (item.idComponente == 10) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi8 = true;
                                            this.alefrecno8 = false;
                                          } else {
                                            this.alefrecsi8 = false;
                                            this.alefrecno8 = true;
                                            this.alefrec8 = true;
                                          }

                                        } else if (item.idComponente == 11) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi9 = true;
                                            this.alefrecno9 = false;
                                          } else {
                                            this.alefrecsi9 = false;
                                            this.alefrecno9 = true;
                                            this.alefrec9 = true;
                                          }

                                        } else if (item.idComponente == 12) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi13 = true;
                                            this.alefrecno13 = false;
                                          } else {
                                            this.alefrecsi13 = false;
                                            this.alefrecno13 = true;
                                            this.alefrec13 = true;
                                          }

                                        } else if (item.idComponente == 13) {
                                          if (item.prestados < 3) {
                                            this.alefrecsi12 = true;
                                            this.alefrecno12 = false;
                                          } else {
                                            this.alefrecsi12 = false;
                                            this.alefrecno12 = true;
                                            this.alefrec12 = true;
                                          }

                                        }
                                      })
                                    } else {
                                      /*  this.ps_cct_almuerzo = false;
                                       this.ps_cct_ampm = true;-----------
                                       this.ind_ampm = false;
                                       this.ps_cct_almuerzo2 = false;
                                       this.ps_cct_ampm2 = true;-----------
                                       this.ind_ampm2 = false; */
                                      miFrecuenciaSinDuplicados.forEach(item => {
                                        if (item.idComponente == 1) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi1 = true;
                                            this.alefrecno1 = false;
                                          } else {
                                            this.alefrecsi1 = false;
                                            this.alefrecno1 = true;
                                            this.alefrec1 = true;
                                          }

                                        } else if (item.idComponente == 2) {
                                          if (item.prestados > 0 && item.prestados < 3) {
                                            this.alefrecsi2 = true;
                                            this.alefrecno2 = false;
                                          } else {
                                            this.alefrecsi2 = false;
                                            this.alefrecno2 = true;
                                            this.alefrec2 = true;
                                          }

                                        } else if (item.idComponente == 3) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi3 = true;
                                            this.alefrecno3 = false;
                                          } else {
                                            this.alefrecsi3 = false;
                                            this.alefrecno3 = true;
                                            this.alefrec3 = true;
                                          }

                                        } else if (item.idComponente == 4) {
                                          if (item.prestados == 2) {
                                            this.alefrecsi4 = true;
                                            this.alefrecno4 = false;
                                          } else {
                                            this.alefrecsi4 = false;
                                            this.alefrecno4 = true;
                                            this.alefrec4 = true;
                                          }

                                        } else if (item.idComponente == 5) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi5 = true;
                                            this.alefrecno5 = false;
                                          } else {
                                            this.alefrecsi5 = false;
                                            this.alefrecno5 = true;
                                            this.alefrec5 = true;
                                          }

                                        } else if (item.idComponente == 6) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi6 = true;
                                            this.alefrecno6 = false;
                                          } else {
                                            this.alefrecsi6 = false;
                                            this.alefrecno6 = true;
                                            this.alefrec6 = true;
                                          }

                                        } else if (item.idComponente == 7) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi7 = true;
                                            this.alefrecno7 = false;
                                          } else {
                                            this.alefrecsi7 = false;
                                            this.alefrecno7 = true;
                                            this.alefrec7 = true;
                                          }

                                        } else if (item.idComponente == 8) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi10 = true;
                                            this.alefrecno10 = false;
                                          } else {
                                            this.alefrecsi10 = false;
                                            this.alefrecno10 = true;
                                            this.alefrec10 = true;
                                          }

                                        } else if (item.idComponente == 9) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi11 = true;
                                            this.alefrecno11 = false;
                                          } else {
                                            this.alefrecsi11 = false;
                                            this.alefrecno11 = true;
                                            this.alefrec11 = true;
                                          }

                                        } else if (item.idComponente == 10) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi8 = true;
                                            this.alefrecno8 = false;
                                          } else {
                                            this.alefrecsi8 = false;
                                            this.alefrecno8 = true;
                                            this.alefrec8 = true;
                                          }

                                        } else if (item.idComponente == 11) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi9 = true;
                                            this.alefrecno9 = false;
                                          } else {
                                            this.alefrecsi9 = false;
                                            this.alefrecno9 = true;
                                            this.alefrec9 = true;
                                          }

                                        } else if (item.idComponente == 12) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi13 = true;
                                            this.alefrecno13 = false;
                                          } else {
                                            this.alefrecsi13 = false;
                                            this.alefrecno13 = true;
                                            this.alefrec13 = true;
                                          }

                                        } else if (item.idComponente == 13) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi12 = true;
                                            this.alefrecno12 = false;
                                          } else {
                                            this.alefrecsi12 = false;
                                            this.alefrecno12 = true;
                                            this.alefrec12 = true;
                                          }

                                        }
                                      })
                                    }

                                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                                    /*  this.ps_cct_almuerzo = false;
                                     this.ps_cct_ampm = false;
                                     this.ind_ampm = true; ----------------
                                     this.ps_cct_almuerzo2 = false;
                                     this.ps_cct_ampm2 = false;
                                     this.ind_ampm2 = true; -----------------
                                     */

                                    miFrecuenciaSinDuplicados.forEach(item => {
                                      if (item.idComponente == 1) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi1 = true;
                                          this.alefrecno1 = false;
                                        } else {
                                          this.alefrecsi1 = false;
                                          this.alefrecno1 = true;
                                          this.alefrec1 = true;
                                        }

                                      } else if (item.idComponente == 2) {

                                        if (item.prestados > 0 && item.prestados < 3) {
                                          this.alefrecsi2 = true;
                                          this.alefrecno2 = false;
                                        } else {
                                          this.alefrecsi2 = false;
                                          this.alefrecno2 = true;
                                          this.alefrec2 = true;
                                        }

                                      } else if (item.idComponente == 3) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi3 = true;
                                          this.alefrecno3 = false;
                                        } else {
                                          this.alefrecsi3 = false;
                                          this.alefrecno3 = true;
                                          this.alefrec3 = true;
                                        }

                                      } else if (item.idComponente == 4) {
                                        if (item.prestados < 3) {
                                          this.alefrecsi4 = true;
                                          this.alefrecno4 = false;
                                        } else {
                                          this.alefrecsi4 = false;
                                          this.alefrecno4 = true;
                                          this.alefrec4 = true;
                                        }

                                      } else if (item.idComponente == 5) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi5 = true;
                                          this.alefrecno5 = false;
                                        } else {
                                          this.alefrecsi5 = false;
                                          this.alefrecno5 = true;
                                          this.alefrec5 = true;
                                        }

                                      } else if (item.idComponente == 6) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi6 = true;
                                          this.alefrecno6 = false;
                                        } else {
                                          this.alefrecsi6 = false;
                                          this.alefrecno6 = true;
                                          this.alefrec6 = true;
                                        }

                                      } else if (item.idComponente == 7) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi7 = true;
                                          this.alefrecno7 = false;
                                        } else {
                                          this.alefrecsi7 = false;
                                          this.alefrecno7 = true;
                                          this.alefrec7 = true;
                                        }

                                      } else if (item.idComponente == 8) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi10 = true;
                                          this.alefrecno10 = false;
                                        } else {
                                          this.alefrecsi10 = false;
                                          this.alefrecno10 = true;
                                          this.alefrec10 = true;
                                        }

                                      } else if (item.idComponente == 9) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi11 = true;
                                          this.alefrecno11 = false;
                                        } else {
                                          this.alefrecsi11 = false;
                                          this.alefrecno11 = true;
                                          this.alefrec11 = true;
                                        }

                                      } else if (item.idComponente == 10) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi8 = true;
                                          this.alefrecno8 = false;
                                        } else {
                                          this.alefrecsi8 = false;
                                          this.alefrecno8 = true;
                                          this.alefrec8 = true;
                                        }

                                      } else if (item.idComponente == 11) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi9 = true;
                                          this.alefrecno9 = false;
                                        } else {
                                          this.alefrecsi9 = false;
                                          this.alefrecno9 = true;
                                          this.alefrec9 = true;
                                        }

                                      } else if (item.idComponente == 12) {
                                        if (item.prestados == 2) {
                                          this.alefrecsi13 = true;
                                          this.alefrecno13 = false;
                                        } else {
                                          this.alefrecsi13 = false;
                                          this.alefrecno13 = true;
                                          this.alefrec13 = true;
                                        }

                                      } else if (item.idComponente == 13) {
                                        if (item.prestados == 5) {
                                          this.alefrecsi12 = true;
                                          this.alefrecno12 = false;
                                        } else {
                                          this.alefrecsi12 = false;
                                          this.alefrecno12 = true;
                                          this.alefrec12 = true;
                                        }

                                      }
                                    })
                                  }
                                } else {
                                  //modalidad ps 1 ind 2 cct3
                                  if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                                    //tipo racion 1 almuerzo 2 ampm 4 cualificado
                                    if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                                      /* this.ps_cct_almuerzo = true;
                                      this.ps_cct_ampm = false;
                                      this.ind_ampm = false;
                                      this.ps_cct_almuerzo2 = true;
                                      this.ps_cct_ampm22 = false;
                                      this.ind_ampm2 = false; */
                                      miFrecuenciaSinDuplicados.forEach(item => {
                                        if (item.idComponente == 1) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi1 = true;
                                            this.alefrecno1 = false;
                                          } else {
                                            this.alefrecsi1 = false;
                                            this.alefrecno1 = true;
                                            this.alefrec1 = true;
                                          }

                                        } else if (item.idComponente == 2) {
                                          if (item.prestados > 0 && item.prestados < 3) {
                                            this.alefrecsi2 = true;
                                            this.alefrecno2 = false;
                                          } else {
                                            this.alefrecsi2 = false;
                                            this.alefrecno2 = true;
                                            this.alefrec2 = true;
                                          }

                                        } else if (item.idComponente == 3) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi3 = true;
                                            this.alefrecno3 = false;
                                          } else {
                                            this.alefrecsi3 = false;
                                            this.alefrecno3 = true;
                                            this.alefrec3 = true;
                                          }

                                        } else if (item.idComponente == 4) {
                                          if (item.prestados == 2) {
                                            this.alefrecsi4 = true;
                                            this.alefrecno4 = false;
                                          } else {
                                            this.alefrecsi4 = false;
                                            this.alefrecno4 = true;
                                            this.alefrec4 = true;
                                          }

                                        } else if (item.idComponente == 5) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi5 = true;
                                            this.alefrecno5 = false;
                                          } else {
                                            this.alefrecsi5 = false;
                                            this.alefrecno5 = true;
                                            this.alefrec5 = true;
                                          }

                                        } else if (item.idComponente == 6) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi6 = true;
                                            this.alefrecno6 = false;
                                          } else {
                                            this.alefrecsi6 = false;
                                            this.alefrecno6 = true;
                                            this.alefrec6 = true;
                                          }

                                        } else if (item.idComponente == 7) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi7 = true;
                                            this.alefrecno7 = false;
                                          } else {
                                            this.alefrecsi7 = false;
                                            this.alefrecno7 = true;
                                            this.alefrec7 = true;
                                          }

                                        } else if (item.idComponente == 8) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi10 = true;
                                            this.alefrecno10 = false;
                                          } else {
                                            this.alefrecsi10 = false;
                                            this.alefrecno10 = true;
                                            this.alefrec10 = true;
                                          }

                                        } else if (item.idComponente == 9) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi11 = true;
                                            this.alefrecno11 = false;
                                          } else {
                                            this.alefrecsi11 = false;
                                            this.alefrecno11 = true;
                                            this.alefrec11 = true;
                                          }

                                        } else if (item.idComponente == 10) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi8 = true;
                                            this.alefrecno8 = false;
                                          } else {
                                            this.alefrecsi8 = false;
                                            this.alefrecno8 = true;
                                            this.alefrec8 = true;
                                          }

                                        } else if (item.idComponente == 11) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi9 = true;
                                            this.alefrecno9 = false;
                                          } else {
                                            this.alefrecsi9 = false;
                                            this.alefrecno9 = true;
                                            this.alefrec9 = true;
                                          }

                                        } else if (item.idComponente == 12) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi13 = true;
                                            this.alefrecno13 = false;
                                          } else {
                                            this.alefrecsi13 = false;
                                            this.alefrecno13 = true;
                                            this.alefrec13 = true;
                                          }

                                        } else if (item.idComponente == 13) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi12 = true;
                                            this.alefrecno12 = false;
                                          } else {
                                            this.alefrecsi12 = false;
                                            this.alefrecno12 = true;
                                            this.alefrec12 = true;
                                          }

                                        }
                                      })
                                    } else {
                                      /* this.ps_cct_almuerzo = false;
                                      this.ps_cct_ampm = true;--------
                                      this.ind_ampm = false;
                                      this.ps_cct_almuerzo2 = false;
                                      this.ps_cct_ampm22 = true;------------
                                      this.ind_ampm2 = false; */
                                      miFrecuenciaSinDuplicados.forEach(item => {
                                        if (item.idComponente == 1) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi1 = true;
                                            this.alefrecno1 = false;
                                          } else {
                                            this.alefrecsi1 = false;
                                            this.alefrecno1 = true;
                                            this.alefrec1 = true;
                                          }

                                        } else if (item.idComponente == 2) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi2 = true;
                                            this.alefrecno2 = false;
                                          } else {
                                            this.alefrecsi2 = false;
                                            this.alefrecno2 = true;
                                            this.alefrec2 = true;
                                          }

                                        } else if (item.idComponente == 3) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi3 = true;
                                            this.alefrecno3 = false;
                                          } else {
                                            this.alefrecsi3 = false;
                                            this.alefrecno3 = true;
                                            this.alefrec3 = true;
                                          }

                                        } else if (item.idComponente == 4) {
                                          if (item.prestados == 3) {
                                            this.alefrecsi4 = true;
                                            this.alefrecno4 = false;
                                          } else {
                                            this.alefrecsi4 = false;
                                            this.alefrecno4 = true;
                                            this.alefrec4 = true;
                                          }

                                        } else if (item.idComponente == 5) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi5 = true;
                                            this.alefrecno5 = false;
                                          } else {
                                            this.alefrecsi5 = false;
                                            this.alefrecno5 = true;
                                            this.alefrec5 = true;
                                          }

                                        } else if (item.idComponente == 6) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi6 = true;
                                            this.alefrecno6 = false;
                                          } else {
                                            this.alefrecsi6 = false;
                                            this.alefrecno6 = true;
                                            this.alefrec6 = true;
                                          }

                                        } else if (item.idComponente == 7) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi7 = true;
                                            this.alefrecno7 = false;
                                          } else {
                                            this.alefrecsi7 = false;
                                            this.alefrecno7 = true;
                                            this.alefrec7 = true;
                                          }

                                        } else if (item.idComponente == 8) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi10 = true;
                                            this.alefrecno10 = false;
                                          } else {
                                            this.alefrecsi10 = false;
                                            this.alefrecno10 = true;
                                            this.alefrec10 = true;
                                          }

                                        } else if (item.idComponente == 9) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi11 = true;
                                            this.alefrecno11 = false;
                                          } else {
                                            this.alefrecsi11 = false;
                                            this.alefrecno11 = true;
                                            this.alefrec11 = true;
                                          }

                                        } else if (item.idComponente == 10) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi8 = true;
                                            this.alefrecno8 = false;
                                          } else {
                                            this.alefrecsi8 = false;
                                            this.alefrecno8 = true;
                                            this.alefrec8 = true;
                                          }

                                        } else if (item.idComponente == 11) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi9 = true;
                                            this.alefrecno9 = false;
                                          } else {
                                            this.alefrecsi9 = false;
                                            this.alefrecno9 = true;
                                            this.alefrec9 = true;
                                          }

                                        } else if (item.idComponente == 12) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi13 = true;
                                            this.alefrecno13 = false;
                                          } else {
                                            this.alefrecsi13 = false;
                                            this.alefrecno13 = true;
                                            this.alefrec13 = true;
                                          }

                                        } else if (item.idComponente == 13) {
                                          if (item.prestados == 5) {
                                            this.alefrecsi12 = true;
                                            this.alefrecno12 = false;
                                          } else {
                                            this.alefrecsi12 = false;
                                            this.alefrecno12 = true;
                                            this.alefrec12 = true;
                                          }

                                        }
                                      })
                                    }

                                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                                    this.ps_cct_almuerzo = false;
                                    this.ps_cct_ampm = false;
                                    this.ind_ampm = true;
                                    this.ps_cct_almuerzo2 = false;
                                    this.ps_cct_ampm22 = false;
                                    this.ind_ampm2 = true;

                                  }
                                }
                              }

                            }
                          )

                        } else {
                          if (f[0].tipoActividadFisicaId == 2) {
                            //modalidad ps 1 ind 2 cct3
                            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                              //tipo racion 1 almuerzo 2 ampm 4 cualificado
                              if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                                /* this.ps_cct_almuerzo = true;--------
                                this.ps_cct_ampm = false;
                                this.ind_ampm = false;
                                this.ps_cct_almuerzo2 = true;--------
                                this.ps_cct_ampm2 = false;
                                this.ind_ampm2 = false; */
                                miFrecuenciaSinDuplicados.forEach(item => {
                                  if (item.idComponente == 1) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi1 = true;
                                      this.alefrecno1 = false;
                                    } else {
                                      this.alefrecsi1 = false;
                                      this.alefrecno1 = true;
                                      this.alefrec1 = true;
                                    }

                                  } else if (item.idComponente == 2) {
                                    if (item.prestados > 0 && item.prestados < 3) {
                                      this.alefrecsi2 = true;
                                      this.alefrecno2 = false;//falta mirar bien
                                    } else {
                                      this.alefrecsi2 = false;
                                      this.alefrecno2 = true;
                                      this.alefrec2 = true;
                                    }

                                  } else if (item.idComponente == 3) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi3 = true;
                                      this.alefrecno3 = false;
                                    } else {
                                      this.alefrecsi3 = false;
                                      this.alefrecno3 = true;
                                      this.alefrec3 = true;
                                    }

                                  } else if (item.idComponente == 4) {
                                    if (item.prestados == 2) {
                                      this.alefrecsi4 = true;
                                      this.alefrecno4 = false;
                                    } else {
                                      this.alefrecsi4 = false;
                                      this.alefrecno4 = true;
                                      this.alefrec4 = true;
                                    }

                                  } else if (item.idComponente == 5) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi5 = true;
                                      this.alefrecno5 = false;
                                    } else {
                                      this.alefrecsi5 = false;
                                      this.alefrecno5 = true;
                                      this.alefrec5 = true;
                                    }

                                  } else if (item.idComponente == 6) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi6 = true;
                                      this.alefrecno6 = false;
                                    } else {
                                      this.alefrecsi6 = false;
                                      this.alefrecno6 = true;
                                      this.alefrec6 = true;
                                    }

                                  } else if (item.idComponente == 7) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi7 = true;
                                      this.alefrecno7 = false;
                                    } else {
                                      this.alefrecsi7 = false;
                                      this.alefrecno7 = true;
                                      this.alefrec7 = true;
                                    }

                                  } else if (item.idComponente == 8) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi10 = true;
                                      this.alefrecno10 = false;
                                    } else {
                                      this.alefrecsi10 = false;
                                      this.alefrecno10 = true;
                                      this.alefrec10 = true;
                                    }

                                  } else if (item.idComponente == 9) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi11 = true;
                                      this.alefrecno11 = false;
                                    } else {
                                      this.alefrecsi11 = false;
                                      this.alefrecno11 = true;
                                      this.alefrec11 = true;
                                    }

                                  } else if (item.idComponente == 10) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi8 = true;
                                      this.alefrecno8 = false;
                                    } else {
                                      this.alefrecsi8 = false;
                                      this.alefrecno8 = true;
                                      this.alefrec8 = true;
                                    }

                                  } else if (item.idComponente == 11) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi9 = true;
                                      this.alefrecno9 = false;
                                    } else {
                                      this.alefrecsi9 = false;
                                      this.alefrecno9 = true;
                                      this.alefrec9 = true;
                                    }

                                  } else if (item.idComponente == 12) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi13 = true;
                                      this.alefrecno13 = false;
                                    } else {
                                      this.alefrecsi13 = false;
                                      this.alefrecno13 = true;
                                      this.alefrec13 = true;
                                    }

                                  } else if (item.idComponente == 13) {
                                    if (item.prestados < 3) {
                                      this.alefrecsi12 = true;
                                      this.alefrecno12 = false;
                                    } else {
                                      this.alefrecsi12 = false;
                                      this.alefrecno12 = true;
                                      this.alefrec12 = true;
                                    }

                                  }
                                })
                              } else {
                                /*  this.ps_cct_almuerzo = false;
                                 this.ps_cct_ampm = true;-----------
                                 this.ind_ampm = false;
                                 this.ps_cct_almuerzo2 = false;
                                 this.ps_cct_ampm2 = true;-----------
                                 this.ind_ampm2 = false; */
                                miFrecuenciaSinDuplicados.forEach(item => {
                                  if (item.idComponente == 1) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi1 = true;
                                      this.alefrecno1 = false;
                                    } else {
                                      this.alefrecsi1 = false;
                                      this.alefrecno1 = true;
                                      this.alefrec1 = true;
                                    }

                                  } else if (item.idComponente == 2) {
                                    if (item.prestados > 0 && item.prestados < 3) {
                                      this.alefrecsi2 = true;
                                      this.alefrecno2 = false;
                                    } else {
                                      this.alefrecsi2 = false;
                                      this.alefrecno2 = true;
                                      this.alefrec2 = true;
                                    }

                                  } else if (item.idComponente == 3) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi3 = true;
                                      this.alefrecno3 = false;
                                    } else {
                                      this.alefrecsi3 = false;
                                      this.alefrecno3 = true;
                                      this.alefrec3 = true;
                                    }

                                  } else if (item.idComponente == 4) {
                                    if (item.prestados == 2) {
                                      this.alefrecsi4 = true;
                                      this.alefrecno4 = false;
                                    } else {
                                      this.alefrecsi4 = false;
                                      this.alefrecno4 = true;
                                      this.alefrec4 = true;
                                    }

                                  } else if (item.idComponente == 5) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi5 = true;
                                      this.alefrecno5 = false;
                                    } else {
                                      this.alefrecsi5 = false;
                                      this.alefrecno5 = true;
                                      this.alefrec5 = true;
                                    }

                                  } else if (item.idComponente == 6) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi6 = true;
                                      this.alefrecno6 = false;
                                    } else {
                                      this.alefrecsi6 = false;
                                      this.alefrecno6 = true;
                                      this.alefrec6 = true;
                                    }

                                  } else if (item.idComponente == 7) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi7 = true;
                                      this.alefrecno7 = false;
                                    } else {
                                      this.alefrecsi7 = false;
                                      this.alefrecno7 = true;
                                      this.alefrec7 = true;
                                    }

                                  } else if (item.idComponente == 8) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi10 = true;
                                      this.alefrecno10 = false;
                                    } else {
                                      this.alefrecsi10 = false;
                                      this.alefrecno10 = true;
                                      this.alefrec10 = true;
                                    }

                                  } else if (item.idComponente == 9) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi11 = true;
                                      this.alefrecno11 = false;
                                    } else {
                                      this.alefrecsi11 = false;
                                      this.alefrecno11 = true;
                                      this.alefrec11 = true;
                                    }

                                  } else if (item.idComponente == 10) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi8 = true;
                                      this.alefrecno8 = false;
                                    } else {
                                      this.alefrecsi8 = false;
                                      this.alefrecno8 = true;
                                      this.alefrec8 = true;
                                    }

                                  } else if (item.idComponente == 11) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi9 = true;
                                      this.alefrecno9 = false;
                                    } else {
                                      this.alefrecsi9 = false;
                                      this.alefrecno9 = true;
                                      this.alefrec9 = true;
                                    }

                                  } else if (item.idComponente == 12) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi13 = true;
                                      this.alefrecno13 = false;
                                    } else {
                                      this.alefrecsi13 = false;
                                      this.alefrecno13 = true;
                                      this.alefrec13 = true;
                                    }

                                  } else if (item.idComponente == 13) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi12 = true;
                                      this.alefrecno12 = false;
                                    } else {
                                      this.alefrecsi12 = false;
                                      this.alefrecno12 = true;
                                      this.alefrec12 = true;
                                    }

                                  }
                                })
                              }

                            } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                              /*  this.ps_cct_almuerzo = false;
                               this.ps_cct_ampm = false;
                               this.ind_ampm = true; ----------------
                               this.ps_cct_almuerzo2 = false;
                               this.ps_cct_ampm2 = false;
                               this.ind_ampm2 = true; -----------------
                               */

                              miFrecuenciaSinDuplicados.forEach(item => {
                                if (item.idComponente == 1) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi1 = true;
                                    this.alefrecno1 = false;
                                  } else {
                                    this.alefrecsi1 = false;
                                    this.alefrecno1 = true;
                                    this.alefrec1 = true;
                                  }

                                } else if (item.idComponente == 2) {

                                  if (item.prestados > 0 && item.prestados < 3) {
                                    this.alefrecsi2 = true;
                                    this.alefrecno2 = false;
                                  } else {
                                    this.alefrecsi2 = false;
                                    this.alefrecno2 = true;
                                    this.alefrec2 = true;
                                  }

                                } else if (item.idComponente == 3) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi3 = true;
                                    this.alefrecno3 = false;
                                  } else {
                                    this.alefrecsi3 = false;
                                    this.alefrecno3 = true;
                                    this.alefrec3 = true;
                                  }

                                } else if (item.idComponente == 4) {
                                  if (item.prestados < 3) {
                                    this.alefrecsi4 = true;
                                    this.alefrecno4 = false;
                                  } else {
                                    this.alefrecsi4 = false;
                                    this.alefrecno4 = true;
                                    this.alefrec4 = true;
                                  }

                                } else if (item.idComponente == 5) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi5 = true;
                                    this.alefrecno5 = false;
                                  } else {
                                    this.alefrecsi5 = false;
                                    this.alefrecno5 = true;
                                    this.alefrec5 = true;
                                  }

                                } else if (item.idComponente == 6) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi6 = true;
                                    this.alefrecno6 = false;
                                  } else {
                                    this.alefrecsi6 = false;
                                    this.alefrecno6 = true;
                                    this.alefrec6 = true;
                                  }

                                } else if (item.idComponente == 7) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi7 = true;
                                    this.alefrecno7 = false;
                                  } else {
                                    this.alefrecsi7 = false;
                                    this.alefrecno7 = true;
                                    this.alefrec7 = true;
                                  }

                                } else if (item.idComponente == 8) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi10 = true;
                                    this.alefrecno10 = false;
                                  } else {
                                    this.alefrecsi10 = false;
                                    this.alefrecno10 = true;
                                    this.alefrec10 = true;
                                  }

                                } else if (item.idComponente == 9) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi11 = true;
                                    this.alefrecno11 = false;
                                  } else {
                                    this.alefrecsi11 = false;
                                    this.alefrecno11 = true;
                                    this.alefrec11 = true;
                                  }

                                } else if (item.idComponente == 10) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi8 = true;
                                    this.alefrecno8 = false;
                                  } else {
                                    this.alefrecsi8 = false;
                                    this.alefrecno8 = true;
                                    this.alefrec8 = true;
                                  }

                                } else if (item.idComponente == 11) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi9 = true;
                                    this.alefrecno9 = false;
                                  } else {
                                    this.alefrecsi9 = false;
                                    this.alefrecno9 = true;
                                    this.alefrec9 = true;
                                  }

                                } else if (item.idComponente == 12) {
                                  if (item.prestados == 2) {
                                    this.alefrecsi13 = true;
                                    this.alefrecno13 = false;
                                  } else {
                                    this.alefrecsi13 = false;
                                    this.alefrecno13 = true;
                                    this.alefrec13 = true;
                                  }

                                } else if (item.idComponente == 13) {
                                  if (item.prestados == 5) {
                                    this.alefrecsi12 = true;
                                    this.alefrecno12 = false;
                                  } else {
                                    this.alefrecsi12 = false;
                                    this.alefrecno12 = true;
                                    this.alefrec12 = true;
                                  }

                                }
                              })
                            }
                          } else {
                            //modalidad ps 1 ind 2 cct3
                            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                              //tipo racion 1 almuerzo 2 ampm 4 cualificado
                              if (this.CicloMenuObject.iD_TipoComplemento == 1) {
                                /* this.ps_cct_almuerzo = true;
                                this.ps_cct_ampm = false;
                                this.ind_ampm = false;
                                this.ps_cct_almuerzo2 = true;
                                this.ps_cct_ampm22 = false;
                                this.ind_ampm2 = false; */
                                miFrecuenciaSinDuplicados.forEach(item => {
                                  if (item.idComponente == 1) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi1 = true;
                                      this.alefrecno1 = false;
                                    } else {
                                      this.alefrecsi1 = false;
                                      this.alefrecno1 = true;
                                      this.alefrec1 = true;
                                    }

                                  } else if (item.idComponente == 2) {
                                    if (item.prestados > 0 && item.prestados < 3) {
                                      this.alefrecsi2 = true;
                                      this.alefrecno2 = false;
                                    } else {
                                      this.alefrecsi2 = false;
                                      this.alefrecno2 = true;
                                      this.alefrec2 = true;
                                    }

                                  } else if (item.idComponente == 3) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi3 = true;
                                      this.alefrecno3 = false;
                                    } else {
                                      this.alefrecsi3 = false;
                                      this.alefrecno3 = true;
                                      this.alefrec3 = true;
                                    }

                                  } else if (item.idComponente == 4) {
                                    if (item.prestados == 2) {
                                      this.alefrecsi4 = true;
                                      this.alefrecno4 = false;
                                    } else {
                                      this.alefrecsi4 = false;
                                      this.alefrecno4 = true;
                                      this.alefrec4 = true;
                                    }

                                  } else if (item.idComponente == 5) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi5 = true;
                                      this.alefrecno5 = false;
                                    } else {
                                      this.alefrecsi5 = false;
                                      this.alefrecno5 = true;
                                      this.alefrec5 = true;
                                    }

                                  } else if (item.idComponente == 6) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi6 = true;
                                      this.alefrecno6 = false;
                                    } else {
                                      this.alefrecsi6 = false;
                                      this.alefrecno6 = true;
                                      this.alefrec6 = true;
                                    }

                                  } else if (item.idComponente == 7) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi7 = true;
                                      this.alefrecno7 = false;
                                    } else {
                                      this.alefrecsi7 = false;
                                      this.alefrecno7 = true;
                                      this.alefrec7 = true;
                                    }

                                  } else if (item.idComponente == 8) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi10 = true;
                                      this.alefrecno10 = false;
                                    } else {
                                      this.alefrecsi10 = false;
                                      this.alefrecno10 = true;
                                      this.alefrec10 = true;
                                    }

                                  } else if (item.idComponente == 9) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi11 = true;
                                      this.alefrecno11 = false;
                                    } else {
                                      this.alefrecsi11 = false;
                                      this.alefrecno11 = true;
                                      this.alefrec11 = true;
                                    }

                                  } else if (item.idComponente == 10) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi8 = true;
                                      this.alefrecno8 = false;
                                    } else {
                                      this.alefrecsi8 = false;
                                      this.alefrecno8 = true;
                                      this.alefrec8 = true;
                                    }

                                  } else if (item.idComponente == 11) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi9 = true;
                                      this.alefrecno9 = false;
                                    } else {
                                      this.alefrecsi9 = false;
                                      this.alefrecno9 = true;
                                      this.alefrec9 = true;
                                    }

                                  } else if (item.idComponente == 12) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi13 = true;
                                      this.alefrecno13 = false;
                                    } else {
                                      this.alefrecsi13 = false;
                                      this.alefrecno13 = true;
                                      this.alefrec13 = true;
                                    }

                                  } else if (item.idComponente == 13) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi12 = true;
                                      this.alefrecno12 = false;
                                    } else {
                                      this.alefrecsi12 = false;
                                      this.alefrecno12 = true;
                                      this.alefrec12 = true;
                                    }

                                  }
                                })
                              } else {
                                /* this.ps_cct_almuerzo = false;
                                this.ps_cct_ampm = true;--------
                                this.ind_ampm = false;
                                this.ps_cct_almuerzo2 = false;
                                this.ps_cct_ampm22 = true;------------
                                this.ind_ampm2 = false; */
                                miFrecuenciaSinDuplicados.forEach(item => {
                                  if (item.idComponente == 1) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi1 = true;
                                      this.alefrecno1 = false;
                                    } else {
                                      this.alefrecsi1 = false;
                                      this.alefrecno1 = true;
                                      this.alefrec1 = true;
                                    }

                                  } else if (item.idComponente == 2) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi2 = true;
                                      this.alefrecno2 = false;
                                    } else {
                                      this.alefrecsi2 = false;
                                      this.alefrecno2 = true;
                                      this.alefrec2 = true;
                                    }

                                  } else if (item.idComponente == 3) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi3 = true;
                                      this.alefrecno3 = false;
                                    } else {
                                      this.alefrecsi3 = false;
                                      this.alefrecno3 = true;
                                      this.alefrec3 = true;
                                    }

                                  } else if (item.idComponente == 4) {
                                    if (item.prestados == 3) {
                                      this.alefrecsi4 = true;
                                      this.alefrecno4 = false;
                                    } else {
                                      this.alefrecsi4 = false;
                                      this.alefrecno4 = true;
                                      this.alefrec4 = true;
                                    }

                                  } else if (item.idComponente == 5) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi5 = true;
                                      this.alefrecno5 = false;
                                    } else {
                                      this.alefrecsi5 = false;
                                      this.alefrecno5 = true;
                                      this.alefrec5 = true;
                                    }

                                  } else if (item.idComponente == 6) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi6 = true;
                                      this.alefrecno6 = false;
                                    } else {
                                      this.alefrecsi6 = false;
                                      this.alefrecno6 = true;
                                      this.alefrec6 = true;
                                    }

                                  } else if (item.idComponente == 7) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi7 = true;
                                      this.alefrecno7 = false;
                                    } else {
                                      this.alefrecsi7 = false;
                                      this.alefrecno7 = true;
                                      this.alefrec7 = true;
                                    }

                                  } else if (item.idComponente == 8) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi10 = true;
                                      this.alefrecno10 = false;
                                    } else {
                                      this.alefrecsi10 = false;
                                      this.alefrecno10 = true;
                                      this.alefrec10 = true;
                                    }

                                  } else if (item.idComponente == 9) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi11 = true;
                                      this.alefrecno11 = false;
                                    } else {
                                      this.alefrecsi11 = false;
                                      this.alefrecno11 = true;
                                      this.alefrec11 = true;
                                    }

                                  } else if (item.idComponente == 10) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi8 = true;
                                      this.alefrecno8 = false;
                                    } else {
                                      this.alefrecsi8 = false;
                                      this.alefrecno8 = true;
                                      this.alefrec8 = true;
                                    }

                                  } else if (item.idComponente == 11) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi9 = true;
                                      this.alefrecno9 = false;
                                    } else {
                                      this.alefrecsi9 = false;
                                      this.alefrecno9 = true;
                                      this.alefrec9 = true;
                                    }

                                  } else if (item.idComponente == 12) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi13 = true;
                                      this.alefrecno13 = false;
                                    } else {
                                      this.alefrecsi13 = false;
                                      this.alefrecno13 = true;
                                      this.alefrec13 = true;
                                    }

                                  } else if (item.idComponente == 13) {
                                    if (item.prestados == 5) {
                                      this.alefrecsi12 = true;
                                      this.alefrecno12 = false;
                                    } else {
                                      this.alefrecsi12 = false;
                                      this.alefrecno12 = true;
                                      this.alefrec12 = true;
                                    }

                                  }
                                })
                              }

                            } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                              this.ps_cct_almuerzo = false;
                              this.ps_cct_ampm = false;
                              this.ind_ampm = true;
                              this.ps_cct_almuerzo2 = false;
                              this.ps_cct_ampm22 = false;
                              this.ind_ampm2 = true;

                            }
                          }
                        }

                      }
                    )
                  }, (err) => {
                  }
                )
              }
            } else if (f[0].iD_TipoModeloOperacionBase == 2) {

              this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion;
              /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
              let h = this.semanaList.filter(item => item.numeroSemana == this.numeroSemana)
              if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

              let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText)
              this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
              /* this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia; */
              /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo=this.gradoid2; */

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

                  this.mostraraletrasmacromicro()

                },
                (err) => {
                }
              );
              let dia = null
              this.PA_conteoIntercambiosPivreq = {};
              this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
              this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
              this.dataComponentesActualizaxIntercambiosSemana(this.PA_conteoIntercambiosPivreq);

            }
          }

        }
      )

    }

  }

  onNivelEducativoChange1(event: any): void {


    let f = this.NivelEducativoList.filter(item => item.id == event[0].value);

    this.gradoid2 = f[0].id
    this.gradoText = f[0].nombre;
    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {

      this.Preparaciones3 = true;
      this.mostrarmacromicrosemana();
    } else {
      this.Productos2 = true;
      this.mostrarmacromicrosemana();
    }


  }

  mostraraletrasmacromicro() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let macro = this.dataSourceMacrosemana.filter(item => item.id == 5)
      macro.forEach(item => {
        if (item.icoenergia == 2) {
          this.Menergia = true;
          this.Menergia1 = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1 = true;
          this.Menergia = false;
        } else { }
        if (item.icoproteina == 2) {
          this.Mproteina = true;
          this.Mproteina1 = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1 = true;
          this.Mproteina = false;
        } else { }
        if (item.icocarbohidrato == 2) {
          this.Mcarbohidrato = true;
          this.Mcarbohidrato1 = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1 = true;
          this.Mcarbohidrato = false;
        } else { }
        if (item.icograsaTotal == 2) {
          this.MgrasasTotales = true;
          this.MgrasasTotales1 = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1 = true;
          this.MgrasasTotales = false;
        } else { }
        if (item.icograsaSaturada == 2) {
          this.MgrasasSaturadas = true;
          this.MgrasasSaturadas1 = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1 = true;
          this.MgrasasSaturadas = false;
        } else { }
      })

      let micro = this.dataSourceMicrosemana.filter(item => item.id == 5)
      micro.forEach(item => {
        if (item.icocalcio == 2) {
          this.Mcalcio = true;
          this.Mcalcio1 = false;
        } else if (item.icocalcio == 3) {
          this.Mcalcio1 = true;
          this.Mcalcio = false;
        } else { }
        if (item.icohierro == 2) {
          this.Mhierro = true;
          this.Mhierro1 = false;
        } else if (item.icohierro == 3) {
          this.Mhierro1 = true;
          this.Mhierro = false;
        } else { }
        if (item.icosodio == 2) {
          this.Msodio = true;
          this.Msodio1 = false;
        } else if (item.icosodio == 3) {
          this.Msodio1 = true;
          this.Msodio = false;
        } else { }
        if (item.icovitamina == 2) {
          this.Mvitamina = true;
          this.Mvitamina1 = false;
        } else if (item.icovitamina == 3) {
          this.Mvitamina1 = true;
          this.Mvitamina = false;
        } else { }
        if (item.icozinc == 2) {
          this.Mzinc = true;
          this.Mzinc1 = false;
        } else if (item.icozinc == 3) {
          this.Mzinc1 = true;
          this.Mzinc = false;
        } else { }
      })
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      let macro = this.dataSourceMacrosemana2.filter(item => item.id == 8)
      let micro = this.dataSourceMicrosemana2.filter(item => item.id == 8)
      macro.forEach(item => {
        //max
        if (item.icoenergia == 2) {
          this.Menergiamax = true;
          this.Menergia1max = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1max = true;
          this.Menergiamax = false;
        } else { }
        if (item.icoproteina == 2) {
          this.Mproteinamax = true;
          this.Mproteina1max = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1max = true;
          this.Mproteinamax = false;
        } else { }
        if (item.icocarbohidrato == 2) {
          this.Mcarbohidratomax = true;
          this.Mcarbohidrato1max = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1max = true;
          this.Mcarbohidratomax = false;
        } else { }
        if (item.icograsaTotal == 2) {
          this.MgrasasTotalesmax = true;
          this.MgrasasTotales1max = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1max = true;
          this.MgrasasTotalesmax = false;
        } else { }
        if (item.icograsaSaturada == 2) {
          this.MgrasasSaturadasmax = true;
          this.MgrasasSaturadas1max = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1max = true;
          this.MgrasasSaturadasmax = false;
        } else { }
        //min
        if (item.icoenergia2 == 2) {
          this.Menergiamin = true;
          this.Menergia1min = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1min = true;
          this.Menergiamin = false;
        } else { }
        if (item.icoproteina2 == 2) {
          this.Mproteinamin = true;
          this.Mproteina1min = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1min = true;
          this.Mproteinamin = false;
        } else { }
        if (item.icocarbohidrato2 == 2) {
          this.Mcarbohidratomin = true;
          this.Mcarbohidrato1min = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1min = true;
          this.Mcarbohidratomin = false;
        } else { }
        if (item.icograsaTotal2 == 2) {
          this.MgrasasTotalesmin = true;
          this.MgrasasTotales1min = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1min = true;
          this.MgrasasTotalesmin = false;
        } else { }
        if (item.icograsaSaturada2 == 2) {
          this.MgrasasSaturadasmin = true;
          this.MgrasasSaturadas1min = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1max = true;
          this.MgrasasSaturadasmax = false;
        } else { }
      })

      micro.forEach(item => {
        //max
        if (item.icocalcio == 2) {
          this.Mcalciomax = true;
          this.Mcalcio1max = false;
        } else if (item.icocalcio == 3) {
          this.Mcalcio1max = true;
          this.Mcalciomax = false;
        } else { }
        if (item.icohierro == 2) {
          this.Mhierromax = true;
          this.Mhierro1max = false;
        } else if (item.icohierro == 3) {
          this.Mhierro1max = true;
          this.Mhierromax = false;
        } else { }
        if (item.icosodio == 2) {
          this.Msodiomax = true;
          this.Msodio1max = false;
        } else if (item.icosodio == 3) {
          this.Msodio1max = true;
          this.Msodiomax = false;
        } else { }
        if (item.icovitamina == 2) {
          this.Mvitaminamax = true;
          this.Mvitamina1max = false;
        } else if (item.icovitamina == 3) {
          this.Mvitamina1max = true;
          this.Mvitaminamax = false;
        } else { }
        if (item.icozinc == 2) {
          this.Mzincmax = true;
          this.Mzinc1max = false;
        } else if (item.icozinc == 3) {
          this.Mzinc1max = true;
          this.Mzincmax = false;
        } else { }

        //min
        if (item.icocalcio2 == 2) {
          this.Mcalciomin = true;
          this.Mcalcio1min = false;
        } else if (item.icocalcio2 == 3) {
          this.Mcalcio1min = true;
          this.Mcalciomin = false;
        } else { }
        if (item.icohierro2 == 2) {
          this.Mhierromin = true;
          this.Mhierro1min = false;
        } else if (item.icohierro2 == 3) {
          this.Mhierro1min = true;
          this.Mhierromin = false;
        } else { }
        if (item.icosodio2 == 2) {
          this.Msodiomin = true;
          this.Msodio1min = false;
        } else if (item.icosodio2 == 3) {
          this.Msodio1min = true;
          this.Msodiomin = false;
        } else { }
        if (item.icovitamina2 == 2) {
          this.Mvitaminamin = true;
          this.Mvitamina1min = false;
        } else if (item.icovitamina2 == 3) {
          this.Mvitamina1min = true;
          this.Mvitaminamin = false;
        } else { }
        if (item.icozinc2 == 2) {
          this.Mzincmin = true;
          this.Mzinc1min = false;
        } else if (item.icozinc2 == 3) {
          this.Mzinc1min = true;
          this.Mzincmin = false;
        } else { }
      })

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
              (response: any) => {
                let e = response
                if (e.length == 0) {

                } else {
                  //Moderada 2 level 1

                  if (e[0].iD_TipoModeloOperacionBase == 1) {

                    let macro = this.dataSourceMacrosemana.filter(item => item.id == 5)

                    macro.forEach(item => {
                      if (item.icoenergia == 2) {
                        this.Menergia = true;
                        this.Menergia1 = false;
                      } else if (item.icoenergia == 3) {
                        this.Menergia1 = true;
                        this.Menergia = false;
                      } else { }
                      if (item.icoproteina == 2) {
                        this.Mproteina = true;
                        this.Mproteina1 = false;
                      } else if (item.icoproteina == 3) {
                        this.Mproteina1 = true;
                        this.Mproteina = false;
                      } else { }
                      if (item.icocarbohidrato == 2) {
                        this.Mcarbohidrato = true;
                        this.Mcarbohidrato1 = false;
                      } else if (item.icocarbohidrato == 3) {
                        this.Mcarbohidrato1 = true;
                        this.Mcarbohidrato = false;
                      } else { }
                      if (item.icograsaTotal == 2) {
                        this.MgrasasTotales = true;
                        this.MgrasasTotales1 = false;
                      } else if (item.icograsaTotal == 3) {
                        this.MgrasasTotales1 = true;
                        this.MgrasasTotales = false;
                      } else { }
                      if (item.icograsaSaturada == 2) {
                        this.MgrasasSaturadas = true;
                        this.MgrasasSaturadas1 = false;
                      } else if (item.icograsaSaturada == 3) {
                        this.MgrasasSaturadas1 = true;
                        this.MgrasasSaturadas = false;
                      } else { }
                    })

                    let micro = this.dataSourceMicrosemana.filter(item => item.id == 5)
                    micro.forEach(item => {
                      if (item.icocalcio == 2) {
                        this.Mcalcio = true;
                        this.Mcalcio1 = false;
                      } else if (item.icocalcio == 3) {
                        this.Mcalcio1 = true;
                        this.Mcalcio = false;
                      } else { }
                      if (item.icohierro == 2) {
                        this.Mhierro = true;
                        this.Mhierro1 = false;
                      } else if (item.icohierro == 3) {
                        this.Mhierro1 = true;
                        this.Mhierro = false;
                      } else { }
                      if (item.icosodio == 2) {
                        this.Msodio = true;
                        this.Msodio1 = false;
                      } else if (item.icosodio == 3) {
                        this.Msodio1 = true;
                        this.Msodio = false;
                      } else { }
                      if (item.icovitamina == 2) {
                        this.Mvitamina = true;
                        this.Mvitamina1 = false;
                      } else if (item.icovitamina == 3) {
                        this.Mvitamina1 = true;
                        this.Mvitamina = false;
                      } else { }
                      if (item.icozinc == 2) {
                        this.Mzinc = true;
                        this.Mzinc1 = false;
                      } else if (item.icozinc == 3) {
                        this.Mzinc1 = true;
                        this.Mzinc = false;
                      } else { }
                    })
                  } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                    let macro = this.dataSourceMacrosemana2.filter(item => item.id == 8)
                    let micro = this.dataSourceMicrosemana2.filter(item => item.id == 8)
                    macro.forEach(item => {
                      //max
                      if (item.icoenergia == 2) {
                        this.Menergiamax = true;
                        this.Menergia1max = false;
                      } else if (item.icoenergia == 3) {
                        this.Menergia1max = true;
                        this.Menergiamax = false;
                      } else { }
                      if (item.icoproteina == 2) {
                        this.Mproteinamax = true;
                        this.Mproteina1max = false;
                      } else if (item.icoproteina == 3) {
                        this.Mproteina1max = true;
                        this.Mproteinamax = false;
                      } else { }
                      if (item.icocarbohidrato == 2) {
                        this.Mcarbohidratomax = true;
                        this.Mcarbohidrato1max = false;
                      } else if (item.icocarbohidrato == 3) {
                        this.Mcarbohidrato1max = true;
                        this.Mcarbohidratomax = false;
                      } else { }
                      if (item.icograsaTotal == 2) {
                        this.MgrasasTotalesmax = true;
                        this.MgrasasTotales1max = false;
                      } else if (item.icograsaTotal == 3) {
                        this.MgrasasTotales1max = true;
                        this.MgrasasTotalesmax = false;
                      } else { }
                      if (item.icograsaSaturada == 2) {
                        this.MgrasasSaturadasmax = true;
                        this.MgrasasSaturadas1max = false;
                      } else if (item.icograsaSaturada == 3) {
                        this.MgrasasSaturadas1max = true;
                        this.MgrasasSaturadasmax = false;
                      } else { }
                      //min
                      if (item.icoenergia2 == 2) {
                        this.Menergiamin = true;
                        this.Menergia1min = false;
                      } else if (item.icoenergia == 3) {
                        this.Menergia1min = true;
                        this.Menergiamin = false;
                      } else { }
                      if (item.icoproteina2 == 2) {
                        this.Mproteinamin = true;
                        this.Mproteina1min = false;
                      } else if (item.icoproteina == 3) {
                        this.Mproteina1min = true;
                        this.Mproteinamin = false;
                      } else { }
                      if (item.icocarbohidrato2 == 2) {
                        this.Mcarbohidratomin = true;
                        this.Mcarbohidrato1min = false;
                      } else if (item.icocarbohidrato == 3) {
                        this.Mcarbohidrato1min = true;
                        this.Mcarbohidratomin = false;
                      } else { }
                      if (item.icograsaTotal2 == 2) {
                        this.MgrasasTotalesmin = true;
                        this.MgrasasTotales1min = false;
                      } else if (item.icograsaTotal == 3) {
                        this.MgrasasTotales1min = true;
                        this.MgrasasTotalesmin = false;
                      } else { }
                      if (item.icograsaSaturada2 == 2) {
                        this.MgrasasSaturadasmin = true;
                        this.MgrasasSaturadas1min = false;
                      } else if (item.icograsaSaturada == 3) {
                        this.MgrasasSaturadas1max = true;
                        this.MgrasasSaturadasmax = false;
                      } else { }
                    })

                    micro.forEach(item => {
                      //max
                      if (item.icocalcio == 2) {
                        this.Mcalciomax = true;
                        this.Mcalcio1max = false;
                      } else if (item.icocalcio == 3) {
                        this.Mcalcio1max = true;
                        this.Mcalciomax = false;
                      } else { }
                      if (item.icohierro == 2) {
                        this.Mhierromax = true;
                        this.Mhierro1max = false;
                      } else if (item.icohierro == 3) {
                        this.Mhierro1max = true;
                        this.Mhierromax = false;
                      } else { }
                      if (item.icosodio == 2) {
                        this.Msodiomax = true;
                        this.Msodio1max = false;
                      } else if (item.icosodio == 3) {
                        this.Msodio1max = true;
                        this.Msodiomax = false;
                      } else { }
                      if (item.icovitamina == 2) {
                        this.Mvitaminamax = true;
                        this.Mvitamina1max = false;
                      } else if (item.icovitamina == 3) {
                        this.Mvitamina1max = true;
                        this.Mvitaminamax = false;
                      } else { }
                      if (item.icozinc == 2) {
                        this.Mzincmax = true;
                        this.Mzinc1max = false;
                      } else if (item.icozinc == 3) {
                        this.Mzinc1max = true;
                        this.Mzincmax = false;
                      } else { }

                      //min
                      if (item.icocalcio2 == 2) {
                        this.Mcalciomin = true;
                        this.Mcalcio1min = false;
                      } else if (item.icocalcio2 == 3) {
                        this.Mcalcio1min = true;
                        this.Mcalciomin = false;
                      } else { }
                      if (item.icohierro2 == 2) {
                        this.Mhierromin = true;
                        this.Mhierro1min = false;
                      } else if (item.icohierro2 == 3) {
                        this.Mhierro1min = true;
                        this.Mhierromin = false;
                      } else { }
                      if (item.icosodio2 == 2) {
                        this.Msodiomin = true;
                        this.Msodio1min = false;
                      } else if (item.icosodio2 == 3) {
                        this.Msodio1min = true;
                        this.Msodiomin = false;
                      } else { }
                      if (item.icovitamina2 == 2) {
                        this.Mvitaminamin = true;
                        this.Mvitamina1min = false;
                      } else if (item.icovitamina2 == 3) {
                        this.Mvitamina1min = true;
                        this.Mvitaminamin = false;
                      } else { }
                      if (item.icozinc2 == 2) {
                        this.Mzincmin = true;
                        this.Mzinc1min = false;
                      } else if (item.icozinc2 == 3) {
                        this.Mzinc1min = true;
                        this.Mzincmin = false;
                      } else { }
                    })

                  }
                }

              }
            )

          } else {
            //Moderada 2 level 1

            if (f[0].iD_TipoModeloOperacionBase == 1) {

              let macro = this.dataSourceMacrosemana.filter(item => item.id == 5)
              macro.forEach(item => {
                if (item.icoenergia == 2) {
                  this.Menergia = true;
                  this.Menergia1 = false;
                } else if (item.icoenergia == 3) {
                  this.Menergia1 = true;
                  this.Menergia = false;
                } else { }
                if (item.icoproteina == 2) {
                  this.Mproteina = true;
                  this.Mproteina1 = false;
                } else if (item.icoproteina == 3) {
                  this.Mproteina1 = true;
                  this.Mproteina = false;
                } else { }
                if (item.icocarbohidrato == 2) {
                  this.Mcarbohidrato = true;
                  this.Mcarbohidrato1 = false;
                } else if (item.icocarbohidrato == 3) {
                  this.Mcarbohidrato1 = true;
                  this.Mcarbohidrato = false;
                } else { }
                if (item.icograsaTotal == 2) {
                  this.MgrasasTotales = true;
                  this.MgrasasTotales1 = false;
                } else if (item.icograsaTotal == 3) {
                  this.MgrasasTotales1 = true;
                  this.MgrasasTotales = false;
                } else { }
                if (item.icograsaSaturada == 2) {
                  this.MgrasasSaturadas = true;
                  this.MgrasasSaturadas1 = false;
                } else if (item.icograsaSaturada == 3) {
                  this.MgrasasSaturadas1 = true;
                  this.MgrasasSaturadas = false;
                } else { }
              })

              let micro = this.dataSourceMicrosemana.filter(item => item.id == 5)
              micro.forEach(item => {
                if (item.icocalcio == 2) {
                  this.Mcalcio = true;
                  this.Mcalcio1 = false;
                } else if (item.icocalcio == 3) {
                  this.Mcalcio1 = true;
                  this.Mcalcio = false;
                } else { }
                if (item.icohierro == 2) {
                  this.Mhierro = true;
                  this.Mhierro1 = false;
                } else if (item.icohierro == 3) {
                  this.Mhierro1 = true;
                  this.Mhierro = false;
                } else { }
                if (item.icosodio == 2) {
                  this.Msodio = true;
                  this.Msodio1 = false;
                } else if (item.icosodio == 3) {
                  this.Msodio1 = true;
                  this.Msodio = false;
                } else { }
                if (item.icovitamina == 2) {
                  this.Mvitamina = true;
                  this.Mvitamina1 = false;
                } else if (item.icovitamina == 3) {
                  this.Mvitamina1 = true;
                  this.Mvitamina = false;
                } else { }
                if (item.icozinc == 2) {
                  this.Mzinc = true;
                  this.Mzinc1 = false;
                } else if (item.icozinc == 3) {
                  this.Mzinc1 = true;
                  this.Mzinc = false;
                } else { }
              })

            } else if (f[0].iD_TipoModeloOperacionBase == 2) {

              let macro = this.dataSourceMacrosemana2.filter(item => item.id == 8)
              let micro = this.dataSourceMicrosemana2.filter(item => item.id == 8)
              macro.forEach(item => {
                //max
                if (item.icoenergia == 2) {
                  this.Menergiamax = true;
                  this.Menergia1max = false;
                } else if (item.icoenergia == 3) {
                  this.Menergia1max = true;
                  this.Menergiamax = false;
                } else { }
                if (item.icoproteina == 2) {
                  this.Mproteinamax = true;
                  this.Mproteina1max = false;
                } else if (item.icoproteina == 3) {
                  this.Mproteina1max = true;
                  this.Mproteinamax = false;
                } else { }
                if (item.icocarbohidrato == 2) {
                  this.Mcarbohidratomax = true;
                  this.Mcarbohidrato1max = false;
                } else if (item.icocarbohidrato == 3) {
                  this.Mcarbohidrato1max = true;
                  this.Mcarbohidratomax = false;
                } else { }
                if (item.icograsaTotal == 2) {
                  this.MgrasasTotalesmax = true;
                  this.MgrasasTotales1max = false;
                } else if (item.icograsaTotal == 3) {
                  this.MgrasasTotales1max = true;
                  this.MgrasasTotalesmax = false;
                } else { }
                if (item.icograsaSaturada == 2) {
                  this.MgrasasSaturadasmax = true;
                  this.MgrasasSaturadas1max = false;
                } else if (item.icograsaSaturada == 3) {
                  this.MgrasasSaturadas1max = true;
                  this.MgrasasSaturadasmax = false;
                } else { }
                //min
                if (item.icoenergia2 == 2) {
                  this.Menergiamin = true;
                  this.Menergia1min = false;
                } else if (item.icoenergia == 3) {
                  this.Menergia1min = true;
                  this.Menergiamin = false;
                } else { }
                if (item.icoproteina2 == 2) {
                  this.Mproteinamin = true;
                  this.Mproteina1min = false;
                } else if (item.icoproteina == 3) {
                  this.Mproteina1min = true;
                  this.Mproteinamin = false;
                } else { }
                if (item.icocarbohidrato2 == 2) {
                  this.Mcarbohidratomin = true;
                  this.Mcarbohidrato1min = false;
                } else if (item.icocarbohidrato == 3) {
                  this.Mcarbohidrato1min = true;
                  this.Mcarbohidratomin = false;
                } else { }
                if (item.icograsaTotal2 == 2) {
                  this.MgrasasTotalesmin = true;
                  this.MgrasasTotales1min = false;
                } else if (item.icograsaTotal == 3) {
                  this.MgrasasTotales1min = true;
                  this.MgrasasTotalesmin = false;
                } else { }
                if (item.icograsaSaturada2 == 2) {
                  this.MgrasasSaturadasmin = true;
                  this.MgrasasSaturadas1min = false;
                } else if (item.icograsaSaturada == 3) {
                  this.MgrasasSaturadas1max = true;
                  this.MgrasasSaturadasmax = false;
                } else { }
              })

              micro.forEach(item => {
                //max
                if (item.icocalcio == 2) {
                  this.Mcalciomax = true;
                  this.Mcalcio1max = false;
                } else if (item.icocalcio == 3) {
                  this.Mcalcio1max = true;
                  this.Mcalciomax = false;
                } else { }
                if (item.icohierro == 2) {
                  this.Mhierromax = true;
                  this.Mhierro1max = false;
                } else if (item.icohierro == 3) {
                  this.Mhierro1max = true;
                  this.Mhierromax = false;
                } else { }
                if (item.icosodio == 2) {
                  this.Msodiomax = true;
                  this.Msodio1max = false;
                } else if (item.icosodio == 3) {
                  this.Msodio1max = true;
                  this.Msodiomax = false;
                } else { }
                if (item.icovitamina == 2) {
                  this.Mvitaminamax = true;
                  this.Mvitamina1max = false;
                } else if (item.icovitamina == 3) {
                  this.Mvitamina1max = true;
                  this.Mvitaminamax = false;
                } else { }
                if (item.icozinc == 2) {
                  this.Mzincmax = true;
                  this.Mzinc1max = false;
                } else if (item.icozinc == 3) {
                  this.Mzinc1max = true;
                  this.Mzincmax = false;
                } else { }

                //min
                if (item.icocalcio2 == 2) {
                  this.Mcalciomin = true;
                  this.Mcalcio1min = false;
                } else if (item.icocalcio2 == 3) {
                  this.Mcalcio1min = true;
                  this.Mcalciomin = false;
                } else { }
                if (item.icohierro2 == 2) {
                  this.Mhierromin = true;
                  this.Mhierro1min = false;
                } else if (item.icohierro2 == 3) {
                  this.Mhierro1min = true;
                  this.Mhierromin = false;
                } else { }
                if (item.icosodio2 == 2) {
                  this.Msodiomin = true;
                  this.Msodio1min = false;
                } else if (item.icosodio2 == 3) {
                  this.Msodio1min = true;
                  this.Msodiomin = false;
                } else { }
                if (item.icovitamina2 == 2) {
                  this.Mvitaminamin = true;
                  this.Mvitamina1min = false;
                } else if (item.icovitamina2 == 3) {
                  this.Mvitamina1min = true;
                  this.Mvitaminamin = false;
                } else { }
                if (item.icozinc2 == 2) {
                  this.Mzincmin = true;
                  this.Mzinc1min = false;
                } else if (item.icozinc2 == 3) {
                  this.Mzinc1min = true;
                  this.Mzincmin = false;
                } else { }
              })

            }
          }

        }
      )
    }
  }

}
