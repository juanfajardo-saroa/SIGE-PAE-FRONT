import { Component, OnInit  ,OnDestroy} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/shared/model/core/constante.model';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule, Routes } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minuta-patron-maem',
  templateUrl: './minuta-patron-maem.component.html'
})
export class MinutaPatronMaemComponent implements OnInit  ,OnDestroy{

  menusigepae = localStorage.getItem('MenuSigepae');
  menuuapa = localStorage.getItem('MenuSigenaUapa');
  loadingVisible = false;
  composicionVisible = false;
  iD_MinutaPatronAlimento = 0;
  VerMinuta = false;
  VerMinutaUAPA = false;
  editaMinuta = false;
  editaMinutaUAPA = false;
  eliminaMinuta = false;
  autorizacionLeve = false;
  cambioNivelEducativoSubject: Subject<boolean> = new Subject<boolean>();
  cambioNivelEducativo: Observable<boolean> = this.cambioNivelEducativoSubject.asObservable();
  datosPestanas = [
    {
      id: 1,
      descripcion: 'Complemento AM/PM PS o CCT',
      tipoRacion: 'Minuta Complemento AM/PM',
      tipoComplementoId: 2,
      modalidad: 'Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      modalidadComplementoId: 1,
      active: false
    },
    {
      id: 2,
      descripcion: 'Complemento Almuerzo PS o CCT',
      tipoRacion: 'Minuta Complemento Almuerzo',
      tipoComplementoId: 1,
      modalidad: 'Preparado en Sitio (PS) o Comida Caliente Transportada (CCT)',
      modalidadComplementoId: 1,
      active: false
    },
    {
      id: 3,
      descripcion: 'Complemento AM/PM IND',
      tipoRacion: 'Minuta Complemento AM/PM',
      tipoComplementoId: 2,
      modalidad: 'Industrializado',
      modalidadComplementoId: 2,
      active: false
    }
  ];

  aportes = [
    { title: 'Aporte estimado:', description: 'Corresponde al aporte promedio diario de la minuta patrón.' },
    { title: 'Recomendación diaria:', description: 'Corresponde a los valores de calorías, macro y micronutrientes que necesita un niño, niña o adolescente (NNA) diariamente, según las recomendaciones de ingesta de energia y nutrientes (RIEN) que establece a nivel nacional el Ministerio de Salud y Protección Social.' },
    { title: 'Regla de adecuación:', description: 'Corresponde al porcentaje de adecuación mínimo o máximo establecido por la UApA.' }
  ];

  messageAlert = 'La ETC no está autorizada para utilizar la minuta patrón de nivel de actividad física leve. Puede pedir la autorización';

  formFiltro: FormGroup;
  iD_TipoModeloOperacion = 1;
  iD_TipoMinutaPatron = 1;

  iD_TipoMinuta = 1;
  dataMinuta: any;
  minutaVisible = false;
  listNivelEducativos: any;
  itemNivelEducativos: any = {};
  listTiposActividadFisica: any;
  itemActividadFisica: any = {};

  itemsDisabled = true;

  private idETC: number = Number(localStorage.getItem('IdUbicacion') ?? '0');
  private subs = new Subscription() 
  private idTipoModeloOperacion: number = 1; //Constante MAEM
  private idTipoActividadFisica: number = 1; //Constante Actividad Fisica Leve
  public paso: number = 0;

  public newMinutaMaemLeve: any = {
    id: 0,
    iD_ETC: this.idETC,
    iD_TipoModeloOperacion: this.idTipoModeloOperacion,
    iD_TipoEstadoMinuta: 0,
    tipoActividadFisicaId: this.idTipoActividadFisica,
    justificacion: "",
    adjuntoJustificacion: "",
    adjuntoJustificacionPATH: "",
    rechazado: false,
    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
    fechaSolicitud: this._datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss')
  }

  
  itemComponente: any;
  dataSourceComponentes = [];
  dataSourceAlimentoProteico = [];
  dataSourceAlimentoLecheInd = [];
  dataMacroNutrientes = [];
  dataMicroNutrientes = [];

  bgColorChapterRed: boolean = false;
  bgColorChapterBlue: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _minutasApiService: MinutasApiService,
    private _seguridadService: SeguridadService,
    private _messageService: MessageService,
    private _datePipe: DatePipe,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.get_NivelEducativo();
    this.get_TiposActividadFisica();
    this.initFormFiltro();
    this.seleccionarTab(this.datosPestanas[0]);
    if(this.menusigepae=="true") {
        this.editaMinuta = this._seguridadService.getModulePermission(40, 'editar');
        this.bgColorChapterRed = true;
        this.VerMinuta = this._seguridadService.getModulePermission(40, 'ver');
    }
    // valida desde donde se llama
    if(this.menuuapa=="true") {
      this.bgColorChapterBlue = true;
      this.editaMinuta =this._seguridadService.getModulePermission(110, 'editar');
      this.VerMinuta =this._seguridadService.getModulePermission(110, 'ver');
      this.autorizacionLeve = true
    }
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }




  itemComponenteMod(data) {
    this.itemComponente = data;
  }
  dataSourceComponentesMod(data) {
    this.dataSourceComponentes = data;
  }

  dataSourceAlimentoProteicoMod(data) {
    this.dataSourceAlimentoProteico = data;
  }

  dataSourceAlimentoLecheIndMod(data) {
    this.dataSourceAlimentoLecheInd = data;
  }

  dataMacroNutrientesMod(data) {
    this.dataMacroNutrientes = data;
  }
  dataMicroNutrientesMod(data) {
    this.dataMicroNutrientes = data;
  }

  forbiddenNumberValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    }
  }

  initFormFiltro() {
    this.formFiltro = this._formBuilder.group({
      tipoNivelEducativoId: [0, [Validators.required, this.forbiddenNumberValidator(/0/i)]],
      tipoActividadFisicaId: [2, [Validators.required, this.forbiddenNumberValidator(/0/i)]]
    });
  }


  ValidaMinutaLeve()
  {
    if(this.newMinutaMaemLeve.iD_ETC != 0){
      this._minutasApiService.get_AlimentosMenuMinutaPatronAlimentosLeve(this.idETC, this.idTipoModeloOperacion, this.idTipoActividadFisica)
      .subscribe(response =>{
        response.result = response.result.filter(obj => {
          return obj.iD_TipoEstadoMinuta != EstadoMinuta.rechazado
        });
        if(response.success && response.result.length != 0){
          this.newMinutaMaemLeve = response.result[0];
          this.paso = 3;
          //this.validarEstadoMinuta(this.newMinutaMaemLeve.iD_TipoEstadoMinuta);
          if (this.newMinutaMaemLeve.iD_TipoEstadoMinuta == EstadoMinuta.aprobado)
          {
            this.autorizacionLeve = true;
          }
        }
        else{
          this.paso = 1;
        }
      });
    }
    else {
      this._messageService.showError("ERROR: Debe seleccionar una ETC para realizar uso de este modulo.", "top center");
      this.paso = 0;
    }
    this.loadingVisible = false;
  }

  minutasleves()
  {
    this.router.navigate(['/minuta-excepcional'])
  }

  changeModel(item: any, name: string, value: any) {
    
    item[name] = value;
    if (name == 'tipoActividadFisicaId' && this.menuuapa!="true") {
      this.idTipoActividadFisica = value;
        this.ValidaMinutaLeve();
      }
  }


  get_NivelEducativo() {
    this.loadingVisible = true;
    this._minutasApiService.get_NivelEducativos().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de nivel educativo: ' + response.error, 'top center', 5000);
          return;
        }

        this.listNivelEducativos = response.result;
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de nivel educativo: ' + error, 'top center', 5000);
      }
    });
  }

  get_TiposActividadFisica() {
    this.loadingVisible = true;
    this._minutasApiService.get_TiposActividadFisica().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de tipos actividad fisica: ' + response.error, 'top center', 5000);
          return;
        }

        this.listTiposActividadFisica = response.result;

        if (this.listTiposActividadFisica.length == 1) {
          this.itemActividadFisica = {
            id: this.listTiposActividadFisica[0].id,
            nombre: this.listTiposActividadFisica[0].nombre,
          }
        }
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de tipos actividad fisica: ' + error, 'top center', 5000);
      }
    });
  }

  seleccionarTab(item: any) {
    this.datosPestanas = this.datosPestanas.map(modeloOperacion => {
      modeloOperacion.active = modeloOperacion.id == item.id ? true : false;
      return modeloOperacion;
    });

    this.minutaVisible = false;
    this.itemsDisabled = true;

    this.dataMinuta = { ...item };
    this.formFiltro.get('tipoNivelEducativoId').setValue(0);
    this.formFiltro.get('tipoActividadFisicaId').setValue(2);
  }

  clickTabNivelEducativo(item: any, bool: boolean) {

  }

  editarMinuta() {
    this.itemsDisabled = false;
  }

  eliminarMinuta(): void {
    let minutaPatronBorrar = {
      iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
      iD_TiposModalidadComplemento: this.dataMinuta.modalidadComplementoId,
      iD_TiposRacion: this.dataMinuta.tipoComplementoId,
      iD_NivelActividadFisica: this.formFiltro.get('tipoActividadFisicaId').value
    };
    // TODO: llamar servicio Eliminar Minuta Patrón y enviar objeto minutaPatronBorrar
  }

  busquedaMinutas(item: any, ocultar: boolean) {
    if (item) {
      this.cambioNivelEducativoSubject.next(true);
      this.formFiltro.get('tipoNivelEducativoId').setValue(item.id);
    }
    if (ocultar) {
      this.minutaVisible = false;
    }
    this.dataMinuta.tipoNivelEducativoId = this.formFiltro.get('tipoNivelEducativoId').value;
    this.filtrarMinutas();
  }

  filtrarMinutas() {
    if (this.formFiltro.get('tipoNivelEducativoId').invalid) {
      this._messageService.showWarning('Seleccione Tipo Nivel Educativo', 'top center', 5000);
      return;
    }

    if (this.formFiltro.get('tipoActividadFisicaId').invalid) {
      this._messageService.showWarning('Seleccione Tipo Actividad Fisica', 'top center', 5000);
      return;
    }

    const param = {
      iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
      iD_TipoMinutaPatron: this.iD_TipoMinutaPatron,
      modalidadComplementoId: this.dataMinuta.modalidadComplementoId,
      tipoComplementoId: this.dataMinuta.tipoComplementoId,
      tipoNivelEducativoId: this.formFiltro.get('tipoNivelEducativoId').value,
      tipoActividadFisicaId: this.formFiltro.get('tipoActividadFisicaId').value,
      id_Vigencia: User.iD_Vigencia,
      auditoria: LocalStorage.getAuditoria('')
    };

    this.get_IdMinutaPatronAlimento(param);
  }

  get_IdMinutaPatronAlimento(param: any) {
    this.loadingVisible = true;
    this.composicionVisible = false;
    this._minutasApiService.get_IdMinutaPatronAlimento(param).subscribe({
      next: response => {
        this.loadingVisible = false;
        this.iD_MinutaPatronAlimento = response.result;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        this.minutaVisible = true;
        this.composicionVisible = true;
        this.changeDescripcionFiltros();
      },
      error: error => {
        this.loadingVisible = false;
        this.iD_MinutaPatronAlimento = 0;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  changeDescripcionFiltros() {
    for (let i = 0; i < this.listNivelEducativos.length; i++) {
      if (this.listNivelEducativos[i].id == this.formFiltro.get('tipoNivelEducativoId').value) {
        this.itemNivelEducativos = {
          id: this.listNivelEducativos[i].id,
          nombre: this.listNivelEducativos[i].nombre
        };

        break;
      }
    }

    for (let i = 0; i < this.listTiposActividadFisica.length; i++) {
      if (this.listTiposActividadFisica[i].id == this.formFiltro.get('tipoActividadFisicaId').value) {
        this.itemActividadFisica = {
          id: this.listTiposActividadFisica[i].id,
          nombre: this.listTiposActividadFisica[i].nombre
        };

        break;
      }
    }
  }


  cancelarEdicionMod(esEdicionCambioEducativo: boolean) {
    this.filtrarMinutas();
    if(!esEdicionCambioEducativo) {
      this.itemsDisabled = true;
    }
    this.cambioNivelEducativoSubject.next(false);
    
  }

  terminarEdicion(event){
    this.filtrarMinutas();
  }

  

}

enum EstadoMinuta {
  creado = 1,
  porAprobarSinObs = 4,
  aprobado = 6,
  rechazado = 7
}
