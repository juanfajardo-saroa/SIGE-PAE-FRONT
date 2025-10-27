/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Ingresos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface IngresosInterface {
    
    id: number;
    sID: string;
    iD_ETC: number;
    iD_TipoIngreso: number;
    sID_TipoIngreso: string;
    iD_FuenteIngreso: number;
    sID_FuenteIngreso: string;
    iD_TipoModeloOperacion: number;
    sID_TipoModeloOperacion: string;
    iD_Vigencia: number;
    sID_Vigencia: string;
    valor: number;
    auditoria: string;
    filtro: string;
    // atributos para gestión de auditoria del objeto
    _ippublica: string;
    _nombremaquina: string;
    _usuario: string;
    _ipdetrasproxy: string;
    _browser: string;
    _accion: string;
    _sessionid: string;
    _XMLAuditoria: string;
    // atributos adicionales genericos para gestión del objeto
    isValid: boolean;
    isSelected: boolean;
    completed: boolean;

}

//Modelo constructor que implementa interface
export class IngresosModel implements IngresosInterface {
    constructor(

       
        public id: number,
        public sID: string,
        public iD_ETC: number,
        public iD_TipoIngreso: number,
        public sID_TipoIngreso: string,
        public iD_FuenteIngreso: number,
        public sID_FuenteIngreso: string,
        public iD_TipoModeloOperacion: number,
        public sID_TipoModeloOperacion: string,
        public iD_Vigencia: number,
        public  sID_Vigencia: string,
        public valor: number,
        public  auditoria: string,
        public filtro: string,
        // atributos para gestión de auditoria del objeto
        public _ippublica: string,
        public _nombremaquina: string,
        public _usuario: string,
        public _ipdetrasproxy: string,
        public _browser: string,
        public _accion: string,
        public _sessionid: string,
        public _XMLAuditoria: string,
        // atributos adicionales genericos para gestión del objeto
        public isValid: boolean = true,
        public isSelected: boolean = false,
        public completed: boolean = false

    ) { }
}

