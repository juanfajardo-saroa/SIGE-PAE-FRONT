/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_MatrizRiesgoModOper
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_MatrizRiesgoModOperInterface {

        id_sede:number;
    Municipio:string;
    InstEducativa:string;
    Sede:string;
    PriorizadaPAE:boolean;
    RacPreparadaSitio:number;
    RacIndustrializada:number;
    Catering:number;
    ColorRacPreparadaSitio:string;
    ColorRacIndustrializada:string;
    colorCatering:string;
    PAERural :boolean;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_MatrizRiesgoModOperModel implements PA_MatrizRiesgoModOperInterface {
    constructor(
  
        public id_sede:number, 
    public Municipio:string, 
    public InstEducativa:string, 
    public Sede:string, 
    public PriorizadaPAE:boolean, 
    public RacPreparadaSitio:number, 
    public RacIndustrializada:number, 
    public Catering:number, 
    public ColorRacPreparadaSitio:string, 
    public ColorRacIndustrializada:string, 
    public colorCatering:string, 
    public PAERural :boolean, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





