import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { PA_ContratosSedeNovedadesModel } from 'src/app/shared/model/PA_ContratosSedeNovedadesModel';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { PA_ContratosSedeJornadaBeneficiariosService } from 'src/app/shared/services/PA_ContratosSedeJornadaBeneficiarios.services';
import { PA_ContratosSedeNovedades, PA_ContratosSedeNovedadesService } from 'src/app/shared/services/PA_ContratosSedeNovedades.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabla-novedades',
  templateUrl: './tabla-novedades.component.html',
  styleUrls: ['./tabla-novedades.component.scss']
})
export class TablaNovedadesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  TablaNovedades: PA_ContratosSedeNovedadesModel[] = [];
  InstitucionEducativaList: InstitucionEducativaModel[];
  TablaContratos: ContratosModel[] = [];
  divipolaList: DivipolasModel[];
  selectDivipolaList: DivipolasModel[];
  SedesList: SedesModel[];
  sedesList: SedesModel[];
  selectSedesList: SedesModel[];
  institucionList: InstitucionEducativaModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  filterParams: PA_ContratosSedeNovedades = {};
  sedesForm: FormGroup;
  editarSedesForm: FormGroup;

  public dataSource = new MatTableDataSource<PA_ContratosSedeNovedadesModel>();
  private subs = new Subscription();
  /* Se envian al servicio */
  idContrato: number = 0;

  displayedColumns: string[] = ['fecha', 'descripcion', 'archivo',];


  /* Parte fecha y titulo */
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  nombreOperador = environment.nombreOperador;
  /* Fin Parte fecha y titulo */
  nombreContrato: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    public servicioTablaRaciones: PA_ContratosSedeJornadaBeneficiariosService,
    public servicioTablaNovedades: PA_ContratosSedeNovedadesService,
    public servicioContratos: ContratosService,
    private route: ActivatedRoute,) {

    this.route.queryParams.subscribe(params => {
      this.idContrato = + params.id;

    });


    this.filterParams.id_Contrato = this.idContrato


  }

  isLoading = true;

  ngOnInit(): void {
    this.servicioContratos.getContratosList().subscribe(
      (response: any) => {
        this.TablaContratos = response;
      },
      (err) => {
        this.isLoading = false;
      }
    );

    this.servicioTablaNovedades.getPA_ContratosSedeNovedadesList(this.filterParams).subscribe(
      (response: any) => {
        this.TablaNovedades = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_ContratosSedeNovedadesModel>(this.TablaNovedades);
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

    this.route.params.subscribe((params) => {
      if (params['id'] == undefined) {
        return;
      }
      this.idContrato = params['id'];
    });
    this.nombreContrato = localStorage.getItem('nc');
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

  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  /* ---FUNCIONES------------ */
  RegresarBeneficiariosRaciones() {
    this.router.navigateByUrl('/BeneficiariosRaciones')
  }
  IrATablaBenficiarios() {
    this.router.navigate(['/Beneficiarios', this.idContrato]);
  }
  onDescargarExcel() {
    this.messageService.showInfo('Descargar archivo de Excel', 'top center');
  }
  downloadFile(obj: any): void {

    let _fileUpload: fileUploadModel;
    _fileUpload = { file: null, fileName: obj, cnx: environment.cnxBS, container: environment.containerDS };
    (this.servicioTablaNovedades.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: this.getType(obj) });
        saveAs(blob, obj);
      },
      (err) => {
      }
    )
  };
  getType(_response: any): string {
    let fileName = _response;
    //file type extension
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == ".txt") {
      fileType = "text/plain";
    }
    if (checkFileType == ".pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == ".doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == ".png") {
      fileType = "image/png";
    }
    if (checkFileType == ".jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".gif") {
      fileType = "image/gif";
    }
    if (checkFileType == ".csv") {
      fileType = "text/csv";
    }
    return fileType;
  }

  /* ---FIN DE FUNCIONES------------ */

}