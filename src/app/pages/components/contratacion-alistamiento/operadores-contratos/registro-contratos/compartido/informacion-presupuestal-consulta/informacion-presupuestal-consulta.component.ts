import { Component, Input, OnInit, Output, EventEmitter ,OnDestroy} from '@angular/core';
import { ContratosApiService } from '../../../../../../../shared/services/contratos-api.service';
import { AsignacionRecursosApiService } from '../../../../../../../shared/services/asignacion-recursos-api.service';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../../../../../services/message.service';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';
import { DiagnosticoSituacionalExtendService } from 'src/app/shared/services/DiagnosticoSituacional-Extend.services';
import { DateUtilService } from 'src/app/shared/services/DateUtil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-informacion-presupuestal-consulta',
  templateUrl: './informacion-presupuestal-consulta.component.html',
  styleUrls: ['./informacion-presupuestal-consulta.component.sass'],
  /* providers: [
    ContratosApiService,
    AsignacionRecursosApiService
  ] */
})
export class InformacionPresupuestalConsultaComponent implements OnInit,OnDestroy {
  @Input('iD_Contrato')
  public iD_Contrato: number = 0;
  @Input('iD_Modificacion')
  public iD_Modificacion: number = 0;
  /**
   * 1: Contrato normal
   * 2: Contrato modificacion
   */
  @Input('TipoFuncionalida')
  public TipoFuncionalida: number = 1;
  @Output('data')
  public data: any = new EventEmitter<any>();
  public funtesFinanciacion: any[] = [];
  public fuentesFinanciacionJson: any[] = [];
  public srcPdfFuente: any;
  public listFuentePresupuestal: any[] = [];
  public listTipoFuentePresupuestal: any[] = [];
  private subs = new Subscription() 

  public cdpTableDescription: any[] = [
    'Fecha CDP', 'Valor CDP', 'Archivo CDP', 'CRPs', 'Nº CRP', 'Fecha CRP', 'Valor CRP', 'Archivo CRP'
  ]
  public crpTableDescription: any[] = [
    'Nº CRP', 'Fecha CRP', 'Valor CRP', 'Archivo CRP'
  ]

  constructor(
    private _contratosApi: ContratosApiService,
    private _asignacionRecursosApi: AsignacionRecursosApiService,
    private _modalService: NgbModal,
    private _messageService: MessageService,
    private _servicios: DiagnosticoSituacionalExtendService,
    public dateUtil: DateUtilService
  ) { }

  ngOnInit(): void {

    /**
     * 1: Contrato normal
     * 2: Contrato modificacion
     */
    if (this.TipoFuncionalida == 1) {
      this.get_FuenteFinanciacion();
    } else {
      this.get_FuenteFinanciacionModif();
    }

    this.get_FuentePresupuestal();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  modificacionesContracFinalizar(datos: any) {
    this.data.emit(datos);
  }

  get_FuenteFinanciacion() {
    this._contratosApi.get_FuentesFinanciacion(this.iD_Contrato)
      .subscribe(response => {
        if (response.success) {
          this.fuentesFinanciacionMap(response.result);
          this.get_TotalGeneralContratado();
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  get_FuenteFinanciacionModif() {
    this._contratosApi.get_FuentesFinanciacionModif(this.iD_Contrato, this.iD_Modificacion)
      .subscribe(response => {
        if (response.success) {
          this.fuentesFinanciacionMap(response.result);
          this.get_TotalGeneralContratado();
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  fuentesFinanciacionMap(fuentesFinancionResult: any[]) {
    let fuentesMod: any[] = [];

    /**
     * Extraer fuentes de financiacion
     */
    fuentesFinancionResult.forEach(fuenteFinanciacion => {
      if (!this.checaExiteElementoById(fuentesMod, 'id', fuenteFinanciacion.id)) {
        fuentesMod.push({
          id: fuenteFinanciacion.id,
          iD_Contrato: this.iD_Contrato,
          iD_Modificacion: this.iD_Modificacion,
          iD_FuenteFinanciacion: fuenteFinanciacion.iD_FuenteFinanciacion,
          fuenteFinanciacion: fuenteFinanciacion.fuenteFinanciacion,
          iD_FuenteIngresos: fuenteFinanciacion.iD_FuenteIngresos,
          fuenteIngreso: fuenteFinanciacion.fuenteIngreso,
          valor: fuenteFinanciacion.valorFuente,
          estado: true,
          auditoria: '.',
          cdps: [],
          crps: [],
          readonly: true
        });
      }
    });

    /**
     * Extraer cdps
     * &&
           fuenteFinanciacion.iD_CDP != 0
     */
    fuentesMod.forEach(fuenteMod => {
      let cdpsFuente: any[] = fuenteMod.cdps;
      fuentesFinancionResult.forEach(fuenteFinanciacion => {
        /* if(!this.checaExiteElementoById(cdpsFuente, 'id', fuenteFinanciacion.iD_CDP) &&
            fuenteFinanciacion.id == fuenteMod.id ) {*/
        cdpsFuente.push({
          id: fuenteFinanciacion.iD_CDP,
          iD_FuenteFinanciacion: fuenteFinanciacion.id,
          numeroCDP: fuenteFinanciacion.numeroCDP,
          fechaCDP: fuenteFinanciacion.fechaCDP,
          valorCDP: fuenteFinanciacion.valorCDP,
          archivoCDP: fuenteFinanciacion.archivoCDP,
          pahtArchivoCDP: fuenteFinanciacion.pahtArchivoCDP,
          numeroCRP: fuenteFinanciacion.numeroCRP,
          fechaCRP: fuenteFinanciacion.fechaCRP,
          valorCRP: fuenteFinanciacion.valorCRP,
          archivoCRP: fuenteFinanciacion.archivoCRP,
          pathArchivoCRP: fuenteFinanciacion.pathArchivoCRP,
          crpsAsociado: fuenteFinanciacion.crpsAsociado,
          estado: true,
          auditoria: ".",
          readonly: true
        });
        //}
      });
      fuenteMod.cdps = cdpsFuente;
    });

    /**
     * Extraer crps
    
    fuentesMod.forEach(fuenteMod => {
      let crpsFuente: any[] = fuenteMod.crps;
      fuentesFinancionResult.forEach(fuenteFinanciacion => {
        if(!this.checaExiteElementoById(crpsFuente, 'id', fuenteFinanciacion.iD_CRP) &&
           fuenteFinanciacion.id == fuenteMod.id &&
           fuenteFinanciacion.iD_CRP != 0) {
          crpsFuente.push({
            id_fuente: fuenteMod.id,
            id: fuenteFinanciacion.iD_CRP,
            iD_CDP: fuenteFinanciacion.iD_CDP,
            numeroCDP: fuenteFinanciacion.numeroCDP,
            numeroCRP: fuenteFinanciacion.numeroCRP,
            fechaCRP: fuenteFinanciacion.fechaCRP,
            valorCRP: fuenteFinanciacion.valorCRP,
            archivoCRP: fuenteFinanciacion.archivoCRP,
            pathArchivoCRP: fuenteFinanciacion.pathArchivoCRP,
            estado: true,
            auditoria: ".",
            readonly: true
          });
        }
      });
      fuenteMod.crps = crpsFuente;
    });
    */
    this.funtesFinanciacion = fuentesMod;
    this.setFuentesFinanciacionTable(fuentesFinancionResult);
  }

  setFuentesFinanciacionTable(fuentesFinancionResult: any[]) {
    // Valida total CRPs y separa por Id CDP
    let CRPs: any[] = [];
    fuentesFinancionResult.forEach(fuenteFinanciacion => {
      if (!this.checaExiteElementoById(CRPs, 'id', fuenteFinanciacion.iD_CRP)) {
        CRPs.push({
          id: fuenteFinanciacion.iD_CRP,
          numero: fuenteFinanciacion.numeroCRP,
          fecha: fuenteFinanciacion.fechaCRP,
          valor: fuenteFinanciacion.valorCRP,
          pathArchivo: fuenteFinanciacion.pathArchivoCRP,
          rutaArchivo: fuenteFinanciacion.rutaArchivoCRP,
          idCDP: fuenteFinanciacion.iD_CDP
        });
      }
    });

    // Valida total CDPs y separa por Id Fuente
    let CDPs: any[] = [];
    fuentesFinancionResult.forEach(fuenteFinanciacion => {
      if (!this.checaExiteElementoById(CDPs, 'id', fuenteFinanciacion.iD_CDP)) {
        CDPs.push({
          id: fuenteFinanciacion.iD_CDP,
          numero: fuenteFinanciacion.numeroCDP,
          fecha: fuenteFinanciacion.fechaCDP,
          valor: fuenteFinanciacion.valorCDP,
          pathArchivo: fuenteFinanciacion.pahtArchivoCDP,
          rutaArchivo: fuenteFinanciacion.rutaArchivoCDP,
          crps: CRPs.filter(CRP => { return CRP.idCDP === fuenteFinanciacion.iD_CDP }),
          crpsAsociados: CRPs.filter(CRP => { return CRP.idCDP === fuenteFinanciacion.iD_CDP }).length,
          idFuente: fuenteFinanciacion.id
        });
      }
    });

    // Valida total fuentes
    let fuentes: any[] = [];
    fuentesFinancionResult.forEach(fuenteFinanciacion => {
      if (!this.checaExiteElementoById(fuentes, 'id', fuenteFinanciacion.id)) {
        fuentes.push({
          id: fuenteFinanciacion.id,
          iD_Contrato: this.iD_Contrato,
          iD_Modificacion: this.iD_Modificacion,
          iD_FuenteFinanciacion: fuenteFinanciacion.iD_FuenteFinanciacion,
          fuenteFinanciacion: fuenteFinanciacion.fuenteFinanciacion,
          iD_FuenteIngresos: fuenteFinanciacion.iD_FuenteIngresos,
          fuenteIngreso: fuenteFinanciacion.fuenteIngreso,
          valor: fuenteFinanciacion.valorFuente,
          estado: true,
          auditoria: '.',
          cdps: CDPs.filter(CDP => { return CDP.idFuente === fuenteFinanciacion.id }),
          readonly: true
        });
      }
    });

    this.fuentesFinanciacionJson = fuentes;
  
  }

  checaExiteElementoById(arr: any[], name: string, val: any) {
    return arr.some(function (arrVal) {
      return val == arrVal[name];
    });
  }

  addFuenteFinanciacion() {
    this.funtesFinanciacion.push({
      id: 0,
      iD_Contrato: this.iD_Contrato,
      iD_FuenteFinanciacion: '',
      iD_FuenteIngresos: '',
      iD_Modificacion: this.iD_Modificacion,
      valor: null,
      estado: true,
      auditoria: '.',
      cdps: [],
      crps: [],
      readonly: false
    });
  }

  validarFuente(item: any) {
    if (item.iD_FuenteFinanciacion <= 0 || item.iD_FuenteFinanciacion == '') {
      this._messageService.showWarning('La fuente de financiación es requerida.', 'top center');
      return;
    }

    if (item.iD_FuenteIngresos <= 0 || item.iD_FuenteIngresos == '') {
      this._messageService.showWarning('El tipo de fuente financiación es requerida.', 'top center');
      return;
    }

    if (item.valor <= 0 || item.valor == '') {
      this._messageService.showWarning('El valor de la fuente financiación es requerida y debe ser superior a cero (0).', 'top center');
      return;
    }


    if (item.id === 0) {
      this.guardarFuente(item);
    } else {
      this.actualizarFuente(item);
    }
  }

  guardarFuente(item: any) {
    this._contratosApi.postFuenteFinanciacion(item)
      .subscribe(response => {
        if (response.success) {
          item.id = response.result;
          item.readonly = true;
          item.btnsAction = false;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Fuente de financiación creada', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarFuente(item: any) {
    this._contratosApi.putFuenteFinanciacion(item)
      .subscribe(response => {
        if (response.success) {
          item.readonly = true;
          item.btnsAction = false;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Fuente de financiación actualizada', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  eliminarFuente(idFuente: number, i: number, cdpsLength: number) {
    if (cdpsLength > 0) {
      this._messageService.showWarning('La fuente de financiación tiene certificados de disponibilidad presupuestal (CDP), procede a eliminarlos.', 'top center');
      return;
    }

    this._contratosApi.deleteFuenteFinanciacion(idFuente)
      .subscribe(reponse => {
        if (reponse.success) {
          this.funtesFinanciacion.splice(i, 1);
          this.get_TotalGeneralContratado();
        } else {
          this._messageService.showError('Error ' + reponse.error, 'top center');
        }
      });
  }

  removerFuente(i: number) {
    this.funtesFinanciacion.splice(i, 1);
  }



  addCdpFuente(item: any[], idFuente: number) {
    item.push({
      id: 0,
      iD_FuenteFinanciacion: idFuente,
      numeroCDP: null,
      fechaCDP: null,
      valorCDP: null,
      archivoCDP: '',
      pahtArchivoCDP: '',
      estado: true,
      auditoria: '.',
      readonly: false
    });
  }

  validarCdpFuente(item: any) {
    if (item.numeroCDP <= 0 || item.numeroCDP == null) {
      this._messageService.showWarning('El número del certificado de disponibilidad presupuestal (CDP) es requerido.', 'top center');
      return;
    }

    if (item.fechaCDP == null || item.fechaCDP == '') {
      this._messageService.showWarning('La fecha del certificado de disponibilidad presupuestal (CDP) es requerida.', 'top center');
      return;
    }

    if (item.valorCDP <= 0 || item.valorCDP == null) {
      this._messageService.showWarning('El valor del certificado de disponibilidad presupuestal (CDP) es requerido y debe ser superior a cero(0).', 'top center');
      return;
    }
    if (item.id === 0) {
      this.guardarCdpFuente(item);
    } else {
      this.actualizarCdpFuente(item);
    }
  }

  guardarCdpFuente(item: any) {
    this._contratosApi.postCdpFuente(item)
      .subscribe(response => {
        if (response.success) {
          item.readonly = true;
          item.btnsAction = false;
          item.id = response.result;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Certificado de disponibilidad presupuestal (CDP) creado', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarCdpFuente(item: any) {
    this._contratosApi.putCdpFuente(item)
      .subscribe(response => {
        if (response.success) {
          item.readonly = true;
          item.btnsAction = false;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Certificado de disponibilidad presupuestal (CDP) actualizado', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  removerCdp(cdps: any[], i: number) {
    cdps.splice(i, 1);
  }

  eliminarCdp(cdps: any[], crps: any[], id: number) {
    let data: any = crps.find((element) => { return element.iD_CDP == id })
    if (data != undefined) {
      this._messageService.showWarning(`Debes eliminar el certificado de registro presupuestal (CRP) Nº ${data.numeroCRP} pertenecientes al CDP`, 'top center');
      return;
    }

    this._contratosApi.deleteCdpFuente(id)
      .subscribe(response => {
        if (response.success) {

          let indice = cdps.findIndex((element) => { return element.id == id })
          cdps.splice(indice, 1);
          this.get_TotalGeneralContratado();
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }


  addCrpFuente(item: any[], iD_Cdp: number, numeroCDP: number) {
    item.push({
      id: 0,
      iD_CDP: iD_Cdp,
      numeroCDP: numeroCDP,
      numeroCRP: null,
      fechaCRP: null,
      valorCRP: null,
      archivoCRP: '',
      pathArchivoCRP: '',
      estado: true,
      auditoria: '.',
      readonly: false
    });
  }

  validarCrpFuente(item: any) {
    if (item.numeroCRP <= 0 || item.numeroCRP == null) {
      this._messageService.showWarning('El número del certificado de registro presupuestal (CRP) es requerido.', 'top center');
      return;
    }

    if (item.fechaCRP == null || item.fechaCRP == '') {
      this._messageService.showWarning('La fecha del certificado de registro presupuestal (CRP) es requerido.', 'top center');
      return;
    }

    if (item.valorCRP <= 0 || item.valorCRP == null) {
      this._messageService.showWarning('El valor del certificado de registro presupuestal (CRP) es requerido.', 'top center');
      return;
    }

    if (item.id === 0) {
      this.guardarCrpFuente(item);
    } else {
      this.actualizarCrpFuente(item);
    }
  }

  guardarCrpFuente(item: any) {
    this._contratosApi.postCrpCdpFuente(item)
      .subscribe(response => {
        if (response.success) {
          item.readonly = true;
          item.id = response.result;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Certificado de registro presupuestal (CRP) creado', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  actualizarCrpFuente(item: any) {
    this._contratosApi.putCrpCdpFuente(item)
      .subscribe(response => {
        if (response.success) {
          item.readonly = true;
          this.get_TotalGeneralContratado();
          this._messageService.showInfo('Certificado de registro presupuestal (CRP) actualizado', 'top center');
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  removerCrp(crps: any[], i: number) {
    crps.splice(i, 1);
  }

  eliminarCrp(crps: any[], id: number) {
    this._contratosApi.deleteCrpCdpFuente(id)
      .subscribe(response => {
        if (response.success) {
          crps.splice(this.findIndexItem(crps, id), 1);
          this.get_TotalGeneralContratado();
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  findIndexItem(items: any[], id: number) {
    return items.findIndex(function (element) {
      return element.id == id;
    })
  }


  public dataTotalGeneralContratado: any = {
    diferencia: 0,
    diferenciaFuentesFinanciacion: 0,
    totalCRP: 0,
    totalFuentesFinanciacion: 0,
    valorTotal: 0,
    valorTotalPriorizacion: 0,
  };

  get_TotalGeneralContratado() {
    if (this.TipoFuncionalida == 1) {
      this._contratosApi.getTotalGeneralContratado(this.iD_Contrato)
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
            this.modificacionesContracFinalizar(this.dataTotalGeneralContratado);
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
    } else {
      this._contratosApi.GetTotalGeneralContratadosModificacion(this.iD_Contrato, this.iD_Modificacion, 0, 0)
        .subscribe(response => {
          if (response.success) {
            let totalgeneral: any[] = response.result;
            totalgeneral.forEach(element => {
              this.dataTotalGeneralContratado.totalCRP = element.valorCRPAdicion;
              this.modificacionesContracFinalizar(this.dataTotalGeneralContratado.totalCRP);
            });
          } else {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
          }
        });
    }
  }


  get_FuentePresupuestal() {
    this._asignacionRecursosApi.get_FuentesFinanciacion()
      .subscribe(response => {
        if (response.success) {
          this.listFuentePresupuestal = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }

  changeItemFuente(item: any, nombre: string, val: any) {
    item[nombre] = val;

    if (nombre == 'iD_FuenteFinanciacion') {
      let result = this.get_DescripcionValue(this.listFuentePresupuestal, 'id', val);
      item.fuenteFinanciacion = result.nombre;
      this.get_TipoFuentePresupuestal(val);
    }

    if (nombre == 'iD_FuenteIngresos') {
      let result = this.get_DescripcionValue(this.listTipoFuentePresupuestal, 'iD_FuenteIngreso', val);
      item.fuenteIngreso = result.nombre;
    }
  }

  get_DescripcionValue(arr: any[], name: string, val: any) {
    return arr.find(element => { return element[name] == val });
  }

  get_TipoFuentePresupuestal(id: number) {
    this._asignacionRecursosApi.get_FuenteIngresos(id)
      .subscribe(response => {
        if (response.success) {
          this.listTipoFuentePresupuestal = response.result;
        } else {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
        }
      });
  }


  /**
  * uploadPDF('nameinput', item, 'pahtArchivoCDP', 'archivoCRP')
  * uploadPDF('nameinput', item, 'pathArchivoCRP', 'archivoCRP')
  */

  uploadPDF(nameElm: string, item: any, ArcNom: string, valArcNom: string) {
    const fileUpload = document.getElementById(nameElm) as HTMLInputElement;
    const MAXIMO_BYTES = 10000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        item[ArcNom] = file.name;
        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              item[ArcNom] = file.name;
              item[valArcNom] = reader.result?.toString().replace('data:application/pdf;base64,', '');
              fileUpload.value = '';
            };
          }
          else {
            fileUpload.value = '';
            this._messageService.showWarning("El tamaño del archivo supera los 10MB", 'top center');
          }
        }
        else {
          fileUpload.value = '';
          this._messageService.showWarning("El formato del archivo no es un PDF", 'top center');
        }

      }
    }
    fileUpload.click();
  }

  /**
  * abrirPDF(modalPDF, cdp, 'archivoCDP')
  * abrirPDF(modalPDF, crp, 'archivoCRP')
  */

  abrirPDF(contenido: any, item: any, nameItem: string) {
    if (item[nameItem] != null) {
      this.srcPdfFuente = "data:application/pdf;base64," + item[nameItem];
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  downloadFile(archivo, nombreArchivo: string): void {
    if (archivo) {
      const file = 'data:application/pdf;base64,' + archivo;
      const link = document.createElement("a");
      link.href = file;
      link.download = nombreArchivo;
      link.click();
      return;
    }

    let _fileUpload: fileUploadModel = {
      file: null,
      fileName: nombreArchivo,
      cnx: environment.cnxBS,
      container: environment.containerFiles
    };

    this._servicios.downloadFileBlobRepositorios(_fileUpload, 'sd').subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, nombreArchivo);
      },
      (err) => {
        console.log("-----> error en la descarga del archivo desde el repositorio azure", err);
      }
    )
  };


  downloadFileRuta(nombreArchivo: string): void {
    let _fileUpload: fileUploadModel = {
      file: null,
      fileName: nombreArchivo,
      cnx: environment.cnxBS,
      container: environment.containerFiles
    };

    this._servicios.downloadFileBlobRepositorios(_fileUpload, 'sd').subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, nombreArchivo);
      },
      (err) => {
        console.log("-----> error en la descarga del archivo desde el repositorio azure", err);
      }
    )
  };


  dismissAllModal() {
    this._modalService.dismissAll();
  }

  filtrarCRPPorCDP(CRPs: any[], numeroCDP: number): any[] {
    return CRPs.filter(crp => crp.id_fuente == numeroCDP);
  }

}
