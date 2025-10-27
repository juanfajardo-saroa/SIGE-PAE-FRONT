import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PlantaBodegasService } from 'src/app/shared/services/PlantaBodegas.services';
import { PlantaBodegasModel } from 'src/app/shared/model/PlantaBodegas';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import Swal from 'sweetalert2';
import { TiposPlantaBodegaModel } from 'src/app/shared/model/TiposPlantaBodega';
import { TipoPlantasBodegaService } from 'src/app/shared/services/TipoPlantasBodega.services';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PlantasBodegasDocumentosPAService } from 'src/app/shared/services/PlantasBodegasDocumentosPA.services';
import { DocumentosPAModel } from 'src/app/shared/model/DocumentosPA';
import { DocumentosPAService } from 'src/app/shared/services/DocumentosPA.services';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { PA_DepartamentosModel } from 'src/app/shared/model/PA_DepartamentosModel';
import { PA_DepartamentosService } from 'src/app/shared/services/PA_Departamentos.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import * as saveAs from 'file-saver';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { PlantasBodegasDocumentosPAModel } from 'src/app/shared/model/PlantasBodegasDocumentosPA';
import { PlanAlistamientoDocumentosPAService } from 'src/app/shared/services/PlanAlistamientoDocumentosPA.services';
import { PlanAlistamientoDocumentosPAModel } from 'src/app/shared/model/PlanAlistamientoDocumentosPA';
import * as uuid from 'uuid';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { Statement } from '@angular/compiler';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { PlanesAlistamientosService } from 'src/app/shared/services/PlanesAlistamientos.services';
import { PlanesAlistamientosModel } from 'src/app/shared/model/PlanesAlistamientos';
import { PA_PlantaBodegasGetAllWithRelationService } from 'src/app/shared/services/PA_PlantaBodegasGetAllWithRelation.services';

@Component({
  selector: 'app-plan-alistamiento-documentacion',
  templateUrl: './plan-alistamiento-documentacion.component.html',
  styleUrls: ['./plan-alistamiento-documentacion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlanAlistamientoDocumentacionComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @Output() stateDocChanged = new EventEmitter<number>();
  displayedColumns: string[] = ['TipoEstablecimiento', 'Nombre', 'Estado', 'VerDetalles'];
  displayedColumnsDocuments: string[] = ['Documento', 'Archivo', 'Vigencia', 'Estado'];
  displayedColumnsMandatoryDocuments: string[] = ['DocumentoObligatorio', 'ArchivoObligatorio', 'VigenciaObligatorio', 'EstadoObligatorio'];
  plantaBodegasList: PlantaBodegasModel[];
  dataSource: MatTableDataSource<PlantaBodegasModel>;
  estadoMenor: number = 100;
  sestadoMenor: string;
  estadoMenorObligatoria: number = 100;
  estadoMenorSum: number = 100;
  estadoTemp: number = 100;
  sestadoMenorObligatoria: string;
  expandedElement: PlantaBodegasModel | null;
  displayedColumns2: string[] = ['Documento', 'Archivo', 'Vigencia', 'Estado'];
  numberTittle = 2;
  contenidoRespuesta: string = '';
  pathImage = '';
  alertOpened: boolean = false;
  isEdit: boolean;
  isEditDocuments: boolean;
  allowEdit: boolean;
  addPlant: boolean = false;
  answerYes = false;
  answered = false;
  modelPaepi = false;
  modelMaer = false;
  action: number;
  establecimientoId: number;
  establecimientoForm: FormGroup;
  documentosObligatoriosForm: FormGroup;
  tipoEstablecimientoList: TiposPlantaBodegaModel[];
  objectFormPlantaBodegaTemp = <PlantaBodegasModel>{};
  objectFormPlantaBodegaTemp2 = <PlantaBodegasModel>{};
  establecimientoTemp = <PlantaBodegasModel>{};
  establecimientoTemp2 = <PlantaBodegasModel>{};
  divipolaList: PA_DivipolasGetbyETCModel[];
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  dataSource2: MatTableDataSource<DocumentosPAModel>;
  documentosList: DocumentosPAModel[];
  DivipolasList: DivipolasModel[];
  departamentosList: PA_DepartamentosModel[];
  vigenciasList: VigenciasModel[];
  idPlanAlistamiento: number;
  idContrato = 0;
  modeloContrato = "";
  selectedIdPlantaBodega = 0;
  clickedAdded = "false";

  documentos: any[] = [
    { id: 3, nombre: 'Acta de inspección sanitaria favorable con o sin observaciones', fileFormName: 'actaArchivo', validityFormName: 'actaVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'actaEstado' },
    { id: 4, nombre: 'Inventario de equipos y utensilios', fileFormName: 'inventarioArchivo', validityFormName: 'inventarioVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'inventarioEstado' },
    { id: 5, nombre: 'Plan de mantenimiento preventivo y correctivo de equipos', fileFormName: 'mantenimientoArchivo', validityFormName: 'mantenimientoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'mantenimientoEstado' },
    { id: 6, nombre: 'Plan de saneamiento (Bodegas)*', fileFormName: 'saneamientoArchivo', validityFormName: 'saneamientoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'saneamientoEstado' },
  ]

  documentosObligatorios: any[] = []

  documentosObligatoriosMAEM: any[] = [
    { id: 7, nombre: 'Presentación del talento humano (número de personas y cargos a desempeñar)', fileFormName: 'presentacionArchivo', validityFormName: 'presentacionVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'presentacionEstado', required: true },
    { id: 8, nombre: 'Certificados de aptitud médica del personal manipulador de alimentos', fileFormName: 'certificadosArchivo', validityFormName: 'certificadosVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'certificadosEstado', required: true },
    { id: 9, nombre: 'Plan de capacitación continua en manipulación de alimentos', fileFormName: 'planCapacitacionArchivo', validityFormName: 'planCapacitacionVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planCapacitacionEstado', required: true },
    { id: 10, nombre: 'Actas de capacitación en BPM para personal manipulador de alimentos', fileFormName: 'actaCapacitacionArchivo', validityFormName: 'actaCapacitacionVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'actaCapacitacionEstado', required: true },
    { id: 11, nombre: 'Plan de manejo de anticipo de acuerdo a lo pactado en el contrato (Cuando aplique)', fileFormName: 'planManejoAnticipoArchivo', validityFormName: 'planManejoAnticipoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planManejoAnticipoEstado', required: false },
    { id: 12, nombre: 'Plan de saneamiento (Sedes educativas)', fileFormName: 'planSaneamientoArchivo', validityFormName: 'planSaneamientoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planSaneamientoEstado', required: true },
  ]

  documentosObligatoriosMAER: any[] = [
    { id: 9, nombre: 'Plan de capacitación continua en manipulación de alimentos', fileFormName: 'planCapacitacionArchivo', validityFormName: 'planCapacitacionVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planCapacitacionEstado', required: true },
    { id: 10, nombre: 'Actas de capacitación en BPM para personal manipulador de alimentos', fileFormName: 'actaCapacitacionArchivo', validityFormName: 'actaCapacitacionVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'actaCapacitacionEstado', required: true },
    { id: 11, nombre: 'Plan de manejo de anticipo de acuerdo a lo pactado en el contrato (Cuando aplique)', fileFormName: 'planManejoAnticipoArchivo', validityFormName: 'planManejoAnticipoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planManejoAnticipoEstado', required: false },
    { id: 12, nombre: 'Plan de saneamiento (Sedes educativas)', fileFormName: 'planSaneamientoArchivo', validityFormName: 'planSaneamientoVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'planSaneamientoEstado', required: true },
    { id: 13, nombre: 'Gestión ambiental y desperdicios', fileFormName: 'GestionAmbientalArchivo', validityFormName: 'GestionAmbientalVigencia', contenidoRespuesta: '', pathFile: '', estado: 'Pendiente', estadoFormName: 'GestionAmbientalEstado', required: true },
  ]

  yesNotQuestion: any = [
    { id: true, descripcion: 'Si' },
    { id: false, descripcion: 'No' }
  ];
  planAlistamiento: any = {
    id: 0,
    iD_EstadoDocumentacion: 0,
    auditoria: LocalStorage.getAuditoria('Crear')
  }
  PlanesAlistamientosObject = <PlanesAlistamientosModel>{}
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private divipolasService: DivipolasService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private fb: FormBuilder,
    private TipoEstablecimientoService: TipoPlantasBodegaService,
    private plantaBodegasService: PlantaBodegasService,
    private planAlistamientoDocumentosPAService: PlanAlistamientoDocumentosPAService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private PA_DepartamentosService: PA_DepartamentosService,
    private PlantasBodegasDocumentosPAService: PlantasBodegasDocumentosPAService,
    private DocumentosPAService: DocumentosPAService,
    private vigenciasService: VigenciasService,
    private RepositoriosService: RepositoriosExtendService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
    private seguridadService: SeguridadService,
    private mensajeServicio: MessageService,
    private _contratosApiService: ContratosApiService,
    private _PlanesAlistamientosService: PlanesAlistamientosService,
    private _PA_PlantaBodegasGetAllWithRelationService :PA_PlantaBodegasGetAllWithRelationService, 
  ) {
    this.idPlanAlistamiento = Number(localStorage.getItem('idPlan'));
    this.idContrato = Number(localStorage.getItem('idCpl'));
    this.modeloContrato = localStorage.getItem('modeloContrato')
    this.clickedAdded = localStorage.getItem("addedEstablecimiento");
    this.establecimientoForm = this.fb.group({
      TipoEstablecimiento: ['', Validators.required],
      yesNotQuestions: ['', Validators.required],
      NombreEstablecimiento: ['', Validators.required],
      DepartamentoEstablecimiento: ['', Validators.required],
      CiudadEstablecimiento: ['', Validators.required],
      DireccionEstablecimiento: ['', Validators.required],
      Nombre: ['', Validators.required],
      Celular: ['', Validators.required],
      CorreoElectronico: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.minLength(6), Validators.maxLength(50)]],
      actaArchivo: ['', Validators.required],
      inventarioArchivo: ['', Validators.required],
      mantenimientoArchivo: ['', Validators.required],
      saneamientoArchivo: ['', Validators.required],
      actaVigencia: ['', Validators.required],
      inventarioVigencia: ['', Validators.required],
      mantenimientoVigencia: ['', Validators.required],
      saneamientoVigencia: ['', Validators.required],
      actaEstado: ['', Validators.required],
      inventarioEstado: ['', Validators.required],
      mantenimientoEstado: ['', Validators.required],
      saneamientoEstado: ['', Validators.required],
    });
    this.documentosObligatoriosForm = this.fb.group({
      presentacionArchivo: ['', Validators.required],
      certificadosArchivo: ['', Validators.required],
      planCapacitacionArchivo: ['', Validators.required],
      actaCapacitacionArchivo: ['', Validators.required],
      planManejoAnticipoArchivo: ['', Validators.required],
      planSaneamientoArchivo: ['', Validators.required],
      GestionAmbientalArchivo: ['', Validators.required],
      presentacionVigencia: ['', Validators.required],
      certificadosVigencia: ['', Validators.required],
      planCapacitacionVigencia: ['', Validators.required],
      actaCapacitacionVigencia: ['', Validators.required],
      planManejoAnticipoVigencia: ['', Validators.required],
      planSaneamientoVigencia: ['', Validators.required],
      GestionAmbientalVigencia: ['', Validators.required],
      presentacionEstado: ['', Validators.required],
      certificadosEstado: ['', Validators.required],
      planCapacitacionEstado: ['', Validators.required],
      actaCapacitacionEstado: ['', Validators.required],
      planManejoAnticipoEstado: ['', Validators.required],
      planSaneamientoEstado: ['', Validators.required],
      GestionAmbientalEstado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.estadoMenor = 100;
    this.estadoMenorObligatoria = 100;
    this.estadoMenorSum = 100;
    this.fillSelects();
    this.fillTable();
    this.fillDocuments();
  }

  fillDocuments() {
    if (this.modeloContrato == "MAEM" || this.modeloContrato == "PAEPI" || this.modeloContrato == "MAEM, PAEPI" || this.modeloContrato == "MAEM - PAEP" || this.modeloContrato == "PAEP" || this.modeloContrato == "MAEM, PAEP" || this.modeloContrato == "MAEM - PAEP") {
      this.documentosObligatorios = this.documentosObligatoriosMAEM
    } else if (this.modeloContrato == "MAER") {
      this.documentosObligatorios = this.documentosObligatoriosMAER;
      this.modelMaer = true;
      this.numberTittle = 1;
    }

    if (this.clickedAdded != "true" && (this.modeloContrato == "PAEPI" || this.modeloContrato == "PAEP")) {
      this.modelPaepi = true;
    }
  }

  onDepartamentoClick(value: any): void {
    this.divipolasService.getDivipolasLisFilterByDepartamento(value).subscribe(
      (response: any) => {
        this.DivipolasList = response;
      },
      (err) => {
      }
    );
  }

  clickedRow(element: any) {
    this.selectedIdPlantaBodega = element.id;
    this.establecimientoForm.get('TipoEstablecimiento').setValue(element.iD_TipoPlantaBodega);
    this.establecimientoForm.get('NombreEstablecimiento').setValue(element.nombre);
    this.establecimientoForm.get('DepartamentoEstablecimiento').setValue(this.DivipolasList.find(divipola => divipola.id == element.iD_Divipola).departamentoCode);
    this.establecimientoForm.get('CiudadEstablecimiento').setValue(element.iD_Divipola);
    this.establecimientoForm.get('DireccionEstablecimiento').setValue(element.direccion);
    this.establecimientoForm.get('Nombre').setValue(element.nombreContacto);
    this.establecimientoForm.get('Celular').setValue(element.celular);
    this.establecimientoForm.get('CorreoElectronico').setValue(element.correo);
    this.PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlanta(element.id).subscribe(
      (response: any) => {
        response.forEach(documento => {
          if (this.documentos.find(element => element.id == documento.iD_DocumentoPA)) {
            this.documentos.find(element => element.id == documento.iD_DocumentoPA).pathFile = documento.pathDocumento;
            this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).fileFormName).setValue(documento.nombreArchivo);
            this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).validityFormName).setValue(documento.idVigencia);
            this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).estadoFormName).setValue(documento.iD_Estado);
            this.documentos.find(element => element.id == documento.iD_DocumentoPA).estado = documento.sID_Estado;
          }
        });
      }
    );
  }

  downloadFile(name: string): void {
    let _fileUpload: fileUploadModel;
    let nombre = name;
    _fileUpload = { file: null, fileName: nombre, cnx: environment.cnxBS, container: environment.containerBS };
    (this.RepositoriosService.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: this.getType(nombre) });
        saveAs(blob, nombre);
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

  onQuestionlick(): void {
    this.answered = true;
    if (this.establecimientoForm.get('yesNotQuestions').value[0] == true) {
      this.answerYes = true;
      this.answered = false;
    } else {
      this.answerYes = false;
      this.answered = true;
    }
  }

  deleteElement(id: number, nombre: string) {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 8% !important; right: 20px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem;">¿Está seguro de que desea eliminar el establecimiento: ' + nombre + '?</p>' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem; margin-bottom: 2rem !important;">Está acción no se puede revertir.</p>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#005ACA',
      cancelButtonColor: '#E2ECFD',
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'Aceptar',
    }).then(
      (res) => {
        if (res.isDismissed) {
          this.PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlanta(id).subscribe(
            (response: any) => {
              response.forEach(documento => {
                this.PlantasBodegasDocumentosPAService.deletePlantasBodegasDocumentosPA(documento.id).subscribe(
                  (resp: any) => {
                    if (documento == response[response.length - 1]) {
                      this.plantaBodegasService.deletePlantaBodegas(id).subscribe(
                        (response: any) => {
                          this.fillTable();
                        }
                      )
                    }
                  }
                );
              });
            }
          );
        }
      }
    )
  }

  //Fixed states

  async delay(ms: number) {
  }



  fillTable() {

    this.planAlistamientoDocumentosPAService.getPlanAlistamientoDocumentosPAListRelationByPlan(this.idPlanAlistamiento).subscribe(
      (res: any) => {
        this.estadoMenorObligatoria = 100;
        let lastState;
        if (res.length == 0) {
          this.estadoMenorObligatoria = -1;
          this.estadoMenorSum = 100;

          let mapState;
          switch (this.estadoMenorObligatoria) {
            case 1:
              mapState = 1;
              break;
            case 2:
              mapState = 3;
              break;
            case 3:
              mapState = 5;
              break;
            case 4:
              mapState = 4;
              break;
            default:
              mapState = 1;
              break;
          }
          this._PlanesAlistamientosService.getPlanesAlistamientos(this.idPlanAlistamiento).subscribe(
            (response: any) => {
              this.PlanesAlistamientosObject = response;
              this.PlanesAlistamientosObject.iD_EstadoDocumentacion = mapState;
              this._PlanesAlistamientosService.updatePlanesAlistamientos(this.PlanesAlistamientosObject).subscribe(
                (res: any) => {

                }, () => { });
            }, () => {

            });
        }
        res.forEach(documento => {
          if (this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA)) {
            this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA).fileFormName).setValue(documento.nombreArchivo);
            this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA).pathFile = documento.pathDocumento;
            this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA).validityFormName).setValue(documento.iD_Vigencia);
            this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA).estadoFormName).setValue(documento.iD_Estado);
            this.documentosObligatorios.find(element => element.id == documento.iD_DocumentoPA).estado = documento.sID_Estado;
            if (documento.iD_Estado < this.estadoMenorObligatoria) {
              this.estadoMenorObligatoria = documento.iD_Estado;
              this.estadoMenorSum = 100;

              let mapState;
              switch (this.estadoMenorObligatoria) {
                case 1:
                  mapState = 1;
                  break;
                case 2:
                  mapState = 3;
                  break;
                case 3:
                  mapState = 5;
                  break;
                case 4:
                  mapState = 4;
                  break;
                default:
                  mapState = 1;
                  break;
              }
              lastState = mapState;
            }
            if (documento == res[res.length - 1]) {
              this._PlanesAlistamientosService.getPlanesAlistamientos(this.idPlanAlistamiento).subscribe(
                (response: any) => {
                  this.PlanesAlistamientosObject = response;
                  this.PlanesAlistamientosObject.iD_EstadoDocumentacion = lastState;
                  this._PlanesAlistamientosService.updatePlanesAlistamientos(this.PlanesAlistamientosObject).subscribe(
                    (res: any) => {

                    }, () => { });
                }, () => {

                });
            }
          }
        });
      }
    );

    this._PA_PlantaBodegasGetAllWithRelationService.getPA_PlantaBodegasGetAllWithRelationList(this.idPlanAlistamiento).subscribe(
      (response: any) => {
        this.estadoMenor = 100;
        this.plantaBodegasList = response;
        this.plantaBodegasList.forEach(ele => {
          let estadoTempMenor = 100;
          this.PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlanta(ele.id).subscribe(
            (res: any) => {
              res.forEach(documento => {
                if (documento.iD_Estado < estadoTempMenor) {
                  estadoTempMenor = documento.iD_Estado;
                }
                if (documento == res[res.length - 1]) {
                  ele.iD_EstadoPlantaBodega = estadoTempMenor;
                  if (ele == response[response.length - 1]) {
                    this.plantaBodegasList.forEach(elem => {
                      if (elem.iD_EstadoPlantaBodega < this.estadoMenor) {
                        this.estadoMenorSum = 100;
                        this.estadoMenor = elem.iD_EstadoPlantaBodega;

                        let mapState;
                        switch (this.estadoMenor) {
                          case 1:
                            mapState = 1;
                            break;
                          case 2:
                            mapState = 3;
                            break;
                          case 3:
                            mapState = 5;
                            break;
                          case 4:
                            mapState = 4;
                            break;
                          default:
                            mapState = 1;
                            break;
                        }
                        this.delay(777).then(any => {
                          this._PlanesAlistamientosService.getPlanesAlistamientos(this.idPlanAlistamiento).subscribe(
                            (response: any) => {
                              this.PlanesAlistamientosObject = response;
                              this.PlanesAlistamientosObject.iD_EstadoBodegas = mapState;
                              this._PlanesAlistamientosService.updatePlanesAlistamientos(this.PlanesAlistamientosObject).subscribe(
                                (res: any) => {

                                }, () => { });
                            }, () => {

                            });
                        });

                      }
                    })
                    this.dataSource = new MatTableDataSource<PlantaBodegasModel>(this.plantaBodegasList);
                  }
                }
              });
            }
          );
        })
      },
      (err) => {
      }
    );
  }

  fillSelects() {
    this.PA_DepartamentosService.getPA_DepartamentosList().subscribe(
      (response: any) => {
        this.departamentosList = response;
      },
      (err) => {
      }
    );
    this.divipolasService.getDivipolasList().subscribe(
      (response: any) => {
        this.DivipolasList = response;
      },
      (err) => {
      }
    );
    this.TipoEstablecimientoService.getTipoPlantasBodegaListFull().subscribe(
      (response: any) => {
        this.tipoEstablecimientoList = response;
      },
      (err) => {
      }
    );
    this.vigenciasService.getVigenciasListFull().subscribe(
      (response: any) => {
        this.vigenciasList = response;
      },
      (err) => {
      }
    );
  }

  public onFileSelected(File: string | any[], type: string, id: number, form: number): void {
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
    let sinEspa = nombre 
      let path = uuid.v4();
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: path, cnx: environment.cnxBS, container: environment.containerDS };
      if (type == "file") {
        this.addFileBlobRepositorios(_fileUpload, id, form, path, sinEspa);
      }
    }
  }

  addFileBlobRepositorios(fileUpload, id: number, form: number, path: string, name: string): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        // Se cambia la forma de obtener el documento por ID
        this.pathImage = String.fromCharCode.apply(null, new Uint8Array(response));
        if (form == 1) {
          this.documentos.find(element => element.id == id).pathFile = path;
          this.documentos.find(element => element.id == id).contenidoRespuesta = name;
          this.establecimientoForm.get(this.documentos.find(element => element.id == id).fileFormName).setValue(name);
          this.establecimientoForm.get(this.documentos.find(element => element.id == id).fileFormName).markAsDirty();
        } else if (form == 2) {
          this.documentosObligatorios.find(element => element.id == id).pathFile = path;
          this.documentosObligatorios.find(element => element.id == id).contenidoRespuesta = name;
          this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == id).fileFormName).setValue(name);
          this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == id).fileFormName).markAsDirty();
        }
      },
      (err) => {
      }
    );
  }

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  onKeyNumber2(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9 && e.keyCode != 32) {
      var patt = new RegExp("^[0-9a-zA-Zá-úÁ-Ú]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  openWarning() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important; position: absolute!important; top: 15% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem;">Debe diligenciar todos los campos del formulario para poder continuar.</p>',
      showConfirmButton: false,
      showCancelButton: false,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: false,
      denyButtonText: `Aceptar`,
    }).then(
      (res) => {
        this.alertOpened = true;
      }
    )
  };

  saveChanges(element: any) {
    this.isEdit = false;
    element.iD_TipoPlantaBodega = this.establecimientoForm.get('TipoEstablecimiento').value;
    element.nombre = this.establecimientoForm.get('NombreEstablecimiento').value;
    element.iD_Divipola = this.establecimientoForm.get('CiudadEstablecimiento').value;
    element.direccion = this.establecimientoForm.get('DireccionEstablecimiento').value;
    element.nombreContacto = this.establecimientoForm.get('Nombre').value;
    element.apellidoContacto = ' ';
    element.celular = this.establecimientoForm.get('Celular').value;
    element.correo = this.establecimientoForm.get('CorreoElectronico').value;
    this.plantaBodegasService.updatePlantaBodegas(element).subscribe(
      (res: any) => {
        let editedDocuments = [];
        this.PlantasBodegasDocumentosPAService.getPlantasBodegasDocumentosPAListRelationByPlanta(element.id).subscribe(
          (response: any) => {
            response.forEach(documento => {
              if (this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).fileFormName).dirty ||
                this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).validityFormName).dirty) {
                if (this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).fileFormName).valid &&
                  this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).validityFormName).value > 0) {
                  documento.iD_Estado = 2;
                } else {
                  documento.iD_Estado = 1;
                }
                documento.fechaVersion = new Date();
                documento.nombreArchivo = this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).fileFormName).value
                documento.pathDocumento = this.documentos.find(element => element.id == documento.iD_DocumentoPA).pathFile;
                documento.idVigencia = this.establecimientoForm.get(this.documentos.find(element => element.id == documento.iD_DocumentoPA).validityFormName).value;
                editedDocuments.push(documento);
              }
              if (documento == response[response.length - 1]) {
                editedDocuments.forEach(item => {
                  this.PlantasBodegasDocumentosPAService.updatePlantasBodegasDocumentosPA(item).subscribe(
                    (resp: any) => {
                      if (item == editedDocuments[editedDocuments.length - 1]) {
                        this.fillTable();
                      }
                    }
                  );
                })
              }
            });
          }
        );
      });
    this.registrarNotificacionService.registerNotification("Se ha editado una planta/bodega - el elemento esta disponible para aprobación", "Coordinador PAE");

  }

  goToBack() {
    this.router.navigate(['/ContratosAlistamiento'])
  }

  goToEdit() {
    this.isEdit = true;
  }

  goToEditDocuments() {
    this.isEditDocuments = true;
    this.documentosObligatorios.forEach(
      documento => {
        this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).fileFormName).markAsPristine();
        this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).validityFormName).markAsPristine();
      }
    );
  }

  saveMandatoryDocuments() {
    this.isEditDocuments = false;
    let editedMandatoryDocuments = [];
    this.documentosObligatorios.forEach(
      documento => {
        if (this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).fileFormName).dirty ||
          this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).validityFormName).dirty) {
          if (this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).fileFormName).valid &&
            this.documentosObligatoriosForm.get(this.documentosObligatorios.find(element => element.id == documento.id).validityFormName).value > 0) {
            documento.iD_Estado = 2;
          } else {
            documento.iD_Estado = 1;
          }
          editedMandatoryDocuments.push(documento);
        }

        if (documento == this.documentosObligatorios[this.documentosObligatorios.length - 1]) {
          editedMandatoryDocuments.forEach(item => {
            this.planAlistamientoDocumentosPAService.getPlanAlistamientoDocumentosPAListFullByPlanAndDocument(this.idPlanAlistamiento, item.id).subscribe(
              (response: any) => {
                if (response.length > 0) {
                  response[0].iD_Estado = item.iD_Estado;
                  response[0].iD_Vigencia = this.documentosObligatoriosForm.get(item.validityFormName).value ? this.documentosObligatoriosForm.get(item.validityFormName).value : 0;
                  response[0].nombreArchivo = this.documentosObligatoriosForm.get(item.fileFormName).value;
                  response[0].fechaVersion = new Date().toDateString();
                  response[0].pathDocumento = this.documentosObligatorios.find(element => element.id == item.id).pathFile;
                  this.planAlistamientoDocumentosPAService.updatePlanAlistamientoDocumentosPA(response[0]).subscribe(
                    (response: any) => {
                      if (item == editedMandatoryDocuments[editedMandatoryDocuments.length - 1]) {
                        this.fillTable();
                      }
                    },
                    (err) => {
                    }
                  );
                } else {
                  let objectDocument = <PlanAlistamientoDocumentosPAModel>{};
                  objectDocument.iD_PlanAlistamiento = this.idPlanAlistamiento;
                  objectDocument.iD_DocumentoPA = item.id;
                  objectDocument.iD_Estado = item.iD_Estado;
                  objectDocument.iD_Vigencia = this.documentosObligatoriosForm.get(item.validityFormName).value ? this.documentosObligatoriosForm.get(item.validityFormName).value : 0;
                  objectDocument.nombreArchivo = this.documentosObligatoriosForm.get(item.fileFormName).value;
                  objectDocument.fechaVersion = new Date().toDateString();
                  objectDocument.pathDocumento = this.documentosObligatorios.find(element => element.id == item.id).pathFile;
                  this.planAlistamientoDocumentosPAService.addPlanAlistamientoDocumentosPA(objectDocument).subscribe(
                    (response: any) => {
                      if (item == editedMandatoryDocuments[editedMandatoryDocuments.length - 1]) {
                        this.fillTable();
                      }
                    },
                    (err) => {
                    }
                  );
                }
              });
          })
        }
      }
    )
  }

  /*   onSubmitClick() {
      if (this.establecimientoForm.valid) {
        this.saveChanges();
      } else {
        this.openWarning();
      }
    } */

  addRecord() {
    this.addPlant = true;
    this.modelPaepi = false;
  }

  getStateColor(state: string): string {
    switch (state) {
      case "Pendiente":
        return "grayCircle";
      case "Por aprobar":
        return "yellowCircle";
      case "Aprobado":
        return "greenCircle";
      case "Rechazado":
        return "redCircle";
      default:
        return "grayCircle";
    }
  }

  getState(state: number): string {
    if (state == 4) {
      return "Aprobado"
    } else if (state == 3) {
      return "Rechazado"
    } else if (state == 2) {
      return "Por aprobar"
    } else {
      return "Pendiente"
    }
  }

  getStateMajor(state: number): string {
    if (state < this.estadoMenorSum) {
      this.estadoMenorSum = state;
      localStorage.setItem("documentacionState", state.toString());
      this.mensajeServicio.storageDocSub.next('changed');
      this.stateDocChanged.emit(state);
    }
    if (state == 4) {
      localStorage.setItem("docState", "Aprobada");
      this.mensajeServicio.storageSub.next('changed');
      return "Aprobado"
    } else if (state == 3) {
      localStorage.setItem("docState", "Rechazado");
      this.mensajeServicio.storageSub.next('changed');
      return "Rechazado"
    } else if (state == 2) {
      localStorage.setItem("docState", "Por aprobar");
      this.mensajeServicio.storageSub.next('changed');
      return "Por aprobar"
    } else {
      localStorage.setItem("docState", "Pendiente");
      this.mensajeServicio.storageSub.next('changed');
      return "Pendiente"
    }
  }

  openDialog(action: string, obj: any, fileName: string, idDocument: number, idEstado: number, typeDocument: number): void {
    obj.action = action;
    obj.fileName = fileName;
    obj.typeDocument = typeDocument;
    if (typeDocument == 1) {
      obj.idPlantaBodega = this.selectedIdPlantaBodega;
    } else if (typeDocument == 2) {
      obj.idPlanAlistamiento = this.idPlanAlistamiento;
    }
    obj.idDocument = idDocument;
    obj.idEstado = idEstado;
    if (fileName == '') {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="height: 30px!important; position: absolute!important; top: 5% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p  style="text-align: center !important; font-size: 13px; color: #005ACA; margin-right: 2rem;">No hay documento para revisar, por favor adjunte un archivo </p>',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: `Aceptar`,
      }).then((result) => {
        if (result.isDenied) {

        }
        else {
        }
      })
    } else {
      const dialogRef = this.dialog.open(DocViewerComponent, {
        data: obj
      });
      dialogRef.afterClosed().subscribe(result => {
        this.fillTable();
      });
    }
  }

  sendApprovePaepi() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important; position: absolute!important; top: 5% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p  style="text-align: center !important; font-size: 13px; color: #005ACA; margin-right: 2rem;">Si no cuenta con bodegas y/o plantas de ensamble o producción debe aprobar la documentación obligatoria – Operación del PAE</p>',
      showConfirmButton: false,
      showCancelButton: false,
      showDenyButton: false,
    }).then(
      (res) => {
      }
    )
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
