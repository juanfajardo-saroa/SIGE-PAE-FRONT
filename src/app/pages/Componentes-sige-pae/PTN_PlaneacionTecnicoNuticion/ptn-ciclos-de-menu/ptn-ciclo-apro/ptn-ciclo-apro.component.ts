import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';
import { CicloMenuRequest, CiclosMenusService } from 'src/app/shared/services/CiclosMenus.services';
import { CiclosMenusModel } from 'src/app/shared/model/CiclosMenus';
import { event } from 'jquery';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoModalidadComplementoService } from 'src/app/shared/services/TipoModalidadComplemento.services';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { MatStepper } from "@angular/material/stepper";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
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
import { Router } from '@angular/router';
import { PA_MenuPTNSemanaService } from 'src/app/shared/services/PA_MenuPTNSemana.services';
import { PA_MenuPreparacionesService } from 'src/app/shared/services/PA_MenuPreparaciones.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ptn-ciclo-apro',
  templateUrl: './ptn-ciclo-apro.component.html',
  styleUrls: ['./ptn-ciclo-apro.component.scss']
})
export class PtnCicloAproComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  displayedColumns: string[] = ['nombre', 'modelo', 'modalidad', 'estado'];
  displayedColumnsPreparacion: string[] = ['Preparacion'];
  displayedColumnsMacro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];
  displayedColumnsMicro: string[] = ['nombre', 'energia', 'proteina', 'cabohidrato', 'grasaTotal', 'grasaSaturada'];
  dataSource = new MatTableDataSource<CiclosMenusModel>();
  dataSourcePreparacion = new MatTableDataSource<MenuPreparacionesModel>();
  dataSourceMacro = new MatTableDataSource();
  dataSourceMicro = new MatTableDataSource();
  selModelo = -1;
  selModalidad = -1;
  dataArray: any;
  dataArrayPreparaciones: any;
  Modelolist: any[] = [];
  ModeloModalidad: any[] = [];
  ModeloModalidadfilter: any[] = [];
  tablamodalidadList: any[] = [];
  ZonasList: any[] = [];
  public viewActiva: number = 0;
  escala: any[] = [
    { id: 1, respuesta: 'Si' },
    { id: 2, respuesta: 'No' },
  ]
  cicloParams: CicloMenuRequest = {}

  // Max number of steps to show at a time in view, Change this to fit your need
  MAX_STEP = 3;
  // Total steps included in mat-stepper in template, Change this to fit your need
  totalSteps = 5;
  // Current active step in mat-stepper
  step = 0;
  page = 0;
  Semanas = 0;
  // Min index of step to show in view
  minStepAllowed = 0;
  // Max index of step to show in view
  maxStepAllowed = this.MAX_STEP - 1;
  totalPages = Math.ceil(this.totalSteps / this.MAX_STEP);
  public nums: any[] = [1, 2, 3, 4, 5];
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
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  NivelEducativoList = [];
  diasList: any;
  public nuevoArray = [];
  public nuevoArray2 = [];
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

  selectedTabIndex: number = 0;
  tabs = [];
  diasText = '';
  idMenu = 0;
  Preparaciones: boolean = false;
  gradoText = '';
  constructor(
    private _ModeloOperadorServicios: TiposModeloOperacionService,
    private TipoModalidad: TipoModalidadComplementoService,
    private _ZonasService: ZonasService,
    private elementRef: ElementRef,
    private _CiclosMenusService: CiclosMenusService,
    private _ModalidadModeloService: ModalidadModeloService,
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private _NivelEducativoService: NivelEducativoService,
    private _MenuPTNService: MenuPTNService,
    private _MenuPTNSemanaService: PA_MenuPTNSemanaService,
    private _MenuPreparacionesService: MenuPreparacionesService,
    private _PA_MenuPreparacionesService: PA_MenuPreparacionesService,

    private router: Router,
  ) {
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);
  }

  ngOnInit(): void {
    this.nums2 = this.nums.slice(0, this.MAX_STEP);
    // this.aprobacionesService.getAprobacionesList().subscribe(
    //   (response: any) => {
    //     this.AprobacionesList = response.filter(item => item.ubicacionOrigen === 130);
    //     this.AprobacionesList2 = this.AprobacionesList.filter(item => item.id_Secciones === 4);
    //     this.lista.push(this.AprobacionesList2)

    //   },
    //   (err) => {
    //   }
    // );
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
    this._ZonasService.getZonasList().subscribe(
      (Response: any) => {
        this.ZonasList = Response;


      },
      (err) => {

      }
    );
    this.cicloParams.ID_ETC = this.idETC;
    this._CiclosMenusService.getCiclosMenusListRelationFilter2(this.cicloParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        this.dataArray = response.filter(item => item.iD_EstadoRegistro != 3);
        // Ordenar dataArray alfabéticamente por nombre
        this.dataArray.sort((a, b) => {
          const nameA = a.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          const nameB = b.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          if (nameA < nameB) return -1; // A va antes que B
          if (nameA > nameB) return 1; // A va después que B
          return 0; // Son iguales
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<CiclosMenusModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.isLoading = false;
      }
    );


    this.rerender();
  }
  ngAfterViewInit() {
    this.rerender();
  }
  selectionModelo(id: number) {
    this.ModeloModalidadfilter = [];
    this.ModeloModalidadfilter = this.tablamodalidadList.filter(item => item.iD_TipoModeloOperacion == id)
    var arr = {};

    for (var i = 0, len = this.ModeloModalidadfilter.length; i < len; i++)
      arr[this.ModeloModalidadfilter[i]['iD_TipoModalidadComplemento']] = this.ModeloModalidadfilter[i];

    this.ModeloModalidadfilter = new Array();
    for (var key in arr)
      this.ModeloModalidadfilter.push(arr[key]);


  }




  onchangeBuscar(selModelo: any, selModalidad: any) {
    this.cicloParams.ID_ETC = this.idETC;
    this.cicloParams.iD_EstadoRegistro = 6;
    if (selModelo == -1) {
      this.cicloParams.iD_TipoModeloOperacion = null;
    } else {
      this.cicloParams.iD_TipoModeloOperacion = selModelo;
    }
    if (selModalidad == -1) {
      this.cicloParams.iD_TipoModalidadComplemento = null;

    } else {
      this.cicloParams.iD_TipoModalidadComplemento = selModalidad;
    }
    this.cicloParams.iD_EstadoRegistro1 = 1;
    this.cicloParams.iD_EstadoRegistro1 = 2;
    this._CiclosMenusService.getCiclosMenusListRelationFilter(this.cicloParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        this.dataArray = response.filter(item => item.iD_EstadoRegistro != 3);
        // Ordenar dataArray alfabéticamente por nombre
        this.dataArray.sort((a, b) => {
          const nameA = a.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          const nameB = b.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          if (nameA < nameB) return -1; // A va antes que B
          if (nameA > nameB) return 1; // A va después que B
          return 0; // Son iguales
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<CiclosMenusModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.isLoading = false;
      }
    );
  }
  direccionar(row: any) {

    // localStorage.setItem('nombredeUbicacionActualizado','si')
    this.router.navigate(['/AprobacionesCiclomenu'], { queryParams: { id: row.id } })

  }

  traerDatos(id: number) {
    this._CiclosMenusService.getCiclosMenusListRelationFilterID(id).subscribe(
      (response: any) => {

        if (response[0].iD_TipoModeloOperacion == 1) {
          if (response[0].menuReferencia == false) {
            this.nombreReferencia = 'Ninguna';
          } else {
            this.nombreReferencia = response[0].nombre;
          }
          this.nombreModeloOP = response[0].sID_TipoModeloOperacion;
          this.nombreModalidad = response[0].sID_TipoModalidadComplemento;
          this.nombreTipoComplemento = response[0].sID_TipoComplemento;
          if (response[0].iD_MinutaPatronAlimento == null) {
            this.nombreMinuta = 'N/A';
          } else {
            this.nombreMinuta = response[0].sID_MinutaPatronAlimento;
          }
          this.cantidad = response[0].cantidadMenus;

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
          this.nombreModeloOP = response[0].sID_TipoModeloOperacion;
          this.nombreModalidad = 'N/A'
          this.nombreTipoComplemento = response[0].sID_TipoComplemento;
        }



      },
      (err) => {
        this.isLoading = false;
      }
    );


  }
  RegresarAprobaciones() {
    this.viewActiva = 0;
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

  /**
   * Function to go back from the current step
   */
  goBack() {

    if (this.step > 0) {

      this.step--;
      this.myStepper.previous();
      this.changeMinMaxSteps(false);
    }
    if (this.step == 0) {
      this.Semanas = 1;
    } else {
      this.Semanas = this.myStepper.selectedIndex + 1;
    }
  }

  /**
   * Function to go forward from the current step
   */
  goForward() {
    this.nums2 = this.nums
    if (this.step < this.totalSteps - 1) {

      this.step++;
      this.myStepper.next();

      this.changeMinMaxSteps(true);
      this.semana = true;
    }
    if (this.step == 0) {
      this.Semanas = 1;
    } else {
      this.Semanas = this.step + 1;
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
  stepSelectionChange(event: StepperSelectionEvent) {
    this.step = event.selectedIndex;
    if (this.step == 0) {
      this.Semanas = 1;
    } else {
      this.Semanas = this.step + 1;
    }



    let num = 0
    if (this.Semanas == 1) {
      num = 5

    }
    this.diasList = [];
    this.tabs = [];
    this.dias(num);
  }

  semanaclic(event: any) {
    this.semana = true;
    if (this.step == 0) {
      this.Semanas = 1;
    } else {
      this.Semanas += 1;
    }
    let num = 0
    if (this.Semanas == 1) {
      num = 5

    }

    this.dias(num);
  }

  dias(id: number) {

    this._MenuPTNSemanaService.getPA_MenuPTNSemanaList(id).subscribe(
      (response) => {
        this.diasList = response;
        this.diasList.sort(function (a, b) {
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
          let com2 = this.diasList.filter(item => item.nombre == com)
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

          this.NivelEducativoList = this.nuevoArray2[0].sID_TipoNivelEducativo;



        }






      },
      (err) => {
      }
    );
  }

  onNivelEducativoChange1(event: any): void {
    this.gradoText = event[0].value;
    let gr = this.diasList.filter(item => item.sID_TipoNivelEducativo == event[0].value && item.nombre == this.diasText);
    this.idMenu = gr[0].id
    this.MenuPreparacion();
  }
  MenuPreparacion() {
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

      },
      (err) => {

      }
    );
  }
  joinRoom(item) {
    if (item.id === 1) {
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {

        this.form.controls['observaciones'].setValue(' ');
      }
    } else {
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
        '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Confirmar aprobación del Operador: </p> ' +
        ` <div style="text-align: center!important; font-size: 20px; color:#005ACA;font-weight: 700;">${localStorage.getItem('pi')}</div> ` +
        '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">(Está acción no se puede revertir) </p> ',
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

    if (this.AprobacionesList == '') {
      this.AprobacionObject.id = 0;
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Nada'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }

      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.AprobacionObject.id_Secciones = 4;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 1;
      this.AprobacionObject.ubicacionOrigen = 'j'
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

          this.cantAprobaciones = 0;
          this.yaCargoAprobaciones = false;


        },
        (err) => {
        }
      );
    } else {
      this.AprobacionObject.id = this.lista[0][0].id;
      this.AprobacionObject.iD_ETC = this.lista[0][0].iD_ETC;
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
      this.AprobacionObject.id_Secciones = this.lista[0][0].id_Secciones;
      this.AprobacionObject.documentoParaAprobar = this.lista[0][0].documentoParaAprobar;
      this.AprobacionObject.fecha = this.lista[0][0].fecha;
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Nada'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }

      this.AprobacionObject.id_Ubicacion = this.lista[0][0].id_Ubicacion;
      this.AprobacionObject.ubicacionOrigen = this.lista[0][0].ubicacionOrigen;


      this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones()
          this.clearForm()

          this.cantAprobaciones = 0;
          this.yaCargoAprobaciones = false;

        },
        (err) => {
        }
      );
    }


  }
  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this.aprobacionesService.getAprobacionesListFull().subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response.filter(item => item.id_Secciones === 4);

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

    this.NivelEducativoList = this.nuevoArray2[0].sID_TipoNivelEducativo;

    this.Preparaciones = false;




  }



}


