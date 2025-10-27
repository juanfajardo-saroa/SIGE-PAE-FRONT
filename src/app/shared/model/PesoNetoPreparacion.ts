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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PesoNetoPreparacion
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
export interface PesoNetoPreparacionInterface {

        id:number;
    iD_TipoComponente:number;
    siD_TipoComponente:  string ; 
    iD_TipoNivelEducativo:number;
    siD_TipoNivelEducativo:  string ; 
    iD_Preparacion:number;
    siD_Preparacion:  string ; 
    pesoNeto:number;
    iD_SubGrupoAlimentos:number;
    siD_SubGrupoAlimentos:  string ; 
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    auditoria:string;
    iD_AlimentosICBF:number;
    ModificacionEstado:boolean;

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
export class PesoNetoPreparacionModel implements PesoNetoPreparacionInterface {
    constructor(
  
        public id:number, 
    public iD_TipoComponente:number, 
    public siD_TipoComponente: string , 
    public iD_TipoNivelEducativo:number, 
    public siD_TipoNivelEducativo: string , 
    public iD_Preparacion:number, 
    public siD_Preparacion: string , 
    public pesoNeto:number, 
    public iD_SubGrupoAlimentos:number, 
    public siD_SubGrupoAlimentos: string , 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public auditoria:string, 
    public iD_AlimentosICBF:number,
    public ModificacionEstado:boolean,

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
  





