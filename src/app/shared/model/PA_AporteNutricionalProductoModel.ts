/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_AporteNutricionalProducto
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_AporteNutricionalProductoInterface {

        ID_Componente:number;
    Componente:string;
    PesoNeto:number;
    ID_NivelEducativo:number;
    NivelEducativo:string;
    ID_Complemento:number;
    Complemento:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_AporteNutricionalProductoModel implements PA_AporteNutricionalProductoInterface {
    constructor(
  
        public ID_Componente:number, 
    public Componente:string, 
    public PesoNeto:number, 
    public ID_NivelEducativo:number, 
    public NivelEducativo:string, 
    public ID_Complemento:number, 
    public Complemento:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





