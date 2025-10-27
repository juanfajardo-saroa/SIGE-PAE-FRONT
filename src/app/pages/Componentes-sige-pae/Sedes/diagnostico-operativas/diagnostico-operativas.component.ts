

import { async, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { environment } from 'src/environments/environment';
import { PA_DiagnosticoInfraEstRequest, PA_DiagnosticoInfraEstService } from 'src/app/shared/services/PA_DiagnosticoInfraEst.services';
import { PA_DiagnosticoInfraEstModel } from 'src/app/shared/model/PA_DiagnosticoInfraEstModel';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-diagnostico-operativas',
  templateUrl: './diagnostico-operativas.component.html',
  styleUrls: ['./diagnostico-operativas.component.scss']
})
export class DiagnosticoOperativasComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataEntrante:any;

  idETC = Number(localStorage.getItem('IdUbicacion'));
  PA_DiagnosticoInfraEstParams:PA_DiagnosticoInfraEstRequest={}
  constructor(public servicios: PA_DiagnosticoInfraEstService, private router: Router,private route: ActivatedRoute,) { }
  dataArray: any;
  aprobarid:number;
  displayedColumns: string[] = ['Municipio', 'Institucion Educativa', 'Sede', 'Prorizada para PAE', 'Concepto higiénico favorable', 'Dotacion y equipo', 'Electricidad', 'Alcantarillado', 'Rec.basura', 'Agua potable', 'Gas', 'Almacenamiento', 'preparacion', 'consumo', 'Disp.residuos', 'Areas sanitarias','diagnostico',
    // 'Estado del diagnostico'
  ];
  dataSource = new MatTableDataSource<PA_DiagnosticoInfraEstModel>();
  private subs = new Subscription()


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  isLoading = true;
 idAprobaciones=0;
idSedesUbicacion=0;
  async ngOnInit() {
    //
    console.clear();

   this.route.queryParams.subscribe(params => {
      this.idAprobaciones = +params.id;
      this.idSedesUbicacion = +params.idubicacion;

    });
    this.aprobarid=Number(localStorage.getItem('ap'))
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.PA_DiagnosticoInfraEstParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
      this.tablaprincipal();
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.PA_DiagnosticoInfraEstParams.ID_ETC=0
      this.PA_DiagnosticoInfraEstParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
     this.tablaprincipal();
    }else{
      this.isLoading = false;
    }
    

   
  }
  async tablaprincipal():Promise<void>{
    await this.servicios.getPA_DiagnosticoInfraEstList(this.PA_DiagnosticoInfraEstParams).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_DiagnosticoInfraEstModel>(this.dataArray);
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

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); 4 }
    //
  }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
   // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }


  openInfraesturaDetalle(id:number,ps:string,pm:string,pi:string,estadoCaract:string,dia:number) {
   /* if(estadoCaract != 'Aprobado' && estadoCaract != 'Rechazado' ){
    this.router.navigate(['/DetalleSede',id])
   } */
   localStorage.setItem('nombredeUbicacionActualizado','si')
   localStorage.setItem('ps', ps);
    localStorage.setItem('pm', pm);
    localStorage.setItem('pi', pi);

   this.router.navigate(['/DetalleSede'],{ queryParams: {id:id, tab:0,dia:dia} })

  }

}









