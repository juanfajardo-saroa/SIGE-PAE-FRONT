/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_OperadorContratos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_OperadorContratosInterface {

        id_contrato:number;
    NumeroContrato:string;
    ETC_Nombre:string;
    Municipio:string;
    TipoContrato:string;
    ModeloOper:string;
    operador:string;
  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_OperadorContratosModel implements PA_OperadorContratosInterface {
    constructor(
  
        public id_contrato:number, 
    public NumeroContrato:string, 
    public ETC_Nombre:string, 
    public Municipio:string, 
    public TipoContrato:string, 
    public ModeloOper:string, 
    public operador:string,


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





