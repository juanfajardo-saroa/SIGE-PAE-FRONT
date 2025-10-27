import { PriorizacionArchivosService } from './../../../../../shared/services/PriorizacionArchivos.service';
import { Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NovedadesModel } from 'src/app/shared/model/Novedades';
import { NovedadesService } from 'src/app/shared/services/Novedades.services';
import { ExcedentesComplementosModel } from 'src/app/shared/model/ExcedentesComplementos';
import { PriorizacionesService } from 'src/app/shared/services/Priorizaciones.services';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';



@Component({
  selector: 'app-priorizacion-novedades',
  templateUrl: './priorizacion-novedades.component.html',
  styleUrls: ['./priorizacion-novedades.component.scss']
})
export class PriorizacionNovedadesComponent implements OnInit, OnDestroy {
  dataArray: any;
  displayedColumns: string[] = ['fecha', 'DescripcionNovedad', 'Soporte', 'acciones'];
  dataSource = new MatTableDataSource<NovedadesModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  idPriorizacion = 0;
  idSedesUbicacion = 0
  myDatepipe!: any;
  dateToday: number = Date.now();
  private subs = new Subscription();
  NovedadesObject: NovedadesModel = {
    id: 0,

    siD_Priorizaciones: '',
    fecha: new Date,
    descripcion: '',
    archivo: '',
    auditoria: '',
    iD_Vigencia: Number(localStorage.getItem('VigSeleccionada')),

    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',

    isValid: false,
    isSelected: false,
    completed: false,
    iD_Sede: 0
  }
  constructor(public servicios: NovedadesService,
    public dialog: MatDialog,
    private novedadesService: NovedadesService,
    private seguridadService: SeguridadService,
    private router: Router, private route: ActivatedRoute,) { }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idPriorizacion = +params.id;
      this.idSedesUbicacion = +params.idP;

    });
    this.servicios.getNovedadesListFull().subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<NovedadesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;

      }
    );

    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primero';
    this.paginator._intl.lastPageLabel = 'Último';
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); 4 }
  }

  openDialogNovedades(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogPriorizacionNovedadesContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowDataNovedades(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowDataNovedades(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowDataNovedades(result.data);
      }
    });
  }
  addRowDataNovedades(row_obj: NovedadesModel): void {

    this.NovedadesObject.id = row_obj.id;
    this.NovedadesObject.descripcion = row_obj.descripcion;
    this.NovedadesObject.fecha = new Date();
    this.NovedadesObject.archivo = row_obj.archivo;
    this.NovedadesObject.iD_Sede = this.idPriorizacion;
    this.novedadesService.addNovedades(this.NovedadesObject).subscribe(
      (response) => {
        this.ngOnInit()
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  updateRowDataNovedades(row_obj: NovedadesModel): boolean | any {
    this.novedadesService.updateNovedades(row_obj).subscribe(
      (response) => {
        this.ngOnInit()
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowDataNovedades(row_obj: NovedadesModel): boolean | any {
    const ideliminar = row_obj.id;

    this.novedadesService.deleteNovedades(ideliminar).subscribe(
      (response) => {
        this.ngOnInit()
      },
      (err) => {
      }
    );

  }
  // boton de regresar
  RegresarInfraestura() {
    this.router.navigate(['/Priorizaciones/', this.idSedesUbicacion]);
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'priorizacion-novedades.dialog.component.html',
  styleUrls: ["./priorizacion-novedades.dialog.component.scss"],
})
export class DialogPriorizacionNovedadesContent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  PriorizacionList: ExcedentesComplementosModel[];
  dateToday: any = Date.now();
  myDatepipe!: any;
  maxfileerror: boolean;
  pipe = new DatePipe('en-US');
  constructor(public dialogRef: MatDialogRef<DialogPriorizacionNovedadesContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private priorizacionService: PriorizacionesService,
    private datepipe: DatePipe,
    public servicios: PriorizacionArchivosService,
  ) {
    priorizacionService.getPriorizacionesList().subscribe(
      (response: any) => {

        this.PriorizacionList = response

      },
      (err) => {
      }
    );
    if (data.action == 'Adicionar') {
      this.dateToday = data.fecha;
    }
    this.dateToday = this.pipe.transform(data.fecha, 'yyyy-MM-dd');

    this.form = this.fb.group({
      id: [data.id],
      iD_Priorizaciones: [data.iD_Priorizaciones],
      siD_Priorizaciones: [''],
      fecha: [this.dateToday],
      descripcion: [data.descripcion, Validators.required],
      archivo: [data.archivo, Validators.required],
      auditoria: [''],
    });


    this.local_data = { ...data };
    this.action = this.local_data.action;


  }


  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public onFileSelected(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: fileupload.name, cnx: environment.cnxBS, container: environment.containerDS };
      this.addFileBlobRepositorios(_fileUpload);
    }
  }

  mensajeOut() {
    this.maxfileerror = false;
  }

  addFileBlobRepositorios(fileUpload): void {
    this.servicios.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.form.controls['archivo'].setValue(String.fromCharCode.apply(null, new Uint8Array(response)));
      },
      (err) => {
      }
    );
  }

}

