import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ExcedentesComplementosModel } from 'src/app/shared/model/ExcedentesComplementos';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { NovedadesModel } from 'src/app/shared/model/Novedades';
import { NovedadesService } from 'src/app/shared/services/Novedades.services';
import { PriorizacionArchivosService } from 'src/app/shared/services/PriorizacionArchivos.service';
import { PriorizacionesService } from 'src/app/shared/services/Priorizaciones.services';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { PA_NovedadesGetAllFullService } from 'src/app/shared/services/PA_NovedadesGetAllFull.services';
@Component({
  selector: 'app-novedades-raciones',
  templateUrl: './novedades-raciones.component.html',
  styleUrls: ['./novedades-raciones.component.scss']
})
export class NovedadesRacionesComponent implements OnInit {
  yaCargoNovedades: boolean = false;
  displayedColumnsNovedades: string[] = ['fecha', 'DescripcionNovedad', 'Soporte'];
  dataSourceNovedades = new MatTableDataSource<NovedadesModel>();
  isLoading = true;
  dataArrayNovedades: any;
  idSede = 0;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  NovedadesObject: NovedadesModel = {
    id: 0,
    iD_Sede: 0,
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

  }
  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private novedadesService: NovedadesService,
    public servicios: PriorizacionArchivosService,
    public serviciosNovedades: NovedadesService,
    private seguridadService: SeguridadService,
    private _PA_NovedadesGetAllFullService: PA_NovedadesGetAllFullService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idSede = +params.id;
    });
    this.filltablenovedades();

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
  openDialogNovedades(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogAsignacionNovedadesContent, {
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
    this.NovedadesObject.fecha = row_obj.fecha;
    this.NovedadesObject.archivo = row_obj.archivo;
    this.NovedadesObject.iD_Sede = this.idSede;
    this.novedadesService.addNovedades(this.NovedadesObject).subscribe(
      async (response) => {
        await this.saveArchivo(response);
        await this.ngOnInit();
        await this.filltablenovedades();
      },
      (err) => {
      }
    );
  }
  async saveArchivo(response: any): Promise<void> {
 
    // Verificar si archivo tiene un valor válido antes de proceder
    if (typeof response.archivo === 'string' && response.archivo !== 'NaN') {
      const fileName = response.archivo;
      const fileUpload = new File([], fileName); // Simula un archivo vacío con el nombre adecuado

      const formData = new FormData();
      formData.append('file', fileUpload);

      let nombre = response.id + fileName;
      response.archivo = nombre;

      let _fileUpload: fileUploadModel = {
        file: formData,
        fileName: nombre,
        cnx: environment.cnxBS,
        container: environment.containerDS
      };

      this.servicios.addFileBlobRepositorios(_fileUpload).subscribe(
        (resp: any) => {
          console.log('Archivo subido correctamente:', resp);
        },
        (err) => {
          console.error('Error al subir archivo:', err);
        }
      );
      this.updateRowDataNovedades(response)
      
    } else {
      console.error('Valor inválido para archivo:', response.archivo);
    }
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
  downloadFile(obj: any): void {
    if (obj === null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">No tiene soporte para ver </p> ',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isDenied) {

        }
      })
    } else {
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: null, fileName: obj, cnx: environment.cnxBS, container: environment.containerDS };
      (this.servicios.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: this.getType(obj) });
          saveAs(blob, obj);
        },
        (err) => {
        }
      )
    }

  };
  getType(_response: any): string {
    let fileName = _response;
    //file type extension
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == ".txt") {
      fileType = "text/plain";
    }
    if (checkFileType == ".pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == ".doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == ".png") {
      fileType = "image/png";
    }
    if (checkFileType == ".jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".gif") {
      fileType = "image/gif";
    }
    if (checkFileType == ".csv") {
      fileType = "text/csv";
    }
    return fileType;
  }
  filltablenovedades() {
    this._PA_NovedadesGetAllFullService.getPA_NovedadesGetAllFullList(this.idSede, Number(localStorage.getItem('VigSeleccionada'))).subscribe(
      (response: any) => {
        this.dataArrayNovedades = response;
        if (this.dataArrayNovedades == '') {
          this.yaCargoNovedades = false;
        } else {
          this.yaCargoNovedades = true;
        }
        this.dataArrayNovedades.find(element => {
          let p = element.fecha
          element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();

        });
        this.isLoading = false;
        this.dataSourceNovedades = new MatTableDataSource<NovedadesModel>(this.dataArrayNovedades);

        this.dataSourceNovedades.sort = this.sort;

      },
      (err) => {
        this.isLoading = false;

      }
    );



  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'asignacion-novedades.dialog.component.html',
  styleUrls: ["./asignacion-novedades.dialog.component.scss"],
})
export class DialogAsignacionNovedadesContent {
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
  nom: any;
  constructor(public dialogRef: MatDialogRef<DialogAsignacionNovedadesContent>,
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
      let nombre = fileupload.name
      nombre = nombre
        .replace(/ /g, "")             // Eliminar espacios
        .replace(/á/g, "a")            // Reemplazar tildes
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n");           // Reemplazar ñ por n
      let sinEspa = 'Nove' + nombre
      this.form.controls['archivo'].setValue(sinEspa);
        this.nom = sinEspa;
     /*  let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: fileupload.name, cnx: environment.cnxBS, container: environment.containerDS };
      this.addFileBlobRepositorios(_fileUpload); */
    }
  }

  mensajeOut() {
    this.maxfileerror = false;
  }

  addFileBlobRepositorios(fileUpload): void {
    this.servicios.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.form.controls['archivo'].setValue(String.fromCharCode.apply(null, new Uint8Array(response)));
        this.nom = String.fromCharCode.apply(null, new Uint8Array(response));
      },
      (err) => {
      }
    );
  }

}
