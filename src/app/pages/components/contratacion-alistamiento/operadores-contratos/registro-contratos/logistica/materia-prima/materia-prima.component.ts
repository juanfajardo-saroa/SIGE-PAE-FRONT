import { Component, Input, OnInit, Output, EventEmitter, ViewChild ,OnDestroy } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { ContratosApiService } from '../../../../../../../shared/services/contratos-api.service';
import { MinutasApiService } from '../../../../../../../shared/services/minutas-api.service';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { NgModel, FormControl, FormGroup, FormBuilder,  Validators } from '@angular/forms'

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.scss'],
  /* providers: [
    ContratosApiService,
    MinutasApiService
  ] */
})
export class MateriaPrimaComponent implements OnInit ,OnDestroy{

  @Input('iD_Contrato')
  public iD_Contrato!: number;
  @Input('numeroRacionesDiarias')
  public numeroRacionesDiarias!: number;
  @Output('materiaPrima')
  public materiaPrima: any = new EventEmitter<boolean>();
  valorTotalMateria = 0
  @Output('valorTotalMateriaPrima')
  public valorTotalMateriaPrima: EventEmitter<number> = new EventEmitter<number>();
  @Input() anchoTable: string = '100%';
  private subs = new Subscription() 
  public dataMateriPrima: any[] = [];
  public listGrupoMateria: any = [];
  public listNivelEducativo: any = [];
  public listGranajeUnidad: any = [];
  public VALOR_CERO: number = 0;

  constructor(
    private _contratosAPI: ContratosApiService,
    private _minutasAPI: MinutasApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.get_AllMateriaprima();
    this.get_listGrupoMateria();
    this.get_listNivelEducativo();
    this.get_listGranajeUnidad();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  addMateriaPrima() {
    if(this.numeroRacionesDiarias <= 0){ this._messageService.showWarning('El número de raciones diarias debe ser superior a cero(0)', 'top center'); return;}
    this.dataMateriPrima.push({
      id: 0,
      iD_Contrato: this.iD_Contrato,
      iD_GrupoAlimento: 0,
      iD_TipoGrupoEtario: 0,
      iD_TipoUnidad: 0,
      diasSuministro: this.numeroRacionesDiarias,
      nombreAlimento: "",
      gramaje: 0,
      unidadesContratadas: '',
      valorUnitario: '',
      valorTotal: '',
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      estadoGuardado: false,
    });
  }

  removeMateriaPrima(i: number) {
    this.dataMateriPrima.splice(i, 1);
  }

  validaMateriaPrima(i: number) {
    this.dataMateriPrima[i].estadoGuardado = true;
    let iD_GrupoAlimento: number = this.dataMateriPrima[i].iD_GrupoAlimento,
        iD_TipoGrupoEtario: number = this.dataMateriPrima[i].iD_TipoGrupoEtario,
        iD_TipoUnidad: number = this.dataMateriPrima[i].iD_TipoUnidad,
        diasSuministro: number = this.dataMateriPrima[i].diasSuministro,
        nombreAlimento: string = this.dataMateriPrima[i].nombreAlimento,
        gramaje: number = this.dataMateriPrima[i].gramaje,
        unidadesContratadas: number = this.dataMateriPrima[i].unidadesContratadas,
        valorUnitario: number = this.dataMateriPrima[i].valorUnitario,
        valorTotal: number = this.dataMateriPrima[i].valorTotal;

    /* if(iD_GrupoAlimento == 0 || iD_GrupoAlimento < 0) {
      this._messageService.showWarning('El grupo alimenticio es obligatorio', 'top center');
      return;
    }

    if(iD_TipoGrupoEtario == 0 || iD_TipoGrupoEtario < 0) {
      this._messageService.showWarning('El grupo etario es obligatorio', 'top center');
      return;
    }

    if(iD_TipoUnidad == 0 || iD_TipoUnidad < 0) {
      this._messageService.showWarning('La unidad de medida es obligatorio', 'top center');
      return;
    }
 */
    /*if(diasSuministro == 0 || diasSuministro < 0) {
      this._messageService.showInfo('Los dias de suministro es obligatorio y debe ser mayor a cero(0)', 'top center');
      return;
    }*/

    if(nombreAlimento == "") {
      return;
    }
/*
    if(gramaje == 0 || gramaje < 0) {
      this._messageService.showWarning('El gramaje es obligatorio y debe ser mayor a cero(0)', 'top center');
      return;
    }  */

    if(unidadesContratadas == 0 || unidadesContratadas < 0) {
      return;
    }

    if(valorUnitario == 0 || valorUnitario < 0) {
      return;
    }

    this.saveMateriaPrima(i);
  }

  saveMateriaPrima(i: number) {
    this._contratosAPI.post_MateriPrima(this.dataMateriPrima[i])
    .subscribe(respose => {
      if(respose.success) {
        this.dataMateriPrima[i].id = respose.result;
        this.materiaPrima.emit(this.dataMateriPrima.length == 0 ? true : false);

        this.valorTotalMateriaPrima.emit(this.calcularValorTotalMateriaPrima());

      } else {
        this._messageService.showError('ERROR: ' + respose.error, 'top center');
      }
    });
  }

  eliminarMateriaPrima(i: number, id: number) {
    if(this.dataMateriPrima[i].id != 0) {
      this._contratosAPI.delete_MateriaPrima(id)
      .subscribe(reponse => {
        if(reponse.success) {
          this.removeMateriaPrima(i);
          this.materiaPrima.emit(this.dataMateriPrima.length == 0 ? true : false);

          this.valorTotalMateriaPrima.emit(this.calcularValorTotalMateriaPrima());

        } else {
          this._messageService.showError('ERROR: ' + reponse.error, 'top center');
        }
      });
    } else {
      this.removeMateriaPrima(i);
    }
  }

  changeItem(item: any, nombre: string, val: any) {
    item[nombre] = val;
  }

  calculoValorTotal(item: any){
    item['valorTotal'] = item['unidadesContratadas'] * item['valorUnitario'];
  }

  calcularValorTotalMateriaPrima(): number {
    return this.dataMateriPrima.reduce((accumulator, item) => {
      return accumulator + item.valorTotal;
    }, this.VALOR_CERO) ?? this.VALOR_CERO;
  }

  get_AllMateriaprima() {
    this._contratosAPI.get_AllMateriPrima(this.iD_Contrato)
    .subscribe(response => {
      if(response.success){
        this.dataMateriPrima = response.result;
        this.materiaPrima.emit(this.dataMateriPrima.length == 0 ? true : false);

        this.valorTotalMateriaPrima.emit(this.dataMateriPrima.length > this.VALOR_CERO ? this.calcularValorTotalMateriaPrima() : this.VALOR_CERO);

      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_listGrupoMateria() {
    this._minutasAPI.get_GrupoAlimentos()
    .subscribe(response => {
      if(response.success){
        this.listGrupoMateria = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_listNivelEducativo() {
    this._minutasAPI.get_NivelEducativos()
    .subscribe(response => {
      if(response.success){
        this.listNivelEducativo = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  get_listGranajeUnidad() {
    this._minutasAPI.get_listGranajeUnidad()
    .subscribe(response => {
      if(response.success){
        this.listGranajeUnidad = response.result;
      } else {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
      }
    });
  }

  soloNumeros(e: any) {
    var key = window.event ? e.which : e.keyCode;
     if (key < 48 || key > 57) {
         e.preventDefault();
     }
  }
}
