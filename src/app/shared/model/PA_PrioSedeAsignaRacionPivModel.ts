/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeAsignaRacionPiv
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PrioSedeAsignaRacionPivInterface {

     Jornada: string;
     Grado: string;
     id_gradosedeJornada:number;
     Matricula: number;
     m1_ComplementoAlmuerzo: number;
     m1_ComplementoAlmuerzoCualificado:number;
     m3_ComplementoAlmuerzoCualificado:number;
     m3_ComplementoAlmuerzo: number;

     TotalRaciones: number;



}

//Modelo constructor que implementa interface MAER
export class PA_PrioSedeAsignaRacionPivModel implements PA_PrioSedeAsignaRacionPivInterface {
    constructor(
        public Jornada: string,
        public Grado: string,
        public id_gradosedeJornada:number,
        public Matricula: number,
        public m1_ComplementoAlmuerzo: number,
        public m1_ComplementoAlmuerzoCualificado:number,
        public m3_ComplementoAlmuerzoCualificado:number,
        public m3_ComplementoAlmuerzo: number,
   
        public TotalRaciones: number,
    ) { }
}






