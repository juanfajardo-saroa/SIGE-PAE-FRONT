
 export interface NivelEducativoBySedeJornadaInterface {

    id:number;
nombre:string;
auditoria:string;

// atributos para gestión de auditoria del objeto
_ippublica: string;
_nombremaquina: string ;
_usuario: string ;
_ipdetrasproxy: string ;
_browser: string ;
_accion: string ;
_sessionid: string ;
_XMLAuditoria: string ;
// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

/**
* Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
*
* En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
*/
export class NivelEducativoBySedeJornadaModel implements NivelEducativoBySedeJornadaInterface {
constructor(

    public id:number, 
public nombre:string, 
public auditoria:string, 

// atributos para gestión de auditoria del objeto
public _ippublica: string,
public _nombremaquina: string,
public _usuario: string,
public _ipdetrasproxy: string,
public _browser: string,
public _accion: string,
public _sessionid: string,
public  _XMLAuditoria: string ,
// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}



