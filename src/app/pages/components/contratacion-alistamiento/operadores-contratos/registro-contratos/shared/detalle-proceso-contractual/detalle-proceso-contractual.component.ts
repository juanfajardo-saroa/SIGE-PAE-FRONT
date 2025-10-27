import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { Subscription } from 'rxjs';

const PROVEER_OPERACION_LOGISTICA: number = 5;
const PROVEER_MATERIA_PRIMA: number = 4;
@Component({
  selector: 'app-detalle-proceso-contractual',
  templateUrl: './detalle-proceso-contractual.component.html',
  styleUrls: ['./detalle-proceso-contractual.component.scss']
})
export class DetalleProcesoContractualComponent implements OnInit,OnDestroy {

  @Input() headerText = '';
  @Input() data: any;
  @Input() tipoOperacion: any = '';
  @Output() finalizarEvent = new EventEmitter<any>();
  @Output() regresarEvent = new EventEmitter<any>();
  @Output() onSubmitEvent = new EventEmitter<any>();
  public LOGISTICA: number = PROVEER_OPERACION_LOGISTICA;
  public MATERIA_PRIMA: number = PROVEER_MATERIA_PRIMA;
  listModalidaContratacionChip = [];
  private subs = new Subscription() 
  listPlataforma = [
    {id: 1, nombre: 'SECOP I'},
    {id: 2, nombre: 'SECOP II'},
    {id: 3, nombre: 'TVEC'}
  ]

  listRequeried = [
    {name: 'iD_TipoContratacion', inValid: false},
    {name: 'publicadorSECOP', inValid: false},
    {name: 'iD_PlataformaContrato', inValid: false},
    {name: 'numeroProcesoRegistradoSECOP', inValid: false},
    {name: 'linkContratoSECOP', inValid: false},
    {name: 'fechaSuscripcion', inValid: false},
    {name: 'fechaAdjudicacion', inValid: false}
  ];

  myForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService,
    private _dp: DatePipe
  ) { }

  ngOnInit(): void {
    this.get_ModalidaContratacionChip();
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  initForm(){
    this.myForm = this._formBuilder.group({
      iD_TipoContratacion: [this.data.iD_TipoContratacion],
      publicadorSECOP: [this.data.publicadorSECOP],
      iD_PlataformaContrato: [this.data.iD_PlataformaContrato],
      numeroProcesoRegistradoSECOP: [this.data.numeroProcesoRegistradoSECOP],
      linkContratoSECOP: [this.data.linkContratoSECOP],
      fechaSuscripcion: [this._dp.transform(this.data.fechaSuscripcion, 'yyyy-MM-dd')],
      fechaAdjudicacion: [this._dp.transform(this.data.fechaAdjudicacion, 'yyyy-MM-dd')],
    });
  }

  get_ModalidaContratacionChip() {
    this._contratosApiService.GetModalidadContratacionChip().subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.listModalidaContratacionChip = response.result;
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    });
  }

  changeMyForm(name, value){
    this.myForm.get(name).setValue(value);
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
    
    return true;
  }


  setData(){
    this.data.iD_TipoContratacion = this.myForm.get('iD_TipoContratacion').value;
    this.data.publicadorSECOP = this.myForm.get('publicadorSECOP').value;
    this.data.iD_PlataformaContrato = this.myForm.get('iD_PlataformaContrato').value;
    this.data.numeroProcesoRegistradoSECOP = this.myForm.get('numeroProcesoRegistradoSECOP').value;
    this.data.linkContratoSECOP = this.myForm.get('linkContratoSECOP').value;
    this.data.fechaSuscripcion = this.myForm.get('fechaSuscripcion').value;
    this.data.fechaAdjudicacion = this.myForm.get('fechaAdjudicacion').value;
  }

  finalizar(){
    this.setData();
    this.onSubmitEvent.emit('PROCESO-CONTRACTUAL');
    this.finalizarEvent.emit('');
  }

  regresar(){
    this.regresarEvent.emit('');
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

    this.setData();

    this.onSubmitEvent.emit('PROCESO-CONTRACTUAL');
  }

}
