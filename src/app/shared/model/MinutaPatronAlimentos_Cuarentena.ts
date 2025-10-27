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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MinutaPatronAlimentos_Cuarentena
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
export interface MinutaPatronAlimentos_CuarentenaInterface {

        id:number;
    nombre:string;
    iD_TipoMinutaPatron:number;
    siD_TipoMinutaPatron:  string ; 
    iD_TipoEstadoMinuta:number;
    siD_TipoEstadoMinuta:  string ; 
    iD_UsuarioEntidad:number;
    siD_UsuarioEntidad:  string ; 
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_TipoGrupoEtario:number;
    siD_TipoGrupoEtario:  string ; 
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
export class MinutaPatronAlimentos_CuarentenaModel implements MinutaPatronAlimentos_CuarentenaInterface {
    constructor(
  
        public id:number, 
    public nombre:string, 
    public iD_TipoMinutaPatron:number, 
    public siD_TipoMinutaPatron: string , 
    public iD_TipoEstadoMinuta:number, 
    public siD_TipoEstadoMinuta: string , 
    public iD_UsuarioEntidad:number, 
    public siD_UsuarioEntidad: string , 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_TipoGrupoEtario:number, 
    public siD_TipoGrupoEtario: string , 
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
  





