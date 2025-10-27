/// <Derechos_Reservados>
/// Aplicacion		::aplicacion
/// Autor			::autor
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			    ::ano
/// Arquitectura	:Modelo Base de Angular para la Entidad :tabla
/// Capa			:PProyectoGenerado-Front
/// </Derechos_Reservados>

export interface  SedesInterface {




  sID: string ;
  id: number ;
  iD_lE: number ;
  sID_lE: string ;
  iD_Zona: number;
  sID_Zona: string ;
  iD_GrupoAnalisis: number ;
  sID_GrupoAnalisis: string;
  iD_ETC: number  ;
  sID_ETC: string ;
  iD_Divipola: number ;
  sID_Divipola: string;
  codigoDane: string ;
  nombre: string ;
  direccion: string  ;
  telefono: string   ;
  etnico: boolean ;
  priorizacionPAE: boolean ;
  auditoria: string ;
  filtro: string   ;
  _ippublica: string;
  _nombremaquina: string ;
  _usuario: string ;
  _ipdetrasproxy: string ;
  _browser: string ;
  _accion: string ;
  _sessionid: string ;
   _XMLAuditoria: string ;


  isValid: boolean;
  isSelected: boolean;
  status: string ;
  completed: boolean ;



}


export class SedesModel  implements SedesInterface {
  constructor(



  public sID: string =  '',
  public id: number = 0,
  public iD_lE: number = 2,
  public sID_lE: string =  '',
  public iD_Zona: number = 2,
  public sID_Zona: string =  '',
  public iD_GrupoAnalisis: number = 1,
  public sID_GrupoAnalisis: string =  '',
  public iD_ETC: number = 2,
  public sID_ETC: string =  '',
  public iD_Divipola: number = 1,
  public sID_Divipola: string =  '',
  public codigoDane: string =  '110101',
  public nombre: string =  'consumo api rest',
  public direccion: string =  'direcccion api rest',
  public telefono: string =  '3103209585',
  public etnico: boolean = true,
  public priorizacionPAE: boolean =true,
  public auditoria: string =  'sin contenido',
  public filtro: string =  '',
  public _ippublica: string =  '10.25.25.69',
  public _nombremaquina: string =  'papa',
  public _usuario: string =  'oscar',
  public _ipdetrasproxy: string =  '10.10.20.20',
  public _browser: string =  'Chrome',
  public _accion: string =  'defecto',
  public _sessionid: string ='1',
  public  _XMLAuditoria: string ='',


  public isValid: boolean=true,
  public isSelected: boolean = false,
  public status: string = '',
  public completed: boolean = false

  ){}





}

