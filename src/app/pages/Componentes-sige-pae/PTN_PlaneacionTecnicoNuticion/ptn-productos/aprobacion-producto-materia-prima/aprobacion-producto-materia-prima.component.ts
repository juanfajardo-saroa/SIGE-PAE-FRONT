import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { TiposAlimentosModel } from 'src/app/shared/model/TiposAlimentos';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { ProductosModel } from 'src/app/shared/model/Productos';
import { AlimentosICBFModel } from 'src/app/shared/model/AlimentosICBF';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { TipoFuenteNutricionalService } from 'src/app/shared/services/TipoFuenteNutricional.services';
import { TipoFuenteNutricionalModel } from 'src/app/shared/model/TipoFuenteNutricional';
import { NutrientesAlimentosModel } from 'src/app/shared/model/NutrientesAlimentos';
import Swal from 'sweetalert2';
import { NutrientesAlimentosService } from 'src/app/shared/services/NutrientesAlimentos.services';
import { NutrientesProductoService } from 'src/app/shared/services/NutrientesProducto.services';
import { NutrientesProductoModel } from 'src/app/shared/model/NutrientesProducto';
import * as saveAs from 'file-saver';
import { EstadosRegistroModel } from 'src/app/shared/model/EstadosRegistro';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { PA_GetGrupoSubgrupoService } from 'src/app/shared/services/PA_GetGrupoSubgrupo.services';
import { PA_GetGrupobySubgrupoService } from 'src/app/shared/services/PA_GetGrupobySubgrupo.services';
import { PA_NutrientesAlimentosGetAllWithRelationService } from 'src/app/shared/services/PA_NutrientesAlimentosGetAllWithRelation.services';

@Component({
  selector: 'app-aprobacion-producto-materia-prima',
  templateUrl: './aprobacion-producto-materia-prima.component.html',
  styleUrls: ['./aprobacion-producto-materia-prima.component.scss']
})
export class AprobacionProductoMateriaPrimaComponent implements OnInit {
  alertOpened: boolean = false;
  columnNames = ['nombre', 'valor'];
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  action: number;
  productId: number;
  allowEdit: boolean;
  isEdit: boolean;
  pathImage = '';
  contenidoRespuesta: string = '';
  contenidoRespuestaFile: string = '';
  grupoAlimentosList: GrupoAlimentosModel[];
  selectSubGrupoAlimentosList: PA_SubGrupobyGrupoModel[];
  tiposAlimentosList: TiposAlimentosModel[];
  tipoFuenteNutricionalList: TipoFuenteNutricionalModel[];
  estadosList: EstadosRegistroModel[];
  idETC = Number(localStorage.getItem('IdUbicacion'));
  productosList: ProductosModel[];
  nutrienteTemp: NutrientesAlimentosModel = {
    id: null,
    sID: '',
    iD_Nutriente: null,
    siD_Nutriente: '',
    iD_AlimentosICBF: null,
    sID_AlimentosICBF: '',
    aporte: null,
    auditoria: '',
    filtro: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: null,
    isSelected: null,
    completed: null,
  };
  objectFormProductoTemp: ProductosModel = {
    id: null,
    sID: '',
    iD_SubGrupoAlimentos: null,
    sID_SubGrupoAlimentos: '',
    iD_ETC: null,
    sID_ETC: '',
    iD_TiposAlimentos: null,
    sID_TiposAlimentos: '',
    iD_TiposUnidad: null,
    sID_TiposUnidad: '',
    iD_EstadoRegistro: null,
    sID_EstadoRegistro: '',
    iD_RegistroINVIMA: null,
    sID_RegistroINVIMA: '',
    numeroRegistroInvima: null,
    nombre: '',
    pathlmagenProducto: '',
    pathlmagenRegistroSanitario: '',
    baseFruta: null,
    auditoria: '',
    pathImagenInformacionNutricional: '',
    fechaRegistro: new Date(),
    filtro: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: null,
    isSelected: null,
    completed: null,
  }
  productoTemp = <AlimentosICBFModel>{};
  productoTemp2 = <AlimentosICBFModel>{};
  objectFormAlimentoTemp: AlimentosICBFModel = {
    id: null,
    sID: '',
    iD_SubGrupoAlimentos: null,
    sID_SubGrupoAlimentos: '',
    iD_TipoAlimento: null,
    sID_TipoAlimento: '',
    iD_ETC: null,
    sID_ETC: '',
    iD_TipoFuenteNutricional: null,
    sID_TipoFuenteNutricional: '',
    auditoria: '',
    pathlmagenAlimento: '',
    pathImagenInformacionNutricional: '',
    porcentajeComestible: null,
    intercambioEstandarizado: null,
    pesoBruto: null,
    nombre: '',
    iD_TiposUnidad: null,
    sID_TiposUnidad: '',
    iD_EstadoRegistro: null,
    sID_EstadoRegistro: '',
    _ippublica: '',
    _ipa: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: null,
    isSelected: null,
    completed: null,
  };
  objectFormNutrienteTemp: NutrientesProductoModel = {
    id: null,
    sID: '',
    iD_Nutriente: null,
    sID_Nutriente: '',
    iD_AporteProducto: null,
    sID_AporteProducto: '',
    aporte: null,
    auditoria: '',
    filtro: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: null,
    isSelected: null,
    completed: null,
  }
  nutrientes: any[] = [
    { id: 14, formName: 'energia' },
    { id: 5, formName: 'proteinas' },
    { id: 6, formName: 'carbohidratos' },
    { id: 10, formName: 'grasasTotales' },
    { id: 9, formName: 'grasasSaturadas' },
    { id: 2, formName: 'calcio' },
    { id: 3, formName: 'hierro' },
    { id: 4, formName: 'sodio' },
    { id: 15, formName: 'vitamina' },
    { id: 13, formName: 'zinc' }
  ]
  equivalencia: any[] = [
    { id: 1, nombre: 'Peso bruto (g):', formName: 'peso', required: true },
    { id: 2, nombre: 'Porcentaje comestible (%):', formName: 'porcentaje', required: true }
  ]
  energia: any[] = [
    { id: 1, nombre: 'Energía (kcl)', formName: 'energia', required: true },
  ]
  macronutrientes: any[] = [
    { id: 1, nombre: 'Proteínas (g)', formName: 'proteinas', required: true, decimal: true },
    { id: 2, nombre: 'Carbohidratos totales (g)', formName: 'carbohidratos', required: true, decimal: true },
    { id: 3, nombre: 'Grasas totales (g)', formName: 'grasasTotales', required: true, decimal: false },
    { id: 4, nombre: 'Grasas saturadas (g)', formName: 'grasasSaturadas', required: true, decimal: true },
  ]
  micronutrientes: any[] = [
    { id: 1, nombre: 'Calcio (mg)', formName: 'calcio', required: true, decimal: false },
    { id: 2, nombre: 'Hierro (mg)', formName: 'hierro', required: true, decimal: true },
    { id: 3, nombre: 'Sodio (mg)', formName: 'sodio', required: true, decimal: false },
    { id: 4, nombre: 'Vitamina A (ER) (opcional)', formName: 'vitamina', required: false, decimal: false },
    { id: 5, nombre: 'Zinc (mg) (opcional)', formName: 'zinc', required: false, decimal: true },
  ]
  unidadMedidaProductoList: any = [
    { id: 1, descripcion: 'Gramos (g)' },
    { id: 2, descripcion: 'Mililitros (ml)' }
  ];

  productForm: FormGroup;
  alreadyCharge: boolean = false;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private RepositoriosExtendService: RepositoriosExtendService,
    private alimentosICBFService: AlimentosICBFService,
    private grupoAlimentosService: GrupoAlimentosService,
    private tipoFuenteNutricionalService: TipoFuenteNutricionalService,
    private nutrientesAlimentosService: NutrientesAlimentosService,
    private nutrientesProductoService: NutrientesProductoService,
    private RepositoriosService: RepositoriosExtendService,
    private seguridadService: SeguridadService,
    private PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private PA_GrupobySubGrupoService: PA_GetGrupobySubgrupoService,
    private _PA_NutrientesAlimentosGetAllWithRelationService:PA_NutrientesAlimentosGetAllWithRelationService,
    ) {
    this.route.queryParams.subscribe(params => {
      this.productId = params.id;
      this.action = + params.action;
      if (this.action == 2) {
        this.allowEdit = true;
      } else {
        this.allowEdit = false;
      }
    });
    this.fillProduct();
    this.productForm = this.fb.group({
      NombreProducto: ['', Validators.required],
      GrupoAlimentos: ['', Validators.required],
      SubgrupoAlimentos: ['', Validators.required],
      pathImage: ['', Validators.required],
      TipoFuenteInformacionNutricional: ['', Validators.required],
      pathFile: ['', Validators.required],
      unidad: ['', Validators.required],
      peso: ['', Validators.required],
      porcentaje: ['', Validators.required],
      energia: ['', Validators.required],
      proteinas: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      grasasTotales: ['', Validators.required],
      grasasSaturadas: ['', Validators.required],
      calcio: ['', Validators.required],
      hierro: ['', Validators.required],
      sodio: ['', Validators.required],
      vitamina: [''],
      zinc: [''],
    });
  }

  fillProduct() {
    this.alimentosICBFService.getAlimentosICBFListRelationfilter(this.productId).subscribe(
      (response: any) => {
        this.alreadyCharge = false;
        this.changeDetectorRef.detectChanges();
        this.productoTemp = response[0];
        this.productForm.get('NombreProducto').setValue(this.productoTemp.nombre);
        this.productForm.get('SubgrupoAlimentos').setValue(this.productoTemp.iD_SubGrupoAlimentos);
        this.productForm.get('pathImage').setValue(this.productoTemp.pathlmagenAlimento);
        this.productForm.get('TipoFuenteInformacionNutricional').setValue(this.productoTemp.iD_TipoFuenteNutricional);
        this.productForm.get('pathFile').setValue(this.productoTemp.pathImagenInformacionNutricional);
        this.unidadMedidaProductoList = this.unidadMedidaProductoList.filter(element => element.id == this.productoTemp.iD_TiposUnidad);
        this.productForm.get('peso').setValue(this.productoTemp.pesoBruto);
        this.productForm.get('porcentaje').setValue(this.productoTemp.porcentajeComestible);
        this.contenidoRespuesta=this.productoTemp.pathlmagenAlimento
        this.contenidoRespuestaFile=this.productoTemp.pathImagenInformacionNutricional
        this.alreadyCharge = true;
        this.changeDetectorRef.detectChanges();
        this._PA_NutrientesAlimentosGetAllWithRelationService.getPA_NutrientesAlimentosGetAllWithRelationList(this.productoTemp.id).subscribe((resp: any) => {
          resp.forEach(element => {
            this.productForm.get(this.nutrientes.find(nutriente => nutriente.id == element.iD_Nutriente).formName).setValue(element.aporte);
          });
        })
        this.PA_GrupobySubGrupoService.getPA_GetGrupobySubgrupoList(this.productoTemp.iD_SubGrupoAlimentos).subscribe((res: any) => {
          let grupo = res[0].grupoAlimentos.replace(/ /g, "").split(',');
          if(grupo.length==0){
           
          }else{
             this.productForm.get('GrupoAlimentos').setValue(Number(grupo[0]));
             
          this.onGrupoClick2(grupo[0]);
          }
          
        })
      },
      (err) => {
      }
    );
  }

  ngOnInit(): void {
    this.fillSelects();
  }

  onGrupoClick(value: any): void {
    
    this.PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(value).subscribe(
      (response: any) => {
        this.selectSubGrupoAlimentosList = response;
      },
      (err) => {
      }
    );
  }
  onGrupoClick2(value: any): void {
    
      this.PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(value).subscribe(
      (response: any) => {
        this.selectSubGrupoAlimentosList=response;
     
       
        
      },
      (err) => {
      }
    );
    

  }

  getInformationProduct(id: any) {
    this.alimentosICBFService.getAlimentosICBF(this.productId).subscribe(
      (response: any) => {
        this.objectFormAlimentoTemp = response;
      },
      (err) => {
      }
    );
  }

  public onFileSelected(File: string | any[], type: string): void {
    if (File[0]) {
      if (File[0].size <= 104857600) {
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
      let sinEspa = this.productId+'Pro'+nombre;
      
        let _fileUpload: fileUploadModel;
        _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerDS };
        if (type == "image") {
          this.pathImage = sinEspa;
        this.contenidoRespuesta = sinEspa;
        this.productForm.controls['pathImage'].setValue(this.contenidoRespuesta);

          this.addImageBlobRepositorios(_fileUpload);
        } else if (type == "file") {
          this.pathImage = sinEspa
          this.contenidoRespuestaFile = sinEspa
          this.productForm.controls['pathFile'].setValue(this.contenidoRespuestaFile);

          this.addFileBlobRepositorios(_fileUpload);
        }
      }
    }
  }

  addImageBlobRepositorios(fileUpload): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        

      },
      (err) => {
      }
    );
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
       
      },
      (err) => {
      }
    );
  }

  fillSelects() {
    this.grupoAlimentosService.getGrupoAlimentosListFull().subscribe(
      (response: any) => {
        this.grupoAlimentosList = response;
      },
      (err) => {
      }
    );

    this.tipoFuenteNutricionalService.getTipoFuenteNutricionalListFull().subscribe(
      (response: any) => {
        this.tipoFuenteNutricionalList = response;
      },
      (err) => {
      }
    );

  }

  getFormName(name: string): string {
    var formName;
    formName = name.replace(/\s/g, "");
    formName = formName.replace('(', '');
    formName = formName.replace(')', '');
    formName = formName.replace('á', 'a');
    formName = formName.replace('é', 'e');
    formName = formName.replace('í', 'i');
    formName = formName.replace('ó', 'o');
    formName = formName.replace('ú', 'u');
    return formName;
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
      var patt = new RegExp("^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
        event.preventDefault();
    }
 }

  onChangeEquivalencia(inputName: string) {
    if (inputName == "peso") {
      this.productForm.get('porcentaje').setValue((100 * 100) / this.productForm.get('peso')?.value)
    } else if (inputName == "porcentaje") {
      this.productForm.get('peso').setValue((100 * 100) / this.productForm.get('porcentaje')?.value)
    }
  }

  onSubmitClick() {
    if (this.productForm.valid) {
      this.saveForm();
    } else {
      this.openWarning();
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

  openWarningImage() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 15% !important; right: 17px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
        '<p style="text-align: left !important; font-size: 12px; color:#005ACA; margin-right: 2rem;">No hay una imagen disponible para ver.</p>',
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

  addNutrienteProducto(nutrienteObject: NutrientesProductoModel): void {
    this.nutrientesProductoService.addNutrientesProducto(nutrienteObject).subscribe(
      (response) => {
      },
      (err) => {
      }
    );
  }

  addAlimentoICBF(alimentoObject: AlimentosICBFModel): void {
    this.alimentosICBFService.addAlimentosICBF(alimentoObject).subscribe(
      (response) => {
        this.nutrientes.forEach(element => {
          this.nutrienteTemp = <NutrientesAlimentosModel>{};
          this.nutrienteTemp.iD_AlimentosICBF = response.id;
          this.nutrienteTemp.iD_Nutriente = element.id;
          this.nutrienteTemp.aporte = this.productForm.get(element.formName).value;
          this.nutrientesAlimentosService.addNutrientesAlimentos(this.nutrienteTemp).subscribe(
            (response) => {
            },
            (err) => {
            }
          );
        });
      },
      (err) => {
      }
    );
  }

  saveForm() {
    this.objectFormAlimentoTemp.nombre = this.productForm.get('NombreProducto')?.value;
    this.objectFormAlimentoTemp.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos')?.value;
    this.objectFormAlimentoTemp.pathlmagenAlimento = this.productForm.get('pathImage')?.value;
    this.objectFormAlimentoTemp.iD_TipoFuenteNutricional = this.productForm.get('TipoFuenteInformacionNutricional')?.value;
    this.objectFormAlimentoTemp.pathImagenInformacionNutricional = this.productForm.get('pathFile')?.value;
    this.objectFormAlimentoTemp.pesoBruto = this.productForm.get('peso')?.value;
    this.objectFormAlimentoTemp.porcentajeComestible = this.productForm.get('porcentaje')?.value;
    this.objectFormAlimentoTemp.iD_TipoAlimento = 1;
    this.objectFormAlimentoTemp.iD_TiposUnidad = this.productForm.get('unidad')?.value[0];
    this.objectFormAlimentoTemp.iD_EstadoRegistro = 1;
    this.objectFormAlimentoTemp.iD_ETC = this.idETC;
    this.addAlimentoICBF(this.objectFormAlimentoTemp);
    this.router.navigate(['/PTNProductos'])
  }

  goToBack() {
    this.router.navigate(['/PTNProductos'])
  }

  downloadImage(): void {
    let _fileUpload: fileUploadModel;
    let nombre = this.productForm.value.pathImage;
    if (this.productForm.value.pathImage == "" || this.productForm.value.pathImage == null) {
      this.openWarningImage();
    } else {
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
  }

  downloadFile(): void {
    let _fileUpload: fileUploadModel;
    let nombre = this.productForm.value.pathFile;
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

  goToEdit() {
    let arrayTempUnidad: number[] = [];
    arrayTempUnidad.push(this.productoTemp.iD_TiposUnidad);
    this.productForm.get('unidad').setValue(arrayTempUnidad);
    this.isEdit = true;
    this.unidadMedidaProductoList = [
      { id: 1, descripcion: 'Gramos (g)' },
      { id: 2, descripcion: 'Mililitros (ml)' }
    ];
  }

  saveChanges() {
console.log(644,this.productForm);

    this.isEdit = false;
    this.productoTemp2 = <AlimentosICBFModel>{};
    this.productoTemp2.id = this.productId;
    this.productoTemp2.nombre = this.productForm.get('NombreProducto').value;
    this.productoTemp2.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos').value;
    this.productoTemp2.pathlmagenAlimento = this.productForm.get('pathImage').value;
    this.productoTemp2.iD_TipoFuenteNutricional = this.productForm.get('TipoFuenteInformacionNutricional').value;
    this.productoTemp2.pathImagenInformacionNutricional = this.productForm.get('pathFile').value;
    this.productoTemp2.iD_TiposUnidad = this.productForm.get('unidad').value[0];
    this.productForm.get('unidad').setValue(0);
    this.productoTemp2.pesoBruto = this.productForm.get('peso').value;
    this.productoTemp2.porcentajeComestible = this.productForm.get('porcentaje').value;
    this.productoTemp2.iD_ETC = this.productoTemp.iD_ETC;
    this.productoTemp2.iD_TipoAlimento = this.productoTemp.iD_TipoAlimento;
    this.productoTemp2.iD_EstadoRegistro = 7;
    this.alimentosICBFService.updateAlimentosICBF(this.productoTemp2).subscribe(
      (res: any) => {
        this.nutrientesAlimentosService.getNutrientesAlimentosListFilter(this.productoTemp2.id).subscribe((resp: any) => {
          resp.forEach(element => {
            element.aporte = this.productForm.get(this.nutrientes.find(nutriente => nutriente.id == element.iD_Nutriente).formName).value;
            element.auditoria = "Audit";
            element.filtro = "Filter";
            this.nutrientesAlimentosService.updateNutrientesAlimentos(element).subscribe(
              (respo: any) => {
                if (element == resp[resp.length - 1]) {
                  this.fillProduct();
                }
              });
          });
        })
      });
  }

  getStateColor(id: number): string {

    switch (id) {
      case 1:
        return "yellowCircle";
        break;
      case 2:
        return "redCircle";
        break;
      case 3:
        return "greenCircle";
        break;
      default:
        return "yellowCircle";
        break;
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
