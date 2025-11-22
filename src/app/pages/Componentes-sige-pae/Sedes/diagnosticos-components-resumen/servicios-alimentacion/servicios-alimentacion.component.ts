import { Component, Inject, OnDestroy, OnInit, Optional, ViewChild, AfterViewInit, NgZone } from '@angular/core';
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
  selector: 'app-servicios-alimentacion',
  templateUrl: './servicios-alimentacion.component.html',
  styleUrls: ['./servicios-alimentacion.component.scss']
})
export class ServiciosAlimentacionComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  public chartOptions5: Partial<ChartOptions>;
  private subs = new Subscription()
  GetCaracterizacionNivel4Params:GetCaracterizacionNivel4Request={}

  yaCargoChartOptions = false;
  yaCargoChartOptions2 = false;
  yaCargoChartOptions3 = false;
  yaCargoChartOptions4 = false;
  yaCargoChartOptions5 = false;
  yaCargoChartOptions6 = false;
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  p = [];
  p2 = [];
  p3 = [];
  p4 = [];
  p5 = [];
  p6 = [];
  p7 = [];
  idETC = Number(localStorage.getItem('IdUbicacion'));
  NombreETC = localStorage.getItem('Ubicacion');


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
            }
            else {
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
    this.chartOptions5 = {
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
              return this.openDialog11();
            }
            else {
              return this.openDialog12();
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
          this.p = this.diagnosticoResumen.filter(e => e.idPregunta === 16);
          if (this.p.length == 0) { } else {
            this.chartOptions.series[0].data.push(this.p[0].si);
            this.chartOptions.series[1].data.push(this.p[0].no);

            this.yaCargoChartOptions = true;
          }
          this.p2 = this.diagnosticoResumen.filter(el => el.idPregunta === 30);
          if (this.p2.length == 0) { } else {
            this.chartOptions1.series[0].data.push(this.p2[0].si);
            this.chartOptions1.series[1].data.push(this.p2[0].no);

            this.yaCargoChartOptions2 = true;
          }
          this.p3 = this.diagnosticoResumen.filter(ep => ep.idPregunta === 44);
          if (this.p3.length == 0) { } else {
            this.chartOptions2.series[0].data.push(this.p3[0].si);
            this.chartOptions2.series[1].data.push(this.p3[0].no);

            this.yaCargoChartOptions3 = true;
          }
          this.p4 = this.diagnosticoResumen.filter(ep => ep.idPregunta === 52);
          if (this.p4.length == 0) { } else {
            this.chartOptions3.series[0].data.push(this.p4[0].si);
            this.chartOptions3.series[1].data.push(this.p4[0].no);

            this.yaCargoChartOptions4 = true;
          }
          this.p5 = this.diagnosticoResumen.filter(et => et.idPregunta === 55);
          if (this.p5.length == 0) { } else {
            this.chartOptions4.series[0].data.push(this.p5[0].si);
            this.chartOptions4.series[1].data.push(this.p5[0].no);

            this.yaCargoChartOptions5 = true;
          }
          this.p6 = this.diagnosticoResumen.filter(ey => ey.idPregunta === 40);
          if (this.p6.length == 0) { } else {
            this.chartOptions5.series[0].data.push(this.p6[0].si);
            this.chartOptions5.series[1].data.push(this.p6[0].no);

            this.yaCargoChartOptions6 = true;
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
    const dialogRef = this.dialog.open(DialogAlmacenamientoSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogAlmacenamientoNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogPreparacionSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog4(): void {
    const dialogRef = this.dialog.open(DialogPreparacionNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog5(): void {
    const dialogRef = this.dialog.open(DialogConsumoSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog6(): void {
    const dialogRef = this.dialog.open(DialogConsumoNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog7(): void {
    const dialogRef = this.dialog.open(DialogResiduosSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog8(): void {
    const dialogRef = this.dialog.open(DialogResiduosNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog9(): void {
    const dialogRef = this.dialog.open(DialogSanitariasSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog10(): void {
    const dialogRef = this.dialog.open(DialogSanatariasNoContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog11(): void {
    const dialogRef = this.dialog.open(DialogDotacionSiContent, {
      data: { id: this.idETC, nombre: this.NombreETC },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog12(): void {
    const dialogRef = this.dialog.open(DialogDotacionNoContent, {
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
  templateUrl: 'almacenamientosi.dialog.component.html',
  styleUrls: ['./almacenamientosi.dialog.component.scss'],
})
export class DialogAlmacenamientoSiContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogAlmacenamientoSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=16
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=16
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=16
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=16
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
    //window.location.reload();
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'almacenamientono.dialog.component.html',
  styleUrls: ['./almacenamientono.dialog.component.scss'],
})
export class DialogAlmacenamientoNoContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogAlmacenamientoNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=16
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=16
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=16
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=16
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
    // window.location.reload();
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'preparacionsi.dialog.component.html',
  styleUrls: ['./preparacionsi.dialog.component.scss'],
})
export class DialogPreparacionSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogPreparacionSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=30
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=30
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=30
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=30
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
    //window.location.reload();
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'preparacionno.dialog.component.html',
  styleUrls: ['./preparacionno.dialog.component.scss'],
})
export class DialogPreparacionNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogPreparacionNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=30
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=30
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=30
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=30
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
    // window.location.reload();
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'consumosi.dialog.component.html',
  styleUrls: ['./consumosi.dialog.component.scss'],
})
export class DialogConsumoSiContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogConsumoSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=44
        this.PA_SedePregRespuestaParams.id_valorescala=98
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=44
        this.PA_SedePregRespuestaParams.id_valorescala=98
        
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
  templateUrl: 'consumono.dialog.component.html',
  styleUrls: ['./consumono.dialog.component.scss'],
})
export class DialogConsumoNoContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogConsumoNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=44
        this.PA_SedePregRespuestaParams.id_valorescala=95
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=44
        this.PA_SedePregRespuestaParams.id_valorescala=95
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=44
            this.PA_SedePregRespuestaParams.id_valorescala=96
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=44
            this.PA_SedePregRespuestaParams.id_valorescala=96
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=44
                this.PA_SedePregRespuestaParams.id_valorescala=97
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=44
                this.PA_SedePregRespuestaParams.id_valorescala=97
                
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
  templateUrl: 'residuossi.dialog.component.html',
  styleUrls: ['./residuossi.dialog.component.scss'],
})
export class DialogResiduosSiContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogResiduosSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=52
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=52
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=52
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=52
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
    //window.location.reload();
  }
}
@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'residuosno.dialog.component.html',
  styleUrls: ['./residuosno.dialog.component.scss'],
})
export class DialogResiduosNoContent implements OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogResiduosNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=52
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=52
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=52
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=52
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
  templateUrl: 'sanitariassi.dialog.component.html',
  styleUrls: ['./sanitariassi.dialog.component.scss'],
})
export class DialogSanitariasSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogSanitariasSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=55
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=55
        this.PA_SedePregRespuestaParams.id_valorescala=11
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=55
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=55
            this.PA_SedePregRespuestaParams.id_valorescala=1
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=55
                this.PA_SedePregRespuestaParams.id_valorescala=320
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=55
                this.PA_SedePregRespuestaParams.id_valorescala=320
                
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
  templateUrl: 'sanitariasno.dialog.component.html',
  styleUrls: ['./sanitariasno.dialog.component.scss'],
})
export class DialogSanatariasNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogSanatariasNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=55
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=55
        this.PA_SedePregRespuestaParams.id_valorescala=12
        
      }
      this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
        (response: any) => {
          this.dataArray = response;
          if (primernombre == 'ETC') {
            this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=55
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
          
            this.PA_SedePregRespuestaParams.ID_ETC=0
            this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
            this.PA_SedePregRespuestaParams.id_caracteristica=55
            this.PA_SedePregRespuestaParams.id_valorescala=2
            
          }
          this.SedePregRespuestaService.getPA_SedePregRespuestaList(this.PA_SedePregRespuestaParams).subscribe(
            (response: any) => {
              //this.dataArray.unshift(response);
              this.dataArray = this.dataArray.concat(response);
              if (primernombre == 'ETC') {
                this.PA_SedePregRespuestaParams.ID_ETC= Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=55
                this.PA_SedePregRespuestaParams.id_valorescala=321
                
              } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
              
                this.PA_SedePregRespuestaParams.ID_ETC=0
                this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
                this.PA_SedePregRespuestaParams.id_caracteristica=55
                this.PA_SedePregRespuestaParams.id_valorescala=321
                
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
  templateUrl: 'dotacionsi.dialog.component.html',
  styleUrls: ['./dotacionsi.dialog.component.scss'],
})
export class DialogDotacionSiContent implements OnDestroy {

  dataArray: any;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogDotacionSiContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=40
        this.PA_SedePregRespuestaParams.id_valorescala=1
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=40
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
    //window.location.reload();
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'dotacionno.dialog.component.html',
  styleUrls: ['./dotacionno.dialog.component.scss'],
})
export class DialogDotacionNoContent implements OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  isLoading = true;
  NombreETC = "";
  idETC = 0;
  private subs = new Subscription();
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(public dialogRef: MatDialogRef<DialogDotacionNoContent>,
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
        this.PA_SedePregRespuestaParams.id_caracteristica=40
        this.PA_SedePregRespuestaParams.id_valorescala=0
        
      } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
        this.PA_SedePregRespuestaParams.ID_ETC=0
        this.PA_SedePregRespuestaParams.ID_institucionEducativa=Number(localStorage.getItem('IdUbicacion'));
        this.PA_SedePregRespuestaParams.id_caracteristica=40
        this.PA_SedePregRespuestaParams.id_valorescala=0
        
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
    // window.location.reload()
  }
}
