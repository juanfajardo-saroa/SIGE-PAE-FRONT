
import { PA_PrioSedeAsignaRacion, PA_PrioSedeAsignaRacionService } from 'src/app/shared/services/PA_PrioSedeAsignaRacion.services';
import { InstitucionEducativaService } from './../../../../shared/services/InstitucionEducativa.services';
import { DivipolasService } from './../../../../shared/services/Divipolas.services';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import { DivipolasModel } from './../../../../shared/model/Divipolas';
import { InstitucionEducativaModel } from './../../../../shared/model/InstitucionEducativa';
import { SedesModel } from './../../../../shared/model/Sedes';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { SeguridadService } from "src/app/seguridad/seguridad.service";
import { environment } from "src/environments/environment";
import { DataSourceInformacionService } from "src/app/shared/services/data-source-informacion.service";
import { SedesService } from 'src/app/shared/services/Sedes.services';
import Swal from 'sweetalert2';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';


@Component({
  selector: 'app-custom-asignacion-raciones-sede',
  templateUrl: './custom-asignacion-raciones-sede.component.html',
  styleUrls: ['./custom-asignacion-raciones-sede.component.scss']
})
export class CustomAsignacionRacionesSedeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  currentSede: number;
  idSede = 0;
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  currentYear = new Date().getFullYear();
  // dataArray: any;
  // isLoading = true;
  columnNames = ['modelo', 'poblacionVulnerable', 'estudiantesSisben', 'municipioPdet', 'modalidad', 'estado'];
  nombreSede: string;
  nombreInstitucion: string;
  nombreMunicipio: string;
  public nombreUbicacion = localStorage.getItem('Ubicacion');
  selMunicipio = -1;
  selInst = -1;
  selsede = -1;
  selprioriza = -1;
  selectSedesList: SedesModel[];
  selectInstitucionList: InstitucionEducativaModel[];
  selectDivipolaList: DivipolasModel[];
  selectDivipolaList2: DivipolasModel[];
  priorizaListT: any[] = [];
  priorizaList5: any;
  priorizaList = [
    { id: 1, nombre: "Si" },
    { id: 0, nombre: "No" },
  ];
  filterParams: PA_PrioSedeAsignaRacion = {};
  PA_PrioSedeBeneficiariasParams: PA_PrioSedeBeneficiarias = {}
  idETC = Number(localStorage.getItem('IdUbicacion'));
  PA_InstitucionEducativaRequest: PA_InstitucionEducativaGetAllWithRelationRequest = {}
  constructor(
    private router: Router,
    private seguridadService: SeguridadService,
    private route: ActivatedRoute,
    public dataSourceInformacionService: DataSourceInformacionService,
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
    private divipolaService: DivipolasService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    private prioSedeAsignaRacionService: PA_PrioSedeAsignaRacionService,
    private _PA_InstitucionEducativaGetAllWithRelationService: PA_InstitucionEducativaGetAllWithRelationService,

  ) {
    this.route.queryParams.subscribe(params => {
      this.idSede = +params.id;
    });
    this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.filterParams.id_Vigencia = Number(localStorage.getItem('VigSeleccionada'));
    this.dataSourceInformacionService.fillTableModelOperation(this.idSede, Number(localStorage.getItem('VigSeleccionada')));
    this.sedesService.getSedes(this.idSede).subscribe((responsesede: any) => {

      localStorage.setItem('ars', responsesede.nombre);
      this.nombreSede = responsesede.nombre;
      var valordivipola = responsesede.iD_Divipola;

      this.institucionEducativaService.getInstitucionEducativa(responsesede.iD_lE).subscribe((responseinstitucion: any) => {

        localStorage.setItem('ari', responseinstitucion.nombre);
        this.nombreInstitucion = responseinstitucion.nombre;
        this.divipolaService.getDivipolas(valordivipola).subscribe((responsedivipola: any) => {

          localStorage.setItem('arm', responsedivipola.Nombre);
          this.nombreMunicipio = responsedivipola.nombre;
        })
      })
    })




  }

  ngOnInit(): void {
    // localStorage.setItem('ars', row.sede);
    // localStorage.setItem('arm', row.municipio);
    // localStorage.setItem('ari', row.institucionEducativa);


    this.nombreSede = localStorage.getItem('ars');
    this.nombreMunicipio = localStorage.getItem('arm');
    this.nombreInstitucion = localStorage.getItem('ari');
    this.PA_PrioSedeBeneficiariasParams.id_ETC = this.idETC;
    this.PA_PrioSedeBeneficiariasParams.Id_sede = this.idSede
    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList3(this.PA_PrioSedeBeneficiariasParams).subscribe(
      (responsepriosede: any) => {
        var p = false;
        this.priorizaListT = responsepriosede;
        if (!responsepriosede.success) {
          p = false;
        }
        else {
          p = responsepriosede[0].priorizadaPAE == true
        }

        if (p == true) {
          this.selprioriza = 1;
        } else {
          this.selprioriza = 0;
        }




        this.divipolaService.getDivipolasListRelationFilter(responsepriosede[0].id_Municipio).subscribe(
          (responsediv: any) => {
            this.selectDivipolaList2 = responsediv
            this.selMunicipio = this.selectDivipolaList2[0].id;
            this.nombreMunicipio = this.selectDivipolaList2[0].nombre;
            this.divipolaService.getDivipolasListRelationFilter3(this.selectDivipolaList2[0].departamentoCode).subscribe(
              (responsediv2: any) => {
                this.selectDivipolaList = responsediv2;
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
                this.PA_InstitucionEducativaRequest.Id_DiviPola = this.selMunicipio;
                this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
                  (responseins: any) => {
                    this.selectInstitucionList = responseins;
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
                    let h = responseins.filter(item => item.id == this.priorizaListT[0].id_InstEducativa)
                    this.selInst = h[0].id;
                    this.nombreInstitucion = h[0].nombre;
                    this.sedesService.getSedesListRelationFilter2(this.idETC, this.selMunicipio, this.selInst).subscribe(
                      (responsesedes: any) => {
                        this.selectSedesList = responsesedes;
                        this.selectSedesList.sort(function (a, b) {
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

                        let h = responsesedes.filter(item => item.id == this.priorizaListT[0].id_sede)
                        this.selsede = h[0].id;
                        this.nombreSede = h[0].nombre;

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

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  back() {
    localStorage.removeItem('esp');
    localStorage.removeItem('nombredeUbicacionActualizado');
    this.router.navigateByUrl('/AsignacionRaciones');
  }
  //metodos de los filtros

  onMunicipioClick(event: number): any {
    this.selInst = -1;
    this.selsede = -1;

    if (event == -1) {

    } else {
      this.PA_InstitucionEducativaRequest.Id_DiviPola = event;
      this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
        (response: any) => {
          this.selectInstitucionList = response;
        },
        (err) => {
        }
      );
    }


  }
  onInstitucionClick(event: number): void {
    this.selsede = -1;
    if (event == -1) {

    } else {
      this.sedesService.getSedesListRelationFilter3(event).subscribe(
        (response: any) => {
          this.selectSedesList = response;

        },
        (err) => {
        }

      );
    }
  }
  onSedeClick(event: number): void {

  }

  onPrecargarBusqueda() {
    this.prioSedeAsignaRacionService.getPA_PrioSedeAsignaRacionList(this.filterParams).subscribe(
      (response: any) => {

        this.priorizaList5 = response.filter(item => item.modeloOperacion != null);

      },
      (err) => {
      }
    );


  }
  buscarInfo(mun: number, ie: number, sd: number): void {
    this.onPrecargarBusqueda();


    let h = this.priorizaList5.filter(item => item.id_sede == sd)

    let sl = Number(localStorage.getItem('esp'))

    if (this.selsede == -1) {
      Swal.fire({
        showCloseButton: false,
        html:
          '<img style="position: absolute !important ; top: 15% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No has seleccionado una sede especifica </p> ',
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

        } else {

        }
      })
    } else {
      if (h == 0) {
        Swal.fire({
          showCloseButton: false,
          html:
            '<img style="position: absolute !important ; top: 15% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
            '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No hay asignación para esa sede </p> ',
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

          } else {

          }
        })

      } else {
        if (sl == 0) {
          this.router.navigate(['/AsignacionRacionesId/'], { queryParams: { id: sd } }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            showCloseButton: false,
            html:
              '<img style="position: absolute !important ; top: 15% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No puedes continuar: </p> ' +
              '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">has olvidado guardarlo la asignación</p> ',
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

            } else {

            }
          })
        }
      }

    }




  }

}
