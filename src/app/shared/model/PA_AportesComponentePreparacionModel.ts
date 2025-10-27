/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_AportesComponentePreparacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_AportesComponentePreparacionInterface {

  iD_TipoComponnete:number,
  componente:string,
  pesoNeto:number,
  iD_TipoModeloOperacion:number,
  iD_Complemento:number,
  iD_TipoNivelEducativo:number,

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_AportesComponentePreparacionModel implements PA_AportesComponentePreparacionInterface {
    constructor(
  
      public iD_TipoComponnete:number,
     public  componente:string,
     public  pesoNeto:number,
    public   iD_TipoModeloOperacion:number,
    public  iD_Complemento:number,
     public iD_TipoNivelEducativo:number,


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





