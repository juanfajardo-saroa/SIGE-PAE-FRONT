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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_SedesGetAllWithRelation
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
export interface PA_SedesGetAllWithRelationInterface {

        id:number;
    ID_lE:number;
    ID_Zona:number;
    ID_GrupoAnalisis:number;
    ID_ETC:number;
    ID_Divipola:number;
    ID_TipoAcceso:number;
    CodigoDane:string;
    Nombre:string;
    Direccion:string;
    Telefono:string;
    Etnico:string;
    PriorizacionPAE:boolean;
    sID_Divipola:string;
    sID_ETC:string;
    sID_GrupoAnalisis:string;
    sID_lE:string;
    sID_Zona:string;
    sID_TipoAcceso:string;

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
export class PA_SedesGetAllWithRelationModel implements PA_SedesGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_lE:number, 
    public ID_Zona:number, 
    public ID_GrupoAnalisis:number, 
    public ID_ETC:number, 
    public ID_Divipola:number, 
    public ID_TipoAcceso:number, 
    public CodigoDane:string, 
    public Nombre:string, 
    public Direccion:string, 
    public Telefono:string, 
    public Etnico:string, 
    public PriorizacionPAE:boolean, 
    public sID_Divipola:string, 
    public sID_ETC:string, 
    public sID_GrupoAnalisis:string, 
    public sID_lE:string, 
    public sID_Zona:string, 
    public sID_TipoAcceso:string, 

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
  





