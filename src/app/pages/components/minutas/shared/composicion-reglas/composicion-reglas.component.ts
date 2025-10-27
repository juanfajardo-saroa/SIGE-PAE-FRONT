import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message.service';
import { TipoComponenteMinuta } from 'src/app/shared/constants/tipo-componente-minuta.constant';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { ModalEditarComponenteComponent } from './modal-editar-componente/modal-editar-componente.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-composicion-reglas',
  templateUrl: './composicion-reglas.component.html',
  styleUrls: ['./composicion-reglas.component.scss']
})
export class ComposicionReglasComponent implements OnInit,OnChanges,OnDestroy {
  readonly TipoComponenteMinuta = TipoComponenteMinuta;

  @Input() iD_MinutaPatronAlimento: number;
  @Input() itemsDisabled: boolean;
  @Input() tipoComplementoId: number;
  @Input() modalidadComplementoId: number;
  @Output() itemComponenteMod = new EventEmitter<any>();
  @Output() dataSourceComponentesMod = new EventEmitter<any>();
  @Output() dataSourceAlimentoProteicoMod = new EventEmitter<any>();
  @Output() dataSourceAlimentoLecheIndMod = new EventEmitter<any>();
  @Output() edicionTerminada = new EventEmitter<any>();

  itemComponente: any;
  itemComponenteGrupos: any;
  dataSourceAlimentoProteico: any;
  dataSourceAlimentoLecheInd: any;
  dataSourceComponentes = [];
  private subs = new Subscription() 
  loadingVisible = false;
  iD_TipoModeloOperacionMAEM :number =1; 
  dataSourceComponentesBackup = [];
  listFrecuencias = [];

  AlimentoProteicoSubGrupoIA: boolean = false;
  AlimentoProteicoSubGrupoII: boolean = false;
  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.get_Frecuencias();
    this.get_AlimentosMinuta();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    this.get_Frecuencias();
    this.get_AlimentosMinuta();
  }

  
  get_Frecuencias() {
    this.loadingVisible = true;
    this._minutasApiService.get_Frecuencias().subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR en el listado de frecuencias: ' + response.error, 'top center', 5000);
          return;
        }

        this.listFrecuencias = response.result;
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR en el listado de frecuencias: ' + error, 'top center', 5000);
      }
    });
  }
  valTotalRowsDataSourceComponentes() {
    if (this.itemComponente!=null){
      var totalRowsItemComponente = 0;
      this.itemComponente.listAlimentoComponente.forEach(grupo =>  {
        grupo.totalRows = grupo.listSubGrupo.length;
        totalRowsItemComponente += grupo.totalRows;
      });
      this.itemComponente.totalRows = totalRowsItemComponente;
    }
    if (this.dataSourceComponentes != null){
      for (let i = 0; i < this.dataSourceComponentes.length; i++) {
        var totalRowsItemComponente = 0;
        const obj = this.dataSourceComponentes[i];
          obj.listAlimentoComponente.forEach(grupo =>{
            grupo.totalRows = grupo.listSubGrupo.length;
            totalRowsItemComponente += grupo.totalRows;
        });
        this.dataSourceComponentes[i].totalRows = totalRowsItemComponente;
      }
    }
    if(this.tipoComplementoId == 1 && this.dataSourceAlimentoProteico){
      var totalRowsItemComponente = 0;
      this.dataSourceAlimentoProteico.listAlimentoComponente.forEach(grupo => {
        grupo.totalRows = grupo.listSubGrupo.length;
        totalRowsItemComponente += grupo.totalRows;
      });
      this.dataSourceAlimentoProteico.totalRows = totalRowsItemComponente;
    }
    if(this.modalidadComplementoId == 2 && this.dataSourceAlimentoLecheInd){
      var totalRowsItemComponente = 0;
      this.dataSourceAlimentoLecheInd.listAlimentoComponente.forEach(grupo => {
        grupo.totalRows = grupo.listSubGrupo.length;
        totalRowsItemComponente += grupo.totalRows;
      });
      this.dataSourceAlimentoLecheInd.totalRows = totalRowsItemComponente;
    }
  }

  verificarTotalRowsAlimentoProteico(){
    this.dataSourceAlimentoProteico.listAlimentoComponente.forEach(grupo => {
      if(grupo.id == 4){
        grupo.listSubGrupo.forEach(subGrupo => {
          if(subGrupo.id == 1){
            this.AlimentoProteicoSubGrupoIA = true;
          }
          if(subGrupo.id == 19){
            this.AlimentoProteicoSubGrupoII = true;
          }
        });
      }
    });
  }

  verificarTotalRowsLecheInd(){
    this.dataSourceAlimentoLecheInd.listAlimentoComponente.forEach(grupo => {
      if(grupo.id == 3){
        grupo.listSubGrupo.forEach(subGrupo => {
          if(subGrupo.id == 4){
            this.AlimentoProteicoSubGrupoIA = true;
          }
          if(subGrupo.id == 18){
            this.AlimentoProteicoSubGrupoII = true;
          }
        });
      }
    });
  }


  get_AlimentosMinuta() {
    
    this.dataSourceComponentes = [];

    this.loadingVisible = true;
    this._minutasApiService.get_AlimentosMinuta(this.iD_MinutaPatronAlimento).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }
        if (response.result.alimentoMinutaAgrupado!=null)
        {
          this.itemComponente = response.result.alimentoMinutaAgrupado;
          this.itemComponenteGrupos = response.result.alimentoMinutaAgrupado.listAlimentoComponente;
        }
        if(this.tipoComplementoId == 1){
          this.dataSourceAlimentoProteico = response.result.listAlimentoMinutaAgrupado.filter(componente => componente.id == 2)[0];
          this.dataSourceComponentes = response.result.listAlimentoMinutaAgrupado.filter(componente => componente.id != 2);
          this.verificarTotalRowsAlimentoProteico();
        }
        else if(this.modalidadComplementoId == 2){
           this.dataSourceAlimentoLecheInd = response.result.listAlimentoMinutaAgrupado.filter(componente => componente.id == 13)[0];
           this.dataSourceComponentes = response.result.listAlimentoMinutaAgrupado.filter(componente => componente.id != 13);
           this.verificarTotalRowsLecheInd();
         }
        
        else{
          this.dataSourceComponentes = response.result.listAlimentoMinutaAgrupado;
        }
        this.dataSourceComponentesBackup = response.result.listAlimentoMinutaAgrupado;
        this.valTotalRowsDataSourceComponentes();
        this.itemComponenteMod.emit(this.itemComponente);
        this.dataSourceComponentesMod.emit(this.dataSourceComponentes);
        this.dataSourceAlimentoProteicoMod.emit(this.dataSourceAlimentoProteico);
        this.dataSourceAlimentoLecheIndMod.emit(this.dataSourceAlimentoLecheInd);
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
    
  }

  changeModelMinuta(name: string, value: any, item: any) {
    item[name] = value;

    if (name == 'frecuencia') {
      for (let i = 0; i < this.listFrecuencias.length; i++) {
        if (this.listFrecuencias[i].id == value) {
          item["nombreFrecuencia"] = this.listFrecuencias[i].nombre;
          break;
        }
      }
    }

    this.itemComponenteMod.emit(this.itemComponente);
    this.dataSourceComponentesMod.emit(this.dataSourceComponentes);
    this.dataSourceAlimentoProteicoMod.emit(this.dataSourceAlimentoProteico);
    this.dataSourceAlimentoLecheIndMod.emit(this.dataSourceAlimentoLecheInd);
  }

  actualizarEstadoComponente(idTipoComponente: number, estado: boolean): void {
    let objetoEstado = {
      estado: estado,
      auditoria: LocalStorage.getAuditoria('')
    };
    this.loadingVisible = true;
    this._minutasApiService.UpdateAlimentosMinutaComponenteEstado(this.iD_MinutaPatronAlimento, idTipoComponente, objetoEstado)
    .subscribe(respuesta => {
      this.loadingVisible = false;
      if(respuesta.success) {
        this.get_AlimentosMinuta();
      } else {
        this._messageService.showError('ERROR: ' + respuesta.error, 'top center', 5000);
      }
    }, error => {
      this.loadingVisible = false;
      this._messageService.showError('ERROR: ' + error, 'top center', 5000);
    });
  }

  abrirModalEditarComponente(componente: any) {
    componente.iD_MinutaPatronAlimento = this.iD_MinutaPatronAlimento;
    componente.iD_TipoModeloOperacion = this.  iD_TipoModeloOperacionMAEM; 
    componente.iD_ModalidadComplemento = this.modalidadComplementoId;
    componente.iD_TipoComplemento = this.tipoComplementoId;
    const dialogRef = this.dialog.open(ModalEditarComponenteComponent, {
      data: componente,
      panelClass: 'modal-sin-padding'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result)
      {
        this.edicionTerminada.emit();
        
      }
      
    });
  }

  changeValueSubGrupos(propertyName: string){
    this.dataSourceAlimentoProteico.listAlimentoComponente?.forEach(grupo => {
      grupo.listSubGrupo.forEach(subGrupo => {
        if(grupo.id == 4 && subGrupo.id == 1){
          grupo.listSubGrupo.filter(fltSubGrupo => {
            if(subGrupo.id == 19){
              fltSubGrupo[propertyName] = subGrupo[propertyName];
            }
          });
        }
        else if(grupo.id == 4 && subGrupo.id == 19){
          grupo.listSubGrupo.filter(fltSubGrupo =>{
            if(subGrupo.id == 1){
              fltSubGrupo[propertyName] = subGrupo[propertyName];
            }
          });
        }
      });
    });
  }
}
