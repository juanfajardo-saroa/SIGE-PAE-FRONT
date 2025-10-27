import { AlertMessageComponent } from './../../../../../shared/component/alert-message/alert-message.component';
import { JornadaService } from './../../../../../shared/services/Jornada.services';
import { JornadaModel } from './../../../../../shared/model/Jornada';
import { PA_PrioSedeAsignaRacionPivRequest, PA_PrioSedeAsignaRacionPivService } from 'src/app/shared/services/PA_PrioSedeAsignaRacionPiv.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PA_PrioSedeAsignaRacionPivModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { PA_PrioSedeAsignaRacionPivExtndModel } from 'src/app/shared/model/PA_PrioSedeAsignaRacionPivModelExtend';
import { PA_ActualiarFlatAmarillaService } from 'src/app/shared/services/PA_ActualiarFlatAmarilla.services';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab-priorizacion-detalle',
  templateUrl: './tab-priorizacion-detalle.component.html',
  styleUrls: ['./tab-priorizacion-detalle.component.scss']
})
export class TabPriorizacionDetalleComponent implements OnInit {

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
  idvigencia = Number(localStorage.getItem('VigSeleccionada'));
  dataSourceSedeGeneral: MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>;
  columnAsignacionNames = ['jornada', 'grados', 'matriculaSimat', 'almuerzoRps', 'complementoRps', 'complementoRi', 'almuerzoCatering', 'complementoCatering', 'racionesDiarias'];

  prioSedeAsignaRacionPivParams: PA_PrioSedeAsignaRacionPivRequest = {};
  jornadasList: JornadaModel[];
  prioSedeAsignaRacionPivGeneralList: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivList: PA_PrioSedeAsignaRacionPivExtndModel[];
  prioSedeAsignaRacionPivListForever: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
  prioSedeAsignaRacionPivShow: PA_PrioSedeAsignaRacionPivExtndModel[];
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
  nombreSede: string;
  nombreIntEducativa: string;
  nombreMunicipio: string;
  public nombreUbicacion = localStorage.getItem('Ubicacion');

  public MaemActivo = localStorage.getItem('EsMaem');
  MaemActive: boolean = false;
  MaerActive: boolean = false;
  PaepiActive: boolean = false;

  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  spans = {};
  filterParams: PA_PrioSedeBeneficiarias = {};
  priorizaListT: any[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private jornadaService: JornadaService,
    private prioSedeAsignaRacionPivService: PA_PrioSedeAsignaRacionPivService,
    private  _PA_ActualiarFlatAmarilla:PA_ActualiarFlatAmarillaService,
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
  ) {
    this.prioSedeAsignaRacionPivParams.idSede = this.idSede;
    this.fillGeneralTable();
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
    this.route.queryParams.subscribe(params => {
      this.idSede = +params.id;
      this.idTab = +params.tab;

    });
    this.nombreSede = localStorage.getItem('prs')
    this.nombreIntEducativa = localStorage.getItem('pri')
    this.nombreMunicipio = localStorage.getItem('prm')
    this.prioSedeAsignaRacionPivParams.idSede = this.idSede;
    this.prioSedeAsignaRacionPivParams.id_Vigencia = this.idvigencia
    this._PA_ActualiarFlatAmarilla.getPA_ActualiarFlatAmarillaList(this.idSede,false,null).subscribe((response: any) => {
    },
    (err) => {
    });
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.Id_sede=this.idSede;
    this.fillTable(this.filterParams);

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.filterParams.id_ETC=0
      this.filterParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.Id_sede=this.idSede;
      this.fillTable(this.filterParams);
    }
    
  }
  fillTable(filterParamsTable: PA_PrioSedeBeneficiarias): void {



    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList2(filterParamsTable).subscribe(
      (response: any) => {
        this.priorizaListT = response;
        if (this.priorizaListT[0].modeloOperacion == 'MAEM'){
          this.MaemActive = true
        }else {
          this.MaemActive = false
        }
        if (this.priorizaListT[0].modeloOperacion == 'PAEPI'){
          this.PaepiActive = true
        }else {
          this.PaepiActive = false
        }
        if (this.priorizaListT[0].modeloOperacion == 'MAER'){
          this.MaerActive = true
        }else {
          this.MaerActive = false
        }
        if (this.priorizaListT[0].modeloOperacion == 'no tiene' || this.priorizaListT[0].modeloOperacion == null ){
        
          Swal.fire({
            showCloseButton: false,
            html:
              '<img style="position: absolute !important ; top: 13% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; ">Esta sede no tiene un modelo de operación asignado </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA !important; ">Para cambiar el modelo de operación de la sede, o retirar/meter la sede del listado de priorizadas, ingrese al sistema MiPAE, sección "Sedes beneficiarias" </p> ' ,
              
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
              this.RegresarPriorizacion();
            }else {
              this.RegresarPriorizacion();
            }
          })
        }


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
    this.router.navigate(['/Sedes'], { queryParams: { tab: 3 } })

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

        this.prioSedeAsignaRacionPivList.forEach(element => {

          this.prioSedeAsignaRacionPivGeneralTemp.Jornada = element.Jornada;
          this.prioSedeAsignaRacionPivGeneralTemp.Grado = "TODOS";
          this.prioSedeAsignaRacionPivGeneralTemp.Matricula += element.Matricula;
          this.prioSedeAsignaRacionPivGeneralTemp.m1_ComplementoAlmuerzoCualificado += element.m1_ComplementoAlmuerzoCualificado;
          this.prioSedeAsignaRacionPivGeneralTemp.m1_ComplementoAlmuerzo += element.m1_ComplementoAlmuerzo;
          this.prioSedeAsignaRacionPivGeneralTemp.m2_ComplementoAMPM += element.m2_ComplementoAMPM;
          this.prioSedeAsignaRacionPivGeneralTemp.m3_ComplementoAlmuerzoCualificado += element.m3_ComplementoAlmuerzoCualificado;
          this.prioSedeAsignaRacionPivGeneralTemp.m3_ComplementoAlmuerzo += element.m3_ComplementoAlmuerzo;
          this.prioSedeAsignaRacionPivGeneralTemp.TotalRaciones += element.TotalRaciones;


      });
      if (this.prioSedeAsignaRacionPivGeneralTemp.Jornada != "") {
        this.prioSedeAsignaRacionPivGeneralList.push(this.prioSedeAsignaRacionPivGeneralTemp);
        this.prioSedeAsignaRacionPivGeneralTemp = {
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
      }


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
          acumulador2 = item.m1_ComplementoAlmuerzoCualificado + acumulador2;
          acumulador3 = item.m2_ComplementoAMPM + acumulador3;
          acumulador4 = item.m3_ComplementoAlmuerzo + acumulador4;
          acumulador5 = item.m3_ComplementoAlmuerzoCualificado + acumulador5;
          acumulador6 = item.TotalRaciones + acumulador6;

        })
        this.Matricula = acumulador;
        this.almRPS = acumulador1;
        this.comRPS = acumulador2;
        this.comRI = acumulador3;
        this.almCCT = acumulador4;
        this.comCCT = acumulador5;
        this.raciones = acumulador6;


        this.dataSourceSedeGeneral = new MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>(this.prioSedeAsignaRacionPivGeneralList);
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

        this.dataSourceSedeGeneral = new MatTableDataSource<PA_PrioSedeAsignaRacionPivModel>(this.prioSedeAsignaRacionPivShow);
        this.spans = Object.assign({}, {
          Jornada: this.spanDeep(['Jornada'], this.prioSedeAsignaRacionPivShow),

        });

      },
      (err) => {
      }
    );
  }
  fillJornadasTotales(pivList: PA_PrioSedeAsignaRacionPivExtndModel[]): PA_PrioSedeAsignaRacionPivExtndModel[] {
    var pivListTotalJornada: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
    var pivListTotalJornadaFilter: PA_PrioSedeAsignaRacionPivExtndModel[] = [];
    var pivListTotalJornadaElement: PA_PrioSedeAsignaRacionPivExtndModel = {
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
    var acumulador = 0;
    pivList.forEach((element, index) => {

      pivListTotalJornada.push(element);
      if (index == (pivList.length - 1)) {



        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m2_ComplementoAMPM);
        pivListTotalJornadaElement.m2_ComplementoAMPM = acumulador;
        acumulador = 0;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m2_ComplementoAMPM);
        pivListTotalJornadaElement.m2_ComplementoAMPM = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.TotalRaciones);
        pivListTotalJornadaElement.TotalRaciones = acumulador;
        acumulador = 0;
        pivListTotalJornada.push(pivListTotalJornadaElement);
        pivListTotalJornadaElement = {
          Jornada: "",
          Grado: "Todos",
          Matricula: null,
          m1_ComplementoAlmuerzoCualificado: null,
          m2_ComplementoAMPM: null,
          m3_ComplementoAlmuerzoCualificado: null,
          TotalRaciones: null,
          id_gradosedeJornada: null,
          m1_ComplementoAMPM: null,
          m3_ComplementoAMPM: null,
          m1_ComplementoAlmuerzo: null,
          m3_ComplementoAlmuerzo: null,
        };
      }

      else if (element.Jornada != pivList[index + 1].Jornada) {
        pivListTotalJornadaElement.Jornada = element.Jornada;
        pivListTotalJornadaFilter = pivList.filter(piv => piv.Jornada == element.Jornada);
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.Matricula);
        pivListTotalJornadaElement.Matricula = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m1_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m1_ComplementoAlmuerzoCualificado = acumulador;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m2_ComplementoAMPM);
        pivListTotalJornadaElement.m2_ComplementoAMPM = acumulador;
        acumulador = 0;
        acumulador = 0;
        pivListTotalJornadaFilter.forEach(obj => acumulador += obj.m3_ComplementoAlmuerzoCualificado);
        pivListTotalJornadaElement.m3_ComplementoAlmuerzoCualificado = acumulador;
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
          Jornada: "",
          Grado: "Todos",
          Matricula: null,
          m1_ComplementoAlmuerzoCualificado: null,
          m2_ComplementoAMPM: null,
          m3_ComplementoAlmuerzoCualificado: null,
          TotalRaciones: null,
          id_gradosedeJornada: null,
          m1_ComplementoAMPM: null,
          m3_ComplementoAMPM: null,
          m1_ComplementoAlmuerzo: null,
          m3_ComplementoAlmuerzo: null,
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
