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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionNivel3
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
export interface GetCaracterizacionNivel3Interface {

        id:number;
    Categoria1erNivel:string;
    idCategoria2doNivel:number;
    Categoria2doNivel:string;
    IconoCategoria:string;
    idPregunta:number;
    Pregunta:string;
    IconoPregunta2doNivel:string;
    idEscala:number;
    NombreEscala:number;
    OrdenPregunta:number;
    idPreguntaPadre:number;
    TercerNivel:number;

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
export class GetCaracterizacionNivel3Model implements GetCaracterizacionNivel3Interface {
    constructor(
  
        public id:number, 
    public Categoria1erNivel:string, 
    public idCategoria2doNivel:number, 
    public Categoria2doNivel:string, 
    public IconoCategoria:string, 
    public idPregunta:number, 
    public Pregunta:string, 
    public IconoPregunta2doNivel:string, 
    public idEscala:number, 
    public NombreEscala:number, 
    public OrdenPregunta:number, 
    public idPreguntaPadre:number, 
    public TercerNivel:number, 

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
  





