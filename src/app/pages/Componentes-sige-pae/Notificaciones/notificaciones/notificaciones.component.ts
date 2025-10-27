import { Component, OnInit } from '@angular/core';
import { ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { CriteriosPriorizacionModel } from 'src/app/shared/model/CriteriosPriorizacion';
import { PA_ObtenerNotificacionesService } from 'src/app/shared/services/PA_ObtenerNotificaciones.services';
import { PA_RegistrarNotificacionModel } from 'src/app/shared/model/PA_RegistrarNotificacionModel';
import { PA_ObtenerNotificacionesModel } from 'src/app/shared/model/PA_ObtenerNotificacionesModel';
import { Router } from '@angular/router';
import { PA_EstadoNotificacionesService } from 'src/app/shared/services/PA_EstadoNotificaciones.services';
import { PA_EstadoNotificacionesModel } from 'src/app/shared/model/PA_EstadoNotificacionesModel';
import { MatTableDataSource } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})

export class NotificacionesComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  checked = false;
  decimalPipe = new DecimalPipe(navigator.language);
  gridVisible: boolean = true;
  formVisible: boolean = false;
  dialogVisible: boolean = false;
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  EstadoNotificacionesDetalle: PA_EstadoNotificacionesModel | null = null;
  RegistrarNotificacionDetalle: PA_RegistrarNotificacionModel | null = null;
  ObtenerNotificacionesDetalle: PA_ObtenerNotificacionesModel | null = null;
  EstadoNotificacionesLista: PA_EstadoNotificacionesModel[] = [];
  RegistrarNotificacionLista: PA_RegistrarNotificacionModel[] = [];
  ObtenerNotificacionesLista: PA_ObtenerNotificacionesModel[] = undefined;
  dataSource: MatTableDataSource<PA_ObtenerNotificacionesModel>;
  valid: any = {};
  columnNames = ['mensaje'];
  columnNamesNotificacion = ['id', 'mensaje', 'estadoMensaje', 'fechaMensaje', 'idModulo', 'modulo', 'urlMensaje'];
  userId: string;
  constructor(
    private notificaciones: PA_ObtenerNotificacionesService,
    private seguridadService: SeguridadService,
    private router: Router,
    private PA_EstadoNotificacionesService: PA_EstadoNotificacionesService,
  ) { }

  ngOnInit(): void {
    this.fillTable();
    this.userId = localStorage.getItem('KeyMaster');
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  notificationClick(id: number, url: string, estado: number, mensaje: string) {
    if (estado == 1) {
      this.PA_EstadoNotificacionesService.updatePA_EstadoNotificacionesList(id, this.userId, 2).subscribe(
        (res: any) => {
          this.fillTable();
          if (url != null && url != "") {
            // Verificar si la URL contiene 'DetalleSede'
            if (url.includes("DetalleSede")) {
              // Reemplazar cualquier valor de 'dia' con 'dia=3'
              url = url.replace(/(dia=)(\d+)/, "$13");

              // Si no hay ningún valor 'dia=3' en la URL, agregarlo al final
              if (!url.includes("dia=3")) {
                url += "&dia=3";
              }

              // Verificar el mensaje
              if (mensaje.includes('fue Aprobado') || mensaje.includes('fue Rechazado')) {
                this.router.navigateByUrl('/Sedes');
              } else {
                this.router.navigateByUrl(url);
              }
            } else {
              this.router.navigateByUrl(url);
            }
          }
        });
    } else {
      // Verificar si la URL contiene 'DetalleSede'
      if (url.includes("DetalleSede")) {
        // Reemplazar cualquier valor de 'dia' con 'dia=3'
        url = url.replace(/(dia=)(\d+)/, "$13");

        // Si no hay ningún valor 'dia=3' en la URL, agregarlo al final
        if (!url.includes("dia=3")) {
          url += "&dia=3";
        }

        // Verificar el mensaje
        if (mensaje.includes('fue Aprobado') || mensaje.includes('fue Rechazado')) {
          this.router.navigateByUrl('/Sedes');
        } else {
          this.router.navigateByUrl(url);
        }
      } else {
        this.router.navigateByUrl(url);
      }

    }
  }

  fillTable() {
    this.getNotificaciones().subscribe(ObtenerNotificacionesLista => {
      this.ObtenerNotificacionesLista = ObtenerNotificacionesLista
      this.ObtenerNotificacionesLista.forEach(ele => {
        ele.modulo = ele.modulo.replace(".", "");
      })
      console.log(this.dataSource, ObtenerNotificacionesLista);

      this.dataSource = new MatTableDataSource<PA_ObtenerNotificacionesModel>(this.ObtenerNotificacionesLista);
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
    });
  }

  disableRead(idEstado: number) {
    let color: string;
    switch (idEstado) {
      case 1: // No leida
        color = "#E2ECFD";
        break;
      case 2: // Leida
        color = "#FFFFFF";
        break;
      default:
        color = "";
    }
    return color;
  }

  disableUrl(url: string) {
    if (url == "" || url == null) {
      return true;
    }
    else {
      return false;
    }
  }

  getColor(id: string) {
    let ca = id.substring(0, 3).toUpperCase();
    let color: string;
    switch (ca) {
      case "MIP":
        color = "#00A9AB";
        break;
      case "SIG":
        color = "#FC4B6C";
        break;
      case "PAE":
        color = "#FF9100";
        break;
      case "ADM":
        color = "#005ACA";
        break;
      case "UAP":
        color = "#00A9AB";
        break;
      default:
        color = "";
    }
    return color;
  }

  getNotificaciones(): Observable<Array<PA_ObtenerNotificacionesModel>> {
    const usuario = localStorage.getItem('KeyMaster');
    const valnull = null;
    return this.notificaciones.getPA_ObtenerNotificacionesList(usuario, valnull, valnull, valnull).pipe(
      map((result: any) => this.mapResultToModel(result))
    );
  }

  mapResultToModel(result: CriteriosPriorizacionModel[]): any {
    var arreglo: Array<CriteriosPriorizacionModel> = [];
    result.forEach((item) =>
      arreglo.push(item)
    );
    arreglo.sort((c1, c2) => c1.prioridad - c2.prioridad);
    return arreglo;
  }
}