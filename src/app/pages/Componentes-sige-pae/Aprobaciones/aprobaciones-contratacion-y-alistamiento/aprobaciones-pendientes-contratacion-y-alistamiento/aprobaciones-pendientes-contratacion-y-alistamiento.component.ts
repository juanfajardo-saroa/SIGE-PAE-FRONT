

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
import { PlanGirosService } from 'src/app/shared/services/PlanGiros.services';
@Component({
  selector: 'app-aprobaciones-pendientes-contratacion-y-alistamiento',
  templateUrl: './aprobaciones-pendientes-contratacion-y-alistamiento.component.html',
  styleUrls: ['./aprobaciones-pendientes-contratacion-y-alistamiento.component.scss']
})
export class AprobacionesPendientesContratacionYAlistamientoComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['modulo', 'seccion', 'documento', 'enviado','accion'];


  dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  dataArray: any;
  dataPlanGiros:any;
  private subs = new Subscription()
  nombreUbicacion = localStorage.getItem('Ubicacion');
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  constructor(private serviciosp: AprobacionesGetAllWithRelService,
    private router: Router,
    private PlanGirosService: PlanGirosService,
    ) { }

  ngOnInit(): void {
    this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
      (response: any) => {
       
        if( this.nombreUbicacion =='Sin definir | Sin Ubicación'){
          let h = response.filter(item => item.iD_Subsistemas === 2);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }else{
          let h = response.filter(item => item.iD_Subsistemas === 2 && item.iD_ETC===this.idETC);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }
 

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.PlanGirosService.getPlanGirosListRelation().subscribe(
      (response: any) => {
        this.dataPlanGiros=response;


      },
      (err) => {
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
        this.isLoading = false;
      }
    );
  }
  direccionara(id:number,ubicacion: any, secciones:number) {
    if (secciones === 1) {
      ///Registro de operadores
      this.router.navigate(['/registro-contratos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 2) {
      //Registro de contratos
      this.router.navigate(['/registro-contratos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 7) {
      //Operadores y contratos proveedores
      this.router.navigate(['/registro-operadores'],{ queryParams: { idsel: id,idubicacion:ubicacion} });
    } else if (secciones === 8) {
      //Planesdealistamiento esta Contratación y alistamiento
       this.router.navigate(['/ContratosAlistamiento'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 9) {
      //Asignación de recursos
      this.router.navigate(['/asignacionrecursos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else if (secciones === 10) {
      //entrega Fuentes de financiación
      this.router.navigate(['/fuentesfinanciacion'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else if (secciones === 11) {
      //PAC
      let pac = this.dataPlanGiros.filter(item => item.id === Number(ubicacion));
      if(pac[0].giroConfirmado===null){
        this.router.navigate(['/PACETC'],{ queryParams: { id: id,idubicacion:ubicacion} });
      }else{
        this.router.navigate(['/PACUAPA'],{ queryParams: { id: id,idubicacion:ubicacion} });
      }

      //this.router.navigate(['/PACUAPA'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else { }



  }
}
