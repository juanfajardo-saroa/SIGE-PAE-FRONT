import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { ContratosApiService } from '../../../../../../../shared/services/contratos-api.service';
import { AsignacionRecursosApiService } from '../../../../../../../shared/services/asignacion-recursos-api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.sass'],
  providers:[
    AsignacionRecursosApiService
  ]
})
export class PresupuestoComponent implements OnInit,OnDestroy {

  @Input('idContrato')
  public idsContrato!: number;
  public idContrato: number= 21;
  private subs = new Subscription() 
  public listFuentePresupuestal: any = [];
  public listTipoFuentePresupuestal: any = [];
  public listCrpsAsociados: any = [];

  public dataFuenteFinanciacion: any[] = [];

  constructor(
    private _contratosApiService: ContratosApiService,
    private _asignacionRecursosApiService: AsignacionRecursosApiService
  ) { }



  ngOnInit(): void {
    this.readFuentePresupuestal();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  addFuenteFinanciacion() {
    this.dataFuenteFinanciacion.push({
      id: 0,
      iD_Contrato: this.idContrato,
      iD_FuenteFinanciacion: 0,
      iD_FuenteIngresos: 0,
      valor: 0,
      estado: true,
      auditoria: "",
      cdps:[],
      crps:[],
      readonly: false,
      addInfo: true,
      editInfo: false
    });
  }

  validFuenteFinancion(itemIndex: number) {
    if(this.dataFuenteFinanciacion[itemIndex].iD_FuenteFinanciacion <= 0) {
      alert('La fuente de financiación es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemIndex].iD_FuenteIngresos <= 0) {
      alert('El tipo de fuente es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemIndex].valor <= 0 || 
       this.dataFuenteFinanciacion[itemIndex].valor == '') {
      alert('El valor es obligatoria y debe ser superior a (0) cero.');
      return false;
    }

    return true;
  }

  saveFuenteFinanciacion(itemIndex: number) {
  
    let valid: boolean = this.validFuenteFinancion(itemIndex);
    if(valid) {

      if (this.dataFuenteFinanciacion[itemIndex].id != 0 &&
        this.dataFuenteFinanciacion[itemIndex].editInfo == true && 
          this.dataFuenteFinanciacion[itemIndex].addInfo == false) {
        
        this._contratosApiService.putFuenteFinanciacion(this.dataFuenteFinanciacion[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndex].readonly = true;
            
            alert('Fuente de financiacón actualizada');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });
      
      } else if (this.dataFuenteFinanciacion[itemIndex].id === 0 &&
                 this.dataFuenteFinanciacion[itemIndex].editInfo == false && 
                 this.dataFuenteFinanciacion[itemIndex].addInfo == true ) {

        this._contratosApiService.postFuenteFinanciacion(this.dataFuenteFinanciacion[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndex].readonly = true;
            this.dataFuenteFinanciacion[itemIndex].addInfo = false;

            this.dataFuenteFinanciacion[itemIndex].id = response.result;
            
            alert('Fuente de financiacón creada');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });        
      }
    }        
  }

  editFuenteFinanciacion(itemIndex: number) {
    this.dataFuenteFinanciacion[itemIndex].readonly = false;
    this.dataFuenteFinanciacion[itemIndex].editInfo = true;
  }

  eliminarFuenteFinanciacion(idFuenteFinanciacion: number, itemIndex: number) {
    this._contratosApiService.deleteFuenteFinanciacion(idFuenteFinanciacion)
    .subscribe(reponse => {
      if(reponse.success){
        this.dataFuenteFinanciacion.splice(itemIndex, 1);
      } else {
        alert('Error '+ reponse.error);
      }
    });
  }

  cancelFuenteFinanciacion(itemIndex: number) {    
    if(this.dataFuenteFinanciacion[itemIndex].addInfo == true) {      
      this.dataFuenteFinanciacion.splice(itemIndex, 1);

    } else if(this.dataFuenteFinanciacion[itemIndex].readonly == false && 
              this.dataFuenteFinanciacion[itemIndex].editInfo == true) {      
      this.dataFuenteFinanciacion[itemIndex].editInfo = false;
      this.dataFuenteFinanciacion[itemIndex].readonly = true;
    }    
  }


  addCdpFuente(itemIndex: number) {
    this.dataFuenteFinanciacion[itemIndex]['cdps'].push({
      id: 0,
      iD_FuenteFinanciacion: this.dataFuenteFinanciacion[itemIndex].id,
      numeroCDP: 0,
      fechaCDP: null,
      valorCDP: 0,
      pahtArchivoCDP: '',
      estado: true,
      auditoria: "",
      readonly: false,
      addInfo: true,
      editInfo: false
    });
  }

  validarCdpFuente(itemFuenteFinanciacion: number, ItemCdp: number) {
    if(this.dataFuenteFinanciacion[itemFuenteFinanciacion]['cdps'][ItemCdp].numeroCDP <= 0) {
      alert('El número de CDP es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemFuenteFinanciacion]['cdps'][ItemCdp].fechaCDP == null || 
       this.dataFuenteFinanciacion[itemFuenteFinanciacion]['cdps'][ItemCdp].fechaCDP == '') {
      alert('La fecha de CDP es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemFuenteFinanciacion]['cdps'][ItemCdp].valorCDP <= 0) {
      alert('El valor del CDP es obligatorio.');
      return false;
    }
    return true;
  }

  saveCdpFuente(itemIndexFuente: number, itemIndexCdp: number) {
    
    let valid: boolean = this.validarCdpFuente(itemIndexFuente, itemIndexCdp);
    if(valid) {

      if (this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].id != 0 && 
          this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].editInfo == true && 
          this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].addInfo == false) {
        
        this._contratosApiService.putCdpFuente( this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].readonly = true;
            this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].editInfo = true;
            
            alert('CDP actualizado');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });
      
      } else if (this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].id === 0 && 
                 this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].editInfo == false && 
                 this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].addInfo == true ) {

        this._contratosApiService.postCdpFuente(this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].readonly = true;
            this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].addInfo = false;

            this.dataFuenteFinanciacion[itemIndexFuente]['cdps'][itemIndexCdp].id = response.result;
            
            alert('CDP creado');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });        
      }
    }        
  }

  addCrpCdpFuente(itemIndexFuente: number, idCdp: number) {
    this.dataFuenteFinanciacion[itemIndexFuente]['crps'].push({
      id: 0,
      iD_CDP: idCdp,
      numeroCRP: 0,
      fechaCRP: null,
      valorCRP: 0,
      pathArchivoCRP: '',
      estado: true,
      auditoria: "",
      readonly: false,
      addInfo: true,
      editInfo: false
    });
  }

  validCrpCdpFuente(itemIndexFuente: number, itemIndexCrp: number) {
    if(this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].numeroCRP <= 0) {
      alert('El número de CRP es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].fechaCRP == null || 
       this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].fechaCRP == '') {
      alert('La fecha de CRP es obligatoria.');
      return false;
    }

    if(this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].valorCRP <= 0) {
      alert('El valor del CRP es obligatorio.');
      return false;
    }

    return true;
  }

  saveCrpCdpFuente(itemIndexFuente: number, itemIndexCrp: number) {
    
    let valid: boolean = this.validCrpCdpFuente(itemIndexFuente, itemIndexCrp);
    if(valid) {

      if (this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].id != 0 &&
          this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].editInfo == true && 
          this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].addInfo == false) {
        
        this._contratosApiService.putCrpCdpFuente(this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].readonly = true;
            this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].editInfo = false;  
            
            alert('CRP actualizado');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });
      
      } else if (this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].id === 0 &&
                 this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].editInfo == false && 
                 this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].addInfo == true ) {

        this._contratosApiService.postCrpCdpFuente(this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp])
        .subscribe(response => {
          if(response.success) {
            this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].readonly = true;
            this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].addInfo = false;

            this.dataFuenteFinanciacion[itemIndexFuente]['crps'][itemIndexCrp].id = response.result;
            
            alert('CRP creado');
  
          } else {
            alert('ERROR: ' + response.error);
          }
        });        
      }
    }        
  }

  createInformacionPresupuestal(){

  }

  changeFuentePresupuestal(value: any) {
    this.readTipoFuentePresupuestal(value);
  }

  editItemData(itemIndexFuente: number, itemIndexCdp: number, name: string) {  
    this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].readonly = false;
    this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].editInfo = true;  
  }

  cancelItemData(itemIndexFuente: number, itemIndexCdp: number, name: string) {    
    if(this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].addInfo == true) {      
      this.dataFuenteFinanciacion[itemIndexFuente][name].splice(itemIndexCdp, 1);

    } else if(this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].readonly == false && 
              this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].editInfo == true) {      
      this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].editInfo = false;
      this.dataFuenteFinanciacion[itemIndexFuente][name][itemIndexCdp].readonly = true;
    }    
  }

 /* uploadPDF(name: string) {
    const fileUpload = document.getElementsByName(name) as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if(fileUpload.files?.length && fileUpload.files.length > 0){
        const file = fileUpload.files[0];
      }
    }
  }*/

  readFuentePresupuestal() {
    this._asignacionRecursosApiService.get_FuentesFinanciacion()
    .subscribe(response => {
      if(response.success) {
        this.listFuentePresupuestal = response.result;
      } else {
        alert('ERROR: ' + response.error);
      }
    });
  }

  readTipoFuentePresupuestal(id: number) {
    this._asignacionRecursosApiService.get_FuenteIngresos(id)
    .subscribe(response => {
      if(response.success) {
        this.listTipoFuentePresupuestal = response.result;
      } else {
        alert('ERROR: ' + response.error);
      }
    });
  }
}