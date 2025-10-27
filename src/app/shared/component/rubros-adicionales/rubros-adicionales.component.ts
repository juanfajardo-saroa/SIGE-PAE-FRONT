import { Component, Input, Output, OnInit, EventEmitter,OnDestroy } from '@angular/core';
import { ContratosApiService } from '../../services/contratos-api.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-rubros-adicionales',
  templateUrl: './rubros-adicionales.component.html',
  styleUrls: ['./rubros-adicionales.component.scss']
})
export class RubrosAdicionalesComponent implements OnInit,OnDestroy {
  @Input() ValorTotalServicios: number = null;
  @Input() anchoTable: string = '100%';
  @Input() ValorContrato: number = null;
  @Input() IdContrato: number = null;
  @Output() ValRubros: any = new EventEmitter<boolean>();

  public displayResults: boolean = false;
  public displayedColumnsContratos: any[] = [
    { descripcion: 'Concepto' },
    { descripcion: 'Valor' }
  ];
  public dataTabla: any[] = [];
  public valTotalRubros: number = 0;
  private subs = new Subscription() 

  public addRubroActive: boolean = false;
  public showValidation : boolean = false;
  public rubroData: any =
    {
      id: 0,
      iD_Contrato: null,
      concepto: '',
      valor: null,
      estado: true,
      auditoria: ''
    };

  constructor(
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.get_rubrosAdicionalesContrato();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  get_rubrosAdicionalesContrato() {
    this._contratosApiService.Get_RubrosAdicionales(this.IdContrato).subscribe(response => {
      if (response.success && response.result.length > 0) {
        this.dataTabla = response.result;
        this.displayResults = true;
        this.valTotalRubros = 0;
        this.dataTabla.forEach(rubro => {
          this.valTotalRubros += rubro.valor;
        });
        this.ValRubros.emit(this.valTotalRubros);
      }
      else {
        this.valTotalRubros = 0;
        this.displayResults = false;
        this.ValRubros.emit(0);
        this.dataTabla = [];
      }
    });
  }

  addRubro() {
    this.addRubroActive = true;
  }

  saveRubro() {

    let valid: boolean = this.validar();
    if (valid && this.IdContrato > 0) {
      this.showValidation = false;
    } else {
      this.showValidation = true;
    }

    if (valid && this.IdContrato > 0) {
      this.rubroData.iD_Contrato = this.IdContrato;
      this._contratosApiService.Add_RubrosAdicionales(this.rubroData)
      .subscribe(response => {
        if (response.success) {
          this.get_rubrosAdicionalesContrato();
          this._messageService.showInfo("Rubro Adicional agregado correctamente.", 'top center');
        }
        else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
        this.cancelItem();
      });
    }
  }

  deleteRubro(idRubro: number) {
    var rubro = this.dataTabla.find(item => item.id == idRubro);
    this._contratosApiService.Delete_RubrosAdicionales(rubro.id).subscribe(response => {
      if(response.success){
        this.get_rubrosAdicionalesContrato();
        this._messageService.showInfo("Rubro '" + rubro.concepto + "' eliminado exitosamente.", 'top center');
      }
      else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    }, error => {
      this._messageService.showError('ERROR: ' + error, 'top center');
    });
  }

  cancelItem() {
    this.addRubroActive = false;
    this.rubroData = {
      id: 0,
      iD_Contrato: 0,
      concepto: '',
      valor: null,
      estado: true,
      auditoria: ''
    };
  }

  ChangeItem(value: any, name: any) {
    this.rubroData[name] = value;
  }

  validar() {
    if (this.rubroData.concepto == "") {
      return false;
    }
    if (this.rubroData.valor <= 0) {
      return false;
    }
    if (this.ValorTotalServicios + this.rubroData.valor + this.valTotalRubros > this.ValorContrato) {
      return false;
    }
    return true;
  }
}
