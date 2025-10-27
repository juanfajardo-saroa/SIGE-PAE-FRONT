/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_FechasQuincenaRaciones
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_FechasQuincenaRacionesInterface {

        FechaInicio:string;
    FechaFin:string;
    Quincena:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_FechasQuincenaRacionesModel implements PA_FechasQuincenaRacionesInterface {
    constructor(
  
        public FechaInicio:string, 
    public FechaFin:string, 
    public Quincena:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





