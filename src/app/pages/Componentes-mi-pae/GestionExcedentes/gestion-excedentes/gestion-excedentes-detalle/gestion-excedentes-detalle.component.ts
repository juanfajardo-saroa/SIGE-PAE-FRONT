import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { ExcedentesComplementosService } from 'src/app/shared/services/ExcedentesComplementos.services';
import { ExcedentesComplementosModel } from 'src/app/shared/model/ExcedentesComplementos';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GestionExcedentesModel } from '../../../../../shared/model/GestionExcedentes';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GestionExcedentesService } from '../../../../../shared/services/GestionExcedentes.service';
import { GestionExcedentesParamsModel } from '../../../../../shared/model/GestionExcedentesParams';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import Swal from 'sweetalert2';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { environment } from 'src/environments/environment';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import * as moment from 'moment';
import { PA_ReporteExcedentesService } from 'src/app/shared/services/PA_ReporteExcedentes.services';
import { ETCDivipolaModel } from 'src/app/shared/model/ETCDivipola';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { ETCDivipolaService } from 'src/app/shared/services/ETCDivipola.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { PA_ETCDivipolaGetAllWithRelationService } from 'src/app/shared/services/PA_ETCDivipolaGetAllWithRelation.services';
import { PA_SedesGetAllWithRelationService } from 'src/app/shared/services/PA_SedesGetAllWithRelation.services';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';

@Component({
  selector: 'app-gestion-excedentes-detalle',
  templateUrl: './gestion-excedentes-detalle.component.html',
  styleUrls: ['./gestion-excedentes-detalle.component.scss']
})
export class GestionExcedentesDetalleComponent implements OnInit {
  nombreInstituc = localStorage.getItem('Ubicacion');
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  myDatepipe!: any;
  SedesList: SedesModel[];
  GradosSedesJornadasList: GradosSedesJornadasModel[];
  excedenteRacionList: ExcedentesComplementosModel[];
  SedesJornadaList: SedesJornadaModel[];
  private dataArray: any;
  idsede: number;
  isLoading = true;
  public dataSource!: MatTableDataSource<GestionExcedentesModel>;
  ParametrosList: GestionExcedentesParamsModel[];
  //datos en reporte
  numeroReporte: number;
  fechaReporte: string;
  sedeEducativa: string;
  gradoEscolar: string;
  racionesDiarias: number;
  EstudiantesMatriculados: number;
  excedentesRaciones: number;
  destinoComplemento: string;
  justificacion: string;
  nuevaCantidad: number;
  estadoReporte: string;
  //aprobaciones
  yaCargoAprobaciones = false;
  idAprobaciones = 0;
  form: FormGroup;
  aprobar = [];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  idETC = 0;
  AprobacionesList: any;
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
    plazoPorAprobar: new Date(),
  };
  //historico aprobaciones
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  ExcedentesRacionesObject = [];
  ExcedentesRacionesObjectList: ExcedentesComplementosModel = {
    id: 0,
    iD_Comite: 0,
    siD_Comite: '',
    iD_GradoSedeJornada: 0,
    siD_GradoSedeJornada: '',
    iD_TipoDestinoComplemento: 0,
    siD_TipoDestinoComplemento: '',
    fechaReporte: undefined,
    cantExcedentes: 0,
    auditoria: '',
    justificacion: '',
    id_TipoEstadoExcedentesComplementos: 0,
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
    sid_TipoEstadoExcedentesComplementos: ''
  }
  divipolaList: ETCDivipolaModel[];
  selectDivipolaList: ETCDivipolaModel[];
  institucionList: InstitucionEducativaModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  sedesList: SedesModel[];
  selectSedesList: SedesModel[];
  filterForm: FormGroup;
  idaccion = 0;
  constructor(private router: Router,
    private datepipe: DatePipe,
    private sedesService: SedesService,
    private sedesJornadaService: SedesJornadaService,
    private gradosSedesJornadasService: GradosSedesJornadasService,
    public ExcedentesRacionesService: ExcedentesComplementosService,
    private route: ActivatedRoute,
    private GestionExcedentesService: GestionExcedentesService,
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosAprobaciones: AprobacionesGetAllWithRelService,
    private seguridadService: SeguridadService,
    private reporteExcedentesService: PA_ReporteExcedentesService,
    private institucionEducativaService: InstitucionEducativaService,
    private _PA_ETCDivipolaGetAllWithRelationService: PA_ETCDivipolaGetAllWithRelationService,
    private _PA_SedesGetAllWithRelationService: PA_SedesGetAllWithRelationService,
    private _PA_AprobacionesGetAllFullService: PA_AprobacionesGetAllFullService,
  ) {
    this.filterForm = this.fb.group({
      municipio: [this.dateToday, Validators.required],
      institucionEducativa: ['', Validators.required],
      sede: ['', Validators.required],
    });
    this.myDatepipe = datepipe;
    this.route.queryParams.subscribe(params => {
      this.idsede = params.id;
      this.idAprobaciones = + params.es;
      if (this.idAprobaciones === 2) {
        this.yaCargoAprobaciones = true;
      } else {
        this.yaCargoAprobaciones = false;
      }
    });

    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],
    });


    this.aprobar.push(this.form);
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
  }

  ngOnInit(): void {
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.institucionEducativaService.getInstitucionEducativa(Number(localStorage.getItem('IdUbicacion'))).subscribe(
        (response: any) => {
          this.idETC = response.iD_ETC;
          this.fillTable();
          this.fillTableAprobaciones();
          this.allFilters();
        },
        (err) => {
        }
      )
    } else {
      this.idETC = Number(localStorage.getItem('IdUbicacion'));
      this.fillTable();
      this.fillTableAprobaciones();
      this.allFilters();
    }


  }

  onMunicipioClick(value: any): void {
    this.selectInstitucionList = this.institucionList.filter(institucion => institucion.iD_DiviPola == value);
  }

  onInstitucionClick(value: any): void {
    this.selectSedesList = this.sedesList.filter(sede => sede.iD_lE == value);
  }

  openGestionDetalle(myRowData) {
    this.router.navigate(['/GestionExcedentesDetalle'], { queryParams: { id: myRowData.id, es: myRowData.id_TipoEstadoExcedentesComplementos } }).then(() => {
      window.location.reload();
    });
  }

  onFilterClick() {
    var newestId: number = 0;
    if (this.filterForm.valid) {
      this.reporteExcedentesService.getPA_ReporteExcedentesList(this.idETC).subscribe(
        (response: any) => {
          this.excedenteRacionList = response.filter(element => element.id_sede == this.filterForm.get('sede').value);
          this.excedenteRacionList.forEach(element => {
            if (element.id > newestId) {
              newestId = element.id;
            }
            if (element == this.excedenteRacionList[this.excedenteRacionList.length - 1]) {
              this.openGestionDetalle(this.excedenteRacionList.find(exc => exc.id == newestId));
            }
          })
        },
        (err) => {
        }
      );
    }
  }

  allFilters(): void {
    this._PA_SedesGetAllWithRelationService.getPA_SedesGetAllWithRelationList(this.idETC).subscribe(
      (response: any) => {
        this.selectSedesList = response;
        this.sedesList = response;
      },
      (err) => {
      }
    );

    this._PA_ETCDivipolaGetAllWithRelationService.getPA_ETCDivipolaGetAllWithRelationList(this.idETC).subscribe(
      (response: any) => {
        this.selectDivipolaList = response;
        this.divipolaList = response;
        this.selectDivipolaList = this.selectDivipolaList.sort((a, b) => a.sID_DiviPola.localeCompare(b.sID_DiviPola));
      },
      (err) => {
      }
    );

    this.institucionEducativaService.getInstitucionEducativaListRelationFilter5(this.idETC).subscribe(
      (response: any) => {
        this.selectInstitucionList = response;
        this.institucionList = response;
      },
      (err) => {
      }
    );
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  fillTable() {

    this.reporteExcedentesService.getPA_ReporteExcedentesList(this.idETC).subscribe(
      (response: any) => {
        this.excedenteRacionList = response;
        this.dataArray = response.filter(element => element.id == this.idsede);
        this.dataArray.forEach(element => {
          let ConvertDate = this.myDatepipe.transform(element.fechaReporte, 'dd-MMM-yyyy');
          element.fechaReporte = ConvertDate.toUpperCase().replace(".", "");
        });

        this.isLoading = false;
        this.ExcedentesRacionesObject.push(this.dataArray)
        this.numeroReporte = this.dataArray[0].id;
        this.fechaReporte = this.dataArray[0].fechaReporte;
        this.sedeEducativa = this.dataArray[0].sede;
        this.gradoEscolar = this.dataArray[0].grado;
        this.destinoComplemento = this.dataArray[0].destinoComplemento;
        this.justificacion = this.dataArray[0].justificacion;
        this.estadoReporte = this.dataArray[0].estadoExcedentesComplementos;
        this.excedentesRaciones = this.dataArray[0].cantExcedentes;
        this.filterForm.get('sede').setValue(this.dataArray[0].id_sede);
        this.sedesService.getSedes(this.dataArray[0].id_sede).subscribe(
          (response: any) => {
            this.filterForm.get('municipio').setValue(response.iD_Divipola);
            this.filterForm.get('institucionEducativa').setValue(response.iD_lE);
          },
          (err) => {
          }
        );
        this.GestionExcedentesService.getGestionExcedentesParams(this.dataArray[0].id_GradoSedeJornada).subscribe(
          (response: any) => {
            this.ParametrosList = response;
            this.racionesDiarias = this.ParametrosList[0].cantidadRacionesAsignadas;
            this.EstudiantesMatriculados = this.ParametrosList[0].numeroEstudiantes;
            this.nuevaCantidad = this.racionesDiarias - this.excedentesRaciones
          },
          (err) => {
          }
        );
        this.dataSource = new MatTableDataSource<GestionExcedentesModel>(this.dataArray);
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  fillTableDeprecated() {
    this.sedesService.getSedesList().subscribe(
      (response: any) => {
        this.SedesList = response;
        this.sedesJornadaService.getSedesJornadaListRelation().subscribe(
          (response: any) => {
            this.SedesJornadaList = response;
            this.gradosSedesJornadasService.getGradosSedesJornadasListRelation().subscribe(
              (response: any) => {
                this.GradosSedesJornadasList = response;
                this.ExcedentesRacionesService.getExcedentesComplementosListRelation().subscribe(
                  (response: any) => {
                    this.excedenteRacionList = response;
                    this.dataArray = response.filter(item => item.id == this.idsede);
                    this.dataArray.forEach(element => {
                      element.sedeEducativa = this.SedesList.find(sede => sede.id == this.SedesJornadaList.find(sedeJornada => sedeJornada.id == this.GradosSedesJornadasList.find(gradoSedeJornada => gradoSedeJornada.id == element.iD_GradoSedeJornada).iD_SedeJornada).iD_Sede).nombre;
                      element.gradoEscolar = this.GradosSedesJornadasList.find(gradoSedeJornada => gradoSedeJornada.id == element.iD_GradoSedeJornada).sID_Grado;
                      let ConvertDate = this.myDatepipe.transform(element.fechaReporte, 'yyyy-MM-dd');
                      element.fechaReporte = ConvertDate
                    });
                    this.isLoading = false;
                    this.ExcedentesRacionesObject.push(this.dataArray)
                    this.numeroReporte = this.dataArray[0].id;
                    this.fechaReporte = this.dataArray[0].fechaReporte;
                    this.sedeEducativa = this.dataArray[0].sedeEducativa;
                    this.gradoEscolar = this.dataArray[0].gradoEscolar;
                    this.destinoComplemento = this.dataArray[0].sID_TipoDestinoComplemento;
                    this.justificacion = this.dataArray[0].justificacion;
                    this.estadoReporte = this.dataArray[0].sId_TipoEstadoExcedentesComplementos;
                    this.excedentesRaciones = this.dataArray[0].cantExcedentes;
                    this.GestionExcedentesService.getGestionExcedentesParams(this.dataArray[0].iD_GradoSedeJornada).subscribe(
                      (response: any) => {
                        this.ParametrosList = response;
                        this.racionesDiarias = this.ParametrosList[0].cantidadRacionesAsignadas;
                        this.EstudiantesMatriculados = this.ParametrosList[0].numeroEstudiantes;
                        this.nuevaCantidad = this.racionesDiarias - this.excedentesRaciones
                      },
                      (err) => {
                      }
                    );
                    this.dataSource = new MatTableDataSource<GestionExcedentesModel>(this.dataArray);
                  },
                  (err) => {
                    this.isLoading = false;
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
      },
      (err) => {
      }
    );
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

  mensaje() {
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="position: absolute !important ; top: 5% !important; right: 5% !important"  src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center !important; font-size: 13px; color:#005ACA !important; margin-top: 7%">Confirmar aprobación del Operador: </p> ' +
        ` <div style="text-align: center !important; font-size: 13px; color:#005ACA !important; font-weight: 700;">${this.sedeEducativa}</div> ` +
        '<p style="text-align: center !important; font-size: 13px; color:#005ACA !important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.aprobaciones()
      }
    })
  }

  aprobaciones() {
    if (this.aprobar[0].value.observaciones == ' ') {
      this.AprobacionObject.observaciones = 'Ninguno'
    } else {
      this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
    }
    this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');
    this.AprobacionObject.iD_ETC = this.idETC;
    this.AprobacionObject.id_Secciones = 13;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 1;
    this.AprobacionObject.ubicacionOrigen = this.idsede.toString();
    this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
      (response) => {
        this.fillTableAprobaciones();
        this.clearForm();
        this.ExcedentesRacionesObjectList.id = this.ExcedentesRacionesObject[0][0].id;
        this.ExcedentesRacionesObjectList.cantExcedentes = this.ExcedentesRacionesObject[0][0].cantExcedentes;
        this.ExcedentesRacionesObjectList.fechaReporte = new Date();
        this.ExcedentesRacionesObjectList.iD_Comite = this.ExcedentesRacionesObject[0][0].iD_Comite;
        this.ExcedentesRacionesObjectList.iD_GradoSedeJornada = this.ExcedentesRacionesObject[0][0].id_GradoSedeJornada;
        this.ExcedentesRacionesObjectList.iD_TipoDestinoComplemento = this.ExcedentesRacionesObject[0][0].iD_TipoDestinoComplemento;
        this.ExcedentesRacionesObjectList.justificacion = this.ExcedentesRacionesObject[0][0].justificacion;
        if (response.iD_AccionAprobacion === 1) {
          this.ExcedentesRacionesObjectList.id_TipoEstadoExcedentesComplementos = 1;
        } else {
          this.ExcedentesRacionesObjectList.id_TipoEstadoExcedentesComplementos = 4;
        }
        this.yaCargoAprobaciones = false
        this.ExcedentesRacionesService.updateExcedentesComplementos(this.ExcedentesRacionesObjectList).subscribe((response) => { this.fillTable(); },
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

  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(13).subscribe(
          (response: any) => {
            this.UsersList = response;

            this.serviciosAprobaciones.getGetAprobacionesGetAllWithRelListfilter(13, this.idETC).subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response;
                this.dataArrayAprobaciones.forEach(element => {
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;
                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator;
                this.dataSourceAprobaciones.sort = this.sort;
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

  RegresarGestion() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigateByUrl('/GestionExcedentes')
  }

}