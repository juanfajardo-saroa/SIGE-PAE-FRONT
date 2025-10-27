/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeAsignaRacionPiv
/// Capa			    :SISPAE-Front
/// </Derechos_Reservados>

import { PA_PrioSedeAsignaRacionPivModel } from "src/app/shared/model/PA_PrioSedeAsignaRacionPivModel";

//Interface
export interface PA_PrioSedeAsignaRacionPivExtendInterface {

    m2_ComplementoAMPM: number,
    m1_ComplementoAMPM: number;
    m3_ComplementoAMPM: number;
}

//Modelo constructor que implementa interface MAEM
export class PA_PrioSedeAsignaRacionPivExtndModel extends PA_PrioSedeAsignaRacionPivModel implements PA_PrioSedeAsignaRacionPivExtendInterface {
        public m2_ComplementoAMPM: number;
    public m1_ComplementoAMPM: number;
    public m3_ComplementoAMPM: number;


}






