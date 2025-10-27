import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActaInicioModel } from 'src/app/shared/model/ActaInicio';
import { ActaInicioService } from 'src/app/shared/services/ActaInicio.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { Observable } from 'rxjs';
import { PA_ActaInicioGetAllWithRelationService } from 'src/app/shared/services/PA_ActaInicioGetAllWithRelation.services';

@Component({
  selector: 'app-plan-alistamiento-inicio-operacion',
  templateUrl: './plan-alistamiento-inicio-operacion.component.html',
  styleUrls: ['./plan-alistamiento-inicio-operacion.component.scss']
})
export class PlanAlistamientoInicioOperacionComponent implements OnInit {
  @Output() stateIniChanged = new EventEmitter<number>();

  alertOpened: boolean = false;
  actaInicioForm: FormGroup;
  objectFormActaInicioTemp = <ActaInicioModel>{};
  divipolaList: PA_DivipolasGetbyETCModel[];
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  idContrato = 0;
  numContrato = "";
  fiContrato = "";
  ffContrato = "";
  nomOperador = "";
  lugarCedulaSupervisor = "";
  cedulaSupervisor = "";
  lugarCedulaRepresentante = "";
  fechaActa = new Date();
  dateString = "";
  DivipolasList: DivipolasModel[];
  isEdit = false;
  nombreUbicacion = "";
  estadoInicioOperacion = false;
  idActual=0;
  idPlan=0;
  public storageSubObs: Observable<any>
  constructor(
    private mensajeServicio: MessageService,
    private fb: FormBuilder,
    private actaInicioService: ActaInicioService,
    private divipolasService: DivipolasService,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
    private seguridadService: SeguridadService,
    private _PA_ActaInicioGetAllWithRelationService:PA_ActaInicioGetAllWithRelationService,
  ) {
    this.nombreUbicacion = localStorage.getItem('UbicacionShort');
    this.idContrato = Number(localStorage.getItem('idCpl'));
    this.numContrato = localStorage.getItem('numCpl');
    this.fiContrato = localStorage.getItem('fechaInicialCpl').slice(0, 10);
    this.ffContrato = localStorage.getItem('fechaFinalCpl').slice(0, 10);
    this.nomOperador = localStorage.getItem('nombreOperador'); 
    this.idPlan = Number(localStorage.getItem('idPlan'));
    this.getActaByContrato();
    this.actaInicioForm = this.fb.group({
      NumeroContrato: [this.numContrato, Validators.required],
      FechaActa: ['', Validators.required],
      Supervisor: ['', Validators.required],
      CedulaSupervisor: ['', Validators.required],
      LugarCedulaSupervisor: ['', Validators.required],
      RepresentanteOperador: ['', Validators.required],
      CedulaRepresentante: ['', Validators.required],
      LugarCedulaRepresentante: ['', Validators.required],
      FechaInicioContrato: [this.fiContrato, Validators.required],
      FechaFinContrato: [this.ffContrato, Validators.required],
      FechaInicioOperacion: ['', Validators.required],
      UrbanoZonaNorte: ['', Validators.required],
      UrbanoZodeMontesMaria: ['', Validators.required],
      UrbanoZodeMojana: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.onStorageChange();
    this.storageSubObs = this.mensajeServicio.storageSub.asObservable();
    this.storageSubObs.subscribe((data:string) => {
      this.onStorageChange();
    })
    this.fillSelects();
  }

  onStorageChange() {
    let PlanRutasState = localStorage.getItem("PlanRutasState")
    let docState = localStorage.getItem("docState")
    let cicState = localStorage.getItem("cicState")
    if(PlanRutasState != "Aprobada" || docState != "Aprobada" || cicState != "Aprobada" ){
      this.alertOpened = true;
    } else {
      this.alertOpened = false;
    }
  }

  getActaByContrato() {
    this._PA_ActaInicioGetAllWithRelationService.getPA_ActaInicioGetAllWithRelationList(this.idContrato).subscribe(
      (response: any) => {
        if(response.length==0){}else{
        this.idActual = response[0].id;
        this.actaInicioForm.get('FechaActa').setValue(response[0].fechaActa ? response[0].fechaActa.slice(0, 10):null);
        this.actaInicioForm.get('Supervisor').setValue(response[0].nombreSupervisor);
        this.actaInicioForm.get('CedulaSupervisor').setValue(response[0].cedulaSupervisor);
        this.actaInicioForm.get('LugarCedulaSupervisor').setValue(Number(response[0].lugarCedulaSupervisor));
        this.actaInicioForm.get('RepresentanteOperador').setValue(response[0].nombreRepresentanteLegalOperador);
        this.actaInicioForm.get('CedulaRepresentante').setValue(response[0].cedulaRepresentanteOperador);
        this.actaInicioForm.get('LugarCedulaRepresentante').setValue(Number(response[0].lugarCedulaRepresentante));
        this.actaInicioForm.get('FechaInicioOperacion').setValue(response[0].fechaInicioOPeracionAutorizada ? response[0].fechaInicioOPeracionAutorizada.slice(0, 10):null);
        this.actaInicioForm.get('UrbanoZonaNorte').setValue(response[0].menu1);
        this.actaInicioForm.get('UrbanoZodeMontesMaria').setValue(response[0].menu2);
        this.actaInicioForm.get('UrbanoZodeMojana').setValue(response[0].menu3);
        this.fechaActa = new Date(response[0].fechaInicioOPeracionAutorizada);
        this.dateString = this.fechaActa.getDate() + " de " + this.getStringMonth(this.fechaActa.getMonth()) + " de " + this.fechaActa.getFullYear();
        this.estadoInicioOperacion = response[0].estadoInicioOperacion;
        this.divipolasService.getDivipolasList().subscribe(
          (res: any) => {
            this.DivipolasList = res;
            this.lugarCedulaSupervisor = this.DivipolasList.find(element => element.id == Number(response[0].lugarCedulaSupervisor)) ? this.DivipolasList.find(element => element.id == Number(response[0].lugarCedulaSupervisor)).nombre : "";
            this.lugarCedulaRepresentante = this.DivipolasList.find(element => element.id == Number(response[0].lugarCedulaRepresentante)) ? this.DivipolasList.find(element => element.id == Number(response[0].lugarCedulaRepresentante)).nombre : "";
            this.actaInicioForm.get('CedulaSupervisor').setValue(response[0].cedulaSupervisor + " de " +  this.lugarCedulaSupervisor);
            this.actaInicioForm.get('CedulaRepresentante').setValue(response[0].cedulaRepresentanteOperador + " de " + this.lugarCedulaRepresentante);
          },
          (err) => {
          }
        );}
      },
      (err) => {
      }
    );
  }
  getStringMonth(month: number):string {
    let months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    return months[month];
  }

  fillSelects() {
    this.divipolasService.getDivipolasList().subscribe(
      (response: any) => {
        this.DivipolasList = response;
      },
      (err) => {
      }
    );
  }

  onKeyNumber(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  onKeyNumber2(e: KeyboardEvent) {
    if (e.keyCode != 8 && e.keyCode != 9 && e.keyCode != 32) {
      var patt = new RegExp("^[0-9a-zA-Z]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  saveForm(finalState: boolean) {
    finalState ? this.stateIniChanged.emit(4) : this.stateIniChanged.emit(2);
    if(this.idActual>0){
      this.updateForm(this.idActual, finalState);
    } else {
      this.saveFirstForm(finalState);
    }
  }

  saveFirstForm(finalState: boolean) {
    this.objectFormActaInicioTemp.FechaActa = this.actaInicioForm.get('FechaActa').value;
    this.objectFormActaInicioTemp.NombreSupervisor = this.actaInicioForm.get('Supervisor').value;
    this.objectFormActaInicioTemp.CedulaSupervisor = this.actaInicioForm.get('CedulaSupervisor').value;
    this.objectFormActaInicioTemp.LugarCedulaSupervisor = this.actaInicioForm.get('LugarCedulaSupervisor').value;
    this.objectFormActaInicioTemp.NombreRepresentanteLegalOperador = this.actaInicioForm.get('RepresentanteOperador').value;
    this.objectFormActaInicioTemp.CedulaRepresentanteOperador = this.actaInicioForm.get('CedulaRepresentante').value;
    this.objectFormActaInicioTemp.LugarCedulaRepresentante = this.actaInicioForm.get('LugarCedulaRepresentante').value;
    this.objectFormActaInicioTemp.FechaInicioOPeracionAutorizada = this.actaInicioForm.get('FechaInicioOperacion').value;
    this.objectFormActaInicioTemp.Menu1 = this.actaInicioForm.get('UrbanoZonaNorte').value;
    this.objectFormActaInicioTemp.Menu2 = this.actaInicioForm.get('UrbanoZodeMontesMaria').value;
    this.objectFormActaInicioTemp.Menu3 = this.actaInicioForm.get('UrbanoZodeMojana').value;
    this.objectFormActaInicioTemp.ID_PlanAlistamiento = this.idPlan;
    this.objectFormActaInicioTemp.ID_Contrato = this.idContrato;
    this.objectFormActaInicioTemp.ID_CicloMenu = 304;
    this.objectFormActaInicioTemp.EstadoInicioOperacion = finalState;
    this.actaInicioService.addActaInicio(this.objectFormActaInicioTemp).subscribe(
      (response: any) => {
        this.getActaByContrato();
        this.isEdit = false;
      },
      (err) => {
      }
    );
    this.registrarNotificacionService.registerNotification("Se ha iniciado la operación en el acta de inicio", "Operadores - Administrador");
    this.registrarNotificacionService.registerNotification("Se ha iniciado la operación en el acta de inicio", "Operadores - Delegado");
  }

  updateForm(id: any, finalState:boolean) {
    this.objectFormActaInicioTemp.id = id;
    this.objectFormActaInicioTemp.FechaActa = this.actaInicioForm.get('FechaActa').value;
    this.objectFormActaInicioTemp.NombreSupervisor = this.actaInicioForm.get('Supervisor').value;
    this.objectFormActaInicioTemp.CedulaSupervisor = this.actaInicioForm.get('CedulaSupervisor').value;
    this.objectFormActaInicioTemp.LugarCedulaSupervisor = this.actaInicioForm.get('LugarCedulaSupervisor').value;
    this.objectFormActaInicioTemp.NombreRepresentanteLegalOperador = this.actaInicioForm.get('RepresentanteOperador').value;
    this.objectFormActaInicioTemp.CedulaRepresentanteOperador = this.actaInicioForm.get('CedulaRepresentante').value;
    this.objectFormActaInicioTemp.LugarCedulaRepresentante = this.actaInicioForm.get('LugarCedulaRepresentante').value;
    this.objectFormActaInicioTemp.FechaInicioOPeracionAutorizada = this.actaInicioForm.get('FechaInicioOperacion').value;
    this.objectFormActaInicioTemp.Menu1 = this.actaInicioForm.get('UrbanoZonaNorte').value;
    this.objectFormActaInicioTemp.Menu2 = this.actaInicioForm.get('UrbanoZodeMontesMaria').value;
    this.objectFormActaInicioTemp.Menu3 = this.actaInicioForm.get('UrbanoZodeMojana').value;

    this.objectFormActaInicioTemp.ID_PlanAlistamiento = this.idPlan;
    this.objectFormActaInicioTemp.ID_Contrato = this.idContrato;
    this.objectFormActaInicioTemp.ID_CicloMenu = 304;
    this.objectFormActaInicioTemp.EstadoInicioOperacion = finalState;


    this.actaInicioService.updateActaInicio(this.objectFormActaInicioTemp).subscribe(
      (response: any) => {
        this.getActaByContrato();
        this.isEdit = false;
      },
      (err) => {
      }
    );
  }

  onSubmitClick() {
    this.saveForm(true);
  }

  onEditClick() {
    this.actaInicioForm.get('CedulaSupervisor').setValue(this.actaInicioForm.get('CedulaSupervisor').value.replace(/\D/g, ""));
    this.actaInicioForm.get('CedulaRepresentante').setValue(this.actaInicioForm.get('CedulaRepresentante').value.replace(/\D/g, ""));
    this.isEdit = true;
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
