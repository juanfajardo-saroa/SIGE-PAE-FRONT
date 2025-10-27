/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionNivel
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface GetCaracterizacionNivelInterface {

        categoria1erNivel:string;
    iconoCategoria:string;
    id:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class GetCaracterizacionNivelModel implements GetCaracterizacionNivelInterface {
    constructor(
  
        public categoria1erNivel:string, 
    public iconoCategoria:string, 
    public id:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





