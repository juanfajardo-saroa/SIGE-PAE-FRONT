/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PriorizacionesGetAllWithRel
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PriorizacionesGetAllWithRelInterface {

        id:number;
    ID_GradoSedeJornada:number;
    ID_TipoModalidadComplemento:number;
    ID_TipoModeloOperacion:number;
    ID_TipoComplemento:number;
    ID_TipoEstadoPriorizacion:number;
    NumeroComplementos:number;
    sID_TiposRacion:string;
    sID_TiposModeloOperacion:string;
    sID_TipoEstadoPriorizacion:string;
    sID_TipoModalidadComplemento:string;
    sID_Grado:string;
    sID_jornada:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PriorizacionesGetAllWithRelModel implements PA_PriorizacionesGetAllWithRelInterface {
    constructor(
  
        public id:number, 
    public ID_GradoSedeJornada:number, 
    public ID_TipoModalidadComplemento:number, 
    public ID_TipoModeloOperacion:number, 
    public ID_TipoComplemento:number, 
    public ID_TipoEstadoPriorizacion:number, 
    public NumeroComplementos:number, 
    public sID_TiposRacion:string, 
    public sID_TiposModeloOperacion:string, 
    public sID_TipoEstadoPriorizacion:string, 
    public sID_TipoModalidadComplemento:string, 
    public sID_Grado:string, 
    public sID_jornada:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





