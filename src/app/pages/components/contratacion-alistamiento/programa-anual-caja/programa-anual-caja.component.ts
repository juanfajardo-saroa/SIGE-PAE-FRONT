import { formatDate } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { InfoMessageComponent } from 'src/app/shared/component/info-message/info-message.component';
import Swal from 'sweetalert2';
import { AsignacionRecursosApiService } from 'src/app/shared/services/asignacion-recursos-api.service';
import { ProgramaAnualCajaService } from '../../../../shared/services/programa-anual-caja.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';

@Component({
  selector: 'app-programa-anual-caja',
  //providers: [ ProgramaAnualCajaService ],
  templateUrl: './programa-anual-caja.component.html',
  styleUrls: ['./programa-anual-caja.component.sass'],

})
export class ProgramaAnualCajaComponent implements OnInit, OnDestroy {

  public idETC: number = Number(localStorage.getItem('IdUbicacion') == null ? "0" : localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  public dataSource: any;
  public dataOrigen: any;
  ingresosAsignados: number = 0;
  public totalTransferido: number = 0;
  public totalSolicitado: number = 0;
  public totalDiferencia: number = 0;
  public editar: boolean = false;
  public idETcURL: number = 0;
  public ETCurl: string;
  public loadingVisible: boolean = false;
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;
  anio: number = this.itemVigencia?.ano;
  public ETC: string = (localStorage.getItem('Ubicacion'));

  constructor(
    private _programaAnualCajaService: ProgramaAnualCajaService,
    private router: Router,
    private _router: ActivatedRoute,
    private messageService: MessageService,
    private _asignacionRecursosApiService: AsignacionRecursosApiService,
    private seguridadService: SeguridadService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
  ) {
  }

  ngOnInit(): void {




    this._router.queryParams.subscribe(params => {
      this.idETcURL = +params.id;

      if (this.idETcURL != null || this.idETcURL != 0 || params.id == undefined) {
        this.idETC = this.idETcURL;

        //this.ETC=this.idETcURL.toString();
      }
      else {
        this.ETC = (localStorage.getItem('Ubicacion'));
        this.idETC = Number(localStorage.getItem('IdUbicacion') == null ? "0" : localStorage.getItem('IdUbicacion'))
      }


      this.get_PresupuestoGeneralETC()
      this.get_PlanAnualCaja();
    });





  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  get_PresupuestoGeneralETC() {
    this.loadingVisible = true;
    if (this.idETC == undefined || this.idETC == null || Number.isNaN(this.idETC)) {
      this.idETC = Number(localStorage.getItem('IdUbicacion') == null ? "0" : localStorage.getItem('IdUbicacion'))
    }

    this._asignacionRecursosApiService.get_PresupuestoGeneralETC(this.idETC, this.idVigencia).subscribe({
      next: response => {
        if (!response.success) {
          this.messageService.showError(response.error, 'top center', 5000);
          return;
        }

        if (response.result.length > 0) {
          this.ingresosAsignados = response.result[0].ingresosAsignados;
        }
      },
      error: error => {
        this.messageService.showError(error, 'top center', 5000);
      }
    });
    this.loadingVisible = false;
  }


  get_PlanAnualCaja() {

    if (this.idETC == undefined || this.idETC == null || Number.isNaN(this.idETC)) {
      this.idETC = Number(localStorage.getItem('IdUbicacion') == null ? "0" : localStorage.getItem('IdUbicacion'))
    }

    this._programaAnualCajaService.get_PlanAnualCaja(this.idETC, this.idVigencia)
      .subscribe(response => {

        for (let item of response.result) {

          item.mesTexto = this.mesTexto(item.mes);
          item.fechaGiro = item.fechaGiro == "1900-01-01T00:00:00" ? '' : formatDate(item.fechaGiro, 'dd/MM/yyyy', 'en');
          item.diferencia = item.giroConfirmado < 1 ? 0 : item.giroConfirmado - item.giroProyectado;
          item.editar = (item.giroProyectado == 0 && item.estado == 0) ? true : false;
          item.giroProyectado = item.giroProyectado > 0 ? item.giroProyectado : '';
        }
        this.dataSource = response.result;
        this.calcularTotalesFuente();
      });
  }

  calcularTotalesFuente() {
    this.totalTransferido = 0;
    this.totalSolicitado = 0;
    this.totalDiferencia = 0;
    for (let item of this.dataSource) {
      //if (item.estado != 1 ) {
        this.totalTransferido = this.totalTransferido + item.giroConfirmado;
        if (item.giroProyectado !='') {
            this.totalSolicitado = this.totalSolicitado + item.giroProyectado;
        }
        this.totalDiferencia = this.totalDiferencia + item.diferencia;
      //}
    }
  }

  EditarPac() {
    this.editar = true;
  }

  cancelarPac() {
    this.get_PlanAnualCaja();
    this.editar = false;
  }

  guardarPac() {
    this.loadingVisible = true;
    this._programaAnualCajaService.get_PlanAnualCaja(this.idETC, this.idVigencia)
      .subscribe(response => {
        this.dataOrigen = response.result;
        var cantidad = this.dataSource.length;
        for (let i = 0; i < cantidad; i++) {
          if (this.dataSource[i].giroProyectado != this.dataOrigen[i].giroProyectado) {
            this.dataOrigen[i].estado = 1;
            this.dataOrigen[i].giroProyectado = this.dataSource[i].giroProyectado;
          }
        }
        this._programaAnualCajaService.post_PlanAnualCaja(this.dataOrigen)
          .subscribe(response => {
            if (response.success) {
              this.get_PlanAnualCaja();
              this.editar = false;
              this.messageService.showInfo('Registros actualizados con exito', 'top center');
              this.loadingVisible = false;
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Administrador General SiPAE (Administrador UApA)", "/PACUAPA");
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Oficina Asesora Jurídica", "/PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Oficina Asesora Control Interno", "/PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Dirección General", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Oficina Asesora Comunicaciones UApA", "/PACUAPA");
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Subdirección de Información", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Oficina Asesora Planeación", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Subdirección Técnica de Gestión Corporativa", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Subdirección General", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
              this.registrarNotificacionService.registerNotificationWithUrl("Se ha modificado el plan anual de caja " + this.ETC, "Subdirección Técnica de Análisis, Calidad e Innovación", "PACETC?id=" + localStorage.getItem('IdUbicacion') + "&idubicacion=" + localStorage.getItem('IdUbicacion'));
            } else {
              this.messageService.showError('Error actualizando los registros ' + response.error, 'top center');
              this.loadingVisible = false;
            }
          });
      });
  }

  consultarResoluciones() {
    this.router.navigate(['/asignacionrecursos']);
  }

  guardarNotificar() {
    Swal.fire({
      showCloseButton: true,
      html:
      '<img style="height: 30px !important; position: absolute !important; top: 10% !important; right: 20px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" width="auto">' +
      '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem;">¿Está seguro de que desea notificar los cambios  ' +
        'en el PAC a la UAPA? </p>',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonColor: '#005ACB',
      cancelButtonColor: '#005ACB',
      confirmButtonText: 'Si, notificar a la UAPA',
      denyButtonText: 'Si, notificar a la UAPA',
      cancelButtonText: `No, regresar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        //Swal.fire('Saved!', '', 'success')
        this.actualizarDatos();
        this.guardarPac();

      }

    });
  }

  actualizarDatos() {
    this._programaAnualCajaService.get_PlanAnualCaja(this.idETC, this.idVigencia)
      .subscribe(response => {

        this.dataOrigen = response.result;
        var cantidad = this.dataSource.length;
        for (let i = 0; i < cantidad; i++) {

          if (this.dataSource[i].giroProyectado != this.dataOrigen[i].giroProyectado) {
            this.dataOrigen[i].estado = 1;
            this.dataOrigen[i].giroProyectado = this.dataSource[i].giroProyectado;
          }
        }
      });
  }

  soloNumeros(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  mesTexto(mes: number): string {

    var mesText = '';

    switch (mes) {

      case 1:
        mesText = 'Enero'
        break;
      case 2:
        mesText = 'Febrero'
        break;
      case 3:
        mesText = 'Marzo'
        break;
      case 4:
        mesText = 'Abril'
        break;
      case 5:
        mesText = 'Mayo'
        break;
      case 6:
        mesText = 'Junio'
        break;
      case 7:
        mesText = 'Julio'
        break;
      case 8:
        mesText = 'Agosto'
        break;
      case 9:
        mesText = 'Septiembre'
        break;
      case 10:
        mesText = 'Octubre'
        break;
      case 11:
        mesText = 'Noviembre'
        break;
      case 12:
        mesText = 'Diciembre'
        break;
    }
    return mesText;
  }


  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

}
