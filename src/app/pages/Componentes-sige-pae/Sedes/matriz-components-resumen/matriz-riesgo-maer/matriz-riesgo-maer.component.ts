import { AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PA_RiesgoETCModeloOperModel } from 'src/app/shared/model/PA_RiesgoETCModeloOperModel';
import { PA_RiesgoETCModeloOperService } from 'src/app/shared/services/PA_RiesgoETCModeloOper.services';

@Component({
  selector: 'app-matriz-riesgo-maer',
  templateUrl: './matriz-riesgo-maer.component.html',
  styleUrls: ['./matriz-riesgo-maer.component.scss']
})
export class MatrizRiesgoMaerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  MatrizResumenMaer: PA_RiesgoETCModeloOperModel[] = [];

  public dataSource = new MatTableDataSource<PA_RiesgoETCModeloOperModel>();
  private subs = new Subscription();
  idETC = environment.idETC;

  displayedColumns: string[] = ['cantidadSede', 'PriorizadaPAE', 'PorcentajeRPS', 'PorcentajeRI', 'PorcentajeCatering'];

  constructor(
    public dialog: MatDialog,
    public servicioMatrizMaer: PA_RiesgoETCModeloOperService,
    private router: Router,
  ) { }

  dataArray: any;
  isLoading = true;

  ngOnInit(): void {
    this.servicioMatrizMaer.getPA_RiesgoETCModeloOperList(this.idETC).subscribe(
      (response: any) => {
        this.MatrizResumenMaer = response.filter(items => items.id_ModeloOper === 2);

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_RiesgoETCModeloOperModel>(this.MatrizResumenMaer);

        /* this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        }; */
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  getFileExtension1(filename: string) {
    filename = filename.substring(filename.lastIndexOf('.') + 1);
    if (filename != 'pdf' && filename != 'pptx' && filename != 'docx' && filename != 'xlsx') { filename = 'othe' }
    return (filename);
  }


  irMatriz() {
    this.router.navigate(['/Sedes'], { queryParams: { tab: 2 } })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentMaer, {});
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogContentMaer2, {});
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogContentMaer3, {});
    dialogRef.afterClosed().subscribe(result => {
    });
    return;
  }
}
/* ------------------------------DIALOG----------------------------------------- */

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_SedePregRespuestaRequest, PA_SedePregRespuestaService } from 'src/app/shared/services/PA_SedePregRespuesta.services';
import { DiagnosticoSituacionalExtendService } from 'src/app/shared/services/DiagnosticoSituacional-Extend.services';
import { GetCaracterizacionNivel4Model } from 'src/app/shared/model/GetCaracterizacionNivel4Model';
import { GetCaracterizacionNivel4Service } from 'src/app/shared/services/GetCaracterizacionNivel4.services';
import { PA_SedePregRespuestaModel } from 'src/app/shared/model/PA_SedePregRespuestaModel';
import { Router } from '@angular/router';
import { PA_RiesgoETCSedesModeloOperModel } from 'src/app/shared/model/PA_RiesgoETCSedesModeloOper';
import { PA_RiesgoETCSedesModeloOperService } from 'src/app/shared/services/PA_RiesgoETCSedesModeloOper.services';
import { DecimalPipe } from '@angular/common';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-maer',
  templateUrl: 'matriz-riesgo-maer-dialog.component.html',
  styleUrls: ['matriz-riesgo-maer-dialog.component.scss'],
})
export class DialogContentMaer implements OnInit, AfterViewInit, OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_RiesgoETCSedesModeloOperModel>();
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  isLoading = true;
  NombreETC = localStorage.getItem('Ubicacion')
  idETC = Number(localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(
    private servicenivel4: GetCaracterizacionNivel4Service,
    public dialogRef: MatDialogRef<DialogContentMaer>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_RiesgoETCSedesModeloOperService,
    private seguridadService: SeguridadService,) { }

  ngOnInit(): void {
    this.SedePregRespuestaService.getPA_RiesgoETCSedesModeloOperList(this.idETC, 2, true).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_RiesgoETCSedesModeloOperModel>(this.dataArray);
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
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.dataSource.paginator = this.paginator;
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
    //window.location.reload();
  }

}
/* ------------------------------FIN DIALOG----------------------------------------- */

/* ------------------------------DIALOG2----------------------------------------- */

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-maer2',
  templateUrl: 'matriz-riesgo-maer2-dialog.component.html',
  styleUrls: ['matriz-riesgo-maer2-dialog.component.scss'],
})
export class DialogContentMaer2 implements OnInit, AfterViewInit, OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  isLoading = true;
  NombreETC = localStorage.getItem('Ubicacion')
  idETC = Number(localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(
    private servicenivel4: GetCaracterizacionNivel4Service,
    public dialogRef: MatDialogRef<DialogContentMaer2>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,) { }

  ngOnInit(): void {
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

  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.dataSource.paginator = this.paginator;
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
    //window.location.reload();
  }

}
/* ------------------------------FIN DIALOG2----------------------------------------- */

/* ------------------------------DIALOG2----------------------------------------- */

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-maer3',
  templateUrl: 'matriz-riesgo-maer3-dialog.component.html',
  styleUrls: ['matriz-riesgo-maer3-dialog.component.scss'],
})
export class DialogContentMaer3 implements OnInit, AfterViewInit, OnDestroy {
  dataArray: any;
  action: string;
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'codigoDane'];
  dataSource = new MatTableDataSource<PA_SedePregRespuestaModel>();
  diagnosticoResumen: GetCaracterizacionNivel4Model[] = [];
  isLoading = true;
  NombreETC = localStorage.getItem('Ubicacion')
  idETC = Number(localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  PA_SedePregRespuestaParams:PA_SedePregRespuestaRequest={}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  constructor(
    private servicenivel4: GetCaracterizacionNivel4Service,
    public dialogRef: MatDialogRef<DialogContentMaer3>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private ngZone: NgZone,
    private SedePregRespuestaService: PA_SedePregRespuestaService,
    private seguridadService: SeguridadService,) { }

  ngOnInit(): void {
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

  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.dataSource.paginator = this.paginator;
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
    //window.location.reload();
  }

}
/* ------------------------------FIN DIALOG2----------------------------------------- */
