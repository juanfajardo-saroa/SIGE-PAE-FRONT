import { Component, OnInit ,OnDestroy, HostListener} from '@angular/core';
//import { empty } from 'rxjs';
import { AccesosApiService } from '../../../../../../shared/services/acceso-api.service';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { Subscription } from 'rxjs';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';

export interface ComboElemento {
  id: number;
  nombre: string;
}

export interface TrayectoElemento {
  trayectoId: number;
  sedeId: number;
  centroAcopioId: number;
  tipoETCId: number;
  numPosicion: number;
  destino: string;
  cabecera: number | null;
  costo: number;
  kilometros: number;
  horas: number;
  medioTransporteId: number;
  centroAcopio: number | null;
  tipoTransporteId: number;
  iconName: string;
  readonly: boolean;
  editInfo: boolean;
  addInfo: boolean;
}

const ELEMENT_TRAYECTO: TrayectoElemento = {
  trayectoId: 0,
  sedeId: 0,
  centroAcopioId: 0,
  tipoETCId: 0,
  numPosicion: 0,
  destino: '',
  cabecera: null,
  costo: 0,
  kilometros: 0,
  horas: 0,
  medioTransporteId: 0,
  centroAcopio: null,
  tipoTransporteId: 0,
  iconName: '',
  readonly: false,
  editInfo: false,
  addInfo: false,
};

@Component({
  selector: 'app-trayectos',
  //providers: [AccesosApiService],
  templateUrl: './trayectos.component.html',
  styleUrls: ['./trayectos.component.scss']
})
export class TrayectosComponent implements OnInit,OnDestroy {

  private sub: any;

  idETC = Number(localStorage.getItem('IdUbicacion'));
  private subs = new Subscription()
  itemInfo: any;
  sedeId!: number;
  controAcopioId!: number;
  tipoEtcId: number = 1;
  dataTrayectoSede: any = {
    sede: ''
  };
  dataTiposTransportes: any = [];
  dataVehiculos: any = [];
  dataSource: any = [];
  totalTrayectos: number = 0;
  itemDataSource = ELEMENT_TRAYECTO;
  indice = 0;
  modoOp = 0;
  idTab = 1;
  elementSeleccione = {
    id: 0, nombre: 'Seleccione'
  }

  alturaTrayecto = 167;

  //filterForm: FormGroup;
  nombreSede: string;
  nombreInstitucion: string;
  nombreMunicipio: string;
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  divipolaList: PA_DivipolasGetbyETCModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  selectSedesList: SedesModel[];
  selMunicipio: number;
  currentVig = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  currentVigNom='';
  PriorizadaPAEList = [
    { id: 1, nombre: "Si" },
    { id: 2, nombre: "No" },
  ];

  filterForm: FormGroup = this._formBuilder.group({
    sede: [0],
  });

  PA_InstitucionEducativaRequest:PA_InstitucionEducativaGetAllWithRelationRequest={};
  constructor(
    private _formBuilder: FormBuilder,
    private _accesosApiService: AccesosApiService,
    private route: ActivatedRoute,
    public router: Router,
    private seguridadService: SeguridadService,
    private messageService: MessageService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private _PA_InstitucionEducativaGetAllWithRelationService:PA_InstitucionEducativaGetAllWithRelationService,
  ) {
    this.currentVigNom =this.currentVig.nombre;
    this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
      },
      (err) => {
      }
    );
  }

  ngOnInit(): void {
    this.detectScreenSize();
    this.sub = this.route.queryParams.subscribe(params => {
      this.sedeId = +params['id'];
      this.controAcopioId = +params['centro'];
      this.tipoEtcId = +params['tipo'];
      this.idTab = +params['tab'];
      this.selMunicipio = this.controAcopioId;
      this.nombreSede = localStorage.getItem('ps');
      this.nombreMunicipio = localStorage.getItem('pm');
      this.nombreInstitucion = localStorage.getItem('pi');

      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });



    this.getList_TipoTransporte();
    this.getList_MedioTransporte();
    this.get_TrayectoPorDefecto();
    this.get_TrayectoXSede();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    const anchoPantalla = document.documentElement.clientWidth;

    if (anchoPantalla < 1300 && anchoPantalla > 726) {
      this.alturaTrayecto = 185;
    } else if (anchoPantalla < 726 && anchoPantalla > 700) {
      this.alturaTrayecto = 195;
    } else if (anchoPantalla < 700) {
      this.alturaTrayecto = 210;
    }
     else {
      this.alturaTrayecto = 167;
    }

  }


  // boton de regresar
  RegresarInfraestura() {
    this.router.navigateByUrl('/Sedes?tab=1');
  }

  BuscarSede(){
    //this.sedeId = this.filterForm.get('sede').value();
    this.get_TrayectoXSede();
    this.controAcopioId = this.dataTrayectoSede.centroAcopioId 
    this.tipoEtcId  = this.dataTrayectoSede.tipoETCId
    this.get_TrayectoPorDefecto();
    
  }

  getList_TipoTransporte() {
    this._accesosApiService.getList_TipoTransporte()
      .subscribe(response => {
        this.dataTiposTransportes = response.result;
      });
  }

  getList_MedioTransporte() {
    this._accesosApiService.getList_MedioTransporte()
      .subscribe(response => {
        this.dataVehiculos = response.result.map(function (elemento) {
          if (elemento.medioTransporteId == 6 || elemento.medioTransporteId == 8) {
            elemento.tipoTransporteId = 1;
          } else {
            elemento.tipoTransporteId = 2;
          }
          return elemento;
        });
      });
  }

  get_TrayectoPorDefecto() {
    this._accesosApiService.get_PorDefecto(this.sedeId, this.controAcopioId, this.tipoEtcId)
      .subscribe(response => {
        if (response.success) {
          this.dataSource = response.result;
          this.totalTrayectos = this.dataSource.length;

          for (let i = 0; i < this.dataSource.length; i++) {
            this.dataSource[i].readonly = true;
            this.dataSource[i].iconName = this.getIconoTrayecto(this.dataSource[i].medioTransporteId);
            this.dataSource[i].addInfo = i == 0 && this.tipoEtcId == 2 ? true : true;
            this.dataSource[i].editInfo = (i < 1 && this.tipoEtcId == 1) || i < 2 && this.tipoEtcId == 2 ? false : true;

            if (this.dataSource[i].tipoTransporteId == 1) {
              this.dataSource[i].readonlyKilometros = false;
              this.dataSource[i].readonlyHoras = true;
              this.dataSource[i].readonlyCosto = true;
            }
            else if (this.dataSource[i].tipoTransporteId == 2) {
              this.dataSource[i].readonlyKilometros = true;
              this.dataSource[i].readonlyHoras = false;
              this.dataSource[i].readonlyCosto = false;
            }
          }
        }
        else {
          this.messageService.showError("ERROR: " + response.error, 'top center');
        }

      });
  }

  get_TrayectoXSede() {
    this._accesosApiService.get_TrayectoSede(this.sedeId)
      .subscribe(response => {
        if (response.success) {
          this.dataTrayectoSede = response.result.length > 0 ? response.result[0] : null;
          this.itemInfo = {
            nombreUbicacion: localStorage.getItem('Ubicacion').replace('ETC |', ''),
            municipio: this.dataTrayectoSede.municipioNombre,
            institucion: this.dataTrayectoSede.instiEducativa,
            sede: this.dataTrayectoSede.sede,
            currentYear: moment().format('YYYY'),
            dateToday: new Date()
          }
        }
        else {
          this.messageService.showError("ERROR: " + response.error, 'top center');
        }
      });
  }

  getIndiceDataSource(id: number) {
    let ind = -1;
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].trayectoId == id) {
        ind = i;
        break;
      }
    }
    return ind;
  }

  changeSelectModel(name: string, value: any, item: any) {
    item[name] = value;
    if (name == 'tipoTransporteId') {
      this.validarTipoTransporte(true);
    }
    else if (name == 'medioTransporteId') {
      this.dataSource[this.indice].iconName = this.getIconoTrayecto(value);
    }
  }

  getIconoTrayecto(medioTransporteId: number) {
    switch (medioTransporteId) {
      case 2:
        return "Iconos_PAE-226.svg"; // avion
      case 3:
        return "Iconos_PAE-228.svg"; // persona
      case 4:
        return "Iconos_PAE-227.svg"; // animal
      case 5:
        return "Iconos_PAE-225.svg"; // barco
      case 10:
        return "Iconos_PAE-225.svg"; // barco
      case 7:
        return "Iconos_PAE-223.svg"; // jeep
      case 9:
        return "Iconos_PAE-224.svg"; // moto
      default:
        return "Iconos_PAE-222.svg"; // camion 6 || 8
    }
  }

  validarTipoTransporte(resetCamp: boolean) {
    if (this.dataSource[this.indice].tipoTransporteId == 1) {
      if (resetCamp) {
        this.dataSource[this.indice].medioTransporteId = 0;
        this.dataSource[this.indice].horas = 0;
        this.dataSource[this.indice].costo = 0;
      }

      this.dataSource[this.indice].readonlyKilometros = false;
      this.dataSource[this.indice].readonlyHoras = true;
      this.dataSource[this.indice].readonlyCosto = true;
    }
    else if (this.dataSource[this.indice].tipoTransporteId == 2) {
      if (resetCamp) {
        this.dataSource[this.indice].medioTransporteId = 0;
        this.dataSource[this.indice].kilometros = 0;
      }

      this.dataSource[this.indice].readonlyKilometros = true;
      this.dataSource[this.indice].readonlyHoras = false;
      this.dataSource[this.indice].readonlyCosto = false;
    }
  }

  addTrayecto(id: number) {
    this.cancelTrayecto();

    this.indice = this.getIndiceDataSource(id) + 1;
    this.dataSource.splice(this.indice, 0, { trayectoId: this.dataSource.length + 1, sedeId: this.sedeId, destino: '', numPosicion: this.indice + 1, posicionBase: this.indice + 1, cabeceraMunicipal: false, tipoTransporteId: 0, medioTransporteId: 0, kilometros: 0, horas: 0, costo: 0, readonly: false, editInfo: true, addInfo: true },);
    this.modoOp = 1;
  }

  editTrayecto(id: number) {
    this.cancelTrayecto();

    this.validarTipoTransporte(false);
    this.indice = this.getIndiceDataSource(id);
    const itemDataSource = (this.dataSource[this.indice]);

    this.itemDataSource = {
      trayectoId: itemDataSource.trayectoId,
      sedeId: itemDataSource.sedeId,
      centroAcopioId: itemDataSource.centroAcopioId,
      tipoETCId: itemDataSource.tipoETCId,
      numPosicion: itemDataSource.numPosicion,
      destino: itemDataSource.destino,
      cabecera: itemDataSource.cabecera,
      costo: itemDataSource.costo,
      kilometros: itemDataSource.kilometros,
      horas: itemDataSource.horas,
      medioTransporteId: itemDataSource.medioTransporteId,
      centroAcopio: itemDataSource.centroAcopio,
      tipoTransporteId: itemDataSource.tipoTransporteId,
      iconName: itemDataSource.iconName,
      readonly: true,
      editInfo: itemDataSource.editInfo,
      addInfo: itemDataSource.addInfo,
    };

    this.dataSource[this.indice].readonly = false;
    this.modoOp = 2;
  }

  deleteTrayecto(id: number) {
    this.cancelTrayecto();

    this._accesosApiService.del_Trayectos(id)
      .subscribe(response => {
        if (response.success) {
          this.get_TrayectoPorDefecto();
          this.get_TrayectoXSede();
        }
        else { this.messageService.showError("ERROR: " + response.error, 'top center', 5000); }
      });
  }

  cancelTrayecto() {
    if (this.modoOp == 1) {
      this.dataSource.splice(this.indice, 1);
    }
    else if (this.modoOp == 2) {
      this.dataSource[this.indice] = this.itemDataSource;
    }
    this.modoOp = 0;
  }

  saveTrayecto() {
    const itemDataTrayecto = this.dataSource[this.indice];
    const valido = this.validarSaveTrayecto(itemDataTrayecto);

    if (valido) {
      if (this.modoOp == 1) {
        this._accesosApiService.post_Trayectos(itemDataTrayecto)
          .subscribe(response => {
            if (response.success) {
              this.dataSource[this.indice].readonly = true;
              this.modoOp = 0;

              this.get_TrayectoPorDefecto();
              this.get_TrayectoXSede();
            }
            else { this.messageService.showError("ERROR: " + response.error, 'top center'); }
          });
      }
      else if (this.modoOp == 2) {
        this._accesosApiService.put_Trayectos(itemDataTrayecto)
          .subscribe(response => {
            if (response.success) {
              this.dataSource[this.indice].readonly = true;
              this.modoOp = 0;

              this.get_TrayectoPorDefecto();
              this.get_TrayectoXSede();
            }
            else {
              this.messageService.showError("ERROR: " + response.error, 'top center');
            }
          });
      }
    }
  }

  validarSaveTrayecto(itemDataTrayecto: any) {
    if (itemDataTrayecto.destino == '') {
      this.messageService.showWarning("Digite el destino.", 'top center');
      return false;
    }

    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].trayectoId != itemDataTrayecto.trayectoId && this.dataSource[i].destino.trim().toLowerCase() == itemDataTrayecto.destino.trim().toLowerCase()) {
        this.messageService.showWarning("El nombre del destino ya existe.", 'top center');
        return false;
      }
    }

    if (itemDataTrayecto.tipoTransporteId == 0) {
      this.messageService.showWarning("Elija un tipo de transporte.", 'top center');
      return false;
    }

    let msgNoValido = "";
    if (itemDataTrayecto.tipoTransporteId == 2) {
      if (itemDataTrayecto.medioTransporteId == 0) { msgNoValido += "Elija un vehículo.\n"; }
      if (itemDataTrayecto.horas <= 0) { msgNoValido += "El tiempo debe ser mayor a cero (0).\n"; }
      if (itemDataTrayecto.costo <= 0) { msgNoValido += "El costo en pesos debe ser mayor a cero (0).\n"; }

      if (msgNoValido != "") {
        this.messageService.showWarning(msgNoValido, 'top center');
        return false;
      }
    }
    else if (itemDataTrayecto.tipoTransporteId == 1) {
      if (itemDataTrayecto.medioTransporteId == 0) { msgNoValido += "Elija un vehículo.\n"; }
      if (itemDataTrayecto.kilometros <= 0) { msgNoValido += "La distancia debe ser mayor a cero (0).\n"; }

      if (msgNoValido != "") {
        this.messageService.showWarning(msgNoValido, 'top center');
        return false;
      }
    }
    return true;
  }

  getModulePermission(action: string): boolean {
    return this.seguridadService.getModulePermission(96, action);
  }

  onMunicipioClick(value: any): void {
    this.selMunicipio = value;
    this.PA_InstitucionEducativaRequest.Id_DiviPola=value;
    this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
      (response: any) => {
        this.selectInstitucionList = response;
      },
      (err) => {
      }
    );
  }

  onInstitucionClick(value: any): void {
    this.sedesService.getSedesListRelationFilter2(this.idETC, this.selMunicipio, value).subscribe(
      (response: any) => {
        this.selectSedesList = response;
      },
      (err) => {
      }
    );
  }

  onSedeClick(value: any): void {
   this.sedeId = value;
  }
}
