import { OperadoresService } from 'src/app/shared/services/Operadores.services';
import { PA_OperadorContratosService } from 'src/app/shared/services/PA_OperadorContratos.services';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { FormGroup } from '@angular/forms';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { PA_ContratosSedeJornadaBeneficiariosModel } from 'src/app/shared/model/PA_ContratosSedeJornadaBeneficiariosModel';
import { PA_ContratosSedeNovedadesModel } from 'src/app/shared/model/PA_ContratosSedeNovedadesModel';
import { PA_ContratosSedeJornadaBeneficiariosService } from 'src/app/shared/services/PA_ContratosSedeJornadaBeneficiarios.services';
import { DecimalPipe } from '@angular/common';
import { PA_ContratosGetAllWithRelationService } from 'src/app/shared/services/PA_ContratosGetAllWithRelation.services';

@Component({
  selector: 'app-listado-raciones',
  templateUrl: './listado-raciones.component.html',
  styleUrls: ['./listado-raciones.component.scss']
})
export class ListadoRacionesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() idContrato4: number;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  TablaRaciones: PA_ContratosSedeJornadaBeneficiariosModel[] = [];
  InstitucionEducativaList: InstitucionEducativaModel[];
  TablaContratos: ContratosModel[] = [];
  divipolaList: DivipolasModel[];
  selectDivipolaList: any[];
  selectDivipolaList2: any[];
  SedesList: SedesModel[];
  sedesList: SedesModel[];
  selectSedesList: any[];
  selectSedesList2: any[];
  institucionList: InstitucionEducativaModel[];
  selectInstitucionList: any[];
  selectInstitucionList2: any[];
  filterParams: PA_ContratosSedeJornadaBeneficiariosModel = {};
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;

  public dataSource = new MatTableDataSource<PA_ContratosSedeJornadaBeneficiariosModel>();
  public dataSource2 = new MatTableDataSource<PA_ContratosSedeNovedadesModel>();
  private subs = new Subscription();
  /* Se envian al servicio */


  displayedColumns: string[] = ['municipio', 'institucionEdu', 'sedeEducativa', 'jornada', 'almuerzoRPS', 'compleRPS', 'compleRI', 'almuerzoCatering', 'compCatering', 'totalRacionesDia',];
  displayedColumns2: string[] = ['Fecha', 'Descripcion', 'Archivo',];
  displayedColumnsrec: string[] = ['sedeEducativa', 'jornada', 'almuerzoRPS', 'compleRPS', 'compleRI', 'almuerzoCatering', 'compCatering', 'totalRacionesDia',];

  /* Parte fecha y titulo */
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  nombreOperador = environment.nombreOperador;
  /* Fin Parte fecha y titulo */
  nombreContrato: string;
  nombreContrato2: string;
  idContrato: number = 0;
  idContrato2: number = 0;
  selContrato = 0;
  selMunicipio = 0;
  selInst = 0;
  selsede = 0;
  idOperador = Number(localStorage.getItem('IdUbicacion'));
  operador: boolean = false;
  public tipoSeleccionado: number = 1;
  idtab = 0;
  apr: boolean = false;
  dis: boolean = false;
  constructor(
    private divipolaService: DivipolasService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private router: Router,
    private messageService: MessageService,
    public servicioTablaRaciones: PA_ContratosSedeJornadaBeneficiariosService,
    private OperadoresService: OperadoresService,
    public servicioTablaConsultaBenefRaciones: PA_OperadorContratosService,
    private _PA_ContratosGetAllWithRelationService: PA_ContratosGetAllWithRelationService,
    private route: ActivatedRoute,) {

    this.route.queryParams.subscribe(params => {
      this.idContrato = + params.id;
      this.idContrato2 = + params.id;
    });

    let parametroContrato2 = this.idContrato2;

    if (parametroContrato2 != null && parametroContrato2 != undefined) {
      this.filterParams.id_Contrato = this.idContrato2;
    }
    this.nombreContrato2 = localStorage.getItem('benere');
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Operadores' || primernombre == 'operadores') {

      this.operador = true;
      this._PA_ContratosGetAllWithRelationService.getPA_ContratosGetAllWithRelationList(this.idOperador).subscribe(
        (response: any) => {
          this.TablaContratos = response.filter(item => item.iD_TipoContratoCHIP == 5);

          this.fillTable(this.filterParams);
        },
        (err) => {
          this.isLoading = false;
        }
      );

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.operador = false;
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 0).subscribe(
        (response: any) => {

          let s = response.filter(item => item.id_contrato == this.idContrato2);

          let g = s[0].operador
          this.OperadoresService.getOperadoresListfilter(g).subscribe(
            (response: any) => {
              let d = response;

              this._PA_ContratosGetAllWithRelationService.getPA_ContratosGetAllWithRelationList(d[0].id).subscribe(
                (response: any) => {
                  this.TablaContratos = response.filter(item => item.iD_TipoContratoCHIP == 5);

                  this.fillTable(this.filterParams);
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
          this.isLoading = false;
        }
      );

    }

    let parametroContrato = this.idContrato4;
    if (parametroContrato != null && parametroContrato != undefined) {

    }

    this.route.queryParams.subscribe(params => {
      this.idtab = +params.tab;

    });
    if (this.idtab == 1) {
      this.tipoSeleccionado = 2;
      this.apr = true;
      this.dis = false;

    } else {
      this.tipoSeleccionado = 1;
      this.apr = false;
      this.dis = true;
    }

  }

  isLoading = true;

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if (params['id'] == undefined) {
        return;
      }
      this.idContrato = params['id'];
    });
    this.nombreContrato = localStorage.getItem('nc');

  }



  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* ---FUNCIONES------------ */
  RegresarBeneficiariosRaciones() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('nc');
    this.router.navigateByUrl('/BeneficiariosRaciones')
  }
  IrATablaBenficiarios() {
    this.router.navigate(['/Beneficiarios'], { queryParams: { id: this.idContrato2 } });
  }
  IrADetalle(municipio: string, institucionEdu: string, sedeEducativa: string) {


    localStorage.setItem('nm', this.nombreContrato);
    localStorage.setItem('ni', institucionEdu);
    localStorage.setItem('ns', sedeEducativa);

    this.router.navigate(['/DetalleBeneficiarioRaciones'], { queryParams: { id: this.idContrato2 } });

  }
  onDescargarExcel() {
    this.messageService.showInfo('Descargar archivo de Excel', 'top center');
  }

  onChangeContrato(event: number) {
    this.filterParams.id_Contrato = event;
    localStorage.setItem('list', event.toString());

    this.fillTable(this.filterParams);
    this.servicioTablaRaciones.getPA_ContratosSedeJornadaBeneficiariosList(this.filterParams).subscribe(
      (response: any) => {
        this.TablaRaciones = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaBeneficiariosModel>(this.TablaRaciones);
        this.dataSource.paginator = this.paginator;
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
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.filterParams.id_divipola = null;
    this.filterParams.id_IE = null;
    this.filterParams.id_sede = null;
    this.fillTable(this.filterParams);
  }

  buscarContrato(id: number): void {

    if (id == 0) {
      let nom = this.TablaContratos.filter(item => item.id == this.idContrato2);
      this.nombreContrato = nom[0].numeroContrato
      this.filterParams.id_Contrato = this.idContrato2
      this.fillTable(this.filterParams);

    }
    else {
      let nom = this.TablaContratos.filter(item => item.id == id);
      this.nombreContrato = nom[0].numeroContrato
      this.filterParams.id_Contrato = id
      this.fillTable(this.filterParams);

    }





  }
  onMunicipioClick(event: number): void {
    if (this.selInst == 0) {
      this.selInst = -1;
    } else { }
    if (this.selsede == 0) {
      this.selsede = -1;
    } else { }
    this.restaurar()
    this.selectInstitucionList = this.selectInstitucionList.filter(item => item.id_Municipio == event);



  }

  onInstClick(event: number): void {
    if (this.selMunicipio == 0) {
      this.selMunicipio = -1;
    } else { }
    if (this.selsede == 0) {
      this.selsede = -1;
    } else { }


    let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);

    this.restaurar()
    this.selectSedesList = this.selectSedesList.filter(item => item.insid == event);





  }
  onSedeClick(event: number): void {
    let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);

    if (this.selInst == 0 || this.selInst == -1) {
      this.restaurar()
      this.selectSedesList = this.selectSedesList;

    } else { }




  }
  restaurar() {
    var arr = {};

    for (var i = 0, len = this.selectDivipolaList2.length; i < len; i++)
      arr[this.selectDivipolaList2[i]['id_Municipio']] = this.selectDivipolaList2[i];

    this.selectDivipolaList2 = new Array();
    for (var key in arr)
      this.selectDivipolaList2.push(arr[key]);

    var arr1 = {};
    this.selectDivipolaList = this.selectDivipolaList2
    for (var i = 0, len = this.selectInstitucionList2.length; i < len; i++)
      arr1[this.selectInstitucionList2[i]['insid']] = this.selectInstitucionList2[i];

    this.selectInstitucionList2 = new Array();
    for (var key in arr1)
      this.selectInstitucionList2.push(arr1[key]);

    var arr2 = {};
    this.selectInstitucionList = this.selectInstitucionList2
    for (var i = 0, len = this.selectSedesList2.length; i < len; i++)
      arr2[this.selectSedesList2[i]['id_Sede']] = this.selectSedesList2[i];

    this.selectSedesList2 = new Array();
    for (var key in arr2)
      this.selectSedesList2.push(arr2[key]);

    this.selectSedesList = this.selectSedesList2
  }
  buscarInfo(mun: number, ie: number, sd: number): void {
    if (mun == 0 && ie == 0 && sd == 0) {

      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = null;
      this.fillTable2(this.filterParams);
    } else if (mun > 0 && ie == -1 && sd == -1) {
      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = null;
      this.fillTable2(this.filterParams);
    } else if (mun > 0 && ie > 0 && sd == -1) {
      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = ie;
      this.filterParams.id_sede = null;
      this.fillTable2(this.filterParams);
    } else if (mun > 0 && ie > 0 && sd > 0) {
      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = ie;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    } else if (mun == -1 && ie > 0 && sd == -1) {
      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = ie;
      this.filterParams.id_sede = null;
      this.fillTable2(this.filterParams);
    } else if (mun == -1 && ie > 0 && sd > 0) {
      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = ie;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    } else if (mun > 0 && ie > 0 && sd > 0) {
      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = ie;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    }
    else if (mun > 0 && ie == 0 && sd > 0) {
      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    } else if (mun == 0 && ie == 0 && sd > 0) {
      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    }
    else if (mun == -1 && ie == -1 && sd > 0) {
      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    } else if (mun == -1 && ie == -1 && sd == -1) {

      this.filterParams.id_divipola = null;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = null;
      this.fillTable2(this.filterParams);
    } else if (mun > 0 && ie == -1 && sd > 0) {

      this.filterParams.id_divipola = mun;
      this.filterParams.id_IE = null;
      this.filterParams.id_sede = sd;
      this.fillTable2(this.filterParams);
    }


  }
  fillTable(filterParamsTable: PA_ContratosSedeJornadaBeneficiariosModel): void {

    this.servicioTablaRaciones.getPA_ContratosSedeJornadaBeneficiariosList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaRaciones = response;
        this.selectDivipolaList = response;
        this.selectInstitucionList = response
        this.selectSedesList = response;
        this.selectDivipolaList2 = response;
        this.selectInstitucionList2 = response
        this.selectSedesList2 = response;

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaBeneficiariosModel>(this.TablaRaciones);
        this.dataSource.paginator = this.paginator;
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
        this.dataSource.sort = this.sort;
        this.min()
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  min() {
    let nom2 = this.TablaContratos.filter(item => item.id == this.idContrato2);
    let etc = nom2[0].iD_ETC;
    this.institucionEducativaService.getInstitucionEducativaListRelationFilter4(etc).subscribe(
      (response: any) => {
        let sI = response
        this.divipolaService.getDivipolasListRelationFilter4(sI[0].iD_DiviPola).subscribe(
          (response: any) => {
            let sD = response;
            this.sedesService.getSedesListRelationFilter5(etc, sD[0].id).subscribe(
              (response: any) => {
                let sS = response;
                this.selectDivipolaList.forEach(element => {

                  element.id_Municipio = sD.find(item => item.nombre == element.municipio).id;
                  element.insid = sI.find(item => item.nombre == element.institucionEdu).id
                  element.id_Sede = sS.find(item => item.nombre == element.sedeEducativa).id
                });
                this.selectInstitucionList = this.selectDivipolaList;
                this.selectSedesList = this.selectDivipolaList;
                var arr = {};

                for (var i = 0, len = this.selectDivipolaList.length; i < len; i++)
                  arr[this.selectDivipolaList[i]['id_Municipio']] = this.selectDivipolaList[i];

                this.selectDivipolaList = new Array();
                for (var key in arr)
                  this.selectDivipolaList.push(arr[key]);

                var arr1 = {};
                this.selectDivipolaList = this.selectDivipolaList
                for (var i = 0, len = this.selectInstitucionList.length; i < len; i++)
                  arr1[this.selectInstitucionList[i]['insid']] = this.selectInstitucionList[i];

                this.selectInstitucionList = new Array();
                for (var key in arr1)
                  this.selectInstitucionList.push(arr1[key]);

                var arr2 = {};
                this.selectInstitucionList = this.selectInstitucionList
                for (var i = 0, len = this.selectSedesList.length; i < len; i++)
                  arr2[this.selectSedesList2[i]['id_Sede']] = this.selectSedesList[i];

                this.selectSedesList = new Array();
                for (var key in arr2)
                  this.selectSedesList.push(arr2[key]);

                this.selectSedesList = this.selectSedesList
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
  fillTable2(filterParamsTable: PA_ContratosSedeJornadaBeneficiariosModel): void {
    this.servicioTablaRaciones.getPA_ContratosSedeJornadaBeneficiariosList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaRaciones = response;


        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeJornadaBeneficiariosModel>(this.TablaRaciones);
        this.dataSource.paginator = this.paginator;

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
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }



  /* ---FIN DE FUNCIONES------------ */

}
