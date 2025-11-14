import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { PA_DiagnosticoInfraEstRequest, PA_DiagnosticoInfraEstService } from 'src/app/shared/services/PA_DiagnosticoInfraEst.services';
import Swal from 'sweetalert2';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { SedesService } from 'src/app/shared/services/Sedes.services';
import { DecimalPipe } from '@angular/common';
import { construirDescripcionAprobacion } from 'src/app/shared/utils/aprobaciones-utils';

@Component({
  selector: 'app-aprobaciones-pedientes-uapa',
  templateUrl: './aprobaciones-pedientes-uapa.component.html',
  styleUrls: ['./aprobaciones-pedientes-uapa.component.scss']
})
export class AprobacionesPedientesUapaComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['modulo', 'seccion', 'documento', 'enviado', 'descripcion'];
  dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  isLoading = true;
  dataArray: GetAprobacionesGetAllWithRelModel[];
  dataArrayAprobaciones:AprobacionesModel[];
 NumPendiente=0;
 idETC = Number(localStorage.getItem('IdUbicacion'));
 private subs = new Subscription()
 public nombreUbicacion = 'UApA | Aprobaciones';
 currentYear = new Date().getFullYear();
 dateToday: number = Date.now();
 public dataArrayInterno: any;

 public ViSeleccionada = localStorage.getItem('VigSeleccionada');
 public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
 mostarEncabezadoMenu: boolean = true;
 VigSelect: string = 'si';
 VigNoSelect: string = 'no';
 Vigencia: any;
 nombreVigAnoSeleccionada: number = 0;

  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  PA_DiagnosticoInfraEstParams:PA_DiagnosticoInfraEstRequest={}
  constructor(private serviciosp: AprobacionesGetAllWithRelService, private _sevicioAprobaciones:AprobacionesService,
    private router: Router,private serviciosInfra: PA_DiagnosticoInfraEstService, public VigenciasServicio: VigenciasService,
    private _SedesService:SedesService,
    ) {

     }

  ngOnInit(): void {
    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArraySelectVig = response.filter(items => items.id == Number(localStorage.getItem('VigSeleccionada')));
        this.nombreVigAnoSeleccionada = this.dataArraySelectVig[0].nombre;
        this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);


      },
      (err) => {
        this.isLoading = false;
      }
    );
    this._sevicioAprobaciones.getAprobacionesList().subscribe(
      (response: any) => {
        this.dataArrayAprobaciones = response;
        this.serviciosp.getGetAprobacionesGetAllWithRelList().subscribe(
          (response: any) => {
            this.dataArray = response.filter(item => item.fechaAprobacion === null);

            for (let datosEntrega in this.dataArray) {

              this.dataArray[datosEntrega].plazoPorAprobar=this.dataArrayAprobaciones.find(item=>item.id == this.dataArray[datosEntrega].id).plazoPorAprobar;
              if (this.dataArray[datosEntrega].sId_Secciones == 'Caracterización e infraestructura'||
              this.dataArray[datosEntrega].sId_Secciones =='Minutas Patron'||
              this.dataArray[datosEntrega].sId_Secciones =='Registro de operadores'||
              this.dataArray[datosEntrega].sId_Secciones =='Planes de alistamiento'||
              this.dataArray[datosEntrega].sId_Secciones =='Fuentes de financiación'||
              this.dataArray[datosEntrega].sId_Secciones =='PAC'||
              this.dataArray[datosEntrega].sId_Secciones =='Entrega de raciones y víveres'||
              this.dataArray[datosEntrega].sId_Secciones =='Cierre y evaluacion'||
              this.dataArray[datosEntrega].sId_Secciones =='Operadores y contratos proveedores'||
              this.dataArray[datosEntrega].sId_Secciones =='Operadores y contratos proveedores '||
              this.dataArray[datosEntrega].sId_Secciones == 'Registro de contratos'||
              this.dataArray[datosEntrega].sId_Secciones== 'PTN-Preparacion'||
              this.dataArray[datosEntrega].sId_Secciones== 'PTN-Ciclodemenu'||
              this.dataArray[datosEntrega].sId_Secciones== 'Contratación y alistamiento'
              ) {
                this.dataArray[datosEntrega].sID_SubsistemasG = 'SIGEPAE'
              }else{
                this.dataArray[datosEntrega].sID_SubsistemasG = 'MIPAE'
              }

              if (this.dataArray[datosEntrega].sId_Secciones == 'Caracterización e infraestructura') {
                this.dataArray[datosEntrega].sPorAprobar = 'Diagnóstico de infraestructura'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Registro de operadores'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de operador'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Minutas Patron'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de Minutas excepcionales'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'PTN-Preparacion'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de preparaciones'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'PTN-Ciclodemenu'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro del ciclo de menú'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'PTN-Producto'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro del producto'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Registro de contratos'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de contrato'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Planes de alistamiento'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de Planes de alistamiento'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Seguimiento complementos'){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro Seguimiento complementos'
              }else if(this.dataArray[datosEntrega].sId_Secciones == 'Operadores y contratos proveedores' || 'Operadores y contratos proveedores ' ){
                this.dataArray[datosEntrega].sPorAprobar = 'Registro de proveedor'
              }


            }

            this.NumPendiente = this.dataArray.length;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<GetAprobacionesGetAllWithRelModel>(this.dataArray);

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
  Check: boolean = true;
  CambioVigencia(value: any) {



    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();


        if(this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre){
          this.Check = false;
        }return this.Check
      },
      (err) => {

        this.isLoading = false;
      }
    );
  }
  CambioNoVigencia() {



    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigNoSelect = response.filter(items => items.id != Number(localStorage.getItem('VigSeleccionada')));;
        localStorage.setItem('VigNoSeleccionada', this.dataArrayInternoVigNoSelect[0].id);
        window.location.reload();

        this.Check = false;

      },
      (err) => {

        this.isLoading = false;
      }
    );
  }
  IrAprobaciones(id:number,ubicacion: any, secciones:number,etc:number){

    if (secciones === 4) {
     this._SedesService.getSedesListRelationFilter4(Number(ubicacion)).subscribe(
      (response: any) => {
        let h1 = response;
        this.PA_DiagnosticoInfraEstParams.ID_ETC=h1[0].iD_ETC;
  
        this.serviciosInfra.getPA_DiagnosticoInfraEstList(this.PA_DiagnosticoInfraEstParams).subscribe(
          (response: any) => {
            let h = response;

            localStorage.setItem('ps', h[0].sede);
            localStorage.setItem('pm', h[0].municipio);
            localStorage.setItem('pi', h[0].instEducativa);
            localStorage.setItem('nombredeUbicacionActualizado','si')
            this.router.navigate(['/DetalleSede'],{ queryParams: {id:ubicacion, tab:0,dia:3,et:h1[0].iD_ETC} })
          },
          (err) => {
            this.isLoading = false;

          }
        );

      },
      (err) => {
        this.isLoading = false;

      }
     );



    } else if (secciones === 3) {
      //priorizacion
      //this.router.navigate(['/Priorizacion']);
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Priorización de Sedes educativas”, subsección "Sedes Beneficiarias de la ETC" </p> ',
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
      })
    } else if (secciones === 5) {
      //minutas
      this.router.navigate(['/minuta-excepcional'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 6) {
      //entrega
     // this.router.navigate(['/EntregaRaciones']);
     Swal.fire({
      showCloseButton: true,
      html:
        '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
        '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Seguimientoa raciones” </p> ',
      showConfirmButton: true,
      confirmButtonColor: '#009922',
      confirmButtonText: 'Aceptar',
    })
    }
    else if (secciones === 12) {
      var nombresincortar = ubicacion
                var nombrecortado = nombresincortar.split(" ");

                let idContrato = nombrecortado[0];
                let idSede = nombrecortado[1];
                let ano = nombrecortado[2];
                let mes = nombrecortado[3];
                let idJornada = nombrecortado[4];

      ///Segimiento raciones o complemento
      //http://localhost:4200/#/seguimientoComplementosDetalle?idContrato=122&idSede=119&ano=2022&mes=6&idJornada=1
      this.router.navigate(['/seguimientoComplementosDetalle'],{ queryParams: {idContrato:idContrato, idSede:idSede,ano:ano,mes:mes,idJornada:idJornada} })

    } else if (secciones === 13) {
      //Gestion de excedientes
      // this.router.navigate(['/apps/Gestiondeexcedientes']);
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">Ir al módulo para aprobar/rechazar, ingrese al sistema MiPAE, ingrese a la pestaña “Planeación e inicio” en la sección “Gestión de raciones” </p> ',
        showConfirmButton: true,
        confirmButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
      })
    } else if (secciones === 14) {
      //Entrega de raciones y víveres esta en ejecucion y seguimiento
      //this.router.navigate(['/apps/Entregaderacionesyvíveress']);

    }
    else if (secciones === 1) {
      ///Registro de operadores
      this.router.navigate(['/registro-contratos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 2) {
      //Registro de contratos
      this.router.navigate(['/registro-contratos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 7) {
      //Operadores y contratos proveedores
      this.router.navigate(['/registro-operadores'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 8) {
      //Planesdealistamiento esta Contratación y alistamiento
       this.router.navigate(['/Planesdealistamiento'],{ queryParams: { id: id,idubicacion:ubicacion} });
    } else if (secciones === 9) {
      //Asignación de recursos
      this.router.navigate(['/asignacionrecursos'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else if (secciones === 10) {
      //entrega Fuentes de financiación
      this.router.navigate(['/fuentesfinanciacion'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else if (secciones === 11) {
      //PAC

      this.router.navigate(['/PACETC'],{ queryParams: { id: id,idubicacion:ubicacion} });


      //this.router.navigate(['/PACUAPA'],{ queryParams: { id: id,idubicacion:ubicacion} });
    }else if(secciones===17){
      //ptn preparacion AprobacionesPreparacion?id=645
      this.router.navigate(['/AprobacionesPreparacion'],{ queryParams: { id: ubicacion,etc:etc} });
    }else if(secciones===18){
      //ptn preparacion AprobacionesPreparacion?id=645
      this.router.navigate(['/AprobacionesCiclomenu'],{ queryParams: { id: ubicacion,etc:etc} });
    }

    else { }
  }

  getDescripcion(element: GetAprobacionesGetAllWithRelModel): string {
    return construirDescripcionAprobacion(element, { forzarEtc: true });
  }
}
