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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AlimentosMinutaF3
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
export interface AlimentosMinutaF3Interface {

        id:number;
    iD_MinutaPatronAlimento:number;
    iD_TipoComponente:number;
    iD_GrupoAlimento:number;
    frecuencia:number;
    mingramoPesoBruto:number;
    maxgramoPesoBruto:number;
    mingramoPesoNeto:number;
    maxgramoPesoNeto:number;
    mingramoPesoPorcionServida:number;
    maxgramoPesoPorcionServida:number;
    normativa:string;
    auditoria:string;
    iD_SubGrupoAlimento:number;

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
export class AlimentosMinutaF3Model implements AlimentosMinutaF3Interface {
    constructor(
  
        public id:number, 
    public iD_MinutaPatronAlimento:number, 
    public iD_TipoComponente:number, 
    public iD_GrupoAlimento:number, 
    public frecuencia:number, 
    public mingramoPesoBruto:number, 
    public maxgramoPesoBruto:number, 
    public mingramoPesoNeto:number, 
    public maxgramoPesoNeto:number, 
    public mingramoPesoPorcionServida:number, 
    public maxgramoPesoPorcionServida:number, 
    public normativa:string, 
    public auditoria:string, 
    public iD_SubGrupoAlimento:number, 

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
  





