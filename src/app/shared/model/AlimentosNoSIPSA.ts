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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AlimentosNoSIPSA
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
export interface AlimentosNoSIPSAInterface {

        id:number;
    iD_AlimentosICBF:number;
    siD_AlimentosICBF:  string ; 
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_ClasificacionNoSIPSA:number;
    siD_ClasificacionNoSIPSA:  string ; 
    codigoSIPSA:string;
    nombreArticulo:string;
    iD_TipoUnidad:number;
    siD_TipoUnidad:  string ; 
    cantidad:number;
    fuente1:string;
    precio1:number;
    fuente2:string;
    precio2:number;
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
export class AlimentosNoSIPSAModel implements AlimentosNoSIPSAInterface {
    constructor(
  
        public id:number, 
    public iD_AlimentosICBF:number, 
    public siD_AlimentosICBF: string , 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_ClasificacionNoSIPSA:number, 
    public siD_ClasificacionNoSIPSA: string , 
    public codigoSIPSA:string, 
    public nombreArticulo:string, 
    public iD_TipoUnidad:number, 
    public siD_TipoUnidad: string , 
    public cantidad:number, 
    public fuente1:string, 
    public precio1:number, 
    public fuente2:string, 
    public precio2:number, 
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
  





