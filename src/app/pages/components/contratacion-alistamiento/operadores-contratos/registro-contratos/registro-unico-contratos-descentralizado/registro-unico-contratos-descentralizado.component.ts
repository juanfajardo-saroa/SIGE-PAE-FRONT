import { Component, OnInit,OnDestroy } from '@angular/core';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User, ModeloOperacion } from 'src/app/shared/model/core/constante.model';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageService } from 'src/app/services/message.service';
import { LocalStorage } from 'src/app/static/local-storage';
import tableSort from "table-sort-js/table-sort.js"; // Utilidad usada mediante CSS en construccion HTML
import { Subscription } from 'rxjs';

const ID_ESTADO_EN_APROBACION: number = 1;

@Component({
  selector: 'app-registro-unico-contratos-descentralizado',
  /* providers: [
    MasterDataApiService,
    ContratosApiService
  ], */
  templateUrl: './registro-unico-contratos-descentralizado.component.html',
  styleUrls: ['./registro-unico-contratos-descentralizado.component.sass']
})
export class RegistroUnicoContratosDescentralizadoComponent implements OnInit ,OnDestroy{

  public viewActiva: number = 1;
  public id_contrato!: number;
  public nuevoRegistro: boolean = false;
  public loadingVisible: boolean = false;
  public btnSigSedesBenef:boolean = true;
  private subs = new Subscription() 
  public dataPestanas: any = [
    {id: 1, descripcion: 'Contratos', active: true}
  ];
  private sub: any;
  public iD_ETC: number = Number(localStorage.getItem('IdUbicacion'));

  public editRacMAEM: boolean = false;
  public editRacMAIP: boolean = false;
  public dsContratosDescentralizados : any;
  public dsContrato : any;
  public itemSelect: any = { id: 0, nombre: 'Elija una opción'};
  public dataSource : any;
  public numeroContratoNuevo?: number = 0;
  public operadorNuevo: number = 0;
  public tipoContratoNuevo: number = 0;
  public VALOR_CERO: number = 0;
  public valorTotalContratoNuevo?: number = 0;
  public btnSuministroSig: boolean = true;
  public showValidation: boolean = false
  public contratoNuevo: any = {
    id: 0,
    id_Contrato: 0,
    id_ContratoAsociado: 0,
    valorContrato: 0,
    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
    iD_Vigencia: User.iD_Vigencia,
    iD_ETC: 0,
    iD_ET: 0,
    numeroContrato: "0",
    iD_Operador: 0,
    objetoContrato: '',
    iD_TipoCategoriaContrato: 0,
    iD_TipoContratoCHIP: 0,
    iD_TipoConceptoGasto: 0,

    fechalnicioContrato_Format: null,
    fechaFinalContrato_Format: null,
    fechalnicioContrato: null,
    fechaFinalContrato: null,
    manejaPaec: false,
    iD_TipoModeloOperacion: 0,
    valorTotalContrato: 0,
    valorTotalContratoPAEC: 0,

    adjunto: false,
    nombreArchivo: "",
    archivo: "",
    pahtArchivo: "",

    noMeses: 0,
    noMesesPaec: 0,
    showValidation: false,
    idEtc: 0,
    idContrato: 0
  }

  public contratoModeloMAEM: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModeloOperacion: 0,
    manejaPreciosporzona: false,
    manejaPreciosporNivelEducativo: false,
    estado: false,
    auditoria: LocalStorage.getAuditoria('')
  };

  public contratoModeloPAEPI: any = {
    id: 0,
    iD_Contrato: 0,
    iD_TipoModeloOperacion: 0,
    manejaPreciosporzona: false,
    manejaPreciosporNivelEducativo: false,
    estado: false,
    auditoria: LocalStorage.getAuditoria('')
  };


  public noMesesMAEM: 0;
  public noMesesMAIP: 0;

  public dataDetalleSumRacionesMAEM: any = [];
  public dataDetalleSumRacionesMAIP: any = [];
  public dataTotalRaciones: any = [];

  public dataContratosDescentralizados: any = [];
  public itemUtilMAEM: any = {
    nombre_TipoModeloOperacion: 'MAEM',
    seleccionTodo: false,
    seleccionTodoBen: false,
  }
  public itemUtilMAIP: any = {
    nombre_TipoModeloOperacion: 'MAIP',
    seleccionTodo: false,
    seleccionTodoBen: false,
  }
  public listModelosOperacion: any = [];
  public dataSumRaciones: any = [];
  public dataSedesNoBenMAEM: any = [];
  public dataSedesNoBenMAIP: any = [];
  public dataSedesBenMAEM: any = [];
  public dataSedesBenMAIP: any = [];
  public dataSedesNoBenPAEC: any = [];
  public dataSedesBenPAEC: any = [];
  public colsJornadas: any = [
    'Jornada', 'Complemento Almuerzo', 'Complemento AM/PM'
  ]
  public dataSumRacionesDiariasMAEM: any = [];
  public dataSumRacionesDiariasMAIP: any = [];
  public dataSumRacionesContratadasMAEM: any = [];
  public dataSumRacionesContratadasMAIP: any = [];
  public modeloOperacion: any = ModeloOperacion;
  public dataTotal: any = [];
  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalsuministro: 0,
    valorTotalPriorizacion: 0,
  };
  public srcPDF: any;

  public ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR: number = 0;
  public ESTADO_DILIGENCIAMIENTO_INCOMPLETO: number = 1;
  public ESTADO_DILIGENCIAMIENTO_COMPLETO: number = 2;

  public modelosOperacionActivos = [];
  public selectedTabIndex: number = 0;
  public selectedTabIndex2: number = 0

  //Rubros
  public rubroAdd: boolean = false;
  public tieneRubros: boolean = false;
  public valTotalRubros: number = 0;

  constructor(
    public router: Router,
    private _route : ActivatedRoute,
    private _contratosService : ContratosApiService,
    private _masterDataApi: MasterDataApiService,
    private _modalService: NgbModal,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.id_contrato = this._route.snapshot.params.id_contrato;

    this.contratoNuevo.id = this.id_contrato;
    this.contratoNuevo.idContrato = this.id_contrato;

    this.getDatos(this.id_contrato);
    this.getContrato(this.id_contrato);

    this.getDsContrato();
    this.get_ModelosOperacion();

    this.get_ContratosSumRacionesContratadasDiarias(this.contratoNuevo.iD_TipoModeloOperacion);
    this.get_ContratosSumRacionesSedesBeneficiarias(this.contratoNuevo.iD_TipoModeloOperacion);
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  onSubmit(values: any): void{
  }

  getDatos(id: number){
    this._contratosService.get_ContratosDescentralizadoGetID(this.id_contrato).subscribe(response => {
      if(response.result){
        let contratosAsociados: any[] = response.result;
        contratosAsociados.forEach(element => {
          element.readonly = true;
          element.addInfo = false;
          element.editInfo = false;
          element.auditoria = '';
        });
        this.dataSource = contratosAsociados;
        if(this.dataSource.length > 0) {
          this.btnSuministroSig = false;
        } else {
          this.btnSuministroSig = true;
        }
      }
    });
  }

  changeNumContrato($event: any){
    this.numeroContratoNuevo = $event;
  }

  Anterior1(itemAnterior: number){
    this.router.navigate(['registroUnicoContratos']);
  }

  Anterior(itemAnterior: number){
    this.viewActiva = itemAnterior;
  }

  AnteriorManejaP(){
    if(this.contratoNuevo.manejaPaec){
      this.viewActiva = 32;
    } else {
      this.viewActiva = 3;
    }
  }


  Siguiente(itemSiguiente: number){
    this.viewActiva = itemSiguiente;
  }

  Siguiente3(itemSiguiente: number){
    this.guardarSiguiente3();
  }

  Siguiente4(itemSiguiente: number){

    if(this.modelosOperacionActivos.length > 0){
      let keepGoin = true;
      this.modelosOperacionActivos.forEach(element =>{
        if(keepGoin){
          if(element == ModeloOperacion.MAEM.id && this.dataSedesBenMAEM == 0){
            this._messageService.showWarning('Debe agregar al menos una sede beneficiaria de MAEM.', 'top center');
            keepGoin = false;
          } else if(element == ModeloOperacion.MAIP.id && this.dataSedesBenMAIP == 0){
            this._messageService.showWarning('Debe agregar al menos una sede beneficiaria de MAIP.', 'top center');
            keepGoin = false;
          }

          if(element == ModeloOperacion.MAEM.id){
            let data = this.dataSumRacionesContratadasMAEM.filter(function(item: any){
              return item.diferenciaAlmuerzo > 0 || item.diferenciaAlmuerzo < 0 || item.diferenciaComplemento > 0 || item.diferenciaComplemento < 0;
            });
            if(data.length > 0){
              this._messageService.showWarning('Hay diferencia en el Almuerzo y/o Complemento de MAEM', 'top center');
              keepGoin = false;
            }
          }

          if(element == ModeloOperacion.MAIP.id){
            let data = this.dataSumRacionesContratadasMAIP.filter(function(item: any){
              return item.diferenciaAlmuerzo > 0 || item.diferenciaAlmuerzo < 0 || item.diferenciaComplemento > 0 || item.diferenciaComplemento < 0;
            });
            if(data.length > 0){
              this._messageService.showWarning('Hay diferencia en el Almuerzo y/o Complemento de MAIP', 'top center');
              keepGoin = false;
            }
          }
        }
      });
      this.validarRubrosContrato(false);
      this.get_TotalGeneralContratado();
      if(!keepGoin){
        return;
      }
    }

    if(this.contratoNuevo.manejaPaec){


      this.get_ContratosSumRacionesContratadasDiarias(ModeloOperacion.PAEC.id);
      this.get_ContratosSumRacionesSedesBeneficiarias(ModeloOperacion.PAEC.id);

      this.viewActiva = 32;
    }
    else{
      this.get_SumCaracteristicaFinancieras();
    }
  }

  guardarSiguiente3_2(){
    if(this.dataSedesBenPAEC.length == 0){
      this._messageService.showInfo('Debe agregar al menos una sede beneficiaria.', 'top center');
      return;
    }

    /* let data = this.dataSumRacionesContratadasPAEC.filter(function(item: any){
      return item.diferenciaAlmuerzo > 0 || item.diferenciaAlmuerzo < 0 || item.diferenciaComplemento > 0 || item.diferenciaComplemento < 0;
    });

    if(data.length > 0){
      this._messageService.showInfo('Hay diferencia en el Almuerzo y/o Complemento', 'top center');
      return;
    } */

    this.get_TotalGeneralContratado();
    this.get_SumCaracteristicaFinancieras();
    this.viewActiva = 4;
  }

  agregar(){
    this.nuevoRegistro = true;
    this.showValidation = false;
  }

  getContrato(id: number){
    this._contratosService.getInformacionContratroById(id).subscribe(response => {
      if(response.success){
        if(response.result.length>0) {
          let data: any = response.result.shift();
          this.contratoNuevo.id = data.id;
          this.contratoNuevo.TipoContratoId = data.tipoContratoId;
          this.contratoNuevo.subTipoContratoId = data.subTipoContratoId;
          this.contratoNuevo.iD_ETC = data.iD_ETC;
          this.contratoNuevo.iD_ET = data.iD_ET;
          this.contratoNuevo.idEtc  = data.iD_ETC;
          this.contratoNuevo.iD_Vigencia = data.iD_Vigencia;
          this.contratoNuevo.fechalnicioContrato = data.fechalnicioContrato;
          this.contratoNuevo.fechaFinalContrato = data.fechaFinalContrato;
          this.contratoNuevo.valorTotalContrato = data.valorTotalContrato;
          this.consultarTiposModeloOperacionPorIdContrato(id)
        }
      }
    });
  }

  getDsContrato() {
    this._contratosService.get_ContratosListDescentralizado().subscribe(response => {
      if(response.success){
        this.dsContrato = response.result;
      }
    });
  }


  consultarTiposModeloOperacionPorIdContrato(idContrato: number) {
    this._contratosService.get_ContratosContratosModelosGetID(idContrato).subscribe(res => {
      res.result.forEach(result => {
        if (result?.iD_TipoModeloOperacion == ModeloOperacion.MAEM.id) {
          this.contratoModeloMAEM.id = result?.id
          this.contratoModeloMAEM.iD_Contrato = this.id_contrato;
          this.contratoModeloMAEM.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.contratoNuevo.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.contratoModeloMAEM.manejaPreciosporzona = result?.manejaPreciosporzona
          this.contratoModeloMAEM.manejaPreciosporNivelEducativo =result?.manejaPreciosporNivelEducativo
          this.actualizarIdsTiposModeloOperacion(ModeloOperacion.MAEM.id);
          this.get_DetalleSumRacionesMAEM();
        } else if (result?.iD_TipoModeloOperacion == ModeloOperacion.MAIP.id) {
          this.contratoModeloPAEPI.id = result?.id
          this.contratoModeloPAEPI.iD_Contrato = this.id_contrato;
          this.contratoModeloPAEPI.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.contratoModeloPAEPI.manejaPreciosporzona = result?.manejaPreciosporzona;
          this.contratoModeloPAEPI.manejaPreciosporNivelEducativo =result?.manejaPreciosporNivelEducativo;
          this.contratoNuevo.iD_TipoModeloOperacion = result?.iD_TipoModeloOperacion;
          this.actualizarIdsTiposModeloOperacion(ModeloOperacion.MAIP.id);
          this.get_DetalleSumRacionesMAIP();
        }
      });
    });
  }


  cancelContratoAsociado(itemIndex: number) {
    if(itemIndex == 0){
      this.nuevoRegistro = false;
    }
    if(this.dataSource[itemIndex].addInfo == true) {
      this.dataSource.splice(itemIndex, 1);
    } else if(this.dataSource[itemIndex].readonly == false && this.dataSource[itemIndex].editInfo == true) {
      this.dataSource[itemIndex].editInfo = false;
      this.dataSource[itemIndex].readonly = true;
    }
  }

  deleteContratoAsociado(id: number) {
    this._contratosService.deleteContratoDescentralizado(id).subscribe(response => {
      if(response.success) {
        this.getDatos(this.id_contrato);
      }
    });
  }

  saveContratoAsociado(itemIndex: number) {
    if (this.numeroContratoNuevo === undefined || this.numeroContratoNuevo === 0 || this.numeroContratoNuevo === -1) {
      this.showValidation = true;
      return;
    }
    this.contratoNuevo.id_Contrato = this.id_contrato;
    this.contratoNuevo.id_ContratoAsociado = this.numeroContratoNuevo;
    this.contratoNuevo.valorContrato = this.valorTotalContratoNuevo;
    this.contratoNuevo.estado = true,
    this.contratoNuevo.auditoria = LocalStorage.getAuditoria('');

    this._contratosService.createContratoDescentralizado(this.contratoNuevo).subscribe(response => {
      if(response.success) {
        this.nuevoRegistro = false;
        this.getDatos(this.id_contrato);
        this.valorTotalContratoNuevo = undefined;
        this.numeroContratoNuevo = undefined;
      }
      this.showValidation = false;
    });

  }

  changeItemContrato(name: string, value: any){
    this.contratoNuevo[name] = value;
    if(name == 'iD_TipoModeloOperacion'){
      if(value == ModeloOperacion.MAEM.id){
        this.itemUtilMAEM.nombre_TipoModeloOperacion = ModeloOperacion.MAEM.nombre;
        this.itemUtilMAEM.col_CSS_Rac = 'col-md-4';
        this.actualizarIdsTiposModeloOperacion(value);
        this.get_DetalleSumRacionesMAEM();
      } else if(value == ModeloOperacion.MAIP.id){
        this.itemUtilMAIP.nombre_TipoModeloOperacion = ModeloOperacion.MAIP.nombre;
        this.itemUtilMAIP.col_CSS_Rac = 'col-md-6';
        this.actualizarIdsTiposModeloOperacion(value);
        this.get_DetalleSumRacionesMAIP();
      }
    }
  }

  private actualizarIdsTiposModeloOperacion(id: number): void {
    this.modelosOperacionActivos.includes(id)
    ? this.eliminarIdTipoModeloOperacion(id)
    : this.modelosOperacionActivos.push(id);
  }

  private eliminarIdTipoModeloOperacion(id: number) {
    this.modelosOperacionActivos = this.modelosOperacionActivos.filter(idModeloOperacion => {return idModeloOperacion !== id});
  }

  get_SumCaracteristicaFinancieras(){
    this.dataTotalGeneralContratado.valorTotalsuministro=0;
    this._contratosService.get_SumCaracteristicaFinancieras(this.contratoNuevo.id).subscribe(response => {
      if(response.success){
        this.dataContratosDescentralizados = response.result;
        this.dataContratosDescentralizados.forEach(item =>{
          this.dataTotalGeneralContratado.valorTotalsuministro += item.valorTotalContrato;
        });
        this.viewActiva = 4;
      }
    });
  }

  get_ModelosOperacion(){
    this._masterDataApi.get_ModeloOperacion().subscribe(response => {
      if(response.success){
        this.listModelosOperacion = response.result.filter(item => (item.id != 4 && item.id != 2));
      }
    });
  }


  editarRac(idModeloOperacion: number){
    if(idModeloOperacion == ModeloOperacion.MAEM.id){
      this.editRacMAEM = true;
    } else if(idModeloOperacion == ModeloOperacion.MAIP.id){
      this.editRacMAIP = true;
    }
  }

  cancelarEditRac(idTipoModeloOperacion: number){
    if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
      this.editRacMAEM = false;
      this.get_DetalleSumRacionesMAEM();
    } else if(idTipoModeloOperacion == ModeloOperacion.MAIP.id){
      this.editRacMAIP = false;
      this.get_DetalleSumRacionesMAIP();
    }
  }

  guardarEditRac(idTipoModeloOperacion: number){
    this.contratoNuevo.noMeses = idTipoModeloOperacion == ModeloOperacion.MAEM.id ? this.noMesesMAEM : this.noMesesMAIP;
    if(this.contratoNuevo.noMeses >= 1 && this.contratoNuevo.noMeses <= 180){
      let diasSuministro = (idTipoModeloOperacion == ModeloOperacion.MAEM.id ? this.noMesesMAEM : this.noMesesMAIP);
      let contratoPAEC = this.contratoNuevo.manejaPaec;

      if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
        this.dataDetalleSumRacionesMAEM.map(function(item: any){
          item.iD_TipoModeloOperacion = idTipoModeloOperacion;
          item.diasSuministro = diasSuministro;
          item.mesesSuministro = diasSuministro;
          item.contratoPAEC = contratoPAEC;
          item.auditoria = LocalStorage.getAuditoria('');
          item.estado = true;

          return item;
        });
      }
      else if(idTipoModeloOperacion == ModeloOperacion.MAIP.id){
        this.dataDetalleSumRacionesMAIP.map(function(item: any){
          item.iD_TipoModeloOperacion = idTipoModeloOperacion;
          item.diasSuministro = diasSuministro;
          item.mesesSuministro = diasSuministro;
          item.contratoPAEC = contratoPAEC;
          item.auditoria = LocalStorage.getAuditoria('');
          item.estado = true;

          return item;
        });
      }

      let response;

      this.loadingVisible = true;
      if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
        response = this._contratosService.put_UpdateContratosDetallesSumRacionesMAEM(this.dataDetalleSumRacionesMAEM);
      }
      else {
        response = this._contratosService.put_UpdateContratosDetallesSumRacionesMAIP(this.dataDetalleSumRacionesMAIP);
      }

      response.subscribe(response => {
        this.loadingVisible = false;
        if(response.success){
          this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.cancelarEditRac(idTipoModeloOperacion);
        }
        else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
    } else{
      this._messageService.showWarning('El número de días de suministro contratados debe ser (entre 1 y 180)', 'top center');
    }
  }

  get_DetalleSumRacionesMAEM(){
    this.dataDetalleSumRacionesMAEM = [];
    this.loadingVisible = true;

    this._contratosService.get_DetallesSumRacionesMAEM(this.contratoNuevo.id, ModeloOperacion.MAEM.id)
    .subscribe(response => {
      this.loadingVisible = false;
      if(response.success){
        response.result.map((item) => {
          if (item.jornada === "Mañana") {
            item.icono = 1;
          } else if (item.jornada === "Tarde") {
            item.icono = 2;
          } else {
            item.icono = 3;
          }
        })
        response.result.sort(function (a, b) {
          if (a.icono > b.icono) {
            return 1;
          }
          if (a.icono < b.icono) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.dataDetalleSumRacionesMAEM= response.result;
        this.noMesesMAEM = this.dataDetalleSumRacionesMAEM[0].diasSuministro;
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  get_DetalleSumRacionesMAIP(){
    this.dataDetalleSumRacionesMAIP = [];
    this.loadingVisible = true;

    this._contratosService.get_DetallesSumRacionesMAIP(this.contratoNuevo.id, ModeloOperacion.MAIP.id)
    .subscribe(response => {
      this.loadingVisible = false;
      if(response.success){
        response.result.map((item) => {
          if (item.jornada === "Mañana") {
            item.icono = 1;
          } else if (item.jornada === "Tarde") {
            item.icono = 2;
          } else {
            item.icono = 3;
          }
        })
        response.result.sort(function (a, b) {
          if (a.icono > b.icono) {
            return 1;
          }
          if (a.icono < b.icono) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.dataDetalleSumRacionesMAIP = response.result;
        this.noMesesMAIP = this.dataDetalleSumRacionesMAIP[0].diasSuministro;
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
    });
  }

  guardarSiguiente3() {
    if(this.contratoNuevo.fechalnicioContrato == null && this.contratoNuevo.fechalnicioContrato == undefined){
      this.showValidation = true;
      return;
    }

    if(this.contratoNuevo.fechaFinalContrato == null && this.contratoNuevo.fechaFinalContrato == undefined){
      this.showValidation = true;
      return;
    }

    if(this.contratoNuevo.iD_TipoModeloOperacion == 0){
      this.showValidation = true;
      return;
    }

    /* let fechalnicioContrato_Format = this.contratoNuevo.fechalnicioContrato_Format;
    let fechaFinalContrato_Format = this.contratoNuevo.fechaFinalContrato_Format;

    this.contratoNuevo.fechalnicioContrato =
    fechalnicioContrato_Format.year + '-' +
      (fechalnicioContrato_Format.month <= 9 ? '0': '') + fechalnicioContrato_Format.month + '-' +
      (fechalnicioContrato_Format.day <= 9 ? '0': '') + fechalnicioContrato_Format.day;

    this.contratoNuevo.fechaFinalContrato =
    fechaFinalContrato_Format.year + '-' +
      (fechaFinalContrato_Format.month <= 9 ? '0': '') + fechaFinalContrato_Format.month + '-' +
      (fechaFinalContrato_Format.day <= 9 ? '0': '') + fechaFinalContrato_Format.day;  */

      this.actualizarContrato();
      this.Siguiente(3);
  }

  actualizarContrato(){


    this._contratosService.updateContrato(this.contratoNuevo).subscribe(response => {
      if(response.success){
        this.modelosOperacionActivos.forEach(item =>{
          this.get_ContratosSedesJoranada(item);
          this.get_SedesContratoModeloOperacion(item);
          this.get_ContratosSumRacionesContratadasDiarias(item);
          this.get_ContratosSumRacionesSedesBeneficiarias(item);
        });
      }
    });
  }

  get_ContratosSedesJoranada(idTipoModeloOperacion: number){
    if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
      this.dataSedesNoBenMAEM = [];
      this._contratosService.get_ContratosSedesJoranada(this.iD_ETC, idTipoModeloOperacion).subscribe(response => {
        if(response.success){
          this.dataSedesNoBenMAEM = response.result;
          if(response.result.length == 0){
            this.dataSedesNoBenMAEM = [{}];
          }
          this.ordenarTabla();
        }
      });
    } else if(idTipoModeloOperacion == ModeloOperacion.MAIP.id){
      this.dataSedesNoBenMAIP = [];
      this._contratosService.get_ContratosSedesJoranada(this.iD_ETC, idTipoModeloOperacion).subscribe(response => {
        if(response.success){
          this.dataSedesNoBenMAIP = response.result;
          if(response.result.length == 0){
            this.dataSedesNoBenMAIP = [{}];
          }
          this.ordenarTabla();
        }
      });
    }
  }

  get_SedesContratoModeloOperacion(idTipoModeloOperacion: number){
    if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
      this.dataSedesBenMAEM = []
      this._contratosService.get_SedesContratoModeloOperacion(this.contratoNuevo.id, idTipoModeloOperacion).subscribe(response => {
        if(response.success){
          this.dataSedesBenMAEM = response.result;
          if(response.result.length == 0){
            this.dataSedesBenMAEM = [];
          }
        }
      });
    } else if(idTipoModeloOperacion == ModeloOperacion.MAIP.id){
      this.dataSedesBenMAIP = []
      this._contratosService.get_SedesContratoModeloOperacion(this.contratoNuevo.id, idTipoModeloOperacion).subscribe(response => {
        if(response.success){
          this.dataSedesBenMAIP = response.result;
          if(response.result.length == 0){
            this.dataSedesBenMAIP = [];
          }
        }
      });
    }
  }

  changeItemUtil(name: string, value: any, idTipoModeloOperacion: number){
    if(idTipoModeloOperacion == ModeloOperacion.MAEM.id){
      this.itemUtilMAEM[name] = value;
      if(name == 'seleccionTodo'){
        this.dataSedesNoBenMAEM.map(item => {
          item.seleccion = value;
          return item;
        });
      }
      else if(name == 'seleccionTodoBen'){
        this.dataSedesBenMAEM.map(function(item: any){
          item.seleccion = value;
          return item;
        });
      }
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id){
      this.itemUtilMAIP[name] = value;
      if(name == 'seleccionTodo'){
        this.dataSedesNoBenMAIP.map(function(item: any){
          item.seleccion = value;
          return item;
        });
      }
      else if(name == 'seleccionTodoBen'){
        this.dataSedesBenMAIP.map(function(item: any){
          item.seleccion = value;
          return item;
        });
      }
    }
  }

  changeItem(item: any, name: string, value: any){
    item[name] = value;
  }

  agregarSedes(idTipoModeloOperacion: number){
    let data = (idTipoModeloOperacion == ModeloOperacion.MAEM.id
      ? this.dataSedesNoBenMAEM.filter(item => item.seleccion)
      : this.dataSedesNoBenMAIP.filter(item => item.seleccion)
      );

    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        data[i].id = 0;
        data[i].iD_Contrato = this.contratoNuevo.id;
        data[i].numeroContrato = this.contratoNuevo.numeroContrato;
        data[i].iD_TipoModeloOperacion = idTipoModeloOperacion;
      }

      this._contratosService.agregarSedesBeneficiarias(data).subscribe(response => {
        if(response.success){
          this.get_ContratosSedesJoranada(idTipoModeloOperacion);
          this.get_SedesContratoModeloOperacion(idTipoModeloOperacion);

          this.get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion);
          this.get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion);
        }
        else{ this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
    }
    else{
      this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center');
    }
  }

  eliminarSedes(idTipoModeloOperacion: number){

    let data = (idTipoModeloOperacion == ModeloOperacion.MAEM.id ?
      this.dataSedesBenMAEM.filter(function(item: any){
        return item.seleccion;
      })
      :
      this.dataSedesBenMAIP.filter(function(item: any){
        return item.seleccion;
      })
    );

    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        data[i].borrado = true;
      }

      this._contratosService.eliminarSedesBeneficiariasPAEC(data).subscribe(response => {
        if(response.success){
          this.get_ContratosSedesJoranada(idTipoModeloOperacion);
          this.get_SedesContratoModeloOperacion(idTipoModeloOperacion);

          this.get_ContratosSumRacionesContratadasDiarias(idTipoModeloOperacion);
          this.get_ContratosSumRacionesSedesBeneficiarias(idTipoModeloOperacion);
        }
      });
    }
    else{ this._messageService.showWarning('Debe seleccionar al menos una sede.', 'top center'); }
  }

  guardarContinuar(){
    this.actualizarContrato();
    this._messageService.showInfo('Los datos del contrato han sido guardados correctamente.', 'top center');
    this.router.navigate(["/registro-contratos"]);
  }

  get_ContratosSumRacionesContratadasDiarias(iD_TipoModeloOperacion: number) {
    this._contratosService.get_ContratosSumRacionesContratadasDiarias(this.contratoNuevo.id, iD_TipoModeloOperacion, 0).subscribe(response => {
      if(response.success) {
        if(iD_TipoModeloOperacion == this.modeloOperacion.MAEM.id){
          this.dataSumRacionesDiariasMAEM = response.result;
        } else if(iD_TipoModeloOperacion == ModeloOperacion.MAIP.id){
          this.dataSumRacionesDiariasMAIP = response.result;
        }

      }
    });
  }

  get_ContratosSumRacionesSedesBeneficiarias(iD_TipoModeloOperacion: number) {
    this._contratosService.get_ContratosSumRacionesSedesBeneficiarias(this.contratoNuevo.id, iD_TipoModeloOperacion, 0).subscribe(response => {
      if(response.success) {
        if(iD_TipoModeloOperacion == ModeloOperacion.MAEM.id){
          this.dataSumRacionesContratadasMAEM = response.result;
        } else if(iD_TipoModeloOperacion == ModeloOperacion.MAIP.id){
          this.dataSumRacionesContratadasMAIP = response.result;
        }
      }
    });
  }

  Siguiente5(itemSiguiente: number) {

    if(this.contratoNuevo.valorTotalContrato != this.dataTotalGeneralContratado.valorTotalsuministro + this.valTotalRubros ) {
      this._messageService.showWarning('El valor total del contrato ingresado es diferente al valor calculado por el sistema.', 'top center');
      return;
    }

    this.viewActiva = itemSiguiente;
    this._contratosService.updateContrato(this.contratoNuevo).subscribe(response => {
      this.get_TotalGeneralContratado();
    });
  }

  get_TotalGeneralContratado() {
    this._contratosService.getTotalGeneralContratadoSeguimientoFinancieron(this.contratoNuevo.id).subscribe(response => {
      if(response.success) {
        this.dataTotal = response.result;
      }
    });

    this._contratosService.getTotalGeneralContratado(this.contratoNuevo.id).subscribe(response => {
      if(response.success) {
        let totalgeneral: any[] = response.result;
        totalgeneral.forEach(element => {
          this.dataTotalGeneralContratado.diferencia = element.diferencia;
          this.dataTotalGeneralContratado.diferenciaFuentesFinanciacion = element.diferenciaFuentesFinanciacion;
          this.dataTotalGeneralContratado.totalCRP = element.totalCRP;
          this.dataTotalGeneralContratado.totalFuentesFinanciacion = element.totalFuentesFinanciacion;
          this.dataTotalGeneralContratado.valorTotal = element.valorTotal;
          this.dataTotalGeneralContratado.valorTotalPriorizacion = element.valorTotalPriorizacion;
        });
      }
    });
  }

  uploadPDF(){
    const fileUpload = document.getElementById('pahtArchivo') as HTMLInputElement;
    const MAXIMO_BYTES = 10000000;

    fileUpload.onchange = () => {
      if(fileUpload.files?.length && fileUpload.files.length > 0){
        const file = fileUpload.files[0];
        this.contratoNuevo.nombreArchivo = file.name;
        if(file.type == 'application/pdf'){
          if(file.size <= MAXIMO_BYTES){
            this.contratoNuevo.nombreArchivo = file.name;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.contratoNuevo.adjunto = true;
              //this.contratoNuevo.archivo = reader.result?.toString().replace('data:application/pdf;base64,', '');
              fileUpload.value = '';
            };
          }
          else{
            fileUpload.value = '';
            this._messageService.showWarning('El tamaño del archivo supera los 10MB', 'top center');
          }
        }
        else{
          fileUpload.value = '';
          this._messageService.showWarning('El formato del archivo no es un PDF', 'top center');
        }

      }
    }
    fileUpload.click();
  }

  abrirPDF(contenido: any){
    if(this.contratoNuevo.archivo != null){
      this.srcPDF = "data:application/pdf;base64," + this.contratoNuevo.archivo;
      this._modalService.open(contenido, {size: 'xl'});
    }
  }

  dismissAllModal(){
    this._modalService.dismissAll();
  }

  Finalizar(){
    if(this.dataTotalGeneralContratado.totalFuentesFinanciacion != this.dataTotalGeneralContratado.valorTotal){
      this._messageService.showWarning('Asegúrese de que el valor total de las fuentes de financiación coincida con el valor total del contrato', 'top center');
      return;
    }

    if(this.contratoNuevo.nombreArchivo=='') {
      this._messageService.showWarning('El pdf del contrato es requerido', 'top center');
      return;
    }

    this.contratoNuevo.iD_EstadoContrato = ID_ESTADO_EN_APROBACION;
    this.actualizarContrato();
    this._messageService.showInfo('El contrato se ha guardado.', 'top center');
    this.router.navigate(['/registro-contratos']);
  }

  modificarModeloOperacion(event: any, idModeloOperacion: number): void {

      if (event.target.checked) {
        this.agregarContratoModelo(idModeloOperacion);
      } else {
        this.eliminarContratoModelo(idModeloOperacion);
      }
      this.actualizarContrato();
  }


  agregarContratoModelo(idTipoModeloOperacion: number): void {
    let contratoModelo: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      this.contratoModeloMAEM.id_Contrato = this.contratoNuevo.id;
      this.contratoModeloMAEM.iD_TipoModeloOperacion = idTipoModeloOperacion;
      contratoModelo = this.contratoModeloMAEM;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      this.contratoModeloPAEPI.id_Contrato = this.contratoNuevo.id;
      this.contratoModeloPAEPI.iD_TipoModeloOperacion = idTipoModeloOperacion;
      contratoModelo = this.contratoModeloPAEPI;
    }
    this._contratosService.agregarContratoModelo(contratoModelo)
      .subscribe(response => {
        if (response.success) {
          idTipoModeloOperacion == ModeloOperacion.MAEM.id
            ? this.contratoModeloMAEM.id = response.result
            : this.contratoModeloPAEPI.id = response.result;
        }
        else { this._messageService.showError('ERROR: ' + response.error, 'top center'); }
      });
  }

  eliminarContratoModelo(idTipoModeloOperacion: number): void {
    let id: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      id = this.contratoModeloMAEM.id;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      id = this.contratoModeloPAEPI.id;
    }
    this.loadingVisible = true;
    this._contratosService.eliminarContratoModeloPorId(id)
      .subscribe(response => {
        this.loadingVisible = false;
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarContratoModelo(idTipoModeloOperacion: number): void {

    let contratoModelo: any;
    if (idTipoModeloOperacion == ModeloOperacion.MAEM.id) {
      contratoModelo = this.contratoModeloMAEM;
    } else if (idTipoModeloOperacion == ModeloOperacion.MAIP.id) {
      contratoModelo = this.contratoModeloPAEPI;
    }
    this._contratosService.actualizarContratoModelo(contratoModelo)
      .subscribe(respuesta => {
        if (!respuesta.success) {
          this._messageService.showError('ERROR: ' + respuesta.error, 'top center');
        }
      });
  }



  myTabFocusChange(selectedTabIndex: number) {
    this.selectedTabIndex = selectedTabIndex;
  }
  myTabFocusChange2(selectedTabIndex: number) {
    this.selectedTabIndex2 = selectedTabIndex;
  }

  obtenerClaseEstadoDiligenciamiento(estadosDiligenciamiento: any[]): string {
    estadosDiligenciamiento = estadosDiligenciamiento.map(objeto => objeto?.estadoDiligenciamiento);
    if (estadosDiligenciamiento.includes(undefined) || estadosDiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_PENDIENTE_DILIGENCIAR)) {
      return 'pendiente_diligenciar';
    } else if (estadosDiligenciamiento.includes(this.ESTADO_DILIGENCIAMIENTO_INCOMPLETO)) {
      return 'incompleto';
    } else {
      return 'completo';
    }
  }

  //Rubros
  disableRubrosAdd(value: any, name: string, valBoolean: boolean){
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

    //if (this.dataTotalGeneralContratado.valorTotal  != this.contratoNuevo.valorTotalContrato) {
      this._contratosService.Get_RubrosAdicionales(this.contratoNuevo.id).subscribe(response => {
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
    //}
  }

  ordenarTabla() {
    tableSort();
  }
}
