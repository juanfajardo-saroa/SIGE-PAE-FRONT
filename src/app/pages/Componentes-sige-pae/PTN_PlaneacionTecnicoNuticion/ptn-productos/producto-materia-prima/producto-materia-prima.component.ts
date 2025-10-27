import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { ProductosModel } from 'src/app/shared/model/Productos';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { AlimentosICBFModel } from 'src/app/shared/model/AlimentosICBF';
import { TiposUnidadModel } from 'src/app/shared/model/TiposUnidad';
import { TiposUnidadService } from 'src/app/shared/services/TiposUnidad.services';
import { NutrientesProductoService } from 'src/app/shared/services/NutrientesProducto.services';
import { NutrientesProductoModel } from 'src/app/shared/model/NutrientesProducto';
import { TipoFuenteNutricionalModel } from 'src/app/shared/model/TipoFuenteNutricional';
import { TipoFuenteNutricionalService } from 'src/app/shared/services/TipoFuenteNutricional.services';
import { NutrientesAlimentosService } from 'src/app/shared/services/NutrientesAlimentos.services';
import { NutrientesAlimentosModel } from 'src/app/shared/model/NutrientesAlimentos';
import Swal from 'sweetalert2';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_CalculaIntercambioAlimentoICBFService } from 'src/app/shared/services/PA_CalculaIntercambioAlimentoICBF.services';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { MessageService } from 'src/app/services/message.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';


@Component({
  selector: 'app-producto-materia-prima',
  templateUrl: './producto-materia-prima.component.html',
  styleUrls: ['./producto-materia-prima.component.scss']
})
export class ProductoMateriaPrimaComponent implements OnInit {
  columnNames = ['nombre', 'valor'];
  unidadMedidaProductoList: any = [
    { id: 1, descripcion: 'Gramos (g)' },
    { id: 2, descripcion: 'Mililitros (ml)' }
  ];
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
    { id: 1, nombre: 'Peso bruto (g):', formName: 'peso', required: true,decimal: true },
    { id: 2, nombre: 'Porcentaje comestible (%):', formName: 'porcentaje', required: true,decimal: true}
  ]
  energia: any[] = [
    { id: 1, nombre: 'Energía (kcl)', formName: 'energia', required: true,decimal: true },
  ]
  macronutrientes: any[] = [
    { id: 1, nombre: 'Proteínas (g)', formName: 'proteinas', required: true, decimal: true },
    { id: 2, nombre: 'Carbohidratos totales (g)', formName: 'carbohidratos', required: true, decimal: true },
    { id: 3, nombre: 'Grasas totales (g)', formName: 'grasasTotales', required: true, decimal: true },
    { id: 4, nombre: 'Grasas saturadas (g)', formName: 'grasasSaturadas', required: true, decimal: true },
  ]
  micronutrientes: any[] = [
    { id: 1, nombre: 'Calcio (mg)', formName: 'calcio', required: true, decimal: true },
    { id: 2, nombre: 'Hierro (mg)', formName: 'hierro', required: true, decimal: true },
    { id: 3, nombre: 'Sodio (mg)', formName: 'sodio', required: true, decimal: true },
    { id: 4, nombre: 'Vitamina A (ER) (opcional)', formName: 'vitamina', required: false, decimal: true },
    { id: 5, nombre: 'Zinc (mg) (opcional)', formName: 'zinc', required: false, decimal: true },
  ]
  idETC = Number(localStorage.getItem('IdUbicacion'));
  alertOpened: boolean = false;
  grupoAlimentosList: GrupoAlimentosModel[];
  selectSubGrupoAlimentosList: PA_SubGrupobyGrupoModel[];
  tipoFuenteNutricionalList: TipoFuenteNutricionalModel[];
  productosList: ProductosModel[];
  tiposUnidadList: TiposUnidadModel[];
  contenidoRespuesta: string = '';
  contenidoRespuestaFile: string = '';
  pathImage = '';
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

  productForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  isSubmitDisabled: boolean = false
  FileArchivo:any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private RepositoriosExtendService: RepositoriosExtendService,
    private grupoAlimentosService: GrupoAlimentosService,
    private tipoFuenteNutricionalService: TipoFuenteNutricionalService,
    private alimentosICBFService: AlimentosICBFService,
    private tiposUnidadService: TiposUnidadService,
    private nutrientesProductoService: NutrientesProductoService,
    private nutrientesAlimentosService: NutrientesAlimentosService,
    private PA_CalculaIntercambioAlimentoICBFService: PA_CalculaIntercambioAlimentoICBFService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
    private PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private messageservice: MessageService,
    public spinnerService: SpinnerService  // Inyecta el servicio del spinner Declara spinnerService como público
    ) {

    this.productForm = this.fb.group({
      NombreProducto: ['', Validators.required],
      GrupoAlimentos: ['', Validators.required],
      SubgrupoAlimentos: ['', Validators.required],
      pathImage: [''],
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

  ngOnInit(): void {
    this.fillSelects();

  }

  fillSelects() {
    this.grupoAlimentosService.getGrupoAlimentosListFull().subscribe(
      (response: any) => {
        this.grupoAlimentosList = response;
      },
      (err) => {
      }
    );

    this.tiposUnidadService.getTiposUnidadListFull().subscribe(
      (response: any) => {
        this.tiposUnidadList = response;
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
    formName = formName.replace(/\(/g, '');
    formName = formName.replace(/\)/g, '');
    formName = formName.replace(/á/g, 'a');
    formName = formName.replace(/é/g, 'e');
    formName = formName.replace(/í/g, 'i');
    formName = formName.replace(/ó/g, 'o');
    formName = formName.replace(/ú/g, 'u');
    return formName;
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
    //const reg = /^-?\d*(\.^\,\d{0,2})?$/;
    const reg =/^\d*(?:(?:,\d{3})*\.?|(?:\.\d{3})*,?)\d{0,2}$/
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
        event.preventDefault();
    }
 }

  public onFileSelected(File: string | any[], type: string): void {
    if (File[0]) {
      if (File[0].size <= 104857600) {
        this.FileArchivo=File[0];
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
      let sinEspa = nombre;
        if (type == "image") {
          this.pathImage = sinEspa;
        this.contenidoRespuesta = sinEspa;
        this.productForm.controls['pathImage'].setValue(this.contenidoRespuesta);
          //this.addImageBlobRepositorios(_fileUpload);
        } else if (type == "file") {
          this.pathImage = sinEspa;
          this.contenidoRespuestaFile = sinEspa;
          this.productForm.controls['pathFile'].setValue(this.contenidoRespuestaFile);
          //this.addFileBlobRepositorios(_fileUpload);
        }
      }else{
        this.messageservice.showWarning(
          'El archivo supera el  máximo peso permitido',
          'top right'
        );
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

 

    async addAlimentoICBF(alimentoObject: AlimentosICBFModel): Promise<void> {
      try {
        const response = await this.alimentosICBFService.addAlimentosICBF(alimentoObject).toPromise();

        this.subirArchivos(response)
        
        // Registrar notificaciones
        await this.registrarNotificaciones(response);
    
        // Obtener y procesar intercambios
        await this.PA_CalculaIntercambioAlimentoICBFService.getPA_CalculaIntercambioAlimentoICBFList(response.id).toPromise();
    
        // Agregar nutrientes
        await this.agregarNutrientes(response);
    
      } catch (error) {
        console.error('Error al agregar alimento ICBF:', error);
        throw error; // Propaga el error para que pueda ser manejado en saveForm()
      }
    }

   
  
  subirArchivos(response: any): void {
      const formData = new FormData();
      formData.append('file', this.FileArchivo as File);
  
      let sinEspa = response.id;
      this.objectFormAlimentoTemp.id=sinEspa
      if (response.pathlmagenAlimento) {
          this.contenidoRespuesta = sinEspa+'Pro' + response.pathlmagenAlimento;
          this.objectFormAlimentoTemp.pathlmagenAlimento = this.contenidoRespuesta;
  
          const _fileUpload: fileUploadModel = {
              file: formData,
              fileName: this.contenidoRespuesta,
              cnx: environment.cnxBS,
              container: environment.containerDS
          };
  
          this.addImageBlobRepositorios(_fileUpload);
      }
  
      if (response.pathImagenInformacionNutricional) {
          this.contenidoRespuestaFile = sinEspa+'Pro' + response.pathImagenInformacionNutricional;
          this.objectFormAlimentoTemp.pathImagenInformacionNutricional = this.contenidoRespuestaFile;
  
          const _fileUpload: fileUploadModel = {
              file: formData,
              fileName: this.contenidoRespuestaFile,
              cnx: environment.cnxBS,
              container: environment.containerDS
          };
  
          this.addFileBlobRepositorios(_fileUpload);
      }
  
      if (response.pathlmagenAlimento || response.pathImagenInformacionNutricional) {
        this.updateAlimentoICBF(this.objectFormAlimentoTemp);
    }
  }
  
  
  

    updateAlimentoICBF(alimentoObject: AlimentosICBFModel):void{
      this.alimentosICBFService.updateAlimentosICBF(alimentoObject).subscribe(
        (response) => {
        },
        (err) => {
        }
      );
    }
    
    private async registrarNotificaciones(response: any): Promise<void> {
      try {
        const roles = [
          "Coordinador PAE",
          "Administrador General SiPAE (Administrador UApA)",
          "Oficina Asesora Jurídica",
          "Oficina Asesora Control Interno",
          "Dirección General",
          "Oficina Asesora Comunicaciones UApA",
          "Subdirección de Información",
          "Oficina Asesora Planeación",
          "Subdirección Técnica de Gestión Corporativa",
          "Subdirección General",
          "Subdirección Técnica de Análisis, Calidad e Innovación"
        ];
    
        const notifications = roles.map(rol => {
          return this.registrarNotificacionService.registerNotificationWithUrl(`El producto ${response.nombre} está listo para aprobar`, rol, `/PTNProductos?typeComponent=1&action=2&id=${response.id}&type=1`);
        });
    
        await Promise.all(notifications);
    
      } catch (error) {
        console.error('Error al registrar notificaciones:', error);
        throw error;
      }
    }
    
    private async agregarNutrientes(response: any): Promise<void> {
      try {
        for (const element of this.nutrientes) {
          const nutrienteTemp = <NutrientesAlimentosModel>{
            iD_AlimentosICBF: response.id,
            iD_Nutriente: element.id,
            aporte: this.productForm.get(element.formName).value
          };
          await this.nutrientesAlimentosService.addNutrientesAlimentos(nutrienteTemp).toPromise();
        }
    
      } catch (error) {
        console.error('Error al agregar nutrientes:', error);
        throw error;
      }
    }
    

  addNutrienteProducto(nutrienteObject: NutrientesProductoModel): void {
    this.nutrientesProductoService.addNutrientesProducto(nutrienteObject).subscribe(
      (response) => {
      },
      (err) => {
      }
    );
  }

  onChangeEquivalencia(inputName: string) {
    if (inputName == "peso") {
      this.productForm.get('porcentaje').setValue(100 * (100 / this.productForm.get('peso')?.value))
    } else if (inputName == "porcentaje") {
      this.productForm.get('peso').setValue(100 * (100 / this.productForm.get('porcentaje')?.value))
    }
  }

  async onSubmitClick() {
    //this.productForm.controls['pathFile'].setValue('TCAC2018.pdf');
    if (this.productForm.valid) {
      this.isSubmitDisabled = true;
      this.spinnerService.show(); // Mostrar el spinner
      try {
        await this.saveForm();
      } finally {
        this.spinnerService.hide(); // Ocultar el spinner
        this.isSubmitDisabled = false;
      }
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

  async saveForm() {
    try {
      this.objectFormAlimentoTemp.nombre = this.productForm.get('NombreProducto')?.value;
      this.objectFormAlimentoTemp.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos')?.value;
      this.objectFormAlimentoTemp.pathlmagenAlimento = this.productForm.get('pathImage')?.value;
      this.objectFormAlimentoTemp.iD_TipoFuenteNutricional = this.productForm.get('TipoFuenteInformacionNutricional')?.value;
      this.objectFormAlimentoTemp.pathImagenInformacionNutricional = this.productForm.get('pathFile')?.value;
      this.objectFormAlimentoTemp.pesoBruto = this.productForm.get('peso')?.value;
      this.objectFormAlimentoTemp.porcentajeComestible = this.productForm.get('porcentaje')?.value;
      this.objectFormAlimentoTemp.iD_TipoAlimento = 1;
      this.objectFormAlimentoTemp.iD_TiposUnidad = this.productForm.get('unidad')?.value[0];
      this.objectFormAlimentoTemp.iD_EstadoRegistro = 7;
      this.objectFormAlimentoTemp.iD_ETC = this.idETC;
  
      this.spinnerService.show(); // Mostrar spinner
  
      await this.addAlimentoICBF(this.objectFormAlimentoTemp);
      await this.messageservice.showInfo("Se  insertaron correctamente los datos",'top center')
      await this.router.navigate(['/PTNProductos'], { queryParams: { selectedTab: 2 }});
  
    } catch (error) {
      console.error('Error al guardar formulario:', error);
      // Manejar error aquí (mostrar mensaje de error, etc.)
    } finally {
      this.spinnerService.hide(); // Ocultar spinner independientemente del resultado
    }
  }
  

  goToBack() {
    this.router.navigate(['/RegistroProducto'])
  }
}
