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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_repositoriosGetAllWithRelation
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
export interface PA_repositoriosGetAllWithRelationInterface {

        id:number;
    idTipoArchivo:number;
    idCategoria:number;
    idVigencia:number;
    NPAHTArchivo:string;
    Nombre:string;
    Descripcion:string;
    fechaArchivo:Date;
    fechaCarga:Date;
    id_TipoModeloOperacion:number;
    NombreResolucion:string;
    tamanoArchivo:string;
    sid_TipoModeloOperacion:string;
    sidCategoria:string;
    sidTipoArchivo:string;
    sidVigencia:string;
    DiferenciaHoras:string;

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
export class PA_repositoriosGetAllWithRelationModel implements PA_repositoriosGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public idTipoArchivo:number, 
    public idCategoria:number, 
    public idVigencia:number, 
    public NPAHTArchivo:string, 
    public Nombre:string, 
    public Descripcion:string, 
    public fechaArchivo:Date, 
    public fechaCarga:Date, 
    public id_TipoModeloOperacion:number, 
    public NombreResolucion:string, 
    public tamanoArchivo:string, 
    public sid_TipoModeloOperacion:string, 
    public sidCategoria:string, 
    public sidTipoArchivo:string, 
    public sidVigencia:string, 
    public DiferenciaHoras:string, 

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
  





