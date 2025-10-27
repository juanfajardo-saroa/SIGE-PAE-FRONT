import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as saveAs from 'file-saver';
import { Subscription } from 'rxjs';



import { environment } from 'src/environments/environment';


import { DiagnosticoSituacionalModel } from 'src/app/shared/model/DiagnosticoSituacional';
import { DiagnosticoSituacionalService } from 'src/app/shared/services/DiagnosticoSituacional.services';
import { DiagnosticoSituacionalExtendService } from 'src/app/shared/services/DiagnosticoSituacional-Extend.services';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { PA_DiagnosticoSituacionalGetAllFullbyEtcService } from 'src/app/shared/services/PA_DiagnosticosituacionalGetAllFullbyEtc.services';
import { PA_DiagnosticoSituacionalGetAllFullbyEtcModel } from 'src/app/shared/model/PA_DiagnosticosituacionalGetAllFullbyEtcModel';
import Swal from 'sweetalert2';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-diag-resumen-etc',
  templateUrl: './diag-resumen-etc.component.html',
  styleUrls: ['./diag-resumen-etc.component.scss']
})
export class DiagResumenETCComponent implements OnInit,AfterViewInit, OnDestroy {
  private subs = new Subscription()
  constructor(
    public serviciosp:DiagnosticoSituacionalExtendService,
    public DiagnosticoService: DiagnosticoSituacionalService,
    private _PA_DiagnosticoSituacionalGetAllFullbyEtc:PA_DiagnosticoSituacionalGetAllFullbyEtcService,
  ) { }
  dataArray: any;
  displayedColumns: string[] = ['Nombresita', 'Fechasita', 'Descripcionsita','Archivosita'];
  dataSource = new MatTableDataSource<PA_DiagnosticoSituacionalGetAllFullbyEtcModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  isLoading = true;
  ngOnInit(): void {
    this._PA_DiagnosticoSituacionalGetAllFullbyEtc.getPA_DiagnosticoSituacionalGetAllFullbyEtcList(Number(localStorage.getItem('IdUbicacion'))).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PA_DiagnosticoSituacionalGetAllFullbyEtcModel>(this.dataArray);
        this.dataSource.paginator=this.paginator;
        this.paginator._intl.itemsPerPageLabel="Registros por página";
    this.paginator._intl.nextPageLabel="Siguiente";
    this.paginator._intl.previousPageLabel="Anterior";
    this.paginator._intl.firstPageLabel="Primero";
    this.paginator._intl.lastPageLabel="Último";
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
 
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort=this.sort;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  
    
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  downloadFile(obj:any):void{
    if(obj == undefined){
      Swal.fire({
        showCloseButton: false,
        html:
        '<img style="position: absolute !important ; top: 10px !important; right: 20px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">No tiene soporte para ver </p> ',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isDenied) {

        }
      })
    }else{
    let _fileUpload : fileUploadModel;
    _fileUpload = {file:null, fileName:obj, cnx:environment.cnxBS, container:environment.containerDS};
    (this.serviciosp.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe( 
      (response: any) => {
        const blob = new Blob([response], { type: this.getType(obj) });
        saveAs(blob, obj);
      },
      (err) => {
      }
    )
    }
  };
  getType(_response:any):string{
    let fileName = _response;
 //file type extension
       let checkFileType =  fileName.split('.').pop();
       var fileType;
       if(checkFileType == ".txt")
       {
         fileType = "text/plain";
       }
       if(checkFileType == ".pdf")
       {
         fileType = "application/pdf";
       }
       if(checkFileType == ".doc")
       {
         fileType = "application/vnd.ms-word";
       }
       if(checkFileType == ".docx")
       {
         fileType = "application/vnd.ms-word";
       }
       if(checkFileType == ".xls")
       {
         fileType = "application/vnd.ms-excel";
       }
       if(checkFileType == ".png")
       {
         fileType = "image/png";
       }
       if(checkFileType == ".jpg")
       {
         fileType = "image/jpeg";
       }
       if(checkFileType == ".jpeg")
       {
         fileType = "image/jpeg";
       }
       if(checkFileType == ".gif")
       {
         fileType = "image/gif";
       }
       if(checkFileType == ".csv")
       {
         fileType = "text/csv";
       }
       return fileType;
   }    

}
