export interface ProductosShortInterface {
    id: number,
    nombre: string,
    fechaRegistro: Date,
    iD_TipoAlimento: number,
    sID_TipoAlimento: string,
    iD_EstadoRegistro: number,
    sID_EstadoRegistro: string
}


export class ProductosShortModel implements ProductosShortInterface {
    constructor(
        public id: number,
        public nombre: string,
        public fechaRegistro: Date,
        public iD_TipoAlimento: number,
        public sID_TipoAlimento: string,
        public iD_EstadoRegistro: number,
        public sID_EstadoRegistro: string
    ) { }
}
