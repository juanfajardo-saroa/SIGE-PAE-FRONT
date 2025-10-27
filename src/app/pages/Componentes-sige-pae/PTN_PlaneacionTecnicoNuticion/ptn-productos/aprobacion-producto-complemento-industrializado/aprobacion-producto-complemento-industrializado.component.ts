import { Component, OnInit } from '@angular/core';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { TiposUnidadModel } from 'src/app/shared/model/TiposUnidad';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { TiposUnidadService } from 'src/app/shared/services/TiposUnidad.services';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroINVIMAService } from 'src/app/shared/services/RegistroINVIMA.services';
import { ActivatedRoute, Router } from '@angular/router';
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
import * as saveAs from 'file-saver';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { PA_GetGrupobySubgrupoService } from 'src/app/shared/services/PA_GetGrupobySubgrupo.services';
import { VariedadesProductoModel } from 'src/app/shared/model/VariedadesProducto';
import { PA_VariedadesProductoGetAllWithRelationService } from 'src/app/shared/services/PA_VariedadesProductoGetAllWithRelation.services';
import { PA_NutrientesProductoGetAllWithRelationService } from 'src/app/shared/services/PA_NutrientesProductoGetAllWithRelatio.services';
import { PA_AporteProductoGetAllWithRelationService } from 'src/app/shared/services/PA_AporteProductoGetAllWithRelation.services';

@Component({
  selector: 'app-aprobacion-producto-complemento-industrializado',
  templateUrl: './aprobacion-producto-complemento-industrializado.component.html',
  styleUrls: ['./aprobacion-producto-complemento-industrializado.component.scss']
})
export class AprobacionProductoComplementoIndustrializadoComponent implements OnInit {
  isEdit: boolean;
  allowEdit: boolean;
  action: number;
  productId: number;
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
  productoTemp = <ProductosModel>{};
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
    { id: 1, nombre: 'Peso bruto (g):', formName: 'pesoBruto', required: true },
    { id: 2, nombre: 'Porcentaje comestible (%):', formName: 'porcentaje', required: true }
  ]
  energia: any[] = [
    { id: 1, nombre: 'Energía (kcl)', formName: 'energia', required: true },
  ]
  macronutrientes: any[] = [
    { id: 1, nombre: 'Proteínas (g)', formName: 'proteinas', required: true, decimal: true },
    { id: 2, nombre: 'Carbohidratos totales (g)', formName: 'carbohidratos', required: true, decimal: true },
    { id: 3, nombre: 'Azúcares libres (g)', formName: 'azucaresLibres', required: true, decimal: false },
    { id: 4, nombre: 'Grasas totales (g)', formName: 'grasasTotales', required: true, decimal: false },
    { id: 5, nombre: 'Grasas trans (g)', formName: 'grasasTrans', required: true, decimal: false },
    { id: 6, nombre: 'Grasas saturadas (g)', formName: 'grasasSaturadas', required: true, decimal: true },
  ]
  micronutrientes: any[] = [
    { id: 1, nombre: 'Calcio (mg)', formName: 'calcio', required: true, decimal: false },
    { id: 2, nombre: 'Hierro (mg)', formName: 'hierro', required: true, decimal: true },
    { id: 3, nombre: 'Sodio (mg)', formName: 'sodio', required: true, decimal: false },
    { id: 4, nombre: 'Vitamina A (ER) (opcional)', formName: 'vitamina', required: false, decimal: false },
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
  nivelList: any[] = [];
  FileArchivo: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registroInvimaService: RegistroINVIMAService,
    private grupoAlimentosService: GrupoAlimentosService,
    private variedadesService: VariedadesProductoService,
    private tiposUnidadService: TiposUnidadService,
    private RepositoriosExtendService: RepositoriosExtendService,
    private aporteProductoService: AporteProductoService,
    private nutrientesProductoSevice: NutrientesProductoService,
    private nivelEducativoService: NivelEducativoService,
    private route: ActivatedRoute,
    private RepositoriosService: RepositoriosExtendService,
    private productosService: ProductosService,
    private seguridadService: SeguridadService,
    private PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private PA_GrupobySubGrupoService: PA_GetGrupobySubgrupoService,
    private _PA_VariedadesProductoGetAllWithRelationService: PA_VariedadesProductoGetAllWithRelationService,
    private _PA_NutrientesProductoGetAllWithRelationService: PA_NutrientesProductoGetAllWithRelationService,
    private _PA_AporteProductoGetAllWithRelationService: PA_AporteProductoGetAllWithRelationService,
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
    this.fillProduct();
    this.addVariedad();
  }

  get aportesNutricionales() {
    return (this.productForm.get('aportesNutricionales') as FormArray);
  }

  fillProduct() {
    this.productosService.getProductosListRelationFilteById(this.productId).subscribe(
      (response: any) => {
        this.productoTemp = response[0];
        this.productForm.get('NombreProducto').setValue(this.productoTemp.nombre);
        this.productForm.get('SubgrupoAlimentos').setValue(this.productoTemp.iD_SubGrupoAlimentos);
        this.productForm.get('NumeroRegistroInvima').setValue(this.productoTemp.numeroRegistroInvima);
        this.productForm.get('pathImage').setValue(this.productoTemp.pathlmagenProducto);
        this.unidadMedidaProductoList = this.unidadMedidaProductoList.filter(element => element.id == this.productoTemp.iD_TiposUnidad);
        //this.productForm.get('peso').setValue(this.productoTemp.pesoBruto);
        //this.productForm.get('porcentaje').setValue(this.productoTemp.porcentajeComestible);
        this._PA_AporteProductoGetAllWithRelationService.getPA_AporteProductoGetAllWithRelationList(this.productoTemp.id).subscribe((res: any) => {
          res.forEach(element => {
            var indexTemp = this.nivelList.find(nivel => nivel.id == element.iD_TipoNivelEducativo).index;
            this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('pesoNeto').setValue(element.pesoNeto);
            this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('pesoBruto').setValue(element.pesoBruto);
            this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('porcentaje').setValue(element.porcentajeComestible);
            this._PA_NutrientesProductoGetAllWithRelationService.getPA_NutrientesProductoGetAllWithRelationList(element.id).subscribe((res: any) => {
              res.forEach(item => {
                this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get(this.nutrientes.find(nutriente => nutriente.id == item.iD_Nutriente).formName).setValue(item.aporte);
              });
            })
          });
        })
        this._PA_VariedadesProductoGetAllWithRelationService.getPA_VariedadesProductoGetAllWithRelationList(this.productoTemp.id).subscribe((respo: any) => {
          respo.forEach((item, index) => {
            if (index == 0) {
              this.productForm.get('variedades').get(index.toString()).get('variedad').setValue(item.nombreVariedad);
            } else {
              this.addVariedad();
              this.productForm.get('variedades').get(index.toString()).get('variedad').setValue(item.nombreVariedad);
            }
          });
        });
        /* this.PA_GrupobySubGrupoService.getPA_GetGrupobySubgrupoList(this.productoTemp.iD_SubGrupoAlimentos).subscribe(async (res: any) => {
          console.log('respuesta',res[0].grupoAlimentos);
          
          this.productForm.get('GrupoAlimentos').setValue(Number(res[0].grupoAlimentos));
          await this.onGrupoClick(Number(res[0].grupoAlimentos));
        }) */

        this.PA_GrupobySubGrupoService.getPA_GetGrupobySubgrupoList(this.productoTemp.iD_SubGrupoAlimentos).subscribe(async (res: any) => {
          let grupos = res[0].grupoAlimentos.includes(',')
            ? res[0].grupoAlimentos.split(',').map(Number)  // Si hay una coma, lo divide en un array de números
            : [Number(res[0].grupoAlimentos)];
          // Filtra los valores que están presentes en grupoAlimentosList
          const gruposValidos = grupos.filter(grupo =>
            this.grupoAlimentosList.some(item => item.id === grupo)
          );

          if (gruposValidos.length > 0) {
            // Puedes seleccionar el primer valor válido, o manejar múltiples selecciones si es necesario
            const primerGrupo = gruposValidos[0];
            this.productForm.get('GrupoAlimentos').setValue(primerGrupo);
            await this.onGrupoClick(primerGrupo);
          } else {
            console.warn('Ninguno de los valores del grupo se encontró en grupoAlimentosList');
          }
        });


      },
      (err) => {
      }
    );
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
    const reg = /^-?\d*(\.\d{0,2})?$/;
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
    formName = formName.replace('(', '');
    formName = formName.replace(')', '');
    formName = formName.replace('á', 'a');
    formName = formName.replace('é', 'e');
    formName = formName.replace('í', 'i');
    formName = formName.replace('ó', 'o');
    formName = formName.replace('ú', 'u');
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

  getStateColor2(id: number): string {
    switch (id) {
      case 1:
        return "yellowCircle";
        break;
      case 2:
        return "redCircle";
        break;
      default:
        return "yellowCircle";
        break;
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

  addProducto(productoObject: ProductosModel): void {
    this.productosService.addProductos(productoObject).subscribe(
      (response) => {
        this.nivelList.forEach(nivel => {
          this.aporteProductoTemp = <AporteProductoModel>{};
          this.aporteProductoTemp.iD_Producto = response.id;
          this.aporteProductoTemp.iD_TipoNivelEducativo = nivel.id;
          this.aporteProductoTemp.pesoNeto = this.productForm.value.aportesNutricionales[nivel.index].pesoNeto;
          this.aporteProductoTemp.pesoBruto = this.productForm.value.aportesNutricionales[nivel.index].pesoBruto;
          this.aporteProductoTemp.porcentajeComestible = this.productForm.value.aportesNutricionales[nivel.index].porcentaje;
          this.aporteProductoService.addAporteProducto(this.aporteProductoTemp).subscribe(
            (res) => {
              this.nutrientes.forEach(element => {
                this.nutrienteProductoTemp = <NutrientesProductoModel>{};
                this.nutrienteProductoTemp.iD_AporteProducto = res.id;
                this.nutrienteProductoTemp.iD_Nutriente = element.id;
                this.nutrienteProductoTemp.aporte = this.productForm.value.aportesNutricionales[nivel.index][element.formName];
                this.nutrientesProductoSevice.addNutrientesProducto(this.nutrienteProductoTemp).subscribe(
                  (resp) => {
                  },
                  (err) => {
                  }
                );
              });
            },
            (err) => {
            }
          );
        })
      },
      (err) => {
      }
    );
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
        let sinEspa = this.productId+'Pro'+ nombre;
        let _fileUpload: fileUploadModel;
        _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerDS };
        if (type == "image") {
          this.pathImage = sinEspa;
          this.contenidoRespuesta = sinEspa;
          this.productForm.controls['pathImage'].setValue(this.contenidoRespuesta);
          this.addImageBlobRepositorios(_fileUpload);
        } else if (type == "file") {
          this.pathImage = sinEspa
          this.contenidoRespuesta = sinEspa
          this.productForm.controls['pathFile'].setValue(this.contenidoRespuesta);
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

  goToBack() {
    this.router.navigate(['/PTNProductos'])
  }

  submitForm() {
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

  saveForm() {
    this.objectFormProductoTemp.nombre = this.productForm.get('NombreProducto')?.value;
    this.objectFormProductoTemp.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos')?.value;
    this.objectFormProductoTemp.iD_TiposUnidad = this.productForm.get('TipoUnidad')?.value[0];
    this.objectFormProductoTemp.baseFruta = this.productForm.get('fruitQuestion')?.value[0] ? this.productForm.get('fruitQuestion')?.value[0] : false;
    this.objectFormProductoTemp.numeroRegistroInvima = this.productForm.get('NumeroRegistroInvima')?.value; //ID
    this.objectFormProductoTemp.pathlmagenProducto = this.productForm.get('pathImage')?.value;
    this.objectFormProductoTemp.iD_ETC = this.idETC;
    this.objectFormProductoTemp.iD_TiposAlimentos = 2;
    this.objectFormProductoTemp.iD_RegistroINVIMA = 3; // TODO: Change to number
    this.objectFormProductoTemp.iD_EstadoRegistro = 1; // TODO: ?
    this.objectFormProductoTemp.pathlmagenRegistroSanitario = "222"; //?
    this.objectFormProductoTemp.pathImagenInformacionNutricional = "222"; //?
    this.addProducto(this.objectFormProductoTemp);
    //this.router.navigate(['/PTNProductos'])
  }

  onChangeEquivalencia(inputName: string, i: number) {
    if (inputName == "pesoBruto") {
      this.productForm.get('aportesNutricionales').get(i.toString()).get('porcentaje').setValue(this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoNeto')?.value / this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoBruto')?.value)
    } else if (inputName == "porcentaje") {
      this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoBruto').setValue(this.productForm.get('aportesNutricionales').get(i.toString()).get('pesoNeto')?.value / this.productForm.get('aportesNutricionales').get(i.toString()).get('porcentaje')?.value)
    }
  }

  downloadImage(): void {
    let _fileUpload: fileUploadModel;
    let nombre = this.productForm.value.pathImage;
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
    this.isEdit = true;
    let arrayTempUnidad: number[] = [];
    arrayTempUnidad.push(this.productoTemp.iD_TiposUnidad);
    this.productForm.get('TipoUnidad').setValue(arrayTempUnidad);
    this.unidadMedidaProductoList = [
      { id: 1, descripcion: 'Gramos (g)' },
      { id: 2, descripcion: 'Mililitros (ml)' }
    ];
  }

  saveChanges() {
    this.isEdit = false;
    this.productoTemp = <ProductosModel>{};;
    this.productoTemp.id = this.productId
    this.productoTemp.nombre = this.productForm.get('NombreProducto').value;
    this.productoTemp.iD_SubGrupoAlimentos = this.productForm.get('SubgrupoAlimentos').value;
    this.productoTemp.numeroRegistroInvima = this.productForm.get('NumeroRegistroInvima').value;
    this.productoTemp.pathlmagenProducto = this.productForm.get('pathImage').value;
    this.productoTemp.iD_TiposUnidad = this.productForm.get('TipoUnidad').value[0];
    this.productForm.get('TipoUnidad').setValue(0);
    this.productoTemp.pathlmagenRegistroSanitario = "empty";
    this.productoTemp.pathImagenInformacionNutricional = "empty";
    this.productoTemp.iD_EstadoRegistro = 7;
    this.productoTemp.iD_ETC = this.idETC;
    this.productoTemp.iD_TiposAlimentos = 2;
    this.productoTemp.fechaRegistro = new Date();
    this.productosService.updateProductos(this.productoTemp).subscribe((response: any) => {
      this._PA_AporteProductoGetAllWithRelationService.getPA_AporteProductoGetAllWithRelationList(this.productId).subscribe((res: any) => {
        res.forEach(element => {
          var indexTemp = this.nivelList.find(nivel => nivel.id == element.iD_TipoNivelEducativo).index;
          element.filtro = "filtro"
          element.pesoNeto = this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('pesoNeto').value;
          element.pesoBruto = this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('pesoBruto').value;
          element.porcentajeComestible = this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get('porcentaje').value;
          this.aporteProductoService.updateAporteProducto(element).subscribe((respu: any) => {
            this._PA_NutrientesProductoGetAllWithRelationService.getPA_NutrientesProductoGetAllWithRelationList(element.id).subscribe((res: any) => {
              res.forEach(item => {
                item.aporte = this.productForm.get('aportesNutricionales').get(indexTemp.toString()).get(this.nutrientes.find(nutriente => nutriente.id == item.iD_Nutriente).formName).value;
                this.nutrientesProductoSevice.updateNutrientesProducto(item).subscribe((respues: any) => {
                  if (res[res.length - 1] == item) {
                    this.fillProduct();
                  }
                });
              });
            })
          });
        });
      })
      this.variedadesService.getVariedadesProductoListRelationFilter(this.productId).subscribe((respo: any) => {
        respo.forEach((item) => {
          this.variedadesService.deleteVariedadesProducto(item.id).subscribe((resp: any) => {
            if (item == respo[respo.length - 1]) {
              this.productForm.value.variedades.forEach(item => {
                var variedadProductoTemp = <VariedadesProductoModel>{};
                variedadProductoTemp.iD_Producto = this.productId;
                variedadProductoTemp.nombreVariedad = item.variedad;
                this.variedadesService.addVariedadesProducto(variedadProductoTemp).subscribe((res: any) => {

                })
              });
            }
          })
        });
      });
    });
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
