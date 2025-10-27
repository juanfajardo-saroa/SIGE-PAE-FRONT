import { Component, OnInit, Input ,OnDestroy} from '@angular/core';
import { CostosApiService  } from '../../../../../../shared/services/costos-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-priorizacion',
 /*  providers: [
    { provide: CostosApiService, useClass: CostosApiService,  },
  ], */
  templateUrl: './priorizacion.component.html',
  styleUrls: ['./priorizacion.component.sass']
})
export class PriorizacionComponent implements OnInit ,OnDestroy{

  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  ID_VIGENCIA =this.itemVigencia.id;
  private subs = new Subscription() 

  @Input() public idETC: number = Number(localStorage.getItem('IdUbicacion'));
  @Input() public idTipoModeloOperacion!: number;
  @Input() public idVigencia: number = this.itemVigencia.id;

  @Input() public porcRecaudados!: any;
  @Input() public porcReconocidos!: any;

  columnsMAEM: string[] = ['jornada', 'cantidadSede', 'Matricula', 'rpsAlmuerzo', 'rpsComplemento', 'ri', 'cateringAlmuerzo', 'cateringComplemento', 'racionesDiarias'];
  columnsMAER: string[] = ['jornada', 'cantidadSede', 'Matricula', 'rpsAlmuerzo', 'rpsComplemento', 'racionesDiarias'];
  columnsMAIP: string[] = ['jornada', 'cantidadSede', 'Matricula', 'rpsAlmuerzo', 'rpsComplemento', 'cateringAlmuerzo', 'cateringComplemento', 'racionesDiarias'];
  itemTipoModeloOperacion: any = {};

  preciosPorRacion: any[] = [];
  otrosCostos: any[] = [];
  itemOtrosCostos: any;
  totalCostos: number = 0;
  costosSimunistros: any[] = [];
  coberturaFinancieraSuministro: any[] = [];
  dataSourceMAEM: any;
  dataSourceMAER: any;
  dataSourceMAIP: any;

  costoTotalMAEM: any = { "total": 'TOTAL diario', "tCantidad": 0, "tMatricula": 0, "tAlm": 0, "tCom": 0, "tRi": 0, "TCa_Alm": 0, "TCa_Com": 0, "TRaciones": 0 };
  costoTotalMAER: any = { "total": 'TOTAL diario', "tCantidad": 0, "tMatricula": 0, "tAlm": 0, "tCom": 0, "TCa_Alm": 0, "TCa_Com": 0,"TRaciones": 0 };
  costoTotalMAIP: any = { "total": 'TOTAL diario', "tCantidad": 0, "tMatricula": 0, "tAlm": 0, "tCom": 0, "TCa_Alm": 0, "TCa_Com": 0,"TRaciones": 0 };




  constructor(
    private _costosApiService : CostosApiService,
  ) { }

  ngOnInit(): void {
    this.get_GetResumenPriorizacionMAEM(1);
    this.get_GetResumenPriorizacionMAER(2);
    this.get_GetResumenPriorizacionMAIP(3);
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  


  public get_GetResumenPriorizacionMAEM(idTipo: number){

    this._costosApiService.get_GetResumenPriorizacionMAEM(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {

        if(response.success){

          var preciosracion = response.result;
          this.preciosPorRacion = [];
          for (var item in preciosracion) {
            var itemPrecio = preciosracion[item];
              itemPrecio.iD_ETC = this.idETC;
              itemPrecio.iD_Vigencia = this.idVigencia;
            if(typeof itemPrecio === 'object')
            {
              if(itemPrecio.jornada === "Mañana"){
                itemPrecio.icono = 1;
              }else if(itemPrecio.jornada === "Tarde"){
                itemPrecio.icono = 2;
              }else{
                itemPrecio.icono = 3;
              }

              this.preciosPorRacion.push(itemPrecio);
            }

            this.costoTotalMAEM.tCantidad += itemPrecio.cantidadSede;
            this.costoTotalMAEM.tMatricula += itemPrecio.matricula;
            this.costoTotalMAEM.tAlm += itemPrecio.rpS_ALM;
            this.costoTotalMAEM.tCom += itemPrecio.rpS_COM;
            this.costoTotalMAEM.tRi += itemPrecio.rI_COM;
            this.costoTotalMAEM.TCa_Alm += itemPrecio.cA_ALM;
            this.costoTotalMAEM.TCa_Com += itemPrecio.cA_COM;
            this.costoTotalMAEM.TRaciones += itemPrecio.racionesDiarias;
          }

          var totales = {'total': 'TOTAL diario','jornada': '', 'cantidadSede': 0, 'matricula':0, 'rpS_ALM':0, 'rpS_COM':0, 'rI_COM':0, 'cA_ALM':0, 'cA_COM':0, 'racionesDiarias':0};
          totales.jornada = 'TOTAL diario';
          totales.cantidadSede = this.costoTotalMAEM.tCantidad;
          totales.matricula = this.costoTotalMAEM.tMatricula;
          totales.rpS_ALM = this.costoTotalMAEM.tAlm;
          totales.rpS_COM = this.costoTotalMAEM.tCom;
          totales.rI_COM = this.costoTotalMAEM.tRi;
          totales.cA_ALM = this.costoTotalMAEM.TCa_Alm;
          totales.cA_COM = this.costoTotalMAEM.TCa_Com;
          totales.racionesDiarias = this.costoTotalMAEM.TRaciones;
          this.preciosPorRacion.push(totales);

          this.dataSourceMAEM = this.preciosPorRacion;
        }
      });
  }

  public get_GetResumenPriorizacionMAER(idTipo: number){

      this._costosApiService.get_GetResumenPriorizacionMAER(this.idETC, idTipo, this.idVigencia)
      .subscribe(response => {
        if(response.success){
          var preciosracion = response.result;
          this.preciosPorRacion = [];
          for (var item in preciosracion) {
            var itemPrecio = preciosracion[item];
            if(typeof itemPrecio === 'object')
            {
              if(itemPrecio.jornada === "Mañana"){
                itemPrecio.icono = 1;
              }else if(itemPrecio.jornada === "Tarde"){
                itemPrecio.icono = 2;
              }else{
                itemPrecio.icono = 3;
              }

              this.preciosPorRacion.push(itemPrecio);
            }

            this.costoTotalMAER.tAlm += itemPrecio.rpS_ALMR;
            this.costoTotalMAER.tCom += itemPrecio.rpS_COMR;
            this.costoTotalMAER.TCa_Alm += itemPrecio.cA_ALM;
            this.costoTotalMAER.TCa_Com += itemPrecio.cA_COM;
            this.costoTotalMAER.tCantidad += itemPrecio.cantidadSede;
            this.costoTotalMAER.tMatricula += itemPrecio.matricula;
            this.costoTotalMAER.TRaciones += itemPrecio.racionesDiarias;
          }

          var totales = {'total': 'TOTAL diario','jornada': '', 'cantidadSede': 0, 'matricula':0,'rpS_ALMR':0, 'rpS_COMR':0, 'cA_ALM':0, 'cA_COM':0, 'racionesDiarias':0};
          totales.jornada = this.costoTotalMAER.total;
          totales.cantidadSede = this.costoTotalMAER.tCantidad;
          totales.matricula = this.costoTotalMAER.tMatricula;
          totales.racionesDiarias = this.costoTotalMAER.TRaciones;
          totales.rpS_ALMR = this.costoTotalMAER.tAlm;
          totales.rpS_COMR = this.costoTotalMAER.tCom;
          totales.cA_ALM = this.costoTotalMAER.TCa_Alm;
          totales.cA_COM = this.costoTotalMAER.TCa_Com;

          this.preciosPorRacion.push(totales);

          this.dataSourceMAER = this.preciosPorRacion;
        }
      });

    }


    public get_GetResumenPriorizacionMAIP(idTipo: number){

        this._costosApiService.get_GetResumenPriorizacionMAIP(this.idETC, idTipo, this.idVigencia)
          .subscribe(response => {
            if(response.success){
              var preciosracion = response.result;
              this.preciosPorRacion = [];
              for (var item in preciosracion) {
                var itemPrecio = preciosracion[item];
                if(typeof itemPrecio === 'object')
                {
                  if(itemPrecio.jornada === "Mañana"){
                    itemPrecio.icono = 1;
                  }else if(itemPrecio.jornada === "Tarde"){
                    itemPrecio.icono = 2;
                  }else{
                    itemPrecio.icono = 3;
                  }

                  this.preciosPorRacion.push(itemPrecio);
                }

                this.costoTotalMAIP.tAlm += itemPrecio.rpS_ALM;
                this.costoTotalMAIP.tCom += itemPrecio.rpS_COM;
                this.costoTotalMAIP.TCa_Alm += itemPrecio.cA_ALM;
                this.costoTotalMAIP.TCa_Com += itemPrecio.cA_COM;
                this.costoTotalMAIP.tCantidad += itemPrecio.cantidadSede;
                this.costoTotalMAIP.tMatricula += itemPrecio.matricula;
                this.costoTotalMAIP.TRaciones += itemPrecio.racionesDiarias;
              }

              var totales = {'total': 'TOTAL diario','jornada': '', 'cantidadSede': 0, 'matricula':0,'rpS_ALM':0, 'rpS_COM':0, 'rI_COM':0, 'cA_ALM':0, 'cA_COM':0, 'racionesDiarias':0 };
              totales.jornada = this.costoTotalMAIP.total;
              totales.cantidadSede = this.costoTotalMAIP.tCantidad;
              totales.matricula = this.costoTotalMAIP.tMatricula;
              totales.racionesDiarias = this.costoTotalMAIP.TRaciones;
              totales.rpS_ALM = this.costoTotalMAIP.tAlm;
              totales.rpS_COM = this.costoTotalMAIP.tCom;
              totales.cA_ALM = this.costoTotalMAIP.TCa_Alm;
              totales.cA_COM = this.costoTotalMAIP.TCa_Com;

              this.preciosPorRacion.push(totales);

              this.dataSourceMAIP = this.preciosPorRacion;

            }
          });
    }

}
