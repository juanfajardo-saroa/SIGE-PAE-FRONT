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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Proveedores
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
export interface ProveedoresInterface {

        id:number;
    iD_DivipolasProveedor:number;
    siD_DivipolasProveedor:  string ; 
    nombreRazonSocial:string;
    nit:string;
    numeroCedula:string;
    imagenCedulaPATH:string;
    correo:string;
    telefono:string;
    direccion:string;
    imagenRUTPath:string;
    nombreRepresentantelegalId:number;
    apellidoRepresentantelegalId:number;
    numeroIdentificacion:number;
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
export class ProveedoresModel implements ProveedoresInterface {
    constructor(
  
        public id:number, 
    public iD_DivipolasProveedor:number, 
    public siD_DivipolasProveedor: string , 
    public nombreRazonSocial:string, 
    public nit:string, 
    public numeroCedula:string, 
    public imagenCedulaPATH:string, 
    public correo:string, 
    public telefono:string, 
    public direccion:string, 
    public imagenRUTPath:string, 
    public nombreRepresentantelegalId:number, 
    public apellidoRepresentantelegalId:number, 
    public numeroIdentificacion:number, 
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
  





