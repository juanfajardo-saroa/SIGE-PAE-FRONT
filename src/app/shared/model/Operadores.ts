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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Operadores
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
export interface OperadoresInterface {

        id:number;
    iD_TipoEstadoOperador:number;
    siD_TipoEstadoOperador:  string ; 
    iD_SubTipoRegistroMercantil:number;
    siD_SubTipoRegistroMercantil:  string ; 
    iD_Divipola:number;
    siD_Divipola:  string ; 
    iD_UsuarioEntidad:number;
    siD_UsuarioEntidad:  string ; 
    iD_Tipoldentificacion:number;
    siD_Tipoldentificacion:  string ; 
    nombreRazonSocial:string;
    nit:string;
    dV:number;
    rUTPath:string;
    nombreRepresentanteLegal:string;
    apellidoRepresentanteLegal:string;
    numeroldentificacion:number;
    correo:string;
    telefono:string;
    direccion:string;
    proveedorPAE:boolean;
    operadorMAER:boolean;
    certificadoMAERPath:string;
    operadorMAIP:boolean;
    operadorMAEM:boolean;
    operadorPAEC:boolean;
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
export class OperadoresModel implements OperadoresInterface {
    constructor(
  
        public id:number, 
    public iD_TipoEstadoOperador:number, 
    public siD_TipoEstadoOperador: string , 
    public iD_SubTipoRegistroMercantil:number, 
    public siD_SubTipoRegistroMercantil: string , 
    public iD_Divipola:number, 
    public siD_Divipola: string , 
    public iD_UsuarioEntidad:number, 
    public siD_UsuarioEntidad: string , 
    public iD_Tipoldentificacion:number, 
    public siD_Tipoldentificacion: string , 
    public nombreRazonSocial:string, 
    public nit:string, 
    public dV:number, 
    public rUTPath:string, 
    public nombreRepresentanteLegal:string, 
    public apellidoRepresentanteLegal:string, 
    public numeroldentificacion:number, 
    public correo:string, 
    public telefono:string, 
    public direccion:string, 
    public proveedorPAE:boolean, 
    public operadorMAER:boolean, 
    public certificadoMAERPath:string, 
    public operadorMAIP:boolean, 
    public operadorMAEM:boolean, 
    public operadorPAEC:boolean, 
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
  





