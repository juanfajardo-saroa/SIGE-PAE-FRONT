import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { PriorizacionArchivosService } from 'src/app/shared/services/PriorizacionArchivos.service';
import * as saveAs from 'file-saver';
import { ValidateInput } from 'src/app/static/validate-input';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPaginator } from 'src/app/pages/CustomPaginatorConfiguration';
import { AspNetUsersService } from 'src/app/seguridad/AspNetUsers/AspNetUsers.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';
import {
  TiposUnionesTemporales,
  TiposConsorcios,
  EstadoOperador
} from 'src/app/shared/constants/general';

moment.locale('es');

@Component({
  selector: 'app-registro-operadores',
  //providers: [ContratosApiService, MasterDataApiService, AspNetUsersService],
  templateUrl: './registro-operadores.component.html',
  styleUrls: ['./registro-operadores.component.sass'],
})
export class RegistroOperadoresComponent implements OnInit, OnDestroy {
  private sub: any;

  idRowSelect = 0;
  idRowAprobacion = 0;
  idETC = +(localStorage.getItem('IdUbicacion') ?? 0);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private subs = new Subscription();
  iD_Vigencia: number = 1;
  loadingVisible: boolean = false;

  // responsable: string = 'Usuario del sistema';
  responsable: string = localStorage.getItem('NombreUsuario');
  // rolResponsable: string = 'Administrador de sistemas';
  rolResponsable: string = localStorage.getItem('RolBase');

  messageSinregistros: string =
    'No hay resultados disponibles. Si el Operador que busca no aparece, dé click en' +
    '“Registrar Operador” e inscríbalo llenando el “Registro Único de Operadores”.';

  alertMessage: string =
    'Si las empresas que conforman la Unión' +
    'Temporal o el Consorcio no aparecen,' +
    'debe crealas primero como Operadores' +
    'independientes y después continuar con' +
    'el diligenciamiento de este formulario.';

  displayedColumnsOperadores: string[] = [
    'tipoIdentificacion',
    'identificacion',
    'nombreRazonSocial',
    'operadorMAEM',
    'operadorMAER',
    'operadorMAIP',
    'proveedorPAE',
    'fichaColor',
  ];

  displayedColumnsContratos: string[] = [
    'N&uacute;mero de <br> contrato',
    'Operador <br> (Tipo de contrato)',
    'ET/ETC',
    'Modelo de <br> operaci&oacute;n',
    'Fecha de <br> inicio',
    'Fecha de <br> finalizacion',
    'Ficha de <br> contrato',
  ];

  displayedColumnsHistorico: string[] = [
    'Fecha',
    'Responsable',
    'Rol del <br> responsable',
    'Acci&oacute;n',
    'Observaciones / <br> justificaciones',
  ];

  dataOperadores: any = new MatTableDataSource<any>([]);
  listOperadores = [];
  listOperadoresCopy = [];
  paginador = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 50, 100],
  };

  dataContratosOperadorDirecto: any = [];
  dataContratosUnionTemporalConsorcio: any = [];
  dataHistoricoAprobaciones: any = [];

  listDivipolas: any;
  listSubTiposRegistroMercantil: any;
  listTiposIdentificacion: any;
  listTiposRegistroMercantil: any;

  itemFiltroBusqueda: any = {
    numIdentificacion: '',
    nit: '',
    digitoVerificacion: '',
  };

  onlyNumber = ValidateInput.OnlyNumber;

  gridVisible: boolean = true;
  formVisible: boolean = false;
  modo: number = 0;
  idSeccion = 7;
  lat: number = 3.755065627868094;
  lng: number = -73.72842663822269;

  disabledOperador: boolean = false;
  itemOperador: any = {};
  itemParticipacion: any = {};

  itemAprobacion: any = {
    iD_Operador: 0,
    fechaAprobacion: new Date(),
    iD_TipoEstadoOperador: 0,
    responsable: this.responsable,
    rolResponsable: this.rolResponsable,
    accion: '',
    observaciones: '',
    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
  };

  srcPDF: any;

  /**
   * ficha contrato
   */
  itemFichaContrato: any = {
    visible: false,
    data: {},
  };

  infoPassword = {
    letrasMayus: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    letrasMinus: 'abcdefghijklmnopqrstuvwxyz',
    caracterEsp: '$&%@#',
    numeros: '0123456789',
    lengthLetrasMayus: 2,
    lengthLetrasMinus: 2,
    lengthCaracterEsp: 1,
    lengthNumero: 4,
  };

  formularioOperadores: FormGroup;
  nombreRazonSocial: string;
  seleccion: boolean;

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
    fecha: new Date(),
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: LocalStorage.getAuditoria(''),
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

  estadoOperadorEnum = EstadoOperador;

  constructor(
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _contratosApiService: ContratosApiService,
    private _masterDataApiService: MasterDataApiService,
    private _aspNetUsersService: AspNetUsersService,
    private messageService: MessageService,
    private seguridadService: SeguridadService,
    private servicios: PriorizacionArchivosService,
    private aprobacionesService: AprobacionesService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetOperador();
    this.sub = this._route.queryParams.subscribe((params) => {
      if (params['idsel']) {
        this.idRowAprobacion = +params['idsel'];
      }
      if (params['idubicacion']) {
        this.idRowSelect = +params['idubicacion'];
      }
      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.formularioOperadores = this.formBuilder.group({
        nombreRazonSocial: ['', Validators.required],
        nitParteUno: ['', Validators.required],
        nitParteDos: ['', Validators.required],
        tipoRegistro: ['', Validators.required],
        subtipoRegistro: ['', Validators.required],
        representanteLegal: ['', Validators.required],
        tipoIdRepresentante: ['', Validators.required],
        idRepresentante: ['', [Validators.required, Validators.minLength(6)]],
        correoOperador: ['', [Validators.required, Validators.email]],
        telefonoOperador: ['', [Validators.required, Validators.minLength(6)]],
        ciudadOperador: ['', Validators.required],
        direccionOperador: [
          '',
          [Validators.required, Validators.minLength(12)],
        ],
      });
    });

    this.paginator._intl = CustomPaginator();

    this.get_Divipolas();
    this.get_TiposIdentificacion();
    this.get_TiposRegistroMercantil();
    this.getOperadores();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  razonSocialEsInvalida(): boolean {
    return (
      this.formularioOperadores.get('nombreRazonSocial').invalid &&
      this.formularioOperadores.get('nombreRazonSocial').touched
    );
  }

  nitEsInvalido(): boolean {
    return (
      this.formularioOperadores.get('nitParteUno').invalid &&
      this.formularioOperadores.get('nitParteUno').touched
    );
  }

  validarSelect(element: string): boolean {
    return this.formularioOperadores.get(element).value === '0' ? true : false;
  }

  validarRepresentante(element: string): boolean {
    return this.formularioOperadores.get(element).invalid &&
      this.formularioOperadores.get(element).touched
      ? true
      : false;
  }

  validarOperador(element: string): boolean {
    return this.formularioOperadores.get(element).invalid &&
      this.formularioOperadores.get(element).touched
      ? true
      : false;
  }

  cargarFicha(item: any) {
    this.itemFichaContrato.data = item;
    this.itemFichaContrato.visible = true;

    this.gridVisible = false;
    this.formVisible = false;
  }

  regresarFichaContrato() {
    this.itemFichaContrato.visible = false;
    this.gridVisible = false;
    this.formVisible = true;
  }

  buscarUsuarios(sinFiltro: boolean) {
    if (sinFiltro) {
      this.itemFiltroBusqueda = {
        numIdentificacion: '',
        nit: '',
        digitoVerificacion: '',
      };
    }

    this.getOperadores();
  }

  getOperadores() {
    this.loadingVisible = true;
    this._contratosApiService
      .Get_Operadores(this.itemFiltroBusqueda)
      .subscribe({
        next: (response) => {
          this.loadingVisible = false;

          if (!response.success) {
            this.messageService.showError(
              'ERROR: ' + response.error,
              'top center'
            );
            return;
          }

          response.result.map(function (item: any) {
            // MAEM
            if (item.operadorMAEM > 0) {
              item.bgOperadorMAEM = 'bg-green';
              item.esOperadorMAEM = 'Si';
            } else {
              item.bgOperadorMAEM = 'bg-red';
              item.esOperadorMAEM = 'No';
            }

            // MAER
            if (item.operadorMAER > 0) {
              item.bgOperadorMAER = 'bg-green';
              item.esOperadorMAER = 'Si';
            } else {
              item.bgOperadorMAER = 'bg-red';
              item.esOperadorMAER = 'No';
            }

            // MAIP
            if (item.operadorMAIP > 0) {
              item.bgOperadorMAIP = 'bg-green';
              item.esOperadorMAIP = 'Si';
            } else {
              item.bgOperadorMAIP = 'bg-red';
              item.esOperadorMAIP = 'No';
            }

            // PAEC
            if (item.operadorPAEC > 0) {
              item.bgOperadorPAEC = 'bg-green';
              item.esOperadorPAEC = 'Si';
            } else {
              item.bgOperadorPAEC = 'bg-red';
              item.esOperadorPAEC = 'No';
            }

            // Proveedor PAE
            if (item.proveedorPAE > 0) {
              item.bgProveedorPAE = 'bg-green';
              item.esProveedorPAE = 'Si';
            } else {
              item.bgProveedorPAE = 'bg-red';
              item.esProveedorPAE = 'No';
            }

            // Proveedor Estado
            if (item.fichaColor == 1) {
              item.bgColorEstado = 'bg-green';
            } else if (item.fichaColor == 2) {
              item.bgColorEstado = 'bg-yellow';
            } else if (item.fichaColor == 3) {
              item.bgColorEstado = 'bg-red';
            } else if (item.fichaColor == 4) {
              item.bgColorEstado = 'bg-grey';
            } else {
              item.bgColorEstado = '';
            }

            return item;
          });

          this.dataOperadores = new MatTableDataSource(response.result);
          this.listOperadores = response.result;
          if (
            Object.values(this.itemFiltroBusqueda).every(
              (value) => value === null || value === ''
            )
          ) {
            this.listOperadoresCopy = JSON.parse(
              JSON.stringify(this.listOperadores)
            );
          }
          this.setPageIndexItem();
          if (this.idRowSelect != 0) {
            this.itemAprobacion.operadorId = this.idRowSelect;
            this.verOperador(this.itemAprobacion);
          }
        },
        error: (error) => {
          this.loadingVisible = false;
          this.messageService.showError('ERROR: ' + error, 'top center');
        },
      });
  }

  setPageIndexItem() {
    const data = this.dataOperadores._data._value;
    for (let i = 0; i < data.length; i++) {
      if (data[i].operadorId == this.idRowSelect) {
        this.paginator.pageIndex = parseInt(
          ((i + 1) / this.paginador.pageSize).toString()
        );
        break;
      }
    }
    this.dataOperadores.paginator = this.paginator;
  }

  changeItemFiltroBusqueda(name: string, value: any) {
    this.itemFiltroBusqueda[name] = value.trim() == '' ? null : value.trim();
  }

  changeItemOperador(name: string, value: any) {
    debugger;
    if (!this.disabledOperador) {
      this.itemOperador[name] =
        value == null
          ? value
          : value.toString().includes(' ')
          ? value.trim()
          : value;
    }

    if (name == 'iD_TipoRegistroMercantil') {
      this.get_SubTiposRegistroMercantil();
    }
  }

  changeItemOperadorTipoSubtipo(name: string, value: any) {
    if (!this.disabledOperador) {
      this.itemOperador[name] = value;

      if (name == 'cantidadEmpresas') {
        this.itemOperador.listConsorcios = [];

        for (let k = 0; k < value; k++) {
          this.itemOperador.listConsorcios.push({
            id: k + 1,
            iD_Operador: 0,
            nombreRazonSocial: '',
            nit: '',
            cantidadParticipacion: 1,
            estado: true,
            auditoria: LocalStorage.getAuditoria(''),
          });
        }
      }
    }
  }

  changeItemOperadorEmpresa(item: any, value: any) {
    for (let i = 0; i < this.listOperadores.length; i++) {
      if (this.listOperadores[i].operadorId == value) {
        item['iD_Operador'] = this.listOperadores[i].operadorId;
        item['nit'] = this.listOperadores[i].identificacion;
        item['nombreRazonSocial'] = this.listOperadores[i].nombreRazonSocial;
        break;
      }
    }
  }

  changeItemAprobacion(name: string, value: any) {
    this.itemAprobacion[name] = name == 'observaciones' ? value.trim() : value;
  }

  verOperador(item: any) {
    this.loadingVisible = true;

    this._contratosApiService
      .Get_Operador(item.operadorId)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          this.itemOperador = response.result;
          this.itemOperador.estado = true;
          this.get_SubTiposRegistroMercantil();

          if (this.validarSubTipoRegistroMercantil()) {
            this.get_ContratosUTConsorciosOperadores();
          }

          this.disabledOperador = this.itemOperador.iD_TipoEstadoOperador > 1;

          if (this.disabledOperador) {
            this.get_ContratosOperadorDirecto();
            this.get_ContratosUnionTemporalConsorcio();
            this.get_ParticipacionOperador();
            this.get_HistoricoAprobacionesPorOperador();

            this.itemAprobacion = {
              iD_Operador: this.itemOperador.id,
              fechaAprobacion: new Date(),
              iD_TipoEstadoOperador: 0,
              responsable: this.responsable,
              rolResponsable: this.rolResponsable,
              accion: '',
              observaciones: '',
              estado: true,
              auditoria: LocalStorage.getAuditoria(''),
            };
          }

          this.gridVisible = false;
          this.formVisible = true;
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  cancelar() {
    this.formVisible = false;
    this.gridVisible = true;
  }

  guardarFinalizar(tipo: number) {
    if (this.itemOperador.nombreRazonSocial == '') {
      this.messageService.showWarning(
        'Digite el nombre de la razon social.',
        'top center'
      );
      return;
    }

    if (this.itemOperador.nit == '') {
      this.messageService.showWarning(
        'Digite el nit de la razon social.',
        'top center'
      );
      return;
    }

    if (this.itemOperador.dv == '') {
      this.messageService.showWarning(
        'Ingrese el digito de verificación.',
        'top center'
      );
      return;
    }

    if (!(this.itemOperador.iD_SubTipoRegistroMercantil > 0)) {
      this.messageService.showWarning(
        'Seleccione un subtipo de registro mercantil.',
        'top center'
      );
      return;
    }

    if (
      !this.itemOperador.iD_Tipoldentificacion ||
      this.itemOperador.iD_Tipoldentificacion == '0'
    ) {
      this.messageService.showWarning(
        'Seleccione el tipo de identificación del representante legal del operador.',
        'top center'
      );
      return;
    }

    this.itemOperador.iD_TipoEstadoOperador = 1;

    if (tipo == 2) {
      if (this.itemOperador.rutPath == '') {
        this.messageService.showWarning(
          'Adjunte el Rut del operador',
          'top center'
        );
        return;
      }

      if (this.itemOperador.iD_SubTipoRegistroMercantil == 0) {
        this.messageService.showWarning(
          'Seleccione un subtipo de registro mercantil',
          'top center'
        );
        return;
      }

      if (this.validarSubTipoRegistroMercantil()) {
        if (this.itemOperador.listConsorcios.length === 0) {
          this.messageService.showWarning(
            'Seleccione todas las empresas que pertenecen al Subtipo de Union Temporal.',
            'top center'
          );
          return;
        }

        for (let i = 0; i < this.itemOperador.listConsorcios.length; i++) {
          if (this.itemOperador.listConsorcios[i].iD_Operador == 0) {
            this.messageService.showWarning(
              'Seleccione un subtipo de registro mercantil',
              'top center'
            );

            this.messageService.showWarning(
              'Seleccione todas las empresas que pertenecen al Subtipo de Union Temporal.',
              'top center'
            );
            return;
          }
        }
      }

      if (this.itemOperador.nombreRepresentanteLegal == '') {
        this.messageService.showWarning(
          'Digite el nombre del representante legal.',
          'top center'
        );
        return;
      }

      if (this.itemOperador.numeroldentificacion == '') {
        this.messageService.showWarning(
          'Digite el número de identificación del representante legal.',
          'top center'
        );
        return;
      }

      if (this.itemOperador.correo == '') {
        this.messageService.showWarning(
          'Digite el nombre del representante legal.',
          'top center'
        );
        return;
      }

      if (this.itemOperador.telefono == '') {
        this.messageService.showWarning(
          'Digite el nombre del representante legal.',
          'top center'
        );
        return;
      }

      if (
        !this.itemOperador.iD_Divipola ||
        this.itemOperador.iD_Divipola == '0'
      ) {
        this.messageService.showWarning(
          'Seleccione la ciudad del operador.',
          'top center'
        );
        return;
      }

      if (this.itemOperador.direccion == '') {
        this.messageService.showWarning(
          'Digite la dirección del operador.',
          'top center'
        );
        return;
      }

      this.itemOperador.iD_TipoEstadoOperador = 2;
    } else {
      if (
        !this.itemOperador.iD_Divipola ||
        this.itemOperador.iD_Divipola == '0'
      ) {
        this.messageService.showWarning(
          'Seleccione la ciudad del operador.',
          'top center'
        );
        return;
      }
    }
    this.itemOperador.telefono = this.itemOperador.telefono.toString();
    this.grabarOperador(tipo);
  }

  grabarOperador(tipo: number) {
    this.loadingVisible = true;

    let response =
      this.itemOperador.id > 0
        ? this._contratosApiService.updateOperador(this.itemOperador)
        : this._contratosApiService.createOperador(this.itemOperador);

    response.subscribe((response) => {
      this.loadingVisible = false;
      if (response.success) {
        if (this.itemOperador.rutPathFile) {
          this.addFileBlobRepositorios(this.itemOperador.rutPathFile);
        }

        if (this.itemOperador.certificadoMAERFile) {
          this.addFileBlobRepositorios(this.itemOperador.certificadoMAERFile);
        }
        if (tipo == 2) {
          // Genera Notificacion y linea de aprobacion
          this.crearlineaprobacionope();
          this.registrarNotificacionService.registerNotification(
            'Se ha enviado el operador a aprobacion',
            'Coordinador PAE'
          );
          this.registrarNotificacionService.registerNotification(
            'Se ha enviado el operador a aprobacion',
            'Líder contratación/Legal'
          );
          this.registrarNotificacionService.registerNotification(
            'Se ha enviado el operador a aprobacion',
            'Líder financiero'
          );
          this.registrarNotificacionService.registerNotification(
            'Se ha enviado el operador a aprobacion',
            'Subdirección Técnica de Fortalecimiento'
          );
        }

        this.cancelar();
        this.getOperadores();
      } else {
        this.messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  getUserNameOperador() {
    const usernameSplit = this.itemOperador.nombreRepresentanteLegal
      .toString()
      .trim()
      .split(' ');
    return usernameSplit.length > 0 ? usernameSplit[0] : null;
  }

  crearlineaprobacionope() {
    this.AprobacionObject.id = 0;
    this.AprobacionObject.iD_AccionAprobacion = 1;
    if (this.itemAprobacion.observaciones == '') {
      this.AprobacionObject.observaciones = 'Ninguno';
    } else {
      this.AprobacionObject.observaciones = this.itemAprobacion.observaciones;
    }
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.AprobacionObject.id_Secciones = this.idSeccion;
    this.AprobacionObject.accion =
      'Completo la información de Documento por Aprobar. ';
    this.AprobacionObject.id_Ubicacion = 4;
    this.AprobacionObject.ubicacionOrigen = this.itemOperador.id.toString();
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.aprobacionesService
      .addAprobaciones(this.AprobacionObject)
      .subscribe((response) => {});
  }

  Actualizarlineaprobacionope() {
    if (this.idRowAprobacion != 0) {
      this.AprobacionObject.id = this.idRowAprobacion;
      this.AprobacionObject.iD_AccionAprobacion = 1;
      if (this.itemAprobacion.observaciones == '') {
        this.AprobacionObject.observaciones = 'Ninguno';
      } else {
        this.AprobacionObject.observaciones = this.itemAprobacion.observaciones;
      }
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_ETC = Number(
        localStorage.getItem('IdUbicacion')
      );
      this.AprobacionObject.id_Secciones = this.idSeccion;
      this.AprobacionObject.accion =
        'Completo la información de Documento por Aprobar. ';
      this.AprobacionObject.id_Ubicacion = 4;
      this.AprobacionObject.fechaAprobacion =
        this.itemAprobacion.fechaAprobacion;
      this.AprobacionObject.ubicacionOrigen = this.itemOperador.id.toString();
      this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
      this.aprobacionesService
        .updateAprobaciones(this.AprobacionObject)
        .subscribe((response) => {});
    }
  }

  createUserOperador() {
    const nombreComp = this.get_NombresUsuario();

    const password = this.get_Password();

    let userDto = {
      id: 0,
      userName: this.itemOperador.correo,
      email: this.itemOperador.correo,
      password: password,
      primerNombre: nombreComp.primerNombre,
      segundoNombre: nombreComp.segundoNombre,
      primerApellido: nombreComp.primerApellido,
      segundoApellido: nombreComp.segundoApellido,
      numeroTelefono: this.itemOperador.telefono.toString(),
      cargo: '',
      respuestaSeguridad: '',
      usuarioAD: '',
      photoPath: '',
      id_Ubicacion: this.itemOperador.id,
      ubicacionBase: 'Operadores',
      id_TipoActor: 5,
      sid_TipoActor: '',
      documentoIden: this.itemOperador.numeroldentificacion,
      id_TipoDocumentoIden: this.itemOperador.iD_Tipoldentificacion,
      idRol: environment.rolIdDefault,
      idRolTempo: '',
      idAspNetUserRolesBase: 0,
      idAspNetUserRolesTempo: 0,
    };

    this.loadingVisible = true;
    this._aspNetUsersService
      .getAspNetUsersListFilterByEmailandDocumentIden(
        this.itemOperador.numeroldentificacion,
        this.itemOperador.correo
      )
      .subscribe(
        (response: any) => {
          let res = response;
          this._aspNetUsersService
            .getAspNetUsersListFilterByEmail(this.itemOperador.correo)
            .subscribe(
              (response: any) => {
                res = res.concat(response);
                this._aspNetUsersService.getAspNetUsersListFilterByEmail(
                  this.itemOperador.correo
                );
                if (res.length == 0) {
                  this._aspNetUsersService.agregarUsuario(userDto).subscribe({
                    next: (response) => {
                      this.loadingVisible = false;
                    },
                    error: (error) => {
                      this.loadingVisible = false;
                      this.messageService.showError(
                        'ERROR al crear el usuario de la aplicación para el proveedor : ' +
                          error,
                        'top center',
                        5000
                      );
                    },
                  });
                }
              },
              (err) => {}
            );
        },
        (err) => {}
      );
    /*  */
  }

  get_NombresUsuario() {
    let nombreCompleto = {
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
    };

    const split = this.itemOperador.nombreRepresentanteLegal
      .split(' ')
      .filter(function (item) {
        return item != null && item != '';
      });

    if (split.length >= 4) {
      nombreCompleto.primerNombre = split[0];
      nombreCompleto.segundoNombre = split[1];
      nombreCompleto.primerApellido = split[2];
      for (let i = 3; i < split.length; i++) {
        nombreCompleto.segundoApellido += split[i] + ' ';
      }
      nombreCompleto.segundoApellido = nombreCompleto.segundoApellido.trim();
      return nombreCompleto;
    }

    if (split.length == 1) {
      nombreCompleto.primerNombre = split[0];
      nombreCompleto.primerApellido = split[0];
      return nombreCompleto;
    }

    if (split.length == 2) {
      nombreCompleto.primerNombre = split[0];
      nombreCompleto.primerApellido = split[1];
      return nombreCompleto;
    }

    if (split.length == 3) {
      nombreCompleto.primerNombre = split[0];
      nombreCompleto.segundoNombre = split[1];
      nombreCompleto.primerApellido = split[2];
      return nombreCompleto;
    }

    return nombreCompleto;
  }

  get_Password() {
    let password = '';
    for (let i = 0; i < this.infoPassword.lengthLetrasMayus; i++) {
      password += this.infoPassword.letrasMayus.charAt(
        Math.floor(Math.random() * this.infoPassword.letrasMayus.length)
      );
    }
    for (let i = 0; i < this.infoPassword.lengthLetrasMinus; i++) {
      password += this.infoPassword.letrasMinus.charAt(
        Math.floor(Math.random() * this.infoPassword.letrasMinus.length)
      );
    }
    for (let i = 0; i < this.infoPassword.lengthNumero; i++) {
      password += this.infoPassword.numeros.charAt(
        Math.floor(Math.random() * this.infoPassword.numeros.length)
      );
    }
    for (let i = 0; i < this.infoPassword.lengthCaracterEsp; i++) {
      password += this.infoPassword.caracterEsp.charAt(
        Math.floor(Math.random() * this.infoPassword.caracterEsp.length)
      );
    }
    return password;
  }

  get_ContratosUTConsorciosOperadores() {
    this.loadingVisible = true;

    this.itemOperador.listConsorcios = [];

    this._contratosApiService
      .get_ContratosUTConsorciosOperadores(this.itemOperador.id)
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.messageService.showError(
              'ERROR: ' + response.error,
              'top center'
            );
            return;
          }

          let result = response.result;
          for (let i = 0; i < result.length; i++) {
            this.itemOperador.listConsorcios.push({
              id: result[i].id,
              iD_Operador: result[i].iD_Operador,
              nombreRazonSocial: result[i].nombreRazonSocial,
              estado: true,
              auditoria: LocalStorage.getAuditoria(''),
            });
          }

          this.itemOperador.cantidadEmpresas =
            this.itemOperador.listConsorcios.length;
        },
        error: (error) => {
          this.messageService.showError('ERROR: ' + error, 'top center');
        },
      });
  }

  get_ContratosOperadorDirecto() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_ContratosPorOperador(this.itemOperador.id)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          response.result.map(function (item: any) {
            item.fechaInicioContratoString = moment(item.fechaInicioContrato)
              .format('DD-MMM-yyyy')
              .toUpperCase();
            item.fechaFinalContratoString = moment(item.fechaFinalContrato)
              .format('DD-MMM-yyyy')
              .toUpperCase();
            return item;
          });

          this.dataContratosOperadorDirecto =
            response.result.length > 0 ? response.result : [{}];
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  get_ContratosUnionTemporalConsorcio() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_ContratosPorOperadorUnion(this.itemOperador.id)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          response.result.map(function (item: any) {
            item.fechaInicioContratoString = moment(item.fechaInicioContrato)
              .format('DD-MMM-yyyy')
              .toUpperCase();
            item.fechaFinalContratoString = moment(item.fechaFinalContrato)
              .format('DD-MMM-yyyy')
              .toUpperCase();
            return item;
          });

          this.dataContratosUnionTemporalConsorcio =
            response.result.length > 0 ? response.result : [{}];
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  enviarResultado() {
    if (this.itemAprobacion.iD_TipoEstadoOperador == 0) {
      this.messageService.showWarning(
        'Seleccione un tipo de estado aprobación.',
        'top center'
      );
      return;
    }

    if (this.itemAprobacion.observaciones == '') {
      this.messageService.showWarning(
        'Digite la observacion/justificacion.',
        'top center'
      );
      return;
    }

    this.grabarAprobacion();
  }

  grabarAprobacion() {
    this.loadingVisible = true;

    this._contratosApiService
      .createAprobacion(this.itemAprobacion)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          this.messageService.showInfo(
            'La aprobación ha sido registrada correctamente.',
            'top center',
            5000
          );
          if (this.itemAprobacion.iD_TipoEstadoOperador == 3) {
            this.itemAprobacion.accion == 'Aprobar';
            this.registrarNotificacionService.registerNotification(
              'Se ha aprobado el operador',
              'Líder contratación/Legal'
            );
            this.registrarNotificacionService.registerNotification(
              'Se ha aprobado el operador',
              'Líder financiero'
            );
          } else {
            this.itemAprobacion.accion == 'Rechazar';
            this.registrarNotificacionService.registerNotification(
              'Se ha aprobado el operador',
              'Líder contratación/Legal'
            );
            this.registrarNotificacionService.registerNotification(
              'Se ha aprobado el operador',
              'Líder financiero'
            );
          }

          this.Actualizarlineaprobacionope();
          this.createUserOperador();

          this.cancelar();
          this.getOperadores();
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_HistoricoAprobacionesPorOperador() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_HistoricoAprobacionesPorOperador(this.itemOperador.id)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          response.result.map(function (item: any) {
            item.fechaAprobacionString = moment(item.fechaAprobacion)
              .format('DD-MMM-yyyy')
              .toUpperCase();
            return item;
          });

          this.dataHistoricoAprobaciones =
            response.result.length > 0 ? response.result : [{}];
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  get_ParticipacionOperador() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_ParticipacionOperador(this.itemOperador.id, this.iD_Vigencia)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (response.success) {
          this.itemParticipacion = response.result;
        } else {
          this.messageService.showError(
            'ERROR: ' + response.error,
            'top center'
          );
        }
      });
  }

  get_Divipolas() {
    this.loadingVisible = true;

    this._masterDataApiService.get_Divipolas().subscribe((response) => {
      this.loadingVisible = false;

      this.listDivipolas = response.result;
    });
  }

  get_SubTiposRegistroMercantil() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_SubTiposRegistroMercantil(this.itemOperador.iD_TipoRegistroMercantil)
      .subscribe((response) => {
        this.loadingVisible = false;
        this.listSubTiposRegistroMercantil = response.result;
      });
  }

  get_TiposIdentificacion() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_TiposIdentificacion()
      .subscribe((response) => {
        this.loadingVisible = false;

        this.listTiposIdentificacion = response.result;
      });
  }

  get_TiposRegistroMercantil() {
    this.loadingVisible = true;

    this._contratosApiService
      .get_TiposRegistroMercantil()
      .subscribe((response) => {
        this.loadingVisible = false;
        this.listTiposRegistroMercantil = response.result;
      });
  }

  atras() {
    this.formVisible = false;
    this.gridVisible = true;
    this.modo = 0;
  }

  resetOperador() {
    this.idRowSelect = 0;
    this.itemOperador = {
      id: 0,
      iD_TipoEstadoOperador: 0,
      iD_TipoRegistroMercantil: 0,
      iD_SubTipoRegistroMercantil: 0,
      iD_Divipola: 0,
      iD_UsuarioEntidad: 1,
      iD_Tipoldentificacion: 0,
      nombreRazonSocial: '',
      nit: '',
      dv: '',
      rutPath: '',
      rutPathFile: null,
      nombreRepresentanteLegal: '',
      apellidoRepresentanteLegal: '.',
      numeroldentificacion: 0,
      correo: '',
      telefono: '',
      direccion: '',
      proveedorPAE: false,
      operadorMAER: false,
      certificadoMAER: '',
      certificadoMAERFile: null,
      operadorMAIP: false,
      operadorMAEM: false,
      operadorPAEC: false,
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      cantidadEmpresas: 0,
      listConsorcios: [],
    };
  }

  nuevoOperador() {
    this.resetOperador();

    this.disabledOperador = false;

    this.gridVisible = false;
    this.formVisible = true;
    this.modo = 1;
  }

  uploadPDF(name: string) {
    const fileUpload = document.getElementById(
      'fileUpload_' + name
    ) as HTMLInputElement;

    const buttonPDF = document.getElementById('buttonPDF');
    const span = document.getElementById('alertaAdjunto');

    const MAXIMO_BYTES = 100000000;
    if (!this.itemOperador.rutPath) {
      span.textContent = 'Complete este campo';
      buttonPDF.className = 'btn-fileUpload borderRed';
    }

    fileUpload.onchange = () => {
      if (!(fileUpload.files?.length && fileUpload.files.length > 0)) {
        fileUpload.value = '';
        return;
      }

      const file = fileUpload.files[0];

      if (file.type != 'application/pdf') {
        fileUpload.value = '';
        this.messageService.showWarning(
          'El formato del archivo no es un PDF',
          'top center'
        );
        return;
      }

      if (!(file.size <= MAXIMO_BYTES)) {
        fileUpload.value = '';
        this.messageService.showWarning(
          'El tamaño del archivo supera los 100MB',
          'top center'
        );
        return;
      }

      this.itemOperador[name + 'File'] = file;
      this.itemOperador[name] = file.name;
    };

    fileUpload.click();
  }

  addFileBlobRepositorios(file): void {
    const formData = new FormData();
    formData.append('file', file);

    let fileUpload: fileUploadModel = {
      file: formData,
      fileName: file.name,
      cnx: environment.cnxBS,
      container: environment.containerFiles,
    };

    this.servicios.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {},
      (err) => {
        this.messageService.showError(
          "Error al subir el documento '" + file.name + "'",
          'top center',
          5000
        );
      }
    );
  }

  abrirPDF(contenido: any, name: string) {
    if (this.itemOperador[name + 'File']) {
      this.downloadFile(
        this.itemOperador[name + 'File'],
        this.itemOperador[name]
      );
    } else {
      this.downloadFileRuta(this.itemOperador[name]);
    }
  }

  downloadFile(file, fileName): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const link = document.createElement('a');
      link.href = reader.result?.toString();
      link.download = fileName;
      link.click();
    };
  }

  downloadFileRuta(nombreArchivo: string): void {
    let _fileUpload: fileUploadModel = {
      file: null,
      fileName: nombreArchivo,
      cnx: environment.cnxBS,
      container: environment.containerFiles,
    };

    this.servicios.downloadFileBlobRepositorios(_fileUpload, 'sd').subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, nombreArchivo);
      },
      (err) => {}
    );
  }

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  get_Color(numberColor: number) {
    if (numberColor == 1) {
      return 'bg-green';
    } else if (numberColor == 2) {
      return 'bg-yellow';
    } else if (numberColor == 3) {
      return 'bg-red';
    } else if (numberColor == 4) {
      return 'bg-grey';
    } else {
      return '';
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  validarSubTipoRegistroMercantil(): boolean {
    const isValid =  this.itemOperador.iD_SubTipoRegistroMercantil === TiposUnionesTemporales.SIN_ANIMO_LUCRO ||
      this.itemOperador.iD_SubTipoRegistroMercantil === TiposUnionesTemporales.ENTIDAD_MERCANTIL ||
      this.itemOperador.iD_SubTipoRegistroMercantil === TiposConsorcios.SIN_ANIMO_LUCRO ||
      this.itemOperador.iD_SubTipoRegistroMercantil === TiposConsorcios.ENTIDAD_MERCANTIL

    if (isValid) {
      return true;
    }

    this.itemOperador.listConsorcios = [];
    this.itemOperador.cantidadEmpresas = 0;
    return false;
  }
}
