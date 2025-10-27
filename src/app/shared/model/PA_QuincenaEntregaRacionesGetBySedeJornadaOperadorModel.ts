/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_QuincenaEntregaRacionesGetBySedeJornadaOperador
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_QuincenaEntregaRacionesGetBySedeJornadaOperadorInterface {

        idContrato:number;
    NumeroContrato:string;
    idDivipola:number;
    nombreDivipola:string;
    idInstitucionEducativa:number;
    nombreInstitucionEducativa:string;
    idSede:number;
    nombreSede:string;
    id:number;
    idJornada:number;
    nombreJornada:string;
    idEstadoQuincena:number;
    nombreEstadoQuincena:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_QuincenaEntregaRacionesGetBySedeJornadaOperadorModel implements PA_QuincenaEntregaRacionesGetBySedeJornadaOperadorInterface {
    constructor(
  
        public idContrato:number, 
    public NumeroContrato:string, 
    public idDivipola:number, 
    public nombreDivipola:string, 
    public idInstitucionEducativa:number, 
    public nombreInstitucionEducativa:string, 
    public idSede:number, 
    public nombreSede:string, 
    public id:number, 
    public idJornada:number, 
    public nombreJornada:string, 
    public idEstadoQuincena:number, 
    public nombreEstadoQuincena:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





