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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Visitas
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
export interface VisitasInterface {

        id:number;
    iD_Contrato:number;
    siD_Contrato:  string ; 
    iD_Sede:number;
    siD_Sede:  string ; 
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_UsuarioEntidad:number;
    siD_UsuarioEntidad:  string ; 
    iD_PlantaBodega:number;
    siD_PlantaBodega:  string ; 
    iD_EstadoVisita:number;
    siD_EstadoVisita:  string ; 
    iD_TipoVisita:number;
    siD_TipoVisita:  string ; 
    fecha:Date;
    horalnicio:Date;
    horaFin:Date;
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
export class VisitasModel implements VisitasInterface {
    constructor(
  
        public id:number, 
    public iD_Contrato:number, 
    public siD_Contrato: string , 
    public iD_Sede:number, 
    public siD_Sede: string , 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_UsuarioEntidad:number, 
    public siD_UsuarioEntidad: string , 
    public iD_PlantaBodega:number, 
    public siD_PlantaBodega: string , 
    public iD_EstadoVisita:number, 
    public siD_EstadoVisita: string , 
    public iD_TipoVisita:number, 
    public siD_TipoVisita: string , 
    public fecha:Date, 
    public horalnicio:Date, 
    public horaFin:Date, 
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
  





