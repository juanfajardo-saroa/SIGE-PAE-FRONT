import { ETCService } from 'src/app/shared/services/ETC.services';
import { OperadoresService } from 'src/app/shared/services/Operadores.services';
import { PA_OperadorContratosService } from 'src/app/shared/services/PA_OperadorContratos.services';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { GradosModel } from 'src/app/shared/model/Grados';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { GradosService } from 'src/app/shared/services/Grados.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { PA_ContratosSedeJornadaRPIModel } from 'src/app/shared/model/PA_ContratosSedeJornadaRPIModel';
import { PA_ContratosSedeJornadaRPIService } from 'src/app/shared/services/PA_ContratosSedeJornadaRPI.services';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';

@Component({
  selector: 'app-ver-detalle-beneficiario-raciones',
  templateUrl: './ver-detalle-beneficiario-raciones.component.html',
  styleUrls: ['./ver-detalle-beneficiario-raciones.component.scss']
})
export class VerDetalleBeneficiarioRacionesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  InstitucionEducativaList: InstitucionEducativaModel[];
  TablaContratos: any[] = [];
  divipolaList: DivipolasModel[];
  selectDivipolaList: DivipolasModel[];
  SedesList: SedesModel[];
  sedesList: SedesModel[];
  selectSedesList: SedesModel[];
  institucionList: InstitucionEducativaModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  filterParams: PA_ContratosSedeJornadaRPIModel = {};
  TablaDetalle: PA_ContratosSedeJornadaRPIModel[] = [];
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;
  GradosList: GradosModel;
  selectGradosList: GradosModel;
  jornadasList: JornadaModel[];
  selectJornadasList: JornadaModel[];

  public dataSource = new MatTableDataSource<PA_ContratosSedeJornadaRPIModel>();
  private subs = new Subscription();

  idContrato: number = 0;
  idContrato2: number = 0;
  idSede: number;
  nombreContrato: string;
  nombreSede: string;

  nombreMunicipio: string;
  nombreInstituc: string;
  selContrato = 0;
  TotalMatriculas: number = 0;
  TotalAlmuerzoRPS: number = 0;
  TotalComplemento: number = 0;
  TotalRaciondiaria: number = 0;
  TotalBeneficiarios: number = 0;

  displayedColumns: string[] = ['jornada', 'grado', 'matricula', 'almuerzoRPS', 'compleRPS', 'totalRacionesDia', 'totalBeneficiarios'];
  displayedColumns2: string[] = ['jornada2', 'grados2', 'matricula2', 'almuerzo2', 'complemento2', 'racionDiaria2', 'totalBeneficiario2'];

  selMunicipio = -1;
  selInst = -1;
  selsede = -1;
  idOperador = Number(localStorage.getItem('IdUbicacion'));
  /* Parte fecha y titulo */
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  nombreOperador = localStorage.getItem('UbicacionShow2');
  spans = {};
  /* Fin Parte fecha y titulo */

  constructor(
    private fb: FormBuilder,
    private divipolaService: DivipolasService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private router: Router,
    private messageService: MessageService,
    public servicioTablaDetalle: PA_ContratosSedeJornadaRPIService,
    public servicioContratos: ContratosService,
    public gradosService: GradosService,
    private jornadaService: JornadaService,
    private OperadoresService: OperadoresService,
    public servicioTablaConsultaBenefRaciones: PA_OperadorContratosService,
    private ETCService: ETCService,
    private route: ActivatedRoute,) {


    let parametroContrato = localStorage.getItem('nomb');
    let nombreSede = localStorage.getItem('ns');
    let nombreInstituc = localStorage.getItem('ni');
    let nombreMunicipio = localStorage.getItem('nm');
    let nombreIdMunicipio = localStorage.getItem('divi');
    let nombreIdInstituc = localStorage.getItem('inst');
    let nombreIdSede = localStorage.getItem('sede');

    if (parametroContrato != null && parametroContrato != undefined) {
      this.filterParams.id_Contrato = Number(localStorage.getItem('list'));
    }
    if (nombreIdMunicipio != null && nombreIdMunicipio != undefined) {
      this.filterParams.id_divipola = Number(localStorage.getItem('divi'));
    }
    if (nombreIdInstituc != null && nombreIdInstituc != undefined) {
      this.filterParams.id_IE = Number(localStorage.getItem('inst'));
    }
    if (nombreIdSede != null && nombreIdSede != undefined) {
      this.filterParams.id_sede = Number(localStorage.getItem('sede'));
    }

    //this.fillTable(this.filterParams);


    this.route.queryParams.subscribe(params => {
      this.idContrato = + params.id;
      this.idContrato2 = + params.id;
    });
    this.filterParams.id_Contrato = this.idContrato2;

  }


  isLoading = true;

  ngOnInit(): void {
    this.nombreContrato = localStorage.getItem('nc');

    this.nombreInstituc = localStorage.getItem('ni');
    this.nombreSede = localStorage.getItem('ns');
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'Operadores' || primernombre == 'operadores') {
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 0).subscribe(
        (response: any) => {
          this.TablaContratos = response.filter(item => item.iD_TipoContratoCHIP == 5);
          let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);
          let etc = nom2[0].iD_ETC;
          this.nombreMunicipio = nom2[0].numeroContrato;
          this.selContrato = nom2[0].id;
          this.institucionEducativaService.getInstitucionEducativaListRelationFilter(etc).subscribe(
            (response: any) => {
              this.selectInstitucionList = response.filter(item => item.nombre == this.nombreInstituc);
              if (this.selectInstitucionList.length == 0) { this.selectSedesList = [] } else {
                this.divipolaService.getDivipolasListRelationFilter(this.selectInstitucionList[0].iD_DiviPola).subscribe(
                  (response: any) => {
                    this.selectDivipolaList = response;
                    if (this.selectDivipolaList.length == 0) { } else {
                      this.sedesService.getSedesListRelationFilter2(etc, this.selectDivipolaList[0].id, this.selectInstitucionList[0].id).subscribe(
                        (response: any) => {
                          this.selectSedesList = response;
                          this.selsede = this.selectSedesList.find(item => item.nombre == this.nombreSede).id
                        },
                        (err) => {
                        }
                      );
                    }


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
          this.isLoading = false;
        }
      );



    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {

      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 0).subscribe(
        (response: any) => {
          this.TablaContratos = response;

          let nom2 = this.TablaContratos.filter(item => item.id_contrato == this.idContrato2);
          let etc = nom2[0].etC_Nombre;
          this.nombreMunicipio = nom2[0].numeroContrato;
          this.selContrato = nom2[0].id_contrato;
          this.nombreOperador = nom2[0].operador

          this.ETCService.getETCListfilter(etc).subscribe(
            (response: any) => {

              let etc2 = response[0].id
              this.institucionEducativaService.getInstitucionEducativaListRelationFilter4(etc2).subscribe(
                (response: any) => {
                  this.selectInstitucionList = response.filter(item => item.nombre == this.nombreInstituc);
                  if (this.selectInstitucionList.length == 0) { this.selectSedesList = [] } else {
                    this.divipolaService.getDivipolasListRelationFilter(this.selectInstitucionList[0].iD_DiviPola).subscribe(
                      (response: any) => {
                        this.selectDivipolaList = response;
                        if (this.selectDivipolaList.length == 0) { } else {
                          this.sedesService.getSedesListRelationFilter2(etc2, this.selectDivipolaList[0].id, this.selectInstitucionList[0].id).subscribe(
                            (response: any) => {
                              this.selectSedesList = response;
                              this.selsede = this.selectSedesList.find(item => item.nombre == this.nombreSede).id
                            },
                            (err) => {
                            }
                          );
                        }


                      },
                      (err) => {
                      }
                    );
                  }

                },
                (err) => {
                }
              );
            })


        },
        (err) => {
          this.isLoading = false;
        }
      );

    }





    //this.fillTable(this.filterParams);
  }


  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* ---FUNCIONES------------ */
  IrATablaBenficiarios() {
    this.router.navigate(['/Beneficiarios'], { queryParams: { id: this.idContrato2, tab: 1 } });
    /*localStorage.setItem('lm',letraMunicipio);*/
  }
  onDescargarExcel() {
    this.messageService.showInfo('Descargar archivo de Excel', 'top center');
  }
  onMunicipioClick(event: number): any {
    if (this.selsede > 0) {
      this.selsede = -1;
    } else { }
    let nom2 = this.TablaContratos.filter(item => item.id == event);
    let etc = nom2[0].iD_ETC;
    this.nombreMunicipio = nom2[0].numeroContrato;
    this.selContrato = nom2[0].id_contrato;
    this.institucionEducativaService.getInstitucionEducativaListRelationFilter(etc).subscribe(
      (response: any) => {
        this.selectInstitucionList = response.filter(item => item.nombre == this.nombreInstituc);
        if (this.selectInstitucionList.length == 0) { this.selectSedesList = [] } else {
          this.divipolaService.getDivipolasListRelationFilter(this.selectInstitucionList[0].iD_DiviPola).subscribe(
            (response: any) => {
              this.selectDivipolaList = response;
              if (this.selectDivipolaList.length == 0) { } else {
                this.sedesService.getSedesListRelationFilter2(etc, this.selectDivipolaList[0].id, this.selectInstitucionList[0].id).subscribe(
                  (response: any) => {
                    this.selectSedesList = response;
                    this.selsede = this.selectSedesList.find(item => item.nombre == this.nombreSede).id

                  },
                  (err) => {
                  }
                );
              }


            },
            (err) => {
            }
          );
        }

      },
      (err) => {
      }
    );


  }
  onInstitucionClick(event: number): void {
    if (this.selMunicipio == 0) {
      this.selMunicipio = -1;
    } else { }
    if (this.selsede == 0) {
      this.selsede = -1;
    } else { }

    let h = this.selectInstitucionList.filter(item => item.id == event)
    this.nombreInstituc = h[0].nombre;
    this.nombreSede = '';
    let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);
    let etc = nom2[0].iD_ETC;
    if (this.selInst == 0 || this.selInst == -1) {
      this.sedesService.getSedesListRelationFilter2(etc, this.selectDivipolaList[0].id, this.selectInstitucionList[0].id).subscribe(
        (response: any) => {
          this.selectSedesList = response;

        },
        (err) => {
        }
      );
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
    let h = this.selectSedesList.filter(item => item.id == event)
    this.nombreSede = h[0].nombre;
    let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);
    let etc = nom2[0].iD_ETC;
    if (this.selInst == 0 || this.selInst == -1) {
      this.sedesService.getSedesListRelationFilter2(etc, this.selectDivipolaList[0].id, this.selectInstitucionList[0].id).subscribe(
        (response: any) => {
          this.selectSedesList = response;

        },
        (err) => {
        }
      );
    } else { }

  }
  buscarInfo(cont: number, sd: number): void {
    if (cont == 0 && sd == 0) {

      this.filterParams.id_Contrato = null;
      this.filterParams.id_sede = null;
      this.fillTable(this.filterParams);
    } else if (cont > 0 && sd == -1) {
      this.filterParams.id_Contrato = cont;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = null;
      this.fillTable(this.filterParams);

    } else if (cont > 0 && sd > 0) {
      this.filterParams.id_Contrato = cont;
      this.filterParams.id_sede = sd;
      this.fillTable(this.filterParams);
    } else if (cont == -1 && sd == -1) {
      this.filterParams.id_Contrato = null;
      this.filterParams.id_sede = null;
      this.fillTable(this.filterParams);

    }


  }
  fillTable(filterParamsTable: PA_ContratosSedeJornadaRPIModel): void {
    this.servicioTablaDetalle.getPA_ContratosSedeJornadaRPIList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaDetalle = response;

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaRPIModel>(this.TablaDetalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let IniciarValor = 0;
        let IniciarValor2 = 0;
        let IniciarValor3 = 0;
        let IniciarValor4 = 0;
        let IniciarValor5 = 0;
        response.forEach((element) => {
          IniciarValor += element.matricula;
          IniciarValor2 += element.almuerzoRPS;
          IniciarValor3 += element.compleRPS;
          IniciarValor4 += element.totalRacionesDia;
          IniciarValor5 += element.totalBeneficiarios;

        });
        this.TotalMatriculas = IniciarValor;
        this.TotalAlmuerzoRPS = IniciarValor2;
        this.TotalComplemento = IniciarValor3;
        this.TotalRaciondiaria = IniciarValor4;
        this.TotalBeneficiarios = IniciarValor5;
        this.spans = Object.assign({}, {
          jornada: this.spanDeep(['jornada'], this.TablaDetalle),

        });
      },
      (err) => {
        this.isLoading = false;
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
  /* ---FIN DE FUNCIONES------------ */
}
export interface PeriodicElement2 {
  jornada2: string,
  grados2: string,
  matricula2: number,
  almuerzo2: number,
  complemento2: number,
  racionDiaria2: number,
  totalBeneficiario2: number,
}
