import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { PA_PrioSedeInformacionModel } from "src/app/shared/model/PA_PrioSedeInformacion.model";
import { PA_PrioSedeInformacionService } from "src/app/shared/services/PA_PrioSedeInformacion.services";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";


@Injectable({
  providedIn: 'root'
})
export class DataSourceInformacionService {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  dataArray: any;
  dataSourceInformacion = new MatTableDataSource<PA_PrioSedeInformacionModel>();
  constructor(
    private prioSedeInformacionSevice: PA_PrioSedeInformacionService,
  ) { }

  public fillTableModelOperation(idS:number,vigencia:number) {
    this.prioSedeInformacionSevice.getPA_PrioSedeInformacionList(idS,vigencia).subscribe(
      (response: any) => {
        this.dataArray = response;
        this.dataSourceInformacion = new MatTableDataSource<PA_PrioSedeInformacionModel>(this.dataArray);
      },
      (err) => {
      }
    );
  }

}


