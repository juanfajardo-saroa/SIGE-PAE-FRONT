import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { TipoModalidadComplementoService } from 'src/app/shared/services/TipoModalidadComplemento.services';
import { CicloMenuRequest, CiclosMenusService } from 'src/app/shared/services/CiclosMenus.services';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CiclosMenusModel } from 'src/app/shared/model/CiclosMenus';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { DecimalPipe } from '@angular/common';
import { PA_CiclosMenusGetAllWithRelationService } from 'src/app/shared/services/PA_CiclosMenusGetAllWithRelation.services';

@Component({
  selector: 'app-ptn-ciclo-disnp',
  templateUrl: './ptn-ciclo-disnp.component.html',
  styleUrls: ['./ptn-ciclo-disnp.component.scss']
})
export class PtnCicloDisnpComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  isLoading = true;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  displayedColumns: string[] = ['nombre', 'modelo', 'modalidad'];
  dataArray: any;
  dataSource = new MatTableDataSource<CiclosMenusModel>();
  selModelo = -1;
  selModalidad = -1;
  Modelolist: any[] = [];
  ModeloModalidad: any[] = [];
  ModeloModalidadfilter: any[] = [];
  cicloParams: CicloMenuRequest = {}
  tablamodalidadList: any[] = [];
  constructor(
    private _ModeloOperadorServicios: TiposModeloOperacionService,
    private TipoModalidad: TipoModalidadComplementoService,
    public dialog: MatDialog,
    private Router: Router,
    private _CiclosMenusService: CiclosMenusService,
    private _ModalidadModeloService: ModalidadModeloService,
    private route: ActivatedRoute,
    private seguridadService: SeguridadService,
    private router: Router,
    private _PA_CiclosMenusGetAllWithRelationService: PA_CiclosMenusGetAllWithRelationService,
  ) { }

  ngOnInit(): void {

    this._ModeloOperadorServicios.getTiposModeloOperacionList().subscribe(
      (response: any) => {
        this.Modelolist = response;
      },
      (err) => {

      }
    );

    this._ModalidadModeloService.getModalidadModeloListRelation().subscribe(
      (response: any) => {
        this.tablamodalidadList = response;


      },
      (err) => {
      }
    );
    this.cicloParams.ID_ETC = this.idETC;
    this.cicloParams.iD_EstadoRegistro = 3;
    this._PA_CiclosMenusGetAllWithRelationService.getPA_CiclosMenusGetAllWithRelationList(this.idETC, 3).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        this.dataArray = response.filter(item => item.iD_EstadoRegistro == 3);
        // Ordenar dataArray alfabéticamente por nombre
        this.dataArray.sort((a, b) => {
          const nameA = a.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          const nameB = b.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          if (nameA < nameB) return -1; // A va antes que B
          if (nameA > nameB) return 1; // A va después que B
          return 0; // Son iguales
        });

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<CiclosMenusModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.isLoading = false;
      }
    );

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  onchangeBuscar(selModelo: any, selModalidad: any) {
    this.cicloParams.ID_ETC = this.idETC;
    this.cicloParams.iD_EstadoRegistro = 3

    if (selModelo == -1) {
      this.cicloParams.iD_TipoModeloOperacion = null;
    } else {
      this.cicloParams.iD_TipoModeloOperacion = selModelo;

    }
    if (selModalidad == -1) {
      this.cicloParams.iD_TipoModalidadComplemento = null;

    } else {
      this.cicloParams.iD_TipoModalidadComplemento = selModalidad;
    }

    this._CiclosMenusService.getCiclosMenusListRelationFilter(this.cicloParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente

        this.dataArray = response.filter(item => item.iD_EstadoRegistro == 3);
        // Ordenar dataArray alfabéticamente por nombre
        this.dataArray.sort((a, b) => {
          const nameA = a.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          const nameB = b.nombre.toLowerCase(); // Asegúrate de que 'nombre' es la propiedad correcta
          if (nameA < nameB) return -1; // A va antes que B
          if (nameA > nameB) return 1; // A va después que B
          return 0; // Son iguales
        });

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<CiclosMenusModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.isLoading = false;
      }
    );
  }

  openDialog(action: string, obj: any): void {
    //localStorage.setItem('nombredeUbicacionActualizado','si')
    this.Router.navigate(['/RegistroCiclomenu'])
  }

  selectionModelo(id: number) {
    if (id == -1) {
      this.cicloParams.iD_TipoModeloOperacion = null;
      this.cicloParams.iD_TipoModalidadComplemento = null;
    } else { }
    this.ModeloModalidadfilter = [];
    this.ModeloModalidadfilter = this.tablamodalidadList.filter(item => item.iD_TipoModeloOperacion == id)
    var arr = {};

    for (var i = 0, len = this.ModeloModalidadfilter.length; i < len; i++)
      arr[this.ModeloModalidadfilter[i]['iD_TipoModalidadComplemento']] = this.ModeloModalidadfilter[i];

    this.ModeloModalidadfilter = new Array();
    for (var key in arr)
      this.ModeloModalidadfilter.push(arr[key]);


  }
  direccionar(row: any) {

    localStorage.setItem('nombredeUbicacionActualizado', 'si')
    this.router.navigate(['/DisponibleCiclomenu'], { queryParams: { id: row.id } })

  }
}

