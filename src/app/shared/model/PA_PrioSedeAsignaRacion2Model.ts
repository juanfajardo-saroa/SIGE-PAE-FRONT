/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeAsignaRacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PrioSedeAsignaRacion2Interface {

  id_ETC: number;
  Id_TipoMunicipio: number;
  Id_Municipio: number;
  Id_InstEducativa: number;
  Id_sede: number;
  Id_Jornada: number;
  Id_NivelEducativo: number;
  Id_Zona: number;
  Id_CriterioVul: number;
  Id_EstadoPrio: number;
  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PrioSedeAsignaRacion2Model implements PA_PrioSedeAsignaRacion2Interface {
    constructor(
  
      public  id_ETC: number,
      public Id_TipoMunicipio: number,
      public Id_Municipio: number,
      public Id_InstEducativa: number,
      public Id_sede: number,
      public Id_Jornada: number,
      public Id_NivelEducativo: number,
      public Id_Zona: number,
      public Id_CriterioVul: number,
      public Id_EstadoPrio: number,

    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





