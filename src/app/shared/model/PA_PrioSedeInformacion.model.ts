export interface PA_PrioSedeInformacionInterface {

    id_sede: number;
    modeloOperativo: string;
    poblacionVul: number;
    tipoMunicipio: string;
    modalidaSugerida: string;
    estadoAsignacion: string;
    estudianteSisbenAB: number;
    id_TipoModeloOperativo:number;


}

export class PA_PrioSedeInformacionModel implements PA_PrioSedeInformacionInterface {
    constructor(
        public id_sede: number,
        public modeloOperativo: string,
        public poblacionVul: number,
        public tipoMunicipio: string,
        public modalidaSugerida: string,
        public estadoAsignacion: string,
        public estudianteSisbenAB: number,
        public id_TipoModeloOperativo:number,
    ) { }
}
