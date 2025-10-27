/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosSedeJornadaRPI
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosSedeJornadaRPIInterface {

  id_IE?: number;
  id_divipola?: number;
  id_Contrato?: number;
  id_sede?: number;
  id_Grado?: number;
  id_jornada?: number;
  jornada?: string;
  grado?: string;
  almuerzoRPS?: number;
  compleRPS?: number;
  totalRacionesDia?: number;
  totalBeneficiarios?: number;
  matricula?: number;



  // atributos adicionales genericos para gestión del objeto
  /* isValid: boolean;
  isSelected: boolean;
  completed: boolean; */

}

//Modelo constructor que implementa interface
export class PA_ContratosSedeJornadaRPIModel implements PA_ContratosSedeJornadaRPIInterface {
  constructor(

    public id_sede ?: number,
    public id_IE ?: number,
    public id_Contrato ?: number,
    public id_divipola ?: number,
    public id_Grado? : number,
    public id_jornada?:number,
    public jornada?: string,
    public grado?: string,
    public almuerzoRPS?: number,
    public compleRPS?: number,
    public totalRacionesDia?: number,
    public totalBeneficiarios?: number,
    public matricula?: number,


    // atributos adicionales genericos para gestión del objeto
    /* public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false */

  ) { }
}






