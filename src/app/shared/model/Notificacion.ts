/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Notificacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface NotificacionInterface {

    id: number;
    remitente:string;
    destinatario: string;
    asunto: string;
    cuerpo: string;
    status: string;
    fecha: Date;


    // atributos para gestión de auditoria del objeto
    _ippublica: string;
    _nombremaquina: string;
    _usuario: string;
    _ipdetrasproxy: string;
    _browser: string;
    _accion: string;
    _sessionid: string;
    _XMLAuditoria: string;
    // atributos adicionales genericos para gestión del objeto
    isValid: boolean;
    isSelected: boolean;
    completed: boolean;

}

//Modelo constructor que implementa interface
export class NotificacionModel implements NotificacionInterface {
    constructor(

        public id: number,
        public remitente:string,
        public destinatario: string,
        public asunto: string,
        public cuerpo: string,
        public status: string,
        public fecha: Date,

        // atributos para gestión de auditoria del objeto
        public _ippublica: string,
        public _nombremaquina: string,
        public _usuario: string,
        public _ipdetrasproxy: string,
        public _browser: string,
        public _accion: string,
        public _sessionid: string,
        public _XMLAuditoria: string,
        // atributos adicionales genericos para gestión del objeto
        public isValid: boolean = true,
        public isSelected: boolean = false,
        public completed: boolean = false

    ) { }
}

