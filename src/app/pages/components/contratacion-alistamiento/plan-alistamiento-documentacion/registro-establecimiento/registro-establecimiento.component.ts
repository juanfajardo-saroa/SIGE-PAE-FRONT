import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import Swal from 'sweetalert2';
import { TiposPlantaBodegaModel } from 'src/app/shared/model/TiposPlantaBodega';
import { TipoPlantasBodegaService } from 'src/app/shared/services/TipoPlantasBodega.services';
import { PlantasBodegasDocumentosPAModel } from 'src/app/shared/model/PlantasBodegasDocumentosPA';
import { PlantasBodegasDocumentosPAService } from 'src/app/shared/services/PlantasBodegasDocumentosPA.services';
import { DocumentosPAService } from 'src/app/shared/services/DocumentosPA.services';
import { PlantaBodegasModel } from 'src/app/shared/model/PlantaBodegas';
import { PlantaBodegasService } from 'src/app/shared/services/PlantaBodegas.services';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_DepartamentosService } from 'src/app/shared/services/PA_Departamentos.services';
import { PA_DepartamentosModel } from 'src/app/shared/model/PA_DepartamentosModel';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import * as uuid from 'uuid';

@Component({
  selector: 'app-registro-establecimiento',
  templateUrl: './registro-establecimiento.component.html',
  styleUrls: ['./registro-establecimiento.component.scss']
})
export class RegistroEstablecimientoComponent implements OnInit {

  displayedColumns: string[] = ['Documento', 'Archivo', 'Vigencia', 'Estado'];
  documentos: any[] = [
    { id: 3, nombre: 'Acta de inspección sanitaria favorable con o sin observaciones', fileFormName: 'actaArchivo', validityFormName: 'actaVigencia', contenidoRespuesta: '', pathFile: '' },
    { id: 4, nombre: 'Inventario de equipos y utensilios', fileFormName: 'inventarioArchivo', validityFormName: 'inventarioVigencia', contenidoRespuesta: '', pathFile: '' },
    { id: 5, nombre: 'Plan de mantenimiento preventivo y correctivo de equipos', fileFormName: 'mantenimientoArchivo', validityFormName: 'mantenimientoVigencia', contenidoRespuesta: '', pathFile: '' },
    { id: 6, nombre: 'Plan de saneamiento (Bodegas)*', fileFormName: 'saneamientoArchivo', validityFormName: 'saneamientoVigencia', contenidoRespuesta: '', pathFile: '' },
  ]
  contenidoRespuesta: string = '';
  pathImage = '';
  alertOpened: boolean = false;
  IsCancel: boolean = false;
  tipoEstablecimientoList: TiposPlantaBodegaModel[];
  establecimientoForm: FormGroup;
  objectFormPlantaBodegaTemp = <PlantaBodegasModel>{};
  objectDocument = <PlantasBodegasDocumentosPAModel>{};
  divipolaList: PA_DivipolasGetbyETCModel[];
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  departamentosList: PA_DepartamentosModel[];
  DivipolasList: DivipolasModel[];
  vigenciasList: VigenciasModel[];
  idPlanAlistamiento: number;
  constructor(
    private router: Router,
    private RepositoriosExtendService: RepositoriosExtendService,
    private fb: FormBuilder,
    private TipoEstablecimientoService: TipoPlantasBodegaService,
    private plantaBodegasService: PlantaBodegasService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private PlantasBodegasDocumentosPAService: PlantasBodegasDocumentosPAService,
    private PA_DepartamentosService: PA_DepartamentosService,
    private divipolasService: DivipolasService,
    private vigenciasService: VigenciasService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
  ) {
    this.establecimientoForm = this.fb.group({
      TipoEstablecimiento: ['', Validators.required],
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
    });
  }

  ngOnInit(): void {
    this.idPlanAlistamiento = Number(localStorage.getItem('idPlan'));
    this.fillSelects();
  }

  fillSelects() {
    this.TipoEstablecimientoService.getTipoPlantasBodegaListFull().subscribe(
      (response: any) => {
        this.tipoEstablecimientoList = response;
      },
      (err) => {
      }
    );
    this.PA_DepartamentosService.getPA_DepartamentosList().subscribe(
      (response: any) => {
        this.departamentosList = response;
      },
      (err) => {
      }
    );
    this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
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

  public onFileSelected(File: string | any[], type: string, id: number): void {
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
        this.addFileBlobRepositorios(_fileUpload, id, path, sinEspa);
      }
    }
  }

  addFileBlobRepositorios(fileUpload, id: number, path: string, name: string): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.pathImage = String.fromCharCode.apply(null, new Uint8Array(response));
        this.documentos.find(element => element.id == id).contenidoRespuesta = name;
        this.documentos.find(element => element.id == id).pathFile = path;
        this.establecimientoForm.get(this.documentos.find(element => element.id == id).fileFormName).setValue(name);
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

  saveForm() {
    localStorage.setItem("addedEstablecimiento", "true");
    this.objectFormPlantaBodegaTemp.iD_TipoPlantaBodega = this.establecimientoForm.get('TipoEstablecimiento').value;
    this.objectFormPlantaBodegaTemp.nombre = this.establecimientoForm.get('NombreEstablecimiento').value;
    this.objectFormPlantaBodegaTemp.iD_Divipola = this.establecimientoForm.get('CiudadEstablecimiento').value;
    this.objectFormPlantaBodegaTemp.direccion = this.establecimientoForm.get('DireccionEstablecimiento').value;
    this.objectFormPlantaBodegaTemp.nombreContacto = this.establecimientoForm.get('Nombre').value;
    this.objectFormPlantaBodegaTemp.apellidoContacto = ' ';
    this.objectFormPlantaBodegaTemp.celular = this.establecimientoForm.get('Celular').value;
    this.objectFormPlantaBodegaTemp.correo = this.establecimientoForm.get('CorreoElectronico').value;
    this.objectFormPlantaBodegaTemp.iD_EstadoPlantaBodega = 1;
    this.objectFormPlantaBodegaTemp.iD_PlanAlistamiento = this.idPlanAlistamiento; //Conditionally by data --
    this.plantaBodegasService.addPlantaBodegas(this.objectFormPlantaBodegaTemp).subscribe(
      (response: any) => {
        this.documentos.forEach(documento => {
          this.objectDocument.iD_PlantaBodegas = response.id;
          this.objectDocument.iD_DocumentoPA = documento.id;
          this.objectDocument.iD_Estado = 2;
          this.objectDocument.idVigencia = this.establecimientoForm.get(this.documentos.find(element => element.id == documento.id).validityFormName).value; // TODO: Control changes
          this.objectDocument.nombreArchivo = this.establecimientoForm.get(this.documentos.find(element => element.id == documento.id).fileFormName).value;
          this.objectDocument.pathDocumento = this.documentos.find(element => element.id == documento.id).pathFile;
          this.objectDocument.fechaVersion = new Date().toDateString();
          this.PlantasBodegasDocumentosPAService.addPlantasBodegasDocumentosPA(this.objectDocument).subscribe(
            (response: any) => {
              if (documento == this.documentos[this.documentos.length - 1]) {
                this.IsCancel = true;
              }
            },
            (err) => {
            }
          );
        });
      },
      (err) => {
      }
    );
    this.registrarNotificacionService.registerNotification("Se ha creado una planta/bodega - el elemento esta disponible para aprobación", "Coordinador PAE");
  }

  goToBack() {
    this.IsCancel = true;
  }

  onSubmitClick() {
    if (this.establecimientoForm.valid) {
      this.saveForm();
    } else {
      this.openWarning();
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

  getStateColor(state: string): string {
    switch (state) {
      case "Pendiente":
        return "grayCircle";
      case "Por aprobar":
        return "yellowCircle";
      default:
        return "grayCircle";
    }
  }

  getState(formFile, formValidity: string): string {
    if (this.establecimientoForm.get(formFile).valid && this.establecimientoForm.get(formValidity).valid) {
      return "Por aprobar"
    } else {
      return "Pendiente"
    }
  }

}
