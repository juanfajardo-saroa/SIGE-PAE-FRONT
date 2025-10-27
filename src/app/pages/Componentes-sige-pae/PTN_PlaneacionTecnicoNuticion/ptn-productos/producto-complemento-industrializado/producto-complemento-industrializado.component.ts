import { Component, OnInit } from '@angular/core';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { SubGrupoAlimentosModel } from 'src/app/shared/model/SubGrupoAlimentos';
import { TiposUnidadModel } from 'src/app/shared/model/TiposUnidad';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { TiposUnidadService } from 'src/app/shared/services/TiposUnidad.services';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroINVIMAService } from 'src/app/shared/services/RegistroINVIMA.services';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/shared/services/Productos.services';
import { ProductosModel } from 'src/app/shared/model/Productos';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { AporteProductoService } from 'src/app/shared/services/AporteProducto.services';
import { AporteProductoModel } from 'src/app/shared/model/AporteProducto';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { NutrientesProductoService } from 'src/app/shared/services/NutrientesProducto.services';
import { NutrientesProductoModel } from 'src/app/shared/model/NutrientesProducto';
import Swal from 'sweetalert2';
import { VariedadesProductoService } from 'src/app/shared/services/VariedadesProducto.services';
import { VariedadesProductoModel } from 'src/app/shared/model/VariedadesProducto';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_CalculaIntercambioAlimentoICBFService } from 'src/app/shared/services/PA_CalculaIntercambioAlimentoICBF.services';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { MessageService } from 'src/app/services/message.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-producto-complemento-industrializado',
  templateUrl: './producto-complemento-industrializado.component.html',
  styleUrls: ['./producto-complemento-industrializado.component.scss']
})
export class ProductoComplementoIndustrializadoComponent implements OnInit {
  idETC = Number(localStorage.getItem('IdUbicacion'));
  columnNames = ['nombre', 'valor'];
  unidadMedidaProductoList: any = [
    { id: 1, descripcion: 'Gramos (g)' },
    { id: 2, descripcion: 'Mililitros (ml)' }
  ];
  resgistroInvimaResponse: any = [
    { id: 1, descripcion: '- Fabricante:', valor: 'N/A' },
    { id: 2, descripcion: '- Nit del fabricante:', valor: 'N/A' },
    { id: 3, descripcion: '- Fecha de vencimiento del registro:', valor: 'N/A' },
    { id: 4, descripcion: '- Estado del registro:', valor: 'N/A' }
  ];
  yesNotQuestion: any = [
    { id: true, descripcion: 'Si' },
    { id: false, descripcion: 'No' }
  ];

  nutrientes: any[] = [
    { id: 14, formName: 'energia' },
    { id: 5, formName: 'proteinas' },
    { id: 6, formName: 'carbohidratos' },
    { id: 313, formName: 'azucaresLibres' },
    { id: 10, formName: 'grasasTotales' },
    { id: 314, formName: 'grasasTrans' },
    { id: 9, formName: 'grasasSaturadas' },
    { id: 2, formName: 'calcio' },
    { id: 3, formName: 'hierro' },
    { id: 4, formName: 'sodio' },
    { id: 15, formName: 'vitamina' },
    { id: 13, formName: 'zinc' }
  ]
  equivalencia: any[] = [
    { id: 1, nombre: 'Peso bruto (g):', formName: 'pesoBruto', required: true, decimal: true },
    { id: 2, nombre: 'Porcentaje comestible (%):', formName: 'porcentaje', required: true, decimal: true }
  ]
  energia: any[] = [
    { id: 1, nombre: 'Energía (kcl)', formName: 'energia', required: true, decimal: true },
  ]
  macronutrientes: any[] = [
    { id: 1, nombre: 'Proteínas (g)', formName: 'proteinas', required: true, decimal: true },
    { id: 2, nombre: 'Carbohidratos totales (g)', formName: 'carbohidratos', required: true, decimal: true },
    { id: 3, nombre: 'Azúcares libres (g)', formName: 'azucaresLibres', required: true, decimal: true },
    { id: 4, nombre: 'Grasas totales (g)', formName: 'grasasTotales', required: true, decimal: true },
    { id: 5, nombre: 'Grasas trans (g)', formName: 'grasasTrans', required: true, decimal: true },
    { id: 6, nombre: 'Grasas saturadas (g)', formName: 'grasasSaturadas', required: true, decimal: true },
  ]
  micronutrientes: any[] = [
    { id: 1, nombre: 'Calcio (mg)', formName: 'calcio', required: true, decimal: true },
    { id: 2, nombre: 'Hierro (mg)', formName: 'hierro', required: true, decimal: true },
    { id: 3, nombre: 'Sodio (mg)', formName: 'sodio', required: true, decimal: true },
    { id: 4, nombre: 'Vitamina A (ER) (opcional)', formName: 'vitamina', required: false, decimal: true },
    { id: 5, nombre: 'Zinc (mg) (opcional)', formName: 'zinc', required: false, decimal: true },
  ]
  objectFormProductoTemp: ProductosModel = {
    id: null,
    sID: ' ',
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
  alertOpened: boolean = false;
  productoVisible: boolean = false;
  itemsDisabled: boolean = true;
  componenteSeleccionado: number = 0;
  variedadesList: number[] = [];
  grupoAlimentosList: GrupoAlimentosModel[];
  selectSubGrupoAlimentosList: PA_SubGrupobyGrupoModel[];
  tiposUnidadList: TiposUnidadModel[];
  isFruit = false;
  answerYes = false;
  answered = false;
  validated = false;
  invimaValid = false;
  numberVariedades: number;
  numberUnidad: number;
  numberImage: number;
  numberInvima: number;
  numberAporte: number;
  productForm: FormGroup;
  contenidoRespuesta: string = '';
  pathImage = '';
  aporteProductoTemp = <AporteProductoModel>{};
  nutrienteProductoTemp = <NutrientesProductoModel>{};
  variedadProductoTemp = <VariedadesProductoModel>{};
  nivelList: any[] = [];
  public errorMessage: string = '';
  public showError: boolean;
  isSubmitDisabled: boolean = false;
  FileArchivo: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registroInvimaService: RegistroINVIMAService,
    private grupoAlimentosService: GrupoAlimentosService,
    private tiposUnidadService: TiposUnidadService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private aporteProductoSevice: AporteProductoService,
    private nutrientesProductoSevice: NutrientesProductoService,
    private nivelEducativoService: NivelEducativoService,
    private variedadesService: VariedadesProductoService,
    private productosService: ProductosService,
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
      NumeroRegistroInvima: ['', Validators.required],
      TipoUnidad: ['', Validators.required],
      pathImage: ['', Validators.required],
      variedades: this.fb.array([]),
      fruitQuestion: [''],
      aportesNutricionales: this.fb.array([]),
    });
    this.nivelEducativoService.getNivelEducativoList().subscribe(
      (response: any) => {
        this.nivelList = response;
        var x = 0;
        this.nivelList.forEach(element => {
          this.addAporte();
          if (x == 0) {
            element.active = true;
          } else {
            element.active = false;
          }
          element.index = x;
          x++;
        });
      },
      (err) => {
      }
    );
    this.addVariedad();
  }

  get aportesNutricionales() {
    return (this.productForm.get('aportesNutricionales') as FormArray);
  }

  addAporte() {
    this.aportesNutricionales.push(
      this.fb.group({
        pesoNeto: new FormControl('', [Validators.required]),
        pesoBruto: new FormControl('', [Validators.required]),
        porcentaje: new FormControl('', [Validators.required]),
        energia: ['', Validators.required],
        proteinas: ['', Validators.required],
        carbohidratos: ['', Validators.required],
        azucaresLibres: ['', Validators.required],
        grasasTotales: ['', Validators.required],
        grasasTrans: ['', Validators.required],
        grasasSaturadas: ['', Validators.required],
        calcio: ['', Validators.required],
        hierro: ['', Validators.required],
        sodio: ['', Validators.required],
        vitamina: [''],
        zinc: [''],
      })
    );
  }

  deleteAporte(i) {
    this.aportesNutricionales.removeAt(i);
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
  onKeyNumber3(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9a-zA-ZñÑ-]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  decimalFilter(event: any) {
    //const reg = /^-?\d*(\.^\,\d{0,2})?$/;
    const reg = /^\d*(?:(?:,\d{3})*\.?|(?:\.\d{3})*,?)\d{0,2}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  get variedades() {
    return (this.productForm.get('variedades') as FormArray);
  }

  addVariedad() {
    this.variedades.push(
      this.fb.group({
        variedad: new FormControl('', [Validators.required]),
      })
    );
  }

  deleteVariedad(i) {
    this.variedades.removeAt(i);
  }

  ngOnInit(): void {
    this.numberInvima = 4;
    this.numberImage = 5;
    this.numberVariedades = 6;
    this.numberUnidad = 7;
    this.numberAporte = 8;
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

  onSubGrupoClick(value: any): void {
    if (value == 3) {
      this.isFruit = true;
      this.numberInvima = 5;
    } else {
      this.isFruit = false;
      this.numberInvima = 4;
      this.numberImage = 5;
      this.numberVariedades = 6;
      this.numberUnidad = 7;
      this.numberAporte = 8;
    }
  }

  onQuestionlick(): void {
    this.answered = true;
    if (this.productForm.get('fruitQuestion').value[0] == true) {
      this.productForm.get('pathImage').setValidators(Validators.required);
      this.productForm.get('TipoUnidad').setValidators(Validators.required);
      this.productForm.get('NumeroRegistroInvima').setValidators(Validators.required);
      this.productForm.get('pathImage').updateValueAndValidity();
      this.productForm.get('TipoUnidad').updateValueAndValidity();
      this.productForm.get('NumeroRegistroInvima').updateValueAndValidity();
      this.answerYes = true;
      this.numberImage = 6;
      this.numberVariedades = 7;
      this.numberUnidad = 8;
      this.numberAporte = 9;
    } else {
      this.productForm.get('pathImage').setValidators(null);
      this.productForm.get('TipoUnidad').setValidators(null);
      this.productForm.get('NumeroRegistroInvima').setValidators(null);
      this.productForm.get('pathImage').updateValueAndValidity();
      this.productForm.get('TipoUnidad').updateValueAndValidity();
      this.productForm.get('NumeroRegistroInvima').updateValueAndValidity();
      this.answerYes = false;
      this.numberVariedades = 5;
      this.numberAporte = 6;
    }
  }

  onValidClick(): void {
    this.validated = true;
    this.registroInvimaService.getRegistroINVIMAListRelationFilter(this.productForm.get('NumeroRegistroInvima').value).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.invimaValid = response[0].iD_EstadoRegistro == 1;
          this.resgistroInvimaResponse[0].valor = response[0].numeroRegistro;
          this.resgistroInvimaResponse[1].valor = response[0].nitFabricante;
          this.resgistroInvimaResponse[2].valor = response[0].fechaVencimiento;
          this.resgistroInvimaResponse[3].valor = response[0].sID_EstadoRegistro;
        }
      },
      (err) => {
      }
    );
  }

  getStateColor(index: number): string {
    if (this.productForm.get('aportesNutricionales').get(index.toString()).valid) {
      return "greenCircle";
    } else if (this.productForm.get('aportesNutricionales').get(index.toString()).invalid && this.productForm.get('aportesNutricionales').get(index.toString()).touched) {
      return "yellowCircle";
    } else {
      return "grayCircle";
    }
  }

  seleccionarTab(tab: any) {
    for (let i = 0; i < this.nivelList.length; i++) {
      if (this.nivelList[i] == tab) {
        this.nivelList[i].active = true
      } else {
        this.nivelList[i].active = false
      }
    }
    this.componenteSeleccionado = tab.index;
  }



  async addProducto(productoObject: ProductosModel): Promise<void> {
    this.spinnerService.show();  // Mostrar el spinner al iniciar el proceso

    try {
      const response = await this.productosService.addProductos(productoObject).toPromise();
      this.subirArchivos(response)
      await this.registrarNotificaciones(response);  // Registrar notificaciones
      await this.PA_CalculaIntercambioAlimentoICBFService.getPA_CalculaIntercambioAlimentoICBFList(response.id).toPromise();

      for (const item of this.productForm.value.variedades) {
        this.variedadProductoTemp = <VariedadesProductoModel>{};
        this.variedadProductoTemp.iD_Producto = response.id;
        this.variedadProductoTemp.nombreVariedad = item.variedad;
        await this.variedadesService.addVariedadesProducto(this.variedadProductoTemp).toPromise();

        if (item === this.productForm.value.variedades[this.productForm.value.variedades.length - 1]) {
          for (const nivel of this.nivelList) {
            this.aporteProductoTemp = <AporteProductoModel>{};
            this.aporteProductoTemp.iD_Producto = response.id;
            this.aporteProductoTemp.iD_TipoNivelEducativo = nivel.id;
            this.aporteProductoTemp.pesoNeto = this.productForm.value.aportesNutricionales[nivel.index].pesoNeto;
            this.aporteProductoTemp.pesoBruto = this.productForm.value.aportesNutricionales[nivel.index].pesoBruto;
            this.aporteProductoTemp.porcentajeComestible = this.productForm.value.aportesNutricionales[nivel.index].porcentaje;
            const aporteProductoResponse = await this.aporteProductoSevice.addAporteProducto(this.aporteProductoTemp).toPromise();

            for (const element of this.nutrientes) {
              this.nutrienteProductoTemp = <NutrientesProductoModel>{};
              this.nutrienteProductoTemp.iD_AporteProducto = aporteProductoResponse.id;
              this.nutrienteProductoTemp.iD_Nutriente = element.id;
              this.nutrienteProductoTemp.aporte = this.productForm.value.aportesNutricionales[nivel.index][element.formName];
              await this.nutrientesProductoSevice.addNutrientesProducto(this.nutrienteProductoTemp).toPromise();
            }
          }
        }
      }

      this.spinnerService.hide();  // Ocultar el spinner al finalizar todas las operaciones
      await this.messageservice.showInfo("Se  insertaron correctamente los datos", 'top center')
      this.router.navigate(['/PTNProductos'], { queryParams: { selectedTab: 2 } });  // Redirigir a la página deseada
    } catch (error) {
      this.spinnerService.hide();  // Ocultar el spinner en caso de error
      console.error('Error al agregar el producto:', error);
    }
  }

  subirArchivos(response: any): void {
    const formData = new FormData();
    formData.append('file', this.FileArchivo as File);

    let sinEspa = response.id;
    this.objectFormProductoTemp.id = sinEspa
    if (response.pathlmagenProducto) {
      this.contenidoRespuesta = sinEspa+'Pro' + response.pathlmagenProducto;
      this.objectFormProductoTemp.pathlmagenProducto = this.contenidoRespuesta;

      const _fileUpload: fileUploadModel = {
        file: formData,
        fileName: this.contenidoRespuesta,
        cnx: environment.cnxBS,
        container: environment.containerDS
      };

      this.addImageBlobRepositorios(_fileUpload);
    }

    if (response.pathImagenInformacionNutricional && response.pathImagenInformacionNutricional !== 'empty') {
      this.contenidoRespuesta = sinEspa+'Pro' + response.pathImagenInformacionNutricional;
      this.objectFormProductoTemp.pathImagenInformacionNutricional = this.contenidoRespuesta;

      const _fileUpload: fileUploadModel = {
        file: formData,
        fileName: this.contenidoRespuesta,
        cnx: environment.cnxBS,
        container: environment.containerDS
      };

      this.addFileBlobRepositorios(_fileUpload);
    }

    // Actualizar Producto solo si se actualiza alguna ruta
    if (response.pathlmagenProducto || (response.pathImagenInformacionNutricional && response.pathImagenInformacionNutricional !== 'empty')) {
      this.updateProducto(this.objectFormProductoTemp);
    }
  }
  updateProducto(alimentoObject: ProductosModel): void {
    this.productosService.updateProductos(alimentoObject).subscribe(
      (response) => {
      },
      (err) => {
      }
    );
  }


  private async registrarNotificaciones(response: any): Promise<void> {
    const notificaciones = [
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Coordinador PAE", url: "/PTNProductos?typeComponent=2&action=2&id=" + response.id + "&type=2" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Administrador General SiPAE (Administrador UApA)", url: "/PTNProductos?typeComponent=2&action=2&id=" + response.id + "&type=2" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Oficina Asesora Jurídica", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Oficina Asesora Control Interno", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Dirección General", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Oficina Asesora Comunicaciones UApA", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Subdirección de Información", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Oficina Asesora Planeación", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Subdirección Técnica de Gestión Corporativa", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Subdirección General", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rol: "Subdirección Técnica de Análisis, Calidad e Innovación", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" },
      { mensaje: "El producto " + response.nombre + " está listo para aprobar", rolId: "26497bcf-bb09-473a-af94-4e194be66a21", url: "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1" }
    ];

    for (const notificacion of notificaciones) {
      if (notificacion.rol) {
        await this.registrarNotificacionService.registerNotificationWithUrlAsync(notificacion.mensaje, notificacion.rol, notificacion.url);
      } else {
        await this.registrarNotificacionService.registerNotificationOnlyRolIdWithUrlAsync(notificacion.mensaje, notificacion.rolId, notificacion.url);
      }
    }
  }


  public onFileSelected(File: string | any[], type: string): void {
    if (File[0]) {

      if (File[0].size <= 104857600) {
        this.FileArchivo = File[0];
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
          //this.addImageBlobRepositorios(_fileUpload);
          this.pathImage = sinEspa;
          this.contenidoRespuesta = sinEspa;
          this.productForm.controls['pathImage'].setValue(this.contenidoRespuesta);
        } else if (type == "file") {
          //this.addFileBlobRepositorios(_fileUpload);
          this.pathImage = sinEspa;
          this.contenidoRespuesta = sinEspa;
          this.productForm.controls['pathFile'].setValue(this.contenidoRespuesta);
        }
      } else {
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
        this.errorMessage = err;
        this.showError = false;
        this.messageservice.showWarning(
          'El archivo supera el peso permitido (2Gb)',
          'top right'
        );
      }
    );
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosExtendService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {

      },
      (err) => {

        this.errorMessage = err;
        this.showError = false;
        this.messageservice.showWarning(
          'El archivo supera el peso permitido (2Gb)',
          'top right'
        );
      }
    );
  }

  goToBack() {
    this.router.navigate(['/RegistroProducto'])
  }

  async submitForm() {
    //this.productForm.controls['pathFile'].setValue('TCAC2018.pdf');
    //this.productForm.controls['pathImage'].setValue('1.Criterios.pdf');
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
    this.objectFormProductoTemp.nombre = this.productForm.get('NombreProducto')?.value;
    this.objectFormProductoTemp.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos')?.value;
    this.objectFormProductoTemp.iD_TiposUnidad = this.productForm.get('TipoUnidad')?.value[0];
    this.objectFormProductoTemp.baseFruta = this.productForm.get('fruitQuestion')?.value[0] ? this.productForm.get('fruitQuestion')?.value[0] : false;
    this.objectFormProductoTemp.numeroRegistroInvima = this.productForm.get('NumeroRegistroInvima')?.value;
    this.objectFormProductoTemp.pathlmagenProducto = this.productForm.get('pathImage')?.value;
    this.objectFormProductoTemp.iD_ETC = this.idETC;
    this.objectFormProductoTemp.iD_TiposAlimentos = 2;
    this.objectFormProductoTemp.iD_RegistroINVIMA = 3; // TODO: Change to number
    this.objectFormProductoTemp.iD_EstadoRegistro = 7; // TODO: ?
    this.objectFormProductoTemp.pathlmagenRegistroSanitario = "empty";
    this.objectFormProductoTemp.pathImagenInformacionNutricional = "empty";
    this.objectFormProductoTemp.fechaRegistro = new Date();
    if (this.objectFormProductoTemp.iD_TiposUnidad == undefined) {
      this.objectFormProductoTemp.iD_TiposUnidad = null;
    }
    await this.addProducto(this.objectFormProductoTemp);
  }

  onChangeEquivalencia(inputName: string, i: number) {
    if (inputName == "pesoBruto") {
      this.productForm.get('aportesNutricionales').get(i.toString()).get('porcentaje').setValue((this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoNeto')?.value * 100) / this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoBruto')?.value)
    } else if (inputName == "porcentaje") {
      this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoBruto').setValue((this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoNeto')?.value * 100) / this.productForm.get('aportesNutricionales').get(i.toString()).get('porcentaje')?.value)
    }
  }
}
