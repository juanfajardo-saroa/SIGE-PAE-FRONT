import { Component, OnInit, Input, EventEmitter, Output ,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { CostosApiService } from '../../../../../../shared/services/costos-api.service';
import { Subscription } from 'rxjs';
import { LocalStorage } from 'src/app/static/local-storage';
@Component({
  selector: 'app-costos-cobertura-pae',
 /*  providers: [
    { provide: CostosApiService, useClass: CostosApiService, },
  ], */
  templateUrl: './costos-cobertura-pae.component.html',
  styleUrls: ['./costos-cobertura-pae.component.sass']
})
export class CostosCoberturaPaeComponent implements OnInit ,OnDestroy{

  @Input() idETC!: number;
  @Input() idTipoModeloOperacion!: number;
  @Input() idVigencia!: number;

  @Input() porcRecaudados!: any;
  @Input() porcReconocidos!: any;

  @Output()
  enviar: EventEmitter<boolean> = new EventEmitter<boolean>();

  loadingVisible: boolean = false;



  columnsMAEM: string[] = ['jornada', 'rpsAlmuerzo', 'rpsComplemento', 'ri', 'cateringAlmuerzo', 'cateringComplemento'];
  columnsMAEMCS: string[] = ['jornada', 'rpsAlmuerzo', 'rpsComplemento', 'ri', 'cateringAlmuerzo', 'cateringComplemento', 'totalJornada'];
  columnsMAEMCF: string[] = ['jornada', 'rpsAlmuerzo', 'rpsComplemento', 'ri', 'cateringAlmuerzo', 'cateringComplemento', 'totalJornada'];
  columnsMAEMCFS: string[] = ['cobertura', 'sValor'];

  columnsMAER: string[] = ['jornada', 'racionrural', 'cateringAlmuerzo', 'cateringComplemento'];
  columnsMAERCS: string[] = ['jornada', 'racionrural','cateringAlmuerzo', 'cateringComplemento'];
  columnsMAIP: string[] = ['jornada', 'rpsAlmuerzo', 'rpsComplemento'];
  columnsMAIPCS: string[] = ['jornada', 'rpsAlmuerzo', 'rpsComplemento', 'totalJornada'];


  listTipoModeloOperacion: any = [
    { idTipo: 1, descripcionTipo: 'MAEM' },
    { idTipo: 2, descripcionTipo: 'MAER' },
    { idTipo: 3, descripcionTipo: 'PAEPI' }
  ];

  itemTipoModeloOperacion: any = {};
  private subs = new Subscription() 
  preciosPorRacion: any[] = [];
  otrosCostos: any[] = [];
  itemOtrosCostos: any;
  totalCostos: number = 0;
  costosSimunistros: any[] = [];
  coberturaFinancieraSuministro: any[] = [];
  dataSourcePxP: any;
  dataSourceCS: any;
  dataSourceCF: any;
  PreciosPorRacion: boolean = true;
  CostosSuministros: boolean = true;
  CoberturaFinanciera: boolean = true;
  OtrosCostosGastos: boolean = true;
  editarPrecios: boolean = false;
  editarOtrosCostos: boolean = false;
  editarOtrosCostosTodo: boolean = false;
  validaOtrosCostos: boolean = true;
  validaPreciosRacion: boolean = true;
  mensajeOtrosCostos: string = '';
  CostoTotal: boolean = true;
  costoTotalCS: any;

  costoTotalTipoModeloOperacion: any;
  costoTotalMAEM: any;
  costoTotalMAER: any;
  costoTotalMAIP: any;
  costoTotalPAEC: any;

  colPAE = '';

  permisos = {
    agregar: false,
    editar: false,
    eliminar: false
  }



  constructor(
    private _costosApiService: CostosApiService,
    private router: Router,
    private messageService: MessageService,
    private _seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.permisos.agregar = this._seguridadService.getModulePermission(11, 'crear');
    this.permisos.editar = this._seguridadService.getModulePermission(11, 'editar');
    this.permisos.eliminar = this._seguridadService.getModulePermission(11, 'eliminar');

    this.setColPAE();
    this.inicializarControl(this.idTipoModeloOperacion);
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  setColPAE(){
    if(this.idTipoModeloOperacion == 1 || this.idTipoModeloOperacion == 4)
      this.colPAE = 'col-sm-9';
    else if (this.idTipoModeloOperacion == 2)
      this.colPAE = 'col-sm-8';
    else if(this.idTipoModeloOperacion == 3)
      this.colPAE = 'col-sm-8';
  }

  ngOnChanges(): void {
    this.setColPAE();
    this.inicializarControl(this.idTipoModeloOperacion);
    
  }


  actualizarCostoCobertura() {
    this.enviar.emit(true);
  }


  inicializarControl(idTipo: number) {
    switch (idTipo) {
      case 1:
        this.PreciosPorRacion = true;
        this.CostosSuministros = true;
        this.get_GetCostosCoberturaMAEM(idTipo);
        break;
      case 2:
        this.PreciosPorRacion = true;
        this.CostosSuministros = true;
        this.get_GetCostosCoberturaMAER(idTipo);
        break;
      case 3:
        this.PreciosPorRacion = true;
        this.CostosSuministros = true;
        this.get_GetCostosCoberturaMAIP(idTipo);
        break;
     
    }

    this.itemTipoModeloOperacion = this.listTipoModeloOperacion[idTipo - 1];


    this.get_GetOtrosCostos(idTipo);
    this.editarOtrosCostos = false;
  }



  get_CostoTotalProgramaETC(idTipo: number) {
    this.costoTotalTipoModeloOperacion = 0;

    this.loadingVisible = true;
    this._costosApiService.get_CostoTotalProgramaETC(this.idETC, idTipo, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this.messageService.showError("ERROR: " + response.error, 'top center', 5000);
          return;
        }

        this.costoTotalTipoModeloOperacion = response.result[0].costoTotal;

        if (idTipo == 1) {
          this.costoTotalMAEM = response.result[0].costoTotal;
          return;
        }

        if (idTipo == 2) {
          this.costoTotalMAER = response.result[0].costoTotal;
          return;
        }

        if (idTipo == 3) {
          this.costoTotalMAIP = response.result[0].costoTotal;
          return;
        }

       
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError("ERROR: " + error, 'top center', 5000);
      }
    });
  }

  get_GetOtrosCostos(idTipo: number) {
    this.loadingVisible = true;
    this._costosApiService.get_GetOtrosCostos(this.idETC, idTipo).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this.messageService.showError("ERROR: " + response.error, 'top center', 5000);
          return;
        }

        this.totalCostos = 0;
        this.otrosCostos = response.result;
        for (let item of this.otrosCostos) {
          this.totalCostos = this.totalCostos + item.valorAnual;
        }
      },
      error: error => {
        this.messageService.showError("ERROR: " + error, 'top center', 5000);
        this.loadingVisible = false;
      }
    });
  }



  get_GetCostosCoberturaMAEM(idTipo: number) {

    this.get_CostoTotalProgramaETC(idTipo);

    this.loadingVisible = true;
    this._costosApiService.get_GetPreciosCostosCoberturaMAEM(this.idETC, idTipo, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        var that = this;
        this.editarPrecios = false;

        if (!response.success) {
          this.messageService.showError("ERROR: " + response.error, 'top center', 5000);
          return;
        }

        var preciosracion = response.result;
        this.preciosPorRacion = [];
        for (var item in preciosracion) {
          var itemPrecio = preciosracion[item];
          itemPrecio.iD_ETC = this.idETC;
          itemPrecio.iD_Vigencia = this.idVigencia;
          if (typeof itemPrecio === 'object') {
            if (itemPrecio.jornada === "Mañana") {
              itemPrecio.icono = 1;
            } else if (itemPrecio.jornada === "Tarde") {
              itemPrecio.icono = 2;
            } else {
              itemPrecio.icono = 3;
            }

            this.preciosPorRacion.push(itemPrecio);
          }
        }
 
        this.dataSourcePxP = this.preciosPorRacion;

        var coberturafinanciera = response.result[0].coberturaFinanciera;
        this.coberturaFinancieraSuministro = [];
        var cont = 0;
        for (var item in coberturafinanciera) {
          var itemPrecio = coberturafinanciera[item];
          if (typeof itemPrecio === 'object') {
            if (cont == 0) {
              itemPrecio.cobertura = item;
            }
            itemPrecio.sValor = (itemPrecio.valor * 100) + '%';;
            this.coberturaFinancieraSuministro.push(itemPrecio);
            cont++;
          }
        }

        this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError("ERROR: " + error, 'top center', 5000);
      }
    });

    this.loadingVisible = true;
    this._costosApiService.get_GetCostosCoberturaMAEM(this.idETC, idTipo, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if (!response.success) {
          this.messageService.showError("ERROR: " + response.error, 'top center', 5000);
          return;
        }

        this.editarPrecios = false;
        var costosumnistro = response.result;
          this.costosSimunistros = [];
          this.costoTotalCS = 0;
          for (var item in costosumnistro) {
            var itemPrecio = costosumnistro[item];
            if (typeof itemPrecio === 'object') {
              if (itemPrecio.jornada === "Mañana") {
                itemPrecio.icono = 1;
              } else if (itemPrecio.jornada === "Tarde") {
                itemPrecio.icono = 2;
              } else {
                itemPrecio.icono = 3;
              }
              itemPrecio.totalJornada = itemPrecio.rpS_ALM + itemPrecio.rpS_COM + itemPrecio.rI_COM + itemPrecio.cA_ALM + itemPrecio.cA_COM;
              this.costoTotalCS = this.costoTotalCS + itemPrecio.totalJornada;
              this.costosSimunistros.push(itemPrecio);
            }
            else {
              if (item === "costoTotal") {
                this.costoTotalCS = itemPrecio;
              }
            }
          }

          this.dataSourceCS = this.costosSimunistros;

          var coberturafinanciera = response.result[0].coberturaFinanciera;
          this.coberturaFinancieraSuministro = [];
          var cont = 0;
          for (var item in coberturafinanciera) {
            var itemPrecio = coberturafinanciera[item];
            if (typeof itemPrecio === 'object') {
              if (cont == 0) {
                itemPrecio.cobertura = item;
              }
              itemPrecio.sValor = (itemPrecio.valor * 100) + '%';;
              this.coberturaFinancieraSuministro.push(itemPrecio);
              cont++;
            }
          }

          this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError("ERROR: " + error, 'top center', 5000);
      }
    });
  }

  get_GetCostosCoberturaMAER(idTipo: number) {
    this.get_CostoTotalProgramaETC(idTipo);
    this._costosApiService.get_GetPreciosCostosCoberturaMAER(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {
        var that = this;
        this.editarPrecios = false;

        if (response.success) {
          var preciosracion = response.result;

          this.preciosPorRacion = [];
          for (var item in preciosracion) {
            var itemPrecio = preciosracion[item];
            if (typeof itemPrecio === 'object') {
              if (itemPrecio.jornada === "Mañana") {
                itemPrecio.icono = 1;
              } else if (itemPrecio.jornada === "Tarde") {
                itemPrecio.icono = 2;
              } else {
                itemPrecio.icono = 3;
              }
              //itemPrecio.jornada = item;
              this.preciosPorRacion.push(itemPrecio);
            }
          }
          this.dataSourcePxP = this.preciosPorRacion;

          var coberturafinanciera = response.result[0].coberturaFinanciera;
          this.coberturaFinancieraSuministro = [];
          var cont = 0;
          for (var item in coberturafinanciera) {
            var itemPrecio = coberturafinanciera[item];
            if (typeof itemPrecio === 'object') {
              if (cont == 0) {
                itemPrecio.cobertura = item;
              }
              itemPrecio.sValor = (itemPrecio.valor * 100) + '%';
              this.coberturaFinancieraSuministro.push(itemPrecio);
              cont++;
            }
          }
          this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);
          this._costosApiService.get_GetCostosCoberturaMAER(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {
        this.editarPrecios = false;
        if (response.success) {
          this.costoTotalCS = 0;
          var costosumnistro = response.result;
          this.costosSimunistros = [];
          for (var item in costosumnistro) {
            var itemPrecio = costosumnistro[item];

            if (typeof itemPrecio === 'object') {
              if (itemPrecio.jornada === "Mañana") {
                itemPrecio.icono = 1;
              } else if (itemPrecio.jornada === "Tarde") {
                itemPrecio.icono = 2;
              } else {
                itemPrecio.icono = 3;
              }
              itemPrecio.totalJornada =0;
              itemPrecio.totalJornada = itemPrecio.rpS_ALM + itemPrecio.rpS_COM + itemPrecio.cA_ALM + itemPrecio.cA_COM;
              this.costoTotalCS = this.costoTotalCS + itemPrecio.totalJornada;
              this.costosSimunistros.push(itemPrecio);
            }
            else {
              if (item === "costoTotal") {
                this.costoTotalCS = itemPrecio;
              }
            }
          }
          this.dataSourceCS = this.costosSimunistros;

          var coberturafinanciera = response.result[0].coberturaFinanciera;
          this.coberturaFinancieraSuministro = [];
          var cont = 0;
          for (var item in coberturafinanciera) {
            var itemPrecio = coberturafinanciera[item];
            if (typeof itemPrecio === 'object') {
              if (cont == 0) {
                itemPrecio.cobertura = item;
              }
              itemPrecio.sValor = (itemPrecio.valor * 100) + '%';;
              this.coberturaFinancieraSuministro.push(itemPrecio);
              cont++;
            }
          }
          this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);

        }
      });

        }
      });

    



  }


  get_GetCostosCoberturaMAIP(idTipo: number) {
    this.get_CostoTotalProgramaETC(idTipo);
    this._costosApiService.get_GetPreciosCostosCoberturaMAIP(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {
        var that = this;
        this.editarPrecios = false;
        if (response.success) {
          var preciosracion = response.result;

          this.preciosPorRacion = [];
          for (var item in preciosracion) {
            var itemPrecio = preciosracion[item];
            if (typeof itemPrecio === 'object') {
              if (itemPrecio.jornada === "Mañana") {
                itemPrecio.icono = 1;
              } else if (itemPrecio.jornada === "Tarde") {
                itemPrecio.icono = 2;
              } else {
                itemPrecio.icono = 3;
              }
              //itemPrecio.jornada = item;
              this.preciosPorRacion.push(itemPrecio);
            }
          }
          this.dataSourcePxP = this.preciosPorRacion;
          var coberturafinanciera = response.result[0].coberturaFinanciera;
          this.coberturaFinancieraSuministro = [];
          var cont = 0;
          for (var item in coberturafinanciera) {
            var itemPrecio = coberturafinanciera[item];
            if (typeof itemPrecio === 'object') {
              if (cont == 0) {
                itemPrecio.cobertura = item;
              }
              itemPrecio.sValor = (itemPrecio.valor * 100) + '%';;
              this.coberturaFinancieraSuministro.push(itemPrecio);
              cont++;
            }
          }
          this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);
        }
      });



    this._costosApiService.get_GetCostosCoberturaMAIP(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {
        this.editarPrecios = false;
        if (response.success) {

          this.costoTotalCS = 0;
          var costosumnistro = response.result;
          this.costosSimunistros = [];
          for (var item in costosumnistro) {
            var itemPrecio = costosumnistro[item];
            if (typeof itemPrecio === 'object') {
              if (itemPrecio.jornada === "Mañana") {
                itemPrecio.icono = 1;
              } else if (itemPrecio.jornada === "Tarde") {
                itemPrecio.icono = 2;
              } else {
                itemPrecio.icono = 3;
               }
               itemPrecio.totalJornada =0;
              itemPrecio.totalJornada = itemPrecio.rpS_ALM + itemPrecio.rpS_COM + itemPrecio.cA_ALM + itemPrecio.cA_COM;
              this.costoTotalCS = this.costoTotalCS + itemPrecio.totalJornada;
              this.costosSimunistros.push(itemPrecio);
            }
          }
          this.dataSourceCS = this.costosSimunistros;

          var coberturafinanciera = response.result[0].coberturaFinanciera;
          this.coberturaFinancieraSuministro = [];
          var cont = 0;
          for (var item in coberturafinanciera) {
            var itemPrecio = coberturafinanciera[item];
            if (typeof itemPrecio === 'object') {
              if (cont == 0) {
                itemPrecio.cobertura = item;
              }
              itemPrecio.sValor = (itemPrecio.valor * 100) + '%';;
              this.coberturaFinancieraSuministro.push(itemPrecio);
              cont++;
            }
          }
          this.dataSourceCF = new MatTableDataSource(this.coberturaFinancieraSuministro);
        }
      });

  }



   editarPreciosRaciones() {
    this.editarPrecios = true;

  }

  editarCostosGastos() {
    this.editarOtrosCostosTodo = true;
    this.editarOtrosCostos = true;
  }

  agregarOtrosCostos() {
    this.editarOtrosCostos = true;
    this.itemOtrosCostos = { "id": 0, "iD_ETC": this.idETC, "iD_TipoModeloOperacion": this.idTipoModeloOperacion, "concepto": "", "valorAnual": '', "estado": true, "auditoria": LocalStorage.getAuditoria('Crear') };
    this.otrosCostos.push(this.itemOtrosCostos);
  }

  cancelarOtrosCostos() {
    this.editarOtrosCostos = false;
    this.editarOtrosCostosTodo = false;
    this.mensajeOtrosCostos = '';
    this.otrosCostos = this.otrosCostos.filter(function (otrosCostos) {
      return otrosCostos.id != '0';
    })
    this.inicializarControl(this.idTipoModeloOperacion);
  }

  eliminarOtrosCostos(id: number) {
    this.loadingVisible = true;
    this._costosApiService.delete_OtrosCostosPorId(id)
      .subscribe(response => {
        if (response.success) {
          this.inicializarControl(this.idTipoModeloOperacion);
          this.loadingVisible = false;
          this.messageService.showInfo('Registro eliminado con éxito', 'top center');
        } else {
          this.loadingVisible = false;
          this.messageService.showError("ERROR: " + response.error, 'top center');
        }
      });
  }

  guardarOtrosCostos() {
    this.loadingVisible = true;

    if (this.editarOtrosCostosTodo == true) {
      for (let item of this.otrosCostos) {
        if (item.concepto == null || item.valorAnual == null || item.concepto == '' || item.valorAnual == '') {
          this.validaOtrosCostos = false;
          this.mensajeOtrosCostos = 'Los campos no pueden estar en blanco';
          this.loadingVisible = false;
          break;
        } else if (isNaN(item.valorAnual) == true || item.valorAnual < 0) {
          this.validaOtrosCostos = false;
          this.mensajeOtrosCostos = 'El valor anual debe ser un número mayor o igual a cero ';
          this.loadingVisible = false;
        }
      }

      if (this.validaOtrosCostos == true) {
        this._costosApiService.put_OtrosCostosAll(this.otrosCostos)
          .subscribe(response => {
            if (response.success) {
              this.editarOtrosCostos = false;
              this.editarOtrosCostosTodo = false;
              this.actualizarCostoCobertura();
              this.inicializarControl(this.idTipoModeloOperacion);
              this.loadingVisible = false;
              this.messageService.showInfo('Registros modificados con éxito', 'top center');
            } else {
              this.loadingVisible = false;
              this.messageService.showError('Error actualizando los registros ' + response.error, 'top center');
            }
          });
      }

    } else {
      this.validaOtrosCostos = true;
      this.mensajeOtrosCostos = '';
      this.itemOtrosCostos = this.otrosCostos.filter(function (otrosCostos) {
        return otrosCostos.id == '0';
      })
      this.itemOtrosCostos = this.itemOtrosCostos[0];

      if (this.itemOtrosCostos.concepto == null || this.itemOtrosCostos.valorAnual == null || this.itemOtrosCostos.concepto == '' || this.itemOtrosCostos.valorAnual == '') {
        this.validaOtrosCostos = false;
        this.mensajeOtrosCostos = 'Los campos no pueden estar en blanco';
        this.loadingVisible = false;
      } else

        if (isNaN(this.itemOtrosCostos.valorAnual) == true || this.itemOtrosCostos.valorAnual < 0) {
          this.validaOtrosCostos = false;
          this.mensajeOtrosCostos = 'El valor anual debe ser un número no negativo';
          this.loadingVisible = false;
        }

      if (this.validaOtrosCostos == true) {
        this._costosApiService.post_OtrosCostos(this.itemOtrosCostos)
          .subscribe(response => {
            if (response.success) {
              this.editarOtrosCostos = false;
              this.editarOtrosCostosTodo = false;
              this.actualizarCostoCobertura();
              this.inicializarControl(this.idTipoModeloOperacion);
              this.loadingVisible = false;
              this.messageService.showInfo('Registro ingresado con éxito', 'top center');
            } else {
              this.loadingVisible = false;
              this.messageService.showError('Error ingresando el registro ' + response.error, 'top center');
            }
          });
      }
    }
  }



  cancelarValores() {
    this.inicializarControl(this.idTipoModeloOperacion);
    this.editarPrecios = false;
  }

  guardarValores() {
    this.editarPrecios = true;
    var data = this.dataSourcePxP;
    this.validaPreciosRacion = true;
    var error = "";
    this.loadingVisible = true;

    switch (this.idTipoModeloOperacion) {

      case 1: {

        for (let item of data) {

          item.rpS_ALM = (item.rpS_ALM == null || item.rpS_ALM.toString().trim() == '') ? 0 : item.rpS_ALM;
          item.rpS_COM = (item.rpS_COM == null || item.rpS_COM.toString().trim() == '') ? 0 : item.rpS_COM;
          item.rI_COM = (item.rI_COM == null || item.rI_COM.toString().trim() == '') ? 0 : item.rI_COM;
          item.cA_ALM = (item.cA_ALM == null || item.cA_ALM.toString().trim() == '') ? 0 : item.cA_ALM;
          item.cA_COM = (item.cA_COM == null || item.cA_COM.toString().trim() == '') ? 0 : item.cA_COM;
          item.auditoria = LocalStorage.getAuditoria('');
          /*
          if(item.rpS_ALM == null || item.rpS_ALM == '' || item.rpS_COM == null || item.rpS_COM == ''  || item.rI_COM == null || item.rI_COM == '' || item.cA_ALM == null || item.cA_ALM == ''  || item.cA_COM == null || item.cA_COM == '' ){
              this.validaPreciosRacion = false;
              this.messageService.showError("ERROR: " + response.error , 'Los campos no pueden estar en blanco');
              this.loadingVisible = false;
              break;
          }else
          */
          if (isNaN(item.rpS_ALM) == true || item.rpS_ALM < 0 || isNaN(item.rpS_COM) == true || item.rpS_COM < 0 || isNaN(item.rI_COM) == true || item.rI_COM < 0 || isNaN(item.cA_ALM) == true || item.cA_ALM < 0 || isNaN(item.cA_COM) == true || item.cA_COM < 0) {
            this.validaPreciosRacion = false;
            this.messageService.showError(' El valor de la ración debe ser un número mayor o igual a cero ', 'top center');
            this.loadingVisible = false;
          }
        }

        if (this.validaPreciosRacion == true) {
          this._costosApiService.put_PutCostosCoberturaMAEM(data)
            .subscribe(response => {
              if (response.success) {
                this.editarPrecios = false;
                this.actualizarCostoCobertura();
                this.inicializarControl(this.idTipoModeloOperacion);
                this.loadingVisible = false;
                this.messageService.showInfo('Registros actualizados con éxito', 'top center');
              } else {
                this.loadingVisible = false;
                this.messageService.showError('Error actualizando los registros ' + error, 'top center');
                this.editarPrecios = false;
              }
            });
        }
        break;

      }
      case 2: {
        for (let item of data) {
          item.rpS_ALM = (item.rpS_ALM == null || item.rpS_ALM.toString().trim() == '') ? 0 : item.rpS_ALM;
          item.rpS_COM = (item.rpS_COM == null || item.rpS_COM.toString().trim() == '') ? 0 : item.rpS_COM;
          //item.cA_ALM = (item.cA_ALM == null || item.cA_ALM.toString().trim() == '') ? 0 : item.cA_ALM;
          //item.cA_COM = (item.cA_COM == null || item.cA_COM.toString().trim() == '') ? 0 : item.cA_COM;
          item.auditoria = LocalStorage.getAuditoria('');
          if (isNaN(item.rpS_ALM) || item.rpS_ALM < 0 || isNaN(item.rpS_COM) || item.rpS_COM < 0 ) {
            this.validaPreciosRacion = false;
            this.messageService.showWarning(' El valor de complemento debe ser mayor o igual a cero ', 'top center');
            this.loadingVisible = false;
          }
        }

        if (this.validaPreciosRacion == true) {
          this._costosApiService.put_PutCostosCoberturaMAER(data)
            .subscribe(response => {
              if (response.success) {
                this.editarPrecios = false;
                this.actualizarCostoCobertura();
                this.inicializarControl(this.idTipoModeloOperacion);
                this.loadingVisible = false;
                this.messageService.showInfo('Registros actualizados con éxito', 'top center');
              } else {
                this.loadingVisible = false;
                this.messageService.showError('Error ingresando el registro ' + response.error, 'top center');
              }
            });
        }
        break;
      }
      case 3: {

        for (let item of data) {

          item.rpS_ALM = (item.rpS_ALM == null || item.rpS_ALM.toString().trim() == '') ? 0 : item.rpS_ALM;
          item.rpS_COM = (item.rpS_COM == null || item.rpS_COM.toString().trim() == '') ? 0 : item.rpS_COM;
          item.cA_ALM = (item.cA_ALM == null || item.cA_ALM.toString().trim() == '') ? 0 : item.cA_ALM;
          item.cA_COM = (item.cA_COM == null || item.cA_COM.toString().trim() == '') ? 0 : item.cA_COM;
          item.auditoria = LocalStorage.getAuditoria('');
          if (isNaN(item.rpS_ALM) || item.rpS_ALM < 0 || isNaN(item.rpS_COM) || item.rpS_COM < 0 || isNaN(item.cA_ALM) || item.cA_ALM < 0 || isNaN(item.cA_COM) || item.cA_COM < 0) {
            this.validaPreciosRacion = false;
            this.messageService.showError(' El valor del complemento debe ser un número mayor o igual a cero ', 'top center');
            this.loadingVisible = false;
          }

        }

        if (this.validaPreciosRacion == true) {
          this._costosApiService.put_PutCostosCoberturaMAIP(data)
            .subscribe(response => {
              if (response.success) {
                this.editarPrecios = false;
                this.actualizarCostoCobertura();
                this.inicializarControl(this.idTipoModeloOperacion);
                this.loadingVisible = false;
                this.messageService.showInfo('Registros actualizados con éxito', 'top center');
              } else {
                this.loadingVisible = false;
                this.messageService.showError('Error ingresando el registro ' + response.error, 'top center');
              }
            });
        }
        break;
      }

    }
  }

}
