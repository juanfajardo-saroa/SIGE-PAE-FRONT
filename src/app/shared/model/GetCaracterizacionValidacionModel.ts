/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionValidacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface GetCaracterizacionValidacionInterface {

        Categoria1erNivel:string;
    idCategoria2doNivel:string;
    Categoria2doNivel:string;
    IconoCategoria:string;
    idPregunta:number;
    Pregunta:string;
    IconoPregunta2doNivel:string;
    idEscala:number;
    NombreEscala:string;
    OrdenPregunta:number;
    idPreguntaPadre:number;
    TercerNivel:number;
    id:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class GetCaracterizacionValidacionModel implements GetCaracterizacionValidacionInterface {
    constructor(
  
        public Categoria1erNivel:string, 
    public idCategoria2doNivel:string, 
    public Categoria2doNivel:string, 
    public IconoCategoria:string, 
    public idPregunta:number, 
    public Pregunta:string, 
    public IconoPregunta2doNivel:string, 
    public idEscala:number, 
    public NombreEscala:string, 
    public OrdenPregunta:number, 
    public idPreguntaPadre:number, 
    public TercerNivel:number, 
    public id:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





