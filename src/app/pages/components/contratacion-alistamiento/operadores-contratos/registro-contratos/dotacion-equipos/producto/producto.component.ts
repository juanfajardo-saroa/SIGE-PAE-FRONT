import { Component, Input, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
import { ContratosApiService } from '../../../../../../../shared/services/contratos-api.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { LocalStorage } from 'src/app/static/local-storage';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.sass']
})
export class ProductoComponent implements OnInit ,OnDestroy{
   
  @Input('idContrato')
  public idContrato!: number;
  @Input('active')
  public active!: number;
  @Output('producto')
  public producto: any = new EventEmitter<boolean>();
  public dataProductos: any[] = [];
  public dataServicios: any[] = [];
  private subs = new Subscription() 

  constructor(
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    // 1 = PRODUCTOS; 2 = SERVICIOS
    if(this.active == 1) {
      this.get_ProductosContrato();
    } else if(this.active == 2) {
      this.get_ServiciosContrato();
    }
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* PRODUCTOS */
  addProducto(){    
    this.dataProductos.push({        
      id: 0,
      iD_Contrato: this.idContrato,
      nombreProducto: '',
      unidadesContratadas: null,
      valorUnitario: null,
      valorTotal: null,
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      readonly: false,
      editInfo: false,
      addInfo: true
    }); 
  }

  saveProducto(itemIndex: number) {

    let valid: boolean = this.validar(itemIndex);
    if(valid) {

      // ACTUALIZAR PRODUCTO
      if (this.dataProductos[itemIndex].editInfo == true && 
          this.dataProductos[itemIndex].addInfo == false) {
        
        this._contratosApiService.UpdateProducto(this.dataProductos[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataProductos[itemIndex].readonly = true;
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
      
      // INSERTAR PRODUCTO
      } else if (this.dataProductos[itemIndex].editInfo == false && 
                  this.dataProductos[itemIndex].addInfo == true ) {

        this._contratosApiService.CreateProducto(this.dataProductos[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataProductos[itemIndex].readonly = true;
            this.producto.emit(this.dataProductos.length == 0 ? true : false);
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });        
      }
    }        
  }

  ChangeItemProductoCalculo(value: any, itemIndice: number) {
    this.dataProductos[itemIndice].valorTotal = this.dataProductos[itemIndice].unidadesContratadas * this.dataProductos[itemIndice].valorUnitario;
  }

  /* END PRODUCTOS */

  /* SERVICIOS */

  addServicio(){ 
    this.dataServicios.push({        
      id: 0,
      iD_Contrato: this.idContrato,
      nombreServicio: '',
      valorTotal: null,
      estado: true,
      auditoria: LocalStorage.getAuditoria(''),
      readonly: false,
      editInfo: false,
      addInfo: true
    }); 
  }

  saveServicio(itemIndex: number) {

    let valid: boolean = this.validar(itemIndex);
    if(valid) {

      // ACTUALIZAR SERVICIO
      if (this.dataServicios[itemIndex].editInfo == true && 
          this.dataServicios[itemIndex].addInfo == false) {
        
        this._contratosApiService.UpdateServicio(this.dataServicios[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataServicios[itemIndex].readonly = true;  
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
      
      // INSERTAR SERVICIO
      } else if (this.dataServicios[itemIndex].editInfo == false && 
                  this.dataServicios[itemIndex].addInfo == true ) {

        this._contratosApiService.CreateServicio(this.dataServicios[itemIndex])
        .subscribe(response => {
          if(response.success) {
            this.dataServicios[itemIndex].readonly = true;
            this.producto.emit(this.dataServicios.length == 0 ? true : false);
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });        
      }
    }        
  }

  /* END SERVICIOS */

  /* COMPARTIDO */

  validar(itemIndex: number) {
    if(this.active == 1) {
      if(this.dataProductos[itemIndex].nombreProducto == ''){
        this._messageService.showWarning("Digite el nombre del producto.", 'top center');
        return false;
      }
  
      if(this.dataProductos[itemIndex].unidadesContratadas <= 0){
        this._messageService.showWarning("La unidad contratada debe ser mayor a cero (0).\n", 'top center');
        return false;
      }
  
      if(this.dataProductos[itemIndex].valorUnitario <= 0){
        this._messageService.showWarning("El valor unitario debe ser mayor a cero (0).\n", 'top center');
        return false;
      }
    } else if(this.active == 2) {
      if(this.dataServicios[itemIndex].nombreServicio == ''){
        this._messageService.showWarning("Digite el nombre del servicio.", 'top center');
        return false;
      }
  
      if(this.dataServicios[itemIndex].valorTotal <= 0){
        this._messageService.showWarning("El valor total debe ser mayor a cero (0).\n", 'top center');
        return false;
      }
    }

    return true;
  }

  editItem(itemIndex: number) {
    if(this.active == 1) {
      this.dataProductos[itemIndex].readonly = false;
      this.dataProductos[itemIndex].editInfo = true;
    }else if(this.active == 2) {
      this.dataServicios[itemIndex].readonly = false;
      this.dataServicios[itemIndex].editInfo = true;
    }
  }

  deleteItem(id: number, i: number) {
    if(this.active == 1) {
      this._contratosApiService.deleteProducto(id)
      .subscribe(response => {
        if(response.success) {        
          this.dataProductos.splice(i, 1);
          this.producto.emit(this.dataProductos.length == 0 ? true : false);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
    } else if(this.active == 2) {
      this._contratosApiService.deleteServicio(id)
      .subscribe(response => {
        if(response.success) {        
          this.dataServicios.splice(i, 1);
          this.producto.emit(this.dataServicios.length == 0 ? true : false);
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
    }
  }

  // IF: CANCELAR NUEVO PRODUCTO Y REMOVIDA ITEM ARRAY
  // ELSE IF: CANCELAR EDICION DE PRODUCTO EXISTENTE
  cancelItem(itemIndex: number) {
    if(this.active == 1){
      if(this.dataProductos[itemIndex].addInfo == true) {      
        this.dataProductos.splice(itemIndex, 1);      
      
      } else if(this.dataProductos[itemIndex].readonly == false && 
                this.dataProductos[itemIndex].editInfo == true) {      
        this.dataProductos[itemIndex].editInfo = false;
        this.dataProductos[itemIndex].readonly = true;
      }
    } else if(this.active == 2) {
      if(this.dataProductos[itemIndex].addInfo == true) {      
        this.dataProductos.splice(itemIndex, 1); 
           
      } else if(this.dataProductos[itemIndex].readonly == false && 
                this.dataProductos[itemIndex].editInfo == true) {      
        this.dataProductos[itemIndex].editInfo = false;
        this.dataProductos[itemIndex].readonly = true;
      }  
    } 
  }

  ChangeItem(value: any, itemIndice: number, name: any) {
    if(this.active == 1) {
      this.dataProductos[itemIndice][name] = value;
    } else if(this.active == 2) {
      this.dataServicios[itemIndice][name] = value;
    }    
  }

  /* END COMPARTIDO */

  get_ProductosContrato() {
    this._contratosApiService.GetAllProducto(this.idContrato)
    .subscribe(response => {
      let productos: any[] = response.result;
      productos.forEach(element => {
        element.readonly = true;
        element.editInfo = false; 
        element.addInfo = false;       
      });
      this.dataProductos = productos;
      this.producto.emit(this.dataProductos.length == 0 ? true : false);
    });
  }

  get_ServiciosContrato() {
    this._contratosApiService.GetAllServicio(this.idContrato)
    .subscribe(response => {
      let servicios: any[] = response.result;
      servicios.forEach(element => {
        element.readonly = true;
        element.editInfo = false; 
        element.addInfo = false;       
      });
      this.dataServicios = servicios;
      this.producto.emit(this.dataServicios.length == 0 ? true : false);
    });
  }
}
