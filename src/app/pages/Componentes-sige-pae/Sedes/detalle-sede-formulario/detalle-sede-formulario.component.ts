import { InstitucionEducativaModel } from './../../../../shared/model/InstitucionEducativa';
import { SedesModel } from './../../../../shared/model/Sedes';
import { LogErroresInterface } from './../../../../shared/model/LogErrores';
import { filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
//librerias
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ValorEscalasModel } from 'src/app/shared/model/ValorEscalas';
import { Subscription } from 'rxjs';
import {
  Component,
  OnDestroy,
  ElementRef,
  OnInit,
  Input,
  Optional,
  Inject,
  Directive,
  DoCheck,
  ViewChild,
  Injectable,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ValorEscalasService } from 'src/app/shared/services/ValorEscalas.services';
import { GetCaracterizacionNivelModel } from 'src/app/shared/model/GetCaracterizacionNivelModel';
import { GetCaracterizacionNivelService } from 'src/app/shared/services/GetCaracterizacionNivel.services';
import { GetCaracterizacionNivel2Model } from 'src/app/shared/model/GetCaracterizacionNivel2Model';
import { GetCaracterizacionNivel2Service } from 'src/app/shared/services/GetCaracterizacionNivel2.services';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { EscalasModel } from 'src/app/shared/model/Escalas';
import { EscalasService } from 'src/app/shared/services/Escalas.services';
import { PA_DiagnosticoInfraEstModel } from 'src/app/shared/model/PA_DiagnosticoInfraEstModel';
import { fileUploadModel } from './../../../../shared/model/fileUpload';
import { DiagnosticoSituacionalExtendService } from './../../../../shared/services/DiagnosticoSituacional-Extend.services';
import * as saveAs from 'file-saver';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { PA_DiagnosticoInfraEstRequest, PA_DiagnosticoInfraEstService } from 'src/app/shared/services/PA_DiagnosticoInfraEst.services';
import { MessageService } from 'src/app/services/message.service';
import { Moment } from 'moment';
import { ValorCaracteristicasService } from 'src/app/shared/services/ValorCaracteristicas.services';
import { CaracterizacionInfraestructuraService } from 'src/app/shared/services/CaracterizacionInfraestructura.services';
import { ValorCaracteristicasModel } from 'src/app/shared/model/ValorCaracteristicas';
import { CaracterizacionInfraestructuraModel } from 'src/app/shared/model/CaracterizacionInfraestructura';
import { DEFAULT_BREAKPOINTS } from '@angular/flex-layout';
import { debugOutputAstAsTypeScript, isNgTemplate } from '@angular/compiler';
import { ValorCaracteristicasAdjuntosModel } from 'src/app/shared/model/ValorCaracteristicasAdjuntos';
import { ValorCaracteristicasAdjuntosService } from 'src/app/shared/services/ValorCaracteristicasAdjuntos.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GetCaracterizacionValidacionService } from 'src/app/shared/services/GetCaracterizacionValidacion.services';
import { GetCaracterizacionValidacionModel } from 'src/app/shared/model/GetCaracterizacionValidacionModel';
import { stringify } from 'querystring';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services'
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { PA_DiagnosticoInfraEstbySedeRequest, PA_DiagnosticoInfraEstbySedeService } from 'src/app/shared/services/PA_DiagnosticoInfraEstbySede.services';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-detalle-sede-formulario',
  templateUrl: './detalle-sede-formulario.component.html',
  styleUrls: ['./detalle-sede-formulario.component.scss']
})
export class DetalleSedeFormularioComponent implements OnInit, OnDestroy, DoCheck {
  date: { year: number; month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  model: NgbDateStruct;
  public nombreUbicacion = localStorage.getItem('Ubicacion');
  currentYear = new Date().getFullYear();
  currentVig = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  currentVigNom = '';
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  idsede: number;
  tipoE: number;
  nombreSede: string;
  codigoDane: string;
  nombreInstitucion: string;
  nombreMunicipio: string;
  selecionmodelo: number;
  private subs = new Subscription();
  pintaicono: boolean = true;
  public Selectsn: number;

  esEdicion: boolean = false;
  guardar: boolean = true;
  guardarParcial: boolean = true;
  activarbotonenviar: boolean = false;
  maxfileerror: any;

  //Guardar los modelos de Caracterizacion
  valorEscalaList: ValorEscalasModel[] = [];
  caracterizacionNivelList: GetCaracterizacionNivelModel[] = [];
  caracterizacionNivel2List: GetCaracterizacionNivel2Model[] = [];
  sedeList: PA_DiagnosticoInfraEstModel[] = [];
  EscalaList: EscalasModel[] = [];
  validarList: GetCaracterizacionValidacionModel[] = [];
  escala = [];
  pregunta = [];
  valor = [];
  apagado = false;
  valorCaracteristicasList: ValorCaracteristicasModel[] = [];
  valorAdjuntoList: ValorCaracteristicasModel[] = [];
  form: FormGroup;
  action: string;
  local_data: any;
  AprobacionesList: any;
  AprobacionesList2: any;
  lista2 = [];
  fechadocument: Date;
  // capturar los valoresCaracteristicas
  ValorCaracteristicasObject: ValorCaracteristicasModel = {
    sID: '',
    id: 0,
    iD_Caracterizacion: 0,
    sID_Caracterizacion: '',
    iD_ValorEscala: 0,
    sID_ValorEscala: '',
    auditoria: '',
    iD_Caracteristica: 0,
    sID_Caracteristica: '',
    filtro: '',
    valor: 0,
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
  };
  // capturar los valores caracterizacion infraestructura
  CaracterizacionInfraestructuraObject: CaracterizacionInfraestructuraModel = {

    id: 0,
    sID: '',
    iD_Sede: 0,
    sID_Sede: '',
    iD_Inventario: null,
    sID_Inventario: '',
    fechaCaracterizacion: new Date(),
    fechaModificacion: new Date(),
    descripcion: '',
    chS_Fecha: new Date(),
    chS_Documento: '',
    rutaArchivo: '',
    auditoria: '',
    filtro: '',
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
    suficienciaDotacion: null,
    id_TipoEstadoCaracterizacion: null,
    id_TipoModalidadComplementoSugerida: null,
  };
  // llamar el metodo get en caracterizacion infraestructura

  ValorCaracteristicasAdjuntosObject: ValorCaracteristicasAdjuntosModel = {

    id: 0,
    sID: '',
    id_ValorCaracteristicas: 0,
    sid_ValorCaracteristicas: '',
    adjunto: '',
    fecha: '',
    auditoria: '',
    filtro: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: false,
    isSelected: false,
    completed: false,
    _accion: '',
  };
  // capturar los valores Aprobaciones
  AprobacionObject: AprobacionesModel = {
    id: 0,
    sID: '',
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: null,
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
  //filtros

  selMunicipio = -1;
  selInst = -1;
  selsede = -1;
  selprioriza = -1;
  selectSedesList: SedesModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  selectDivipolaList: DivipolasModel[];
  selectDivipolaList2: DivipolasModel[];
  priorizaListT: any[] = [];
  priorizaList = [
    { id: 1, nombre: "Si" },
    { id: 0, nombre: "No" },
  ];
  dataArrayDiag: any;
  PA_DiagnosticoInfraEstParams: PA_DiagnosticoInfraEstRequest = {};
  EsETC = false;
  PA_PrioSedeBeneficiariasParams: PA_PrioSedeBeneficiarias = {};
  PA_InstitucionEducativaRequest: PA_InstitucionEducativaGetAllWithRelationRequest = {};
  PA_DiagnosticoInfraEstbySedeParams: PA_DiagnosticoInfraEstbySedeRequest = {}
  constructor(
    private router: Router,
    private valorEscala: ValorEscalasService,
    private caracterizacionNivel: GetCaracterizacionNivelService,
    private caracterizacionNivel2: GetCaracterizacionNivel2Service,
    public servicios: PA_DiagnosticoInfraEstService,
    private route: ActivatedRoute,
    private Escala: EscalasService,
    public serviciosAr: DiagnosticoSituacionalExtendService,
    private valorCaracteristicas: ValorCaracteristicasService,
    private CaracterizacionInfraestructura: CaracterizacionInfraestructuraService,
    private ValorCaracteristicasAdjuntos: ValorCaracteristicasAdjuntosService,
    private aprobacionesService2: AprobacionesService,
    private fb: FormBuilder,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: GetCaracterizacionNivel2Model,
    public datepipe: DatePipe,
    private calendar: NgbCalendar,
    private validarformulario: GetCaracterizacionValidacionService,
    public dialog: MatDialog,
    private seguridadService: SeguridadService,
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
    private divipolaService: DivipolasService,
    private sedesService: SedesService,
    private _PA_InstitucionEducativaGetAllWithRelationService: PA_InstitucionEducativaGetAllWithRelationService,
    private _PA_RegistrarNotificacionService: PA_RegistrarNotificacionService,
    private _PA_DiagnosticoInfraEstbySedeService: PA_DiagnosticoInfraEstbySedeService,
  ) {

    this.currentVigNom = this.currentVig.nombre;
    this.form = this.fb.group({});
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.route.queryParams.subscribe(params => {
      this.idsede = + params.id;
      this.tipoE = + params.dia;
    });

    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {
      let g = Number(localStorage.getItem('IdUbicacion'))
      if (g == 0 || g == undefined) { } else {
        this.PA_DiagnosticoInfraEstParams.ID_ETC = Number(localStorage.getItem('IdUbicacion'));
        this.EsETC = true;

      }
      this.servicios.getPA_DiagnosticoInfraEstList(this.PA_DiagnosticoInfraEstParams).subscribe(
        (response: any) => {
          this.dataArrayDiag = response;



        },
        (err) => {


        }
      );

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {

      this.PA_DiagnosticoInfraEstParams.ID_ETC = 0
      this.PA_DiagnosticoInfraEstParams.ID_institucionEducativa = Number(localStorage.getItem('IdUbicacion'));
      this.EsETC = false;
      this.servicios.getPA_DiagnosticoInfraEstList(this.PA_DiagnosticoInfraEstParams).subscribe(
        (response: any) => {
          this.dataArrayDiag = response;



        },
        (err) => {


        }
      );
    }



  }


  /*
  Metodo Incio
  */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idsede = + params.id;
      this.tipoE = + params.dia;
      if (params.et == undefined) {
        this.idETC = Number(localStorage.getItem('IdUbicacion'));
      } else {
        this.idETC = + params.et;
      }
    });
    this.nombreSede = localStorage.getItem('ps');
    this.nombreMunicipio = localStorage.getItem('pm');
    this.nombreInstitucion = localStorage.getItem('pi');
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.PA_PrioSedeBeneficiariasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede = this.idsede

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {

      this.PA_PrioSedeBeneficiariasParams.id_ETC = 0
      this.PA_PrioSedeBeneficiariasParams.Id_InstEducativa = Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede = this.idsede
    }
    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList3(this.PA_PrioSedeBeneficiariasParams).subscribe(
      (response: any) => {

        this.priorizaListT = response;
        if (this.priorizaListT.length == 0) {
          this.selprioriza = 0;
          this.divipolaService.getDivipolasListRelationFilter2(nombrecortado[1].replace(/ /g, "")).subscribe(
            (response: any) => {
              this.selectDivipolaList2 = response
              this.selMunicipio = response[0].id;
              this.nombreMunicipio = this.selectDivipolaList2[0].nombre;
              this.divipolaService.getDivipolasListRelationFilter3(this.selectDivipolaList2[0].departamentoCode).subscribe(
                (response: any) => {
                  this.selectDivipolaList = response;
                  this.selectDivipolaList.sort(function (a, b) {
                    const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });
                  this.PA_InstitucionEducativaRequest.Id_DiviPola = this.selMunicipio;
                  this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
                    (response: any) => {
                      this.selectInstitucionList = response;
                      this.selectInstitucionList.sort(function (a, b) {
                        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }

                        // names must be equal
                        return 0;
                      });
                      let h = response.filter(item => item.nombre == this.nombreInstitucion)


                      if (h.length != 0) {
                        this.selInst = h[0].id;
                        this.nombreInstitucion = h[0].nombre;
                        let f = 0
                        if (primernombre == 'ETC') {

                          f = Number(localStorage.getItem('IdUbicacion'));


                        } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {


                          f = h[0].iD_ETC;

                        }
                        this.sedesService.getSedesListRelationFilter2(f, this.selMunicipio, this.selInst).subscribe(
                          (response: any) => {
                            this.selectSedesList = response;
                            this.selectSedesList.sort(function (a, b) {
                              const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            let h = response.filter(item => item.nombre == this.nombreSede)
                            this.selsede = h[0].id;
                            this.nombreSede = h[0].nombre;
                            this.codigoDane = h[0].codigoDane || '';

                          },
                          (err) => {
                          }
                        );

                      }



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
        } else {
          let p = response[0].priorizadaPAE == true
          if (p == true) {
            this.selprioriza = 1;
          } else {
            this.selprioriza = 0;
          }
          this.divipolaService.getDivipolasListRelationFilter(response[0].id_Municipio).subscribe(
            (response: any) => {
              this.selectDivipolaList2 = response
              this.selMunicipio = response[0].id;
              this.nombreMunicipio = this.selectDivipolaList2[0].nombre;
              this.divipolaService.getDivipolasListRelationFilter3(this.selectDivipolaList2[0].departamentoCode).subscribe(
                (response: any) => {
                  this.selectDivipolaList = response;
                  this.selectDivipolaList.sort(function (a, b) {
                    const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  });
                  this.PA_InstitucionEducativaRequest.Id_DiviPola = this.selMunicipio;
                  this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
                    (response: any) => {
                      this.selectInstitucionList = response;
                      this.selectInstitucionList.sort(function (a, b) {
                        const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                        const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }

                        // names must be equal
                        return 0;
                      });
                      let h = response.filter(item => item.id == this.priorizaListT[0].id_InstEducativa)


                      if (h.length != 0) {
                        this.selInst = h[0].id;
                        this.nombreInstitucion = h[0].nombre;
                        let f = 0
                        if (primernombre == 'ETC') {

                          f = Number(localStorage.getItem('IdUbicacion'));


                        } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {


                          f = h[0].iD_ETC;

                        }
                        this.sedesService.getSedesListRelationFilter2(f, this.selMunicipio, this.selInst).subscribe(
                          (response: any) => {
                            this.selectSedesList = response;
                            this.selectSedesList.sort(function (a, b) {
                              const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                              const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            });

                            let h = response.filter(item => item.id == this.priorizaListT[0].id_sede)
                            this.selsede = h[0].id;
                            this.nombreSede = h[0].nombre;
                            this.codigoDane = h[0].codigoDane || '';

                          },
                          (err) => {
                          }
                        );

                      }



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




      },
      (err) => {
      }
    );


    //caracterizacion nivel 1
    this.caracterizacionNivel.getGetCaracterizacionNivelList().subscribe(
      (response: any) => {
        this.caracterizacionNivelList = response;
      },
      (err) => {
      }
    );
    //caracterizacion nivel 2

    this.caracterizacionNivel2
      .getGetCaracterizacionNivel2List(this.idsede)
      .subscribe(
        (response: any) => {
          this.caracterizacionNivel2List = response;

          this.form = this.fb.group({
            id: [response.id],
            categoria1erNivel: [response.categoria1erNivel],
            idCategoria2doNivel: [response.idCategoria2doNivel],
            categoria2doNivel: [response.categoria2doNivel],
            iconoCategoria: [response.iconoCategoria],
            idPregunta: [response.idPregunta, Validators.required],
            pregunta: [response.pregunta],
            iconoPregunta2doNivel: [response.iconoPregunta2doNivel],
            idEscala: [response.idEscala],
            nombreEscala: [response.nombreEscala],
            ordenPregunta: [response.ordenPregunta],
            idPreguntaPadre: [response.idPreguntaPadre],
            tercerNivel: [response.tercerNivel],
            activar: [response.activar],
            isValid: [response.isValid],
            isSelected: [response.isSelected],
            completed: [response.completed],
            valorRespuesta: [response.valorRespuesta, Validators.required],
            contenidoRespuesta: [response.contenidoRespuesta],
            tipoPregunta: [response.tipoPregunta],
            mostrarIcono: [response.mostrarIcono],
          });
          if (response.iconoPregunta2doNivel === 'Iconos_PAE-150') {
            this.pintaicono = false;
          } else {
            this.pintaicono = true;
          }

        },
        (err) => {
        }
      );

    // Escala
    this.Escala.getEscalasList().subscribe(
      (response: any) => {
        this.EscalaList = response;
      },
      (err) => {
      }
    );
    // valor escala nivel 2

    this.valorEscala.getValorEscalasList().subscribe(
      (response: any) => {
        this.valorEscalaList = response;
        //this.valorEscalaList.find(item=>item.encenderHijos)
      },
      (err) => {
      }
    );
    this.CaracterizacionInfraestructuraObject.iD_Sede = this.idsede;
    this.CaracterizacionInfraestructuraObject.descripcion =
      'Formulario de Infraestructura:' + this.idsede;
    this.CaracterizacionInfraestructuraObject.fechaCaracterizacion = new Date();
    this.CaracterizacionInfraestructuraObject.id_TipoEstadoCaracterizacion = (this.tipoE === 3) ? 3 : (this.tipoE === 4 ? 4 : this.CaracterizacionInfraestructuraObject.id_TipoEstadoCaracterizacion);


    this.CaracterizacionInfraestructura.addCaracterizacionInfraestructura(this.CaracterizacionInfraestructuraObject).subscribe(
      (response: any) => {
        let z = response.id;
        this.ValorCaracteristicasObject.iD_Caracterizacion = z;
        localStorage.setItem('idCaracterizacion', z);
      },
      (err) => {

      }
    );


    this.caracterizacionNivel2
      .getGetCaracterizacionNivel2List(this.idsede)
      .subscribe(
        (response: any) => {
          let p = response.filter(item => item.idPregunta === 6);
          if (p[0].valorRespuesta === 0) {
            let ph = null
            this.fechadocument = ph
          } else {

            // Simulando la fecha obtenida desde la API
            const fechaApi = new Date(p[0].contenidoRespuesta); // Fecha de la API
            const diferenciaHoraria = fechaApi.getTimezoneOffset() * 60000; // Obtener la diferencia horaria en milisegundos
            // Crear una nueva fecha compensando la diferencia horaria
            this.fechadocument = new Date(fechaApi.getTime() + diferenciaHoraria);

          }




        },

        (err) => {

        }
      );
  }

  //solo numeros
  ngDoCheck() { }

  chequeaformulario() {
    this.activarbotonenviar = false;
    // se verifica si todos los campos son diligenciados
    let contarcompletitudtotalsi = 0;
    let contarcompletitudtotalno = 0;
    for (var propName in this.caracterizacionNivel2List) {
      // if(this.caracterizacionNivel2List[propName].idPreguntaPadre === null || this.caracterizacionNivel2List[propName].idPreguntaPadre===0)
      // {
      if (this.caracterizacionNivel2List[propName].valorRespuesta > 0) {
        contarcompletitudtotalsi++;
        this.caracterizacionNivel2List[propName].completed = true;
      } else {
        contarcompletitudtotalno++;
        this.caracterizacionNivel2List[propName].completed = false;
      }
      // }
    }

    if (contarcompletitudtotalno === 0) {
      this.activarbotonenviar = true;
      return;
    }

    else { this.activarbotonenviar = false; }

    // se verifica si los padres tienen llenos los registros y si los hijos deberian tener o no respuestas

    let verificacompletitud = this.caracterizacionNivel2List.filter(
      (item) => (item.completed = true)
    );
    let contarcompletitudpadresi = 0;
    let contarcompletitudtotalpadreno = 0;
    let comletitudhijosi = 0;
    let completitudhijono = 0;
    for (var propName in this.caracterizacionNivel2List) {
      if (
        this.caracterizacionNivel2List[propName].idPreguntaPadre === null ||
        this.caracterizacionNivel2List[propName].idPreguntaPadre === 0
      ) {
        if (this.caracterizacionNivel2List[propName].valorRespuesta > 0) {
          contarcompletitudpadresi++;
          this.caracterizacionNivel2List[propName].activar = true;
        } else {
          contarcompletitudtotalpadreno++;
          this.caracterizacionNivel2List[propName].activar = false;
        }
      } else {
        let valorpadre = 0;
        let valorPreguntaPadre = 0;
        let validEscala = 0;
        let valorrespuestapadre = 0;
        valorPreguntaPadre = this.caracterizacionNivel2List[propName].idPreguntaPadre;
        for (var prodPadres in this.caracterizacionNivel2List) {
          if (this.caracterizacionNivel2List[prodPadres].idPregunta === valorPreguntaPadre) {
            validEscala = this.caracterizacionNivel2List[prodPadres].idEscala;
            valorrespuestapadre = this.caracterizacionNivel2List[prodPadres].valorRespuesta;
          }
        }


        if (
          (validEscala === 7 && valorrespuestapadre === 15) ||
          (validEscala === 1 && valorrespuestapadre === 1) ||
          (validEscala === 3 && valorrespuestapadre === 7) ||
          (validEscala === 3 && valorrespuestapadre === 8) ||
          (validEscala === 3 && valorrespuestapadre === 9) ||
          (validEscala === 4 && valorrespuestapadre === 12) ||
          (validEscala === 13) ||
          (validEscala === 14) ||
          (validEscala === 35) ||
          (validEscala === 37) ||
          (validEscala === 22 && valorrespuestapadre === 98)


        ) {
          if (this.caracterizacionNivel2List[propName].valorRespuesta > 0) {
            this.caracterizacionNivel2List[propName].activar = true;
            comletitudhijosi++;
          } else {
            completitudhijono++;
            this.caracterizacionNivel2List[propName].activar = false;
          }
        }
        else {
          completitudhijono++;
        }
      }
    }

    if (contarcompletitudtotalpadreno === 0 && completitudhijono === 0) {
      this.activarbotonenviar = true;
      return;
    }
    else { this.activarbotonenviar = false; }




  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    localStorage.removeItem('nombredeUbicacionActualizado')
  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  //metodos de los filtros

  onMunicipioClick(event: number): any {
    this.selInst = -1;
    this.selsede = -1;

    if (event == -1) {

    } else {
      this.PA_InstitucionEducativaRequest.Id_DiviPola = event;
      this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
        (response: any) => {
          this.selectInstitucionList = response;
        },
        (err) => {
        }
      );
    }


  }
  onInstitucionClick(event: number): void {
    this.selsede = -1;
    if (event == -1) {

    } else {
      this.sedesService.getSedesListRelationFilter3(event).subscribe(
        (response: any) => {
          this.selectSedesList = response;

        },
        (err) => {
        }

      );
    }
  }
  onSedeClick(event: number): void {

  }
  buscarInfo(mun: number, ie: number, sd: number): void {

    let h = this.dataArrayDiag.filter(item => item.id_sede == sd);

    let sl = this.caracterizacionNivel2List.filter(item => item.isSelected === true).length

    if (this.selsede == -1) {
      Swal.fire({
        showCloseButton: false,
        html:
          '<img style="position: absolute !important ; top: 5% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No has seleccionado una sede especifica </p> ',
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',

        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: false,
        denyButtonText: `Aceptar`,
      }).then((result) => {
        if (result.isDenied) {

        } else {

        }
      })
    } else {
      if (h == 0) {
        Swal.fire({
          showCloseButton: false,
          html:
            '<img style="position: absolute !important ; top: 5% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
            '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No hay cuestionario para ese municipio </p> ',
          showConfirmButton: false,
          showCancelButton: true,
          confirmButtonColor: '#009922',
          cancelButtonColor: '#FF0000',
          denyButtonColor: '#009922',

          confirmButtonText: 'Aceptar Aprobaciones',
          cancelButtonText: 'Cancelar',
          showDenyButton: false,
          denyButtonText: `Aceptar`,
        }).then((result) => {
          if (result.isDenied) {

          } else {

          }
        })

      } else {
        if (sl == 0) {
          let j = this.selectInstitucionList.filter(item => item.id == ie)
          let k = this.selectSedesList.filter(item => item.id == sd)
          let f = this.selectDivipolaList.filter(item => item.id == mun)
          localStorage.setItem('ps', k[0].nombre);
          localStorage.setItem('pm', f[0].nombre);
          localStorage.setItem('pi', j[0].nombre);
          this.router.navigate(['/DetalleSede'], { queryParams: { id: h[0].id_sede, tab: 0, dia: h[0].diagnostico } }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            showCloseButton: false,
            html:
              '<img style="position: absolute !important ; top: 5% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No puedes continuar: </p> ' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">has olvidado guardarlo el cuestionario</p> ',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#009922',
            cancelButtonColor: '#FF0000',
            denyButtonColor: '#009922',

            confirmButtonText: 'Aceptar Aprobaciones',
            cancelButtonText: 'Cancelar',
            showDenyButton: false,
            denyButtonText: `Aceptar`,
          }).then((result) => {
            if (result.isDenied) {

            } else {

            }
          })
        }
      }

    }




  }

  /*
  Metodo  obtener la area  Nivel 2
  */
  nivel2(value: number): GetCaracterizacionNivel2Model[] {

    const r = this.caracterizacionNivel2List
      .filter((items) => items.id === value)
      .sort((o) => o.ordenPregunta);
    //const r = this.caracterizacionNivel2List.filter(items=>items.id === value && items.idPreguntaPadre==null).sort(o=>o.OrdenPregunta);
    const rd = r.filter((d, i, arr) => {
      return (
        arr.indexOf(
          arr.find((t) => t.idCategoria2doNivel == d.idCategoria2doNivel)
        ) == i
      );
    });
    return rd;
  }

  /*
Metodo  // obtener las preguntas del nivel 2
*/

  nivel2_1(value: number): GetCaracterizacionNivel2Model[] {
    if (!value) return this.caracterizacionNivel2List;
    const rs = this.caracterizacionNivel2List
      .filter((items) => items.idCategoria2doNivel === value)
      .sort((o) => o.ordenPregunta);
    return rs;
  }

  //obtener la escala id
  escalanivel2(value: number): EscalasModel[] {
    const en2 = this.EscalaList.filter((escala) => escala.id == value);
    return en2;
  }

  // obtener el valor de escala
  obtenerEscala(value: number): ValorEscalasModel[] {
    const es = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.iD_Escala == value
    );

    return es;
  }

  // boton de regresar
  RegresarInfraestura() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('ps');
    localStorage.removeItem('pm');
    localStorage.removeItem('pi');
    this.router.navigateByUrl('/Sedes');

  }

  //activar los hijos select
  selectionSelect($event, idvalorEscala: number, idPregunta: number) {
    localStorage.setItem('Pregunta' + idPregunta.toString(), $event);
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idvalorEscala.toString());

    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta === idPregunta) {
        item.contenidoRespuesta = $event.toString();
        item.isSelected = true;
        item.valorRespuesta = $event;
      }
    });

    //activar las respuestas


    //activar los hijos
    const respuesta = this.valorEscalaList.filter((ValorEscala) => ValorEscala.id == $event);
    const encender = respuesta.some((element) => element.encenderHijos);

    if (encender == true) {

      const vlescala = this.caracterizacionNivel2List.filter((items) => items.idEscala === idvalorEscala);
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);

      if (padrepreg === false) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {

            item.tercerNivel = 1;

            if (item.idPregunta != 6 && item.idPregunta != 7) {
              item.valorRespuesta = 0;
            }


            item.isSelected = true;
            /*setTimeout(function () {
              item.activar = false;
            }, 10000); */
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {

          item.tercerNivel = 0;
          if (item.idPregunta == 6 || item.idPregunta == 7) {
            item.valorRespuesta = 0;
            localStorage.setItem('Documento' + 7, '0')
            localStorage.setItem('Fecha' + 6, '0000-00-00')
          } else {
            item.valorRespuesta = -1;
          }
          item.isSelected = true;

        }
      });
    }

  }

  //activar los hijos botton
  activarhijos(value: number, idvalorEscala: number, idPregunta: number) {

    localStorage.setItem('Pregunta' + idPregunta.toString(), value.toString());
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idvalorEscala.toString());

    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = value;
      }
    });
    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idvalorEscala
      );
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);
      if (padrepreg === false) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {

            item.tercerNivel = 1;
            item.isSelected = true;
            if (item.idPregunta === 54 || item.idPregunta === 33) {
              item.valorRespuesta = null;
            } else {
              item.valorRespuesta = -1;
            }
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {

      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = -1;
          item.isSelected = true;
        }
      });
    }

  }

  activarhijos2(value: number, idvalorEscala: number, idPregunta: number) {
    localStorage.setItem('Pregunta' + idPregunta.toString(), value.toString());
    localStorage.setItem('Caracteristica' + idPregunta.toString(),

      idPregunta.toString()
    );
    localStorage.setItem(
      'Escala' + idPregunta.toString(),
      idvalorEscala.toString()
    );
    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = value;
      }
    });
    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idvalorEscala
      );
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);
      if (padrepreg === false) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 1;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = -1;
          item.isSelected = true;

        }
      });
    }

  }

  activarhijos3(value: number, idvalorEscala: number, idPregunta: number) {
    localStorage.setItem('Pregunta' + idPregunta.toString(), value.toString());
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idvalorEscala.toString());
    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = value;
      }
    });
    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idvalorEscala
      );
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);
      if (padrepreg === true) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 1;
            item.isSelected = true;
            if (item.idPregunta === 54 || item.idPregunta === 33) {
              item.valorRespuesta = 0;
              item.tercerNivel = 1;
            } else {

              item.valorRespuesta = -1;


            }
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {

      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          if (item.idPregunta === 33) {
            item.valorRespuesta = null;
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == 35) {
                item.valorRespuesta = null;
                item.isSelected = true;
                item.tercerNivel = 0;
              }
              if (item.idPregunta == 36) {
                item.valorRespuesta = null;
                item.isSelected = true;
                item.tercerNivel = 0;
              }
            });
          } else {
            if (item.idPregunta === 54) {
              item.tercerNivel = 0;
              item.valorRespuesta = null;
              item.isSelected = true;
            } else {
              item.valorRespuesta = -1;
            }

          }

          item.isSelected = true;
        }
      });
    }

  }

  activarhijos4(value: number, idvalorEscala: number, idPregunta: number) {
    localStorage.setItem('Pregunta' + idPregunta.toString(), value.toString());
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idvalorEscala.toString());
    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = value;
      }
    });
    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idvalorEscala
      );
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);
      if (padrepreg === false) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 1;
            item.isSelected = true;
            if (item.idPregunta === 54 || item.idPregunta === 33) {
              item.valorRespuesta = 0;
            } else {
              item.valorRespuesta = -1;
            }
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {

      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = -1;
          item.isSelected = true;
        }
      });
    }

  }

  activarhijos5(value: number, idvalorEscala: number, idPregunta: number) {
    localStorage.setItem('Pregunta' + idPregunta.toString(), value.toString());
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idvalorEscala.toString());
    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = value;
      }
    });
    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idvalorEscala
      );
      const padrepreg = vlescala.some((element) => element.idPreguntaPadre);
      if (padrepreg === false) {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 1;
            item.isSelected = true;
            if (item.idPregunta === 54 || item.idPregunta === 33) {
              item.valorRespuesta = 0;
            } else {
              item.valorRespuesta = -1;
            }
          }
        });
      } else {
        const rp1 = this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = -1;
            item.isSelected = true;
          }
        });
      }
    } else {

      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = -1;
          item.isSelected = true;
        }
      });
    }

  }
  //activar los hijos increment number
  cantnum: Array<any> = [];
  cantnum2: boolean = false;

  /*
  iNCREMENTALES
  */
  cant: Number[] = [];
  onKeyCnt(e: KeyboardEvent) {

    if (e.keyCode != 8) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  changeItemNombre1(e: any) {


    var inp = String.fromCharCode(e.keyCode);

    if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/.test(inp)) {

      return true;

    } else {
      e.preventDefault();

      return false;
    }

  }

  cantidadinput(value: number, idEscala: number, idPregunta: number, $event, idPadre: number | null, maximo: number) {

    localStorage.setItem('Pregunta' + idPregunta.toString(), $event);
    localStorage.setItem('Caracteristica' + idPregunta.toString(), idPregunta.toString());
    localStorage.setItem('Escala' + idPregunta.toString(), idEscala.toString());

    const respuesta = this.valorEscalaList.filter(
      (ValorEscala) => ValorEscala.id == value
    );
    const encender = respuesta.some((element) => element.encenderHijos);
    this.caracterizacionNivel2List.forEach((item) => {
      if (item.idPregunta == idPregunta) {
        item.contenidoRespuesta = value.toString();
        item.isSelected = true;
        item.valorRespuesta = $event;
      }
    });

    if (idPadre == null || idPadre === 52 || idPadre === 30 || idPadre === 33) {
      idPadre = 0;
    } else {
      let valorpadre = 0;
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta === idPadre) {
          valorpadre = item.valorRespuesta;
        }
      });
      //


      if (valorpadre > $event) {
        if (valorpadre == 10) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }

        } else if (valorpadre == 9) {

          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }

        } else if (valorpadre == 8) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 7) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 6) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 5) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 4) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 3) {
          if ($event == 0 || $event == 1 || $event == 2) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 2) {
          if ($event == 0 || $event == 1) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 1) {
          if ($event == 0) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 11) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 12) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 13) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 14) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 15) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 16) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 17) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 18) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 19) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 20) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 21) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 22) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 23) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 24) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 25) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }

        //
        else if (valorpadre == 26) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 27) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 28) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 29) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 30) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 31) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //
        else if (valorpadre == 32) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 33) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 34) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 35) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 36) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 37) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 38) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 39) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 40) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 41) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-42
        else if (valorpadre == 42) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 43) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 44) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 45) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 46) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 47) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 48) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 49) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 50) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 51) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-52
        else if (valorpadre == 52) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 53) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 54) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 55) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50
            || $event == 51 || $event == 52 || $event == 53 || $event == 54) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 56) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 57) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 58) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 59) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 60) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 61) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-62
        else if (valorpadre == 62) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 63) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 64) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 65) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 66) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 67) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 68) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 69) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 70) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 71) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-72
        else if (valorpadre == 72) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 73) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 74) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 75) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 76) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 77) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 78) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 79) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 80) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 81) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-82
        else if (valorpadre == 82) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 83) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 84) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 85) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 86) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 87) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 88) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 89) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 90) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 91) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-92
        else if (valorpadre == 92) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 93) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 94) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 95) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 96) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 97) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 98) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95
            || $event == 96 || $event == 97) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 99) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 100) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 101) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-102
        else if (valorpadre == 102) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 103) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 104) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 105) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 106) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 107) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 108) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 109) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 110) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 111) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-112
        else if (valorpadre == 112) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 113) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 114) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 115) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110
            || $event == 111 || $event == 112 || $event == 113 || $event == 114) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 116) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 117) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 118) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 119) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117 || $event == 118) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 120) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117 || $event == 118 || $event == 119) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 0) {
          if ($event == 0) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Debería ser mayor que 0',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor  no puede ser 0',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }

        //fin
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Valor ingresado es superior a lo permitido',
            showConfirmButton: false,
            timer: 3500,
          });

          this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPregunta == idPregunta) {
              item.contenidoRespuesta = '0';
              item.isSelected = false;
              item.valorRespuesta = 0;
              $event = 0;
            }
          });
        }

      } else if (valorpadre < $event) {
        if (valorpadre == 10) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }

        } else if (valorpadre == 9) {

          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }

        } else if (valorpadre == 8) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 7) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 6) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 5) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 4) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 3) {
          if ($event == 0 || $event == 1 || $event == 2) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 2) {
          if ($event == 0 || $event == 1) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 1) {
          if ($event == 0) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 11) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 12) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 13) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 14) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 15) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 16) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 17) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 18) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        } else if (valorpadre == 19) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 20) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 21) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 22) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 23) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 24) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 25) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }

        //
        else if (valorpadre == 26) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 27) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 28) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 29) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 30) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 31) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //
        else if (valorpadre == 32) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 33) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 34) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 35) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 36) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 37) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 38) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 39) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 40) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 41) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-42
        else if (valorpadre == 42) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 43) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 44) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 45) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 46) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 47) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 48) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 49) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 50) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 51) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-52
        else if (valorpadre == 52) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 53) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 54) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 55) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50
            || $event == 51 || $event == 52 || $event == 53 || $event == 54) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 56) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 57) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 58) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 59) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 60) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 61) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-62
        else if (valorpadre == 62) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 63) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 64) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 65) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 66) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 67) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 68) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 69) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 70) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 71) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-72
        else if (valorpadre == 72) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 73) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 74) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 75) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 76) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 77) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 78) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 79) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 80) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 81) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-82
        else if (valorpadre == 82) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 83) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 84) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 85) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 86) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 87) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 88) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 89) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 90) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 91) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-92
        else if (valorpadre == 92) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 93) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 94) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 95) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 96) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 97) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 98) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95
            || $event == 96 || $event == 97) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 99) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 100) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 101) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-102
        else if (valorpadre == 102) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 103) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 104) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 105) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 106) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 107) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 108) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 109) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 110) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 111) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        //-112
        else if (valorpadre == 112) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 113) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 114) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 115) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110
            || $event == 111 || $event == 112 || $event == 113 || $event == 114) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 116) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 117) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 118) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 119) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117 || $event == 118) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 120) {
          if ($event == 0 || $event == 1 || $event == 2 || $event == 3 || $event == 4 || $event == 5 || $event == 6 || $event == 7 || $event == 8 || $event == 9 || $event == 10 || $event == 11 || $event == 12 || $event == 13 || $event == 14 || $event == 15 || $event == 16 || $event == 17 || $event == 18 || $event == 19 || $event == 20 || $event == 21 || $event == 22 || $event == 23 || $event == 24 || $event == 25 || $event == 26 || $event == 27 || $event == 28 || $event == 29 || $event == 30 || $event == 31 || $event == 32 || $event == 33 || $event == 34 || $event == 35 || $event == 36 || $event == 37 || $event == 38 || $event == 39 || $event == 40 || $event == 41 || $event == 42 || $event == 43 || $event == 44 || $event == 45 || $event == 46 || $event == 47 || $event == 48 || $event == 49 || $event == 50 || $event == 51 || $event == 52 || $event == 53 || $event == 54 || $event == 55 || $event == 56 || $event == 57 || $event == 58 || $event == 59 || $event == 60 || $event == 61 || $event == 62 || $event == 63 || $event == 64 || $event == 65 || $event == 66 || $event == 67 || $event == 68 || $event == 69 || $event == 70 || $event == 71 || $event == 72 || $event == 73 || $event == 74 || $event == 75 || $event == 76 || $event == 77 || $event == 78 || $event == 79 || $event == 80 || $event == 81 || $event == 82 || $event == 83 || $event == 84 || $event == 85 || $event == 86 || $event == 87 || $event == 88 || $event == 89 || $event == 90 || $event == 91 || $event == 92 || $event == 93 || $event == 94 || $event == 95 || $event == 96 || $event == 97 || $event == 98 || $event == 99 || $event == 100 || $event == 101 || $event == 102 || $event == 103 || $event == 104 || $event == 105 || $event == 106 || $event == 107 || $event == 108 || $event == 109 || $event == 110 || $event == 111 || $event == 112 || $event == 113 || $event == 114 || $event == 115 || $event == 116 || $event == 117 || $event == 118 || $event == 119) {
            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = value.toString();
                item.isSelected = true;
                item.valorRespuesta = $event;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor ingresado es superior a lo permitido',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }
        else if (valorpadre == 0) {
          if ($event == 0) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Debería ser mayor que 0',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Valor  no puede ser 0',
              showConfirmButton: false,
              timer: 3500,
            });

            this.caracterizacionNivel2List.forEach((item) => {
              if (item.idPregunta == idPregunta) {
                item.contenidoRespuesta = '0';
                item.isSelected = false;
                item.valorRespuesta = 0;
                $event = 0;
              }
            });
          }
        }

        //fin
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Valor ingresado es superior a lo permitido',
            showConfirmButton: false,
            timer: 3500,
          });

          this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPregunta == idPregunta) {
              item.contenidoRespuesta = '0';
              item.isSelected = false;
              item.valorRespuesta = 0;
              $event = 0;
            }
          });
        }


        /* this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPregunta == idPregunta) {
            item.contenidoRespuesta = value.toString();
            item.isSelected = true;
            item.valorRespuesta = $event;
          }
        }); */
      }


    }

    if ($event > maximo) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'ingreso la cantidad superior del limite permitido  o en campo vacio',
        showConfirmButton: false,
        timer: 3500,
      });
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == idPregunta) {
          item.contenidoRespuesta = '0';
          item.isSelected = true;
          item.valorRespuesta = 0;
          $event = 0;
        }
      });
    } else {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == idPregunta) {
          item.contenidoRespuesta = value.toString();
          item.isSelected = true;
          item.valorRespuesta = $event;

        }
      });
    }



    //



    if (encender == true) {
      const vlescala = this.caracterizacionNivel2List.filter(
        (items) => items.idEscala === idEscala
      );
      const padrepreg = vlescala.some((element) => element.idPregunta);
      if (padrepreg === true) {
        if ($event === '0') {

          const rp1 = this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPreguntaPadre == idPregunta) {

              item.tercerNivel = 0;
              if (item.idPregunta === 23 || item.idPregunta === 26) {
                item.valorRespuesta = -1;
              } else {
                item.valorRespuesta = 0;
              }
              item.isSelected = true;
            }
          });
        } else if ($event > 0) {

          this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPreguntaPadre == idPregunta) {

              item.tercerNivel = 1;
              if (item.idPregunta === 23 || item.idPregunta === 26) {
                item.valorRespuesta = -1;
              } else {
                item.valorRespuesta = 0;
              }


              item.isSelected = true;

            }
          });
        }
        else if ($event === '') {

          this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPreguntaPadre == idPregunta) {

              item.tercerNivel = 1;

              if (item.idPregunta === 23 || item.idPregunta === 26) {
                item.valorRespuesta = -1;
              } else {
                item.valorRespuesta = null;
              }


              item.isSelected = true;


            }
          });
        }
      } else {

        this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == idPregunta) {
            item.tercerNivel = 0;
            item.valorRespuesta = 0;
            item.isSelected = true;
          }
        });
      }
    } else {

      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;

        }
      });
    }




  }

  //fecha
  pipe = new DatePipe('en-US');
  handleDOBChange(event, idvalorEscala: number, idPregunta: number, value: number) {
    const m: Moment = event.value;

    if (m) {
      let p = this.pipe.transform(event.value, 'yyyy-MM-dd');
      localStorage.setItem('Fecha' + idPregunta.toString(), p);
      this.CaracterizacionInfraestructuraObject.chS_Fecha = event.value;
      this.ValorCaracteristicasAdjuntosObject.fecha = event.value;
      localStorage.setItem(
        'Caracteristica' + idPregunta.toString(),
        idPregunta.toString()
      );
      localStorage.setItem(
        'Escala' + idPregunta.toString(),
        idvalorEscala.toString()
      );
      localStorage.setItem('PreguntaFecha' + value, idPregunta.toString());
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta === 6) {
          item.contenidoRespuesta = p;

          item.isSelected = true;
          item.valorRespuesta = value;
        }
      });
    }
  }

  // mensaje de validacion
  mensajeOut() {
    this.maxfileerror = false;
  }
  documento = [];
  // subir un  archivo
  public onFileSelected(
    File: string | any[],
    idvalorEscala: number,
    idPregunta: number,
    value: number
  ): void {

    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      localStorage.setItem('Documento' + idPregunta.toString(), fileupload.name);

      localStorage.setItem(
        'Caracteristica' + idPregunta.toString(),
        idPregunta.toString()
      );
      localStorage.setItem(
        'Escala' + idPregunta.toString(),
        idvalorEscala.toString()
      );
      localStorage.setItem(
        'PreguntaArchivo' + idPregunta.toString(),
        idPregunta.toString()
      );
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta === 7) {
          item.contenidoRespuesta = fileupload.name;
          item.isSelected = true;
          item.valorRespuesta = value;
        }
      });
      this.escala.push(Number(value));
      this.pregunta.push(idPregunta);
      this.valor.push(-1);
      this.documento.push(fileupload.name);
      let _fileUpload: fileUploadModel;

      _fileUpload = {
        file: formData,
        fileName: fileupload.name,
        cnx: environment.cnxBS,
        container: environment.containerDS,
      };
    }
  }

  //PDF
  public convetToPDF2() {
    var data = document.getElementById('componentID');
    var width = document.getElementById('componentID').offsetWidth;
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      var pagesplit: true;
      //  pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight);
      var pageHeight = pdf.internal.pageSize.height;
      let totalPages = canvas.height / 842;

      for (let i = 1; i <= totalPages; i++) {
        var imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(
          contentDataURL,
          'PNG',
          5,
          position,
          imgWidth - 7,
          imgHeight
        );
        pdf.addPage();
      }
      // pdf.save('converteddoc.pdf');

      pdf.save('CuestionarioInfraestructura.pdf');
    });
  }

  public makePcDF2() {
    var quotes = document.getElementById('componentID');
    html2canvas(quotes).then((canvas) => {
      //! MAKE YOUR PDF
      var pdf = new jspdf.jsPDF('p', 'mm', 'a4');

      for (var i = 0; i <= quotes.clientHeight / 980; i++) {
        //! This is all just html2canvas stuff
        var srcImg = canvas;
        var sX = 0;
        var sY = 980 * i; // start 980 pixels down for every new page
        var sWidth = 900;
        var sHeight = 980;
        var dX = 0;
        var dY = 0;
        var dWidth = 900;
        var dHeight = 980;

        let onePageCanvas = document.createElement('canvas');
        onePageCanvas.setAttribute('width', '900');
        onePageCanvas.setAttribute('height', '980');
        var ctx = onePageCanvas.getContext('2d');
        // details on this usage of this function:
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
        ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        // document.body.appendChild(canvas);
        var canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

        var width = onePageCanvas.width;
        var height = onePageCanvas.clientHeight;

        //! If we're on anything other than the first page,
        // add another page
        if (i > 0) {
          //pdf.addPage('612', 'p'); //8.5" x 11" in pts (in*72)
          pdf.addPage();
        }
        //! now we declare that we're working on that page
        pdf.setPage(i + 1);
        //! now we add content to that page!
        pdf.addImage(canvasDataURL, 'PNG', 20, 40, width * 0.62, height * 0.62);
      }
      //! after the for loop is finished running, we save the pdf.
      pdf.save('Test.pdf');
    });
  }

  public makepdf() {
    var data = document.getElementById('componentID');
    var width = document.getElementById('componentID').offsetWidth;
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      var imgData = canvas.toDataURL('image/png');
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 2;
      var pagesplit: true;
      //  pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight);
      var pageHeight = pdf.internal.pageSize.height;

      //var imgWidth = 210;
      //var pageHeight = 298;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      heightLeft -= pageHeight;

      let totalPages = canvas.height / 842;
      pdf.addImage(
        contentDataURL,
        'PNG',
        10,
        position,
        imgWidth - 9,
        imgHeight
      );

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth - 9, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('CuestionarioInfraestructura.pdf');
    });
  }



  public makepdfci() {
    var data = document.getElementById('componentID');
    var width = document.getElementById('componentID').offsetWidth;
    const options = {
      background: 'white',
      backgroundColor: '#fff',
      scrollY: -window.scrollY,
      removeContainer: true,
      scale: 1,
      allowTaint: false,
      useCORS: true,
      logging: false,
    };
    html2canvas(data, options).then((canvas) => {
      canvas.style.border = '2px solid red';

      var imgWidth = 200;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');

      var position = 15;
      var pagesplit: true;
      //  pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight);
      var pageHeight = pdf.internal.pageSize.height;


      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      //var imgWidth = 210;
      //var pageHeight = 298;
      heightLeft -= pageHeight;

      let totalPages = canvas.height / 842;
      pdf.setFontSize(22);
      pdf.addImage(
        contentDataURL,
        'PNG',
        15,
        position,
        imgWidth - 9,
        imgHeight
      );

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 15, position, imgWidth - 9, imgHeight - 10);
        heightLeft -= pageHeight;
      }
      pdf.save('CuestionarioInfraestructura.pdf');
    });
  }

  public makepdfci2() {

    const data = document.getElementById('componentID');
    html2canvas(data).then((canvas: any) => {
      const imgWidth = 208;  //ancho
      const pageHeight = 298;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 20;
      heightLeft -= pageHeight;
      const doc = new jspdf.jsPDF('p', 'mm', 'a4');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      doc.save('CuestionarioInfraestructura.pdf');
    });
  }

  public makepdfci3() {
    const data = document.getElementById('componentID');
    html2canvas(data, { allowTaint: true }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      pdf.save('CuestionarioInfraestructura.pdf');
    });
  }

  public makepdfci4() {

    var HTML_Width = $(".componentID").width();
    var HTML_Height = $(".componentID").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    html2canvas($(".componentID")[0], { allowTaint: true }).then(function (canvas) {
      canvas.getContext('2d');



      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      pdf.save('CuestionarioInfraestructura.pdf');
    });
  };


  public printDiv() {
    var contenido = document.getElementById('componentID').innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();


    document.body.innerHTML = contenidoOriginal;
  }



  public makepdfci6() {


    document.getElementById('id2701').style.visibility = 'hidden';
    document.getElementById('id2702').style.visibility = 'hidden';



    const container = document.getElementById('componentID');

    html2canvas(container, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];

      var imgWidth = 8.5;
      var pageHeight = 9.9;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jspdf.jsPDF('p', 'in', [8.5, 11]);

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();

        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }

      pdf.save('CuestionarioInfraestructura.pdf');
      document.getElementById('id2701').style.visibility = 'visible';
      document.getElementById('id2702').style.visibility = 'visible';
    });
  }

  public makepdfci7() {

    var data = document.getElementById('componentID');
    html2canvas(data).then(canvas => {
      // Few necessary setting options

      const contentDataURL = canvas.toDataURL('image/png')
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var margin = 10;

      var doc = new jspdf.jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(contentDataURL, 'PNG', margin, margin, imgWidth - (margin * 2), imgHeight - (margin * 2));

      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', margin, margin, imgWidth - (margin * 2), imgHeight - (margin * 2));
        heightLeft -= pageHeight;
      }
      doc.save('CuestionarioInfraestructura.pdf');

    });
  }

  chequearValidaciones() {
    this.activarbotonenviar = true;
  }
  CHS = [];
  DA = [];
  AL = [];
  PR = [];
  CON = [];
  DR = [];
  AS = [];
  AG = [];
  RB = [];
  NE = [];
  C = [];
  QM = [];
  ES = [];
  LC = [];
  ut = [];
  cambiarModoEdicion() {
    this.esEdicion = !this.esEdicion;

    this.CHS.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 5));
    this.DA.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 2));
    this.AL.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 16));
    this.PR.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 30));
    this.CON.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 44));
    this.DR.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 52));
    this.AS.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 55));
    this.AG.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 9));
    this.RB.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 14));
    this.NE.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 21));
    this.C.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 24));
    this.ES.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 33));
    this.QM.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 35));
    this.LC.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 37));
    this.ut.push(this.caracterizacionNivel2List.filter(item => item.idPregunta == 48 ||
      item.idPregunta == 49 || item.idPregunta == 50 || item.idPregunta == 51))


    if (this.CHS[0][0].valorRespuesta === 7 || this.CHS[0][0].valorRespuesta === 8 || this.CHS[0][0].valorRespuesta === 9) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.CHS[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    else {
      if (this.CHS[0][0].valorRespuesta === 10) {
        this.caracterizacionNivel2List.forEach((item) => {
          if (item.idPreguntaPadre == this.CHS[0][0].idPregunta) {
            item.tercerNivel = 0;
          }
        });
      }
    }
    if (this.DA[0][0].valorRespuesta === 1) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.DA[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.AL[0][0].valorRespuesta === 11) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.AL[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.PR[0][0].valorRespuesta === 11) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.PR[0][0].idPregunta) {
          item.tercerNivel = 1;
        }

      });
    } else {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == 33) {
          item.tercerNivel = 0;
          item.valorRespuesta = null
        }
      });
    }
    if (this.CON[0][0].valorRespuesta === 98) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.CON[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.DR[0][0].valorRespuesta === 11) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.DR[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.AS[0][0].valorRespuesta === 1 || this.AS[0][0].valorRespuesta === 320) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.AS[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.AG[0][0].valorRespuesta === 15) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.AG[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.RB[0][0].valorRespuesta === 67) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.RB[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    }
    if (this.NE[0][0].valorRespuesta > 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.NE[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    } else if (this.NE[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.NE[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;
        }
        if (item.idPregunta == this.NE[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    } else if (this.NE[0][0].valorRespuesta === null) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.NE[0][0].idPregunta) {
          item.tercerNivel = 1;
          item.valorRespuesta = null
        }
      });
    }
    if (this.C[0][0].valorRespuesta > 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.C[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    } else if (this.C[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.C[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;
        }
        if (item.idPregunta == this.C[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    } else if (this.C[0][0].valorRespuesta === null) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.C[0][0].idPregunta) {
          item.tercerNivel = 1;
          item.valorRespuesta = null
        }
      });
    }
    if (this.ES[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.ES[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;
        }
        if (item.idPregunta == this.ES[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    } else if (this.ES[0][0].valorRespuesta > 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.ES[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    } else if (this.ES[0][0].valorRespuesta === null) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.ES[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = null
        }
      });
    }
    if (this.QM[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.QM[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;
        }
        if (item.idPregunta == this.QM[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    } else if (this.QM[0][0].valorRespuesta > 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.QM[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    } else if (this.QM[0][0].valorRespuesta === null) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.QM[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = null
        }
      });
    }

    if (this.LC[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.LC[0][0].idPregunta) {
          item.tercerNivel = 0;
          item.valorRespuesta = 0;
          item.isSelected = true;
        }
        if (item.idPregunta == this.LC[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    } else if (this.LC[0][0].valorRespuesta > 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.LC[0][0].idPregunta) {
          item.tercerNivel = 1;
        }
      });
    } else if (this.LC[0][0].valorRespuesta === null) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPreguntaPadre == this.LC[0][0].idPregunta) {
          item.tercerNivel = 1;
          item.valorRespuesta = null
        }
      });
    }

    if (this.ut[0][0].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == this.ut[0][0].idPregunta) {
          item.isSelected = true;
        }
      });
    }
    if (this.ut[0][1].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == this.ut[0][1].idPregunta) {
          item.isSelected = true;
        }
      });
    }
    if (this.ut[0][2].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == this.ut[0][2].idPregunta) {
          item.isSelected = true;
        }
      });
    }
    if (this.ut[0][3].valorRespuesta === 0) {
      this.caracterizacionNivel2List.forEach((item) => {
        if (item.idPregunta == this.ut[0][3].idPregunta) {
          item.isSelected = true;
        }
      });
    }

  }

  // boton de guardar
  onGuardar(accion: string) {
    this.guardar = false;
    var keys = Object.keys(this.caracterizacionNivel2List);
    var len = keys.length - 1;

    /* for (var j = 0; j < len; j++) {
      console.info(
        j,
        'Preg: ', this.caracterizacionNivel2List[j].idPregunta,
        'Tit:', this.caracterizacionNivel2List[j].pregunta.substring(0, 35),
        'Resp:', this.caracterizacionNivel2List[j].valorRespuesta,
        'FKP:', this.caracterizacionNivel2List[j].contenidoRespuesta,
        'Sel:', this.caracterizacionNivel2List[j].isSelected
      );
    } */
    this.esEdicion = !this.esEdicion;

    //

    //
    let terminoFor = false;
    let iAfectadas = 0;
    this.caracterizacionNivel2List.forEach((item) => {
      let cAfectadas = this.caracterizacionNivel2List.filter(item => item.isSelected === true).length;
      if (item.idPregunta === 44) {
        if (item.valorRespuesta == 95 || item.valorRespuesta == 96 || item.valorRespuesta == 97) {

          this.caracterizacionNivel2List.forEach((item) => {
            if (item.idPregunta == 45) {
              item.isSelected = false;
            }
          });

        }
      }

      if (item.isSelected === true) {

        if (item.contenidoRespuesta === '') {

          this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.contenidoRespuesta);
          this.ValorCaracteristicasObject.valor = item.valorRespuesta;
        } else {


          if (item.idPregunta === 5 || item.idPregunta === 3 || item.idPregunta === 19 || item.idPregunta === 61 ||
            item.idPregunta === 20 || item.idPregunta === 31 || item.idPregunta === 32 || item.idPregunta === 34 ||
            item.idPregunta === 44 || item.idPregunta === 10 || item.idPregunta === 13 || item.idPregunta === 15 ||
            item.idPregunta === 62 || item.idPregunta === 23 || item.idPregunta === 26 || item.idPregunta === 28 ||
            item.idPregunta === 45 || item.idPregunta === 2 || item.idPregunta === 1 || item.idPregunta === 16 ||
            item.idPregunta === 30 || item.idPregunta === 52 || item.idPregunta === 55 || item.idPregunta === 11 ||
            item.idPregunta === 14 || item.idPregunta === 64 || item.idPregunta === 27 || item.idPregunta === 40 ||
            item.idPregunta === 41 || item.idPregunta === 42 || item.idPregunta === 56 || item.idPregunta === 57 ||
            item.idPregunta === 8 || item.idPregunta === 9) {
            this.ValorCaracteristicasObject.valor = -1


          } else {

            this.ValorCaracteristicasObject.valor = item.valorRespuesta;

          }
          if (item.idPregunta === 6) {
            if (isNaN(item.valorRespuesta)) {
              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);

            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 329;
            }
          } else if (item.idPregunta === 7) {
            if (isNaN(item.valorRespuesta)) {
              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              this.ValorCaracteristicasObject.iD_ValorEscala = 13;
            }
          } else if (item.idPregunta === 5) {
            if (isNaN(item.valorRespuesta)) {
              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              this.ValorCaracteristicasObject.iD_ValorEscala = item.valorRespuesta;
            }
          } else if (item.idPregunta === 33) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta === null) {
                item.valorRespuesta = -1
                this.caracterizacionNivel2List.forEach((item) => {
                  if (item.idPregunta == 35) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                  if (item.idPregunta == 36) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                });
              } else if (item.valorRespuesta === 0) {

                item.valorRespuesta = 0
                this.caracterizacionNivel2List.forEach((item) => {
                  if (item.idPregunta === 35) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  } else if (item.idPregunta === 36) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }

                });
              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 55;
            }

          } else if (item.idPregunta === 54) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta === null) {
                item.valorRespuesta = -1
              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 62;
            }
          } else if (item.idPregunta === 36) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 63;
            }
          } else if (item.idPregunta === 35) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 56;
            }
          } else if (item.idPregunta === 38) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 64;
            }
          }
          else if (item.idPregunta === 39) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 65;
            }
          }

          else if (item.idPregunta === 25) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              this.ValorCaracteristicasObject.iD_ValorEscala = 339;
            }
          }
          else if (item.idPregunta === 21) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {
                item.valorRespuesta = -1
                this.caracterizacionNivel2List.forEach((item) => {
                  if (item.idPregunta == 22) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                  if (item.idPregunta == 23) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                });
              }


              //item.valorRespuesta = -1
              this.ValorCaracteristicasObject.iD_ValorEscala = 53;
            }
          }

          else if (item.idPregunta === 24) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {
                item.valorRespuesta = -1
                this.caracterizacionNivel2List.forEach((item) => {
                  if (item.idPregunta == 25) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                  if (item.idPregunta == 26) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                });
              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 54;
            }
          }




          else if (item.idPregunta === 37) {
            if (isNaN(item.valorRespuesta)) {
              item.valorRespuesta = -1
              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {
                item.valorRespuesta = -1
                this.caracterizacionNivel2List.forEach((item) => {
                  if (item.idPregunta == 38) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                  if (item.idPregunta == 39) {
                    item.valorRespuesta = -1;
                    item.isSelected = true;
                  }
                });
              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 57;
            }
          }



          else if (item.idPregunta === 48) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {

                item.valorRespuesta = -1

              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 58;
            }
          }
          else if (item.idPregunta === 49) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {

              if (item.valorRespuesta == Number('')) {

                item.valorRespuesta = -1

              }


              this.ValorCaracteristicasObject.iD_ValorEscala = 59;
            }
          }
          else if (item.idPregunta === 50) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {
                item.valorRespuesta = -1

              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 60;
            }
          }
          else if (item.idPregunta === 51) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {

                item.valorRespuesta = -1

              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 61;
            }
          }
          else if (item.idPregunta === 54) {
            if (isNaN(item.valorRespuesta)) {

              this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.valorRespuesta);
            } else {
              if (item.valorRespuesta == Number('')) {

                item.valorRespuesta = -1

              }
              this.ValorCaracteristicasObject.iD_ValorEscala = 62;
            }
          }


          else {
            this.ValorCaracteristicasObject.iD_ValorEscala = Number(item.contenidoRespuesta);
          }


        }

        this.ValorCaracteristicasObject.iD_Caracteristica = item.idPregunta;

        this.ValorCaracteristicasObject.iD_Caracterizacion = Number(
          localStorage.getItem('idCaracterizacion')
        );



        this.valorCaracteristicas.addValorCaracteristicas(this.ValorCaracteristicasObject).subscribe(

          async (response: any) => {
            var y = response;
            iAfectadas = iAfectadas + 1;

            if (y != null) {

              this.guardar = true;

              localStorage.setItem('caracteristica' + item.idPregunta.toString(), y.id);
            }
            else {
              localStorage.setItem('caracteristica' + item.idPregunta.toString(), ' ');
            }
            if (item.idPregunta === 7) {

              //
              this.ValorCaracteristicasAdjuntosObject.adjunto = localStorage.getItem('Documento7');
              this.ValorCaracteristicasAdjuntosObject.id_ValorCaracteristicas = y.id;
              if (localStorage.getItem('Fecha6') == '0000-00-00') {
                this.ValorCaracteristicasAdjuntosObject.fecha = null
              } else {
                this.ValorCaracteristicasAdjuntosObject.fecha = this.datepipe.transform(localStorage.getItem('Fecha6'), 'yyyy-MM-dd');
              }
              this.ValorCaracteristicasAdjuntos.addValorCaracteristicasAdjuntos(this.ValorCaracteristicasAdjuntosObject).subscribe(
                (response: any) => { },
                (err) => {
                }
              );
            }
            if (item.idPregunta === 6) {
              // localStorage.getItem('Fecha6');
              this.ValorCaracteristicasAdjuntosObject.id_ValorCaracteristicas = y.id;
              if (localStorage.getItem('Fecha6') == '0000-00-00') {
                this.ValorCaracteristicasAdjuntosObject.fecha = null
              } else {
                this.ValorCaracteristicasAdjuntosObject.fecha = this.datepipe.transform(localStorage.getItem('Fecha6'), 'yyyy-MM-dd');
              }
              this.ValorCaracteristicasAdjuntosObject.adjunto = '0';

              this.ValorCaracteristicasAdjuntos.addValorCaracteristicasAdjuntos(this.ValorCaracteristicasAdjuntosObject).subscribe(
                (response: any) => { },
                (err) => {
                }
              );
            }

            if (iAfectadas == cAfectadas) {
              let v: GetCaracterizacionValidacionModel;
              let sc = "";
              var arrayP: GetCaracterizacionValidacionModel[] = []

              v = await this.validarformulario.getGetCaracterizacionValidacion(this.idsede)
              let as: Array<string> = new Array();

              //

              sc = JSON.stringify(v);
              arrayP = JSON.parse(sc);
              this.activarbotonenviar = true;

              //var swal_html = '<div class="panel" style="background:aliceblue;font-weight:bold"><div class="panel-heading panel-info text-center btn-info"> <b>Import Status</b> </div> <div class="panel-body"><div class="text-center"><b><p style="font-weight:bold">Total number of not inserted  rows : add data</p><p style="font-weight:bold">Row numbers:Add data</p></b></div></div></div>';
              var swal_html = '<ul style="text-align: left!important; display: inline-flex; flex-direction: column; ">';
              for (var i = 0; i < arrayP.length; i++) {
                this.activarbotonenviar = false;

                //as.push(arrayP[i]["pregunta"]);
                swal_html += `
                  <div style="display: flex;><img src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" alt="">
                  <div><img src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png " style="width:25px; height: 25px; float:left;"></div>
                  <div style="padding-left:10px; ">${arrayP[i]["pregunta"]}</div>
                  </div>`;
              }
              swal_html += '</ul">';



              //alert(as.join('\n'));
              //this.chequeaformulario();


              if (accion === 'parcial' || accion === 'definitiva') {
                if (this.activarbotonenviar == true) {

                  Swal.fire({
                    title: 'El formulario se guardó definitivamente.',
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonColor: '#009922',
                    denyButtonText: `Aceptar`,
                    //timer: 10000
                  }).then((result) => {
                    if (result.isDenied) {
                      this._PA_RegistrarNotificacionService.registerNotification("El cuestionario de infraestructura " + this.nombreInstitucion + " | " + this.nombreSede + " está lista para aprobar", "Coordinador PAE", this.idETC.toString());
                      this._PA_RegistrarNotificacionService.registerNotification("El cuestionario de infraestructura " + this.nombreInstitucion + " | " + this.nombreSede + " está lista para aprobar", "Rol SiPAE-Administrador");

                      this.ngOnInit();

                    } else {
                      this.ngOnInit();
                    }
                  })
                }
                else {
                  Swal.fire({

                    title: 'El formulario se guardó parcialmente, aún faltan campos por diligenciar.',
                    //text: as.join('\n'),
                    //html:as.join('\n'),

                    html: swal_html,
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonColor: '#009922',
                    denyButtonText: `Aceptar`,
                    //timer: 3000
                  }).then((result) => {
                    if (result.isDenied) {
                      this.ngOnInit();

                    } else { this.ngOnInit(); }
                  })
                }
              }

            }

          },
          (err) => {
          }
        );

      } else {
      }
    });
    this.AprobacionesInsert();


  }

  remover() {
    //localStorage.removeItem('Fecha6');kk
    //localStorage.removeItem('Documento7');
    localStorage.removeItem('Clave');
    localStorage.removeItem('Caracteristica30');
    localStorage.removeItem('Caracteristica11');
    localStorage.removeItem('Caracteristica15');
    localStorage.removeItem('Caracteristica24');
    localStorage.removeItem('Caracteristica22');
    localStorage.removeItem('Caracteristica53');
    localStorage.removeItem('Caracteristica62');
    localStorage.removeItem('Caracteristica2');
    localStorage.removeItem('Caracteristica20');
    localStorage.removeItem('Caracteristica19');
    localStorage.removeItem('Caracteristica40');
    localStorage.removeItem('Caracteristica37');
    localStorage.removeItem('Caracteristica62');
    localStorage.removeItem('Caracteristica61');
    localStorage.removeItem('Caracteristica51');
    localStorage.removeItem('Caracteristica6');
    localStorage.removeItem('Caracteristica23');
    localStorage.removeItem('Caracteristica51');
    localStorage.removeItem('Caracteristica51');
    localStorage.removeItem('Caracteristica51');
    localStorage.removeItem('Caracteristica51');

    localStorage.removeItem('caracteristica30');
    localStorage.removeItem('caracteristica11');
    localStorage.removeItem('caracteristica15');
    localStorage.removeItem('caracteristica24');
    localStorage.removeItem('caracteristica22');
    localStorage.removeItem('caracteristica53');
    localStorage.removeItem('caracteristica62');
    localStorage.removeItem('caracteristica2');
    localStorage.removeItem('caracteristica20');
    localStorage.removeItem('caracteristica19');
    localStorage.removeItem('caracteristica40');
    localStorage.removeItem('caracteristica37');
    localStorage.removeItem('caracteristica62');
    localStorage.removeItem('caracteristica61');
    localStorage.removeItem('caracteristica48');

    localStorage.removeItem('Escala23');
    localStorage.removeItem('Escala42');
    localStorage.removeItem('Escala2');
    localStorage.removeItem('Escala: 2');
    localStorage.removeItem('Escala31');
    localStorage.removeItem('Escala39');
    localStorage.removeItem('Escala48');
    localStorage.removeItem('Escala7');
    localStorage.removeItem('Escala64');
    localStorage.removeItem('Escala7');
    localStorage.removeItem('Escala49');

    localStorage.removeItem('Pregunta10');
    localStorage.removeItem('Pregunta56');
    localStorage.removeItem('Pregunta38');
    localStorage.removeItem('Pregunta53');
    localStorage.removeItem('Pregunta61');
    localStorage.removeItem('Pregunta2');
    localStorage.removeItem('Pregunta33');
    localStorage.removeItem('Pregunta39');
    localStorage.removeItem('Pregunta14');
    localStorage.removeItem('Pregunta8');
    localStorage.removeItem('Pregunta9');
    localStorage.removeItem('Pregunta: 2');
    localStorage.removeItem('Pregunta: 5');
    localStorage.removeItem('Pregunta45');
    localStorage.removeItem('Pregunta40');
    localStorage.removeItem('Pregunta8');
    localStorage.removeItem('Pregunta8');
    localStorage.removeItem('Pregunta8');

    localStorage.removeItem('PreguntaArchivo');

    localStorage.removeItem('Pregunta52');
    localStorage.removeItem('caracteristica32');

    // localStorage.removeItem('idCaracterizacion');
    localStorage.removeItem('Escala3');
    localStorage.removeItem('Pregunta63');
    localStorage.removeItem('Escala36');
    localStorage.removeItem('Escala15');
    localStorage.removeItem('Pregunta28');
    localStorage.removeItem('Escala24');
    localStorage.removeItem('caracteristica51');
    localStorage.removeItem('Pregunta57');
    localStorage.removeItem('caracteristica6');
    localStorage.removeItem('Caracteristica35');
    localStorage.removeItem('Caracteristica7');
    localStorage.removeItem('Caracteristica58');
    localStorage.removeItem('Caracteristica63');
    localStorage.removeItem('Caracteristica54');
    localStorage.removeItem('Pregunta36');
    localStorage.removeItem('Escala27');
    localStorage.removeItem('Pregunta42');
    localStorage.removeItem('Caracteristica33');
    localStorage.removeItem('Pregunta: 31');
    localStorage.removeItem('Escala25');

    localStorage.removeItem('Pregunta26');
    localStorage.removeItem('caracteristica5');
    localStorage.removeItem('Caracteristica48');
    localStorage.removeItem('Pregunta: 21');
    localStorage.removeItem('caracteristica21');
    localStorage.removeItem('Escala35');
    localStorage.removeItem('caracteristica34');
    localStorage.removeItem('Escala51');
    localStorage.removeItem('caracteristica28');
    localStorage.removeItem('Pregunta32');
    localStorage.removeItem('Caracteristica5');

    localStorage.removeItem('Pregunta35');
    localStorage.removeItem('Escala57');

    localStorage.removeItem('Escala54');
    localStorage.removeItem('Caracteristica9');
    localStorage.removeItem('Escala44');
    localStorage.removeItem('caracteristica52');
    localStorage.removeItem('caracteristica27');
    localStorage.removeItem('Escala14');
    localStorage.removeItem('Caracteristica32');
    localStorage.removeItem('Pregunta23');
    localStorage.removeItem('caracteristica39');
    localStorage.removeItem('Escala30');
    localStorage.removeItem('Escala10');
    localStorage.removeItem('caracteristica49');
    localStorage.removeItem('Pregunta44');
    localStorage.removeItem('Escala20');
    localStorage.removeItem('Caracteristica44');
    localStorage.removeItem('Pregunta13');
    localStorage.removeItem('Pregunta51');
    localStorage.removeItem('Caracteristica16');
    localStorage.removeItem('caracteristica7');
    localStorage.removeItem('Caracteristica21');
    localStorage.removeItem('Caracteristica55');
    localStorage.removeItem('Escala5');
    localStorage.removeItem('caracteristica14');
    localStorage.removeItem('Caracteristica50');

    localStorage.removeItem('Pregunta62');
    localStorage.removeItem('Pregunta5');
    localStorage.removeItem('Caracteristica45');
    localStorage.removeItem('caracteristica38');
    localStorage.removeItem('Escala32');
    localStorage.removeItem('Caracteristica43');
    localStorage.removeItem('caracteristica9');
    localStorage.removeItem('Escala55');
    localStorage.removeItem('Caracteristica26');
    localStorage.removeItem('Caracteristica3');
    localStorage.removeItem('Escala43');
    localStorage.removeItem('Pregunta11');
    localStorage.removeItem('Pregunta27');
    localStorage.removeItem('Escala26');

    localStorage.removeItem('Caracteristica: 5');
    localStorage.removeItem('Caracteristica57');
    localStorage.removeItem('Pregunta1');
    localStorage.removeItem('caracteristica64');
    localStorage.removeItem('Pregunta37');
    localStorage.removeItem('Escala22');
    localStorage.removeItem('Caracteristica31');

    localStorage.removeItem('Pregunta22');
    localStorage.removeItem('caracteristica55');
    localStorage.removeItem('caracteristica25');
    localStorage.removeItem('Pregunta41');
    localStorage.removeItem('Escala53');
    localStorage.removeItem('Caracteristica8');
    localStorage.removeItem('Pregunta48');
    localStorage.removeItem('Escala21');
    localStorage.removeItem('Caracteristica10');
    localStorage.removeItem('Pregunta49');
    localStorage.removeItem('caracteristica41');

    localStorage.removeItem('Escala50');
    localStorage.removeItem('Escala1');
    localStorage.removeItem('Caracteristica56');
    localStorage.removeItem('Caracteristica34');
    localStorage.removeItem('Caracteristica41');
    localStorage.removeItem('caracteristica16');
    localStorage.removeItem('caracteristica45');
    localStorage.removeItem('Escala33');

    localStorage.removeItem('Escala38');
    localStorage.removeItem('Caracteristica28');
    localStorage.removeItem('caracteristica13');
    localStorage.removeItem('Pregunta: 16');
    localStorage.removeItem('Pregunta19');
    localStorage.removeItem('Escala37');
    localStorage.removeItem('caracteristica8');
    localStorage.removeItem('Caracteristica39');
    localStorage.removeItem('Pregunta20');

    localStorage.removeItem('Escala13');
    localStorage.removeItem('caracteristica10');
    localStorage.removeItem('Escala: 1');
    localStorage.removeItem('Pregunta55');
    localStorage.removeItem('Caracteristica25');
    localStorage.removeItem('caracteristica23');
    localStorage.removeItem('caracteristica33');
    localStorage.removeItem('Caracteristica36');
    localStorage.removeItem('Caracteristica: 1');
    localStorage.removeItem('Caracteristica27');
    localStorage.removeItem('PreguntaArchivo7');
    localStorage.removeItem('Caracteristica52');
    localStorage.removeItem('Pregunta64');
    localStorage.removeItem('Escala16');
    localStorage.removeItem('Escala34');
    localStorage.removeItem('Escala: 5');

    localStorage.removeItem('caracteristica50');
    localStorage.removeItem('Pregunta: 1');
    localStorage.removeItem('Pregunta15');
    localStorage.removeItem('Caracteristica14');
    localStorage.removeItem('caracteristica57');
    localStorage.removeItem('Pregunta58');
    localStorage.removeItem('Pregunta50');
    localStorage.removeItem('Escala9');
    localStorage.removeItem('caracteristica44');
    localStorage.removeItem('Escala19');
    localStorage.removeItem('caracteristica56');
    localStorage.removeItem('caracteristica1');
    localStorage.removeItem('Caracteristica: 2');
    localStorage.removeItem('Escala58');
    localStorage.removeItem('caracteristica26');
    localStorage.removeItem('Pregunta54');
    localStorage.removeItem('Escala11');
    localStorage.removeItem('Escala8');
    localStorage.removeItem('Pregunta21');
    localStorage.removeItem('caracteristica54');
    localStorage.removeItem('Escala41');
    localStorage.removeItem('Escala62');

    localStorage.removeItem('Pregunta25');
    localStorage.removeItem('caracteristica42');
    localStorage.removeItem('PreguntaFecha6');
    localStorage.removeItem('Pregunta31');
    localStorage.removeItem('caracteristica35');
    localStorage.removeItem('Escala45');
    localStorage.removeItem('Escala6');

    localStorage.removeItem('Escala28');
    localStorage.removeItem('Escala61');
    localStorage.removeItem('Caracteristica42');
    localStorage.removeItem('Pregunta34');
    localStorage.removeItem('Escala56');
    localStorage.removeItem('Caracteristica13');
    localStorage.removeItem('Pregunta43');
    localStorage.removeItem('Pregunta3');
    localStorage.removeItem('caracteristica31');
    localStorage.removeItem('Escala63');
    localStorage.removeItem('Pregunta24');
    localStorage.removeItem('Pregunta16');
    localStorage.removeItem('Escala40');
    localStorage.removeItem('caracteristica3');
    localStorage.removeItem('caracteristica36');
    localStorage.removeItem('Caracteristica64');
    localStorage.removeItem('Caracteristica38');

    localStorage.removeItem('PreguntaFecha329');
    localStorage.removeItem('Caracteristica1');
    localStorage.removeItem('Escala52');
    localStorage.removeItem('Pregunta30');
    localStorage.removeItem('Caracteristica49');
    this.CHS = [];
    this.DA = [];
    this.AL = [];
    this.PR = [];
    this.CON = [];
    this.DR = [];
    this.AS = [];
    this.AG = [];
    this.RB = [];
    this.NE = [];
    this.C = [];
    this.QM = [];
    this.ES = [];
    this.LC = [];
    this.ut = []
    //this.ngOnInit();
  }
  AprobacionesInsert() {
    this.PA_DiagnosticoInfraEstbySedeParams.id_Sede = this.idsede;
    this.PA_DiagnosticoInfraEstbySedeParams.id_Caracterizacion = Number(
      localStorage.getItem('idCaracterizacion')
    );
    this._PA_DiagnosticoInfraEstbySedeService.getPA_DiagnosticoInfraEstbySedeList(this.PA_DiagnosticoInfraEstbySedeParams).subscribe(
      (response: any) => {
        this.remover();
      },
      (err) => {
      }
    );

  }
}
export class NgbdDatepickerPopup {
  model: NgbDateStruct;
}


