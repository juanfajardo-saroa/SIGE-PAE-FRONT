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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad VisitasControlSocial
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
export interface VisitasControlSocialInterface {

        id:number;
    iD_TipoActorControlSocial:number;
    iD_Divipola:number;
    siD_Divipola:  string ; 
    iD_TipoEntidad:number;
    iD_Sede:number;
    siD_Sede:  string ; 
    iD_Vigencia:number;
    siD_Vigencia:  string ; 
    iD_TipoCargoControlSocial:number;
    cargoControlSocialOtros:number;
    iD_TipolnstitucionControlSocial:number;
    institucionControlSocialOtros:number;
    correo:string;
    nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    fechaHoraVisita:number;
    fechaReporte:number;
    fotoComplementoEvidenciaPath:number;
    descripcionFoto:number;
    auditoria:string;

    // atributos para gestión de auditoria del objeto
    _ippublica: string;
    _nombremaquina: string ;
    _usuario: string ;
    _ipdetrasproxy: string ;
    _browser: string ;
    _accion: string ;
    _sessionid: string ;
    _XMLAuditoria: string ;
    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
 */
export class VisitasControlSocialModel implements VisitasControlSocialInterface {
    constructor(
  
        public id:number, 
    public iD_TipoActorControlSocial:number, 
    public iD_Divipola:number, 
    public siD_Divipola: string , 
    public iD_TipoEntidad:number, 
    public iD_Sede:number, 
    public siD_Sede: string , 
    public iD_Vigencia:number, 
    public siD_Vigencia: string , 
    public iD_TipoCargoControlSocial:number, 
    public cargoControlSocialOtros:number, 
    public iD_TipolnstitucionControlSocial:number, 
    public institucionControlSocialOtros:number, 
    public correo:string, 
    public nombre:string, 
    public apellido:string, 
    public cedula:string, 
    public celular:string, 
    public fechaHoraVisita:number, 
    public fechaReporte:number, 
    public fotoComplementoEvidenciaPath:number, 
    public descripcionFoto:number, 
    public auditoria:string, 

    // atributos para gestión de auditoria del objeto
    public _ippublica: string,
    public _nombremaquina: string,
    public _usuario: string,
    public _ipdetrasproxy: string,
    public _browser: string,
    public _accion: string,
    public _sessionid: string,
    public  _XMLAuditoria: string ,
    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





