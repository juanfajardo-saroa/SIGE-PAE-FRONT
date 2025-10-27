import { PlantasBodegasDocumentosPAService } from 'src/app/shared/services/PlantasBodegasDocumentosPA.services';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import Swal from 'sweetalert2';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import * as saveAs from 'file-saver';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { environment } from 'src/environments/environment';
import { PlantasBodegasDocumentosPAModel } from 'src/app/shared/model/PlantasBodegasDocumentosPA';
import { PlanAlistamientoDocumentosPAModel } from 'src/app/shared/model/PlanAlistamientoDocumentosPA';
import { PlanAlistamientoDocumentosPAService } from 'src/app/shared/services/PlanAlistamientoDocumentosPA.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  viewer = 'google';
  selectedType = 'pptx'; //'docx';
  doc = 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx';
  // doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  pdfSrc: Uint8Array;
  displayedColumns: string[] = ['FechaArchivo', 'Archivo'];
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  form: FormGroup;
  cantAprobaciones = 0;
  yaCargoAprobaciones = true;
  idaccion = 0;
  idSeccion = 8;
   idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  documentoId: number;
  idPlantaBodega: number;
  typeDocument: number;
  idPlanAlistamiento: number;
  idEstado: number;
  AprobacionesList: any;
  planObjList: any;
  action: number;
  type: number;
  allowEdit: boolean;
  aprobar = [];
  lista = [];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  AprobacionObject: AprobacionesModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: new Date,
    fecha: new Date,
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: '',
    filtro: '',
    id_Rol: 0,
    sID_rol: '',
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
    plazoPorAprobar: new Date,
  };
  PlanAlistamientoDocumentosPAObject= <PlanAlistamientoDocumentosPAModel>{};
  PlantasBodegasDocumentosPAObject: PlantasBodegasDocumentosPAModel = {

    id: null,
    sID: '',
    iD_PlantaBodegas: null,
    siD_PlantaBodegas: '',
    iD_DocumentoPA: null,
    siD_DocumentoPA: '',
    iD_Estado: null,
    sID_Estado: '',
    idVigencia: null,
    sidVigencia: '',
    pathDocumento: '',
    fechaVersion: '',
    nombreArchivo: '',
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

  };
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  public dataSource: MatTableDataSource<any>;
  showAprobaciones = true;

  constructor(
    public dialogRef: MatDialogRef<DocViewerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private RepositoriosService: RepositoriosExtendService,
    private _PlantasBodegasDocumentosPAService: PlantasBodegasDocumentosPAService,
    private planAlistamientoDocumentosPAService: PlanAlistamientoDocumentosPAService,
    private seguridadService: SeguridadService,
    private _PA_AprobacionesGetAllFullService:PA_AprobacionesGetAllFullService,
  ) {
    this.documentoId = data.idDocument;
    this.idPlantaBodega = data.idPlantaBodega;
    this.idEstado = data.idEstado;
    this.typeDocument = data.typeDocument;
    this.idPlanAlistamiento = data.idPlanAlistamiento;
    if (this.idEstado == 3 || this.idEstado == 4) {
      this.showAprobaciones = false;
    } else {
      this.showAprobaciones = true;
    }



    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],
    });
    this.fillTableAprobaciones();
    this.aprobar.push(this.form);

    this.viewFile(data.fileName);
    this.cantAprobaciones = 1;

    if (this.typeDocument == 1) {
      _PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlantaAndDocument(this.idPlantaBodega, this.documentoId).subscribe(
        (response: any) => {
          this.planObjList = response
        },
      )

      _PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlantaAndDocumentHistory(this.idPlantaBodega, this.documentoId).subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource<any>(response);
        },
      )
    } else if (this.typeDocument == 2) {
      this.planAlistamientoDocumentosPAService.getPlanAlistamientoDocumentosPAListFullByPlanAndDocument(this.idPlanAlistamiento, this.documentoId).subscribe(
        (response: any) => {
          this.planObjList = response
        },
      )

      this.planAlistamientoDocumentosPAService.getPlanAlistamientoDocumentosPAListFullByPlanAndDocumentHistory(this.idPlanAlistamiento, this.documentoId).subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource<any>(response);
        },
      )
    }

  }

  downloadFile(path: string, name): void {

    let _fileUpload: fileUploadModel;
    let pathFile = path;
    _fileUpload = { file: null, fileName: pathFile, cnx: environment.cnxBS, container: environment.containerBS };
    (this.RepositoriosService.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: this.getType(name) });
        saveAs(blob, name);
      },
      (err) => {
      }
    )
  }

  viewFile(name: string): void {


    let _fileUpload: fileUploadModel;
    let nombre = name;
    _fileUpload = { file: null, fileName: nombre, cnx: environment.cnxBS, container: environment.containerBS };
    (this.RepositoriosService.downloadFileBloUrl(_fileUpload, 'sd')).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: this.getType(nombre) });
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
      },
      (err) => {
      }
    )
  }

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

  ngOnInit(): void {
    this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(this.idSeccion).subscribe(
      (response: any) => {
        if(this.typeDocument == 1){
          this.AprobacionesList = response.filter(item => item.ubicacionOrigen === this.documentoId.toString() + this.idPlantaBodega.toString() + "T" + this.typeDocument.toString());
        } else if(this.typeDocument == 2){
          this.AprobacionesList = response.filter(item => item.ubicacionOrigen === this.documentoId.toString() + this.idPlanAlistamiento.toString() + "T" + this.typeDocument.toString());
        }
        
        this.lista.push(this.AprobacionesList)
      },
    );
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionesList = response;
        this.AccionesAprobacionesList.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      },
    );
  }

  joinRoom(item) {
    if (item.id === 1) {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {
        this.form.controls['observaciones'].setValue(' ');
      }
    } else {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {
        this.form.controls['observaciones'].setValue(' ');
      }
    }
  }

  mensaje() {
    this.ngOnInit()
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important; position: absolute!important; top: 9% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p  style="text-align: center !important; font-size: 13px; color: #005ACA; margin-right: 2rem;">Confirmar aprobación del documento: </p>' +
        ` <div style="text-align: center !important; font-size: 13px; color: #005ACA; font-weight: 700;"></div>` +
        '<p style="text-align: center !important; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir)</p>',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.aprobaciones()
      }
      else {
      }
    })
  }

  aprobaciones() {
    if (this.AprobacionesList == '') {
      this.AprobacionObject.id = 0;
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Ninguno'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.AprobacionObject.id_Secciones = 8;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 6;
      if(this.typeDocument == 1){
        this.AprobacionObject.ubicacionOrigen = this.documentoId.toString() + this.idPlantaBodega.toString()  + "T" + this.typeDocument.toString();
      } else if(this.typeDocument == 2){
        this.AprobacionObject.ubicacionOrigen = this.documentoId.toString() + this.idPlanAlistamiento.toString()  + "T" + this.typeDocument.toString();
      }
      let doc = localStorage.getItem('Documento7');
      if (doc == null) {
        this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
      } else {
        this.AprobacionObject.documentoParaAprobar = doc;
      }


      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {
          this.fillTableAprobaciones();
          this.clearForm();
          this.updateObject(response);




        },
        (err) => {
        }
      )
    } else {
      this.AprobacionObject.id = this.lista[0].id;
      this.AprobacionObject.iD_ETC = this.lista[0].iD_ETC;
      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
      this.AprobacionObject.id_Secciones = this.lista[0].id_Secciones;
      this.AprobacionObject.documentoParaAprobar = this.lista[0].documentoParaAprobar;
      this.AprobacionObject.fecha = this.lista[0].fecha;
      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Ninguno'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }

      this.AprobacionObject.id_Ubicacion = this.lista[0][0].id_Ubicacion;
      this.AprobacionObject.ubicacionOrigen = this.lista[0][0].ubicacionOrigen;
      this.aprobacionesService.updateAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones()
          this.clearForm()
          this.updateObject(response);



        },
        (err) => {
        }
      );

    }


  }

  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(this.idSeccion).subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosp.getGetAprobacionesGetAllWithRelListfilter(this.idSeccion,this.idETC).subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response;
                this.dataArrayAprobaciones.forEach(element => {
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;
                });
                this.dataArrayAprobaciones.sort(function (a, b) {
                  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator;
                this.dataSourceAprobaciones.sort = this.sort;
              }
            );
          }
        );
      }
    );
  }

  clearForm() {
    this.form.reset({
      'observaciones': '',
      'accionAprobacion': '',
    });
  }

  getButtonColor(id: number): string {
    switch (id) {
      case 1:
        return "greenColor";
        break;
      case 2:
        return "redCircle";
        break;
      default:
        return "yellowCircle";
        break;
    }
  }

  updateObject(response:any) {
    if(this.typeDocument == 1){
      if (response.iD_AccionAprobacion === 1) {

        this.PlantasBodegasDocumentosPAObject.iD_Estado = 4;

      } else {

        this.PlantasBodegasDocumentosPAObject.iD_Estado = 3;

      }
      this.PlantasBodegasDocumentosPAObject.id = this.planObjList[0].id;
      this.PlantasBodegasDocumentosPAObject.iD_PlantaBodegas = this.planObjList[0].iD_PlantaBodegas
      this.PlantasBodegasDocumentosPAObject.iD_DocumentoPA = this.planObjList[0].iD_DocumentoPA
      this.PlantasBodegasDocumentosPAObject.idVigencia = this.planObjList[0].idVigencia
      this.PlantasBodegasDocumentosPAObject.pathDocumento = this.planObjList[0].pathDocumento
      this.PlantasBodegasDocumentosPAObject.fechaVersion = this.planObjList[0].fechaVersion
      this.PlantasBodegasDocumentosPAObject.nombreArchivo = this.planObjList[0].nombreArchivo


      this._PlantasBodegasDocumentosPAService.updatePlantasBodegasDocumentosPA(this.PlantasBodegasDocumentosPAObject).subscribe(
        (response) => {

          this.cantAprobaciones = 0;
          this.yaCargoAprobaciones = false;
          this.dialogRef.close({ action: this.AprobacionObject.iD_AccionAprobacion, idPlantaBodega: this.data.idPlantaBodega, idDocument: this.data.idDocument });

        },
      )
    } else if(this.typeDocument == 2){
      if (response.iD_AccionAprobacion === 1) {

        this.PlanAlistamientoDocumentosPAObject.iD_Estado = 4;

      } else {

        this.PlanAlistamientoDocumentosPAObject.iD_Estado = 3;

      }
      this.PlanAlistamientoDocumentosPAObject.id = this.planObjList[0].id;
      this.PlanAlistamientoDocumentosPAObject.iD_PlanAlistamiento = this.idPlanAlistamiento
      this.PlanAlistamientoDocumentosPAObject.iD_DocumentoPA = this.planObjList[0].iD_DocumentoPA
      this.PlanAlistamientoDocumentosPAObject.iD_Vigencia = this.planObjList[0].iD_Vigencia
      this.PlanAlistamientoDocumentosPAObject.pathDocumento = this.planObjList[0].pathDocumento
      this.PlanAlistamientoDocumentosPAObject.nombreArchivo = this.planObjList[0].nombreArchivo
      this.PlanAlistamientoDocumentosPAObject.fechaVersion = this.planObjList[0].fechaVersion


      this.planAlistamientoDocumentosPAService.updatePlanAlistamientoDocumentosPA(this.PlanAlistamientoDocumentosPAObject).subscribe(
        (response) => {
          this.cantAprobaciones = 0;
          this.yaCargoAprobaciones = false;
          this.dialogRef.close({ action: this.AprobacionObject.iD_AccionAprobacion, idDocument: this.data.idDocument });

        },
      )
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

}
