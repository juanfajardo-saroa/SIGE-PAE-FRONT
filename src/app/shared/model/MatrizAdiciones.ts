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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MatrizAdiciones
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
export interface MatrizAdicionesInterface {

        id:number;
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    iD_AlimentolCBF:number;
    siD_AlimentolCBF:  string ; 
    iD_Adicion:number;
    siD_Adicion:  string ; 
    iD_ComponentesAdicion:number;
    siD_ComponentesAdicion:  string ; 
    iD_TipoGrupoEtario:number;
    siD_TipoGrupoEtario:  string ; 
    codigoSIPSA:number;
    pesoNeto:number;
    pesoBruto:number;
    pesoServido:number;
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
export class MatrizAdicionesModel implements MatrizAdicionesInterface {
    constructor(
  
        public id:number, 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public iD_AlimentolCBF:number, 
    public siD_AlimentolCBF: string , 
    public iD_Adicion:number, 
    public siD_Adicion: string , 
    public iD_ComponentesAdicion:number, 
    public siD_ComponentesAdicion: string , 
    public iD_TipoGrupoEtario:number, 
    public siD_TipoGrupoEtario: string , 
    public codigoSIPSA:number, 
    public pesoNeto:number, 
    public pesoBruto:number, 
    public pesoServido:number, 
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
  





