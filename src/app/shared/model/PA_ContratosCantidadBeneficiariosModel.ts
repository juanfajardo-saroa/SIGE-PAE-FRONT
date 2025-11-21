/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosCantidadBeneficiarios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosCantidadBeneficiariosInterface {

  id_sede ?: number;
  id_IE ?: number;
  id_divipola?: number;
  id_Contrato?: number;
  municipio?: string;
  institucionEdu?: string;
  sedeEducativa?: string;
  codigoDane?: string;
  matricula?: number;
  racionesDiaria?: number;
  totalBeneficiarios?: number;



  // atributos adicionales genericos para gestión del objeto
  /* isValid: boolean;
  isSelected: boolean;
  completed: boolean; */
  
  }

//Modelo constructor que implementa interface
export class PA_ContratosCantidadBeneficiariosModel implements PA_ContratosCantidadBeneficiariosInterface {
    constructor(
  
      public id_sede ?: number,
      public id_IE ?: number,
      public id_Contrato ?: number,
      public id_divipola ?: number,
      public municipio ?: string,
      public institucionEdu ?: string,
      public sedeEducativa ?: string,
      public codigoDane ?: string,
      public matricula ?: number,
      public racionesDiaria ?: number,
      public totalBeneficiarios ?: number,
  
  
      // atributos adicionales genericos para gestión del objeto
      /* public isValid: boolean = true,
      public isSelected: boolean = false,
      public completed: boolean = false */
  
    ){}
  }
  





