/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_BuscarProductosPTN
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_BuscarProductosPTNInterface {

        ID_Producto:number;
    Producto:string;
    ID_GrupoAlimentos:number;
    GrupoAlimentos:string;
    ID_SubGrupoAlimentos:number;
    SubGrupoAlimentos:number;
    FechaRegistroProducto:Date;
    ID_EstadoRegistro:number;
    EstadoRegistro:string;
    ID_TipoProducto:number;
    TipoProducto:string;
    ColorEstado:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_BuscarProductosPTNModel implements PA_BuscarProductosPTNInterface {
    constructor(
  
        public ID_Producto:number, 
    public Producto:string, 
    public ID_GrupoAlimentos:number, 
    public GrupoAlimentos:string, 
    public ID_SubGrupoAlimentos:number, 
    public SubGrupoAlimentos:number, 
    public FechaRegistroProducto:Date, 
    public ID_EstadoRegistro:number, 
    public EstadoRegistro:string, 
    public ID_TipoProducto:number, 
    public TipoProducto:string, 
    public ColorEstado:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





