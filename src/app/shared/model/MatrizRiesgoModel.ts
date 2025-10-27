/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_DiagnosticoInfraEst
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface

export interface MatrizRiesgo {
    id_sede: number;
    municipio: string;
    instEducativa: string;
    sede: string;
    priorizadaPAE: boolean;
    paeRural: boolean;
    racPreparadaSitio: number;
    racIndustrializada: number;
    catering: number;
  }
  