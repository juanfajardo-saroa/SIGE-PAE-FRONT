
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { EstadoQuincenaModel } from 'src/app/shared/model/EstadoQuincena';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { QuincenaEntregaRacionesExtendModel } from 'src/app/shared/model/QuincenaEntregaRacionesExtend';
import { fechasQuincenaListModel } from 'src/app/shared/model/fechasQuincenaList';
import { QuincenaEntregaRacionesExtendService } from 'src/app/shared/services/QuincenaEntregaRacionesExtend.services';

@Component({
  selector: 'app-tabs-quincena-historico',
  templateUrl: './tabs-quincena-historico.component.html',
  styleUrls: ['./tabs-quincena-historico.component.scss']
})
export class TabsQuincenaHistoricoComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  private apiurl = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetBySedeJornadaOperadorH";
  QuincenaEntregaRacionesDetail: QuincenaEntregaRacionesExtendModel | null = null;
  QuincenaEntregaRacionesList: QuincenaEntregaRacionesExtendModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  idETC = environment.idETC;
  nombreOperador = environment.nombreOperador;
  idOperador = environment.nombreOperador;
  fechaQuincenaList: fechasQuincenaListModel[] = [];

  private dataArray: any;
  displayedColumns: string[] = ['numeroContrato', 'nombreDivipola', 'nombreInstitucionEducativa', 'nombreSede', 'nombreJornada', 'nombreEstadoQuincena'];
  public dataSource!: MatTableDataSource<QuincenaEntregaRacionesExtendModel>;
  selection = new SelectionModel<QuincenaEntregaRacionesExtendModel>(true, []);
  ContratosList: ContratosModel[];
  DivipolaList: DivipolasModel[];
  IEList: InstitucionEducativaModel[];
  SedeList: SedesModel[];
  JornadaList: JornadaModel[];
  DiligenciamientoList: EstadoQuincenaModel[];
  numResultado: number = 0;

  selIdOperador = Number(localStorage.getItem('IdUbicacion'));
  selIdGradoSedeJornada = 0;
  selIdContrato = 0;
  selIdMunicipio = 0;
  selIdIE = 0;
  selIdSede = 0;
  selIdJornada = 0;
  selIdDiligenciamiento = 0;
  selQuincena = '';

  fecha_ini: string = formatDate(new Date('2022-06-01 00:00:01'), 'yyyy-MM-dd', 'en-US');
  fecha_fin: string = formatDate(new Date('2022-06-15 23:59:59'), 'yyyy-MM-dd', 'en-US');

  historicoForm: FormGroup;
  myDatepipe!: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public QuincenaEntregaRacionesExtendService: QuincenaEntregaRacionesExtendService,
    private router: Router,
    private jornadaService: JornadaService,
    private divipolaService: DivipolasService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private datepipe: DatePipe,
  ) {

    this.historicoForm = this.fb.group({
      quincena: [],
      contrato: [],
      municipio: [],
      institucion: [],
      sede: [],
      jornada: [],
      diligenciamiento: [],
    });
    this.myDatepipe = datepipe;

    this.allFilters();


    this.QuincenaEntregaRacionesExtendService.getFechasQuincenaHistorico(this.selIdOperador).subscribe(
      (response: any) => {
        this.fechaQuincenaList = response;

        this.fillTable(this.historicoForm);
        //this.fillTableH(this.historicoForm);
      },
      (err) => {
      }
    );

  }

  allFilters() {

    this.QuincenaEntregaRacionesExtendService.getContratosList(this.selIdOperador).subscribe(
      (response: any) => {
        this.ContratosList = response;

      },
      (err) => {
      }
    );

    this.QuincenaEntregaRacionesExtendService.getFechasQuincenaHistorico(this.selIdOperador).subscribe(
      (response: any) => {
        this.fechaQuincenaList = response;
      },
      (err) => {
      }
    );

    /* this.divipolaService.getDivipolasListRelation().subscribe(
     (response: any) => {
       this.DivipolaList = response;
     },
     (err) => {
     }
   ); */
    this.QuincenaEntregaRacionesExtendService.getMunicipiosList(this.selIdOperador, 0).subscribe(
      (response: any) => {
        this.DivipolaList = response;

      },
      (err) => {
      }
    );
    /* this.institucionEducativaService.getInstitucionEducativaListRelation().subscribe(
      (response: any) => {
        this.IEList = response;
      },
      (err) => {
      }
    ); */
    this.QuincenaEntregaRacionesExtendService.getIEList(this.selIdOperador, 0, 0).subscribe(
      (response: any) => {
        this.IEList = response;

      },
      (err) => {
      }
    );

    /*  this.sedesService.getSedesListRelation().subscribe(
       (response: any) => {
         this.SedeList = response;
       },
       (err) => {
       }
     );*/
    this.QuincenaEntregaRacionesExtendService.getSedeList(this.selIdOperador, 0, 0, 0).subscribe(
      (response: any) => {
        this.SedeList = response;
      },
      (err) => {
      }
    );

    /* this.jornadaService.getJornadaList().subscribe(
       (response: any) => {
         this.JornadaList = response;
       },
       (err) => {
       }
     ); */
    this.QuincenaEntregaRacionesExtendService.getJornadaList(this.selIdOperador, 0, 0, 0, 0).subscribe(
      (response: any) => {
        this.JornadaList = response;
      },
      (err) => {
      }
    );

    this.QuincenaEntregaRacionesExtendService.getDiligenciamientoList().subscribe(
      (response: any) => {
        this.DiligenciamientoList = response;
      },
      (err) => {
      }
    );
  }

  fillTable(form: any) {
    this.isLoading = true;
    this.selIdContrato = form.value.contrato ? form.value.contrato : this.selIdContrato;
    this.selIdMunicipio = form.value.municipio ? form.value.municipio : this.selIdMunicipio;
    this.selIdIE = form.value.institucion ? form.value.institucion : this.selIdIE;
    this.selIdSede = form.value.sede ? form.value.sede : this.selIdSede;
    this.selIdJornada = form.value.jornada ? form.value.jornada : this.selIdJornada;
    this.selIdDiligenciamiento = form.value.diligenciamiento ? form.value.diligenciamiento : this.selIdDiligenciamiento;
    this.selQuincena = form.value.quincena ? form.value.quincena : this.selQuincena;

    let ConvertDateBegin = form.value.quincena ? this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == form.value.quincena).fechaInicio, 'yyyy-MM-dd') : this.fecha_ini;
    let ConvertDateEnd = form.value.quincena ? this.myDatepipe.transform(this.fechaQuincenaList.find(element => element.quincena == form.value.quincena).fechaFin, 'yyyy-MM-dd') : this.fecha_fin;



    this.QuincenaEntregaRacionesExtendService.getQuincenaEntregaRacionesListTotalH(this.selIdGradoSedeJornada, this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdIE, this.selIdSede, this.selIdJornada, this.selIdDiligenciamiento, ConvertDateBegin, ConvertDateEnd).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<QuincenaEntregaRacionesExtendModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.numResultado = this.dataArray.length;
      },
      (err) => {
        this.isLoading = false;
      }
    );

  }
  ngOnInit(): void {

    //todo


    if (typeof (this.paginator) !== 'undefined') {
      this.paginator._intl.itemsPerPageLabel = ".Registros por página";
      this.paginator._intl.nextPageLabel = "Siguiente";
      this.paginator._intl.previousPageLabel = "Anterior";
      this.paginator._intl.firstPageLabel = "Primero";
      this.paginator._intl.lastPageLabel = "Último";
    }
  }
  feQH = ''
  traeDatos($event: any): void {
    this.feQH = $event

    this.fillTable(this.historicoForm);
  };

  traeMunicipios(): void {
    this.fillTable(this.historicoForm);
    this.QuincenaEntregaRacionesExtendService.getMunicipiosList(this.selIdOperador, this.selIdContrato).subscribe(
      (response: any) => {
        this.DivipolaList = response;
      },
      (err) => {
      }
    );
  }

  traeIE(): void {
    this.fillTable(this.historicoForm);
    this.QuincenaEntregaRacionesExtendService.getIEList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio).subscribe(
      (response: any) => {
        this.IEList = response;
      },
      (err) => {
      }
    );
  }
  traeSede(): void {
    this.fillTable(this.historicoForm);
    this.QuincenaEntregaRacionesExtendService.getSedeList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdIE).subscribe(
      (response: any) => {
        this.SedeList = response;
      },
      (err) => {
      }
    );
  }

  traeJornada(): void {
    this.fillTable(this.historicoForm);
    this.QuincenaEntregaRacionesExtendService.getJornadaList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdSede, this.selIdIE).subscribe(
      (response: any) => {
        this.JornadaList = response;
      },
      (err) => {
      }
    );
  }

  FiltraJornada(): void {
    this.fillTable(this.historicoForm);
  }

  FiltraDiligenciamiento(): void {
    this.fillTable(this.historicoForm);
  }



  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  cleanFilters(): void {
    this.selIdContrato = 0;
    this.selIdMunicipio = 0;
    this.selIdIE = 0;
    this.selIdSede = 0;
    this.selIdJornada = 0;
    this.selIdDiligenciamiento = 0;
    this.selQuincena = '';
    this.historicoForm.reset();
    this.fillTable(this.historicoForm);
  }

  openDialog(action: string, idSJ: number, idC: number, estado: string, row: QuincenaEntregaRacionesExtendModel): void {
    var tempEstado = estado == "Aprobado" ? 1 : estado == "Rechazado" ? 0 : estado == "Pendiente" ? 2 : 3;
    localStorage.setItem('nombredeUbicacionActualizado', 'si');
    localStorage.setItem('qri', row.nombreInstitucionEducativa);
    localStorage.setItem('qrse', row.nombreSede);
    localStorage.setItem('qrjor', row.nombreJornada);
    localStorage.setItem('feQH', this.feQH)
    this.router.navigate(['/QuincenaEntregaRacionesDetalle'], { queryParams: { id: idSJ, idContrato: idC, tab: 1, estado: tempEstado } })
  }
}

