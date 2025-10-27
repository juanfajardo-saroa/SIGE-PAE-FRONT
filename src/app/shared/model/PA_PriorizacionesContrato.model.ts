export interface PA_PriorizacionesContratoInterface {
    id: number;
    iD_Contrato:  number;
    iD_GradoSedeJornada:  number;
    iD_TipoModelooperacion: number;
    iD_TipoModalidadComplemento: number;
    iD_TipoComplemento: number;
    numeroComplementos:  number;
    sID_TiposRacion: string;
    sID_Contratos: number;
    sID_TiposModeloOperacion: string;
    sID_TiposModalidadComplemento: string;
    sID_Grado: string;
    sID_jornada: string;

}

export class PAPriorizacionesContratoModel implements PA_PriorizacionesContratoInterface {
    constructor(
        public id: number,
        public iD_Contrato:  number,
        public iD_GradoSedeJornada:  number,
        public iD_TipoModelooperacion: number,
        public iD_TipoModalidadComplemento: number,
        public iD_TipoComplemento: number,
        public numeroComplementos:  number,
        public sID_TiposRacion: string,
        public sID_Contratos: number,
        public sID_TiposModeloOperacion: string,
        public sID_TiposModalidadComplemento: string,
        public sID_Grado: string,
        public sID_jornada: string,

    ) { }
}
