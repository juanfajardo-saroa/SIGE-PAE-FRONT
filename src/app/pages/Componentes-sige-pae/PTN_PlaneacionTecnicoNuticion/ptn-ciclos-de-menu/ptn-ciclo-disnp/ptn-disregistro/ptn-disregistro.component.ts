
import { MessageService } from './../../../../../../services/message.service';
import { PA_CicloMenuAportesNutricionalesPivMAER } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPivMAER.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPiv } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPiv.services';
import { PA_CicloMenuAportesNutricionalesPivSem } from './../../../../../../shared/services/PA_CicloMenuAportesNutricionalesPivSem.services';
import { PA_GetProductosRequest, ProductosService } from './../../../../../../shared/services/Productos.services';
import { AprobacionesModel } from './../../../../../../shared/model/aprobaciones.model';
import { PA_CicloMenuAportesNutricionalesPiv, } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesPiv.services';
import { MenuComponentesService } from 'src/app/shared/services/MenuComponentes.services';
import { MenuPreparacionesService } from 'src/app/shared/services/MenuPreparaciones.services';
import { PA_GetPreparacionRequest } from 'src/app/shared/services/PA_GetPreparacion.services';
import { CiclosMenusNivelesEducativosService } from 'src/app/shared/services/CiclosMenusNivelesEducativos.services';
import { ComponentesPreparacionService } from './../../../../../../shared/services/ComponentesPreparacion.services';
import { PreparacionesService } from 'src/app/shared/services/Preparaciones.services';
import { TiposComponenteModel } from './../../../../../../shared/model/TiposComponente';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { CiclosMenusModel } from './../../../../../../shared/model/CiclosMenus';
import { CiclosMenusService, CicloMenuRequest } from 'src/app/shared/services/CiclosMenus.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { MenuPTNModel } from './../../../../../../shared/model/MenuPTNModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject, Input, OnInit, Output, Optional, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { MinutaPatronAlimentosService } from 'src/app/shared/services/MinutaPatronAlimentos.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { SemanasPTNModel } from 'src/app/shared/model/SemanasPTNModel';
import Swal from 'sweetalert2';
import { SemanasPTNService } from 'src/app/shared/services/SemanasPTN.services';
import { PA_MenuPTNSemanaService } from 'src/app/shared/services/PA_MenuPTNSemana.services';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MenuPreparacionesModel } from 'src/app/shared/model/MenuPreparaciones';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { SubGrupoAlimentosService } from 'src/app/shared/services/SubGrupoAlimentos.services';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { PA_BuscarPreparacionRequest } from 'src/app/shared/services/PA_BuscarPreparaciones.services';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CiclosMenusNivelesEducativosModel } from 'src/app/shared/model/CiclosMenusNivelesEducativos';
import { PA_GetPreparacionService } from 'src/app/shared/services/PA_GetPreparacion.services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuComponentesModel } from 'src/app/shared/model/MenuComponentes';
import { MenuProductosModel } from 'src/app/shared/model/MenuProductos';
import { MenuProductosService } from 'src/app/shared/services/MenuProductos.services';
import { PA_CicloMenuAportesNutricionalesIndustrialesPivSem } from 'src/app/shared/services/PA_CicloMenuAportesNutricionalesIndustrialesPivSem.services';
import { TiposModalidadComplementoService } from 'src/app/shared/services/TiposModalidadComplemento.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { PA_ValidaFrecuenciaService } from 'src/app/shared/services/PA_ValidaFrecuencia.services';
import { PA_CicloMenuListaMinutasAprobacion, PA_CicloMenuListaMinutasAprobacionService } from 'src/app/shared/services/PA_CicloMenuListaMinutasAprobacion.services';
import { PA_CicloMenuAporteNutricionalXAprobacion, PA_CicloMenuAporteNutricionalXAprobacionService } from 'src/app/shared/services/PA_CicloMenuAporteNutricionalXAprobacion.services';
import { PA_InsertarMenuPreparacionesService } from 'src/app/shared/services/PA_InsertarMenuPreparaciones.services';
import { PA_InsertarSemanaMenuService } from 'src/app/shared/services/PA_InsertarSemanaMenu.services';
import { PA_MenuPreparacionesService } from 'src/app/shared/services/PA_MenuPreparaciones.services';
import { PA_MenuComponentesService } from 'src/app/shared/services/PA_MenuComponentes.services';
import { PA_InsertarMenuProductosService } from 'src/app/shared/services/PA_InsertarMenuProductos.services';
import { PA_ValidaIntercambiosPiv, PA_ValidaIntercambiosService } from 'src/app/shared/services/PA_ValidaIntercambios.services';
import { PA_ComponentesCiclosService } from 'src/app/shared/services/PA_ComponentesCiclos.services';
import { PA_GrupobyComponenteService } from 'src/app/shared/services/PA_GrupobyComponente.services';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { TipoCompGrupoSubgrupoAliService } from 'src/app/shared/services/TipoCompGrupoSubgrupoAli.services';
import { MenuPTNService } from 'src/app/shared/services/MenuPTN.services';
import { PA_NivelesEducativosMinutaService } from 'src/app/shared/services/PA_NivelesEducativosMinuta.services';
import { PtnRegSemanaCiclComponent } from './ptn-reg-semana-cicl/ptn-reg-semana-cicl.component';
import { PA_CiclosMenusNivelesEducativosGetAllWithRelationService } from 'src/app/shared/services/PA_CiclosMenusNivelesEducativosGetAllWithRelation.services';
import { PA_InsertarMenuPreparacionesXdiaService } from 'src/app/shared/services/PA_InsertarMenuPreparacionesXdia.services';



@Component({
  selector: 'app-ptn-disregistro',
  templateUrl: './ptn-disregistro.component.html',
  styleUrls: ['./ptn-disregistro.component.scss']
})
export class PtnDisregistroComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  public tipoSeleccionado: number = 1;
  @Input() numberChapter: number = 0;

  @ViewChild(PtnRegSemanaCiclComponent, { static: false })
  private childC!: PtnRegSemanaCiclComponent;

  ngAfterViewInit(): void {
    if (this.childC) {
      this.childC.procesaPropagarMAER('Siguiente Anterior' + this.numeroSemana.toString(), this.numeroSemana);
      this.childC.numeroSemanaInferior = this.numeroSemana;
    }
  }

  @Output() propagar = new EventEmitter<string>();
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
  public dataMinutaPatron: any;
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
  dataComponentes: any;
  dataComponentes2 = [];

  //paepi
  dataSourceMacro3 = [];
  dataSourceMicro3 = [];
  dataSourceMacrosemana3 = [];
  dataSourceMicrosemana3 = [];
  numeroSemana: number = 1;
  PasaSemanaSiguiente: number = 1;
  limiteSemana: number = null
  public viewActiva: number = 0;
  private resultQuery1: boolean = false;
  public semanaid: boolean = false;
  public semanaid2: boolean = false;
  public semanamaerid: boolean = false;
  public semanamaerid2: boolean = false;
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
    iD_EstadoRegistro: 6,
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
  grado = 0;
  Preparaciones: boolean = false;
  Preparaciones2: boolean = false;
  Preparaciones3: boolean = false;
  Productos: boolean = false
  Productos2: boolean = false
  dataArrayPre: any[] = [];
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
  ListIntercambiosDiarios: any[] = [];
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

  alecomp1 = true;
  alecomp2 = true;
  alecomp3 = true;
  alecomp4 = true;
  alecomp5 = true;
  alecomp6 = true;
  alecomp7 = true;
  alecomp8 = true;
  alecomp9 = true;
  alecomp10 = true;
  alecomp11 = true;
  alecomp12 = true;
  alecomp13 = true;


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
  //minutas
  CicloMenuListaMinutasAprobacionReq: PA_CicloMenuListaMinutasAprobacion = {}

  //ciclos
  CicloMenuAporteNutricionalXAprobacionReq: PA_CicloMenuAporteNutricionalXAprobacion = {}

  PA_conteoIntercambiosPivreq: PA_ValidaIntercambiosPiv = {}


  AprobacionesList: any;
  AprobacionesList2: any;
  lista = [];
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
    fechaAprobacion: null,
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
  idCiclo = 0;
  ListIntercambiosSemana: any[];

  nivel1 = false;
  nivel2 = false;
  nivel2_1 = false;
  nivel2_2 = false;
  nivel2_3 = false;
  nivel2_4 = false;
  nivel2_5 = false;
  nivel2_6 = false;
  nivel2_7 = false;
  nivel2_8 = false;
  nivel2_9 = false;
  nivel2_10 = false;
  nivel3 = false;
  nivel3_1 = false;
  nivel3_2 = false;
  nivel3_3 = false;
  nivel3_4 = false;
  nivel3_5 = false;
  nivel3_6 = false;
  nivel3_7 = false;
  nivel3_8 = false;
  nivel3_9 = false;
  nivel4 = false;
  nivel4_1 = false;
  nivel4_2 = false;
  nivel4_3 = false;
  nivel4_4 = false;
  nivel4_5 = false;
  nivel5 = false;



  constructor(
    private router: Router,
    private _ModeloOperacionService: TiposModeloOperacionService,
    private _TipoModalidad: TiposModalidadComplementoService,
    private _TiposRacionService: TiposComplementoService,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    public VigenciasServicio: VigenciasService,
    private _NivelEducativoService: NivelEducativoService,
    private _CiclosMenusService: CiclosMenusService,
    private _ZonasService: ZonasService,
    private _SemanasPTNService: SemanasPTNService,
    private _MenuPTNSemanaService: PA_MenuPTNSemanaService,
    private _MenuPTNService: MenuPTNService,
    public dialog: MatDialog,
    private _CiclosMenusNivelesEducativosService: CiclosMenusNivelesEducativosService,
    private _MenuPreparacionesService: MenuPreparacionesService,
    private _PA_MenuPreparacionesService: PA_MenuPreparacionesService,
    private _ComponentesPreparacionService: ComponentesPreparacionService,
    private _MenuComponentesService: MenuComponentesService,
    private _PA_MenuComponentesService: PA_MenuComponentesService,
    private _MenuProductosService: MenuProductosService,
    private _productosService: ProductosService,
    private _GrupoAlimentosService: GrupoAlimentosService,
    private _SubGrupoAlimentosService: SubGrupoAlimentosService,
    private _TiposComponenteService: TiposComponenteService,
    private route: ActivatedRoute,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_ValidaIntercambiosService: PA_ValidaIntercambiosService,
    private _PA_ValidaFrecuenciaService: PA_ValidaFrecuenciaService,
    private _PA_CicloMenuListaMinutasAprobacionService: PA_CicloMenuListaMinutasAprobacionService,
    private _PA_CicloMenuAporteNutricionalXAprobacionService: PA_CicloMenuAporteNutricionalXAprobacionService,
    private _PA_InsertarSemanaMenuService: PA_InsertarSemanaMenuService,
    private _PA_InsertarMenuPreparacionesService: PA_InsertarMenuPreparacionesService,
    private _PA_InsertarMenuPreparacionesXdiaService: PA_InsertarMenuPreparacionesXdiaService,
    private _PA_InsertarMenuProductosService: PA_InsertarMenuProductosService,
    private messageService: MessageService,
    private _PA_ComponentesCiclosService: PA_ComponentesCiclosService,
    private _TipoCompGrupoSubgrupoAliService: TipoCompGrupoSubgrupoAliService,
    private _PA_NivelesEducativosMinutaService: PA_NivelesEducativosMinutaService,
    private _PA_CiclosMenusNivelesEducativosGetAllWithRelationService: PA_CiclosMenusNivelesEducativosGetAllWithRelationService,
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

    this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
    this.dataSourceProducto = new MatTableDataSource<MenuProductosModel>(this.dataArrayEmptyProduct);
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
          this.NivelEducativoList[estado].estado = 'Pendiente';
          this.NivelEducativoList[estado].complemento = null;
        }
        this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
        this.NivelEducativoList2 = response;


        for (let estado in this.NivelEducativoList2) {
          this.NivelEducativoList2[estado].estado = 'Pendiente';
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
    this.componeteList = [];
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

    if (this.idCiclo > 0) {
      this.traerdatosciclo()
    } else { }
  }
  traerdatosciclo() {
    this._ModeloOperacionService.getTiposModeloOperacionList().subscribe(
      (responsemodelooperacion: any) => {
        this.ModeloOperadorList = responsemodelooperacion;
        this._TipoModalidad.getTiposModalidadComplementoList().subscribe(
          (Responsetipomodalidad: any) => {
            this.ModeloModalidadList = Responsetipomodalidad;
            this._TiposRacionService.getTiposComplementoList().subscribe(
              (responsetiporacion: any) => {

                this.tipoRacionList = responsetiporacion
                this.tipoRacionList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                this._CiclosMenusService.getCiclosMenusListRelationFilterID(this.idCiclo).subscribe(
                  (responseciclo: any) => {

                    this.CicloMenuObject.id = responseciclo[0].id;
                    this.CicloMenuObject.iD_ETC = responseciclo[0].iD_ETC;
                    this.CicloMenuObject.iD_TipoModeloOperacion = responseciclo[0].iD_TipoModeloOperacion;
                    this.CicloMenuObject.iD_TipoComplemento = responseciclo[0].iD_TipoComplemento;
                    this.CicloMenuObject.iD_TipoModalidadComplemento = responseciclo[0].iD_TipoModalidadComplemento;
                    this.CicloMenuObject.iD_MinutaAprobacion = responseciclo[0].iD_MinutaAprobacion;
                    this.CicloMenuObject.iD_CiclosMenuReferencia = responseciclo[0].iD_CiclosMenuReferencia;
                    this.CicloMenuObject.iD_TipoNivelEducativo = responseciclo[0].iD_TipoNivelEducativo;
                    this.CicloMenuObject.iD_Zona = responseciclo[0].iD_Zona;
                    this.CicloMenuObject.nombre = responseciclo[0].nombre;
                    this.CicloMenuObject.menuReferencia = responseciclo[0].menuReferencia;


                    this.CicloMenuObject.menusParaTodosNiveles = responseciclo[0].menusParaTodosNiveles;
                    this.CicloMenuObject.menusParaTodasZonas = responseciclo[0].menusParaTodasZonas;
                    if (this.CicloMenuObject.menusParaTodosNiveles == true) {
                      this.CicloMenuObject['id_menusParaTodosNiveles'] = 1;
                    } else { this.CicloMenuObject['id_menusParaTodosNiveles'] = 2; }
                    this.CicloMenuObject.cantidadMenus = responseciclo[0].cantidadMenus;
                    this.changeItemCantidad('cantidadMenus', this.CicloMenuObject.cantidadMenus)
                    if (this.CicloMenuObject.menuReferencia == true) {

                      this.CicloMenuObject['id_menuReferencia'] = 1;
                      this.preg = true;
                      this.preg1 = false;
                      this.mesajesalert2 = false;
                      this.changeItemMenu('iD_CiclosMenuReferencia', this.CicloMenuObject.id_menuReferencia);
                    } else {

                      this.CicloMenuObject['id_menuReferencia'] = 2;
                      this.preg = false;
                      this.preg1 = true;
                      this.mesajesalert2 = false;
                      this.changeItemOpe('iD_TipoModeloOperacion', this.CicloMenuObject.iD_TipoModeloOperacion);
                      this.changeItemModalidad('iD_TipoModalidadComplemento', this.CicloMenuObject.iD_TipoModalidadComplemento);
                      this.TipoMAERMo()
                      this.changeItemComplemento('iD_TipoComplemento', this.CicloMenuObject.iD_TipoComplemento);

                    }

                    this._SemanasPTNService.getSemanasPTNListRelationfilter(this.CicloMenuObject.id).subscribe(
                      (responsesemanas: any) => {

                        responsesemanas.forEach(element => {
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
                                      estado: 'Pendiente',
                                      semana: item.numeroSemana,
                                      numeroDia: element.numeroDia,
                                    })


                                  } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

                                    this.tabs.push({
                                      nombre: element.nombre,
                                      estado: 'Pendiente',
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
                                this.maer = true;
                                this.Preparaciones2 = true;


                              },
                              (err) => {

                              }
                            )
                          })
                        } else {
                          let g = 0
                          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                            g = 1
                          } else {
                            g = this.CicloMenuObject.iD_TipoModalidadComplemento
                          }

                          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
                            (response: any) => {

                              let f = response;
                              if (f.length == 0) {
                                let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

                                this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                                  (response: any) => {
                                    let o = response;
                                    if (o.length == 0) { } else {
                                      this.semanaList.forEach(item => {
                                        this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(item.id).subscribe(
                                          (response: any) => {
                                            response.forEach(element => {
                                              if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
                                                if (o[0].iD_TipoModeloOperacionBase == 1) {
                                                  this.MenuPTNObject4.push({
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
                                                    estado: 'Pendiente',
                                                    semana: item.numeroSemana,
                                                    numeroDia: element.numeroDia,
                                                  })
                                                  this.preg5 = true;
                                                  this.preg6 = false;

                                                } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                                                  this.tabs.push({
                                                    nombre: element.nombre,
                                                    estado: 'Pendiente',
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
                                                  this.preg5 = false;
                                                  this.preg6 = true;

                                                }
                                                if (this.MinutasList.length == 0) {
                                                  this.mesajesalert8 = true;
                                                } else { }


                                              }

                                            });

                                            var arr = {};
                                            for (var i = 0, len = this.tabs.length; i < len; i++)
                                              arr[this.tabs[i]['nombre']] = this.tabs[i];
                                            this.tabs = new Array();
                                            for (var key in arr)
                                              this.tabs.push(arr[key]);
                                            this.tabs.sort((firstItem, secondItem) => firstItem.numeroDia - secondItem.numeroDia);


                                            /*  this.maer = true;
                                             this.Preparaciones2 = true;             */
                                            const grouped = this.tabs.reduce((curr, file) => {
                                              if (!curr[file.semana]) {
                                                // Si no has tenido ninguna entrada de ese año la agregas pero usando un arreglo
                                                curr[file.semana] = [file];
                                              } else {
                                                // Si ya tienes ese año lo agregas al final del arreglo
                                                curr[file.semana].push(file);
                                              }
                                              return curr;
                                            }, {});
                                            this.groupedFiles = Object.keys(grouped).map(semana => {
                                              return {
                                                semana: semana,
                                                files: grouped[semana]
                                              };

                                            });

                                            let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana)

                                            this.tabs2 = g;
                                            if (o[0].iD_TipoModeloOperacion == 1) {
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
                                                      estado: 'Pendiente',
                                                    })

                                                  })
                                                  /* response.forEach(item => {
                                                    this.NivelEducativoList2.map(function (dato) {

                                                      if (dato.id == item.iD_TipoNivelEducativo) {

                                                        dato.id = item.iD_TipoNivelEducativo;
                                                        dato.activo = true;

                                                      }

                                                      return dato;
                                                    });
                                                  }) */
                                                  //this.changeItemMinuta('iD_MinutaAprobacion', this.CicloMenuObject.iD_MinutaAprobacion)
                                                }


                                              )

                                            } else if (o[0].iD_TipoModeloOperacion == 2) {
                                              if (this.selectedTabIndex == 0) {
                                                let com = this.tabs2[0].files[0];
                                                this.diasText = com.nombre;
                                              } else {
                                                let com = this.tabs2[0].files[this.selectedTabIndex];
                                                this.diasText = com.nombre;
                                              }
                                            }

                                          },
                                          (err) => {

                                          }
                                        )
                                      })
                                    }
                                  })
                              } else {
                                this.semanaList.forEach(item => {
                                  this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(item.id).subscribe(
                                    (response: any) => {
                                      response.forEach(element => {
                                        if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
                                          if (f[0].iD_TipoModeloOperacionBase == 1) {
                                            this.maem = true;
                                            this.MenuPTNObject4.push({
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
                                              estado: 'Pendiente',
                                              semana: item.numeroSemana,
                                              numeroDia: element.numeroDia,
                                            })
                                            this.preg5 = true;
                                            this.preg6 = false;


                                          } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                                            this.maer = true;
                                            this.tabs.push({
                                              nombre: element.nombre,
                                              estado: 'Pendiente',
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
                                            this.preg5 = false;
                                            this.preg6 = true;

                                          }
                                          if (this.MinutasList.length == 0) {
                                            this.mesajesalert8 = true;
                                          } else { }


                                        }

                                      });
                                      var arr = {};
                                      for (var i = 0, len = this.tabs.length; i < len; i++)
                                        arr[this.tabs[i]['nombre']] = this.tabs[i];
                                      this.tabs = new Array();
                                      for (var key in arr)
                                        this.tabs.push(arr[key]);

                                      this.tabs.sort((firstItem, secondItem) => firstItem.numeroDia - secondItem.numeroDia);
                                      const grouped = this.tabs.reduce((curr, file) => {
                                        if (!curr[file.semana]) {
                                          // Si no has tenido ninguna entrada de ese año la agregas pero usando un arreglo
                                          curr[file.semana] = [file];
                                        } else {
                                          // Si ya tienes ese año lo agregas al final del arreglo
                                          curr[file.semana].push(file);
                                        }
                                        return curr;
                                      }, {});
                                      this.groupedFiles = Object.keys(grouped).map(semana => {
                                        return {
                                          semana: semana,
                                          files: grouped[semana]
                                        };

                                      });

                                      let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana)

                                      this.tabs2 = g;
                                      if (f[0].iD_TipoModeloOperacion == 1) {
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
                                                estado: 'Pendiente',
                                              })

                                            })
                                            /*  response.forEach(item => {
                                               this.NivelEducativoList2.map(function (dato) {
 
                                                 if (dato.id == item.iD_TipoNivelEducativo) {
 
                                                   dato.id = item.iD_TipoNivelEducativo;
                                                   dato.activo = true;
 
                                                 }
 
                                                 return dato;
                                               });
                                             }) */
                                            //this.changeItemMinuta('iD_MinutaAprobacion', this.CicloMenuObject.iD_MinutaAprobacion)
                                          }
                                        )
                                      } else if (f[0].iD_TipoModeloOperacion == 2) {
                                        if (this.selectedTabIndex == 0) {
                                          let com = this.tabs2[0].files[0];
                                          this.diasText = com.nombre;
                                        } else {
                                          let com = this.tabs2[0].files[this.selectedTabIndex];
                                          this.diasText = com.nombre;
                                        }
                                      }
                                    },
                                    (err) => {

                                    }
                                  )
                                })
                              }
                            }
                          )


                        }



                      },
                      (err) => {

                      }
                    );
                    if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
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
                              estado: 'Pendiente',
                            })

                          });
                          this.NivelEducativoList2 = [];
                          this._PA_NivelesEducativosMinutaService.getPA_NivelesEducativosMinutaList(this.CicloMenuObject.iD_MinutaAprobacion).subscribe(
                            (response: any) => {
                              this.NivelEducativoList2 = [];
                              response.forEach(element => {
                                this.NivelEducativoList2.push({
                                  id: element.iD_NivelEducativo,
                                  nombre: element.nivelEducativo,
                                  estado: 'Pendiente',
                                  complemento: null,
                                  activo: null,
                                })
                              });

                              this.NivelEducativoList2.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                              this.CiclosMenusNivelesEducativosObject.forEach(item => {
                                this.NivelEducativoList2.map(function (dato) {

                                  if (dato.id == item.iD_TipoNivelEducativo) {

                                    dato.id = item.iD_TipoNivelEducativo;
                                    dato.activo = true;

                                  }

                                  return dato;
                                });
                              })
                              if (this.NivelEducativoList2.length === 1) {
                                this.nivel1 = true;
                                this.nivel2 = false;
                                this.nivel2_1 = false;
                                this.nivel2_2 = false;
                                this.nivel2_3 = false;
                                this.nivel2_4 = false;
                                this.nivel2_5 = false;
                                this.nivel2_6 = false;
                                this.nivel2_7 = false;
                                this.nivel2_8 = false;
                                this.nivel2_9 = false;
                                this.nivel2_10 = false;
                                this.nivel3 = false;
                                this.nivel3_1 = false;
                                this.nivel3_2 = false;
                                this.nivel3_3 = false;
                                this.nivel3_4 = false;
                                this.nivel3_5 = false;
                                this.nivel3_6 = false;
                                this.nivel3_7 = false;
                                this.nivel3_8 = false;
                                this.nivel3_9 = false;
                                this.nivel4 = false;
                                this.nivel4_1 = false;
                                this.nivel4_2 = false;
                                this.nivel4_3 = false;
                                this.nivel4_4 = false;
                                this.nivel4_5 = false;
                                this.nivel5 = false;
                              } else if (this.NivelEducativoList2.length === 2) {
                                this.nivel1 = false;
                                this.nivel2 = true;
                                this.nivel3 = false;
                                this.nivel3_1 = false;
                                this.nivel3_2 = false;
                                this.nivel3_3 = false;
                                this.nivel3_4 = false;
                                this.nivel3_5 = false;
                                this.nivel3_6 = false;
                                this.nivel3_7 = false;
                                this.nivel3_8 = false;
                                this.nivel3_9 = false;
                                this.nivel4 = false;
                                this.nivel4_1 = false;
                                this.nivel4_2 = false;
                                this.nivel4_3 = false;
                                this.nivel4_4 = false;
                                this.nivel4_5 = false;
                                this.nivel5 = false;
                                let g1 = this.NivelEducativoList2[0].id
                                let g2 = this.NivelEducativoList2[1].id
                                if (g1 == 1 && g2 == 2) {
                                  this.nivel2_1 = true;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 1 && g2 == 3) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = true;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 1 && g2 == 5) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = true;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 1 && g2 == 6) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = true;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 2 && g2 == 3) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = true;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 2 && g2 == 5) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = true;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 2 && g2 == 6) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = true
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 3 && g2 == 5) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = true;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = false;
                                } else if (g1 == 3 && g2 == 6) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = true;
                                  this.nivel2_10 = false;
                                } else if (g1 == 4 && g2 == 6) {
                                  this.nivel2_1 = false;
                                  this.nivel2_2 = false;
                                  this.nivel2_3 = false;
                                  this.nivel2_4 = false;
                                  this.nivel2_5 = false;
                                  this.nivel2_6 = false;
                                  this.nivel2_7 = false;
                                  this.nivel2_8 = false;
                                  this.nivel2_9 = false;
                                  this.nivel2_10 = true;
                                }

                              } else if (this.NivelEducativoList2.length === 3) {
                                this.nivel1 = false;
                                this.nivel2 = false;
                                this.nivel2_1 = false;
                                this.nivel2_2 = false;
                                this.nivel2_3 = false;
                                this.nivel2_4 = false;
                                this.nivel2_5 = false;
                                this.nivel2_6 = false;
                                this.nivel2_7 = false;
                                this.nivel2_8 = false;
                                this.nivel2_9 = false;
                                this.nivel2_10 = false;
                                this.nivel3 = true;
                                this.nivel4 = false;
                                this.nivel4_1 = false;
                                this.nivel4_2 = false;
                                this.nivel4_3 = false;
                                this.nivel4_4 = false;
                                this.nivel4_5 = false;
                                this.nivel5 = false;
                                let g1 = this.NivelEducativoList2[0].id
                                let g2 = this.NivelEducativoList2[1].id
                                let g3 = this.NivelEducativoList2[2].id
                                if (g1 == 1 && g2 == 2 && g3 == 3) {
                                  this.nivel3_1 = true;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 1 && g2 == 2 && g3 == 5) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = true;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 1 && g2 == 2 && g3 == 6) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = true;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 1 && g2 == 3 && g3 == 5) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = true;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 1 && g2 == 3 && g3 == 6) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = true;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 2 && g2 == 3 && g3 == 5) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = true;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;

                                } else if (g1 == 2 && g2 == 5 && g3 == 6) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = true
                                  this.nivel3_8 = false;

                                } else if (g1 == 3 && g2 == 5 && g3 == 6) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = true;

                                } else if (g1 == 2 && g2 == 3 && g3 == 6) {
                                  this.nivel3_1 = false;
                                  this.nivel3_2 = false;
                                  this.nivel3_3 = false;
                                  this.nivel3_4 = false;
                                  this.nivel3_5 = false;
                                  this.nivel3_6 = false;
                                  this.nivel3_7 = false;
                                  this.nivel3_8 = false;
                                  this.nivel3_9 = true;
                                }
                              } else if (this.NivelEducativoList2.length === 4) {
                                this.nivel1 = false;
                                this.nivel2 = false;
                                this.nivel2_1 = false;
                                this.nivel2_2 = false;
                                this.nivel2_3 = false;
                                this.nivel2_4 = false;
                                this.nivel2_5 = false;
                                this.nivel2_6 = false;
                                this.nivel2_7 = false;
                                this.nivel2_8 = false;
                                this.nivel2_9 = false;
                                this.nivel2_10 = false;
                                this.nivel3 = false;
                                this.nivel3_1 = false;
                                this.nivel3_2 = false;
                                this.nivel3_3 = false;
                                this.nivel3_4 = false;
                                this.nivel3_5 = false;
                                this.nivel3_6 = false;
                                this.nivel3_7 = false;
                                this.nivel3_8 = false;
                                this.nivel3_9 = false;
                                this.nivel4 = true;
                                let g1 = this.NivelEducativoList2[0].id
                                let g2 = this.NivelEducativoList2[1].id
                                let g3 = this.NivelEducativoList2[2].id
                                let g4 = this.NivelEducativoList2[3].id
                                if (g1 == 1 && g2 == 2 && g3 == 3 && g4 == 5) {
                                  this.nivel4_1 = true;
                                  this.nivel4_2 = false;
                                  this.nivel4_3 = false;
                                  this.nivel4_4 = false;
                                  this.nivel4_5 = false;


                                } else if (g1 == 1 && g2 == 2 && g3 == 3 && g4 == 6) {
                                  this.nivel4_1 = false;
                                  this.nivel4_2 = true;
                                  this.nivel4_3 = false;
                                  this.nivel4_4 = false;
                                  this.nivel4_5 = false;


                                } else if (g1 == 1 && g2 == 2 && g3 == 5 && g4 == 6) {
                                  this.nivel4_1 = false;
                                  this.nivel4_2 = false;
                                  this.nivel4_3 = true;
                                  this.nivel4_4 = false;
                                  this.nivel4_5 = false;


                                } else if (g1 == 1 && g2 == 3 && g3 == 5 && g4 == 6) {
                                  this.nivel4_1 = false;
                                  this.nivel4_2 = false;
                                  this.nivel4_3 = false;
                                  this.nivel4_4 = true;
                                  this.nivel4_5 = false;


                                } else if (g1 == 2 && g2 == 3 && g3 == 5 && g4 == 6) {
                                  this.nivel4_1 = false;
                                  this.nivel4_2 = false;
                                  this.nivel4_3 = false;
                                  this.nivel4_4 = false;
                                  this.nivel4_5 = true;


                                }
                                this.nivel5 = false;
                              } else if (this.NivelEducativoList2.length === 5) {
                                this.nivel1 = false;
                                this.nivel2 = false;
                                this.nivel2_1 = false;
                                this.nivel2_2 = false;
                                this.nivel2_3 = false;
                                this.nivel2_4 = false;
                                this.nivel2_5 = false;
                                this.nivel2_6 = false;
                                this.nivel2_7 = false;
                                this.nivel2_8 = false;
                                this.nivel2_9 = false;
                                this.nivel2_10 = false;
                                this.nivel3 = false;
                                this.nivel3_1 = false;
                                this.nivel3_2 = false;
                                this.nivel3_3 = false;
                                this.nivel3_4 = false;
                                this.nivel3_5 = false;
                                this.nivel3_6 = false;
                                this.nivel3_7 = false;
                                this.nivel3_8 = false;
                                this.nivel3_9 = false;
                                this.nivel4 = false;
                                this.nivel5 = true;
                              }
                            }
                          )

                        },
                        (err) => {

                          this.isLoading = false;
                        }


                      )


                    } else { }
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
          claseAdd = "tab-item pestanaCC w-down-auto d-flex";
          div.className = claseAdd;
        }
      }

      claseAdd = "";
      claseAdd += "tab-item pestanaCC active w-down-auto d-flex";
    }

    target.className = claseAdd;
  }

  regresar() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigate(['/PTNCiclosDeMenu'])
  }

  onSubmit(): void {

    this.semanaid = false;
    this.semanamaerid = false;
    switch (this.viewActiva) {
      case 0:
        this.semanaid = true;
        this.semanamaerid = true;
        /* this.diasSemana()
        this.diasSemana2() */
        if (this.CicloMenuObject.id == 0) {
          this.crearMenu();

          /* this.resultQuery1 = true;
          this.avanzar(); */

        } else {
          this.actualizarMenu();
          /* this.resultQuery1 = true;
          this.avanzar(); */
        }
        /* this.resultQuery1 = true;
        this.avanzar(); */

        return;
      case 1:

        if (this.numeroSemana == this.limiteSemana) {

        } else {
          this.semanaid = true;
          this.semanamaerid = true;
        }
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
          this.maer = true
        } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.maem = true
        } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
          this.maem = true  //todo omcp visualizar papei semana
        }
        if (this.semanaList.length == 0) {

        } else {
          this.resultQuery1 = true;
          this.avanzar();
        }

        return;
    }
  }
  reg = 0;


  avanzar() {

    switch (this.viewActiva) {
      case 0:
        if (this.resultQuery1) {
          this.resultQuery1 = false;

          this.set_ViewActiva(1);

        }
        return;
      case 1:
        if (this.resultQuery1) {
          this.resultQuery1 = false;
          if (this.reg == 0) {
            this.set_ViewActiva(1);
          } else {
            this.reg == 0
          }


        }
        return;
    }
  }

  set_ViewActiva(viewActiva: number) {
    if (this.numeroSemana == 1) {
      if (this.viewActiva == 0) {
        this.viewActiva = 1;

        if (this.numeroSemana == this.limiteSemana) {
          this.semanacant = false;
          this.semanaap = true;
        } else {
          this.semanacant = true;
          this.semanaap = false;
        }
      } else {

      }

    } else {

    }




  }

  SemanaAnterior() {

    if (this.numeroSemana == 1) {
      this.viewActiva = 0;

    } else {
      this.numeroSemana = this.numeroSemana - 1

      if (this.numeroSemana == this.limiteSemana) {
        this.semanacant = false;
        this.semanaap = true;
        this.semanaid = false;
        this.semanaid2 = true;
        this.semanamaerid = false;
        this.semanamaerid2 = true;
      } else {

        if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
          this.maer = true;
        } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.maem = true;
        }

        this.semanacant = true;
        this.semanaap = false;
        this.semanaid = true;
        this.semanaid2 = false;
        this.semanamaerid = true;
        this.semanamaerid2 = false;
      }
    }
    let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana)
    this.tabs2 = g;
    //;
    if (this.numeroSemana != null || this.numeroSemana != undefined || !Number.isNaN(this.numeroSemana)) {


      if (this.childC) {
        if (this.numeroSemana != null || this.numeroSemana != undefined || !Number.isNaN(this.numeroSemana)) {
          if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

            this.childC.procesaPropagarMAER('Anterior MAER ' + this.numeroSemana.toString(), this.numeroSemana);
            this.childC.numeroSemanaInferior = this.numeroSemana;
            this.childC.numeroSemana = this.numeroSemana;

          }

          else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
            this.semanaid = true;

            this.childC.procesaPropagarMAEMAnterior('Anterior MAEM ' + this.numeroSemana.toString(), this.numeroSemana);
            this.childC.numeroSemanaInferior = this.numeroSemana;
            this.childC.numeroSemana = this.numeroSemana;
          }
        }
        this.childC.ngAfterViewInit();
      }
    }

  }


  SemanaSiguiente() {
    //;
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      var gradofrecuencia = null;
      if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
      else { gradofrecuencia = this.gradoid }
      this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
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

          let mode = 0
          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) { mode = 1 } else { mode = this.CicloMenuObject.iD_TipoModalidadComplemento }

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
                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;
                              }
                              this.PasarOtraSemana();








                            } else {

                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');



                            }
                          } else {
                            /*  this.ps_cct_almuerzo = false;
                             this.ps_cct_ampm = true;-----------
                             this.ind_ampm = false;
                             this.ps_cct_almuerzo2 = false;
                             this.ps_cct_ampm2 = true;-----------
                             this.ind_ampm2 = false; */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.PasarOtraSemana()



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          }

                        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                          /*  this.ps_cct_almuerzo = false;
                           this.ps_cct_ampm = false;
                           this.ind_ampm = true; ----------------
                           this.ps_cct_almuerzo2 = false;
                           this.ps_cct_ampm2 = false;
                           this.ind_ampm2 = true; -----------------
                           */


                          let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                          let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                          let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                          let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                          if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                            if (this.numeroSemana == this.limiteSemana) {

                              this.semanacant = false;
                              this.semanaap = true;



                            }
                            this.PasarOtraSemana()


                          } else {
                            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                          }

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
                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.PasarOtraSemana();


                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          } else {
                            /* this.ps_cct_almuerzo = false;
                            this.ps_cct_ampm = true;--------
                            this.ind_ampm = false;
                            this.ps_cct_almuerzo2 = false;
                            this.ps_cct_ampm22 = true;------------
                            this.ind_ampm2 = false; */
                            let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.PasarOtraSemana();



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          }

                        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                          /*  this.ps_cct_almuerzo = false;
                           this.ps_cct_ampm = false;
                           this.ind_ampm = true;
                           this.ps_cct_almuerzo2 = false;
                           this.ps_cct_ampm22 = false;
                           this.ind_ampm2 = true; */
                          let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                          let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                          let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                          let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                          if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                            if (this.numeroSemana == this.limiteSemana) {

                              this.semanacant = false;
                              this.semanaap = true;



                            }
                            this.PasarOtraSemana();



                          } else {
                            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                          }

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
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;


                        }
                        this.PasarOtraSemana();


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    } else {
                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = true;-----------
                       this.ind_ampm = false;
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm2 = true;-----------
                       this.ind_ampm2 = false; */

                      let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.PasarOtraSemana()



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    }

                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                    /*  this.ps_cct_almuerzo = false;
                     this.ps_cct_ampm = false;
                     this.ind_ampm = true; ----------------
                     this.ps_cct_almuerzo2 = false;
                     this.ps_cct_ampm2 = false;
                     this.ind_ampm2 = true; -----------------
                     */


                    let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                    let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                    let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                    let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                    if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                      if (this.numeroSemana == this.limiteSemana) {

                        this.semanacant = false;
                        this.semanaap = true;



                      }
                      this.PasarOtraSemana()


                    } else {
                      this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                    }

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
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.PasarOtraSemana();


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    } else {
                      /* this.ps_cct_almuerzo = false;
                      this.ps_cct_ampm = true;--------
                      this.ind_ampm = false;
                      this.ps_cct_almuerzo2 = false;
                      this.ps_cct_ampm22 = true;------------
                      this.ind_ampm2 = false; */
                      let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.PasarOtraSemana();



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    }

                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                    /*  this.ps_cct_almuerzo = false;
                     this.ps_cct_ampm = false;
                     this.ind_ampm = true;
                     this.ps_cct_almuerzo2 = false;
                     this.ps_cct_ampm22 = false;
                     this.ind_ampm2 = true; */
                    let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                    let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                    let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                    let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                    if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                      if (this.numeroSemana == this.limiteSemana) {

                        this.semanacant = false;
                        this.semanaap = true;



                      }
                      this.PasarOtraSemana();



                    } else {
                      this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                    }

                  }
                }
              }

            }
          )
        }, (err) => {
        }
      )

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {


      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
      this.PA_conteoIntercambiosPivreq.NumeroDia = null;
      this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(this.PA_conteoIntercambiosPivreq).subscribe(
        (response) => {
          this.dataComponentes = response;
          let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
          if (g.length > 0) {
            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
          } else {
            this.PasarOtraSemana();
            //evento al padre de cambio de semana para actualizar
            if (this.childC) {
              if (this.numeroSemana != null || this.numeroSemana != undefined || !Number.isNaN(this.numeroSemana)) {
                if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {


                  this.childC.procesaPropagarMAER('Siguiente MAER' + this.numeroSemana.toString(), this.numeroSemana);
                  this.childC.numeroSemanaInferior = this.numeroSemana;
                }
              }
              this.childC.ngAfterViewInit();
            }
          }
        },
        (err) => {
        }
      )

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      var gradofrecuencia = null;
      if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
      else { gradofrecuencia = this.gradoid }
      this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
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



          // const miFrecuenciaSinDuplicados = this.frecuencia.reduce((acumulador, valorActual) => {
          //   const elementoYaExiste = acumulador.find(elemento => elemento.idComponente === valorActual.idComponente);
          //   if (elementoYaExiste) {
          //     return acumulador.map((elemento) => {
          //       if (elemento.idComponente === valorActual.idComponente) {
          //         return {
          //           ...elemento,
          //           prestados: elemento.prestados + valorActual.prestados
          //         }
          //       }

          //       return elemento;
          //     });
          //   }

          //   return [...acumulador, valorActual];
          // }, []);

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
                      if (e[0].iD_TipoModeloOperacionBase == 1) {
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
                              let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.PasarOtraSemana()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');

                              }
                            } else {
                              /*  this.ps_cct_almuerzo = false;
                               this.ps_cct_ampm = true;-----------
                               this.ind_ampm = false;
                               this.ps_cct_almuerzo2 = false;
                               this.ps_cct_ampm2 = true;-----------
                               this.ind_ampm2 = false; */
                              let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.PasarOtraSemana()


                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }

                            }

                          } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                            /*  this.ps_cct_almuerzo = false;
                             this.ps_cct_ampm = false;
                             this.ind_ampm = true; ----------------
                             this.ps_cct_almuerzo2 = false;
                             this.ps_cct_ampm2 = false;
                             this.ind_ampm2 = true; -----------------
                             */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.PasarOtraSemana()


                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
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
                              let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.PasarOtraSemana()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }
                            } else {
                              /* this.ps_cct_almuerzo = false;
                              this.ps_cct_ampm = true;--------
                              this.ind_ampm = false;
                              this.ps_cct_almuerzo2 = false;
                              this.ps_cct_ampm22 = true;------------
                              this.ind_ampm2 = false; */
                              let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.PasarOtraSemana()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }

                            }

                          } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                            /* this.ps_cct_almuerzo = false;
                            this.ps_cct_ampm = false;
                            this.ind_ampm = true;
                            this.ps_cct_almuerzo2 = false;
                            this.ps_cct_ampm22 = false;
                            this.ind_ampm2 = true; */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.PasarOtraSemana()



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }

                          }
                        }
                      } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                        let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
                        if (g.length > 0) {

                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        } else {
                          this.PasarOtraSemana();
                        }
                      }
                    }

                  }
                )

              } else {
                if (f[0].iD_TipoModeloOperacionBase == 1) {
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
                        let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;


                          }
                          this.PasarOtraSemana();


                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      } else {
                        /*  this.ps_cct_almuerzo = false;
                         this.ps_cct_ampm = true;-----------
                         this.ind_ampm = false;
                         this.ps_cct_almuerzo2 = false;
                         this.ps_cct_ampm2 = true;-----------
                         this.ind_ampm2 = false; */

                        let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.PasarOtraSemana()



                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      }

                    } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = false;
                       this.ind_ampm = true; ----------------
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm2 = false;
                       this.ind_ampm2 = true; -----------------
                       */


                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.PasarOtraSemana()


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }

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
                        let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.PasarOtraSemana();


                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      } else {
                        /* this.ps_cct_almuerzo = false;
                        this.ps_cct_ampm = true;--------
                        this.ind_ampm = false;
                        this.ps_cct_almuerzo2 = false;
                        this.ps_cct_ampm22 = true;------------
                        this.ind_ampm2 = false; */
                        let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.PasarOtraSemana();



                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      }

                    } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = false;
                       this.ind_ampm = true;
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm22 = false;
                       this.ind_ampm2 = true; */
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.PasarOtraSemana();



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }

                    }
                  }
                } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                  let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
                  if (g.length > 0) {

                    this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                  } else {
                    this.PasarOtraSemana();
                  }
                }
              }

            }
          )
        }, (err) => {
        }
      )

    }
  }




  PasarOtraSemana() {

    this.semanaid = false;


    if (this.numeroSemana == this.limiteSemana) {
      this.semanacant = false;
      this.semanaap = true;
    } else {
      this.numeroSemana = this.numeroSemana + 1
      this.maer = false;
      this.maem = false;
      if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
        this.maer = true;
        this.semanaid = false;
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
        this.maem = true;
        this.semanaid = false;
      }
      if (this.numeroSemana == this.limiteSemana) {
        this.semanacant = false;
        this.semanaap = true;
        this.semanaid = false;
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
          this.maer = true;
        } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) { this.maem = true, this.Preparaciones = false; this.Productos = false; this.semanaid = false; }
        let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana)
        this.tabs2 = g;
        let com = this.tabs2[0].files[this.selectedTabIndex];
        this.diasText = com.nombre;

        this.validacionesEstado();
      } else {
        let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana);
        this.tabs2 = g;
        let com = this.tabs2[0].files[this.selectedTabIndex];
        this.diasText = com.nombre;

        if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
          this.maer = true;
        } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) { this.maem = true, this.Preparaciones = false; this.Productos = false; this.semanaid = false; }
        this.validacionesEstado();
      }
    }
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      //evento al padre de cambio de semana para actualizar
      if (this.childC) {
        if (this.numeroSemana != null || this.numeroSemana != undefined || !Number.isNaN(this.numeroSemana)) {


          this.semanaid = true;
          this.childC.procesaPropagarMAEMSiguiente('Siguiente MAEM ' + this.numeroSemana.toString(), this.numeroSemana);
          this.childC.numeroSemanaInferior = this.numeroSemana;
          this.childC.numeroSemana = this.numeroSemana;

        }
        this.childC.ngAfterViewInit();
      }
    }
  }


  EnviarCicloParaAprobacion() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      var gradofrecuencia = null;
      if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
      else { gradofrecuencia = this.gradoid }
      this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
        (response) => {
          this.frecuencia = response;

          let mode = 0
          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) { mode = 1 } else { mode = this.CicloMenuObject.iD_TipoModalidadComplemento }

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
                      if (f[0].tipoActividadFisicaId == 2) {

                        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {

                          if (this.CicloMenuObject.iD_TipoComplemento == 1) {

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;
                              }
                              this.EnviarCicloParaAprobacion1();








                            } else {

                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');



                            }
                          } else {
                            /*  this.ps_cct_almuerzo = false;
                             this.ps_cct_ampm = true;-----------
                             this.ind_ampm = false;
                             this.ps_cct_almuerzo2 = false;
                             this.ps_cct_ampm2 = true;-----------
                             this.ind_ampm2 = false; */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.EnviarCicloParaAprobacion1()



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          }

                        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {

                          let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                          let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                          let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                          let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                          if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                            if (this.numeroSemana == this.limiteSemana) {

                              this.semanacant = false;
                              this.semanaap = true;



                            }
                            this.EnviarCicloParaAprobacion1()


                          } else {
                            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                          }

                        }
                      } else {
                        //modalidad ps 1 ind 2 cct3
                        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
                          //tipo racion 1 almuerzo 2 ampm 4 cualificado
                          if (this.CicloMenuObject.iD_TipoComplemento == 1) {

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.EnviarCicloParaAprobacion1();


                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          } else {
                            /* this.ps_cct_almuerzo = false;
                            this.ps_cct_ampm = true;--------
                            this.ind_ampm = false;
                            this.ps_cct_almuerzo2 = false;
                            this.ps_cct_ampm22 = true;------------
                            this.ind_ampm2 = false; */
                            let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                            let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                            let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.EnviarCicloParaAprobacion1();



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
                          }

                        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {

                          let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                          let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                          let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                          let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                          if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                            if (this.numeroSemana == this.limiteSemana) {

                              this.semanacant = false;
                              this.semanaap = true;



                            }
                            this.EnviarCicloParaAprobacion1();



                          } else {
                            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                          }

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
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;


                        }
                        this.EnviarCicloParaAprobacion1();


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    } else {
                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = true;-----------
                       this.ind_ampm = false;
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm2 = true;-----------
                       this.ind_ampm2 = false; */

                      let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.EnviarCicloParaAprobacion1()



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    }

                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                    /*  this.ps_cct_almuerzo = false;
                     this.ps_cct_ampm = false;
                     this.ind_ampm = true; ----------------
                     this.ps_cct_almuerzo2 = false;
                     this.ps_cct_ampm2 = false;
                     this.ind_ampm2 = true; -----------------
                     */


                    let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                    let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                    let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                    let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                    if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                      if (this.numeroSemana == this.limiteSemana) {

                        this.semanacant = false;
                        this.semanaap = true;



                      }
                      this.EnviarCicloParaAprobacion1()


                    } else {
                      this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                    }

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
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.EnviarCicloParaAprobacion1();


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    } else {
                      /* this.ps_cct_almuerzo = false;
                      this.ps_cct_ampm = true;--------
                      this.ind_ampm = false;
                      this.ps_cct_almuerzo2 = false;
                      this.ps_cct_ampm22 = true;------------
                      this.ind_ampm2 = false; */
                      let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                      let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                      let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.EnviarCicloParaAprobacion1();



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }
                    }

                  } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                    /*  this.ps_cct_almuerzo = false;
                     this.ps_cct_ampm = false;
                     this.ind_ampm = true;
                     this.ps_cct_almuerzo2 = false;
                     this.ps_cct_ampm22 = false;
                     this.ind_ampm2 = true; */
                    let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                    let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                    let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                    let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                    if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                      if (this.numeroSemana == this.limiteSemana) {

                        this.semanacant = false;
                        this.semanaap = true;



                      }
                      this.EnviarCicloParaAprobacion1();



                    } else {
                      this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                    }

                  }
                }
              }

            }
          )
        }, (err) => {
        }
      )

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {


      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
      this.PA_conteoIntercambiosPivreq.NumeroDia = null;
      this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(this.PA_conteoIntercambiosPivreq).subscribe(
        (response) => {
          this.dataComponentes = response;
          let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
          if (g.length > 0) {
            this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
          } else {
            this.EnviarCicloParaAprobacion1();
            //evento al padre de cambio de semana para actualizar
            if (this.childC) {
              if (this.numeroSemana != null || this.numeroSemana != undefined || !Number.isNaN(this.numeroSemana)) {
                if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {


                  this.childC.procesaPropagarMAER('Siguiente MAER' + this.numeroSemana.toString(), this.numeroSemana);
                  this.childC.numeroSemanaInferior = this.numeroSemana;
                }
              }
              this.childC.ngAfterViewInit();
            }
          }
        },
        (err) => {
        }
      )

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      var gradofrecuencia = null;
      if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
      else { gradofrecuencia = this.gradoid }
      this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
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



          // const miFrecuenciaSinDuplicados = this.frecuencia.reduce((acumulador, valorActual) => {
          //   const elementoYaExiste = acumulador.find(elemento => elemento.idComponente === valorActual.idComponente);
          //   if (elementoYaExiste) {
          //     return acumulador.map((elemento) => {
          //       if (elemento.idComponente === valorActual.idComponente) {
          //         return {
          //           ...elemento,
          //           prestados: elemento.prestados + valorActual.prestados
          //         }
          //       }

          //       return elemento;
          //     });
          //   }

          //   return [...acumulador, valorActual];
          // }, []);

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
                      if (e[0].iD_TipoModeloOperacionBase == 1) {
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
                              let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.EnviarCicloParaAprobacion1()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');

                              }
                            } else {
                              /*  this.ps_cct_almuerzo = false;
                               this.ps_cct_ampm = true;-----------
                               this.ind_ampm = false;
                               this.ps_cct_almuerzo2 = false;
                               this.ps_cct_ampm2 = true;-----------
                               this.ind_ampm2 = false; */
                              let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.EnviarCicloParaAprobacion1()


                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }

                            }

                          } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                            /*  this.ps_cct_almuerzo = false;
                             this.ps_cct_ampm = false;
                             this.ind_ampm = true; ----------------
                             this.ps_cct_almuerzo2 = false;
                             this.ps_cct_ampm2 = false;
                             this.ind_ampm2 = true; -----------------
                             */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.EnviarCicloParaAprobacion1()


                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }
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
                              let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.EnviarCicloParaAprobacion1()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }
                            } else {
                              /* this.ps_cct_almuerzo = false;
                              this.ps_cct_ampm = true;--------
                              this.ind_ampm = false;
                              this.ps_cct_almuerzo2 = false;
                              this.ps_cct_ampm22 = true;------------
                              this.ind_ampm2 = false; */
                              let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                              let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                              let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                              let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                              let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                              let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                              let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                              if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                                if (this.numeroSemana == this.limiteSemana) {

                                  this.semanacant = false;
                                  this.semanaap = true;



                                }
                                this.EnviarCicloParaAprobacion1()



                              } else {
                                this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                              }

                            }

                          } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                            /* this.ps_cct_almuerzo = false;
                            this.ps_cct_ampm = false;
                            this.ind_ampm = true;
                            this.ps_cct_almuerzo2 = false;
                            this.ps_cct_ampm22 = false;
                            this.ind_ampm2 = true; */

                            let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                            let f2 = this.frecuencia.filter(item => item.idComponente == 3 && item.pasaTodo == 'Si')
                            let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                            let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                            if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;



                              }
                              this.EnviarCicloParaAprobacion1()



                            } else {
                              this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                            }

                          }
                        }
                      } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                        let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
                        if (g.length > 0) {

                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        } else {
                          this.EnviarCicloParaAprobacion1();
                        }
                      }
                    }

                  }
                )

              } else {
                if (f[0].iD_TipoModeloOperacionBase == 1) {
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
                        let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;


                          }
                          this.EnviarCicloParaAprobacion1();


                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      } else {
                        /*  this.ps_cct_almuerzo = false;
                         this.ps_cct_ampm = true;-----------
                         this.ind_ampm = false;
                         this.ps_cct_almuerzo2 = false;
                         this.ps_cct_ampm2 = true;-----------
                         this.ind_ampm2 = false; */

                        let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')



                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.EnviarCicloParaAprobacion1()



                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      }

                    } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = false;
                       this.ind_ampm = true; ----------------
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm2 = false;
                       this.ind_ampm2 = true; -----------------
                       */


                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')


                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.EnviarCicloParaAprobacion1()


                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }

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
                        let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 9 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 10 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 11 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 8 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f8 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f9 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')

                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0 && f8.length > 0 && f9.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.EnviarCicloParaAprobacion1();


                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      } else {
                        /* this.ps_cct_almuerzo = false;
                        this.ps_cct_ampm = true;--------
                        this.ind_ampm = false;
                        this.ps_cct_almuerzo2 = false;
                        this.ps_cct_ampm22 = true;------------
                        this.ind_ampm2 = false; */
                        let f1 = this.frecuencia.filter(item => item.idComponente == 1 && item.pasaTodo == 'Si')
                        let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                        let f3 = this.frecuencia.filter(item => item.idComponente == 2 && item.pasaTodo == 'Si')
                        let f4 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                        let f5 = this.frecuencia.filter(item => item.idComponente == 6 && item.pasaTodo == 'Si')
                        let f6 = this.frecuencia.filter(item => item.idComponente == 5 && item.pasaTodo == 'Si')
                        let f7 = this.frecuencia.filter(item => item.idComponente == 7 && item.pasaTodo == 'Si')


                        if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0 && f5.length > 0 && f6.length > 0 && f7.length > 0) {
                          if (this.numeroSemana == this.limiteSemana) {

                            this.semanacant = false;
                            this.semanaap = true;



                          }
                          this.EnviarCicloParaAprobacion1();



                        } else {
                          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                        }
                      }

                    } else if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {


                      /*  this.ps_cct_almuerzo = false;
                       this.ps_cct_ampm = false;
                       this.ind_ampm = true;
                       this.ps_cct_almuerzo2 = false;
                       this.ps_cct_ampm22 = false;
                       this.ind_ampm2 = true; */
                      let f1 = this.frecuencia.filter(item => item.idComponente == 13 && item.pasaTodo == 'Si')
                      let f2 = this.frecuencia.filter(item => (item.idComponente == 3 || item.idComponente == 9) && item.pasaTodo == 'Si')
                      let f3 = this.frecuencia.filter(item => item.idComponente == 4 && item.pasaTodo == 'Si')
                      let f4 = this.frecuencia.filter(item => item.idComponente == 12 && item.pasaTodo == 'Si')



                      if (f1.length > 0 && f2.length > 0 && f3.length > 0 && f4.length > 0) {
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;



                        }
                        this.EnviarCicloParaAprobacion1();



                      } else {
                        this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                      }

                    }
                  }
                } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                  let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
                  if (g.length > 0) {

                    this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con la siguiente semana', 'top center');
                  } else {
                    this.EnviarCicloParaAprobacion1();
                  }
                }
              }

            }
          )
        }, (err) => {
        }
      )

    }

  }

  EnviarCicloParaAprobacion1() {

    var pasaultimasemana = false;
    this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
    this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
    this.PA_conteoIntercambiosPivreq.NumeroDia = null;
    this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(this.PA_conteoIntercambiosPivreq).subscribe(
      (response) => {
        this.dataComponentes = response;
        let g = this.dataComponentes.filter(item => item.pasaTodo === 'No')
        if (g.length > 0) {
          pasaultimasemana = false;
          this.messageService.showWarning('Debe cumplir las validaciones diarias y semanales para continuar con el envio para aprobación', 'top center');
        } else {
          pasaultimasemana = true;
        }

        if (pasaultimasemana) {
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú está lista para aprobar", "Coordinador PAE");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú está lista para aprobar", "Rol SiPAE-Administrador");
          this._PA_RegistrarNotificacionService.registerNotification("El ciclo de menú está lista para aprobar", "Líder Técnico - ET");

          this.CicloMenuObject.iD_EstadoRegistro = 1;
          this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
            (response: any) => {

              localStorage.removeItem('nombredeUbicacionActualizado');
              this.router.navigate(['/PTNCiclosDeMenu'], { queryParams: { tab: 1 } })
            },
            (err) => {

            }
          );
          
         
        }

      },
      (err) => {
      }
    )

  }




  groupedFiles = []

  changeItemNombre(name: string, value: any) {
    this.CicloMenuObject[name] = value;
    this.mesajesalert = false;


  }
  changeItemMenuReferencia(name: string, value: any) {

    if (value == 1) {
      this.CicloMenuObject[name] = true;
      this.CicloMenuObject['id_menuReferencia'] = value;
      this.preg = true;
      this.preg1 = false;
      this.mesajesalert2 = false;
    } else {
      this.CicloMenuObject[name] = false;
      this.CicloMenuObject['id_menuReferencia'] = value;
      this.preg = false;
      this.preg1 = true;
      this.mesajesalert2 = false;
    }
    this.preg2 = false;
    this.preg3 = false;
    this.preg4 = false;
    this.preg5=false;
    this.preg6=false;
  }

  changeItemOpe(name: string, value: any) {
    this.CicloMenuObject[name] = value;
    if (this.idCiclo > 0) {

    } else {
      this.CicloMenuObject.iD_TipoModalidadComplemento = 0;
      this.CicloMenuObject.iD_TipoComplemento = 0;
    }

    this.mesajesalert5 = false;
    //ps 1,ind,2,cct3
    if (value === 1) {
      this.ModeloModalidadfilter = this.ModeloModalidadList
      this.textModelo = 'MAEM'
      this.preg2 = true;
      this.preg3 = false;
      this.preg4 = false;
      this.preg5 = false;
      this.preg6 = false;

    } else if (value === 2) {
      this.textModelo = 'MAER'
      this.ModeloModalidadfilter = this.ModeloModalidadList.filter(item => item.id != 2);
      this.preg2 = false;
      this.preg3 = true;
      this.preg4 = false;
      this.preg5 = false;
      this.preg6 = false;
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
      this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
        (response: any) => {

          this.MinutasList = response.filter(item => item.iD_TipoMinutaPatron == 1);
          this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
          if (this.MinutasList.length == 0) {
            this.mesajesalert8 = true;
          } else { }


        }, (err) => { });

    } else {
      this.textModelo = 'PAEPI'
      this.ModeloModalidadfilter = this.ModeloModalidadList.filter(item => item.id != 2);
      this.preg2 = false;
      this.preg3 = false;
      this.preg4 = true;

    }
    this.TipoMAERMo();

  }
  changeItemMenu(name: string, value: any) {
    this.CicloMenuObject[name] = value;
    this.mesajesalert3 = false;
    let f = this.menuReferencia.filter(item => item.id == value);

    this.CicloMenuObject.iD_TipoModeloOperacion = f[0].iD_TipoModeloOperacion;
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      this.textModelo = 'MAEM'
      this.CicloMenuObject.iD_TipoModalidadComplemento = f[0].iD_TipoModalidadComplemento;
      this.CicloMenuObject.iD_TipoComplemento = f[0].iD_TipoComplemento;
      this.CicloMenuObject.iD_MinutaAprobacion = f[0].iD_MinutaAprobacion;
      this.CicloMenuObject.iD_Zona = f[0].iD_Zona;
      this.CicloMenuObject.menusParaTodosNiveles = f[0].menusParaTodosNiveles;
      this.CicloMenuObject.menusParaTodasZonas = f[0].menusParaTodasZonas;
      this.CicloMenuObject.cantidadMenus = f[0].cantidadMenus;
      this.CicloMenuObject.iD_ETC = f[0].iD_ETC;
      this.limiteSemana = this.CicloMenuObject.cantidadMenus / 5
      let d = this.tipoRacionList.filter(item => item.id == f[0].iD_TipoComplemento);
      this.textCompleto = d[0].nombre;
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter(this.idETC, 1, 6).subscribe(
        (response: any) => {
          this.MinutasList = response;
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter6(0, 1).subscribe(
            (response: any) => {
              this.MinutasList = this.MinutasList.concat(response);

              this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

              if (this.MinutasList.length == 0) {
                this.mesajesalert8 = true;
              } else { }

            }, (err) => { });

        }, (err) => { });
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

      this.textModelo = 'MAER'
      this.CicloMenuObject.iD_TipoModalidadComplemento = f[0].iD_TipoModalidadComplemento;
      this.CicloMenuObject.iD_TipoComplemento = f[0].iD_TipoComplemento;
      this.CicloMenuObject.iD_MinutaAprobacion = f[0].iD_MinutaAprobacion;
      this.CicloMenuObject.iD_Zona = f[0].iD_Zona;
      this.CicloMenuObject.menusParaTodosNiveles = f[0].menusParaTodosNiveles;
      this.CicloMenuObject.menusParaTodasZonas = f[0].menusParaTodasZonas;
      this.CicloMenuObject.cantidadMenus = f[0].cantidadMenus;
      this.CicloMenuObject.iD_ETC = f[0].iD_ETC;
      this.limiteSemana = this.CicloMenuObject.cantidadMenus / 5
      let d = this.tipoRacionList.filter(item => item.id == f[0].iD_TipoComplemento);
      this.textCompleto = d[0].nombre;
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter(this.idETC, 2, 6).subscribe(
        (response: any) => {
          this.MinutasList = response;
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter6(0, 1).subscribe(
            (response: any) => {
              this.MinutasList = this.MinutasList.concat(response);
              this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);


              if (this.MinutasList.length == 0) {
                this.mesajesalert8 = true;
              } else { }

            }, (err) => { });

        }, (err) => { });
      this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

      this.textModelo = 'PAEPI'
      this.CicloMenuObject.iD_TipoModalidadComplemento = f[0].iD_TipoModalidadComplemento;
      this.CicloMenuObject.iD_TipoComplemento = f[0].iD_TipoComplemento;
      this.CicloMenuObject.iD_MinutaAprobacion = f[0].iD_MinutaAprobacion;
      this.CicloMenuObject.iD_Zona = f[0].iD_Zona;
      this.CicloMenuObject.menusParaTodosNiveles = f[0].menusParaTodosNiveles;
      this.CicloMenuObject.menusParaTodasZonas = f[0].menusParaTodasZonas;
      this.CicloMenuObject.cantidadMenus = f[0].cantidadMenus;
      this.CicloMenuObject.iD_ETC = f[0].iD_ETC;
      this.limiteSemana = this.CicloMenuObject.cantidadMenus / 5
      let d = this.tipoRacionList.filter(item => item.id == f[0].iD_TipoComplemento);
      this.textCompleto = d[0].nombre;

      let g = 0
      if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
        g = 1
      } else { g = this.CicloMenuObject.iD_TipoModalidadComplemento }
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          this.dataMinutaPatron = response;
          this.changeItemMinuta('iD_MinutaAprobacion', this.CicloMenuObject.iD_MinutaAprobacion)
        }
      )
      this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(value).subscribe(
        (response: any) => {
          let g = response
          g.forEach(element => {
            this.CiclosMenusNivelesEducativosObject.push({
              id: 0,
              iD_CiclosMenu: this.CicloMenuObject.id,
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
              estado: 'Pendiente',
            })
          });
          this.CiclosMenusNivelesEducativosObject.sort((firstItem, secondItem) => firstItem.iD_TipoNivelEducativo - secondItem.iD_TipoNivelEducativo);
        },
        (err) => {

        }
      )
    } else { }



  }
  TipoMAERMo() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 2);
    }//paepi
    else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

    } else { }
  }
  changeItemModalidad(name: string, value: any) {

    this.CicloMenuObject[name] = value;
    if (this.idCiclo > 0) {

    } else {
      if (this.CicloMenuObject.iD_TipoComplemento == null) {
        this.CicloMenuObject.iD_TipoComplemento = 0;
      } else {
        this.CicloMenuObject.iD_TipoComplemento = 0;
      }
    }



    this.MinutasList = [];
    this.mesajesalert6 = false;
    this.mesajesalert8 = false;


    //maem
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      //ps 1//CCTT3
      if (value == 3 || value == 1) {
        this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
      }//IND 2
      else if (value == 2) {
        this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id == 2);
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
      this.preg5 = false;
      this.preg6 = false;

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      if (value == 3 || value == 1) {
        this.tipoRacionListfilter = this.tipoRacionList.filter(item => item.id != 4);
      }
    }
    if (value == 1) { this.textComplemento = " - Preparado en Sitio (PS)"; }
    if (value == 2) { this.textComplemento = " - Industrializado (IND)"; }
    if (value == 3) { this.textComplemento = " - Comida caliente transportada (CCT)"; }




  }
  changeItemComplemento(name: string, value: any) {

    this.CicloMenuObject[name] = value;
    this.mesajesalert7 = false;
    this.mesajesalert8 = false;


    let d = this.tipoRacionListfilter.filter(item => item.id == value);
    if (d.length == 0) { } else { this.textCompleto = d[0].nombre; }

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      if (this.idCiclo > 0) { } else {
        this.CicloMenuObject.iD_MinutaAprobacion = 0;
      }
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento;
      if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
        this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento = 1;
      } else {
        this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento;
      }
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento;
      this.CicloMenuListaMinutasAprobacionReq.ID_ETC = this.idETC;

      this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
        (response: any) => {

          this.MinutasList = response.filter(item => item.iD_TipoMinutaPatron == 1);
          this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
          if (this.MinutasList.length == 0) {
            this.mesajesalert8 = true;
          } else { }


        }, (err) => { });


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      if (this.idCiclo > 0) { } else {
        this.CicloMenuObject.iD_MinutaAprobacion = 0;
      }
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento;
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento;
      this.CicloMenuListaMinutasAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento;
      this.CicloMenuListaMinutasAprobacionReq.ID_ETC = this.idETC;

      this._PA_CicloMenuListaMinutasAprobacionService.getPA_CicloMenuListaMinutasAprobacionList(this.CicloMenuListaMinutasAprobacionReq).subscribe(
        (response: any) => {

          this.MinutasList = response.filter(item => item.iD_TipoMinutaPatron == 2);
          this.MinutasList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
          if (this.MinutasList.length == 0) {
            this.mesajesalert8 = true;
          } else { }


        }, (err) => { });

    } else { }



  }
  changeItemNivel(name: string, value: any) {
    this.mesajesalert11 = false;
    if (value == 1) {
      this.CicloMenuObject[name] = true;
      this.CicloMenuObject['id_menusParaTodosNiveles'] = value;
      this.CicloMenuObject.cantidadMenus = null
      this.mensajeDatosNoPermitido = false;
      this.mensajefuerarango = false;
      this.mensajefuerarango1 = false;
    } else {
      this.CicloMenuObject[name] = false;
      this.CicloMenuObject['id_menusParaTodosNiveles'] = value;
      this.CicloMenuObject.cantidadMenus = null
      this.mensajeDatosNoPermitido = false;
      this.mensajefuerarango = false;
      this.mensajefuerarango1 = false;
    }


  }
  changeItemCantidad(name: string, value: any) {
    this.mesajesalert13 = false;

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      this.mensajeDatosNoPermitido = false;
      this.mensajefuerarango = false;
      this.mensajefuerarango1 = false;
      if (this.CicloMenuObject.menusParaTodosNiveles == true) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          if (value >= 20 && value <= 265) {
            if (value > 0 && value % 5 == 0) { //hacemos la comparación
              this.CicloMenuObject[name] = value;
              this.mensajeDatosNoPermitido = false;
              this.mensajefuerarango = false;
              this.limiteSemana = value / 5
            } else {

              this.mensajeDatosNoPermitido = true;
              this.mensajefuerarango = false;
            }
          } else {
            this.mensajefuerarango = true;
            this.mensajeDatosNoPermitido = false;
          }
        } else {
          if (value >= 10 && value <= 265) {
            if (value > 0 && value % 5 == 0) { //hacemos la comparación
              this.CicloMenuObject[name] = value;
              this.mensajeDatosNoPermitido = false;
              this.mensajefuerarango2 = false;
              this.limiteSemana = value / 5
            } else {

              this.mensajeDatosNoPermitido = true;
              this.mensajefuerarango2 = false;
            }
          } else {
            this.mensajefuerarango2 = true;

            this.mensajeDatosNoPermitido = false;
          }
        }

      } else {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          if (value >= 100 && value <= 265) {
            if (value > 0 && value % 5 == 0) { //hacemos la comparación
              this.CicloMenuObject[name] = value;
              this.mensajeDatosNoPermitido = false;
              this.mensajefuerarango = false;
              this.limiteSemana = value / 5
            } else {
              this.mensajeDatosNoPermitido = true;
            }

          } else {
            this.mensajefuerarango1 = true;
          }
        } else {
          if (value >= 10 && value <= 265) {
            if (value > 0 && value % 5 == 0) { //hacemos la comparación
              this.CicloMenuObject[name] = value;
              this.mensajeDatosNoPermitido = false;
              this.mensajefuerarango2 = false;
              this.limiteSemana = value / 5
            } else {
              this.mensajeDatosNoPermitido = true;
            }

          } else {
            this.mensajefuerarango2 = true;
          }
        }

      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      this.mensajeDatosNoPermitido = false;
      this.mensajefuerarango = false;
      if (value >= 5 && value <= 265) {
        if (value > 0 && value % 5 == 0) { //hacemos la comparación
          this.CicloMenuObject[name] = value;
          this.mensajeDatosNoPermitido = false;
          this.mensajefuerarango = false;
          this.limiteSemana = value / 5


        } else {

          this.mensajeDatosNoPermitido = true;
          this.mensajefuerarango = false;
        }
      } else {
        this.mensajefuerarango = true;
        this.mensajeDatosNoPermitido = false;
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      this.mensajeDatosNoPermitido = false;
      this.mensajefuerarango = false;
      if (value >= 5 && value <= 265) {
        if (value > 0 && value % 5 == 0) { //hacemos la comparación
          this.CicloMenuObject[name] = value;
          this.mensajeDatosNoPermitido = false;
          this.mensajefuerarango = false;
          this.limiteSemana = value / 5


        } else {

          this.mensajeDatosNoPermitido = true;
          this.mensajefuerarango = false;
        }
      } else {
        this.mensajefuerarango = true;
        this.mensajeDatosNoPermitido = false;
      }
    }
  }
  changeItemMinuta(name: string, value: any) {

    this.CicloMenuObject[name] = value;
    this.mesajesalert8 = false;
    this.mesajesalert9 = false;

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

      if (this.MinutasList.length == 0) {

      } else {
        let mode = 0
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) { mode = 1 } else { mode = this.CicloMenuObject.iD_TipoModalidadComplemento }
        this.NivelEducativoList2 = [];
        this._PA_NivelesEducativosMinutaService.getPA_NivelesEducativosMinutaList(this.CicloMenuObject.iD_MinutaAprobacion).subscribe(
          (response: any) => {
            response.forEach(element => {
              this.NivelEducativoList2.push({
                id: element.iD_NivelEducativo,
                nombre: element.nivelEducativo,
                estado: 'Pendiente',
                complemento: null,
                activo: null,
              })
            });

            this.NivelEducativoList2.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

            if (this.NivelEducativoList2.length === 1) {
              this.nivel1 = true;
              this.nivel2 = false;
              this.nivel2_1 = false;
              this.nivel2_2 = false;
              this.nivel2_3 = false;
              this.nivel2_4 = false;
              this.nivel2_5 = false;
              this.nivel2_6 = false;
              this.nivel2_7 = false;
              this.nivel2_8 = false;
              this.nivel2_9 = false;
              this.nivel2_10 = false;
              this.nivel3 = false;
              this.nivel3_1 = false;
              this.nivel3_2 = false;
              this.nivel3_3 = false;
              this.nivel3_4 = false;
              this.nivel3_5 = false;
              this.nivel3_6 = false;
              this.nivel3_7 = false;
              this.nivel3_8 = false;
              this.nivel3_9 = false;
              this.nivel4 = false;
              this.nivel4_1 = false;
              this.nivel4_2 = false;
              this.nivel4_3 = false;
              this.nivel4_4 = false;
              this.nivel4_5 = false;
              this.nivel5 = false;
            } else if (this.NivelEducativoList2.length === 2) {
              this.nivel1 = false;
              this.nivel2 = true;
              this.nivel3 = false;
              this.nivel3_1 = false;
              this.nivel3_2 = false;
              this.nivel3_3 = false;
              this.nivel3_4 = false;
              this.nivel3_5 = false;
              this.nivel3_6 = false;
              this.nivel3_7 = false;
              this.nivel3_8 = false;
              this.nivel3_9 = false;
              this.nivel4 = false;
              this.nivel4_1 = false;
              this.nivel4_2 = false;
              this.nivel4_3 = false;
              this.nivel4_4 = false;
              this.nivel4_5 = false;
              this.nivel5 = false;
              let g1 = this.NivelEducativoList2[0].id
              let g2 = this.NivelEducativoList2[1].id
              if (g1 == 1 && g2 == 2) {
                this.nivel2_1 = true;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 1 && g2 == 3) {
                this.nivel2_1 = false;
                this.nivel2_2 = true;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 1 && g2 == 5) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = true;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 1 && g2 == 6) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = true;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 2 && g2 == 3) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = true;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 2 && g2 == 5) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = true;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 2 && g2 == 6) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = true
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 3 && g2 == 5) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = true;
                this.nivel2_9 = false;
                this.nivel2_10 = false;
              } else if (g1 == 3 && g2 == 6) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = true;
                this.nivel2_10 = false;
              } else if (g1 == 4 && g2 == 6) {
                this.nivel2_1 = false;
                this.nivel2_2 = false;
                this.nivel2_3 = false;
                this.nivel2_4 = false;
                this.nivel2_5 = false;
                this.nivel2_6 = false;
                this.nivel2_7 = false;
                this.nivel2_8 = false;
                this.nivel2_9 = false;
                this.nivel2_10 = true;
              }

            } else if (this.NivelEducativoList2.length === 3) {
              this.nivel1 = false;
              this.nivel2 = false;
              this.nivel2_1 = false;
              this.nivel2_2 = false;
              this.nivel2_3 = false;
              this.nivel2_4 = false;
              this.nivel2_5 = false;
              this.nivel2_6 = false;
              this.nivel2_7 = false;
              this.nivel2_8 = false;
              this.nivel2_9 = false;
              this.nivel2_10 = false;
              this.nivel3 = true;
              this.nivel4 = false;
              this.nivel4_1 = false;
              this.nivel4_2 = false;
              this.nivel4_3 = false;
              this.nivel4_4 = false;
              this.nivel4_5 = false;
              this.nivel5 = false;
              let g1 = this.NivelEducativoList2[0].id
              let g2 = this.NivelEducativoList2[1].id
              let g3 = this.NivelEducativoList2[2].id
              if (g1 == 1 && g2 == 2 && g3 == 3) {
                this.nivel3_1 = true;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 1 && g2 == 2 && g3 == 5) {
                this.nivel3_1 = false;
                this.nivel3_2 = true;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 1 && g2 == 2 && g3 == 6) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = true;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 1 && g2 == 3 && g3 == 5) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = true;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 1 && g2 == 3 && g3 == 6) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = true;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 2 && g2 == 3 && g3 == 5) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = true;
                this.nivel3_7 = false;
                this.nivel3_8 = false;

              } else if (g1 == 2 && g2 == 5 && g3 == 6) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = true
                this.nivel3_8 = false;

              } else if (g1 == 3 && g2 == 5 && g3 == 6) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = true;

              } else if (g1 == 2 && g2 == 3 && g3 == 6) {
                this.nivel3_1 = false;
                this.nivel3_2 = false;
                this.nivel3_3 = false;
                this.nivel3_4 = false;
                this.nivel3_5 = false;
                this.nivel3_6 = false;
                this.nivel3_7 = false;
                this.nivel3_8 = false;
                this.nivel3_9 = true;
              }
            } else if (this.NivelEducativoList2.length === 4) {
              this.nivel1 = false;
              this.nivel2 = false;
              this.nivel2_1 = false;
              this.nivel2_2 = false;
              this.nivel2_3 = false;
              this.nivel2_4 = false;
              this.nivel2_5 = false;
              this.nivel2_6 = false;
              this.nivel2_7 = false;
              this.nivel2_8 = false;
              this.nivel2_9 = false;
              this.nivel2_10 = false;
              this.nivel3 = false;
              this.nivel3_1 = false;
              this.nivel3_2 = false;
              this.nivel3_3 = false;
              this.nivel3_4 = false;
              this.nivel3_5 = false;
              this.nivel3_6 = false;
              this.nivel3_7 = false;
              this.nivel3_8 = false;
              this.nivel3_9 = false;
              this.nivel4 = true;
              let g1 = this.NivelEducativoList2[0].id
              let g2 = this.NivelEducativoList2[1].id
              let g3 = this.NivelEducativoList2[2].id
              let g4 = this.NivelEducativoList2[3].id
              if (g1 == 1 && g2 == 2 && g3 == 3 && g4 == 5) {
                this.nivel4_1 = true;
                this.nivel4_2 = false;
                this.nivel4_3 = false;
                this.nivel4_4 = false;
                this.nivel4_5 = false;


              } else if (g1 == 1 && g2 == 2 && g3 == 3 && g4 == 6) {
                this.nivel4_1 = false;
                this.nivel4_2 = true;
                this.nivel4_3 = false;
                this.nivel4_4 = false;
                this.nivel4_5 = false;


              } else if (g1 == 1 && g2 == 2 && g3 == 5 && g4 == 6) {
                this.nivel4_1 = false;
                this.nivel4_2 = false;
                this.nivel4_3 = true;
                this.nivel4_4 = false;
                this.nivel4_5 = false;


              } else if (g1 == 1 && g2 == 3 && g3 == 5 && g4 == 6) {
                this.nivel4_1 = false;
                this.nivel4_2 = false;
                this.nivel4_3 = false;
                this.nivel4_4 = true;
                this.nivel4_5 = false;


              } else if (g1 == 2 && g2 == 3 && g3 == 5 && g4 == 6) {
                this.nivel4_1 = false;
                this.nivel4_2 = false;
                this.nivel4_3 = false;
                this.nivel4_4 = false;
                this.nivel4_5 = true;


              }
              this.nivel5 = false;
            } else if (this.NivelEducativoList2.length === 5) {
              this.nivel1 = false;
              this.nivel2 = false;
              this.nivel2_1 = false;
              this.nivel2_2 = false;
              this.nivel2_3 = false;
              this.nivel2_4 = false;
              this.nivel2_5 = false;
              this.nivel2_6 = false;
              this.nivel2_7 = false;
              this.nivel2_8 = false;
              this.nivel2_9 = false;
              this.nivel2_10 = false;
              this.nivel3 = false;
              this.nivel3_1 = false;
              this.nivel3_2 = false;
              this.nivel3_3 = false;
              this.nivel3_4 = false;
              this.nivel3_5 = false;
              this.nivel3_6 = false;
              this.nivel3_7 = false;
              this.nivel3_8 = false;
              this.nivel3_9 = false;
              this.nivel4 = false;
              this.nivel5 = true;
            }
          }
        )
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
                    if (e[0].iD_TipoModeloOperacionBase == 1) {
                      this.preg5 = true;
                      this.preg6 = false;
                    } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                      this.preg5 = false;
                      this.preg6 = true;

                    }
                  }

                }
              )

            } else {
              if (f[0].iD_TipoModeloOperacionBase == 1) {
                this.preg5 = true;
                this.preg6 = false;
              } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                this.preg5 = false;
                this.preg6 = true;

              }
            }

          }
        )


      }
    }
  }

  changeItemZonas(name: string, value: any) {
    this.mesajesalert12 = false;
    if (value == 1) {
      this.CicloMenuObject[name] = true;
      this.CicloMenuObject['id_menusParaTodasZonas'] = value;

    } else {
      this.CicloMenuObject[name] = false;
      this.CicloMenuObject['id_menusParaTodasZonas'] = value;

    }
  }
  zona1(id: number) {
    this.CicloMenuObject.iD_Zona = id;
    this.mesajesalert10 = false;
  }
  CambioTabSeleccionadoSemana(tabChangeEvent: any): void {

    this.selectedTabIndex = tabChangeEvent
    this.Preparaciones = false;
    this.Productos = false;

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let com = this.tabs2[0].files[this.selectedTabIndex];
      this.diasText = com.nombre;
      this.semanaid = true;
      this.validacionesEstado();
      let f = this.NivelEducativoList.filter(item => item.id == this.gradoid);
      this.gradoText = f[0].nombre;
      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
        this.Preparaciones = true;
        this.validacionesEstado();
        this.mostrarprepa1();
      } else {
        this.Productos = true;
        this.validacionesEstado();
        this.mostrarprodu();
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      let com = this.tabs2[0].files[this.selectedTabIndex];
      this.diasText = com.nombre;
      this.Preparaciones2 = true
      this.mostrarprepa();
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          let f = response
          if (f.length == 0) {
            let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
              (response: any) => {
                let f = response
                if (f.length == 0) {

                } else {
                  if (f[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.gradoid != 0) {
                      if (this.selectedTabIndex == null) {
                        let com = this.tabs2[0].files[0];
                        this.diasText = com.nombre;
                      } else {
                        let com = this.tabs2[0].files[this.selectedTabIndex];
                        this.diasText = com.nombre;
                      }
                      let f = this.NivelEducativoList.filter(item => item.id == this.gradoid);
                      this.gradoText = f[0].nombre;
                      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                        this.Preparaciones = true;
                        this.validacionesEstado();
                        this.mostrarprepa();
                      } else {
                        this.Productos = true;
                        this.validacionesEstado();
                        this.mostrarprodu();
                      }
                    } else { }
                  } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                    let com = this.tabs2[0].files[this.selectedTabIndex];
                    this.diasText = com.nombre;
                    this.Preparaciones2 = true
                    this.mostrarprepa();

                  }
                }

              }
            )

          } else {
            if (f[0].iD_TipoModeloOperacionBase == 1) {
              if (this.selectedTabIndex == null) {
                let com = this.tabs2[0].files[0];
                this.diasText = com.nombre;
              } else {
                let com = this.tabs2[0].files[this.selectedTabIndex];
                this.diasText = com.nombre;
              }
              let f = this.NivelEducativoList.filter(item => item.id == this.gradoid);
              this.gradoText = f[0].nombre;
              if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                this.Preparaciones = true;
                this.validacionesEstado();
                this.mostrarprepa();
              } else {
                this.Productos = true;
                this.validacionesEstado();
                this.mostrarprodu();
              }
            } else if (f[0].iD_TipoModeloOperacionBase == 2) {
              let com = this.tabs2[0].files[this.selectedTabIndex];
              this.diasText = com.nombre;
              this.Preparaciones2 = true
              this.mostrarprepa();

            }
          }

        }
      )
    } else { }


  }

  onNivelEducativoChange(event: any): void {

    this.grado = event[0].value;
    if (this.selectedTabIndex == null) {
      let com = this.tabs2[0].files[0];
      this.diasText = com.nombre;
    } else {
      let com = this.tabs2[0].files[this.selectedTabIndex];
      this.diasText = com.nombre;
    }

    let f = this.NivelEducativoList.filter(item => item.id == event[0].value);

    this.gradoid = f[0].id
    this.gradoText = f[0].nombre;

    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
      this.Preparaciones = true;
      this.mostrarprepa1();
    } else {
      this.Productos = true;
      this.mostrarprodu();
    }


  }
  onNivelEducativoChange1(event: any): void {

    if (this.selectedTabIndex == null) {
      let com = this.tabs2[0].files[0];
      this.diasText = com.nombre;
    } else {
      let com = this.tabs2[0].files[this.selectedTabIndex];
      this.diasText = com.nombre;
    }
    let f = this.NivelEducativoList.filter(item => item.id == event[0].value);

    this.gradoid2 = f[0].id
    this.gradoText = f[0].nombre;
    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
      this.Preparaciones3 = true;
      this.mostrarprepa1();
    } else {
      this.Productos2 = true;
      this.mostrarprodu();
    }


  }

  crearMenu() {
    //
    if (this.CicloMenuObject.nombre == '' || this.CicloMenuObject.menuReferencia == null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        let valid: boolean = this.validar(this.CicloMenuObject);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
        }

      })
    } else if (this.CicloMenuObject.menuReferencia == true && this.CicloMenuObject.iD_CiclosMenuReferencia == 0) {

      if (this.menuReferencia.length == 0) {
        Swal.fire({
          showCloseButton: true,
          html:
            '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

          let valid: boolean = this.validarMenuRef(this.CicloMenuObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })

      } else {
        Swal.fire({
          showCloseButton: true,
          html:
            '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

          let valid: boolean = this.validarMenuRef(this.CicloMenuObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }
    }
    else if (this.CicloMenuObject.menuReferencia == true && this.CicloMenuObject.iD_CiclosMenuReferencia != 0) {

      this.addMenu();
    } else if (this.CicloMenuObject.menuReferencia == false && this.CicloMenuObject.iD_TipoModeloOperacion == 0) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        let valid: boolean = this.validarMenuMode(this.CicloMenuObject);
        if (valid) {
          this.mesajesalert3 = false;
        }

      })
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion != 0) {

      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
          /*  this.addMenu();
           this.resultQuery1 = true;
           this.avanzar(); */
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0 && this.CicloMenuObject.iD_Zona == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_Zona != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.cantidadMenus != null) {
          if (this.CicloMenuObject.menusParaTodosNiveles == true) {
            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
              if (this.CicloMenuObject.cantidadMenus >= 20 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {

                  this.mensajeDatosNoPermitido = true;
                  this.mensajefuerarango = false;
                }


              } else {
                this.mensajefuerarango = true;
                this.mensajeDatosNoPermitido = false;
              }
            } else {
              if (this.CicloMenuObject.cantidadMenus >= 10 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {

                  this.mensajeDatosNoPermitido = true;
                  this.mensajefuerarango2 = false;
                }
              } else {
                this.mensajefuerarango2 = true;
                this.mensajeDatosNoPermitido = false;
              }
            }

          } else {
            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
              if (this.CicloMenuObject.cantidadMenus >= 100 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {
                  this.mensajeDatosNoPermitido = true;
                }

              } else {
                this.mensajefuerarango1 = true;
              }
            } else {
              if (this.CicloMenuObject.cantidadMenus >= 10 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {
                  this.mensajeDatosNoPermitido = true;
                }

              } else {
                this.mensajefuerarango2 = true;
              }
            }
          }
        }

      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

        if (this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {

          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.cantidadMenus == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.cantidadMenus != null) {
          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
              if (this.numeroSemana == this.limiteSemana) {

                this.semanacant = false;
                this.semanaap = true;

              }
              this.addMenu();


            } else {

              this.mensajeDatosNoPermitido = true;
              this.mensajefuerarango = false;
            }
          } else {
            this.mensajefuerarango = true;
            this.mensajeDatosNoPermitido = false;
          }
        }

      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 0) {
          this.dataMinutaPatron
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0) {
          let g = 0
          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
            g = 1
          } else { g = this.CicloMenuObject.iD_TipoModalidadComplemento }
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
            (response: any) => {
              this.dataMinutaPatron = response

              if (this.dataMinutaPatron.length == 0) {
                let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)
                this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                  (response: any) => {
                    let e = response;
                    if (e.length == 0) { } else {
                      if (e[0].iD_TipoModeloOperacionBase == 1) {

                        if (this.CicloMenuObject.iD_Zona == 0) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }


                          })
                        } else if (this.CicloMenuObject.iD_Zona != 0 && this.CiclosMenusNivelesEducativosObject.length == 0) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuNivel2(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CiclosMenusNivelesEducativosObject.length != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.cantidadMenus != null) {
                          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;

                              }
                              this.addMenu();


                            } else {

                              this.mensajeDatosNoPermitido = true;
                              this.mensajefuerarango = false;
                            }
                          } else {
                            this.mensajefuerarango = true;
                            this.mensajeDatosNoPermitido = false;
                          }
                        }
                      } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                        if (this.CicloMenuObject.cantidadMenus == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.cantidadMenus != null) {
                          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;

                              }
                              this.addMenu();


                            } else {

                              this.mensajeDatosNoPermitido = true;
                              this.mensajefuerarango = false;
                            }
                          } else {
                            this.mensajefuerarango = true;
                            this.mensajeDatosNoPermitido = false;
                          }
                        }
                      }
                    }
                  }
                )
              } else {
                if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {

                  if (this.CicloMenuObject.iD_Zona == 0) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }


                    })
                  } else if (this.CicloMenuObject.iD_Zona != 0 && this.CiclosMenusNivelesEducativosObject.length == 0) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuNivel2(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CiclosMenusNivelesEducativosObject.length != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.cantidadMenus != null) {
                    if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                      if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;

                        }
                        this.addMenu();


                      } else {

                        this.mensajeDatosNoPermitido = true;
                        this.mensajefuerarango = false;
                      }
                    } else {
                      this.mensajefuerarango = true;
                      this.mensajeDatosNoPermitido = false;
                    }
                  }
                } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
                  if (this.CicloMenuObject.cantidadMenus == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.cantidadMenus != null) {
                    if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                      if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;

                        }
                        this.addMenu();


                      } else {

                        this.mensajeDatosNoPermitido = true;
                        this.mensajefuerarango = false;
                      }
                    } else {
                      this.mensajefuerarango = true;
                      this.mensajeDatosNoPermitido = false;
                    }
                  }
                }
              }
            }
          )


        }
      } else { }
    } else { }
  }
  actualizarMenu() {
    if (this.CicloMenuObject.nombre == '' || this.CicloMenuObject.menuReferencia == null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        let valid: boolean = this.validar(this.CicloMenuObject);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
        }

      })
    } else if (this.CicloMenuObject.menuReferencia == true && this.CicloMenuObject.iD_CiclosMenuReferencia == 0) {

      if (this.menuReferencia.length == 0) {
        Swal.fire({
          showCloseButton: true,
          html:
            '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

          let valid: boolean = this.validarMenuRef(this.CicloMenuObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })

      } else {
        Swal.fire({
          showCloseButton: true,
          html:
            '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
            '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

          let valid: boolean = this.validarMenuRef(this.CicloMenuObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }
    }
    else if (this.CicloMenuObject.menuReferencia == true && this.CicloMenuObject.iD_CiclosMenuReferencia != 0) {
      this.addMenu();
    } else if (this.CicloMenuObject.menuReferencia == false && this.CicloMenuObject.iD_TipoModeloOperacion == 0) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        let valid: boolean = this.validarMenuMode(this.CicloMenuObject);
        if (valid) {
          this.mesajesalert3 = false;
        }

      })
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion != 0) {

      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0 && this.CicloMenuObject.iD_Zona == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_Zona != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.cantidadMenus != null) {
          if (this.CicloMenuObject.menusParaTodosNiveles == true) {
            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
              if (this.CicloMenuObject.cantidadMenus >= 20 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {

                  this.mensajeDatosNoPermitido = true;
                  this.mensajefuerarango = false;
                }
              } else {
                this.mensajefuerarango = true;
                this.mensajeDatosNoPermitido = false;
              }
            } else {
              if (this.CicloMenuObject.cantidadMenus >= 10 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {

                  this.mensajeDatosNoPermitido = true;
                  this.mensajefuerarango2 = false;
                }
              } else {
                this.mensajefuerarango2 = true;
                this.mensajeDatosNoPermitido = false;
              }
            }
          } else {
            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 1 || this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
              if (this.CicloMenuObject.cantidadMenus >= 100 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {
                  this.mensajeDatosNoPermitido = true;
                }

              } else {
                this.mensajefuerarango1 = true;
              }
            } else {
              if (this.CicloMenuObject.cantidadMenus >= 10 && this.CicloMenuObject.cantidadMenus <= 265) {
                if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                  this.addMenu();
                } else {
                  this.mensajeDatosNoPermitido = true;
                }

              } else {
                this.mensajefuerarango2 = true;
              }
            }
          }
        }

      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

        if (this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {

          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.cantidadMenus == null) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.cantidadMenus != null) {
          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
              if (this.numeroSemana == this.limiteSemana) {

                this.semanacant = false;
                this.semanaap = true;

              }
              this.addMenu();

            } else {

              this.mensajeDatosNoPermitido = true;
              this.mensajefuerarango = false;
            }
          } else {
            this.mensajefuerarango = true;
            this.mensajeDatosNoPermitido = false;
          }
        }

      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoModalidadComplemento != 0 && this.CicloMenuObject.iD_TipoComplemento == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarModaco2(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })

        } else if (this.CicloMenuObject.iD_TipoComplemento != 0 && this.CicloMenuObject.iD_MinutaAprobacion == 0) {
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

            let valid: boolean = this.validarMenuMinuta(this.CicloMenuObject);
            if (valid) {
              this.mesajesalert = false;
              this.mesajesalert2 = false;
            }

          })
        } else if (this.CicloMenuObject.iD_MinutaAprobacion != 0) {
          let g = 0
          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
            g = 1
          } else { g = this.CicloMenuObject.iD_TipoModalidadComplemento }
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
            (response: any) => {
              let f = response
              if (f.length == 0) {
                let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)
                this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                  (response: any) => {
                    let e = response;
                    if (e.length == 0) { } else {
                      if (e[0].iD_TipoModeloOperacionBase == 1) {

                        if (this.CicloMenuObject.iD_Zona == 0) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }


                          })
                        } else if (this.CicloMenuObject.iD_Zona != 0 && this.CiclosMenusNivelesEducativosObject.length == 0) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuNivel2(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CiclosMenusNivelesEducativosObject.length != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.cantidadMenus != null) {
                          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;

                              }
                              this.addMenu();


                            } else {

                              this.mensajeDatosNoPermitido = true;
                              this.mensajefuerarango = false;
                            }
                          } else {
                            this.mensajefuerarango = true;
                            this.mensajeDatosNoPermitido = false;
                          }
                        }
                      } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                        if (this.CicloMenuObject.cantidadMenus == null) {
                          Swal.fire({
                            showCloseButton: true,
                            html:
                              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                            let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                            if (valid) {
                              this.mesajesalert = false;
                              this.mesajesalert2 = false;
                            }

                          })
                        } else if (this.CicloMenuObject.cantidadMenus != null) {
                          if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                            if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                              if (this.numeroSemana == this.limiteSemana) {

                                this.semanacant = false;
                                this.semanaap = true;

                              }
                              this.addMenu();


                            } else {

                              this.mensajeDatosNoPermitido = true;
                              this.mensajefuerarango = false;
                            }
                          } else {
                            this.mensajefuerarango = true;
                            this.mensajeDatosNoPermitido = false;
                          }
                        }
                      }
                    }
                  }
                )
              } else {
                if (f[0].iD_TipoModeloOperacionBase == 1) {

                  if (this.CicloMenuObject.iD_Zona == 0) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuZonas(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }


                    })
                  } else if (this.CicloMenuObject.iD_Zona != 0 && this.CiclosMenusNivelesEducativosObject.length == 0) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuNivel2(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CiclosMenusNivelesEducativosObject.length != 0 && this.CicloMenuObject.menusParaTodosNiveles == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuNivel(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.menusParaTodosNiveles != null && this.CicloMenuObject.menusParaTodasZonas == null) {

                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenuZonas2(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.menusParaTodasZonas != null && this.CicloMenuObject.cantidadMenus == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.cantidadMenus != null) {
                    if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                      if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;

                        }
                        this.addMenu();


                      } else {

                        this.mensajeDatosNoPermitido = true;
                        this.mensajefuerarango = false;
                      }
                    } else {
                      this.mensajefuerarango = true;
                      this.mensajeDatosNoPermitido = false;
                    }
                  }
                } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                  if (this.CicloMenuObject.cantidadMenus == null) {
                    Swal.fire({
                      showCloseButton: true,
                      html:
                        '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
                        '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

                      let valid: boolean = this.validarMenucantidad(this.CicloMenuObject);
                      if (valid) {
                        this.mesajesalert = false;
                        this.mesajesalert2 = false;
                      }

                    })
                  } else if (this.CicloMenuObject.cantidadMenus != null) {
                    if (this.CicloMenuObject.cantidadMenus >= 5 && this.CicloMenuObject.cantidadMenus <= 265) {
                      if (this.CicloMenuObject.cantidadMenus > 0 && this.CicloMenuObject.cantidadMenus % 5 == 0) { //hacemos la comparación
                        if (this.numeroSemana == this.limiteSemana) {

                          this.semanacant = false;
                          this.semanaap = true;

                        }
                        this.addMenu();


                      } else {

                        this.mensajeDatosNoPermitido = true;
                        this.mensajefuerarango = false;
                      }
                    } else {
                      this.mensajefuerarango = true;
                      this.mensajeDatosNoPermitido = false;
                    }
                  }
                }
              }
            }
          )

        }
      } else { }
    } else { }
  }
  validar(itemIndex: any) {
    if (itemIndex.id_menuReferencia == null && itemIndex.nombre == '') {
      //falta idmodelooperacion y el nombre
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      return false;
    } else if (itemIndex.id_menuReferencia != null && itemIndex.nombre == '') {
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      return false;
    } else if (itemIndex.id_menuReferencia == null && itemIndex.nombre != '') {
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      return false;
    }
    return true;
  }
  validarMenuRef(itemIndex: any) {

    if (itemIndex.iD_CiclosMenuReferencia == 0) {
      if (this.menuReferencia.length == 0) {

        this.mesajesalert4 = true;
        return false;
      } else {
        this.mesajesalert3 = true;
        return false;
      }

    }
    return true;
  }

  validarMenuMode(itemIndex: any) {

    if (itemIndex.iD_TipoModeloOperacion == 0) {

      this.mesajesalert5 = true;
      return false;


    }
    return true;
  }

  validarModaco(itemIndex: any) {

    if (itemIndex.iD_TipoModalidadComplemento == 0) {

      this.mesajesalert6 = true;
      return false;


    }
    return true;
  }
  validarModaco2(itemIndex: any) {

    if (itemIndex.iD_TipoComplemento == 0 || itemIndex.iD_TipoComplemento == null) {

      this.mesajesalert7 = true;
      return false;


    }
    return true;
  }
  validarMenuMinuta(itemIndex: any) {

    if (itemIndex.iD_MinutaAprobacion == 0) {

      if (this.MinutasList.length == 0) {

        this.mesajesalert8 = true;
        return false;
      } else {
        this.mesajesalert9 = true;
        return false;
      }

    }
    return true;
  }
  validarMenuNivel2(itemIndex: any) {



    if (this.CiclosMenusNivelesEducativosObject.length == 0) {

      this.mesajesalert19 = true;
      return false;
    }


    return true;
  }
  validarMenuZonas(itemIndex: any) {

    if (itemIndex.iD_Zona == 0) {

      this.mesajesalert10 = true;
      return false;


    }
    return true;
  }
  validarMenuNivel(itemIndex: any) {
    if (itemIndex.menusParaTodosNiveles == null) {

      this.mesajesalert11 = true;
      return false;
    }
    return true;
  }
  validarMenuZonas2(itemIndex: any) {
    if (itemIndex.menusParaTodasZonas == null) {

      this.mesajesalert19 = true;
      return false;
    }
    return true;
  }
  validarMenucantidad(itemIndex: any) {
    if (itemIndex.cantidadMenus == null) {

      this.mesajesalert13 = true;
      return false;
    }
    return true;
  }
  addMenu() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      /* this.resultQuery1 = true;
      this.avanzar() */
      this.maem = true;
      this.maer = false;
      this.TipoModelos = 1;
      this.cantModelo = 1;
      this.Preparaciones = false;
      this.Preparaciones2 = false;

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


      this.crearCiclo();

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      this.maer = true;
      this.maem = false;
      this.Preparaciones = false;
      this.Preparaciones2 = true;

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





      this.crearCiclo();
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
     
      if (this.dataMinutaPatron == undefined) {

        let g = 0;
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          g = 1;
        } else {
          g = this.CicloMenuObject.iD_TipoModalidadComplemento;
        }
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let f = response;
            if (f.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)
              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  let e = response;

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
                      this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(this.CicloMenuObject.id).subscribe(
                        (response: any) => {
                          response.forEach(item => {
                            this.NivelEducativoList2.map(function (dato) {

                              if (dato.id == item.iD_TipoNivelEducativo) {

                                dato.id = item.iD_TipoNivelEducativo;
                                dato.activo = true;

                              }

                              return dato;
                            });
                          })
                        }
                      )


                      this.Preparaciones = false;
                      this.Preparaciones2 = false;

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

                      this.crearCiclo();

                    } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                      this.maer = true;
                      this.maem = false;
                      this.Preparaciones = false;
                      this.Preparaciones2 = true;
                      if (this.selectedTabIndex == null) {
                        let com = this.tabs2[0].files[0];
                        this.diasText = com.nombre;
                        this.mostrarprepa();
                      } else {
                        let com = this.tabs2[0].files[this.selectedTabIndex];
                        this.diasText = com.nombre;
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




                      this.crearCiclo();
                    }

                  }
                }
              )

            } else {
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
                this.CiclosMenusNivelesEducativosObject.forEach(item => {
                  this.NivelEducativoList2.map(function (dato) {

                    if (dato.id == item.iD_TipoNivelEducativo) {

                      dato.id = item.iD_TipoNivelEducativo;
                      dato.activo = true;

                    }

                    return dato;
                  });
                })

                this.Preparaciones = false;
                this.Preparaciones2 = false;

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


                this.crearCiclo();

              } else if (f[0].iD_TipoModeloOperacionBase == 2) {
                this.maer = true;
                this.maem = false;
                this.Preparaciones = false;
                this.Preparaciones2 = true;
                if (this.selectedTabIndex == null) {
                  let com = this.tabs2[0].files[0];
                  this.diasText = com.nombre;
                  this.mostrarprepa();
                } else {
                  let com = this.tabs2[0].files[this.selectedTabIndex];
                  this.diasText = com.nombre;
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
                this.crearCiclo();
              }
            }
          }
        )

      } else {
        if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
          this.maem = true;
          this.maer = false;
          if (this.CiclosMenusNivelesEducativosObject.length == 1) {
            this.TipoModelos = 2;
            this.cantModelo = 1;
          } else if (this.CiclosMenusNivelesEducativosObject.length > 1) {
            this.TipoModelos = 2;
            this.cantModelo = 2;
          }
          this.CiclosMenusNivelesEducativosObject.forEach(item => {
            this.NivelEducativoList2.map(function (dato) {

              if (dato.id == item.iD_TipoNivelEducativo) {

                dato.id = item.iD_TipoNivelEducativo;
                dato.activo = true;

              }

              return dato;
            });
          })

          this.Preparaciones = false;
          this.Preparaciones2 = false;

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

          this.crearCiclo();

        } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
          this.maer = true;
          this.maem = false;
          this.Preparaciones = false;
          this.Preparaciones2 = true;
          if (this.selectedTabIndex == null) {
            let com = this.tabs2[0].files[0];
            this.diasText = com.nombre;
            this.mostrarprepa();
          } else {
            let com = this.tabs2[0].files[this.selectedTabIndex];
            this.diasText = com.nombre;
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
          this.crearCiclo();
        }
      }




    }


  }
  crearCiclo() {

    if (this.CicloMenuObject.id == 0) {
      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

        this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
          (response: any) => {
            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
            this.CicloMenuObject.id = response.id;
            this.resultQuery1 = true;
            this.avanzar()
            if (this.numeroSemana == 1) { this.crearsemana(); } else { }

          },
          (err) => {

          }
        );
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
        this.CicloMenuObject.iD_TipoNivelEducativo = null;
        this.CicloMenuObject.iD_Zona = null;
        this.CicloMenuObject.menusParaTodasZonas = false;
        this.CicloMenuObject.menusParaTodosNiveles = false;
        this.CicloMenuObject.iD_TipoModalidadComplemento = null;

        this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
          (response: any) => {
            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
            this.CicloMenuObject.id = response.id;
            this.resultQuery1 = true;
            this.avanzar()
            if (this.numeroSemana == 1) { this.crearsemana(); } else { }
          },
          (err) => {

          }
        );
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


        if (this.dataMinutaPatron.length == 0) {
          let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
            (response: any) => {
              let e = response;
              if (e.length == 0) { } else {
                if (e[0].iD_TipoModeloOperacionBase == 1) {
                  this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;

                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearNivel(); } else { }
                    },
                    (err) => {

                    }
                  );
                } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                  this.CicloMenuObject.iD_TipoNivelEducativo = null;
                  this.CicloMenuObject.iD_Zona = null;
                  this.CicloMenuObject.menusParaTodasZonas = false;
                  this.CicloMenuObject.menusParaTodosNiveles = false;
                  this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;
                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearsemana(); } else { }
                    },
                    (err) => {

                    }
                  );

                }
              }
            })

        } else {
          if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
            this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
              (response: any) => {
                // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                this.CicloMenuObject.id = response.id;
                this.resultQuery1 = true;
                this.avanzar()
                if (this.numeroSemana == 1) {
                  this.crearNivel();

                } else { }
              },
              (err) => {

              }
            );
          } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
            this.CicloMenuObject.iD_TipoNivelEducativo = null;
            this.CicloMenuObject.iD_Zona = null;
            this.CicloMenuObject.menusParaTodasZonas = false;
            this.CicloMenuObject.menusParaTodosNiveles = false;
            this._CiclosMenusService.addCiclosMenus(this.CicloMenuObject).subscribe(
              (response: any) => {
                // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                this.CicloMenuObject.id = response.id;
                this.resultQuery1 = true;
                this.avanzar()
                if (this.numeroSemana == 1) { this.crearsemana(); } else { }
              },
              (err) => {

              }
            );

          }
        }


      }


    } else {


      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

        this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
          (response: any) => {
            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
            this.CicloMenuObject.id = response.id;
            this.resultQuery1 = true;
            this.avanzar()
            if (this.numeroSemana == 1) { this.crearsemana(); } else { }

          },
          (err) => {

          }
        );
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
        this.CicloMenuObject.iD_TipoNivelEducativo = null;
        this.CicloMenuObject.iD_Zona = null;
        this.CicloMenuObject.menusParaTodasZonas = false;
        this.CicloMenuObject.menusParaTodosNiveles = false;
        this.CicloMenuObject.iD_TipoModalidadComplemento = null;

        this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
          (response: any) => {
            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
            this.CicloMenuObject.id = response.id;
            this.resultQuery1 = true;
            this.avanzar()
            if (this.numeroSemana == 1) { this.crearsemana(); } else { }
          },
          (err) => {

          }
        );
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


        if (this.dataMinutaPatron == undefined) {
          let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
            (response: any) => {
              let e = response;
              if (e.length == 0) { } else {
                if (e[0].iD_TipoModeloOperacionBase == 1) {
                  this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;

                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearNivel(); } else { }
                    },
                    (err) => {

                    }
                  );
                } else if (e[0].iD_TipoModeloOperacionBase == 2) {
                  this.CicloMenuObject.iD_TipoNivelEducativo = null;
                  this.CicloMenuObject.iD_Zona = null;
                  this.CicloMenuObject.menusParaTodasZonas = false;
                  this.CicloMenuObject.menusParaTodosNiveles = false;
                  this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;
                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearsemana(); } else { }
                    },
                    (err) => {

                    }
                  );

                }
              }
            })
          let g = 0;
          if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
            g = 1;
          } else {
            g = this.CicloMenuObject.iD_TipoModalidadComplemento;
          }
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
            (response: any) => {
              let o = response;

              if (o.length == 0) {
                let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

                this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                  (response: any) => {
                    let p = response;
                    if (p.length == 0) { } else {

                      if (p[0].iD_TipoModeloOperacionBase == 1) {
                        this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                          (response: any) => {
                            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                            this.CicloMenuObject.id = response.id;

                            this.resultQuery1 = true;
                            this.avanzar()
                            if (this.numeroSemana == 1) { this.crearNivel(); } else { }
                          },
                          (err) => {

                          }
                        );

                      } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                        this.CicloMenuObject.iD_TipoNivelEducativo = null;
                        this.CicloMenuObject.iD_Zona = null;
                        this.CicloMenuObject.menusParaTodasZonas = false;
                        this.CicloMenuObject.menusParaTodosNiveles = false;
                        this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                          (response: any) => {
                            // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                            this.CicloMenuObject.id = response.id;
                            this.resultQuery1 = true;
                            this.avanzar()
                            if (this.numeroSemana == 1) { this.crearsemana(); } else { }
                          },
                          (err) => {

                          }
                        );


                      }


                    }
                  })
              } else {
                if (o[0].iD_TipoModeloOperacionBase == 1) {
                  this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;

                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearNivel(); } else { }
                    },
                    (err) => {

                    }
                  );

                } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                  this.CicloMenuObject.iD_TipoNivelEducativo = null;
                  this.CicloMenuObject.iD_Zona = null;
                  this.CicloMenuObject.menusParaTodasZonas = false;
                  this.CicloMenuObject.menusParaTodosNiveles = false;
                  this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
                    (response: any) => {
                      // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                      this.CicloMenuObject.id = response.id;
                      this.resultQuery1 = true;
                      this.avanzar()
                      if (this.numeroSemana == 1) { this.crearsemana(); } else { }
                    },
                    (err) => {

                    }
                  );


                }

              }
            })

        } else {
          if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
            this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
              (response: any) => {
                // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                this.CicloMenuObject.id = response.id;
                this.resultQuery1 = true;
                this.avanzar()
                if (this.numeroSemana == 1) {
                  this.crearNivel();

                } else { }
              },
              (err) => {

              }
            );
          } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
            this.CicloMenuObject.iD_TipoNivelEducativo = null;
            this.CicloMenuObject.iD_Zona = null;
            this.CicloMenuObject.menusParaTodasZonas = false;
            this.CicloMenuObject.menusParaTodosNiveles = false;
            this._CiclosMenusService.updateCiclosMenus(this.CicloMenuObject).subscribe(
              (response: any) => {
                // id tipo estado 1 por aprobar, 2 width: 35%, 3 aprobado, 6 pendiente
                this.CicloMenuObject.id = response.id;
                this.resultQuery1 = true;
                this.avanzar()
                if (this.numeroSemana == 1) { this.crearsemana(); } else { }
              },
              (err) => {

              }
            );

          }
        }


      }


    }
  }

  crearsemana() {
    
    this._PA_InsertarSemanaMenuService.getPA_InsertarSemanaMenuList(this.CicloMenuObject.id, this.CicloMenuObject.cantidadMenus, null).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        /* this.resultQuery1 = true;
        this.avanzar() */
        this.creardias();
      },
      (err) => {

      }
    )
  }
  crearsemana1() {
    this.semanaObject.iD_CiclosMenu = this.CicloMenuObject.id
    let k = this.CicloMenuObject.cantidadMenus / 5
    for (let i = 1; i <= k; i++) {
      this.semanaObject.numeroSemana = i
      if (this.semanaList.length == 0) {
        this._SemanasPTNService.addSemanasPTN(this.semanaObject).subscribe(
          async (response: any) => {

            this.semanaList.push({
              sID: '',
              id: response.id,
              iD_CiclosMenu: this.CicloMenuObject.id,
              numeroSemana: response.numeroSemana,
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

            if (i === k) {
              await this.crearMPTN()
            }
          }
        )
      } else {
        this.semanaList.forEach(item => {
          if (item.id == 0) {
            this._SemanasPTNService.addSemanasPTN(this.semanaObject).subscribe(
              async (response: any) => {
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
                if (i === k) {
                  await this.crearMPTN()
                }
              }
            )
          } else {
            this.semanaObject.iD_CiclosMenu = this.CicloMenuObject.id
            this.semanaObject.numeroSemana = item.numeroSemana
            this.semanaObject.id = item.id
            this._SemanasPTNService.updateSemanasPTN(this.semanaObject).subscribe(
              (response: any) => {
                if (i === k) {
                  this.crearMPTN()
                }
              }
            )
          }
        })
      }
    }


  }
  async crearMPTN() {

    let k = this.CicloMenuObject.cantidadMenus
    for (let i = 1; i <= k; i++) {

      this.CiclosMenusNivelesEducativosObject.forEach(item => {

        this.semanaList.forEach(ele => {
          if (this.MenuPTNObject4.length == 0) {
            this.MenuPTNObject2.iD_Semana = ele.id;
            this.MenuPTNObject2.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.MenuPTNObject2.nombre = 'Dia ' + i;
            this.MenuPTNObject2.numeroDia = i;
            this._MenuPTNService.addMenuPTN(this.MenuPTNObject2).subscribe(
              (response: any) => {


              },
              (err) => {

              }
            )
          } else {
            let f = this.MenuPTNObject4.filter(item1 => item.iD_TipoNivelEducativo === item1.iD_TipoNivelEducativo && item1.numeroDia === i)

            if (f.length > 0) { } else {
              this.MenuPTNObject2.iD_Semana = ele.id;
              this.MenuPTNObject2.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.MenuPTNObject2.nombre = 'Dia ' + i;
              this.MenuPTNObject2.numeroDia = i;
              this._MenuPTNService.addMenuPTN(this.MenuPTNObject2).subscribe(
                (response: any) => {


                },
                (err) => {

                }
              )
            }
          }
        })
      })

      await this.creardias()

    }
  }
  crearNivel() {

    this.CiclosMenusNivelesEducativosObject.forEach(item => {


      if (item.id == 0) {
        this.CiclosMenusNivelesEducativosObject2.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
        this.CiclosMenusNivelesEducativosObject2.iD_CiclosMenu = this.CicloMenuObject.id;

        this._CiclosMenusNivelesEducativosService.addCiclosMenusNivelesEducativos(this.CiclosMenusNivelesEducativosObject2).subscribe(
          (response: any) => {

            // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
            this.CiclosMenusNivelesEducativosObject.forEach(elem => {
              if (elem.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo) {
                elem.id = response.id;
                elem.iD_CiclosMenu = this.CicloMenuObject.id;
              }
            })
            /* this.resultQuery1 = true;
            this.avanzar() */
            let d = this.CiclosMenusNivelesEducativosObject.filter(ite => ite.id == 0)

            if (d.length == 0) {
              this.crearsemana();
            }
          },
          (err) => {

          }
        );



      } else {
        this.CiclosMenusNivelesEducativosObject2.id = item.id
        this.CiclosMenusNivelesEducativosObject2.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
        this.CiclosMenusNivelesEducativosObject2.iD_CiclosMenu = this.CicloMenuObject.id;

        this._CiclosMenusNivelesEducativosService.updateCiclosMenusNivelesEducativos(this.CiclosMenusNivelesEducativosObject2).subscribe(
          (response: any) => {
            // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
            /* this.resultQuery1 = true;
            this.avanzar() */
            let d = this.CiclosMenusNivelesEducativosObject.filter(ite => ite.id == 0)
            if (d.length == 0) {
              this.crearsemana();
            }
          },
          (err) => {

          }
        );

      }



    })



    //TODO OMCP this.creardias();


  }
  creardias() {
   
    this.semanaList = [];
    this.MenuPTNObject3 = [];
    this.MenuPTNObject = [];
    this.MenuPTNObject4 = [];


    this._SemanasPTNService.getSemanasPTNListRelationfilter(this.CicloMenuObject.id).subscribe(
      async (response: any) => {
        this.semanaList = response.map(element => ({
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
          isValid: false,
          isSelected: false,
          completed: false,
          sID_CiclosMenu: '',
        }));
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1 || this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
          for (const item of this.semanaList) {
            const menuResponse = await this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(item.id).toPromise();

            // Si `menuResponse` es un solo objeto y no un array
            if (!Array.isArray(menuResponse)) {
              // Procesar el objeto único
              const element = menuResponse;
              const tabItem = {
                nombre: element.Nombre,
                estado: 'Pendiente',
                semana: item.numeroSemana,
                numeroDia: element.NumeroDia,
              };

              const menuPTNModelItem: MenuPTNModel = {
                ...tabItem,
                id: element.id,
                iD_Semana2: element.ID_Semana,
                iD_TipoNivelEducativo: this.CicloMenuObject.iD_TipoModeloOperacion === 1 ? element.ID_TipoNivelEducativo : 0,
                productos: [],
                isValid: true,
                isSelected: false,
                completed: false,
                sID: '', // Agrega las propiedades faltantes aquí
                iD_Semana: item.numeroSemana,
                sID_Semana: '',
                sID_TipoNivelEducativo: '',
                auditoria: '',
                _ippublica: '',
                _nombremaquina: '',
                _usuario: '',
                _ipdetrasproxy: '',
                _browser: '',
                _accion: '',
                _sessionid: '',
                _XMLAuditoria: ''
              };

              if (this.CicloMenuObject.iD_TipoModeloOperacion === 1) {
                this.MenuPTNObject3.push(menuPTNModelItem);
              } else if (this.CicloMenuObject.iD_TipoModeloOperacion === 2) {
                this.MenuPTNObject.push(menuPTNModelItem);
              }

              this.tabs.push(tabItem);
            } else {
              // Si `menuResponse` es un array, procesarlo
              menuResponse.forEach(element => {
                const tabItem = {
                  nombre: element.nombre,
                  estado: 'Pendiente',
                  semana: item.numeroSemana,
                  numeroDia: element.numeroDia,
                };

                const menuPTNModelItem: MenuPTNModel = {
                  ...tabItem,
                  id: element.id,
                  iD_Semana2: element.iD_Semana,
                  iD_TipoNivelEducativo: this.CicloMenuObject.iD_TipoModeloOperacion === 1 ? element.iD_TipoNivelEducativo : 0,
                  productos: [],
                  isValid: true,
                  isSelected: false,
                  completed: false,
                  sID: '', // Agrega las propiedades faltantes aquí
                  iD_Semana: item.numeroSemana,
                  sID_Semana: '',
                  sID_TipoNivelEducativo: '',
                  auditoria: '',
                  _ippublica: '',
                  _nombremaquina: '',
                  _usuario: '',
                  _ipdetrasproxy: '',
                  _browser: '',
                  _accion: '',
                  _sessionid: '',
                  _XMLAuditoria: ''
                };

                if (this.CicloMenuObject.iD_TipoModeloOperacion === 1) {
                  this.MenuPTNObject3.push(menuPTNModelItem);
                } else if (this.CicloMenuObject.iD_TipoModeloOperacion === 2) {
                  this.MenuPTNObject.push(menuPTNModelItem);
                }

                this.tabs.push(tabItem);
              });
            }

            this.actualizarTabs();
          }

          // Solo llamar a mostrarprepa una vez después de completar la lógica
          await this.mostrarprepa();
        } else {
          if (this.dataMinutaPatron == undefined) {
            let g = this.CicloMenuObject.iD_TipoModalidadComplemento == 3 ? 1 : this.CicloMenuObject.iD_TipoModalidadComplemento;
            
            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
              (response: any) => {
                let o = response;

                if (o.length == 0) {
                  let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento);
                  this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                    (response: any) => {
                      this.procesarRespuesta(response, g);
                    }
                  );
                } else {
                  this.procesarRespuesta(o, g);
                }
              }
            );
          }else{
            let g = this.CicloMenuObject.iD_TipoModalidadComplemento == 3 ? 1 : this.CicloMenuObject.iD_TipoModalidadComplemento;
            
            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
              (response: any) => {
                let o = response;

                if (o.length == 0) {
                  let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento);
                  this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                    (response: any) => {
                      this.procesarRespuesta(response, g);
                    }
                  );
                } else {
                  this.procesarRespuesta(o, g);
                }
              }
            );
          }

        }

      },
      (err) => {
        // Manejo de errores
      }
    );
  }

  // Función para procesar la respuesta de los servicios
  procesarRespuesta(response: any, g: number) {
    
    if (response.length == 0) {
      // Manejo cuando la respuesta está vacía
    } else {
      this.semanaList.forEach(item => {
        this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(item.id).subscribe(
          async (responseSemanas: any) => {
            responseSemanas.forEach(element => {
              if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
                this.procesarElemento(element, response[0].iD_TipoModeloOperacionBase, this.numeroSemana);
              }
            });

            await this.ordenarYAgruparTabs();

            if (response[0].iD_TipoModeloOperacionBase == 1) {
              this.maem = true;
              this._PA_CiclosMenusNivelesEducativosGetAllWithRelationService.getPA_CiclosMenusNivelesEducativosGetAllWithRelationList(this.CicloMenuObject.id).subscribe(
                async (responseNiveles: any) => {
                  this.actualizarCiclosMenusNivelesEducativos(responseNiveles);
                  await this.mostrarprepa();
                }
              );
            } else if (response[0].iD_TipoModeloOperacionBase == 2) {
              this.actualizarDiasText();
            }
          },
          (err) => {
            console.error("Error al obtener las semanas", err);
          }
        );
      });
    }
  }

  // Función para procesar cada elemento de la semana
  procesarElemento(element: any, tipoModeloOperacionBase: number, numeroSemana: number) {
    const menuObject: MenuPTNModel = {
      sID: '',  // Proporciona el valor apropiado
      id: element.id,  // Proporciona el valor apropiado
      iD_Semana: numeroSemana,  // Proporciona el valor apropiado
      iD_Semana2: element.iD_Semana,  // Proporciona el valor apropiado
      sID_Semana: '',  // Proporciona el valor apropiado
      iD_TipoNivelEducativo: element.iD_TipoNivelEducativo || 0,  // Proporciona el valor apropiado
      sID_TipoNivelEducativo: '',  // Proporciona el valor apropiado
      numeroDia: element.numeroDia,  // Proporciona el valor apropiado
      nombre: element.nombre,  // Proporciona el valor apropiado
      auditoria: '',  // Proporciona el valor apropiado
      isValid: true,
      isSelected: false,
      completed: false,
      productos: [],  // Proporciona el valor apropiado
      _ippublica: '',  // Proporciona el valor apropiado
      _nombremaquina: '',  // Proporciona el valor apropiado
      _usuario: '',  // Proporciona el valor apropiado
      _ipdetrasproxy: '',  // Proporciona el valor apropiado
      _browser: '',  // Proporciona el valor apropiado
      _accion: '',  // Proporciona el valor apropiado
      _sessionid: '',  // Proporciona el valor apropiado
      _XMLAuditoria: '',  // Proporciona el valor apropiado
    };

    const tabItem = {
      nombre: element.nombre,
      estado: 'Pendiente',
      semana: numeroSemana,
      numeroDia: element.numeroDia,
    };

    this.tabs.push(tabItem);

    if (tipoModeloOperacionBase == 1) {
      this.MenuPTNObject4.push(menuObject);
    } else if (tipoModeloOperacionBase == 2) {
      this.MenuPTNObject.push(menuObject);
    }

    if (this.MinutasList.length == 0) {
      this.mesajesalert8 = true;
    } else { }
  }

  // Función para ordenar y agrupar tabs
  ordenarYAgruparTabs() {
    const uniqueTabs = Array.from(new Set(this.tabs.map(tab => tab.nombre)))
      .map(nombre => this.tabs.find(tab => tab.nombre === nombre));

    this.tabs = uniqueTabs.sort((a, b) => a.numeroDia - b.numeroDia);

    const grouped = this.tabs.reduce((acc, file) => {
      acc[file.semana] = acc[file.semana] || [];
      acc[file.semana].push(file);
      return acc;
    }, {});

    this.groupedFiles = Object.keys(grouped).map(semana => ({
      semana: semana,
      files: grouped[semana],
    }));

    this.tabs2 = this.groupedFiles.filter(item => item.semana == this.numeroSemana);
    
  }

  // Función para actualizar CiclosMenusNivelesEducativos
  actualizarCiclosMenusNivelesEducativos(responseNiveles: any) {
    if (this.CiclosMenusNivelesEducativosObject.length == 0) {
      responseNiveles.forEach(element => {
        this.CiclosMenusNivelesEducativosObject.push({
          id: element.id,
          iD_CiclosMenu: element.iD_CiclosMenu,
          siD_CiclosMenu: '',
          iD_TipoNivelEducativo: element.iD_TipoNivelEducativo || 1,
          siD_TipoNivelEducativo: element.sID_TipoNivelEducativo,
          auditoria: '',
          activo: true,
          isValid: false,
          isSelected: false,
          completed: false,
          estado: 'Pendiente',
          _ippublica: '', // Asigna el valor apropiado si es necesario
          _nombremaquina: '', // Asigna el valor apropiado si es necesario
          _usuario: '', // Asigna el valor apropiado si es necesario
          _ipdetrasproxy: '', // Asigna el valor apropiado si es necesario
          _browser: '', // Asigna el valor apropiado si es necesario
          _accion: '', // Asigna el valor apropiado si es necesario
          _sessionid: '', // Asigna el valor apropiado si es necesario
          _XMLAuditoria: '', // Asigna el valor apropiado si es necesario
        });
      });

      responseNiveles.forEach(item => {
        this.NivelEducativoList2.map(dato => {
          if (dato.id == item.iD_TipoNivelEducativo) {
            dato.activo = true;
          }
          return dato;
        });
      });
    }
  }

  // Función para actualizar el texto de los días
  async actualizarDiasText() {
    if (this.selectedTabIndex == 0) {
      let com = this.tabs2[0].files[0];
      this.diasText = com.nombre;

    } else {
      let com = this.tabs2[0].files[this.selectedTabIndex];
      this.diasText = com.nombre;
    }
    await this.mostrarprepa();
  }

  actualizarTabs() {
    const uniqueTabs = Array.from(new Set(this.tabs.map(tab => tab.nombre)))
      .map(nombre => this.tabs.find(tab => tab.nombre === nombre));

    this.tabs = uniqueTabs.sort((a, b) => a.numeroDia - b.numeroDia);

    const grouped = this.tabs.reduce((acc, file) => {
      acc[file.semana] = acc[file.semana] || [];
      acc[file.semana].push(file);
      return acc;
    }, {});

    this.groupedFiles = Object.keys(grouped).map(semana => ({
      semana: semana,
      files: grouped[semana],
    }));

    this.tabs2 = this.groupedFiles.filter(item => item.semana == this.numeroSemana);

    if (this.CicloMenuObject.iD_TipoModeloOperacion === 1 || this.CicloMenuObject.iD_TipoModeloOperacion === 2) {
      if (this.tabs2 && this.tabs2.length > 0) {
        const com = this.tabs2[0].files[this.selectedTabIndex || 0];
        this.diasText = com.nombre;
      }
    }
  }

  creardias2() {
    let g = this.groupedFiles.filter(item => item.semana == this.numeroSemana)

    this.tabs2 = g;
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
        this.Preparaciones = false;
      } else { this.Productos = false; }
    }
    this.validacionesEstado();
  }
  selectionChange(event: MatCheckboxChange, itemIndice: number, nombre1: any): void {
    let id = +event.source.value;



    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        if (id == 1 || id == 2 || id == 3 || id == 5 || id == 6) {
          this.CiclosMenusNivelesEducativosObject.push({
            id: 0,
            iD_CiclosMenu: 0,
            siD_CiclosMenu: '',
            iD_TipoNivelEducativo: id,
            siD_TipoNivelEducativo: nombre1,
            auditoria: '',
            activo: event.checked,
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
            estado: 'Pendiente',
          })
        } else {
          let h2 = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)
          this.CiclosMenusNivelesEducativosObject.map(function (dato) {

            if (dato.id == id) {

              dato.iD_TipoNivelEducativo = h2[0].iD_TipoNivelEducativo;
              dato.id = 0;
              dato.activo = event.checked;

            }

            return dato;
          });

        }


      }
      else { //if unchecked, remove from the array
        let g = this.CiclosMenusNivelesEducativosObject.filter(x => x => x.iD_TipoNivelEducativo == id)


        if (g[0].id != 0) {


          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos en siguientes fase</div> ` +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#005ACA',
            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Cancelar',
            showDenyButton: true,
            denyButtonText: `Aceptar`,
          }).then((result) => {
            if (result.isDenied) {
              let g = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)

              this._CiclosMenusNivelesEducativosService.deleteCiclosMenusNivelesEducativos(g[0].id).subscribe(
                (response: any) => {
                  const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

                  this.CiclosMenusNivelesEducativosObject.splice(i, 1);
                  this.NivelEducativoList2.map(function (dato) {

                    if (dato.id == id) {

                      dato.id = id;
                      dato.activo = false;

                    }

                    return dato;
                  });
                }, (err) => { }

              );

            }
            else {
              const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

              this.CiclosMenusNivelesEducativosObject.splice(i, 1);
            }
          })
        } else {
          const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

          this.CiclosMenusNivelesEducativosObject.splice(i, 1);

        }
      }


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        if (id == 1 || id == 2 || id == 3 || id == 5 || id == 6) {
          this.CiclosMenusNivelesEducativosObject.push({
            id: 0,
            iD_CiclosMenu: 0,
            siD_CiclosMenu: '',
            iD_TipoNivelEducativo: id,
            siD_TipoNivelEducativo: nombre1,
            auditoria: '',
            activo: event.checked,
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
            estado: 'Pendiente',

          })
        } else {
          let h2 = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)
          this.CiclosMenusNivelesEducativosObject.map(function (dato) {

            if (dato.id == id) {

              dato.iD_TipoNivelEducativo = h2[0].iD_TipoNivelEducativo;
              dato.id = 0;
              dato.activo = event.checked;

            }

            return dato;
          });

        }


      }
      else { //if unchecked, remove from the array
        let g = this.CiclosMenusNivelesEducativosObject.filter(x => x => x.iD_TipoNivelEducativo == id)


        if (g[0].id != 0) {


          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos en siguientes fase</div> ` +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#005ACA',
            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Cancelar',
            showDenyButton: true,
            denyButtonText: `Aceptar`,
          }).then((result) => {
            if (result.isDenied) {
              let g = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)

              this._CiclosMenusNivelesEducativosService.deleteCiclosMenusNivelesEducativos(g[0].id).subscribe(
                (response: any) => {
                  const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

                  this.CiclosMenusNivelesEducativosObject.splice(i, 1);
                  this.NivelEducativoList2.map(function (dato) {

                    if (dato.id == id) {

                      dato.id = id;
                      dato.activo = false;

                    }

                    return dato;
                  });
                }, (err) => { }

              );

            }
            else {
              const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

              this.CiclosMenusNivelesEducativosObject.splice(i, 1);
            }
          })
        } else {
          const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

          this.CiclosMenusNivelesEducativosObject.splice(i, 1);

        }
      }

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        if (id == 1 || id == 2 || id == 3 || id == 5 || id == 6) {
          this.CiclosMenusNivelesEducativosObject.push({
            id: 0,
            iD_CiclosMenu: 0,
            siD_CiclosMenu: '',
            iD_TipoNivelEducativo: id,
            siD_TipoNivelEducativo: nombre1,
            auditoria: '',
            activo: event.checked,
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
            estado: 'Pendiente',
          })
        } else {
          let h2 = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)
          this.CiclosMenusNivelesEducativosObject.map(function (dato) {

            if (dato.id == id) {

              dato.iD_TipoNivelEducativo = h2[0].iD_TipoNivelEducativo;
              dato.id = 0;
              dato.activo = event.checked;

            }

            return dato;
          });

        }

      }
      else { //if unchecked, remove from the array
        let g = this.CiclosMenusNivelesEducativosObject.filter(x => x => x.iD_TipoNivelEducativo == id)


        if (g[0].id != 0) {


          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos en siguientes fase</div> ` +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#005ACA',
            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Cancelar',
            showDenyButton: true,
            denyButtonText: `Aceptar`,
          }).then((result) => {
            if (result.isDenied) {
              let g = this.CiclosMenusNivelesEducativosObject.filter(x => x.iD_TipoNivelEducativo == id)

              this._CiclosMenusNivelesEducativosService.deleteCiclosMenusNivelesEducativos(g[0].id).subscribe(
                (response: any) => {
                  const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

                  this.CiclosMenusNivelesEducativosObject.splice(i, 1);
                  this.NivelEducativoList2.map(function (dato) {

                    if (dato.id == id) {

                      dato.id = id;
                      dato.activo = false;

                    }

                    return dato;
                  });
                }, (err) => { }

              );

            }
            else {
              const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

              this.CiclosMenusNivelesEducativosObject.splice(i, 1);
            }
          })
        } else {
          const i = this.CiclosMenusNivelesEducativosObject.indexOf(this.CiclosMenusNivelesEducativosObject.find(x => x.iD_TipoNivelEducativo == id));

          this.CiclosMenusNivelesEducativosObject.splice(i, 1);

        }
      }

    }




  }

  cancelarIngredi(element: any) {
    Swal.fire({

      showCloseButton: false,
      html:
        '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#005ACA',
      denyButtonColor: '#005ACA',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.semanaid = false;
        this.semanamaerid = false;
        this.eliminarInd(element)


      }

    })

  }
  cancelarIngredi2(element: any) {
    Swal.fire({

      showCloseButton: false,
      html:
        '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#005ACA',
      denyButtonColor: '#005ACA',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.semanaid = false;
        this.semanamaerid = false;
        this.eliminarInd(element)

      }

    })
  }


  cancelarIngredi3(element: any) {
    Swal.fire({

      showCloseButton: false,
      html:
        '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los cálculos</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#005ACA',
      denyButtonColor: '#005ACA',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.semanaid = false;
        this.semanamaerid = false;
        this.eliminarInd(element)

      }

    })
  }

  async eliminarInd(element: any) {
    if (this.CicloMenuObject.menusParaTodosNiveles == true) {

      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
          //preparacion
          let t = this.MenuPTNObject3
            .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
            .sort((a, b) => a.id - b.id);

          if (t.length > 0) {
            let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

            this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
              async (response: any) => {
                let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

                for (const item of pre) {
                  await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
                }
                await this.messageService.showInfo("Borrado Correctamente", 'top center')
                await this.mostrarprepa();
              },
              err => {
                // Manejo de errores
              }
            );
          }
        } else {
          //producto
          let t = this.MenuPTNObject3
            .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
            .sort((a, b) => a.id - b.id);

          if (t.length > 0) {
            let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

            this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
              async (response: any) => {
                let pre = response.filter(item => item.iD_Producto == element.iD_Producto);

                for (const item of pre) {
                  await this._MenuProductosService.deleteMenuProductos(item.id).toPromise();
                }
                await this.messageService.showInfo("Borrado Correctamente", 'top center')
                await this.mostrarprodu();
              },
              err => {
                // Manejo de errores
              }
            );
          }
        }


      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
        let t = this.MenuPTNObject
          .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
          .sort((a, b) => a.id - b.id);

        if (t.length > 0) {
          let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

          this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
            async (response: any) => {
              let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

              for (const item of pre) {
                await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
              }
              await this.messageService.showInfo("Borrado Correctamente", 'top center')
              await this.mostrarprepa();
            },
            err => {
              // Manejo de errores
            }
          );
        }
      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
        let g = this.CicloMenuObject.iD_TipoModalidadComplemento == 3 ? 1 : this.CicloMenuObject.iD_TipoModalidadComplemento;

        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let o = response;

            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento);
              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  //this.procesarRespuesta(response, g);

                  if (response[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                      //preparacion
                      let t = this.MenuPTNObject4
                        .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                        .sort((a, b) => a.id - b.id);

                      if (t.length > 0) {
                        let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                        this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                          async (response: any) => {
                            let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

                            for (const item of pre) {
                              await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
                            }
                            await this.messageService.showInfo("Borrado Correctamente", 'top center')
                            await this.mostrarprepa();
                          },
                          err => {
                            // Manejo de errores
                          }
                        );
                      }
                    } else {
                      //producto
                      let t = this.MenuPTNObject4
                        .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                        .sort((a, b) => a.id - b.id);

                      if (t.length > 0) {
                        let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                        this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                          async (response: any) => {
                            let pre = response.filter(item => item.iD_Producto == element.iD_Producto);

                            for (const item of pre) {
                              await this._MenuProductosService.deleteMenuProductos(item.id).toPromise();
                            }
                            await this.messageService.showInfo("Borrado Correctamente", 'top center')
                            await this.mostrarprodu();
                          },
                          err => {
                            // Manejo de errores
                          }
                        );
                      }
                    }
                  } else if (response[0].iD_TipoModeloOperacionBase == 2) {
                    let t = this.MenuPTNObject
                      .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                      .sort((a, b) => a.id - b.id);

                    if (t.length > 0) {
                      let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                      this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                        async (response: any) => {
                          let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

                          for (const item of pre) {
                            await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
                          }
                          await this.messageService.showInfo("Borrado Correctamente", 'top center')
                          await this.mostrarprepa();
                        },
                        err => {
                          // Manejo de errores
                        }
                      );
                    }
                  }
                }
              );
            } else {
              //this.procesarRespuesta(o, g);
              if (o[0].iD_TipoModeloOperacionBase == 1) {
                if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                  //preparacion
                  let t = this.MenuPTNObject4
                    .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                    .sort((a, b) => a.id - b.id);

                  if (t.length > 0) {
                    let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                    this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                      async (response: any) => {
                        let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

                        for (const item of pre) {
                          await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
                        }
                        await this.messageService.showInfo("Borrado Correctamente", 'top center')
                        await this.mostrarprepa();
                      },
                      err => {
                        // Manejo de errores
                      }
                    );
                  }
                } else {
                  //producto
                  let t = this.MenuPTNObject4
                    .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                    .sort((a, b) => a.id - b.id);

                  if (t.length > 0) {
                    let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                    this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                      async (response: any) => {
                        let pre = response.filter(item => item.iD_Producto == element.iD_Producto);

                        for (const item of pre) {
                          await this._MenuProductosService.deleteMenuProductos(item.id).toPromise();
                        }
                        await this.messageService.showInfo("Borrado Correctamente", 'top center')
                        await this.mostrarprodu();
                      },
                      err => {
                        // Manejo de errores
                      }
                    );
                  }
                }
              } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                let t = this.MenuPTNObject
                  .filter(item => item.iD_Semana == this.numeroSemana && item.nombre == element.sID_Menu)
                  .sort((a, b) => a.id - b.id);

                if (t.length > 0) {
                  let [primero, ultimo] = [t[0].id, t[t.length - 1].id];

                  this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                    async (response: any) => {
                      let pre = response.filter(item => item.iD_Preparacion == element.iD_Preparacion);

                      for (const item of pre) {
                        await this._MenuPreparacionesService.deleteMenuPreparaciones(item.id).toPromise();
                      }
                      await this.messageService.showInfo("Borrado Correctamente", 'top center')
                      await this.mostrarprepa();
                    },
                    err => {
                      // Manejo de errores
                    }
                  );
                }
              }
            }
          }
        );
      }

    } else {

      if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
          //preparacion

          await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

          await this.messageService.showInfo("Borrado Correctamente", 'top center');
          await this.mostrarprepa();
        } else {
          //producto
          await this._MenuProductosService.deleteMenuProductos(element.id).toPromise();
          await this.messageService.showInfo("Borrado Correctamente", 'top center');
          await this.mostrarprodu();
        }


      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
        await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

        await this.messageService.showInfo("Borrado Correctamente", 'top center');
        await this.mostrarprepa();


      } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
        let g = this.CicloMenuObject.iD_TipoModalidadComplemento == 3 ? 1 : this.CicloMenuObject.iD_TipoModalidadComplemento;

        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          async (response: any) => {
            let o = response;

            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento);
              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                async (response: any) => {
                  //this.procesarRespuesta(response, g);

                  if (response[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                      //preparacion

                      await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

                      await this.messageService.showInfo("Borrado Correctamente", 'top center');
                      await this.mostrarprepa();
                    } else {
                      //producto
                      await this._MenuProductosService.deleteMenuProductos(element.id).toPromise();
                      await this.messageService.showInfo("Borrado Correctamente", 'top center');
                      await this.mostrarprodu();
                    }
                  } else if (response[0].iD_TipoModeloOperacionBase == 2) {
                    await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

                    await this.messageService.showInfo("Borrado Correctamente", 'top center');
                    await this.mostrarprepa();
                  }
                }
              );
            } else {
              //this.procesarRespuesta(o, g);
              if (o[0].iD_TipoModeloOperacionBase == 1) {
                if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                  //preparacion

                  await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

                  await this.messageService.showInfo("Borrado Correctamente", 'top center');
                  await this.mostrarprepa();
                } else {
                  //producto
                  await this._MenuProductosService.deleteMenuProductos(element.id).toPromise();
                  await this.messageService.showInfo("Borrado Correctamente", 'top center');
                  await this.mostrarprodu();
                }
              } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                await this._MenuPreparacionesService.deleteMenuPreparaciones(element.id).toPromise();

                await this.messageService.showInfo("Borrado Correctamente", 'top center');
                await this.mostrarprepa();
              }
            }
          }
        );
      }

    }
  }
  openDialogIngredientes(action: string, obj: any): void {
    obj.action = action;
    let m = 0
    this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, this.CicloMenuObject.iD_TipoComplemento).subscribe(
      (response: any) => {
        let g = response;

        if (g.length == 0) {
          let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, j[0].id).subscribe(
            (response: any) => {
              let u = response
              if (u.length) { } else { m = u }
            })
        } else {
          m = g
        }

        const dialogRef = this.dialog.open(DialogPTNPreparacionContent, {
          data: { ciclo: this.CicloMenuObject, minu: m, obj }


        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.event === 'Adicionar') {
            this.addRowDataIngredientes(result.data);
          } else if (result.event === 'Actualizar') {
            //this.updateRowData(result.data);
          } else if (result.event === 'Eliminar') {
            //this.deleteRowData(result.data);
          } else if (result.event === 'Cerrar') {
            // this.ngOnInit();
          }
        });
      }



    )

  }



  dataComponentesCrea() {
    // if (this.dataComponentes.length == 7) {

    // } else {
    this.dataComponentes = [];
    this.dataComponentes.push({
      id: 1,
      nombre: 'Grupo I. Cereales, raíces, tubérculos y plátanos',
      valor: 0,
      rango: 0,
      pasatodos: '',

    });
    this.dataComponentes.push({
      id: 2,
      nombre: 'Grupo II. Frutas y verduras',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    this.dataComponentes.push({
      id: 3,
      nombre: 'Grupo III. Leche y productos lácteos',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    this.dataComponentes.push({
      id: 4,
      nombre: 'Grupo IV. Carnes, huevos, leguminosas secas, frutos secos y semillas',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    this.dataComponentes.push({
      id: 5,
      nombre: 'Grupo V. Grasas (Cantidades incluidas dentro de las preparaciones)',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    this.dataComponentes.push({
      id: 6,
      nombre: 'Grupo VI. Azúcares (Postre)',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    this.dataComponentes.push({
      id: 7,
      nombre: 'Grupo VII. Agua apta para el consumo humano',
      valor: 0,
      rango: 0,
      pasatodos: '',
    });
    // }
  }






  dataComponentesActualizaxIntercambios(ParametrosIntercambios: PA_ValidaIntercambiosPiv) {
    // this.dataComponentesCrea();
    /*  let tempoDataComponentesTodos = [...this.dataComponentes]
     this.ListIntercambiosDiarios = []; */
    this._PA_ValidaIntercambiosService.getPA_ValidaIntercambiosList(ParametrosIntercambios).subscribe(
      (response) => {

        this.dataComponentes = response;

      },
      (err) => {
      }
    )

  }






  addRowDataIngredientes(row_obj): void {
    //this.MenuPreparacionesObject2=row_obj;

    this.semanaid = false;
    this.semanamaerid = false;
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      if (this.CicloMenuObject.menusParaTodosNiveles == true) {
        let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);

        this._PA_InsertarMenuPreparacionesXdiaService.getPA_InsertarMenuPreparacionesXdiaList(this.CicloMenuObject.id, row_obj.iD_Producto, t[0].iD_Semana2, t[0].numeroDia, null).subscribe(
          (response: any) => {

            let h = response;
            this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');

            this.mostrarprepa1();

          },
          (err) => {
          }
        )


      } else {

        let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.gradoid);
        t.forEach(item => {
          this.MenuPreparacionesObject.iD_Menu = item.id;
          this.MenuPreparacionesObject.iD_Preparacion = row_obj.iD_Producto
          this.MenuPreparacionesObject.nombre = row_obj.siD_Producto
          this._MenuPreparacionesService.addMenuPreparaciones(this.MenuPreparacionesObject).subscribe(
            (response: any) => {
              this.mostrarprepa1();




            },
            (err) => {
            }
          )

        })
      }

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      if (this.selectedTabIndex == 0) {
        let com = this.tabs2[0].files[0];
        this.diasText = com.nombre;
      } else {
        let com = this.tabs2[0].files[this.selectedTabIndex];
        this.diasText = com.nombre;
      }

      let t = this.MenuPTNObject.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);
      t.forEach(item => {
        this.MenuPreparacionesObject.iD_Menu = item.id;
        this.MenuPreparacionesObject.iD_Preparacion = row_obj.iD_Producto
        this.MenuPreparacionesObject.nombre = row_obj.siD_Producto
        this._MenuPreparacionesService.addMenuPreparaciones(this.MenuPreparacionesObject).subscribe(
          (response: any) => {
            this.MenuPreparacionesObject2 = response
            this.MenuPTNObject.map(item => {
              if (item.iD_Semana == this.numeroSemana && item.nombre == this.diasText) {
                item.productos = response;
              }
            })

            this.mostrarprepa1();


          },
          (err) => {
          }
        )

      })


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, this.CicloMenuObject.iD_TipoModalidadComplemento, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          let m = response;
          if (m[0].iD_TipoModeloOperacionBase == 1) {
            if (this.CicloMenuObject.menusParaTodosNiveles == true) {

              let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);
              this._PA_InsertarMenuPreparacionesXdiaService.getPA_InsertarMenuPreparacionesXdiaList(this.CicloMenuObject.id, row_obj.iD_Producto, t[0].iD_Semana2, t[0].numeroDia, null).subscribe(
                (response: any) => {

                  let h = response;
                  this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');

                  this.mostrarprepa1();

                },
                (err) => {
                }
              )

            } else {

              let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.gradoid);

              t.forEach(item => {
                this.MenuPreparacionesObject.iD_Menu = item.id;
                this.MenuPreparacionesObject.iD_Preparacion = row_obj.iD_Producto
                this.MenuPreparacionesObject.nombre = row_obj.siD_Producto
                this._MenuPreparacionesService.addMenuPreparaciones(this.MenuPreparacionesObject).subscribe(
                  (response: any) => {
                    this.MenuPreparacionesObject2 = response
                    this.MenuPTNObject4.map(item => {
                      if (item.iD_Semana == this.numeroSemana && item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.gradoid) {
                        item.productos = response;
                      }
                    })

                    this.MenuPreparacionesObject3.push({
                      sID: '',
                      id: response.id,
                      iD_Preparacion: response.iD_Preparacion,
                      sID_Preparacion: '',
                      iD_Menu: response.iD_Menu,
                      sID_Menu: '',
                      nombre: response.nombre,
                      auditoria: '',
                      semana: this.numeroSemana,
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
                    })
                    this.mostrarprepa1();

                  },
                  (err) => {
                  }
                )

              })


            }
          } else if (m[0].iD_TipoModeloOperacionBase == 2) {
            let t = this.MenuPTNObject.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);
            t.forEach(item => {
              this.MenuPreparacionesObject.iD_Menu = item.id;
              this.MenuPreparacionesObject.iD_Preparacion = row_obj.iD_Producto
              this.MenuPreparacionesObject.nombre = row_obj.siD_Producto
              this._MenuPreparacionesService.addMenuPreparaciones(this.MenuPreparacionesObject).subscribe(
                (response: any) => {
                  this.MenuPreparacionesObject2 = response
                  this.MenuPTNObject.map(item => {
                    if (item.iD_Semana == this.numeroSemana && item.nombre == this.diasText) {
                      item.productos = response;
                    }
                  })




                },
                (err) => {
                }
              )

            })
            this.mostrarprepa1();
          }
        })


    }


  }
  openDialogIngredientesP(action: string, obj: any): void {
    obj.action = action;
    let m = this.MinutasList.filter(item => item.id == this.CicloMenuObject.iD_MinutaAprobacion);
    const dialogRef = this.dialog.open(DialogPTNProduCicloContent, {
      data: { ciclo: this.CicloMenuObject, minu: m, obj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowDataIngredientes2(result.data);
      } else if (result.event === 'Actualizar') {
        //this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        //this.deleteRowData(result.data);
      } else if (result.event === 'Cerrar') {
        // this.ngOnInit();
      }
    });
  }
  addRowDataIngredientes2(row_obj): void {
    //this.MenuPreparacionesObject2=row_obj;
    if (this.CicloMenuObject.menusParaTodosNiveles == true) {
      let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);
      t.forEach(item => {
        this.MenuProductosObject.iD_Menu = item.id;
        this.MenuProductosObject.iD_Producto = row_obj.iD_Producto;
        this._MenuProductosService.addMenuProductos(this.MenuProductosObject).subscribe(
          (response: any) => {
            this.MenuPreparacionesObject2 = response
            this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');
            this.MenuPTNObject3.map(item => {
              if (item.iD_Semana == this.numeroSemana) {
                item.productos = response;
              }
            })

            this.MenuPreparacionesObject3.push({
              sID: '',
              id: response.id,
              iD_Preparacion: response.iD_Preparacion,
              sID_Preparacion: '',
              iD_Menu: response.iD_Menu,
              sID_Menu: '',
              nombre: response.nombre,
              auditoria: '',
              semana: this.numeroSemana,
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
            })


          },
          (err) => {
          }
        )
      })

      this._productosService.getProductosListRelationfilter3(row_obj.iD_Producto).subscribe(
        (res: any) => {
          this._TipoCompGrupoSubgrupoAliService.getTipoCompGrupoSubgrupoAliListfilter2(res[0].iD_SubGrupoAlimentos, 1, 2).subscribe(
            (resp: any) => {

              let h = resp;
              h.forEach(element => {
                t.forEach(item => {
                  this.MenuComponentesObject2.iD_Menu = item.id;

                  this.MenuComponentesObject2.iD_TipoComponente = element.iD_TipoComponente;
                  this.MenuComponentesObject2.iD_Preparacion = row_obj.iD_Producto;

                  this._MenuComponentesService.addMenuComponentes(this.MenuComponentesObject2).subscribe(
                    (response: any) => {

                      let l = response;

                    },
                    (err) => {
                    }
                  )
                })
              });
              this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');
              this.mostrarprodu();
            },
            (err) => {
            }
          )



        },
        (err) => {
        }
      );


    } else {

      let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText && item.iD_TipoNivelEducativo == this.gradoid);

      t.forEach(item => {
        this.MenuProductosObject.iD_Menu = item.id;
        this.MenuProductosObject.iD_Producto = row_obj.iD_Producto;
        this._MenuProductosService.addMenuProductos(this.MenuProductosObject).subscribe(
          (response: any) => {
            this.MenuPreparacionesObject2 = response
            this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');
            this.MenuPTNObject3.map(item => {
              if (item.iD_Semana == this.numeroSemana) {
                item.productos = response;
              }
            })

            this.MenuPreparacionesObject3.push({
              sID: '',
              id: response.id,
              iD_Preparacion: response.iD_Preparacion,
              sID_Preparacion: '',
              iD_Menu: response.iD_Menu,
              sID_Menu: '',
              nombre: response.nombre,
              auditoria: '',
              semana: this.numeroSemana,
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
            })


          },
          (err) => {
          }
        )
      })
      this._productosService.getProductosListRelationfilter3(row_obj.iD_Producto).subscribe(
        (res: any) => {
          this._TipoCompGrupoSubgrupoAliService.getTipoCompGrupoSubgrupoAliListfilter2(res[0].iD_SubGrupoAlimentos, 1, 2).subscribe(
            (resp: any) => {

              let h = resp;
              h.forEach(element => {
                t.forEach(item => {
                  this.MenuComponentesObject2.iD_Menu = item.id;
                  this.MenuComponentesObject2.iD_TipoComponente = element.iD_TipoComponente;
                  this.MenuComponentesObject2.iD_Preparacion = row_obj.iD_Producto;
                  this._MenuComponentesService.addMenuComponentes(this.MenuComponentesObject2).subscribe(
                    (response: any) => {

                      let l = response;


                    },
                    (err) => {
                    }
                  )
                })
              });
              this.messageService.showInfo('Se insertaron correctamente los datos ', 'top right');
              this.mostrarprodu();
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
  agregarprepa(row_obj): void {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

      if (this.CicloMenuObject.menusParaTodosNiveles == true) {
        if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
          let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.productos.length == 0 && item.id != 0);

          let h = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);
          if (t.length == h.length) {
            //let j = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana-1 && item2.nombre=='Día '+ (this.numeroSemana-1)  && item2.iD_TipoNivelEducativo==this.gradoid);


            if (this.dataArrayPre == undefined) { } else {
              this.dataArrayPre.forEach(element => {
                t.forEach(item => {
                  this.MenuPreparacionesObject.iD_Menu = item.id;
                  this.MenuPreparacionesObject.iD_Preparacion = element.iD_Preparacion;
                  this.MenuPreparacionesObject.nombre = element.nombre;
                  let idx = this.MenuPTNObject3.findIndex(item2 => item2.iD_Semana == item.iD_Semana && item2.iD_Semana2 == item.iD_Semana2 && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && item2.numeroDia == item.numeroDia && item2.nombre == item.nombre);

                  this._MenuPreparacionesService.addMenuPreparaciones(this.MenuPreparacionesObject).subscribe(
                    (response: any) => {

                      this.MenuPTNObject3.map(item => {
                        if (item.iD_Semana == this.numeroSemana && this.MenuPTNObject3[idx].id == item.id) {
                          item.productos = response;
                        }
                      })


                      this.MenuPreparacionesObject3 = response;

                    },
                    (err) => {
                    }
                  )


                })
                this._ComponentesPreparacionService.getComponentesPreparacionListfilter(element.iD_Preparacion).subscribe(
                  (response: any) => {

                    let h = response;
                    h.forEach(element => {
                      t.forEach(item => {
                        this.MenuComponentesObject2.iD_Menu = item.id;

                        this.MenuComponentesObject2.iD_TipoComponente = element.iD_TipoComponente;

                        this._MenuComponentesService.addMenuComponentes(this.MenuComponentesObject2).subscribe(
                          (response: any) => {

                            let l = response;
                            this.dataArrayPre.length
                            this.mostrarprepa();
                          },
                          (err) => {
                          }
                        )
                      })
                    });
                  },
                  (err) => {
                  }
                );
              });
            }
            //TODO  this.mostrarprepa();

          } else {
            //this.mostrarprepa();

          }



        } else {
          let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.productos.length == 0 && item.id != 0);

          let h = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);
          this.dataArrayProd
          if (t.length == h.length) {
            //let j = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana-1 && item2.nombre=='Día '+ (this.numeroSemana-1)  && item2.iD_TipoNivelEducativo==this.gradoid);


            this.dataArrayProd.forEach(element => {
              t.forEach(item => {
                this.MenuProductosObject.iD_Menu = item.id;
                this.MenuProductosObject.iD_Producto = element.iD_Producto;
                this.MenuProductosObject.sID_Producto = element.nombre
                let idx = this.MenuPTNObject3.findIndex(item2 => item2.iD_Semana == item.iD_Semana && item2.iD_Semana2 == item.iD_Semana2 && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && item2.numeroDia == item.numeroDia && item2.nombre == item.nombre);

                this._MenuProductosService.addMenuProductos(this.MenuProductosObject).subscribe(
                  (response: any) => {

                    this.MenuPTNObject3.map(item => {
                      if (item.iD_Semana == this.numeroSemana && this.MenuPTNObject3[idx].id == item.id) {
                        item.productos = response;
                      }
                    })


                    this.MenuPreparacionesObject3 = response;

                  },
                  (err) => {
                  }
                )


              })

              this._productosService.getProductosListRelationfilter3(element.iD_Producto).subscribe(
                (res: any) => {
                  this._SubGrupoAlimentosService.getSubGrupoAlimentosListFilter2(res[0].iD_SubGrupoAlimentos).subscribe(
                    (res: any) => {
                      this._GrupoAlimentosService.getGrupoAlimentosListfilter(res[0].iD_GrupoAlimento).subscribe(
                        (res: any) => {
                          this._TiposComponenteService.getTiposComponenteListfilter(res[0].iD_TipoComponente).subscribe(
                            (res: any) => {
                              let h = res;
                              h.forEach(element => {
                                t.forEach(item => {
                                  this.MenuComponentesObject2.iD_Menu = item.id;

                                  this.MenuComponentesObject2.iD_TipoComponente = element.id;

                                  this._MenuComponentesService.addMenuComponentes(this.MenuComponentesObject2).subscribe(
                                    (response: any) => {

                                      let l = response;
                                      this.mostrarprodu();
                                    },
                                    (err) => {
                                    }
                                  )
                                })
                              });


                            },
                            (err) => {
                            }
                          )


                        },
                        (err) => {
                        }
                      )
                    },
                    (err) => {
                    })
                },
                (err) => {
                }
              );


            });
          } else {

          }
        }



      } else {

      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) { }
  }

  mostrarprepa() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let h = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);


      if (h.length == 0) {
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.Preparaciones = false;
          this.validacionesEstado();
        }
      } else {


        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
          (response: any) => {

            this.dataArrayPre = response;
            this.isLoading = false;
            if (this.dataArrayPre.length > 0) {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
            }
            else {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
            }
            this.validacionesEstado();
            this.mostrarmenucom();



          },
          (err) => {
          }
        )
      }


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

      let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);


      if (h.length == 0) {

      } else {
        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
          (response: any) => {

            this.dataArrayPre = response;

            this.isLoading = false;
            if (this.dataArrayPre.length > 0) {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

            }
            else {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
            }
            this.validacionesEstado();
            this.mostrarmacromicro();


          },
          (err) => {
          }
        )
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


      if (this.dataMinutaPatron == undefined) {
        let g = 0
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          g = 1;
        } else {
          g = this.CicloMenuObject.iD_TipoModalidadComplemento;
        }
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let o = response;

            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  let p = response;
                  if (p.length == 0) { } else {
                    if (p[0].iD_TipoModeloOperacionBase == 1) {
                      let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                      if (h.length == 0) {
                        this.validacionesEstado();

                      } else {
                        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                          (response: any) => {

                            this.dataArrayPre = response;

                            this.isLoading = false;
                            if (this.dataArrayPre.length > 0) {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                            }
                            else {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                            }
                            this.validacionesEstado();
                            this.mostrarmenucom();


                          },
                          (err) => {
                          }
                        )
                      }
                    } else if (p[0].iD_TipoModeloOperacionBase == 2) {

                      let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                      if (h.length == 0) {
                        this.validacionesEstado();
                      } else {
                        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                          (response: any) => {

                            this.dataArrayPre = response;

                            this.isLoading = false;
                            if (this.dataArrayPre.length > 0) {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                            }
                            else {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                            }
                            this.validacionesEstado();
                            this.mostrarmacromicro();



                          },
                          (err) => {
                          }
                        )
                      }
                    }
                  }
                })
            } else {

              if (o[0].iD_TipoModeloOperacionBase == 1) {
                let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);

                if (h.length == 0) {
                  this.validacionesEstado();

                } else {
                  this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                    (response: any) => {

                      this.dataArrayPre = response;

                      this.isLoading = false;
                      if (this.dataArrayPre.length > 0) {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                      }
                      else {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                      }
                      this.validacionesEstado();
                      this.mostrarmenucom();


                    },
                    (err) => {
                    }
                  )
                }
              } else if (o[0].iD_TipoModeloOperacionBase == 2) {

                let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                if (h.length == 0) {
                  this.validacionesEstado();
                } else {
                  this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                    (response: any) => {

                      this.dataArrayPre = response;

                      this.isLoading = false;
                      if (this.dataArrayPre.length > 0) {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                      }
                      else {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                      }
                      this.validacionesEstado();
                      this.mostrarmacromicro();



                    },
                    (err) => {
                    }
                  )
                }
              }
            }
          })


      } else {
        if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
          let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
          if (h.length == 0) {
            this.validacionesEstado();
          } else {
            this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
              (response: any) => {

                this.dataArrayPre = response;

                this.isLoading = false;
                if (this.dataArrayPre.length > 0) {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
                }
                else {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                }
                this.validacionesEstado();
                this.mostrarmenucom();
              },
              (err) => {
              }
            )
          }
        } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {

          let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
          if (h.length == 0) {
            this.validacionesEstado();
          } else {
            this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
              (response: any) => {

                this.dataArrayPre = response;

                this.isLoading = false;
                if (this.dataArrayPre.length > 0) {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
                }
                else {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                }
                this.validacionesEstado();
                this.mostrarmacromicro();



              },
              (err) => {
              }
            )
          }
        }
      }

    }


  }

  mostrarprepa1() {

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let h = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);


      if (h.length == 0) {
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.Preparaciones = false;
          this.validacionesEstado();
        }
      } else {


        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
          async (response: any) => {

            this.dataArrayPre = response;
            this.isLoading = false;
            if (this.dataArrayPre.length > 0) {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
            }
            else {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
            }
            await this.validacionesEstado();
            await this.mostrarmenucom();



          },
          (err) => {
          }
        )
      }


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

      let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);


      if (h.length == 0) {

      } else {
        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
          (response: any) => {

            this.dataArrayPre = response;

            this.isLoading = false;
            if (this.dataArrayPre.length > 0) {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

            }
            else {
              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
            }
            this.validacionesEstado();
            this.mostrarmacromicro();


          },
          (err) => {
          }
        )
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


      if (this.dataMinutaPatron == undefined) {
        let g = 0
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          g = 1;
        } else {
          g = this.CicloMenuObject.iD_TipoModalidadComplemento;
        }
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let o = response;

            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  let p = response;
                  if (p.length == 0) { } else {
                    if (p[0].iD_TipoModeloOperacionBase == 1) {
                      let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                      if (h.length == 0) {
                        this.validacionesEstado();

                      } else {
                        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                          (response: any) => {

                            this.dataArrayPre = response;

                            this.isLoading = false;
                            if (this.dataArrayPre.length > 0) {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                            }
                            else {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                            }
                            this.validacionesEstado();
                            this.mostrarmenucom();


                          },
                          (err) => {
                          }
                        )
                      }
                    } else if (p[0].iD_TipoModeloOperacionBase == 2) {

                      let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                      if (h.length == 0) {

                      } else {
                        this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                          (response: any) => {

                            this.dataArrayPre = response;

                            this.isLoading = false;
                            if (this.dataArrayPre.length > 0) {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                            }
                            else {
                              this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                            }
                            this.validacionesEstado();
                            this.mostrarmacromicro();



                          },
                          (err) => {
                          }
                        )
                      }
                    }
                  }
                })
            } else {
              if (o[0].iD_TipoModeloOperacionBase == 1) {
                let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);

                if (h.length == 0) {


                } else {
                  this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                    (response: any) => {

                      this.dataArrayPre = response;

                      this.isLoading = false;
                      if (this.dataArrayPre.length > 0) {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                      }
                      else {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                      }
                      this.validacionesEstado();
                      this.mostrarmenucom();


                    },
                    (err) => {
                    }
                  )
                }
              } else if (o[0].iD_TipoModeloOperacionBase == 2) {

                let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                if (h.length == 0) {

                } else {
                  this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
                    (response: any) => {

                      this.dataArrayPre = response;

                      this.isLoading = false;
                      if (this.dataArrayPre.length > 0) {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);

                      }
                      else {
                        this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                      }
                      this.validacionesEstado();
                      this.mostrarmacromicro();



                    },
                    (err) => {
                    }
                  )
                }
              }
            }
          })


      } else {
        if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
          let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
          if (h.length == 0) {

          } else {
            this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
              (response: any) => {

                this.dataArrayPre = response;

                this.isLoading = false;
                if (this.dataArrayPre.length > 0) {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
                }
                else {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                }
                this.validacionesEstado();
                this.mostrarmenucom();
              },
              (err) => {
              }
            )
          }
        } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {

          let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
          if (h.length == 0) {

          } else {
            this._PA_MenuPreparacionesService.getPA_MenuPreparacionesList(h[0].id).subscribe(
              (response: any) => {

                this.dataArrayPre = response;

                this.isLoading = false;
                if (this.dataArrayPre.length > 0) {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayPre);
                }
                else {
                  this.dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>(this.dataArrayEmpty);
                }
                this.validacionesEstado();
                this.mostrarmacromicro();



              },
              (err) => {
              }
            )
          }
        }
      }

    }


  }



  validacionesEstado() {


    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {


      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
        //prepa
        if (this.idCiclo > 0) {

          const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject3, this.numeroSemana);
          if (primero !== undefined && ultimo !== undefined) {
            this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
              (response: any) => {

                let pre = response;

                let com = this.tabs2[0].files;
                let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);

                // Define arrays para almacenar los resultados de filtrarDatos
                const preArray = [];
                const tArray = [];
                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                com.forEach((item, index) => {
                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                  tArray[index] = filteredT;
                  preArray[index] = filteredPre;
                });
                // Función para manejar la actualización del estado
                const actualizarEstadoParaItem = (item: any, index: number) => {
                  if (index < preArray.length && index < tArray.length) {
                    this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                  }
                };
                // Primero recorre todo el array para actualizar los estados según los datos en pre
                com.forEach((item, index) => {
                  actualizarEstadoParaItem(item, index);
                });
                // Luego, actualiza this.diasText con el nombre del día seleccionado
                let com1 = this.tabs2[0].files[this.selectedTabIndex];
                this.diasText = com1.nombre;

                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                com.forEach((item, index) => {
                  if (this.diasText === item.nombre) {
                    actualizarEstadoParaItem(item, index);
                  }
                });


              },
              (err) => {
              }
            )
          }
        } else {
         
          if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {

            const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject3, this.numeroSemana);

            if (primero !== undefined && ultimo !== undefined) {
              this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                (response: any) => {
                  let pre = response;
                  
                
                  let com = this.tabs2[0].files;
                  let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);
                  // Define arrays para almacenar los resultados de filtrarDatos
                  const preArray = [];
                  const tArray = [];
                  // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                  com.forEach((item, index) => {
                    const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                    tArray[index] = filteredT;
                    preArray[index] = filteredPre;
                  });
                  // Función para manejar la actualización del estado
                  const actualizarEstadoParaItem = (item: any, index: number) => {
                    if (index < preArray.length && index < tArray.length) {
                      this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                    }
                  };
                  // Si this.diasText está definido, actualiza el estado para el día seleccionado
                  com.forEach((item, index) => {
                    if (this.diasText === item.nombre) {
                      actualizarEstadoParaItem(item, index);
                    }
                  });




                },
                (err) => {
                }
              )
            }
          } else {

            let t = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo==this.gradoid );

            
            if (t.length > 0 && t.every(item => item.hasOwnProperty('id'))) {
              t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
              let primero = t[0].id;
              let ultimo = t[t.length - 1].id;
              this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                (response: any) => {

                  let pre = response;
                  
                  let com = this.tabs2[0].files;
                  // Define arrays para almacenar los resultados de filtrarDatos
                  const preArray = [];
                  const tArray = [];
                  // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                  com.forEach((item, index) => {
                    const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                    tArray[index] = filteredT;
                    preArray[index] = filteredPre;
                  });
                  // Función para manejar la actualización del estado
                  const actualizarEstadoParaItem = (item: any, index: number) => {
                    if (index < preArray.length && index < tArray.length) {
                      this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                    }
                  };
                  // Si this.diasText está definido, actualiza el estado para el día seleccionado
                  com.forEach((item, index) => {
                    if (this.diasText === item.nombre) {
                      actualizarEstadoParaItem(item, index);
                    }
                  });



                },
                (err) => {
                }
              )
            } else {
              console.warn('No hay elementos válidos en t o algunos elementos no tienen id');
            }

          }
        }
      } else {
        //prod

        if (this.idCiclo > 0) {
          const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject3, this.numeroSemana);
          if (primero !== undefined && ultimo !== undefined) {
            this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
              (response: any) => {

                let pre = response;

                let com = this.tabs2[0].files;
                let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);
                // Define arrays para almacenar los resultados de filtrarDatos
                const preArray = [];
                const tArray = [];
                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                com.forEach((item, index) => {
                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                  tArray[index] = filteredT;
                  preArray[index] = filteredPre;
                });
                // Función para manejar la actualización del estado
                const actualizarEstadoParaItem = (item: any, index: number) => {
                  if (index < preArray.length && index < tArray.length) {
                    this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                  }
                };
                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                com.forEach((item, index) => {
                  if (this.diasText === item.nombre) {
                    actualizarEstadoParaItem(item, index);
                  }
                });

              },
              (err) => {
              }
            )
          }
        }
        else {
          if (Array.isArray(this.dataArrayProd) && this.dataArrayProd.length > 0) {
            const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject3, this.numeroSemana);

            if (primero !== undefined && ultimo !== undefined) {
              this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                (response: any) => {

                  let pre = response;

                  let com = this.tabs2[0].files;
                  let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana);
                  // Define arrays para almacenar los resultados de filtrarDatos
                  const preArray = [];
                  const tArray = [];
                  // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                  com.forEach((item, index) => {
                    const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                    tArray[index] = filteredT;
                    preArray[index] = filteredPre;
                  });
                  // Función para manejar la actualización del estado
                  const actualizarEstadoParaItem = (item: any, index: number) => {
                    if (index < preArray.length && index < tArray.length) {
                      this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                    }
                  };
                  // Si this.diasText está definido, actualiza el estado para el día seleccionado
                  com.forEach((item, index) => {
                    if (this.diasText === item.nombre) {
                      actualizarEstadoParaItem(item, index);
                    }
                  });

                },
                (err) => {
                }
              )
            }
          } else {
            let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);

            // Verificar si 't' tiene elementos antes de continuar
            if (t.length > 0) {
              t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
              let primero = t[0].id;
              let ultimo = t[t.length - 1].id;

              // Aquí puedes continuar con la lógica que sigue
              this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                (response: any) => {

                  let pre = response;

                  let com = this.tabs2[0].files;
                  // Define arrays para almacenar los resultados de filtrarDatos
                  const preArray = [];
                  const tArray = [];
                  // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                  com.forEach((item, index) => {
                    const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                    tArray[index] = filteredT;
                    preArray[index] = filteredPre;
                  });
                  // Función para manejar la actualización del estado
                  const actualizarEstadoParaItem = (item: any, index: number) => {
                    if (index < preArray.length && index < tArray.length) {
                      this.actualizarEstado.call(this, preArray[index], tArray[index], com);
                    }
                  };

                  // Si this.diasText está definido, actualiza el estado para el día seleccionado
                  com.forEach((item, index) => {
                    if (this.diasText === item.nombre) {
                      actualizarEstadoParaItem(item, index);
                    }
                  });

                },
                (err) => {
                }
              )
            } else {
              console.error("No se encontraron elementos en el filtro.");
              // Aquí puedes manejar el caso en que 't' esté vacío
            }


          }
        }
      }




    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

      if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {
        if (this.selectedTabIndex == 0) {
          let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana);
          h.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
          if (h.length == 0) {
          } else {
            this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(h[0].id, h[h.length - 1].id).subscribe(
              (response: any) => {

                let pre = response;
                let com = this.tabs2[0].files;
                pre.forEach(ele => {
                  com.forEach(item => {
                    if (item.nombre === ele.sID_Menu) {
                      item.estado = 'Completo'
                    } else { }

                  })
                })



              },
              (err) => {
              }
            )
          }


        } else {
          //

          if (this.tabs2 != null && this.selectedTabIndex != null) {
            let com = this.tabs2[0].files;
            let com1 = this.tabs2[0].files[this.selectedTabIndex];
            com.forEach(item => {
              if (item.nombre === com1.nombre) {
                item.estado = 'Completo'
              } else { }
            })
          }
        }
      } else {
        let com = this.tabs2[0].files;
            let com1 = this.tabs2[0].files[this.selectedTabIndex];
            com.forEach(item => {
              if (item.nombre === com1.nombre) {
                item.estado = 'Pendiente'
              } else { }
            })
      }

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {

      let g = this.CicloMenuObject.iD_TipoModalidadComplemento == 3 ? 1 : this.CicloMenuObject.iD_TipoModalidadComplemento;
      this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
        (response: any) => {
          let o = response;


          if (o.length == 0) {

            let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
              (response: any) => {
                let p = response;
                if (p.length == 0) { } else {
                  if (p[0].iD_TipoModeloOperacionBase == 1) {
                    if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                      //prepa
                      if (this.idCiclo > 0) {

                        const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                        if (primero !== undefined && ultimo !== undefined) {
                          this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                            (response: any) => {

                              let pre = response;

                              let com = this.tabs2[0].files;
                              let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);

                              // Define arrays para almacenar los resultados de filtrarDatos
                              const preArray = [];
                              const tArray = [];
                              // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                              com.forEach((item, index) => {
                                const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                tArray[index] = filteredT;
                                preArray[index] = filteredPre;
                              });
                              // Función para manejar la actualización del estado
                              const actualizarEstadoParaItem = (item: any, index: number) => {
                                if (index < preArray.length && index < tArray.length) {
                                  this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                }
                              };
                              // Primero recorre todo el array para actualizar los estados según los datos en pre
                              com.forEach((item, index) => {
                                actualizarEstadoParaItem(item, index);
                              });
                              // Luego, actualiza this.diasText con el nombre del día seleccionado
                              let com1 = this.tabs2[0].files[this.selectedTabIndex];
                              this.diasText = com1.nombre;

                              // Si this.diasText está definido, actualiza el estado para el día seleccionado
                              com.forEach((item, index) => {
                                if (this.diasText === item.nombre) {
                                  actualizarEstadoParaItem(item, index);
                                }
                              });

                            },
                            (err) => {
                            }
                          )
                        }
                      } else {
                        if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {

                          const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                          if (primero !== undefined && ultimo !== undefined) {
                            this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                              (response: any) => {

                                let pre = response;

                                let com = this.tabs2[0].files;
                                let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);
                                // Define arrays para almacenar los resultados de filtrarDatos
                                const preArray = [];
                                const tArray = [];
                                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                                com.forEach((item, index) => {
                                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                  tArray[index] = filteredT;
                                  preArray[index] = filteredPre;
                                });
                                // Función para manejar la actualización del estado
                                const actualizarEstadoParaItem = (item: any, index: number) => {
                                  if (index < preArray.length && index < tArray.length) {
                                    this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                  }
                                };
                                // Primero recorre todo el array para actualizar los estados según los datos en pre
                                com.forEach((item, index) => {
                                  actualizarEstadoParaItem(item, index);
                                });
                                // Luego, actualiza this.diasText con el nombre del día seleccionado
                                let com1 = this.tabs2[0].files[this.selectedTabIndex];
                                this.diasText = com1.nombre;

                                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                                com.forEach((item, index) => {
                                  if (this.diasText === item.nombre) {
                                    actualizarEstadoParaItem(item, index);
                                  }
                                });

                              },
                              (err) => {
                              }
                            )
                          }
                        } else {

                          let t = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo==this.gradoid);

                          // Verificar si 't' tiene elementos antes de continuar
                          if (t.length > 0) {
                            t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                            let primero = t[0].id;
                            let ultimo = t[t.length - 1].id;

                            // Aquí puedes continuar con la lógica que sigue
                            this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                              (response: any) => {

                                let pre = response;
                                let com = this.tabs2[0].files;

                                // Define arrays para almacenar los resultados de filtrarDatos
                                const preArray = [];
                                const tArray = [];
                                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                                com.forEach((item, index) => {
                                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                  tArray[index] = filteredT;
                                  preArray[index] = filteredPre;
                                });
                                // Función para manejar la actualización del estado
                                const actualizarEstadoParaItem = (item: any, index: number) => {
                                  if (index < preArray.length && index < tArray.length) {
                                    this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                  }
                                };
                                // Primero recorre todo el array para actualizar los estados según los datos en pre
                                com.forEach((item, index) => {
                                  actualizarEstadoParaItem(item, index);
                                });
                                // Luego, actualiza this.diasText con el nombre del día seleccionado
                                let com1 = this.tabs2[0].files[this.selectedTabIndex];
                                this.diasText = com1.nombre;

                                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                                com.forEach((item, index) => {
                                  if (this.diasText === item.nombre) {
                                    actualizarEstadoParaItem(item, index);
                                  }
                                });

                              },
                              (err) => {
                              }
                            )

                          } else {
                            console.error("No se encontraron elementos en el filtro.");
                            // Aquí puedes manejar el caso en que 't' esté vacío
                          }





                        }
                      }

                    } else {
                      //prod

                      if (this.idCiclo > 0) {
                        const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                        if (primero !== undefined && ultimo !== undefined) {

                          this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                            (response: any) => {

                              let pre = response;

                              let com = this.tabs2[0].files;
                              let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);
                              // Define arrays para almacenar los resultados de filtrarDatos
                              const preArray = [];
                              const tArray = [];
                              // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                              com.forEach((item, index) => {
                                const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                tArray[index] = filteredT;
                                preArray[index] = filteredPre;
                              });
                              // Función para manejar la actualización del estado
                              const actualizarEstadoParaItem = (item: any, index: number) => {
                                if (index < preArray.length && index < tArray.length) {
                                  this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                }
                              };
                              // Primero recorre todo el array para actualizar los estados según los datos en pre
                              com.forEach((item, index) => {
                                actualizarEstadoParaItem(item, index);
                              });
                              // Luego, actualiza this.diasText con el nombre del día seleccionado
                              let com1 = this.tabs2[0].files[this.selectedTabIndex];
                              this.diasText = com1.nombre;

                              // Si this.diasText está definido, actualiza el estado para el día seleccionado
                              com.forEach((item, index) => {
                                if (this.diasText === item.nombre) {
                                  actualizarEstadoParaItem(item, index);
                                }
                              });

                            },
                            (err) => {
                            }
                          )
                        }
                      }
                      else {
                        if (Array.isArray(this.dataArrayProd) && this.dataArrayProd.length > 0) {
                          const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                          if (primero !== undefined && ultimo !== undefined) {
                            this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                              (response: any) => {

                                let pre = response;

                                let com = this.tabs2[0].files;
                                let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);

                                // Define arrays para almacenar los resultados de filtrarDatos
                                const preArray = [];
                                const tArray = [];
                                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                                com.forEach((item, index) => {
                                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                  tArray[index] = filteredT;
                                  preArray[index] = filteredPre;
                                });
                                // Función para manejar la actualización del estado
                                const actualizarEstadoParaItem = (item: any, index: number) => {
                                  if (index < preArray.length && index < tArray.length) {
                                    this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                  }
                                };
                                // Primero recorre todo el array para actualizar los estados según los datos en pre
                                com.forEach((item, index) => {
                                  actualizarEstadoParaItem(item, index);
                                });
                                // Luego, actualiza this.diasText con el nombre del día seleccionado
                                let com1 = this.tabs2[0].files[this.selectedTabIndex];
                                this.diasText = com1.nombre;

                                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                                com.forEach((item, index) => {
                                  if (this.diasText === item.nombre) {
                                    actualizarEstadoParaItem(item, index);
                                  }
                                });

                              },
                              (err) => {
                              }
                            )
                          }
                        } else {
                          let t = this.MenuPTNObject3.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);

                          // Verificar si 't' tiene elementos antes de continuar
                          if (t.length > 0) {
                            t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                            let primero = t[0].id;
                            let ultimo = t[t.length - 1].id;

                            // Aquí puedes continuar con la lógica que sigue
                            this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                              (response: any) => {

                                let pre = response;

                                let com = this.tabs2[0].files;
                                // Define arrays para almacenar los resultados de filtrarDatos
                                const preArray = [];
                                const tArray = [];
                                // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                                com.forEach((item, index) => {
                                  const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                                  tArray[index] = filteredT;
                                  preArray[index] = filteredPre;
                                });
                                // Función para manejar la actualización del estado
                                const actualizarEstadoParaItem = (item: any, index: number) => {
                                  if (index < preArray.length && index < tArray.length) {
                                    this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                                  }
                                };
                                // Primero recorre todo el array para actualizar los estados según los datos en pre
                                com.forEach((item, index) => {
                                  actualizarEstadoParaItem(item, index);
                                });
                                // Luego, actualiza this.diasText con el nombre del día seleccionado
                                let com1 = this.tabs2[0].files[this.selectedTabIndex];
                                this.diasText = com1.nombre;

                                // Si this.diasText está definido, actualiza el estado para el día seleccionado
                                com.forEach((item, index) => {
                                  if (this.diasText === item.nombre) {
                                    actualizarEstadoParaItem(item, index);
                                  }
                                });


                              },
                              (err) => {
                              }
                            )

                          } else {
                            console.error("No se encontraron elementos en el filtro.");
                            // Aquí puedes manejar el caso en que 't' esté vacío
                          }



                        }
                      }
                    }

                  } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                    if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {
                      if (this.selectedTabIndex == 0) {
                        let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana);
                        h.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                        if (h.length == 0) {
                        } else {
                          this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(h[0].id, h[h.length - 1].id).subscribe(
                            (response: any) => {

                              let pre = response;
                              let com = this.tabs2[0].files;
                              let com1 = this.tabs2[0].files[0];
                              pre.forEach(ele => {
                                com.forEach(item => {
                                  if (item.nombre === ele.sID_Menu) {
                                    item.estado = 'Completo'
                                  } else { }

                                })
                              })



                            },
                            (err) => {
                            }
                          )
                        }


                      } else {

                        let com = this.tabs2[0].files;
                        let com1 = this.tabs2[0].files[this.selectedTabIndex];
                        com.forEach(item => {
                          if (item.nombre === com1.nombre) {
                            item.estado = 'Completo'
                          } else { }
                        })
                      }
                    } else {
                      let com = this.tabs2[0].files;
            let com1 = this.tabs2[0].files[this.selectedTabIndex];
            com.forEach(item => {
              if (item.nombre === com1.nombre) {
                item.estado = 'Pendiente'
              } else { }
            })
                    }

                  }
                }
              })
          } else {
            if (o[0].iD_TipoModeloOperacionBase == 1) {
              if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {
                //prepa
                if (this.idCiclo > 0) {
                  const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                  if (primero !== undefined && ultimo !== undefined) {
                    this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                      (response: any) => {

                        let pre = response;

                        let com = this.tabs2[0].files;
                        let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);

                        // Define arrays para almacenar los resultados de filtrarDatos
                        const preArray = [];
                        const tArray = [];
                        // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                        com.forEach((item, index) => {
                          const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                          tArray[index] = filteredT;
                          preArray[index] = filteredPre;
                        });
                        // Función para manejar la actualización del estado
                        const actualizarEstadoParaItem = (item: any, index: number) => {
                          if (index < preArray.length && index < tArray.length) {
                            this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                          }
                        };
                        // Primero recorre todo el array para actualizar los estados según los datos en pre
                        com.forEach((item, index) => {
                          actualizarEstadoParaItem(item, index);
                        });
                        // Luego, actualiza this.diasText con el nombre del día seleccionado
                        let com1 = this.tabs2[0].files[this.selectedTabIndex];
                        this.diasText = com1.nombre;

                        // Si this.diasText está definido, actualiza el estado para el día seleccionado
                        com.forEach((item, index) => {
                          if (this.diasText === item.nombre) {
                            actualizarEstadoParaItem(item, index);
                          }
                        });

                      },
                      (err) => {
                      }
                    )
                  }
                } else {
                  if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {

                    const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                    if (primero !== undefined && ultimo !== undefined) {
                      this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                        (response: any) => {

                          let pre = response;

                          let com = this.tabs2[0].files;
                          let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);

                          // Define arrays para almacenar los resultados de filtrarDatos
                          const preArray = [];
                          const tArray = [];
                          // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                          com.forEach((item, index) => {
                            const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                            tArray[index] = filteredT;
                            preArray[index] = filteredPre;
                          });
                          // Función para manejar la actualización del estado
                          const actualizarEstadoParaItem = (item: any, index: number) => {
                            if (index < preArray.length && index < tArray.length) {
                              this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                            }
                          };
                          // Primero recorre todo el array para actualizar los estados según los datos en pre
                          com.forEach((item, index) => {
                            actualizarEstadoParaItem(item, index);
                          });
                          // Luego, actualiza this.diasText con el nombre del día seleccionado
                          let com1 = this.tabs2[0].files[this.selectedTabIndex];
                          this.diasText = com1.nombre;

                          // Si this.diasText está definido, actualiza el estado para el día seleccionado
                          com.forEach((item, index) => {
                            if (this.diasText === item.nombre) {
                              actualizarEstadoParaItem(item, index);
                            }
                          });

                        },
                        (err) => {
                        }
                      )
                    }
                  } else {

                    let t = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo==this.gradoid);

                    // Verificar si 't' tiene elementos antes de continuar
                    if (t.length > 0) {
                      t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                      let primero = t[0].id;
                      let ultimo = t[t.length - 1].id;

                      // Aquí puedes continuar con la lógica que sigue
                      this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(primero, ultimo).subscribe(
                        (response: any) => {

                          let pre = response;
                          let com = this.tabs2[0].files;
                          // Define arrays para almacenar los resultados de filtrarDatos
                          const preArray = [];
                          const tArray = [];
                          // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                          com.forEach((item, index) => {
                            const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                            tArray[index] = filteredT;
                            preArray[index] = filteredPre;
                          });
                          // Función para manejar la actualización del estado
                          const actualizarEstadoParaItem = (item: any, index: number) => {
                            if (index < preArray.length && index < tArray.length) {
                              this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                            }
                          };
                          // Primero recorre todo el array para actualizar los estados según los datos en pre
                          com.forEach((item, index) => {
                            actualizarEstadoParaItem(item, index);
                          });
                          // Luego, actualiza this.diasText con el nombre del día seleccionado
                          let com1 = this.tabs2[0].files[this.selectedTabIndex];
                          this.diasText = com1.nombre;

                          // Si this.diasText está definido, actualiza el estado para el día seleccionado
                          com.forEach((item, index) => {
                            if (this.diasText === item.nombre) {
                              actualizarEstadoParaItem(item, index);
                            }
                          });

                        },
                        (err) => {
                        }
                      )

                    } else {
                      console.error("No se encontraron elementos en el filtro.");
                      // Aquí puedes manejar el caso en que 't' esté vacío
                    }


                  }
                }

              } else {
                //prod

                if (this.idCiclo > 0) {
                  const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                  if (primero !== undefined && ultimo !== undefined) {
                    this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                      (response: any) => {

                        let pre = response;

                        let com = this.tabs2[0].files;
                        let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);

                        // Define arrays para almacenar los resultados de filtrarDatos
                        const preArray = [];
                        const tArray = [];
                        // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                        com.forEach((item, index) => {
                          const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                          tArray[index] = filteredT;
                          preArray[index] = filteredPre;
                        });
                        // Función para manejar la actualización del estado
                        const actualizarEstadoParaItem = (item: any, index: number) => {
                          if (index < preArray.length && index < tArray.length) {
                            this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                          }
                        };
                        // Primero recorre todo el array para actualizar los estados según los datos en pre
                        com.forEach((item, index) => {
                          actualizarEstadoParaItem(item, index);
                        });
                        // Luego, actualiza this.diasText con el nombre del día seleccionado
                        let com1 = this.tabs2[0].files[this.selectedTabIndex];
                        this.diasText = com1.nombre;

                        // Si this.diasText está definido, actualiza el estado para el día seleccionado
                        com.forEach((item, index) => {
                          if (this.diasText === item.nombre) {
                            actualizarEstadoParaItem(item, index);
                          }
                        });

                      },
                      (err) => {
                      }
                    )
                  }
                }
                else {
                  if (Array.isArray(this.dataArrayProd) && this.dataArrayProd.length > 0) {
                    const { primero, ultimo } = this.obtenerPrimeroYUltimoID(this.MenuPTNObject4, this.numeroSemana);

                    if (primero !== undefined && ultimo !== undefined) {

                      this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                        (response: any) => {

                          let pre = response;

                          let com = this.tabs2[0].files;
                          let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana);
                          // Define arrays para almacenar los resultados de filtrarDatos
                          const preArray = [];
                          const tArray = [];
                          // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                          com.forEach((item, index) => {
                            const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                            tArray[index] = filteredT;
                            preArray[index] = filteredPre;
                          });
                          // Función para manejar la actualización del estado
                          const actualizarEstadoParaItem = (item: any, index: number) => {
                            if (index < preArray.length && index < tArray.length) {
                              this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                            }
                          };
                          // Primero recorre todo el array para actualizar los estados según los datos en pre
                          com.forEach((item, index) => {
                            actualizarEstadoParaItem(item, index);
                          });
                          // Luego, actualiza this.diasText con el nombre del día seleccionado
                          let com1 = this.tabs2[0].files[this.selectedTabIndex];
                          this.diasText = com1.nombre;

                          // Si this.diasText está definido, actualiza el estado para el día seleccionado
                          com.forEach((item, index) => {
                            if (this.diasText === item.nombre) {
                              actualizarEstadoParaItem(item, index);
                            }
                          });


                        },
                        (err) => {
                        }
                      )
                    }
                  } else {

                    let t = this.MenuPTNObject4.filter(item => item.iD_Semana == this.numeroSemana && item.nombre == this.diasText);


                    // Verificar si 't' tiene elementos antes de continuar
                    if (t.length > 0) {
                      t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                      let primero = t[0].id;
                      let ultimo = t[t.length - 1].id;

                      // Aquí puedes continuar con la lógica que sigue

                      this._MenuProductosService.getMenuProductosListRelationFilter2(primero, ultimo).subscribe(
                        (response: any) => {

                          let pre = response;

                          let com = this.tabs2[0].files;
                          // Define arrays para almacenar los resultados de filtrarDatos
                          const preArray = [];
                          const tArray = [];
                          // Llamar a filtrarDatos para cada elemento en 'com' y almacenar resultados en arrays
                          com.forEach((item, index) => {
                            const { t: filteredT, pre: filteredPre } = this.filtrarDatos(item.nombre, t, pre);
                            tArray[index] = filteredT;
                            preArray[index] = filteredPre;
                          });
                          // Función para manejar la actualización del estado
                          const actualizarEstadoParaItem = (item: any, index: number) => {
                            if (index < preArray.length && index < tArray.length) {
                              this.actualizarEstadoN.call(this, preArray[index], tArray[index], com);
                            }
                          };
                          // Primero recorre todo el array para actualizar los estados según los datos en pre
                          com.forEach((item, index) => {
                            actualizarEstadoParaItem(item, index);
                          });
                          // Luego, actualiza this.diasText con el nombre del día seleccionado
                          let com1 = this.tabs2[0].files[this.selectedTabIndex];
                          this.diasText = com1.nombre;

                          // Si this.diasText está definido, actualiza el estado para el día seleccionado
                          com.forEach((item, index) => {
                            if (this.diasText === item.nombre) {
                              actualizarEstadoParaItem(item, index);
                            }
                          });

                        },
                        (err) => {
                        }
                      )
                    } else {
                      console.error("No se encontraron elementos en el filtro.");
                      // Aquí puedes manejar el caso en que 't' esté vacío
                    }


                  }
                }
              }

            } else if (o[0].iD_TipoModeloOperacionBase == 2) {
              if (Array.isArray(this.dataArrayPre) && this.dataArrayPre.length > 0) {
                if (this.selectedTabIndex == 0) {
                  let h = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana);
                  h.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                  if (h.length == 0) {
                  } else {
                    this._MenuPreparacionesService.getMenuPreparacionesListFilterEnter2(h[0].id, h[h.length - 1].id).subscribe(
                      (response: any) => {

                        let pre = response;
                        let com = this.tabs2[0].files;
                        let com1 = this.tabs2[0].files[0];
                        pre.forEach(ele => {
                          com.forEach(item => {
                            if (item.nombre === ele.sID_Menu) {
                              item.estado = 'Completo'
                            } else { }

                          })
                        })



                      },
                      (err) => {
                      }
                    )
                  }


                } else {

                  let com = this.tabs2[0].files;
                  let com1 = this.tabs2[0].files[this.selectedTabIndex];
                  com.forEach(item => {
                    if (item.nombre === com1.nombre) {
                      item.estado = 'Completo'
                    } else { }
                  })
                }
              } else {
                let com = this.tabs2[0].files;
            let com1 = this.tabs2[0].files[this.selectedTabIndex];
            com.forEach(item => {
              if (item.nombre === com1.nombre) {
                item.estado = 'Pendiente'
              } else { }
            })
              }

            }
          }
        })



    }
  }

  // Función para obtener el primer y último ID basado en la semana
  obtenerPrimeroYUltimoID(menuPTNObject3, numeroSemana) {
    let t = menuPTNObject3.filter(item => item.iD_Semana == numeroSemana);

    t.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
    return { primero: t[0]?.id, ultimo: t[t.length - 1]?.id };
  }

  // Función para obtener elementos filtrados
  filtrarDatos(nombre, t, pre) {
    return {
      t: t.filter(item => item.nombre === nombre),
      pre: pre.filter(irem => irem.sID_Menu === nombre)
    };
  }

  // Función para actualizar el estado
  actualizarEstado(pre, t, com) {
    if (pre.length === 0) {
      if (this.CicloMenuObject.menusParaTodosNiveles == true){
        this.NivelEducativoList.forEach(item1 => item1.estado = 'Pendiente');
        t.forEach(ele => com.filter(item => item.nombre === ele.nombre)
                           .forEach(item => item.estado = 'Pendiente'));
      }else{
        this.NivelEducativoList.filter(item1 => item1.id === this.gradoid)
                       .forEach(item1 => item1.estado = 'Pendiente');
      
        let g = this.NivelEducativoList.filter(item => item.estado !== 'Completo');
        let p = this.NivelEducativoList.every(item => item.estado === 'Pendiente');
        
        let nuevoEstado = g.length === 0 ? 'Completo' : p ? 'Pendiente' : 'Incompleto';
        
        t.forEach(ele => {
          com.forEach(item => {
            if (item.nombre === ele.nombre) {
              item.estado = nuevoEstado;
            }
          });
        });
        
      }
      
    } else {
      t.forEach(ele => {
        pre.forEach(item => {
          if (ele.id === item.iD_Menu) {
            this.NivelEducativoList.forEach(item1 => {
              if (item1.id === ele.iD_TipoNivelEducativo) {
                item1.estado = 'Completo';
              } else if (item1.estado !== 'Completo') {
                item1.estado = 'Pendiente';
              }
            });
          }
        });

        let g = this.NivelEducativoList.filter(item => item.estado !== 'Completo');
        if (g.length === 0) {
          pre.forEach(ele => {
            com.forEach(item => {
              if (item.nombre === ele.sID_Menu) {
                item.estado = 'Completo';
              }
            });
          });
        } else {
          pre.forEach(ele => {
            com.forEach(item => {
              if (item.nombre === ele.sID_Menu) {
                item.estado = 'Incompleto';
              }
            });
          });
        }
      });
    }
  }

  // Función para actualizar el estado
  actualizarEstadoN(pre, t, com) {
    if (pre.length === 0) {
      if (this.CicloMenuObject.menusParaTodosNiveles == true){
       this.CiclosMenusNivelesEducativosObject.forEach(item1 => item1.estado = 'Pendiente');
        t.forEach(ele => com.filter(item => item.nombre === ele.nombre)
                           .forEach(item => item.estado = 'Pendiente'));
      }else{
       this.CiclosMenusNivelesEducativosObject.filter(item1 => item1.iD_TipoNivelEducativo === this.gradoid)
                       .forEach(item1 => item1.estado = 'Pendiente');
      
        let g =this.CiclosMenusNivelesEducativosObject.filter(item => item.estado !== 'Completo');
        let p =this.CiclosMenusNivelesEducativosObject.every(item => item.estado === 'Pendiente');
        
        let nuevoEstado = g.length === 0 ? 'Completo' : p ? 'Pendiente' : 'Incompleto';
        
        t.forEach(ele => {
          com.forEach(item => {
            if (item.nombre === ele.nombre) {
              item.estado = nuevoEstado;
            }
          });
        });
        
      }
    } else {
      t.forEach(ele => {
        pre.forEach(item => {
          if (ele.id === item.iD_Menu) {
            this.CiclosMenusNivelesEducativosObject.forEach(item1 => {
              if (item1.iD_TipoNivelEducativo === ele.iD_TipoNivelEducativo) {
                item1.estado = 'Completo';
              } else if (item1.estado !== 'Completo') {
                item1.estado = 'Pendiente';
              }
            });
          }
        });

        let g =this.CiclosMenusNivelesEducativosObject.filter(item => item.estado !== 'Completo');
        let p =this.CiclosMenusNivelesEducativosObject.every(item => item.estado === 'Pendiente');
        
        let nuevoEstado = g.length === 0 ? 'Completo' : p ? 'Pendiente' : 'Incompleto';
        
        t.forEach(ele => {
          com.forEach(item => {
            if (item.nombre === ele.nombre) {
              item.estado = nuevoEstado;
            }
          });
        });
      });
    }
  }


  mostrarprodu() {
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let h = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
      if (h.length == 0) {
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.Productos = false;
        }
      } else {
        this._MenuProductosService.getMenuProductosListRelationFilter(h[0].id).subscribe(
          (response: any) => {

            this.dataArrayProd = response;

            this.isLoading = false;
            if (this.dataArrayProd.length > 0) {
              this.dataSourceProducto = new MatTableDataSource<MenuProductosModel>(this.dataArrayProd);
            } else {
              this.dataSourceProducto = new MatTableDataSource<MenuProductosModel>(this.dataArrayEmptyProduct);
            }
            this.mostrarmenucom();
            this.validacionesEstado()
            /* this.dataSourcePreparacion.paginator = this.paginator;
           this.paginator._intl.itemsPerPageLabel = "Registros por página";
            this.paginator._intl.nextPageLabel = "Siguiente";
            this.paginator._intl.previousPageLabel = "Anterior";
            this.paginator._intl.firstPageLabel = "Primero";
            this.paginator._intl.lastPageLabel = "Último";  */

          },
          (err) => {
          }
        )
      }
    }


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

    this.alecomp1 = true;
    this.alecomp2 = true;
    this.alecomp3 = true;
    this.alecomp4 = true;
    this.alecomp5 = true;
    this.alecomp6 = true;
    this.alecomp7 = true;
    this.alecomp8 = true;
    this.alecomp9 = true;
    this.alecomp10 = true;
    this.alecomp11 = true;
    this.alecomp12 = true;
    this.alecomp13 = true;

    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

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


      let h = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);

      if (h.length == 0) {
        if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
          this.Preparaciones = false;
        }
      } else {
        var gradofrecuencia = null;
        if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
        else { gradofrecuencia = this.gradoid }
        this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
          (response) => {

            this.frecuencia = response;


          })
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {

          this._PA_MenuComponentesService.getPA_MenuComponentesList(h[0].id).subscribe(
            (res: any) => {

              let k = res;

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
                  this.comp8 = item[1];

                } else if (item[0] == 9) {
                  this.comp9 = item[1];

                } else if (item[0] == 10) {
                  this.comp10 = item[1];

                } else if (item[0] == 11) {
                  this.comp11 = item[1];

                } else if (item[0] == 12) {
                  this.comp12 = item[1];

                } else if (item[0] == 13) {
                  this.comp13 = item[1];

                }
              })

              resp.forEach(item2 => {
                this.componeteList.map(item => {
                  if (item.id == item2[0]) {
                    if (item2[1] > 0) {
                      item.cantidad = item2[1]
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

              this.componeteList.forEach(item => {
                if (item.id == 1) {
                  if (item.cantidad == 0) {
                    this.alecomp1 = true;
                  } else {
                    this.alecomp1 = false;
                  }

                } else if (item.id == 2) {
                  if (item.cantidad == 0) {
                    this.alecomp2 = true;
                  } else {
                    this.alecomp2 = false;
                  }

                } else if (item.id == 3) {
                  if (item.cantidad == 0) {
                    this.alecomp3 = true;
                  } else {
                    this.alecomp3 = false;
                  }

                } else if (item.id == 4) {

                  if (item.cantidad == 0) {
                    this.alecomp4 = true;
                  } else {
                    this.alecomp4 = false;
                  }
                } else if (item.id == 5) {
                  if (item.cantidad == 0) {
                    this.alecomp5 = true;
                  } else {
                    this.alecomp5 = false;
                  }

                } else if (item.id == 6) {
                  if (item.cantidad == 0) {
                    this.alecomp6 = true;
                  } else {
                    this.alecomp6 = false;
                  }

                } else if (item.id == 7) {
                  if (item.cantidad == 0) {
                    this.alecomp7 = true;
                  } else {
                    this.alecomp7 = false;
                  }

                } else if (item.id == 8) {
                  if (item.cantidad == 0) {
                    this.alecomp8 = true;
                  } else {
                    this.alecomp8 = false;
                  }

                } else if (item.id == 9) {
                  if (item.cantidad == 0) {
                    this.alecomp9 = true;
                  } else {
                    this.alecomp9 = false;
                  }

                } else if (item.id == 10) {
                  if (item.cantidad == 0) {
                    this.alecomp10 = true;
                  } else {
                    this.alecomp10 = false;
                  }

                } else if (item.id == 11) {
                  if (item.cantidad == 0) {
                    this.alecomp11 = true;
                  } else {
                    this.alecomp11 = false;
                  }

                } else if (item.id == 12) {
                  if (item.cantidad == 0) {
                    this.alecomp12 = true;
                  } else {
                    this.alecomp12 = false;
                  }

                } else if (item.id == 13) {
                  if (item.cantidad == 0) {
                    this.alecomp13 = true;
                  } else {
                    this.alecomp13 = false;
                  }

                }
              })

              if (this.numeroSemana == this.limiteSemana) {
                this.semanaid = true;
              } else {
                this.semanaid = true;
                this.semanamaerid = true;
              }
              this.mostrarmacromicro();

            },
            (err) => {
            }
          )
        } else {
          this._PA_ComponentesCiclosService.getPA_ComponentesCiclosList(this.CicloMenuObject.id, this.gradoid, h[0].iD_Semana2, h[0].numeroDia).subscribe(
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

              this.componeteList.forEach(item => {
                if (item.id == 1) {
                  if (item.cantidad == 0) {
                    this.alecomp1 = true;
                  } else {
                    this.alecomp1 = false;
                  }

                } else if (item.id == 2) {
                  if (item.cantidad == 0) {
                    this.alecomp2 = true;
                  } else {
                    this.alecomp2 = false;
                  }

                } else if (item.id == 3) {
                  if (item.cantidad == 0) {
                    this.alecomp3 = true;
                  } else {
                    this.alecomp3 = false;
                  }

                } else if (item.id == 4) {

                  if (item.cantidad == 0) {
                    this.alecomp4 = true;
                  } else {
                    this.alecomp4 = false;
                  }
                } else if (item.id == 5) {
                  if (item.cantidad == 0) {
                    this.alecomp5 = true;
                  } else {
                    this.alecomp5 = false;
                  }

                } else if (item.id == 6) {
                  if (item.cantidad == 0) {
                    this.alecomp6 = true;
                  } else {
                    this.alecomp6 = false;
                  }

                } else if (item.id == 7) {
                  if (item.cantidad == 0) {
                    this.alecomp7 = true;
                  } else {
                    this.alecomp7 = false;
                  }

                } else if (item.id == 8) {
                  if (item.cantidad == 0) {
                    this.alecomp8 = true;
                  } else {
                    this.alecomp8 = false;
                  }

                } else if (item.id == 9) {
                  if (item.cantidad == 0) {
                    this.alecomp9 = true;
                  } else {
                    this.alecomp9 = false;
                  }

                } else if (item.id == 10) {
                  if (item.cantidad == 0) {
                    this.alecomp10 = true;
                  } else {
                    this.alecomp10 = false;
                  }

                } else if (item.id == 11) {
                  if (item.cantidad == 0) {
                    this.alecomp11 = true;
                  } else {
                    this.alecomp11 = false;
                  }

                } else if (item.id == 12) {
                  if (item.cantidad == 0) {
                    this.alecomp12 = true;
                  } else {
                    this.alecomp12 = false;
                  }

                } else if (item.id == 13) {
                  if (item.cantidad == 0) {
                    this.alecomp13 = true;
                  } else {
                    this.alecomp13 = false;
                  }

                }
              })
              if (this.numeroSemana == this.limiteSemana) {
                this.semanaid = true;
              } else {
                this.semanaid = true;
                this.semanamaerid = true;
              }
              this.mostrarmacromicro();

            },
            (err) => {
            }
          )
        }
      }

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {


      let h = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
      if (h.length == 0) {

      } else {
        var gradofrecuencia = null;
        if (this.gradoid == undefined || this.gradoid === 0 || this.gradoid == null) { gradofrecuencia = 0 }
        else { gradofrecuencia = this.gradoid }
        this._PA_ValidaFrecuenciaService.getPA_ValidaFrecuenciaList(this.CicloMenuObject.id, this.numeroSemana, gradofrecuencia).subscribe(
          (response: any) => {

            this.frecuencia = response;


            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 2) {
              this._PA_MenuComponentesService.getPA_MenuComponentesList(h[0].id).subscribe(
                (response: any) => {

                  let k = response;
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
                      this.comp8 = item[1];

                    } else if (item[0] == 9) {
                      this.comp9 = item[1];

                    } else if (item[0] == 10) {
                      this.comp10 = item[1];

                    } else if (item[0] == 11) {
                      this.comp11 = item[1];

                    } else if (item[0] == 12) {
                      this.comp12 = item[1];

                    } else if (item[0] == 13) {
                      this.comp13 = item[1];

                    }
                  })

                  resp.forEach(item2 => {
                    this.componeteList.map(item => {
                      if (item.id == item2[0]) {
                        if (item2[1] > 0) {
                          item.cantidad = item2[1]
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

                  this.componeteList.forEach(item => {
                    if (item.id == 1) {
                      if (item.cantidad == 0) {
                        this.alecomp1 = true;
                      } else {
                        this.alecomp1 = false;
                      }

                    } else if (item.id == 2) {
                      if (item.cantidad == 0) {
                        this.alecomp2 = true;
                      } else {
                        this.alecomp2 = false;
                      }

                    } else if (item.id == 3) {
                      if (item.cantidad == 0) {
                        this.alecomp3 = true;
                      } else {
                        this.alecomp3 = false;
                      }

                    } else if (item.id == 4) {

                      if (item.cantidad == 0) {
                        this.alecomp4 = true;
                      } else {
                        this.alecomp4 = false;
                      }
                    } else if (item.id == 5) {
                      if (item.cantidad == 0) {
                        this.alecomp5 = true;
                      } else {
                        this.alecomp5 = false;
                      }

                    } else if (item.id == 6) {
                      if (item.cantidad == 0) {
                        this.alecomp6 = true;
                      } else {
                        this.alecomp6 = false;
                      }

                    } else if (item.id == 7) {
                      if (item.cantidad == 0) {
                        this.alecomp7 = true;
                      } else {
                        this.alecomp7 = false;
                      }

                    } else if (item.id == 8) {
                      if (item.cantidad == 0) {
                        this.alecomp8 = true;
                      } else {
                        this.alecomp8 = false;
                      }

                    } else if (item.id == 9) {
                      if (item.cantidad == 0) {
                        this.alecomp9 = true;
                      } else {
                        this.alecomp9 = false;
                      }

                    } else if (item.id == 10) {
                      if (item.cantidad == 0) {
                        this.alecomp10 = true;
                      } else {
                        this.alecomp10 = false;
                      }

                    } else if (item.id == 11) {
                      if (item.cantidad == 0) {
                        this.alecomp11 = true;
                      } else {
                        this.alecomp11 = false;
                      }

                    } else if (item.id == 12) {
                      if (item.cantidad == 0) {
                        this.alecomp12 = true;
                      } else {
                        this.alecomp12 = false;
                      }

                    } else if (item.id == 13) {
                      if (item.cantidad == 0) {
                        this.alecomp13 = true;
                      } else {
                        this.alecomp13 = false;
                      }

                    }
                  })

                  if (this.numeroSemana == this.limiteSemana) {
                    this.semanaid = true;
                  } else {
                    this.semanaid = true;
                    this.semanamaerid = true;
                  }
                  this.mostrarmacromicro();
                 

                },
                (err) => {
                }
              )
            } else {
              this._PA_ComponentesCiclosService.getPA_ComponentesCiclosList(this.CicloMenuObject.id, this.gradoid, h[0].iD_Semana2, h[0].numeroDia).subscribe(
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

                  this.componeteList.forEach(item => {
                    if (item.id == 1) {
                      if (item.cantidad == 0) {
                        this.alecomp1 = true;
                      } else {
                        this.alecomp1 = false;
                      }

                    } else if (item.id == 2) {
                      if (item.cantidad == 0) {
                        this.alecomp2 = true;
                      } else {
                        this.alecomp2 = false;
                      }

                    } else if (item.id == 3) {
                      if (item.cantidad == 0) {
                        this.alecomp3 = true;
                      } else {
                        this.alecomp3 = false;
                      }

                    } else if (item.id == 4) {

                      if (item.cantidad == 0) {
                        this.alecomp4 = true;
                      } else {
                        this.alecomp4 = false;
                      }
                    } else if (item.id == 5) {
                      if (item.cantidad == 0) {
                        this.alecomp5 = true;
                      } else {
                        this.alecomp5 = false;
                      }

                    } else if (item.id == 6) {
                      if (item.cantidad == 0) {
                        this.alecomp6 = true;
                      } else {
                        this.alecomp6 = false;
                      }

                    } else if (item.id == 7) {
                      if (item.cantidad == 0) {
                        this.alecomp7 = true;
                      } else {
                        this.alecomp7 = false;
                      }

                    } else if (item.id == 8) {
                      if (item.cantidad == 0) {
                        this.alecomp8 = true;
                      } else {
                        this.alecomp8 = false;
                      }

                    } else if (item.id == 9) {
                      if (item.cantidad == 0) {
                        this.alecomp9 = true;
                      } else {
                        this.alecomp9 = false;
                      }

                    } else if (item.id == 10) {
                      if (item.cantidad == 0) {
                        this.alecomp10 = true;
                      } else {
                        this.alecomp10 = false;
                      }

                    } else if (item.id == 11) {
                      if (item.cantidad == 0) {
                        this.alecomp11 = true;
                      } else {
                        this.alecomp11 = false;
                      }

                    } else if (item.id == 12) {
                      if (item.cantidad == 0) {
                        this.alecomp12 = true;
                      } else {
                        this.alecomp12 = false;
                      }

                    } else if (item.id == 13) {
                      if (item.cantidad == 0) {
                        this.alecomp13 = true;
                      } else {
                        this.alecomp13 = false;
                      }

                    }
                  })
                  if (this.numeroSemana == this.limiteSemana) {
                    this.semanaid = true;
                  } else {
                    this.semanaid = true;
                    this.semanamaerid = true;
                  }
                  this.mostrarmacromicro();

                },
                (err) => {
                }
              )
            }
            let g = 0
            if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
              g = 1;
            } else {
              g = this.CicloMenuObject.iD_TipoModalidadComplemento;
            }

            this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
              (response: any) => {
                let o = response;
                if (o.length == 0) {
                  let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

                  this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                    (response: any) => {
                      let p = response;
                      if (p.length == 0) { } else {
                        if (p[0].iD_TipoModeloOperacionBase == 1) {
                          this.semanaid = true;
                          this.semanamaerid = false;
                        } else if (p[0].iD_TipoModeloOperacionBase == 2) {

                          this.semanaid = false;
                          this.semanamaerid = true;
                        }
                      }
                    })
                } else {
                  if (o[0].iD_TipoModeloOperacionBase == 1) {
                    this.semanaid = true;
                    this.semanamaerid = false;
                  } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                    this.semanaid = false;
                    this.semanamaerid = true;
                  }
                }
              })
            this.mostrarmacromicro();

          },
          (err) => {
          }
        )
      }
    }



  }
  mostrarmacromicro() {
    this.dataComponentesCrea();
     console.log('this.mostrarmacromicro');
     
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {

      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
        let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

        let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
        if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }
        console.log(f,this.MenuPTNObject3);
        
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

            this.mostraraletrasmacromicro()

          },
          (err) => {
          }
        );
      } else {


        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
        let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

        let f = this.MenuPTNObject3.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
        if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

            this.mostraraletrasmacromicro()

          },
          (err) => {
          }
        );
      }
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {

      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
      let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

      let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
      if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

      /*  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid; */
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

          this.semanamaerid = true;

          this.mostraraletrasmacromicro()
        },
        (err) => {
        }
      );
      let dia = 0
      if (f.length == 0) { } else {
        dia = f[0].numeroDia
      }
      this.ListIntercambiosDiarios = []
      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
      this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
      this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);


    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {



      if (this.dataMinutaPatron == undefined) {

        let g = 0
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          g = 1;
        } else {
          g = this.CicloMenuObject.iD_TipoModalidadComplemento;
        }
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let o = response;
            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  let p = response;
                  if (p.length == 0) { } else {
                    if (p[0].iD_TipoModeloOperacionBase == 1) {
                      if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {

                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                        let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                        let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                        if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }
                         console.log(13957, f, this.MenuPTNObject4);
                         
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                            this.mostraraletrasmacromicro()

                          },
                          (err) => {
                          }
                        );
                      } else {


                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                        let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                        if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                        let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                        if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }
                        console.log(14094, f, this.MenuPTNObject4);
                        this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                            this.mostraraletrasmacromicro()

                          },
                          (err) => {
                          }
                        );
                      }

                    } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                      /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
                      let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                      if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                      let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                      this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                      if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

                      /*  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid; */
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
                          this.semanamaerid = true;

                          this.mostraraletrasmacromicro()
                        },
                        (err) => {
                        }
                      );
                      let dia = 0
                      if (f.length == 0) { } else {
                        dia = f[0].numeroDia
                      }
                      this.ListIntercambiosDiarios = []
                      this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
                      this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
                      this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
                      this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);


                    }
                  }
                })
            } else {
              if (o[0].iD_TipoModeloOperacionBase == 1) {
                if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {

                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                  let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                  if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                  let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                  if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                      this.mostraraletrasmacromicro()

                    },
                    (err) => {
                    }
                  );
                } else {


                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
                  let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                  if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                  let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                  if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

                  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                      this.mostraraletrasmacromicro()

                    },
                    (err) => {
                    }
                  );
                }

              } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
                /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
                let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
                if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

                let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
                this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
                if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

                /*  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid; */
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
                    this.semanamaerid = true;

                    this.mostraraletrasmacromicro()
                  },
                  (err) => {
                  }
                );
                let dia = 0
                if (f.length == 0) { } else {
                  dia = f[0].numeroDia
                }
                this.ListIntercambiosDiarios = []
                this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
                this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
                this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
                this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);


              }
            }
          })

      } else {
        if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
          if (this.CicloMenuObject.iD_TipoModalidadComplemento != 2) {

            this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
            let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
            if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

            let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
            if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                this.mostraraletrasmacromicro()

              },
              (err) => {
              }
            );
          } else {


            this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona
            let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
            if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

            let f = this.MenuPTNObject4.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText && item2.iD_TipoNivelEducativo == this.gradoid);
            this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
            if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

            this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid;
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

                this.mostraraletrasmacromicro()

              },
              (err) => {
              }
            );
          }
        } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_Etc = this.idETC;
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModeloOperacion = this.CicloMenuObject.iD_TipoModeloOperacion;
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoComplemento = this.CicloMenuObject.iD_TipoComplemento
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoModalidadComplemento = this.CicloMenuObject.iD_TipoModalidadComplemento
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_MinutaAprobacion = this.CicloMenuObject.iD_MinutaAprobacion
          /* this.CicloMenuAporteNutricionalXAprobacionReq.ID_Zona = this.CicloMenuObject.iD_Zona */
          let h = this.semanaList.filter(item2 => item2.numeroSemana == this.numeroSemana);
          if (h.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.ID_Semana = h[0].id }

          let f = this.MenuPTNObject.filter(item2 => item2.iD_Semana == this.numeroSemana && item2.nombre == this.diasText);
          this.CicloMenuAporteNutricionalXAprobacionReq.ID_CicloMenu = this.CicloMenuObject.id
          if (f.length == 0) { } else { this.CicloMenuAporteNutricionalXAprobacionReq.Dia = f[0].numeroDia }

          /*  this.CicloMenuAporteNutricionalXAprobacionReq.ID_TipoNivelEducativo = this.gradoid; */
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
              this.semanamaerid = true;
              this.mostraraletrasmacromicro()

            },
            (err) => {
            }
          );
          let dia = 0
          if (f.length == 0) { } else {
            dia = f[0].numeroDia
          }
          this.ListIntercambiosDiarios = []
          this.PA_conteoIntercambiosPivreq.ID_CiclosMenu = this.CicloMenuObject.id;
          this.PA_conteoIntercambiosPivreq.NumeroSemana = this.numeroSemana;
          this.PA_conteoIntercambiosPivreq.NumeroDia = dia;
          this.dataComponentesActualizaxIntercambios(this.PA_conteoIntercambiosPivreq);




        }
      }


    }

  }
  mostraraletrasmacromicro() {
    if (this.CicloMenuObject.iD_TipoModeloOperacion == 1) {
      let macro = this.dataSourceMacro.filter(item => item.id == 5)
      macro.forEach(item => {
        if (item.icoenergia == 2) {
          this.Menergia = true;
          this.Menergia1 = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1 = true;
          this.Menergia = false;
        } else {
          this.Menergia1 = false;
          this.Menergia = false;
        }
        if (item.icoproteina == 2) {
          this.Mproteina = true;
          this.Mproteina1 = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1 = true;
          this.Mproteina = false;
        } else {
          this.Mproteina1 = false;
          this.Mproteina = false;
        }
        if (item.icocarbohidrato == 2) {
          this.Mcarbohidrato = true;
          this.Mcarbohidrato1 = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1 = true;
          this.Mcarbohidrato = false;
        } else {
          this.Mcarbohidrato1 = false;
          this.Mcarbohidrato = false;
        }
        if (item.icograsaTotal == 2) {
          this.MgrasasTotales = true;
          this.MgrasasTotales1 = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1 = true;
          this.MgrasasTotales = false;
        } else {
          this.MgrasasTotales1 = false;
          this.MgrasasTotales = false;
        }
        if (item.icograsaSaturada == 2) {
          this.MgrasasSaturadas = true;
          this.MgrasasSaturadas1 = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1 = true;
          this.MgrasasSaturadas = false;
        } else {
          this.MgrasasSaturadas1 = false;
          this.MgrasasSaturadas = false;
        }
      })

      let micro = this.dataSourceMicro.filter(item => item.id == 5)
      micro.forEach(item => {
        if (item.icocalcio == 2) {
          this.Mcalcio = true;
          this.Mcalcio1 = false;
        } else if (item.icocalcio == 3) {
          this.Mcalcio1 = true;
          this.Mcalcio = false;
        } else {
          this.Mcalcio = false;
          this.Mcalcio1 = false;
        }
        if (item.icohierro == 2) {
          this.Mhierro = true;
          this.Mhierro1 = false;
        } else if (item.icohierro == 3) {
          this.Mhierro1 = true;
          this.Mhierro = false;
        } else {
          this.Mhierro1 = false;
          this.Mhierro = false;
        }
        if (item.icosodio == 2) {
          this.Msodio = true;
          this.Msodio1 = false;
        } else if (item.icosodio == 3) {
          this.Msodio1 = true;
          this.Msodio = false;
        } else {
          this.Msodio1 = false;
          this.Msodio = false;
        }
        if (item.icovitamina == 2) {
          this.Mvitamina = true;
          this.Mvitamina1 = false;
        } else if (item.icovitamina == 3) {
          this.Mvitamina1 = true;
          this.Mvitamina = false;
        } else {
          this.Mvitamina1 = false;
          this.Mvitamina = false;
        }
        if (item.icozinc == 2) {
          this.Mzinc = true;
          this.Mzinc1 = false;
        } else if (item.icozinc == 3) {
          this.Mzinc1 = true;
          this.Mzinc = false;
        } else {
          this.Mzinc1 = false;
          this.Mzinc = false;
        }
      })
    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 2) {
      let macro = this.dataSourceMacro2.filter(item => item.id == 8)
      let micro = this.dataSourceMicro2.filter(item => item.id == 8)
      macro.forEach(item => {
        //max
        if (item.icoenergia == 2) {
          this.Menergiamax = true;
          this.Menergia1max = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1max = true;
          this.Menergiamax = false;
        } else {
          this.Menergia1max = false;
          this.Menergiamax = false;
        }
        if (item.icoproteina == 2) {
          this.Mproteinamax = true;
          this.Mproteina1max = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1max = true;
          this.Mproteinamax = false;
        } else {
          this.Mproteina1max = false;
          this.Mproteinamax = false;
        }
        if (item.icocarbohidrato == 2) {
          this.Mcarbohidratomax = true;
          this.Mcarbohidrato1max = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1max = true;
          this.Mcarbohidratomax = false;
        } else {
          this.Mcarbohidrato1max = false;
          this.Mcarbohidratomax = false;
        }
        if (item.icograsaTotal == 2) {
          this.MgrasasTotalesmax = true;
          this.MgrasasTotales1max = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1max = true;
          this.MgrasasTotalesmax = false;
        } else {
          this.MgrasasTotales1max = false;
          this.MgrasasTotalesmax = false;
        }
        if (item.icograsaSaturada == 2) {
          this.MgrasasSaturadasmax = true;
          this.MgrasasSaturadas1max = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1max = true;
          this.MgrasasSaturadasmax = false;
        } else {
          this.MgrasasSaturadas1max = false;
          this.MgrasasSaturadasmax = false;
        }
        //min
        if (item.icoenergia2 == 2) {
          this.Menergiamin = true;
          this.Menergia1min = false;
        } else if (item.icoenergia == 3) {
          this.Menergia1min = true;
          this.Menergiamin = false;
        } else {
          this.Menergia1min = false;
          this.Menergiamin = false;
        }
        if (item.icoproteina2 == 2) {
          this.Mproteinamin = true;
          this.Mproteina1min = false;
        } else if (item.icoproteina == 3) {
          this.Mproteina1min = true;
          this.Mproteinamin = false;
        } else {
          this.Mproteina1min = false;
          this.Mproteinamin = false;
        }
        if (item.icocarbohidrato2 == 2) {
          this.Mcarbohidratomin = true;
          this.Mcarbohidrato1min = false;
        } else if (item.icocarbohidrato == 3) {
          this.Mcarbohidrato1min = true;
          this.Mcarbohidratomin = false;
        } else {
          this.Mcarbohidrato1min = false;
          this.Mcarbohidratomin = false;
        }
        if (item.icograsaTotal2 == 2) {
          this.MgrasasTotalesmin = true;
          this.MgrasasTotales1min = false;
        } else if (item.icograsaTotal == 3) {
          this.MgrasasTotales1min = true;
          this.MgrasasTotalesmin = false;
        } else {
          this.MgrasasTotales1min = false;
          this.MgrasasTotalesmin = false;
        }
        if (item.icograsaSaturada2 == 2) {
          this.MgrasasSaturadasmin = true;
          this.MgrasasSaturadas1min = false;
        } else if (item.icograsaSaturada == 3) {
          this.MgrasasSaturadas1max = true;
          this.MgrasasSaturadasmax = false;
        } else {
          this.MgrasasSaturadas1max = false;
          this.MgrasasSaturadasmax = false;
        }
      })

      micro.forEach(item => {
        //max
        if (item.icocalcio == 2) {
          this.Mcalciomax = true;
          this.Mcalcio1max = false;
        } else if (item.icocalcio == 3) {
          this.Mcalcio1max = true;
          this.Mcalciomax = false;
        } else {
          this.Mcalcio1max = false;
          this.Mcalciomax = false;
        }
        if (item.icohierro == 2) {
          this.Mhierromax = true;
          this.Mhierro1max = false;
        } else if (item.icohierro == 3) {
          this.Mhierro1max = true;
          this.Mhierromax = false;
        } else {
          this.Mhierro1max = false;
          this.Mhierromax = false;
        }
        if (item.icosodio == 2) {
          this.Msodiomax = true;
          this.Msodio1max = false;
        } else if (item.icosodio == 3) {
          this.Msodio1max = true;
          this.Msodiomax = false;
        } else {
          this.Msodio1max = false;
          this.Msodiomax = false;
        }
        if (item.icovitamina == 2) {
          this.Mvitaminamax = true;
          this.Mvitamina1max = false;
        } else if (item.icovitamina == 3) {
          this.Mvitamina1max = true;
          this.Mvitaminamax = false;
        } else {
          this.Mvitamina1max = false;
          this.Mvitaminamax = false;
        }
        if (item.icozinc == 2) {
          this.Mzincmax = true;
          this.Mzinc1max = false;
        } else if (item.icozinc == 3) {
          this.Mzinc1max = true;
          this.Mzincmax = false;
        } else {
          this.Mzinc1max = false;
          this.Mzincmax = false;
        }

        //min
        if (item.icocalcio2 == 2) {
          this.Mcalciomin = true;
          this.Mcalcio1min = false;
        } else if (item.icocalcio2 == 3) {
          this.Mcalcio1min = true;
          this.Mcalciomin = false;
        } else {
          this.Mcalcio1min = false;
          this.Mcalciomin = false;
        }
        if (item.icohierro2 == 2) {
          this.Mhierromin = true;
          this.Mhierro1min = false;
        } else if (item.icohierro2 == 3) {
          this.Mhierro1min = true;
          this.Mhierromin = false;
        } else {
          this.Mhierro1min = false;
          this.Mhierromin = false;
        }
        if (item.icosodio2 == 2) {
          this.Msodiomin = true;
          this.Msodio1min = false;
        } else if (item.icosodio2 == 3) {
          this.Msodio1min = true;
          this.Msodiomin = false;
        } else {
          this.Msodio1min = false;
          this.Msodiomin = false;
        }
        if (item.icovitamina2 == 2) {
          this.Mvitaminamin = true;
          this.Mvitamina1min = false;
        } else if (item.icovitamina2 == 3) {
          this.Mvitamina1min = true;
          this.Mvitaminamin = false;
        } else {
          this.Mvitamina1min = false;
          this.Mvitaminamin = false;
        }
        if (item.icozinc2 == 2) {
          this.Mzincmin = true;
          this.Mzinc1min = false; this.dataMinutaPatron
        } else if (item.icozinc2 == 3) {
          this.Mzinc1min = true;
          this.Mzincmin = false;
        } else {
          this.Mzinc1min = false;
          this.Mzincmin = false;
        }
      })

    } else if (this.CicloMenuObject.iD_TipoModeloOperacion == 3) {
      if (this.dataMinutaPatron == undefined) {

        let g = 0
        if (this.CicloMenuObject.iD_TipoModalidadComplemento == 3) {
          g = 1;
        } else {
          g = this.CicloMenuObject.iD_TipoModalidadComplemento;
        }
        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, this.CicloMenuObject.iD_TipoComplemento).subscribe(
          (response: any) => {
            let o = response;
            if (o.length == 0) {
              let j = this.tipoRacionListfilter.filter(item => item.id != this.CicloMenuObject.iD_TipoComplemento)

              this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.CicloMenuObject.iD_MinutaAprobacion, g, j[0].id).subscribe(
                (response: any) => {
                  let p = response;
                  if (p.length == 0) { } else {
                    if (p[0].iD_TipoModeloOperacionBase == 1) {
                      let macro = this.dataSourceMacro.filter(item => item.id == 5)
                      macro.forEach(item => {
                        if (item.icoenergia == 2) {
                          this.Menergia = true;
                          this.Menergia1 = false;
                        } else if (item.icoenergia == 3) {
                          this.Menergia1 = true;
                          this.Menergia = false;
                        } else {
                          this.Menergia1 = false;
                          this.Menergia = false;
                        }
                        if (item.icoproteina == 2) {
                          this.Mproteina = true;
                          this.Mproteina1 = false;
                        } else if (item.icoproteina == 3) {
                          this.Mproteina1 = true;
                          this.Mproteina = false;
                        } else {
                          this.Mproteina1 = false;
                          this.Mproteina = false;
                        }
                        if (item.icocarbohidrato == 2) {
                          this.Mcarbohidrato = true;
                          this.Mcarbohidrato1 = false;
                        } else if (item.icocarbohidrato == 3) {
                          this.Mcarbohidrato1 = true;
                          this.Mcarbohidrato = false;
                        } else {
                          this.Mcarbohidrato1 = false;
                          this.Mcarbohidrato = false;
                        }
                        if (item.icograsaTotal == 2) {
                          this.MgrasasTotales = true;
                          this.MgrasasTotales1 = false;
                        } else if (item.icograsaTotal == 3) {
                          this.MgrasasTotales1 = true;
                          this.MgrasasTotales = false;
                        } else {
                          this.MgrasasTotales1 = false;
                          this.MgrasasTotales = false;
                        }
                        if (item.icograsaSaturada == 2) {
                          this.MgrasasSaturadas = true;
                          this.MgrasasSaturadas1 = false;
                        } else if (item.icograsaSaturada == 3) {
                          this.MgrasasSaturadas1 = true;
                          this.MgrasasSaturadas = false;
                        } else {
                          this.MgrasasSaturadas1 = false;
                          this.MgrasasSaturadas = false;
                        }
                      })

                      let micro = this.dataSourceMicro.filter(item => item.id == 5)
                      micro.forEach(item => {
                        if (item.icocalcio == 2) {
                          this.Mcalcio = true;
                          this.Mcalcio1 = false;
                        } else if (item.icocalcio == 3) {
                          this.Mcalcio1 = true;
                          this.Mcalcio = false;
                        } else {
                          this.Mcalcio = false;
                          this.Mcalcio1 = false;
                        }
                        if (item.icohierro == 2) {
                          this.Mhierro = true;
                          this.Mhierro1 = false;
                        } else if (item.icohierro == 3) {
                          this.Mhierro1 = true;
                          this.Mhierro = false;
                        } else {
                          this.Mhierro1 = false;
                          this.Mhierro = false;
                        }
                        if (item.icosodio == 2) {
                          this.Msodio = true;
                          this.Msodio1 = false;
                        } else if (item.icosodio == 3) {
                          this.Msodio1 = true;
                          this.Msodio = false;
                        } else {
                          this.Msodio1 = false;
                          this.Msodio = false;
                        }
                        if (item.icovitamina == 2) {
                          this.Mvitamina = true;
                          this.Mvitamina1 = false;
                        } else if (item.icovitamina == 3) {
                          this.Mvitamina1 = true;
                          this.Mvitamina = false;
                        } else {
                          this.Mvitamina1 = false;
                          this.Mvitamina = false;
                        }
                        if (item.icozinc == 2) {
                          this.Mzinc = true;
                          this.Mzinc1 = false;
                        } else if (item.icozinc == 3) {
                          this.Mzinc1 = true;
                          this.Mzinc = false;
                        } else {
                          this.Mzinc1 = false;
                          this.Mzinc = false;
                        }
                      })

                    } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                      let macro = this.dataSourceMacro2.filter(item => item.id == 8)
                      let micro = this.dataSourceMicro2.filter(item => item.id == 8)
                      macro.forEach(item => {
                        //max
                        if (item.icoenergia == 2) {
                          this.Menergiamax = true;
                          this.Menergia1max = false;
                        } else if (item.icoenergia == 3) {
                          this.Menergia1max = true;
                          this.Menergiamax = false;
                        } else {
                          this.Menergia1max = false;
                          this.Menergiamax = false;
                        }
                        if (item.icoproteina == 2) {
                          this.Mproteinamax = true;
                          this.Mproteina1max = false;
                        } else if (item.icoproteina == 3) {
                          this.Mproteina1max = true;
                          this.Mproteinamax = false;
                        } else {
                          this.Mproteina1max = false;
                          this.Mproteinamax = false;
                        }
                        if (item.icocarbohidrato == 2) {
                          this.Mcarbohidratomax = true;
                          this.Mcarbohidrato1max = false;
                        } else if (item.icocarbohidrato == 3) {
                          this.Mcarbohidrato1max = true;
                          this.Mcarbohidratomax = false;
                        } else {
                          this.Mcarbohidrato1max = false;
                          this.Mcarbohidratomax = false;
                        }
                        if (item.icograsaTotal == 2) {
                          this.MgrasasTotalesmax = true;
                          this.MgrasasTotales1max = false;
                        } else if (item.icograsaTotal == 3) {
                          this.MgrasasTotales1max = true;
                          this.MgrasasTotalesmax = false;
                        } else {
                          this.MgrasasTotales1max = false;
                          this.MgrasasTotalesmax = false;
                        }
                        if (item.icograsaSaturada == 2) {
                          this.MgrasasSaturadasmax = true;
                          this.MgrasasSaturadas1max = false;
                        } else if (item.icograsaSaturada == 3) {
                          this.MgrasasSaturadas1max = true;
                          this.MgrasasSaturadasmax = false;
                        } else {
                          this.MgrasasSaturadas1max = false;
                          this.MgrasasSaturadasmax = false;
                        }
                        //min
                        if (item.icoenergia2 == 2) {
                          this.Menergiamin = true;
                          this.Menergia1min = false;
                        } else if (item.icoenergia == 3) {
                          this.Menergia1min = true;
                          this.Menergiamin = false;
                        } else {
                          this.Menergia1min = false;
                          this.Menergiamin = false;
                        }
                        if (item.icoproteina2 == 2) {
                          this.Mproteinamin = true;
                          this.Mproteina1min = false;
                        } else if (item.icoproteina == 3) {
                          this.Mproteina1min = true;
                          this.Mproteinamin = false;
                        } else {
                          this.Mproteina1min = false;
                          this.Mproteinamin = false;
                        }
                        if (item.icocarbohidrato2 == 2) {
                          this.Mcarbohidratomin = true;
                          this.Mcarbohidrato1min = false;
                        } else if (item.icocarbohidrato == 3) {
                          this.Mcarbohidrato1min = true;
                          this.Mcarbohidratomin = false;
                        } else {
                          this.Mcarbohidrato1min = false;
                          this.Mcarbohidratomin = false;
                        }
                        if (item.icograsaTotal2 == 2) {
                          this.MgrasasTotalesmin = true;
                          this.MgrasasTotales1min = false;
                        } else if (item.icograsaTotal == 3) {
                          this.MgrasasTotales1min = true;
                          this.MgrasasTotalesmin = false;
                        } else {
                          this.MgrasasTotales1min = false;
                          this.MgrasasTotalesmin = false;
                        }
                        if (item.icograsaSaturada2 == 2) {
                          this.MgrasasSaturadasmin = true;
                          this.MgrasasSaturadas1min = false;
                        } else if (item.icograsaSaturada == 3) {
                          this.MgrasasSaturadas1max = true;
                          this.MgrasasSaturadasmax = false;
                        } else {
                          this.MgrasasSaturadas1max = false;
                          this.MgrasasSaturadasmax = false;
                        }
                      })


                      micro.forEach(item => {
                        //max
                        if (item.icocalcio == 2) {
                          this.Mcalciomax = true;
                          this.Mcalcio1max = false;
                        } else if (item.icocalcio == 3) {
                          this.Mcalcio1max = true;
                          this.Mcalciomax = false;
                        } else {
                          this.Mcalcio1max = false;
                          this.Mcalciomax = false;
                        }
                        if (item.icohierro == 2) {
                          this.Mhierromax = true;
                          this.Mhierro1max = false;
                        } else if (item.icohierro == 3) {
                          this.Mhierro1max = true;
                          this.Mhierromax = false;
                        } else {
                          this.Mhierro1max = false;
                          this.Mhierromax = false;
                        }
                        if (item.icosodio == 2) {
                          this.Msodiomax = true;
                          this.Msodio1max = false;
                        } else if (item.icosodio == 3) {
                          this.Msodio1max = true;
                          this.Msodiomax = false;
                        } else {
                          this.Msodio1max = false;
                          this.Msodiomax = false;
                        }
                        if (item.icovitamina == 2) {
                          this.Mvitaminamax = true;
                          this.Mvitamina1max = false;
                        } else if (item.icovitamina == 3) {
                          this.Mvitamina1max = true;
                          this.Mvitaminamax = false;
                        } else {
                          this.Mvitamina1max = false;
                          this.Mvitaminamax = false;
                        }
                        if (item.icozinc == 2) {
                          this.Mzincmax = true;
                          this.Mzinc1max = false;
                        } else if (item.icozinc == 3) {
                          this.Mzinc1max = true;
                          this.Mzincmax = false;
                        } else {
                          this.Mzinc1max = false;
                          this.Mzincmax = false;
                        }

                        //min
                        if (item.icocalcio2 == 2) {
                          this.Mcalciomin = true;
                          this.Mcalcio1min = false;
                        } else if (item.icocalcio2 == 3) {
                          this.Mcalcio1min = true;
                          this.Mcalciomin = false;
                        } else {
                          this.Mcalcio1min = false;
                          this.Mcalciomin = false;
                        }
                        if (item.icohierro2 == 2) {
                          this.Mhierromin = true;
                          this.Mhierro1min = false;
                        } else if (item.icohierro2 == 3) {
                          this.Mhierro1min = true;
                          this.Mhierromin = false;
                        } else {
                          this.Mhierro1min = false;
                          this.Mhierromin = false;
                        }
                        if (item.icosodio2 == 2) {
                          this.Msodiomin = true;
                          this.Msodio1min = false;
                        } else if (item.icosodio2 == 3) {
                          this.Msodio1min = true;
                          this.Msodiomin = false;
                        } else {
                          this.Msodio1min = false;
                          this.Msodiomin = false;
                        }
                        if (item.icovitamina2 == 2) {
                          this.Mvitaminamin = true;
                          this.Mvitamina1min = false;
                        } else if (item.icovitamina2 == 3) {
                          this.Mvitamina1min = true;
                          this.Mvitaminamin = false;
                        } else {
                          this.Mvitamina1min = false;
                          this.Mvitaminamin = false;
                        }
                        if (item.icozinc2 == 2) {
                          this.Mzincmin = true;
                          this.Mzinc1min = false;
                        } else if (item.icozinc2 == 3) {
                          this.Mzinc1min = true;
                          this.Mzincmin = false;
                        } else {
                          this.Mzinc1min = false;
                          this.Mzincmin = false;
                        }
                      })

                    }
                  }
                })
            } else {
              if (o[0].iD_TipoModeloOperacionBase == 1) {
                let macro = this.dataSourceMacro.filter(item => item.id == 5)
                macro.forEach(item => {
                  if (item.icoenergia == 2) {
                    this.Menergia = true;
                    this.Menergia1 = false;
                  } else if (item.icoenergia == 3) {
                    this.Menergia1 = true;
                    this.Menergia = false;
                  } else {
                    this.Menergia1 = false;
                    this.Menergia = false;
                  }
                  if (item.icoproteina == 2) {
                    this.Mproteina = true;
                    this.Mproteina1 = false;
                  } else if (item.icoproteina == 3) {
                    this.Mproteina1 = true;
                    this.Mproteina = false;
                  } else {
                    this.Mproteina1 = false;
                    this.Mproteina = false;
                  }
                  if (item.icocarbohidrato == 2) {
                    this.Mcarbohidrato = true;
                    this.Mcarbohidrato1 = false;
                  } else if (item.icocarbohidrato == 3) {
                    this.Mcarbohidrato1 = true;
                    this.Mcarbohidrato = false;
                  } else {
                    this.Mcarbohidrato1 = false;
                    this.Mcarbohidrato = false;
                  }
                  if (item.icograsaTotal == 2) {
                    this.MgrasasTotales = true;
                    this.MgrasasTotales1 = false;
                  } else if (item.icograsaTotal == 3) {
                    this.MgrasasTotales1 = true;
                    this.MgrasasTotales = false;
                  } else {
                    this.MgrasasTotales1 = false;
                    this.MgrasasTotales = false;
                  }
                  if (item.icograsaSaturada == 2) {
                    this.MgrasasSaturadas = true;
                    this.MgrasasSaturadas1 = false;
                  } else if (item.icograsaSaturada == 3) {
                    this.MgrasasSaturadas1 = true;
                    this.MgrasasSaturadas = false;
                  } else {
                    this.MgrasasSaturadas1 = false;
                    this.MgrasasSaturadas = false;
                  }
                })

                let micro = this.dataSourceMicro.filter(item => item.id == 5)
                micro.forEach(item => {
                  if (item.icocalcio == 2) {
                    this.Mcalcio = true;
                    this.Mcalcio1 = false;
                  } else if (item.icocalcio == 3) {
                    this.Mcalcio1 = true;
                    this.Mcalcio = false;
                  } else {
                    this.Mcalcio = false;
                    this.Mcalcio1 = false;
                  }
                  if (item.icohierro == 2) {
                    this.Mhierro = true;
                    this.Mhierro1 = false;
                  } else if (item.icohierro == 3) {
                    this.Mhierro1 = true;
                    this.Mhierro = false;
                  } else {
                    this.Mhierro1 = false;
                    this.Mhierro = false;
                  }
                  if (item.icosodio == 2) {
                    this.Msodio = true;
                    this.Msodio1 = false;
                  } else if (item.icosodio == 3) {
                    this.Msodio1 = true;
                    this.Msodio = false;
                  } else {
                    this.Msodio1 = false;
                    this.Msodio = false;
                  }
                  if (item.icovitamina == 2) {
                    this.Mvitamina = true;
                    this.Mvitamina1 = false;
                  } else if (item.icovitamina == 3) {
                    this.Mvitamina1 = true;
                    this.Mvitamina = false;
                  } else {
                    this.Mvitamina1 = false;
                    this.Mvitamina = false;
                  }
                  if (item.icozinc == 2) {
                    this.Mzinc = true;
                    this.Mzinc1 = false;
                  } else if (item.icozinc == 3) {
                    this.Mzinc1 = true;
                    this.Mzinc = false;
                  } else {
                    this.Mzinc1 = false;
                    this.Mzinc = false;
                  }
                })

              } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                let macro = this.dataSourceMacro2.filter(item => item.id == 8)
                let micro = this.dataSourceMicro2.filter(item => item.id == 8)
                macro.forEach(item => {
                  //max
                  if (item.icoenergia == 2) {
                    this.Menergiamax = true;
                    this.Menergia1max = false;
                  } else if (item.icoenergia == 3) {
                    this.Menergia1max = true;
                    this.Menergiamax = false;
                  } else {
                    this.Menergia1max = false;
                    this.Menergiamax = false;
                  }
                  if (item.icoproteina == 2) {
                    this.Mproteinamax = true;
                    this.Mproteina1max = false;
                  } else if (item.icoproteina == 3) {
                    this.Mproteina1max = true;
                    this.Mproteinamax = false;
                  } else {
                    this.Mproteina1max = false;
                    this.Mproteinamax = false;
                  }
                  if (item.icocarbohidrato == 2) {
                    this.Mcarbohidratomax = true;
                    this.Mcarbohidrato1max = false;
                  } else if (item.icocarbohidrato == 3) {
                    this.Mcarbohidrato1max = true;
                    this.Mcarbohidratomax = false;
                  } else {
                    this.Mcarbohidrato1max = false;
                    this.Mcarbohidratomax = false;
                  }
                  if (item.icograsaTotal == 2) {
                    this.MgrasasTotalesmax = true;
                    this.MgrasasTotales1max = false;
                  } else if (item.icograsaTotal == 3) {
                    this.MgrasasTotales1max = true;
                    this.MgrasasTotalesmax = false;
                  } else {
                    this.MgrasasTotales1max = false;
                    this.MgrasasTotalesmax = false;
                  }
                  if (item.icograsaSaturada == 2) {
                    this.MgrasasSaturadasmax = true;
                    this.MgrasasSaturadas1max = false;
                  } else if (item.icograsaSaturada == 3) {
                    this.MgrasasSaturadas1max = true;
                    this.MgrasasSaturadasmax = false;
                  } else {
                    this.MgrasasSaturadas1max = false;
                    this.MgrasasSaturadasmax = false;
                  }
                  //min
                  if (item.icoenergia2 == 2) {
                    this.Menergiamin = true;
                    this.Menergia1min = false;
                  } else if (item.icoenergia == 3) {
                    this.Menergia1min = true;
                    this.Menergiamin = false;
                  } else {
                    this.Menergia1min = false;
                    this.Menergiamin = false;
                  }
                  if (item.icoproteina2 == 2) {
                    this.Mproteinamin = true;
                    this.Mproteina1min = false;
                  } else if (item.icoproteina == 3) {
                    this.Mproteina1min = true;
                    this.Mproteinamin = false;
                  } else {
                    this.Mproteina1min = false;
                    this.Mproteinamin = false;
                  }
                  if (item.icocarbohidrato2 == 2) {
                    this.Mcarbohidratomin = true;
                    this.Mcarbohidrato1min = false;
                  } else if (item.icocarbohidrato == 3) {
                    this.Mcarbohidrato1min = true;
                    this.Mcarbohidratomin = false;
                  } else {
                    this.Mcarbohidrato1min = false;
                    this.Mcarbohidratomin = false;
                  }
                  if (item.icograsaTotal2 == 2) {
                    this.MgrasasTotalesmin = true;
                    this.MgrasasTotales1min = false;
                  } else if (item.icograsaTotal == 3) {
                    this.MgrasasTotales1min = true;
                    this.MgrasasTotalesmin = false;
                  } else {
                    this.MgrasasTotales1min = false;
                    this.MgrasasTotalesmin = false;
                  }
                  if (item.icograsaSaturada2 == 2) {
                    this.MgrasasSaturadasmin = true;
                    this.MgrasasSaturadas1min = false;
                  } else if (item.icograsaSaturada == 3) {
                    this.MgrasasSaturadas1max = true;
                    this.MgrasasSaturadasmax = false;
                  } else {
                    this.MgrasasSaturadas1max = false;
                    this.MgrasasSaturadasmax = false;
                  }
                })


                micro.forEach(item => {
                  //max
                  if (item.icocalcio == 2) {
                    this.Mcalciomax = true;
                    this.Mcalcio1max = false;
                  } else if (item.icocalcio == 3) {
                    this.Mcalcio1max = true;
                    this.Mcalciomax = false;
                  } else {
                    this.Mcalcio1max = false;
                    this.Mcalciomax = false;
                  }
                  if (item.icohierro == 2) {
                    this.Mhierromax = true;
                    this.Mhierro1max = false;
                  } else if (item.icohierro == 3) {
                    this.Mhierro1max = true;
                    this.Mhierromax = false;
                  } else {
                    this.Mhierro1max = false;
                    this.Mhierromax = false;
                  }
                  if (item.icosodio == 2) {
                    this.Msodiomax = true;
                    this.Msodio1max = false;
                  } else if (item.icosodio == 3) {
                    this.Msodio1max = true;
                    this.Msodiomax = false;
                  } else {
                    this.Msodio1max = false;
                    this.Msodiomax = false;
                  }
                  if (item.icovitamina == 2) {
                    this.Mvitaminamax = true;
                    this.Mvitamina1max = false;
                  } else if (item.icovitamina == 3) {
                    this.Mvitamina1max = true;
                    this.Mvitaminamax = false;
                  } else {
                    this.Mvitamina1max = false;
                    this.Mvitaminamax = false;
                  }
                  if (item.icozinc == 2) {
                    this.Mzincmax = true;
                    this.Mzinc1max = false;
                  } else if (item.icozinc == 3) {
                    this.Mzinc1max = true;
                    this.Mzincmax = false;
                  } else {
                    this.Mzinc1max = false;
                    this.Mzincmax = false;
                  }

                  //min
                  if (item.icocalcio2 == 2) {
                    this.Mcalciomin = true;
                    this.Mcalcio1min = false;
                  } else if (item.icocalcio2 == 3) {
                    this.Mcalcio1min = true;
                    this.Mcalciomin = false;
                  } else {
                    this.Mcalcio1min = false;
                    this.Mcalciomin = false;
                  }
                  if (item.icohierro2 == 2) {
                    this.Mhierromin = true;
                    this.Mhierro1min = false;
                  } else if (item.icohierro2 == 3) {
                    this.Mhierro1min = true;
                    this.Mhierromin = false;
                  } else {
                    this.Mhierro1min = false;
                    this.Mhierromin = false;
                  }
                  if (item.icosodio2 == 2) {
                    this.Msodiomin = true;
                    this.Msodio1min = false;
                  } else if (item.icosodio2 == 3) {
                    this.Msodio1min = true;
                    this.Msodiomin = false;
                  } else {
                    this.Msodio1min = false;
                    this.Msodiomin = false;
                  }
                  if (item.icovitamina2 == 2) {
                    this.Mvitaminamin = true;
                    this.Mvitamina1min = false;
                  } else if (item.icovitamina2 == 3) {
                    this.Mvitamina1min = true;
                    this.Mvitaminamin = false;
                  } else {
                    this.Mvitamina1min = false;
                    this.Mvitaminamin = false;
                  }
                  if (item.icozinc2 == 2) {
                    this.Mzincmin = true;
                    this.Mzinc1min = false;
                  } else if (item.icozinc2 == 3) {
                    this.Mzinc1min = true;
                    this.Mzincmin = false;
                  } else {
                    this.Mzinc1min = false;
                    this.Mzincmin = false;
                  }
                })

              }
            }
          })
      } else {
        if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 1) {
          let macro = this.dataSourceMacro.filter(item => item.id == 5)
          macro.forEach(item => {
            if (item.icoenergia == 2) {
              this.Menergia = true;
              this.Menergia1 = false;
            } else if (item.icoenergia == 3) {
              this.Menergia1 = true;
              this.Menergia = false;
            } else {
              this.Menergia1 = false;
              this.Menergia = false;
            }
            if (item.icoproteina == 2) {
              this.Mproteina = true;
              this.Mproteina1 = false;
            } else if (item.icoproteina == 3) {
              this.Mproteina1 = true;
              this.Mproteina = false;
            } else {
              this.Mproteina1 = false;
              this.Mproteina = false;
            }
            if (item.icocarbohidrato == 2) {
              this.Mcarbohidrato = true;
              this.Mcarbohidrato1 = false;
            } else if (item.icocarbohidrato == 3) {
              this.Mcarbohidrato1 = true;
              this.Mcarbohidrato = false;
            } else {
              this.Mcarbohidrato1 = false;
              this.Mcarbohidrato = false;
            }
            if (item.icograsaTotal == 2) {
              this.MgrasasTotales = true;
              this.MgrasasTotales1 = false;
            } else if (item.icograsaTotal == 3) {
              this.MgrasasTotales1 = true;
              this.MgrasasTotales = false;
            } else {
              this.MgrasasTotales1 = false;
              this.MgrasasTotales = false;
            }
            if (item.icograsaSaturada == 2) {
              this.MgrasasSaturadas = true;
              this.MgrasasSaturadas1 = false;
            } else if (item.icograsaSaturada == 3) {
              this.MgrasasSaturadas1 = true;
              this.MgrasasSaturadas = false;
            } else {
              this.MgrasasSaturadas1 = false;
              this.MgrasasSaturadas = false;
            }
          })

          let micro = this.dataSourceMicro.filter(item => item.id == 5)
          micro.forEach(item => {
            if (item.icocalcio == 2) {
              this.Mcalcio = true;
              this.Mcalcio1 = false;
            } else if (item.icocalcio == 3) {
              this.Mcalcio1 = true;
              this.Mcalcio = false;
            } else {
              this.Mcalcio = false;
              this.Mcalcio1 = false;
            }
            if (item.icohierro == 2) {
              this.Mhierro = true;
              this.Mhierro1 = false;
            } else if (item.icohierro == 3) {
              this.Mhierro1 = true;
              this.Mhierro = false;
            } else {
              this.Mhierro1 = false;
              this.Mhierro = false;
            }
            if (item.icosodio == 2) {
              this.Msodio = true;
              this.Msodio1 = false;
            } else if (item.icosodio == 3) {
              this.Msodio1 = true;
              this.Msodio = false;
            } else {
              this.Msodio1 = false;
              this.Msodio = false;
            }
            if (item.icovitamina == 2) {
              this.Mvitamina = true;
              this.Mvitamina1 = false;
            } else if (item.icovitamina == 3) {
              this.Mvitamina1 = true;
              this.Mvitamina = false;
            } else {
              this.Mvitamina1 = false;
              this.Mvitamina = false;
            }
            if (item.icozinc == 2) {
              this.Mzinc = true;
              this.Mzinc1 = false;
            } else if (item.icozinc == 3) {
              this.Mzinc1 = true;
              this.Mzinc = false;
            } else {
              this.Mzinc1 = false;
              this.Mzinc = false;
            }
          })
        } else if (this.dataMinutaPatron[0].iD_TipoModeloOperacionBase == 2) {
          let macro = this.dataSourceMacro2.filter(item => item.id == 8)
          let micro = this.dataSourceMicro2.filter(item => item.id == 8)
          macro.forEach(item => {
            //max
            if (item.icoenergia == 2) {
              this.Menergiamax = true;
              this.Menergia1max = false;
            } else if (item.icoenergia == 3) {
              this.Menergia1max = true;
              this.Menergiamax = false;
            } else {
              this.Menergia1max = false;
              this.Menergiamax = false;
            }
            if (item.icoproteina == 2) {
              this.Mproteinamax = true;
              this.Mproteina1max = false;
            } else if (item.icoproteina == 3) {
              this.Mproteina1max = true;
              this.Mproteinamax = false;
            } else {
              this.Mproteina1max = false;
              this.Mproteinamax = false;
            }
            if (item.icocarbohidrato == 2) {
              this.Mcarbohidratomax = true;
              this.Mcarbohidrato1max = false;
            } else if (item.icocarbohidrato == 3) {
              this.Mcarbohidrato1max = true;
              this.Mcarbohidratomax = false;
            } else {
              this.Mcarbohidrato1max = false;
              this.Mcarbohidratomax = false;
            }
            if (item.icograsaTotal == 2) {
              this.MgrasasTotalesmax = true;
              this.MgrasasTotales1max = false;
            } else if (item.icograsaTotal == 3) {
              this.MgrasasTotales1max = true;
              this.MgrasasTotalesmax = false;
            } else {
              this.MgrasasTotales1max = false;
              this.MgrasasTotalesmax = false;
            }
            if (item.icograsaSaturada == 2) {
              this.MgrasasSaturadasmax = true;
              this.MgrasasSaturadas1max = false;
            } else if (item.icograsaSaturada == 3) {
              this.MgrasasSaturadas1max = true;
              this.MgrasasSaturadasmax = false;
            } else {
              this.MgrasasSaturadas1max = false;
              this.MgrasasSaturadasmax = false;
            }
            //min
            if (item.icoenergia2 == 2) {
              this.Menergiamin = true;
              this.Menergia1min = false;
            } else if (item.icoenergia == 3) {
              this.Menergia1min = true;
              this.Menergiamin = false;
            } else {
              this.Menergia1min = false;
              this.Menergiamin = false;
            }
            if (item.icoproteina2 == 2) {
              this.Mproteinamin = true;
              this.Mproteina1min = false;
            } else if (item.icoproteina == 3) {
              this.Mproteina1min = true;
              this.Mproteinamin = false;
            } else {
              this.Mproteina1min = false;
              this.Mproteinamin = false;
            }
            if (item.icocarbohidrato2 == 2) {
              this.Mcarbohidratomin = true;
              this.Mcarbohidrato1min = false;
            } else if (item.icocarbohidrato == 3) {
              this.Mcarbohidrato1min = true;
              this.Mcarbohidratomin = false;
            } else {
              this.Mcarbohidrato1min = false;
              this.Mcarbohidratomin = false;
            }
            if (item.icograsaTotal2 == 2) {
              this.MgrasasTotalesmin = true;
              this.MgrasasTotales1min = false;
            } else if (item.icograsaTotal == 3) {
              this.MgrasasTotales1min = true;
              this.MgrasasTotalesmin = false;
            } else {
              this.MgrasasTotales1min = false;
              this.MgrasasTotalesmin = false;
            }
            if (item.icograsaSaturada2 == 2) {
              this.MgrasasSaturadasmin = true;
              this.MgrasasSaturadas1min = false;
            } else if (item.icograsaSaturada == 3) {
              this.MgrasasSaturadas1max = true;
              this.MgrasasSaturadasmax = false;
            } else {
              this.MgrasasSaturadas1max = false;
              this.MgrasasSaturadasmax = false;
            }
          })


          micro.forEach(item => {
            //max
            if (item.icocalcio == 2) {
              this.Mcalciomax = true;
              this.Mcalcio1max = false;
            } else if (item.icocalcio == 3) {
              this.Mcalcio1max = true;
              this.Mcalciomax = false;
            } else {
              this.Mcalcio1max = false;
              this.Mcalciomax = false;
            }
            if (item.icohierro == 2) {
              this.Mhierromax = true;
              this.Mhierro1max = false;
            } else if (item.icohierro == 3) {
              this.Mhierro1max = true;
              this.Mhierromax = false;
            } else {
              this.Mhierro1max = false;
              this.Mhierromax = false;
            }
            if (item.icosodio == 2) {
              this.Msodiomax = true;
              this.Msodio1max = false;
            } else if (item.icosodio == 3) {
              this.Msodio1max = true;
              this.Msodiomax = false;
            } else {
              this.Msodio1max = false;
              this.Msodiomax = false;
            }
            if (item.icovitamina == 2) {
              this.Mvitaminamax = true;
              this.Mvitamina1max = false;
            } else if (item.icovitamina == 3) {
              this.Mvitamina1max = true;
              this.Mvitaminamax = false;
            } else {
              this.Mvitamina1max = false;
              this.Mvitaminamax = false;
            }
            if (item.icozinc == 2) {
              this.Mzincmax = true;
              this.Mzinc1max = false;
            } else if (item.icozinc == 3) {
              this.Mzinc1max = true;
              this.Mzincmax = false;
            } else {
              this.Mzinc1max = false;
              this.Mzincmax = false;
            }

            //min
            if (item.icocalcio2 == 2) {
              this.Mcalciomin = true;
              this.Mcalcio1min = false;
            } else if (item.icocalcio2 == 3) {
              this.Mcalcio1min = true;
              this.Mcalciomin = false;
            } else {
              this.Mcalcio1min = false;
              this.Mcalciomin = false;
            }
            if (item.icohierro2 == 2) {
              this.Mhierromin = true;
              this.Mhierro1min = false;
            } else if (item.icohierro2 == 3) {
              this.Mhierro1min = true;
              this.Mhierromin = false;
            } else {
              this.Mhierro1min = false;
              this.Mhierromin = false;
            }
            if (item.icosodio2 == 2) {
              this.Msodiomin = true;
              this.Msodio1min = false;
            } else if (item.icosodio2 == 3) {
              this.Msodio1min = true;
              this.Msodiomin = false;
            } else {
              this.Msodio1min = false;
              this.Msodiomin = false;
            }
            if (item.icovitamina2 == 2) {
              this.Mvitaminamin = true;
              this.Mvitamina1min = false;
            } else if (item.icovitamina2 == 3) {
              this.Mvitamina1min = true;
              this.Mvitaminamin = false;
            } else {
              this.Mvitamina1min = false;
              this.Mvitaminamin = false;
            }
            if (item.icozinc2 == 2) {
              this.Mzincmin = true;
              this.Mzinc1min = false;
            } else if (item.icozinc2 == 3) {
              this.Mzinc1min = true;
              this.Mzincmin = false;
            } else {
              this.Mzinc1min = false;
              this.Mzincmin = false;
            }
          })

        }
      }
    }
  }

}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'ptn-prepacion-disponible-ciclo.dialog.component.html',
  styleUrls: ["./ptn-prepacion-disponible-ciclo.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogPTNPreparacionContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  maxfileerror: any;
  // Listas relacionales
  form: FormGroup;
  public tipoRacionList: any = [];
  public tipoRacionListR: any = [];
  GrupoAlimentoList: any[] = [];
  SubGrupoAlimentoList: any[] = [];
  selcompo = 0;
  selGrupo = 0;
  selSubGrupo = 0;
  seltipo = 0;
  cantIngredientes = 0;
  Alimento = '';
  favoriteSeason: string;
  mensaje: boolean = false;
  h: any[] = [];
  idMode = 0;
  idCompl = 0;
  idMinuta = 0;
  idCiclo = 0;
  idMC = 0;
  busquedaPreparacionParams: PA_BuscarPreparacionRequest = {};
  tipoPreparacion: any[] = [
    { id: 1, nombre: 'Mixta', estado: true },
    { id: 2, nombre: 'Simple', estado: false },
    { id: 3, nombre: 'Bebida', estado: false },
  ];
  PA_GetPreparacionParams: PA_GetPreparacionRequest = {};
  public TiposComponentesList: any = [];
  public tipoRacionListfilter: any = [];
  constructor(public dialogRef: MatDialogRef<DialogPTNPreparacionContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    private _TiposComponenteService: TiposComponenteService,
    private _PA_GetPreparacionService: PA_GetPreparacionService,
    private _PA_GrupobyComponenteService: PA_GrupobyComponenteService,
    private _PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private _TiposRacionService: TiposComplementoService,
  ) {

    this.form = this.fb.group({
      id: [data.id],
      iD_Producto: [data.iD_AlimentosICBF, Validators.required],
      siD_Producto: [data.siD_AlimentosICBF, Validators.required],
      numero: [1],
    })

    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.PA_GetPreparacionParams.Id_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
    this.idMode = data.ciclo.iD_TipoModeloOperacion;
    this.idCompl = data.ciclo.iD_TipoComplemento;
    this.idMC = data.ciclo.iD_TipoModalidadComplemento

    this._PA_GetPreparacionService.getPA_GetPreparacionList(this.PA_GetPreparacionParams).subscribe(
      (response: any) => {

        if (data.ciclo.iD_TipoModeloOperacion == 1) {
          this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
          this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
        } else if (data.ciclo.iD_TipoModeloOperacion == 2) {
          this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
          this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
        } else if (data.ciclo.iD_TipoModeloOperacion == 3) {

          let g = 0
          if (data.ciclo.iD_TipoModalidadComplemento == 3) {
            g = 1;
          } else {
            g = data.ciclo.iD_TipoModalidadComplemento;
          }
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(data.ciclo.iD_MinutaAprobacion, g, data.ciclo.iD_TipoComplemento).subscribe(
            (res: any) => {
              let o = res;
              if (o.length == 0) {
                this._TiposRacionService.getTiposComplementoList().subscribe(
                  (response: any) => {

                    this.tipoRacionListfilter = response.filter(item => item.id != 4);
                    this.tipoRacionListfilter.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                    let j = this.tipoRacionListfilter.filter(item => item.id != data.ciclo.iD_TipoComplemento)

                    this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(data.ciclo.iD_MinutaAprobacion, g, j[0].id).subscribe(
                      (res1: any) => {
                        let p = res1;
                        if (p.length == 0) { } else {
                          if (p[0].iD_TipoModeloOperacionBase == 1) {
                            this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
                            this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
                            this.tipoRacionList.sort(function (a, b) {
                              const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            this.cantIngredientes = this.tipoRacionList.length;
                          } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                            this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
                            this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
                            this.tipoRacionList.sort(function (a, b) {
                              const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            this.cantIngredientes = this.tipoRacionList.length;
                          }
                        }
                      })
                  }, (err) => { });

              } else {
                if (o[0].iD_TipoModeloOperacionBase == 1) {

                  this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
                  this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion && item.tipoRacion == data.ciclo.iD_TipoComplemento);
                  this.tipoRacionList.sort(function (a, b) {
                    const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });

                  this.cantIngredientes = this.tipoRacionList.length;
                } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                  this.tipoRacionList = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
                  this.tipoRacionListR = response.filter(item => item.modeloOperacion == data.ciclo.iD_TipoModeloOperacion);
                  this.tipoRacionList.sort(function (a, b) {
                    const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });

                  this.cantIngredientes = this.tipoRacionList.length;
                }
              }
            })

        }

        this.tipoRacionList.sort(function (a, b) {
          const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
          const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        this.cantIngredientes = this.tipoRacionList.length;
      },
      (err) => {
      });

    /* this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    ); */
    this._TiposComponenteService.getTiposComponenteList().subscribe(
      (response: any) => {

        this.TiposComponentesList = response;

        this.TiposComponentesList.sort(function (a, b) {
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
      }
    );

  }
  ingcom() {


  }

  aler(nombre: any) {
    var nombrep = this.tipoRacionList.filter(item => item.id == nombre)

    this.form.controls['siD_Producto'].setValue(nombrep[0].preparacion);
    this.mensaje = false;
  }
  doAction(): void {

    if (this.form.controls.iD_Producto.value == null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        this.mensaje = true;

      })
    } else {
      this.mensaje = false;

      this.dialogRef.close({ event: 'Adicionar', data: this.form.value });
    }

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  Buscar(com: number, selGrupo: number, selSubGrupo: number, tipo: any, Alimento: string) {

    if (com != 0 && selSubGrupo == 0 && selGrupo == 0 && tipo == 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = com;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = null,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com == 0 && selSubGrupo == 0 && selGrupo != 0 && tipo == 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = selGrupo;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = null,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com == 0 && selSubGrupo != 0 && selGrupo == 0 && tipo == 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = selSubGrupo;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = null,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com == 0 && selSubGrupo == 0 && selGrupo == 0 && tipo != 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = tipo,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com == 0 && selSubGrupo == 0 && selGrupo == 0 && tipo == 0 && Alimento != '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = null;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = null,
        this.PA_GetPreparacionParams.Preparacion = Alimento;
      this.tablaap();
    } else if (com == 0 && selSubGrupo != 0 && selGrupo != 0 && tipo == 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = selGrupo;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = selSubGrupo;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = null,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com == 0 && selSubGrupo != 0 && selGrupo != 0 && tipo != 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = null;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = selGrupo;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = selSubGrupo;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = tipo,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com != 0 && selSubGrupo != 0 && selGrupo != 0 && tipo == 0 && Alimento == '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = com;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = selGrupo;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = selSubGrupo;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = tipo,
        this.PA_GetPreparacionParams.Preparacion = null;
      this.tablaap();
    } else if (com != 0 && selSubGrupo != 0 && selGrupo != 0 && tipo == 0 && Alimento != '') {
      this.restartfilter();
      this.PA_GetPreparacionParams.id_TipoComponente = com;
      this.PA_GetPreparacionParams.Id_GrupoAlimento = selGrupo;
      this.PA_GetPreparacionParams.Id_SubgrupoAlimento = selSubGrupo;
      this.PA_GetPreparacionParams.Id_TipoPreparacion = tipo,
        this.PA_GetPreparacionParams.Preparacion = Alimento;
      this.tablaap();
    }


  }

  tablaap(): void {

    this._PA_GetPreparacionService.getPA_GetPreparacionList(this.PA_GetPreparacionParams).subscribe(
      (response: any) => {

        if (this.idMode == 1) {
          this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
          this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
        } else if (this.idMode == 2) {
          this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode);
          this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode);
        } else if (this.idMode == 3) {
          let g = 0
          if (this.idMC == 3) {
            g = 1;
          } else {
            g = this.idMC;
          }
          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.idMode, g, this.idCompl).subscribe(
            (res: any) => {
              let o = res;
              if (o.length == 0) {
                this._TiposRacionService.getTiposComplementoList().subscribe(
                  (response: any) => {

                    this.tipoRacionListfilter = response.filter(item => item.id != 4);
                    this.tipoRacionListfilter.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                    let j = this.tipoRacionListfilter.filter(item => item.id != this.idCompl)

                    this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilterbucar(this.idMode, g, j[0].id).subscribe(
                      (res1: any) => {
                        let p = res1;
                        if (p.length == 0) { } else {
                          if (p[0].iD_TipoModeloOperacionBase == 1) {
                            this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
                            this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
                            this.tipoRacionList.sort(function (a, b) {
                              const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            this.cantIngredientes = this.tipoRacionList.length;
                          } else if (p[0].iD_TipoModeloOperacionBase == 2) {
                            this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode);
                            this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode);
                            this.tipoRacionList.sort(function (a, b) {
                              const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            this.cantIngredientes = this.tipoRacionList.length;
                          }
                        }
                      })
                  }, (err) => { });

              } else {
                if (o[0].iD_TipoModeloOperacionBase == 1) {

                  this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
                  this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode && item.tipoRacion == this.idCompl);
                  this.tipoRacionList.sort(function (a, b) {
                    const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });

                  this.cantIngredientes = this.tipoRacionList.length;
                } else if (o[0].iD_TipoModeloOperacionBase == 2) {
                  this.tipoRacionList = response.filter(item => item.modeloOperacion == this.idMode);
                  this.tipoRacionListR = response.filter(item => item.modeloOperacion == this.idMode);
                  this.tipoRacionList.sort(function (a, b) {
                    const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });

                  this.cantIngredientes = this.tipoRacionList.length;
                }
              }
            })

        }
        this.tipoRacionList.sort(function (a, b) {
          const nameA = a.preparacion.toUpperCase(); // ignore upper and lowercase
          const nameB = b.preparacion.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        this.cantIngredientes = this.tipoRacionList.length;
      },
      (err) => {
      });
  }
  restartfilter(): void {

    this.tipoRacionList = this.tipoRacionListR;

  }
  selectionComponete(id: number) {
    this._PA_GrupobyComponenteService.getPA_GrupobyComponenteList(id).subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    )
  }
  selectionGrupo(id: number) {
    this._PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(id).subscribe(
      (response: any) => {

        this.SubGrupoAlimentoList = response;
        this.SubGrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );

  }



}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'ptn-producto-disponible-ciclo.dialog.component.html',
  styleUrls: ["./ptn-producto-disponible-ciclo.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogPTNProduCicloContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  maxfileerror: any;
  // Listas relacionales
  form: FormGroup;
  public tipoRacionList: any = [];
  public tipoRacionListR: any = [];
  GrupoAlimentoList: any[] = [];
  SubGrupoAlimentoList: any[] = [];
  selcompo = 0;
  selGrupo = 0;
  selSubGrupo = 0;
  seltipo = 0;
  cantIngredientes = 0;
  Alimento = '';
  favoriteSeason: string;
  mensaje: boolean = false;
  h: any[] = [];
  idMode = 0
  idCompl = 0
  idETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
  busquedaPreparacionParams: PA_BuscarPreparacionRequest = {};
  tipoPreparacion: any[] = [
    { id: 1, nombre: 'Mixta', estado: true },
    { id: 2, nombre: 'Simple', estado: false },
    { id: 3, nombre: 'Bebida', estado: false },
  ];
  PA_GetProductoParams: PA_GetProductosRequest = {};
  public TiposComponentesList: any = [];
  constructor(public dialogRef: MatDialogRef<DialogPTNProduCicloContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _SubGrupoAlimentosService: SubGrupoAlimentosService,
    private _TiposComponenteService: TiposComponenteService,
    private _productosService: ProductosService,
    private _PA_GrupobyComponenteService: PA_GrupobyComponenteService,
    private _PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
  ) {

    this.form = this.fb.group({
      id: [data.id],
      iD_Producto: [data.iD_AlimentosICBF, Validators.required],
      siD_Producto: [data.siD_AlimentosICBF, Validators.required],
      numero: [1],
    })

    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.idMode = data.ciclo.iD_TipoModeloOperacion;
    this.idCompl = data.ciclo.iD_TipoComplemento;
    this.PA_GetProductoParams.Id_ETC = this.idETC;

    this._productosService.getProductosListRelationfilter2(3).subscribe(
      (res: any) => {

        this.tipoRacionList = res;
        this.tipoRacionListR = res;
        this.tipoRacionList.sort(function (a, b) {
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

        this.cantIngredientes = this.tipoRacionList.length;
      },
      (err) => {
      }
    );
    /*
        this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
          (response: any) => {

            this.GrupoAlimentoList = response;
            this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

          },
          (err) => {
          }
        ); */
    this._TiposComponenteService.getTiposComponenteList().subscribe(
      (response: any) => {

        this.TiposComponentesList = response;
        this.TiposComponentesList.sort(function (a, b) {
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
      }
    );

  }
  ingcom() {


  }
  aler(nombre: any) {
    var nombrep = this.tipoRacionList.filter(item => item.id == nombre)

    this.form.controls['siD_Producto'].setValue(nombrep[0].preparacion);
    this.mensaje = false;
  }
  doAction(): void {

    if (this.form.controls.iD_Producto.value == null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> formulario para poder continuar</p> ',
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

        this.mensaje = true;

      })
    } else {
      this.mensaje = false;

      this.dialogRef.close({ event: 'Adicionar', data: this.form.value });
    }

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }




  Buscarp(com: number, selGrupo: number, selSubGrupo: number, Alimento: string) {

    this.PA_GetProductoParams.estado = 3;
    if (com == 0 && selSubGrupo == 0 && selGrupo == 0 && Alimento == '') {
      this.restartfilter();

      this.cantIngredientes = this.tipoRacionList.length;

    } else if (com == 0 && selSubGrupo == 0 && selGrupo == 0 && Alimento != '') {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.nombre.toLocaleLowerCase().indexOf(Alimento) !== -1 || t.nombre.toLocaleUpperCase().indexOf(Alimento) !== -1)
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (com != 0 && selSubGrupo != 0 && selGrupo != 0 && Alimento == '') {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.iD_SubGrupoAlimentos == selSubGrupo)
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (com != 0 && selSubGrupo != 0 && selGrupo != 0 && Alimento != '') {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.iD_SubGrupoAlimentos == selSubGrupo && t.nombre.toLocaleLowerCase().indexOf(Alimento) !== -1 || t.nombre.toLocaleUpperCase().indexOf(Alimento) !== -1)
      this.cantIngredientes = this.tipoRacionList.length;
    } else { }
  }


  restartfilter(): void {

    this.tipoRacionList = this.tipoRacionListR;

  }
  selectionComponete(id: number) {
    this._PA_GrupobyComponenteService.getPA_GrupobyComponenteList(id).subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    )
  }
  selectionGrupo(id: number) {
    this._PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(id).subscribe(
      (response: any) => {

        this.SubGrupoAlimentoList = response;
        this.SubGrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );

  }



}
