/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PriorizacionesContratoGetAllWithRel
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PriorizacionesContratoGetAllWithRelInterface {

        id:number;
    ID_Contrato:number;
    ID_GradoSedeJornada:number;
    ID_TipoModelooperacion:number;
    ID_TipoModalidadComplemento:number;
    ID_TipoComplemento:number;
    NumeroComplementos:number;
    sID_TiposRacion:string;
    sID_Contratos:string;
    sID_TiposModeloOperacion:string;
    sID_TiposModalidadComplemento:string;
    sID_Grado:string;
    sID_jornada:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PriorizacionesContratoGetAllWithRelModel implements PA_PriorizacionesContratoGetAllWithRelInterface {
    constructor(
  
        public id:number, 
    public ID_Contrato:number, 
    public ID_GradoSedeJornada:number, 
    public ID_TipoModelooperacion:number, 
    public ID_TipoModalidadComplemento:number, 
    public ID_TipoComplemento:number, 
    public NumeroComplementos:number, 
    public sID_TiposRacion:string, 
    public sID_Contratos:string, 
    public sID_TiposModeloOperacion:string, 
    public sID_TiposModalidadComplemento:string, 
    public sID_Grado:string, 
    public sID_jornada:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





