import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output ,OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
@Component({
  selector: 'app-caracteristicas-financieras-suministro-rural',
  //providers: [ContratosApiService],
  templateUrl: './caracteristicas-financieras-suministro-rural.component.html'
})
export class CaracteristicasFinancierasSuministroRuralComponent implements OnInit,OnDestroy {

  @Input() dataContrato: any;
  @Output() finalizarEvent = new EventEmitter<any>();
  @Output() regresarEvent = new EventEmitter<any>();
  @Output() onSubmitEvent = new EventEmitter<any>();

  editarPreciosAcordados = false;
  public editRac: boolean = false;
  public editRacPrecio: boolean = false;
  private subs = new Subscription()
  public sumtotalcontratomaer: number=0;
  dataPreciosAcordados: any = [];
  dataJornadaCosto: any = [];
  public rubroAdd: boolean = false;
  public tieneRubros: boolean = false;
  public valTotalRubros: number = 0;
  public VALOR_CERO: number = 0;
  public loadingVisible: boolean = false;
  public valortotal: number =0;
  myForm = this._formBuilder.group({
    iD_EstadoContrato: [0],
    valorTotalContrato: [null]
  });

  
  public itemUtil: any = {
    col_CSS_Rac: 'col-md-10',
    seleccionTodo: false,
    seleccionTodoBen: false,
  }
  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  listRequeried = [
    {name: 'fechaInicio', inValid: false},
    {name: 'fechaTerminacion', inValid: false}
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService,
    private _dp: DatePipe
  ) { }

  ngOnInit(): void {
    debugger
    this.myForm.get('valorTotalContrato').setValue(this.dataContrato.valorTotalContrato) 
    this.get_ContratosCaracteristicasFinancierasMAER();
    this.get_SumRacionesPrecios()
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  get_ContratosCaracteristicasFinancierasMAER() {
    this.editarPreciosAcordados = false;
    
    this.itemUtil.col_CSS_Rac = 'col-md-10';
    this._contratosApiService.get_SumRacionesPreciosMAER(this.dataContrato.id, 2).subscribe({
      next: response => {
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.dataPreciosAcordados = response.result;
        this.myForm.get('iD_EstadoContrato').setValue(response.result[0].estadoDiligenciamiento);
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    })
  }

  get_SumRacionesPrecios() {
    debugger
    this.sumtotalcontratomaer =0;
    this._contratosApiService.get_SumContratoRacionesValorTotalMAER(this.dataContrato.id, 2,0)
        .subscribe(sumRacionesPrecios => {
          this.dataJornadaCosto = sumRacionesPrecios.result;
          sumRacionesPrecios.result.forEach(element => {
            this.sumtotalcontratomaer += element.costo;
          });
        }, error => {
          this._messageService.showError('ERROR: ' + error.error, 'top center');
        });
      }

  put_UpdateContratosCaracteristicasFinancierasMAER(){
    this._contratosApiService.put_UpdateContratosCaracteristicasFinancierasMAER(this.dataPreciosAcordados).subscribe({
      next: response => {
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.get_ContratosCaracteristicasFinancierasMAER();
        this.get_SumRacionesPrecios()
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    })
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
    this.dataContrato.iD_TipoContratacion = this.myForm.get('iD_TipoContratacion').value;
    this.dataContrato.publicadorSECOP = this.myForm.get('publicadorSECOP').value;
    this.dataContrato.iD_PlataformaContrato = this.myForm.get('iD_PlataformaContrato').value;
    this.dataContrato.numeroProcesoRegistradoSECOP = this.myForm.get('numeroProcesoRegistradoSECOP').value;
    this.dataContrato.linkContratoSECOP = this.myForm.get('linkContratoSECOP').value;
    this.dataContrato.fechaSuscripcion = this.myForm.get('fechaSuscripcion').value;
    this.dataContrato.fechaAdjudicacion = this.myForm.get('fechaAdjudicacion').value;
  }

  finalizar(){
    //this.setData();
    debugger
    this.regresarEvent.emit({data: {valorTotalContrato: this.myForm.get('valorTotalContrato').value}, form: 'GUARDAR Y CONTINUAR'});
    this.finalizarEvent.emit('');
  }

  regresar(){
    debugger
    this.regresarEvent.emit('CARACTERISTICAS_FINANCIERAS');
  }

  onSubmit(event){
    debugger
    if(!this.myForm.valid){
      for(let i = 0; i < this.listRequeried.length; i++){
        if(this.myForm.controls[this.listRequeried[i].name].invalid){
          this.listRequeried[i].inValid = true;
        }
      }
      return;
    }

    //this.setData();
    if(event == 'SIGUIENTE'){
      this.onSubmitEvent.emit({data: {valorTotalContrato: this.myForm.get('valorTotalContrato').value}, form: 'CARACTERISTICAS_FINANCIERAS'});
    }
  }

  onSubmitSig(event){
    debugger
    if(!this.myForm.valid){
      for(let i = 0; i < this.listRequeried.length; i++){
        if(this.myForm.controls[this.listRequeried[i].name].invalid){
          this.listRequeried[i].inValid = true;
        }
      }
      return;
    }

      this.onSubmitEvent.emit({data: {valorTotalContrato: this.myForm.get('valorTotalContrato').value}, form: 'CARACTERISTICAS_FINANCIERAS'});
  }


  editarRacPrecio() {
    debugger
    this.editRacPrecio = true;
  }

  cancelarEditRacPrecio() {
    debugger
    this.editRacPrecio = false;
    this.get_SumRacionesPrecios();
  }

  
  guardarEditRacPrecio(idTipoModeloOperacion: number) {
      
      this.dataPreciosAcordados.map(function (item: any) {
        item.auditoria = LocalStorage.getAuditoria('');
        item.estado = true;
        //return item;
      });
      debugger
      this.loadingVisible = true;

      this._contratosApiService.put_UpdateContratosCaracteristicasFinancierasMAER(this.dataPreciosAcordados).subscribe({
        next: response => {
          if (!response.success) {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
            return;
          }
          this.editRacPrecio = false;
          this.get_SumRacionesPrecios();
          this.get_ContratosCaracteristicasFinancierasMAER();
        },
        error: error => {
          this._messageService.showError('ERROR: ' + error, 'top center');
        }
      })
/*
      this._contratosApiService.put_UpdateContratosCaracteristicasFinancierasMAER(this.dataSumRacionesPreciosMAER).subscribe(response => {
        this.loadingVisible = false;
        if (response.success) {
          this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.get_TotalGeneralContratado(this.dataContrato.id);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
        
      });*/
    }


    get_TotalGeneralContratado(idContrato: number) {
      debugger
      this._contratosApiService.getTotalGeneralContratado(idContrato)
        .subscribe(response => {
          if (response.success) {
            let totalgeneral: any[] = response.result;
            totalgeneral.forEach(element => {
              this.dataTotalGeneralContratado.diferencia = element.diferencia;
              this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = element.diferenciaFuentesFinanciacion;
              this.dataTotalGeneralContratado.totalCRP = element.totalCRP;
              this.dataTotalGeneralContratado.totalFuentesFinanciacion = element.totalFuentesFinanciacion;
              this.dataTotalGeneralContratado.valorTotal = element.valorTotal;
              this.dataTotalGeneralContratado.valorTotalPriorizacion = element.valorTotalPriorizacion;
            });
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
    }
  

  disableRubrosAdd(value: any, name: string, valBoolean: boolean) {
    debugger
    if (!valBoolean && this.tieneRubros) {
      this._messageService.showWarning("Debe eliminar los Rubros Adcionales antes de realizar esta operación.", 'top center');
    }
    else {
      this[name] = valBoolean;
      
    }
  }

  validaRespuestaRubros(valRubros: any,valBoolean: boolean) {
    this.valTotalRubros = valRubros;
    this.validarRubrosContrato(valBoolean);
    
  }
  
  validarRubrosContrato(valBoolean: boolean) {
    if (this.sumtotalcontratomaer  < this.dataTotalGeneralContratado.valorTotal) {
      this._contratosApiService.Get_RubrosAdicionales(this.dataContrato.id).subscribe(response => {
        if (response.success && response.result.length > this.VALOR_CERO) {
          this.rubroAdd = true;
          this.tieneRubros = true;
        }
        else if (response.success && response.result.length == this.VALOR_CERO) {
          this.tieneRubros = false;
          if (!valBoolean)
          {
            this.rubroAdd = false;
          }
          
        }
      });
    }
  }


}
