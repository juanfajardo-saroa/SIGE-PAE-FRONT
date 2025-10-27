/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_GetPreparacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_GetPreparacionInterface {

        Id_Preparacion:number;
    Preparacion:string;
    PreparacionMixta:number;
    PreparacionBebida:number;
    ModeloOperacion:number;
    ModalidadTipoRacion:number;
    TipoRacion:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_GetPreparacionModel implements PA_GetPreparacionInterface {
    constructor(
  
        public Id_Preparacion:number, 
    public Preparacion:string, 
    public PreparacionMixta:number, 
    public PreparacionBebida:number, 
    public ModeloOperacion:number, 
    public ModalidadTipoRacion:number, 
    public TipoRacion:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





