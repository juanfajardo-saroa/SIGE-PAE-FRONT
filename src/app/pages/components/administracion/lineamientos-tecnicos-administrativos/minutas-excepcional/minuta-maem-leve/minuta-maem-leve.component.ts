import { Component, OnInit,OnDestroy  } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'src/app/static/local-storage';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { InfoMessageComponent } from 'src/app/shared/component/info-message/info-message.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-minuta-maem-leve',
  templateUrl: './minuta-maem-leve.component.html',
  styleUrls: ['./minuta-maem-leve.component.scss'],
 // providers: [MinutasApiService]
})

export class MinutaMaemLeveComponent implements OnInit,OnDestroy  {

  public permisos = {
    crear: false,
    aprobar: false
  }

  submitSolicitud: boolean = false;

  private idETC: number = Number(localStorage.getItem('IdUbicacion') ?? '0');
  private idTipoModeloOperacion: number = 1; //Constante MAEM
  private idTipoActividadFisica: number = 1 //Constante Actividad Fisica Leve
  private subs = new Subscription()
  public minutaMaemLeve: any;
  public item: any = {
    estadoMinuta: 'Pendiente',
    bgEstadoMinuta: 'bg-grey'
  }

  public newMinutaMaemLeve: any = {
    id: 0,
    iD_ETC: this.idETC,
    iD_TipoModeloOperacion: this.idTipoModeloOperacion,
    iD_TipoEstadoMinuta: EstadoMinuta.porAprobarSinObs,
    tipoActividadFisicaId: this.idTipoActividadFisica,
    justificacion: "",
    adjuntoJustificacion: "",
    adjuntoJustificacionPATH: "",
    rechazado: false,
    estado: true,
    auditoria: LocalStorage.getAuditoria(''),
    fechaSolicitud: this._datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss')
  }

  public objAprobacion: any = {
    aprueba: null,
    observacionJustificacion: ""
  }

  public paso: number = 0;
  public loadingVisible: boolean = false;

  public fileName: string;
  public srcPDF: any;

  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService,
    private _modalService: NgbModal,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.permisos.crear = this._seguridadService.getModulePermission(42, 'crear');
    this.permisos.aprobar = this._seguridadService.getModulePermission(42, 'aprobar');

    if (this.newMinutaMaemLeve.iD_ETC != 0) {
      this._minutasApiService.get_AlimentosMenuMinutaPatronAlimentosLeve(this.idETC, this.idTipoModeloOperacion, this.idTipoActividadFisica)
        .subscribe(response => {
          response.result = response.result.filter(obj => {
            return obj.iD_TipoEstadoMinuta != EstadoMinuta.rechazado
          });
          if (response.success && response.result.length != 0) {
            this.minutaMaemLeve = response.result[0];
            this.paso = 3;
            this.validarEstadoMinuta(this.minutaMaemLeve.iD_TipoEstadoMinuta);
          }
          else {
            this.paso = 1;
          }
        });
    }
    else {
      this._messageService.showError("ERROR: Debe seleccionar una ETC para realizar uso de este modulo.", "top center");
      this.paso = 0;
    }
    this.loadingVisible = false;
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  solicitarAutorizacion() {
    this.loadingVisible = true;
    if (this.newMinutaMaemLeve.justificacion?.trim().length > 0) {
      var newMinutaMaemLeve = this.newMinutaMaemLeve;
      newMinutaMaemLeve.justificacion = "SOLICITUD: " + newMinutaMaemLeve.justificacion;
      this._minutasApiService.add_AlimentosMenuMinutaPatronAlimentosLeve(newMinutaMaemLeve).subscribe(response => {
        if (response.success && response.result) {
          this._messageService.showInfo("Solicitud creada exitosamente.", "top center");
          this.ngOnInit();
        }
      });
    } else {
      this.submitSolicitud = true;
    }
    this.loadingVisible = false;
  }

  validarEstadoMinuta(idEstadoMinuta: number) {
    switch (idEstadoMinuta) {
      case EstadoMinuta.creado:
        this.item.estadoMinuta = 'Creada';
        this.item.bgEstadoMinuta = 'bg-grey';
        break;
      case EstadoMinuta.porAprobarSinObs:
        this.item.estadoMinuta = 'Por Aprobar';
        this.item.bgEstadoMinuta = 'bg-yellow';
        break;
      case EstadoMinuta.aprobado:
        this.item.estadoMinuta = 'Aprobada';
        this.item.bgEstadoMinuta = 'bg-green';
        break;
      case EstadoMinuta.rechazado:
        this.item.estadoMinuta = 'Rechazada';
        this.item.bgEstadoMinuta = 'bg-red';
        break;
    }
  }

  setStatus(aprobado: boolean) {
    document.getElementById('btnAprobar').classList.add("btn-default");
    document.getElementById('btnRechazar').classList.add("btn-default");
    document.getElementById('btnAprobar').classList.remove("btn-blue");
    document.getElementById('btnRechazar').classList.remove("btn-red");
    if (aprobado) {
      document.getElementById('btnAprobar').classList.remove("btn-default");
      document.getElementById('btnAprobar').classList.add("btn-blue");
      this.objAprobacion.aprueba = aprobado;
    }
    else {
      document.getElementById('btnRechazar').classList.remove("btn-default");
      document.getElementById('btnRechazar').classList.add("btn-red");
      this.objAprobacion.aprueba = aprobado;
    }
  }

  enviarResultado() {
    this.loadingVisible = true;
    if (this.validarResultado()) {
      this._minutasApiService.put_AlimentosMenuMinutaPatronAlimentosLeve(this.minutaMaemLeve).subscribe(response => {
        if (response.success && response.result) {
          this._messageService.showInfo("Resultado de aprobación enviado exitosamente.", "top center");
          this.ngOnInit();
        }
      });
    }
    this.loadingVisible = false;
  }

  validarResultado() {
    if (this.objAprobacion.aprueba == null) {
      this.showWarningMessage("Debe aprobar o rechazar la solicitud para continuar.");
      return false;
    } else if (this.objAprobacion.observacionJustificacion == "") {
      this.showWarningMessage("Debe registrar una Observación/Justificación para esta aprobación.");
      return false;
    } else {
      this.minutaMaemLeve.justificacion += ((this.objAprobacion.aprueba ? ' - APROBADO: ' : ' - RECHAZADO: ') + this.objAprobacion.observacionJustificacion);
      if (this.objAprobacion.aprueba) {
        this.minutaMaemLeve.iD_TipoEstadoMinuta = EstadoMinuta.aprobado;
        this.minutaMaemLeve.rechazado = false;
      } else {
        this.minutaMaemLeve.iD_TipoEstadoMinuta = EstadoMinuta.rechazado;
        this.minutaMaemLeve.rechazado = true;
      }
      return true;
    }
  }
  //#region Carga de Documentos
  uploadPDF() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if (fileUpload.files?.length && fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        this.fileName = file.name;

        if (file.type == 'application/pdf') {
          if (file.size <= MAXIMO_BYTES) {
            this.fileName = file.name;
            this.newMinutaMaemLeve.adjuntoJustificacionPATH = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.newMinutaMaemLeve.adjuntoJustificacion = reader.result?.toString().replace('data:application/pdf;base64,', '');
            };
          }
          else {
            fileUpload.value = '';
            this.showWarningMessage("El tamaño del archivo supera los 100MB.");
          }
        }
        else {
          fileUpload.value = '';
          this.showWarningMessage("El formato del archivo no es un PDF")
        }
      }
    }
    fileUpload.click();
  }

  abrirPDF(contenido: any) {
    if (this.newMinutaMaemLeve.adjuntoJustificacion != null) {
      this.srcPDF = "data:application/pdf;base64," + this.newMinutaMaemLeve.adjuntoJustificacion;
      this._modalService.open(contenido, { size: 'xl' });
    }
  }

  downloadPDF() : void {
    if (this.minutaMaemLeve.adjuntoJustificacionBase64 === '') {
      return;
    }

    const file = 'data:application/pdf;base64,' + this.minutaMaemLeve.adjuntoJustificacionBase64;
    const link = document.createElement("a");
    link.href = file;
    link.download = this.minutaMaemLeve.adjuntoJustificacionPATH;
    link.click();
  }

  dismissAllModal() {
    this._modalService.dismissAll();
  }
  //#endregion

  cancelarSolicitud() {
    this.ngOnInit();
  }

  showWarningMessage(message: string) {
    new InfoMessageComponent()
    Swal.fire({
      html:
        '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important;">' + message + '</p>',
      showCloseButton: true,
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      denyButtonColor: '#005ACB',
      cancelButtonColor: '#005ACB',
      confirmButtonText: '',
      denyButtonText: '',
      cancelButtonText: `No, regresar`,
    });
  }
}

enum EstadoMinuta {
  creado = 1,
  porAprobarSinObs = 4,
  aprobado = 6,
  rechazado = 7
}
