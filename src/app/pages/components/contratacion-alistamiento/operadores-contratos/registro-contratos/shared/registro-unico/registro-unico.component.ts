import { Component, EventEmitter, Input, OnInit, Output,OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { ValidateMayorCero } from 'src/app/static/formGroupValidator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-unico',
  templateUrl: './registro-unico.component.html',
  styleUrls: ['./registro-unico.component.scss']
})
export class RegistroUnicoComponent implements OnInit,OnDestroy {

  @Input() data: any;
  @Output() onSubmitEvent = new EventEmitter<any>();
  myForm: FormGroup;
  listRequeried = [
    {name: 'numeroContrato', inValid: false},
    {name: 'iD_Operador', inValid: false},
    {name: 'objetoContrato', inValid: false},
    {name: 'subTipoContratoId', inValid: false},
    {name: 'iD_TipoContratoCHIP', inValid: false},
    {name: 'iD_TipoConceptoGasto', inValid: false}
  ];
  listOperadores = [];
  listContratoChip = [];
  listConceptoGasto = [];
  public digitoVerificacion = '';
  private subs = new Subscription() 

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
    
    this.myForm = this._formBuilder.group({
      numeroContrato: [this.data.numeroContrato, Validators.required],
      iD_Operador: [this.data.iD_Operador, [Validators.required, this.forbiddenNUmberValidator(/\d{9}/i)]],
      objetoContrato: [this.data.objetoContrato, [Validators.required]],
      subTipoContratoId: [this.data.subTipoContratoId, [Validators.required, ValidateMayorCero()]],
      iD_TipoContratoCHIP: [this.data.iD_TipoContratoCHIP, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
      iD_TipoConceptoGasto: [this.data.iD_TipoConceptoGasto, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
      dv: [this.data.digitoVerificacion , [Validators.required]],

    }
    );


  }
   //
  get_Operadores() {
    this._contratosApiService.Get_AllOperadores().subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }
        this.listOperadores = response.result;
        //this.myForm.get('dv').setValue(this.actualizarDigitoVerificacion(this.data.iD_Operador));

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
    if(this.myForm.get(name).invalid && (this.myForm.get(name).touched || this.myForm.get(name).dirty))
      return false;

    if(this.myForm.get(name).invalid){
      for(let i = 0; i < this.listRequeried.length; i++){
        if(this.listRequeried[i].name == name && this.listRequeried[i].inValid)
          return false;
      }
    }
    if(name == 'subTipoContratoId'){
      console.log(this.listRequeried, this.myForm.get(name))
    }
    return true;
  }

  actualizarOperador(idOperador: any) {
    this.data.iD_Operador = idOperador;
  }

  actualizarDigitoVerificacion(idOperador: number) {
    this.data.dv = this.listOperadores.find(operador => operador.id == idOperador).dv ?? 0;
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

    this.data.numeroContrato = this.myForm.get('numeroContrato').value;
    this.data.iD_Operador = this.myForm.get('iD_Operador').value;
    this.data.objetoContrato = this.myForm.get('objetoContrato').value;
    this.data.subTipoContratoId = this.myForm.get('subTipoContratoId').value;
    this.data.iD_TipoContratoCHIP = this.myForm.get('iD_TipoContratoCHIP').value;
    this.data.iD_TipoConceptoGasto = this.myForm.get('iD_TipoConceptoGasto').value;
    this.data.dv = this.myForm.get('dv').value;

    this.onSubmitEvent.emit('CONTRATO');
  }

}
