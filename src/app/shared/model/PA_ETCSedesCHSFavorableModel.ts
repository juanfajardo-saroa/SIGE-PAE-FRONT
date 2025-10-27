/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ETCSedesCHSFavorable
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ETCSedesCHSFavorableInterface {

        id_sede:number;
    Municipio:string;
    Institucion:string;
    Sede:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_ETCSedesCHSFavorableModel implements PA_ETCSedesCHSFavorableInterface {
    constructor(
  
        public id_sede:number, 
    public Municipio:string, 
    public Institucion:string, 
    public Sede:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





