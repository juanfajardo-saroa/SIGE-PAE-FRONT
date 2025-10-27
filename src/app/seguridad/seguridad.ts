export interface credencialesUsuario{
    password: string;
    documento:string;
    tipodocumento:string;
}

export interface respuestaAutenticacion {
    token: string;
    expiracion: Date;
    isAuthSuccessful: boolean;
    errorMessage: string;
    rol:string;
    email:string;
    privatekey:string;
    RolBase:string;
    RolPersonalizado:string;
    name:string;
    Ubicacion:string;
    RolUapa:string;
}



export interface usuarioDTO{
    id: string;
    email: string;
}


export interface perdidaPasswordDto {
  email: string;
  clientURI: string;
}
