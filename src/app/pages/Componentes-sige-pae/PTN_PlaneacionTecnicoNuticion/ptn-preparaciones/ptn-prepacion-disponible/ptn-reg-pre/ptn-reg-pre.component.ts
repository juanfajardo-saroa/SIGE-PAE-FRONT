import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { SeguridadService } from './../../../../../../seguridad/seguridad.service';
import { CiclosMenusModel } from './../../../../../../shared/model/CiclosMenus';
import { PA_AporteNutricionalIngredientesRequest } from 'src/app/shared/services/PA_AporteNutricionalIngredientes.services';
import { PA_AporteNutricionalIngredientesDetRequest } from 'src/app/shared/services/PA_AporteNutricionalIngredientesDet.services';
import { PA_AportesComponentePreparacionDetRequest, PA_AportesComponentePreparacionDetService } from 'src/app/shared/services/PA_AporteComponentePreparacionDet.services';
import { PA_AportesComponentePreparacionService } from 'src/app/shared/services/PA_AportesComponentePreparacion.services';
import { NutrientesIngredientesService } from 'src/app/shared/services/NutrientesIngredientes.services';
import { NutrientesIngredientesModel } from 'src/app/shared/model/NutrientesIngredientes';
import { PreparacionComplementosService } from 'src/app/shared/services/PreparacionComplementos.services';
import { MessageService } from './../../../../../../services/message.service';
import { PreparacionesService } from 'src/app/shared/services/Preparaciones.services';
import { SubGrupoAlimentosService } from './../../../../../../shared/services/SubGrupoAlimentos.services';
import { GrupoAlimentosService } from './../../../../../../shared/services/GrupoAlimentos.services';
import { AlimentosICBFService } from './../../../../../../shared/services/AlimentosICBF.services';
import Swal from 'sweetalert2';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientesModel } from 'src/app/shared/model/Ingredientes';
import { MinutaPatronAlimentosService } from 'src/app/shared/services/MinutaPatronAlimentos.services';
import { NutrientesService } from 'src/app/shared/services/Nutrientes.services';
import { MatTableDataSource } from '@angular/material/table';
import { NutrientesModel } from 'src/app/shared/model/Nutrientes';
import { NutrientesAlimentosModel } from 'src/app/shared/model/NutrientesAlimentos';
import { ComponentesPreparacionService } from 'src/app/shared/services/ComponentesPreparacion.services';
import { PreparacionComplementosModel } from 'src/app/shared/model/PreparacionComplementos';
import { PesoNetoPreparacionModel } from 'src/app/shared/model/PesoNetoPreparacion';
import { IngredientesService } from 'src/app/shared/services/Ingredientes.services';
import { PesoNetoPreparacionService } from 'src/app/shared/services/PesoNetoPreparacion.services';
import { PesoServidoPreparacionService } from 'src/app/shared/services/PesoServidoPreparacion.services';
import { PesoServidoPreparacionModel } from 'src/app/shared/model/PesoServidoPreparacion';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { TiposActividadFisicaService } from 'src/app/shared/services/TiposActividadFisica.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { PA_GetGrupoSubgrupoRequest, PA_GetGrupoSubgrupoService } from 'src/app/shared/services/PA_GetGrupoSubgrupo.services';
import { PA_PreparacionesGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionesGetAllWithRelation.services';
import { PA_NutrientesAlimentosGetAllWithRelationService } from 'src/app/shared/services/PA_NutrientesAlimentosGetAllWithRelation.services';
import { PA_PreparacionComplementosGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionComplementosGetAllWithRelation.services';
import { PA_ComponentesPreparacionGetAllWithRelationService } from 'src/app/shared/services/PA_ComponentesPreparacionGetAllWithRelation.services';
import { PA_IngredientesGetAllWithRelationService } from 'src/app/shared/services/PA_IngredientesGetAllWithRelation.services';
import { PA_NivelEducstivoPesoServidoPivService } from 'src/app/shared/services/PA_NivelEducativoPesoServidoPiv.services';
import { PA_IngredientesGetAllWithRelationModel } from 'src/app/shared/model/PA_IngredientesGetAllWithRelationModel';
@Component({
  selector: 'app-ptn-reg-pre',
  templateUrl: './ptn-reg-pre.component.html',
  styleUrls: ['./ptn-reg-pre.component.scss'],

})
export class PtnRegPreComponent implements OnInit {
  public ing: any = new EventEmitter<boolean>();
  public tipoSeleccionado: number = 1;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  public nombreUbicacion = localStorage.getItem('Ubicacion') + ' | Preparaciones';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;

  ID_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
  spans = {};
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  maxfileerror: any;
  // Listas relacionales
  public CategoriasList: any = [];
  public ModeloOperadorList: any = [];
  public tipoRacionList: any = [];
  public tipoRacionList2: any = [];
  public Aliment1: any = [];
  public Aliment2: any = [];
  public tipoRacionListMAER: any = [];
  public TiposComponentesList: any = [];
  public MinutasList: any = [];
  public ActividadfisicaList: any = [];
  contenidoRespuesta: string = '';
  VigenciasList: VigenciasModel[];
  ano: number = new Date().getFullYear();
  TipoModelos = 0;
  grado2 = 0;
  componente: boolean = false;
  Gaba: boolean = false;
  Gaba1: boolean = false;
  public viewActiva: number = 0;
  AporteNutricionalIngredientesParams: PA_AporteNutricionalIngredientesRequest = {}
  AporteNutricionalIngredientesDetParams: PA_AporteNutricionalIngredientesDetRequest = {}
  AportesComponentePreparacionDetParams: PA_AportesComponentePreparacionDetRequest = {}
  GetGrupoSubgrupoParams: PA_GetGrupoSubgrupoRequest = {}
  preparacionBebidaDi = true;
  public PreparacionObject: any = {
    id: 0,
    iD_TipoModeloOperacion: 0,
    iD_MinutaPatron: null,
    iD_ETC: Number(localStorage.getItem('IdUbicacion')),
    nombre: '',
    preparacionMixta: null,
    preparacionBebida: null,
    preparacionBebida1: null,
    id_preparacionBebida: null,
    id_preparacionMixta: null,
    guiaPreparacion: '',
    pathGuia: '',
    fechaPreparacion: new Date(),
    iD_TipoEstado: 6,
    ModificadoEstado: null
  }
  public dataComponentes: any = {
    id: 0,
    iD_Preparacion: this.PreparacionObject.id,
    iD_TipoComponente: 0,
    nombre: '',
    ModificadoEstado: false,
  };
  public dataComponentesBebida: any = {
    id: 0,
    iD_Preparacion: this.PreparacionObject.id,
    iD_TipoComponente: 8,
    nombre: '',
    ModificacionEstado: null,
  };
  compomentesObject: any = {
    id: 0,
    iD_Preparacion: this.PreparacionObject.id,
    iD_TipoComponente: 0,
    nombre: '',
  }
  ComponenteN = 0;
  dataSourceGABA: any[] = [];
  public dataComponentesMas: any[] = []
  public PreparacionComplementosObject: PreparacionComplementosModel[] = []
  public PreparacionComplementosMAERObject: PreparacionComplementosModel[] = []
  public PreparacionComplementosPAEPIObject: PreparacionComplementosModel[] = []
  public PreparacionComplementosPAEPIObject2: PreparacionComplementosModel = {
    sID: '',
    id: 0,
    iD_Preparacion: this.PreparacionObject.id,
    siD_Preparacion: '',
    iD_TipoComplemento: 0,
    sID_TipoComplemento: '',
    activo: false,
    nombre: '',
    auditoria: '',
    estado: '',
    ModificacionEstado: null,
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

  private resultQuery1: boolean = false;
  private resultQuery2: boolean = false;
  public PreparacionComplementosGeneral: PreparacionComplementosModel = {
    sID: '',
    id: 0,
    iD_Preparacion: 0,
    siD_Preparacion: '',
    iD_TipoComplemento: 0,
    sID_TipoComplemento: '',
    activo: false,
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
    estado: '',
    ModificacionEstado: null,

  }
  public IngredienteGeneral: IngredientesModel = {
    sID: '',
    id: 0,
    iD_AlimentosICBF: 0,
    sID_AlimentosICBF: '',
    iD_TipoNivelEducativo: 0,
    sID_TipoNivelEducativo: '',
    iD_Producto: 0,
    iD_Preparacion: 0,
    siD_Preparacion: '',
    iD_TipoComplemento: 0,
    sID_TipoComplemento: '',
    pesoBruto: null,
    pesoNeto: null,
    porcentajeComestible: null,
    intercambioEstandarizado: null,
    auditoria: '',
    estado: null,
    ModificacionEstado: null,
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
    completed: false
  }
  public IngredientesObject: IngredientesModel[] = [];
  public AporteIngredienteObject: NutrientesIngredientesModel[] = []
  public AporteIngredienteObjectT: NutrientesIngredientesModel[] = []
  public AporteIngredientesGeneral: NutrientesIngredientesModel = {
    id: 0,
    iD_Ingrediente: 0,
    siD_Ingrediente: '',
    iD_Nutriente: 0,
    aporte: 0,
    auditoria: '',
    idAlimento: 0,
    idEdu: 0,
    comple: 0,

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
  }
  public PesoNetoObject: PesoNetoPreparacionModel[] = []
  public PesoNetoGeneral: PesoNetoPreparacionModel = {
    id: 0,
    iD_TipoComponente: 0,
    siD_TipoComponente: '',
    iD_TipoNivelEducativo: 0,
    siD_TipoNivelEducativo: '',
    iD_Preparacion: 0,
    siD_Preparacion: '',
    pesoNeto: 0,
    iD_SubGrupoAlimentos: 0,
    siD_SubGrupoAlimentos: '',
    iD_TipoComplemento: 0,
    siD_TipoComplemento: '',
    auditoria: '',
    iD_AlimentosICBF: 0,
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
    ModificacionEstado: null,
  }

  public PesoServidoGeneral: PesoServidoPreparacionModel = {
    id: 0,
    iD_TipoComplemento: null,
    siD_TipoComplemento: '',
    iD_TipoNivelEducativo: null,
    siD_TipoNivelEducativo: '',
    iD_Preparacion: 0,
    siD_Preparacion: '',
    pesoServido: 0,
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
  public PesoServidoGeneral2: PesoServidoPreparacionModel = {
    id: 0,
    iD_TipoComplemento: null,
    siD_TipoComplemento: '',
    iD_TipoNivelEducativo: null,
    siD_TipoNivelEducativo: '',
    iD_Preparacion: 0,
    siD_Preparacion: '',
    pesoServido: 0,
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

  mesajesalert: boolean = false;
  mesajesalert2: boolean = false;
  mesajesalert3: boolean = false;
  mesajesalert4: boolean = false;
  mesajesalert5: boolean = false;
  mesajesalert6: boolean = false;
  mesajesalert7: boolean = false;
  mesajesalert8: boolean = false;
  mensajespeso: boolean = false;
  mensajespesoneto: boolean = false;
  mesajesalertpre: boolean = false;
  mensajeIn: boolean = false;
  mensajeGuia: boolean = false;
  mensajeminmaem: boolean = false;
  mensajeminmaer: boolean = false;
  mensajeminpaepi: boolean = false;
  preg: boolean = false;
  preg1: boolean = false;
  preg2: boolean = false;
  preg3: boolean = false;
  preg4: boolean = false;
  preg5: boolean = false;
  preg6: boolean = false;
  preg7: boolean = false;
  preg8: boolean = false;
  preg9: boolean = false;
  preg10: boolean = false;
  preg11: boolean = false;
  preg12: boolean = false;
  favoriteSeason: string;
  aporteNutrcional: boolean = false;
  public nombreIngrediente: string = '';
  idIngrediente: number = 0;
  idIngredienteInsert: number = 0;
  btnanexosDisab: boolean = true;
  btnRepositoriosDisab: boolean = true;
  displayedColumns: string[] = ['Nombre', 'Caracteristicas'];
  displayedColumnsIn: string[] = ['Nombre', 'Caracteristicas', 'accion'];
  displayedColumnsNeto: string[] = ['Nombre', 'Valor'];
  displayedColumnsDos: string[] = ['Nivel', 'pesoal', 'pesoampm'];
  displayedColumnsUna: string[] = ['Nivel', 'peso'];
  displayedColumnsMAER: string[] = ['peso'];
  displayedColumnsComponentePAE: string[] = ['Componente', 'peso'];
  displayedColumnsComponenteGABA: string[] = ['grupo', 'subgrupo', 'peso'];
  Nutrientes: boolean = false;
  idTempNutrientes: number = 0;
  //peso servido
  maem2: boolean = false;
  maem1a: boolean = false;
  maem1b: boolean = false;
  maer1: boolean = false;

  contenidoRespuesta1: string = '';
  //dataSource = new MatTableDataSource<DiagnosticoSituacionalModel>();
  public dataSource: IngredientesModel[] = [];

  equivalencia: any[] = []
  nutrientes = new MatTableDataSource<NutrientesModel>()
  public pesoText: number = null;
  pesoServidoText: number = null;
  pesoBrutoText: number = null;
  porcentajeComestibleText: number = null;
  ma: NutrientesModel[] = [];
  mi: NutrientesModel[] = [];
  en: NutrientesModel[] = [];
  nuAlimentos: NutrientesAlimentosModel[];
  macro: any[] = [];
  micro: any[] = [];
  energia: any[] = [];
  peso: any[] = []
  peso2: any[] = []
  peso3: any[] = []
  tabs = [];
  public nuevoArray = []
  iD_TipoComplemento = 0;
  grado = 0;
  selected = new FormControl(0);
  dataSourceComponentePAE: any[] = []
  escala: any[] = [
    { id: 1, respuesta: 'Si' },
    { id: 0, respuesta: 'No' },
  ]
  NivelEducativoList: any[] = [];
  NivelEducativoList2: any[] = [];
  NivelEducativoList3: any[] = [];
  GrupoAlimentoList: any[] = [];
  SubGrupoAlimentoListT: any[] = [];
  Nivel1: boolean = false;
  Nivel2: boolean = false;
  isLoading = true;
  cantModelo = 0;
  selectedTabIndex: number = 0;
  public dataComponentesMAER: any[] = [];
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  public dataArrayInterno: any;

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
  public CiclosMenusObject: CiclosMenusModel = {
    id: 0,
    iD_TipoModeloOperacion: 0,
    siD_TipoModeloOperacion: '',
    iD_TipoComplemento: 0,
    siD_TipoComplemento: '',
    iD_TipoModalidadComplemento: 0,
    siD_TipoModalidadComplemento: '',
    iD_MinutaAprobacion: 0,
    sID_MinutaAprobacion: '',
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
    iD_ETC: 0,
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
    id_menuReferencia: 0,
    id_menusParaTodosNiveles: 0,
    id_menusParaTodasZonas: 0,
    siD_ETC: '',
    siD_EstadoRegistro: '',
    validationErrors: '-'
  }
  idPreparacion = 0;
  AprobacionesList: any;
  AprobacionesList2: any;
  lista = [];

  combinacion: boolean = false;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  isNextDisabled: boolean = false;
  constructor(
    private _ModeloOperacionService: TiposModeloOperacionService,
    private tiposRacionService: TiposComplementoService,
    private _NivelEducativoService: NivelEducativoService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private _TiposComponenteService: TiposComponenteService,
    private router: Router,
    public dialog: MatDialog,
    private _MinutaPatronAlimentosService: MinutaPatronAlimentosService,
    private _NutrientesService: NutrientesService,
    private _PreparacionesService: PreparacionesService,
    private _messageService: MessageService,
    private _ComponentesPreparacionService: ComponentesPreparacionService,
    private _PreparacionComplementosService: PreparacionComplementosService,
    private _AlimentosICBFService: AlimentosICBFService,
    private _GrupoAlimentosService: GrupoAlimentosService,
    private _IngredientesService: IngredientesService,
    private _NutrientesIngredientesService: NutrientesIngredientesService,
    private _PesoNetoPreparacionService: PesoNetoPreparacionService,
    private _PesoServidoPreparacionService: PesoServidoPreparacionService,
    private _PA_AportesComponentePreparacionService: PA_AportesComponentePreparacionService,
    private _PA_AportesComponentePreparacionDetService: PA_AportesComponentePreparacionDetService,
    private _TiposActividadFisicaService: TiposActividadFisicaService,
    public VigenciasServicio: VigenciasService,
    private route: ActivatedRoute,
    private seguridadService: SeguridadService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_GetGrupoSubgrupoService: PA_GetGrupoSubgrupoService,
    private _PA_PreparacionesGetAllWithRelationService: PA_PreparacionesGetAllWithRelationService,
    private _PA_NutrientesAlimentosGetAllWithRelationService: PA_NutrientesAlimentosGetAllWithRelationService,
    private _PA_PreparacionComplementosGetAllWithRelationService: PA_PreparacionComplementosGetAllWithRelationService,
    private _PA_ComponentesPreparacionGetAllWithRelationService: PA_ComponentesPreparacionGetAllWithRelationService,
    private _PA_IngredientesGetAllWithRelationService: PA_IngredientesGetAllWithRelationService,
    private _PA_NivelEducstivoPesoServidoPivService: PA_NivelEducstivoPesoServidoPivService,
  ) {
    this.route.queryParams.subscribe(params => {

      if (params.id == undefined) {
        this.idPreparacion = 0;
      } else {
        this.idPreparacion = +params.id;
      }

    });



    if (this.idPreparacion > 0) {
      this.traerdatos(this.idPreparacion)

    } else {
      this.idPreparacion = 0
    }

    this.todosLosFiltros();
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

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  Check: boolean = true;
  CambioVigencia(value: any) {



    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();


        if (this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre) {
          this.Check = false;
        } return this.Check
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
  ngOnInit(): void {
 
    this._AlimentosICBFService.getAlimentosICBFList().subscribe(
      (response: any) => {

        this.Aliment1 = response;
        this.Aliment1.sort(function (a, b) {
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
      });
    this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

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
  idM = 0;
  traerdatos(id: number) {
    if (id == 0) { } else {

      this._TiposActividadFisicaService.getTiposActividadFisicaList().subscribe(
        (response: any) => {

          this.ActividadfisicaList = response;

          this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter2(2, this.idETC).subscribe(
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

              if (this.MinutasList.length == 0) { this.mensajeminpaepi = true; } else { }
              this._PA_PreparacionesGetAllWithRelationService.getPA_PreparacionesGetAllWithRelationList(id).subscribe(
                async (response: any) => {
                  let d = response;

                  this.PreparacionObject.id = d[0].id;
                  this.PreparacionObject.nombre = d[0].nombre;
                  this.PreparacionObject.iD_TipoModeloOperacion = d[0].iD_TipoModeloOperacion;
                  this.PreparacionObject.iD_MinutaPatron = d[0].iD_MinutaPatron;
                  this.PreparacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion')),
                    this.PreparacionObject.preparacionMixta = d[0].preparacionMixta
                  this.PreparacionObject.preparacionBebida = d[0].preparacionBebida
                  if (d[0].guiaPreparacion == null) {
                    this.PreparacionObject.guiaPreparacion = '-'
                  } else {
                    this.PreparacionObject.guiaPreparacion = d[0].guiaPreparacion;
                  }

                  this.PreparacionObject.pathGuia = d[0].pathGuia;
                  this.contenidoRespuesta1 = d[0].pathGuia;
                  this.PreparacionObject.fechaPreparacion = d[0].fechaPreparacion;
                  this.PreparacionObject.iD_TipoEstado = 1;
                  this.PreparacionObject.ModificadoEstado = false;

                  
                  this.idM = d[0].iD_TipoModeloOperacion;

                  if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
                    this.preg = true;
                    this.preg1 = false;
                    this.preg2 = false;

                    this.mesajesalert2 = false;
                  } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
                    this.preg = false;
                    this.preg1 = true;
                    this.preg2 = false;

                    this.mesajesalert2 = false;
                  } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
                    this.preg = false;
                    this.preg1 = false;
                    this.preg2 = true;

                    this.mesajesalert2 = false;
                  }
                  if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
                    this.PreparacionObject.id_preparacionBebida = 1;
                    this.PreparacionObject.preparacionBebida1 = true;
                    this.preparacionBebidaDi = true;
                  } else {
                    this.PreparacionObject.id_preparacionBebida = 0;
                    this.PreparacionObject.preparacionBebida1 = false;
                    this.preparacionBebidaDi = false;
                  }

                  if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
                    this.PreparacionObject.id_preparacionMixta = 1;

                  } else {
                    this.PreparacionObject.id_preparacionMixta = 0;


                  }
                  await this.traerComple(this.idPreparacion)



                },
                (err) => {
                });

            },
            (err) => {
            }
          );

        },
        (err) => {
        });


    }



  }
  async traerComple(id: number) {
    this._PA_PreparacionComplementosGetAllWithRelationService.getPA_PreparacionComplementosGetAllWithRelationList(id).subscribe(
      async (response: any) => { // Cambiar a async
        let j = response;
  
        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
          const idTipoComplementoSet = new Set();
          
          j.forEach(element => {
            if (!idTipoComplementoSet.has(element.iD_TipoComplemento)) {
              idTipoComplementoSet.add(element.iD_TipoComplemento);
  
              this.PreparacionComplementosObject.push({
                activo: true,
                iD_TipoComplemento: element.iD_TipoComplemento,
                id: element.id,
                iD_Preparacion: element.iD_Preparacion,
                sID: '',
                siD_Preparacion: element.siD_Preparacion,
                sID_TipoComplemento: element.sID_TipoComplemento,
                nombre: element.sID_TipoComplemento,
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
                estado: '',
                ModificacionEstado: false,
              });
            }
  
            this.tipoRacionList.map(function (dato) {
              if (dato.id == element.iD_TipoComplemento) {
                dato.iD_cog = element.id;
                dato.id = element.iD_TipoComplemento;
                dato.activo = true;
              }
              return dato;
            });
          });
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
          // Lógica para operación 2
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          if (j.length != 0) {
            this.PreparacionComplementosPAEPIObject2.id = response[0].id;
            this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento = response[0].iD_TipoComplemento;
            this.PreparacionComplementosPAEPIObject2.iD_Preparacion = response[0].iD_Preparacion;
            this.PreparacionComplementosPAEPIObject2.ModificacionEstado = false;
          }
        }
  
        await this.traerDatosIngredientes(this.idPreparacion); // Mover aquí
      },
      (err) => {
        console.error('Error en traerComple:', err);
      }
    );
  }
  

  traerDatosIngredientes(id: number) {
    this._PA_ComponentesPreparacionGetAllWithRelationService.getPA_ComponentesPreparacionGetAllWithRelationList(id).subscribe(
      async (response: any) => {

        let h = response;

        if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
          this.dataComponentesBebida.id = h[0].id;
          this.dataComponentesBebida.iD_Preparacion = h[0].iD_Preparacion;
          this.dataComponentesBebida.iD_TipoComponente = h[0].iD_TipoComponente;
          this.dataComponentesBebida.nombre = h[0].sID_TipoComponente;
          this.dataComponentesBebida.ModificacionEstado = false;
        } else {
          if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
            this.dataComponentesMas = h;
            this.dataComponentesMas.map(item => {
              item.ModificacionEstado = false;
            })
            const TiposComponentesUnicos = Array.from(new Set(this.dataComponentesMas.map(item => item.iD_TipoComponente))).map(iD_TipoComponente => {
              return this.dataComponentesMas.find(item => item.iD_TipoComponente === iD_TipoComponente);
            });
            this.dataComponentesMas = TiposComponentesUnicos;
          } else {
            this.dataComponentes.id = h[0].id;
            this.dataComponentes.iD_Preparacion = h[0].iD_Preparacion;
            this.dataComponentes.iD_TipoComponente = h[0].iD_TipoComponente;
            this.dataComponentes.nombre = h[0].sID_TipoComponente;

          }
        }


        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
          if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.preg3 = false;

            this.mesajesalert5 = false;
            this.preg4 = false;

          } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {
            if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
              this.preg3 = false;

              this.mesajesalert5 = false;
              this.preg4 = true;
            } else {
              this.preg3 = true;

              this.mesajesalert5 = false;
              this.preg4 = false;
            }
          }

        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
          if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            if (this.PreparacionObject.id_preparacionMixta == 1) {

              this.preg6 = false;
              this.mesajesalert5 = false;
              this.preg5 = true;
            } else {

              this.preg5 = false;
              this.mesajesalert5 = false;
            }
          } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {

            if (this.PreparacionObject.id_preparacionMixta == 1) {

              this.preg6 = false;

              this.mesajesalert5 = false;
              this.preg5 = true;
            } else {
              this.preg6 = true;

              this.preg5 = false;
              this.mesajesalert5 = false;
            }
          }
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
          if (m.length == 0) { } else {
            if (m[0].iD_TipoModeloOperacionBase == 1) {
              this.preg9 = true;
              this.preg10 = false;
              this.preg11 = false;
              this.preg12 = false;
            } else if (m[0].iD_TipoModeloOperacionBase == 2) {
              this.preg10 = true;
              this.preg9 = false;
              this.preg11 = false;
              this.preg12 = false;
            }

            if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
              let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

              if (m[0].iD_TipoModeloOperacionBase == 1) {

                this.preg8 = false;

                this.preg7 = false;
                this.mesajesalert5 = false;

              } else if (m[0].iD_TipoModeloOperacionBase == 2) {

                this.preg11 = false;

                this.preg12 = false;
                this.mesajesalert5 = false;

              }

            } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {
              let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
              if (m[0].iD_TipoModeloOperacionBase == 1) {
                if (this.PreparacionObject.id_preparacionMixta == 1) {

                  this.preg8 = false;

                  this.mesajesalert5 = false;
                  this.preg7 = true;
                } else {
                  this.preg8 = true;

                  this.preg7 = false;
                  this.mesajesalert5 = false;
                }
              } else if (m[0].iD_TipoModeloOperacionBase == 2) {
                if (this.PreparacionObject.id_preparacionMixta == 1) {

                  this.preg12 = false;

                  this.mesajesalert5 = false;
                  this.preg11 = true;
                } else {
                  this.preg12 = true;

                  this.preg11 = false;
                  this.mesajesalert5 = false;
                }
              }

            }
          }


        }
        await this.traerAportes()
      },
      (err) => {
      }
    );

  }
  async traerAportes() {
    this.tabs = [];
    if (this.PreparacionComplementosObject.length == 0) {
    } else {
      this.PreparacionComplementosObject.forEach( item => {
        this.tabs.push({
          "nombre": item.nombre,
          "estado": 'Pendiente',
          "id": item.iD_TipoComplemento

        })
       
        
        
      })

    }
    await this.traerNivel()




  }
  /* traerNivel() {

    this._PA_IngredientesGetAllWithRelationService.getPA_IngredientesGetAllWithRelationList(this.idPreparacion).subscribe(
      async (response: any) => {

        let k = response;

        k.forEach(element => {
          this.dataSource.push({
            id: 0,
            sID: '',
            iD_AlimentosICBF: element.iD_AlimentosICBF,
            sID_AlimentosICBF: element.sID_AlimentosICBF,
            iD_TipoNivelEducativo: 0,
            sID_TipoNivelEducativo: '',
            iD_Producto: 0,
            iD_Preparacion: 0,
            siD_Preparacion: '',
            iD_TipoComplemento: 0,
            sID_TipoComplemento: '',
            pesoBruto: 0,
            pesoNeto: 0,
            porcentajeComestible: 0,
            intercambioEstandarizado: 0,
            auditoria: '',
            estado: null,
            ModificacionEstado: false,

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

        });

        var arr = {};

        for (var i = 0, len = this.dataSource.length; i < len; i++)
          arr[this.dataSource[i]['iD_AlimentosICBF']] = this.dataSource[i];

        this.dataSource = new Array();
        for (var key in arr)
          this.dataSource.push(arr[key]);

        await this.traeraporte2()



      },
      (err) => {

      }
    );



  }

  traeraporte2() {
    this._PA_IngredientesGetAllWithRelationService.getPA_IngredientesGetAllWithRelationList(this.idPreparacion).subscribe(
      async (response: any) => {

        let k = response;


        k.forEach(element2 => {
          this.IngredientesObject.push({
            sID: '',
            id: element2.id,
            iD_AlimentosICBF: element2.iD_AlimentosICBF,
            sID_AlimentosICBF: element2.sID_AlimentosICBF,
            iD_TipoNivelEducativo: element2.iD_TipoNivelEducativo,
            sID_TipoNivelEducativo: '',
            iD_Producto: 0,
            iD_Preparacion: element2.iD_Preparacion,
            siD_Preparacion: '',
            iD_TipoComplemento: element2.iD_TipoComplemento,
            sID_TipoComplemento: '',
            pesoBruto: element2.pesoBruto,
            pesoNeto: element2.pesoNeto,
            porcentajeComestible: element2.porcentajeComestible,
            intercambioEstandarizado: element2.intercambioEstandarizado,
            auditoria: '',
            estado: null,
            ModificacionEstado: false,
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
            completed: false
          })

        })
        await this.traeraporte2b()
        await this.pesoNetoObjectL()
        
      },
      (err) => {

      }
    );

  }
  traeraporte2b() {
    this._PA_IngredientesGetAllWithRelationService.getPA_IngredientesGetAllWithRelationList(this.idPreparacion).subscribe(
      (response: any) => {

        let k = response;


        k.forEach(element2 => {

          this._NutrientesIngredientesService.getNutrientesIngredientesListfilter(element2.id).subscribe(
            async (response: any) => {

              let g = response;

              g.forEach(element => {
                this.AporteIngredienteObject.push({
                  id: element.id,
                  iD_Ingrediente: element.iD_Ingrediente,
                  siD_Ingrediente: '',
                  iD_Nutriente: element.iD_Nutriente,
                  aporte: element.aporte,
                  auditoria: '',
                  idAlimento: element2.iD_AlimentosICBF,
                  idEdu: element2.iD_TipoNivelEducativo,
                  comple: element2.iD_TipoComplemento,
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
                });

              });

              var arr = {};

              for (var i = 0, len = this.AporteIngredienteObject.length; i < len; i++)
                arr[this.AporteIngredienteObject[i]['id']] = this.AporteIngredienteObject[i];

              this.AporteIngredienteObject = new Array();
              for (var key in arr)
                this.AporteIngredienteObject.push(arr[key]);
              await this.traerAportes3();

            },
            (err) => {
            }
          );
        })
      },
      (err) => {

      }
    );

  }  
  
  */




  async traerNivel() {
    try {
      const response = await this.fetchData();
      const sortedResponse = response.sort((a, b) => a.id - b.id);
      this.dataSource = this.buildDataSource(sortedResponse);
      await this.traeraporte2(sortedResponse);
    } catch (err) {
      console.error(err);
    }
  }
  buildDataSource(response: any[]): any[] {
    const map = new Map<number, any>();

    response.forEach(element => {
      map.set(element.iD_AlimentosICBF, {
        id: 0,
        sID: '',
        iD_AlimentosICBF: element.iD_AlimentosICBF,
        sID_AlimentosICBF: element.sID_AlimentosICBF,
        iD_TipoNivelEducativo: 0,
        sID_TipoNivelEducativo: '',
        iD_Producto: 0,
        iD_Preparacion: 0,
        siD_Preparacion: '',
        iD_TipoComplemento: 0,
        sID_TipoComplemento: '',
        pesoBruto: 0,
        pesoNeto: 0,
        porcentajeComestible: 0,
        intercambioEstandarizado: 0,
        auditoria: '',
        estado: null,
        ModificacionEstado: false,
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
      });
    });

    return Array.from(map.values());
  }
  async fetchData(): Promise<PA_IngredientesGetAllWithRelationModel[]> {
    try {
      // Obtén la respuesta del servicio
      const result = await this._PA_IngredientesGetAllWithRelationService.getPA_IngredientesGetAllWithRelationList(this.idPreparacion).toPromise();
      // Verifica si el resultado es un arreglo y ajusta el tipo de `result` si es necesario
      if (Array.isArray(result)) {
        // Usa la función auxiliar para mapear el resultado
        return this.mapToPA_IngredientesGetAllWithRelationModel(result);
      } else {
        console.warn('El resultado no es un arreglo');
        return []; // Retorna un arreglo vacío si el resultado no es un arreglo
      }
    } catch (err) {
      console.error('Error al obtener datos:', err);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  // Función auxiliar para mapear los datos
  private mapToPA_IngredientesGetAllWithRelationModel(data: any[]): PA_IngredientesGetAllWithRelationModel[] {
    return data.map(item => new PA_IngredientesGetAllWithRelationModel(
      item.sID,
      item.id,
      item.iD_AlimentosICBF,
      item.sID_AlimentosICBF,
      item.iD_TipoNivelEducativo,
      item.sID_TipoNivelEducativo,
      item.iD_Producto,
      item.iD_Preparacion,
      item.siD_Preparacion,
      item.iD_TipoComplemento,
      item.sID_TipoComplemento,
      item.pesoBruto,
      item.pesoNeto,
      item.porcentajeComestible,
      item.intercambioEstandarizado,
      item.auditoria,
      item.estado,
      item.ModificacionEstado,
      item._ippublica,
      item._nombremaquina,
      item._usuario,
      item._ipdetrasproxy,
      item._browser,
      item._accion,
      item._sessionid,
      item._XMLAuditoria,
      item.isValid,
      item.isSelected,
      item.completed
    ));
  }





  async traeraporte2(res: any) {
    try {
      const response = res;
      this.IngredientesObject = this.buildIngredientesObject(response);
      await this.traeraporte2b(response);
      await this.pesoNetoObjectL();
    } catch (err) {
      console.error(err);
    }
  }

  buildIngredientesObject(response: any[]): any[] {
    return response.map(element => ({
      sID: '',
      id: element.id,
      iD_AlimentosICBF: element.iD_AlimentosICBF,
      sID_AlimentosICBF: element.sID_AlimentosICBF,
      iD_TipoNivelEducativo: element.iD_TipoNivelEducativo,
      sID_TipoNivelEducativo: '',
      iD_Producto: 0,
      iD_Preparacion: element.iD_Preparacion,
      siD_Preparacion: '',
      iD_TipoComplemento: element.iD_TipoComplemento,
      sID_TipoComplemento: '',
      pesoBruto: element.pesoBruto,
      pesoNeto: element.pesoNeto,
      porcentajeComestible: element.porcentajeComestible,
      intercambioEstandarizado: element.intercambioEstandarizado,
      auditoria: '',
      estado: null,
      ModificacionEstado: false,
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
    }));
  }
  async traeraporte2b(res: any) {
    try {
      const response: PA_IngredientesGetAllWithRelationModel[] = res;
      const aporteIngredienteArray: any[] = [];

      /* for (const element2 of response) {
        const nutrientsResponse: NutrientesIngredientesModel[] = await this._NutrientesIngredientesService.getNutrientesIngredientesListfilter(element2.id).toPromise();

        if (Array.isArray(nutrientsResponse)) {
          const aporteIngrediente = this.buildAporteIngredienteObject(nutrientsResponse, element2);
          aporteIngredienteArray.push(...aporteIngrediente);
        } else {
          console.error('La respuesta de nutrientes no es un array:', nutrientsResponse);
        }
      } */
       // Llama a la nueva función para obtener nutrientes en el rango
       // Obtener el primer y último elemento
    const idStart = response[0].id; // Valor de inicio del rango
    const idEnd = response[response.length - 1].id; // Valor de fin del rango
      const nutrientsResponse: NutrientesIngredientesModel[] = await this._NutrientesIngredientesService
        .getNutrientesIngredientesListfilterByRange(idStart, idEnd)
        .toPromise();

      if (Array.isArray(nutrientsResponse)) {
        
        for (const element2 of response) {
          const aporteIngrediente = this.buildAporteIngredienteObject(nutrientsResponse, element2);
          aporteIngredienteArray.push(...aporteIngrediente);
        }
      } else {
        console.error('La respuesta de nutrientes no es un array:', nutrientsResponse);
      }
      // Eliminar duplicados usando un mapa
      const uniqueAporteIngrediente = new Map<number, any>();
      aporteIngredienteArray.forEach(item => uniqueAporteIngrediente.set(item.id, item));

      this.AporteIngredienteObject = Array.from(uniqueAporteIngrediente.values());
      
      await this.traerAportes3();
    } catch (err) {
      console.error('Error en traeraporte2b:', err);
    }
  }

  buildAporteIngredienteObject(nutrients: NutrientesIngredientesModel[], element2: PA_IngredientesGetAllWithRelationModel): any[] {
    const map = new Map<number, any>();
  
    nutrients.forEach(element => {
      // Verifica si el ID de ingrediente coincide con el ID de alimento
      if (element.iD_Ingrediente === element2.id) {
        map.set(element.id, {
          id: element.id,
          iD_Ingrediente: element.iD_Ingrediente,
          siD_Ingrediente: element.siD_Ingrediente || '',
          iD_Nutriente: element.iD_Nutriente,
          aporte: element.aporte,
          auditoria: element.auditoria || '',
          idAlimento: element2.iD_AlimentosICBF,
          idEdu: element2.iD_TipoNivelEducativo,
          comple: element2.iD_TipoComplemento,
          _ippublica: '',
          _nombremaquina: '',
          _usuario: '',
          _ipdetrasproxy: '',
          _browser: '',
          _accion: '',
          _sessionid: '',
          _XMLAuditoria: '',
          isValid: element.isValid,
          isSelected: false,
          completed: false,
        });
      }
    });
  
    return Array.from(map.values());
  }
  


  pesoNetoObjectL() {
    this._PesoNetoPreparacionService.getPesoNetoPreparacionListfilter(this.PreparacionObject.id).subscribe(
      (response: any) => {

        response.forEach(ele => {

          let ingred = this.IngredientesObject.filter(item => item.iD_TipoNivelEducativo == ele.iD_TipoNivelEducativo
            && item.iD_Preparacion == ele.iD_Preparacion && item.pesoNeto == ele.pesoNeto && item.iD_TipoComplemento == ele.iD_TipoComplemento)
          if (ingred.length == 0) { } else {
            this.PesoNetoObject.push({
              id: ele.id,
              iD_TipoComponente: ele.iD_TipoComponente,
              siD_TipoComponente: '',
              iD_TipoNivelEducativo: ele.iD_TipoNivelEducativo,
              siD_TipoNivelEducativo: '',
              iD_Preparacion: ele.iD_Preparacion,
              siD_Preparacion: '',
              pesoNeto: ele.pesoNeto,
              iD_SubGrupoAlimentos: ele.iD_SubGrupoAlimentos,
              siD_SubGrupoAlimentos: '',
              iD_TipoComplemento: ele.iD_TipoComplemento,
              siD_TipoComplemento: '',
              auditoria: '',
              iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
              ModificacionEstado: false,
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
          }
        });
      },
      (err) => {

      }
    );

  }

  async traerAportes3() {

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let cant1 = this.PreparacionComplementosObject.filter(item => item.activo == true)

      let cant = cant1.length

      if (cant == 1) {
        this.AporteIngredienteObject.forEach(apo => {
          if (apo.comple == 1) {
            this.NivelEducativoList.map(function (dato) {
              if (apo.idEdu === null) {

              } else {
                if (dato.id == apo.idEdu) {
                  dato.estado = 'Completo';
                }
              }


              return dato;
            });
            let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');
            if (h.length == 5) {
              this.dataSource.map(function (dato) {

                dato.estado = 'Completo';




                return dato;
              });
            } else {
              this.dataSource.map(function (dato) {

                dato.estado = 'Incompleto';



                return dato;
              });
            }



          } else {

            this.NivelEducativoList.map(function (dato) {
              if (apo.idEdu === null) {

              } else {
                if (dato.id == apo.idEdu) {
                  dato.estado = 'Completo';

                }
              }


              return dato;
            });
            let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');

            if (h.length == 5) {
              this.dataSource.map(function (dato) {
                dato.estado = 'Completo';
                return dato;
              });
            } else {
              this.dataSource.map(function (dato) {
                dato.estado = 'Incompleto';
                return dato;
              });
            }

          }

        })



      } else if (cant == 2) {

        let k = this.AporteIngredienteObject.filter(item => item.comple == 1)
        let f = this.AporteIngredienteObject.filter(item => item.comple == 2)
        k.forEach(apo => {
          this.NivelEducativoList2.map(function (dato) {
            if (apo.idEdu === null) {

            } else {
              if (dato.id == apo.idEdu) {
                dato.estado = 'Completo';
              }
            }


            return dato;
          });

          let com = this.tabs.filter(item => item.id == 1);
          let h = this.NivelEducativoList2.filter(item => item.estado == 'Completo');
          if (h.length == 5) {
            this.tabs.map(function (dato) {
              if (com[0].nombre === null) {
              } else {
                if (dato.nombre == com[0].nombre) {
                  dato.estado = 'Completo';

                }
              }

              return dato;
            });

          } else if (h.length >= 1) {

            this.tabs.map(function (dato) {
              if (com[0].nombre === null) {

              } else {
                if (dato.nombre == com[0].nombre) {
                  dato.estado = 'Incompleto';

                }
              }


              return dato;
            });

          }
        })

        f.forEach(apo => {
          this.NivelEducativoList3.map(function (dato) {
            if (apo.idEdu === null) {

            } else {
              if (dato.id == apo.idEdu) {
                dato.estado = 'Completo';
              }
            }


            return dato;
          });
          let com = this.tabs.filter(item => item.id == 2);

          let h = this.NivelEducativoList3.filter(item => item.estado == 'Completo');

          if (h.length == 5) {
            this.tabs.map(function (dato) {
              if (com[0].nombre === null) {

              } else {
                if (dato.nombre == com[0].nombre) {
                  dato.estado = 'Completo';

                }
              }


              return dato;
            });
          } else if (h.length >= 1) {
            this.tabs.map(function (dato) {
              if (com[0].nombre === null) {

              } else {
                if (dato.nombre == com[0].nombre) {
                  dato.estado = 'Incompleto';

                }
              }


              return dato;
            });
          }
        })
        let t = this.tabs.filter(item => item.estado == 'Completo' || item.estado == 'Incompleto' || item.estado == null || item.estado == 'Pendiente');
        
        if (t.length == 2) {
          if (t[0].estado == 'Completo' && t[1].estado == 'Completo') {
            this.dataSource.map(function (dato) {

              dato.estado = 'Completo';

              return dato;
            });
          } else if ((t[0].estado == 'Completo' && t[1].estado == 'Pendiente') || (t[1].estado == 'Completo' && t[0].estado == 'Pendiente') || (t[1].estado == 'Completo' && t[0].estado == 'Incompleto') || (t[0].estado == 'Completo' && t[1].estado == 'Incompleto') || (t[0].estado == 'Incompleto' && t[1].estado == 'Incompleto')) {
            this.dataSource.map(function (dato) {

              dato.estado = 'Incompleto';

              return dato;
            });
          } else {
            this.dataSource.map(function (dato) {

              dato.estado = 'Pendiente';

              return dato;
            });
          }
        } else {
          let y = this.tabs
          
          if (y[0].estado == 'Incompleto') {
            this.dataSource.map(function (dato) {
              dato.estado = 'Incompleto';

              return dato;
            });
          } else if (y[0].estado == 'Completo') {
            this.dataSource.map(function (dato) {
              dato.estado = 'Completo';

              return dato;
            });
          } else {
            this.dataSource.map(function (dato) {
              dato.estado = 'Pendiente';

              return dato;
            });
          }

        }

      } else { }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this.AporteIngredienteObject.forEach(apo => {

        this.dataSource.map(function (dato) {
          if (dato.iD_AlimentosICBF === null) {

          } else {
            if (dato.iD_AlimentosICBF == apo.idAlimento) {
              dato.estado = 'Completo';

            }
          }


          return dato;
        });
      })

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
      
      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this.AporteIngredienteObject.forEach(apo => {
          if (apo.comple == 1) {
            this.NivelEducativoList.map(function (dato) {
              if (apo.idEdu === null) {

              } else {
                if (dato.id == apo.idEdu) {
                  dato.estado = 'Completo';
                }
              }


              return dato;
            });
            let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');
            if (h.length == 5) {
              this.dataSource.map(function (dato) {

                dato.estado = 'Completo';




                return dato;
              });
            } else {
              this.dataSource.map(function (dato) {

                dato.estado = 'Incompleto';



                return dato;
              });
            }



          } else {

            this.NivelEducativoList.map(function (dato) {
              if (apo.idEdu === null) {

              } else {
                if (dato.id == apo.idEdu) {
                  dato.estado = 'Completo';

                }
              }


              return dato;
            });
            let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');

            if (h.length == 5) {
              this.dataSource.map(function (dato) {
                dato.estado = 'Completo';
                return dato;
              });
            } else {
              this.dataSource.map(function (dato) {
                dato.estado = 'Incompleto';
                return dato;
              });
            }

          }

        })

      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this.AporteIngredienteObject.forEach(apo => {
          this.dataSource.map(function (dato) {

            dato.estado = 'Completo';

            return dato;
          });
        })

      } else { }

    }
    await this.traerpeso()
  }
  traerpeso2() {
    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let cant = this.PreparacionComplementosObject.length

      if (cant == 1) {
        this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
          (response: any) => {
            let f = response;
            f.forEach(item2 => {
              this.peso2.map(function (dato) {
                if (item2.iD_TipoNivelEducativo === null) {
                } else {
                  if (dato.nivel == item2.iD_TipoNivelEducativo) {
                    dato.complementoampm = item2.complementoAM_PM;
                    dato.complementoalmuerzo = item2.complementoAlmuerzo;
                    dato.ModificacionEstado = false;
                  }
                }



                return dato;
              });

            })
          })

      } else {
        this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
          (response: any) => {
            let f = response;

            f.forEach(item2 => {
              if (item2.iD_TipoComplemento == 1) {
                this.peso.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoalmuerzo = item2.pesoServido;
                      dato.id = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              } else {
                this.peso.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoampm = item2.pesoServido;
                      dato.id2 = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              }

            })
          })

      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
        (response: any) => {
          let f = response;
          f.forEach(item2 => {

            this.peso3.map(function (dato) {
              dato.notienenivel = item2.pesoServido;
              dato.id = item2.id;
              dato.ModificacionEstado = false;
              return dato;
            });
          })
        })

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m.length == 0) {

      } else {
        if (m[0].iD_TipoModeloOperacionBase == 1) {
          let cant1 = this.PreparacionComplementosObject.filter(item => item.activo == true)
          let cant = cant1.length

          if (cant == 1) {
            this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
              (response: any) => {
                let f = response;
                f.forEach(item2 => {
                  if (item2.iD_TipoComplemento == 1) {
                    this.peso2.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoalmuerzo = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  } else {
                    this.peso2.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoampm = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  }

                })
              })


          } else if (cant == 2) {
            this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
              (response: any) => {
                let f = response;
                f.forEach(item2 => {
                  if (item2.iD_TipoComplemento == 1) {
                    this.peso.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoalmuerzo = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  } else {
                    this.peso.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoampm = item2.pesoServido;
                          dato.id2 = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  }
                })
              })
          }


        } else if (m[0].iD_TipoModeloOperacionBase == 2) {
          this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
            (response: any) => {
              let f = response;
              f.forEach(item2 => {
                this.peso3.map(function (dato) {
                  dato.notienenivel = item2.pesoServido;
                  dato.id = item2.id;
                  dato.ModificacionEstado = false;
                  return dato;
                });

              })
            })

        } else { }
      }
    }

  }
  async traerpeso() {

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let cant = this.PreparacionComplementosObject.length

      if (cant == 1) {
        this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
          (response: any) => {
            let f = response;

            f.forEach(item2 => {
              if (item2.iD_TipoComplemento == 1) {
                this.peso2.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoalmuerzo = item2.pesoServido;
                      dato.id = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              } else {
                this.peso2.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoampm = item2.pesoServido;
                      dato.id = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              }

            })
          })

      } else {
        this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
          (response: any) => {
            let f = response;

            f.forEach(item2 => {
              if (item2.iD_TipoComplemento == 1) {
                this.peso.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoalmuerzo = item2.pesoServido;
                      dato.id = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              } else {
                this.peso.map(function (dato) {
                  if (item2.iD_TipoNivelEducativo === null) {
                  } else {
                    if (dato.nivel == item2.iD_TipoNivelEducativo) {
                      dato.complementoampm = item2.pesoServido;
                      dato.id2 = item2.id;
                      dato.ModificacionEstado = false;
                    }
                  }



                  return dato;
                });
              }

            })
          })

      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
        (response: any) => {
          let f = response;
          f.forEach(item2 => {

            this.peso3.map(function (dato) {
              dato.notienenivel = item2.pesoServido;
              dato.id = item2.id;
              dato.ModificacionEstado = false;
              return dato;
            });
          })
        })

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m.length == 0) {

      } else {
        if (m[0].iD_TipoModeloOperacionBase == 1) {
          let cant1 = this.PreparacionComplementosObject.filter(item => item.activo == true)
          let cant = cant1.length

          if (cant == 1) {
            this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
              (response: any) => {
                let f = response;
                f.forEach(item2 => {
                  if (item2.iD_TipoComplemento == 1) {
                    this.peso2.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoalmuerzo = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  } else {
                    this.peso2.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoampm = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  }

                })
              })


          } else if (cant == 2) {
            this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
              (response: any) => {
                let f = response;
                f.forEach(item2 => {
                  if (item2.iD_TipoComplemento == 1) {
                    this.peso.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoalmuerzo = item2.pesoServido;
                          dato.id = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  } else {
                    this.peso.map(function (dato) {
                      if (dato.nivel === null) {
                      } else {
                        if (dato.nivel == item2.iD_TipoNivelEducativo) {
                          dato.complementoampm = item2.pesoServido;
                          dato.id2 = item2.id;
                          dato.ModificacionEstado = false;
                        }
                      }



                      return dato;
                    });
                  }
                })
              })
          }


        } else if (m[0].iD_TipoModeloOperacionBase == 2) {
          this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
            (response: any) => {
              let f = response;
              f.forEach(item2 => {
                this.peso3.map(function (dato) {
                  dato.notienenivel = item2.pesoServido;
                  dato.id = item2.id;
                  dato.ModificacionEstado = false;
                  return dato;
                });

              })
            })

        } else { }
      }
    }
    await this.gabadata();



  }

  todosLosFiltros() {

    this._PA_PreparacionesGetAllWithRelationService.getPA_PreparacionesGetAllWithRelationList(this.idPreparacion).subscribe(
      (response: any) => {
        let d = response;
        if (d.length == 0) { } else {
          this.PreparacionObject.id = d[0].id;
          this.PreparacionObject.nombre = d[0].nombre;
          this.PreparacionObject.iD_TipoModeloOperacion = d[0].iD_TipoModeloOperacion;
          this.PreparacionObject.iD_MinutaPatron = d[0].iD_MinutaPatron;
          this.PreparacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion')),
            this.PreparacionObject.preparacionMixta = d[0].preparacionMixta;
          this.PreparacionObject.preparacionBebida = d[0].preparacionBebida;
          if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
            this.PreparacionObject.id_preparacionMixta = 1;
          } else { this.PreparacionObject.id_preparacionMixta = 0; }
          if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.PreparacionObject.id_preparacionBebida = 1;
          } else {
            this.PreparacionObject.id_preparacionBebida = 0;
          }
          this.PreparacionObject.guiaPreparacion = d[0].guiaPreparacion;
          this.PreparacionObject.pathGuia = d[0].pathGuia;
          this.PreparacionObject.fechaPreparacion = d[0].fechaPreparacion;
          this.PreparacionObject.iD_TipoEstado = d[0].iD_TipoEstado;

        }
      }
    );

    this._ModeloOperacionService.getTiposModeloOperacionList().subscribe(
      (response: any) => {

        this.ModeloOperadorList = response;
      },
      (err) => {
      }

    );

    this.tiposRacionService.getTiposComplementoList().subscribe(
      (response: any) => {

        this.tipoRacionList = response.filter(item => item.id !== 4).sort((firstItem, secondItem) => firstItem.id - secondItem.id);
        this.tipoRacionList2 = [...this.tipoRacionList];

        this.tipoRacionListMAER = response.filter(item => item.id !== 2).sort((firstItem, secondItem) => firstItem.id - secondItem.id);
      },
      (err) => {
      }
    );
    this._NivelEducativoService.getNivelEducativoList().subscribe(
      (response: any) => {
        // Proceso para NivelEducativoList y NivelEducativoList2
        this.NivelEducativoList = this.procesarNivelEducativo(response, 'Pendiente', null);
        this.NivelEducativoList2 = this.procesarNivelEducativo(response, 'Pendiente', 1);
        this.NivelEducativoList3 = this.procesarNivelEducativo(response, 'Pendiente', 2);

        // Proceso para peso, peso2, y peso3
        this.peso = this.procesarPeso(response);
        this.peso2 = this.procesarPeso(response);
        this.peso3 = this.procesarPeso(response.filter(item => item.id === 1));
      },
      (err) => {
        // Manejo de errores
      }
    );

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
    this._TiposActividadFisicaService.getTiposActividadFisicaList().subscribe(
      (response: any) => {

        this.ActividadfisicaList = response;

        this._MinutaPatronAlimentosService.getMinutaPatronAlimentosListFilter2(2, this.idETC).subscribe(
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

            if (this.MinutasList.length == 0) { this.mensajeminpaepi = true; } else { }


          },
          (err) => {
          }
        );

      },
      (err) => {
      });




  }

  // Función auxiliar para procesar listas de Nivel Educativo
  procesarNivelEducativo(response: any[], estado: string, complemento: number | null) {
    return response.map(item => ({
      ...item,
      estado: estado,
      complemento: complemento
    })).sort((firstItem, secondItem) => firstItem.id - secondItem.id);
  }

  // Función auxiliar para procesar peso
  procesarPeso(response: any[]) {
    return response.map(item => ({
      ...item,
      nivel: item.id,
      id: 0,
      complementoalmuerzo: null,
      complementoampm: null
    })).sort((firstItem, secondItem) => firstItem.nivel - secondItem.nivel);
  }

  changeItemNombre(name: string, e: any) {
    this.mesajesalert = false;
    //this.PreparacionObject[name]=e.target.value;



    this.PreparacionObject[name] = e;
    this.PreparacionObject.ModificadoEstado = true;
    let h = this.PreparacionObject.nombre

    const res = [...h].reduce((p, c) => {
      (/[^\s^\d]/.test(c)) ? p.cantNoNumeros++ :
        (/\d/.test(c)) ? p.cantNumeros++ : null;
      return p;
    }, { cantNoNumeros: 0, cantNumeros: 0, });

    if (res.cantNoNumeros == 0) {
      this.combinacion = true;
    } else {
      this.combinacion = false;
    }



  }
  changeItemNombre1(e: any) {

    //this.PreparacionObject[name]=e.target.value;

    var inp = String.fromCharCode(e.keyCode);

    //this.PreparacionObject[name]=e.key

    if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/.test(inp)) {



      return true;

    } else {
      e.preventDefault();

      return false;
    }

  }
  onKeyCnt(event: any) {
    //const reg = /^-?\d*(\.^\,\d{0,2})?$/;
    const reg = /^\d*(?:(?:,\d{3})*\.?|(?:\.\d{3})*,?)\d{0,2}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }


  changeItemOpe(name: string, value: any) {
    this.PreparacionObject.iD_TipoModeloOperacion = value;
    this.PreparacionObject.ModificadoEstado = true;
    if (value === 1) {
      this.preg = true;
      this.preg1 = false;
      this.preg2 = false;
      this.preg3 = false;
      this.preg4 = false;
      this.preg5 = false;
      this.preg6 = false;
      this.preg7 = false;
      this.preg8 = false;
      this.preg9 = false;
      this.preg10 = false;

      this.mesajesalert2 = false;
      this.PreparacionObject.iD_TipoModeloOperacion = value;
      this.PreparacionObject.id_preparacionBebida = null;
      this.PreparacionObject.id_preparacionMixta = null;
      this.PreparacionObject.preparacionMixta = null;
      this.PreparacionObject.preparacionBebida = null;


    } else if (value === 2) {
      this.preg = false;
      this.preg1 = true;
      this.preg2 = false;
      this.preg3 = false;
      this.preg4 = false;
      this.preg5 = false;
      this.preg6 = false;
      this.preg7 = false;
      this.preg8 = false;
      this.preg9 = false;
      this.preg10 = false;
      this.mesajesalert2 = false;
      this.PreparacionObject.iD_TipoModeloOperacion = value;
      this.PreparacionObject.id_preparacionBebida = null;
      this.PreparacionObject.id_preparacionMixta = null;
      this.PreparacionObject.preparacionMixta = null;
      this.PreparacionObject.preparacionBebida = null;
    } else if (value === 3) {
      this.preg = false;
      this.preg1 = false;
      this.preg2 = true;
      this.preg3 = false;
      this.preg4 = false;
      this.preg5 = false;
      this.preg6 = false;
      this.preg7 = false;
      this.preg8 = false;
      this.preg9 = false;
      this.preg10 = false;
      this.mesajesalert2 = false;
      this.PreparacionObject.iD_TipoModeloOperacion = value;
      this.PreparacionObject.id_preparacionBebida = null;
      this.PreparacionObject.id_preparacionMixta = null;
      this.PreparacionObject.preparacionMixta = null;
      this.PreparacionObject.preparacionBebida = null;
    }


  }
  changeItemMinutas(name: string, value: any) {

    this.PreparacionObject[name] = value;
    this.PreparacionObject.ModificadoEstado = true;
    this.mesajesalert8 = false;
    this.mensajeminpaepi = false;
    let m = this.MinutasList.filter(item => item.id == value);
    if (m[0].iD_TipoModeloOperacionBase == 1) {
      this.preg9 = true;
      this.preg10 = false;
      this.preg11 = false;
      this.preg12 = false;
    } else if (m[0].iD_TipoModeloOperacionBase == 2) {
      this.preg10 = true;
      this.preg9 = false;
      this.preg11 = false;
      this.preg12 = false;
    }



  }

  aler1(id: any) {
    this.mesajesalert3 == false;
    this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento = id
  }
  changeItemComponente(name: string, value: any) {
    if (this.dataComponentesMas.length > 0) {
      this.eliminarCom()
    }


    if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
      this.dataComponentes.iD_TipoComponente = value;
      let nombrer = this.TiposComponentesList.filter(item => item.id == value);
      this.dataComponentes.nombre = nombrer[0].nombre;
      this.mesajesalert6 = false;
      this.dataComponentes.ModificadoEstado = true;
    } else {
      this.dataComponentes.iD_TipoComponente = value;
      let nombrer = this.TiposComponentesList.filter(item => item.id == value);
      this.dataComponentes.nombre = nombrer[0].nombre;
      this.mesajesalert6 = false;
      this.dataComponentes.ModificadoEstado = true;
    }

  }
  eliminarCom() {
    this.dataComponentesMas.forEach(ele => {
      if (ele.id == 0) {
        this.dataComponentesMas = []
      } else {
        this._ComponentesPreparacionService.deleteComponentesPreparacion(ele.id).subscribe(
          (response: any) => {
            this.dataComponentesMas = []
          }, (err) => {
          }
        );
      }
    })
  }
  changeItemComponenteMas(name: string, value: any, itemIndice: number) {

    if (this.dataComponentes.id != 0) {
      this.eliminarCom1(this.dataComponentes.id)
    } else { this.dataComponentes.iD_TipoComponente = 0; }



    this.dataComponentesMas[itemIndice][name] = value;
    let nombrer = this.TiposComponentesList.filter(item => item.id == value);
    this.dataComponentesMas[itemIndice]['sID_TipoComponente'] = nombrer[0].nombre;
    this.dataComponentesMas[itemIndice]['ModificacionEstado'] = true;
  }
  eliminarCom1(id) {
    this._ComponentesPreparacionService.deleteComponentesPreparacion(id).subscribe(
      (response: any) => {
        this.dataComponentes.id = 0;
        this.dataComponentes.iD_TipoComponente = 0;
      }, (err) => {
      }
    );
  }
  onSubmit(): void {
    this.isNextDisabled = false;
    switch (this.viewActiva) {
      case 0:

        if (this.PreparacionObject.id == 0) {
          if (this.PreparacionObject.iD_ETC == 0 || this.PreparacionObject.iD_ETC == undefined) {
            Swal.fire({
              showCloseButton: true,
              html:
                '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe seleccionar una ETC </p> ' +
                '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> para poder continuar</p> ',
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
              this.regresar();

            })
          } else {
            this.isNextDisabled = true;
            this.crearPreparacion();
          }

          /* this.resultQuery1 = true;
          this.avanzar(); */

        } else {
          if (this.PreparacionObject.iD_ETC == 0 || this.PreparacionObject.iD_ETC == undefined) {
            Swal.fire({
              showCloseButton: true,
              html:
                '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
                '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Debe seleccionar una ETC </p> ' +
                '<p style="text-align: left!important; font-size: 13px; color:#005ACA;"> para poder continuar</p> ',
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
              this.regresar();

            })
          } else {
            this.isNextDisabled = true;
            this.actualizarPreparacion();
          }


          /* this.resultQuery1 = true;
          this.avanzar(); */
        }
        break;

      case 1:
        if (this.dataSource.length == 0) {
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
            this.mesajesalertpre = true
            //this.mensajeIn = true;

          })
        } else {
          this.resultQuery1 = true;
          this.avanzar();
        }

        break;
      case 11:
        if (this.dataSource.length == 0) {
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
            this.mesajesalertpre = true
            //this.mensajeIn = true;

          })
        } else {
          this.resultQuery1 = true;
          this.avanzar();
        }
        break;
      case 2:
        if (this.PreparacionObject.id != 0) { this.aporteNutrcional = false; this.Nutrientes = false; this.grado = 0 }
        let t = this.dataSource.filter(item => item.estado != 'Completo')

        if (t.length == 0) {
          let g = this.IngredientesObject.filter(item => item.id == 0)

          if (g.length > 0) {
            this.isNextDisabled = true;
            this.crearIngredientes();

            /* this.resultQuery1 = true;
            this.avanzar(); */


          } else {
            this.isNextDisabled = true;
            this.actualizarIngredientes();

          }


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

            this.mensajespeso = true;

          })
        }
        /* this.resultQuery1 = true;
        this.avanzar(); */
        break;
      case 22:
        let t1 = this.dataSource.filter(item => item.estado != 'Completo')

        if (t1.length == 0) {
          let g = this.IngredientesObject.filter(item => item.id == 0)
          if (g.length > 0) {
            this.isNextDisabled = true;
            this.crearIngredientes();


          } else {
            this.isNextDisabled = true;
            this.actualizarIngredientes();

          }
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

            this.mensajespeso = true;

          })
        }
        /* this.resultQuery1 = true;
        this.avanzar(); */
        break;
      case 3:
        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

          let m3 = 0;
          let m4
          m3 = this.PreparacionComplementosObject.length
          if (m3 == 2) {
            if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
              this.isNextDisabled = true;
              this.crearPesoServido()
            } else {
              let g = this.peso.filter(item => item.complementoampm == null || item.complementoampm == '')
              let j = this.peso.filter(item => item.complementoalmuerzo == null || item.complementoalmuerzo == '')

              if (g.length == 0 && j.length == 0) {
                this.isNextDisabled = true;
                this.crearPesoServido()
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

                  this.mensajespesoneto = true;

                })
              }
            }
          } else {
            this.PreparacionComplementosObject.find(object => {
              m4 = Object.values(object)

            });
            let ComplementoAlmuerzo = m4.includes('Complemento Almuerzo')
            if (ComplementoAlmuerzo == true) {
              if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
                this.isNextDisabled = true;
                this.crearPesoServido()
              } else {
                let g = this.peso2.filter(item => item.complementoalmuerzo == null || item.complementoalmuerzo == '')

                if (g.length == 0) {
                  this.isNextDisabled = true;
                  this.crearPesoServido()
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

                    this.mensajespesoneto = true;

                  })
                }

              }
            } else {
              if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
                this.isNextDisabled = true;
                this.crearPesoServido()
              } else {
                let g = this.peso2.filter(item => item.complementoampm == null || item.complementoampm == '')
                if (g.length == 0) {
                  this.isNextDisabled = true;
                  this.crearPesoServido()
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

                    this.mensajespesoneto = true;

                  })
                }
              }
            }


          }

        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
          if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
            this.isNextDisabled = true;
            this.crearPesoServido()
          } else {
            let g = this.peso3.filter(item => item.notienenivel == null || item.notienenivel == '')
            if (g.length == 0) {
              this.isNextDisabled = true;
              this.crearPesoServido()
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

                this.mensajespesoneto = true;

              })
            }
          }
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

          if (m[0].iD_TipoModeloOperacionBase == 1) {
            let m5 = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
            if (m5 == 1) {
              if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
                this.isNextDisabled = true;
                this.crearPesoServido()
              } else {
                let g = this.peso2.filter(item => item.complementoalmuerzo == null || item.complementoalmuerzo == '')
                if (g.length == 0) {
                  this.isNextDisabled = true;
                  this.crearPesoServido()
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

                    this.mensajespesoneto = true;

                  })
                }
              }


            } else {
              if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
                this.isNextDisabled = true;
                this.crearPesoServido()
              } else {
                let g = this.peso2.filter(item => item.complementoampm == null || item.complementoampm == '')
                if (g.length == 0) {
                  this.isNextDisabled = true;
                  this.crearPesoServido()
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

                    this.mensajespesoneto = true;

                  })
                }
              }
            }

          } else if (m[0].iD_TipoModeloOperacionBase == 2) {
            if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
              this.isNextDisabled = true;
              this.crearPesoServido()
            } else {
              let g = this.peso3.filter(item => item.notienenivel == null || item.notienenivel == '')
              if (g.length == 0) {
                this.isNextDisabled = true;
                this.crearPesoServido()
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

                  this.mensajespesoneto = true;

                })
              }
            }

          } else { }

        } else { }

        break;
      case 4:
        if (this.PreparacionObject.guiaPreparacion == '') {
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

            this.mensajeGuia = true;

          })

        } else {
          this.isNextDisabled = true;
          this.actualizarPreparacion();
        }

        break;
      case 5:
        this.resultQuery1 = true;
        this.avanzar();
        break;
    }
  }
  avanzar() {


    switch (this.viewActiva) {
      case 0:
        if (this.resultQuery1) {

          if (this.PreparacionObject.id == 0) {
            this.resetQuery();

            this.set_ViewActiva(1);
          } else {
            this.resetQuery();

            this.set_ViewActiva(1);
          }


        }
        return;
      case 1:
        if (this.resultQuery1) {
          this.resetQuery();


          this.set_ViewActiva(2);
        }
        return;
      case 11:
        if (this.resultQuery1) {
          this.resetQuery();


          this.set_ViewActiva(2);
        }
        return;
      case 2:
        if (this.resultQuery1) {

          if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
            this.resetQuery();
            this.set_ViewActiva(3);
            let m3 = 0;
            let m4
            let j1 = this.PreparacionComplementosObject.filter(item => item.activo == true)
            m3 = j1.length
            if (m3 == 2) {
              this.maem2 = true;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = false;
            } else {
              this.PreparacionComplementosObject.find(object => {
                m4 = Object.values(object)

              });
              let ComplementoAlmuerzo = m4.includes('Complemento Almuerzo')
              if (ComplementoAlmuerzo == true) {
                this.iD_TipoComplemento = 1;
                this.maem2 = false;
                this.maem1a = true;
                this.maem1b = false;
                this.maer1 = false;
              } else {
                this.maem2 = false;
                this.maem1a = false;
                this.maem1b = true;
                this.maer1 = false;
              }


            }

          } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
            this.resetQuery();
            this.set_ViewActiva(3);
            this.maem2 = false;
            this.maem1a = false;
            this.maem1b = false;
            this.maer1 = true;
          } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
            let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

            if (m[0].iD_TipoModeloOperacionBase == 1) {
              let h = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
              if (h == 1) {
                this.resetQuery();
                this.set_ViewActiva(3);
                this.maem2 = false;
                this.maem1a = true;
                this.maem1b = false;
                this.maer1 = false;
              } else {
                this.resetQuery();
                this.set_ViewActiva(3);
                this.maem2 = false;
                this.maem1a = false;
                this.maem1b = true;
                this.maer1 = false;
              }

            } else if (m[0].iD_TipoModeloOperacionBase == 2) {
              this.resetQuery();
              this.set_ViewActiva(3);
              this.maem2 = false;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = true;
            } else { }
          }

        }
        return;
      case 22:
        if (this.resultQuery1) {

          if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
            this.resetQuery();
            this.set_ViewActiva(3);

            let m3 = 0;
            let m4
            let j1 = this.PreparacionComplementosObject.filter(item => item.activo == true)
            m3 = j1.length
            if (m3 == 2) {
              this.maem2 = true;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = false;
            } else {
              this.PreparacionComplementosObject.find(object => {
                m4 = Object.values(object)

              });
              let ComplementoAlmuerzo = m4.includes('Complemento Almuerzo')
              if (ComplementoAlmuerzo == true) {
                this.maem2 = false;
                this.maem1a = true;
                this.maem1b = false;
                this.maer1 = false;
              } else {
                this.maem2 = false;
                this.maem1a = false;
                this.maem1b = true;
                this.maer1 = false;
              }


            }

          } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
            this.resetQuery();
            this.set_ViewActiva(3);
            this.maem2 = false;
            this.maem1a = false;
            this.maem1b = false;
            this.maer1 = true;
          } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
            let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

            if (m[0].iD_TipoModeloOperacionBase == 1) {
              let h = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
              if (h == 1) {
                this.resetQuery();
                this.set_ViewActiva(3);
                this.maem2 = false;
                this.maem1a = true;
                this.maem1b = false;
                this.maer1 = false;
              } else {
                this.resetQuery();
                this.set_ViewActiva(3);
                this.maem2 = false;
                this.maem1a = false;
                this.maem1b = true;
                this.maer1 = false;
              }

            } else if (m[0].iD_TipoModeloOperacionBase == 2) {
              this.resetQuery();
              this.set_ViewActiva(3);
              this.maem2 = false;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = true;
            } else { }
          }

        }
        return;
      case 3:
        if (this.resultQuery1) {
          this.resetQuery();
          this.set_ViewActiva(4);
        }
        return;
      case 4:
        if (this.resultQuery1) {
          this.resetQuery();
          this.isNextDisabled = false;
          this.set_ViewActiva(5);
        }
        return;
      case 5:
        if (this.resultQuery1) {
          this.resetQuery();
          this.regresar2();
        }
        return;
    }
  }
  set_ViewActiva(viewActiva: number) {
    this.viewActiva = viewActiva;
    this.isNextDisabled = false;
    // Deshabilitar el botón "Siguiente" al hacer clic en "Anterior"

  }
  resetQuery() {
    this.resultQuery1 = false;
    this.resultQuery2 = false;
  }

  addComponentes(event?: Event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  
  this.mesajesalert7 = false;
  this.dataComponentesMas.push({
    id: 0,
    iD_Preparacion: this.PreparacionObject.id,
    iD_TipoComponente: 0,
    sID_TipoComponente: '',
    ModificacionEstado: null,
  });

  return false;
}
  cancelComponentes(id: any, item: any) {

    let h = this.dataComponentesMas[item].id
    if (h == 0) {
      this.dataComponentesMas.splice(item, 1);
    } else {

      Swal.fire({

        showCloseButton: false,
        html:
          '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
          ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#005ACA',
        denyButtonColor: '#E2E6FE',

        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: `Aceptar`,
      }).then((result) => {
        if (result.isDenied) {
          this._ComponentesPreparacionService.deleteComponentesPreparacion(this.dataComponentesMas[item].id).subscribe(
            (response: any) => {
              this.dataComponentesMas.splice(item, 1);
            }, (err) => {
            }
          );
        }
        else {
        }
      })

    }


  }

  cancelarIngredi(row: any) {
    let data = this.dataSource.filter(item => item.id == 0);
    let g = this.IngredientesObject.filter(item => item.id == 0)
    let h = this.IngredientesObject.filter(item => item.id != 0)

    if (data.length > 0 && h.length == 0) {
      if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

        let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
        this.dataSource.splice(idx, 1);
        let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
        g.forEach(item => {
          let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
          this.IngredientesObject.splice(ic, 1);

        })

        let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

        k.forEach(item => {
          let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
          this.AporteIngredienteObject.splice(idj, 1);

        })

      } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
        let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
        this.dataSource.splice(idx, 1);
        let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
        g.forEach(item => {
          let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
          this.IngredientesObject.splice(ic, 1);

        })

        let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

        k.forEach(item => {
          let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
          this.AporteIngredienteObject.splice(idj, 1);

        })


      } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
        let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

        if (m[0].iD_TipoModeloOperacionBase == 1) {
          let m5 = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
          if (m5 == 1) {
            let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.dataSource.splice(idx, 1);
            let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
            g.forEach(item => {
              let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
              this.IngredientesObject.splice(ic, 1);

            })

            let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

            k.forEach(item => {
              let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
              this.AporteIngredienteObject.splice(idj, 1);

            })



          } else {
            let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.dataSource.splice(idx, 1);
            let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
            g.forEach(item => {
              let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
              this.IngredientesObject.splice(ic, 1);

            })

            let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

            k.forEach(item => {
              let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
              this.AporteIngredienteObject.splice(idj, 1);

            })


          }

        } else if (m[0].iD_TipoModeloOperacionBase == 2) {
          let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
          this.dataSource.splice(idx, 1);
          let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
          g.forEach(item => {
            let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.IngredientesObject.splice(ic, 1);

          })

          let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

          k.forEach(item => {
            let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
            this.AporteIngredienteObject.splice(idj, 1);

          })



        } else { }

      } else { }

      if (this.viewActiva == 2) {
        this.viewActiva = 22;
      } else if (this.viewActiva == 22) {
        this.viewActiva = 2;
      }
      this.aporteNutrcional = false;
    } else {


      if (g.length > 1) {
        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

          let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
          this.dataSource.splice(idx, 1);
          let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
          g.forEach(item => {
            let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.IngredientesObject.splice(ic, 1);

          })

          let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

          k.forEach(item => {
            let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
            this.AporteIngredienteObject.splice(idj, 1);

          })

        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
          let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
          this.dataSource.splice(idx, 1);
          let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
          g.forEach(item => {
            let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.IngredientesObject.splice(ic, 1);

          })

          let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

          k.forEach(item => {
            let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
            this.AporteIngredienteObject.splice(idj, 1);

          })


        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

          if (m[0].iD_TipoModeloOperacionBase == 1) {
            let m5 = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
            if (m5 == 1) {
              let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
              this.dataSource.splice(idx, 1);
              let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
              g.forEach(item => {
                let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
                this.IngredientesObject.splice(ic, 1);

              })

              let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

              k.forEach(item => {
                let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
                this.AporteIngredienteObject.splice(idj, 1);

              })



            } else {
              let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
              this.dataSource.splice(idx, 1);
              let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
              g.forEach(item => {
                let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
                this.IngredientesObject.splice(ic, 1);

              })

              let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

              k.forEach(item => {
                let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
                this.AporteIngredienteObject.splice(idj, 1);

              })


            }

          } else if (m[0].iD_TipoModeloOperacionBase == 2) {
            let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
            this.dataSource.splice(idx, 1);
            let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
            g.forEach(item => {
              let ic = this.IngredientesObject.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);
              this.IngredientesObject.splice(ic, 1);

            })

            let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

            k.forEach(item => {
              let idj = this.AporteIngredienteObject.findIndex(item => item.idAlimento === row.iD_AlimentosICBF);
              this.AporteIngredienteObject.splice(idj, 1);

            })



          } else { }

        } else { }

        if (this.viewActiva == 2) {
          this.viewActiva = 22;
        } else if (this.viewActiva == 22) {
          this.viewActiva = 2;
        }
        this.aporteNutrcional = false;

      } else {
        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#E2E6FE',

            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Aceptar',
            showDenyButton: true,
            denyButtonText: `Cancelar`,
          }).then((result) => {

            if (result.dismiss === Swal.DismissReason.cancel) {
              //this.EsSoloLectura=true;
              this.elimarIngredientes(row, this.PreparacionObject.id)
            }
            else {
              //this.EsSoloLectura=false;
            }
          })


        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#E2E6FE',

            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Aceptar',
            showDenyButton: true,
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              //this.EsSoloLectura=true;
              this.elimarIngredientes(row, this.PreparacionObject.id)
            }
            else {
              //this.EsSoloLectura=false;
            }
          })

        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

          if (m[0].iD_TipoModeloOperacionBase == 1) {
            let m5 = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento
            if (m5 == 1) {
              Swal.fire({

                showCloseButton: false,
                html:
                  '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
                  '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
                  ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
                  '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
                showConfirmButton: false,
                showCancelButton: true,
                confirmButtonColor: '#009922',
                cancelButtonColor: '#005ACA',
                denyButtonColor: '#E2E6FE',

                confirmButtonText: 'Aceptar Aprobaciones',
                cancelButtonText: 'Aceptar',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                  //this.EsSoloLectura=true;
                  this.elimarIngredientes(row, this.PreparacionObject.id)
                }
                else {
                  //this.EsSoloLectura=false;
                }
              })


            } else {
              Swal.fire({

                showCloseButton: false,
                html:
                  '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
                  '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
                  ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
                  '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
                showConfirmButton: false,
                showCancelButton: true,
                confirmButtonColor: '#009922',
                cancelButtonColor: '#005ACA',
                denyButtonColor: '#E2E6FE',

                confirmButtonText: 'Aceptar Aprobaciones',
                cancelButtonText: 'Aceptar',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                  //this.EsSoloLectura=true;
                  this.elimarIngredientes(row, this.PreparacionObject.id)
                }
                else {
                  //this.EsSoloLectura=false;
                }
              })
            }

          } else if (m[0].iD_TipoModeloOperacionBase == 2) {
            Swal.fire({

              showCloseButton: false,
              html:
                '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
                '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
                ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
                '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
              showConfirmButton: false,
              showCancelButton: true,
              confirmButtonColor: '#009922',
              cancelButtonColor: '#005ACA',
              denyButtonColor: '#E2E6FE',

              confirmButtonText: 'Aceptar Aprobaciones',
              cancelButtonText: 'Aceptar',
              showDenyButton: true,
              denyButtonText: `Cancelar`,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.cancel) {
                //this.EsSoloLectura=true;
                this.elimarIngredientes(row, this.PreparacionObject.id)
              }
              else {
                //this.EsSoloLectura=false;
              }
            })


          } else { }

        } else { }

        if (this.viewActiva == 2) {
          this.viewActiva = 22;
        } else if (this.viewActiva == 22) {
          this.viewActiva = 2;
        }
        this.aporteNutrcional = false;
      }

    }


  }
  ingr: any;
  apor: any;
  pe: any;
  elimarIngredientes(row: any, idPreparacion: any) {

    this._PA_IngredientesGetAllWithRelationService.getPA_IngredientesGetAllWithRelationList(idPreparacion).subscribe(
      (response: any) => {

        this.ingr = response.filter(item => item.iD_AlimentosICBF == row.iD_AlimentosICBF);
        this.ingr.forEach(element => {
          this._IngredientesService.deleteIngredientes(element.id).subscribe(
            (response: any) => {

            },
            (err) => {

            }
          );

        });

        let idx = this.dataSource.findIndex(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF);

        this.dataSource.splice(idx, 1);



        let g = this.IngredientesObject.filter(item => item.iD_AlimentosICBF === row.iD_AlimentosICBF)
        g.forEach(item => {
          let ic = this.IngredientesObject.findIndex(item1 => item1.iD_AlimentosICBF === item.iD_AlimentosICBF && item1.iD_TipoNivelEducativo === item.iD_TipoNivelEducativo && item1.iD_TipoComplemento === item.iD_TipoComplemento);

          this.IngredientesObject.splice(ic, 1);
        })
        let k = this.AporteIngredienteObject.filter(item => item.idAlimento === row.iD_AlimentosICBF)

        k.forEach(item => {
          let idj = this.AporteIngredienteObject.findIndex(item1 => item1.idAlimento === item.idAlimento && item1.idEdu === item.idEdu && item1.iD_Nutriente === item.iD_Nutriente);
          this.AporteIngredienteObject.splice(idj, 1);
        })

        this._PesoNetoPreparacionService.getPesoNetoPreparacionListfilter(idPreparacion).subscribe(
          (response: any) => {


            if (this.viewActiva == 2) {
              this.viewActiva = 22;
            } else if (this.viewActiva == 22) {
              this.viewActiva = 2;
            }
            this.aporteNutrcional = false;

          },
          (err) => {

          }
        )

      },
      (err) => {

      }
    );

  }
  addComponentesMAER() {
    this.dataComponentesMAER.push({
      id: 0,
      id_Preparacion: this.PreparacionObject.id,
      iD_TipoComponente: 0,

    })
  }



  openDialogIngredientes(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogPTNPreparacionIngredientesContent, {
      data: obj
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
  addRowDataIngredientes(row_obj): void {
    this.mensajeIn = false;
    let ingf = this.Aliment1.filter(item => item.id == row_obj.iD_Producto)
    this.mesajesalertpre = false;
    this.dataSource.push({
      id: 0,
      sID: '',
      iD_AlimentosICBF: row_obj.iD_Producto,
      sID_AlimentosICBF: row_obj.siD_Producto,
      iD_TipoNivelEducativo: 0,
      sID_TipoNivelEducativo: '',
      iD_Producto: 0,
      iD_Preparacion: 0,
      siD_Preparacion: '',
      iD_TipoComplemento: 0,
      sID_TipoComplemento: '',
      pesoBruto: 0,
      pesoNeto: 0,
      porcentajeComestible: 0,
      intercambioEstandarizado: 0,
      auditoria: '',
      estado: null,
      ModificacionEstado: true,

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

    if (this.viewActiva == 1) {
      this.viewActiva = 11;
    } else if (this.viewActiva == 11) {
      this.viewActiva = 1;
    } else if (this.viewActiva == 2) {
      this.viewActiva = 22;
    } else if (this.viewActiva == 22) {
      this.viewActiva = 2;

    }

  }
  openingredienteDetalle(myRowData: any) {

    this.tabs = [];
    this.TipoModelos = 0;
    this.cantModelo = 0;

    this.PreparacionComplementosObject.forEach(item => {
      this.tabs.push({
        "nombre": item.nombre,
        "estado": 'Pendiente',
        "id": item.iD_TipoComplemento

      })
    })



    let com = this.tabs[this.selectedTabIndex];
    let com1 = this.tabs
    let com2 = this.PreparacionComplementosObject.filter(item => item.nombre == com.nombre)
    if (com2.length == 0) {

    } else {
      this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    }

    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == myRowData.sID_AlimentosICBF)
    let ing4 = this.AporteIngredienteObject.filter(item => item.idAlimento == ingred[0].iD_AlimentosICBF)
    let peso = this.PesoNetoObject.filter(item => item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

      let cant = this.PreparacionComplementosObject.length

      if (cant == 1) {
        this.aporteNutrcional = true;
        this.Nutrientes = false;
        this.TipoModelos = 1;
        this.cantModelo = 1;
        this.nombreIngrediente = myRowData.sID_AlimentosICBF;
        this.idIngrediente = myRowData.iD_AlimentosICBF;
        this.NivelAlement();

      } else if (cant == 2) {
        this.aporteNutrcional = true;
        this.Nutrientes = false;
        this.TipoModelos = 1;
        this.cantModelo = 2;
        this.nombreIngrediente = myRowData.sID_AlimentosICBF;
        this.idIngrediente = myRowData.iD_AlimentosICBF;
        this.NivelAlement();

      } else { }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this.aporteNutrcional = true;
      this.Nutrientes = true;
      this.TipoModelos = 2
      this.nombreIngrediente = myRowData.sID_AlimentosICBF;
      this.idIngrediente = myRowData.iD_AlimentosICBF;
      this.NivelAlement();
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      this.iD_TipoComplemento = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento;
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {

        this.aporteNutrcional = true;
        this.Nutrientes = false;
        this.TipoModelos = 1;
        this.cantModelo = 1;
        this.nombreIngrediente = myRowData.sID_AlimentosICBF;
        this.idIngrediente = myRowData.iD_AlimentosICBF;
        this.NivelAlement();


      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this.aporteNutrcional = true;
        this.Nutrientes = true;
        this.TipoModelos = 2
        this.nombreIngrediente = myRowData.sID_AlimentosICBF;
        this.idIngrediente = myRowData.iD_AlimentosICBF;
        this.NivelAlement();
      } else { }
    }

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let cant = this.PreparacionComplementosObject.length
      if (cant == 1) {
        if (ing4.length == 0) {
          this.NivelEducativoList.map(function (dato) {
            dato.estado = 'Pendiente';
            return dato;
          });
        } else {
          if (ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {
            if (myRowData.estado == 'Incompleto') {
              let ing5 = ing4.filter(item => item.comple == 1)
              let ing6 = ing4.filter(item => item.comple == 2)
              let pe5 = peso.filter(item => item.iD_TipoComplemento == 1)
              let pe6 = peso.filter(item => item.iD_TipoComplemento == 2)

              if (ing5.length == 0) {

              } else {
                if (ing5[0].comple == 1) {


                  let n1 = this.NivelEducativoList.filter(item => item.id == ing5[0].idEdu);
                  let k1 = ing5.filter(item => item.idEdu == 1);
                  let k2 = ing5.filter(item => item.idEdu == 2);
                  let k3 = ing5.filter(item => item.idEdu == 3);
                  let k4 = ing5.filter(item => item.idEdu == 5);
                  let k5 = ing5.filter(item => item.idEdu == 6);

                  let k1_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }


                  }



                } else {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing5[0].idEdu);
                  let k1 = ing5.filter(item => item.idEdu == 1);
                  let k2 = ing5.filter(item => item.idEdu == 2);
                  let k3 = ing5.filter(item => item.idEdu == 3);
                  let k4 = ing5.filter(item => item.idEdu == 5);
                  let k5 = ing5.filter(item => item.idEdu == 6);

                  let k1_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }

                  }

                }
              }
              if (ing6.length == 0) {

              } else {
                if (ing6[0].comple == 2) {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing6[0].idEdu);
                  let k1 = ing6.filter(item => item.idEdu == 1);
                  let k2 = ing6.filter(item => item.idEdu == 2);
                  let k3 = ing6.filter(item => item.idEdu == 3);
                  let k4 = ing6.filter(item => item.idEdu == 5);
                  let k5 = ing6.filter(item => item.idEdu == 6);
                  let k1_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }


                  }


                } else {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing6[0].idEdu);
                  let k1 = ing6.filter(item => item.idEdu == 1);
                  let k2 = ing6.filter(item => item.idEdu == 2);
                  let k3 = ing6.filter(item => item.idEdu == 3);
                  let k4 = ing6.filter(item => item.idEdu == 5);
                  let k5 = ing6.filter(item => item.idEdu == 6);
                  let k1_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }

                  }
                }
              }
            } else if (myRowData.estado == 'Completo') {

              this.NivelEducativoList.map(function (dato) {
                if (ing4[0].idEdu === null) {
                } else {
                  dato.estado = 'Completo';
                }
                return dato;
              });

            } else if (myRowData.estado == 'Pendiente') {
              if (ing4[0].comple == 1) {

                let n = this.NivelEducativoList.filter(item => item.id == ing4[0].idEdu);
                if (n.length == 0) {

                } else {
                  this.NivelEducativoList.map(function (dato) {
                    if (ing4[0].idEdu === null) {

                    } else {
                      if (dato.id == ing4[0].idEdu) {
                        dato.estado = 'Completo';
                      }

                    }


                    return dato;
                  });

                }
                let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');
                if (h.length == 5) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Completo';

                      }
                    }


                    return dato;
                  });

                } else if (h.length == 0) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Pendiente';

                      }
                    }


                    return dato;
                  });
                } else if (h.length >= 1) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Incompleto';

                      }
                    }


                    return dato;
                  });
                } else { }

              } else {



              }

            }

          } else { }
        }
      } else if (cant == 2) {
        if (ing4.length == 0) {
          this.tabs.map(function (dato) {
            dato.estado = 'Pendiente';
            return dato;
          });
          this.NivelEducativoList2.map(function (dato) {
            dato.estado = 'Pendiente';
            return dato;
          });
          this.NivelEducativoList3.map(function (dato) {
            dato.estado = 'Pendiente';
            return dato;
          });
        } else {
          if (ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {
            if (myRowData.estado == 'Incompleto') {
              let ing5 = ing4.filter(item => item.comple == 1)
              let ing6 = ing4.filter(item => item.comple == 2)
              let pe5 = peso.filter(item => item.iD_TipoComplemento == 1)
              let pe6 = peso.filter(item => item.iD_TipoComplemento == 2)
              if (ing5.length == 0) {
                this.NivelEducativoList2.map(function (dato) {

                  dato.estado = 'Pendiente';

                  return dato;
                });
              } else {

                let n1 = this.NivelEducativoList2.filter(item => item.id == ing5[0].idEdu);
                let k1 = ing5.filter(item => item.idEdu == 1);
                let k2 = ing5.filter(item => item.idEdu == 2);
                let k3 = ing5.filter(item => item.idEdu == 3);
                let k4 = ing5.filter(item => item.idEdu == 5);
                let k5 = ing5.filter(item => item.idEdu == 6);
                let k1_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 1);
                let k2_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 2);
                let k3_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 3);
                let k4_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 5);
                let k5_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 6);
                if (n1.length == 0) {

                } else {
                  if (k1.length == 0) {
                    this.NivelEducativoList2.map(function (dato) {
                      if (dato.id == 1) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k1_1[0].pesoNeto == null) {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k1[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k1[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }

                  }
                  if (k2.length == 0) {
                    this.NivelEducativoList2.map(function (dato) {
                      if (dato.id == 2) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k2_1[0].pesoNeto == null) {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k2[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k2[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }

                  }
                  if (k3.length == 0) {
                    this.NivelEducativoList2.map(function (dato) {
                      if (dato.id == 3) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k3_1[0].pesoNeto == null) {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k3[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k3[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }
                  if (k4.length == 0) {
                    this.NivelEducativoList2.map(function (dato) {
                      if (dato.id == 5) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k4_1[0].pesoNeto == null) {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k4[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k4[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }
                  if (k5.length == 0) {
                    this.NivelEducativoList2.map(function (dato) {
                      if (dato.id == 6) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k5_1[0].pesoNeto == null) {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k5[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList2.map(function (dato) {
                        if (dato.id == k5[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }

                }

              }
              if (ing6.length == 0) {
                this.NivelEducativoList3.map(function (dato) {

                  dato.estado = 'Pendiente';

                  return dato;
                });
              } else {


                let n1 = this.NivelEducativoList3.filter(item => item.id == ing6[0].idEdu);
                let k1 = ing6.filter(item => item.idEdu == 1);

                let k2 = ing6.filter(item => item.idEdu == 2);
                let k3 = ing6.filter(item => item.idEdu == 3);
                let k4 = ing6.filter(item => item.idEdu == 5);
                let k5 = ing6.filter(item => item.idEdu == 6);

                let k1_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 1);
                let k2_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 2);
                let k3_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 3);
                let k4_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 5);
                let k5_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 6);
                if (n1.length == 0) {

                } else {
                  if (k1.length == 0) {
                    this.NivelEducativoList3.map(function (dato) {
                      if (dato.id == 1) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k1_1[0].pesoNeto == null) {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k1[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k1[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }

                  }
                  if (k2.length == 0) {
                    this.NivelEducativoList3.map(function (dato) {
                      if (dato.id == 2) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k2_1[0].pesoNeto == null) {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k2[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k2[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }

                  }
                  if (k3.length == 0) {
                    this.NivelEducativoList3.map(function (dato) {
                      if (dato.id == 3) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k3_1[0].pesoNeto == null) {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k3[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k3[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }
                  if (k4.length == 0) {
                    this.NivelEducativoList3.map(function (dato) {
                      if (dato.id == 5) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k4_1[0].pesoNeto == null) {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k4[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k4[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }
                  if (k5.length == 0) {
                    this.NivelEducativoList3.map(function (dato) {
                      if (dato.id == 6) {
                        dato.estado = 'Pendiente';
                      }
                      return dato;
                    });
                  } else {
                    if (k5_1[0].pesoNeto == null) {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k5[0].idEdu) {
                          dato.estado = 'Incompleto';
                        }
                        return dato;
                      });
                    } else {
                      this.NivelEducativoList3.map(function (dato) {
                        if (dato.id == k5[0].idEdu) {
                          dato.estado = 'Completo';
                        }
                        return dato;
                      });
                    }
                  }

                }


              }
              let l = this.NivelEducativoList2.filter(item => item.estado == 'Completo');
              let h = this.NivelEducativoList3.filter(item => item.estado == 'Completo');
              if (l.length == 0) {
                let l1 = this.NivelEducativoList2.filter(item => item.estado == 'Incompleto');
                if (l1.length == 0) {
                  this.tabs.map(function (dato) {

                    if (dato.id === 1) {
                      dato.estado = 'Pendiente'
                    }
                    return dato;

                  })
                } else {
                  this.tabs.map(function (dato) {

                    if (dato.id === 1) {
                      dato.estado = 'Incompleto'
                    }
                    return dato;

                  });
                }
              } else {
                this.tabs.map(function (dato) {
                  if (dato.id === 1) {
                    dato.estado = 'Completo'
                  }
                  return dato;

                });
              }
              if (h.length == 0) {
                let h1 = this.NivelEducativoList3.filter(item => item.estado == 'Incompleto');
                if (h1.length == 0) {
                  this.tabs.map(function (dato) {

                    if (dato.id === 2) {
                      dato.estado = 'Pendiente'
                    }
                    return dato;

                  })
                } else {
                  this.tabs.map(function (dato) {

                    if (dato.id === 2) {
                      dato.estado = 'Incompleto'
                    }
                    return dato;

                  });
                }
              } else {
                this.tabs.map(function (dato) {
                  if (dato.id === 2) {
                    dato.estado = 'Completo'
                  }
                  return dato;

                });
              }

            } else if (myRowData.estado == 'Completo') {
              this.tabs.map(function (dato) {
                if (com.nombre === null) {
                } else {
                  dato.estado = 'Completo'
                }
                return dato;
              });
              this.NivelEducativoList2.map(function (dato) {
                if (ing4[0].idEdu === null) {
                } else {
                  dato.estado = 'Completo';
                }
                return dato;
              });
              this.NivelEducativoList3.map(function (dato) {
                if (ing4[0].idEdu === null) {
                } else {
                  dato.estado = 'Completo';
                }
                return dato;
              });
            } else if (myRowData.estado == 'Pendiente') {
              if (ing4[0].comple == 1) {

                let n = this.NivelEducativoList2.filter(item => item.id == ing4[0].idEdu);
                if (n.length == 0) {

                } else {
                  this.NivelEducativoList2.map(function (dato) {
                    if (ing4[0].idEdu === null) {

                    } else {
                      if (dato.id == ing4[0].idEdu) {
                        dato.estado = 'Completo';
                      }

                    }


                    return dato;
                  });

                }
                let h = this.NivelEducativoList2.filter(item => item.estado == 'Completo');
                if (h.length == 5) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Completo';

                      }
                    }


                    return dato;
                  });

                } else if (h.length == 0) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Pendiente';

                      }
                    }


                    return dato;
                  });
                } else if (h.length >= 1) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Incompleto';

                      }
                    }


                    return dato;
                  });
                } else { }

              } else {

                let n1 = this.NivelEducativoList3.filter(item => item.id == ing4[0].idEdu);
                if (n1.length == 0) {

                } else {
                  this.NivelEducativoList3.map(function (dato) {
                    if (ing4[0].idEdu === null) {

                    } else {
                      if (dato.id == ing4[0].idEdu) {
                        dato.estado = 'Completo';
                      }

                    }


                    return dato;
                  });

                }
                let h1 = this.NivelEducativoList3.filter(item => item.estado == 'Completo');
                if (h1.length == 5) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Completo';

                      }
                    }


                    return dato;
                  });

                } else if (h1.length == 0) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Pendiente';

                      }
                    }


                    return dato;
                  });
                } else if (h1.length >= 1) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Incompleto';

                      }
                    }


                    return dato;
                  });
                } else { }


              }

            }

          } else { }
        }
      } else { }
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      if (ing4.length == 0) {
        this.Nutrientes = true;
        this.pesoText = null;
        this.ma.forEach(element => {
          element.aporte = null;
        })
        this.mi.forEach(element => {
          element.aporte = null;
        })
        this.en.forEach(element => {
          element.aporte = null;
        })
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = null;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = null;
          }
        })
      } else {
        this.Nutrientes = true;
        let ing2 = this.IngredientesObject.filter(item => item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

        if (this.nombreIngrediente == ingred[0].sID_AlimentosICBF) {

          this.pesoText = ing2[0].pesoNeto;
          this.equivalencia.forEach(element => {

            //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
            if (element.nombre == 'Peso bruto (g):') {
              element.valor = ing2[0].pesoBruto;
            } else if (element.nombre == 'Porcentaje comestible (%):') {
              element.valor = ing2[0].porcentajeComestible;
            }
          })
          this.ma.forEach((item => {
            item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.mi.forEach((item => {
            item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.en.forEach((item => {
            item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))



        } else {

          this.pesoText = null;
          this.equivalencia.forEach(element => {

            //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
            if (element.nombre == 'Peso bruto (g):') {
              element.valor = null;
            } else if (element.nombre == 'Porcentaje comestible (%):') {
              element.valor = null;
            }
          })
          this.ma.forEach(item => {
            item.aporte = null;
          })
          this.mi.forEach(item => {
            item.aporte = null;
          })
          this.en.forEach(item => {
            item.aporte = null;
          })
        }
      }
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      this.iD_TipoComplemento = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento;
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {

        if (ing4.length == 0) {
          this.NivelEducativoList.map(function (dato) {
            dato.estado = 'Pendiente';
            return dato;
          });
        } else {
          if (ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {
            if (myRowData.estado == 'Incompleto') {
              let ing5 = ing4.filter(item => item.comple == 1)
              let ing6 = ing4.filter(item => item.comple == 2)
              let pe5 = peso.filter(item => item.iD_TipoComplemento == 1)
              let pe6 = peso.filter(item => item.iD_TipoComplemento == 2)
              if (ing5.length == 0) {

              } else {
                if (ing5[0].comple == 1) {


                  let n1 = this.NivelEducativoList.filter(item => item.id == ing5[0].idEdu);
                  let k1 = ing5.filter(item => item.idEdu == 1);
                  let k2 = ing5.filter(item => item.idEdu == 2);
                  let k3 = ing5.filter(item => item.idEdu == 3);
                  let k4 = ing5.filter(item => item.idEdu == 5);
                  let k5 = ing5.filter(item => item.idEdu == 6);

                  let k1_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }


                  }



                } else {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing5[0].idEdu);
                  let k1 = ing5.filter(item => item.idEdu == 1);
                  let k2 = ing5.filter(item => item.idEdu == 2);
                  let k3 = ing5.filter(item => item.idEdu == 3);
                  let k4 = ing5.filter(item => item.idEdu == 5);
                  let k5 = ing5.filter(item => item.idEdu == 6);

                  let k1_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe5.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }

                  }

                }
              }
              if (ing6.length == 0) {

              } else {
                if (ing6[0].comple == 2) {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing6[0].idEdu);
                  let k1 = ing6.filter(item => item.idEdu == 1);
                  let k2 = ing6.filter(item => item.idEdu == 2);
                  let k3 = ing6.filter(item => item.idEdu == 3);
                  let k4 = ing6.filter(item => item.idEdu == 5);
                  let k5 = ing6.filter(item => item.idEdu == 6);
                  let k1_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }


                  }


                } else {

                  let n1 = this.NivelEducativoList.filter(item => item.id == ing6[0].idEdu);
                  let k1 = ing6.filter(item => item.idEdu == 1);
                  let k2 = ing6.filter(item => item.idEdu == 2);
                  let k3 = ing6.filter(item => item.idEdu == 3);
                  let k4 = ing6.filter(item => item.idEdu == 5);
                  let k5 = ing6.filter(item => item.idEdu == 6);
                  let k1_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 1);
                  let k2_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 2);
                  let k3_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 3);
                  let k4_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 5);
                  let k5_1 = pe6.filter(item => item.iD_TipoNivelEducativo == 6);
                  if (n1.length == 0) {

                  } else {
                    if (k1.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 1) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k1_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k1[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k2.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 2) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k2_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k2[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }

                    }
                    if (k3.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 3) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k3_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k3[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k4.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 5) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k4_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k4[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }
                    if (k5.length == 0) {
                      this.NivelEducativoList.map(function (dato) {
                        if (dato.id == 6) {
                          dato.estado = 'Pendiente';
                        }
                        return dato;
                      });
                    } else {
                      if (k5_1[0].pesoNeto == null) {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Incompleto';
                          }
                          return dato;
                        });
                      } else {
                        this.NivelEducativoList.map(function (dato) {
                          if (dato.id == k5[0].idEdu) {
                            dato.estado = 'Completo';
                          }
                          return dato;
                        });
                      }
                    }

                  }
                }
              }
            } else if (myRowData.estado == 'Completo') {

              this.NivelEducativoList.map(function (dato) {
                if (ing4[0].idEdu === null) {
                } else {
                  dato.estado = 'Completo';
                }
                return dato;
              });

            } else if (myRowData.estado == 'Pendiente') {
              if (ing4[0].comple == 1) {

                let n = this.NivelEducativoList.filter(item => item.id == ing4[0].idEdu);
                if (n.length == 0) {

                } else {
                  this.NivelEducativoList.map(function (dato) {
                    if (ing4[0].idEdu === null) {

                    } else {
                      if (dato.id == ing4[0].idEdu) {
                        dato.estado = 'Completo';
                      }

                    }


                    return dato;
                  });

                }
                let h = this.NivelEducativoList.filter(item => item.estado == 'Completo');
                if (h.length == 5) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Completo';

                      }
                    }


                    return dato;
                  });

                } else if (h.length == 0) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Pendiente';

                      }
                    }


                    return dato;
                  });
                } else if (h.length >= 1) {
                  this.tabs.map(function (dato) {
                    if (com.nombre === null) {

                    } else {
                      if (dato.nombre == com1[0].nombre) {
                        dato.estado = 'Incompleto';

                      }
                    }


                    return dato;
                  });
                } else { }

              } else {



              }

            }

          } else { }
        }

      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        if (ing4.length == 0) {
          this.Nutrientes = true;
          this.pesoText = null;
          this.ma.forEach(element => {
            element.aporte = null;
          })
          this.mi.forEach(element => {
            element.aporte = null;
          })
          this.en.forEach(element => {
            element.aporte = null;
          })
          this.equivalencia.forEach(element => {

            //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
            if (element.nombre == 'Peso bruto (g):') {
              element.valor = null;
            } else if (element.nombre == 'Porcentaje comestible (%):') {
              element.valor = null;
            }
          })
        } else {
          this.Nutrientes = true;
          let ing2 = this.IngredientesObject.filter(item => item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

          if (this.nombreIngrediente == ingred[0].sID_AlimentosICBF) {

            this.pesoText = ing2[0].pesoNeto;
            this.equivalencia.forEach(element => {

              //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
              if (element.nombre == 'Peso bruto (g):') {
                element.valor = ing2[0].pesoBruto;
              } else if (element.nombre == 'Porcentaje comestible (%):') {
                element.valor = ing2[0].porcentajeComestible;
              }
            })
            this.ma.forEach((item => {
              item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
            }))
            this.mi.forEach((item => {
              item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
            }))
            this.en.forEach((item => {
              item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
            }))



          } else {

            this.pesoText = null;
            this.equivalencia.forEach(element => {

              //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
              if (element.nombre == 'Peso bruto (g):') {
                element.valor = null;
              } else if (element.nombre == 'Porcentaje comestible (%):') {
                element.valor = null;
              }
            })
            this.ma.forEach(item => {
              item.aporte = null;
            })
            this.mi.forEach(item => {
              item.aporte = null;
            })
            this.en.forEach(item => {
              item.aporte = null;
            })
          }
        }
      } else { }
    }
    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      if (com2.length == 0) {
        this.Nutrientes = true
      } else {
        if (com2[0].iD_TipoComplemento == 1) {

          this.Nivel1 = true;
          this.Nivel2 = false;

        } else if (com2[0].iD_TipoComplemento == 2) {
          this.Nivel1 = false;
          this.Nivel2 = true;
        } else { }
      }
    } else { }




  }
  myTabFocusChange(tabChangeEvent: any): void {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.PreparacionComplementosObject.filter(item => item.nombre == com.nombre)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.Nutrientes = false;
    if (com2[0].iD_TipoComplemento == 1) {

      this.Nivel1 = true;
      this.Nivel2 = false;

    } else if (com2[0].iD_TipoComplemento == 2) {
      this.Nivel1 = false;
      this.Nivel2 = true;
    }





  }
  NivelAlement() {

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      this._PA_NutrientesAlimentosGetAllWithRelationService.getPA_NutrientesAlimentosGetAllWithRelationList(this.idIngrediente).subscribe(
        (response: any) => {

          this.nuAlimentos = response;
          this._NutrientesService.getNutrientesList().subscribe(
            (response: any) => {
              this.nutrientes = response;

              this.ma = response.filter(item => item.iD_TipoNutriente == 1);

              this.mi = response.filter(item => item.iD_TipoNutriente == 2);

              this.en = response.filter(item => item.iD_TipoNutriente == 3);
              this.micro = this.mi;
              this.energia = this.en;

              if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
                let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                this.macro = ma2;

              } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
                let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                this.macro = ma2;

              } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
                let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

                if (m[0].iD_TipoModeloOperacionBase == 1) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;


                } else if (m[0].iD_TipoModeloOperacionBase == 2) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;

                } else { }

              }
              if (this.grado != 0) { this.onNivelEducativoChange1_1(this.grado) }
            },
            (err) => {
            }
          );


        },
        (err) => {
        }
      );
      let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
      let m3

      ingf.find(object => {
        m3 = Object.keys(object)
        for (let caja in ingf) {
          let pesoNeto = m3.includes('pesoNeto')
          let porcentajeComestible = m3.includes('porcentajeComestible')
          this.equivalencia = [];
          if (porcentajeComestible == true) {
            this.equivalencia.push({
              nombre: 'Peso bruto (g):',
              valor: null,
            });
            this.equivalencia.push({
              nombre: 'Porcentaje comestible (%):',
              valor: null,
            });
          } else { }

        }

      });


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this._PA_NutrientesAlimentosGetAllWithRelationService.getPA_NutrientesAlimentosGetAllWithRelationList(this.idIngrediente).subscribe(
        (response: any) => {

          this.nuAlimentos = response;
          this._NutrientesService.getNutrientesList().subscribe(
            (response: any) => {
              this.nutrientes = response;
              this.ma = response.filter(item => item.iD_TipoNutriente == 1);
              this.mi = response.filter(item => item.iD_TipoNutriente == 2);
              this.en = response.filter(item => item.iD_TipoNutriente == 3);
              if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
                let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                this.macro = ma2;
                this.micro = this.mi;
                this.energia = this.en;
              } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
                let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                this.macro = ma2;
                this.micro = this.mi;
                this.energia = this.en;

              } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
                let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

                if (m[0].iD_TipoModeloOperacionBase == 1) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;
                  this.micro = this.mi;
                  this.energia = this.en;

                } else if (m[0].iD_TipoModeloOperacionBase == 2) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;
                  this.micro = this.mi;
                  this.energia = this.en;
                } else { }

              }

              let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
              let ing4 = this.AporteIngredienteObject.filter(item => item.idAlimento == ingred[0].iD_AlimentosICBF)
              if (ing4.length == 0) {
                this.macro.forEach((item => {
                  item.aporte = null;
                }))
                this.micro.forEach((item => {
                  item.aporte = null;
                }))
                this.energia.forEach((item => {
                  item.aporte = null;
                }))

              } else {
                this.macro.forEach((item => {
                  item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                }))
                this.micro.forEach((item => {
                  item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                }))
                this.energia.forEach((item => {
                  item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                }))
              }

            },
            (err) => {
            }
          );


        },
        (err) => {
        }
      );
      let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
      let m3

      ingf.find(object => {
        m3 = Object.keys(object)
        for (let caja in ingf) {
          let pesoNeto = m3.includes('pesoNeto')
          let porcentajeComestible = m3.includes('porcentajeComestible')
          this.equivalencia = [];
          if (porcentajeComestible == true) {
            this.equivalencia.push({
              nombre: 'Peso bruto (g):',
              valor: null,
            });
            this.equivalencia.push({
              nombre: 'Porcentaje comestible (%):',
              valor: null,
            });
          } else { }

        }

      });
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this._PA_NutrientesAlimentosGetAllWithRelationService.getPA_NutrientesAlimentosGetAllWithRelationList(this.idIngrediente).subscribe(
          (response: any) => {

            this.nuAlimentos = response;
            this._NutrientesService.getNutrientesList().subscribe(
              (response: any) => {
                this.nutrientes = response;
                this.ma = response.filter(item => item.iD_TipoNutriente == 1);
                this.mi = response.filter(item => item.iD_TipoNutriente == 2);
                this.en = response.filter(item => item.iD_TipoNutriente == 3);
                this.micro = this.mi;
                this.energia = this.en;
                if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;

                } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;


                } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
                  let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

                  if (m[0].iD_TipoModeloOperacionBase == 1) {
                    let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                    ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                    this.macro = ma2;


                  } else if (m[0].iD_TipoModeloOperacionBase == 2) {
                    let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                    ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                    this.macro = ma2;

                  } else { }

                }
                if (this.grado != 0) { this.onNivelEducativoChange1_1(this.grado) }
              },
              (err) => {
              }
            );


          },
          (err) => {
          }
        );
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        let m3

        ingf.find(object => {
          m3 = Object.keys(object)
          for (let caja in ingf) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: null,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: null,
              });
            } else { }

          }

        });

      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this._PA_NutrientesAlimentosGetAllWithRelationService.getPA_NutrientesAlimentosGetAllWithRelationList(this.idIngrediente).subscribe(
          (response: any) => {

            this.nuAlimentos = response;
            this._NutrientesService.getNutrientesList().subscribe(
              (response: any) => {
                this.nutrientes = response;
                this.ma = response.filter(item => item.iD_TipoNutriente == 1);
                this.mi = response.filter(item => item.iD_TipoNutriente == 2);
                this.en = response.filter(item => item.iD_TipoNutriente == 3);
                if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;
                  this.micro = this.mi;
                  this.energia = this.en;
                } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
                  let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                  ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                  this.macro = ma2;
                  this.micro = this.mi;
                  this.energia = this.en;

                } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
                  let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

                  if (m[0].iD_TipoModeloOperacionBase == 1) {
                    let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)

                    ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                    this.macro = ma2;
                    this.micro = this.mi;
                    this.energia = this.en;

                  } else if (m[0].iD_TipoModeloOperacionBase == 2) {
                    let ma2 = this.ma.filter(item => item.id != 314 && item.id != 313)
                    ma2.sort((firstItem, secondItem) => firstItem.orden - secondItem.orden);

                    this.macro = ma2;
                    this.micro = this.mi;
                    this.energia = this.en;
                  } else { }

                }

                let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
                let ing4 = this.AporteIngredienteObject.filter(item => item.idAlimento == ingred[0].iD_AlimentosICBF)
                if (ing4.length == 0) {
                  this.macro.forEach((item => {
                    item.aporte = null;
                  }))
                  this.micro.forEach((item => {
                    item.aporte = null;
                  }))
                  this.energia.forEach((item => {
                    item.aporte = null;
                  }))

                } else {
                  this.macro.forEach((item => {
                    item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                  }))
                  this.micro.forEach((item => {
                    item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                  }))
                  this.energia.forEach((item => {
                    item.aporte = ing4.find(ele => ele.iD_Nutriente == item.id).aporte;
                  }))
                }

              },
              (err) => {
              }
            );


          },
          (err) => {
          }
        );
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        let m3

        ingf.find(object => {
          m3 = Object.keys(object)
          for (let caja in ingf) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: null,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: null,
              });
            } else { }

          }

        });
      } else {

      }
    }





  }

  onNivelEducativoChange(event: any): void {

    this.Nutrientes = false;

    this.grado = event[0].value



    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
    let ing2 = this.IngredientesObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)
    let ing3 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF);

    if (ing2.length == 0) {

      this.Nutrientes = true;
      this.pesoText = null;
      this.macro.forEach(element => {
        element.aporte = null;
      })
      this.micro.forEach(element => {
        element.aporte = null;
      })
      this.energia.forEach(element => {
        element.aporte = null;
      })
      this.equivalencia.forEach(element => {

        //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
        if (element.nombre == 'Peso bruto (g):') {
          element.valor = null;
        } else if (element.nombre == 'Porcentaje comestible (%):') {
          element.valor = null;
        }
      })
    } else {
      this.Nutrientes = true;
      if (this.iD_TipoComplemento == ing2[0].iD_TipoComplemento && this.grado == ing2[0].iD_TipoNivelEducativo && this.nombreIngrediente == ingred[0].sID_AlimentosICBF) {

        this.pesoText = ing2[0].pesoNeto;
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = ing2[0].pesoBruto;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = ing2[0].porcentajeComestible;
          }
        })

        if (ing3.length == 0) {

        } else {
          this.macro.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.micro.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.energia.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))

        }



      } else {

        this.pesoText = null;
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = null;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = null;
          }
        })
        this.macro.forEach(item => {
          item.aporte = null;
        })
        this.micro.forEach(item => {
          item.aporte = null;
        })
        this.energia.forEach(item => {
          item.aporte = null;
        })
      }


    }


  }
  onNivelEducativoChange1_1(event: any): void {

    this.Nutrientes = false;

    this.grado = event



    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
    let ing2 = this.IngredientesObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)
    let ing3 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF);

    if (ing2.length == 0) {

      this.Nutrientes = true;
      this.pesoText = null;
      this.macro.forEach(element => {
        element.aporte = null;
      })
      this.micro.forEach(element => {
        element.aporte = null;
      })
      this.energia.forEach(element => {
        element.aporte = null;
      })
      this.equivalencia.forEach(element => {

        //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
        if (element.nombre == 'Peso bruto (g):') {
          element.valor = null;
        } else if (element.nombre == 'Porcentaje comestible (%):') {
          element.valor = null;
        }
      })
    } else {
      this.Nutrientes = true;
      if (this.iD_TipoComplemento == ing2[0].iD_TipoComplemento && this.grado == ing2[0].iD_TipoNivelEducativo && this.nombreIngrediente == ingred[0].sID_AlimentosICBF) {

        this.pesoText = ing2[0].pesoNeto;
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = ing2[0].pesoBruto;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = ing2[0].porcentajeComestible;
          }
        })

        if (ing3.length == 0) {

        } else {
          this.macro.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.micro.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))
          this.energia.forEach((item => {
            item.aporte = ing3.find(ele => ele.iD_Nutriente == item.id).aporte;
          }))

        }



      } else {

        this.pesoText = null;
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = null;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = null;
          }
        })
        this.macro.forEach(item => {
          item.aporte = null;
        })
        this.micro.forEach(item => {
          item.aporte = null;
        })
        this.energia.forEach(item => {
          item.aporte = null;
        })
      }


    }


  }

  changeItemPeso(name: string, value: any) {
    let nom = this.nombreIngrediente

    this.macro.forEach(element => {
      element.aporte = null;
    })
    this.micro.forEach(element => {
      element.aporte = null;
    })
    this.energia.forEach(element => {
      element.aporte = null;
    })
    if (value == 100) {
      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })

      } else {
        this.macro.forEach(element => {
          let h = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }
        })
        this.micro.forEach(element => {
          let g = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        this.equivalencia.forEach(element => {

          //Peso neto*100/Peso bruto= %parte comestible
          //(100/% de parte comestible del alimento)*peso neto = Peso bruto
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = ingf[0].pesoBruto;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = ingf[0].porcentajeComestible;
          }
        })
        let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
        let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
        let bru = b[0].valor
        let comes = c[0].valor;
        let inte = ingf[0].intercambioEstandarizado
        this.ingredientesinsert(nom, value, bru, comes, inte)
        //this.aporteIngrediente();
      }


    } else {
      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })

      } else {
        this.macro.forEach(element => {
          let h = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }

          //element.aporte = 0;
        })
        this.micro.forEach(element => {
          let g = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          //element.aporte = 0;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          //element.aporte = 0;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })

        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        this.equivalencia.forEach(element => {

          //Peso neto*100/Peso bruto= %parte comestible
          //(100/% de parte comestible del alimento)*peso neto = Peso bruto
          if (element.nombre == 'Peso bruto (g):') {
            let g = (100 / ingf[0].porcentajeComestible) * value;
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            let g = ((value * 100) / ingf[0].pesoBruto);
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }

          }
        })
      }

      let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
      let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
      let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
      let bru = b[0].valor
      let comes = c[0].valor;
      let t = (value * ingf[0].intercambioEstandarizado) / 100
      let inte = 0;
      if (t == null || t == Infinity) { inte = null; } else { inte = t }
      this.ingredientesinsert(nom, value, bru, comes, inte);
      //this.aporteIngrediente();

    }


  }
  changeItemPeso2(name: string, value: any) {
    let nom = this.nombreIngrediente
    this.mensajespeso = false;
    this.macro.forEach(element => {
      element.aporte = null;
    })
    this.micro.forEach(element => {
      element.aporte = null;
    })
    this.energia.forEach(element => {
      element.aporte = null;
    })
    if (value == 100) {



      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })

      } else {
        this.macro.forEach(element => {
          let h = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }
        })
        this.micro.forEach(element => {
          let g = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)

        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            let g = ingf[0].pesoBruto;
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            let g = ingf[0].porcentajeComestible;
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          }
        })
        let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
        let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
        let bru = b[0].valor
        let comes = c[0].valor;
        let inte = ingf[0].intercambioEstandarizado
        this.ingredientesinsert(nom, value, bru, comes, inte)
        // this.aporteIngrediente1();
      }


    } else {
      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })

      } else {
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)



        this.macro.forEach(element => {
          let h = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }

          //element.aporte = 0;
        })
        this.micro.forEach(element => {
          let g = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          //element.aporte = 0;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })

        this.equivalencia.forEach(element => {

          //Peso neto*100/Peso bruto= %parte comestible
          //(100/% de parte comestible del alimento)*peso neto = Peso bruto
          if (element.nombre == 'Peso bruto (g):') {
            let g = (100 / ingf[0].porcentajeComestible) * value;
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            let g = ((value * 100) / ingf[0].pesoBruto);
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          }
        })





      }

      let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)

      let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
      let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
      let bru = b[0].valor
      let comes = c[0].valor;
      let t = (value * ingf[0].intercambioEstandarizado) / 100
      let inte = 0;
      if (t == null || t == Infinity) { inte = null; } else { inte = t }
      this.ingredientesinsert(nom, value, bru, comes, inte);
      //this.aporteIngrediente1();

    }


  }

  changeItemPeso3(name: string, value: any) {
    let nom = this.nombreIngrediente
    if (value == 100) {
      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })
      } else {
        this.macro.forEach(element => {
          let h = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }
        })
        this.micro.forEach(element => {
          let g = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte;
          //element.aporte = 0;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        this.equivalencia.forEach(element => {

          //𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒 𝐶𝑜𝑚𝑒𝑠𝑡𝑖𝑏𝑙𝑒 * 𝑃𝑒𝑠𝑜 𝐵𝑟𝑢𝑡𝑜 = 𝑃𝑒𝑠𝑜 𝑁𝑒𝑡o
          if (element.nombre == 'Peso bruto (g):') {
            element.valor = ingf[0].pesoBruto;
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            element.valor = ingf[0].porcentajeComestible;
          }
        })
        let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
        let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
        let bru = b[0].valor
        let comes = c[0].valor;
        let inte = ingf[0].intercambioEstandarizado
        this.ingredientesinsert1(nom, value, bru, comes, inte)
        //this.aporteIngrediente2();
      }


    } else {
      if (this.nuAlimentos.length == 0) {
        this.macro.forEach(element => {
          element.aporte = null;
        })
        this.micro.forEach(element => {
          element.aporte = null;
        })
        this.energia.forEach(element => {
          element.aporte = null;
        })

      } else {

        this.macro.forEach(element => {
          let h = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;

          if (h == null || h == Infinity) { element.aporte = null; } else { element.aporte = h }
          //element.aporte = 0;
        })
        this.micro.forEach(element => {
          let g = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          //element.aporte = 0;
          if (g == null || g == Infinity) { element.aporte = null; } else { element.aporte = g }
        })
        this.energia.forEach(element => {
          let e = (value * this.nuAlimentos.find(item => item.iD_Nutriente == element.id).aporte) / 100;
          //element.aporte = 0;
          if (e == null || e == Infinity) { element.aporte = null; } else { element.aporte = e }
        })
        let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
        this.equivalencia.forEach(element => {

          //Peso neto*100/Peso bruto= %parte comestible
          //(100/% de parte comestible del alimento)*peso neto = Peso bruto
          if (element.nombre == 'Peso bruto (g):') {
            let g = (100 / ingf[0].porcentajeComestible) * value;
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          } else if (element.nombre == 'Porcentaje comestible (%):') {
            let g = ((value * 100) / ingf[0].pesoBruto);
            if (g == null || g == Infinity) { element.valor = null; } else { element.valor = g }
          }
        })
      }

      let ingf = this.Aliment1.filter(item => item.id == this.idIngrediente)
      let b = this.equivalencia.filter(item => item.nombre == 'Peso bruto (g):')
      let c = this.equivalencia.filter(item => item.nombre == 'Porcentaje comestible (%):')
      let bru = b[0].valor
      let comes = c[0].valor;
      let t = (value * ingf[0].intercambioEstandarizado) / 100
      let inte = 0;
      if (t == null || t == Infinity) { inte = null; } else { inte = t }
      this.ingredientesinsert1(nom, value, bru, comes, inte);
      //this.aporteIngrediente2();

    }


  }

  ingredientesinsert(row: any, value: number, bruto: any, comestible: any, intercambio: any) {

    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == row)

    let al = this.Aliment1.filter(item => item.id == ingred[0].iD_AlimentosICBF)
    let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
    let pid = 0
    if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      if (m[0].iD_TipoModeloOperacionBase == 1) {
        pid = 1
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        pid = 2
      }
    } else {
      pid = this.PreparacionObject.iD_TipoModeloOperacion
    }
    this.GetGrupoSubgrupoParams.id_TipoModeloOperacion = pid
    this.GetGrupoSubgrupoParams.ID_SubGrupoAlimento = al[0].iD_SubGrupoAlimentos
    this.GetGrupoSubgrupoParams.ID_Complemento = this.iD_TipoComplemento
    if (this.IngredientesObject.length == 0) {
      this.IngredientesObject.push({
        sID: '',
        id: 0,
        iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
        sID_AlimentosICBF: ingred[0].sID_AlimentosICBF,
        iD_TipoNivelEducativo: this.grado,
        sID_TipoNivelEducativo: '',
        iD_Producto: 0,
        iD_Preparacion: this.PreparacionObject.id,
        siD_Preparacion: '',
        iD_TipoComplemento: this.iD_TipoComplemento,
        sID_TipoComplemento: '',
        pesoBruto: bruto,
        pesoNeto: value,
        porcentajeComestible: comestible,
        intercambioEstandarizado: intercambio,
        auditoria: '',
        estado: null,
        ModificacionEstado: true,
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
        completed: false
      })
    } else {
      let ing2 = this.IngredientesObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

      if (ing2.length == 0) {
        this.IngredientesObject.push({
          sID: '',
          id: 0,
          iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
          sID_AlimentosICBF: ingred[0].sID_AlimentosICBF,
          iD_TipoNivelEducativo: this.grado,
          sID_TipoNivelEducativo: '',
          iD_Producto: 0,
          iD_Preparacion: this.PreparacionObject.id,
          siD_Preparacion: '',
          iD_TipoComplemento: this.iD_TipoComplemento,
          sID_TipoComplemento: '',
          pesoBruto: bruto,
          pesoNeto: value,
          porcentajeComestible: comestible,
          intercambioEstandarizado: intercambio,
          auditoria: '',
          estado: null,
          ModificacionEstado: true,
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
          completed: false
        })

      } else {
        this.IngredientesObject.map(function (dato) {
          if (dato.iD_TipoComplemento == ing2[0].iD_TipoComplemento && dato.iD_TipoNivelEducativo == ing2[0].iD_TipoNivelEducativo && dato.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF) {
            dato.pesoNeto = value;
            dato.pesoBruto = bruto;
            dato.porcentajeComestible = comestible;
            dato.intercambioEstandarizado = intercambio;
            dato.ModificacionEstado = true;

          }
          return dato;

        })


      }
    }

    this._PA_GetGrupoSubgrupoService.getPA_GetGrupoSubgrupoList(this.GetGrupoSubgrupoParams).subscribe(
      (response: any) => {

        this.SubGrupoAlimentoListT = response;
        this.SubGrupoAlimentoListT.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

        if (this.SubGrupoAlimentoListT.length == 0) {
          let nomb
          if (this.PreparacionObject.iD_TipoModeloOperacion == 1) { nomb = 'MAEM' } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) { nomb = 'MAER' } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) { nomb = 'PAEPI' } else { }
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">El alimento seleccionado no pertenece a la jerarquía de componente - grupo - subgrupo </p>  ' +
              ` <p style="text-align: left!important; font-size: 13px; color:#005ACA;">establecida para el modelo ${nomb}.</p> `,
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


          })
        } else {


          if (this.PesoNetoObject.length == 0) {
            this.SubGrupoAlimentoListT.forEach(ele => {
              this.PesoNetoObject.push({
                id: 0,
                iD_TipoComponente: ele.iD_TipoComponente,
                siD_TipoComponente: '',
                iD_TipoNivelEducativo: this.grado,
                siD_TipoNivelEducativo: '',
                iD_Preparacion: this.PreparacionObject.id,
                siD_Preparacion: '',
                pesoNeto: value,
                iD_SubGrupoAlimentos: al[0].iD_SubGrupoAlimentos,
                siD_SubGrupoAlimentos: '',
                iD_TipoComplemento: this.iD_TipoComplemento,
                siD_TipoComplemento: '',
                auditoria: '',
                iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
                ModificacionEstado: true,
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
            })

          } else {
            this.SubGrupoAlimentoListT.forEach(ele => {
              let ing2 = this.PesoNetoObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_TipoComponente == ele.iD_TipoComponente && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)
              if (ing2.length == 0) {
                this.SubGrupoAlimentoListT.forEach(ele => {
                  this.PesoNetoObject.push({
                    id: 0,
                    iD_TipoComponente: ele.iD_TipoComponente,
                    siD_TipoComponente: '',
                    iD_TipoNivelEducativo: this.grado,
                    siD_TipoNivelEducativo: '',
                    iD_Preparacion: this.PreparacionObject.id,
                    siD_Preparacion: '',
                    pesoNeto: value,
                    iD_SubGrupoAlimentos: al[0].iD_SubGrupoAlimentos,
                    siD_SubGrupoAlimentos: '',
                    iD_TipoComplemento: this.iD_TipoComplemento,
                    siD_TipoComplemento: '',
                    auditoria: '',
                    iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
                    ModificacionEstado: true,
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
                })
              } else {

                this.PesoNetoObject.map(function (dato) {

                  if (dato.iD_TipoComplemento == ing2[0].iD_TipoComplemento && dato.iD_TipoNivelEducativo == ing2[0].iD_TipoNivelEducativo && dato.iD_TipoComponente == ele.iD_TipoComponente && dato.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF) {
                    dato.pesoNeto = value;
                    dato.ModificacionEstado = true;
                  }
                  return dato;

                })
              }
            })
          }
          this.pesoText = value;
          this.pesoBrutoText = bruto;
          this.porcentajeComestibleText = comestible;
          if (this.TipoModelos == 1 && this.cantModelo == 1) {
            this.aporteIngrediente1()
          } else if (this.TipoModelos == 1 && this.cantModelo == 2) {
            this.aporteIngrediente()
          }

        }


      },
      (err) => {
      }
    )

    /*   let gr = this.GrupoAlimentoList.filter(item => item.id == sub[0].iD_GrupoAlimento) */





  }
  ingredientesinsert1(row: any, value: number, bruto: any, comestible: any, intercambio: any) {
    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == row)
    let al = this.Aliment1.filter(item => item.id == ingred[0].iD_AlimentosICBF)
    let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
    let pid = 0
    if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      if (m[0].iD_TipoModeloOperacionBase == 1) {
        pid = 1
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        pid = 2
      }
    } else {
      pid = this.PreparacionObject.iD_TipoModeloOperacion
    }
    if (this.IngredientesObject.length == 0) {
      this.IngredientesObject.push({
        sID: '',
        id: 0,
        iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
        sID_AlimentosICBF: ingred[0].sID_AlimentosICBF,
        iD_TipoNivelEducativo: null,
        sID_TipoNivelEducativo: '',
        iD_Producto: 0,
        iD_Preparacion: this.PreparacionObject.id,
        siD_Preparacion: '',
        iD_TipoComplemento: null,
        sID_TipoComplemento: '',
        pesoBruto: bruto,
        pesoNeto: value,
        porcentajeComestible: comestible,
        intercambioEstandarizado: intercambio,
        auditoria: '',
        estado: null,
        ModificacionEstado: true,

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
        completed: false
      })
    } else {
      let ing2 = this.IngredientesObject.filter(item => item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

      if (ing2.length == 0) {
        this.IngredientesObject.push({
          sID: '',
          id: 0,
          iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
          sID_AlimentosICBF: ingred[0].sID_AlimentosICBF,
          iD_TipoNivelEducativo: null,
          sID_TipoNivelEducativo: '',
          iD_Producto: 0,
          iD_Preparacion: this.PreparacionObject.id,
          siD_Preparacion: '',
          iD_TipoComplemento: null,
          sID_TipoComplemento: '',
          pesoBruto: bruto,
          pesoNeto: value,
          porcentajeComestible: comestible,
          intercambioEstandarizado: intercambio,
          auditoria: '',
          estado: null,
          ModificacionEstado: true,
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
          completed: false
        })

      } else {
        this.IngredientesObject.map(function (dato) {
          if (dato.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF) {
            dato.pesoNeto = value;
            dato.pesoBruto = bruto;
            dato.porcentajeComestible = comestible;
            dato.intercambioEstandarizado = intercambio;
            dato.ModificacionEstado = true;

          }
          return dato;

        })


      }
    }

    this.GetGrupoSubgrupoParams.id_TipoModeloOperacion = pid
    this.GetGrupoSubgrupoParams.ID_SubGrupoAlimento = al[0].iD_SubGrupoAlimentos

    this._PA_GetGrupoSubgrupoService.getPA_GetGrupoSubgrupoList(this.GetGrupoSubgrupoParams).subscribe(
      (response: any) => {

        this.SubGrupoAlimentoListT = response;
        this.SubGrupoAlimentoListT.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

        if (this.SubGrupoAlimentoListT.length == 0) {
          let nomb
          if (this.PreparacionObject.iD_TipoModeloOperacion == 1) { nomb = 'MAEM' } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) { nomb = 'MAER' } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) { nomb = 'PAEPI' } else { }
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="float: right !important; height: 30px; position: absolute; top:30px; right: 17px;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">El alimento seleccionado no pertenece a la jerarquía de componente - grupo - subgrupo </p>  ' +
              ` <p style="text-align: left!important; font-size: 13px; color:#005ACA;">establecida para el modelo ${nomb}.</p> `,
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


          })
        } else {


          if (this.PesoNetoObject.length == 0) {
            this.SubGrupoAlimentoListT.forEach(ele => {
              this.PesoNetoObject.push({
                id: 0,
                iD_TipoComponente: ele.iD_TipoComponente,
                siD_TipoComponente: '',
                iD_TipoNivelEducativo: null,
                siD_TipoNivelEducativo: '',
                iD_Preparacion: this.PreparacionObject.id,
                siD_Preparacion: '',
                pesoNeto: value,
                iD_SubGrupoAlimentos: ele.iD_SubGrupoAlimento,
                siD_SubGrupoAlimentos: '',
                iD_TipoComplemento: null,
                siD_TipoComplemento: '',
                auditoria: '',
                iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
                ModificacionEstado: true,
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
            })

          } else {
            this.SubGrupoAlimentoListT.forEach(ele => {
              let ing2 = this.PesoNetoObject.filter(item => item.iD_SubGrupoAlimentos == al[0].iD_SubGrupoAlimentos && item.iD_TipoComponente == ele.iD_TipoComponente && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)
              if (ing2.length == 0) {
                this.SubGrupoAlimentoListT.forEach(ele => {
                  this.PesoNetoObject.push({
                    id: 0,
                    iD_TipoComponente: ele.iD_TipoComponente,
                    siD_TipoComponente: '',
                    iD_TipoNivelEducativo: null,
                    siD_TipoNivelEducativo: '',
                    iD_Preparacion: this.PreparacionObject.id,
                    siD_Preparacion: '',
                    pesoNeto: value,
                    iD_SubGrupoAlimentos: ele.iD_SubGrupoAlimento,
                    siD_SubGrupoAlimentos: '',
                    iD_TipoComplemento: null,
                    siD_TipoComplemento: '',
                    auditoria: '',
                    iD_AlimentosICBF: ingred[0].iD_AlimentosICBF,
                    ModificacionEstado: true,
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
                })
              } else {

                this.PesoNetoObject.map(function (dato) {

                  if (dato.iD_SubGrupoAlimentos == ele.iD_SubGrupoAlimento && dato.iD_TipoComponente == ele.iD_TipoComponente && dato.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF) {
                    dato.pesoNeto = value;
                    dato.ModificacionEstado = true;
                  }
                  return dato;

                })
              }
            })
          }
          this.pesoText = value;
          this.pesoBrutoText = bruto;
          this.porcentajeComestibleText = comestible;
          if (this.TipoModelos == 2) {
            this.aporteIngrediente2()
          }

        }


      },
      (err) => {
      }
    )



  }
  aporteIngrediente() {

    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
    let ing2 = this.IngredientesObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

    if (this.AporteIngredienteObject.length == 0) {

      this.macro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })
      this.micro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })
      this.energia.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })

    } else {

      let ing3 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF)
      if (ing3.length == 0) {
        this.macro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
        this.micro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
        this.energia.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
      } else {
        this.macro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.micro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.energia.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })


      }

    }

    let ing4 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF)
    if (ing4[0].comple == this.iD_TipoComplemento && ing4[0].idEdu == this.grado && ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {

      if (ing4[0].comple == 1) {

        let n = this.NivelEducativoList2.filter(item => item.id == ing4[0].idEdu);
        if (n.length == 0) {

        } else {
          this.NivelEducativoList2.map(function (dato) {
            if (ing4[0].idEdu === null) {

            } else {
              if (dato.id == ing4[0].idEdu) {
                dato.estado = 'Completo';
              }
            }


            return dato;
          });
        }
      } else {
        let p = this.NivelEducativoList3.filter(item => item.id == ing4[0].idEdu);

        if (p.length == 0) {

        } else {
          this.NivelEducativoList3.map(function (dato) {
            if (ing4[0].idEdu === null) {

            } else {
              if (dato.id == ing4[0].idEdu) {
                dato.estado = 'Completo';

              }
            }


            return dato;
          });
        }
      }





    } else { }

    let com = this.tabs[this.selectedTabIndex];
    if (ing4[0].comple == this.iD_TipoComplemento && ing4[0].idEdu == this.grado && ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {

      if (ing4[0].comple == 1) {


        let h = this.NivelEducativoList2.filter(item => item.estado == 'Completo');
        if (h.length == 5) {
          this.tabs.map(function (dato) {
            if (com.nombre === null) {

            } else {
              if (dato.nombre == com.nombre) {
                dato.estado = 'Completo';

              }
            }


            return dato;
          });
        } else {
          this.tabs.map(function (dato) {
            if (com.nombre === null) {

            } else {
              if (dato.nombre == com.nombre) {
                dato.estado = 'Incompleto';

              }
            }


            return dato;
          });
        }


      } else {
        let n = this.tabs.filter(item => item.nombre == com.nombre);
        let h = this.NivelEducativoList3.filter(item => item.estado == 'Completo');
        if (h.length == 5) {
          this.tabs.map(function (dato) {
            if (com.nombre === null) {

            } else {
              if (dato.nombre == com.nombre) {
                dato.estado = 'Completo';

              }
            }


            return dato;
          });
        } else {
          this.tabs.map(function (dato) {
            if (com.nombre === null) {

            } else {
              if (dato.nombre == com.nombre) {
                dato.estado = 'Incompleto';

              }
            }


            return dato;
          });
        }
      }
    } else { }


    if (ing4[0].comple == 1) {



      let h = this.tabs.filter(item => item.estado == 'Completo' || item.estado == 'Incompleto');

      if (h.length == 2) {
        if (h[0].estado == 'Completo' && h[1].estado == 'Completo') {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Completo';

              }
            }


            return dato;
          });
        } else {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Incompleto';

              }
            }


            return dato;
          });
        }
      } else {
        let h = this.tabs
        if (h[0].estado == 'Incompleto' && h[1].estado == 'Incompleto') {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Incompleto';

              }
            }


            return dato;
          });
        } else {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Pendiente';

              }
            }


            return dato;
          });
        }

      }


    } else {
      let h = this.tabs.filter(item => item.estado == 'Completo' || item.estado == 'Incompleto');

      if (h.length == 2) {
        if (h[0].estado == 'Completo' && h[1].estado == 'Completo') {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Completo';

              }
            }


            return dato;
          });
        } else {
          this.dataSource.map(function (dato) {
            if (dato.sID_AlimentosICBF === null) {

            } else {
              if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
                dato.estado = 'Incompleto';

              }
            }


            return dato;
          });
        }

      } else {
        this.dataSource.map(function (dato) {
          if (dato.sID_AlimentosICBF === null) {

          } else {
            if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
              dato.estado = 'Incompleto';

            }
          }


          return dato;
        });
      }
    }




  }
  aporteIngrediente1() {

    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
    let ing2 = this.IngredientesObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)
    let peso = this.PesoNetoObject.filter(item => item.iD_TipoComplemento == this.iD_TipoComplemento && item.iD_TipoNivelEducativo == this.grado && item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

    if (this.AporteIngredienteObject.length == 0) {

      this.macro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })
      this.micro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })
      this.energia.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: ing2[0].iD_TipoNivelEducativo,
          comple: ing2[0].iD_TipoComplemento,

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

      })

    } else {

      let ing3 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF)
      if (ing3.length == 0) {
        this.macro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
        this.micro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
        this.energia.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: ing2[0].iD_TipoNivelEducativo,
            comple: ing2[0].iD_TipoComplemento,

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

        })
      } else {
        this.macro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.micro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.energia.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.comple == ing3[0].comple && dato.idEdu == ing3[0].idEdu && dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })


      }

    }
    let ing4 = this.AporteIngredienteObject.filter(item => item.comple == this.iD_TipoComplemento && item.idEdu == this.grado && item.idAlimento == ingred[0].iD_AlimentosICBF)
    if (ing4[0].comple == this.iD_TipoComplemento && ing4[0].idEdu == this.grado && ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {

      if (ing4[0].comple == 1) {

        let n = this.NivelEducativoList.filter(item => item.id == ing4[0].idEdu);
        if (n.length == 0) {

        } else {
          if (peso[0].pesoNeto == null) {
            this.NivelEducativoList.map(function (dato) {
              if (ing4[0].idEdu === null) {

              } else {
                if (dato.id == ing4[0].idEdu) {
                  dato.estado = 'Incompleto';
                }
              }


              return dato;
            });

          } else {
            this.NivelEducativoList.map(function (dato) {
              if (ing4[0].idEdu === null) {

              } else {
                if (dato.id == ing4[0].idEdu) {
                  dato.estado = 'Completo';
                }
              }


              return dato;
            });
          }

        }
      } else {
        let n = this.NivelEducativoList.filter(item => item.id == ing4[0].idEdu);
        if (n.length == 0) {

        } else {
          if (peso[0].pesoNeto == null) {
            this.NivelEducativoList.map(function (dato) {
              if (ing4[0].idEdu === null) {

              } else {
                if (dato.id == ing4[0].idEdu) {
                  dato.estado = 'Incompleto';
                }
              }


              return dato;
            });

          } else {
            this.NivelEducativoList.map(function (dato) {
              if (ing4[0].idEdu === null) {

              } else {
                if (dato.id == ing4[0].idEdu) {
                  dato.estado = 'Completo';
                }
              }


              return dato;
            });
          }

        }
      }





    } else { }
    let n = this.NivelEducativoList.filter(item => item.estado == 'Completo')
    if (n.length == 5) {
      this.dataSource.map(function (dato) {
        if (dato.sID_AlimentosICBF === null) {

        } else {
          if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
            dato.estado = 'Completo';

          }
        }


        return dato;
      });
    } else {
      this.dataSource.map(function (dato) {
        if (dato.sID_AlimentosICBF === null) {

        } else {
          if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
            dato.estado = 'Incompleto';

          }
        }


        return dato;
      });
    }


  }
  aporteIngrediente2() {

    let ingred = this.dataSource.filter(item => item.sID_AlimentosICBF == this.nombreIngrediente)
    let ing2 = this.IngredientesObject.filter(item => item.iD_AlimentosICBF == ingred[0].iD_AlimentosICBF)

    if (this.AporteIngredienteObject.length == 0) {

      this.macro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: null,
          comple: null,

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

      })
      this.micro.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: null,
          comple: null,

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

      })
      this.energia.forEach(item => {
        this.AporteIngredienteObject.push({
          id: 0,
          iD_Ingrediente: 0,
          siD_Ingrediente: '',
          iD_Nutriente: item.id,
          aporte: item.aporte,
          auditoria: '',
          idAlimento: ingred[0].iD_AlimentosICBF,
          idEdu: null,
          comple: null,

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

      })

    } else {

      let ing3 = this.AporteIngredienteObject.filter(item => item.idAlimento == ingred[0].iD_AlimentosICBF && item.iD_Nutriente == this.AporteIngredienteObject.find(item => item.idAlimento == ingred[0].iD_AlimentosICBF).iD_Nutriente)

      if (ing3.length == 0) {
        this.macro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: null,
            comple: null,

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

        })
        this.micro.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: null,
            comple: null,

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

        })
        this.energia.forEach(item => {
          this.AporteIngredienteObject.push({
            id: 0,
            iD_Ingrediente: 0,
            siD_Ingrediente: '',
            iD_Nutriente: item.id,
            aporte: item.aporte,
            auditoria: '',
            idAlimento: ingred[0].iD_AlimentosICBF,
            idEdu: null,
            comple: null,

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

        })
      } else {
        this.macro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.micro.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })
        this.energia.forEach(item => {

          this.AporteIngredienteObject.map(function (dato) {
            if (dato.idAlimento == ing3[0].idAlimento && dato.iD_Nutriente == item.id) {
              dato.aporte = item.aporte;

            }
            return dato;

          })

        })


      }

    }
    let ing4 = this.AporteIngredienteObject.filter(item => item.idAlimento == ingred[0].iD_AlimentosICBF)
    if (ing4[0].idAlimento == ingred[0].iD_AlimentosICBF) {

      this.dataSource.map(function (dato) {
        if (dato.sID_AlimentosICBF === null) {

        } else {
          if (dato.sID_AlimentosICBF == ingred[0].sID_AlimentosICBF) {
            dato.estado = 'Completo';

          }
        }


        return dato;
      });





    } else { }


  }

  public onFileSelectedGuiaPreparacion(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let nombre = fileupload.name
      let id = this.PreparacionObject.id;
      nombre = nombre
        .replace(/ /g, "")             // Eliminar espacios
        .replace(/á/g, "a")            // Reemplazar tildes
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n");           // Reemplazar ñ por n
      let sinEspa = id + 'Pre' + nombre

      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerDS };

      this.addFileBlobRepositorios(_fileUpload);
    }
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.contenidoRespuesta1 = String.fromCharCode.apply(null, new Uint8Array(response));
        this.PreparacionObject.pathGuia = String.fromCharCode.apply(null, new Uint8Array(response));
        this.PreparacionObject.ModificadoEstado = true;
      },
      (err) => {
      }
    );
  }
  changeItemDetalleBebida(name: string, value: any) {
    if (value == 1) {
      this.PreparacionObject[name] = true;
      this.PreparacionObject.preparacionBebida1 = true;
      this.PreparacionObject['preparacionMixta'] = false;
      this.PreparacionObject['id_preparacionMixta'] = 0;
      this.PreparacionObject['id_preparacionBebida'] = value;
      this.PreparacionObject.ModificadoEstado = true;
      this.dataComponentesBebida.ModificacionEstado = true;
      this.preparacionBebidaDi = true
      this.mesajesalert4 = false;
    } else {
      this.PreparacionObject[name] = false;
      this.PreparacionObject.preparacionBebida1 = false;
      this.PreparacionObject['id_preparacionBebida'] = value;
      this.PreparacionObject['preparacionMixta'] = null
      this.PreparacionObject['id_preparacionMixta'] = null;
      this.PreparacionObject.ModificadoEstado = true;
      this.mesajesalert4 = false;
    }


    this.preg3 = false;
    this.preg4 = false;
    this.preg5 = false;
    this.preg6 = false;
    this.preg7 = false;
    this.preg8 = false;





  }
  changeItemDetalleMixta(name: string, value: any) {
    if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {

      if (value == 1) {

        this.preg3 = false;
        this.PreparacionObject[name] = true;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.mesajesalert5 = false;
        this.preg4 = true;
      } else {
        this.preg3 = true;
        this.PreparacionObject[name] = false;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.preg4 = false;
        this.mesajesalert5 = false;
      }
    } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {

      if (value == 1) {
        this.preg3 = false;
        this.PreparacionObject[name] = true;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.mesajesalert5 = false;
        this.preg4 = true;
      } else {
        this.preg3 = true;
        this.PreparacionObject[name] = false;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.preg4 = false;
        this.mesajesalert5 = false;
      }
    }


  }
  changeItemDetalleMixtaMAER(name: string, value: any) {

    if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
      if (value == 1) {

        this.preg6 = false;
        this.PreparacionObject[name] = true;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.mesajesalert5 = false;
        this.preg5 = true;
      } else {
        this.PreparacionObject[name] = false;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.preg5 = false;
        this.mesajesalert5 = false;
      }
    } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {

      if (value == 1) {
        this.dataComponentes['iD_TipoComponente'] = 0;
        this.preg6 = false;
        this.PreparacionObject[name] = true;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.mesajesalert5 = false;
        this.preg5 = true;
      } else {
        this.preg6 = true;
        this.PreparacionObject[name] = false;
        this.PreparacionObject['id_preparacionMixta'] = value;
        this.PreparacionObject.ModificadoEstado = true;
        this.preg5 = false;
        this.mesajesalert5 = false;
      }
    }

  }
  changeItemDetalleMixtaPAEPI(name: string, value: any) {

    if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
      if (m[0].iD_TipoModeloOperacionBase == 1) {
        if (value == 1) {

          this.preg8 = false;
          this.PreparacionObject[name] = true;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.mesajesalert5 = false;
          this.preg7 = true;
        } else {
          this.preg8 = true;
          this.PreparacionObject[name] = false;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.preg7 = false;
          this.mesajesalert5 = false;
        }
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        if (value == 1) {

          this.preg11 = false;
          this.PreparacionObject[name] = true;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.mesajesalert5 = false;
          this.preg12 = true;
        } else {
          this.preg11 = true;
          this.PreparacionObject[name] = false;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.preg12 = false;
          this.mesajesalert5 = false;
        }
      }

    } else if (this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);
      if (m[0].iD_TipoModeloOperacionBase == 1) {
        if (value == 1) {
          this.dataComponentes['iD_TipoComponente'] = 0;
          this.preg8 = false;
          this.PreparacionObject[name] = true;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.mesajesalert5 = false;
          this.preg7 = true;
        } else {
          this.preg8 = true;
          this.PreparacionObject[name] = false;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.preg7 = false;
          this.mesajesalert5 = false;
        }
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        if (value == 1) {
          this.dataComponentes['iD_TipoComponente'] = 0;
          this.preg12 = false;
          this.PreparacionObject[name] = true;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.mesajesalert5 = false;
          this.preg11 = true;
        } else {
          this.preg12 = true;
          this.PreparacionObject[name] = false;
          this.PreparacionObject['id_preparacionMixta'] = value;
          this.PreparacionObject.ModificadoEstado = true;
          this.preg11 = false;
          this.mesajesalert5 = false;
        }
      }

    }


  }
  aler() {
    this.mesajesalert3 == false;
  }
  selectionChange(event: MatCheckboxChange, itemIndice: number, nombre1: any): void {
    let id = +event.source.value;



    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        if (id == 1 || id == 2) {
          this.PreparacionComplementosObject.push({
            activo: event.checked,
            iD_TipoComplemento: id,
            id: 0,
            iD_Preparacion: this.PreparacionObject.id,
            sID: '',
            siD_Preparacion: '',
            sID_TipoComplemento: '',
            nombre: nombre1,
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
            estado: '',
            ModificacionEstado: true,

          })
          if (this.PreparacionObject.id != 0) {
            this.addComplementos();
            this.traerAportes();
          }

        } else {
          let h2 = this.PreparacionComplementosObject.filter(x => x.id == id)
          this.PreparacionComplementosObject.map(function (dato) {

            if (dato.id == id) {

              dato.iD_TipoComplemento = h2[0].iD_TipoComplemento;
              dato.id = 0;
              dato.iD_Preparacion = h2[0].iD_Preparacion;
              dato.activo = event.checked;

            }

            return dato;
          });


        }


      }
      else { //if unchecked, remove from the array
        let g = this.PreparacionComplementosObject.filter(x => x.iD_TipoComplemento == id)
        let h = this.PreparacionComplementosObject.filter(x => x.id == id)

        if (g[0].id != 0) {


          Swal.fire({

            showCloseButton: false,
            html:
              '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
              ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">Afectará los calculos en siguientes fase</div> ` +
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
              let g = this.PreparacionComplementosObject.filter(x => x.iD_TipoComplemento == id)

              this._PreparacionComplementosService.deletePreparacionComplementos(g[0].id).subscribe(
                (response: any) => {
                  const i = this.PreparacionComplementosObject.indexOf(this.PreparacionComplementosObject.find(x => x.iD_TipoComplemento == id));

                  this.PreparacionComplementosObject.splice(i, 1);
                  this.tipoRacionList.map(function (dato) {

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
              const i = this.PreparacionComplementosObject.indexOf(this.PreparacionComplementosObject.find(x => x.iD_TipoComplemento == id));

              this.PreparacionComplementosObject.splice(i, 1);
            }
          })
        } else {
          const i = this.PreparacionComplementosObject.indexOf(this.PreparacionComplementosObject.find(x => x.iD_TipoComplemento == id));

          this.PreparacionComplementosObject.splice(i, 1);

        }
      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        this.PreparacionComplementosMAERObject.push({
          activo: event.checked,
          iD_TipoComplemento: id,
          id: 0,
          iD_Preparacion: this.PreparacionObject.id,
          sID: '',
          siD_Preparacion: '',
          sID_TipoComplemento: '',
          nombre: nombre1,
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
          estado: '',
          ModificacionEstado: true,
        })

      }
      else { //if unchecked, remove from the array

        const i = this.PreparacionComplementosMAERObject.indexOf(this.PreparacionComplementosMAERObject.find(x => x.iD_TipoComplemento == id));

        this.PreparacionComplementosObject.splice(i, 1);
      }
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      if (event.checked) {
        //this.PreparacionComplementosObject[itemIndice].id_TipoComplemento=id;
        this.PreparacionComplementosPAEPIObject.push({
          activo: event.checked,
          iD_TipoComplemento: id,
          id: 0,
          iD_Preparacion: this.PreparacionObject.id,
          sID: '',
          siD_Preparacion: '',
          sID_TipoComplemento: '',
          nombre: nombre1,
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
          estado: '',
          ModificacionEstado: true,
        })

      }
      else { //if unchecked, remove from the array

        const i = this.PreparacionComplementosPAEPIObject.indexOf(this.PreparacionComplementosPAEPIObject.find(x => x.iD_TipoComplemento == id));

        this.PreparacionComplementosObject.splice(i, 1);
      }
    }




  }

  crearPreparacion() {


    if (this.PreparacionObject.iD_TipoModeloOperacion == 0 || this.PreparacionObject.nombre == '') {
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

        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
        }

      })
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

      if (this.PreparacionComplementosObject.length == 0) {
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

          let valid: boolean = this.validarComple(this.PreparacionComplementosObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else if (this.PreparacionComplementosObject.length != 0 && this.PreparacionObject.preparacionBebida == null) {
        this.mesajesalert3 = false;
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }

      else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
        this.addPreparacion();
      } else {
        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {

          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          this.addPreparacion();

        }
      }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      if (this.PreparacionObject.preparacionBebida == null) {
        this.mesajesalert3 = false;
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

          let valid: boolean = this.validarBeMAER(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }
      else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }

      else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
        this.addPreparacion();
      } else {
        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {

          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          this.addPreparacion();

        }
      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      if (this.PreparacionObject.iD_MinutaPatron == null) {
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

          let valid: boolean = this.validarMinutas(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else {
        let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

        if (m[0].iD_TipoModeloOperacionBase == 1) {
          if (this.PreparacionObject.iD_MinutaPatron == null) {
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

              let valid: boolean = this.validarMinutas(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento == 0) {
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

              let valid: boolean = this.validarComple(this.PreparacionComplementosPAEPIObject2);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento != 0 && this.PreparacionObject.preparacionBebida == null) {
            this.mesajesalert3 = false;
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.addPreparacion();
          } else {
            let valid: boolean = this.validar(this.PreparacionObject);
            if (valid) {

              this.mesajesalert = false;
              this.mesajesalert2 = false;
              this.mesajesalert3 = false;
              this.mesajesalert4 = false;
              this.addPreparacion();

            }
          }
        } else if (m[0].iD_TipoModeloOperacionBase == 2) {
          if (this.PreparacionObject.iD_MinutaPatron == null) {
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

              let valid: boolean = this.validarMinutas(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == null) {
            this.mesajesalert3 = false;
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.addPreparacion();
          } else {
            let valid: boolean = this.validar(this.PreparacionObject);
            if (valid) {

              this.mesajesalert = false;
              this.mesajesalert2 = false;
              this.mesajesalert3 = false;
              this.mesajesalert4 = false;
              this.addPreparacion();

            }
          }
        }

      }


    } else { }







  }
  validar(itemIndex: any) {
    if (itemIndex.iD_TipoModeloOperacion == 0 && itemIndex.nombre == '') {
      //falta idmodelooperacion y el nombre
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      return false;
    } else if (itemIndex.iD_TipoModeloOperacion != 0 && itemIndex.nombre == '') {
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      return false;
    } else if (itemIndex.iD_TipoModeloOperacion == 0 && itemIndex.nombre != '') {

      this.mesajesalert = false;
      this.mesajesalert2 = true;

      return false;
    }
    return true;
  }
  validarMinutas(itemIndex: any) {

    if (itemIndex.iD_MinutaPatron == null) {
      //falta idmodelooperacion y el nombre
      this.mesajesalert8 = true;
      return false;
    }
    return true;
  }
  validarComple(itemIndex: any) {

    if (this.PreparacionComplementosObject.length == 0) {

      //falta idmodelooperacion y el nombre
      this.mesajesalert3 = true;
      return false;
    } else if (this.PreparacionComplementosMAERObject.length == 0) {
      return true;
    } else if (this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento == 0) {
      this.mesajesalert3 = true;
      return false;
    }

    return true;
  }
  validarBe(itemIndex: any) {


    if (itemIndex.preparacionBebida == null && itemIndex.preparacionMixta == null && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {

      //falta idmodelooperacion y el nombre
      this.mesajesalert4 = true;
      return false;
    } else if (itemIndex.preparacionBebida == true && itemIndex.preparacionMixta == null && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
      return true;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == null && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
      this.mesajesalert5 = true;
      return false;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == false && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
      this.mesajesalert6 = true;
      return false;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == true && this.dataComponentesMas.length == 0) {
      this.mesajesalert7 = true;
      return false;
    }


    return true;
  }
  validarBeMAER(itemIndex: any) {


    if (itemIndex.preparacionBebida == null && itemIndex.preparacionMixta == null) {
      //falta idmodelooperacion y el nombre
      this.mesajesalert4 = true;
      return false;
    } else if (itemIndex.preparacionBebida == true && itemIndex.preparacionMixta == null) {
      return true;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == null) {
      this.mesajesalert5 = true;
      return false;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == false) {
      this.mesajesalert6 = true;
      return false;
    } else if (itemIndex.preparacionBebida == false && itemIndex.preparacionMixta == true) {
      this.mesajesalert7 = true;
      return false;
    }


    return true;
  }
  addPreparacion() {
    /* this.resultQuery1 = true;
    this.avanzar()  */
    if (this.PreparacionObject.nombre != '') {
      let h = this.PreparacionObject.nombre

      const res = [...h].reduce((p, c) => {
        (/[^\s^\d]/.test(c)) ? p.cantNoNumeros++ :
          (/\d/.test(c)) ? p.cantNumeros++ : null;
        return p;
      }, { cantNoNumeros: 0, cantNumeros: 0, });

      if (res.cantNoNumeros == 0) {
        this.combinacion = true;

      } else {
        this.combinacion = false;
        if (this.PreparacionObject.ModificadoEstado == true) {
          this._PreparacionesService.addPreparaciones(this.PreparacionObject).subscribe(
            (response: any) => {
              this.PreparacionObject.id = response.id;
              this.PreparacionObject.ModificadoEstado = false;

              this.addComplementos();
              this.addComponentes2();

            },
            (err) => {

            }
          );
        } else {
          this.addComplementos();
          this.addComponentes2();
        }

      }


    }

  }
  addComplementos() {


    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let g = this.PreparacionComplementosObject.filter(item => item.ModificacionEstado == true)
      if (g.length != 0) {
        this.PreparacionComplementosObject.forEach(item => {
          this.PreparacionComplementosGeneral.id = item.id;
          this.PreparacionComplementosGeneral.iD_Preparacion = this.PreparacionObject.id;
          this.PreparacionComplementosGeneral.iD_TipoComplemento = item.iD_TipoComplemento;

          if (item.id == 0) {
            this._PreparacionComplementosService.addPreparacionComplementos(this.PreparacionComplementosGeneral).subscribe(
              (response: any) => {

                this.PreparacionComplementosObject.map(function (dato) {
                  if (dato.iD_TipoComplemento == response.iD_TipoComplemento) {
                    dato.id = response.id;
                    dato.ModificacionEstado = false;
                  }
                  return dato;
                });
                this.tipoRacionList.map(function (dato) {

                  if (dato.id == response.iD_TipoComplemento) {

                    dato.iD_cog = response.id;
                    dato.id = response.iD_TipoComplemento;
                    dato.activo = true;

                  }

                  return dato;
                });


              }, (err) => {
              }
            );
          } else {
            this._PreparacionComplementosService.updatePreparacionComplementos(this.PreparacionComplementosGeneral).subscribe(
              (response: any) => {

              }, (err) => {
              }
            );
          }

        })
      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this.PreparacionComplementosPAEPIObject2.iD_Preparacion = this.PreparacionObject.id;
        if (this.PreparacionComplementosPAEPIObject2.id == 0) {
          this._PreparacionComplementosService.addPreparacionComplementos(this.PreparacionComplementosPAEPIObject2).subscribe(
            (response: any) => {
              this.PreparacionComplementosPAEPIObject2.id = response.id

            }, (err) => {
            }
          );
        } else {
          this._PreparacionComplementosService.updatePreparacionComplementos(this.PreparacionComplementosPAEPIObject2).subscribe(
            (response: any) => {
              this.PreparacionComplementosPAEPIObject2.id = response.id

            }, (err) => {
            }
          );
        }


      } else if (m[0].iD_TipoModeloOperacionBase == 2) {

      }

    }
  }
  addComponentes2() {
    this.dataComponentesBebida.iD_Preparacion = this.PreparacionObject.id;

    if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
      if (this.dataComponentesBebida.ModificacionEstado == true) {
        if (this.dataComponentesBebida.id == 0) {
          this._ComponentesPreparacionService.addComponentesPreparacion(this.dataComponentesBebida).subscribe(
            (response: any) => {
              this.dataComponentesBebida.id = response.id
              this.dataComponentesBebida.ModificacionEstado = false;
              this.resultQuery1 = true;
              this.isNextDisabled = false;
              if (this.viewActiva == 1) { } else { this.avanzar(); }
            }, (err) => {
            }
          );
        } else {
          this._ComponentesPreparacionService.updateComponentesPreparacion(this.dataComponentesBebida).subscribe(
            (response: any) => {
              this.resultQuery1 = true;
              this.dataComponentesBebida.ModificacionEstado = false;
              this.isNextDisabled = false;
              if (this.viewActiva == 1) { } else { this.avanzar(); }
            }, (err) => {
            }
          );
        }
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 1) { } else { this.avanzar(); }
      }


    } else {

      if (this.dataComponentesMas.length == 0) {
        if (this.dataComponentes.ModificadoEstado == true) {
          if (this.dataComponentes.id == 0) {
            this.dataComponentes.iD_Preparacion = this.PreparacionObject.id,

              this._ComponentesPreparacionService.addComponentesPreparacion(this.dataComponentes).subscribe(
                (response: any) => {
                  this.resultQuery1 = true;
                  this.dataComponentes.id = response.id
                  this.dataComponentes.ModificadoEstado = false;

                  this.isNextDisabled = false;
                  if (this.viewActiva == 1) { } else { this.avanzar(); }

                }, (err) => {
                }
              );
          } else {
            this._ComponentesPreparacionService.updateComponentesPreparacion(this.dataComponentes).subscribe(
              (response: any) => {
                this.dataComponentes.ModificadoEstado = false;
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 1) { } else { this.avanzar(); }

              }, (err) => {
              }
            );
          }

        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 1) { } else { this.avanzar(); }
        }

      } else {
        if (this.dataComponentesMas.length > 0) {
          this.dataComponentesMas.forEach(item => {


            this.compomentesObject.iD_Preparacion = this.PreparacionObject.id,
              this.compomentesObject.iD_TipoComponente = item.iD_TipoComponente;
            if (item.ModificacionEstado == true) {
              if (item.id == 0) {
                this._ComponentesPreparacionService.addComponentesPreparacion(this.compomentesObject).subscribe(
                  (response: any) => {

                    this.dataComponentesMas.map(function (dato) {
                      if (dato.iD_TipoComponente === response.iD_TipoComponente) {
                        dato.id = response.id;
                        dato.ModificacionEstado = false;
                      }
                      return dato;
                    });
                    this.resultQuery1 = true;
                    if (this.viewActiva == 1) { } else {
                      this.avanzar();
                    }
                  }, (err) => {
                  }
                );
              } else {
                this._ComponentesPreparacionService.updateComponentesPreparacion(this.compomentesObject).subscribe(
                  (response: any) => {
                    this.resultQuery1 = true;
                    this.dataComponentesMas.map(function (dato) {
                      if (dato.iD_TipoComponente === response.iD_TipoComponente) {

                        dato.ModificacionEstado = false;
                      }
                      return dato;
                    });
                    if (this.viewActiva == 1) { } else { this.avanzar(); }
                  }, (err) => {
                  }
                );
              }
            } else {
              this.resultQuery1 = true;
              if (this.viewActiva == 1) { } else { this.avanzar(); }
            }


          })
        } else { }
      }

    }
  }

  actualizarPreparacion() {
    if (this.PreparacionObject.iD_TipoModeloOperacion == 0 || this.PreparacionObject.nombre == '') {
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

        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
        }

      })


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

      if (this.PreparacionComplementosObject.length == 0) {
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

          let valid: boolean = this.validarComple(this.PreparacionComplementosObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else if (this.PreparacionComplementosObject.length != 0 && this.PreparacionObject.preparacionBebida == null) {
        this.mesajesalert3 = false;
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }

      else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
        this.updatePreparacion();
      } else {
        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {

          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          this.updatePreparacion();

        }
      }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {

      if (this.PreparacionObject.preparacionBebida == null) {
        this.mesajesalert3 = false;
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

          let valid: boolean = this.validarBeMAER(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }
      else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

          let valid: boolean = this.validarBe(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      }

      else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
        this.updatePreparacion();
      } else {
        let valid: boolean = this.validar(this.PreparacionObject);
        if (valid) {

          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          this.updatePreparacion();

        }
      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {

      if (this.PreparacionObject.iD_MinutaPatron == null) {
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

          let valid: boolean = this.validarMinutas(this.PreparacionObject);
          if (valid) {
            this.mesajesalert3 = false;
          }

        })
      } else {
        let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

        if (m[0].iD_TipoModeloOperacionBase == 1) {
          if (this.PreparacionObject.iD_MinutaPatron == null) {
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

              let valid: boolean = this.validarMinutas(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento == 0) {
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

              let valid: boolean = this.validarComple(this.PreparacionComplementosPAEPIObject2);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento != 0 && this.PreparacionObject.preparacionBebida == null) {
            this.mesajesalert3 = false;
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.updatePreparacion();
          } else {
            let valid: boolean = this.validar(this.PreparacionObject);
            if (valid) {

              this.mesajesalert = false;
              this.mesajesalert2 = false;
              this.mesajesalert3 = false;
              this.mesajesalert4 = false;
              this.updatePreparacion();

            }
          }
        } else if (m[0].iD_TipoModeloOperacionBase == 2) {
          if (this.PreparacionObject.iD_MinutaPatron == null) {
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

              let valid: boolean = this.validarMinutas(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == null) {
            this.mesajesalert3 = false;
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if ((this.PreparacionObject.preparacionBebida == false || this.PreparacionObject.preparacionBebida == 'False') && this.dataComponentes.iD_TipoComponente == 0 && this.dataComponentesMas.length == 0) {
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

              let valid: boolean = this.validarBe(this.PreparacionObject);
              if (valid) {
                this.mesajesalert3 = false;
              }

            })
          } else if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
            this.updatePreparacion();
          } else {
            let valid: boolean = this.validar(this.PreparacionObject);
            if (valid) {

              this.mesajesalert = false;
              this.mesajesalert2 = false;
              this.mesajesalert3 = false;
              this.mesajesalert4 = false;
              this.updatePreparacion();

            }
          }
        }

      }
    } else { }

  }
  updatePreparacion() {
    if (this.PreparacionObject.nombre != '') {
      let h = this.PreparacionObject.nombre

      const res = [...h].reduce((p, c) => {
        (/[^\s^\d]/.test(c)) ? p.cantNoNumeros++ :
          (/\d/.test(c)) ? p.cantNumeros++ : null;
        return p;
      }, { cantNoNumeros: 0, cantNumeros: 0, });

      if (res.cantNoNumeros == 0) {
        this.combinacion = true;

      } else {
        this.combinacion = false;
        if (this.PreparacionObject.ModificadoEstado == true) {
          this._PreparacionesService.updatePreparaciones(this.PreparacionObject).subscribe(
            (response: any) => {
              this.PreparacionObject.ModificadoEstado = false;
              this.resultQuery1 = true;
              if (this.viewActiva == 4) {
                this.gabadata();
                this.avanzar();
              }
              else if (this.viewActiva == 0) {

                this.addComplementos();
                this.addComponentes2();
                // this.avanzar()
              } else { }


            },
            (err) => {

            }
          );
        } else {
          this.resultQuery1 = true;
          if (this.viewActiva == 4) {
            this.gabadata();
            this.avanzar();
          }
          else if (this.viewActiva == 0) {

            this.addComplementos();
            this.addComponentes2();
            // this.avanzar()
          } else { }
        }

      }


    }

  }
  regresar2() {

    
      this.PreparacionObject.ModificadoEstado = true;
      this.PreparacionObject.iD_TipoEstado = 1;
      if (this.PreparacionObject.ModificadoEstado == true) {
        this._PreparacionesService.updatePreparaciones(this.PreparacionObject).subscribe(
          (response: any) => {
            this.PreparacionObject.ModificadoEstado = false;
            this.resultQuery1 = true;
            localStorage.removeItem('nombredeUbicacionActualizado');
            this._PA_RegistrarNotificacionService.registerNotification("La preparacion " + this.PreparacionObject.nombre + "está lista para aprobar", "Líder Técnico - ET");
            this._PA_RegistrarNotificacionService.registerNotification("La preparacion " + this.PreparacionObject.nombre + "está lista para aprobar", "Rol SiPAE-Administrador");
            this._PA_RegistrarNotificacionService.registerNotification("La preparacion " + this.PreparacionObject.nombre + "está lista para aprobar", "Subdirección Técnica de Análisis, Calidad e Innovación");
            this._PA_RegistrarNotificacionService.registerNotification("La preparacion " + this.PreparacionObject.nombre + "está lista para aprobar", "Subdirección Técnica de Fortalecimiento");
            this._PA_RegistrarNotificacionService.registerNotification("La preparacion " + this.PreparacionObject.nombre + "está lista para aprobar", "Coordinador PAE");
            this.router.navigate(['/PTNPreparaciones'], { queryParams: { tab: 1 } })

          },
          (err) => {

          }
        );
      } else {
        this.resultQuery1 = true;
      }

      
   

  }
  regresar() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigate(['/PTNPreparaciones'])


  }

  guia($event) {

    this.mensajeGuia = false;

    this.PreparacionObject.ModificadoEstado = true;




  }

  crearIngredientes() {
    /* this.resultQuery1 = true;
    this.avanzar(); */

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      this.addpesoneto();
      let f = this.IngredientesObject.filter(item => item.ModificacionEstado == true)
      if (f.length != 0) {
        f.forEach(item => {

          if (item.id == 0) {
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;


            this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {

                this.idIngredienteInsert = response.id;



                this.IngredientesObject.map(itemu => {
                  if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo === item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                    itemu.id = response.id
                    itemu.ModificacionEstado = false;
                  }
                })

                this.dataSource.map(itemi => {
                  if (itemi.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                    itemi = response.id
                  }
                })



                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;

                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {

                      },
                      (err) => {

                      }
                    );
                  }
                  this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                })


              },
              (err) => {

              }
            );

          } else {
            this.IngredienteGeneral.id = item.id;
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
            let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
            this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                this.idIngredienteInsert = response.id;

                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                h.forEach(item3 => {

                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {

                      },
                      (err) => {

                      }
                    );
                  }
                  this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
                })



              },
              (err) => {
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
              }
            );
          }




        });
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
      }




    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {

      this.addpesoneto();
      let f = this.IngredientesObject.filter(item => item.ModificacionEstado == true)
      if (f.length != 0) {
        f.forEach(item => {
          if (item.id == 0) {
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;

            this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {


                this.IngredientesObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                    itemy.id = response.id
                    itemy.ModificacionEstado = false;
                  }
                })

                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {


                      },
                      (err) => {

                      }
                    );
                  }
                  this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                })



              },
              (err) => {

              }
            );
          } else {
            this.IngredienteGeneral.id = item.id;
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

            this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                this.idIngredienteInsert = response.id;
                this.IngredientesObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                    itemy.ModificacionEstado = false;
                  }
                })
                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {


                      },
                      (err) => {

                      }
                    );
                  }
                  this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                })



              },
              (err) => {

              }
            );
          }


        });
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
      }


    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this.addpesoneto();
        let f = this.IngredientesObject.filter(item => item.ModificacionEstado == true)
        if (f.length != 0) {
          f.forEach(item => {
            if (item.id == 0) {
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                      itemu.id = response.id;
                      itemu.ModificacionEstado = false;
                    }
                  })
                  this.dataSource.map(itemi => {
                    if (itemi.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                      itemi = response.id
                    }
                  })


                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {

                        },
                        (err) => {

                        }
                      );
                    }
                    this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                  })



                },
                (err) => {

                }
              );

            } else {
              this.IngredienteGeneral.id = item.id;
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                      itemu.ModificacionEstado = false;
                    }
                  })
                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                  h.forEach(item3 => {

                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {

                        },
                        (err) => {

                        }
                      );
                    }
                    this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
                  })



                },
                (err) => {

                }
              );
            }


          });
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
        }


      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this.addpesoneto();
        let f = this.IngredientesObject.filter(item => item.ModificacionEstado == true)
        if (f.length != 0) {
          f.forEach(item => {
            if (item.id == 0) {
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

              this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                      itemu.id = response.id;
                      itemu.ModificacionEstado = false;
                    }
                  })

                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {


                        },
                        (err) => {

                        }
                      );
                    }
                    this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                  })



                },
                (err) => {

                }
              );
            } else {
              this.IngredienteGeneral.id = item.id;
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

              this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                      itemu.ModificacionEstado = false;
                    }
                  })
                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {


                        },
                        (err) => {

                        }
                      );
                    }
                    this._messageService.showInfo("Se insertaron correctamente los datos", 'top center')
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                  })



                },
                (err) => {

                }
              );
            }


          });
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }
        }


      } else {

      }
    }

  }
  addpesoneto() {

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      let h = this.PesoNetoObject.filter(item => item.ModificacionEstado == true)
      if (h.length != 0) {
        h.forEach(item5 => {

          if (item5.id == 0) {
            this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
            this.PesoNetoGeneral.iD_TipoNivelEducativo = item5.iD_TipoNivelEducativo;
            this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
            this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
            this.PesoNetoGeneral.iD_TipoComplemento = item5.iD_TipoComplemento;
            this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;
            let idx = this.PesoNetoObject.findIndex(item2 => item2.iD_TipoComplemento === item5.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo);

            this._PesoNetoPreparacionService.addPesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
              (response: any) => {


                this.PesoNetoObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {
                    itemy.id = response.id
                    itemy.ModificacionEstado = false;
                  }

                })
              },
              (err) => {

              }
            );

          } else {
            this.PesoNetoGeneral.id = item5.id
            this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
            this.PesoNetoGeneral.iD_TipoNivelEducativo = item5.iD_TipoNivelEducativo;
            this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
            this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
            this.PesoNetoGeneral.iD_TipoComplemento = item5.iD_TipoComplemento;
            this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;

            this._PesoNetoPreparacionService.updatePesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
              (response: any) => {
                this.PesoNetoObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {

                    itemy.ModificacionEstado = false;
                  }

                })
              },
              (err) => {

              }
            );
          }


        });
      }
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      let h = this.PesoNetoObject.filter(item => item.ModificacionEstado == true)
      if (h.length != 0) {
        h.forEach(item5 => {
          if (item5.id == 0) {
            this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
            this.PesoNetoGeneral.iD_TipoNivelEducativo = null;
            this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
            this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
            this.PesoNetoGeneral.iD_TipoComplemento = null;
            this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;


            this._PesoNetoPreparacionService.addPesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
              (response: any) => {

                this.PesoNetoObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {
                    itemy.id = response.id
                    itemy.ModificacionEstado = false;
                  }
                })
              },
              (err) => {

              }
            );

          } else {
            this.PesoNetoGeneral.id = item5.id;
            this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
            this.PesoNetoGeneral.iD_TipoNivelEducativo = null;
            this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
            this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
            this.PesoNetoGeneral.iD_TipoComplemento = null;
            this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;


            this._PesoNetoPreparacionService.updatePesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
              (response: any) => {
                this.PesoNetoObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {

                    itemy.ModificacionEstado = false;
                  }

                })
              },
              (err) => {

              }
            );

          }


        });
      }
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        let h = this.PesoNetoObject.filter(item => item.ModificacionEstado == true)
        if (h.length != 0) {
          h.forEach(item5 => {
            if (item5.id == 0) {
              this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
              this.PesoNetoGeneral.iD_TipoNivelEducativo = item5.iD_TipoNivelEducativo;
              this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
              this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
              this.PesoNetoGeneral.iD_TipoComplemento = item5.iD_TipoComplemento;
              this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;
              let idx = this.PesoNetoObject.findIndex(item2 => item2.iD_TipoComplemento === item5.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo);
              this._PesoNetoPreparacionService.addPesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
                (response: any) => {
                  this.PesoNetoObject.map(itemy => {
                    if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {
                      itemy.id = response.id;
                      itemy.ModificacionEstado = false;
                    }
                  })
                },
                (err) => {

                }
              );

            } else {
              this.PesoNetoGeneral.id = item5.id;
              this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
              this.PesoNetoGeneral.iD_TipoNivelEducativo = item5.iD_TipoNivelEducativo;
              this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
              this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
              this.PesoNetoGeneral.iD_TipoComplemento = item5.iD_TipoComplemento;
              this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;

              this._PesoNetoPreparacionService.updatePesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
                (response: any) => {
                  this.PesoNetoObject.map(itemy => {
                    if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {

                      itemy.ModificacionEstado = false;
                    }

                  })
                },
                (err) => {

                }
              );
            }


          });
        }
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        let h = this.PesoNetoObject.filter(item => item.ModificacionEstado == true)
        if (h.length != 0) {
          h.forEach(item5 => {
            if (item5.id == 0) {
              this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
              this.PesoNetoGeneral.iD_TipoNivelEducativo = null;
              this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
              this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
              this.PesoNetoGeneral.iD_TipoComplemento = null;
              this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;

              let idx = this.PesoNetoObject.findIndex(item2 => item2.iD_TipoComplemento === item5.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo);
              this._PesoNetoPreparacionService.addPesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
                (response: any) => {
                  this.PesoNetoObject.map(itemy => {
                    if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {
                      itemy.id = response.id;
                      itemy.ModificacionEstado = false;
                    }
                  })
                },
                (err) => {

                }
              );

            } else {
              this.PesoNetoGeneral.id = item5.id;
              this.PesoNetoGeneral.iD_TipoComponente = item5.iD_TipoComponente;
              this.PesoNetoGeneral.iD_TipoNivelEducativo = null;
              this.PesoNetoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoNetoGeneral.pesoNeto = item5.pesoNeto;
              this.PesoNetoGeneral.iD_SubGrupoAlimentos = item5.iD_SubGrupoAlimentos;
              this.PesoNetoGeneral.iD_TipoComplemento = null;
              this.PesoNetoGeneral.iD_AlimentosICBF = item5.iD_AlimentosICBF;


              this._PesoNetoPreparacionService.updatePesoNetoPreparacion(this.PesoNetoGeneral).subscribe(
                (response: any) => {
                  this.PesoNetoObject.map(itemy => {
                    if (itemy.iD_TipoComplemento === item5.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item5.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF == item5.iD_AlimentosICBF) {

                      itemy.ModificacionEstado = false;
                    }

                  })
                },
                (err) => {

                }
              );
            }


          });
        }
      } else { }
    }

  }
  actualizarIngredientes() {

    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      this.addpesoneto();

      let g = this.IngredientesObject.filter(item => item.ModificacionEstado == true);

      if (g.length != 0) {
        g.forEach(item => {

          if (item.id == 0) {
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
            let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
            this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                this.idIngredienteInsert = response.id;
                this.IngredientesObject.map(itemu => {
                  if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo === item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                    itemu.id = response.id;
                    itemu.ModificacionEstado = false;
                  }
                })



                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {

                      },
                      (err) => {

                      }
                    );
                  }


                })
                this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }


              },
              (err) => {

              }
            );

          } else {
            this.IngredienteGeneral.id = item.id;
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                /* this.idIngredienteInsert = response.id;
                this.IngredientesObject[idx].id = response.id;
   */
                this.IngredientesObject.map(itemu => {
                  if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo === item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                    itemu.ModificacionEstado = false;
                  }
                })

                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                h.forEach(item3 => {

                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {

                      },
                      (err) => {

                      }
                    );
                  }
                })
                this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

              },
              (err) => {

              }
            );
          }
        });
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

      }





    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {

      this.addpesoneto();
      let g = this.IngredientesObject.filter(item => item.ModificacionEstado == true);
      if (g.length != 0) {
        g.forEach(item => {
          if (item.id == 0) {
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

            this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                this.idIngredienteInsert = response.id;
                this.IngredientesObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                    itemy.id = response.id
                    itemy.ModificacionEstado = false;
                  }
                })
                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;

                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {


                      },
                      (err) => {

                      }
                    );
                  }


                })
                this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

              },
              (err) => {

              }
            );
          } else {
            this.IngredienteGeneral.id = item.id;
            this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
            this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
            this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
            this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
            this.IngredienteGeneral.pesoBruto = item.pesoBruto;
            this.IngredienteGeneral.pesoNeto = item.pesoNeto;
            this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
            this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
            let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

            this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
              (response: any) => {
                this.idIngredienteInsert = response.id;
                this.IngredientesObject.map(itemy => {
                  if (itemy.iD_TipoComplemento === item.iD_TipoComplemento && itemy.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemy.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                    itemy.ModificacionEstado = false;
                  }
                })
                let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                h.forEach(item3 => {
                  if (item3.id == 0) {
                    this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {
                        this.AporteIngredienteObject[ix].id = response.id;
                        this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                      },
                      (err) => {

                      }
                    );
                  } else {
                    this.AporteIngredientesGeneral.id = item3.id;
                    this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                    this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                    this.AporteIngredientesGeneral.aporte = item3.aporte;
                    let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                    this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                      (response: any) => {


                      },
                      (err) => {

                      }
                    );
                  }


                })
                this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }


              },
              (err) => {

              }
            );
          }


        });
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

      }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this.addpesoneto();
        let g = this.IngredientesObject.filter(item => item.ModificacionEstado == true);
        if (g.length != 0) {
          g.forEach(item => {
            if (item.id == 0) {
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                      itemu.id = response.id;
                      itemu.ModificacionEstado = false;

                    }
                  })


                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {

                        },
                        (err) => {

                        }
                      );
                    }


                  })
                  this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                },
                (err) => {

                }
              );

            } else {
              this.IngredienteGeneral.id = item.id;
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              let idj = this.dataSource.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);
              this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                      itemu.ModificacionEstado = false;

                    }
                  })


                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo && item2.comple == item.iD_TipoComplemento)

                  h.forEach(item3 => {

                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);


                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {

                        },
                        (err) => {

                        }
                      );
                    }
                  })
                  this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                },
                (err) => {

                }
              );
            }


          });
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

        }


      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this.addpesoneto();
        let g = this.IngredientesObject.filter(item => item.ModificacionEstado == true);
        if (g.length != 0) {
          g.forEach(item => {
            if (item.id == 0) {
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

              this._IngredientesService.addIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {
                      itemu.id = response.id
                      itemu.ModificacionEstado = false;
                    }
                  })
                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {


                        },
                        (err) => {

                        }
                      );
                    }


                  })
                  this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                },
                (err) => {

                }
              );
            } else {
              this.IngredienteGeneral.id = item.id;
              this.IngredienteGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.IngredienteGeneral.iD_AlimentosICBF = item.iD_AlimentosICBF;
              this.IngredienteGeneral.sID_AlimentosICBF = item.sID_AlimentosICBF;
              this.IngredienteGeneral.iD_TipoNivelEducativo = item.iD_TipoNivelEducativo;
              this.IngredienteGeneral.iD_TipoComplemento = item.iD_TipoComplemento;
              this.IngredienteGeneral.pesoBruto = item.pesoBruto;
              this.IngredienteGeneral.pesoNeto = item.pesoNeto;
              this.IngredienteGeneral.porcentajeComestible = item.porcentajeComestible;
              this.IngredienteGeneral.intercambioEstandarizado = item.intercambioEstandarizado;
              let idx = this.IngredientesObject.findIndex(item2 => item2.iD_TipoComplemento === item.iD_TipoComplemento && item2.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo);

              this._IngredientesService.updateIngredientes(this.IngredienteGeneral).subscribe(
                (response: any) => {
                  this.idIngredienteInsert = response.id;
                  this.IngredientesObject.map(itemu => {
                    if (itemu.iD_TipoComplemento === item.iD_TipoComplemento && itemu.iD_TipoNivelEducativo == item.iD_TipoNivelEducativo && itemu.iD_AlimentosICBF === item.iD_AlimentosICBF) {

                      itemu.ModificacionEstado = false;
                    }
                  })
                  let h = this.AporteIngredienteObject.filter(item2 => item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item.iD_TipoNivelEducativo)

                  h.forEach(item3 => {
                    if (item3.id == 0) {
                      this.AporteIngredientesGeneral.iD_Ingrediente = response.id;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.addNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {
                          this.AporteIngredienteObject[ix].id = response.id;
                          this.AporteIngredienteObject[ix].iD_Ingrediente = response.iD_Ingrediente;
                        },
                        (err) => {

                        }
                      );
                    } else {
                      this.AporteIngredientesGeneral.id = item3.id;
                      this.AporteIngredientesGeneral.iD_Ingrediente = item3.iD_Ingrediente;
                      this.AporteIngredientesGeneral.iD_Nutriente = item3.iD_Nutriente;
                      this.AporteIngredientesGeneral.aporte = item3.aporte;
                      let ix = this.AporteIngredienteObject.findIndex(item2 => item2.iD_Nutriente === item3.iD_Nutriente && item2.idAlimento == item.iD_AlimentosICBF && item2.idEdu == item3.idEdu && item2.comple == item.iD_TipoComplemento);
                      this._NutrientesIngredientesService.updateNutrientesIngredientes(this.AporteIngredientesGeneral).subscribe(
                        (response: any) => {


                        },
                        (err) => {

                        }
                      );
                    }


                  })
                  this._messageService.showInfo("Se actualizaron correctamente los datos", 'top center')
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

                },
                (err) => {

                }
              );
            }


          });
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 2 || this.viewActiva == 22) { this.avanzar(); } else { }

        }



      } else {

      }
    }

  }
  changeItempesoServido(row: any, value: number) {
    this.mensajespesoneto = false;

    if (this.iD_TipoComplemento == 1) {
      this.peso2.map(function (dato) {
        if (row.nivel === null) {
        } else {
          if (dato.nivel == row.nivel) {
            dato.complementoalmuerzo = value;
            dato.ModificacionEstado = true;
          }
        }



        return dato;
      });
    } else {
      this.peso2.map(function (dato) {
        if (row.nivel === null) {
        } else {
          if (dato.nivel == row.nivel) {
            dato.complementoampm = value;
            dato.ModificacionEstado = true;
          }
        }



        return dato;
      });
    }





  }

  changeItempesoServido2(row: any, value: number) {

    this.mensajespesoneto = false;
    this.peso.map(function (dato) {
      if (row.nivel === null) {
      } else {
        if (dato.nivel == row.nivel) {
          if (dato.complementoalmuerzo == 0 || dato.complementoalmuerzo == null) {
            dato.id = 0
          }
          dato.complementoalmuerzo = value;
          dato.ModificacionEstado = true;
        }
      }



      return dato;
    });



  }
  changeItempesoServido3(row: any, value: number) {
    this.mensajespesoneto = false;
    this.peso.map(function (dato) {
      if (row.nivel === null) {
      } else {
        if (dato.nivel == row.nivel) {
          if (dato.complementoampm == 0 || dato.complementoampm == null) {
            dato.id2 = 0
          }
          dato.complementoampm = value;
          dato.ModificacionEstado = true;
        }
      }



      return dato;
    });
  }
  changeItempesoServido4(row: any, value: number) {
    this.mensajespesoneto = false;
    this.peso3.map(function (dato) {
      if (row.nivel === null) {
      } else {
        if (dato.nivel == row.nivel) {
          dato.notienenivel = value;
          dato.ModificacionEstado = true;
        }
      }



      return dato;
    });
  }
  crearPesoServido() {

    this.addCrearpesoservido()

  }
  addCrearpesoservido() {
    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {

      let m3 = 0;
      let m4
      m3 = this.PreparacionComplementosObject.length

      if (m3 == 2) {

        let f = this.peso.filter(item => item.ModificacionEstado == true)
        if (f.length != 0) {
          f.forEach(item => {
            if (item.id == 0) {
              this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
              this.PesoServidoGeneral.iD_TipoComplemento = 1;
              this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;

              let idx = this.peso.findIndex(item2 => item2.nivel == item.nivel);

              this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                (response: any) => {
                  this.peso[idx].id = response.id;
                  this.peso[idx].ModificacionEstado = false;
                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }

                },
                (err) => {

                }
              );


            } else {

              this.PesoServidoGeneral.id = item.id
              this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
              this.PesoServidoGeneral.iD_TipoComplemento = 1;
              this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;

              let idx = this.peso.findIndex(item2 => item2.nivel == item.nivel);
              this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                (response: any) => {
                  this.peso[idx].ModificacionEstado = false;

                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );
              this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral2).subscribe(
                (response: any) => {
                  this.peso[idx].ModificacionEstado = false;

                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );
            }

            if (item.id2 == 0) {

              this.PesoServidoGeneral2.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral2.pesoServido = item.complementoampm;
              this.PesoServidoGeneral2.iD_TipoComplemento = 2;
              this.PesoServidoGeneral2.iD_TipoNivelEducativo = item.nivel;
              let idx = this.peso.findIndex(item2 => item2.nivel == item.nivel);


              this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral2).subscribe(
                (response: any) => {
                  this.peso[idx].id2 = response.id;
                  this.peso[idx].ModificacionEstado = false;
                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );

            } else {


              this.PesoServidoGeneral2.id = item.id2
              this.PesoServidoGeneral2.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral2.pesoServido = item.complementoampm;
              this.PesoServidoGeneral2.iD_TipoComplemento = 2;
              this.PesoServidoGeneral2.iD_TipoNivelEducativo = item.nivel;
              let idx = this.peso.findIndex(item2 => item2.nivel == item.nivel);

              this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral2).subscribe(
                (response: any) => {
                  this.peso[idx].ModificacionEstado = false;

                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );
            }

          })
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 3) { this.avanzar() } else { }
        }

      } else {
        this.PreparacionComplementosObject.find(object => {
          m4 = Object.values(object)

        });
        let ComplementoAlmuerzo = m4.includes('Complemento Almuerzo')
        if (ComplementoAlmuerzo == true) {
          let f = this.peso2.filter(item => item.ModificacionEstado == true)
          if (f.length != 0) {
            f.forEach(item => {
              if (item.id == 0) {
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
                this.PesoServidoGeneral.iD_TipoComplemento = 1;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].id = response.id;
                    this.peso2[idx].ModificacionEstado = false;

                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );

              } else {
                this.PesoServidoGeneral.id = item.id
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
                this.PesoServidoGeneral.iD_TipoComplemento = 1;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              }

            })
          } else {
            this.resultQuery1 = true;
            this.isNextDisabled = false;
            if (this.viewActiva == 3) { this.avanzar() } else { }
          }

        } else {
          let f = this.peso2.filter(item => item.ModificacionEstado == true)
          if (f.length != 0) {
            f.forEach(item => {
              if (item.id == 0) {
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoampm;
                this.PesoServidoGeneral.iD_TipoComplemento = 2;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].id = response.id;
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              } else {
                this.PesoServidoGeneral.id = item.id
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoampm;
                this.PesoServidoGeneral.iD_TipoComplemento = 2;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              }

            })
          } else {
            this.resultQuery1 = true;
            this.isNextDisabled = false;
            if (this.viewActiva == 3) { this.avanzar() } else { }
          }
        }


      }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      let f = this.peso3.filter(item => item.ModificacionEstado == true);
      if (f.length != 0) {
        f.forEach(item => {
          if (item.id == 0) {
            this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoServidoGeneral.pesoServido = item.notienenivel;
            this.PesoServidoGeneral.iD_TipoComplemento = null;
            this.PesoServidoGeneral.iD_TipoNivelEducativo = null;
            let idx = this.peso3.findIndex(item2 => item2.nivel == item.nivel);
            this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
              (response: any) => {
                this.peso3[idx].id = response.id;
                this.peso3[idx].ModificacionEstado = false;
                this.gabadata()
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 3) { this.avanzar() } else { }
              },
              (err) => {

              }
            );
          } else {
            this.PesoServidoGeneral.id = item.id;
            this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
            this.PesoServidoGeneral.pesoServido = item.notienenivel;
            this.PesoServidoGeneral.iD_TipoComplemento = null;
            this.PesoServidoGeneral.iD_TipoNivelEducativo = null;
            let idx = this.peso3.findIndex(item2 => item2.nivel == item.nivel);
            this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
              (response: any) => {
                this.peso3[idx].ModificacionEstado = false;
                this.gabadata()
                this.resultQuery1 = true;
                this.isNextDisabled = false;
                if (this.viewActiva == 3) { this.avanzar() } else { }
              },
              (err) => {

              }
            );
          }

        })
      } else {
        this.resultQuery1 = true;
        this.isNextDisabled = false;
        if (this.viewActiva == 3) { this.avanzar() } else { }
      }

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        let ComplementoAlmuerzo = this.PreparacionComplementosPAEPIObject2.iD_TipoComplemento;
        if (ComplementoAlmuerzo == 1) {
          let f = this.peso2.filter(item => item.ModificacionEstado == true);
          if (f.length != 0) {
            f.forEach(item => {
              if (item.id == 0) {
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
                this.PesoServidoGeneral.iD_TipoComplemento = 1;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].id = response.id;
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              } else {
                this.PesoServidoGeneral.id = item.id;
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoalmuerzo;
                this.PesoServidoGeneral.iD_TipoComplemento = 1;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              }

            })
          } else {
            this.resultQuery1 = true;
            this.isNextDisabled = false;
            if (this.viewActiva == 3) { this.avanzar() } else { }
          }

        } else {
          let f = this.peso2.filter(item => item.ModificacionEstado == true);
          if (f.length != 0) {
            f.forEach(item => {
              if (item.id == 0) {
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoampm;
                this.PesoServidoGeneral.iD_TipoComplemento = 2;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].id = response.id;
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              } else {
                this.PesoServidoGeneral.id = item.id2;
                this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
                this.PesoServidoGeneral.pesoServido = item.complementoampm;
                this.PesoServidoGeneral.iD_TipoComplemento = 2;
                this.PesoServidoGeneral.iD_TipoNivelEducativo = item.nivel;
                let idx = this.peso2.findIndex(item2 => item2.nivel == item.nivel);
                this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                  (response: any) => {
                    this.peso2[idx].ModificacionEstado = false;
                    this.gabadata()
                    this.resultQuery1 = true;
                    this.isNextDisabled = false;
                    if (this.viewActiva == 3) { this.avanzar() } else { }
                  },
                  (err) => {

                  }
                );
              }

            })
          } else {
            this.resultQuery1 = true;
            this.isNextDisabled = false;
            if (this.viewActiva == 3) { this.avanzar() } else { }
          }
        }

      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        let f = this.peso3.filter(item => item.ModificacionEstado == true);
        if (f.length != 0) {
          f.forEach(item => {
            if (item.id == 0) {
              this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral.pesoServido = item.notienenivel;
              this.PesoServidoGeneral.iD_TipoComplemento = null;
              this.PesoServidoGeneral.iD_TipoNivelEducativo = null;
              let idx = this.peso3.findIndex(item2 => item2.nivel == item.nivel);
              this._PesoServidoPreparacionService.addPesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                (response: any) => {
                  this.peso3[idx].id = response.id;
                  this.peso3[idx].ModificacionEstado = false;
                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );

            } else {
              this.PesoServidoGeneral.id = item.id;
              this.PesoServidoGeneral.iD_Preparacion = this.PreparacionObject.id;
              this.PesoServidoGeneral.pesoServido = item.notienenivel;
              this.PesoServidoGeneral.iD_TipoComplemento = null;
              this.PesoServidoGeneral.iD_TipoNivelEducativo = null;
              let idx = this.peso3.findIndex(item2 => item2.nivel == item.nivel);
              this._PesoServidoPreparacionService.updatePesoServidoPreparacion(this.PesoServidoGeneral).subscribe(
                (response: any) => {
                  this.peso3[idx].ModificacionEstado = false;
                  this.gabadata()
                  this.resultQuery1 = true;
                  this.isNextDisabled = false;
                  if (this.viewActiva == 3) { this.avanzar() } else { }
                },
                (err) => {

                }
              );
            }

          })
        } else {
          this.resultQuery1 = true;
          this.isNextDisabled = false;
          if (this.viewActiva == 3) { this.avanzar() } else { }
        }
      }
    }


  }

  onNivelEducativoChange2(event: any): void {
    this.grado2 = event[0].value;
    this.componente = false;
    this.Gaba = false;
    this.Gaba1 = false;
    if (this.iD_TipoComplemento == 0) {
      let com = this.tabs[0];
      let com2 = this.PreparacionComplementosObject.filter(item => item.nombre == com.nombre)
      this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    } else { }



    this._PA_AportesComponentePreparacionService.getPA_AportesComponentePreparacionList(this.ID_ETC, this.PreparacionObject.iD_TipoModeloOperacion, this.PreparacionObject.id, this.iD_TipoComplemento, this.grado2).subscribe(
      (response: any) => {
        let j = response;



        if (this.PreparacionObject.preparacionBebida == true || this.PreparacionObject.preparacionBebida == 'True') {
          j.forEach(element2 => {
            if (this.dataComponentesBebida.iD_TipoComponente == element2.iD_TipoComponente) {
              this.dataSourceComponentePAE.push({
                componente: 'Bebida',
                pesoNeto: element2.pesoNeto
              })
            } else {
              this.dataSourceComponentePAE.push({
                componente: 'Bebida',
                pesoNeto: 0
              })
            }
          });

          const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (elemento.componente === valorActual.componente) {
                  return {
                    ...elemento,
                    pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                  }
                }

                return elemento;
              });
            }

            return [...acumulador, valorActual];
          }, []);
          this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item => item.componente != undefined)

        } else {
          if (this.PreparacionObject.preparacionMixta == true || this.PreparacionObject.preparacionMixta == 'True') {
            this.dataSourceComponentePAE = [];
            //console.error('3 mosquet0',this.dataComponentesMas)
            this.dataComponentesMas.forEach(item => {
              j.forEach(element2 => {
                if (item.iD_TipoComponente == element2.iD_TipoComponente) {
                  this.dataSourceComponentePAE.push({
                    componente: element2.componente,
                    pesoNeto: element2.pesoNeto
                  })
                } else {
                  this.dataSourceComponentePAE.push({
                    componente: item.sID_TipoComponente,
                    pesoNeto: 0
                  })
                }
              });
            })
            //console.error('3 mosquet1',this.dataSourceComponentePAE)
            const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
              const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
              if (elementoYaExiste) {
                return acumulador.map((elemento) => {
                  if (elemento.componente === valorActual.componente) {
                    return {
                      ...elemento,
                      pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                    }
                  }

                  return elemento;
                });
              }

              return [...acumulador, valorActual];
            }, []);
            this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item => item.componente != undefined)
            //console.error('3 mosquet2',this.dataSourceComponentePAE)

          } else {

            this.dataSourceComponentePAE = []

            j.forEach(element2 => {

              if (this.dataComponentes.iD_TipoComponente == element2.iD_TipoComponente) {
                this.dataSourceComponentePAE.push({
                  componente: element2.componente,
                  pesoNeto: element2.pesoNeto
                })
              } else {
                this.dataSourceComponentePAE.push({
                  componente: this.dataComponentes.nombre,
                  pesoNeto: 0
                })
              }
            });
            const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
              const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
              if (elementoYaExiste) {
                return acumulador.map((elemento) => {
                  if (elemento.componente === valorActual.componente) {
                    return {
                      ...elemento,
                      pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                    }
                  }

                  return elemento;
                });
              }

              return [...acumulador, valorActual];
            }, []);
            this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item => item.componente != undefined)

          }



        }

        this.gabadata();
        this.componente = true;
        this.Gaba = true;
        this.Gaba1 = false;
      },
      (err) => {
      }
    );

  }
  gabadata() {
    this.AportesComponentePreparacionDetParams.ID_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
    this.AportesComponentePreparacionDetParams.iD_Preparacion = this.PreparacionObject.id;
    this.AportesComponentePreparacionDetParams.id_TipoModeloOperacion = this.PreparacionObject.iD_TipoModeloOperacion;
    if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;

    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = null;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
    } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
      let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

      if (m[0].iD_TipoModeloOperacionBase == 1) {
        this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
        this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;
      } else if (m[0].iD_TipoModeloOperacionBase == 2) {
        this.AportesComponentePreparacionDetParams.ID_Complemento = null;
        this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
      } else { }
    }

    this._PA_AportesComponentePreparacionDetService.gePA_AporteNutricionalIngredientesDetList(this.AportesComponentePreparacionDetParams).subscribe(
      (response: any) => {
        this.dataSourceGABA = response;
        this.spans = Object.assign({}, {
          grupoAlimentos: this.spanDeep(['iD_GrupoAlimentos', 'grupoAlimentos'], this.dataSourceGABA),
          subGrupoAlimentos: this.spanDeep(['iD_GrupoAlimentos', 'grupoAlimentos', 'subGrupoAlimentos'], this.dataSourceGABA),
        });
        let cant = this.PreparacionComplementosObject.length

        if (this.PreparacionObject.iD_TipoModeloOperacion == 1) {
          let t1 = this.tabs[0];
          let t2 = this.tabs[1];
          if (cant == 2) {
            if ((t1.nombre == 'Complemento Almuerzo' && t2.nombre == 'Complemento AM/PM') || (t1.nombre == 'Complemento AM/PM' && t2.nombre == 'Complemento Almuerzo')) {
              this.ComponenteN = 2;

            } else { }
          } else if (cant == 1) {
            if (t1.nombre == 'Complemento AM/PM' || t1.nombre == 'Complemento Almuerzo') {
              this.ComponenteN = 1;
            } else {
              this.ComponenteN = 1;
            }
          } else { }
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 2) {

          this.ComponenteN = 3;
        } else if (this.PreparacionObject.iD_TipoModeloOperacion == 3) {
          let m = this.MinutasList.filter(item => item.id == this.PreparacionObject.iD_MinutaPatron);

          if (m[0].iD_TipoModeloOperacionBase == 1) {
            this.ComponenteN = 1;

          } else if (m[0].iD_TipoModeloOperacionBase == 2) {
            this.ComponenteN = 3;
          } else { }
        }

      },
      (err) => {
      }
    );

  }
  myTabFocusChange2(tabChangeEvent: any) {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.PreparacionComplementosObject.filter(item => item.nombre == com.nombre)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.componente = false;
    this.Gaba = false;
    this.Gaba1 = false;

  }

  getRowSpan(path, idx) {
    if (idx === undefined) {

    } else {
      return this.spans[path][idx];
    }

  }
  spanDeep(paths: string[] | null, data: any[]) {

    if (!paths.length) {
      return [...data]
        .fill(0)
        .fill(data.length, 0, 1);
    }

    const copyPaths = [...paths];
    const path = copyPaths.shift();

    const uniq = uniqWith(data, (a, b) => get(a, path) === get(b, path)).map(item => get(item, path));

    return uniq
      .map(uniqItem => this.spanDeep(copyPaths, data.filter(item => uniqItem === get(item, path))))
      .flat(paths.length);
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'ptn-prepacion-disponible-ingredientes.dialog.component.html',
  styleUrls: ["./ptn-prepacion-disponible-ingredientes.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogPTNPreparacionIngredientesContent {
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
  selGrupo = 0;
  selSubGrupo = 0;
  cantIngredientes = 0;
  Alimento = ''
  favoriteSeason: string;
  mensaje: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogPTNPreparacionIngredientesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tiposRacionService: TiposComplementoService,
    private _AlimentosICBFService: AlimentosICBFService,
    private _GrupoAlimentosService: GrupoAlimentosService,
    private _SubGrupoAlimentosService: SubGrupoAlimentosService,
    private messageService: MessageService,
    private _PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
  ) {

    this.form = this.fb.group({
      id: [data.id],
      iD_Producto: [data.iD_AlimentosICBF, Validators.required],
      siD_Producto: [data.siD_AlimentosICBF, Validators.required],
    })

    this.local_data = { ...data };
    this.action = this.local_data.action;
    this._AlimentosICBFService.getAlimentosICBFList2(3).subscribe(
      (response: any) => {

        //this.tipoRacionList = response.filter(item => item.iD_EstadoRegistro == 3);
        //this.tipoRacionListR = response.filter(item => item.iD_EstadoRegistro == 3);
        this.tipoRacionList = response
        this.tipoRacionListR = response
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
      });

    this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;


      },
      (err) => {
      }
    );

  }
  aler(nombre: any) {
    var nombrep = this.tipoRacionList.filter(item => item.id == nombre)

    this.form.controls['siD_Producto'].setValue(nombrep[0].nombre);
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

      this.dialogRef.close({ event: this.action, data: this.form.value });
    }

  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  Buscar(selGrupo: number, selSubGrupo: number, Alimento: string) {

    if (Alimento == '' && selSubGrupo == -1 && selGrupo == -1) {
      this.restartfilter();
      this.order()
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (Alimento != '' && selSubGrupo == 0 && selGrupo == 0) {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.nombre.toLocaleLowerCase().indexOf(Alimento) !== -1 || t.nombre.toLocaleUpperCase().indexOf(Alimento) !== -1)
      this.order()
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (Alimento == '' && selSubGrupo == 0 && selGrupo == 0) {
      this.restartfilter();
      this.order()
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (Alimento != '' && selSubGrupo > 0 && selGrupo > 0) {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.iD_SubGrupoAlimentos == selSubGrupo && t.nombre.toLocaleLowerCase().indexOf(Alimento) !== -1 || t.nombre.toLocaleUpperCase().indexOf(Alimento) !== -1)
      this.order()
      this.cantIngredientes = this.tipoRacionList.length;
    } else if (Alimento == '' && selSubGrupo > 0 && selGrupo > 0) {
      this.restartfilter();
      this.tipoRacionList = this.tipoRacionList.filter(t => t.iD_SubGrupoAlimentos == selSubGrupo)
      this.order()
      this.cantIngredientes = this.tipoRacionList.length;
    }

  }
  restartfilter(): void {

    this.tipoRacionList = this.tipoRacionListR;

  }
  order() {
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
  }
  selectionGrupo(id: number) {
    if (id == -1) {
      this.selSubGrupo = -1
      this.SubGrupoAlimentoList = []
    }
    this._PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(id).subscribe(
      (response: any) => {

        this.SubGrupoAlimentoList = response;
        this.SubGrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    )

  }



}
