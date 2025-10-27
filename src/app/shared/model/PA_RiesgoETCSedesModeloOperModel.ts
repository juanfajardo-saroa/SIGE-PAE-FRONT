/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_RiesgoETCSedesModeloOper
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_RiesgoETCSedesModeloOperInterface {

        Id_Sede:number;
    Municipio:string;
    InstEducativa:string;
    Sede:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_RiesgoETCSedesModeloOperModel implements PA_RiesgoETCSedesModeloOperInterface {
    constructor(
  
        public Id_Sede:number, 
    public Municipio:string, 
    public InstEducativa:string, 
    public Sede:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





