/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_QuincenaEntregaRacionesGetAll
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_QuincenaEntregaRacionesGetAllInterface {

        pathReporteQuincenal:string;
    fechaCarga:Date;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_QuincenaEntregaRacionesGetAllModel implements PA_QuincenaEntregaRacionesGetAllInterface {
    constructor(
  
        public pathReporteQuincenal:string, 
    public fechaCarga:Date, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





