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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_InstitucionEducativaGetAllWithRelation
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
export interface PA_InstitucionEducativaGetAllWithRelationInterface {

        id:number;
    ID_Rector:number;
    ID_ETC:number;
    ID_ET:number;
    ID_DiviPola:number;
    CodigoDane:string;
    Nombre:string;
    Correo:string;
    sID_Divipolas:string;
    sID_ET:string;
    sID_ETC:string;
    sID_Rectores:string;

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
export class PA_InstitucionEducativaGetAllWithRelationModel implements PA_InstitucionEducativaGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_Rector:number, 
    public ID_ETC:number, 
    public ID_ET:number, 
    public ID_DiviPola:number, 
    public CodigoDane:string, 
    public Nombre:string, 
    public Correo:string, 
    public sID_Divipolas:string, 
    public sID_ET:string, 
    public sID_ETC:string, 
    public sID_Rectores:string, 

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
  





