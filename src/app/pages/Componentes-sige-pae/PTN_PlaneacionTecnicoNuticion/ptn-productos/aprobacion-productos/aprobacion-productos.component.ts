import { Component, OnInit } from '@angular/core';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { ProductosService } from 'src/app/shared/services/Productos.services';
import { PA_RegistrarNotificacionService } from 'src/app/shared/services/PA_RegistrarNotificacion.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { DecimalPipe } from '@angular/common';
import { PA_AprobacionesGetAllFullService } from 'src/app/shared/services/PA_AprobacionesGetAllFull.services';



@Component({
  selector: 'app-aprobacion-productos',
  templateUrl: './aprobacion-productos.component.html',
  styleUrls: ['./aprobacion-productos.component.scss']
})
export class AprobacionProductosComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  cantAprobaciones = 0;
  idSeccion = 16;
  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  action: number;
  type: number;
  productId: number;
  allowEdit: boolean;
  nombreProducto: string;
  idETC2 = 0;
  yaCargoAprobaciones = true;
  form: FormGroup;
  aprobar = [];
  AprobacionesList: any;
  AprobacionesList2: any;
  lista = [];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  AccionesAprobacionList: AccionesAprobacionModel[];
  UsersList: AprobacionesModel[];
  private dataArrayAprobaciones: any;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  AprobacionObject: AprobacionesModel = {
    sID: '',
    id: 0,
    iD_ETC: 0,
    sID_ETC: '',
    iD_User: '',
    sID_User: '',
    iD_AccionAprobacion: 0,
    sID_AccionAprobacion: '',
    id_Secciones: 0,
    sId_Secciones: '',
    documentoParaAprobar: '',
    fechaAprobacion: new Date,
    fecha: new Date,
    accion: '',
    observaciones: '',
    id_Ubicacion: null,
    sId_Ubicacion: '',
    ubicacionOrigen: '',
    auditoria: '',
    filtro: '',
    id_Rol: 0,
    sID_rol: '',
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: false,
    isSelected: false,
    completed: false,
    plazoPorAprobar: new Date,
  };
  idaccion = 0;
  constructor(
    private AccionesAprobacionService: AccionesAprobacionService,
    private aprobacionesService: AprobacionesService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private productosService: ProductosService,
    private alimentosICBFService: AlimentosICBFService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registrarNotificacionService: PA_RegistrarNotificacionService,
    private seguridadService: SeguridadService,
    private _PA_AprobacionesGetAllFullService:PA_AprobacionesGetAllFullService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.productId = params.id;
      this.type = + params.type;
      this.action = + params.action;
      if (this.action == 2) {
        this.allowEdit = true;
      } else {
        this.allowEdit = false;
      }
    });
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      accionAprobacion: ['', Validators.required],

    });

    if (this.type == 1) {
      this.alimentosICBFService.getAlimentosICBF(this.productId).subscribe(
        (response: any) => {
          this.nombreProducto = response.nombre;
          this.idETC2 = response.iD_ETC;


        },
        (err) => {
        }
      );
    } else if (this.type == 2) {
      this.productosService.getProductos(this.productId).subscribe(
        (response: any) => {
          this.nombreProducto = response.nombre;
          this.idETC2 = response.iD_ETC;
        },
        (err) => {
        }
      );
    }
    this.fillTableAprobaciones();
    this.aprobar.push(this.form);
    /*     if (this.type == 1) {
          this.alimentosICBFService.getAlimentosICBF(this.productId).subscribe(
            (response: any) => {
              if (response.iD_EstadoRegistro == 3) {
                this.yaCargoAprobaciones = false;
              }
            });
        } else if (this.type == 2) {
          this.productosService.getProductos(this.productId).subscribe(
            (response: any) => {
              if (response.iD_EstadoRegistro == 3) {
                this.yaCargoAprobaciones = false;
              }
            });
        } */
  }

  ngOnInit(): void {
    this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(this.idSeccion).subscribe(
      (response: any) => {
        this.AprobacionesList = response.filter(item => item.ubicacionOrigen === this.productId.toString());
        this.lista.push(this.AprobacionesList)
      },
      (err) => {
      }
    );
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionesList = response;
        this.AccionesAprobacionesList.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
      (err) => {
      }
    );
  }


  joinRoom(item) {
    if (item.id === 1) {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {
        this.form.controls['observaciones'].setValue(' ');
      }
    } else {
      this.idaccion = item.id
      this.form.controls['accionAprobacion'].setValue(item.id);
      if (this.form.controls['observaciones'].value === '') {
        this.form.controls['observaciones'].setValue(' ');
      }
    }
  }

  mensaje() {
    this.ngOnInit()
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important; position: absolute!important; top: 5% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p  style="text-align: center !important; font-size: 13px; color: #005ACA; margin-right: 2rem;">Confirmar aprobación del producto: </p>' +
        ` <div style="text-align: center !important; font-size: 13px; color: #005ACA; font-weight: 700;">${this.nombreProducto}</div>` +
        '<p style="text-align: center !important; font-size: 13px; color:#005ACA;">(Está acción no se puede revertir)</p>',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        this.aprobaciones()
      }
      else {
      }
    })
  }

  fillTableAprobaciones() {
    this.AccionesAprobacionService.getAccionesAprobacionList().subscribe(
      (response: any) => {
        this.AccionesAprobacionList = response;
        this._PA_AprobacionesGetAllFullService.getPA_AprobacionesGetAllFullList(this.idSeccion).subscribe(
          (response: any) => {
            this.UsersList = response;
            this.serviciosp.getGetAprobacionesGetAllWithRelListfilter(this.idSeccion, this.idETC).subscribe(
              (response: any) => {
                this.dataArrayAprobaciones = response;
                this.dataArrayAprobaciones.forEach(element => {
                  let p = this.dataArrayAprobaciones.find(user => user.fechaAprobacion == element.fechaAprobacion).fechaAprobacion;
                  if (p == null) {
                    element.fecha = null;
                  } else {
                    element.fecha = moment(p).format('DD-MMM-yyyy').toUpperCase();
                  }
                  element.responsable = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_User;
                  element.accion = this.AccionesAprobacionList.find(accionAprobacion => accionAprobacion.id == element.iD_AccionAprobacion).nombre;
                  element.rol = this.dataArrayAprobaciones.find(user => user.iD_User == element.iD_User).sID_rol;
                  element.observaciones = this.UsersList.find(user => user.id == element.id).observaciones;
                });
                this.dataArrayAprobaciones.sort(function (a, b) {
                  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                this.dataSourceAprobaciones = new MatTableDataSource<DiagnosticoAprobacionesModel>(this.dataArrayAprobaciones);
                this.dataSourceAprobaciones.paginator = this.paginator;
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
                this.dataSourceAprobaciones.sort = this.sort;
              }
            );
          }
        );
      }
    );
  }

  aprobaciones() {
    this.AprobacionObject.id = 0;
    this.AprobacionObject.iD_AccionAprobacion = this.aprobar[0].value.accionAprobacion;
    if (this.aprobar[0].value.observaciones == ' ') {
      this.AprobacionObject.observaciones = 'Ninguno'
    } else {
      this.AprobacionObject.observaciones = this.aprobar[0].value.observaciones;
    }
    this.AprobacionObject.iD_User = localStorage.getItem('KeyMaster');

    this.AprobacionObject.id_Secciones = this.idSeccion;
    this.AprobacionObject.accion = 'Completo la información de Documento por Aprobar. '
    this.AprobacionObject.id_Ubicacion = 13;
    this.AprobacionObject.ubicacionOrigen = this.productId.toString();
    if (this.idETC == 0) {
      this.AprobacionObject.iD_ETC = this.idETC2;
    } else {
      this.AprobacionObject.iD_ETC = Number(localStorage.getItem('IdUbicacion'));
    }
    let doc = localStorage.getItem('Documento7');
    if (doc == null) {
      this.AprobacionObject.documentoParaAprobar = 'no tiene documento';
    } else {
      this.AprobacionObject.documentoParaAprobar = doc;
    }
    this.aprobacionesService.addAprobaciones(this.AprobacionObject).subscribe(
      (response) => {
        if (this.type == 1) {
          this.alimentosICBFService.getAlimentosICBF(this.productId).subscribe(
            (response: any) => {
              var estadoProximo;
              if (this.AprobacionObject.iD_AccionAprobacion == 7)
              {
                estadoProximo = 2;
                this.registrarNotificacionService.registerNotificationOnlyRolIdWithUrl("El producto " + response.nombre + " fue aprobado", "26497bcf-bb09-473a-af94-4e194be66a21", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");

              }
              else if (this.AprobacionObject.iD_AccionAprobacion == 1) {
                if (response.iD_EstadoRegistro == 7) {
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Administrador General SiPAE (Administrador UApA)", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Oficina Asesora Jurídica", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Oficina Asesora Control Interno", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Dirección General", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Oficina Asesora Comunicaciones UApA", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Subdirección de Información", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Oficina Asesora Planeación", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Subdirección Técnica de Gestión Corporativa", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Subdirección General", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " esta listo para aprobar", "Subdirección Técnica de Análisis, Calidad e Innovación", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationOnlyRolIdWithUrl("El producto " + response.nombre + " esta listo para aprobar.", "26497bcf-bb09-473a-af94-4e194be66a21", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  estadoProximo = 8;
                } else if (response.iD_EstadoRegistro == 8) {
                  estadoProximo = 3;
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Administrador General SiPAE (Administrador UApA)", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Oficina Asesora Jurídica", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Oficina Asesora Control Interno", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Dirección General", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Oficina Asesora Comunicaciones UApA", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Subdirección de Información", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Oficina Asesora Planeación", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Subdirección Técnica de Gestión Corporativa", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Subdirección General", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Subdirección Técnica de Análisis, Calidad e Innovación", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");
                  this.registrarNotificacionService.registerNotificationWithUrl("El producto " + response.nombre + " fue aprobado", "Coordinador PAE", "/PTNProductos?typeComponent=1&action=2&id=" + response.id + "&type=1");
                  this.registrarNotificacionService.registerNotificationOnlyRolIdWithUrl("El producto " + response.nombre + " fue aprobado.", "26497bcf-bb09-473a-af94-4e194be66a21", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");

                }
                else
                {
                  this.registrarNotificacionService.registerNotificationOnlyRolIdWithUrl("El producto " + response.nombre + " fue aprobado.", "26497bcf-bb09-473a-af94-4e194be66a21", "/PTNProductos?typeComponent=1&action=2&id=" + this.productId + "&type=1");

                 }
              }
              response.iD_EstadoRegistro = estadoProximo;
              this.alimentosICBFService.updateAlimentosICBF(response).subscribe(
                (res: any) => {
                });
            });
        } else if (this.type == 2) {
          this.productosService.getProductos(this.productId).subscribe(
            (response: any) => {
              var estadoProximo;
              if (this.AprobacionObject.iD_AccionAprobacion == 7) {
                estadoProximo = 2;
              } else if (this.AprobacionObject.iD_AccionAprobacion == 1) {
                if (response.iD_EstadoRegistro == 7) {
                  estadoProximo = 8;
                } else if (response.iD_EstadoRegistro == 8) {
                  estadoProximo = 3;
                }
              }
              response.iD_EstadoRegistro = estadoProximo;
              this.productosService.updateProductos(response).subscribe(
                (res: any) => {
                });
            });
        }
        this.fillTableAprobaciones()
        this.clearForm()
        this.cantAprobaciones = 0;
        this.yaCargoAprobaciones = false;
      }
    );
  }

  clearForm() {
    this.form.reset({
      'observaciones': '',
      'accionAprobacion': '',
    });
  }

  getButtonColor(id: number): string {
    switch (id) {
      case 1:
        return "greenColor";
        break;
      case 2:
        return "redCircle";
        break;
      default:
        return "yellowCircle";
        break;
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
