/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_SedeJornadaMesSemana
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_BuscarPreparacionInterface {

  iD_ETC: number;
  iD_GrupoAlimentos:number;
  iD_SubGrupoAlimentos: number;
  iD_TipoPreparacion:number;
  iD_EstadoPreparacion: number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_BuscarPreparacionModel implements PA_BuscarPreparacionInterface {
    constructor(
  
     public iD_ETC: number,
     public iD_GrupoAlimentos:number,
    public  iD_SubGrupoAlimentos: number,
     public iD_TipoPreparacion:number,
     public iD_EstadoPreparacion: number,


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





