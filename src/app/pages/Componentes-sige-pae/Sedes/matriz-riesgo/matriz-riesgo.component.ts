import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SedesExtendService } from 'src/app/shared/services/sedes-extend.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'
import { TabsedesComponent } from "../tabsedes/tabsedes.component";
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-matriz-riesgo',
  templateUrl: './matriz-riesgo.component.html',
  styleUrls: ['./matriz-riesgo.component.scss']
})


export class MatrizRiesgoComponent implements OnInit, AfterViewInit, OnDestroy {
  
  private subs = new Subscription();
  idETC = Number(localStorage.getItem('IdUbicacion'));
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  decimalPipe = new DecimalPipe(navigator.language);
  constructor(private router: Router, public servicioMatriz: SedesExtendService) {

  }

  
  dataArray: any;
  isLoading = true;



  ngOnInit(): void {
    //
    this.servicioMatriz.getMatrizRiesgosSede(this.idETC).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<MatrizRiesgo>(this.dataArray);
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

  ngAfterViewInit(): void {

    
    /* this.selectedTabIndex = 2; */
    /* this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); */
  }



  ngOnDestroy() {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  VerDetalle(id: number, instEducativa: string, sede: string, municipio: string) {
    /* alert('entro--->') */
    localStorage.setItem('nombredeUbicacionActualizado','si')
    localStorage.setItem('mri', instEducativa);
    localStorage.setItem('mrs', sede);
    localStorage.setItem('mrm', municipio);
    this.router.navigate(['/matriz-riesgo-detalle'],{ queryParams: {id:id, tab:2} })
   
  }

  displayedColumns: string[] = ['id_sede', 'municipio', 'instEducativa', 'sede', 'priorizadaPAE', 'paeRural', 'racPreparadaSitio', 'racIndustrializada', 'catering',];
  dataSource = new MatTableDataSource<MatrizRiesgo>();
  
  

}


export interface MatrizRiesgo {
  id_sede: number;
  municipio: string;
  instEducativa: string;
  sede: string;
  priorizadaPAE: boolean;
  paeRural: boolean;
  racPreparadaSitio: number;
  racIndustrializada: number;
  catering: number;
}



