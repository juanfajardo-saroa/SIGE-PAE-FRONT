/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeBeneficiarias
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ActualizaSedesPrioModeloOperInterface {

        id_ETC:number;
        id_TipoMunicipio:number;
        id_Divipola:number;
        iD_IE:number;
    id_sede:number;
    jor:number;
    nivel:number;
    zona:number;
    vulnerabilidad:number;
    id_EstadoPriorizacion:number;
    id_prioPAE:number;
    ModeloOper:number;
 
  }

//Modelo constructor que implementa interface
export class PA_ActualizaSedesPrioModeloOperModel implements PA_ActualizaSedesPrioModeloOperInterface {
    constructor(
  
     
     public id_ETC: number,
    public id_TipoMunicipio: number,
     public id_Divipola: number,
    public  iD_IE: number,
    public  id_sede: number,
     public jor: number,
     public nivel: number,
     public zona: number,
     public vulnerabilidad: number,
    public  id_EstadoPriorizacion: number,
    public id_prioPAE: number,
     public ModeloOper: number,


  
    ){}
 

  }
  





