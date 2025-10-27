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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MenusPlanAlistamiento
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
export interface MenusPlanAlistamientoInterface {

    iD:number;
    iD_EstadoValidacion:number;
    siD_EstadoValidacion:  string ; 
    iD_UsuarioEntidad:number;
    siD_UsuarioEntidad:  string ; 
    iD_TipoModalidadComplemento:number;
    siD_TipoModalidadComplemento:  string ; 
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    iD_PlanesAlistamiento:number;
    siD_PlanesAlistamiento:string;
    iD_CiclosMenu:number;
    siD_CiclosMenu:string;
    iD_NivelEducativo:number;
    siD_NivelEducativo:string;
    numeroMenu:number;
    iD_Jornada:number;
    iD_ModeloOperacion:number;
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
export class MenusPlanAlistamientoModel implements MenusPlanAlistamientoInterface {
    constructor(
  
        public iD:number, 
    public iD_EstadoValidacion:number, 
    public siD_EstadoValidacion: string , 
    public iD_UsuarioEntidad:number, 
    public siD_UsuarioEntidad: string , 
  
    public iD_TipoModalidadComplemento:number, 
    public siD_TipoModalidadComplemento: string , 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public iD_PlanesAlistamiento:number,
    public siD_PlanesAlistamiento:string,
    public iD_CiclosMenu:number,
    public  siD_CiclosMenu:string,
    public iD_NivelEducativo:number,
    public  siD_NivelEducativo:string,
    public numeroMenu:number,
    public  iD_Jornada:number,
    public iD_ModeloOperacion:number, 
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
  





