import { Component, OnInit ,OnDestroy} from '@angular/core';
import { AsignacionRecursosApiService  } from '../../../../../../shared/services/asignacion-recursos-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-costos-cobertura-financiera',
  //providers: [ AsignacionRecursosApiService ],
  templateUrl: './costos-cobertura-financiera.component.html',
  styleUrls: ['./costos-cobertura-financiera.component.sass']
})
export class CostosCoberturaFinancieraComponent implements OnInit,OnDestroy {

  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");

  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;
  anio: number = this.itemVigencia?.ano;
  private subs = new Subscription() 
  

  loadingVisible: boolean = false;
  ingresosAsignados: number = 0;
  ingresosDisponibles: number = 0;
  vigenciaActual: number = 0;
  inejecuciones: number = 0;

  dataSource: any;
  totalIngresosRecaudados: number = 0;
  totalIngresosReconocidos: number = 0;
  totalIngresos: number = 0;
  dataPestanas: any = [
    { id: 1, descripcion: 'Fuentes MAEM', tipo: 'MAEM', active: true },
    { id: 2, descripcion: 'Fuentes MAER', tipo: 'MAER', active: false },
    { id: 3, descripcion: 'Fuentes PAEPI', tipo: 'PAEPI', active: false },
  ];
  tipoSeleccionadoFuente = this.dataPestanas[0].id;
  tipoSeleccionadoFuenteTexto = this.dataPestanas[0].tipo;

  permisos = {
    editar: false
  }

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private _asignacionRecursosApiService : AsignacionRecursosApiService,
    private messageService: MessageService,
    private _seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.permisos.editar = this._seguridadService.getModulePermission(11, 'editar');

    this.get_PresupuestoGeneralETC();
    this.get_FuentesFinanciacionPorETCyTipo();
  }
  
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  consultarResoluciones(contenido: any){
    this.router.navigate(['/asignacionrecursos']);
    //this.modalService.open(contenido, { size: 'xl' });
  }

  get_PresupuestoGeneralETC(){
    this.loadingVisible = true;

    this._asignacionRecursosApiService.get_PresupuestoGeneralETC(this.idETC, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if(!response.success){
          this.messageService.showError(response.error, 'top center', 5000);
          return;
        }

        if(response.result.length > 0){
          this.ingresosAsignados = response.result[0].ingresosAsignados;
          this.ingresosDisponibles = response.result[0].ingresosDisponibles;
          this.vigenciaActual = response.result[0].vigenciaActual;
          this.inejecuciones = response.result[0].inejecuciones;
        }
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError(error, 'top center', 5000);
      }
    });
  }

  toggleOnOff(item: any){
    for(let i = 0; i < this.dataSource.length; i++){
      if(this.dataSource[i].idIngreso == item.idIngreso){
        this.dataSource[i].toggle = this.dataSource[i].toggle == true ? false : true;
      }
      else{
        this.dataSource[i].toggle = false;
      }
    }
  }

  get_FuentesFinanciacionPorETCyTipo(){
    this.loadingVisible = true;

    this._asignacionRecursosApiService.get_FuentesFinanciacionPorETCyTipo(this.idETC, this.tipoSeleccionadoFuente, this.idVigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if(!response.success){
          this.messageService.showError(response.error, 'top center', 5000);
          return;
        }

        this.dataSource = response.result;
        for(let i = 0; i < response.result.length; i++){
          this.dataSource[i].isDisabledRecaudado = false;
          this.dataSource[i].isDisabledReconocido = false;
        }

        this.calcularTotalesFuente();
      },
      error: error => {
        this.loadingVisible = false;
        this.messageService.showError(error, 'top center', 5000);
      }
    });
  }

  changeDisabledETC(name: string, det: any, value: boolean, nameInput: string){
    if(this.permisos.editar){
      det[name] = value;

      if(value){
        $("#" + nameInput + det.idFuenteIngreso).removeAttr('hidden');
        $("#" + nameInput + det.idFuenteIngreso).focus();
      }
      else{
        $("#" + nameInput + det.idFuenteIngreso).attr('hidden', 'hidden');
      }
    }
  }

  changeInputModel(name: string, value: any, item: any, inputName: string){
    if(!value || parseFloat(value) < 0){
      $("#" + inputName + item.idFuenteIngreso).val(0);
      value = 0;
    }

    item[name] = value;
    this.calcularTotalesFuente();
  }

  calcularTotalesFuente(){
    this.totalIngresosRecaudados = 0;
    this.totalIngresosReconocidos = 0;
    this.totalIngresos = 0;

    for(let i = 0; i < this.dataSource.length; i++){
      let totalIngresosRecaudados = 0;
      let totalIngresosReconocidos = 0;

      for(let j = 0; j < this.dataSource[i].listDetalle.length; j++){
        this.dataSource[i].listDetalle[j].total =
          this.dataSource[i].listDetalle[j].ingresosRecaudados +
          this.dataSource[i].listDetalle[j].ingresosReconocidos;

        totalIngresosRecaudados += this.dataSource[i].listDetalle[j].ingresosRecaudados;
        totalIngresosReconocidos += this.dataSource[i].listDetalle[j].ingresosReconocidos;
      }

      this.dataSource[i].ingresosRecaudados = totalIngresosRecaudados;
      this.dataSource[i].ingresosReconocidos = totalIngresosReconocidos;
      this.dataSource[i].total = totalIngresosRecaudados + totalIngresosReconocidos;

      this.totalIngresosRecaudados += totalIngresosRecaudados;
      this.totalIngresosReconocidos += totalIngresosReconocidos;
    }

    this.totalIngresos = this.totalIngresosRecaudados + this.totalIngresosReconocidos;
  }

  public cargarFuentesFinanciera(item: any) {
    this.tipoSeleccionadoFuente = item.id;
    this.tipoSeleccionadoFuenteTexto = item.tipo;

    for(let i = 0; i < this.dataPestanas.length; i++){
      this.dataPestanas[i].active = this.dataPestanas[i].id == item.id ? true : false;
    }

    this.get_FuentesFinanciacionPorETCyTipo();
  }

  guardarValoresFuentes(){
    this.loadingVisible = true;

    let data = [];
    for(let i = 0; i < this.dataSource.length; i++){
      for(let j = 0; j < this.dataSource[i].listDetalle.length; j++){
        data.push({
          iD_ETC: this.dataSource[i].iD_ETC,
          iD_FuenteIngreso: this.dataSource[i].listDetalle[j].idFuenteIngreso,
          iD_TipoModeloOperacion: this.dataSource[i].iD_TipoModeloOperacion,
          iD_Vigencia: this.dataSource[i].iD_Vigencia,
          iD_TipoIngreso: this.dataSource[i].listDetalle[j].iD_TIPORecaudados,
          valor: this.dataSource[i].listDetalle[j].ingresosRecaudados,
          auditoria: LocalStorage.getAuditoria('Crear'),
        });

        data.push({
          iD_ETC: this.dataSource[i].iD_ETC,
          iD_FuenteIngreso: this.dataSource[i].listDetalle[j].idFuenteIngreso,
          iD_TipoModeloOperacion: this.dataSource[i].iD_TipoModeloOperacion,
          iD_Vigencia: this.dataSource[i].iD_Vigencia,
          iD_TipoIngreso: this.dataSource[i].listDetalle[j].iD_TIPOReconocidos,
          valor: this.dataSource[i].listDetalle[j].ingresosReconocidos,
          auditoria: LocalStorage.getAuditoria('Crear'),
        });
      }
    }

    if(data.length > 0){
      this._asignacionRecursosApiService.post_ActualizacionIngresos(data)
      .subscribe(response => {
        if(response.success){
          this.loadingVisible = false;

          this.messageService.showInfo('Los datos han sido guardados correctamente.', 'top center');
          this.get_PresupuestoGeneralETC();
          this.get_FuentesFinanciacionPorETCyTipo();
        }
        else{
          this.messageService.showError(response.error, 'top center');
          this.loadingVisible = false;
        }
      });
    }
  }

}
