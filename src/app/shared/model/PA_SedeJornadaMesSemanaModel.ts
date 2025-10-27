/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_SedeJornadaMesSemana
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_SedeJornadaMesSemanaInterface {

        id_Municipio:number;
    municipio:string;
    id_InstEducativa:number;
    institEducativa:string;
    id_sede:number;
    sede:string;
    id_Jornada:number;
    jornada:string;
    numeroSemanas:number;
    semana_1:string;
    semana_2:string;
    semana_3:string;
    semana_4:string;
    semana_5:string;
    semana_6:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_SedeJornadaMesSemanaModel implements PA_SedeJornadaMesSemanaInterface {
    constructor(
  
        public id_Municipio:number, 
    public municipio:string, 
    public id_InstEducativa:number, 
    public institEducativa:string, 
    public id_sede:number, 
    public sede:string, 
    public id_Jornada:number, 
    public jornada:string, 
    public numeroSemanas:number, 
    public semana_1:string, 
    public semana_2:string, 
    public semana_3:string, 
    public semana_4:string, 
    public semana_5:string, 
    public semana_6:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





