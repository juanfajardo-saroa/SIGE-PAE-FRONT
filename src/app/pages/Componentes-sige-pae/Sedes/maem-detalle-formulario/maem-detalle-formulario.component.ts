import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { CustomPAPrioSedeBeneficiariasServiceService, PA_PrioSedeBeneficiarias } from 'src/app/shared/services/custom-pa-prio-sede-beneficiarias-service.service';

import { PA_PrioSedeBeneficiariasModel } from 'src/app/shared/model/PA_PrioSedeBeneficiariasModel';


@Component({
  selector: 'app-maem-detalle-formulario',
  templateUrl: './maem-detalle-formulario.component.html',
  styleUrls: ['./maem-detalle-formulario.component.scss']
})
export class MaemDetalleFormularioComponent implements OnInit {
  PriorizadaPAEList = [
    { id: 1, nombre: "Si" },
    { id: 2, nombre: "No" },
  ];
  idEtc = 0;
  sedesBeneficiariasList: PA_PrioSedeBeneficiariasModel[];
  filterParams: PA_PrioSedeBeneficiarias = {};
  idsede = 0;

  MAEMSI: boolean = false;
  MAEMNO: boolean = false;
  MAERSI: boolean = false;
  MAERNO: boolean = false;
  PAEPISI: boolean = false;
  PAEPINO: boolean = false;
  NOTIENEMOSI: boolean = false;
  NOTIENEMONO: boolean = false;
  constructor(
    private customPAPrioSedeBeneficiariasService: CustomPAPrioSedeBeneficiariasServiceService,
    private route: ActivatedRoute,
  ) {

    this.route.queryParams.subscribe(params => {
      this.idsede = + params.id;
      if(params.et==undefined){
        this.idEtc=Number(localStorage.getItem('IdUbicacion'))
      }else{
      this.idEtc =+ params.et;}

    });

    var nombresincortar = localStorage.getItem('Ubicacion')
    var nombrecortado = nombresincortar.split(" | ");
    var nombrecortado = nombresincortar.split(" |");
    let primernombre = nombrecortado[0];
    if (primernombre == 'ETC') {
      this.filterParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.Id_sede=this.idsede;
    this.fillTable(this.filterParams);

    } else if (primernombre == 'Institución educativa' || primernombre == 'institución Educativa' || primernombre == 'Institución Educativa' || primernombre == 'Institucion educativa' || primernombre == 'institucion educativa' || primernombre == 'Institucion Educativa' || primernombre == 'institucion Educativa') {
    
      this.filterParams.id_ETC=0
      this.filterParams.Id_InstEducativa=Number(localStorage.getItem('IdUbicacion'));
      this.filterParams.Id_sede=this.idsede;
      this.fillTable(this.filterParams);
    }

  }

  ngOnInit(): void {
  }
  fillTable(filterParamsTable: PA_PrioSedeBeneficiarias): void {



    this.customPAPrioSedeBeneficiariasService.getPA_PrioSedeBeneficiariasList2(filterParamsTable).subscribe(
      (response: any) => {
        let res = response
        if(res.length==0){this.NOTIENEMONO= true;}else{
          if (response[0].priorizadaPAE == true && response[0].id_ModeloOperacion == 1) {
          this.MAEMSI = true;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }
        else if (response[0].priorizadaPAE == false && response[0].id_ModeloOperacion == 1) {
          this.MAEMSI = false;
          this.MAEMNO = true;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }
        else if (response[0].priorizadaPAE == true && response[0].id_ModeloOperacion == 2) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = true;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }
        else if (response[0].priorizadaPAE == false && response[0].id_ModeloOperacion == 2) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = true;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }else if (response[0].priorizadaPAE == true && response[0].id_ModeloOperacion == 3) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = true;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }else if (response[0].priorizadaPAE == false && response[0].id_ModeloOperacion == 3) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = true;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= false;
        }else if (response[0].priorizadaPAE == false && response[0].id_ModeloOperacion == null) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = false;
          this.NOTIENEMONO= true;
        }else if (response[0].priorizadaPAE == true && response[0].id_ModeloOperacion == null) {
          this.MAEMSI = false;
          this.MAEMNO = false;
          this.MAERSI = false;
          this.MAERNO = false;
          this.PAEPISI = false;
          this.PAEPINO = false;
          this.NOTIENEMOSI = true;
          this.NOTIENEMONO= false
        }else{}
        }
        


      },
      (err) => {
      }
    );
  }
}
