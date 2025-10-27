import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { SeguridadService } from './../../../../../../seguridad/seguridad.service';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { ActivatedRoute, Router } from '@angular/router';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PA_AporteNutricionalIngredientesRequest, PA_AporteNutricionalIngredientesService } from 'src/app/shared/services/PA_AporteNutricionalIngredientes.services';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { PreparacionesModel } from 'src/app/shared/model/Preparaciones';
import { PA_AportesComponentePreparacionDetRequest, PA_AportesComponentePreparacionDetService } from 'src/app/shared/services/PA_AporteComponentePreparacionDet.services';
import { PA_AporteNutricionalIngredientesDetRequest, PA_AporteNutricionalIngredientesDetService } from 'src/app/shared/services/PA_AporteNutricionalIngredientesDet.services';
import { PA_BuscarPreparacionesService, PA_BuscarPreparacionRequest } from 'src/app/shared/services/PA_BuscarPreparaciones.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { PreparacionesService } from 'src/app/shared/services/Preparaciones.services';
import { IngredientesPreparacionService } from 'src/app/shared/services/PA_IngredientesPreparacion.services';
import { IngredientesService } from 'src/app/shared/services/Ingredientes.services';
import { PA_NivelEducstivoPesoServidoPivService } from 'src/app/shared/services/PA_NivelEducativoPesoServidoPiv.services';
import { PA_AportesComponentePreparacionService } from 'src/app/shared/services/PA_AportesComponentePreparacion.services';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { TiposComponenteService } from 'src/app/shared/services/TiposComponente.services';
import { DecimalPipe } from '@angular/common';
import { PA_PreparacionComplementosGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionComplementosGetAllWithRelation.services';
import { PA_PreparacionesGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionesGetAllWithRelation.services';
import { PA_ComponentesPreparacionGetAllWithRelationService } from 'src/app/shared/services/PA_ComponentesPreparacionGetAllWithRelation.services';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';
import { PesoServidoPreparacionService } from 'src/app/shared/services/PesoServidoPreparacion.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
@Component({
  selector: 'app-ptn-apr-pre',
  templateUrl: './ptn-apr-pre.component.html',
  styleUrls: ['./ptn-apr-pre.component.scss']
})
export class PtnAprPreComponent implements OnInit {
  public tipoSeleccionado: number = 2;
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

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  dataArray: any;
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Tipo', 'Modelo', 'Complementos', 'Estado'];
  //dataSource = new MatTableDataSource<DiagnosticoSituacionalModel>();
  public viewActiva: number = 0;
  spans = {};
  isLoading = true;
  //aprobaciones
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  cantAprobaciones = 0;
  yaCargoAprobaciones = false;
  form: FormGroup;
  aprobar = [];
  AprobacionesList: any;
  AprobacionesList2: any;
  lista = [];
  listaPreparacion = [];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
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

  PreparacionesObject: PreparacionesModel = {
    sID: '',
    id: 0,
    iD_TipoModeloOperacion: 0,
    sID_TipoModeloOperacion: '',
    iD_MinutaPatron: 0,
    sID_MinutaPatron: '',
    iD_ETC: 0,
    sID_ETC: '',
    nombre: '',
    preparacionMixta: false,
    preparacionBebida: false,
    guiaPreparacion: '',
    fechaPreparacion: undefined,
    pathGuia: '',
    iD_TipoEstado: 0,
    sID_TipoEstado: '',
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
  //ingre
  displayedColumnsIngredientes: string[] = ['Nombre'];
  displayedColumnsNeto: string[] = ['Nombre', 'Valor'];
  displayedColumnsDos: string[] = ['Nivel', 'pesoal', 'pesoampm'];
  displayedColumnsUna: string[] = ['Nivel', 'peso'];
  displayedColumnsComponentePAE: string[] = ['Componente', 'peso'];
  displayedColumnsComponenteGABA: string[] = ['grupo', 'subgrupo', 'peso'];
  displayedColumnsMAER: string[] = ['peso'];

  selGrupo = -1;
  selSubGrupo = -1;
  selTipo = -1;

  dataSource = new MatTableDataSource<PreparacionesModel>();
  dataSourceIngredientes: any[] = [];
  equivalencia: any[] = []
  energia: any[] = []
  macro: any[] = []
  micro: any[] = []
  peso: any[] = []
  peso2: any[] = []
  peso3: any[] = []
  componentePAE: any[] = []
  dataSourceComponentePAE: any[] = []
  dataSourceGABA: any[] = [];
  private dataArrayPreparacion: any;
  tipoPreparacion: any[] = [
    { id: 1, nombre: 'Mixta', estado: true },
    { id: 0, nombre: 'Simple', estado: false },
  ];
  tipoPreparacionText: string = '';
  nombreProducto: string = '';
  nombreEstado: string = '';
  colorEstado: string = '';
  aporteNutrcional: boolean = false;
  nombreIngrediente: string = ''
  NivelEducativoList: any[] = [];
  GrupoAlimentoList: any[] = [];
  SubGrupoAlimentoList: any[] = [];
  SubGrupoAlimentoListT: any[] = [];
  tabs = [];
  selected = new FormControl(0);
  idPreparacion = 0;

  nombreModelo: string = ''
  idModeloOperacion = 0;
  //peso servido
  maem2: boolean = false;
  maem1a: boolean = false;
  maem1b: boolean = false;
  maer1: boolean = false;
  PesoNeto: boolean = false;
  PesoNeto1: boolean = false;
  componente: boolean = false;
  Gaba: boolean = false;
  Gaba1: boolean = false;
  pesoNetoText = '';
  TipoModelos = 0;
  cantModelo = 0;
  guiaPreparacion = '';
  pathguia = '';
  nombreComplemento: string = ''
  complementosList: any;
  public nuevoArray = []
  public nuevoArrayPeso = []
  selectedTabIndex: number = 0;
  iD_TipoComplemento = 0;
  idAlimentoICF = 0;
  grado = 0;
  grado2 = 0;
  idIngrediente = 0;
  busquedaPreparacionParams: PA_BuscarPreparacionRequest = {};
  AporteNutricionalIngredientesParams: PA_AporteNutricionalIngredientesRequest = {}
  AporteNutricionalIngredientesDetParams: PA_AporteNutricionalIngredientesDetRequest = {}
  AportesComponentePreparacionDetParams: PA_AportesComponentePreparacionDetRequest = {}
  ComponenteN = 0;
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  public dataArrayInterno: any;

  modeloTList = null
  idaccion = 0;
  public dataComponentes: any = {
    id: 0,
    iD_Preparacion: this.PreparacionesObject.id,
    iD_TipoComponente: 0,
    nombre: '',
  };
  public dataComponentesBebida: any = {
    id: 0,
    iD_Preparacion: this.PreparacionesObject.id,
    iD_TipoComponente: 8,
    nombre: '',
  };
  public dataComponentesMas: any[] = []
  public TiposComponentesList: any = [];
  constructor(
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private _NivelEducativoService: NivelEducativoService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private _PreparacionesService: PreparacionesService,
    private _IngredientesPreparacionService: IngredientesPreparacionService,
    private _PA_AporteNutricionalIngredientesService: PA_AporteNutricionalIngredientesService,
    private _IngredientesService: IngredientesService,
    private _PA_AporteNutricionalIngredientesDetService: PA_AporteNutricionalIngredientesDetService,
    private _PA_NivelEducstivoPesoServidoPivService: PA_NivelEducstivoPesoServidoPivService,
    private _PA_AportesComponentePreparacionService: PA_AportesComponentePreparacionService,
    private _PA_AportesComponentePreparacionDetService: PA_AportesComponentePreparacionDetService,
    private _PA_BuscarPreparacionesService: PA_BuscarPreparacionesService,
    private router: Router,
    private route: ActivatedRoute,
    public VigenciasServicio: VigenciasService,
    private seguridadService: SeguridadService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _TiposComponenteService: TiposComponenteService,
    private _PA_PreparacionComplementosGetAllWithRelationService: PA_PreparacionComplementosGetAllWithRelationService,
    private _PA_PreparacionesGetAllWithRelationService: PA_PreparacionesGetAllWithRelationService,
    private _PA_ComponentesPreparacionGetAllWithRelationService: PA_ComponentesPreparacionGetAllWithRelationService,
    private _PA_AprobacionesGetAllFullService: PA_AprobacionesGetAllFullService,
    private _PesoServidoPreparacionService: PesoServidoPreparacionService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.idPreparacion = +params.id;

      if (params.etc == undefined) {
        this.idETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
      } else {
        this.idETC = + params.etc;
      }

    });



    this.traerDatos(this.idPreparacion);
    this.fillTableAprobaciones();
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);
    this.busquedaPreparacionParams.ID_ETC = this.idETC
    this.AportesComponentePreparacionDetParams.ID_ETC = this.idETC
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
    this._NivelEducativoService.getNivelEducativoList().subscribe(
      (response: any) => {

        this.NivelEducativoList = response;
        this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

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

  RegresarAprobaciones() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigate(['/PTNPreparaciones'], { queryParams: { tab: 1 } })
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
  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;

        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullListUbicacion(this.idPreparacion.toString(),17).subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosp.getGetAprobacionesGetAllWithRelListfilterUbi(17, this.idETC,this.idPreparacion.toString()).subscribe(
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
  mensaje() {
    this.ngOnInit()
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="position: absolute !important ; top: 25px !important; right: 40px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">Confirmar aprobación de la preparacion: </p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">${this.nombreProducto}</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',

      denyButtonColor: '#009922',

      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar.',
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
      this.AprobacionObject.id_Secciones = 17;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 13;
      this.AprobacionObject.ubicacionOrigen = this.idPreparacion.toString();
      let doc = localStorage.getItem('Documento7');
      if (doc == null) {
        this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
      } else {
        this.AprobacionObject.documentoParaAprobar = doc;
      }





      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {
          this.fillTableAprobaciones()
          this.clearForm()
          let estaApro = ''
          if (response.iD_AccionAprobacion === 1) {
            this.PreparacionesObject.iD_TipoEstado = 3;
            estaApro = 'Aprobado'
          } else {
            this.PreparacionesObject.iD_TipoEstado = 2;
            estaApro = 'Rechazado'
          }
          this._PA_RegistrarNotificacionService.registerNotification("La preparacion fue " + estaApro + " " + this.nombreProducto, "Líder Técnico - ET");
          this._PA_RegistrarNotificacionService.registerNotification("La preparacion fue " + estaApro + " " + this.nombreProducto, "Rol SiPAE-Administrador");
          this._PA_RegistrarNotificacionService.registerNotification("La preparacion fue " + estaApro + " " + this.nombreProducto, "Subdirección Técnica de Análisis, Calidad e Innovación");
          this._PA_RegistrarNotificacionService.registerNotification("La preparacion fue " + estaApro + " " + this.nombreProducto, "Subdirección Técnica de Fortalecimiento");
          this._PA_RegistrarNotificacionService.registerNotification("La preparacion fue " + estaApro + " " + this.nombreProducto, "Coordinador PAE");
          this.PreparacionesObject.id = this.listaPreparacion[0][0].id;
          this.PreparacionesObject.iD_TipoModeloOperacion = this.listaPreparacion[0][0].iD_TipoModeloOperacion
          this.PreparacionesObject.iD_MinutaPatron = this.listaPreparacion[0][0].iD_MinutaPatron
          this.PreparacionesObject.iD_ETC = this.listaPreparacion[0][0].iD_ETC
          this.PreparacionesObject.nombre = this.listaPreparacion[0][0].nombre
          this.PreparacionesObject.preparacionMixta = this.listaPreparacion[0][0].preparacionMixta
          this.PreparacionesObject.preparacionBebida = this.listaPreparacion[0][0].preparacionBebida
          this.PreparacionesObject.guiaPreparacion = this.listaPreparacion[0][0].guiaPreparacion ?? "-"
          this.PreparacionesObject.fechaPreparacion = this.listaPreparacion[0][0].fechaPreparacion
          this.PreparacionesObject.pathGuia = this.listaPreparacion[0][0].pathGuia ?? "-"
          this._PreparacionesService.updatePreparaciones(this.PreparacionesObject).subscribe((response) => {
            this.cantAprobaciones = 0;
            this.yaCargoAprobaciones = false;
            this.traerDatos(this.idPreparacion)
          },
            (err) => {


            });


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
  openingredienteDetalle(myRowData: any) {
    this.aporteNutrcional = true;
    this.cantModelo = 0;
    this.TipoModelos = 0;
    this.modeloTList = null
    this.nombreIngrediente = myRowData.nombreIngrediente;
    this.idAlimentoICF = myRowData.iD_AlimentosICBF;

    if (this.idModeloOperacion == 1) {
      let cant = this.nombreComplemento.length
      if (cant == 1) {
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
       
      } else if (cant == 2) {
        this.cantModelo = 2;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
        
      } else { }


    } else if (this.idModeloOperacion == 2) {
      this.TipoModelos = 2;
      this.equivalencia = [];
      this.energia = [];
      this.macro = [];
      this.micro = [];
      this.aporteNutricionalMAER();
      
    } else if (this.idModeloOperacion == 3) {
      let cant = this.nombreComplemento

      if (cant == 'Complemento Almuerzo') {
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
        
      } else if (cant == 'Complemento AM/PM') {
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
       
      } else {
        this.TipoModelos = 2;
        this.aporteNutricionalMAER();
        
      }
    } else { }
    if (this.grado != 0) { this.onNivelEducativoChange1_1(this.grado) } else { }
  }

  onNivelEducativoChange1(event: any): void {
    this.grado = event[0].value;

    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        if (response == 0) {

          this.PesoNeto1 = false;

        } else {
          this.idIngrediente = response[0].id;
          this.PesoNeto1 = false;
          this.aporteNutricional();
        };
      },
      (err) => {
      }
    );

  }
  onNivelEducativoChange1_1(event: any): void {
    this.grado = event;

    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        if (response == 0) {

          this.PesoNeto1 = false;

        } else {
          this.idIngrediente = response[0].id;
          this.PesoNeto1 = false;
          this.aporteNutricional();
        };
      },
      (err) => {
      }
    );

  }
  onNivelEducativoChange2(event: any): void {
    this.grado2 = event[0].value;
    this.componente = false;
    this.Gaba = false;
    this.Gaba1 = false;
    this.dataSourceComponentePAE = [];

    this._PA_AportesComponentePreparacionService.getPA_AportesComponentePreparacionList(this.idETC, this.idModeloOperacion, this.idPreparacion, this.iD_TipoComplemento, this.grado2).subscribe(
      (response: any) => {
        let j = response;

        this.dataSourceComponentePAE = [];
        if (this.listaPreparacion[0][0].preparacionBebida == true || this.listaPreparacion[0][0].preparacionBebida == 'True' ) {
         
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
          if (this.listaPreparacion[0][0].preparacionMixta == true || this.listaPreparacion[0][0].preparacionMixta == 'True') {
            this.dataSourceComponentePAE = [];
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
            this.dataSourceComponentePAE = [];
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
  onNivelEducativoChange(event: any): void {
    this.grado = event[0].value;

    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        this.idIngrediente = response[0].id;
        this.PesoNeto1 = false;
        this.aporteNutricional();
      },
      (err) => {
      }
    );


  }
  aporteNutricionalMAER() {
    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, null, null).subscribe(
      (response: any) => {
        this.idIngrediente = response[0].id;
        this.PesoNeto1 = false;
        this.aporteDet()
      },
      (err) => {
      }
    );
  }
  aporteDet() {
    this.AporteNutricionalIngredientesParams.ID_ETC = this.idETC;
    this.AporteNutricionalIngredientesParams.ID_Ingrediente = this.idIngrediente;
    this.AporteNutricionalIngredientesParams.ID_Preparacion = this.idPreparacion;
    this._PA_AporteNutricionalIngredientesService.getPA_AporteNutricionalIngredientesList(this.AporteNutricionalIngredientesParams).subscribe(
      (response: any) => {

        if (response.length == 0) {
          this.pesoNetoText = ''
        } else {
          this.pesoNetoText = response[0].pesoNeto;
        }

        let m3
        response.find(object => {
          m3 = Object.keys(object)
          for (let caja in response) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (pesoNeto == true && porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: response[0].pesoBruto,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: response[0].porcentajeComestible,
              });
            } else { }

          }

        });




        this.micromacroeneMAER();
        this.PesoNeto1 = true;
      },
      (err) => {
      }
    );
  }
  aporteNutricional() {
    this.AporteNutricionalIngredientesParams.ID_ETC = this.idETC;
    this.AporteNutricionalIngredientesParams.ID_Ingrediente = this.idIngrediente;
    this.AporteNutricionalIngredientesParams.ID_Preparacion = this.idPreparacion;
    this.AporteNutricionalIngredientesParams.ID_TipoComponente = this.iD_TipoComplemento;
    if (this.TipoModelos == 1 && this.cantModelo == 1) {
      this.AporteNutricionalIngredientesParams.ID_TipoNivelEducativo = this.grado
    }

    this._PA_AporteNutricionalIngredientesService.getPA_AporteNutricionalIngredientesList(this.AporteNutricionalIngredientesParams).subscribe(
      (response: any) => {

        this.pesoNetoText = response[0].pesoNeto;

        let m3
        response.find(object => {
          m3 = Object.keys(object)
          for (let caja in response) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (pesoNeto == true && porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: response[0].pesoBruto,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: response[0].porcentajeComestible,
              });
            } else { }

          }

        });



        this.micromacroene();
        this.PesoNeto1 = true;
      },
      (err) => {
      }
    );
  }
  micromacroene() {
    // id_etc es id_etc, id_ingrediente es id_ingrediente,
    //id_tipocomponente es id_tipocomplemento, id_preparacion es id_niveleducativo,
    //id:tiponiveleducativo es id_modelooperacion
    this.AporteNutricionalIngredientesDetParams.ID_ETC = this.idETC;
    this.AporteNutricionalIngredientesDetParams.ID_Ingrediente = this.idIngrediente;
    this.AporteNutricionalIngredientesDetParams.ID_TipoComponente = this.iD_TipoComplemento;
    this.AporteNutricionalIngredientesDetParams.ID_Preparacion = this.grado;
    this.AporteNutricionalIngredientesDetParams.ID_TipoNivelEducativo = this.idModeloOperacion

    this._PA_AporteNutricionalIngredientesDetService.gePA_AporteNutricionalIngredientesDetList(this.AporteNutricionalIngredientesDetParams).subscribe(
      (response: any) => {
        this.energia = response.filter(item => item.iD_TipoNivelNutriente == 3);
        this.macro = response.filter(item => item.iD_TipoNivelNutriente == 1);
        this.micro = response.filter(item => item.iD_TipoNivelNutriente == 2);

      },
      (err) => {
      }
    );

  }
  micromacroeneMAER() {
    // id_etc es id_etc, id_ingrediente es id_ingrediente,
    //id_tipocomponente es id_tipocomplemento, id_preparacion es id_niveleducativo,
    //id:tiponiveleducativo es id_modelooperacion
    this.AporteNutricionalIngredientesDetParams.ID_ETC = this.idETC;
    this.AporteNutricionalIngredientesDetParams.ID_Ingrediente = this.idIngrediente;
    this.AporteNutricionalIngredientesDetParams.ID_TipoNivelEducativo = this.idModeloOperacion

    this._PA_AporteNutricionalIngredientesDetService.gePA_AporteNutricionalIngredientesDetList(this.AporteNutricionalIngredientesDetParams).subscribe(
      (response: any) => {
        this.energia = response.filter(item => item.iD_TipoNivelNutriente == 3);
        this.macro = response.filter(item => item.iD_TipoNivelNutriente == 1);

        this.micro = response.filter(item => item.iD_TipoNivelNutriente == 2);

      },
      (err) => {
      }
    );

  }
  gabadata() {
    this.AportesComponentePreparacionDetParams.ID_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
    this.AportesComponentePreparacionDetParams.iD_Preparacion = this.idPreparacion;
    this.AportesComponentePreparacionDetParams.id_TipoModeloOperacion = this.idModeloOperacion;
    if (this.idModeloOperacion == 1) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;

    } else if (this.idModeloOperacion == 2) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = null;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
    } else if (this.idModeloOperacion == 3) {
      let cant = this.nombreComplemento

      if (cant == 'Complemento Almuerzo' || cant == 'Complemento AM/PM') {
        this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
        this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;
      } else {
        this.AportesComponentePreparacionDetParams.ID_Complemento = null;
        this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
      }
    } else { }

    this._PA_AportesComponentePreparacionDetService.gePA_AporteNutricionalIngredientesDetList(this.AportesComponentePreparacionDetParams).subscribe(
      (response: any) => {
        this.dataSourceGABA = response;

        this.spans = Object.assign({}, {
          grupoAlimentos: this.spanDeep(['iD_GrupoAlimentos','grupoAlimentos'], this.dataSourceGABA),
          subGrupoAlimentos: this.spanDeep(['iD_GrupoAlimentos','grupoAlimentos','subGrupoAlimentos'], this.dataSourceGABA),
        });
        let cant = this.nombreComplemento.length

        if (this.idModeloOperacion == 1) {
          let t1 = this.tabs[0];
          let t2 = this.tabs[1];
          if (cant == 2) {
            if ((t1 == 'Complemento AM/PM' && t2 == 'Complemento Almuerzo') || (t2 == 'Complemento AM/PM' && t1 == 'Complemento Almuerzo')) {
              this.ComponenteN = 2;

            } else { }
          } else if (cant == 1) {
            if (t1 == 'Complemento AM/PM' || t1 == 'Complemento Almuerzo') {
              this.ComponenteN = 1;
            } else {
              this.ComponenteN = 1;
            }
          } else { }
        } else if (this.idModeloOperacion == 2) {

          this.ComponenteN = 3;
        } else if (this.idModeloOperacion == 3) {
          let t1 = this.tabs[0];
          if (t1 == 'Complemento AM/PM') {
            this.ComponenteN = 1;
          } else if (t1 == 'Complemento Almuerzo') {
            this.ComponenteN = 1;
          } else {
            this.ComponenteN = 3;
          }
        } else { }

      },
      (err) => {
      }
    );

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
  downloadFile(obj: any): void {
    if (obj === '-' || obj === '' || obj === null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="position: absolute !important ; top: 25px !important; right: 40px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">No tiene soporte para ver </p> ',
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
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: null, fileName: obj, cnx: environment.cnxBS, container: environment.containerDS };
      (this.RepositoriosExtendService.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: this.getType(obj) });
          saveAs(blob, obj);
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
  traerDatos(id: number) {
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
    this.busquedaPreparacionParams.ID_ETC = this.idETC
    this._PA_BuscarPreparacionesService.getPA_BuscarPreparacionesList(this.busquedaPreparacionParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        let h1 = response
        let h = response.filter(item => item.iD_Preparacion == id)

        var arr = {};

        for (var i = 0, len = h.length; i < len; i++)
          arr[h[i]['iD_Preparacion']] = h[i];

        h = new Array();
        for (var key in arr)
          h.push(arr[key]);

        this.nombreEstado = h[0].estadoPreparacion;
        this.colorEstado = h[0].colorEstadoPreparacion;
        this.tipoPreparacionText = h[0].tipoPreparacion;
        if (h[0].estado == 1) {
          this.cantAprobaciones = 1;
          this.yaCargoAprobaciones = true;
        } else { }

      },
      (err) => {
        this.isLoading = false;
      }
    );

    this._PA_PreparacionComplementosGetAllWithRelationService.getPA_PreparacionComplementosGetAllWithRelationList(id).subscribe(
      (response: any) => {
        this.complementosList = response
      
        if (this.complementosList.length == 0) {

          this.nombreComplemento = 'N/A';
         

        } else {
         
          const datosAgrupados: { [idPreparacion: number]: any } = {};

          // Iterar sobre la lista de complementos
          for (const complemento of this.complementosList) {
              const idPreparacion = complemento.iD_Preparacion;
          
              // Verificar si el ID de preparación ya existe en el objeto de datos agrupados
              if (!datosAgrupados.hasOwnProperty(idPreparacion)) {
                  // Si no existe, crear una nueva entrada en el objeto de datos agrupados
                  datosAgrupados[idPreparacion] = {
                      iD_Preparacion: idPreparacion,
                      iD_TipoComplemento: [],
                      sID_TipoComplemento: new Set()
                  };
              }
          
              // Agregar el ID de tipo de complemento y el nombre al conjunto para eliminar duplicados
              datosAgrupados[idPreparacion].iD_TipoComplemento.push(complemento.iD_TipoComplemento);
              datosAgrupados[idPreparacion].sID_TipoComplemento.add(complemento.sID_TipoComplemento);
          }
          
          // Convertir el conjunto de nombres de tipo de complemento de cada entrada en un array
          for (const idPreparacion in datosAgrupados) {
              datosAgrupados[idPreparacion].sID_TipoComplemento = Array.from(datosAgrupados[idPreparacion].sID_TipoComplemento);
          }
          
          // Obtener los valores del objeto de datos agrupados como una lista
          const datosUnidos = Object.values(datosAgrupados);

          this.nombreComplemento = datosUnidos[0].sID_TipoComplemento;



          this.tabs = datosUnidos[0].sID_TipoComplemento

          let com = this.tabs[this.selectedTabIndex];
          let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
          this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
          this.cantModelo = 0;
          this.TipoModelos = 0;
          this.aporteNutrcional = false;
          this.componente = false;
          this.Gaba = false;
          this.Gaba1 = false;
          
        }


      },
      (err) => {
      });
    this._IngredientesPreparacionService.getPA_IngredientesPreparacionlList(this.idETC, id).subscribe(
      (response: any) => {
        this.dataSourceIngredientes = response;
      },
      (err) => {
      }
    );
    this._PA_PreparacionesGetAllWithRelationService.getPA_PreparacionesGetAllWithRelationList(id).subscribe(
      (response: any) => {
        this.dataArrayPreparacion = response;

        this.listaPreparacion.push(this.dataArrayPreparacion)

        this.nombreProducto = this.dataArrayPreparacion[0].nombre;
        this.nombreModelo = this.dataArrayPreparacion[0].sID_TipoModeloOperacion;
        this.idModeloOperacion = this.dataArrayPreparacion[0].iD_TipoModeloOperacion;
        this.guiaPreparacion = this.dataArrayPreparacion[0].guiaPreparacion;
        this.pathguia = this.dataArrayPreparacion[0].pathGuia
        this.component(id)
      },
      (err) => {
      });
    
    

  }
  component(id: number) {
    this._PA_ComponentesPreparacionGetAllWithRelationService.getPA_ComponentesPreparacionGetAllWithRelationList(id).subscribe(
      async (response: any) => {

        let h = response;
        
        if (this.listaPreparacion[0][0].preparacionBebida == true || this.listaPreparacion[0][0].preparacionBebida == 'True') {
          this.dataComponentesBebida.id = h[0].id;
          this.dataComponentesBebida.iD_Preparacion = h[0].iD_Preparacion;
          this.dataComponentesBebida.iD_TipoComponente = h[0].iD_TipoComponente;
          this.dataComponentesBebida.nombre = h[0].sID_TipoComponente

        } else {
          if (this.listaPreparacion[0][0].preparacionMixta == true || this.listaPreparacion[0][0].preparacionMixta == 'True') {
            this.dataComponentesMas = h;
          } else {
            this.dataComponentes.id = h[0].id;
            this.dataComponentes.iD_Preparacion = h[0].iD_Preparacion;
            this.dataComponentes.iD_TipoComponente = h[0].iD_TipoComponente;
            this.dataComponentes.nombre = h[0].sID_TipoComponente
          }
        }
        await this.traerpeso()
      },
      (err) => {
      }
    );
  }

  traerpeso() {
    if (this.listaPreparacion[0][0].iD_TipoModeloOperacion == 1) {
     
      this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
        async (response: any) => {
          // Ordenar el array `response` por `id` de menor a mayor
          response.sort((a: any, b: any) => a.id - b.id);
      
          const seen = new Set();
          const deletePromises = response.map(async (item: any) => {
            const combo = `${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`;
            if (seen.has(combo)) {
              // Si la combinación ya existe, elimina el elemento duplicado
              return this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
            } else {
              // Si la combinación no existe, agregarla al conjunto
              seen.add(combo);
              return Promise.resolve(); // No hacer nada si no es duplicado
            }
          });
      
          // Esperar a que todas las operaciones de eliminación terminen
          await Promise.all(deletePromises);
      
          // Procesar la lista filtrada después de la eliminación
          const listaFiltrada = response.filter((item: any) => seen.has(`${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`));
      
          // Llamar a this.PesoServido() solo después de que todas las eliminaciones hayan terminado
          await this.PesoServido();
        },
        (error) => {
          console.error('Error al obtener la lista de Peso Servido Preparacion', error);
        }
      );
      

    } else if (this.listaPreparacion[0][0].iD_TipoModeloOperacion == 2) {
      this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
        async (response: any) => {
          // Ordenar el response de menor a mayor basado en una propiedad, por ejemplo 'id'
          let sortedResponse = response.sort((a: any, b: any) => a.id - b.id);
      
      
          // Si hay más de un dato, eliminar los elementos de la cola
          if (sortedResponse.length > 1) {
            // Eliminar los elementos a partir del segundo hasta el final
            let itemsToDelete = sortedResponse.slice(1); // Obtiene todos menos el primero
            for (let item of itemsToDelete) {
              await this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
            }
          }
      
          // Continuar con el procesamiento después de la eliminación si es necesario
          await this.PesoServido();
        }
      );
      

    } else if (this.listaPreparacion[0][0].iD_TipoModeloOperacion == 3) {
      let t1 = this.tabs[0];
      if (t1 == 'Complemento AM/PM' ||t1 == 'Complemento Almuerzo' ) {
        this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
          async (response: any) => {
            // Ordenar el array `response` por `id` de menor a mayor
            response.sort((a: any, b: any) => a.id - b.id);
        
            const seen = new Set();
            const deletePromises = response.map(async (item: any) => {
              const combo = `${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`;
              if (seen.has(combo)) {
                // Si la combinación ya existe, elimina el elemento duplicado
                return this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
              } else {
                // Si la combinación no existe, agregarla al conjunto
                seen.add(combo);
                return Promise.resolve(); // No hacer nada si no es duplicado
              }
            });
        
            // Esperar a que todas las operaciones de eliminación terminen
            await Promise.all(deletePromises);
        
            // Procesar la lista filtrada después de la eliminación
            const listaFiltrada = response.filter((item: any) => seen.has(`${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`));
        
            // Llamar a this.PesoServido() solo después de que todas las eliminaciones hayan terminado
            await this.PesoServido();
          },
          (error) => {
            console.error('Error al obtener la lista de Peso Servido Preparacion', error);
          }
        );
      }  else {
        this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
          async (response: any) => {
            // Ordenar el response de menor a mayor basado en una propiedad, por ejemplo 'id'
            let sortedResponse = response.sort((a: any, b: any) => a.id - b.id);
        
        
            // Si hay más de un dato, eliminar los elementos de la cola
            if (sortedResponse.length > 1) {
              // Eliminar los elementos a partir del segundo hasta el final
              let itemsToDelete = sortedResponse.slice(1); // Obtiene todos menos el primero
              for (let item of itemsToDelete) {
                await this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
              }
            }
        
            // Continuar con el procesamiento después de la eliminación si es necesario
            await this.PesoServido();
          }
        );
      }
    }
    
   


  }
  PesoServido() {

    this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
      (response: any) => {
        if (response.length == 0) {
          this._NivelEducativoService.getNivelEducativoList().subscribe(
            (response: any) => {
      
              this.NivelEducativoList = response;
              this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
              this.NivelEducativoList.forEach(item => {
                this.peso.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
                this.peso2.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
                this.peso3.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
              })
              var arr = {};
    
              for (var i = 0, len = this.peso.length; i < len; i++)
                arr[this.peso[i]['iD_TipoNivelEducativo']] = this.peso[i];
    
              this.peso = new Array();
              for (var key in arr)
                this.peso.push(arr[key])
    
              var arr1 = {};
    
              for (var i = 0, len = this.peso2.length; i < len; i++)
                arr1[this.peso2[i]['iD_TipoNivelEducativo']] = this.peso2[i];
    
              this.peso2 = new Array();
              for (var key in arr1)
                this.peso2.push(arr1[key])
              var arr2 = {};
    
              for (var i = 0, len = this.peso3.length; i < len; i++)
                arr2[this.peso3[i]['iD_TipoNivelEducativo']] = this.peso3[i];
    
              this.peso3 = new Array();
              for (var key in arr2)
                this.peso3.push(arr2[key])
      
            },
            (err) => {
            }
          );
          

        } else {
          this.peso = response;
          this.peso2 = response;
          this.peso3 = response;
        }




        let cant = this.nombreComplemento.length

        if (this.idModeloOperacion == 1) {
          let t1 = this.tabs[0];
          let t2 = this.tabs[1];


          if (cant == 2) {
            if ((t1 == 'Complemento AM/PM' && t2 == 'Complemento Almuerzo') || (t1 == 'Complemento Almuerzo' && t2 == 'Complemento AM/PM')) {
              this.maem2 = true;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = false;
              this.gabadata();

            } else { }
          } else if (cant == 1) {
            if (t1 == 'Complemento AM/PM') {
              this.maem2 = false;
              this.maem1a = false;
              this.maem1b = true;
              this.maer1 = false;
              this.gabadata();
            } else {
              this.maem2 = false;
              this.maem1a = true;
              this.maem1b = false;
              this.maer1 = false;
              this.gabadata();
            }
          } else { }
        } else if (this.idModeloOperacion == 2) {
          this.maem2 = false;
          this.maem1a = false;
          this.maem1b = false;
          this.maer1 = true;
          this.gabadata();
        } else if (this.idModeloOperacion == 3) {
          let t1 = this.tabs[0];
          if (t1 == 'Complemento AM/PM') {
            this.maem2 = false;
            this.maem1a = false;
            this.maem1b = true;
            this.maer1 = false;
            this.gabadata();
          } else if (t1 == 'Complemento Almuerzo') {
            this.maem2 = false;
            this.maem1a = true;
            this.maem1b = false;
            this.maer1 = false;
            this.gabadata();
          } else {
            this.maem2 = false;
            this.maem1a = false;
            this.maem1b = false;
            this.maer1 = true;
            this.gabadata();
          }
        } else { }

      },
      (err) => {
      }
    );
  }

  myTabFocusChange(tabChangeEvent: any): void {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.PesoNeto1 = false;

  }
  myTabFocusChange2(tabChangeEvent: any) {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.componente = false;
    this.Gaba = false;
    this.Gaba1 = false;

  }
  irEditar() {
    localStorage.setItem('nombredeUbicacionActualizado', 'si')
    this.router.navigate(['/RegistroPreparacion'], { queryParams: { id: this.idPreparacion } })
  }

}
