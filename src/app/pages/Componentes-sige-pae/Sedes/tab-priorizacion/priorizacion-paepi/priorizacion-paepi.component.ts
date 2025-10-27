
import { JornadaService } from './../../../../../shared/services/Jornada.services';
import { JornadaModel } from './../../../../../shared/model/Jornada';
import { PA_PrioSedeAsignaRacionPivRequest, PA_PrioSedeAsignaRacionPivService } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PA_PrioSedeAsignaRacionPivModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModel';
import { MatTableDataSource } from '@angular/material/table';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { PA_PrioSedeAsignaRacionPivExtnd2Model } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModelExtend2';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-priorizacion-paepi',
  templateUrl: './priorizacion-paepi.component.html',
  styleUrls: ['./priorizacion-paepi.component.scss']
})
export class PriorizacionPaepiComponent implements OnInit {


  viewingDetail = false;
  idSede = 0;
  idTab = 0;
  Grado = 'Todos';
  Matricula: number = 0;
  almRPS: number = 0;
  comRPS: number = 0;
  comRI: number = 0;
  almCCT: number = 0;
  comCCT: number = 0;
  raciones: number = 0;

  dataSourceSedeGeneral: MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>;
  columnAsignacionNames = ['jornada', 'grados', 'matriculaSimat', 'almuerzoRps', 'complementoRps', 'almuerzoCatering', 'complementoCatering', 'racionesDiarias', 'bandera'];

  prioSedeAsignaRacionPivParams: PA_PrioSedeAsignaRacionPivRequest = {};
  jornadasList: JornadaModel[];
  prioSedeAsignaRacionPivGeneralList: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivListForever: PA_PrioSedeAsignaRacionPivExtnd2Model[] = [];
  prioSedeAsignaRacionPivShow: PA_PrioSedeAsignaRacionPivExtnd2Model[];
  prioSedeAsignaRacionPivGeneralTemp: PA_PrioSedeAsignaRacionPivExtnd2Model = {
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
  nombreSede: string;
  nombreIntEducativa: string;
  nombreMunicipio: string;
  prm_nombre: string;
  pri_nombre: string;
  prs_nombre: string;
  public nombreUbicacion = localStorage.getItem('Ubicacion');
  public MaemActivo = localStorage.getItem('EsMaem');
  MaemActive: boolean = false;
  currentYear = new Date().getFullYear();
  currentVig = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  currentVigNom='';
  dateToday: number = Date.now();
  spans = {};
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  divipolaList: PA_DivipolasGetbyETCModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  selectSedesList: SedesModel[];
  idETC = Number(localStorage.getItem('IdUbicacion'));
  filterForm: FormGroup;
 
  PriorizadaPAEList = [
    { id: 1, nombre: "Si" },
    { id: 2, nombre: "No" },
  ];
  selMunicipio = -1;
  selInst = -1;
  selsede = -1;
  selprioriza = -1;
  priorizaListT: any[] = [];
  selectDivipolaList: DivipolasModel[];
  selectDivipolaList2: DivipolasModel[];
  nombreInstitucion: string;
  PA_PrioSedeBeneficiariasParams:PA_PrioSedeBeneficiarias={};
  PA_InstitucionEducativaRequest:PA_InstitucionEducativaGetAllWithRelationRequest={};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private jornadaService: JornadaService,
    private prioSedeAsignaRacionPivService: PA_PrioSedeAsignaRacionPivService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private fb: FormBuilder,
    private sedesService: SedesService,
    private institucionEducativaService: InstitucionEducativaService,
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
    private divipolaService: DivipolasService,
    private _PA_InstitucionEducativaGetAllWithRelationService:PA_InstitucionEducativaGetAllWithRelationService,
  ) {
    this.currentVigNom =this.currentVig.nombre;
    this.filterForm = this.fb.group({
      municipio: ['', Validators.required],
      institucionEducativa: ['', Validators.required],
      sede: ['', Validators.required],
    });
    this.prioSedeAsignaRacionPivParams.idSede = this.idSede;
    this.prioSedeAsignaRacionPivParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
    this.fillGeneralTable();
    this.jornadaService.getJornadaList().subscribe(
      (response: any) => {
        this.jornadasList = response;
        this.fillGeneralTable();
      },
      (err) => {
      }
    );
    /* this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
      },
      (err) => {
      }
    ); */
  }

  ngOnInit(): void {
    this.prm_nombre = "";
    this.pri_nombre = "";
    this.prs_nombre = "";
    this.route.queryParams.subscribe(params => {
      this.idSede = +params.id;
      this.idTab = +params.tab;

    });
    this.nombreSede = localStorage.getItem('prs')
    this.nombreIntEducativa = localStorage.getItem('pri')
    this.nombreMunicipio = localStorage.getItem('prm')
    this.prioSedeAsignaRacionPivParams.idSede = this.idSede;
    if (this.MaemActivo == 'MAEM ') {
      this.MaemActive = true
    } else {
      this.MaemActive = false
    }
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.PA_PrioSedeBeneficiariasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede=this.idSede

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
      this.PA_PrioSedeBeneficiariasParams.id_ETC=0
      this.PA_PrioSedeBeneficiariasParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede=this.idSede
    }
    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList3(this.PA_PrioSedeBeneficiariasParams).subscribe(
      (response: any) => {

        this.priorizaListT = response;
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
                this.PA_InstitucionEducativaRequest.Id_DiviPola=this.selMunicipio;
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


                    this.selInst = h[0].id;
                    this.nombreIntEducativa=h[0].nombre;
                    this.sedesService.getSedesListRelationFilter2(this.idETC, this.selMunicipio, this.selInst).subscribe(
                      (response: any) => {
                        this.selectSedesList = response;
                        this.selectSedesList.sort(function(a, b) {
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
                        this.nombreSede=h[0].nombre;

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
          },
          (err) => {
          }
        );



      },
      (err) => {
      }
    );
  }
  RegresarPriorizacion() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('prs');
    localStorage.removeItem('pri');
    localStorage.removeItem('prm');
    // this.router.navigate(['/Sedes'], { queryParams: { tab: 3 } })

    this.router.navigate(['/Sedes'], { queryParams: { tab: 3 } }).then(() => {
      window.location.reload();
    });

  }

  onMunicipioClick(value: any): void {
    var muni = this.divipolaList.find(x => x.id === value).nombre
    this.prm_nombre = muni;
    this.pri_nombre = "";
    this.prs_nombre = "";
    // console.info('selecciono', muni)
    this.selMunicipio = value;
    this.selInst=-1;
    this.selsede=-1;

    if (value == -1) {

    } else {
      this.PA_InstitucionEducativaRequest.Id_DiviPola=value;
    this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
        (response: any) => {
          this.selectInstitucionList = response;
        },
        (err) => {
        }
      );
    }
  }

  onInstitucionClick(value: any): void {
    var insti = this.selectInstitucionList.find(x => x.id === value).nombre
    this.pri_nombre = insti;
    this.prs_nombre = "";
    //   console.info('selecciono', insti)
    this.selsede=-1;
    if (value == -1) {

    } else {
      this.sedesService.getSedesListRelationFilter3(value).subscribe(
        (response: any) => {
          this.selectSedesList = response;

        },
        (err) => {
        }

      );
    }
  }

  onFilterClick(mun:number,ie:number,sd:number): void {
    if(this.selsede==-1){
      Swal.fire({
        showCloseButton: false,
        html:
          '<img style="position: absolute !important ; top: 5% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No has seleccionado una sede especifica </p> ' ,
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

        }else {

        }
      })
    }else{
      this.router.navigate(['/PriorizacionDetalle'],{ queryParams: {id:sd, tab:3} }).then(() => {
        window.location.reload();
      });
    }
    
  }

  onSedeClick(value) {
    var sede = this.selectSedesList.find(x => x.id === value).nombre
    this.prs_nombre = sede;
    //    console.info('cambio sede',sede)
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
    this.prioSedeAsignaRacionPivService.getPA_PrioSedeAsignaRacionPivList(this.prioSedeAsignaRacionPivParams).subscribe(
      (response: any) => {
        this.prioSedeAsignaRacionPivList = response;

        this.prioSedeAsignaRacionPivGeneralList = this.prioSedeAsignaRacionPivList.map(object => ({ ...object }));
        this.prioSedeAsignaRacionPivShow = this.fillJornadasTotales(this.prioSedeAsignaRacionPivGeneralList)
        this.prioSedeAsignaRacionPivGeneralList = this.prioSedeAsignaRacionPivShow.filter(item => item.Grado == 'Todos');
        this.prioSedeAsignaRacionPivGeneralList.map(item => {
          item.Grado = 'TODOS'
        })
        this.getTotal3(this.prioSedeAsignaRacionPivGeneralList);

        let acumulador = 0;
        let acumulador1 = 0;
        let acumulador2 = 0;
        let acumulador3 = 0;
        let acumulador4 = 0;
        let acumulador5 = 0;
        let acumulador6 = 0;

        response.forEach((item) => {
          acumulador = item.Matricula + acumulador;
          acumulador1 = item.m1_ComplementoAlmuerzo + acumulador1;
          acumulador2 = item.m1_ComplementoAMPM + acumulador2;
          /* acumulador3 = item.m2_ComplementoAMPM + acumulador3; */
          acumulador4 = item.m3_ComplementoAlmuerzo + acumulador4;
          acumulador5 = item.m3_ComplementoAMPM + acumulador5;
          acumulador6 = item.TotalRaciones + acumulador6;

        })
        this.Matricula = acumulador;
        this.almRPS = acumulador1;
        this.comRPS = acumulador2;
        this.comRI = acumulador3;
        this.almCCT = acumulador4;
        this.comCCT = acumulador5;
        this.raciones = acumulador6;


        this.dataSourceSedeGeneral = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>(this.prioSedeAsignaRacionPivGeneralList);
        this.spans = Object.assign({}, {
          Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivGeneralList),

        });
      },
      (err) => {
      }
    );
  }

  fillDetailTable() {
    this.prioSedeAsignaRacionPivService.getPA_PrioSedeAsignaRacionPivList(this.prioSedeAsignaRacionPivParams).subscribe(
      (response: any) => {
        this.prioSedeAsignaRacionPivList = response;
        this.prioSedeAsignaRacionPivListForever = this.prioSedeAsignaRacionPivList.map(object => ({ ...object }));
        this.getTotal3(this.prioSedeAsignaRacionPivList);
        this.prioSedeAsignaRacionPivShow = this.fillJornadasTotales(this.prioSedeAsignaRacionPivList)
        this.prioSedeAsignaRacionPivList.sort(function (a, b) {
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

        this.dataSourceSedeGeneral = new MatTableDataSource<PA_PrioSedeAsignaRacionPivExtnd2Model>(this.prioSedeAsignaRacionPivShow);
        this.spans = Object.assign({}, {
          Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivShow),

        });

      },
      (err) => {
      }
    );
  }
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
  fillJornadasTotales(pivList: PA_PrioSedeAsignaRacionPivExtnd2Model[]): PA_PrioSedeAsignaRacionPivExtnd2Model[] {
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
