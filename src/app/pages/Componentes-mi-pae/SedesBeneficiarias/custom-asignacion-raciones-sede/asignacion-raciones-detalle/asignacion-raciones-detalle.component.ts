
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PAPrioAsistidaService } from 'src/app/shared/services/PA_PrioAsistida.service';
import { PA_PrioSedeAsignaRacionPivRequest, PA_PrioSedeAsignaRacionPivService } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import { PA_PrioSedeAsignaRacionPivModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModel';
import { PA_PrioSedeInformacionService } from "src/app/shared/services/PA_PrioSedeInformacion.services";
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { GradosModel } from 'src/app/shared/model/Grados';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { NivelEducativoModel } from 'src/app/shared/model/NivelEducativo';
import { PAPriorizacionesContratoModel } from 'src/app/shared/model/PA_PriorizacionesContrato.model';
import { PriorizacionesModel } from 'src/app/shared/model/Priorizaciones';
import { TiposModalidadComplementoModel } from 'src/app/shared/model/TiposModalidadComplemento';
import { TiposComplementoModel } from 'src/app/shared/model/TiposComplemento';
import { GradosService } from 'src/app/shared/services/Grados.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { PAPriorizacionesContratoService } from 'src/app/shared/services/PA_PriorizacionesContrato.services';
import { PriorizacionesService } from 'src/app/shared/services/Priorizaciones.services';
import { TiposModalidadComplementoService } from 'src/app/shared/services/TiposModalidadComplemento.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { environment } from 'src/environments/environment';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { ExcedentesComplementosModel } from 'src/app/shared/model/ExcedentesComplementos';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriorizacionArchivosService } from 'src/app/shared/services/PriorizacionArchivos.service';
import { NovedadesModel } from 'src/app/shared/model/Novedades';
import { NovedadesService } from 'src/app/shared/services/Novedades.services';
import * as saveAs from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { DataSourceInformacionService } from "src/app/shared/services/data-source-informacion.service";
import { PA_PrioSedeInformacionModel } from "src/app/shared/model/PA_PrioSedeInformacion.model";
import { PA_ModalidadModelobySedeService } from 'src/app/shared/services/PA_ModalidadModelobySede.services';
import { PA_TiporacionbyModalidadService } from 'src/app/shared/services/PA_TiporacionbyModalidad.services';
import { PA_ModalidadModelobySedeModel } from 'src/app/shared/model/PA_ModalidadModelobySedeModel';
import { PA_TiporacionbyModalidadModel } from 'src/app/shared/model/PA_TiporacionbyModalidadModel';
import { PA_PrioSedeAsignaRacionPivExtndModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModelExtend';
import { PA_PrioSedeAsignaRacionPivExtnd2Model } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModelExtend2';
import { PA_ActualiarFlatAmarillaService } from 'src/app/shared/services/PA_ActualiarFlatAmarilla.services';
import { NivelEducativoGetAllBySedeJornadaService } from 'src/app/shared/services/NivelEducativoGetAllBySedeJornada.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_GradosSedesJornadasGetAllWithRelationService } from 'src/app/shared/services/PA_GradosSedesJornadasGetAllWithRelation.services';
import { PA_SedesJornadaGetAllWithRelationService } from 'src/app/shared/services/PA_SedesJornadaGetAllWithRelation.services';

@Component({
  selector: 'app-asignacion-raciones-detalle',
  templateUrl: './asignacion-raciones-detalle.component.html',
  styleUrls: ['./asignacion-raciones-detalle.component.scss']
})
export class AsignacionRacionesDetalleComponent implements OnInit {


  //Generales
  spans = {};
  isEditing = false;
  viewingDetail = false;
  nombreModelo: string;
  editSedesForm: FormGroup;
  idEtc = Number(localStorage.getItem('IdUbicacion'));
  idSede = 0;
  idvigencia = 0;
  prioSedeAsignaRacionPivParams: PA_PrioSedeAsignaRacionPivRequest = {};
  gradosByNivelList: GradosModel[];
  tamaño = 0;
  diferencia: any;
  priorizacionesList: PriorizacionesModel[];
  //filtros
  SedesJornadasListBySede: SedesJornadaModel[];
  jornadasList: JornadaModel[];
  SedesJornadasList: SedesJornadaModel[];
  IdSedesJornadasListBySede: number[] = [];
  GradosSedesJornadasList: GradosSedesJornadasModel[];
  GradosSedesJornadasListBySede: GradosSedesJornadasModel[];
  selectGradosSedesJornadasListBySede: GradosSedesJornadasModel[];
  IdNiveles: number[] = [];
  completarList = [
    { id: 1, nombre: "Matricula completa" },
    { id: 0, nombre: "Ceros (0)" }];
  gradosList: GradosModel[];
  nivelEducativoList: NivelEducativoModel[];
  selectNivelEducativoList: NivelEducativoModel[];
  modalidadList: PA_ModalidadModelobySedeModel[];
  tipoRacionList: PA_TiporacionbyModalidadModel[];
  TiposRacionListForever: PA_TiporacionbyModalidadModel[];
  temp: PA_TiporacionbyModalidadModel[];
  //MAEM
  columnAsignacionNames = ['jornada', 'grados', 'matriculaSimat', 'almuerzoRps', 'complementoRps', 'complementoRi', 'almuerzoCatering', 'complementoCatering', 'racionesDiarias', 'bandera'];
  dataSourceSedeGeneralMAEM: MatTableDataSource<PA_PrioSedeAsignaRacionPivExtndModel>;
  yacargoMAEM = false;
  nombreOPMAEM = false;
  prioSedeAsignaRacionPivGeneralList2: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivListComparar: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivListMAEM: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivShowMAEM: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivListForeverMAEM: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
  prioSedeAsignaRacionPivTotalMAEM: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivGeneralTemp: PA_PrioSedeAsignaRacionPivExtndModel = {
    m2_ComplementoAMPM: 0,
    m1_ComplementoAMPM: 0,
    m3_ComplementoAMPM: 0,
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };
  totalPiv: PA_PrioSedeAsignaRacionPivExtndModel = {
    m2_ComplementoAMPM: 0,
    m1_ComplementoAMPM: 0,
    m3_ComplementoAMPM: 0,
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };
  id_TipoModeloOperativo: 0;
  //MAER
  columnAsignacionNamesMAER = ['jornada', 'grados', 'matriculaSimat', 'almuerzoRps', 'complementoRps', 'almuerzoCatering', 'complementoCatering', 'racionesDiarias', 'bandera'];
  dataSourceSedeGeneralMAER: MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>;
  yacargoMAER = false;
  nombreOPMAER = false;
  prioSedeAsignaRacionPivGeneralList: PA_PrioSedeAsignaRacionPivModel[];
  prioSedeAsignaRacionPivListMAER: PA_PrioSedeAsignaRacionPivModel[];
  prioSedeAsignaRacionPivShowMAER: PA_PrioSedeAsignaRacionPivModel[];
  prioSedeAsignaRacionPivListForeverMAER: PA_PrioSedeAsignaRacionPivModel[] = [];
  prioSedeAsignaRacionPivTotalMAER: PA_PrioSedeAsignaRacionPivModel[];
  prioSedeAsignaRacionPivGeneralTemp2: PA_PrioSedeAsignaRacionPivModel = {
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };
  totalPiv2: PA_PrioSedeAsignaRacionPivModel = {
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };
  //PAEPI
  columnAsignacionNamesPAEPI = ['jornada', 'grados', 'matriculaSimat', 'almuerzoRps', 'complementoRps', 'almuerzoCatering', 'complementoCatering', 'racionesDiarias', 'bandera'];
  dataSourceSedeGeneralPAEPI: MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>;
  yacargoPAEPI = false;
  nombreOPPAEPI = false;
  nombreOPNi = false;
  prioSedeAsignaRacionPivGeneralList3: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivListPAEPI: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivShowPAEPI: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivListForeverPAEPI: PA_PrioSedeAsignaRacionPivExtnd2Model[] = [];
  prioSedeAsignaRacionPivTotalPAEPI: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivGeneralTemp3: PA_PrioSedeAsignaRacionPivExtnd2Model = {
    m1_ComplementoAMPM: 0,
    m3_ComplementoAMPM: 0,
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };
  totalPiv3: PA_PrioSedeAsignaRacionPivExtnd2Model = {
    m1_ComplementoAMPM: 0,
    m3_ComplementoAMPM: 0,
    Jornada: '',
    Grado: '',
    id_gradosedeJornada: 0,
    Matricula: 0,
    m1_ComplementoAlmuerzo: 0,
    m1_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzoCualificado: 0,
    m3_ComplementoAlmuerzo: 0,
    TotalRaciones: 0
  };


  constructor(private seguridadService: SeguridadService,
    private fb: FormBuilder,
    private prioSedeAsignaRacionPivService: PA_PrioSedeAsignaRacionPivService,
    private jornadaService: JornadaService,
    private nivelEducativoService: NivelEducativoService,
    private tiposModalidadRacionService: TiposModalidadComplementoService,
    private tiposRacionService: TiposComplementoService,
    private prioAsistidaService: PAPrioAsistidaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private prioSedeInformacionSevice: PA_PrioSedeInformacionService,
    private gradosService: GradosService,
    private priorizacionesService: PriorizacionesService,
    private priorizacionesContratoService: PAPriorizacionesContratoService,
    private sedesJornadasService: SedesJornadaService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    public dialog: MatDialog,
    private novedadesService: NovedadesService,
    public servicios: PriorizacionArchivosService,
    public serviciosNovedades: NovedadesService,
    public dataSourceInformacionService: DataSourceInformacionService,
    private _PA_ModalidadModelobySedeService: PA_ModalidadModelobySedeService,
    private _PA_TiporacionbyModalidadService: PA_TiporacionbyModalidadService,
    private _PA_ActualiarFlatAmarilla: PA_ActualiarFlatAmarillaService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _nivelEducativoService: NivelEducativoGetAllBySedeJornadaService,
    private _PA_SedesJornadaGetAllWithRelationService: PA_SedesJornadaGetAllWithRelationService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.idSede = +params.id;
    });
    let h = 0;
    localStorage.setItem('esp', h.toString());
    this.editSedesForm = this.fb.group({
      id_ETC: [this.idEtc],
      jornada: [''],
      nivelEducativo: [''],
      modalidad: [''],
      tipoRacion: [''],
      completar: ['']
    });
    this.gradosService.getGradosList().subscribe(
      (response: any) => {
        this.gradosList = response;
      },
      (err) => {
      }
    );
    this.idvigencia = Number(localStorage.getItem('VigSeleccionada'));

    this._PA_ActualiarFlatAmarilla.getPA_ActualiarFlatAmarillaList(this.idSede, false, null).subscribe((response: any) => {
    },
      (err) => {
      });

    this.prioSedeAsignaRacionPivParams.idSede = this.idSede;
    this.prioSedeAsignaRacionPivParams.id_Vigencia = this.idvigencia
    this.jornadaService.getJornadaList().subscribe(
      (response: any) => {
        this.jornadasList = response;
        this.fillGeneralTable();
      },
      (err) => {
      }
    );
  }

  ngOnInit(): void {
    this.getAllSelects()

    this.prioSedeInformacionSevice.getPA_PrioSedeInformacionList(this.idSede, Number(localStorage.getItem('VigSeleccionada'))).subscribe(
      (response: any) => {
        if (response[0].modeloOperativo == 'MAEM') {

          this.nombreModelo = 'MAEM: Modelo de Alimentación Escolar Mayoritario'
          this.id_TipoModeloOperativo = response[0].id_TipoModeloOperativo
          this.yacargoMAEM = true;
          this.yacargoMAER = false;
          this.yacargoPAEPI = false;
          this.nombreOPMAEM = true;
          this.nombreOPMAER = false;
          this.nombreOPPAEPI = false;
          this.nombreOPNi = false;
        } else if (response[0].modeloOperativo == 'MAER') {
          this.nombreModelo = 'MAER: Modelo de Alimentación Escolar para las Ruralidades'
          this.id_TipoModeloOperativo = response[0].id_TipoModeloOperativo
          this.yacargoMAEM = false;
          this.yacargoMAER = true;
          this.yacargoPAEPI = false;
          this.nombreOPMAEM = false;
          this.nombreOPMAER = true;
          this.nombreOPPAEPI = false;
          this.nombreOPNi = false;
        } else if (response[0].modeloOperativo == 'MAIP') {
          this.nombreModelo = 'MAIP:Modelo de Alimentación Indígena Propio'

        } else if (response[0].modeloOperativo == 'PAEC') {
          this.nombreModelo = 'PAEC:Modelo Para Aprendizaje En Casa'
        }
        else if (response[0].modeloOperativo == 'PAEPI') {
          this.nombreModelo = 'PAEPI: PAE para Pueblos Indígenas'
          this.id_TipoModeloOperativo = response[0].id_TipoModeloOperativo
          this.yacargoMAEM = false;
          this.yacargoMAER = false;
          this.yacargoPAEPI = true;
          this.nombreOPMAEM = false;
          this.nombreOPMAER = false;
          this.nombreOPPAEPI = true;
          this.nombreOPNi = false;
        }
        else if (response[0].modeloOperativo == 'Ninguno') {
          this.nombreModelo = 'Ninguno'
          this.id_TipoModeloOperativo = response[0].id_TipoModeloOperativo
          this.yacargoMAEM = false;
          this.yacargoMAER = false;
          this.yacargoPAEPI = false;
          this.nombreOPMAEM = false;
          this.nombreOPMAER = false;
          this.nombreOPPAEPI = false;
          this.nombreOPNi = true;
        }
      },
      (err) => {
      }
    );
  }



  onRegistrarNotificacionesRoles() {
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "26497bcf-bb09-473a-af94-4e194be66a21", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "18cb22b3-3f7e-468a-af32-b4e7c1bc6d32", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "3b9013be-448a-4de4-99d4-23dbd555e6ec", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "34faec68-4110-4399-b905-ca9955d7dbab", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "7c2b24b6-62c4-4737-8a18-157f46bba8ae", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "2b9ba6fb-bdb2-471b-9af5-4fcc6049c837", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "a7acbdb9-7239-4e9e-9025-26118396c232", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "d17275ce-0864-4ab6-bc83-c185246106a9", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "ac6bfdf9-1a92-4e7d-b1df-acedfdfe1064", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "92877e1a-fd3d-45a1-b7ea-69254a80172e", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "f8340ffb-5ba2-4dd9-9f59-f2578bd4b323", this.idEtc.toString());
    this._PA_RegistrarNotificacionService.registerNotificationOnlyRolId("La priorización fue modificada", "2b31e805-0034-4894-943e-9f8616068562", this.idEtc.toString());

  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  getAllSelects(): void {

    //todo :performance
    this._PA_SedesJornadaGetAllWithRelationService.getPA_SedesJornadaGetAllWithRelationList(this.idSede).subscribe(
      (response: any) => {
        this.SedesJornadasListBySede = response;
      },
      (err) => {
      }
    );


    this._PA_ModalidadModelobySedeService.getPA_ModalidadModelobySedeList(this.idSede).subscribe(
      (response: any) => {
        this.modalidadList = response;

      },
      (err) => {
      }
    );


  }
  onEditarRaciones() {
    this.isEditing = true;
    this.onVerDetalle();
  }

  onCancelarRaciones() {
    this.isEditing = false;
    this.editSedesForm.reset();
  }

  onVerDetalle() {
    this.viewingDetail = true;
    this.fillDetailTable();
  }

  onVerGeneral() {
    this.viewingDetail = false;
    this.fillGeneralTable();
  }


  fillGeneralTable() {
    this.prioSedeAsignaRacionPivGeneralList = [];
    this.prioSedeAsignaRacionPivGeneralList2 = [];
    this.prioSedeAsignaRacionPivGeneralList3 = [];
    this.prioSedeAsignaRacionPivService.getPA_PrioSedeAsignaRacionPivList(this.prioSedeAsignaRacionPivParams).subscribe(
      (response: any) => {
        let m2 = 0

        let m3
        response.find(object => {
          m2 = Object.keys(object).length
          this.tamaño = m2
        });

        if (m2 == 10) {
          this.prioSedeAsignaRacionPivListMAEM = response;
          this.prioSedeAsignaRacionPivListComparar = response;

          this.prioSedeAsignaRacionPivGeneralList2 = this.prioSedeAsignaRacionPivListMAEM.map(object => ({ ...object }));
          this.prioSedeAsignaRacionPivShowMAEM = this.fillJornadasTotales(this.prioSedeAsignaRacionPivGeneralList2)
          this.prioSedeAsignaRacionPivGeneralList2 = this.prioSedeAsignaRacionPivShowMAEM.filter(item => item.Grado == 'Todos');
          this.prioSedeAsignaRacionPivGeneralList2.map(item => {
            item.Grado = 'TODOS'
          })
          this.getTotal2(this.prioSedeAsignaRacionPivGeneralList2);
          this.prioSedeAsignaRacionPivGeneralList2.sort(function (a, b) {
            const nameA = a.Jornada.toUpperCase(); // ignore upper and lowercase
            const nameB = b.Jornada.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
          this.dataSourceSedeGeneralMAEM = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtndModel>(this.prioSedeAsignaRacionPivGeneralList2);
          this.spans = Object.assign({}, {
            Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivGeneralList2),

          });

        } else {

          response.find(object => {
            m3 = Object.keys(object)
            this.diferencia = m3;
          });

          let ComplementoAlmuerzoCualificado = m3.includes('m1_ComplementoAlmuerzoCualificado')
          let ComplementoAlmuerzoCualificado2 = m3.includes('m3_ComplementoAlmuerzoCualificado')
          if (ComplementoAlmuerzoCualificado == true && ComplementoAlmuerzoCualificado2 == true) {
            this.prioSedeAsignaRacionPivListMAER = response;
            this.prioSedeAsignaRacionPivGeneralList = this.prioSedeAsignaRacionPivListMAER.map(object => ({ ...object }));
            this.prioSedeAsignaRacionPivShowMAER = this.fillJornadasTotales2(this.prioSedeAsignaRacionPivGeneralList)
            this.prioSedeAsignaRacionPivGeneralList = this.prioSedeAsignaRacionPivShowMAER.filter(item => item.Grado == 'Todos');
            this.prioSedeAsignaRacionPivGeneralList.map(item => {
              item.Grado = 'TODOS'
            })
            this.getTotal(this.prioSedeAsignaRacionPivGeneralList);
            this.prioSedeAsignaRacionPivGeneralList.sort(function (a, b) {
              const nameA = a.Jornada.toUpperCase(); // ignore upper and lowercase
              const nameB = b.Jornada.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            this.dataSourceSedeGeneralMAER = new MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>(this.prioSedeAsignaRacionPivGeneralList);
            this.spans = Object.assign({}, {
              Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivGeneralList),

            });

          } else {
            this.prioSedeAsignaRacionPivListPAEPI = response;

            this.prioSedeAsignaRacionPivGeneralList3 = this.prioSedeAsignaRacionPivListPAEPI.map(object => ({ ...object }));
            this.prioSedeAsignaRacionPivShowPAEPI = this.fillJornadasTotales3(this.prioSedeAsignaRacionPivGeneralList3)
            this.prioSedeAsignaRacionPivGeneralList3 = this.prioSedeAsignaRacionPivShowPAEPI.filter(item => item.Grado == 'Todos');
            this.prioSedeAsignaRacionPivGeneralList3.map(item => {
              item.Grado = 'TODOS'
            })
            this.getTotal3(this.prioSedeAsignaRacionPivGeneralList3);
            this.prioSedeAsignaRacionPivGeneralList3.sort(function (a, b) {
              const nameA = a.Jornada.toUpperCase(); // ignore upper and lowercase
              const nameB = b.Jornada.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            this.dataSourceSedeGeneralPAEPI = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>(this.prioSedeAsignaRacionPivGeneralList3);
            this.spans = Object.assign({}, {
              Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivGeneralList3),

            });
          }

        }

      },
      (err) => {
      }
    );
  }


  fillDetailTable() {
    this.prioSedeAsignaRacionPivService.getPA_PrioSedeAsignaRacionPivList(this.prioSedeAsignaRacionPivParams).subscribe(
      (response: any) => {

        let m2 = 0
        let m3
        response.find(object => {
          m2 = Object.keys(object).length
        });

        if (m2 == 10) {
          this.prioSedeAsignaRacionPivListMAEM = response;
          this.prioSedeAsignaRacionPivListComparar = response;
          this.prioSedeAsignaRacionPivListForeverMAEM = this.prioSedeAsignaRacionPivListMAEM.map(object => ({ ...object }));
          this.getTotal2(this.prioSedeAsignaRacionPivListMAEM);
          this.prioSedeAsignaRacionPivShowMAEM = this.fillJornadasTotales(this.prioSedeAsignaRacionPivListMAEM)
          this.dataSourceSedeGeneralMAEM = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtndModel>(this.prioSedeAsignaRacionPivShowMAEM);
          this.spans = Object.assign({}, {
            Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivShowMAEM),

          });

        } else {

          response.find(object => {
            m3 = Object.keys(object)
          });
          let ComplementoAlmuerzoCualificado = m3.includes('m1_ComplementoAlmuerzoCualificado')
          let ComplementoAlmuerzoCualificado2 = m3.includes('m3_ComplementoAlmuerzoCualificado')
          if (ComplementoAlmuerzoCualificado == true && ComplementoAlmuerzoCualificado2 == true) {
            this.prioSedeAsignaRacionPivListMAER = response;
            this.prioSedeAsignaRacionPivListForeverMAER = this.prioSedeAsignaRacionPivListMAER.map(object => ({ ...object }));
            this.getTotal(this.prioSedeAsignaRacionPivListMAER);
            this.prioSedeAsignaRacionPivShowMAER = this.fillJornadasTotales2(this.prioSedeAsignaRacionPivListMAER)
            this.dataSourceSedeGeneralMAER = new MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>(this.prioSedeAsignaRacionPivShowMAER);
            this.spans = Object.assign({}, {
              Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivShowMAER),

            });

          } else {
            this.prioSedeAsignaRacionPivListPAEPI = response;
            this.prioSedeAsignaRacionPivListForeverPAEPI = this.prioSedeAsignaRacionPivListPAEPI.map(object => ({ ...object }));
            this.getTotal3(this.prioSedeAsignaRacionPivListPAEPI);
            this.prioSedeAsignaRacionPivShowPAEPI = this.fillJornadasTotales3(this.prioSedeAsignaRacionPivListPAEPI)
            this.dataSourceSedeGeneralPAEPI = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>(this.prioSedeAsignaRacionPivShowPAEPI);
            this.spans = Object.assign({}, {
              Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivShowPAEPI),

            });
          }

        }

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
  //MAER
  getTotal(sedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivModel[]): PA_PrioSedeAsignaRacionPivModel {
    var acumulador: number;
    this.totalPiv2.Jornada = "TOTAL diario"
    this.totalPiv2.Grado = "Todos los grados"
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.Matricula)
    this.totalPiv2.Matricula = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAlmuerzo)
    this.totalPiv2.m1_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAlmuerzoCualificado)
    this.totalPiv2.m1_ComplementoAlmuerzoCualificado = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAlmuerzo)
    this.totalPiv2.m3_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAlmuerzoCualificado)
    this.totalPiv2.m3_ComplementoAlmuerzoCualificado = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.TotalRaciones)
    this.totalPiv2.TotalRaciones = acumulador;
    return this.totalPiv2;
  };
  getTotalLive() {
    let h = 1
    localStorage.setItem('esp', h.toString());

    this.prioSedeAsignaRacionPivListMAER.forEach(element => {
      element.TotalRaciones = element.m1_ComplementoAlmuerzo + element.m1_ComplementoAlmuerzoCualificado + element.m3_ComplementoAlmuerzo + element.m3_ComplementoAlmuerzoCualificado;
    })
    this.getTotal(this.prioSedeAsignaRacionPivListMAER);
    this.dataSourceSedeGeneralMAER = new MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>(this.fillJornadasTotales2(this.prioSedeAsignaRacionPivListMAER));
  }
  fillJornadasTotales2(pivList: PA_PrioSedeAsignaRacionPivModel[]): PA_PrioSedeAsignaRacionPivModel[] {
    var pivListTotalJornada: PA_PrioSedeAsignaRacionPivModel[] = [];
    var pivListTotalJornadaFilter: PA_PrioSedeAsignaRacionPivModel[] = [];
    var pivListTotalJornadaElement: PA_PrioSedeAsignaRacionPivModel = {
      Jornada: '',
      Grado: 'Todos',
      id_gradosedeJornada: null,
      Matricula: null,
      m1_ComplementoAlmuerzo: null,
      m1_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzo: null,
      TotalRaciones: null,
    };
    var acumulador = 0;
    pivList.forEach((element, index) => {
      pivListTotalJornada.push(element);
      if (index == (pivList.length - 1)) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaElement = {
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: null,
          Matricula: null,
          m1_ComplementoAlmuerzo: null,
          m1_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzo: null,
          TotalRaciones: null,
        };
      }
      else if (element.Jornada != pivList[index + 1].Jornada) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaFilter = [];
        pivListTotalJornadaElement = {
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: 0,
          Matricula: 0,
          m1_ComplementoAlmuerzo: 0,
          m1_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzo: 0,
          TotalRaciones: 0,
        };
      }
    });
    return pivListTotalJornada;

  }
  //MAEM
  getTotal2(sedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivExtndModel[]): PA_PrioSedeAsignaRacionPivExtndModel {
    var acumulador: number;
    this.totalPiv.Jornada = "TOTAL diario"
    this.totalPiv.Grado = "Todos los grados"
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.Matricula)
    this.totalPiv.Matricula = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAlmuerzo)
    this.totalPiv.m1_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAMPM)
    this.totalPiv.m1_ComplementoAMPM = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m2_ComplementoAMPM)
    this.totalPiv.m2_ComplementoAMPM = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAlmuerzo)
    this.totalPiv.m3_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAMPM)
    this.totalPiv.m3_ComplementoAMPM = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.TotalRaciones)
    this.totalPiv.TotalRaciones = acumulador;
    return this.totalPiv;
  }
  getTotalLive2() {
    let h = 1
    localStorage.setItem('esp', h.toString());
    this.prioSedeAsignaRacionPivListMAEM.forEach(element => {
      element.TotalRaciones = element.m1_ComplementoAlmuerzo + element.m1_ComplementoAMPM + element.m2_ComplementoAMPM + element.m3_ComplementoAlmuerzo + element.m3_ComplementoAMPM;

    })
    this.getTotal2(this.prioSedeAsignaRacionPivListMAEM);
    this.dataSourceSedeGeneralMAEM = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtndModel>(this.fillJornadasTotales(this.prioSedeAsignaRacionPivListMAEM));
  }
  fillJornadasTotales(pivList: PA_PrioSedeAsignaRacionPivExtndModel[]): PA_PrioSedeAsignaRacionPivExtndModel[] {
    var pivListTotalJornada: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
    var pivListTotalJornadaFilter: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
    var pivListTotalJornadaElement: PA_PrioSedeAsignaRacionPivExtndModel = {
      m2_ComplementoAMPM: null,
      m1_ComplementoAMPM: null,
      m3_ComplementoAMPM: null,
      Jornada: '',
      Grado: 'Todos',
      id_gradosedeJornada: null,
      Matricula: null,
      m1_ComplementoAlmuerzo: null,
      m1_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzo: null,
      TotalRaciones: null,
    };
    var acumulador = 0;
    pivList.forEach((element, index) => {
      pivListTotalJornada.push(element);
      if (index == (pivList.length - 1)) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAMPM);
        pivListTotalJornadaElement.m1_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m2_ComplementoAMPM);
        pivListTotalJornadaElement.m2_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAMPM);
        pivListTotalJornadaElement.m3_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaElement = {
          m2_ComplementoAMPM: null,
          m1_ComplementoAMPM: null,
          m3_ComplementoAMPM: null,
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: null,
          Matricula: null,
          m1_ComplementoAlmuerzo: null,
          m1_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzo: null,
          TotalRaciones: null,
        };
      }
      else if (element.Jornada != pivList[index + 1].Jornada) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAMPM);
        pivListTotalJornadaElement.m1_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m2_ComplementoAMPM);
        pivListTotalJornadaElement.m2_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAMPM);
        pivListTotalJornadaElement.m3_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaFilter = [];
        pivListTotalJornadaElement = {
          m2_ComplementoAMPM: 0,
          m1_ComplementoAMPM: 0,
          m3_ComplementoAMPM: 0,
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: 0,
          Matricula: 0,
          m1_ComplementoAlmuerzo: 0,
          m1_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzo: 0,
          TotalRaciones: 0
        };
      }
    });
    return pivListTotalJornada;
  }
  //PAEPI
  getTotal3(sedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivExtnd2Model[]): PA_PrioSedeAsignaRacionPivExtnd2Model {
    var acumulador: number;
    this.totalPiv3.Jornada = "TOTAL diario"
    this.totalPiv3.Grado = "Todos los grados"
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.Matricula)
    this.totalPiv3.Matricula = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAlmuerzo)
    this.totalPiv3.m1_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m1_ComplementoAMPM)
    this.totalPiv3.m1_ComplementoAMPM = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAlmuerzo)
    this.totalPiv3.m3_ComplementoAlmuerzo = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.m3_ComplementoAMPM)
    this.totalPiv3.m3_ComplementoAMPM = acumulador;
    acumulador = 0;
    sedeAsignaRacionPivList.forEach(element => acumulador += element.TotalRaciones)
    this.totalPiv3.TotalRaciones = acumulador;
    return this.totalPiv3;
  }
  fillJornadasTotales3(pivList: PA_PrioSedeAsignaRacionPivExtnd2Model[]): PA_PrioSedeAsignaRacionPivExtnd2Model[] {
    var pivListTotalJornada: PA_PrioSedeAsignaRacionPivExtnd2Model[] = [];
    var pivListTotalJornadaFilter: PA_PrioSedeAsignaRacionPivExtnd2Model[] = [];
    var pivListTotalJornadaElement: PA_PrioSedeAsignaRacionPivExtnd2Model = {
      m1_ComplementoAMPM: null,
      m3_ComplementoAMPM: null,
      Jornada: '',
      Grado: 'Todos',
      id_gradosedeJornada: null,
      Matricula: null,
      m1_ComplementoAlmuerzo: null,
      m1_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzoCualificado: null,
      m3_ComplementoAlmuerzo: null,
      TotalRaciones: null,
    };
    var acumulador = 0;
    pivList.forEach((element, index) => {
      pivListTotalJornada.push(element);
      if (index == (pivList.length - 1)) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAMPM);
        pivListTotalJornadaElement.m1_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAMPM);
        pivListTotalJornadaElement.m3_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaElement = {
          m1_ComplementoAMPM: null,
          m3_ComplementoAMPM: null,
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: null,
          Matricula: null,
          m1_ComplementoAlmuerzo: null,
          m1_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzoCualificado: null,
          m3_ComplementoAlmuerzo: null,
          TotalRaciones: null,
        };
      }
      else if (element.Jornada != pivList[index + 1].Jornada) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAMPM);
        pivListTotalJornadaElement.m1_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzo);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzo = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAMPM);
        pivListTotalJornadaElement.m3_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaFilter = [];
        pivListTotalJornadaElement = {
          m1_ComplementoAMPM: 0,
          m3_ComplementoAMPM: 0,
          Jornada: '',
          Grado: 'Todos',
          id_gradosedeJornada: 0,
          Matricula: 0,
          m1_ComplementoAlmuerzo: 0,
          m1_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzoCualificado: 0,
          m3_ComplementoAlmuerzo: 0,
          TotalRaciones: 0,
        };
      }
    });
    return pivListTotalJornada;
  }

  getTotalLive3() {
    let h = 1
    localStorage.setItem('esp', h.toString());
    this.prioSedeAsignaRacionPivListPAEPI.forEach(element => {
      element.TotalRaciones = element.m1_ComplementoAlmuerzo + element.m1_ComplementoAMPM + element.m3_ComplementoAlmuerzo + element.m3_ComplementoAMPM;
    })
    this.getTotal3(this.prioSedeAsignaRacionPivListPAEPI);
    this.dataSourceSedeGeneralPAEPI = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>(this.fillJornadasTotales3(this.prioSedeAsignaRacionPivListPAEPI));
  }

  writeTable() {
    let h = 1
    localStorage.setItem('esp', h.toString());
    if (this.editSedesForm.value.completar === 0 || this.editSedesForm.value.completar == 1) {
      let gradosNameList = [];
      this.gradosByNivelList = this.gradosList.filter(grado => grado.iD_NivelEducativo == this.editSedesForm.value.nivelEducativo);
      this.gradosByNivelList.forEach(element => gradosNameList.push(element.nombre));
      if (this.tamaño == 10) {

        //MAEM
        this.prioSedeAsignaRacionPivListMAEM.forEach(element => {
          let jornadaValidation = this.editSedesForm.value.jornada ? element.Jornada == this.jornadasList.find(jornada => jornada.id == this.editSedesForm.value.jornada).nombre : true;
          let nivelValidation = this.editSedesForm.value.nivelEducativo ? gradosNameList.includes(element.Grado) : true;
          let modalidadValidation1 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 1 : true;
          let modalidadValidation2 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 3 : true;
          let modalidadValidation3 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 2 : true;
          let racionValidation1 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 1 : true;
          let racionValidation2 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 2 : true;
          if (jornadaValidation && nivelValidation) {
            let relleno = this.editSedesForm.value.completar == 1 ? element.Matricula : 0;
            if (modalidadValidation1 && racionValidation1) {
              element.m1_ComplementoAlmuerzo = relleno;
            }
            if (modalidadValidation1 && racionValidation2) {
              element.m1_ComplementoAMPM = relleno;
            }
            if (modalidadValidation2 && racionValidation1) {
              element.m3_ComplementoAlmuerzo = relleno;
            }
            if (modalidadValidation2 && racionValidation2) {
              element.m3_ComplementoAMPM = relleno;
            }
            if (modalidadValidation3 && racionValidation2) {
              element.m2_ComplementoAMPM = relleno;
            }

          }

          if (element == this.prioSedeAsignaRacionPivListMAEM[this.prioSedeAsignaRacionPivListMAEM.length - 1]) {
            this.editSedesForm.reset();
            this.getTotalLive2();
          }
        });
      } else {
        let ComplementoAlmuerzoCualificado = this.diferencia.includes('m1_ComplementoAlmuerzoCualificado')
        let ComplementoAlmuerzoCualificado2 = this.diferencia.includes('m3_ComplementoAlmuerzoCualificado')
        if (ComplementoAlmuerzoCualificado == true && ComplementoAlmuerzoCualificado2 == true) {
          //MAER
          this.prioSedeAsignaRacionPivListMAER.forEach(element => {
            let jornadaValidation = this.editSedesForm.value.jornada ? element.Jornada == this.jornadasList.find(jornada => jornada.id == this.editSedesForm.value.jornada).nombre : true;
            let nivelValidation = this.editSedesForm.value.nivelEducativo ? gradosNameList.includes(element.Grado) : true;
            let modalidadValidation1 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 1 : true;
            let modalidadValidation2 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 3 : true;
            let racionValidation1 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 1 : true;
            let racionValidation2 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 4 : true;
            if (jornadaValidation && nivelValidation) {
              let relleno = this.editSedesForm.value.completar == 1 ? element.Matricula : 0;
              if (modalidadValidation1 && racionValidation1) {
                element.m1_ComplementoAlmuerzo = relleno;

              }
              if (modalidadValidation1 && racionValidation2) {
                element.m1_ComplementoAlmuerzoCualificado = relleno;
              }
              if (modalidadValidation2 && racionValidation1) {
                element.m3_ComplementoAlmuerzo = relleno;
              }
              if (modalidadValidation2 && racionValidation2) {
                element.m3_ComplementoAlmuerzoCualificado = relleno;
              }

            }

            if (element == this.prioSedeAsignaRacionPivListMAER[this.prioSedeAsignaRacionPivListMAER.length - 1]) {
              this.editSedesForm.reset();
              this.getTotalLive();
            }
          });
        } else {
          //PAEPI
          this.prioSedeAsignaRacionPivListPAEPI.forEach(element => {
            let jornadaValidation = this.editSedesForm.value.jornada ? element.Jornada == this.jornadasList.find(jornada => jornada.id == this.editSedesForm.value.jornada).nombre : true;
            let nivelValidation = this.editSedesForm.value.nivelEducativo ? gradosNameList.includes(element.Grado) : true;
            let modalidadValidation1 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 1 : true;
            let modalidadValidation2 = this.editSedesForm.value.modalidad ? this.editSedesForm.value.modalidad == 3 : true;
            let racionValidation1 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 1 : true;
            let racionValidation2 = this.editSedesForm.value.tipoRacion ? this.editSedesForm.value.tipoRacion == 2 : true;
            if (jornadaValidation && nivelValidation) {
              let relleno = this.editSedesForm.value.completar == 1 ? element.Matricula : 0;
              if (modalidadValidation1 && racionValidation1) {
                element.m1_ComplementoAlmuerzo = relleno;

              }
              if (modalidadValidation1 && racionValidation2) {
                element.m1_ComplementoAMPM = relleno;
              }
              if (modalidadValidation2 && racionValidation1) {
                element.m3_ComplementoAlmuerzo = relleno;
              }
              if (modalidadValidation2 && racionValidation2) {
                element.m3_ComplementoAMPM = relleno;
              }

            }

            if (element == this.prioSedeAsignaRacionPivListPAEPI[this.prioSedeAsignaRacionPivListPAEPI.length - 1]) {
              this.editSedesForm.reset();
              this.getTotalLive3();
            }
          });
        }

      }


    }
  }

  onJornadaClick(value: any) {
    this._nivelEducativoService.getNivelEducativoGetAllBySedeJornadaList(this.SedesJornadasListBySede.find(element => element.iD_Jornada == value).id).subscribe(
      (response: any) => {
        this.selectNivelEducativoList = response;
      },
      (err) => {
      }
    );

  }
  onTipoModalidadRacionClick(value: any) {


    this._PA_TiporacionbyModalidadService.getPA_TiporacionbyModalidadList(this.idSede, value).subscribe(
      (response: any) => {
        this.tipoRacionList = response;
        this.TiposRacionListForever = response;
      },
      (err) => {
      }
    );
  }
  savePriorizacion() {
    let h = 0
    localStorage.setItem('esp', h.toString());
    this.isEditing = false;
    this.route.queryParams.subscribe(params => {
      this.idSede = params.id;
    });

    this.priorizacionesService.getPriorizacionesSede(this.idSede, Number(localStorage.getItem('VigSeleccionada'))).subscribe(
      async (response: any) => {
        this.priorizacionesList = response;

        await this.recorrerPriorizaciones();
        await this.dataSourceInformacionService.fillTableModelOperation(this.idSede, Number(localStorage.getItem('VigSeleccionada')));
      },
      (err) => {
      }
    );
  }

  recorrerPriorizaciones() {
    let vige = Number(localStorage.getItem('VigSeleccionada'));
    if (this.tamaño == 10) {
      //maem
      let h = this.prioSedeAsignaRacionPivListMAEM.length;
      for (let i = 1; i <= h; i++) {
        if (i === h) {
          this.onRegistrarNotificacionesRoles();
        }
      }

      // Función que maneja la lógica de cada tipo de complemento
      const procesarComplemento = (element, index, complementoType: string, tipoModalidad: number, tipoComplemento: number) => {
        if (element[complementoType] !== this.prioSedeAsignaRacionPivListForeverMAEM[index][complementoType]) {
          let busqueda = this.priorizacionesList.find(priorizacion =>
            priorizacion.iD_GradoSedeJornada === element.id_gradosedeJornada &&
            priorizacion.iD_TipoModalidadComplemento === tipoModalidad &&
            priorizacion.iD_TipoComplemento === tipoComplemento &&
            priorizacion.iD_Vigencia === vige &&
            priorizacion.iD_TipoModeloOperacion === 1);

          if (busqueda !== undefined) {
            busqueda.numeroComplementos = element[complementoType];
            busqueda.iD_TipoEstadoPriorizacion = 3;
            if (element[complementoType] === null) {
              busqueda.numeroComplementos = -1;
              busqueda.iD_TipoEstadoPriorizacion = 2;
            }
            this.priorizacionesService.updatePriorizaciones(busqueda).subscribe(
              (response) => { },
              (err) => { }
            );
          } else {
            busqueda = {
              id: 0,
              iD_GradoSedeJornada: element.id_gradosedeJornada,
              siD_GradoSedeJornada: "",
              iD_TipoModalidadComplemento: tipoModalidad,
              siD_TipoModalidadComplemento: "",
              iD_TipoModeloOperacion: this.id_TipoModeloOperativo,
              siD_TipoModeloOperacion: "",
              iD_TipoComplemento: tipoComplemento,
              siD_TipoComplemento: "",
              iD_TipoEstadoPriorizacion: 3,
              siD_TipoEstadoPriorizacion: "",
              iD_Vigencia: vige,
              numeroComplementos: element[complementoType],
              auditoria: "",
              _ippublica: "",
              _nombremaquina: "",
              _usuario: "",
              _ipdetrasproxy: "",
              _browser: "",
              _accion: "",
              _sessionid: "",
              _XMLAuditoria: "",
              isValid: false,
              isSelected: false,
              completed: false,
            };

            if (busqueda.numeroComplementos === null) {
              busqueda.numeroComplementos = -1;
              busqueda.iD_TipoEstadoPriorizacion = 2;
            }
            this.priorizacionesService.addPriorizaciones(busqueda).subscribe(
              (response) => { },
              (err) => { }
            );
          }
        }
      };

      // Procesar cada complemento (m1_ComplementoAlmuerzo, m1_ComplementoAMPM, m2_ComplementoAMPM, m3_ComplementoAlmuerzo, m3_ComplementoAMPM)
      this.prioSedeAsignaRacionPivListMAEM.forEach((element, index) => {
        
         // Comparar y actualizar según sea necesario para el complemento de almuerzo
         if (element.m1_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverMAEM[index].m1_ComplementoAlmuerzo) {
          procesarComplemento(element,index,  'm1_ComplementoAlmuerzo',1,1);
        }
        // Comparar y actualizar según sea necesario para el complemento de AMPM
        if (element.m1_ComplementoAMPM !== this.prioSedeAsignaRacionPivListForeverMAEM[index].m1_ComplementoAMPM) {
          procesarComplemento(element,index,  'm1_ComplementoAMPM',1,2);
        }
        // Comparar y actualizar según sea necesario para el complemento de AMPM
        if (element.m2_ComplementoAMPM !== this.prioSedeAsignaRacionPivListForeverMAEM[index].m2_ComplementoAMPM) {
          procesarComplemento(element,index,  'm2_ComplementoAMPM',2,2);
        }
        // Comparar y actualizar según sea necesario para el complemento de almuerzo m3
        if (element.m3_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverMAEM[index].m3_ComplementoAlmuerzo) {
          procesarComplemento(element, index,'m3_ComplementoAlmuerzo',3, 1 );
        }

        // Comparar y actualizar según sea necesario para el complemento de AMPM
        if (element.m3_ComplementoAMPM !== this.prioSedeAsignaRacionPivListForeverMAEM[index].m3_ComplementoAMPM) {
          procesarComplemento(element, index, 'm3_ComplementoAMPM',3,2);
        }

        // Eliminar priorizaciones para otros tipos de modelo de operación
        let busqueda = this.priorizacionesList.filter(priorizacion =>
          priorizacion.iD_GradoSedeJornada === element.id_gradosedeJornada &&
          priorizacion.iD_Vigencia === vige &&
          priorizacion.iD_TipoModeloOperacion !== 1);

        busqueda.forEach(result => {
          const sedeId = result.id;
          this.priorizacionesService.deletePriorizaciones(sedeId).subscribe(
            (response) => { },
            (err) => { }
          );
        });
      });


    } else {
      let ComplementoAlmuerzoCualificado = this.diferencia.includes('m1_ComplementoAlmuerzoCualificado')
      let ComplementoAlmuerzoCualificado2 = this.diferencia.includes('m3_ComplementoAlmuerzoCualificado')
      if (ComplementoAlmuerzoCualificado == true && ComplementoAlmuerzoCualificado2 == true) {
        //maer
        let h = this.prioSedeAsignaRacionPivListMAER.length;

        for (let i = 1; i <= h; i++) {
          if (i === h) {
            this.onRegistrarNotificacionesRoles();
          }
        }

        const updateOrCreatePriorization = (element, index, complementoType: string, tipoModalidad: number, tipoComplemento: number) => {
          if (element[complementoType] !== this.prioSedeAsignaRacionPivListForeverMAER[index][complementoType]) {
            let busqueda = this.priorizacionesList.find(priorizacion =>
              priorizacion.iD_GradoSedeJornada === element.id_gradosedeJornada &&
              priorizacion.iD_TipoModalidadComplemento === tipoModalidad &&
              priorizacion.iD_TipoComplemento === tipoComplemento &&
              priorizacion.iD_Vigencia === vige &&
              priorizacion.iD_TipoModeloOperacion === 2);
  
            if (busqueda !== undefined) {
              busqueda.numeroComplementos = element[complementoType];
              busqueda.iD_TipoEstadoPriorizacion = 3;
              if (element[complementoType] === null) {
                busqueda.numeroComplementos = -1;
                busqueda.iD_TipoEstadoPriorizacion = 2;
              }
              this.priorizacionesService.updatePriorizaciones(busqueda).subscribe(
                (response) => { },
                (err) => { }
              );
            } else {
              busqueda = {
                id: 0,
                iD_GradoSedeJornada: element.id_gradosedeJornada,
                siD_GradoSedeJornada: "",
                iD_TipoModalidadComplemento: tipoModalidad,
                siD_TipoModalidadComplemento: "",
                iD_TipoModeloOperacion: this.id_TipoModeloOperativo,
                siD_TipoModeloOperacion: "",
                iD_TipoComplemento: tipoComplemento,
                siD_TipoComplemento: "",
                iD_TipoEstadoPriorizacion: 3,
                siD_TipoEstadoPriorizacion: "",
                iD_Vigencia: vige,
                numeroComplementos: element[complementoType],
                auditoria: "",
                _ippublica: "",
                _nombremaquina: "",
                _usuario: "",
                _ipdetrasproxy: "",
                _browser: "",
                _accion: "",
                _sessionid: "",
                _XMLAuditoria: "",
                isValid: false,
                isSelected: false,
                completed: false,
              };
  
              if (busqueda.numeroComplementos === null) {
                busqueda.numeroComplementos = -1;
                busqueda.iD_TipoEstadoPriorizacion = 2;
              }
              this.priorizacionesService.addPriorizaciones(busqueda).subscribe(
                (response) => { },
                (err) => { }
              );
            }
          }
        
        };

        this.prioSedeAsignaRacionPivListMAER.forEach((element, index) => {
          if (element.m1_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverMAER[index].m1_ComplementoAlmuerzo) {
            updateOrCreatePriorization(element,index, 'm1_ComplementoAlmuerzo',1,1 );
          }

          if (element.m1_ComplementoAlmuerzoCualificado !== this.prioSedeAsignaRacionPivListForeverMAER[index].m1_ComplementoAlmuerzoCualificado) {
            updateOrCreatePriorization(element, index, 'm1_ComplementoAlmuerzoCualificado',1,4);
          }

          if (element.m3_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverMAER[index].m3_ComplementoAlmuerzo) {
            updateOrCreatePriorization(element, index, 'm3_ComplementoAlmuerzo',3,1);
          }

          if (element.m3_ComplementoAlmuerzoCualificado !== this.prioSedeAsignaRacionPivListForeverMAER[index].m3_ComplementoAlmuerzoCualificado) {
            updateOrCreatePriorization(element, index, 'm3_ComplementoAlmuerzoCualificado',3,4);
          }

          let busqueda = this.priorizacionesList.filter(priorizacion =>
            priorizacion.iD_GradoSedeJornada == element.id_gradosedeJornada &&
            priorizacion.iD_Vigencia == vige &&
            priorizacion.iD_TipoModeloOperacion != 2
          );

          busqueda.forEach(result => {
            const sedeId = result.id;
            this.priorizacionesService.deletePriorizaciones(sedeId).subscribe();
          });
        });

      } else {
        //paepi
        // Obtener el número de elementos de la lista
        let h = this.prioSedeAsignaRacionPivListPAEPI.length;

        // Realizar una acción cuando se haya iterado por todos los elementos de la lista
        for (var i = 1; i <= h; i++) {
          if (i == h) {
            // Registrar las notificaciones de roles cuando se haya completado la iteración
            this.onRegistrarNotificacionesRoles();
          }
        }

        // Función para actualizar o agregar priorización
        const updatePriorizacion = (element, index, complementoType: string, tipoModalidad: number, tipoComplemento: number) => {
          if (element[complementoType] !== this.prioSedeAsignaRacionPivListForeverPAEPI[index][complementoType]) {
            let busqueda = this.priorizacionesList.find(priorizacion =>
              priorizacion.iD_GradoSedeJornada === element.id_gradosedeJornada &&
              priorizacion.iD_TipoModalidadComplemento === tipoModalidad &&
              priorizacion.iD_TipoComplemento === tipoComplemento &&
              priorizacion.iD_Vigencia === vige &&
              priorizacion.iD_TipoModeloOperacion === 3);
  
            if (busqueda !== undefined) {
              busqueda.numeroComplementos = element[complementoType];
              busqueda.iD_TipoEstadoPriorizacion = 3;
              if (element[complementoType] === null) {
                busqueda.numeroComplementos = -1;
                busqueda.iD_TipoEstadoPriorizacion = 2;
              }
              this.priorizacionesService.updatePriorizaciones(busqueda).subscribe(
                (response) => { },
                (err) => { }
              );
            } else {
              busqueda = {
                id: 0,
                iD_GradoSedeJornada: element.id_gradosedeJornada,
                siD_GradoSedeJornada: "",
                iD_TipoModalidadComplemento: tipoModalidad,
                siD_TipoModalidadComplemento: "",
                iD_TipoModeloOperacion: this.id_TipoModeloOperativo,
                siD_TipoModeloOperacion: "",
                iD_TipoComplemento: tipoComplemento,
                siD_TipoComplemento: "",
                iD_TipoEstadoPriorizacion: 3,
                siD_TipoEstadoPriorizacion: "",
                iD_Vigencia: vige,
                numeroComplementos: element[complementoType],
                auditoria: "",
                _ippublica: "",
                _nombremaquina: "",
                _usuario: "",
                _ipdetrasproxy: "",
                _browser: "",
                _accion: "",
                _sessionid: "",
                _XMLAuditoria: "",
                isValid: false,
                isSelected: false,
                completed: false,
              };
  
              if (busqueda.numeroComplementos === null) {
                busqueda.numeroComplementos = -1;
                busqueda.iD_TipoEstadoPriorizacion = 2;
              }
              this.priorizacionesService.addPriorizaciones(busqueda).subscribe(
                (response) => { },
                (err) => { }
              );
            }
          }
        };

        // Iterar sobre los elementos de la lista y compararlos con la lista anterior
        this.prioSedeAsignaRacionPivListPAEPI.forEach((element, index) => {
          // Comparar y actualizar según sea necesario para el complemento de almuerzo
          if (element.m1_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverPAEPI[index].m1_ComplementoAlmuerzo) {
            updatePriorizacion(element,index,  'm1_ComplementoAlmuerzo',1,1);
          }
          // Comparar y actualizar según sea necesario para el complemento de AMPM
          if (element.m1_ComplementoAMPM !== this.prioSedeAsignaRacionPivListForeverPAEPI[index].m1_ComplementoAMPM) {
            updatePriorizacion(element,index,  'm1_ComplementoAMPM',1,2);
          }
          // Comparar y actualizar según sea necesario para el complemento de almuerzo m3
          if (element.m3_ComplementoAlmuerzo !== this.prioSedeAsignaRacionPivListForeverPAEPI[index].m3_ComplementoAlmuerzo) {
            updatePriorizacion(element, index,'m3_ComplementoAlmuerzo',3, 1 );
          }

          // Comparar y actualizar según sea necesario para el complemento de AMPM
          if (element.m3_ComplementoAMPM !== this.prioSedeAsignaRacionPivListForeverPAEPI[index].m3_ComplementoAMPM) {
            updatePriorizacion(element, index, 'm3_ComplementoAMPM',3,2);
          }

          let busqueda = this.priorizacionesList.filter(priorizacion =>
            priorizacion.iD_GradoSedeJornada === element.id_gradosedeJornada &&
            priorizacion.iD_Vigencia === vige &&
            priorizacion.iD_TipoModeloOperacion !== 3
          );
          busqueda.forEach(result => {
            const sedeId = result.id;
            this.priorizacionesService.deletePriorizaciones(sedeId).subscribe(
              (response) => { },
              (err) => { }
            );
          });

        });
      }
    }
  }
  onGuardarRaciones() {
    this.isEditing = false;
    this.editSedesForm.controls['id_ETC'].setValue(environment.idETC);

    this.prioAsistidaService.getPA_PrioSedeAsistida(this.editSedesForm.value).subscribe(
      (response: any) => {
        this.messageService.showInfo('Registros Actualizados: ' + response[0].afectadas, 'top right');
        if (this.viewingDetail) {
          this.fillDetailTable();
        } else {
          this.fillGeneralTable();
        }
        this.editSedesForm.reset();
      },
      (err) => {
      }
    );
  }

  getRowSpan(path, idx) {
    if (idx === undefined) {

    } else {
      return this.spans[path][idx];
    }

  }
  spanDeep(paths: string[] | null, data: any[]) {

    if (!paths.length) {
      return [...data]
        .fill(0)
        .fill(data.length, 0, 1);
    }

    const copyPaths = [...paths];
    const path = copyPaths.shift();

    const uniq = uniqWith(data, (a, b) => get(a, path) === get(b, path)).map(item => get(item, path));

    return uniq
      .map(uniqItem => this.spanDeep(copyPaths, data.filter(item => uniqItem === get(item, path))))
      .flat(paths.length);
  }


}


