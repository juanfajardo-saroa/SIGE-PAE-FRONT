export interface EstadoNotificacionInterface {

    id: number;
    usuario: string;
    estado: number;
}

export class EstadoNotificacionModel implements EstadoNotificacionInterface {
    constructor(

        public id: number,
        public usuario: string,
        public estado: number,
    ) { }
}