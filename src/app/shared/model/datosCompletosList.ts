/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Contratos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface datosCompletosListInterface {
    quincena:string;
    totalRacionesProgramadas:number;
    racionesDiariasAsignadas:number;
    racionesDiariasaPreparar:number;
    racionesDiariasAlmuerzo:number;
    racionesDiariasComplemento:number;
    totalRacionesPreparadas:number;
    totalRacionesNoPreparadas:number;
    estadoQuincena:string;
}

//Modelo constructor que implementa interface
export class datosCompletosListModel implements datosCompletosListInterface {
    public quincena:string;
    public totalRacionesProgramadas:number;
    public racionesDiariasAsignadas:number;
    public racionesDiariasaPreparar:number;
    public racionesDiariasAlmuerzo:number;
    public racionesDiariasComplemento:number;
    public totalRacionesPreparadas:number;
    public totalRacionesNoPreparadas:number;
    public estadoQuincena:string;
}






