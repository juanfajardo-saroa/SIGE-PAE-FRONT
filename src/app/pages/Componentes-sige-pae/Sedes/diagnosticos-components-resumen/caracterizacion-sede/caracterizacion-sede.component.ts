import { AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexYAxis,
  ApexGrid
} from "ng-apexcharts";
import { Subscription } from 'rxjs';

import { GetCaracterizacionNivel4Request, GetCaracterizacionNivel4Service } from 'src/app/shared/services/GetCaracterizacionNivel4.services';
import { GetCaracterizacionNivel4Model } from 'src/app/shared/model/GetCaracterizacionNivel4Model';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PA_SedePregRespuestaRequest, PA_SedePregRespuestaService } from 'src/app/shared/services/PA_SedePregRespuesta.services';
import { PA_SedePregRespuestaModel } from 'src/app/shared/model/PA_SedePregRespuestaModel';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  legend: ApexLegend;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  colors: string[];
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  tooltip: any; //ApexTooltip;
};
@Component({
  selector: 'app-caracterizacion-sede',
  templateUrl: './caracterizacion-sede.component.html',
  styleUrls: ['./caracterizacion-sede.component.scss']
})
export class CaracterizacionSedeComponent implements OnInit, OnDestroy {

  idETC = Number(localStorage.getItem('IdUbicacion'));
  NombreETC = localStorage.getItem('Ubicacion');
  p = []
  p2 = []

  yaCargoChartOptions = false;
  yaCargoChartOptions2 = false;
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  GetCaracterizacionNivel4Params:GetCaracterizacionNivel4Request={}
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  private subs = new Subscription()
  constructor(private servicenivel4: GetCaracterizacionNivel4Service, public dialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "Sí",
          data: []
        },
        {
          name: "No",
          data: []
        },

      ],
      chart: {
        type: "bar",
        height: 135,
        stacked: true,
        stackType: "100%",
        toolbar: {
          autoSelected: "pan",
          show: false
        },
        events: {
          dataPointSelection: (e, chart, opts) => {

            if (opts.seriesIndex === 0) {
              return this.openDialog();
            }
            else {
              return this.openDialog2();
            }


          },
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      fill: {
        opacity: 1,

      },

      legend: {

        position: 'top',
        horizontalAlign: 'center',
        floating: false,
        offsetY: 10,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        labels: {
          colors: [
            "#1EA640",
            "#FFD400",
            "#FF8400",
            "#FF0000",
          ],
          useSeriesColors: true,
        },

      },
      yaxis: {
        labels: {
          show: false,
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,

        },
      },
      colors: [
        "#1EA640",
        "#FF0000"
      ],
      title: {
        text: undefined,
        align: 'left',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          //color: '#263238'
        },


      },
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: undefined,
          opacity: 0
        },
        column: {
          colors: undefined,
          opacity: 0
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      dataLabels: {

        enabled: true,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '20px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
        },
        background: {
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
          }
        },

      },
      tooltip: {
        x: {
          show: false
        },

      },




    };
    this.chartOptions2 = {
      series: [
        {
          name: "Sí",
          data: []
        },
        {
          name: "No",
          data: []
        },

      ],
      chart: {
        type: "bar",
        height: 135,
        stacked: true,
        stackType: "100%",
        toolbar: {
          autoSelected: "pan",
          show: false
        },
        events: {
          dataPointSelection: (e, chart, opts) => {

            if (opts.seriesIndex === 0) {
              return this.openDialog3();
            }
            else {
              return this.openDialog4();
            }


          },
        },

      },
      plotOptions: {
        bar: {
          horizontal: true,

        }
      },


      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      fill: {
        opacity: 1,

      },

      legend: {

        position: 'top',
        horizontalAlign: 'center',
        floating: false,
        offsetY: 10,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        labels: {
          colors: [
            "#1EA640",
            "#FFD400",
            "#FF8400",
            "#FF0000",
          ],
          useSeriesColors: true,
        },

      },
      yaxis: {
        labels: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false,


        },

      },
      colors: [
        "#1EA640",
        "#FF0000"
      ],
      title: {
        text: undefined,
        align: 'left',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },


      },
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: undefined,
          opacity: 0
        },
        column: {
          colors: undefined,
          opacity: 0
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      dataLabels: {

        enabled: true,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '20px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
        },
        background: {
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
          }
        },

      },
      tooltip: {
        x: {
          show: false
        },

      },




    };
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.GetCaracterizacionNivel4Params.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
      this.traerdatos()
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.GetCaracterizacionNivel4Params.ID_ETC=0
      this.GetCaracterizacionNivel4Params.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.traerdatos()
    }
    
  }

  traerdatos(){
    this.subs = this.servicenivel4.getGetCaracterizacionNivel4List(this.GetCaracterizacionNivel4Params).subscribe(
      (response: any) => {

        this.diagnosticoResumen = response
        if (this.diagnosticoResumen.length === 0) {

        } else {
          this.p = this.diagnosticoResumen.filter(e => e.idPregunta === 1);
          if (this.p.length == 0) { } else {
            this.chartOptions.series[0].data.push(this.p[0].si);
            this.chartOptions.series[1].data.push(this.p[0].no);

            this.yaCargoChartOptions = true;
          }



          this.p2 = this.diagnosticoResumen.filter(el => el.idPregunta === 2);
          if (this.p2.length == 0) { } else {
            this.chartOptions2.series[0].data.push(this.p2[0].si);
            this.chartOptions2.series[1].data.push(this.p2[0].no);

            this.yaCargoChartOptions2 = true;
          }

        }

      },
      (err) => {

      }
    );
  }

  ngOnInit(): void {
    // console.clear();

  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContaminacionSiContent, { data: { id: this.idETC, nombre: this.NombreETC }, });
    return;
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogContaminacionNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogConflictoSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog4(): void {
    const dialogRef = this.dialog.open(DialogConflictoNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }




}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'contaminacionsi.dialog.component.html',
  styleUrls: ['./contaminacionsi.dialog.component.scss'],
})
export class DialogContaminacionSiContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  nombrelength: boolean = false;
  nombreshor: boolean = false;
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  private subs = new Subscription()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogContaminacionSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    if (this.NombreETC.length > 24) {
      this.nombrelength = true;
      this.nombreshor = false;
    } else {
      this.nombrelength = false;
      this.nombreshor = true;
    }
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
      this.PA_SedePregRespuestaParams.id_caracteristica=1
      this.PA_SedePregRespuestaParams.id_valorescala=1
      
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.PA_SedePregRespuestaParams.ID_ETC=0
      this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.PA_SedePregRespuestaParams.id_caracteristica=1
      this.PA_SedePregRespuestaParams.id_valorescala=1
      
    }
     
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>(this.dataArray);
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

    });

  }




  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); 4 }
    //
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  closeDialog(): void {

    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
    //window.location.reload()

  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'contaminacionno.dialog.component.html',
  styleUrls: ['./contaminacionno.dialog.component.scss'],
})
export class DialogContaminacionNoContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  idETC = 0
  NombreETC = ""
  private subs = new Subscription()
  nombrelength: boolean = false;
  nombreshor: boolean = false;
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogContaminacionNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    if (this.NombreETC.length > 24) {
      this.nombrelength = true;
      this.nombreshor = false;
    } else {
      this.nombrelength = false;
      this.nombreshor = true;
    }
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=1
        this.PA_SedePregRespuestaParams.id_valorescala=2
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=1
        this.PA_SedePregRespuestaParams.id_valorescala=2
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>(this.dataArray);
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

    });

  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); } //4
    //
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
    //window.location.reload();
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'conflictosi.dialog.component.html',
  styleUrls: ['./conflictosi.dialog.component.scss'],
})
export class DialogConflictoSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = ""
  idETC = 0;
  nombrelength: boolean = false;
  nombreshor: boolean = false;
  private subs = new Subscription()
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogConflictoSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    if (this.NombreETC.length > 24) {
      this.nombrelength = true;
      this.nombreshor = false;
    } else {
      this.nombrelength = false;
      this.nombreshor = true;
    }
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
      this.PA_SedePregRespuestaParams.id_caracteristica=2
      this.PA_SedePregRespuestaParams.id_valorescala=1
      
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.PA_SedePregRespuestaParams.ID_ETC=0
      this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.PA_SedePregRespuestaParams.id_caracteristica=2
      this.PA_SedePregRespuestaParams.id_valorescala=1
      
    }
     
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>(this.dataArray);
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
    });
  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); 4 }
    //
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
    // window.location.reload();
  }

}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'conflictono.dialog.component.html',
  styleUrls: ['./conflictono.dialog.component.scss'],
})
export class DialogConflictoNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = localStorage.getItem('Ubicacion')
  idETC = Number(localStorage.getItem('IdUbicacion'));
  nombrelength: boolean = false;
  nombreshor: boolean = false;
  private subs = new Subscription()
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogConflictoNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    if (this.NombreETC.length > 24) {
      this.nombrelength = true;
      this.nombreshor = false;
    } else {
      this.nombrelength = false;
      this.nombreshor = true;
    }

    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=2
        this.PA_SedePregRespuestaParams.id_valorescala=2
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=2
        this.PA_SedePregRespuestaParams.id_valorescala=2
        
      }
       
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>(this.dataArray);
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
    });
  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); 4 }
    //
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
    //window.location.reload();
  }
}

