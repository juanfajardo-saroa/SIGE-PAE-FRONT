import { PA_ContratosSedeJornadaRPIService } from 'src/app/shared/services/PA_ContratosSedeJornadaRPI.services';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { GradosModel } from 'src/app/shared/model/Grados';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { PA_ContratosSedeJornadaListaBenefModel } from 'src/app/shared/model/PA_ContratosSedeJornadaListaBenefModel';
import { PA_ContratosSedeJornadaRPIModel } from 'src/app/shared/model/PA_ContratosSedeJornadaRPIModel';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { GradosService } from 'src/app/shared/services/Grados.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { PA_ContratosSedeJornadaListaBenefService } from 'src/app/shared/services/PA_ContratosSedeJornadaListaBenef.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tabla-nombres-detalle',
  templateUrl: './tabla-nombres-detalle.component.html',
  styleUrls: ['./tabla-nombres-detalle.component.scss']
})
export class TablaNombresDetalleComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  TablaNombres: PA_ContratosSedeJornadaListaBenefModel[] = [];
  GradosList: GradosModel[];
  selectGradosList: GradosModel[];
  jornadasList: JornadaModel[];
  selectJornadasList: JornadaModel[];
  filterParams: PA_ContratosSedeJornadaListaBenefModel = {};
  TablaContratos: ContratosModel[] = [];
  TablaDetalle: PA_ContratosSedeJornadaRPIModel[] = [];
  TablaDetalle2: PA_ContratosSedeJornadaRPIModel[] = [];
  TablaDetalle3: PA_ContratosSedeJornadaRPIModel[] = [];
  filterParams2: PA_ContratosSedeJornadaRPIModel = {};
  public dataSource = new MatTableDataSource<PA_ContratosSedeJornadaListaBenefModel>();
  private subs = new Subscription();

  idContrato: number = 0;
  idContrato2: number = 0;
  nombreContrato: string;
  seljornada = 0;
  selgrado = 0;


  displayedColumns: string[] = ['jornada', 'grado', 'perID', 'benef_Nombre'];

  constructor(
    public servicioTablaNombres: PA_ContratosSedeJornadaListaBenefService,
    private fb: FormBuilder,
    public gradosService: GradosService,
    public servicioContratos: ContratosService,
    private jornadaService: JornadaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public servicioTablaDetalle: PA_ContratosSedeJornadaRPIService,


  ) {
    this.route.queryParams.subscribe(params => {
      this.idContrato = + params.id;
      this.idContrato2 = + params.id;
    });
    this.filterParams.id_Contrato = this.idContrato2;
    /* this.fillTable2(this.filterParams)
    this.fillTable(this.filterParams); */
    this.allFilters()
  }
  isLoading = true;

  ngOnInit(): void {
    /*  this.servicioContratos.getContratosList().subscribe(
       (response: any) => {
         this.TablaContratos = response;
         
       },
       (err) => {
         this.isLoading = false;
       }
     );
  */

    this.fillTable(this.filterParams);



    this.nombreContrato = localStorage.getItem('nc');
    this.filterParams2.id_Contrato = this.idContrato2
    this.servicioTablaDetalle.getPA_ContratosSedeJornadaRPIList(this.filterParams2).subscribe(
      (response: any) => {
        this.TablaDetalle = response;
        var arr = {};
        var arr2 = {};
        for (var i = 0, len = this.TablaDetalle.length; i < len; i++)
          arr[this.TablaDetalle[i]['jornada']] = this.TablaDetalle[i];

        this.TablaDetalle = new Array();
        for (var key in arr)
          this.TablaDetalle2.push(arr[key]);

        for (var i = 0, len = this.TablaDetalle.length; i < len; i++)
          arr2[this.TablaDetalle[i]['grado']] = this.TablaDetalle[i];

        this.TablaDetalle = new Array();
        for (var key in arr2)
          this.TablaDetalle3.push(arr2[key]);

      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.servicioTablaDetalle.getPA_ContratosSedeJornadaRPIList(this.filterParams2).subscribe(
      (response: any) => {
        this.TablaDetalle = response;
        var arr = {};



        for (var i = 0, len = this.TablaDetalle.length; i < len; i++)
          arr[this.TablaDetalle[i]['grado']] = this.TablaDetalle[i];

        this.TablaDetalle = new Array();
        for (var key in arr)
          this.TablaDetalle3.push(arr[key]);

      },
      (err) => {
        this.isLoading = false;
      }
    );

  }


  allFilters(): void {
    this.jornadaService.getJornadaList().subscribe(
      (response: any) => {
        this.selectJornadasList = response;
        this.jornadasList = response;
      },
      (err) => {
      }
    );
    this.gradosService.getGradosList().subscribe(
      (response: any) => {
        this.selectGradosList = response;
        this.GradosList = response;
      },
      (err) => {
      }
    );
  }


  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  /* ---FUNCIONES------------ */
  IrATablaBenficiarios() {
    this.router.navigate(['/Beneficiarios', this.idContrato]);
  }
  onDescargarExcel() {
    this.messageService.showInfo('Descargar archivo de Excel', 'top center');
  }
  onChangeContrato(event: number) {
    this.filterParams.id_Contrato = event;
    localStorage.setItem('nomb', event.toString());

    this.fillTable(this.filterParams);
    this.servicioTablaNombres.getPA_ContratosSedeJornadaListaBenefList(this.filterParams).subscribe(
      (response: any) => {
        this.TablaNombres = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaListaBenefModel>(this.TablaNombres);
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
    this.filterParams.id_jornada = null;
    this.filterParams.id_Grado = null;


    this.fillTable(this.filterParams);

  }

  onJornadaClick(event: number): void {
    if (this.seljornada == 0) {
      this.selgrado = -1
    } else { }
  }
  g = 0
  j = 0
  onGradoClick(event: number): void {
    if (this.selgrado == 0) {
      this.seljornada = -1
    } else { }
  }
  buscarInfo(gr: any, jor: any): void {
    if (gr == 0 || gr == -1) { } else {
      let g1 = this.GradosList.filter(item => item.nombre == gr)
      this.g = g1[0].id
    }
    if (jor == 0 || jor == -1) { } else {
      let j1 = this.jornadasList.filter(item => item.nombre == jor)
      this.j = j1[0].id
    }

    if (gr == 0 && jor == 0) {
      this.filterParams.id_Grado = null;
      this.filterParams.id_jornada = null;
      this.fillTable(this.filterParams);
    } else if (gr == -1 && jor == 0) {
      this.filterParams.id_Grado = null;
      this.filterParams.id_jornada = null;
      this.fillTable(this.filterParams);
    } else if (gr == -1 && jor == -1) {
      this.filterParams.id_Grado = null;
      this.filterParams.id_jornada = null;
      this.fillTable(this.filterParams);
    } else if (gr != '' && jor == 0) {

      this.filterParams.id_Grado = this.g;
      this.filterParams.id_jornada = null;
      this.fillTable(this.filterParams);
    } else if (gr == 0 && jor != '') {
      this.filterParams.id_Grado = null;
      this.filterParams.id_jornada = this.j;
      this.fillTable(this.filterParams);
    } else if (gr != '' && jor != '') {
      this.filterParams.id_Grado = this.g;
      this.filterParams.id_jornada = this.j;
      this.fillTable(this.filterParams);
    } else if (gr != '' && jor == -1) {
      this.filterParams.id_Grado = this.g;
      this.filterParams.id_jornada = null;
      this.fillTable(this.filterParams);
    } else if (gr == -1 && jor != '') {
      this.filterParams.id_Grado = null;
      this.filterParams.id_jornada = this.j;
      this.fillTable(this.filterParams);
    }


  }
  fillTable(filterParamsTable: PA_ContratosSedeJornadaListaBenefModel): void {
    this.servicioTablaNombres.getPA_ContratosSedeJornadaListaBenefList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaNombres = response;

        this.isLoading = true;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaListaBenefModel>(this.TablaNombres);
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
  fillTable2(filterParamsTable: PA_ContratosSedeJornadaRPIModel): void {
    this.servicioTablaDetalle.getPA_ContratosSedeJornadaRPIList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaDetalle = response;

        //this.allFilters();
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }





}
