import { environment } from 'src/environments/environment';

type DescripcionContext = {
  sID_rol?: string | null;
  sID_User?: string | null;
  sID_ETC?: string | null;
};

/**
 * Determina si el usuario autenticado corresponde al rol UApA.
 */
export function esUsuarioUapa(): boolean {
  const rolBase = localStorage.getItem('RolBase');
  const keyBase = localStorage.getItem('KeyBase');
  const rolUapa = localStorage.getItem('RolUapa');
  const ubicacion = localStorage.getItem('Ubicacion');

  return (
    rolBase === environment.RolBaseUapa ||
    keyBase === environment.KeyBaseUapa ||
    rolUapa === 'Si' ||
    rolUapa === 'SI' ||
    ubicacion === 'UApA'
  );
}

/**
 * Construye la descripción que se muestra en las tablas de aprobaciones.
 * @param element Información con los campos relevantes (rol, usuario y ETC).
 * @param opciones Configuración adicional.
 *   - `forzarEtc`: fuerza a incluir la ETC aunque el usuario no sea UApA.
 */
export function construirDescripcionAprobacion(
  element: DescripcionContext,
  opciones: { forzarEtc?: boolean } = {}
): string {
  const rol = element.sID_rol || 'No disponible';
  const usuario = element.sID_User || 'No disponible';

  if (opciones?.forzarEtc || esUsuarioUapa()) {
    const etc = element.sID_ETC || 'ETC no asignada';
    return `${rol} - ${usuario} - ${etc}`;
  }

  return `${rol} - ${usuario}`;
}


