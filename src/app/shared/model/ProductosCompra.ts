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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad ProductosCompra
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
export interface ProductosCompraInterface {

        id:number;
    iD_CompraLocal:number;
    siD_CompraLocal:  string ; 
    iD_TipoProductoCompraLocal:number;
    siD_TipoProductoCompraLocal:  string ; 
    iD_Alimento:number;
    siD_Alimento:  string ; 
    iD_TipoAlimento:number;
    siD_TipoAlimento:  string ; 
    iD_SubTipoAlimento:number;
    siD_SubTipoAlimento:  string ; 
    iD_MunicipioAdquiereServicio:number;
    siD_MunicipioAdquiereServicio:  string ; 
    descripcionProducto:string;
    descripcionServicio:string;
    cantidadComprada:number;
    precioUnidad:number;
    precioTotal:number;
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
export class ProductosCompraModel implements ProductosCompraInterface {
    constructor(
  
        public id:number, 
    public iD_CompraLocal:number, 
    public siD_CompraLocal: string , 
    public iD_TipoProductoCompraLocal:number, 
    public siD_TipoProductoCompraLocal: string , 
    public iD_Alimento:number, 
    public siD_Alimento: string , 
    public iD_TipoAlimento:number, 
    public siD_TipoAlimento: string , 
    public iD_SubTipoAlimento:number, 
    public siD_SubTipoAlimento: string , 
    public iD_MunicipioAdquiereServicio:number, 
    public siD_MunicipioAdquiereServicio: string , 
    public descripcionProducto:string, 
    public descripcionServicio:string, 
    public cantidadComprada:number, 
    public precioUnidad:number, 
    public precioTotal:number, 
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
  





