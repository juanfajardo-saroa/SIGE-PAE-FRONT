export class LocalStorageJwt {
	static readonly LS_ACCES_TOKEN_PRIVATE = 'F7peYX7825YkwztCxgytCBF4yExvu4TK4mN8DLUtsVIOlk6a3V5jabYjFhGf';
  static readonly LS_USER_TOKEN = 'SISPAE';

}

export class LocalStorage{
  static getAuditoria(accion){
    return "{'RolBase':'" + localStorage.getItem("RolBase") + "'}," +
            "{'RolPersonalizado':'" + localStorage.getItem("RolPersonalizado")+"'}," +
            "{'NombreUsuario':'" + localStorage.getItem("NombreUsuario")+"'},"+
            "{'Ubicacion':'" + localStorage.getItem("Ubicacion") + "'}," +
            "{'IpPublica':'" + localStorage.getItem("IpPublica") + "'}," +
            "{'Accion':'" + accion +"'},"+
            "{'Browser':'" + localStorage.getItem("Browser") + "'}," +
            "{'NombreMaquina':'" + localStorage.getItem("NombreMaquina") + "'}";
  }
}
