/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad SedesModelosOperacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface SedesModelosOperacionInterface {

  id:number;
iD_sede:number;
siD_sede:  string ; 
iD_TipoModeloOperacion:number;
siD_TipoModeloOperacion:  string ; 
auditoria:string;
filtro:string;

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

//Modelo constructor que implementa interface
export class SedesModelosOperacionModel implements SedesModelosOperacionInterface {
constructor(

  public id:number, 
public iD_sede:number, 
public siD_sede: string , 
public iD_TipoModeloOperacion:number, 
public siD_TipoModeloOperacion: string , 
public auditoria:string, 
public filtro:string, 

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






