/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosSedeJornadaBeneficiarios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosSedeJornadaBeneficiariosInterface {

  id_sede?: number;
  id_IE?: number;
  id_divipola?: number;
  id_Contrato?: number;
  municipio?: string;
  institucionEdu?: string;
  sedeEducativa?: string;
  codigoDane?: string;
  jornada?: string;
  almuerzoRPS?: number;
  compleRPS?: number;
  compleRI?: number;
  almuerzoCatering?: number;
  compCatering?: number;
  totalRacionesDia?: number;



  // atributos adicionales genericos para gestión del objeto
  /* isValid: boolean;
  isSelected: boolean;
  completed: boolean; */
}

//Modelo constructor que implementa interface
export class PA_ContratosSedeJornadaBeneficiariosModel implements PA_ContratosSedeJornadaBeneficiariosInterface {
  constructor(

    public id_sede?: number,
    public id_IE?: number,
    public id_Contrato?: number,
    public id_divipola?: number,
    public municipio?: string,
    public institucionEdu?: string,
    public sedeEducativa?: string,
    public codigoDane?: string,
    public jornada?: string,
    public almuerzoRPS?: number,
    public compleRPS?: number,
    public compleRI?: number,
    public almuerzoCatering?: number,
    public compCatering?: number,
    public totalRacionesDia?: number,


    // atributos adicionales genericos para gestión del objeto
    /* public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false */

  ) { }
}






