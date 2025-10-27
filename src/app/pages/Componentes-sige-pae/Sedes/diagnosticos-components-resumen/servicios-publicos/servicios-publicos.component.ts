import { AfterViewInit, Component, Inject, Injectable, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PA_SedePregRespuestaModel } from 'src/app/shared/model/PA_SedePregRespuestaModel';
import { PA_SedePregRespuestaRequest, PA_SedePregRespuestaService } from 'src/app/shared/services/PA_SedePregRespuesta.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
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
  selector: 'app-servicios-publicos',
  templateUrl: './servicios-publicos.component.html',
  styleUrls: ['./servicios-publicos.component.scss']
})

@Injectable()
export class ServiciosPublicosComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  private subs = new Subscription()

  yaCargoChartOptions = false;
  yaCargoChartOptions2 = false;
  yaCargoChartOptions3 = false;
  yaCargoChartOptions4 = false;
  yaCargoChartOptions5 = false;
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  p = []
  p2 = []
  p3 = []
  p4 = []
  p5 = []
  idETC = Number(localStorage.getItem('IdUbicacion'));
  NombreETC = localStorage.getItem('Ubicacion');
  GetCaracterizacionNivel4Params:GetCaracterizacionNivel4Request={}
  constructor(public servicenivel4: GetCaracterizacionNivel4Service, public dialog: MatDialog) {
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
    this.chartOptions1 = {
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
              return this.openDialog5();
            }
            else {
              return this.openDialog6();
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
    this.chartOptions3 = {
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
              return this.openDialog7();
            }
            else {
              return this.openDialog8();
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
    this.chartOptions4 = {
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
              return this.openDialog9();
            } else {
              return this.openDialog10();
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
      this.traerdatos();
    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.GetCaracterizacionNivel4Params.ID_ETC=0
      this.GetCaracterizacionNivel4Params.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.traerdatos();
    }
    
  }
  traerdatos(){
    this.servicenivel4.getGetCaracterizacionNivel4List(this.GetCaracterizacionNivel4Params).subscribe(
      (response: any) => {

        this.diagnosticoResumen = response
        if (this.diagnosticoResumen.length === 0) {

        } else {
          this.p = this.diagnosticoResumen.filter(e => e.idPregunta === 8);
          if (this.p.length == 0) { } else {
            this.chartOptions.series[0].data.push(this.p[0].si);
            this.chartOptions.series[1].data.push(this.p[0].no);

            this.yaCargoChartOptions = true;
          }
          this.p2 = this.diagnosticoResumen.filter(el => el.idPregunta === 9);
          if (this.p2.length == 0) { } else {
            this.chartOptions1.series[0].data.push(this.p2[0].si);
            this.chartOptions1.series[1].data.push(this.p2[0].no);

            this.yaCargoChartOptions2 = true;
          }
          this.p3 = this.diagnosticoResumen.filter(ep => ep.idPregunta === 11);
          if (this.p3.length == 0) { } else {
            this.chartOptions2.series[0].data.push(this.p3[0].si);
            this.chartOptions2.series[1].data.push(this.p3[0].no);

            this.yaCargoChartOptions3 = true;
          }
          this.p4 = this.diagnosticoResumen.filter(ep => ep.idPregunta === 13);
          if (this.p4.length == 0) { } else {
            this.chartOptions3.series[0].data.push(this.p4[0].si);
            this.chartOptions3.series[1].data.push(this.p4[0].no);

            this.yaCargoChartOptions4 = true;
          }
          this.p5 = this.diagnosticoResumen.filter(et => et.idPregunta === 14);
          if (this.p5.length == 0) { } else {
            this.chartOptions4.series[0].data.push(this.p5[0].si);
            this.chartOptions4.series[1].data.push(this.p5[0].no);

            this.yaCargoChartOptions5 = true;
          }
        }
      },
      (err) => {


      }
    );
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLuzSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogLuzNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogAguaSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog4(): void {
    const dialogRef = this.dialog.open(DialogAguaNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;

  }
  openDialog5(): void {
    const dialogRef = this.dialog.open(DialogAlcantarilladoSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;

  }
  openDialog6(): void {
    const dialogRef = this.dialog.open(DialogAlcantarilladoNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;

  }
  openDialog7(): void {
    const dialogRef = this.dialog.open(DialogGasSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialog8(): void {
    const dialogRef = this.dialog.open(DialogGasNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog9(): void {
    const dialogRef = this.dialog.open(DialogBasuraSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog10(): void {
    const dialogRef = this.dialog.open(DialogBasuraNoContent, {
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
  templateUrl: 'luzsi.dialog.component.html',
  styleUrls: ['./luzsi.dialog.component.scss'],
})
export class DialogLuzSiContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogLuzSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=15
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=15
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
         
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=16
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=16
        
      }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
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


        },
        (err) => {
          this.isLoading = false;

        }
      );
    });

  }



  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe() }
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
  templateUrl: 'luzno.dialog.component.html',
  styleUrls: ['./luzno.dialog.component.scss'],
})
export class DialogLuzNoContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogLuzNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=17
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=8
        this.PA_SedePregRespuestaParams.id_valorescala=17
        
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
    if (this.subs) { this.subs.unsubscribe() }
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
  templateUrl: 'aguasi.dialog.component.html',
  styleUrls: ['./aguasi.dialog.component.scss'],
})
export class DialogAguaSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  constructor(public dialogRef: MatDialogRef<DialogAguaSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=9
        this.PA_SedePregRespuestaParams.id_valorescala=15
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=9
        this.PA_SedePregRespuestaParams.id_valorescala=15
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=9
            this.PA_SedePregRespuestaParams.id_valorescala=16
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=9
            this.PA_SedePregRespuestaParams.id_valorescala=16
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
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


        },
        (err) => {
          this.isLoading = false;

        }
      );
    });
  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe() }
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
  templateUrl: 'aguano.dialog.component.html',
  styleUrls: ['./aguano.dialog.component.scss'],
})
export class DialogAguaNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogAguaNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=9
        this.PA_SedePregRespuestaParams.id_valorescala=17
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=9
        this.PA_SedePregRespuestaParams.id_valorescala=17
        
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
    if (this.subs) { this.subs.unsubscribe() }
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close({ value: 'cerrar' });
    });
    window.location.reload();
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'alcantarilladosi.dialog.component.html',
  styleUrls: ['./alcantarilladosi.dialog.component.scss'],
})
export class DialogAlcantarilladoSiContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogAlcantarilladoSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=11
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=11
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=11
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=11
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
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
  templateUrl: 'alcantarilladono.dialog.component.html',
  styleUrls: ['./alcantarilladono.dialog.component.scss'],
})
export class DialogAlcantarilladoNoContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogAlcantarilladoNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=11
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=11
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=11
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=11
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
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

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'gassi.dialog.component.html',
  styleUrls: ['./gassi.dialog.component.scss'],
})
export class DialogGasSiContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogGasSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=13
        this.PA_SedePregRespuestaParams.id_valorescala=27
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=13
        this.PA_SedePregRespuestaParams.id_valorescala=27
        
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
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'gasno.dialog.component.html',
  styleUrls: ['./gasno.dialog.component.scss'],
})
export class DialogGasNoContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogGasNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=13
        this.PA_SedePregRespuestaParams.id_valorescala=24
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=13
        this.PA_SedePregRespuestaParams.id_valorescala=24
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=13
            this.PA_SedePregRespuestaParams.id_valorescala=25
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=13
            this.PA_SedePregRespuestaParams.id_valorescala=25
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=13
                this.PA_SedePregRespuestaParams.id_valorescala=26
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=13
                this.PA_SedePregRespuestaParams.id_valorescala=26
                
              }
              this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
                (response: any) => {
                  this.dataArray = this.dataArray.concat(response);
                  if (primernombre == 'ETC') {
                    this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                    this.PA_SedePregRespuestaParams.id_caracteristica=13
                    this.PA_SedePregRespuestaParams.id_valorescala=29
                    
                  } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
                  
                    this.PA_SedePregRespuestaParams.ID_ETC=0
                    this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                    this.PA_SedePregRespuestaParams.id_caracteristica=13
                    this.PA_SedePregRespuestaParams.id_valorescala=29
                    
                  }
                  this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
                    (response: any) => {
                      this.dataArray = this.dataArray.concat(response);
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

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'basurasi.dialog.component.html',
  styleUrls: ['./basurasi.dialog.component.scss'],
})
export class DialogBasuraSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogBasuraSiContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=14
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=14
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=14
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=14
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=14
                this.PA_SedePregRespuestaParams.id_valorescala=66
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=14
                this.PA_SedePregRespuestaParams.id_valorescala=66
                
              }
              this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
                (response: any) => {
                  this.dataArray = this.dataArray.concat(response);
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

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'basurano.dialog.component.html',
  styleUrls: ['./basurano.dialog.component.scss'],
})
export class DialogBasuraNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogBasuraNoContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,
  ) {
    this.idETC = data.id;
    this.NombreETC = data.nombre;
    this.ngZone.run(() => {
      var nombresincortar = localStorage.getItem('Ubicacion')
      var nombrecortado = nombresincortar.split(" | ");
      var nombrecortado = nombresincortar.split(" |");
      let primernombre = nombrecortado[0];
      if (primernombre == 'ETC') {
        this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=14
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=14
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=14
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=14
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=14
                this.PA_SedePregRespuestaParams.id_valorescala=67
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=14
                this.PA_SedePregRespuestaParams.id_valorescala=67
                
              }
              this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
                (response: any) => {
                  this.dataArray = this.dataArray.concat(response);
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
