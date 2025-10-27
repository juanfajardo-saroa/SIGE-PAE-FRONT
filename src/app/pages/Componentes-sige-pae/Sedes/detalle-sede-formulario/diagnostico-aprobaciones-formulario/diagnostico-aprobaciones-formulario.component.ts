import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { Component, Injectable, NgModule, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionesAprobacionModel } from "src/app/shared/model/AccionesAprobacion";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';


import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { CaracterizacionInfraestructuraService } from 'src/app/shared/services/CaracterizacionInfraestructura.services';
import { CaracterizacionInfraestructuraModel } from 'src/app/shared/model/CaracterizacionInfraestructura';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';

@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-diagnostico-aprobaciones-formulario',
  templateUrl: './diagnostico-aprobaciones-formulario.component.html',
  styleUrls: ['./diagnostico-aprobaciones-formulario.component.scss']
})
export class DiagnosticoAprobacionesFormularioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  form: FormGroup;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  idsede: string;
  idTab = 0;
  idAprobaciones = 0;
  myDatepipe!: any;
  isLoading = true;
  aprobar = [];
  lista = [];
  infraestructura = [];
  yaCargoAprobaciones = false;
  yaCargoObservaciones = false;
  CaracterizacionInfraestructuraList: CaracterizacionInfraestructuraModel[];
  AprobacionesList: any;
  AprobacionesList2: any;
  AprobacionObject: AprobacionesModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: new Date,
    fecha: new Date,
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: '',
    filtro: '',
    id_Rol: 0,
    sID_rol: '',

    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',

    isValid: false,
    isSelected: false,
    completed: false,
    plazoPorAprobar: new Date,
  };
  CaracterizacionInfraestructuraObject: CaracterizacionInfraestructuraModel = {
    sID: '',
    id: 0,
    iD_Sede: 0,
    sID_Sede: '',
    iD_Inventario: 0,
    sID_Inventario: '',
    fechaCaracterizacion: new Date,
    fechaModificacion: new Date,
    descripcion: '',
    chS_Fecha: new Date,
    chS_Documento: '',
    rutaArchivo: '',
    auditoria: '',
    filtro: '',
    suficienciaDotacion: 0,
    id_TipoEstadoCaracterizacion: 0,
    id_TipoModalidadComplementoSugerida: 0,

    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',

    isValid: false,
    isSelected: false,
    completed: false,
  }
  cantAprobaciones = 0;
  idaccion = 0
  constructor(
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private tipoestado: CaracterizacionInfraestructuraService,
    private route: ActivatedRoute,
    private seguridadService: SeguridadService,
    private router: Router,
    public datepipe: DatePipe,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_AprobacionesGetAllFullService:PA_AprobacionesGetAllFullService,
  ) {

    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });
    this.aprobar.push(this.form);

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idsede = params.id;
      this.idTab = +params.tab;
      this.idAprobaciones = + params.dia;

      if (this.idAprobaciones === 3) {
        this.yaCargoAprobaciones = true;
        this.yaCargoObservaciones = true;
        this.cantAprobaciones = 1;
      } else {
        this.yaCargoAprobaciones = false;
        this.yaCargoObservaciones = false;
        this.cantAprobaciones = 0;
      }

    });
   
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {


        this.AccionesAprobacionesList = response;
        this.AccionesAprobacionesList.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
      (err) => {
      }
    );
    this.tipoestado.getCaracterizacionInfraestructuraList().subscribe(
      (response: any) => {
        this.CaracterizacionInfraestructuraList = response.filter(item => item.iD_Sede === Number(this.idsede));
        this.infraestructura.push(this.CaracterizacionInfraestructuraList);

      },
      (err) => {
      }
    );
    this.fillTableAprobaciones()
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
    };

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }
  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullListUbicacion(this.idsede,4).subscribe(
          (response: any) => {
            this.UsersList = response;
            
            this.serviciosp.getGetAprobacionesGetAllWithRelListfilterUbi(4, this.idETC,this.idsede).subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response;
                this.dataArrayAprobaciones.forEach(element => {
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }

                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;

                });
                this.dataArrayAprobaciones.sort(function (a, b) {
                  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                
                this.dataSourceAprobaciones.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = "Registros por página";
                this.paginator._intl.nextPageLabel = "Siguiente";
                this.paginator._intl.previousPageLabel = "Anterior";
                this.paginator._intl.firstPageLabel = "Primero";
                this.paginator._intl.lastPageLabel = "Último";
                this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                  const start = page * pageSize + 1;
                  const end = (page + 1) * pageSize;
                  return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
                };
                this.dataSourceAprobaciones.sort = this.sort;
              },
              (err) => {
              }
            );
          },
          (err) => {
          }
        );

      },
      (err) => {
      }
    );
  }
  mensaje() {
    this.ngOnInit()
    Swal.fire({
      showCloseButton: false,
      html:
        '<img style="position: absolute !important ;right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">Confirmar aprobación del cuestionario de infraestructura: </p> ' +
        ` <div style="text-align: center!important; font-size: 13px; color:#005ACA !important;font-weight: 700;">${localStorage.getItem('pi')}</div> ` +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',

      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.aprobaciones()
      }
      else {
      }
    })
  }
  joinRoom(item) {

    if (item.id === 1) {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {

        this.form.controls['observaciones'].setValue(' ');
      }
    } else {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {

        this.form.controls['observaciones'].setValue(' ');
      }
    }



  }
  aprobaciones() {

      this.AprobacionObject.id = 0;
      this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;

      if (this.aprobar[0].value.observaciones == ' ') {
        this.AprobacionObject.observaciones = 'Ninguno'
      } else {
        this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
      }


      this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
      this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.AprobacionObject.id_Secciones = 4;
      this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
      this.AprobacionObject.id_Ubicacion = 1;
      this.AprobacionObject.ubicacionOrigen = this.idsede.toString()
      let doc = localStorage.getItem('Documento7');
      if (doc == null) {
        this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
      } else {
        this.AprobacionObject.documentoParaAprobar = doc;
      }

      this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
        (response) => {

          this.fillTableAprobaciones()
          this.clearForm()
          let estaApro = ''
          this.CaracterizacionInfraestructuraObject.id = this.infraestructura[0][0].id;
          this.CaracterizacionInfraestructuraObject.auditoria = 'null';
          this.CaracterizacionInfraestructuraObject.chS_Documento = this.infraestructura[0][0].chS_Documento;
          this.CaracterizacionInfraestructuraObject.chS_Fecha = this.infraestructura[0][0].chS_Fecha;
          this.CaracterizacionInfraestructuraObject.descripcion = this.infraestructura[0][0].descripcion;
          this.CaracterizacionInfraestructuraObject.fechaCaracterizacion = this.infraestructura[0][0].fechaCaracterizacion;
          this.CaracterizacionInfraestructuraObject.fechaModificacion = this.infraestructura[0][0].fechaModificacion;
          this.CaracterizacionInfraestructuraObject.iD_Inventario = this.infraestructura[0][0].iD_Inventario;
          this.CaracterizacionInfraestructuraObject.iD_Sede = this.infraestructura[0][0].iD_Sede;
          if (response.iD_AccionAprobacion === 1) {

            this.CaracterizacionInfraestructuraObject.id_TipoEstadoCaracterizacion = 4;
            estaApro = 'Aprobado'
          } else {

            this.CaracterizacionInfraestructuraObject.id_TipoEstadoCaracterizacion = 5;
            estaApro = 'Rechazado'
          }

          this._PA_RegistrarNotificacionService.registerNotification("El cuestionario de infraestructura fue " + estaApro + " " + localStorage.getItem('pi') +"|"+ localStorage.getItem('ps'), "Coordinador PAE",this.idETC.toString());
          this._PA_RegistrarNotificacionService.registerNotification("El cuestionario de infraestructura fue " + estaApro + " " + localStorage.getItem('pi')+"|"+ localStorage.getItem('ps'), "Rol SiPAE-Administrador");

          this.CaracterizacionInfraestructuraObject.rutaArchivo = this.infraestructura[0][0].rutaArchivo;
          this.CaracterizacionInfraestructuraObject.suficienciaDotacion = this.infraestructura[0][0].suficienciaDotacion;
          this.tipoestado.updateCaracterizacionInfraestructura(this.CaracterizacionInfraestructuraObject).subscribe((response) => {

            this.cantAprobaciones = 0;
            this.yaCargoAprobaciones = false;

          },
            (err) => {


            });


        },
        (err) => {
        }
      );
   


  }
  clearForm() {
    this.form.reset({
      'observaciones': '',
      'accionAprobacion': '',
    });
  }
}
