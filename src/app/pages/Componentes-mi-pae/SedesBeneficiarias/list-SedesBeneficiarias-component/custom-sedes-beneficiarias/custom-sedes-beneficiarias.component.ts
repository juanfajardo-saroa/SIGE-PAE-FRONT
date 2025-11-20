import { ModeloOperacion } from './../../../../../shared/model/core/constante.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import { PA_ETCSedesPriorizacionRequest, PA_ETCSedesPriorizacionService } from 'src/app/shared/services/PA_ETCSedesPriorizacion.services';
import { PA_ETCSedesPriorizacionInterface } from 'src/app/shared/model/PA_ETCSedesPriorizacionModel';
import { PA_PrioSedeBeneficiariasModel } from 'src/app/shared/model/PA_PrioSedeBeneficiariasModel';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';

import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';

import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { NivelEducativoModel } from 'src/app/shared/model/NivelEducativo';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { SedesModelosOperacionModel } from 'src/app/shared/model/SedesModelosOperacion';
import { TipoEstadoPriorizacionModel } from 'src/app/shared/model/TipoEstadoPriorizacion';
import { TipoMunicipioModel } from 'src/app/shared/model/TipoMunicipio';
import { ZonasModel } from 'src/app/shared/model/Zonas';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { ETCDivipolaService } from 'src/app/shared/services/ETCDivipola.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_InstutucionesEduGetbyETCRequest, PA_InstutucionesEduGetbyETCService } from 'src/app/shared/services/PA_InstutucionesEduGetbyETC.services';
import { PA_InstutucionesEduGetbyETCModel } from 'src/app/shared/model/PA_InstutucionesEduGetbyETCModel';
import { PA_JornadaGetbyETCRequest, PA_JornadaGetbyETCService } from 'src/app/shared/services/PA_JornadaGetbyETC.services';
import { PA_JornadaGetbyETCModel } from 'src/app/shared/model/PA_JornadaGetbyETCModel';
import { PA_NivelEduGetbyETCRequest, PA_NivelEduGetbyETCService } from 'src/app/shared/services/PA_NivelEduGetbyETC.services';
import { PA_NivelEduGetbyETCModel } from 'src/app/shared/model/PA_NivelEduGetbyETCModel';
import { PA_PrioSedeBeneficiariasService } from 'src/app/shared/services/PA_PrioSedeBeneficiarias.services';
import { PA_SedeGetbyETCRequest, PA_SedeGetbyETCService } from 'src/app/shared/services/PA_SedeGetbyETC.services';
import { PA_SedeGetbyETCModel } from 'src/app/shared/model/PA_SedeGetbyETCModel';
import { PA_ZonaGetbyETCRequest, PA_ZonaGetbyETCService } from 'src/app/shared/services/PA_ZonaGetbyETC.services';
import { PA_ZonaGetbyETCModel } from 'src/app/shared/model/PA_ZonaGetbyETCModel';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { SedesModelosOperacionService } from 'src/app/shared/services/SedesModelosOperacion.services';
import { TipoEstadoPriorizacionService } from 'src/app/shared/services/TipoEstadoPriorizacion.services';
import { TipoMunicipioService } from 'src/app/shared/services/TipoMunicipio.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { environment } from 'src/environments/environment';


import { CriteriosPriorizacionDialog } from './criterios-priorizacion.dialog';
import { DetalleResumenModel } from './models/detalle-resumen.model';
import { ResultadosPriorizacionModel } from './models/resultados-priorizacion';
import { PA_ActualizaSedesPrioModeloOperfil, PA_ActualizaSedesPrioModeloOperService } from 'src/app/shared/services/PA_ActualizaSedesPrioModeloOper.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-custom-sedes-beneficiarias',
  templateUrl: './custom-sedes-beneficiarias.component.html',
  styleUrls: ['./custom-sedes-beneficiarias.component.scss']
})
export class CustomSedesBeneficiariasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  currentYear = new Date().getFullYear();
  columnNames = ['nombre', 'valor'];
  resultadosColumnNames = ['municipio', 'institucionEducativa', 'sede', 'codigoDane', 'matriculaSimat', 'estudiantesSisben', 'priorizada', 'modeloTradicional'];

  dataSourceMunicipios: DetalleResumenModel[] = [];
  dataSourceSedes: DetalleResumenModel[] = [];
  dataSourceMatriculas: DetalleResumenModel[] = [];
  dataSourceEstudiantes: DetalleResumenModel[] = [];

  dataSourceResultados: MatTableDataSource<PA_PrioSedeBeneficiariasModel>;

  selectedMunicipio: string;
  selectedEstado: string;
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;


  SedesList: SedesModel[];
  SedesList2: SedesModel[];

  InstitucionEducativaList: InstitucionEducativaModel[];
  sedePriorizacion: PA_ETCSedesPriorizacionInterface;

  tipoMunicipioList: TipoMunicipioModel[];

  divipolaList: PA_DivipolasGetbyETCModel[];
  institucionList: PA_InstutucionesEduGetbyETCModel[];
  sedesList: PA_SedeGetbyETCModel[];
  sedesJornadaList: PA_JornadaGetbyETCModel[];
  gradosSedesJornadaList: GradosSedesJornadasModel[];
  nivelEducativoList: PA_NivelEduGetbyETCModel[];
  zonasList: PA_ZonaGetbyETCModel[];

  criteriosDeVulnerabilidadList =
    [
      { id: 1, nombre: " Sedes en las que por lo menos el 50% de la población es étnica" },
      { id: 2, nombre: "Sedes en las que por lo menos el 50% de la población tiene alguna discapacidad" },
      { id: 3, nombre: "Sedes en las que por lo menos el 50% de la población es víctima" }];


  // [
  //   { id: 1, nombre: "Discapacitados" },
  //   { id: 2, nombre: "Indígenas" },
  //   { id: 2, nombre: "Víctimas" },
  //   { id: 4, nombre: "No Aplica" }];
  tipoEstadoPriorizacionList: TipoEstadoPriorizacionModel[];
  sedesModelosOperacionList: SedesModelosOperacionModel[];
  sedesModelosOperacionTemp: SedesModelosOperacionModel[];
  mode: any
  sedesBeneficiariasList: PA_PrioSedeBeneficiariasModel[];

  filterParams: PA_PrioSedeBeneficiarias = {};
  PA_ETCSedesPriorizacionParams:PA_ETCSedesPriorizacionRequest={};

  dataArray: ResultadosPriorizacionModel[] = [];

  estadoDePriorizacionList = [{ value: 1, label: 'Priorizada' }, { value: 0, label: 'No priorizada' }, { value: 2, label: 'Pendiente' }];
  estadoDePriorizacionList3 = [{ value: 1, label: 'Si' }, { value: 0, label: 'No' }];
  estadoDePriorizacionList2 = [{ value: 1, label: 'Priorizada' }, { value: 0, label: 'No priorizada' }];
  modeloTradicionalList: string[] = ['MAEM', 'MAER', 'PAEPI', 'NA'];
  modeloEmergenciaList: string[] = ['PAEC', 'NA'];

  isEdit: boolean = false;
  sedesPanel: boolean = true;
  resumenPanel: boolean = true;

  idETC: number = Number(localStorage.getItem('IdUbicacion'));



  panelOpenState: boolean = true;
  panelOpenState2: boolean = true;

  stateColorsMap = new Map<number, string>([
    [1, "green"],
    [0, "red"],
    [2, "#E2ECFD"],
  ]);
  stateColor = "red";
  //filtros
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  prioInstsParams: PA_InstutucionesEduGetbyETCRequest = {};
  prioSedesParams: PA_SedeGetbyETCRequest = {};
  prioJornadaParams: PA_JornadaGetbyETCRequest = {};
  prioNivelParams: PA_NivelEduGetbyETCRequest = {};
  prioZonasParams: PA_ZonaGetbyETCRequest = {};
  prioActualizaSedesPrioModeloOperParams: PA_ActualizaSedesPrioModeloOperfil = {}
  constructor(
    private fb: FormBuilder,
    private tipoMunicipioService: TipoMunicipioService,
    private sedesService: SedesService,
    private sedesPriorizacionService: PA_ETCSedesPriorizacionService,
    private tipoEstadoPriorizacionService: TipoEstadoPriorizacionService,
    private sedesModelosOperacionService: SedesModelosOperacionService,
    private seguridadService: SeguridadService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private _PA_InstutucionesEduGetbyETCService: PA_InstutucionesEduGetbyETCService,
    private _PA_SedeGetbyETCService: PA_SedeGetbyETCService,
    private _PA_JornadaGetbyETCService: PA_JornadaGetbyETCService,
    private _PA_NivelEduGetbyETCService: PA_NivelEduGetbyETCService,
    private _PA_ZonaGetbyETCService: PA_ZonaGetbyETCService,
    private _PA_PrioSedeBeneficiarias: PA_PrioSedeBeneficiariasService,
    private _PA_ActualizaSedesPrioModeloOperService: PA_ActualizaSedesPrioModeloOperService,
    private messageService: MessageService,
    private router: Router,
    public dialog: MatDialog) {

    this.sedesForm = this.fb.group({
      tipoMunicipio: [this.dateToday, Validators.required],
      municipio: [this.dateToday, Validators.required],
      institucionEducativa: ['', Validators.required],
      sede: ['', Validators.required],
      jornada: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      zona: ['', Validators.required],
      criteriosDeVulnerabilidad: ['', Validators.required],
      estadoPriorizacion: ['', Validators.required],
    });


    this.allFilters();
    
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.prioActualizaSedesPrioModeloOperParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.fillTable(this.filterParams);

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.prioActualizaSedesPrioModeloOperParams.id_ETC =0;
      this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa= Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_ETC=0
      this.filterParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.fillTable(this.filterParams);
    }
    
    /* this.sedesService.getSedesListFullfilter(Number(localStorage.getItem('IdUbicacion'))).subscribe(
      (response: any) => {
        this.SedesList2 = response;
      },
      (err) => {
      }
    ); */
    this.sedesModelosOperacionService.getSedesModelosOperacionList().subscribe(
      (response: any) => {
        this.sedesModelosOperacionList = response;
      },
      (err) => {
      }
    );
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  ngOnInit(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.prioActualizaSedesPrioModeloOperParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.PA_ETCSedesPriorizacionParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
      this.PA_ETCSedesPriorizacionParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.traerdatos();

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.prioActualizaSedesPrioModeloOperParams.id_ETC =0;
      this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa= Number(localStorage.getItem('IdUbicacion'));
      this.PA_ETCSedesPriorizacionParams.ID_ETC=0
      this.PA_ETCSedesPriorizacionParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.traerdatos();

    }
    
  }

  downloadFile() {

  }
  traerdatos(){
    this.sedesPriorizacionService.getPA_ETCSedesPriorizacionList(this.PA_ETCSedesPriorizacionParams).subscribe(
      (response: any) => {
        this.sedePriorizacion = response[0];
        this.dataSourceMunicipios = [{ nombre: "Total municipios de la ETC", valor: this.sedePriorizacion.totalMunicipios }]
        this.dataSourceMunicipios.push(
          { nombre: "Municipios con el 100% de las sedes clasificadas", valor: this.sedePriorizacion.totalMunicipios100SedesClas },
          { nombre: "Municipios con menos del 100% de las sedes clasificadas", valor: this.sedePriorizacion.totalMunicipiosmenos100SedesClas },
          { nombre: "Municipios con el 0% de las sedes clasificadas", valor: this.sedePriorizacion.totalMunicipiosCeroSedeClas });
        this.dataSourceSedes = [{ nombre: "Total sedes de la ETC", valor: this.sedePriorizacion.totalSedes }]
        this.dataSourceSedes.push(
          { nombre: "Priorizadas para PAE", valor: this.sedePriorizacion.totalSedesPriorizadaPAE},
          { nombre: "NO priorizadas para PAE", valor: this.sedePriorizacion.totalSedesNOPriorizadaPAE },
          { nombre: "Por clasificar", valor: this.sedePriorizacion.totalSedeClasificar });
        this.dataSourceMatriculas = [{ nombre: "NNA en sedes con MAEM", valor: this.sedePriorizacion.totalMatriMAEM }]
        this.dataSourceMatriculas.push(
          { nombre: "NNA en sedes con MAER", valor: this.sedePriorizacion.totalMatriMAER },
          { nombre: "NNA en sedes con PAEPI", valor: this.sedePriorizacion.totalMatriMAIP }, // CAMBIAR MAIP --> PAEPI
          // { nombre: "NNA en sedes con PAEC", valor: this.sedePriorizacion.totalMatriPAEC }
        );

        this.dataSourceEstudiantes = [{ nombre: "Total estudiantes de la ETC", valor: this.sedePriorizacion.totalEstudiantes }]
        this.dataSourceEstudiantes.push(
          { nombre: "Estudiantes en sedes priorizadas para PAE", valor: this.sedePriorizacion.totalEstudiantesSedePriorizadaPAE },
          { nombre: "Estudiantes en sedes NO priorizadas para PAE", valor: this.sedePriorizacion.totalEstudiantesSedeNOPriorizadaPAE },
          { nombre: "Estudiantes en sedes pendientes por clasificar", valor: this.sedePriorizacion.totalEstudiantesSedesClasificar });
      },
      (err) => {
      }
    );
  }


  allFilters(): void {

    //tipo de municipios

    this.tipoMunicipioService.getTipoMunicipioListFull().subscribe(
      (response: any) => {
        this.tipoMunicipioList = response;
      },
      (err) => {
      }
    );


    // municipio
    this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));

    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
      },
      (err) => {
      }
    );

    //instituto
    this.prioInstsParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));

    this._PA_InstutucionesEduGetbyETCService.getPA_InstutucionesEduGetbyETCList(this.prioInstsParams).subscribe(
      (response: any) => {
        this.institucionList = response;

      },
      (err) => {
      }
    );


    //sedes
    this.prioSedesParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_SedeGetbyETCService.getPA_SedeGetbyETCList(this.prioSedesParams).subscribe(
      (response: any) => {
        this.sedesList = response;
      },
      (err) => {
      }
    );


    //jornada
    this.prioJornadaParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(this.prioJornadaParams).subscribe(
      (response: any) => {
        this.sedesJornadaList = response;
      },
      (err) => {
      }
    );


    //nivel
    this.prioNivelParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(this.prioNivelParams).subscribe(
      (response: any) => {
        this.nivelEducativoList = response;
      },
      (err) => {
      }
    );
    //zonas
    this.prioZonasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(this.prioZonasParams).subscribe(
      (response: any) => {
        this.zonasList = response;
      },
      (err) => {
      }
    );


    this.tipoEstadoPriorizacionService.getTipoEstadoPriorizacionList().subscribe(
      (response: any) => {
        this.tipoEstadoPriorizacionList = response;
      },
      (err) => {
      }
    );

    this.sedesModelosOperacionService.getSedesModelosOperacionList().subscribe(
      (response: any) => {
        this.sedesModelosOperacionList = response;
      },
      (err) => {
      }
    );

  }

  onTipoMunicipioClick(value: any): void {
    this.filterParams.Id_TipoMunicipio = value;

    this.prioDivolasParams.id_TipoMunicipio = value;
    this.prioInstsParams.id_tipoMunicipio = value;
    this.prioSedesParams.id_tipoMunicipio = value;
    this.prioJornadaParams.id_tipoMunicipio = value;
    this.prioNivelParams.id_tipoMunicipio = value;
    this.prioZonasParams.id_tipoMunicipio = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_TipoMunicipio = value;
    this.fillDivolas(this.prioDivolasParams);


  }

  onMunicipioClick(value: any): void {


    this.filterParams.Id_Municipio = value;
    this.prioInstsParams.id_Divipola = value;
    this.prioSedesParams.id_Divipola = value;
    this.prioJornadaParams.id_Divipola = value;
    this.prioNivelParams.id_Divipola = value;
    this.prioZonasParams.id_Divipola = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_Municipio = value;
    this.fillDivolas(this.prioDivolasParams);
    this.fillInstituto(this.prioInstsParams);
  }

  onInstitucionClick(value: any): void {
    this.filterParams.Id_InstEducativa = value;
    this.prioSedesParams.id_IE = value;
    this.prioJornadaParams.id_IE = value;
    this.prioNivelParams.id_IE = value;
    this.prioZonasParams.id_IE = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = value;
    this.fillInstituto(this.prioInstsParams);
    this.fillSede(this.prioSedesParams)



  }

  onSedeClick(value: any): void {
    this.filterParams.Id_sede = value;
    this.prioJornadaParams.id_sede = value;
    this.prioNivelParams.id_sede = value;
    this.prioZonasParams.id_sede = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_sede = value;
    this.fillSede(this.prioSedesParams)
    this.fillJornada(this.prioJornadaParams);


  }

  onJornadaClick(value: any): void {
    this.filterParams.Id_Jornada = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_Jornada = value;
    this.fillTable(this.filterParams);
  }

  onNivelClick(value: any): void {
    this.filterParams.Id_NivelEducativo = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_NivelEducativo = value;
    this.fillTable(this.filterParams);
  }

  onZonaClick(value: any): void {
    this.filterParams.Id_Zona = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_Zona = value;
    this.fillTable(this.filterParams);
  }

  onCriteriosDeVulnerabilidadClick(value: any): void {
    this.filterParams.Id_CriterioVul = value;
    this.prioActualizaSedesPrioModeloOperParams.Id_vulnerabilidad = value;
    this.fillTable(this.filterParams);
  }

  onTipoEstadoPriorizacionClick(value: any) {
    this.prioActualizaSedesPrioModeloOperParams.Id_EstadoPriorizacion = value;
    this.filterParams.priorizadaPAE = value;
    this.fillTable(this.filterParams);
  }
  prio=null
  changeItemPrio(value: any, row: any) {
    this.prio=value;
    this.sedesBeneficiariasList.map(function (dato) {
      if (row.id === null) {
      } else {
        if (dato.id_sede == row.id_sede) {

          dato.check = true;
          dato.priorizada = value

        }
      }
      return dato;
    });
    this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);
  }
  mod=null;
  changeItemMode(value: any, row: any) {
    if (value === 'MAEM') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
      this.mod=1
    } else if (value === 'MAER') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
      this.mod=2
    } else if (value === 'PAEPI') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
      this.mod=3
    } else {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
      this.mod=0
    }
    this.sedesBeneficiariasList.map(function (dato) {
      if (row.id === null) {
      } else {
        if (dato.id_sede == row.id_sede) {

          dato.check = true;
          dato.modeloOperacionTradicional = value
        }
      }
      return dato;
    });
    this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);

  }
  fillTable(filterParamsTable: PA_PrioSedeBeneficiarias): void {

    this._PA_PrioSedeBeneficiarias.getPA_PrioSedeBeneficiariasList(filterParamsTable).subscribe(
      (response: any) => {

        this.sedesBeneficiariasList = response;
        if (response.find(element => element.priorizadaPAE == 1) && response.find(element => element.priorizadaPAE == 0)) {
          this.selectedEstado = "Pendiente";
        } else if (response.find(element => element.priorizadaPAE == 1)) {
          this.selectedEstado = "Aprobado";
        } else if (response.find(element => element.priorizadaPAE == 0)) {
          this.selectedEstado = "Rechazado";
        }

        for (let bene in this.sedesBeneficiariasList) {


          this.sedesBeneficiariasList[bene].modeloOperacionTradicional = this.sedesBeneficiariasList[bene].modeloOperacion ? this.sedesBeneficiariasList[bene].modeloOperacion : "NA";

          if (this.sedesBeneficiariasList[bene].modeloOperacionTradicional == "NA" && this.sedesBeneficiariasList[bene].priorizadaPAE == null) {
            this.sedesBeneficiariasList[bene].priorizada = 2
          } else {
            this.sedesBeneficiariasList[bene].priorizada = this.sedesBeneficiariasList[bene].priorizadaPAE == true ? 1 : this.sedesBeneficiariasList[bene].priorizadaPAE == false ? 0 : 2;
          }
          this.sedesBeneficiariasList[bene].check = false;




        }



        this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);
        this.dataSourceResultados.paginator = this.paginator;
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
      }
    );
  }
  fillDivolas(filterDivolasParams: PA_DivipolasGetbyETCRequest): void {

    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(filterDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillInstituto(filterInstParams: PA_InstutucionesEduGetbyETCRequest): void {
    this._PA_InstutucionesEduGetbyETCService.getPA_InstutucionesEduGetbyETCList(filterInstParams).subscribe(
      (response: any) => {
        this.institucionList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillSede(filterSedesParams: PA_SedeGetbyETCRequest): void {
    this._PA_SedeGetbyETCService.getPA_SedeGetbyETCList(filterSedesParams).subscribe(
      (response: any) => {
        this.sedesList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillJornada(filterJornadaParams: PA_JornadaGetbyETCRequest): void {
    this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(filterJornadaParams).subscribe(
      (response: any) => {
        this.sedesJornadaList = response;
      },
      (err) => {
      }
    );
  }
  fillNivel(filterNivelParams: PA_NivelEduGetbyETCRequest): void {
    this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(filterNivelParams).subscribe(
      (response: any) => {
        this.nivelEducativoList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  fillZona(filterZonasParams: PA_ZonaGetbyETCRequest): void {
    this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(filterZonasParams).subscribe(
      (response: any) => {
        this.zonasList = response;
        this.fillTable(this.filterParams);
      },
      (err) => {
      }
    );
  }
  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  }

  cleanFilters(): void {
    this.sedesForm.reset();
    this.filterParams = {};
    this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.fillTable(this.filterParams);
    this.selectedMunicipio = "";
    this.prioInstsParams.id_Divipola = null;
    this.prioSedesParams.id_Divipola = null;
    this.prioJornadaParams.id_Divipola = null;
    this.prioNivelParams.id_Divipola = null;
    this.prioZonasParams.id_Divipola = null;
    this.filterParams.Id_InstEducativa = null;
    this.prioSedesParams.id_IE = null;
    this.prioJornadaParams.id_IE = null;
    this.prioNivelParams.id_IE = null;
    this.prioZonasParams.id_IE = null;
    this.filterParams.Id_sede = null;
    this.prioJornadaParams.id_sede = null;
    this.prioNivelParams.id_sede = null;
    this.prioZonasParams.id_sede = null;
    this.allFilters();


  }
  prio2=null;;
  onEstadoDePriorizacionChange(event: any): void {
    this.sedesBeneficiariasList.forEach(dato => dato.priorizada = event[0].value);
    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = event[0].value;
    this.prio2=event[0].value
    this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);
  }
mod2=null;
  onModeloTradicionalChange(event: any): void {
    this.sedesBeneficiariasList.forEach(dato => dato.modeloOperacionTradicional = event[0].value);

    if (event[0].value === 'MAEM') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
      this.mod2=1
    } else if (event[0].value === 'MAER') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
      this.mod2=2
    } else if (event[0].value === 'PAEPI') {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
      this.mod2=3
    } else {
      this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
      this.mod2=0
    }
    this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);
  }

  onModeloEmergenciaChange(event: any): void {

    this.dataSourceResultados = new MatTableDataSource<PA_PrioSedeBeneficiariasModel>(this.sedesBeneficiariasList);
  }


  onEditarSedes(): void {
    this.isEdit = true;
  }
  onGuardarSedes(): void {
    let h = this.sedesBeneficiariasList.filter(item => item.check === true)
    let h1 = this.sedesBeneficiariasList.filter(item => item.check != true)

    if(this.prio==null && this.mod==null){
      if(this.prio2==null && this.mod2==null){


      }else if(this.prio2!=null && this.mod2==null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2;
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
                this.actu();


                  },
                  (err) => {
                  }
                );



              });

            }

          },
          (err) => {
          });
      }else if(this.prio2==null && this.mod2!=null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
                this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }else{
        if (h.length == 0) {

          this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2
                    this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                    "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                    "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                    "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                    "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                    "Accion:"+    "Actualizar"+","+
                    "Browser:"+  localStorage.getItem("Browser")+","+
                    "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                    this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                      (response: any) => {
                        this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                        this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                        this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                        this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                        this.prio==null
                        this.mod==null
                        this.prio2==null
                        this.mod2==null
                        this.actu();
                      },
                      (err) => {
                      });

        } else {

        }

      }


    }else if(this.prio!=null && this.mod==null){
      if(this.prio2==null && this.mod2==null){
        if (h.length == 0) {
          this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2


        } else {
          h.forEach(dato => {

            this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
            if (dato.modeloOperacionTradicional === 'MAEM') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
            } else if (dato.modeloOperacionTradicional === 'MAER') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
            } else if (dato.modeloOperacionTradicional === 'PAEPI') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
            } else {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
            }
            this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
            this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
            this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
            "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
            "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
            "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
            "IpPublica:"+    localStorage.getItem("IpPublica")+","+
            "Accion:"+    "Actualizar"+","+
            "Browser:"+  localStorage.getItem("Browser")+","+
            "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
            this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
              (response: any) => {
                this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                this.sedesBeneficiariasList.map(function (dato2) {

                  if (dato2.id_sede == dato.id_sede) {


                    dato2.check = false;

                  }

                  return dato;
                });
                 this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
            this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
            this.prioActualizaSedesPrioModeloOperParams.modelooper=null
            this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
            this.prio==null
            this.mod==null
            this.prio2==null
            this.mod2==null
            this.actu();

              },
              (err) => {
              }
            );




          });

        }

      }else if(this.prio2!=null && this.mod2==null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
                this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });
      }else if(this.prio2==null && this.mod2!=null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
                this.actu();


                  },
                  (err) => {
                  }
                );



              });

            }

          },
          (err) => {
          });

      }else{
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
                this.actu();


                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }




    }else if(this.prio==null && this.mod!=null){

      if(this.prio2==null && this.mod2==null){
        if (h.length == 0) {
          this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2


        } else {
          h.forEach(dato => {

            this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
            if (dato.modeloOperacionTradicional === 'MAEM') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
            } else if (dato.modeloOperacionTradicional === 'MAER') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
            } else if (dato.modeloOperacionTradicional === 'PAEPI') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
            } else {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
            }
            this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
            this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
            this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
            "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
            "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
            "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
            "IpPublica:"+    localStorage.getItem("IpPublica")+","+
            "Accion:"+    "Actualizar"+","+
            "Browser:"+  localStorage.getItem("Browser")+","+
            "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
            this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
              (response: any) => {
                this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                this.sedesBeneficiariasList.map(function (dato2) {

                  if (dato2.id_sede == dato.id_sede) {


                    dato2.check = false;

                  }

                  return dato;
                });
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
                this.mod==null
                this.prio2==null
                this.mod2==null
                this.actu();

              },
              (err) => {
              }
            );




          });

        }

      }else if(this.prio2!=null && this.mod2==null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                    this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                    this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                    this.prio==null
              this.mod==null
              this.prio2==null
              this.mod2==null
                    this.actu();


                  },
                  (err) => {
                  }
                );



              });

            }

          },
          (err) => {
          });
      }else if(this.prio2==null && this.mod2!=null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                    this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                    this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                    this.prio==null
              this.mod==null
              this.prio2==null
              this.mod2==null
                    this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }else{
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
                this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }
    }
    else{
      if(this.prio2==null && this.mod2==null){
        if (h.length == 0) {
          this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2


        } else {
          h.forEach(dato => {

            this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
            if (dato.modeloOperacionTradicional === 'MAEM') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
            } else if (dato.modeloOperacionTradicional === 'MAER') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
            } else if (dato.modeloOperacionTradicional === 'PAEPI') {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
            } else {
              this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
            }
            this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
            this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
            this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
            "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
            "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
            "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
            "IpPublica:"+    localStorage.getItem("IpPublica")+","+
            "Accion:"+    "Actualizar"+","+
            "Browser:"+  localStorage.getItem("Browser")+","+
            "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
            this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
              (response: any) => {
                this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                this.sedesBeneficiariasList.map(function (dato2) {

                  if (dato2.id_sede == dato.id_sede) {


                    dato2.check = false;

                  }

                  return dato;
                });
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
            this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
            this.prioActualizaSedesPrioModeloOperParams.modelooper=null
            this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
            this.prio==null
            this.mod==null
            this.prio2==null
            this.mod2==null
            this.actu();

              },
              (err) => {
              }
            );




          });

        }

      }else if(this.prio2!=null && this.mod2==null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });

                this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
                this.actu();


                  },
                  (err) => {
                  }
                );


              });

            }

          },
          (err) => {
          });
      }else if(this.prio2==null && this.mod2!=null){
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                    this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                    this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                    this.prio==null
              this.mod==null
              this.prio2==null
              this.mod2==null
                    this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }else{
        this.prioActualizaSedesPrioModeloOperParams.modelooper=this.mod2
        this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=this.prio2;
        this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
        "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
        "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
        "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
        "IpPublica:"+    localStorage.getItem("IpPublica")+","+
        "Accion:"+    "Actualizar"+","+
        "Browser:"+  localStorage.getItem("Browser")+","+
        "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";
        this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
          (response: any) => {
            this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
            if (h.length == 0) {
              this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                this.prio==null
          this.mod==null
          this.prio2==null
          this.mod2==null
              this.actu();
            } else {
              h.forEach(dato => {

                this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE = dato.priorizada ?? null;
                if (dato.modeloOperacionTradicional === 'MAEM') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 1
                } else if (dato.modeloOperacionTradicional === 'MAER') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 2
                } else if (dato.modeloOperacionTradicional === 'PAEPI') {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 3
                } else {
                  this.prioActualizaSedesPrioModeloOperParams.modelooper = 0
                }
                this.prioActualizaSedesPrioModeloOperParams.Id_sede = dato.id_sede;
                this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = dato.id_InstEducativa;
                this.prioActualizaSedesPrioModeloOperParams.auditoria="(RolBase:"+localStorage.getItem("RolBase")+","+
                "RolPersonalizado:"+          localStorage.getItem("RolPersonalizado")+","+
                "NombreUsuario:"+        localStorage.getItem("NombreUsuario")+","+
                "Ubicacion:"+    localStorage.getItem("Ubicacion")+","+
                "IpPublica:"+    localStorage.getItem("IpPublica")+","+
                "Accion:"+    "Actualizar"+","+
                "Browser:"+  localStorage.getItem("Browser")+","+
                "NombreMaquina:"+        localStorage.getItem("NombreMaquina")+")";



                this._PA_ActualizaSedesPrioModeloOperService.getPA_ActualizaSedesPrioModeloOperList(this.prioActualizaSedesPrioModeloOperParams).subscribe(
                  (response: any) => {
                    this.messageService.showInfo('REGISTROS ACTUALIZADOS: '+ response[0].afectadas, 'top right');
                    this.sedesBeneficiariasList.map(function (dato2) {

                      if (dato2.id_sede == dato.id_sede) {


                        dato2.check = false;

                      }

                      return dato;
                    });
                    this.prioActualizaSedesPrioModeloOperParams.Id_sede = null;
                    this.prioActualizaSedesPrioModeloOperParams.Id_InstEducativa = null;
                    this.prioActualizaSedesPrioModeloOperParams.modelooper=null
                    this.prioActualizaSedesPrioModeloOperParams.priorizadaPAE=null
                    this.prio==null
              this.mod==null
              this.prio2==null
              this.mod2==null
                    this.actu();

                  },
                  (err) => {
                  }
                );




              });

            }

          },
          (err) => {
          });

      }


    }





    /* this.saveSedePriorizada();
    this.saveModelos(); */

  }
  saveSedePriorizada(): void {


    this.sedesBeneficiariasList.forEach(dato => {


      var sedeTemp = this.SedesList2.find(sede => sede.id == dato.id_sede)
      sedeTemp.priorizacionPAE = dato.priorizada == 1 ? true : dato.priorizada == 0 ? false : null;
      sedeTemp.auditoria = "";
      sedeTemp.filtro = "";
      sedeTemp.telefono = null;
      sedeTemp.direccion = null;



      //sedeTemp.iD_TipoAcceso = null;
      sedeTemp.telefono = sedeTemp.telefono == "" ? "-" : sedeTemp.telefono;
      sedeTemp.direccion = sedeTemp.direccion == "" ? "-" : sedeTemp.direccion;
      if (sedeTemp.priorizacionPAE == null) {
        dato.priorizada = 4
      } else {
        this.sedesService.updateSedes(sedeTemp).subscribe(
          (response: any) => {
          },
          (err) => {
          }
        );

      }




    });

  }
  saveModelos(): void {
    this.sedesBeneficiariasList.forEach(dato => {


      var sedeModeloTemp = this.sedesModelosOperacionList.filter(element => element.iD_sede === this.SedesList2.find(sede => sede.id == dato.id_sede).id);
      this.mode = sedeModeloTemp

      var idmod = 0;
      if (dato.modeloOperacionTradicional === 'MAEM') {
        idmod = 1;
      } else if (dato.modeloOperacionTradicional === 'MAER') {
        idmod = 2;
      } else if (dato.modeloOperacionTradicional === 'PAEPI') {
        idmod = 3;
      } else if (dato.modeloOperacionTradicional === 'NA') {
        idmod = null
      }
      if (this.mode == 0) {

        var createSedeModelo: SedesModelosOperacionModel = {
          id: 0,
          iD_sede: dato.id_sede,

          siD_sede: "",
          iD_TipoModeloOperacion: idmod,
          siD_TipoModeloOperacion: "",
          auditoria: "",
          filtro: "",
          _ippublica: "",
          _nombremaquina: "",
          _usuario: "",
          _ipdetrasproxy: "",
          _browser: "",
          _accion: "",
          _sessionid: "",
          _XMLAuditoria: "",
          isValid: false,
          isSelected: false,
          completed: false,
        }
        if (idmod == null || idmod == 0) {

        } else {
          this.sedesModelosOperacionService.addSedesModelosOperacion(createSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );
        }


      } else {
        if (dato.modeloOperacionTradicional == "MAEM" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) == undefined) {
          var createSedeModelo: SedesModelosOperacionModel = {
            id: 0,
            iD_sede: this.SedesList2.find(sede => sede.nombre == dato.sede).id,
            siD_sede: "",
            iD_TipoModeloOperacion: idmod,
            siD_TipoModeloOperacion: "",
            auditoria: "",
            filtro: "",
            _ippublica: "",
            _nombremaquina: "",
            _usuario: "",
            _ipdetrasproxy: "",
            _browser: "",
            _accion: "",
            _sessionid: "",
            _XMLAuditoria: "",
            isValid: false,
            isSelected: false,
            completed: false,
          }

          this.sedesModelosOperacionService.addSedesModelosOperacion(createSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );
        } else if (dato.modeloOperacionTradicional == "MAEM" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) != undefined) {
          var updateSedeModelo = sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3));
          updateSedeModelo.iD_TipoModeloOperacion = idmod;
          updateSedeModelo.auditoria = "";
          updateSedeModelo.filtro = "";
          this.sedesModelosOperacionService.updateSedesModelosOperacion(updateSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );

        }

        else if (dato.modeloOperacionTradicional == "MAER" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) == undefined) {
          var createSedeModelo: SedesModelosOperacionModel = {
            id: 0,
            iD_sede: this.SedesList2.find(sede => sede.nombre == dato.sede).id,
            siD_sede: "",
            iD_TipoModeloOperacion: idmod,
            siD_TipoModeloOperacion: "",
            auditoria: "",
            filtro: "",
            _ippublica: "",
            _nombremaquina: "",
            _usuario: "",
            _ipdetrasproxy: "",
            _browser: "",
            _accion: "",
            _sessionid: "",
            _XMLAuditoria: "",
            isValid: false,
            isSelected: false,
            completed: false,
          }
          this.sedesModelosOperacionService.addSedesModelosOperacion(createSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );
        } else if (dato.modeloOperacionTradicional == "MAER" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) != undefined) {
          var updateSedeModelo = sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3));
          updateSedeModelo.iD_TipoModeloOperacion = idmod;
          updateSedeModelo.auditoria = "";
          updateSedeModelo.filtro = "";
          this.sedesModelosOperacionService.updateSedesModelosOperacion(updateSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );

        }

        else if (dato.modeloOperacionTradicional == "PAEPI" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) == undefined) {
          var createSedeModelo: SedesModelosOperacionModel = {
            id: 0,
            iD_sede: this.SedesList2.find(sede => sede.nombre == dato.sede).id,
            siD_sede: "",
            iD_TipoModeloOperacion: idmod,
            siD_TipoModeloOperacion: "",
            auditoria: "",
            filtro: "",
            _ippublica: "",
            _nombremaquina: "",
            _usuario: "",
            _ipdetrasproxy: "",
            _browser: "",
            _accion: "",
            _sessionid: "",
            _XMLAuditoria: "",
            isValid: false,
            isSelected: false,
            completed: false,
          }

          this.sedesModelosOperacionService.addSedesModelosOperacion(createSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );
        } else if (dato.modeloOperacionTradicional == "PAEPI" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) != undefined) {
          var updateSedeModelo = sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3));
          updateSedeModelo.iD_TipoModeloOperacion = idmod;
          updateSedeModelo.auditoria = "";
          updateSedeModelo.filtro = "";
          this.sedesModelosOperacionService.updateSedesModelosOperacion(updateSedeModelo).subscribe(
            (response: any) => {
              this.actu();
            },
            (err) => {
            }
          );
        } else if (dato.modeloOperacionTradicional == "NA" && sedeModeloTemp.find(element => (element.iD_TipoModeloOperacion == 1 || element.iD_TipoModeloOperacion == 2 || element.iD_TipoModeloOperacion == 3)) != undefined) {

          this.actu();

        }
      }





    });

  }
  actu(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
     

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
      this.filterParams.id_ETC=0
      this.filterParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
    }

    this.fillTable(this.filterParams);
    this.isEdit = false;
    this.ngOnInit();
  }
  onCancelarSedes(): void {
    this.fillTable(this.filterParams);
    this.isEdit = false;
  }
  expandPanel(): void {
    this.resumenPanel = !this.resumenPanel;
  }
  expandPanel2(): void {
    this.sedesPanel = !this.sedesPanel;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CriteriosPriorizacionDialog, {
      data: { animal: "this.animal", name: "this.name" },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  clickedSede(row: ResultadosPriorizacionModel) {

    this.router.navigate(['/Priorizaciones/' + this.sedesList.find(sede => sede.nombre == row.sede).id]);
  }

}



