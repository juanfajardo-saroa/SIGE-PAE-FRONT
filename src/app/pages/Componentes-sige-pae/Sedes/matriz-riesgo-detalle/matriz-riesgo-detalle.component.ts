import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { PA_MatrizRiesgosSedeDetalleAreaModel } from 'src/app/shared/model/PA_MatrizRiesgosSedeDetalleAreaModel';
import { PA_MatrizRiesgosSedeDetalleDimensionModel } from 'src/app/shared/model/PA_MatrizRiesgosSedeDetalleDimensionModel';
import { SedesModel } from 'src/app/shared/model/Sedes';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { PA_MatrizRiesgosSedeDetalleAreaService } from 'src/app/shared/services/PA_MatrizRiesgosSedeDetalleArea.services';
import { PA_MatrizRiesgosSedeDetalleDimensionService } from 'src/app/shared/services/PA_MatrizRiesgosSedeDetalleDimension.services';
import { SedesExtendService } from 'src/app/shared/services/sedes-extend.service';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';


@Component({
  selector: 'app-matriz-riesgo-detalle',
  templateUrl: './matriz-riesgo-detalle.component.html',
  styleUrls: ['./matriz-riesgo-detalle.component.scss']
})

export class MatrizRiesgoDetalleComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new Subscription();

  panelOpenState = false;
  step = 0;


  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }


  valorListDetalleArea: PA_MatrizRiesgosSedeDetalleAreaModel[] = [];
  valorListDetalle: PA_MatrizRiesgosSedeDetalleDimensionModel[] = [];
  idSede: number;
  ruta: string[];
  dataArray: any;
  dataArrayMatriz: any;
  isLoading = true;
  nombreSede: string;
  nombreIntEducativa: string;
  nombreMunicipio: string;
  currentYear = new Date().getFullYear();
  currentVig = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  currentVigNom='';
  dateToday: number = Date.now();
  nombreETC = localStorage.getItem('Ubicacion');
  idETC = Number(localStorage.getItem('IdUbicacion'));;
  public nombreUbicacion = localStorage.getItem('Ubicacion');
  PA_PrioSedeBeneficiariasParams:PA_PrioSedeBeneficiarias={}
  PA_InstitucionEducativaRequest:PA_InstitucionEducativaGetAllWithRelationRequest={}
 //filtros

 selMunicipio=-1;
 selInst=-1;
 selsede=-1;
 selprioriza=-1;
 selectSedesList: SedesModel[];
 selectInstitucionList: InstitucionEducativaModel[];
 selectDivipolaList: DivipolasModel[];
 selectDivipolaList2: DivipolasModel[];
 priorizaListT: any[] = [];
 priorizaList = [
   { id: 1, nombre: "Si" },
   { id: 0, nombre: "No" },
 ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public servicioMatriz: PA_MatrizRiesgosSedeDetalleDimensionService,
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
    public servicioMatrizArea: PA_MatrizRiesgosSedeDetalleAreaService,
    private divipolaService: DivipolasService,
    private institucionEducativaService: InstitucionEducativaService,
    private sedesService: SedesService,
    public servicioMatriz2: SedesExtendService,
    private _PA_InstitucionEducativaGetAllWithRelationService:PA_InstitucionEducativaGetAllWithRelationService,
    ) {
    this.currentVigNom =this.currentVig.nombre;
    this.ruta = this.router.url.split('/');
  }


  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }

  }
  idMatriz=0;
  idTab=0
  ngOnInit(): void {

    this.nombreSede = localStorage.getItem('mrs')
    this.nombreIntEducativa = localStorage.getItem('mri')
    this.nombreMunicipio = localStorage.getItem('mrm')
    this.route.queryParams.subscribe(params => {
      this.idMatriz = +params.id;
      this.idTab = +params.tab;

    });
    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];

    if (primernombre == 'ETC') {

      this.PA_PrioSedeBeneficiariasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede=this.idMatriz
     

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
      
      this.PA_PrioSedeBeneficiariasParams.id_ETC=0
      this.PA_PrioSedeBeneficiariasParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.PA_PrioSedeBeneficiariasParams.Id_sede=this.idMatriz
    }
    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList3(this.PA_PrioSedeBeneficiariasParams).subscribe(
      (response: any) => {

        this.priorizaListT = response;
        let p = response[0].priorizadaPAE == true
        if(p==true){
          this.selprioriza=1;
        }else{
          this.selprioriza=0;
        }
        this.divipolaService.getDivipolasListRelationFilter(response[0].id_Municipio).subscribe(
          (response: any) => {
            this.selectDivipolaList2 = response
            this.selMunicipio = response[0].id;
            this.nombreMunicipio=this.selectDivipolaList2[0].nombre;
            this.divipolaService.getDivipolasListRelationFilter3(this.selectDivipolaList2[0].departamentoCode).subscribe(
              (response: any) => {
                this.selectDivipolaList = response
                this.selectDivipolaList.sort(function(a, b) {
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
                this.PA_InstitucionEducativaRequest.Id_DiviPola=this.selMunicipio;
    this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
                  (response: any) => {
                    this.selectInstitucionList = response;
                    this.selectInstitucionList.sort(function(a, b) {
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
                    let h = response.filter(item => item.id == this.priorizaListT[0].id_InstEducativa)
                    this.selInst = h[0].id;
                    this.nombreIntEducativa=h[0].nombre;
                    this.sedesService.getSedesListRelationFilter2(this.idETC, this.selMunicipio, this.selInst).subscribe(
                      (response: any) => {
                        this.selectSedesList = response;
                        this.selectSedesList.sort(function(a, b) {
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
                        let h = response.filter(item => item.id == this.priorizaListT[0].id_sede)
                        this.selsede = h[0].id;
                        this.nombreSede=h[0].nombre;

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
    this.servicioMatriz.getPA_MatrizRiesgosSedeDetalleDimensionList(this.idMatriz).subscribe(
      (response: any) => {
        this.valorListDetalle = response;
      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.servicioMatrizArea.getPA_MatrizRiesgosSedeDetalleAreaList(this.idMatriz).subscribe(
      (response: any) => {
        this.dataArea = response;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  dataSource = new MatTableDataSource<PA_MatrizRiesgosSedeDetalleDimensionModel>();
  dataArea: PA_MatrizRiesgosSedeDetalleAreaModel[] = [];

  RegresarMatriz() {
    localStorage.removeItem('nombredeUbicacionActualizado');
    localStorage.removeItem('mrs');
    localStorage.removeItem('mri');
    localStorage.removeItem('mrm');
    this.router.navigate(['/Sedes'],{ queryParams: {tab:2} })

  }
  accion_anterior() {
    this.router.navigate(['../detalle-sede/detalle-sede.component.html']);
  }

  areaList(value: number): PA_MatrizRiesgosSedeDetalleAreaModel[] {
    const a = this.dataArea.filter(items => items.id_Dimension === value);
    return a
  }

  //metodos de los filtros

  onMunicipioClick(event: number): any {
    this.selInst=-1;
    this.selsede=-1;
    if (event == -1) {

    } else {
      this.PA_InstitucionEducativaRequest.Id_DiviPola=event;
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
    this.selsede=-1;
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
  buscarInfo(mun:number,ie:number,sd:number):void{

    if(this.selsede==-1){
      Swal.fire({
        showCloseButton: false,
        html:
          '<img style="position: absolute !important ; top: 5% !important; right: 5% !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">No has seleccionado una sede especifica </p> ' ,
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

        }else {

        }
      })
    }else{
      this.router.navigate(['/matriz-riesgo-detalle'],{ queryParams: {id:sd, tab:2} }).then(() => {
        window.location.reload();
      });
    }

  }


}


export interface MatrizRiesgoDetalle {
  id_Sede: number;
  id_Dimension: number;
  racPreparadaSitio: number;
  racIndustrializada: number;
  catering: number;
  colorRacPreparadaSitio: string;
  colorRacIndustrializada: string;
  colorCatering: string;
  filtro: null;
  _XMLAuditoria: string;
  isValid: boolean;
  validationErrors: string;

}

export class ValorMatrizDetalle implements MatrizRiesgoDetalle {
  constructor(
    public id_Sede: number,
    public id_Dimension: number,
    public racPreparadaSitio: number,
    public racIndustrializada: number,
    public catering: number,
    public colorRacPreparadaSitio: string,
    public colorRacIndustrializada: string,
    public colorCatering: string,
    public filtro: null,
    public _XMLAuditoria: string,
    public isValid: boolean,
    public validationErrors: string,
  ) { }


}
