/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad NivelEducativoGetAllBySedeJornada
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface NivelEducativoGetAllBySedeJornadaInterface {

  id:number;
  nombre:string;
  auditoria:string;
  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class NivelEducativoGetAllBySedeJornadaModel implements NivelEducativoGetAllBySedeJornadaInterface {
    constructor(
  
      public id:number, 
      public nombre:string, 
      public auditoria:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





