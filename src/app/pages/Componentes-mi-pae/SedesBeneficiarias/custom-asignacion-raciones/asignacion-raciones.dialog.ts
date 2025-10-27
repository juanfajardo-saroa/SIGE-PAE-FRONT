import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { TiposModeloOperacionModel } from 'src/app/shared/model/TiposModeloOperacion';

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { JornadaModel } from 'src/app/shared/model/Jornada';
import { NivelEducativoModel } from 'src/app/shared/model/NivelEducativo';
import { TipoMunicipioModel } from 'src/app/shared/model/TipoMunicipio';


import { ZonasModel } from 'src/app/shared/model/Zonas';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { JornadaService } from 'src/app/shared/services/Jornada.services';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { TipoMunicipioService } from 'src/app/shared/services/TipoMunicipio.services';


import { ZonasService } from 'src/app/shared/services/Zonas.services';
import { environment } from 'src/environments/environment';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_JornadaGetbyETCRequest, PA_JornadaGetbyETCService } from 'src/app/shared/services/PA_JornadaGetbyETC.services';
import { PA_NivelEduGetbyETCRequest, PA_NivelEduGetbyETCService } from 'src/app/shared/services/PA_NivelEduGetbyETC.services';
import { PA_ZonaGetbyETCRequest, PA_ZonaGetbyETCService } from 'src/app/shared/services/PA_ZonaGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_JornadaGetbyETCModel } from 'src/app/shared/model/PA_JornadaGetbyETCModel';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { PA_NivelEduGetbyETCModel } from 'src/app/shared/model/PA_NivelEduGetbyETCModel';
import { PA_ZonaGetbyETCModel } from 'src/app/shared/model/PA_ZonaGetbyETCModel';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';
import { ModalidadModeloModel } from 'src/app/shared/model/ModalidadModelo';
import { TiposComplementoModel } from 'src/app/shared/model/TiposComplemento';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { TiposModalidadComplementoService } from 'src/app/shared/services/TiposModalidadComplemento.services';



@Component({
    selector: 'app-asignacion-raciones',
    templateUrl: './asignacion-raciones.dialog.html',
    styleUrls: ['./asignacion-raciones.dialog.scss']
})
export class AsignacionRacionesDialog implements OnInit {
    form: FormGroup;
    action: string;
    local_data: any;
    idTmunicipio: any;
    temp: TiposComplementoModel[];
    atLeastOneField = false;
    tipoMunicipioList: TipoMunicipioModel[];
    divipolaList: PA_DivipolasGetbyETCModel[];
    sedesJornadaList: PA_JornadaGetbyETCModel[];
    gradosSedesJornadaList: GradosSedesJornadasModel[];
    nivelEducativoList: PA_NivelEduGetbyETCModel[];
    zonasList: PA_ZonaGetbyETCModel[];

    nuevoArray = []

    criterioVulnerabilidadList = [
        { id: 1, nombre: " Sedes en las que por lo menos el 50% de la población es étnica" },
        { id: 2, nombre: "Sedes en las que por lo menos el 50% de la población tiene alguna discapacidad" },
        { id: 3, nombre: "Sedes en las que por lo menos el 50% de la población es víctima" }
    ];

    tiposModeloOperacionList: TiposModeloOperacionModel[];
    tablamodalidadList: any[];
    modalidadList: ModalidadModeloModel[];
    tipoRacionList: ModalidadModeloModel[];
    TiposRacionListForever: TiposComplementoModel[];
    completarList = [
        { id: 1, nombre: "Matricula completa" },
        { id: 0, nombre: "Ceros (0)" }];
    idJornada: number;
    public itemModelo: any = {
        modalidad: false,
        tipoRacion: false,
    }

    //filtros
    prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
    prioJornadaParams: PA_JornadaGetbyETCRequest = {};
    prioNivelParams: PA_NivelEduGetbyETCRequest = {};
    prioZonasParams: PA_ZonaGetbyETCRequest = {};

    constructor(public dialogRef: MatDialogRef<AsignacionRacionesDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private tipoMunicipioService: TipoMunicipioService,
        private tiposModeloOperacionService: TiposModeloOperacionService,
        private tiposModalidadRacionService: TiposModalidadComplementoService,
        private tiposRacionService: TiposComplementoService,
        private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
        private _PA_JornadaGetbyETCService: PA_JornadaGetbyETCService,
        private _PA_NivelEduGetbyETCService: PA_NivelEduGetbyETCService,
        private _PA_ZonaGetbyETCService: PA_ZonaGetbyETCService,
        private _ModalidadModeloService: ModalidadModeloService,
        private fb: FormBuilder) {
        if (data.idJornada == 66 || data.idJornada == 64 || data.idJornada == 62 || data.idJornada == 60) {
            this.idJornada = 6;//tarde
        } else if (data.idJornada == 65 || data.idJornada == 63 || data.idJornada == 61 || data.idJornada == 59 || data.idJornada == 57) {
            this.idJornada = 5;//mañana
        } else if (data.idJornada == 55 || data.idJornada == 54 || data.idJornada == 53 || data.idJornada == 52 || data.idJornada == 51 || data.idJornada == 50 || data.idJornada == 49 || data.idJornada == 47) {
            this.idJornada = 2;//completa
        } else if (data.idJornada == 48 || data.idJornada == 46 || data.idJornada == 44 || data.idJornada == 43 || data.idJornada == 41 || data.idJornada == 40 || data.idJornada == 39) {
            this.idJornada = 1;//unica
        } else { }
        this.atLeastOneField = false;
        this.form = this.fb.group({
            id_ETC: [Number(localStorage.getItem('IdUbicacion'))],
            tipoMunicipio: [data.idTMunicipio],
            municipio: [data.idMunicipio],
            jornada: [this.idJornada],
            nivelEducativo: [data.idNivelEdu],
            zona: [data.idZonas],
            criteriosVulnerabilidad: [data.idCriterio],
            modeloOperacion: [''],
            modalidad: [''],
            tipoRacion: [''],
            completar: [''],
            id_vigencia:[Number(localStorage.getItem('VigSeleccionada'))],
            auditoria:["RolBase:"+localStorage.getItem("RolBase")+","+
            "RolPersonalizado:"+localStorage.getItem("RolPersonalizado")+","+
            "NombreUsuario:"+localStorage.getItem("NombreUsuario")+","+
            "Ubicacion:"+localStorage.getItem("Ubicacion")+","+
            "IpPublica:"+localStorage.getItem("IpPublica")+","+
            "Accion:"+ "Actualizar"+","+    
            "Browser:"+ localStorage.getItem("Browser")+","+
            "NombreMaquina:"+localStorage.getItem("NombreMaquina")]
        });
        this.getAllSelects();
        this.idTmunicipio = data.idTMunicipio;



    }

    ngOnInit(): void {

    }
    doAction(): void {
        this.dialogRef.close({ event: 'Save', data: this.form.value });
    }

    closeDialog(): void {
        this
            .dialogRef.close({ event: 'Cancel' });
    }
    ope = 0;
    onTipoOpe(value: any, name: string, name2: string) {
        this.atLeastOneField = true;
        this.ope = value;
        this.itemModelo[name] = true;
        this.itemModelo[name2] = true;
        this.modalidadList = [];
        this.tipoRacionList = [];

            this.modalidadList = this.tablamodalidadList.filter(item => item.iD_TipoModeloOperacion == value)
            var arr = {};

            for (var i = 0, len = this.modalidadList.length; i < len; i++)
                arr[this.modalidadList[i]['iD_TipoModalidadComplemento']] = this.modalidadList[i];

            this.modalidadList = new Array();
            for (var key in arr)
                this.modalidadList.push(arr[key]);





    }

    onTipoModalidadRacionClick(value: any) {

        this.tipoRacionList = [];
        this.tipoRacionList = this.tablamodalidadList.filter(item => item.iD_TipoModalidadComplemento == value && item.iD_TipoModeloOperacion==this.ope)
            var arr = {};

            for (var i = 0, len = this.tipoRacionList.length; i < len; i++)
                arr[this.tipoRacionList[i]['iD_TipoComplemento']] = this.tipoRacionList[i];

            this.tipoRacionList= new Array();
            for (var key in arr)
                this.tipoRacionList.push(arr[key]);



    }

    getAllSelects(): void {
        this.tipoMunicipioService.getTipoMunicipioListFull().subscribe(
            (response: any) => {
                this.tipoMunicipioList = response;
            },
            (err) => {
            }
        );

        this.prioDivolasParams.id_ETC =Number(localStorage.getItem('IdUbicacion'));
        this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
            (response: any) => {
                this.divipolaList = response;
            },
            (err) => {
            }
        );

        this.prioJornadaParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
        this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(this.prioJornadaParams).subscribe(
            (response: any) => {
                this.sedesJornadaList = response;
            },
            (err) => {
            }
        );
        //nivel
        this.prioNivelParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
        this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(this.prioNivelParams).subscribe(
            (response: any) => {
                this.nivelEducativoList = response;
            },
            (err) => {
            }
        );

        //zonas
        this.prioZonasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
        this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(this.prioZonasParams).subscribe(
            (response: any) => {
                this.zonasList = response;
            },
            (err) => {
            }
        );


        this.tiposModeloOperacionService.getTiposModeloOperacionList().subscribe(
            (response: any) => {
                this.tiposModeloOperacionList = response;
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



    }

    onTipoMunicipioClick(value: any): void {
        this.atLeastOneField = true;
        this.prioDivolasParams.id_TipoMunicipio = value;
        this.prioJornadaParams.id_tipoMunicipio = value;
        this.prioNivelParams.id_tipoMunicipio = value;
        this.prioZonasParams.id_tipoMunicipio = value;
        this.fillDivolas(this.prioDivolasParams);
        this.fillJornada(this.prioJornadaParams);
        this.fillNivel(this.prioNivelParams);
        this.fillZona(this.prioZonasParams);
    }
    onFieldClick() {
        this.atLeastOneField = true;
    }
    onDivipolaClick(value: any): void {
        this.prioJornadaParams.id_Divipola = value;
        this.prioNivelParams.id_Divipola = value;
        this.prioZonasParams.id_Divipola = value;
        this.fillJornada(this.prioJornadaParams);
        this.fillNivel(this.prioNivelParams);
        this.fillZona(this.prioZonasParams);

    }


    fillDivolas(filterDivolasParams: PA_DivipolasGetbyETCRequest): void {
        this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(filterDivolasParams).subscribe(
            (response: any) => {
                this.divipolaList = response;
            },
            (err) => {
            }
        );
    }
    fillJornada(filterJornadaParams: PA_JornadaGetbyETCRequest): void {
        this._PA_JornadaGetbyETCService.getPA_JornadaGetbyETCList(filterJornadaParams).subscribe(
            (response: any) => {
                this.sedesJornadaList = response;
            },
            (err) => {
            }
        );
    }
    fillNivel(filterNivelParams: PA_NivelEduGetbyETCRequest): void {
        this._PA_NivelEduGetbyETCService.getPA_NivelEduGetbyETCList(filterNivelParams).subscribe(
            (response: any) => {
                this.nivelEducativoList = response;
            },
            (err) => {
            }
        );
    }
    fillZona(filterZonasParams: PA_ZonaGetbyETCRequest): void {
        this._PA_ZonaGetbyETCService.getPA_ZonaGetbyETCList(filterZonasParams).subscribe(
            (response: any) => {
                this.zonasList = response;
            },
            (err) => {
            }
        );
    }

}
