/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Contratos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface fechasQuincenaListInterface {

    fechaInicio:Date;
    fechaFin:Date;
    quincena:String;
}

//Modelo constructor que implementa interface
export class fechasQuincenaListModel implements fechasQuincenaListInterface {
    public fechaInicio:Date;
    public fechaFin:Date;
    public quincena:String;
}






