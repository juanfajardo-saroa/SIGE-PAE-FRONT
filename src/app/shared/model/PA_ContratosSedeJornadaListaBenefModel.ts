/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosSedeJornadaListaBenef
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosSedeJornadaListaBenefInterface {

  id_Contrato?: number;
  id_Grado?: number;
  id_jornada?: number;
  Jornada?: string;
  Grado?: string;
  Benef_per_id?: number;
  Benef_Nombre?: string;



  // atributos adicionales genericos para gestión del objeto
  /* isValid: boolean;
  isSelected: boolean;
  completed: boolean; */
  
  }

//Modelo constructor que implementa interface
export class PA_ContratosSedeJornadaListaBenefModel implements PA_ContratosSedeJornadaListaBenefInterface {
    constructor(
  
      public id_Contrato ?: number,
      public id_Grado? : number,
      public id_jornada?:number,
      public Jornada?: string,
      public Grado?: string,
      public Benef_per_id?: number,
      public Benef_Nombre?: string,
  
  
      // atributos adicionales genericos para gestión del objeto
      /* public isValid: boolean = true,
      public isSelected: boolean = false,
      public completed: boolean = false */
  
    ){}
  }
  





