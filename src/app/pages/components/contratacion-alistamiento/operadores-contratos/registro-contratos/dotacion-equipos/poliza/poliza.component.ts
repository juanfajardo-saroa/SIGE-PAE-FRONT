import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContratosApiService } from '../../../../../../../shared/services/contratos-api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.sass']
})
export class PolizaComponent implements OnInit {

  @Input('idContrato')
  public idContrato!: number;
  @Output()
  public polizaLength: any = new EventEmitter<boolean>();
  public dataTipoPoliza: any[] = [];
  public dataSourcePolizas: any[] = [];

  constructor(
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.get_TipoPoliza();
    this.get_AllPolizasContrato();
  }

  addItemPoliza() {
    this.dataSourcePolizas.push({
      id: 0,
      iD_Contrato: this.idContrato,
      iD_TipoPoliza: '',
      tipoPoliza: '',
      fechaPoliza: null,
      fechaAprobacion: null,
      numero: '',
      valorTotal: '',
      estado: true,
      auditoria: '.',
      readonly: false
    });
  }

  changePoliza(item: any, name: string, value: any) {
    item[name] = value;
    item['tipoPoliza'] = this.dataTipoPoliza.find(element=>element.id==value).nombre;
  }

  validacionPolizaContrato(item: any){
    if(item.iD_TipoPoliza <= 0 || item.iD_TipoPoliza == "" ) {
      this._messageService.showWarning('El campo tipo de poliza es obligatorio', 'top center');
      return;    
    }

    if(item.fechaPoliza == "" || item.fechaPoliza == null ) {
      this._messageService.showWarning('El campo fecha de poliza es obligatorio', 'top center'); 
      return;    
    }

    if(item.fechaAprobacion == "" || item.fechaAprobacion == null ) {
      this._messageService.showWarning('El campo fecha de aprobación es obligatorio', 'top center'); 
      return;    
    }

    if(item.numero == "") {
      this._messageService.showWarning('El campo número de póliza es obligatorio', 'top center');
      return;    
    }

    if(item.valorTotal <= 0) {
      this._messageService.showWarning('El campo valor total es obligatorio', 'top center');
      return;    
    }

    if(item.id==0){
      this.guardarPoliza(item);
    } else {
      this.actualizarPoliza(item);
    }
  }

  guardarPoliza(item: any) {
    
    this._contratosApiService.CreatePoliza(item)
      .subscribe(response => {
        if(response.success) {
          item.id=response.result;
          item.readonly = true; 
          this.polizaLength.emit(this.dataSourcePolizas.length == 0 ? true : false);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarPoliza(item: any) {
    
    this._contratosApiService.UpdatePoliza(item)
      .subscribe(response => {
        if(response.success) {
          item.readonly = true;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  deletePolizaContrato(id: number, i: number) {
    this._contratosApiService.deletePoliza(id)
    .subscribe(response => {
      if(response.success) {
        this.dataSourcePolizas.splice(i, 1); 
        this.polizaLength.emit(this.dataSourcePolizas.length == 0 ? true : false);      
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }
  removerPoliza(i: number){
    this.dataSourcePolizas.splice(i, 1);
  }

  get_TipoPoliza() {
    this._contratosApiService.GetAllTipoPoliza()
    .subscribe(response => {
      if(response.success) {
        this.dataTipoPoliza = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }
 
  get_AllPolizasContrato() {
    this._contratosApiService.GetAllPolizas(this.idContrato)
    .subscribe(response => {
      if(response.success) {
        this.dataSourcePolizas = response.result.map((element: any)=>{
          element.iD_Contrato = this.idContrato;
          element.numero = element.nroPoliza;
          element.readonly = true;
          element.auditoria = '.';    
          return element;
        });
        this.polizaLength.emit(this.dataSourcePolizas.length == 0 ? true : false);
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    })
  }
}
