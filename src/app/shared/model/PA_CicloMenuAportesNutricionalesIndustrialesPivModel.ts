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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_CicloMenuAportesNutricionalesIndustrialesPiv
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
export interface PA_CicloMenuAportesNutricionalesIndustrialesPivInterface {

        Columna:string;
    Componente:number;
    En_Energia:number;
    Ma_Proteina:number;
    Ma_CarbohidratosTotales:number;
    Ma_GrasasTotales:number;
    Mi_Calcio:number;
    Mi_Hierro:number;
    Mi_Sodio:number;
    Mi_VitaminaA:number;
    Mi_Zinc:number;
    Ma_GrasasSaturadas:number;

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
export class PA_CicloMenuAportesNutricionalesIndustrialesPivModel implements PA_CicloMenuAportesNutricionalesIndustrialesPivInterface {
    constructor(
  
        public Columna:string, 
    public Componente:number, 
    public En_Energia:number, 
    public Ma_Proteina:number, 
    public Ma_CarbohidratosTotales:number, 
    public Ma_GrasasTotales:number, 
    public Mi_Calcio:number, 
    public Mi_Hierro:number, 
    public Mi_Sodio:number, 
    public Mi_VitaminaA:number, 
    public Mi_Zinc:number, 
    public Ma_GrasasSaturadas:number, 

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
  





