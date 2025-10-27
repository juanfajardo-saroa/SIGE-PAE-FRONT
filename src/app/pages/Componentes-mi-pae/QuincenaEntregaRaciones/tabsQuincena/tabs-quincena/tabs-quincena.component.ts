
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
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { EstadoQuincenaModel } from 'src/app/shared/model/EstadoQuincena';
import { QuincenaEntregaRacionesExtendModel } from 'src/app/shared/model/QuincenaEntregaRacionesExtend';
import { QuincenaEntregaRacionesExtendService } from 'src/app/shared/services/QuincenaEntregaRacionesExtend.services';

@Component({
  selector: 'app-tabs-quincena',
  templateUrl: './tabs-quincena.component.html',
  styleUrls: ['./tabs-quincena.component.scss']
})
export class TabsQuincenaComponent implements OnInit, OnDestroy {

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
  private apiurl = environment.baseUrlAPI_Seguimiento + "PA_QuincenaEntregaRacionesGetBySedeJornadaOperador";
  QuincenaEntregaRacionesDetail: QuincenaEntregaRacionesExtendModel | null = null;
  QuincenaEntregaRacionesList: QuincenaEntregaRacionesExtendModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  idETC = environment.idETC;
  nombreOperador = environment.nombreOperador;
  idOperador = environment.nombreOperador;


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

  ngOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selIdOperador = Number(localStorage.getItem('IdUbicacion'));


  selIdGradoSedeJornada = 0;
  selIdContrato = 0;
  selIdMunicipio = 0;
  selIdIE = 0;
  selIdSede = 0;
  selIdJornada = 0;
  selIdDiligenciamiento = 0;

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public QuincenaEntregaRacionesExtendService: QuincenaEntregaRacionesExtendService,
    private router: Router,
  ) {

    this.filterForm = this.fb.group({
      contrato: [],
      municipio: [],
      institucion: [],
      sede: [],
      jornada: [],
      diligenciamiento: [],
    });
    this.allFilters();
    this.fillTable(this.filterForm);

  }


  allFilters() {

    this.QuincenaEntregaRacionesExtendService.getContratosList(this.selIdOperador).subscribe(
      (response: any) => {
        this.ContratosList = response;


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
        this.DivipolaList = this.DivipolaList.sort((a, b) => a.nombre.localeCompare(b.nombre));
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
    this.QuincenaEntregaRacionesExtendService.getQuincenaEntregaRacionesListTotal(this.selIdGradoSedeJornada, this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdIE, this.selIdSede, this.selIdJornada, this.selIdDiligenciamiento).subscribe(
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

    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";

  }


  traeMunicipios(): void {
    this.fillTable(this.filterForm);
    this.QuincenaEntregaRacionesExtendService.getMunicipiosList(this.selIdOperador, this.selIdContrato).subscribe(
      (response: any) => {
        this.DivipolaList = response;
        this.DivipolaList = this.DivipolaList.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      (err) => {
      }
    );
  }

  traeIE(): void {
    this.fillTable(this.filterForm);
    //alert('idope'+this.selIdOperador+ 'con'+this.selIdContrato+ 'mun'+this.selIdMunicipio);
    this.QuincenaEntregaRacionesExtendService.getIEList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio).subscribe(
      (response: any) => {
        this.IEList = response;

      },
      (err) => {
      }
    );
  }
  traeSede(): void {
    this.fillTable(this.filterForm);
    //alert('idope'+this.selIdOperador+ 'con'+this.selIdContrato+ 'mun'+this.selIdMunicipio+'IE'+this.selIdIE);
    this.QuincenaEntregaRacionesExtendService.getSedeList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdIE).subscribe(
      (response: any) => {
        this.SedeList = response;
      },
      (err) => {
      }
    );
  }

  traeJornada(): void {
    this.fillTable(this.filterForm);
    this.QuincenaEntregaRacionesExtendService.getJornadaList(this.selIdOperador, this.selIdContrato, this.selIdMunicipio, this.selIdSede, this.selIdIE).subscribe(
      (response: any) => {
        this.JornadaList = response;
      },
      (err) => {
      }
    );
  }

  FiltraJornada(): void {
    this.fillTable(this.filterForm);
  }

  FiltraDiligenciamiento(): void {
    this.fillTable(this.filterForm);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  openDialog(action: string, idSJ: number, idC: number, estado: string, row: QuincenaEntregaRacionesExtendModel): void {
    var tempEstado = estado == "Aprobado" ? 1 : estado == "Rechazado" ? 0 : estado == "Pendiente" ? 2 : 3;
    localStorage.setItem('nombredeUbicacionActualizado', 'si');
    localStorage.setItem('qri', row.nombreInstitucionEducativa);
    localStorage.setItem('qrse', row.nombreSede);
    localStorage.setItem('qrjor', row.nombreJornada);
    this.router.navigate(['/QuincenaEntregaRacionesDetalle'], { queryParams: { id: idSJ, idContrato: idC, estado: tempEstado } })
  }

  cleanFilters(): void {
    this.selIdContrato = 0;
    this.selIdMunicipio = 0;
    this.selIdIE = 0;
    this.selIdSede = 0;
    this.selIdJornada = 0;
    this.selIdDiligenciamiento = 0;
    this.filterForm.reset();
    this.fillTable(this.filterForm);
  }
}

