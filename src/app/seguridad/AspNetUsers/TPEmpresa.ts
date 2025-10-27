/**
 * <Derechos_Reservados>
 * 
 * Aplicacion		:SISPAE 
 * 
 * Autor			:TiGlobal SAS y SoftManagement
 * 
 * Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
 * 
 * Ano			    :2022
 * 
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad TipoActor
 * 
 * Capa			    :SISPAE-Front 
 * 
 * </Derechos_Reservados>
 */


/**
 * Definicion de Interface  con los atributos del objeto, desprovistas de inicialización y funcionalidad,
 *
 *  La interfaz es el contrato entre el mundo exterior y la clase
 */
export interface Tp_EmpresaInterface {

    id: number;
    nombre: string;
    slogan: string;
    logo: string;
    zeroFill: number;
    hostMail: string;
    userFrom: string;
    fromPassword: string;
    puertoMail: string;
    plantillaAsignacion: string;
    plantillaFinProceso: string;
    plantillaAlerta: string;
    urlDrive: string;
    keyDrive: string;
    usrDrive: string;
    pwdDrive: string;
    sslEnabled: boolean;
    tieneDoc4us: boolean;
    tieneOpe: boolean;
    tieneFirma: boolean;


    // atributos para gestión de auditoria del objeto
    auditoria: string;
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

/**
* Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
*
* En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
*/
export class TP_EmpresaModel implements Tp_EmpresaInterface {
    constructor(

        public id: number,
        public nombre: string,
        public slogan: string,
        public logo: string,
        public zeroFill: number,
        public hostMail: string,
        public userFrom: string,
        public fromPassword: string,
        public puertoMail: string,
        public plantillaAsignacion: string,
        public plantillaFinProceso: string,
        public plantillaAlerta: string,
        public urlDrive: string,
        public keyDrive: string,
        public usrDrive: string,
        public pwdDrive: string,
        public sslEnabled: boolean,
        public tieneDoc4us: boolean,
        public tieneOpe: boolean,
        public tieneFirma: boolean,

        // atributos para gestión de auditoria del objeto
        public auditoria: string,
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

