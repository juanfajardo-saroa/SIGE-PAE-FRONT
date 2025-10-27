import { PACModel } from './../../../../shared/model/PACMoldel';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresosModel } from 'src/app/shared/model/Ingresos';
import { MesesModel } from 'src/app/shared/model/Meses';
import { PlanGirosModel } from 'src/app/shared/model/PlanGiros';
import { IngresosService } from 'src/app/shared/services/Ingresos.services';
import { MesesService } from 'src/app/shared/services/Meses.services';
import { PACService } from 'src/app/shared/services/PAC.services';
import { PlanGirosService } from 'src/app/shared/services/PlanGiros.services';
import { environment } from 'src/environments/environment';
import { AsignacionRecursosService } from 'src/app/shared/services/AsignacionRecursos.services';
import { AsignacionRecursosModel } from 'src/app/shared/model/AsignacionRecursosModel';
import { DecimalPipe } from '@angular/common';





@Component({
  selector: 'app-consolidado-vigencia',
  templateUrl: './consolidado-vigencia.component.html',
  styleUrls: ['./consolidado-vigencia.component.scss']
})
export class ConsolidadoVigenciaComponent implements OnInit, AfterViewInit, OnDestroy {

  ingresoList: AsignacionRecursosModel[] = [];
  mesesList: MesesModel[] = [];
  ingresoTotal: number = 0;
  solicitadoTotal: number = 0;
  transferidoTotal: number = 0;
  consultarResoluciones = environment.consultarResoluciones;
  private subs = new Subscription();
  plangirosObject: PACModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_Vigencia: 0,
    sID_Vigencia: '',
    mes: 0,
    sMes: '',
    giroProyectado: 0,
    giroConfirmado: 0,
    documentoGiro: '0',
    fechaGiro: new Date(),
    auditoria: '',
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
    completed: false
  }
  totalPiv: PACModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_Vigencia: 0,
    sID_Vigencia: '',
    mes: 0,
    sMes: '',
    giroProyectado: 0,
    giroConfirmado: 0,
    documentoGiro: '0',
    fechaGiro: new Date(),
    auditoria: '',
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
    completed: false
  };

  PACList: PACModel[];
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  constructor(
    public serviciosp: PlanGirosService,
    public servicioIngreso: IngresosService,
    public meses: MesesService,
    private router: Router,
    private _AsignacionRecursosService: AsignacionRecursosService,
    private _PACService: PACService,
  ) { this.filterTable() }


  private dataArray: any;
  displayedColumns: string[] = ['etc', 'solicitado', 'transferido'];

  selMes = -1;


  dataSource = new MatTableDataSource<PACModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  isLoading = true;
  filterTable() {

    this.PACList = [];

    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response;

        const miCarritoSinDuplicados = this.dataArray.reduce((acumulador, valorActual) => {
          const elementoYaExiste = acumulador.find(elemento => elemento.iD_ETC === valorActual.iD_ETC);
          if (elementoYaExiste) {
            return acumulador.map((elemento) => {
              if (elemento.iD_ETC === valorActual.iD_ETC) {
                return {
                  ...elemento,
                  giroConfirmado: elemento.giroConfirmado + valorActual.giroConfirmado,
                  giroProyectado: elemento.giroProyectado + valorActual.giroProyectado

                }
              }

              return elemento;
            });
          }

          return [...acumulador, valorActual];
        }, []);

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(miCarritoSinDuplicados);
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

        let initialValue = 0;
        let initialValue2 = 0
        response.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;

        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }


  ngOnInit(): void {

    this._AsignacionRecursosService.getAsignacionRecursosListfilter(4, Number(this.ViSeleccionada)).subscribe(
      (response: any) => {

        this.ingresoList = response
        let initialValue = 0;

        this.ingresoList.forEach((item) => {
          initialValue += item.valorPresupuestal;
        });
        this.ingresoTotal = initialValue

      },
      (err) => {
      }
    );
    this.allFilters();
  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  allFilters(): void {
    this.meses.getMesesList().subscribe(
      (response: any) => {

        this.mesesList = response;
        this.mesesList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
  }
  onchangeMes(event: number) {
    //this.dataSource

    if (event === -1) {
      this.filterTable();
    } else {

      this._PACService.getPACListRelation().subscribe(
        (response: any) => {
          this.dataArray = response.filter(item => item.mes == event);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
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
          let initialValue = 0;
          let initialValue2 = 0;
          let initialValue3 = 0;
          this.dataArray.forEach((item) => {
            initialValue += item.giroProyectado;
            initialValue2 += item.giroConfirmado;

          });
          this.solicitadoTotal = initialValue;
          this.transferidoTotal = initialValue2;
          this.dataArray.forEach((item2) => {
            let diferencia = item2.giroConfirmado - item2.giroProyectado;
            initialValue3 += diferencia
          });
          //this.diferenciaTotal = initialValue3;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }

  }
  cleanFilters(): void {
    this.allFilters();
    this.filterTable();

    this.selMes = -1;

  }
  openInfraesturaDetalle() {

    this.router.navigate(['/asignacionrecursos'])

  }

}
