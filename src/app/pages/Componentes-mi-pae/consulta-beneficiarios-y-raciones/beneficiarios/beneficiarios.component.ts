
import { PA_OperadorContratosModel } from 'src/app/shared/model/PA_OperadorContratosModel';
import { PA_OperadorContratosService } from 'src/app/shared/services/PA_OperadorContratos.services';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { FormGroup } from '@angular/forms';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { PA_ContratosCantidadBeneficiariosModel } from 'src/app/shared/model/PA_ContratosCantidadBeneficiariosModel';
import { PA_ContratosCantidadBeneficiariosService } from 'src/app/shared/services/PA_ContratosCantidadBeneficiarios.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.scss']
})
export class BeneficiariosComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  TablaBeneficiarios: PA_ContratosCantidadBeneficiariosModel[] = [];
  InstitucionEducativaList: InstitucionEducativaModel[];
  TablaContratos: any[] = [];
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
  filterParams: PA_ContratosCantidadBeneficiariosModel = {};
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;
  idOperador = Number(localStorage.getItem('IdUbicacion'));
  public dataSource = new MatTableDataSource<PA_ContratosCantidadBeneficiariosModel>();
  private subs = new Subscription();
  /* Se envian al servicio */
  idContrato: number = 0;
  idContrato2: number = 0;
  idContrato3: number = 0;
  selContrato = 0;
  selMunicipio = 0;
  selInst = 0;
  selsede = 0;
  displayedColumns: string[] = ['municipio', 'institucionEdu', 'sedeEducativa', 'codigoDane', 'matricula', 'racionesDiaria', 'totalBeneficiarios'];
  displayedColumnsrec: string[] = ['sedeEducativa', 'codigoDane', 'matricula', 'racionesDiaria', 'totalBeneficiarios'];
  public tipoSeleccionado: number = 1;
  idtab = 0;
  apr: boolean = false;
  dis: boolean = false;

  TablaConsultaBenefRaciones: PA_OperadorContratosModel[] = [];

  /* Parte fecha y titulo */
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  nombreOperador = environment.nombreOperador;
  operador: boolean = false;
  /* Fin Parte fecha y titulo */
  nombreContrato: string;

  constructor(
    private router: Router,
    private messageService: MessageService,
    public servicioTablaBeneficiarios: PA_ContratosCantidadBeneficiariosService,
    public servicioContratos: ContratosService,
    public servicioTablaConsultaBenefRaciones: PA_OperadorContratosService,
    private route: ActivatedRoute,) {

    this.route.queryParams.subscribe(params => {
      this.idContrato = + params.id;
      this.idContrato2 = + params.id;
    });

    let parametroContrato = this.idContrato2;

    if (parametroContrato != null && parametroContrato != undefined) {
      this.filterParams.id_Contrato = this.idContrato2;
    }

    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Operadores' || primernombre == 'operadores') {

      this.operador = true;

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.operador = false;
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
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'Operadores' || primernombre == 'operadores') {

      this.operador = true;
      /*  this.servicioContratos.getContratosListfilter(this.idOperador).subscribe(
        (response: any) => {
          this.TablaContratos = response.filter(item=>item.iD_TipoContratoCHIP==5);
    
    
        },
        (err) => {
          this.isLoading = false;
        }
      ); */
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 1).subscribe(
        (response: any) => {
          this.TablaContratos = response;



        },
        (err) => {
          this.isLoading = false;
        }
      );

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      this.operador = false;
      this.servicioTablaConsultaBenefRaciones.getPA_OperadorContratosList(this.idOperador, 0).subscribe(
        (response: any) => {
          this.TablaContratos = response
          let s = response.filter(item => item.id_contrato == this.idContrato2);
          let g = s[0].operador
          /* this.OperadoresService.getOperadoresListfilter(g).subscribe(
            (response: any) => {
              let d = response;
  
              this.servicioContratos.getContratosListfilter(d[0].id).subscribe(
                (response: any) => {
                  this.TablaContratos = response.filter(item=>item.iD_TipoContratoCHIP==5);
  
  
                },
                (err) => {
                  this.isLoading = false;
                }
              );
            },
            (err) => {
            }
          ); */

        },
        (err) => {
          this.isLoading = false;
        }
      );

    }



    //this.fillTable(this.filterParams);
    /* this.servicioTablaBeneficiarios.getPA_ContratosCantidadBeneficiariosList(this.filterParams).subscribe(
      (response: any) => {
        this.TablaBeneficiarios = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosCantidadBeneficiariosModel>(this.TablaBeneficiarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    ); */
    this.route.params.subscribe((params) => {
      if (params['id'] == undefined) {
        return;
      }
      this.idContrato = params['id'];
    });
    this.nombreContrato = localStorage.getItem('nc');
    /* this.nombreMunicipio = localStorage.getItem('nm');
    this.nombreInstituc = localStorage.getItem('ni');
    this.nombreSede = localStorage.getItem('ns'); */

  }
  public cargarPTNpreparacion(value: any) {
    var target = value.currentTarget;
    this.cambiarFocoPestana(target);

    switch (target.id) {
      case "disponible":
        this.tipoSeleccionado = 1;
        break;
      case "aprobacion":
        this.tipoSeleccionado = 2;
        break;
    }
  }

  public cambiarFocoPestana(target: any) {
    var clases = target.className.split(" ");
    var claseAdd = "";
    if (clases.length > 0) {
      var divPestanas: any = document.getElementsByClassName("pestanaCC");
      for (let div of divPestanas) {
        var claseDiv = div.className.split(" ");
        if (claseDiv[2] == "active") {
          claseAdd = "tab-item pestanaCC w-down-fit-content";
          div.className = claseAdd;
        }
      }

      claseAdd = "";
      claseAdd += "tab-item pestanaCC active w-down-fit-content";
    }

    target.className = claseAdd;
  }


  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* ---FUNCIONES------------ */
  RegresarBeneficiariosRaciones() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('nc');
    localStorage.removeItem('benere');
    this.router.navigateByUrl('/BeneficiariosRaciones');
  }
  IrAListadoRaciones() {
    this.router.navigate(['/ListadoRaciones'], { queryParams: { id: this.idContrato2 } });
  }
  onDescargarExcel() {
    this.messageService.showInfo('Descargar archivo de Excel', 'top center');
  }


  IrADetalle(municipio: string, institucionEdu: string, sedeEducativa: string) {

    localStorage.setItem('divi', this.divipolaList.find(item => item.nombre == municipio).id.toString());
    localStorage.setItem('inst', this.institucionList.find(item => item.nombre == institucionEdu).id.toString());
    localStorage.setItem('sede', this.sedesList.find(item => item.nombre == sedeEducativa).id.toString());

    localStorage.setItem('nm', municipio);
    localStorage.setItem('ni', institucionEdu);
    localStorage.setItem('ns', sedeEducativa);
    this.router.navigate(['/DetalleBeneficiarioRaciones'], { queryParams: { id: this.idContrato2 } });
  }


  buscarContrato(id: number): void {

    if (id == 0) {
      let nom = this.TablaContratos.filter(item => item.id_contrato == this.idContrato2);

      this.nombreContrato = nom[0].numeroContrato
      this.filterParams.id_Contrato = this.idContrato2
      this.idContrato3 = this.idContrato2

      localStorage.setItem('benere', 'si')
      this.fillTable(this.filterParams);

    }
    else {
      let nom = this.TablaContratos.filter(item => item.id_contrato == id);
      this.nombreContrato = nom[0].numeroContrato
      this.filterParams.id_Contrato = id
      this.fillTable(this.filterParams);

    }




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

  fillTable(filterParamsTable: PA_ContratosCantidadBeneficiariosModel): void {
    this.servicioTablaBeneficiarios.getPA_ContratosCantidadBeneficiariosList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaBeneficiarios = response;
        this.selectDivipolaList = response;
        this.selectInstitucionList = response
        this.selectSedesList = response;
        this.selectDivipolaList2 = response;
        this.selectInstitucionList2 = response
        this.selectSedesList2 = response;
        var arr = {};

        for (var i = 0, len = this.selectDivipolaList.length; i < len; i++)
          arr[this.selectDivipolaList[i]['id_Municipio']] = this.selectDivipolaList[i];

        this.selectDivipolaList = new Array();
        for (var key in arr)
          this.selectDivipolaList.push(arr[key]);

        var arr1 = {};

        for (var i = 0, len = this.selectInstitucionList.length; i < len; i++)
          arr1[this.selectInstitucionList[i]['insid']] = this.selectInstitucionList[i];

        this.selectInstitucionList = new Array();
        for (var key in arr1)
          this.selectInstitucionList.push(arr1[key]);

        var arr2 = {};

        for (var i = 0, len = this.selectSedesList.length; i < len; i++)
          arr2[this.selectSedesList[i]['id_Sede']] = this.selectSedesList[i];

        this.selectSedesList = new Array();
        for (var key in arr2)
          this.selectSedesList.push(arr2[key]);

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosCantidadBeneficiariosModel>(this.TablaBeneficiarios);
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
  fillTable2(filterParamsTable: PA_ContratosCantidadBeneficiariosModel): void {
    this.servicioTablaBeneficiarios.getPA_ContratosCantidadBeneficiariosList(filterParamsTable).subscribe(
      (response: any) => {
        this.TablaBeneficiarios = response;
        this.selectDivipolaList = response;
        this.selectInstitucionList = response
        this.selectSedesList = response;
        this.selectDivipolaList2 = response;
        this.selectInstitucionList2 = response
        this.selectSedesList2 = response;
        var arr = {};

        for (var i = 0, len = this.selectDivipolaList.length; i < len; i++)
          arr[this.selectDivipolaList[i]['id_Municipio']] = this.selectDivipolaList[i];

        this.selectDivipolaList = new Array();
        for (var key in arr)
          this.selectDivipolaList.push(arr[key]);

        var arr1 = {};

        for (var i = 0, len = this.selectInstitucionList.length; i < len; i++)
          arr1[this.selectInstitucionList[i]['insid']] = this.selectInstitucionList[i];

        this.selectInstitucionList = new Array();
        for (var key in arr1)
          this.selectInstitucionList.push(arr1[key]);

        var arr2 = {};

        for (var i = 0, len = this.selectSedesList.length; i < len; i++)
          arr2[this.selectSedesList[i]['id_Sede']] = this.selectSedesList[i];

        this.selectSedesList = new Array();
        for (var key in arr2)
          this.selectSedesList.push(arr2[key]);

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosCantidadBeneficiariosModel>(this.TablaBeneficiarios);
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
export interface PeriodicElement {
  municipio: string;
  institucionEdu: string;
  sedeEducativa: string;
  matricula: number;
  racionesDiaria: number;
  totalBeneficiarios: number;
}

