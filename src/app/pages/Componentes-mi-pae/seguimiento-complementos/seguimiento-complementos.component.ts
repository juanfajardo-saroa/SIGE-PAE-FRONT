import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PA_SedeJornadaMesSemanaService } from 'src/app/shared/services/PA_SedeJornadaMesSemana.services';
import { PA_SedeJornadaMesSemanaModel } from 'src/app/shared/model/PA_SedeJornadaMesSemanaModel';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { Router } from '@angular/router';
import { PA_ContratosIEService } from 'src/app/shared/services/PA_ContratosIE.services';
import { QuincenaEntregaRacionesExtendService } from 'src/app/shared/services/QuincenaEntregaRacionesExtend.services';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-seguimiento-complementos',
  templateUrl: './seguimiento-complementos.component.html',
  styleUrls: ['./seguimiento-complementos.component.scss']
})
export class SeguimientoComplementosComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  filterForm: FormGroup;

  dataSource: MatTableDataSource<PA_SedeJornadaMesSemanaModel>;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'jornada', 's1', 's2', 's3', 's4', 's5', 's6'];
  displayedTopHeaders: string[] = ['top_municipio', 'top_institucion', 'top_sede', 'top_jornada', 'top_mes'];
  displayedBottomHeaders: string[] = ['s1', 's2', 's3', 's4', 's5', 's6'];


  mesList = [
    { id: 1, name: 'Enero' },
    { id: 2, name: 'Febrero' },
    { id: 3, name: 'Marzo' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' },
    { id: 6, name: 'Junio' },
    { id: 7, name: 'Julio' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' },
    { id: 10, name: 'Octubre' },
    { id: 11, name: 'Noviembre' },
    { id: 12, name: 'Diciembre' },
  ];
  anoList: number[] = [];
  ContratosList: ContratosModel[];

  selIdOperador = Number(localStorage.getItem('IdUbicacion'));


  selectContrato = null;
  selectAno = null;
  selectMes = null;
  selectMesName = null;
  cantidadResultados = null;

  filtered = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sedeJornadaMesSemanaService: PA_SedeJornadaMesSemanaService,
    private QuincenaEntregaRacionesExtendService: QuincenaEntregaRacionesExtendService,
    private _PA_ContratosIEService:PA_ContratosIEService,
    private seguridadService: SeguridadService,
  ) {
    this.filterForm = this.fb.group({
      contrato: ['', Validators.required],
      ano: ['', Validators.required],
      mes: ['', Validators.required],
    });
    this.fillFilters();
    this.anoList = this.fillNumberArray(2021, 2025);
  }

  ngOnInit(): void {
  }

  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);

  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: PA_SedeJornadaMesSemanaModel, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fillTable(idContrato: number, ano: number, mes: number) {
    this.sedeJornadaMesSemanaService.getPA_SedeJornadaMesSemanaList(idContrato, ano, mes).subscribe(
      (response: any) => {
        this.cantidadResultados = response.length;
        this.dataSource = new MatTableDataSource<PA_SedeJornadaMesSemanaModel>(response);
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
      },
      (err) => {
      }
    );
  }

  onFilterClick() {
    this.selectContrato = this.filterForm.get('contrato').value;
    this.selectAno = this.filterForm.get('ano').value;
    this.selectMes = this.filterForm.get('mes').value;
    this.selectMesName = this.mesList.find(element => element.id == this.selectMes).name;
    if (this.selectContrato && this.selectAno && this.selectMes) {
      this.filtered = true;
      this.fillTable(this.selectContrato, this.selectAno, this.selectMes);
    }
  }

  fillNumberArray(begin: number, end: number): number[] {
    let tempArray: number[] = [];
    let index = 0;
    for (let num = begin; num <= end; num++) {
      tempArray[index] = num;
      index++;
    }
    return tempArray;
  }

  fillFilters() {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre === 'Institución educativa' || primernombre === 'institución Educativa' || primernombre === 'Institucion Educativa') {
      this._PA_ContratosIEService.getPA_ContratosIEList(this.selIdOperador).subscribe(
        (response: any) => {
          this.ContratosList = response;
        },
        (err) => {
        }
      );
    } else if (primernombre === 'Operadores' || primernombre === 'Operadores ') {
      this.QuincenaEntregaRacionesExtendService.getContratosList(this.selIdOperador).subscribe(
        (response: any) => {
          this.ContratosList = response;
        },
        (err) => {
        }
      );
    }else{

    }

  }

  applyStyles(color: string) {
    let styles;
    if (color.startsWith('#')) {
      styles = { 'color': color };
    } else {
      styles = { 'color': "#" + color };
    }
    return styles;
  }
  goToDetail(idSede: number, idJornada: number, row: any) {
    localStorage.setItem('mrc', row.municipio);
    localStorage.setItem('irc', row.institEducativa);
    localStorage.setItem('src', row.sede);
    this.router.navigate(['/seguimientoComplementosDetalle'], { queryParams: { idContrato: this.selectContrato, idSede: idSede, ano: this.selectAno, mes: this.selectMes, idJornada: idJornada } });
  }
}
