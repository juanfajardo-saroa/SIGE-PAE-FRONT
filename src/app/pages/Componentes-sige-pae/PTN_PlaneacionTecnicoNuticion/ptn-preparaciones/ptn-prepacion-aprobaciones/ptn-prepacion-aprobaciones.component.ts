
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { SubGrupoAlimentosService } from 'src/app/shared/services/SubGrupoAlimentos.services';
import { PreparacionesModel } from 'src/app/shared/model/Preparaciones';
import { Router } from '@angular/router';
import { PA_BuscarPreparacionesService, PA_BuscarPreparacionRequest } from 'src/app/shared/services/PA_BuscarPreparaciones.services';
import { PA_AporteNutricionalIngredientesRequest, } from 'src/app/shared/services/PA_AporteNutricionalIngredientes.services';
import { PA_AporteNutricionalIngredientesDetRequest, } from 'src/app/shared/services/PA_AporteNutricionalIngredientesDet.services';
import { PA_AportesComponentePreparacionDetRequest, } from 'src/app/shared/services/PA_AporteComponentePreparacionDet.services';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ptn-prepacion-aprobaciones',
  templateUrl: './ptn-prepacion-aprobaciones.component.html',
  styleUrls: ['./ptn-prepacion-aprobaciones.component.scss']
})
export class PtnPrepacionAprobacionesComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  dataArray: any;
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Tipo', 'Modelo', 'Complementos', 'Estado'];
  //dataSource = new MatTableDataSource<DiagnosticoSituacionalModel>();
  public viewActiva: number = 0;

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
  idtab = 0
  constructor(

    private _GrupoAlimentosService: GrupoAlimentosService,
    private _SubGrupoAlimentosService: SubGrupoAlimentosService,
    private router: Router,
    private _PA_BuscarPreparacionesService: PA_BuscarPreparacionesService,
    private _PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,

  ) {

  }
  // Función para verificar si dos arrays son iguales
  arraysAreEqual(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.isLoading = false;

    this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
    this._SubGrupoAlimentosService.getSubGrupoAlimentosList().subscribe(
      (response: any) => {

        this.SubGrupoAlimentoListT = response;
        this.SubGrupoAlimentoListT.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
    this.busquedaPreparacionParams.ID_ETC = this.idETC;

    this._PA_BuscarPreparacionesService.getPA_BuscarPreparacionesList2(this.busquedaPreparacionParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        
        if (this.busquedaPreparacionParams.ID_TipoPreparacion == 0) {

          this.dataArray = response.filter(item => item.iD_TipoPreparacion == 0);
        } else {
          this.dataArray = response;
        }

        // Objeto para almacenar grupos de preparaciones por iD_Preparacion
        const preparacionesMap = new Map();

        // Agrupar por iD_Preparacion
        for (let i = 0; i < this.dataArray.length; i++) {
          const preparacion = this.dataArray[i];
          const idPreparacion = preparacion['iD_Preparacion'];

          if (!preparacionesMap.has(idPreparacion)) {
            // Si no existe el grupo para esta iD_Preparacion, creamos uno nuevo con un array que contendrá las preparaciones
            preparacionesMap.set(idPreparacion, [preparacion]);
          } else {
            // Si ya existe el grupo, agregamos la preparación al array existente
            preparacionesMap.get(idPreparacion).push(preparacion);
          }
        }

        // Iterar sobre los grupos y tratar con los complementosAplica
        preparacionesMap.forEach((preparaciones, idPreparacion) => {
          if (preparaciones.length > 1) {
            // Si hay más de una preparación en el grupo, tratamos los complementosAplica
            const complementosSet = new Set();

            preparaciones.forEach(preparacion => {
              const complementos = preparacion['complementosAplica'];
              if (complementos) {
                complementos.split(', ').forEach(complemento => complementosSet.add(complemento.trim()));
              }
            });

            // Actualizar los complementos en todas las preparaciones del grupo
            const nuevosComplementos = [...complementosSet].join(', ');
            preparaciones.forEach(preparacion => {
              preparacion['complementosAplica'] = nuevosComplementos;
            });
          }
        });

        // Convertir los grupos a un array plano de objetos
        this.dataArray = Array.from(preparacionesMap.values()).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

        var arr = {};

        for (var i = 0, len = this.dataArray.length; i < len; i++)
          arr[this.dataArray[i]['iD_Preparacion']] = this.dataArray[i];

        
        // Volver a convertir el objeto en un array
        this.dataArray = Object.values(arr);
  
        // Ordenar alfabéticamente por la propiedad deseada (por ejemplo, 'nombre')
        this.dataArray.sort((a, b) => {
          const nameA = a.nombrePreparacion.toLowerCase(); // Asegúrate de usar la propiedad correcta
          const nameB = b.nombrePreparacion.toLowerCase(); // Asegúrate de usar la propiedad correcta
          if (nameA < nameB) {
            return -1; // nameA va antes que nameB
          }
          if (nameA > nameB) {
            return 1; // nameA va después que nameB
          }
          return 0; // Son iguales
        });



        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PreparacionesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
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

        this.dataSource.sort = this.sort;


      },
      (err) => {
        this.isLoading = false;
      }
    );

  }

  direccionar(data: any) {
    //localStorage.setItem('nombredeUbicacionActualizado','si')
    this.router.navigate(['/AprobacionesPreparacion'], { queryParams: { id: data.iD_Preparacion } })



  }

  selectionGrupo(id: number) {
    if (id == -1) {
      this.selSubGrupo = -1
      this.busquedaPreparacionParams.ID_GrupoAlimentos = null;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = null;

    } else {
      this._PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(id).subscribe(
        (response: any) => {

          this.SubGrupoAlimentoList = response;
          this.SubGrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

        },
        (err) => {
        }
      )
      /* this.SubGrupoAlimentoList = this.SubGrupoAlimentoListT.filter(item => item.iD_GrupoAlimento == id);
 */
    }

  }
  onchangeGrupoAlimentos(selGrupo: number, selSubGrupo: number, selTipo: any) {
    this.busquedaPreparacionParams.ID_ETC = this.idETC;
    if (selTipo == true) {


      this.busquedaPreparacionParams.ID_TipoPreparacion = 1;
    } else if (selTipo == false) {

      this.busquedaPreparacionParams.ID_TipoPreparacion = 0;
    } else {
      this.busquedaPreparacionParams.ID_ETC = this.idETC;
      this.busquedaPreparacionParams.ID_TipoPreparacion = null;
    }

    if (selGrupo == -1) {
      this.busquedaPreparacionParams.ID_GrupoAlimentos = null;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = null;

    } else {
      this.busquedaPreparacionParams.ID_GrupoAlimentos = selGrupo;
    }

    if (selSubGrupo == -1) {
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = null;
    } else {
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = selSubGrupo;
    }

    this._PA_BuscarPreparacionesService.getPA_BuscarPreparacionesList(this.busquedaPreparacionParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        if (this.busquedaPreparacionParams.ID_TipoPreparacion == 0) {

          this.dataArray = response.filter(item => item.estado != 3 && item.iD_TipoPreparacion == 0);
        } else {
          this.dataArray = response.filter(item => item.estado != 3);
        }
        var arr = {};

        for (var i = 0, len = this.dataArray.length; i < len; i++)
          arr[this.dataArray[i]['iD_Preparacion']] = this.dataArray[i];

        this.dataArray = new Array();
        for (var key in arr)
          this.dataArray.push(arr[key]);
        this.dataArray.sort(function (a, b) {

          return new Date(b.fechaPreparacion).getTime() - new Date(a.fechaPreparacion).getTime();

        });


        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PreparacionesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
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
        this.dataSource.sort = this.sort;


      },
      (err) => {
        this.isLoading = false;
      }
    );



  }

}
