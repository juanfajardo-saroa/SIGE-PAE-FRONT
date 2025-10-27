
import { environment } from 'src/environments/environment';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Optional, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { DiagnosticoSituacionalModel } from 'src/app/shared/model/DiagnosticoSituacional';
import { DiagnosticoSituacionalService } from 'src/app/shared/services/DiagnosticoSituacional.services';

import { saveAs } from 'file-saver';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { DatePipe, DecimalPipe } from '@angular/common';

import Swal from 'sweetalert2';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { ETCModel } from 'src/app/shared/model/ETC';
import { MessageService } from 'src/app/services/message.service';
import { PA_DiagnosticoSituacionalGetAllFullbyEtcService } from 'src/app/shared/services/PA_DiagnosticosituacionalGetAllFullbyEtc.services';
import { PA_DiagnosticoSituacionalGetAllFullbyEtcModel } from 'src/app/shared/model/PA_DiagnosticosituacionalGetAllFullbyEtcModel';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';

@Component({
  selector: 'app-diagnostico-situacional',
  templateUrl: './diagnostico-situacional.component.html',
  styleUrls: ['./diagnostico-situacional.component.scss']
})
export class DiagnosticoSituacionalComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new Subscription()
  filename: string = "";

  ETCObject: ETCModel = {
    id: 0,
    iD_TipoETC: 0,
    siD_TipoETC: '',
    codigo: '',
    nombre: '',
    iD_DiagnosticoSituacional: 0,
    siD_DiagnosticoSituacional: '',
    auditoria: '',

    // atributos para gestión de auditoria del objeto
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    // atributos adicionales genericos para gestión del objeto
    isValid: false,
    isSelected: false,
    completed: false,
  }
  idEtc = Number(localStorage.getItem('IdUbicacion'));
  EsETC = false;
  constructor(public dialog: MatDialog, private servicios: RepositoriosExtendService,
    private seguridadService: SeguridadService,
    private DiagnosticoSituacionalService: DiagnosticoSituacionalService,
    private _PA_DiagnosticoSituacionalGetAllFullbyEtc: PA_DiagnosticoSituacionalGetAllFullbyEtcService,
    private _ETCService: ETCService,
    public messageService: MessageService,
  ) {
    this.ngOnInit;
    this.filename = "";

  }
  dataArray: any;
  displayedColumns: string[] = ['Nombresita', 'Fechasita', 'Descripcionsita', 'Archivosita', 'Accionsita'];
  dataSource = new MatTableDataSource<PA_DiagnosticoSituacionalGetAllFullbyEtcModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  decimalPipe = new DecimalPipe(navigator.language);


  ngOnInit(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.EsETC = true;
    }
    this._ETCService.getETC(this.idEtc).subscribe(
      (response: any) => {
        this.ETCObject = response;


      },
      (err) => {
        this.isLoading = false;
      }
    );

    this._PA_DiagnosticoSituacionalGetAllFullbyEtc.getPA_DiagnosticoSituacionalGetAllFullbyEtcList(Number(localStorage.getItem('IdUbicacion'))).subscribe(
      (response: any) => {

        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_DiagnosticoSituacionalGetAllFullbyEtcModel>(this.dataArray);
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
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogDiagnosticoSituacionalContent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  downloadFile(obj: any): void {
    if (obj == undefined) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="position: absolute !important ; top: 10px !important; right: 20px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">No tiene soporte para ver </p> ',
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


  getFileExtension1(filename: string) {
    filename = filename.substring(filename.lastIndexOf('.') + 1);
    if (filename != 'pdf' && filename != 'pptx' && filename != 'docx' && filename != 'xlsx') { filename = 'othe' }
    return (filename);
  }

  deleteRowData(row_obj: DiagnosticoSituacionalModel): boolean | any {
    const ideliminar = row_obj.id;
    const nombre = row_obj.nombre;
    const descripcion = row_obj.descripcionDiagnostico;
    let archivo
    if (row_obj.pathDiasnosticoSituacion
      == null) {
      archivo = 'no tiene';
    } else {
      archivo = row_obj.pathDiasnosticoSituacion
        ;
    }
    this._ETCService.getETCListRelationfilter(this.idEtc).subscribe(
      (response) => {
        if (response[0].iD_DiagnosticoSituacional == ideliminar) {
          this.messageService.showInfo("No se puede borrarse esta relacionado a una ETC ", 'top center');
        } else {
          this.DiagnosticoSituacionalService.deleteDiagnosticoSituacional(ideliminar, nombre, descripcion, archivo).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (err) => {

            }
          );
        }
      },
      (err) => {
      }
    );


  }
  updateRowData(row_obj: DiagnosticoSituacionalModel): boolean | any {
    this.DiagnosticoSituacionalService.updateDiagnosticoSituacional(row_obj).subscribe(
      async (response) => {

        await this.saveArchivo(row_obj);

      },
      (err) => {
      }
    );
  }
  updateRowData1(row_obj: DiagnosticoSituacionalModel): boolean | any {
    this.DiagnosticoSituacionalService.updateDiagnosticoSituacional(row_obj).subscribe(
      async (response) => {

        this.ngOnInit();
      },
      (err) => {
      }
    );
  }
  addRowData(row_obj: DiagnosticoSituacionalModel): void {
    this.DiagnosticoSituacionalService.addDiagnosticoSituacional(row_obj).subscribe(
      async (response) => {
        
          this.ETCObject.iD_DiagnosticoSituacional = response.id;
          row_obj.id = response.id;
          await this.saveArchivo(row_obj);
          console.log("Se ha guardado correctamente.");
       

      },
      (err) => {
        console.error('Error en addDiagnosticoSituacional:', err);
      }
    );
  }


  async saveArchivo(response: any): Promise<void> {

    // Verificar si pathDiasnosticoSituacion tiene un valor válido antes de proceder
    if (typeof response.pathDiasnosticoSituacion === 'string' && response.pathDiasnosticoSituacion !== 'NaN') {
      const fileName = response.pathDiasnosticoSituacion;
      const formData = new FormData();
      formData.append('file', response.pathDiasnosticoSituacionArc);

      let nombre = response.id + fileName;
      response.pathDiasnosticoSituacion = nombre;

      let _fileUpload: fileUploadModel = {
        file: formData,
        fileName: nombre,
        cnx: environment.cnxBS,
        container: environment.containerDS
      };
      this.servicios.addFileBlobRepositorios(_fileUpload).subscribe(
        (resp: any) => {
        },
        (err) => {

        }
      );


      await this.updateRowData1(response);
      await this.updateETC();
    } else {
      console.error('Valor inválido para pathDiasnosticoSituacion:', response.pathDiasnosticoSituacion);
    }
  }
  handleError1(err: any) {
    throw new Error('Method not implemented.');
  }

  updateETC(): void {
    this._ETCService.updateETC(this.ETCObject).subscribe(
      (response) => {
        this.ngOnInit();

      },
      (err) => {
      }
    );
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'diagnostico-situacional.dialog.component.html',
  styleUrls: ['./diagnostico-situacional.dialog.component.scss'],
})
export class DialogDiagnosticoSituacionalContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;
  // Listas relacionales

  maxfileerror: any;
  fechaA: any;
  pipe = new DatePipe('en-US');
  constructor(public servicios: RepositoriosExtendService, public dialogRef: MatDialogRef<DialogDiagnosticoSituacionalContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DiagnosticoSituacionalModel,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      fechaActualizacion: [data.fechaActualizacion, Validators.required],
      descripcionDiagnostico: [data.descripcionDiagnostico, Validators.required],
      pathDiasnosticoSituacion: [data.pathDiasnosticoSituacion, Validators.required],
      pathDiasnosticoSituacionArc: [],
      auditoria: [''],
      iD_ETC: [Number(localStorage.getItem('IdUbicacion'))],
    });
    this.local_data = { ...data };
    this.action = this.local_data.action;

    this.fechaA = this.pipe.transform(data.fechaActualizacion, 'yyyy-MM-dd');
  }
  onfecha(value: any) {
    this.form.controls['fechaActualizacion'].setValue(value);
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
      let sinEspa = 'Dia' + nombre
      this.form.controls['pathDiasnosticoSituacion'].setValue(sinEspa);
      this.form.controls['pathDiasnosticoSituacionArc'].setValue(fileupload);
      /*  let _fileUpload: fileUploadModel;
       _fileUpload = { file: formData, fileName: fileupload.name, cnx: environment.cnxBS, container: environment.containerBS };
       this.addFileBlobRepositorios(_fileUpload); */
    }
  }

  mensajeOut() {
    this.maxfileerror = false;
  }



}

function isAllSelected() {
  throw new Error('Function not implemented.');
}


