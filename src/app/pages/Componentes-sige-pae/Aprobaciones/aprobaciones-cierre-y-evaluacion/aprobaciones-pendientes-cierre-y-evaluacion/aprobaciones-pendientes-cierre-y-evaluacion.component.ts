import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';

@Component({
  selector: 'app-aprobaciones-pendientes-cierre-y-evaluacion',
  templateUrl: './aprobaciones-pendientes-cierre-y-evaluacion.component.html',
  styleUrls: ['./aprobaciones-pendientes-cierre-y-evaluacion.component.scss']
})
export class AprobacionesPendientesCierreYEvaluacionComponent implements  OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['modulo', 'seccion', 'documento', 'enviado','accion'];


  dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  dataArray: any;
  private subs = new Subscription()
  constructor(private serviciosp: AprobacionesGetAllWithRelService, private router: Router) { }
  nombreUbicacion = localStorage.getItem('Ubicacion');
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  ngOnInit(): void {
    this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
      (response: any) => {
        if( this.nombreUbicacion =='Sin definir | Sin Ubicación'){
          let h = response.filter(item => item.iD_Subsistemas === 4);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }else{
          let h = response.filter(item => item.iD_Subsistemas === 4 && item.iD_ETC===this.idETC);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }
        
        
       

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       
      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
        this.isLoading = false;
      }
    );
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  applyFilter(filterValue: string): void {
  
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pipe = new DatePipe('en-US');
  aplicarfiltrofecha(filterV: any): void {
 
    const m: Moment = filterV;

    if (m != null) {
      let p = this.pipe.transform(filterV, 'yyyy-MM-dd');
   
      const h=this.dataArray.filter(t => t.fecha.toString().toLocaleLowerCase().indexOf(p) !== -1)
 
      this.dataSource=h
    }
 
  }
  applyFilter2(){
    this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
      (response: any) => {
        this.dataArray = response.filter(item => item.iD_Subsistemas === 1);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
 
      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
        this.isLoading = false;
      }
    );
  }
  direccionarce(id: number) {

    localStorage.setItem('ap', id.toString());
    this.dataArray.forEach((element) => {

      if (element.id_Secciones === 0) {
       
      } else { }

    });
  


  }
}
