/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionNivel4
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface GetCaracterizacionNivel4Interface {

        Categoria1erNivel:string;
    idCategoria2doNivel:string;
    Categoria2doNivel:string;
    IconoCategoria:string;
    idPregunta:number;
    Pregunta:string;
    IconoPregunta2doNivel:string;
    idEscala:number;
    NombreEscala:string;
    SI:number;
    NO:number;
    SI_CHSFAV:number;
    SI_CHSREQ:number;
    SI_CHSDESF:number;
    NO_NOCHS:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class GetCaracterizacionNivel4Model implements GetCaracterizacionNivel4Interface {
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
    public SI:number, 
    public NO:number, 
    public SI_CHSFAV:number, 
    public SI_CHSREQ:number, 
    public SI_CHSDESF:number, 
    public NO_NOCHS:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





