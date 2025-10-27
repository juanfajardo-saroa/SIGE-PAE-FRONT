/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface fileUploadInterface {

    cnx:string;
    fileName:string;
    container:string ; 
    file:FormData;

}

//Modelo constructor que implementa interface
export class fileUploadModel implements fileUploadInterface {
constructor(

public cnx: string , 
public fileName: string , 
public container:string, 
public file: FormData
){}
}






