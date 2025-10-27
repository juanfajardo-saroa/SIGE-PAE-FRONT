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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AlimentosMinuta
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
export interface AlimentosMinutaInterface {

        id:number;
    iD_MinutaPatronAlimento:number;
    siD_MinutaPatronAlimento:  string ; 
    iD_TipoComponente:number;
    siD_TipoComponente:  string ; 
    iD_GrupoAlimento:number;
    siD_GrupoAlimento:  string ; 
    frecuencia:number;
    gramoPesoBruto:number;
    gramoPesoNeto:number;
    gramoPesoPorcionServida:number;
    normativa:string;
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
export class AlimentosMinutaModel implements AlimentosMinutaInterface {
    constructor(
  
        public id:number, 
    public iD_MinutaPatronAlimento:number, 
    public siD_MinutaPatronAlimento: string , 
    public iD_TipoComponente:number, 
    public siD_TipoComponente: string , 
    public iD_GrupoAlimento:number, 
    public siD_GrupoAlimento: string , 
    public frecuencia:number, 
    public gramoPesoBruto:number, 
    public gramoPesoNeto:number, 
    public gramoPesoPorcionServida:number, 
    public normativa:string, 
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
  





