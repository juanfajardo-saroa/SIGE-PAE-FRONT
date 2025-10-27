import { PtnAprCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-apro/ptn-apr-cicl/ptn-apr-cicl.component';
import { PtnAprPreComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-aprobaciones/ptn-apr-pre/ptn-apr-pre.component';
import { TabPriorizacionDetalleComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/tab-priorizacion-detalle/tab-priorizacion-detalle.component';
import { EsCentroAcopioGuard, EsZonasETCGuard, EsPTNProductosGuard, EsPTNPrepararacionGuard, EsPTNCiclosGuard, EsParametrosGuaRD, EsTablerosUapaGuaRD, EsInformacionETCUapaGuaRD } from './../auth.guard';
import { ListSedesComponent } from './Componentes-sige-pae/Sedes/list-Sedes-component/list-Sedes.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/recursos/gestionusuarios/usuarios/usuarios.component';
import { ResumenSedesComponent } from '../pages/components/planeacion-inicio/caracterizacion-sedes-educativas/resumen-sedes/resumen-sedes.component';
import { DetalleSedesComponent } from '../pages/components/planeacion-inicio/caracterizacion-sedes-educativas/detalle-sedes/detalle-sedes.component';
import { TrayectosComponent } from '../pages/components/planeacion-inicio/caracterizacion-sedes-educativas/detalle-sedes/trayectos/trayectos.component';
import { RegistroOperadoresComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-operadores/registro-operadores.component';
import { DotacionEquiposComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/dotacion-equipos/dotacion-equipos.component';
import { RegistroUnicoContratosDescentralizadoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-unico-contratos-descentralizado/registro-unico-contratos-descentralizado.component';
import { ConvenioComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/convenio/convenio.component';
import { LogisticaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/logistica/logistica.component';
import { ServiciosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/servicios/servicios.component';
import { FuentesFinanciacionComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/fuentes-financiacion.component';
import { CostosCoberturaFinancieraComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/costos-cobertura-financiera/costos-cobertura-financiera.component';

import { AsignacionRecursosComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/asignacion-recursos/asignacion-recursos.component';
import { MinutaMaemComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-patron/maem/maem.component';
import { MaerComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-patron/maer/maer.component';
import { MinutasExcepcionalComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-excepcional/minutas-excepcional.component';
import { RegistroContratosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-contratos.component';
import { RegistroAlistamientoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-alistamiento/registro-alistamiento.component'
import { ProgramaAnualCajaComponent } from './components/contratacion-alistamiento/programa-anual-caja/programa-anual-caja.component';
import { PriorizacionComponent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/resumen-sedes/priorizacion/priorizacion.component'
import { DialogForgotPassword, LoginComponent } from '../seguridad/login/login.component';
import { RolesComponent } from './components/recursos/gestionroles/roles/roles.component';
import { ResumenEtcComponent } from './Componentes-sige-pae/Sedes/resumen-etc/resumen-etc.component';
import { AprobacionesPlaneacionEInicioComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-planeacion-e-inicio/aprobaciones-planeacion-e-inicio.component';
import { AprobacionesContratacionYAlistamientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-contratacion-y-alistamiento/aprobaciones-contratacion-y-alistamiento.component';
import { AprobacionesEjecucionYSeguimientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-ejecucion-y-seguimiento/aprobaciones-ejecucion-y-seguimiento.component';
import { AprobacionesCierreYEvaluacionComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-cierre-y-evaluacion/aprobaciones-cierre-y-evaluacion.component';
import { InicioComponent } from './Componentes-sige-pae/_Inicio/inicio.component';
import { IniciosgnComponent } from './Componentes-sige-pae/_Iniciosgn/iniciosgn.component';
import { DocumentacionComponent } from './Componentes-sige-pae/_documentacion/documentacion.components';
import {
  EsAdminGuard, AuthGuard, EsAccesoMenusGuard, EsNotificacionesGuard, EsSedesGuard, EsResumenETCGuard,
  EsAccesoSedesGuard, EsMinutaMaemGuard, EsMinutaMaerGuard, EsMinutaExcepcionalGuard, EsMatrizRiegosGuard,
  EsCalendarioPAEGuard, EsAsignacionRecursosGuard, EsFinanciacionGuard, EsPlanGirosGuard,
  EsRegistroContratosGuard, EsRegistroOperadoresGuard, EsSeguridadUsuariosGuard, EsSeguridadRolesGuard,
  EsSeguridadModulosGuard, EsSeguridadPermisosGuard, EsSeguridadAuditoriaGuaRD, EsAprobacionesGuard,
  EsLiquidacionContratosGuard, EsEntregaRacionesViveresGuard, EsEncuestaCostosGuard, EsCotizacionMenuGuard, EsContratosAlistamientoGuard,
  EsRepositorioGuard, EsTrayectosGuard, EsPriorizacionGuard, EsVigenciasGuard, EsPACETCGuard, EsProgramaAnualCajaGuard, EsBeneficiarioRacionesGuard, EsMinutaPaecGuard,
  EsAsignacionRacionesGuard, EsCriteriosPriorizacionsGuard, EsGestionExcedentessGuard, EsSeguimientoComplementosGuard,
  EsBolsaComunGuard, EsCostosCoberturaComunGuard
} from '../auth.guard';

import { ListTablasAuditoriaComponent } from './Componentes-sige-pae/TablasAuditoria/list-TablasAuditoria-component/list-TablasAuditoria.component';
import { ListVigenciasComponent } from './Componentes-sige-pae/Vigencias/list-Vigencias-component/list-Vigencias.component';
import { MatrizRiesgoMaemComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maem/matriz-riesgo-maem.component';
import { MatrizRiesgoMaerComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maer/matriz-riesgo-maer.component';
import { MatrizRiesgoMaipComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maip/matriz-riesgo-maip.component';
import { MatrizRiesgoPaecComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-paec/matriz-riesgo-paec.component';
import { MatrizRiesgoDetalleComponent } from './Componentes-sige-pae/Sedes/matriz-riesgo-detalle/matriz-riesgo-detalle.component';
import { MatrizRiesgoComponent } from './Componentes-sige-pae/Sedes/matriz-riesgo/matriz-riesgo.component';
import { ResumenEtcMatrizRiesgoComponent } from './Componentes-sige-pae/Sedes/resumen-etc-matriz-riesgo/resumen-etc-matriz-riesgo.component';
import { DetalleSedeFormularioComponent } from './Componentes-sige-pae/Sedes/detalle-sede-formulario/detalle-sede-formulario.component';
import { ListRepositoriosExtendComponent } from './Componentes-sige-pae/Repositorios/list-Repositorios-Extend-component/list-Repositorios-Extend.component';
import { ListModuloComponent } from './Componentes-sige-pae/Modulo/list-Modulo-component/list-Modulo.component';
import { ListRolPermisosComponent } from './Componentes-sige-pae/RolPermisos/list-RolPermisos-component/list-RolPermisos.component';
import { ResetPasswordComponent } from '../seguridad/authentication/reset-password/reset-password.component';
import { PermisosComponent } from './Componentes-sige-pae/RolPermisos/permisos-component/permisos.component';
import { SinPermisosComponent } from './Componentes-sige-pae/_sinPermisos/SinPermisos.components';
import { ListMenuComponent } from './Componentes-sige-pae/Menu/list-Menu-component/list-Menu.component';
import { enConstrucionComponent } from './Componentes-sige-pae/_enConstruccion/enConstrucion.components';
import { SistemasComponent } from '../theme/components/navbar/sistemas.component';
import { MenubarComponent } from '../theme/components/menubar/menubar.component';
import { NotFoundComponent } from './Componentes-sige-pae/_notFound/NotFound.components';
import { ListPriorizacionesComponent } from './Componentes-mi-pae/Priorizaciones/list-Priorizaciones-component/list-Priorizaciones.component';
import { PriorizacionNovedadesComponent } from './Componentes-mi-pae/Priorizaciones/list-Priorizaciones-component/priorizacion-novedades/priorizacion-novedades.component';
import { ConsultaBeneficiariosYRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/consulta-beneficiarios-y-raciones.component';
import { BeneficiariosComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/beneficiarios/beneficiarios.component';
import { ListadoRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/listado-raciones/listado-raciones.component';
import { VerDetalleBeneficiarioRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/ver-detalle-beneficiario-raciones/ver-detalle-beneficiario-raciones.component';
import { TabsedesComponent } from './Componentes-sige-pae/Sedes/tabsedes/tabsedes.component';
import { CustomSedesBeneficiariasComponent } from './Componentes-mi-pae/SedesBeneficiarias/list-SedesBeneficiarias-component/custom-sedes-beneficiarias/custom-sedes-beneficiarias.component';
import { CustomAsignacionRacionesComponent } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones/custom-asignacion-raciones.component';
import { GestionExcedentesComponent } from './Componentes-mi-pae/GestionExcedentes/gestion-excedentes/gestion-excedentes.component';
import { ListQuincenaEntregaRacionesExtendComponent } from './Componentes-mi-pae/QuincenaEntregaRaciones/list-QuincenaEntregaRacionesExtend-component/list-QuincenaEntregaRacionesExtend.component';
import { TabsQuincenaDetalleComponent } from './Componentes-mi-pae/QuincenaEntregaRaciones/tabsQuincena/tabs-quincena-detalle/tabs-quincena-detalle.component';
import { CustomCriteriosPriorizacionComponent } from './Componentes-mi-pae/CriteriosPriorizacion/custom-criterios-priorizacion/custom-criterios-priorizacion.component';
import { CustomAsignacionRacionesSedeComponent } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones-sede/custom-asignacion-raciones-sede.component';
import { ContratosSupervisionComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/contratos-supervision/contratos-supervision.component';
import { RegistroUnicoContratosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-unico-contratos/registro-unico-contratos.component';
import { SuministroDiaVigenciaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-dia-vigencia/suministro-dia-vigencia.component';
import { ListCentroDeAcopioComponent } from './Componentes-sige-pae/CentroDeAcopio/list-CentroDeAcopio-component/list-CentroDeAcopio.component';
import { ListZonaETCComponent } from './Componentes-sige-pae/ZonaETC/list-ZonaETC-component/list-ZonaETC.component';
import { RepositoriosCircularesComponent } from './Componentes-sige-pae/Repositorios/repositorios-circulares/repositorios-circulares.component';
import { RepositoriosLineamientosComponent } from './Componentes-sige-pae/Repositorios/repositorios-lineamientos/repositorios-lineamientos.component';
import { RepositoriosDocumentosComponent } from './Componentes-sige-pae/Repositorios/repositorios-documentos/repositorios-documentos.component';
import { RepositoriosNormatividadComponent } from './Componentes-sige-pae/Repositorios/repositorios-normatividad/repositorios-normatividad.component';
import { RepositoriosInteresComponent } from './Componentes-sige-pae/Repositorios/repositorios-interes/repositorios-interes.component';
import { GestionExcedentesDetalleComponent } from './Componentes-mi-pae/GestionExcedentes/gestion-excedentes/gestion-excedentes-detalle/gestion-excedentes-detalle.component';
import { SeguimientoComplementosComponent } from './Componentes-mi-pae/seguimiento-complementos/seguimiento-complementos.component';
import { SeguimientoComplementosDetailComponent } from './Componentes-mi-pae/seguimiento-complementos-detail/seguimiento-complementos-detail.component';
import { RepositoriosCircularesUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-circulares-uapa/repositorios-circulares-uapa.component';
import { RepositoriosLineamientosUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-lineamientos-uapa/repositorios-lineamientos-uapa.component';
import { RepositoriosDocumentosUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-documentos-uapa/repositorios-documentos-uapa.component';
import { RepositoriosNormatividadUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-normatividad-uapa/repositorios-normatividad-uapa.component';
import { RepositoriosInteresUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-interes-uapa/repositorios-interes-uapa.component';
import { CriteriosPriorizacionUapaComponent } from './Componentes-sgn-UAPA/criterios-priorizacion-uapa/criterios-priorizacion-uapa.component';
import { AprobacionesPedientesUapaComponent } from './Componentes-sgn-UAPA/Aprobaciones/aprobaciones-pedientes-uapa/aprobaciones-pedientes-uapa.component';
import { PTNProductosComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/ptn-productos.component';
import { RegistroProductoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/registro-producto/registro-producto.component';
import { ProductoMateriaPrimaComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/producto-materia-prima/producto-materia-prima.component';
import { ProductoComplementoIndustrializadoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/producto-complemento-industrializado/producto-complemento-industrializado.component';
import { AprobacionProductoMateriaPrimaComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/aprobacion-producto-materia-prima/aprobacion-producto-materia-prima.component';
import { AprobacionProductoComplementoIndustrializadoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/aprobacion-producto-complemento-industrializado/aprobacion-producto-complemento-industrializado.component';
import { PTNPreparacionesComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-preparaciones.component';
import { PTNCiclosDeMenuComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclos-de-menu.component';
import { NotificacionesComponent } from './Componentes-sige-pae/Notificaciones/notificaciones/notificaciones.component';
import { ListPlanGirosComponent } from './Componentes-sgn-UAPA/PlanGiros/list-PlanGiros-component/list-PlanGiros.component';
import { MinutaPatronMaemComponent } from './components/minutas/minuta-patron-maem/minuta-patron-maem.component';
import { MinutaPatronMaerComponent } from './components/minutas/minuta-patron-maer/minuta-patron-maer.component';
import { CalendarioPaeComponent } from './components/calendario-pae/calendario-pae.component';
import { PtnRegPreComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-disponible/ptn-reg-pre/ptn-reg-pre.component';
import { PtnDisregistroComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disregistro/ptn-disregistro.component';
import { SuministroRuralComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-rural/suministro-rural.component';
import { PlanAlistamientoInicioOperacionComponent } from './components/contratacion-alistamiento/plan-alistamiento-inicio-operacion/plan-alistamiento-inicio-operacion.component';
import { PtnDispVerCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disp-ver-cicl/ptn-disp-ver-cicl.component';
import { BolsaComunTablaComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/bolsa-comun/tabla/bolsa-comun-tabla.component';
import { PlanAlistamientoMenuComponent } from './components/contratacion-alistamiento/plan-alistamiento-menu/plan-alistamiento-menu.component';
import { ListParametroComponent } from './Componentes-sige-pae/Parametro/list-Parametro-component/list-Parametro.component';
import { InformacionETCComponent } from './Componentes-sgn-UAPA/informacion-etc/informacion-etc.component';
import { TablerosuapaComponent } from './Componentes-sgn-UAPA/tablerosuapa/tablerosuapa.component';
import { ListSeguridadELMAH_ErrorComponent } from './Componentes-sige-pae/SeguridadELMAH_Error/list-SeguridadELMAH_Error-component/list-SeguridadELMAH_Error.component';

const routes: Routes = [
  //Generales
  { path: '', component: LoginComponent, }, //LoginComponent
  { path: 'Inicio', component: InicioComponent, },
  { path: 'inicio', component: InicioComponent, },
  { path: 'Iniciosgn', component: IniciosgnComponent, },
  { path: 'iniciosgn', component: IniciosgnComponent, },
  { path: 'inicial', component: DocumentacionComponent, },
  { path: 'help', redirectTo: '/documentation/doc.html', pathMatch: 'full' },
  { path: 'SinPermisos', component: SinPermisosComponent, },
  { path: 'Login', component: LoginComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'forgot', component: DialogForgotPassword, },
  { path: 'reset', component: ResetPasswordComponent, },
  { path: 'menu', component: MenubarComponent, },
  { path: 'errores', component: ListSeguridadELMAH_ErrorComponent, },

  //Negocio sigepae
  { path: 'Sedes', component: ListSedesComponent, canActivate: [EsSedesGuard] },
  { path: 'detalle-sedes/:Id', component: DetalleSedesComponent, canActivate: [EsSedesGuard] },
  { path: 'Sedes/:tab', component: TabsedesComponent, canActivate: [EsSedesGuard] },
  { path: 'DetalleSede', component: DetalleSedeFormularioComponent, canActivate: [EsSedesGuard] },
  { path: 'ResumenETC', component: ResumenEtcComponent, canActivate: [EsResumenETCGuard] },
  { path: 'CentroAcopio', component: ListCentroDeAcopioComponent, canActivate: [EsCentroAcopioGuard] },
  { path: 'ZonasEtc', component: ListZonaETCComponent, canActivate: [EsZonasETCGuard] },
  { path: 'resumen-sedes', component: ResumenSedesComponent, canActivate: [EsAccesoSedesGuard] },
  { path: 'minuta-patron-maem', component: MinutaPatronMaemComponent, canActivate: [EsMinutaMaemGuard] },
  { path: 'minuta-patron-maer', component: MinutaPatronMaerComponent, canActivate: [EsMinutaMaerGuard] },
  { path: 'minuta-excepcional', component: MinutasExcepcionalComponent, canActivate: [EsMinutaExcepcionalGuard] },
  { path: 'matriz-riesgo', component: MatrizRiesgoComponent, canActivate: [EsSedesGuard] },
  { path: 'matriz-riesgo-detalle', component: MatrizRiesgoDetalleComponent, canActivate: [EsSedesGuard] },
  { path: 'resumen-etc-matriz-riesgo', component: ResumenEtcMatrizRiesgoComponent, canActivate: [EsSedesGuard] },
  { path: 'PriorizacionDetalle', component: TabPriorizacionDetalleComponent, canActivate: [EsSedesGuard] },
  { path: 'matriz-riesgo-maer', component: MatrizRiesgoMaerComponent, canActivate: [EsResumenETCGuard] },
  { path: 'matriz-riesgo-maem', component: MatrizRiesgoMaemComponent, canActivate: [EsResumenETCGuard] },
  { path: 'matriz-riesgo-maip', component: MatrizRiesgoMaipComponent, canActivate: [EsResumenETCGuard] },
  { path: 'matriz-riesgo-paec', component: MatrizRiesgoPaecComponent, canActivate: [EsResumenETCGuard] },
  { path: 'calendario-pae', component: CalendarioPaeComponent, canActivate: [EsCalendarioPAEGuard] },
  { path: 'asignacionrecursos', component: AsignacionRecursosComponent, canActivate: [EsAsignacionRecursosGuard] },
  { path: 'Bolsacomun', component: BolsaComunTablaComponent, canActivate: [EsBolsaComunGuard] },
  { path: 'fuentesfinanciacion', component: FuentesFinanciacionComponent, canActivate: [EsFinanciacionGuard] },
  { path: 'PlaneacionFinanciera', component: CostosCoberturaFinancieraComponent, canActivate: [EsCostosCoberturaComunGuard] },
  //{ path: 'ProgramaAnualCaja', component: ProgramaAnualCajaComponent, canActivate: [EsProgramaAnualCajaGuard] },
  { path: 'PACETC', component: ProgramaAnualCajaComponent, canActivate: [EsProgramaAnualCajaGuard] },
  //{ path: 'PACETC', component: ListPlanGirosAnualPrincipalComponent, canActivate: [EsPACETCGuard] },
  { path: 'PACUAPA', component: ListPlanGirosComponent, canActivate: [EsPlanGirosGuard] },
  //{ path: 'registro-operadores', component: RegistroOperadoresComponent },
  //{ path: 'registro-contratos', component: RegistroContratosComponent },
  //{ path: 'registroUnicoContratos', component: RegistroUnicoContratosComponent }.,
  { path: 'ContratosAlistamiento', component: RegistroAlistamientoComponent, canActivate: [EsContratosAlistamientoGuard] },
  { path: 'registro-operadores', component: RegistroOperadoresComponent, canActivate: [EsRegistroOperadoresGuard] },
  { path: 'registro-operadores/:idsel', component: RegistroOperadoresComponent, canActivate: [EsRegistroOperadoresGuard] },
  { path: 'registro-contratos', component: RegistroContratosComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'registroUnicoContratos', component: RegistroUnicoContratosComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'contratosSupervision/:tipoSupervision', component: ContratosSupervisionComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'suministro-dia-vigencia/:idc/:ids/:tipo/:val', component: SuministroDiaVigenciaComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'contratos/suministro-rural/:idc/:ids/:tipo/:val', component: SuministroRuralComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'dotacion-y-equipos', component: DotacionEquiposComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'dotacion-y-equipos/:idContrato', component: DotacionEquiposComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'registro-unico-contratos-descentralizado/:id_contrato', component: RegistroUnicoContratosDescentralizadoComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'convenio/:corresponde/:etId', component: ConvenioComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'convenio/:idContrato', component: ConvenioComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'logistica/:corresponde/:etId', component: LogisticaComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'logistica/:idContrato', component: LogisticaComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'servicios', component: ServiciosComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'servicios/:idContrato', component: ServiciosComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'supervision/:idContrato', component: ContratosSupervisionComponent, canActivate: [EsRegistroContratosGuard] },
  { path: 'AprobacionesPlaneacioneinicio', component: AprobacionesPlaneacionEInicioComponent, canActivate: [EsAprobacionesGuard] },
  { path: 'AprobacionesContratacionyalistamiento', component: AprobacionesContratacionYAlistamientoComponent, canActivate: [EsAprobacionesGuard] },
  { path: 'Aprobacionesejecucionyseguimiento', component: AprobacionesEjecucionYSeguimientoComponent, canActivate: [EsAprobacionesGuard] },
  { path: 'Aprobacionescierreyevaluacion', component: AprobacionesCierreYEvaluacionComponent, canActivate: [EsAprobacionesGuard] },
  { path: 'Repositorios', component: ListRepositoriosExtendComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosCirculares', component: RepositoriosCircularesComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosLineamientos', component: RepositoriosLineamientosComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosDocumentos', component: RepositoriosDocumentosComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosNormatividad', component: RepositoriosNormatividadComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosInteres', component: RepositoriosInteresComponent, canActivate: [EsRepositorioGuard] },
  { path: 'trayectos', component: TrayectosComponent, canActivate: [EsTrayectosGuard] },
  { path: 'priorizacion', component: PriorizacionComponent, canActivate: [EsPriorizacionGuard] },
  { path: 'vigencias', component: ListVigenciasComponent, canActivate: [EsVigenciasGuard] },
  // { path: 'Notificaciones', component: enConstrucionComponent, canActivate: [EsNotificacionesGuard] },
  { path: 'Notificaciones', component: NotificacionesComponent },
  { path: 'LiquidacionContratos', component: enConstrucionComponent, canActivate: [EsLiquidacionContratosGuard] },
  { path: 'EntregaRacionesViveres', component: enConstrucionComponent, canActivate: [EsEntregaRacionesViveresGuard] },
  { path: 'EncuestaCostos', component: enConstrucionComponent, canActivate: [EsEncuestaCostosGuard] },
  { path: 'CotizacionMenu', component: enConstrucionComponent, canActivate: [EsCotizacionMenuGuard] },

  //PTN
  { path: 'PTNProductos', component: PTNProductosComponent, canActivate: [EsPTNProductosGuard] },
  { path: 'RegistroProducto', component: RegistroProductoComponent, canActivate: [EsPTNProductosGuard] },
  { path: 'RegistroProductoMateriaPrima', component: ProductoMateriaPrimaComponent, canActivate: [EsPTNProductosGuard] },
  { path: 'RegistroProductoComplementoIndustrializado', component: ProductoComplementoIndustrializadoComponent, canActivate: [EsPTNProductosGuard] },
  { path: 'AprobacionProductoMateriaPrima', component: AprobacionProductoMateriaPrimaComponent, canActivate: [EsPTNProductosGuard] },
  { path: 'AprobacionProductoIndustrializado', component: AprobacionProductoComplementoIndustrializadoComponent, canActivate: [EsPTNProductosGuard] },

  { path: 'PTNPreparaciones', component: PTNPreparacionesComponent, canActivate: [EsPTNPrepararacionGuard] },
  { path: 'RegistroPreparacion', component: PtnRegPreComponent, canActivate: [EsPTNPrepararacionGuard] },
  { path: 'AprobacionesPreparacion', component: PtnAprPreComponent, canActivate: [EsPTNPrepararacionGuard] },

  { path: 'PTNCiclosDeMenu', component: PTNCiclosDeMenuComponent, canActivate: [EsPTNCiclosGuard] },
  { path: 'RegistroCiclomenu', component: PtnDisregistroComponent, canActivate: [EsPTNCiclosGuard] },
  { path: 'AprobacionesCiclomenu', component: PtnAprCiclComponent, canActivate: [EsPTNCiclosGuard] },
  { path: 'DisponibleCiclomenu', component: PtnDispVerCiclComponent, canActivate: [EsPTNCiclosGuard] },

  //plan alistamiento
  { path: 'InicioOperacion', component: PlanAlistamientoInicioOperacionComponent },
  { path: 'PlanAlisCiclo', component: PlanAlistamientoMenuComponent },

  //MiPAE
  { path: 'BeneficiariosRaciones', component: ConsultaBeneficiariosYRacionesComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'Beneficiarios', component: BeneficiariosComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'ListadoRaciones', component: ListadoRacionesComponent },
  { path: 'DetalleBeneficiarioRaciones', component: VerDetalleBeneficiarioRacionesComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'Novedades', component: PriorizacionNovedadesComponent, canActivate: [EsPriorizacionGuard] },
  { path: 'SedesBeneficiarias', component: CustomSedesBeneficiariasComponent, canActivate: [EsPriorizacionGuard] },
  { path: 'AsignacionRaciones', component: CustomAsignacionRacionesComponent, canActivate: [EsAsignacionRacionesGuard] },//89
  { path: 'AsignacionRacionesId', component: CustomAsignacionRacionesSedeComponent, canActivate: [EsAsignacionRacionesGuard] }, //89
  { path: 'Priorizaciones/:id', component: ListPriorizacionesComponent, canActivate: [EsPriorizacionGuard] },
  { path: 'GestionExcedentes', component: GestionExcedentesComponent, canActivate: [EsGestionExcedentessGuard] }, //93
  { path: 'GestionExcedentesDetalle', component: GestionExcedentesDetalleComponent, canActivate: [EsGestionExcedentessGuard] }, //93
  { path: 'QuincenaEntregaRaciones', component: ListQuincenaEntregaRacionesExtendComponent, canActivate: [EsSeguimientoComplementosGuard] }, // 2
  { path: 'QuincenaEntregaRacionesDetalle', component: TabsQuincenaDetalleComponent, canActivate: [EsSeguimientoComplementosGuard] }, //2
  { path: 'Priorizaciones', component: ListPriorizacionesComponent, canActivate: [EsPriorizacionGuard] },
  { path: 'CriteriosPriorizacion', component: CustomCriteriosPriorizacionComponent, canActivate: [EsCriteriosPriorizacionsGuard] },
  { path: 'seguimientoComplementos', component: SeguimientoComplementosComponent, canActivate: [EsSeguimientoComplementosGuard] },
  { path: 'seguimientoComplementosDetalle', component: SeguimientoComplementosDetailComponent, canActivate: [EsSeguimientoComplementosGuard] },

  //SGN
  { path: 'RepositoriosCircularesUAPA', component: RepositoriosCircularesUapaComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosLineamientosUAPA', component: RepositoriosLineamientosUapaComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosDocumentosUAPA', component: RepositoriosDocumentosUapaComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosNormatividadUAPA', component: RepositoriosNormatividadUapaComponent, canActivate: [EsRepositorioGuard] },
  { path: 'RepositoriosInteresUAPA', component: RepositoriosInteresUapaComponent, canActivate: [EsRepositorioGuard] },
  { path: 'CriteriosPriorizacionUAPA', component: CriteriosPriorizacionUapaComponent, canActivate: [EsCriteriosPriorizacionsGuard] },
  { path: 'AprobacionesPendientesUAPA', component: AprobacionesPedientesUapaComponent, canActivate: [EsAprobacionesGuard] },

  { path: 'BeneficiariosRaciones', component: ConsultaBeneficiariosYRacionesComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'Beneficiarios', component: BeneficiariosComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'ListadoRaciones', component: ListadoRacionesComponent },
  { path: 'DetalleBeneficiarioRaciones', component: VerDetalleBeneficiarioRacionesComponent, canActivate: [EsBeneficiarioRacionesGuard] },
  { path: 'Novedades', component: PriorizacionNovedadesComponent, canActivate: [EsPriorizacionGuard] },

  // Bolsa Comun
  { path: 'BolsaComun', component: BolsaComunTablaComponent, canActivate: [EsBolsaComunGuard] },

  // Seguimiento Uapa
  { path: 'Parametro', component: ListParametroComponent, canActivate: [EsParametrosGuaRD] },
  { path: 'TablerosUapa', component: TablerosuapaComponent, canActivate: [EsTablerosUapaGuaRD] },
  { path: 'InformacionETC', component: InformacionETCComponent, canActivate: [EsInformacionETCUapaGuaRD] },

  //Seguridad
  { path: 'usuarios', component: UsuariosComponent, canActivate: [EsSeguridadUsuariosGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [EsSeguridadRolesGuard] },
  { path: 'modulos', component: ListModuloComponent, canActivate: [EsSeguridadPermisosGuard] },
  { path: 'menus', component: ListMenuComponent, canActivate: [EsSeguridadPermisosGuard] },
  { path: 'permisos', component: ListRolPermisosComponent, canActivate: [EsSeguridadPermisosGuard] },
  { path: 'tablasauditoria', component: ListTablasAuditoriaComponent, canActivate: [EsSeguridadAuditoriaGuaRD] },
  { path: 'sistemas', component: SistemasComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule { }
