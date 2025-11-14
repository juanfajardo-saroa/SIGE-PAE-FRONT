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
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { construirDescripcionAprobacion } from 'src/app/shared/utils/aprobaciones-utils';


@Component({
  selector: 'app-aprobaciones-pendientes-ejecucion-y-seguimiento',
  templateUrl: './aprobaciones-pendientes-ejecucion-y-seguimiento.component.html',
  styleUrls: ['./aprobaciones-pendientes-ejecucion-y-seguimiento.component.scss']
})
export class AprobacionesPendientesEjecucionYSeguimientoComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['modulo', 'seccion', 'documento', 'enviado', 'descripcion', 'accion'];


  dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  dataArray: any;
  private subs = new Subscription()
  nombreUbicacion = localStorage.getItem('Ubicacion');
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  constructor(private serviciosp: AprobacionesGetAllWithRelService, private router: Router) { }

  ngOnInit(): void {
    this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
      (response: any) => {
  
        
        if( this.nombreUbicacion =='Sin definir | Sin Ubicación'){
          let h = response.filter(item => item.iD_Subsistemas === 3);
          this.dataArray = h.filter(item => item.fechaAprobacion === null);
        }else{
          let h = response.filter(item => item.iD_Subsistemas === 3 && item.iD_ETC===this.idETC);
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
  direccionare(id: number, ubicacion: any, secciones: number) {
    if (secciones === 12) {
      ///Segimiento raciones
      // this.router.navigate(['/apps/Segimientoraciones']);
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Seguimiento complemento” </p> ',
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
      })

    } else if (secciones === 13) {
      //Gestion de excedientes
      // this.router.navigate(['/apps/Gestiondeexcedientes']);
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Gestión de complementos” </p> ',
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
      })
    } else if (secciones === 14) {
      //Entrega de raciones y víveres esta en ejecucion y seguimiento
      //this.router.navigate(['/apps/Entregaderacionesyvíveress']);

    } else { }

  }

  getDescripcion(element: GetAprobacionesGetAllWithRelModel): string {
    return construirDescripcionAprobacion(element);
  }
}
