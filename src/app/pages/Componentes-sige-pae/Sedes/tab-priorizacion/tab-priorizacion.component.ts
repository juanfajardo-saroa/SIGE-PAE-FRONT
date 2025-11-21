import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadosRacionesModel } from 'src/app/pages/Componentes-mi-pae/SedesBeneficiarias/list-SedesBeneficiarias-component/custom-sedes-beneficiarias/models/resultados-raciones';
import { MessageService } from 'src/app/services/message.service';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { SedesExtendService } from 'src/app/shared/services/sedes-extend.service';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { SedesModelosOperacionService } from 'src/app/shared/services/SedesModelosOperacion.services';
import { TipoEstadoPriorizacionService } from 'src/app/shared/services/TipoEstadoPriorizacion.services';
import { TipoMunicipioService } from 'src/app/shared/services/TipoMunicipio.services';
import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'
import { PA_Paso1FinService } from 'src/app/shared/services/PA_Paso1Fin.service';
import { PA_PrioSedeAsignaRacionService, PA_PrioSedeAsignaRacion } from 'src/app/shared/services/PA_PrioSedeAsignaRacion.services';
import { PA_PrioSedeAsignaRacionModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionModel';
import { PA_PrioSedeAsignaRacionPivService } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import { PA_PrioSedeAsignaRacionPivModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModel';
import { PA_PrioSedeAsignaRacionPivRequest } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import { TabsedesComponent } from "../tabsedes/tabsedes.component";
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-tab-priorizacion',
  templateUrl: './tab-priorizacion.component.html',
  styleUrls: ['./tab-priorizacion.component.scss']
})


export class TabPriorizacionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);

  resultadosColumnNames = ['municipio', 'institucionEducativa', 'sede', 'matriculaSimat', 'modeloTradicional', 'modalidadSugerida', 'racionesDiarias'];
  SedesList: SedesModel[];
  InstitucionEducativaList: InstitucionEducativaModel[];
  dataArray: ResultadosRacionesModel[] = [];
  dataSourceResultados: MatTableDataSource<ResultadosRacionesModel>;
  prioSedeAsignaRacion: PA_PrioSedeAsignaRacionModel[];
  filterParams: PA_PrioSedeAsignaRacion = {};
  viewingDetail = false;
  prioSedeAsignaRacionPivGeneralList: PA_PrioSedeAsignaRacionPivModel[];
  prioSedeAsignaRacionPivGeneralTemp: PA_PrioSedeAsignaRacionPivModel = {

    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0

  };
  isLoading = true;
  prioSedeAsignaRacionPivParams: PA_PrioSedeAsignaRacionPivRequest = {};
  prioSedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivModel[];
  jornadasList: JornadaModel[];
  dataSourceSedeGeneral: MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>;
  inDetail = false;
  private subs = new Subscription();
  idETC = Number(localStorage.getItem('IdUbicacion'));

  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  private dataArrayAsigna: any;
  atLeastOneAlert: boolean;
  atLeastOneAlertYellow: boolean;
  constructor(
    private sedesService: SedesService,
    private institucionEducativaService: InstitucionEducativaService,
    private prioSedeAsignaRacionService: PA_PrioSedeAsignaRacionService,
    private jornadaService: JornadaService,
    private prioSedeAsignaRacionPivService: PA_PrioSedeAsignaRacionPivService,
    private router: Router,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_Vigencia=Number(localStorage.getItem('VigSeleccionada'));
    this.fillTable(this.filterParams);

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.filterParams.id_ETC=0
      this.filterParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.id_Vigencia=Number(localStorage.getItem('VigSeleccionada'));
      this.fillTable(this.filterParams);
    }
    
  }

  ngAfterViewInit(): void {

  }

  clickedSede(row: ResultadosRacionesModel) {


    localStorage.setItem('nombredeUbicacionActualizado','si')
    localStorage.setItem('pri', row.institucionEducativa);
    localStorage.setItem('prs', row.sede);
    localStorage.setItem('prm', row.municipio);
    localStorage.setItem('EsMaem', row.modeloOperacionTradicional);
    this.router.navigate(['/PriorizacionDetalle'],{ queryParams: {id:row.idSede, tab:3} })

    //this.inDetail = true;

  }


  ngOnDestroy() {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  fillTable(filterParamsTable: PA_PrioSedeAsignaRacion): void {
    this.prioSedeAsignaRacionService.getPA_PrioSedeAsignaRacionList(filterParamsTable).subscribe(
      (response: any) => {

        this.dataArrayAsigna = response.filter(item=>item.modeloOperacion != null);
        this.dataArray = [];
        this.atLeastOneAlert = false;
        this.atLeastOneAlertYellow = false;
        this.dataArrayAsigna.forEach(
          element => {
            if(element.banderaRoja && element.estadoPriorizacion != "Incompleta" && element.estadoPriorizacion != "Pendiente" && element.estadoPriorizacion != "Aprobada" && element.estadoPriorizacion != "Rechazada") {
              this.atLeastOneAlert = true;
            }
            if(element.banderaAmarilla) {
              this.atLeastOneAlertYellow = true;

            }


            this.dataArray.push({
              municipio: element.municipio,
              institucionEducativa: element.instEducativa,
              sede: element.sede,
              codigoDane: element.codigoDane,
              idSede: element.id_sede,
              matriculaSIMAT: element.matriculaSIMAT,
              modeloOperacionTradicional: element.modeloOperacion,
              modeloOperacionEmergencia: element.modeloOperacionER,
              modalidadSugerida: element.modalidadSugerida,
              racionesDiarias: element.racionDiaria,
              estadoPriorizacion: element.estadoPriorizacion,
              id_EstadoPrio: element.id_EstadoPrio,

              haveAlert: element.banderaRoja,
              haveYellowAlert: element.banderaAmarilla
            });
          }
        );
        this.isLoading=false;

        this.dataSourceResultados = new MatTableDataSource<ResultadosRacionesModel>(this.dataArray);
        this.dataSourceResultados.paginator = this.paginator;
        this.dataSourceResultados.sort = this.sort;
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
}



