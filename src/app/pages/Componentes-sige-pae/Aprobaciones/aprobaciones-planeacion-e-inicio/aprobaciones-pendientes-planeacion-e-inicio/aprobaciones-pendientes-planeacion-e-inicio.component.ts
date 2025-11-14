import { SedesService } from './../../../../../shared/services/Sedes.services';
import { filter } from 'rxjs/operators';

import { AfterViewInit, Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Moment } from 'moment';
import { environment } from 'src/environments/environment';
import { PA_DiagnosticoInfraEstRequest, PA_DiagnosticoInfraEstService } from 'src/app/shared/services/PA_DiagnosticoInfraEst.services';
import { leadingComment } from '@angular/compiler';
import { construirDescripcionAprobacion } from 'src/app/shared/utils/aprobaciones-utils';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-aprobaciones-pendientes-planeacion-e-inicio',
  templateUrl: './aprobaciones-pendientes-planeacion-e-inicio.component.html',
  styleUrls: ['./aprobaciones-pendientes-planeacion-e-inicio.component.scss']
})
export class AprobacionesPendientesPlaneacionEInicioComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['modulo', 'seccion', 'documento', 'enviado', 'descripcion', 'accion'];


  dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  dataArray: any;
  fechaPipe: any;
  private subs = new Subscription()
  nombreUbicacion = localStorage.getItem('Ubicacion');
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  PA_DiagnosticoInfraEstParams:PA_DiagnosticoInfraEstRequest={}
  constructor(private serviciosp: AprobacionesGetAllWithRelService,
    private router: Router,private _liveAnnouncer: LiveAnnouncer,
    private _SedesService:SedesService,
    private serviciosInfra: PA_DiagnosticoInfraEstService) { }

  ngOnInit(): void {
    this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
      (response: any) => {

        if( this.nombreUbicacion =='Sin definir | Sin Ubicación'){
          let h = response.filter(item => item.iD_Subsistemas === 1);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }else{
          let h = response.filter(item => item.iD_Subsistemas === 1 && item.iD_ETC===this.idETC);
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
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pipe = new DatePipe('en-US');
  aplicarfiltrofecha(filterV: any): void {
    //const ConvertDate = this.fechaPipe.transform(filterV, 'yyyy-MM-dd');
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
  direccionar(id:number,ubicacion: any, secciones:number,etc:number) {
    if (secciones === 4) {
      ///infraestructura
      this._SedesService.getSedesListRelationFilter4(Number(ubicacion)).subscribe(
        (response: any) => {
          let h1 = response;
       
          this.PA_DiagnosticoInfraEstParams.ID_ETC=h1[0].iD_ETC;
  
          this.serviciosInfra.getPA_DiagnosticoInfraEstList(this.PA_DiagnosticoInfraEstParams).subscribe(
            (response: any) => {
              let h = response;

              localStorage.setItem('ps', h[0].sede);
              localStorage.setItem('pm', h[0].municipio);
              localStorage.setItem('pi', h[0].instEducativa);
              localStorage.setItem('nombredeUbicacionActualizado','si')
              this.router.navigate(['/DetalleSede'],{ queryParams: {id:ubicacion, tab:0,dia:3,et:h1[0].iD_ETC} })
            },
            (err) => {
              this.isLoading = false;

            }
          );

        },
        (err) => {
          this.isLoading = false;

        }
       );
    } else if (secciones === 3) {
      //priorizacion
      //this.router.navigate(['/Priorizacion']);
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Priorización de Sedes educativas”, subsección "Sedes Beneficiarias de la ETC" </p> ',
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
      })
    } else if (secciones === 5) {
      //minutas
      this.router.navigate(['/minuta-excepcional'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 6) {
      //entrega Complementos
     // this.router.navigate(['/EntregaRaciones']);
     Swal.fire({
      showCloseButton: true,
      html:
        '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Seguimientoa raciones” </p> ',
      showConfirmButton: true,
      confirmButtonColor: '#009922',
      confirmButtonText: 'Aceptar',
    })
    }else if(secciones===17){
      //ptn preparacion AprobacionesPreparacion?id=645
      this.router.navigate(['/AprobacionesPreparacion'],{ queryParams: { id: ubicacion,etc:etc} });
    }else if(secciones===18){
      //ptn preparacion AprobacionesPreparacion?id=645
      this.router.navigate(['/AprobacionesCiclomenu'],{ queryParams: { id: ubicacion,etc:etc} });
    } else { }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDescripcion(element: GetAprobacionesGetAllWithRelModel): string {
    return construirDescripcionAprobacion(element);
  }
}
