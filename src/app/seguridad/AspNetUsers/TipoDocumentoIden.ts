 export interface TipoDocumentoIdenInterface {

    id: number;
    nombre: string;
    fechaCreacion: string;

    auditoria: string;
    filtro: string;
    _XMLAuditoria: string;

    isValid: boolean;
    validationErrors: string;
}


export class TipoDocumentoIdenModel implements TipoDocumentoIdenInterface {
    constructor(

        public id: number,
        public nombre: string,
        public fechaCreacion: string,

        public auditoria: string,
        public filtro: string,
        public _XMLAuditoria: string,

        public isValid: boolean = true,
        public validationErrors: string,


    ) { }
}

