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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad UsuariosEntidades
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
export interface UsuariosEntidadesInterface {

        id:number;
    iD_TipoEstadoUsuario:number;
    siD_TipoEstadoUsuario:  string ; 
    iD_User:number;
    siD_User:  string ; 
    iD_Roles:number;
    siD_Roles:  string ; 
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_ET:number;
    siD_ET:  string ; 
    nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    correo:string;
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
export class UsuariosEntidadesModel implements UsuariosEntidadesInterface {
    constructor(
  
        public id:number, 
    public iD_TipoEstadoUsuario:number, 
    public siD_TipoEstadoUsuario: string , 
    public iD_User:number, 
    public siD_User: string , 
    public iD_Roles:number, 
    public siD_Roles: string , 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_ET:number, 
    public siD_ET: string , 
    public nombre:string, 
    public apellido:string, 
    public cedula:string, 
    public celular:string, 
    public correo:string, 
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
  





