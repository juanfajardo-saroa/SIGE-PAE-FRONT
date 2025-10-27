import { AccesosApiService  } from '../../../../../shared/services/acceso-api.service';
import { Component, Inject, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';


@Component({
  selector: 'app-resumen-sedes',
  //providers: [ AccesosApiService ],
  templateUrl: './resumen-sedes.component.html',
  styleUrls: ['./resumen-sedes.component.scss']
})
export class ResumenSedesComponent implements OnInit  ,OnDestroy{

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  idETC :number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  NombreETC: string = String(localStorage.getItem('Ubicacion') ?? "");
  private subs = new Subscription() 
  tipoAcceso: any[] = [];

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxHeight: 15,
          boxWidth: 20,
          padding: 10
        }
      }
    }
  };

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    datasets: [ {
      data: [],
      backgroundColor: ['green', '#FFD400', 'red'],
      hoverBackgroundColor: ['green', '#FFD400', 'red'],
      hoverBorderColor: ['green', '#FFD400', 'red'],
      hoverBorderWidth: [5, 5, 5],
    }]
  };

  pieChartType: ChartType = 'pie';

  constructor(
    private _accesosApiService : AccesosApiService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTiposAccesoSedeList();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  onChartClick = (event: any) => {
    let indexSeleted = event.active[0].index;
    this.openDialog(this.tipoAcceso[indexSeleted]);
  };

  openDialog(acceso: any) {
    const dialogRef = this._dialog.open(DialogDistribucionAccesoContent,
      { data: { idETC: this.idETC, nombre: this.NombreETC, idAcceso: acceso.tipoAccesoId, NombreAcceso: acceso.nombreAcceso },
    });
    dialogRef.afterClosed().subscribe(result => { });
    return;
  }

  getTiposAccesoSedeList(){
    this._accesosApiService.get_TiposAccesoSedeList(this.idETC)
      .subscribe(response => {
        if(response.success){
       //   console.log('response result sede', response);
          const result = response.result;

          for(let i = 0; i < result.length; i++){
            const obj = result[i];
            const porcentaje = parseFloat((obj.porcentaje * 100).toString()).toFixed(0);

            this.pieChartData.labels?.push(
              [(porcentaje) + '% de las sedes', 'Acceso ' + obj.tipoAcceso.toLowerCase()]
            );
            this.pieChartData.datasets[0].data.push(Number(obj.cantidad));

            this.tipoAcceso.push({ tipoAccesoId: obj.tipoAccesoId, nombreAcceso: 'Acceso ' + obj.tipoAcceso.toLowerCase() });
          }

          this.chart?.update();
        }
        else{
          alert("ERROR: " + response.error);
        }
      });
  }

}




@Component({
  selector: 'dialog-content',
  templateUrl: './distribucion-acceso.dialog.component.html',
  styleUrls: ['./distribucion-acceso.dialog.component.scss'],
  //providers: [AccesosApiService]
})
export class DialogDistribucionAccesoContent implements  OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<AccesoSedesModel>();
  isLoading = true;
  idETC = 0;
  NombreETC = "";
  idAcceso = 0;
  NombreAcceso = "";

  private subs = new Subscription()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  constructor(
    public dialogRef: MatDialogRef<DialogDistribucionAccesoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private accesosApi: AccesosApiService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.idETC;
    this.NombreETC = data.nombre;
    this.idAcceso = data.idAcceso;
    this.NombreAcceso = data.NombreAcceso;

    this.ngZone.run(() => {
      this.accesosApi.get_SedeList(this.idETC, this.idAcceso).subscribe(
        (response: any) => {
          if(response.success) {
            this.dataArray = response.result;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<AccesoSedesModel>(this.dataArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
          }
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
  }
}

class AccesoSedesModel implements AccesoSedesInterface {
  constructor(
    public sedeId: number,
    public sede: string,
    public municipioNombre: string,
    public instiEducativa: string
  ) { }
}

interface AccesoSedesInterface {
  sedeId: number;
  sede: string;
  municipioNombre: string;
  instiEducativa: string;
}
