/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosIE
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosIEInterface {

        id:number;
    ID_TipoContratoCHIP:number;
    ID_TipoConceptoGasto:number;
    ID_ETC:number;
    ID_ET:number;
    ID_MinutaPatronAlimento:number;
    ID_Operador:number;
    ID_TipoCategoriaContrato:number;
    ID_EstadoContrato:number;
    ID_UTConsorcio:number;
    ID_PlanAlistamiento:number;
    ID_Vigencia:number;
    NumeroContrato:string;
    ObjetoContrato:string;
    ConAnticipo:boolean;
    FechalnicioContrato:Date;
    FechaFinalContrato:Date;
    Estado:boolean;
    auditoria:string;
    ValorTotalContrato:number;
    TipoContratoId:number;
    SubTipoContratoId:number;
    SuministroDesentralizadoId:number;
    ID_TipoModeloOperacion:number;
    ManejaPAEC:boolean;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_ContratosIEModel implements PA_ContratosIEInterface {
    constructor(
  
        public id:number, 
    public ID_TipoContratoCHIP:number, 
    public ID_TipoConceptoGasto:number, 
    public ID_ETC:number, 
    public ID_ET:number, 
    public ID_MinutaPatronAlimento:number, 
    public ID_Operador:number, 
    public ID_TipoCategoriaContrato:number, 
    public ID_EstadoContrato:number, 
    public ID_UTConsorcio:number, 
    public ID_PlanAlistamiento:number, 
    public ID_Vigencia:number, 
    public NumeroContrato:string, 
    public ObjetoContrato:string, 
    public ConAnticipo:boolean, 
    public FechalnicioContrato:Date, 
    public FechaFinalContrato:Date, 
    public Estado:boolean, 
    public auditoria:string, 
    public ValorTotalContrato:number, 
    public TipoContratoId:number, 
    public SubTipoContratoId:number, 
    public SuministroDesentralizadoId:number, 
    public ID_TipoModeloOperacion:number, 
    public ManejaPAEC:boolean, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





