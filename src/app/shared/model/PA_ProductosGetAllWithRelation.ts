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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ProductosGetAllWithRelation
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
export interface PA_ProductosGetAllWithRelationInterface {

        id:number;
    ID_SubGrupoAlimentos:number;
    ID_ETC:number;
    ID_TiposAlimentos:number;
    ID_TiposUnidad:number;
    ID_RegistroINVIMA:number;
    Nombre:string;
    NumeroRegistroInvima:string;
    PathlmagenProducto:string;
    PathlmagenRegistroSanitario:string;
    BaseFruta:string;
    PathImagenInformacionNutricional:string;
    FechaRegistro:Date;
    sID_EstadoRegistro:string;
    sID_ETC:string;
    sID_SubGrupoAlimentos:string;
    sID_TiposAlimentos:string;

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
export class PA_ProductosGetAllWithRelationModel implements PA_ProductosGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_SubGrupoAlimentos:number, 
    public ID_ETC:number, 
    public ID_TiposAlimentos:number, 
    public ID_TiposUnidad:number, 
    public ID_RegistroINVIMA:number, 
    public Nombre:string, 
    public NumeroRegistroInvima:string, 
    public PathlmagenProducto:string, 
    public PathlmagenRegistroSanitario:string, 
    public BaseFruta:string, 
    public PathImagenInformacionNutricional:string, 
    public FechaRegistro:Date, 
    public sID_EstadoRegistro:string, 
    public sID_ETC:string, 
    public sID_SubGrupoAlimentos:string, 
    public sID_TiposAlimentos:string, 

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
  





