import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { LocalStorage } from 'src/app/static/local-storage';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { ZonasModel } from 'src/app/shared/model/Zonas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateMayorCero } from 'src/app/static/formGroupValidator';
import { TipoMinutaMAER } from 'src/app/shared/constants/tipo-minuta-maer.constant';
import { SubgrupoMinutaMAER } from 'src/app/shared/constants/subgrupo-minuta-maer.constant';
import { GrupoMinutaMAER } from 'src/app/shared/constants/grupo-minuta-maer.constant';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponenteComponent } from 'src/app/pages/components/minutas/shared/composicion-reglas/modal-editar-componente/modal-editar-componente.component';
import Swal from 'sweetalert2';
import { TipoComponenteMinuta } from 'src/app/shared/constants/tipo-componente-minuta.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minutas-excepcional',
  //providers: [MinutasApiService, MasterDataApiService],
  templateUrl: './minutas-excepcional.component.html',
  styleUrls: ['./minutas-excepcional.component.scss'],
})
export class MinutasExcepcionalComponent implements OnInit, OnDestroy {
  readonly TipoComponenteMinuta = TipoComponenteMinuta;
  estadoNivel = {
    completo: 'Completo',
    incompleto: 'Incompleto',
  };

  bgColor = {
    bgYellow: 'bg-yellow',
    bgGreen: 'bg-green',
  };

  aportes = [
    {
      title: 'Aporte mínimo:',
      description: 'Corresponse al aporte promedio diario de la minuta patrón.',
    },
    {
      title: 'Recomendación diaria:',
      description:
        'Corresponse a los valores de calorías, macro y micronutrientes que necesita un niño, niña o adolescente (NNA) diariamente, según las recomendaciones de ingesta de energia y nutrientes (RIEN) que establece a nivel nacional el Ministerio de Salud y Protección Social.',
    },
    {
      title: 'Regla de adecuación:',
      description:
        'Corresponde al porcentaje de adecuación mínimo o máximo establecido por la UApA.',
    },
  ];

  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? '0');
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;
  iD_TipoModeloOperacionMAEM: number = 1;
  numberBadge: string = '1';
  menusigepae = localStorage.getItem('MenuSigepae');
  menuuapa = localStorage.getItem('MenuSigenaUapa');
  public readonly TipoComplementoAlmuerzo = 1;
  public readonly subgrupoMinutaMAER = SubgrupoMinutaMAER;
  public readonly grupoMinutaMAER = GrupoMinutaMAER;

  private subs = new Subscription();

  public readonly ID_TIPO_COMPONENTE_LECHE_O_PRODUCTOS_LACTEOS: number = 13;

  itemAprobacion: any = {
    id: 0,
    fechaAprobacion: new Date(),
    iD_TipoEstadoMinuta: 0,
    responsable: environment.responsable,
    rolResponsable: environment.rolResponsable,
    accion: '',
    observaciones: '',
    estado: true,
    auditoria: LocalStorage.getAuditoria('Crear'),
  };

  public ID_NutrienteZinc: number = 13;
  public ID_NutrienteVitaminaA: number = 15;
  public ID_NutrienteSodio: number = 4;

  estadoMinuta: any = {
    creado: 1,
    PoraprobarETC: 2, // Por aprobar etc
    porAprobarUAPA: 3, // Por aprobar UAPA
    porAprobar: 4, // Por aprobar
    porAprobarConObs: 5,
    aprobado: 6,
    rechazado: 7,
  };

  zonasList: ZonasModel[];

  srcPDF: any;
  fileName: string;
  dataTabla: any[] = [];
  itemsPerPages: number[] = [10, 15, 20];
  itemCant: number = 10;
  itemIni: number = 0;
  itemFin: number = 0;
  pages: number = 0;
  page: number = 0;
  disabledFirstPage: boolean = true;
  disabledPreviousPage: boolean = true;
  disabledNextPage: boolean = true;
  disabledLastPage: boolean = true;

  loadingVisible: boolean = false;

  itemModalidad: any = {};
  itemTipoComplemento: any = {};
  itemActividadFisica: any = {};
  textButtonAprobar: string = '';
  gridVisible: boolean = true;
  formVisible1: boolean = false;
  formVisible2: boolean = false;
  itemSelect: any = { id: 0, nombre: 'Elija una opción' };
  dataMinutasEx: any = [];
  listTiposModeloOperacion: any;
  listTiposActividadFisica: any;
  Minref: boolean = false;
  public NivEdu: boolean = true;
  listVigenciasAnteriores: any;
  listTiposModalidadRacion: any;
  listTiposRacion: any;
  listTiposNivelEducativo: any;
  listFrecuencias: any;
  objNivelEducativo: any = {};
  listMinutasAprobaciones: any = [];
  iD_MinutaPatronAlimento = 0;
  itemComponente: any; //= {}
  itemComponentevacio: any = {
    listAlimentoComponente: [],
  };
  dataSourceComponentes: any;
  dataSourceComponentesPrep = [];
  dataSourceComponentesMaer: any;
  dataSourceComponentesPrepMaer = [];

  itemsDisabled = false;
  dataMacroNutrientes: any = [];
  dataMicroNutrientes: any = [];
  public readonly tipoMinutaMAER = TipoMinutaMAER.DIFERENCIAL;
  public readonly ID_MODELOOPEPAEPI: number = 3;

  itemMinutaExcepcional: any = {
    nombre: '',
    iD_ETC: this.idETC,
    iD_TipoModeloOperacion: 0,
    iD_Vigencia: this.idVigencia,
    vigenciaAnterior: 0,
    iD_VigenciaReferencia: 0,
    iD_TiposModalidadComplemento: 0,
    iD_TiposRacion: 0,
    iD_NivelActividadFisica: 0,
    iD_TipoEstadoMinuta: 0,
    recomendaciones: '',
    auditoria: 'sistema',
  };

  dataModelosOpe: any = [
    {
      id: 1,
      nombre: 'Minuta Patrón Modelo de Alimentación Escolar Mayoritario MAEM',
    },
    { id: 2, nombre: 'Minuta Patrón Modelo de Alimentación Escolar MAER' },
  ];

  dataMinutas: any = [];

  permisos = {
    agregar: false,
    aprobar: false,
    editar: false,
    editarseg: false,
    eliminar: false,
    editarCampo: false,
    modoedicion: false,
  };

  public addOrDeleteList = {
    val1: false, //Leche
    val2: false, //Alimento Proteico
    val3: false, //Cereal Acompañante
    val4: false, //Fruta
    val5: false, //Azucares
    val6: false, //Grasas
    val7: false, //Agua
  };

  submittedMinutaCreacion = false;
  mostrarTodoCreacionMinuta = false;
  formMinutaCreacion: FormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required]],
    iD_TipoModeloOperacion: [0, [Validators.required, ValidateMayorCero()]],
    iD_VigenciaReferencia: [0],
    iD_NivelActividadFisica: [0],
    iD_TiposModalidadComplemento: [0],
    iD_TiposRacion: [0, [Validators.required, ValidateMayorCero()]],
    iD_Zona: [0],
    iD_TipoModeloOperacionRef: [0],
    iD_MinutaRefPAEPI: [null],
    iD_TipoModeloOperacionRefPAEPI: [null],
    iD_MinutaAprobacion: [null],
  });

  dataMinutasRefPAEPI: any = [];
  AlimentoProteicoSubGrupoIA: boolean = false;
  AlimentoProteicoSubGrupoII: boolean = false;
  dataSourceAlimentoProteico: any;
  itemComponenteGrupos: any;
  dataSourceComponentesBackup = [];

  get f() {
    return this.formMinutaCreacion.controls;
  }

  public tabSelected: number = 1;

  bgColorChapterRed: boolean;
  bgColorChapterBlue: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _minutasApiService: MinutasApiService,
    private _masterdataApiService: MasterDataApiService,
    private _seguridadService: SeguridadService,
    private _messageService: MessageService,
    private _zonasService: ZonasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.get_MinutasExcepcional();
    this.get_TiposModeloOperacion();
    this.get_TiposActividadFisica();
    this.get_Frecuencias();
    this.getZonasMinuta();

    if (this.menusigepae == 'true') {
      this.permisos.editar = this._seguridadService.getModulePermission(
        42,
        'editar'
      );
      this.permisos.editarseg = this._seguridadService.getModulePermission(
        42,
        'editar'
      );
      this.bgColorChapterRed = true;
      this.permisos.agregar = this._seguridadService.getModulePermission(
        42,
        'crear'
      );
      this.permisos.aprobar = this._seguridadService.getModulePermission(
        42,
        'aprobar'
      );
      this.permisos.eliminar = this._seguridadService.getModulePermission(
        42,
        'eliminar'
      );
    }
    if (this.menuuapa == 'true') {
      this.bgColorChapterBlue = true;
      //this.permisos.editar  = this._seguridadService.getModulePermission(110, 'editar');
      this.bgColorChapterRed = true;
      //this.permisos.agregar = this._seguridadService.getModulePermission(110, 'crear');
      //this.permisos.aprobar = this._seguridadService.getModulePermission(110, 'aprobar');
      //this.permisos.eliminar = this._seguridadService.getModulePermission(110, 'eliminar');
    }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  editarMinuta() {
    this.permisos.modoedicion = true;
    this.validarEstadoCampos();
  }

  /* Minutas Maer */
  dataSourceComponentesMod(data) {
    this.dataSourceComponentesMaer = data;
  }
  dataSourceComponentesPrepMod(data) {
    this.dataSourceComponentesPrepMaer = data;
  }

  dataMacroNutrientesMod(data) {
    this.dataMacroNutrientes = data;
  }
  dataMicroNutrientesMod(data) {
    this.dataMicroNutrientes = data;
  }

  /* fin maer*/

  dismissAllModal() {
    this._modalService.dismissAll();
  }

  validarEstadosNiveles(nuevo: boolean) {
    this._minutasApiService
      .get_ValidacionEstadoMinutaExcepcional(this.itemMinutaExcepcional)
      .subscribe({
        next: (response) => {
          this.loadingVisible = false;

          if (!response.success) {
            this._messageService.showError(
              'ERROR: ' + response.error,
              'top center',
              5000
            );
            return;
          }

          const result = response.result;

          this.listTiposNivelEducativo.map(function (item: any) {
            const validacion = result.find(
              (x) => x.iD_MinutaPatronAlimento == item.iD_MinutaPatronAlimento
            )?.validacion;
            if (validacion && !nuevo) {
              item.estadoMinuta = 'Completo';
              item.bgEstadoMinuta = 'bg-green';
            } else if (!nuevo) {
              item.estadoMinuta = 'Incompleto';
              item.bgEstadoMinuta = 'bg-yellow';
            } else {
              item.estadoMinuta = 'Pendiente';
              item.bgEstadoMinuta = 'bg-grey';
            }
          });
        },
        error: (error) => {
          this.loadingVisible = false;
          this._messageService.showError('ERROR: ' + error, 'top center', 5000);
        },
      });
  }

  abrirPDF(contenido: any) {
    if (this.itemMinutaExcepcional.archivoResolucion != null) {
      this.srcPDF =
        'data:application/pdf;base64,' +
        this.itemMinutaExcepcional.archivoResolucion;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  uploadPDF() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        this.fileName = file.name;
        this.itemMinutaExcepcional.archivoResolucion = '';

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {
            this.fileName = file.name;
            this.itemMinutaExcepcional.nombreArchivoResolucion = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.itemMinutaExcepcional.archivoResolucion = reader.result
                ?.toString()
                .replace('data:application/pdf;base64,', '');
            };
          } else {
            fileUpload.value = '';
            this._messageService.showWarning(
              'El tamaño del archivo supera los 100MB',
              'top center',
              5000
            );
          }
        } else {
          fileUpload.value = '';
          this._messageService.showWarning(
            'El formato del archivo no es un PDF',
            'top center',
            5000
          );
        }
      }
    };

    fileUpload.click();
  }

  EditarMinuta() {}

  eliminarMinuta() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important;">¿Está seguro de que desea eliminar la minuta ' +
        this.itemMinutaExcepcional.nombre +
        '?</p><p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important;">' +
        'Esta acción no se puede revertir.</p>',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonColor: '#005ACB',
      cancelButtonColor: '#005ACB',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Aceptar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        this.confirmarEliminacion();
      }
    });
  }

  changeCantItems(value: any) {
    this.itemCant = value;
    this.pages = Math.ceil(this.dataMinutasEx.length / value);
    this.page = this.dataMinutasEx.length > 0 ? 1 : 0;

    this.changePageInfo();
  }

  changePageInfo() {
    this.dataTabla = [];
    this.disabledFirstPage = true;
    this.disabledPreviousPage = true;
    this.disabledNextPage = true;
    this.disabledLastPage = true;

    if (this.page > 0) {
      this.itemIni = (this.page - 1) * this.itemCant + 1;
      this.itemFin = this.page * this.itemCant;
      if (this.itemFin > this.dataMinutasEx.length) {
        this.itemFin = this.dataMinutasEx.length;
      }

      for (let i = this.itemIni - 1; i < this.itemFin; i++) {
        this.dataTabla.push(this.dataMinutasEx[i]);
      }

      if (this.page > 1) {
        this.disabledFirstPage = false;
        this.disabledPreviousPage = false;
      }

      if (this.page < this.pages) {
        this.disabledNextPage = false;
        this.disabledLastPage = false;
      }
    } else {
      this.itemIni = 0;
      this.itemFin = 0;
    }
  }

  changePage(tipo: number, page: number, disabled: boolean) {
    if (!disabled) {
      if (tipo == 1) {
        this.page =
          page > 0 ? Math.ceil(this.dataMinutasEx.length / this.itemCant) : 1;
        this.changePageInfo();
      } else if (tipo == 2) {
        this.page += page > 0 ? 1 : -1;
        this.changePageInfo();
      }
    }
  }

  get_MinutasExcepcional() {
    this._minutasApiService
      .get_MinutasExcepcional(this.idETC, this.idVigencia)
      .subscribe((response) => {
        if (response.success) {
          response.result.map(function (item: any) {
            if (item.iD_TipoModeloOperacion != 3) {
              item.nombreModeloOperacion = item.nombreModeloOperacion.substring(
                0,
                4
              );
            } else {
              item.nombreModeloOperacion = item.nombreModeloOperacion.substring(
                0,
                5
              );
            }

            // Color Estado
            if (item.colorEstado == 1) {
              item.bgEstadoMinuta = 'bg-green';
            } else if (item.colorEstado == 2) {
              item.bgEstadoMinuta = 'bg-yellow';
            } else if (item.colorEstado == 3) {
              item.bgEstadoMinuta = 'bg-red';
            } else if (item.colorEstado == 4) {
              item.bgEstadoMinuta = 'bg-grey';
            } else {
              item.bgEstadoMinuta = '';
            }

            return item;
          });

          this.dataMinutasEx = response.result;
          this.changeCantItems(this.itemsPerPages[0]);
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  ver_NivelEducativos(item: any) {
    this.itemMinutaExcepcional = {
      nombre: item.nombre,
      iD_ETC: this.idETC,
      iD_TipoModeloOperacion: item.iD_TipoModeloOperacion,
      iD_TipoMinutaPatron: environment.iD_TipoMinutaPatronExcepcional,
      iD_Vigencia: this.idVigencia,
      iD_VigenciaReferencia: 0,
      iD_TiposModalidadComplemento: item.modalidadRacionId,
      iD_TiposRacion: item.tipoRacionId,
      iD_NivelActividadFisica: item.tipoActividadFisicaId,
      iD_TipoEstadoMinuta: item.iD_TipoEstadoMinuta,
      iD_TipoEstadoMinutaNew: 0,
      iD_MinutaAprobacion: item.iD_MinutaAprobacion,
      rechazado: item.rechazado,
      iD_TipoModeloOperacionRef: item.iD_TipoModeloOperacionBase,
      auditoria: LocalStorage.getAuditoria(''),
      manejaNivelEducativo: item.manejaNivelEducativo,
      estado: item.estado,
    };
    this.NivEdu = item.manejaNivelEducativo;

    this.itemTipoComplemento = {
      id: item.tipoRacionId,
      nombre: item.nombreTipoRacion.toUpperCase(),
    };

    this.itemModalidad = {
      id: item.modalidadComplementoId,
      nombre: item.nombreModalidadRacion,
    };

    this.itemActividadFisica = {
      id: item.tipoActividadFisicaId,
      nombre: item.nombreTipoActividadFisica,
    };
    this.permisos.editar = this.permisos.editarseg;
    this.permisos.modoedicion = false;
    this.objNivelEducativo.recomendaciones = '';
    this.textButtonAprobar =
      this.estadoMinuta.PoraprobarETC ==
      this.itemMinutaExcepcional.iD_TipoEstadoMinuta
        ? 'Por Aprobar UAPA'
        : this.estadoMinuta.porAprobarUAPA ==
          this.itemMinutaExcepcional.iD_TipoEstadoMinuta
        ? 'Por Aprobar'
        : 'Aprobar';

    this.validarEstadoCampos();
    this.get_NivelEducativoMinutas(false);
  }

  validarEstadoCampos() {
    if (
      this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
        this.estadoMinuta.creado ||
      this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
        this.estadoMinuta.rechazado
    ) {
      if (this.permisos.modoedicion) {
        this.permisos.editarCampo = this.permisos.agregar;
      } else {
        this.permisos.editarCampo = false;
      }
    } else {
      this.permisos.editarCampo = false;
      this.permisos.editar = false;
    }
  }

  agregarMinutaExcepcional() {
    this.submittedMinutaCreacion = false;
    this.mostrarTodoCreacionMinuta = false;
    this.formMinutaCreacion = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      iD_TipoModeloOperacion: [0, [Validators.required, ValidateMayorCero()]],
      iD_VigenciaReferencia: [0],
      iD_NivelActividadFisica: [0],
      iD_TiposModalidadComplemento: [0],
      iD_TiposRacion: [0, [Validators.required, ValidateMayorCero()]],
      iD_Zona: [0],
      iD_TipoModeloOperacionRef: [0],
      iD_MinutaRefPAEPI: [null],
      iD_TipoModeloOperacionRefPAEPI: [null],
      iD_MinutaAprobacion: [null],
    });
    this.objNivelEducativo.justificacion = '';
    this.NivEdu = true;
    this.gridVisible = false;
    this.formVisible1 = true;
    this.permisos.editar = false;
    this.permisos.modoedicion = true;
  }

  cancelarMinutaExcepcional() {
    this.formVisible1 = false;
    this.gridVisible = true;
  }

  changeModel(item: any, name: string, value: any) {
    item[name] = value;
    if (name == 'iD_NivelActividadFisica') {
      for (let i = 0; i < this.listTiposActividadFisica.length; i++) {
        if (this.listTiposActividadFisica[i].id == value) {
          this.itemActividadFisica = {
            id: value,
            nombre: this.listTiposActividadFisica[i].nombre,
          };

          break;
        }
      }
    } else if (name == 'vigenciaAnterior') {
      item['iD_VigenciaReferencia'] = 0;

      if (value > 0) {
        this.get_VigenciasAnteriores();
      }
    } else if (name == 'iD_TipoModeloOperacion') {
      item['vigenciaAnterior'] = 0;
      item['iD_VigenciaReferencia'] = 0;
      item['iD_TiposModalidadComplemento'] = 0;

      if (value > 0) {
        this.get_TiposModalidadRacion();
        // Se carga para cuando es maer
        this.get_TiposRacion();
      }
    } else if (name == 'iD_VigenciaReferencia') {
      if (value > 0) {
        const itemVigenciaAnterior = this.listVigenciasAnteriores.filter(
          (x) => x.idResultado == value
        )[0];
        item['iD_NivelActividadFisica'] =
          itemVigenciaAnterior.tipoActividadFisicaId;
        item['iD_TiposModalidadComplemento'] =
          itemVigenciaAnterior.modalidadComplementoId;
        item['iD_TiposRacion'] = itemVigenciaAnterior.tipoComplementoId;

        this.get_TiposRacion();
      } else {
        item['iD_NivelActividadFisica'] = 0;
        item['iD_TiposModalidadComplemento'] = 0;
        item['iD_TiposRacion'] = 0;
      }
    } else if (name == 'iD_TiposModalidadComplemento') {
      item['iD_TiposRacion'] = 0;
      if (value > 0) {
        this.get_TiposRacion();
      }
    } else if (name == 'iD_MinutaRefPAEPI') {
      this.NivEdu = false;
      item[name] = value;
      this.changeMinutaRefPAEPI();
    } else if (name == 'iD_TipoModeloOperacionRef') {
      this.formMinutaCreacion
        .get('iD_TipoModeloOperacionRefPAEPI')
        .setValue(value);
      this.get_TiposRacionRef(
        this.formMinutaCreacion.get('iD_TipoModeloOperacionRefPAEPI').value
      );
      if (
        this.formMinutaCreacion.get('iD_TipoModeloOperacionRefPAEPI').value == 2
      ) {
        this.NivEdu = false;
      }
    }
  }

  disableMinref(value: any, name: string, valBoolean: boolean) {
    this[name] = valBoolean;
    if (name == 'Minref') {
      this.changeUsoMinPAEPI();
    }
  }

  disableNivEdu(value: any, name: string, valBoolean: boolean) {
    if (
      this.formMinutaCreacion.get('iD_TipoModeloOperacionRefPAEPI').value ==
        2 &&
      name == 'NivEdu'
    ) {
      return;
    }
    this[name] = valBoolean;
  }

  changeModelJustificacion(item: any, name: string, value: any) {
    item[name] = value;
    for (let i = 0; i < this.listTiposNivelEducativo.length; i++) {
      this.listTiposNivelEducativo[i].justificacion =
        this.objNivelEducativo.justificacion.trim();
      this.listTiposNivelEducativo[i].recomendaciones =
        this.objNivelEducativo.recomendaciones.trim();
    }
  }

  changeModelMinuta(name: string, value: any, item: any) {
    item[name] = value;
    if (name == 'frecuencia') {
      for (let i = 0; i < this.listFrecuencias.length; i++) {
        if (this.listFrecuencias[i].id == value) {
          item['nombreFrecuencia'] = this.listFrecuencias[i].nombre;
          break;
        }
      }
    }
  }

  showAlert() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 8% !important; right: 20px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem;">La adecuación nutricional de esta minuta no cumple los mínimos nutricionales exigidos. </p> ',
      showConfirmButton: false,
      showCancelButton: false,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: false,
      denyButtonText: `Aceptar`,
    }).then((result) => {});
  }

  validateAlert(
    item: any,
    modalidad: any,
    actividadFisica: any,
    tipoComplemento: any
  ) {
    if (
      (item['porcentajeAdecuacionMin'] * 100 < 20 &&
        tipoComplemento.id == 2 &&
        (modalidad.id == 1 || modalidad.id == 3 || modalidad.id == 2) &&
        actividadFisica.id == 2) ||
      (item['porcentajeAdecuacionMin'] * 100 < 25 &&
        tipoComplemento.id == 2 &&
        (modalidad.id == 1 || modalidad.id == 3 || modalidad.id == 2) &&
        actividadFisica.id == 1) ||
      (item['porcentajeAdecuacionMin'] * 100 < 30 &&
        tipoComplemento.id == 1 &&
        (modalidad.id == 1 || modalidad.id == 3) &&
        actividadFisica.id == 2) ||
      (item['porcentajeAdecuacionMin'] * 100 < 35 &&
        tipoComplemento.id == 1 &&
        (modalidad.id == 1 || modalidad.id == 3) &&
        actividadFisica.id == 1)
    ) {
      this.showAlert();
    }
  }

  changeModelMinutaNutriente(name: string, value: any, item: any) {
    item[name] = value;

    // if(name == 'aporteRecomendado'){
    //   this.setValueRecomendado(item);
    // }

    if (item['aporteRecomendadoMin'] > 0) {
      const sValor = (
        item['aporteMinimo'] / item['aporteRecomendadoMin']
      ).toString();
      item['porcentajeAdecuacionMin'] = parseFloat(sValor).toFixed(2);
    } else {
      item['porcentajeAdecuacionMin'] = 0;
    }
  }

  setValueRecomendado(item: any) {
    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      if (this.dataMacroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = (
          (item.aporteRecomendado * this.dataMacroNutrientes[i].porcentaje) /
          this.dataMacroNutrientes[i].valorConstante
        ).toString();
        this.dataMacroNutrientes[i].aporteRecomendado =
          parseFloat(sValor).toFixed(2);
      }
    }

    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      if (this.dataMicroNutrientes[i].id_NutrienteBase == item.idNutriente) {
        const sValor = (
          (item.aporteRecomendado * this.dataMicroNutrientes[i].porcentaje) /
          this.dataMicroNutrientes[i].valorConstante
        ).toString();
        this.dataMicroNutrientes[i].aporteRecomendado =
          parseFloat(sValor).toFixed(2);
      }
    }
  }

  siguiente() {
    if (
      this.formMinutaCreacion.get('nombre').invalid ||
      this.formMinutaCreacion.get('iD_TipoModeloOperacion').invalid
    ) {
      this.submittedMinutaCreacion = true;
      return;
    }

    this.submittedMinutaCreacion = false;
    this.mostrarTodoCreacionMinuta = true;
  }

  changeUsoMinPAEPI() {
    if (this.Minref) {
      this._minutasApiService
        .get_MinutaExepcionalPAEPI(this.idETC)
        .subscribe((response: any) => {
          if (!response.success) {
            return;
          }
          this.dataMinutasRefPAEPI = response.result;
          this.formMinutaCreacion.get('iD_MinutaRefPAEPI').setValue(0);
          this.formMinutaCreacion
            .get('iD_TipoModeloOperacionRefPAEPI')
            .setValue(0);
          this.formMinutaCreacion.get('iD_NivelActividadFisica').disable();
          this.formMinutaCreacion.get('iD_TiposModalidadComplemento').disable();
          this.formMinutaCreacion.get('iD_TiposRacion').disable();
        });
    } else {
      this.formMinutaCreacion.patchValue({
        iD_TipoModeloOperacionRefPAEPI: 0,
        iD_NivelActividadFisica: 0,
        iD_TiposModalidadComplemento: 0,
        iD_TiposRacion: 0,
        iD_MinutaAprobacion: 0,
      });
      this.formMinutaCreacion.get('iD_NivelActividadFisica').enable();
      this.formMinutaCreacion.get('iD_TiposModalidadComplemento').enable();
      this.formMinutaCreacion.get('iD_TiposRacion').enable();
    }
  }

  changeMinutaRefPAEPI() {
    const item = this.dataMinutasRefPAEPI.filter(
      (x) =>
        x.iD_MinutaAprobacion ==
        this.formMinutaCreacion.get('iD_MinutaRefPAEPI').value
    )[0];
    this.formMinutaCreacion
      .get('iD_TipoModeloOperacionRefPAEPI')
      .setValue(item.iD_TipoModeloOperacion);
    this.formMinutaCreacion.patchValue({
      iD_NivelActividadFisica: item.tipoActividadFisicaId,
      iD_TiposModalidadComplemento: item.modalidadComplementoId,
      iD_TiposRacion: item.tipoComplementoId,
      //iD_MinutaAprobacion: item.iD_MinutaAprobacion,
      iD_TipoModeloOperacionRef: item.iD_TipoModeloOperacionRef,
    });
    this.NivEdu = item.manejaNivelEducativo;
    this.get_TiposRacion();
  }

  siguienteCrearMinuta() {
    if (this.formMinutaCreacion.get('iD_TipoModeloOperacion').value == 2) {
      if (
        this.formMinutaCreacion.get('nombre').invalid ||
        this.formMinutaCreacion.get('iD_TipoModeloOperacion').invalid ||
        this.formMinutaCreacion.get('iD_TiposRacion').invalid
      ) {
        this.submittedMinutaCreacion = true;
        return;
      }
    }
    if (this.formMinutaCreacion.get('iD_TipoModeloOperacion').value == 3) {
      if (this.formMinutaCreacion.get('iD_TipoModeloOperacionRef').invalid) {
        this.submittedMinutaCreacion = true;
        return;
      }
    } else if (this.formMinutaCreacion.invalid) {
      this.submittedMinutaCreacion = true;
      return;
    } else if (
      this.formMinutaCreacion.get('iD_TipoModeloOperacion').value == 1
    ) {
      if (this.formMinutaCreacion.get('iD_Zona').value == 0) {
        this.submittedMinutaCreacion = true;
        return;
      }
    }

    this.itemMinutaExcepcional = {
      nombre: this.formMinutaCreacion.get('nombre').value,
      iD_ETC: this.idETC,
      iD_MinutaAprobacion: this.Minref
        ? this.formMinutaCreacion.get('iD_MinutaAprobacion').value
        : 0,
      iD_TipoModeloOperacion: this.formMinutaCreacion.get(
        'iD_TipoModeloOperacion'
      ).value,
      iD_TipoMinutaPatron: environment.iD_TipoMinutaPatronExcepcional,
      iD_Vigencia: this.idVigencia,
      vigenciaAnterior: 0,
      iD_VigenciaReferencia: this.formMinutaCreacion.get(
        'iD_VigenciaReferencia'
      ).value,
      iD_TipoModeloOperacionRef: this.formMinutaCreacion.get(
        'iD_TipoModeloOperacionRef'
      ).value,
      iD_TiposModalidadComplemento: this.formMinutaCreacion.get(
        'iD_TiposModalidadComplemento'
      ).value,
      iD_TiposRacion: this.formMinutaCreacion.get('iD_TiposRacion').value,
      iD_NivelActividadFisica: this.formMinutaCreacion.get(
        'iD_NivelActividadFisica'
      ).value,
      iD_TipoEstadoMinuta: this.estadoMinuta.creado,
      manejaNivelEducativo: this.NivEdu,
      ID_MinutaAprobacionRef:
        this.formMinutaCreacion.get('iD_MinutaRefPAEPI').value,
      recomendaciones: '',
      auditoria: LocalStorage.getAuditoria(''),
    };

    // if (!this.itemMinutaExcepcional.nombre || this.itemMinutaExcepcional.nombre.trim() == "") {
    //   this._messageService.showWarning('Digite el nombre de la minuta', 'top center', 5000);
    //   return;
    // }

    // if (!this.itemMinutaExcepcional.iD_TipoModeloOperacion || this.itemMinutaExcepcional.iD_TipoModeloOperacion <= 0) {
    //   this._messageService.showWarning('Seleccione un modelo de operación.', 'top center', 5000);
    //   return;
    // }

    // if (this.itemMinutaExcepcional.vigenciaAnterior == 1 && this.itemMinutaExcepcional.iD_VigenciaReferencia <= 0) {
    //   this._messageService.showWarning('Seleccione una vigencia anterior.', 'top center', 5000);
    //   return;
    // }

    // if (!this.itemMinutaExcepcional.iD_NivelActividadFisica || this.itemMinutaExcepcional.iD_NivelActividadFisica <= 0) {
    //   this._messageService.showWarning('Seleccione una actividad fisíca.', 'top center', 5000);
    //   return;
    // }

    // if (!this.itemMinutaExcepcional.iD_TiposModalidadComplemento || this.itemMinutaExcepcional.iD_TiposModalidadComplemento <= 0) {
    //   this._messageService.showWarning('Seleccione una modalidad ración.', 'top center', 5000);
    //   return;
    // }

    // if (!this.itemMinutaExcepcional.iD_TiposRacion || this.itemMinutaExcepcional.iD_TiposRacion <= 0) {
    //   this._messageService.showWarning('Seleccione un tipo de ración.', 'top center', 5000);
    //   return;
    // }

    for (let i = 0; i < this.listTiposRacion.length; i++) {
      if (
        this.listTiposRacion[i].id == this.itemMinutaExcepcional.iD_TiposRacion
      ) {
        this.itemTipoComplemento = {
          id: this.listTiposRacion[i].id,
          nombre: this.listTiposRacion[i].nombre.toUpperCase(),
        };
        break;
      }
    }

    for (let i = 0; i < this.listTiposModalidadRacion.length; i++) {
      if (
        this.listTiposModalidadRacion[i].id ==
        this.itemMinutaExcepcional.iD_TiposModalidadComplemento
      ) {
        this.itemModalidad = {
          id: this.listTiposModalidadRacion[i].id,
          nombre: this.listTiposModalidadRacion[i].nombre.toUpperCase(),
        };
        break;
      }
    }

    this.validarEstadoCampos();
    this.get_NivelEducativoMinutas(true);
  }

  changeCheckNiveles(event, item) {
    item['estado'] = event.target.checked;
    if (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 && this.NivEdu) {
      this.UpdateCambiarEstadoMinuta(item.iD_MinutaPatronAlimento, item.estado);
      this.validarEstadoCampos();
    }
  }

  get_NivelEducativoMinutas(refreshGrid: boolean) {
    this.loadingVisible = true;
    this._minutasApiService
      .get_ValidacionMinutaExcepcionalCreacion(this.itemMinutaExcepcional)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
          return;
        }

        const result = response.result;
        let message = '';
        let existeExcepcional = false;

        for (let i = 0; i < result.length; i++) {
          if (!result[i].existe) {
            message += result[i].nivelEducativo + '\r';
          }

          if (result[i].existeExcepcional) {
            existeExcepcional = true;
          }
        }

        if (message != '') {
          message =
            'Debe crear minutas para este(os) nivel(es) educativo:\r' + message;
          this._messageService.showWarning(
            'Para poder crear una minuta excepcional debe existir una minuta patrón asignada por la UApA, por favor comuníquese con la UApA para continuar con el proceso.',
            'top center',
            5000
          );
          return;
        }

        this.listTiposNivelEducativo = result;
        this.itemMinutaExcepcional.iD_MinutaAprobacion =
          result[0].iD_MinutaAprobacion;
        this.iD_MinutaPatronAlimento = result[0].iD_MinutaPatronAlimento;
        if (
          this.itemMinutaExcepcional.iD_TipoModeloOperacion != 2 ||
          (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
            this.itemMinutaExcepcional.iD_TipoModeloOperacionRef != 2)
        ) {
          if (existeExcepcional) {
            this.validarEstadosNiveles(false);
          } else {
            this.validarEstadosNiveles(true);
          }
          this.clickTabNivelEducativo(this.listTiposNivelEducativo[0], true);
        }
        {
          //this.get_AlimentosMinutaMAER(this.iD_MinutaPatronAlimento);
        }

        if (
          this.itemMinutaExcepcional.iD_TipoEstadoMinuta !=
            this.estadoMinuta.creado &&
          this.itemMinutaExcepcional.iD_TipoEstadoMinuta !=
            this.estadoMinuta.rechazado
        ) {
          this.get_HistoricoAprobacion();
        }

        if (refreshGrid) {
          if (existeExcepcional) {
            this._messageService.showWarning(
              'Ya existe una minuta excepcional con los mismo datos y no se puede editar',
              'top center',
              5000
            );
            return;
          }

          this.get_MinutasExcepcional();
        }

        this.gridVisible = false;
        this.formVisible1 = false;
        this.formVisible2 = true;
      });
  }

  clickTabNivelEducativo(item: any, cargaInicial: boolean) {
    if (cargaInicial || !this.permisos.editarCampo) {
      this.cambiarTabNivelEducativo(item);
    } else {
      this.guardarContinuar(false, item);
    }
  }

  cambiarTabNivelEducativo(item: any) {
    for (let i = 0; i < this.listTiposNivelEducativo.length; i++) {
      if (
        this.listTiposNivelEducativo[i].iD_MinutaPatronAlimento ==
        item.iD_MinutaPatronAlimento
      ) {
        this.listTiposNivelEducativo[i].active = true;
        this.objNivelEducativo = {
          iD_MinutaPatronAlimento:
            this.listTiposNivelEducativo[i].iD_MinutaPatronAlimento,
          nivelEducativo: this.listTiposNivelEducativo[i].nivelEducativo,
          existe: this.listTiposNivelEducativo[i].existe,
          iD_MinutaPatronAlimentoBase:
            this.listTiposNivelEducativo[i].iD_MinutaPatronAlimentoBase,
          justificacion: this.listTiposNivelEducativo[i].justificacion,
          recomendaciones: this.listTiposNivelEducativo[i].recomendaciones,
          estadoMinuta: this.listTiposNivelEducativo[i].estadoMinuta,
          iD_EstadoMinuta: this.listTiposNivelEducativo[i].iD_EstadoMinuta,
          active: true,
        };
        this.iD_MinutaPatronAlimento =
          this.listTiposNivelEducativo[i].iD_MinutaPatronAlimento;
      } else {
        this.listTiposNivelEducativo[i].active = false;
      }
    }
    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      this.get_AlimentosMinutaMAER(item.iD_MinutaPatronAlimento);
    } else {
      this.get_AlimentosMinuta(item.iD_MinutaPatronAlimento);
    }
    this.get_NutrientesMinuta(item.iD_MinutaPatronAlimento);
  }

  arComponentesNoMinVisible = [
    'GRASAS',
    'FRUTAS',
    'FRUTA',
    'LECHE O PRODUCTOS LÁCTEOS',
    'ENSALADA O VERDURA CALIENTE',
  ];
  isComponenteMinVisible(nomComponente: string) {
    for (let i = 0; i < this.arComponentesNoMinVisible.length; i++) {
      if (this.arComponentesNoMinVisible[i] == nomComponente) {
        return false;
      }
    }
    return true;
  }

  get_AlimentosMinuta(id: number) {
    this.dataSourceComponentes = [];

    this.loadingVisible = true;
    this._minutasApiService
      .get_AlimentosMinuta(this.iD_MinutaPatronAlimento)
      .subscribe({
        next: (response) => {
          this.loadingVisible = false;

          if (!response.success) {
            this._messageService.showError(
              'ERROR: ' + response.error,
              'top center',
              5000
            );
            return;
          }
          if (response.result.alimentoMinutaAgrupado != null) {
            this.itemComponente = response.result.alimentoMinutaAgrupado;
            this.itemComponenteGrupos =
              response.result.alimentoMinutaAgrupado.listAlimentoComponente;
          }
          if (this.itemMinutaExcepcional.iD_TiposRacion == 1) {
            this.dataSourceAlimentoProteico =
              response.result.listAlimentoMinutaAgrupado.filter(
                (componente) => componente.id == 2
              )[0];
            this.dataSourceComponentes =
              response.result.listAlimentoMinutaAgrupado.filter(
                (componente) => componente.id != 2
              );
          } else {
            this.dataSourceComponentes =
              response.result.listAlimentoMinutaAgrupado;
          }
          this.dataSourceComponentesBackup =
            response.result.listAlimentoMinutaAgrupado;
          this.valTotalRowsDataSourceComponentes();
          console.log(this.dataSourceAlimentoProteico);
        },
        error: (error) => {
          this.loadingVisible = false;
          this._messageService.showError('ERROR: ' + error, 'top center', 5000);
        },
      });
  }

  get_AlimentosMinutaMAER(id: number) {
    this._minutasApiService.get_AlimentosMinutaMAER(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.itemComponente = response.result.alimentoMinutaAgrupado;
          this.dataSourceComponentesMaer =
            response.result.listGruposAlimentoMinutaAgrupado.filter(
              (grupo) => grupo.id != 99 && grupo.id != 5
            );
          this.dataSourceComponentesPrepMaer =
            response.result.listGruposAlimentoMinutaAgrupado.filter(
              (grupo) => grupo.id == 99 || grupo.id == 5
            );
          //this.dataSourceComponentesPrepMaer.reverse();
          this.valTotalRowsDataSourceComponentes();
          //this.setTotalIntercambios();
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
          return;
        }
      },
    });
  }

  get_NutrientesMinuta(id: number) {
    this.dataMacroNutrientes = [];
    this.dataMicroNutrientes = [];

    this.loadingVisible = true;

    this._minutasApiService.get_NutrientesMinuta(id).subscribe({
      next: (response) => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
          return;
        }

        for (let i = 0; i < response.result.length; i++) {
          const item = response.result[i];

          const obj = {
            id: item.idAportesNutricional,
            idAportesNutricional: item.idAportesNutricional,
            idNutriente: item.idNutriente,
            nomNutriente: item.nomNutriente,
            aporteMinimo: item.aporteMinimo,
            aporteRecomendadoMin: item.aporteRecomendadoMin,
            porcentajeAdecuacionMin: item.porcentajeAdecuacionMin,
            calculado: item.calculado,
            id_NutrienteBase: item.id_NutrienteBase,
            porcentaje: item.porcentaje,
            valorConstante: item.valorConstante,
            tipoNutriente: item.tipoNutriente,

            disabledAporteMinimo: false,
            disabledRecomendado: false,
            disabledPorcAdecuacion: false,
          };

          if (item.iD_tiponutriente == 1 || item.iD_tiponutriente == 3) {
            this.dataMacroNutrientes.push(obj);
          } else if (item.iD_tiponutriente == 2) {
            this.dataMicroNutrientes.push(obj);
          }
        }
      },
      error: (error) => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      },
    });
  }

  anterior() {
    this.formVisible2 = false;
    this.gridVisible = true;
  }

  crearMinuta() {
    let data = this.listTiposNivelEducativo.filter(function (result: any) {
      return result.justificacion == '';
    });

    if (data.length > 0) {
      this._messageService.showWarning(
        'Digite la justificación.',
        'top center',
        5000
      );
      return;
    }

    this.loadingVisible = true;
    this._minutasApiService
      .get_ValidacionEstadoMinutaExcepcional(this.itemMinutaExcepcional)
      .subscribe((response) => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
          return;
        }

        let result = response.result;
        let message = '';
        for (let i = 0; i < result.length; i++) {
          if (!result[i].validacion) {
            message += ' - ' + result[i].nivelEducativo + '\r';
          }
        }

        if (this.itemMinutaExcepcional.iD_TipoModeloOperacion != 2) {
          if (message != '') {
            this._messageService.showWarning(
              'Verifique los datos del nivel:\r' + message,
              'top center',
              5000
            );
            return;
          }
        }

        if (this.itemMinutaExcepcional.iD_TipoModeloOperacion != 3) {
          this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
            this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
            this.estadoMinuta.rechazado
              ? this.estadoMinuta.PoraprobarETC
              : this.estadoMinuta.PoraprobarETC;
        } else {
          this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
            this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
            this.estadoMinuta.rechazado
              ? this.estadoMinuta.porAprobar
              : this.estadoMinuta.porAprobar;
        }
        this.UpdateCambiarEstadoMinutaAprobacion();
      });
  }

  crearMinutaSinNivel(): void {
    let data = this.listTiposNivelEducativo.filter(function (result: any) {
      return result.justificacion == '';
    });

    if (data.length > 0) {
      this._messageService.showWarning(
        'Digite la justificación.',
        'top center',
        5000
      );
      return;
    }

    let dataMinutaAlimentos = [];
    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      dataMinutaAlimentos = this.getDataMinutaAlimentosMAER();
    } else {
      dataMinutaAlimentos = this.getDataMinutaAlimentos();
    }

    for (let i = 0; i < dataMinutaAlimentos.length; i++) {
      const obj = dataMinutaAlimentos[i];

      if (!(obj.frecuencia > 0)) {
        this._messageService.showWarning(
          'Por favor seleccionar la frecuencia en el componente "' +
            obj.nombre_TipoComponente +
            '"',
          'top center',
          5000
        );
        return;
      }

      if (
        this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
        (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
          this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
      ) {
        if (!(obj.numIntercambios > 0) && obj.minVisible) {
          this._messageService.showWarning(
            'Por favor digitar el valor del intercambio "' +
              obj.nombre_TipoComponente +
              '"',
            'top center',
            5000
          );
          return;
        }
      } else {
        if (
          (!(obj.mingramoPesoNeto > 0) && obj.minVisible) ||
          !(obj.maxgramoPesoNeto > 0)
        ) {
          this._messageService.showWarning(
            'Por favor digitar el tamaño maximo de porción en el componente "' +
              obj.nombre_TipoComponente +
              '"',
            'top center',
            5000
          );
          return;
        }

        if (!(obj.maxgramoPesoNeto >= obj.mingramoPesoNeto) && obj.minVisible) {
          this._messageService.showWarning(
            'El tamaño maximo de porción no puede ser menor que el tamaño minimo en el componente "' +
              obj.nombre_TipoComponente +
              '"',
            'top center',
            5000
          );
          return;
        }
      }
    }

    let dataAporteNutricional = this.getDataMinutaNutrientes();

    for (let i = 0; i < dataAporteNutricional.length; i++) {
      const obj = dataAporteNutricional[i];
      if (
        this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
        (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
          this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
      ) {
        if (obj.idNutriente != this.ID_NutrienteSodio) {
          if (!(obj.aporteMinimo > 0)) {
            this._messageService.showWarning(
              'Digite los aportes minimos y recomendados (' +
                obj.nomNutriente +
                ')',
              'top center',
              5000
            );
            return;
          }
        }
      } else {
        if (
          obj.idNutriente != this.ID_NutrienteVitaminaA &&
          obj.idNutriente != this.ID_NutrienteZinc
        ) {
          if (!(obj.aporteMinimo > 0)) {
            this._messageService.showWarning(
              'Digite los aportes minimos y recomendados (' +
                obj.nomNutriente +
                ')',
              'top center',
              5000
            );
            return;
          }
        }
      }
    }

    const param = {
      updateJustificacion: true,
      justificacion: this.listTiposNivelEducativo[0]?.justificacion?.trim(),
      listAlimentoMinuta: dataMinutaAlimentos,
      listAporteNutricional: dataAporteNutricional,
      itemMinutaExcepcional: {
        iD_ETC: this.idETC,
        iD_Vigencia: this.idVigencia,
        iD_TipoModeloOperacion:
          this.itemMinutaExcepcional.iD_TipoModeloOperacion,
        iD_TipoMinutaPatron: this.itemMinutaExcepcional.iD_TipoMinutaPatron,
        modalidadComplementoId:
          this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
        tipoComplementoId: this.itemMinutaExcepcional.iD_TiposRacion,
        tipoActividadFisicaId:
          this.itemMinutaExcepcional.iD_NivelActividadFisica,
        auditoria: LocalStorage.getAuditoria(''),
      },
    };

    this.loadingVisible = true;

    this._minutasApiService
      .updateAlimentosNutrientesMinuta(
        this.listTiposNivelEducativo[0].iD_MinutaPatronAlimento,
        param
      )
      .subscribe((response) => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
          return;
        }
        if (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3) {
          this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
            this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
            this.estadoMinuta.rechazado
              ? this.estadoMinuta.porAprobar
              : this.estadoMinuta.porAprobar;
        } else {
          this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
            this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
            this.estadoMinuta.rechazado
              ? this.estadoMinuta.PoraprobarETC
              : this.estadoMinuta.PoraprobarETC;
        }
        this.UpdateCambiarEstadoMinutaAprobacion();
      });
  }

  changeItemAprobacion(name: string, value: any) {
    this.itemAprobacion[name] = name == 'observaciones' ? value.trim() : value;
  }

  guardarContinuar(creaMinuta: boolean, item?: any) {
    let dataMinutaAlimentos = [];
    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      dataMinutaAlimentos = this.getDataMinutaAlimentosMAER();
    } else {
      dataMinutaAlimentos = this.getDataMinutaAlimentos();
    }
    if (item) {
      for (let i = 0; i < dataMinutaAlimentos.length; i++) {
        const obj = dataMinutaAlimentos[i];

        if (!(obj.frecuencia > 0)) {
          this._messageService.showWarning(
            'Por favor seleccionar la frecuencia en el componente "' +
              obj.nombre_TipoComponente +
              '"',
            'top center',
            5000
          );
          return;
        }
        if (
          this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
          (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
            this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
        ) {
          if (!(obj.numIntercambios > 0) && obj.minVisible) {
            this._messageService.showWarning(
              'Por favor digitar el numero de intercambios en el componente "' +
                obj.nombre_TipoComponente +
                '"',
              'top center',
              5000
            );
            return;
          }
        } else {
          if (
            (!(obj.mingramoPesoNeto > 0) && obj.minVisible) ||
            !(obj.maxgramoPesoNeto > 0)
          ) {
            this._messageService.showWarning(
              'Por favor digitar el tamaño maximo de porción en el componente "' +
                obj.nombre_TipoComponente +
                '"',
              'top center',
              5000
            );
            return;
          }

          if (
            !(obj.maxgramoPesoNeto >= obj.mingramoPesoNeto) &&
            obj.minVisible
          ) {
            this._messageService.showWarning(
              'El tamaño maximo de porción no puede ser menor que el tamaño minimo en el componente "' +
                obj.nombre_TipoComponente +
                '"',
              'top center',
              5000
            );
            return;
          }
        }
      }
    }

    let dataAporteNutricional = this.getDataMinutaNutrientes();

    if (item) {
      for (let i = 0; i < dataAporteNutricional.length; i++) {
        const obj = dataAporteNutricional[i];
        if (
          obj.idNutriente != this.ID_NutrienteVitaminaA &&
          obj.idNutriente != this.ID_NutrienteZinc
        ) {
          if (!(obj.aporteMinimo > 0)) {
            this._messageService.showWarning(
              'Digite los aportes minimos y recomendados (' +
                obj.nomNutriente +
                ')',
              'top center',
              5000
            );
            return;
          }
        }
      }
    }
    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      this.objNivelEducativo.justificacion = '';
    }
    const param = {
      updateJustificacion: true,
      justificacion: this.objNivelEducativo.justificacion.trim(),
      listAlimentoMinuta: dataMinutaAlimentos,
      listAporteNutricional: dataAporteNutricional,
      itemMinutaExcepcional: {
        iD_ETC: this.idETC,
        iD_Vigencia: this.idVigencia,
        iD_TipoModeloOperacion:
          this.itemMinutaExcepcional.iD_TipoModeloOperacion,
        iD_TipoMinutaPatron: this.itemMinutaExcepcional.iD_TipoMinutaPatron,
        modalidadComplementoId:
          this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
        tipoComplementoId: this.itemMinutaExcepcional.iD_TiposRacion,
        tipoActividadFisicaId:
          this.itemMinutaExcepcional.iD_NivelActividadFisica,
        auditoria: LocalStorage.getAuditoria(''),
      },
    };

    this.loadingVisible = true;

    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      this._minutasApiService
        .updateAlimentosNutrientesMinuta(this.iD_MinutaPatronAlimento, param)
        .subscribe((response) => {
          this.loadingVisible = false;

          if (!response.success) {
            this._messageService.showError(
              'ERROR: ' + response.error,
              'top center',
              5000
            );
            return;
          }
          if (!creaMinuta) {
            this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
              this.estadoMinuta.creado;
            this.UpdateCambiarEstadoMinutaAprobacion();
            this.anterior();
            return;
          }
          this.crearMinuta();
        });
    } else {
      this._minutasApiService
        .updateAlimentosNutrientesMinuta(
          this.objNivelEducativo.iD_MinutaPatronAlimento,
          param
        )
        .subscribe((response) => {
          this.loadingVisible = false;

          if (!response.success) {
            this._messageService.showError(
              'ERROR: ' + response.error,
              'top center',
              5000
            );
            return;
          }

          if (item) {
            for (let i = 0; i < this.listTiposNivelEducativo.length; i++) {
              if (
                this.listTiposNivelEducativo[i].iD_MinutaPatronAlimento ==
                this.objNivelEducativo.iD_MinutaPatronAlimento
              ) {
                this.listTiposNivelEducativo[i].estadoMinuta = 'Completo';
                this.listTiposNivelEducativo[i].bgEstadoMinuta = 'bg-green';
                break;
              }
            }

            this.cambiarTabNivelEducativo(item);
            return;
          }

          if (!creaMinuta) {
            this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew =
              this.estadoMinuta.creado;
            this.UpdateCambiarEstadoMinutaAprobacion();
            this.anterior();
            return;
          }
          this.crearMinuta();
        });
    }
  }

  getDataMinutaAlimentosMAER() {
    let data = [];

    for (let i = 0; i < this.dataSourceComponentesMaer.length; i++) {
      const obj = this.dataSourceComponentesMaer[i];
      var frecuenciahuevos = 0;
      var frecuenciaactual = 0;
      for (let j = 0; j < obj.listSubGrupo.length; j++) {
        frecuenciaactual = obj.listSubGrupo[j].frecuencia;
        if (
          this.itemMinutaExcepcional.iD_TiposRacion ==
          this.TipoComplementoAlmuerzo
        ) {
          if (obj.listSubGrupo[j].id == this.subgrupoMinutaMAER.HUEVOS) {
            frecuenciahuevos = obj.listSubGrupo[j].frecuencia;
          }
          if (
            obj.listSubGrupo[j].id ==
            this.subgrupoMinutaMAER
              .LEGUMINOSAS_COCIDAS_Y_MEZCLAS_VEGETALES_COCIDAS
          ) {
            frecuenciaactual = frecuenciahuevos;
          }
        }
        data.push({
          iD_TipoComponente: obj.iD_TipoComponente,
          iD_GrupoAlimento: obj.id,
          ID_SubGrupoAlimento: obj.listSubGrupo[j].id,
          frecuencia: obj.listSubGrupo[j].frecuencia,
          numIntercambios: obj.listSubGrupo[j].numIntercambios,
          numIntercambiosMax: obj.listSubGrupo[j].numIntercambiosMax,
          iD_TipoSentidoValidacion:
            obj.listSubGrupo[j].iD_TipoSentidoValidacion,
          estado: true,
          auditoria: LocalStorage.getAuditoria(''),
        });
      }
    }
    for (let i = 0; i < this.dataSourceComponentesPrepMaer.length; i++) {
      const obj = this.dataSourceComponentesPrepMaer[i];
      for (let j = 0; j < obj.listSubGrupo.length; j++) {
        data.push({
          iD_TipoComponente: obj.iD_TipoComponente,
          iD_GrupoAlimento: obj.id,
          ID_SubGrupoAlimento: obj.listSubGrupo[j].id,
          frecuencia: obj.listSubGrupo[j].frecuencia,
          numIntercambios: obj.listSubGrupo[j].numIntercambios,
          numIntercambiosMax: obj.listSubGrupo[j].numIntercambiosMax,
          iD_TipoSentidoValidacion:
            obj.listSubGrupo[j].iD_TipoSentidoValidacion,
          estado: true,
          auditoria: LocalStorage.getAuditoria(''),
        });
      }
    }
    return data;
  }

  getDataMinutaAlimentos() {
    const array = this.dataSourceAlimentoProteico
      ? [...this.dataSourceComponentes, ...[this.dataSourceAlimentoProteico]]
      : this.dataSourceComponentes;

    let data = [];
    if (this.itemComponente != null) {
      for (let i = 0; i < this.itemComponente.listAlimentoComponente.length; i++) {
        data.push({
          nombre_TipoComponente: this.itemComponente.nombreComponente,
          iD_TipoComponente: this.itemComponente.iD_TipoComponente,
          iD_GrupoAlimento: this.itemComponente.listAlimentoComponente[i].id,
          frecuencia: this.itemComponente.frecuencia,
          mingramoPesoNeto:
            this.itemComponente.listAlimentoComponente[i].min_Gramo,
          maxgramoPesoNeto:
            this.itemComponente.listAlimentoComponente[i].max_Gramo,
          minVisible: this.itemComponente.listAlimentoComponente[i].minVisible,
          estado: this.itemComponente.estado,
        });
      }
    }
    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      for (let j = 0; j < obj.listAlimentoComponente.length; j++) {
        if (obj.iD_TipoComponente == this.TipoComponenteMinuta.LECHE_O_PRODUCTOS_LACTEOS) {
          obj.listAlimentoComponente[j].listSubGrupo.forEach((element) => {
            data.push({
              nombre_TipoComponente: obj.nombreComponente,
              iD_TipoComponente: obj.iD_TipoComponente,
              iD_GrupoAlimento: element.iD_Grupo,
              frecuencia: obj.frecuencia,
              mingramoPesoNeto: element.max_Gramo,
              maxgramoPesoNeto: element.max_Gramo,
              minVisible: element.minVisible,
              ID_SubGrupoAlimento: element.id,
              manejaValor: element.manejaValor,
              estado: obj.estado,
            });
          });
        } else if (obj.iD_TipoComponente == this.TipoComponenteMinuta.ALIMENTO_PROTEICO) {
          if (obj.listAlimentoComponente[j].listSubGrupo.length >= 2) {
            for (let posicion = 0; posicion < obj.listAlimentoComponente[j].listSubGrupo.length; posicion++) {
              if (posicion == 0) {
                data.push({
                  nombre_TipoComponente: obj.nombreComponente,
                  iD_TipoComponente: obj.iD_TipoComponente,
                  iD_GrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].iD_Grupo,
                  frecuencia: obj.listAlimentoComponente[j].listSubGrupo[posicion].frecuencia,
                  mingramoPesoNeto: obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].min_Gramo === 0
                      ? obj.min_Gramo
                      : obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].min_Gramo,
                  maxgramoPesoNeto: obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].max_Gramo === 0
                      ? obj.max_Gramo
                      : obj.listAlimentoComponente[j].listSubGrupo[posicion + 1].max_Gramo,
                  minVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].minVisible,
                  ID_SubGrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].id,
                  manejaValor: obj.listAlimentoComponente[j].listSubGrupo[posicion].manejaValor,
                  estado: obj.estado,
                });
              } else {
                const minGramo = obj.listAlimentoComponente[j].listSubGrupo[posicion].min_Gramo === 0
                    ? obj.min_Gramo
                    : obj.listAlimentoComponente[j].listSubGrupo[posicion].min_Gramo;
                const maxGramo = obj.listAlimentoComponente[j].listSubGrupo[posicion].max_Gramo === 0
                    ? obj.max_Gramo
                    : obj.listAlimentoComponente[j].listSubGrupo[posicion].max_Gramo;

                data.push({
                  nombre_TipoComponente: obj.nombreComponente,
                  iD_TipoComponente: obj.iD_TipoComponente,
                  iD_GrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].iD_Grupo,
                  frecuencia: obj.listAlimentoComponente[j].listSubGrupo[posicion].frecuencia,
                  mingramoPesoNeto: posicion == 1 ? minGramo : maxGramo,
                  maxgramoPesoNeto: maxGramo,
                  minVisible: obj.listAlimentoComponente[j].listSubGrupo[posicion].minVisible,
                  ID_SubGrupoAlimento: obj.listAlimentoComponente[j].listSubGrupo[posicion].id,
                  manejaValor: obj.listAlimentoComponente[j].listSubGrupo[posicion].manejaValor,
                  estado: obj.estado,
                });
              }
            }
          } else {
            obj.listAlimentoComponente[j].listSubGrupo.forEach((element) => {
              const maxGramo = element.max_Gramo === 0
                ? obj.max_Gramo
                : element.max_Gramo;

              data.push({
                nombre_TipoComponente: obj.nombreComponente,
                iD_TipoComponente: obj.iD_TipoComponente,
                iD_GrupoAlimento: element.iD_Grupo,
                frecuencia: obj.frecuencia,
                mingramoPesoNeto: maxGramo,
                maxgramoPesoNeto: maxGramo,
                minVisible: element.minVisible,
                ID_SubGrupoAlimento: element.id,
                manejaValor: element.manejaValor,
                estado: obj.estado,
              });
            });
          }
        } else if (obj.iD_TipoComponente == this.TipoComponenteMinuta.CEREAL) {
          obj.listAlimentoComponente[j].listSubGrupo.forEach((element) => {
            data.push({
              nombre_TipoComponente: obj.nombreComponente,
              iD_TipoComponente: obj.iD_TipoComponente,
              iD_GrupoAlimento: element.iD_Grupo,
              frecuencia: obj.frecuencia,
              mingramoPesoNeto: obj.min_Gramo,
              maxgramoPesoNeto: obj.max_Gramo,
              minVisible: element.minVisible,
              ID_SubGrupoAlimento: element.id,
              manejaValor: element.manejaValor,
              estado: obj.estado,
            });
          });
        } else {
          data.push({
            nombre_TipoComponente: obj.nombreComponente,
            iD_TipoComponente: obj.iD_TipoComponente,
            iD_GrupoAlimento: obj.listAlimentoComponente[j].id,
            frecuencia: obj.frecuencia,
            mingramoPesoNeto: obj.min_Gramo,
            maxgramoPesoNeto:
              obj.iD_TipoComponente == 4 ? obj.min_Gramo : obj.max_Gramo,
            minVisible: this.isComponenteMinVisible(
              obj.nombreComponente.trim().toUpperCase()
            ),
            estado: obj.estado,
          });
        }
      }
    }

    return data;
  }

  getDataMinutaNutrientes() {
    let data = [];

    for (let i = 0; i < this.dataMacroNutrientes.length; i++) {
      data.push(this.dataMacroNutrientes[i]);
    }

    for (let i = 0; i < this.dataMicroNutrientes.length; i++) {
      data.push(this.dataMicroNutrientes[i]);
    }

    return data;
  }

  actualizarEstadoMinutaExcepcional(nuevoestado: number) {
    let iD_Estado = 0;

    if (nuevoestado == this.estadoMinuta.rechazado) {
      iD_Estado = this.estadoMinuta.rechazado;
    } else {
      if (
        this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
        this.estadoMinuta.creado
      ) {
        iD_Estado = this.estadoMinuta.PoraprobarETC;
      } else if (
        this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
        this.estadoMinuta.PoraprobarETC
      ) {
        iD_Estado = this.itemMinutaExcepcional.rechazado
          ? this.estadoMinuta.aprobado
          : this.estadoMinuta.porAprobarUAPA;
      } else if (
        this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
        this.estadoMinuta.porAprobarUAPA
      ) {
        if (this.objNivelEducativo.recomendaciones == '') {
          //this._messageService.showWarning('Digite las observaciones', 'top center', 5000);
          //return;
          iD_Estado = this.estadoMinuta.porAprobar;
        } else {
          iD_Estado = this.estadoMinuta.porAprobar;
        }
      } else if (
        this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
          this.estadoMinuta.porAprobarConObs ||
        this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
          this.estadoMinuta.porAprobar
      ) {
        iD_Estado = this.estadoMinuta.aprobado;
      }
    }
    this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew = iD_Estado;
    this.UpdateCambiarEstadoMinutaAprobacion();

    // const param = {
    //   iD_TipoModeloOperacion: this.itemMinutaExcepcional.iD_TipoModeloOperacion,
    //   iD_TipoMinutaPatron: this.itemMinutaExcepcional.iD_TipoMinutaPatron,
    //   modalidadComplementoId: this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
    //   tipoComplementoId: this.itemMinutaExcepcional.iD_TiposRacion,
    //   tipoActividadFisicaId: this.itemMinutaExcepcional.iD_NivelActividadFisica,
    //   iD_TipoEstadoMinuta: iD_Estado,
    //   recomendaciones: this.objNivelEducativo.recomendaciones
    // };

    // this.loadingVisible = true;
    // this._minutasApiService.updateTipoEstadoExcepcional(param)
    // .subscribe(response => {
    //   this.loadingVisible = false;
    //   if(response.success){
    //     this._messageService.showInfo('Los datos han sido guardados', 'top center', 5000);

    //     this.formVisible2 = false;
    //     this.gridVisible = true;

    //     this.get_MinutasExcepcional();
    //   }
    //   else{
    //     this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
    //   }
    // });
  }

  devolverEstadoMinutaExcepcional() {
    let iD_Estado = 0;

    // ||       this.itemMinutaExcepcional.iD_TipoEstadoMinuta == this.estadoMinuta.porAprobar
    if (
      this.itemMinutaExcepcional.iD_TipoEstadoMinuta ==
      this.estadoMinuta.PoraprobarETC
    ) {
      iD_Estado = this.estadoMinuta.porAprobarUAPA;
    }

    if (iD_Estado == 0) return;

    this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew = iD_Estado;
    this.UpdateCambiarEstadoMinutaAprobacion();

    // const param = {
    //   iD_TipoModeloOperacion: this.itemMinutaExcepcional.iD_TipoModeloOperacion,
    //   iD_TipoMinutaPatron: this.itemMinutaExcepcional.iD_TipoMinutaPatron,
    //   modalidadComplementoId: this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
    //   tipoComplementoId: this.itemMinutaExcepcional.iD_TiposRacion,
    //   tipoActividadFisicaId: this.itemMinutaExcepcional.iD_NivelActividadFisica,
    //   iD_TipoEstadoMinuta: iD_Estado,
    //   recomendaciones: this.objNivelEducativo.recomendaciones
    // };

    // this.loadingVisible = true;
    // this._minutasApiService.updateTipoEstadoExcepcional(param)
    // .subscribe(response => {
    //   this.loadingVisible = false;
    //   if(response.success){
    //     this._messageService.showInfo('Los datos han sido guardados', 'top center', 5000);

    //     this.formVisible2 = false;
    //     this.gridVisible = true;

    //     this.get_MinutasExcepcional();
    //   }
    //   else{
    //     this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
    //   }
    // });
  }

  get_HistoricoAprobacion() {
    this.loadingVisible = true;
    this._minutasApiService
      .get_MinutaAprobacionGetID(this.itemMinutaExcepcional.iD_MinutaAprobacion)
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          response.result.map(function (item: any) {
            item.fechaAprobacionString = moment(item.fechaAprobacion).format(
              'YYYY-MM-DD'
            );
            return item;
          });
          this.listMinutasAprobaciones = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  UpdateCambiarEstadoMinuta(id: number, estado: boolean) {
    const param = {
      iD: id,
      estado: estado,
    };
    this.loadingVisible = true;
    this._minutasApiService
      .UpdateEstadoMinutaExcepcional(param)
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          //this._messageService.showInfo('Los datos han sido guardados', 'top center', 5000);
          //this.formVisible2 = false;
          //this.gridVisible = true;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  UpdateCambiarEstadoMinutaAprobacion() {
    if (
      this.itemMinutaExcepcional.iD_TipoModeloOperacion == 2 ||
      (this.itemMinutaExcepcional.iD_TipoModeloOperacion == 3 &&
        this.itemMinutaExcepcional.iD_TipoModeloOperacionRef == 2)
    ) {
      this.objNivelEducativo.justificacion =
        this.listTiposNivelEducativo[0]?.justificacion?.trim();
      this.objNivelEducativo.recomendaciones =
        this.listTiposNivelEducativo[0]?.recomendaciones?.trim();
    }
    const param = {
      iD_MinutaAprobacion: this.itemMinutaExcepcional.iD_MinutaAprobacion,
      iD_TipoEstadoMinuta: this.itemMinutaExcepcional.iD_TipoEstadoMinutaNew,
      recomendaciones: this.objNivelEducativo.recomendaciones.trim(),
      justificacion: this.objNivelEducativo.justificacion.trim(),
      adjuntoJustificacionPATH: '',
      responsable: environment.responsable,
      rolResponsable: environment.rolResponsable,
      auditoria: LocalStorage.getAuditoria(''),
    };

    this.loadingVisible = true;
    this._minutasApiService
      .UpdateCambiarEstadoAprobacion(param)
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          this._messageService.showInfo(
            'Los datos han sido guardados',
            'top center',
            5000
          );

          this.formVisible2 = false;
          this.gridVisible = true;

          this.get_MinutasExcepcional();
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_TiposModeloOperacion() {
    this.loadingVisible = true;
    this._masterdataApiService.get_ModeloOperacion().subscribe((response) => {
      this.loadingVisible = false;
      this.listTiposModeloOperacion = response.result;
    });
  }

  get_TiposActividadFisica() {
    this.loadingVisible = true;
    this._minutasApiService.get_TiposActividadFisica().subscribe((response) => {
      this.loadingVisible = false;
      this.listTiposActividadFisica = response.result;
    });
  }

  get_TiposModalidadRacion() {
    this.loadingVisible = true;
    this._minutasApiService
      .get_MinutaPatronAlimentoConfiguracion(
        this.itemMinutaExcepcional.iD_TipoModeloOperacion,
        0,
        1
      )
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          this.listTiposModalidadRacion = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_VigenciasAnteriores() {
    this.loadingVisible = true;
    this._minutasApiService
      .get_VigenciasAnteriores(
        this.itemMinutaExcepcional.iD_Vigencia,
        this.itemMinutaExcepcional.iD_TipoModeloOperacion
      )
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          this.listVigenciasAnteriores = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_TiposRacion() {
    this.loadingVisible = true;
    this._minutasApiService
      .get_MinutaPatronAlimentoConfiguracion(
        this.itemMinutaExcepcional.iD_TipoModeloOperacion,
        this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
        2
      )
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          this.listTiposRacion = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_TiposRacionRef(iD_TipoModeloOperacion) {
    this.loadingVisible = true;
    this._minutasApiService
      .get_MinutaPatronAlimentoConfiguracion(
        iD_TipoModeloOperacion,
        this.itemMinutaExcepcional.iD_TiposModalidadComplemento,
        2
      )
      .subscribe((response) => {
        this.loadingVisible = false;
        if (response.success) {
          this.listTiposRacion = response.result;
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  get_Frecuencias() {
    this.loadingVisible = true;
    this._minutasApiService.get_Frecuencias().subscribe((response) => {
      this.loadingVisible = false;
      if (response.success) {
        this.listFrecuencias = response.result;
      } else {
        this._messageService.showError(
          'ERROR: ' + response.error,
          'top center',
          5000
        );
      }
    });
  }

  cancelarEliminacion() {
    this._modalService.dismissAll();
  }

  confirmarEliminacion() {
    this.loadingVisible = true;
    this._minutasApiService
      .eliminarMinutaExcepcional(this.itemMinutaExcepcional)
      .subscribe((response) => {
        if (response.success) {
          this.loadingVisible = false;
          this.cancelarEliminacion();

          this.formVisible2 = false;
          this.gridVisible = true;

          this.get_MinutasExcepcional();

          this._messageService.showInfo(
            'La minuta ha sido eliminada.',
            'top center',
            5000
          );
        } else {
          this._messageService.showError(
            'ERROR: ' + response.error,
            'top center',
            5000
          );
        }
      });
  }

  getZonasMinuta() {
    this._zonasService.getZonasList().subscribe(
      (response: any) => {
        this.zonasList = response;
      },
      (err) => {}
    );
  }

  valTotalRowsItemComponente(listAlimentoComponente: any) {
    var totalRows = 0;
    listAlimentoComponente.forEach((element) => {
      totalRows += element.listSubGrupo.length;
    });
    if (totalRows == 0) {
      totalRows = listAlimentoComponente.length;
    }
    this.itemComponente.totalRows = totalRows;
  }

  valTotalRowsDataSourceComponentes() {
    if (this.itemComponente != null) {
      var totalRowsItemComponente = 0;
      this.itemComponente.listAlimentoComponente.forEach((grupo) => {
        grupo.totalRows = grupo.listSubGrupo.length;
        totalRowsItemComponente += grupo.totalRows;
      });
      this.itemComponente.totalRows = totalRowsItemComponente;
    }
    if (this.dataSourceComponentes != null) {
      for (let i = 0; i < this.dataSourceComponentes.length; i++) {
        var totalRowsItemComponente = 0;
        const obj = this.dataSourceComponentes[i];
        obj.listAlimentoComponente.forEach((grupo) => {
          grupo.totalRows = grupo.listSubGrupo.length;
          totalRowsItemComponente += grupo.totalRows;
        });
        this.dataSourceComponentes[i].totalRows = totalRowsItemComponente;
      }
    }
    if (
      this.itemMinutaExcepcional.iD_TiposRacion == 1 &&
      this.dataSourceAlimentoProteico
    ) {
      var totalRowsItemComponente = 0;
      this.dataSourceAlimentoProteico.listAlimentoComponente.forEach(
        (grupo) => {
          grupo.totalRows = grupo.listSubGrupo.length;
          totalRowsItemComponente += grupo.totalRows;
        }
      );
      this.dataSourceAlimentoProteico.totalRows = totalRowsItemComponente;
    }
  }

  verificarTotalRowsAlimentoProteico() {
    this.dataSourceAlimentoProteico.listAlimentoComponente.forEach((grupo) => {
      if (grupo.id == 4) {
        grupo.listSubGrupo.forEach((subGrupo) => {
          if (subGrupo.id == 1) {
            this.AlimentoProteicoSubGrupoIA = true;
          }
          if (subGrupo.id == 19) {
            this.AlimentoProteicoSubGrupoII = true;
          }
        });
      }
    });
  }

  changeAddOrDelete(valName: any) {
    this.addOrDeleteList[valName] = !this.addOrDeleteList[valName];
  }

  activarComponentes() {
    if (this.itemComponente.id != 0) {
      this.addOrDeleteList['val' + this.itemComponente.id] = Object.values(
        this.itemComponente.listAlimentoComponente
      ).some(this.validaValores);
    }
    if (this.dataSourceComponentes.length > 0) {
      this.dataSourceComponentes.forEach((element) => {
        this.addOrDeleteList['val' + element.id] = Object.values(
          element.listAlimentoComponente
        ).some(this.validaValores);
      });
    }
  }

  validaValores(elemento) {
    if (elemento.iD_Componente == 1) {
      return elemento.max_Gramo > 0;
    } else {
      return elemento.min_Gramo > 0 || elemento.max_Gramo > 0;
    }
  }

  actualizarEstadoComponente(idTipoComponente: number, estado: boolean): void {
    let objetoEstado = {
      estado: estado,
      auditoria: LocalStorage.getAuditoria(''),
    };
    this.loadingVisible = true;
    this._minutasApiService
      .UpdateAlimentosMinutaComponenteEstado(
        this.iD_MinutaPatronAlimento,
        idTipoComponente,
        objetoEstado
      )
      .subscribe(
        (respuesta) => {
          this.loadingVisible = false;
          if (respuesta.success) {
            this.get_AlimentosMinuta(this.iD_MinutaPatronAlimento);
          } else {
            this._messageService.showError(
              'ERROR: ' + respuesta.error,
              'top center',
              5000
            );
          }
        },
        (error) => {
          this.loadingVisible = false;
          this._messageService.showError('ERROR: ' + error, 'top center', 5000);
        }
      );
  }

  abrirModalEditarComponente(componente: any) {
    componente.iD_MinutaPatronAlimento = this.iD_MinutaPatronAlimento;
    componente.iD_TipoModeloOperacion = this.iD_TipoModeloOperacionMAEM;
    componente.iD_ModalidadComplemento =
      this.itemMinutaExcepcional.iD_TiposModalidadComplemento;
    componente.iD_TipoComplemento = this.itemMinutaExcepcional.iD_TiposRacion;

    const dialogRef = this.dialog.open(ModalEditarComponenteComponent, {
      data: componente,
      panelClass: 'modal-sin-padding',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadingVisible = true;
        setTimeout(() => {
          this.get_AlimentosMinuta(this.iD_MinutaPatronAlimento);
        }, 1000);
        this.loadingVisible = false;
      }
    });
  }
}
