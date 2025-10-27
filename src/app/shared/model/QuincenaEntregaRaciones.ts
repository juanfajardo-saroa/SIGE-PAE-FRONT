/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad QuincenaEntregaRaciones
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface QuincenaEntregaRacionesInterface {

        id:number;
    iD_EstadoQuincena:number;
    siD_EstadoQuincena:  string ; 
    iD_Contrato:number;
    siD_Contrato:  string ; 
    iD_GradoSedeJornada:number;
    siD_GradoSedeJornada:  string ; 
    auditoria:string;
    pathReporteQuincenal:string;
    fechaCarga:Date;
 
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
export class QuincenaEntregaRacionesModel implements QuincenaEntregaRacionesInterface {
    constructor(
  
        public id:number, 
    public iD_EstadoQuincena:number, 
    public siD_EstadoQuincena: string , 
    public iD_Contrato:number, 
    public siD_Contrato: string , 
    public iD_GradoSedeJornada:number, 
    public siD_GradoSedeJornada: string , 
    public auditoria:string, 
    public pathReporteQuincenal:string,
    public fechaCarga:Date,


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
  





