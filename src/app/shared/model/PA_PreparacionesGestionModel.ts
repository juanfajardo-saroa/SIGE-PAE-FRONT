/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PreparacionesGestion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PreparacionesGestionInterface {

        ID_Preparacion:number;
    NombrePreparacion:string;
    FechaPreparacion:Date;
    ID_GrupoAlimentos:number;
    ID_SubgrupoAlimentos:number;
    ID_TipoPreparacion:number;
    ID_ModeloOperacion:number;
    TipoPreparacion:string;
    ModeloOperacion:string;
    ID_EstadoPreparacion:number;
    ColorEstadoPreparacion:string;
    EstadoPreparacion:string;
    ComplementosAplica:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PreparacionesGestionModel implements PA_PreparacionesGestionInterface {
    constructor(
  
        public ID_Preparacion:number, 
    public NombrePreparacion:string, 
    public FechaPreparacion:Date, 
    public ID_GrupoAlimentos:number, 
    public ID_SubgrupoAlimentos:number, 
    public ID_TipoPreparacion:number, 
    public ID_ModeloOperacion:number, 
    public TipoPreparacion:string, 
    public ModeloOperacion:string, 
    public ID_EstadoPreparacion:number, 
    public ColorEstadoPreparacion:string, 
    public EstadoPreparacion:string, 
    public ComplementosAplica:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





