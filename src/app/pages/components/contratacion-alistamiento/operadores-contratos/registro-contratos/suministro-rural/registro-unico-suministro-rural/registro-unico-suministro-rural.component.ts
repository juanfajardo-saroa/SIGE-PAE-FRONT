import { Component, EventEmitter, Input, OnInit, Output ,OnDestroy} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { data } from 'jquery';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-registro-unico-suministro-rural',
  //providers: [ContratosApiService],
  templateUrl: './registro-unico-suministro-rural.component.html',
  styleUrls: ['./registro-unico-suministro-rural.component.scss']
})
export class RegistroUnicoSuministroRuralComponent implements OnInit,OnDestroy {

  @Input() data!: any;
  @Output() onSubmitEvent = new EventEmitter<any>();
  public idOperador: number = 0;
  public digitoVerificacion: any = '';
  private subs = new Subscription() 
  loadingVisible = false;
  myForm = this._formBuilder.group({
    numeroContrato: [null],
    iD_Operador: [null],
    objetoContrato: [null],
    iD_TipoContratoCHIP: [null],
    iD_TipoConceptoGasto: [null],
  });
  listRequeried = [
    {name: 'numeroContrato', inValid: false},
    {name: 'iD_Operador', inValid: false},
    {name: 'objetoContrato', inValid: false},
    {name: 'iD_TipoContratoCHIP', inValid: false},
    {name: 'iD_TipoConceptoGasto', inValid: false}
  ];
  listOperadores = [];
  listContratoChip = [];
  listConceptoGasto = [];

  VALOR_CERO: number = 0;
  MODELOOPERACIONMAER: number = 2;
  itemContrato: any = {
    id: 0,
    iD_Vigencia: 1,
    iD_ETC: 0,
    iD_ET: 0,
    numeroContrato: 0,
    iD_Operador: 0,
    objetoContrato: '',
    tipoContratoId: 0,
    subTipoContratoId: 14,
    iD_TipoCategoriaContrato: 0,
    iD_TipoContratoCHIP: 0,
    iD_TipoConceptoGasto: 0,

    fechalnicioContrato_Format: null,
    fechaFinalContrato_Format: null,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    manejaPaec: false,
    iD_TipoModeloOperacion: [],
    valorTotalContrato: 0,
    noMeses: 0,
    noMesesPaec: 0,

    conAnticipo: false,
    archivoContrato: '',
    nombreArchivoContrato: '',

    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
  }

  public contratoModeloMAER: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModeloOperacion: 0,
    manejaPreciosporzona: false,
    manejaPreciosporNivelEducativo: false,
    estado: false,
    auditoria: LocalStorage.getAuditoria('')
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.get_Operadores();
    this.get_ContratoChip();
    this.get_ConceptosGasto();
    this.initForm();
    
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  forbiddenNUmberValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    }
  }

  initForm(){
    
    if(this.data){
      this.myForm = this._formBuilder.group({
        numeroContrato: [this.data.numeroContrato, Validators.required],
        iD_Operador: [this.data.iD_Operador, [Validators.required, this.forbiddenNUmberValidator(/\d{9}/i)]],
        objetoContrato: [this.data.objetoContrato, [Validators.required]],
        iD_TipoContratoCHIP: [this.data.iD_TipoContratoCHIP, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
        iD_TipoConceptoGasto: [this.data.iD_TipoConceptoGasto, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
        
      });
      this.actualizarIdOperador(this.data.iD_Operador);
      this.actualizarDigitoVerificacionPorIdOperador(this.data.iD_Operador);
    }
  }

  get_Operadores() {
    this._contratosApiService.Get_AllOperadores().subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.listOperadores = response.result;
        if(this.data.iD_Operador>0){
          this.actualizarDigitoVerificacionPorIdOperador(this.data.iD_Operador);
        }
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  get_ContratoChip() {
    this._contratosApiService.Get_AllContratoChip().subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.listContratoChip = response.result;
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  get_ConceptosGasto(){
    this._contratosApiService.get_ConceptosGasto().subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.listConceptoGasto = response.result;
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  getValid(name){
    if(name == "iD_Operador" && this.myForm.get(name).value == 0){
      this.myForm.controls[name].setErrors({'incorrect': true});
    }
    if(this.myForm.get(name).invalid && (this.myForm.get(name).touched || this.myForm.get(name).dirty))
      return false;

    if(this.myForm.get(name).invalid){
      for(let i = 0; i < this.listRequeried.length; i++){
        if(this.listRequeried[i].name == name && this.listRequeried[i].inValid)
          return false;
      }
    }
    
    return true;
  }

  crearContrato(){
    let itemContrato = this.itemContrato;
    itemContrato.iD_TipoModeloOperacion = this.MODELOOPERACIONMAER;
    
    this.loadingVisible = true;
    this._contratosApiService.createContrato(itemContrato).subscribe(response => {
      this.loadingVisible = false;

      if(!response.success){
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
      
      if(response.result == 0) {
        this._messageService.showError('ERROR: El numero de contrato ya existe ' , 'top center');
        return;
      }
      this.itemContrato.id = response.result;
      this.contratoModeloMAER.id_Contrato = this.itemContrato.id;
      this._contratosApiService.agregarContratoModelo(this.contratoModeloMAER)
      .subscribe(response => {
        if (response.success) {
           this.contratoModeloMAER.id = response.result
        }
      });
      this.onSubmitEvent.emit({data: this.itemContrato, form: 'REGISTRO'});
    });
  }

  updateContrato(){
    this._contratosApiService.updateContrato(this.itemContrato).subscribe(response => {
      if(!response.success){
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }

      this.onSubmitEvent.emit({data: this.itemContrato, form: 'REGISTRO'});
    });
  }

  set_Data(){
    this.itemContrato = { ...this.data };
    this.itemContrato.iD_TipoModeloOperacion;
    this.itemContrato.numeroContrato = this.myForm.get('numeroContrato').value.toString();
    this.itemContrato.iD_Operador = this.myForm.get('iD_Operador').value;
    this.itemContrato.objetoContrato = this.myForm.get('objetoContrato').value;
    this.itemContrato.iD_TipoContratoCHIP = this.myForm.get('iD_TipoContratoCHIP').value;
    this.itemContrato.iD_TipoConceptoGasto = this.myForm.get('iD_TipoConceptoGasto').value;
    
  }

  onSubmit(){
    if(!this.myForm.valid){
      for(let i = 0; i < this.listRequeried.length; i++){
        if(this.myForm.controls[this.listRequeried[i].name].invalid){
          this.listRequeried[i].inValid = true;
        }
      }
      return;
    }

    this.set_Data();

    if(this.data.id == 0){
      this.crearContrato();
    } else{
      this.updateContrato();
    }
  }

  actualizarIdOperador(idOperador: number): void {
    this.idOperador = idOperador;
  }

  actualizarDigitoVerificacionPorIdOperador(idOperador: number) {
    this.digitoVerificacion = this.listOperadores.find(operador => operador.id == idOperador)?.dv ?? '';
  }

}
