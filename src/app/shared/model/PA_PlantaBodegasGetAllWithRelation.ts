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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PlantaBodegasGetAllWithRelation
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
export interface PA_PlantaBodegasGetAllWithRelationInterface {

        id:number;
    ID_TipoPlantaBodega:number;
    ID_PlanAlistamiento:number;
    ID_Divipola:number;
    ID_EstadoPlantaBodega:number;
    Nombre:string;
    Direccion:string;
    Celular:string;
    NombreContacto:string;
    ApellidoContacto:string;
    Correo:string;
    sID_Divipola:string;
    sID_EstadoPlantaBodega:string;
    sID_TipoPlantaBodega:string;

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
export class PA_PlantaBodegasGetAllWithRelationModel implements PA_PlantaBodegasGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_TipoPlantaBodega:number, 
    public ID_PlanAlistamiento:number, 
    public ID_Divipola:number, 
    public ID_EstadoPlantaBodega:number, 
    public Nombre:string, 
    public Direccion:string, 
    public Celular:string, 
    public NombreContacto:string, 
    public ApellidoContacto:string, 
    public Correo:string, 
    public sID_Divipola:string, 
    public sID_EstadoPlantaBodega:string, 
    public sID_TipoPlantaBodega:string, 

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
  





