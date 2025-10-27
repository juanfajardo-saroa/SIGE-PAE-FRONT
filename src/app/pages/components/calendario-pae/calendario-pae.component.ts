import { Component, OnInit ,OnDestroy} from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { CostosApiService } from 'src/app/shared/services/costos-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-calendario-pae',
  //providers: [CostosApiService],
  templateUrl: './calendario-pae.component.html',
  styleUrls: ['./calendario-pae.component.scss']
})
export class CalendarioPaeComponent implements OnInit,OnDestroy {

  loadingVisible: boolean = false;
  iD_ETC: number = Number(localStorage.getItem('IdUbicacion') ?? 0);
  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  private subs = new Subscription() 
  iD_TipoModeloOperacion: number = 1;
  iD_Vigencia: number = this.itemVigencia?.id;
  anio: number = this.itemVigencia?.ano;
  esDisabled: boolean = true;
  dataPestanas: any = [
    { id: 1, descripcion: 'Calendario MAEM', texto: 'Calendario PAE MAEM', icono: '../assets/iconos_PAE/PNG/Iconos_PAE-195.png', tipo: 'MAEM', active: true },
    { id: 2, descripcion: 'Calendario MAER', texto: 'Calendario PAE MAER', icono: '../assets/iconos_PAE/PNG/Iconos_PAE-196.png', tipo: 'MAER', active: false },
    { id: 3, descripcion: 'Calendario PAEPI', texto: 'Calendario PAE PAEPI', icono: '../assets/iconos_PAE/PNG/Iconos_PAE-197.png', tipo: 'PAEPI', active: false },
  ];
  dataDias: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  dataSource: any = [
    { nombreMes: 'Enero', numeroMes: 0, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Febrero', numeroMes: 1, diaInicial: 1, diaFinal: this.anio % 4 == 0 ? 29 : 28, semanas: [], totalMes: 0 },
    { nombreMes: 'Marzo', numeroMes: 2, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Abril', numeroMes: 3, diaInicial: 1, diaFinal: 30, semanas: [], totalMes: 0 },
    { nombreMes: 'Mayo', numeroMes: 4, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Junio', numeroMes: 5, diaInicial: 1, diaFinal: 30, semanas: [], totalMes: 0 },
    { nombreMes: 'Julio', numeroMes: 6, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Agosto', numeroMes: 7, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Septiembre', numeroMes: 8, diaInicial: 1, diaFinal: 30, semanas: [], totalMes: 0 },
    { nombreMes: 'Octubre', numeroMes: 9, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
    { nombreMes: 'Noviembre', numeroMes: 10, diaInicial: 1, diaFinal: 30, semanas: [], totalMes: 0 },
    { nombreMes: 'Diciembre', numeroMes: 11, diaInicial: 1, diaFinal: 31, semanas: [], totalMes: 0 },
  ];
  dataPreSeleccionados: any = [];
  dataPreSeleccionadosBackup: any = [];
  dataFeriados: any = [];
  totalMeses: number = 0;
  itemPestana: any = this.dataPestanas[0];
  textoPAE: string = this.dataPestanas[0].tipo;

  permisos = {
    editar: false
  }

  constructor(
    private _costosApiService: CostosApiService,
    private _messageService: MessageService,
    private _seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.permisos.editar = this._seguridadService.getModulePermission(9, 'editar');

    this.getFechasSeleccionadasBD();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  getFechasSeleccionadasBD(){
    this.loadingVisible = true;
    this._costosApiService.GetETCDiasPAE(this.iD_ETC, this.iD_TipoModeloOperacion, this.iD_Vigencia).subscribe({
      next: response => {
        this.loadingVisible = false;

        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }

        this.dataPreSeleccionados = response.result;
        this.dataPreSeleccionadosBackup = response.result;
        this.establecerMeses();
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  seleccionarTab(item: any){
    this.itemPestana = { ...item }

    this.iD_TipoModeloOperacion = item.id;
    this.textoPAE = item.tipo;
    this.esDisabled = true;

    for(let i = 0; i < this.dataPestanas.length; i++){
      this.dataPestanas[i].active = this.dataPestanas[i].id == item.id ? true : false;
    }

    this.getFechasSeleccionadasBD();
  }

  sumatoriaTotalPorMes(mes: number){
    this.totalMeses = 0;
    this.dataSource[mes].totalMes = 0;

    for(let i = 0; i < this.dataSource[mes].semanas.length; i++){
      for(let j = 0; j < this.dataSource[mes].semanas[i].length; j++){
        if(this.dataSource[mes].semanas[i][j].esSelect && this.dataSource[mes].semanas[i][j].dia != null){
          this.dataSource[mes].totalMes++;
        }
      }
    }

    for(let i = 0; i < this.dataSource.length; i++){
      this.totalMeses += this.dataSource[i].totalMes;
    }
  }

  establecerMeses(){
    this.totalMeses = 0;

    for(let i = 0; i < this.dataSource.length; i++){
      this.dataSource[i].totalMes = 0;
      this.dataSource[i].semanas = [];

      let diaSemana = new Date(this.anio, this.dataSource[i].numeroMes, this.dataSource[i].diaInicial).getDay();

      if(diaSemana == 0){
        diaSemana = 7;
      }

      let semana = this.addCellTabla(diaSemana - 1);

      for(let j = this.dataSource[i].diaInicial; j <= this.dataSource[i].diaFinal; j++){
        let fecha = new Date(this.anio, this.dataSource[i].numeroMes, j);
        let esSelect = this.validarPreSeleccionado(fecha);
        semana.push({
          dia: j,
          fecha: fecha,
          esFeriado: diaSemana == 7 ? true : this.validarFeriado(fecha),
          esSelect: esSelect
        });

        if(esSelect){
          this.dataSource[i].totalMes++;
        }

        diaSemana++;

        if(diaSemana > 7){
          this.dataSource[i].semanas.push(semana);
          diaSemana = 1;
          semana = [];
        }
      }

      this.totalMeses += this.dataSource[i].totalMes;

      if(diaSemana > 1){
        for(let j = 0; j < 8 - diaSemana; j++){
          semana.push({
            dia: null,
            fecha: new Date(),
            esFeriado: false,
            esSelect: false
          });
        }
        this.dataSource[i].semanas.push(semana);
      }

    }
  }

  validarPreSeleccionado(fecha: Date){
    for(let i = 0; i < this.dataPreSeleccionados.length; i++){
      let fechaSel = new Date(this.dataPreSeleccionados[i].fecha);
      if(fechaSel.getDate() == fecha.getDate() &&
         fechaSel.getMonth() == fecha.getMonth() &&
         fechaSel.getFullYear() == fecha.getFullYear()){
        return true;
      }
    }

    return false;
  }

  validarFeriado(fecha: Date){
    for(let i = 0; i < this.dataFeriados.length; i++){
      if(this.dataFeriados[i] == fecha){
        return true;
      }
    }

    return false;
  }

  seleccionarDia(dia: any, numeroMes: number){
    if(dia.dia != null && !dia.esFeriado && !this.esDisabled){
      dia["esSelect"] = dia["esSelect"] == true ? false : true;
      this.sumatoriaTotalPorMes(numeroMes);
    }
  }

  addCellTabla(cant: number){
    let data = [];
    for(let i = 0; i < cant; i++){
      data.push({
        dia: null,
        fecha: new Date(),
        esFeriado: false,
        esSelect: false
      });
    }

    return data;
  }

  getFechasSeleccionadas(){
    let data = [];

    for(let i = 0; i < this.dataSource.length; i++){
      for(let j = 0; j < this.dataSource[i].semanas.length; j++){
        for(let k = 0; k < this.dataSource[i].semanas[j].length; k++){
          if(this.dataSource[i].semanas[j][k].esSelect){
            data.push({
              iD_ETC: this.iD_ETC,
              iD_TipoModeloOperacion: this.iD_TipoModeloOperacion,
              fecha: this.dataSource[i].semanas[j][k].fecha,
              estado: true,
              auditoria: LocalStorage.getAuditoria('Crear'),
              vigencia: this.iD_Vigencia
            });
          }
        }
      }
    }

    return data;
  }

  editarCalendario(){
    this.esDisabled = false;
  }

  guardarCalendario(){
    let listFechas = this.getFechasSeleccionadas();

    if(!(listFechas.length > 0)){
      this._messageService.showWarning('Debe seleccionar al menos una fecha.', 'top center', 5000);
      return; 
    }

    this.loadingVisible = true;
    this._costosApiService.AddETCDiasPAE(listFechas).subscribe({
      next: response => {
        this.loadingVisible = false;
        if(!response.success){
          this._messageService.showError('ERROR: ' + response.error, 'top center', 5000);
          return;
        }
        this.esDisabled = true;
        this._messageService.showInfo('Las fechas han sido guardadas correctamente.', 'top center', 5000);
      },
      error: error => {
        this.loadingVisible = false;
        this._messageService.showError('ERROR: ' + error, 'top center', 5000);
      }
    });
  }

  cancelarCalendario(){
    this.dataPreSeleccionados = this.dataPreSeleccionadosBackup;
    this.esDisabled = true;
    this.establecerMeses();
  }

  replicarDiasCalendario(){
    this.loadingVisible = true;

    this._costosApiService.ReplicarDiasCalendario(this.iD_ETC, this.iD_TipoModeloOperacion, this.iD_Vigencia)
    .subscribe(response => {
      if(response.success){
        if(response.result > 0){
          this.loadingVisible = false;
          this._messageService.showInfo('Los días han sido replicados correctamente.', 'top center', 5000);
          this.getFechasSeleccionadasBD();
        }
        else{ this._messageService.showError('Hubo error replicando.', 'top center', 5000); }
      }
      else{ this._messageService.showError('ERROR: ' + response.error, 'top center', 5000); }
    });
  }

}
