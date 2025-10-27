import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { PA_OperadorContratosService } from 'src/app/shared/services/PA_OperadorContratos.services';
import { PA_OperadorContratosModel } from 'src/app/shared/model/PA_OperadorContratosModel';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-consulta-beneficiarios-y-raciones',
  templateUrl: './consulta-beneficiarios-y-raciones.component.html',
  styleUrls: ['./consulta-beneficiarios-y-raciones.component.scss']
})
export class ConsultaBeneficiariosYRacionesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  TablaConsultaBenefRaciones: PA_OperadorContratosModel[] = [];

  public dataSource = new MatTableDataSource<PA_OperadorContratosModel>();
  private subs = new Subscription();

  idOperador = environment.idOperador;
  nombreOperador = environment.nombreOperador;

  displayedColumns: string[] = ['id_contrato', 'numeroContrato', 'etC_Nombre', 'municipio', 'tipoContrato', 'modeloOper'];

  /* Parte fecha y titulo */
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  /* Fin Parte fecha y titulo */
  operador: boolean = false;
  public tipoSeleccionado: number = 1;
  idtab = 0;
  apr: boolean = false;
  dis: boolean = false;
  constructor(
    private router: Router,
    public servicioTablaConsultaBenefRaciones: PA_OperadorContratosService,) {

    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Operadores' || primernombre == 'operadores') {

      this.operador = true;

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.operador = false;
    }

  }

  dataArray: any;
  isLoading = true;

  ngOnInit(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Operadores' || primernombre == 'operadores') {

      this.operador = true;
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 1).subscribe(
        (response: any) => {
          this.TablaConsultaBenefRaciones = response;

          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_OperadorContratosModel>(this.TablaConsultaBenefRaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = 'Registros por página';
          this.paginator._intl.nextPageLabel = 'Siguiente';
          this.paginator._intl.previousPageLabel = 'Anterior';
          this.paginator._intl.firstPageLabel = 'Primero';
          this.paginator._intl.lastPageLabel = 'Último';
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

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.operador = false;
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 0).subscribe(
        (response: any) => {
          this.TablaConsultaBenefRaciones = response;

          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_OperadorContratosModel>(this.TablaConsultaBenefRaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = 'Registros por página';
          this.paginator._intl.nextPageLabel = 'Siguiente';
          this.paginator._intl.previousPageLabel = 'Anterior';
          this.paginator._intl.firstPageLabel = 'Primero';
          this.paginator._intl.lastPageLabel = 'Último';
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

  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  /* ---FUNCIONES------------ */

  IrABenficiarios(id: number, NumeroContrato: string) {
    localStorage.setItem('UbicacionShow2', NumeroContrato)
    this.router.navigate(['/Beneficiarios'], { queryParams: { id: id } });

  }
}
