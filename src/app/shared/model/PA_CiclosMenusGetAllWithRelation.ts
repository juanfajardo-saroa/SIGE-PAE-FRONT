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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_CiclosMenusGetAllWithRelation
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
export interface PA_CiclosMenusGetAllWithRelationInterface {

        id:number;
    ID_ETC:number;
    ID_TipoModeloOperacion:number;
    ID_TipoComplemento:number;
    ID_TipoModalidadComplemento:number;
    ID_CiclosMenuReferencia:number;
    ID_TipoNivelEducativo:number;
    ID_Zona:number;
    ID_EstadoRegistro:number;
    Nombre:string;
    MenuReferencia:boolean;
    MenusParaTodosNiveles:boolean;
    MenusParaTodasZonas:boolean;
    CantidadMenus:string;
    ID_MinutaAprobacion:number;
    sID_EstadoRegistro:string;
    sID_ETC:string;
    sID_MinutaAprobacion:string;
    sID_TipoComplemento:string;
    sID_TipoModalidadComplemento:string;
    sID_TipoModeloOperacion:string;

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
export class PA_CiclosMenusGetAllWithRelationModel implements PA_CiclosMenusGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_ETC:number, 
    public ID_TipoModeloOperacion:number, 
    public ID_TipoComplemento:number, 
    public ID_TipoModalidadComplemento:number, 
    public ID_CiclosMenuReferencia:number, 
    public ID_TipoNivelEducativo:number, 
    public ID_Zona:number, 
    public ID_EstadoRegistro:number, 
    public Nombre:string, 
    public MenuReferencia:boolean, 
    public MenusParaTodosNiveles:boolean, 
    public MenusParaTodasZonas:boolean, 
    public CantidadMenus:string, 
    public ID_MinutaAprobacion:number, 
    public sID_EstadoRegistro:string, 
    public sID_ETC:string, 
    public sID_MinutaAprobacion:string, 
    public sID_TipoComplemento:string, 
    public sID_TipoModalidadComplemento:string, 
    public sID_TipoModeloOperacion:string, 

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
  





