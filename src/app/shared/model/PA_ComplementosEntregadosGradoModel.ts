/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ComplementosEntregadosGrado
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ComplementosEntregadosGradoInterface {

        id_EntregaRacion:number;
    fecha:Date;
    complementosAsignados:number;
    complementosPreparados:number;
    EstadoReporte:string;
    colorEstado:string;
    justificacion:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_ComplementosEntregadosGradoModel implements PA_ComplementosEntregadosGradoInterface {
    constructor(
  
        public id_EntregaRacion:number, 
    public fecha:Date, 
    public complementosAsignados:number, 
    public complementosPreparados:number, 
    public EstadoReporte:string, 
    public colorEstado:string, 
    public justificacion:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





