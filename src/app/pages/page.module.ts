import { PtnDispVerCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disp-ver-cicl/ptn-disp-ver-cicl.component';
import { DialogPTNPreparacionContent, DialogPTNProduCicloContent, PtnDisregistroComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disregistro/ptn-disregistro.component';
import { AnualPrincipalComponent, DialogAnualPrincipalContent } from './Componentes-sgn-UAPA/PlanGiros/anual-principal/anual-principal.component';
import { ConsolidadoMensualComponent, DialogConsolidadoMensualContent } from './Componentes-sgn-UAPA/PlanGiros/consolidado-mensual/consolidado-mensual.component';
import { ConsolidadoVigenciaComponent } from './Componentes-sgn-UAPA/PlanGiros/consolidado-vigencia/consolidado-vigencia.component';
import { TabAnualPrincipalComponent } from './Componentes-sgn-UAPA/PlanGiros/tab-anual-principal/tab-anual-principal.component';
import { ListPlanGirosAnualPrincipalComponent } from './Componentes-sgn-UAPA/PlanGiros/list-plan-giros-anual-principal/list-plan-giros-anual-principal.component';
import { TabPlaneacionFinancieraComponent } from './Componentes-sgn-UAPA/PlanGiros/tab-planeacion-financiera/tab-planeacion-financiera.component';
import { ListPlanGirosComponent, DialogPlanGirosContent } from './Componentes-sgn-UAPA/PlanGiros/list-PlanGiros-component/list-PlanGiros.component';
import { ListZonaETCComponent, DialogZonaETCContent } from './Componentes-sige-pae/ZonaETC/list-ZonaETC-component/list-ZonaETC.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgChartsModule } from 'ng2-charts';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './page-routing.module';
import { DialogAspNetUsersContent, UsuariosComponent } from './components/recursos/gestionusuarios/usuarios/usuarios.component';
import { AsignacionRecursosComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/asignacion-recursos/asignacion-recursos.component';
import { CalendarioPaeComponent } from './components/calendario-pae/calendario-pae.component';
import { FuentesFinanciacionComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/fuentes-financiacion.component';
import { CostosCoberturaPaeComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/costos-cobertura-pae/costos-cobertura-pae.component';
import { CostosCoberturaFinancieraComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/costos-cobertura-financiera/costos-cobertura-financiera.component';
import { BusquedaAsignacionRecursosComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/asignacion-recursos/busqueda-asignacion-recursos/busqueda-asignacion-recursos.component';
import { DetalleSedesComponent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/detalle-sedes/detalle-sedes.component';
import { ResumenSedesComponent, DialogDistribucionAccesoContent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/resumen-sedes/resumen-sedes.component';
import { TrayectosComponent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/detalle-sedes/trayectos/trayectos.component';
import { MinutaMaemComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-patron/maem/maem.component';
import { MaerComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-patron/maer/maer.component';
import { MinutasExcepcionalComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-excepcional/minutas-excepcional.component';
import { MinutasPatronComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-patron/minutas-patron.component';
import { ProgramaAnualCajaComponent } from './components/contratacion-alistamiento/programa-anual-caja/programa-anual-caja.component';
import { PriorizacionComponent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/resumen-sedes/priorizacion/priorizacion.component';
import { PriorizacionPaeComponent } from './components/planeacion-inicio/caracterizacion-sedes-educativas/resumen-sedes/priorizacion/priorizacion-pae/priorizacion-pae.component';
import { RegistroOperadoresComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-operadores/registro-operadores.component';
import { RegistroContratosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-contratos.component';
import { RegistroUnicoContratosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-unico-contratos/registro-unico-contratos.component';
import { Item1Component } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/items-contratos/item1/item1.component';
import { Item2Component } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/items-contratos/item2/item2.component';
import { Item3Component } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/items-contratos/item3/item3.component';
import { Item4Component } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/items-contratos/item4/item4.component';
import { Item5Component } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/items-contratos/item5/item5.component';
import { ContratosSupervisionComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/contratos-supervision/contratos-supervision.component';
import { SuministroDiaVigenciaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-dia-vigencia/suministro-dia-vigencia.component';
import { DotacionEquiposComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/dotacion-equipos/dotacion-equipos.component';
import { ProductoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/dotacion-equipos/producto/producto.component';
import { PolizaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/dotacion-equipos/poliza/poliza.component';
import { RegistroUnicoContratosDescentralizadoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/registro-unico-contratos-descentralizado/registro-unico-contratos-descentralizado.component';
import { RegistroContratosDetalleComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos-detalle/registro-contratos-detalle.component';
import { ConvenioComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/convenio/convenio.component';
import { LogisticaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/logistica/logistica.component';
import { ServiciosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/servicios/servicios.component';
import { MateriaPrimaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/logistica/materia-prima/materia-prima.component';
import { InformacionPresupuestalComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/compartido/informacion-presupuestal/informacion-presupuestal.component';
import { RubrosAdicionalesComponent } from '../shared/component/rubros-adicionales/rubros-adicionales.component';
import { ListDialogSedesContent } from './Componentes-sige-pae/Sedes/list-Sedes-component/list-Sedes.component';
import { ResumenEtcComponent } from './Componentes-sige-pae/Sedes/resumen-etc/resumen-etc.component';
import { TabsResumenEtcComponent } from './Componentes-sige-pae/Sedes/tabs-resumen-etc/tabs-resumen-etc.component';
import { ResumenEtcMatrizRiesgoComponent } from './Componentes-sige-pae/Sedes/resumen-etc-matriz-riesgo/resumen-etc-matriz-riesgo.component';
import { ResumenEtcDiagnosticosInfraestructuraComponent } from './Componentes-sige-pae/Sedes/resumen-etc-diagnosticos-infraestructura/resumen-etc-diagnosticos-infraestructura.component';
import { CaracterizacionSedeComponent, DialogConflictoNoContent, DialogConflictoSiContent, DialogContaminacionNoContent, DialogContaminacionSiContent } from './Componentes-sige-pae/Sedes/diagnosticos-components-resumen/caracterizacion-sede/caracterizacion-sede.component';
import { ConceptoHigenicoSaniComponent, DialogHigienicoSiFavorableContent, DialogHigienicoNoContent, DialogHigienicoSiConRequerimientosContent, DialogHigienicoSiDesfavorableContent } from './Componentes-sige-pae/Sedes/diagnosticos-components-resumen/concepto-higenico-sani/concepto-higenico-sani.component';
import { DialogAguaNoContent, DialogAguaSiContent, DialogAlcantarilladoNoContent, DialogAlcantarilladoSiContent, DialogBasuraNoContent, DialogBasuraSiContent, DialogGasNoContent, DialogGasSiContent, DialogLuzNoContent, DialogLuzSiContent, ServiciosPublicosComponent } from './Componentes-sige-pae/Sedes/diagnosticos-components-resumen/servicios-publicos/servicios-publicos.component';
import { DialogAlmacenamientoNoContent, DialogAlmacenamientoSiContent, DialogConsumoNoContent, DialogConsumoSiContent, DialogDotacionNoContent, DialogDotacionSiContent, DialogPreparacionNoContent, DialogPreparacionSiContent, DialogResiduosNoContent, DialogResiduosSiContent, DialogSanatariasNoContent, DialogSanitariasSiContent, ServiciosAlimentacionComponent } from './Componentes-sige-pae/Sedes/diagnosticos-components-resumen/servicios-alimentacion/servicios-alimentacion.component';
import { DiagResumenETCComponent } from './Componentes-sige-pae/Sedes/diagnosticos-components-resumen/diag-resumen-etc/diag-resumen-etc.component';
import { DialogContentMaer, DialogContentMaer2, DialogContentMaer3, MatrizRiesgoMaerComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maer/matriz-riesgo-maer.component';
import { DialogContentMaem, DialogContentMaem2, DialogContentMaem3, MatrizRiesgoMaemComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maem/matriz-riesgo-maem.component';
import { DialogContentMaip, DialogContentMaip2, DialogContentMaip3, MatrizRiesgoMaipComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-maip/matriz-riesgo-maip.component';
import { DialogContentPaec, DialogContentPaec2, DialogContentPaec3, MatrizRiesgoPaecComponent } from './Componentes-sige-pae/Sedes/matriz-components-resumen/matriz-riesgo-paec/matriz-riesgo-paec.component';
import { MatrizRiesgoComponent } from './Componentes-sige-pae/Sedes/matriz-riesgo/matriz-riesgo.component';
import { MatrizRiesgoDetalleComponent } from './Componentes-sige-pae/Sedes/matriz-riesgo-detalle/matriz-riesgo-detalle.component';
import { TabsedesComponent } from './Componentes-sige-pae/Sedes/tabsedes/tabsedes.component';
import { TabsedesinternoComponent } from './Componentes-sige-pae/Sedes/tabsedesinterno/tabsedesinterno.component';
import { DiagnosticoInfraestructuraSituacionalComponent } from './Componentes-sige-pae/Sedes/diagnostico-infraestructura-situacional/diagnostico-infraestructura-situacional.component';
import { DiagnosticoOperativasComponent } from './Componentes-sige-pae/Sedes/diagnostico-operativas/diagnostico-operativas.component';
import { DiagnosticoSituacionalComponent, DialogDiagnosticoSituacionalContent } from './Componentes-sige-pae/Sedes/diagnostico-situacional/diagnostico-situacional.component';
import { AprobacionesPlaneacionEInicioComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-planeacion-e-inicio/aprobaciones-planeacion-e-inicio.component';
import { AprobacionesContratacionYAlistamientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-contratacion-y-alistamiento/aprobaciones-contratacion-y-alistamiento.component';
import { AprobacionesEjecucionYSeguimientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-ejecucion-y-seguimiento/aprobaciones-ejecucion-y-seguimiento.component';
import { AprobacionesCierreYEvaluacionComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-cierre-y-evaluacion/aprobaciones-cierre-y-evaluacion.component';
import { TabCierreYEvaluacionComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-cierre-y-evaluacion/tab-cierre-y-evaluacion/tab-cierre-y-evaluacion.component';
import { AprobacionesPendientesCierreYEvaluacionComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-cierre-y-evaluacion/aprobaciones-pendientes-cierre-y-evaluacion/aprobaciones-pendientes-cierre-y-evaluacion.component';
import { AprobacionesPendientesContratacionYAlistamientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-contratacion-y-alistamiento/aprobaciones-pendientes-contratacion-y-alistamiento/aprobaciones-pendientes-contratacion-y-alistamiento.component';
import { TabContratacionYAlistamientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-contratacion-y-alistamiento/tab-contratacion-y-alistamiento/tab-contratacion-y-alistamiento.component';
import { AprobacionesPendientesEjecucionYSeguimientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-ejecucion-y-seguimiento/aprobaciones-pendientes-ejecucion-y-seguimiento/aprobaciones-pendientes-ejecucion-y-seguimiento.component';
import { TabEjecucionYSeguimientoComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-ejecucion-y-seguimiento/tab-ejecucion-y-seguimiento/tab-ejecucion-y-seguimiento.component';
import { TabPlaneacionEInicioComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-planeacion-e-inicio/tab-planeacion-e-inicio/tab-planeacion-e-inicio.component';
import { AprobacionesPendientesPlaneacionEInicioComponent } from './Componentes-sige-pae/Aprobaciones/aprobaciones-planeacion-e-inicio/aprobaciones-pendientes-planeacion-e-inicio/aprobaciones-pendientes-planeacion-e-inicio.component';
import { DialogAprobacionesContent, ListAprobacionesComponent } from './Componentes-sige-pae/Aprobaciones/list-Aprobaciones-component/list-Aprobaciones.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbModule, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
//Componentes de Inicio y Seguridad
import { InicioComponent } from './Componentes-sige-pae/_Inicio/inicio.component';
import { IniciosgnComponent } from './Componentes-sige-pae/_Iniciosgn/iniciosgn.component';
import { DocumentacionComponent } from './Componentes-sige-pae/_documentacion/documentacion.components';
import { enConstrucionComponent } from './Componentes-sige-pae/_enConstruccion/enConstrucion.components';
import { AutorizadoComponent } from '../seguridad/autorizado/autorizado.component';
//Componnetes de Sigepae
import { ListTablasAuditoriaComponent, DialogTablasAuditoriaContent } from './Componentes-sige-pae/TablasAuditoria/list-TablasAuditoria-component/list-TablasAuditoria.component';
import { ListVigenciasComponent, DialogVigenciasContent } from './Componentes-sige-pae/Vigencias/list-Vigencias-component/list-Vigencias.component';
import { AutorizadoModule } from '../seguridad/autorizado/autorizado.module';
import { DialogForgotPassword, LoginComponent } from '../seguridad/login/login.component';
import { ListSedesComponent } from './Componentes-sige-pae/Sedes/list-Sedes-component/list-Sedes.component';
import { MatSelectModule } from '@angular/material/select';
import { DialogAspNetMenuRolesContent, DialogAspNetRolesContent, RolesComponent } from './components/recursos/gestionroles/roles/roles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {  DetalleSedeFormularioComponent } from './Componentes-sige-pae/Sedes/detalle-sede-formulario/detalle-sede-formulario.component';
import { DiagnosticoAprobacionesFormularioComponent } from './Componentes-sige-pae/Sedes/detalle-sede-formulario/diagnostico-aprobaciones-formulario/diagnostico-aprobaciones-formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
/* import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; */
import { RouterModule } from '@angular/router';
import { DialogRepositoriosContent, ListRepositoriosComponent } from './Componentes-sige-pae/Repositorios/list-Repositorios-component/list-Repositorios.component';
import { DialogRepositoriosExtendContent, ListRepositoriosExtendComponent } from './Componentes-sige-pae/Repositorios/list-Repositorios-Extend-component/list-Repositorios-Extend.component';
import { DialogModuloContent, ListModuloComponent } from './Componentes-sige-pae/Modulo/list-Modulo-component/list-Modulo.component';
import { DialogRolPermisosContent, ListRolPermisosComponent } from './Componentes-sige-pae/RolPermisos/list-RolPermisos-component/list-RolPermisos.component';
import { ResetPasswordComponent } from '../seguridad/authentication/reset-password/reset-password.component';
import { PermisosComponent, PermisosContent } from './Componentes-sige-pae/RolPermisos/permisos-component/permisos.component';
import { SinPermisosComponent } from './Componentes-sige-pae/_sinPermisos/SinPermisos.components';
import { DialogMenuContent, ListMenuComponent } from './Componentes-sige-pae/Menu/list-Menu-component/list-Menu.component';
import { SistemasComponent } from '../theme/components/navbar/sistemas.component';
import { MaemDetalleFormularioComponent } from './Componentes-sige-pae/Sedes/maem-detalle-formulario/maem-detalle-formulario.component';
import { NotFoundComponent } from './Componentes-sige-pae/_notFound/NotFound.components';
import { BeneficiariosComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/beneficiarios/beneficiarios.component';
import { ConsultaBeneficiariosYRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/consulta-beneficiarios-y-raciones.component';
import { ListadoRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/listado-raciones/listado-raciones.component';
import { TablaNombresDetalleComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/tabla-nombres-detalle/tabla-nombres-detalle.component';
import { TablaNovedadesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/tabla-novedades/tabla-novedades.component';
import { VerDetalleBeneficiarioRacionesComponent } from './Componentes-mi-pae/consulta-beneficiarios-y-raciones/ver-detalle-beneficiario-raciones/ver-detalle-beneficiario-raciones.component';
import { DialogPriorizacionesContent, ListPriorizacionesComponent } from './Componentes-mi-pae/Priorizaciones/list-Priorizaciones-component/list-Priorizaciones.component';
import { DialogPriorizacionNovedadesContent, PriorizacionNovedadesComponent } from './Componentes-mi-pae/Priorizaciones/list-Priorizaciones-component/priorizacion-novedades/priorizacion-novedades.component';
import { UbicacionesContent } from '../theme/components/navbar/navbar.component';
import { TabsQuincenaHistoricoComponent } from './Componentes-mi-pae/QuincenaEntregaRaciones/tabsQuincena/tabs-quincena-historico/tabs-quincena-historico.component';
import { CustomSedesBeneficiariasComponent } from './Componentes-mi-pae/SedesBeneficiarias/list-SedesBeneficiarias-component/custom-sedes-beneficiarias/custom-sedes-beneficiarias.component';
import { CustomCriteriosPriorizacionComponent } from './Componentes-mi-pae/CriteriosPriorizacion/custom-criterios-priorizacion/custom-criterios-priorizacion.component';
import { GestionExcedentesComponent, DialogGestionExcedentesContent } from './Componentes-mi-pae/GestionExcedentes/gestion-excedentes/gestion-excedentes.component';
import { ListQuincenaEntregaRacionesExtendComponent, DialogQuincenaEntregaRacionesExtendContent } from './Componentes-mi-pae/QuincenaEntregaRaciones/list-QuincenaEntregaRacionesExtend-component/list-QuincenaEntregaRacionesExtend.component';
import { DialogtabsquincenadetalleContent, TabsQuincenaDetalleComponent } from './Componentes-mi-pae/QuincenaEntregaRaciones/tabsQuincena/tabs-quincena-detalle/tabs-quincena-detalle.component';
import { TabsQuincenaComponent } from './Componentes-mi-pae/QuincenaEntregaRaciones/tabsQuincena/tabs-quincena/tabs-quincena.component';
import { AsignacionRacionesDialog } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones/asignacion-raciones.dialog';
import { CustomAsignacionRacionesSedeComponent } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones-sede/custom-asignacion-raciones-sede.component';
import { CustomAsignacionRacionesComponent, DialogAprobaciones, DialogWarning } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones/custom-asignacion-raciones.component';
import { CriteriosPriorizacionDialog } from './Componentes-mi-pae/SedesBeneficiarias/list-SedesBeneficiarias-component/custom-sedes-beneficiarias/criterios-priorizacion.dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatListModule } from '@angular/material/list';
import { TabPriorizacionComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/tab-priorizacion.component';
import { MatChipsModule } from '@angular/material/chips';
import { TabPriorizacionDetalleComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/tab-priorizacion-detalle/tab-priorizacion-detalle.component';
import { DialogCentroDeAcopioContent, ListCentroDeAcopioComponent } from './Componentes-sige-pae/CentroDeAcopio/list-CentroDeAcopio-component/list-CentroDeAcopio.component';
import { AsignacionRacionesDetalleComponent } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones-sede/asignacion-raciones-detalle/asignacion-raciones-detalle.component';
import { DialogRepositoriosCircularesContent, RepositoriosCircularesComponent } from './Componentes-sige-pae/Repositorios/repositorios-circulares/repositorios-circulares.component';
import { DialogRepositorioLineamientosContent, RepositoriosLineamientosComponent } from './Componentes-sige-pae/Repositorios/repositorios-lineamientos/repositorios-lineamientos.component';
import { DialogRepositorioDocumentosContent, RepositoriosDocumentosComponent } from './Componentes-sige-pae/Repositorios/repositorios-documentos/repositorios-documentos.component';
import { DialogRepositorioNormatividadContent, RepositoriosNormatividadComponent } from './Componentes-sige-pae/Repositorios/repositorios-normatividad/repositorios-normatividad.component';
import { DialogRepositorioInteresContent, RepositoriosInteresComponent } from './Componentes-sige-pae/Repositorios/repositorios-interes/repositorios-interes.component';
import { CostosPaeComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/costos-cobertura-pae/costos-pae/costos-pae.component';
import { GestionExcedentesDetalleComponent } from './Componentes-mi-pae/GestionExcedentes/gestion-excedentes/gestion-excedentes-detalle/gestion-excedentes-detalle.component';
import { PreciosRacionComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/fuentes-financiacion/costos-cobertura-pae/precios-racion/precios-racion.component';
import { PreciosAcordadosComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos-detalle/precios-acordados/precios-acordados.component';
import { RacionesContratadasComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos-detalle/raciones-contratadas/raciones-contratadas.component';
import { DialogAsignacionNovedadesContent, NovedadesRacionesComponent } from './Componentes-mi-pae/SedesBeneficiarias/custom-asignacion-raciones-sede/asignacion-raciones-detalle/novedades-raciones/novedades-raciones.component';
import { SeguimientoComplementosComponent } from './Componentes-mi-pae/seguimiento-complementos/seguimiento-complementos.component';
import { SeguimientoComplementosDetailComponent, WithoutDotsPipe } from './Componentes-mi-pae/seguimiento-complementos-detail/seguimiento-complementos-detail.component';
import { DialogRepositoriosCircularesUAPAContent, RepositoriosCircularesUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-circulares-uapa/repositorios-circulares-uapa.component';
import { DialogRepositorioDocumentosUAPAContent, RepositoriosDocumentosUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-documentos-uapa/repositorios-documentos-uapa.component';
import { DialogRepositorioInteresUAPAContent, RepositoriosInteresUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-interes-uapa/repositorios-interes-uapa.component';
import { DialogRepositorioLineamientosUAPAContent, RepositoriosLineamientosUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-lineamientos-uapa/repositorios-lineamientos-uapa.component';
import { DialogRepositorioNormatividadUAPAContent, RepositoriosNormatividadUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-normatividad-uapa/repositorios-normatividad-uapa.component';
import { RepositoriosAnexosUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-lineamientos-uapa/repositorios-anexos-uapa/repositorios-anexos-uapa.component';
import { RepositoriosCajaherramientasUapaComponent } from './Componentes-sgn-UAPA/Repositorios/repositorios-lineamientos-uapa/repositorios-cajaherramientas-uapa/repositorios-cajaherramientas-uapa.component';
import { CriteriosPriorizacionUapaComponent, DialogCriteriosPriorizacionUapaContent, } from './Componentes-sgn-UAPA/criterios-priorizacion-uapa/criterios-priorizacion-uapa.component';
import { AprobacionesPedientesUapaComponent } from './Componentes-sgn-UAPA/Aprobaciones/aprobaciones-pedientes-uapa/aprobaciones-pedientes-uapa.component';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PriorizacionMaerComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/priorizacion-maer/priorizacion-maer.component';
import { PriorizacionMaemComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/priorizacion-maem/priorizacion-maem.component';
import { PriorizacionPaepiComponent } from './Componentes-sige-pae/Sedes/tab-priorizacion/priorizacion-paepi/priorizacion-paepi.component';
import { PTNPreparacionesComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-preparaciones.component';
import { PTNProductosComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/ptn-productos.component';
import { PTNCiclosDeMenuComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclos-de-menu.component';
import { NotificacionesComponent } from './Componentes-sige-pae/Notificaciones/notificaciones/notificaciones.component';
import { MatBadgeModule } from '@angular/material/badge';
import { PtnPrepacionInternoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-interno/ptn-prepacion-interno.component';
import { DialogPTNPreparacionIngredientesDisContent, PtnPrepacionDisponibleComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-disponible/ptn-prepacion-disponible.component';
import { PtnPrepacionAprobacionesComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-aprobaciones/ptn-prepacion-aprobaciones.component';
import { RegistroUnicoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/shared/registro-unico/registro-unico.component';
import { DetalleProcesoContractualComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/shared/detalle-proceso-contractual/detalle-proceso-contractual.component';
import { MinutaPatronMaemComponent } from './components/minutas/minuta-patron-maem/minuta-patron-maem.component';
import { MinutaPatronMaerComponent } from './components/minutas/minuta-patron-maer/minuta-patron-maer.component';
import { ComposicionReglasComponent } from './components/minutas/shared/composicion-reglas/composicion-reglas.component';
import { AporteNutricionalComponent } from './components/minutas/shared/aporte-nutricional/aporte-nutricional.component';
import { FooterPatronComponent } from './components/minutas/shared/footer-patron/footer-patron.component';
import { ProductosDisponiblesComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/productos-disponibles/productos-disponibles.component';
import { ProductosProcesoAprobacionComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/productos-proceso-aprobacion/productos-proceso-aprobacion.component';
import { ProductoMateriaPrimaComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/producto-materia-prima/producto-materia-prima.component';
import { ProductoComplementoIndustrializadoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/producto-complemento-industrializado/producto-complemento-industrializado.component';
import { RegistroProductoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/registro-producto/registro-producto.component';

//These imports generate a compilation error, please take care with make push to code without test
// import { ResumenInfoMacroMaerComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/menus-disponibles/MAER/resumen-maer/resumen-info-nutricional-maer/resumen-info-macro-maer/resumen-info-macro-maer.component';
// import { ResumenInfoMicroMaerComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/menus-disponibles/MAER/resumen-maer/resumen-info-nutricional-maer/resumen-info-micro-maer/resumen-info-micro-maer.component';

import { AprobacionProductoMateriaPrimaComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/aprobacion-producto-materia-prima/aprobacion-producto-materia-prima.component';
import { AprobacionProductoComplementoIndustrializadoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/aprobacion-producto-complemento-industrializado/aprobacion-producto-complemento-industrializado.component';
import { AprobacionProductosComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-productos/aprobacion-productos/aprobacion-productos.component';
import { DialogPTNPreparacionIngredientesContent, PtnRegPreComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-disponible/ptn-reg-pre/ptn-reg-pre.component';
import { PtnCicloInternoComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-interno/ptn-ciclo-interno.component';
import { PtnCicloDisnpComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-ciclo-disnp.component';
import { PtnCicloAproComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-apro/ptn-ciclo-apro.component';
import { RegistroAlistamientoComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-alistamiento/registro-alistamiento.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SuministroRuralComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-rural/suministro-rural.component';
import { RegistroUnicoSuministroRuralComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-rural/registro-unico-suministro-rural/registro-unico-suministro-rural.component';
import { DetalleProcesoContractualSuministroRuralComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-rural/detalle-proceso-contractual-suministro-rural/detalle-proceso-contractual-suministro-rural.component';
import { CaracteristicasFinancierasSuministroRuralComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/suministro-rural/caracteristicas-financieras-suministro-rural/caracteristicas-financieras-suministro-rural.component';
import { PtnAprPreComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-preparaciones/ptn-prepacion-aprobaciones/ptn-apr-pre/ptn-apr-pre.component';
import { PtnAprCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-apro/ptn-apr-cicl/ptn-apr-cicl.component';
import { PlanAlistamientoDocumentacionComponent } from './components/contratacion-alistamiento/plan-alistamiento-documentacion/plan-alistamiento-documentacion.component';
import { RegistroEstablecimientoComponent } from './components/contratacion-alistamiento/plan-alistamiento-documentacion/registro-establecimiento/registro-establecimiento.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MinutaMaemLeveComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-excepcional/minuta-maem-leve/minuta-maem-leve.component';
import { MinutasEnUsoComponent } from './components/administracion/lineamientos-tecnicos-administrativos/minutas-excepcional/minutas-en-uso/minutas-en-uso.component';
import { PlanAlistamientoInicioOperacionComponent } from './components/contratacion-alistamiento/plan-alistamiento-inicio-operacion/plan-alistamiento-inicio-operacion.component';
import { ModalEditarComponenteComponent } from './components/minutas/shared/composicion-reglas/modal-editar-componente/modal-editar-componente.component';
import { ComposicionReglasMaerComponent } from './components/minutas/shared/composicion-reglas/composicion-reglas-maer/composicion-reglas-maer.component';
import { DesplegableRutaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-alistamiento/components/desplegable-ruta/desplegable-ruta.component';
import { InformacionRutaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-alistamiento/components/informacion-ruta/informacion-ruta.component';
import { PlanRutasComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-alistamiento/components/plan-rutas/plan-rutas.component';
import { BolsaComunTablaComponent } from './components/contratacion-alistamiento/planeacionfinanciera-estudioscostos/bolsa-comun/tabla/bolsa-comun-tabla.component';
import { PlanAlistamientoMenuComponent } from './components/contratacion-alistamiento/plan-alistamiento-menu/plan-alistamiento-menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AporteNutricionalMaerComponent } from './components/minutas/shared/aporte-nutricional-maer/aporte-nutricional-maer.component';
import { FooterPatronMaerComponent } from './components/minutas/shared/footer-patron-maer/footer-patron-maer.component';
import { GrupoModalEditarComponentComponent } from './components/minutas/shared/composicion-reglas/modal-editar-componente/grupo-modal-editar-component/grupo-modal-editar-component.component';
import { InformacionPresupuestalConsultaComponent } from './components/contratacion-alistamiento/operadores-contratos/registro-contratos/compartido/informacion-presupuestal-consulta/informacion-presupuestal-consulta.component';
import { ListParametroComponent, DialogParametroContent } from './Componentes-sige-pae/Parametro/list-Parametro-component/list-Parametro.component';
import { DocViewerComponent } from './components/contratacion-alistamiento/plan-alistamiento-documentacion/doc-viewer/doc-viewer.component';
import { PtnAprSemanaCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-apro/ptn-apr-cicl/ptn-apr-semana-cicl/ptn-apr-semana-cicl.component';
import { InformacionETCComponent } from './Componentes-sgn-UAPA/informacion-etc/informacion-etc.component';
import { TablerosuapaComponent } from './Componentes-sgn-UAPA/tablerosuapa/tablerosuapa.component';
import { PtnRegSemanaCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disregistro/ptn-reg-semana-cicl/ptn-reg-semana-cicl.component';
import { PtnDispVerSemanaCiclComponent } from './Componentes-sige-pae/PTN_PlaneacionTecnicoNuticion/ptn-ciclos-de-menu/ptn-ciclo-disnp/ptn-disp-ver-cicl/ptn-disp-ver-semana-cicl/ptn-disp-ver-semana-cicl.component';
import { ListSeguridadELMAH_ErrorComponent, DialogSeguridadELMAH_ErrorContent } from './Componentes-sige-pae/SeguridadELMAH_Error/list-SeguridadELMAH_Error-component/list-SeguridadELMAH_Error.component';


@NgModule({
  imports: [
    MatAutocompleteModule,
    DragDropModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatRadioModule,
    NgxPaginationModule,
    NgChartsModule,
    MatDialogModule,
    PagesRoutingModule,
    SharedModule,
    NgbAlertModule,
    PdfViewerModule,
    NgxDatatableModule,
    NgxExtendedPdfViewerModule,
    AutorizadoModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgApexchartsModule,
    MatButtonToggleModule,
    MatSelectModule,
    NgbDatepickerModule,
    HttpClientModule,
    NgxPrintModule,
    NgbModule,
    RouterModule,
    MatMenuModule,
    MatBadgeModule,
    MatStepperModule,
    MatTooltipModule,
    MatAutocompleteModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatChipsModule
  ],
  declarations: [
    WithoutDotsPipe,
 
    InicioComponent,
    IniciosgnComponent,
    DocumentacionComponent,
    //  RolMenuComponent,
    enConstrucionComponent,
    LoginComponent,
    DialogForgotPassword,
    ResetPasswordComponent,
    UsuariosComponent,
    ListModuloComponent,
    ListMenuComponent,
    DialogMenuContent,
    ListRolPermisosComponent,
    DialogRolPermisosContent,
    DialogAspNetMenuRolesContent,
    PermisosComponent,
    PermisosContent,
    DialogModuloContent,
    DialogAspNetUsersContent,
    SistemasComponent,
    RolesComponent,
    DialogAspNetRolesContent,
    AsignacionRecursosComponent,
    CalendarioPaeComponent,
    FuentesFinanciacionComponent,
    CostosCoberturaPaeComponent,
    CostosCoberturaFinancieraComponent,
    BusquedaAsignacionRecursosComponent,
    DetalleSedesComponent,
    ResumenSedesComponent,
    DialogDistribucionAccesoContent,
    TrayectosComponent,
    ProgramaAnualCajaComponent,
    RegistroOperadoresComponent,
    RegistroContratosComponent,
    RegistroUnicoContratosComponent,
    Item1Component,
    Item2Component,
    Item3Component,
    Item4Component,
    Item5Component,
    ContratosSupervisionComponent,
    SuministroDiaVigenciaComponent,
    DotacionEquiposComponent,
    ProductoComponent,
    PolizaComponent,
    RegistroUnicoContratosDescentralizadoComponent,
    RegistroContratosDetalleComponent,
    ConvenioComponent,
    LogisticaComponent,
    ServiciosComponent,
    MateriaPrimaComponent,
    InformacionPresupuestalComponent,
    PriorizacionComponent,
    PriorizacionPaeComponent,
    RubrosAdicionalesComponent,

    //minutas

    MinutasPatronComponent,
    MinutaMaemComponent,
    MaerComponent,
    MinutasExcepcionalComponent,




    //login
    LoginComponent,


    //auditoria
    ListTablasAuditoriaComponent,
    DialogTablasAuditoriaContent,



    //vigencias
    ListVigenciasComponent,
    DialogVigenciasContent,

    //sedes Detalle
    ListSedesComponent,
    ListDialogSedesContent,
    MatrizRiesgoComponent,
    MatrizRiesgoDetalleComponent,
    TabsedesComponent,
    TabsedesinternoComponent,
    DetalleSedeFormularioComponent,
    MaemDetalleFormularioComponent,
    DiagnosticoInfraestructuraSituacionalComponent,
    DiagnosticoOperativasComponent,
    DiagnosticoSituacionalComponent,
    DialogDiagnosticoSituacionalContent,
    DiagnosticoAprobacionesFormularioComponent,
    TabPriorizacionComponent,
    TabPriorizacionDetalleComponent,
    //resumen ETC
    ResumenEtcComponent,
    TabsResumenEtcComponent,
    ResumenEtcMatrizRiesgoComponent,
    ResumenEtcDiagnosticosInfraestructuraComponent,
    CaracterizacionSedeComponent,
    ConceptoHigenicoSaniComponent,
    ServiciosPublicosComponent,
    ServiciosAlimentacionComponent,
    DiagResumenETCComponent,
    MatrizRiesgoMaerComponent,
    MatrizRiesgoMaemComponent,
    MatrizRiesgoMaipComponent,
    MatrizRiesgoPaecComponent,
    DialogContentMaem,
    DialogContentMaem2,
    DialogContentMaem3,
    DialogContentMaer,
    DialogContentMaer2,
    DialogContentMaer3,
    DialogContentPaec,
    DialogContentPaec2,
    DialogContentPaec3,
    DialogContentMaip,
    DialogContentMaip2,
    DialogContentMaip3,
    DialogContaminacionSiContent,
    DialogContaminacionNoContent,
    DialogConflictoSiContent,
    DialogConflictoNoContent,
    DialogHigienicoSiFavorableContent,
    DialogHigienicoSiConRequerimientosContent,
    DialogHigienicoSiDesfavorableContent,
    DialogHigienicoNoContent,
    DialogLuzSiContent,
    DialogLuzNoContent,
    DialogAguaSiContent,
    DialogAguaNoContent,
    DialogAlcantarilladoSiContent,
    DialogAlcantarilladoNoContent,
    DialogGasSiContent,
    DialogGasNoContent,
    DialogBasuraSiContent,
    DialogBasuraNoContent,
    DialogAlmacenamientoSiContent,
    DialogAlmacenamientoNoContent,
    DialogPreparacionSiContent,
    DialogPreparacionNoContent,
    DialogConsumoSiContent,
    DialogConsumoNoContent,
    DialogResiduosSiContent,
    DialogResiduosNoContent,
    DialogSanitariasSiContent,
    DialogSanatariasNoContent,
    DialogDotacionSiContent,
    DialogDotacionNoContent,



    //plan de giros
    ListPlanGirosComponent,
    DialogPlanGirosContent,
    TabPlaneacionFinancieraComponent,
    ListPlanGirosAnualPrincipalComponent,
    TabAnualPrincipalComponent,
    ConsolidadoVigenciaComponent,
    ConsolidadoMensualComponent,
    DialogConsolidadoMensualContent,
    AnualPrincipalComponent,
    DialogAnualPrincipalContent,



    //aprobaciones
    ListAprobacionesComponent,
    DialogAprobacionesContent,
    AprobacionesPlaneacionEInicioComponent,
    AprobacionesContratacionYAlistamientoComponent,
    AprobacionesEjecucionYSeguimientoComponent,
    AprobacionesCierreYEvaluacionComponent,
    TabCierreYEvaluacionComponent,
    AprobacionesPendientesCierreYEvaluacionComponent,
    AprobacionesPendientesContratacionYAlistamientoComponent,
    TabContratacionYAlistamientoComponent,
    AprobacionesPendientesEjecucionYSeguimientoComponent,
    TabEjecucionYSeguimientoComponent,
    TabPlaneacionEInicioComponent,
    AprobacionesPendientesPlaneacionEInicioComponent,


    //repositorios
    ListRepositoriosComponent,
    DialogRepositoriosContent,
    ListRepositoriosExtendComponent,
    DialogRepositoriosExtendContent,
    RepositoriosCircularesComponent,
    DialogRepositoriosCircularesContent,
    RepositoriosLineamientosComponent,
    DialogRepositorioLineamientosContent,
    RepositoriosDocumentosComponent,
    DialogRepositorioDocumentosContent,
    RepositoriosNormatividadComponent,
    DialogRepositorioNormatividadContent,
    RepositoriosInteresComponent,
    DialogRepositorioInteresContent,

    //otros
    SinPermisosComponent,
    NotFoundComponent,

    // consulta beneficiarios y raciones
    ConsultaBeneficiariosYRacionesComponent,
    BeneficiariosComponent,
    ListadoRacionesComponent,
    VerDetalleBeneficiarioRacionesComponent,
    TablaNovedadesComponent,
    TablaNombresDetalleComponent,

    // priorizacion
    ListPriorizacionesComponent,
    DialogPriorizacionesContent,
    DialogPriorizacionNovedadesContent,
    PriorizacionNovedadesComponent,
    DialogAsignacionNovedadesContent,


    //sedes beneficiarias
    CustomSedesBeneficiariasComponent,
    CriteriosPriorizacionDialog,


    //gestion excedentes
    GestionExcedentesComponent,
    DialogGestionExcedentesContent,
    GestionExcedentesDetalleComponent,
    ListQuincenaEntregaRacionesExtendComponent,
    DialogQuincenaEntregaRacionesExtendContent,
    TabsQuincenaComponent,
    DialogtabsquincenadetalleContent,
    TabsQuincenaDetalleComponent,
    TabsQuincenaHistoricoComponent,
    CustomAsignacionRacionesComponent,
    DialogWarning,
    AsignacionRacionesDialog,
    AsignacionRacionesDetalleComponent,
    CustomAsignacionRacionesSedeComponent,
    CustomCriteriosPriorizacionComponent,
    DialogAprobaciones,
    AsignacionRacionesDetalleComponent,
    NotFoundComponent,
    UbicacionesContent,

    //centro de copio
    ListCentroDeAcopioComponent,
    DialogCentroDeAcopioContent,
    ListZonaETCComponent,
    DialogZonaETCContent,
    CostosPaeComponent,
    PreciosRacionComponent,
    PreciosAcordadosComponent,
    RacionesContratadasComponent,
    NovedadesRacionesComponent,

    SeguimientoComplementosComponent,
    SeguimientoComplementosDetailComponent,

    //componentes en sistema UAPA

    //UAPA Repositorios
    RepositoriosCircularesUapaComponent,
    RepositoriosDocumentosUapaComponent,
    RepositoriosInteresUapaComponent,
    RepositoriosLineamientosUapaComponent,
    RepositoriosNormatividadUapaComponent,
    DialogRepositoriosCircularesUAPAContent,
    DialogRepositorioLineamientosUAPAContent,
    DialogRepositorioInteresUAPAContent,
    DialogRepositorioLineamientosUAPAContent,
    DialogRepositorioNormatividadUAPAContent,
    DialogRepositorioDocumentosUAPAContent,
    RepositoriosAnexosUapaComponent,
    RepositoriosCajaherramientasUapaComponent,

    //uapa criterios

    CriteriosPriorizacionUapaComponent,
    DialogCriteriosPriorizacionUapaContent,


    // uapa aprobaciones
    AprobacionesPedientesUapaComponent,
    PriorizacionMaerComponent,
    PriorizacionMaemComponent,
    PriorizacionPaepiComponent,

    //PTN planeacion tecnico nutricional
    //Ciclos de Menu
    PTNCiclosDeMenuComponent,
    PtnCicloInternoComponent,
    PtnCicloDisnpComponent,
    PtnCicloAproComponent,
    PtnDisregistroComponent,
    PtnAprCiclComponent,
    DialogPTNPreparacionContent,
    PtnDispVerCiclComponent,
    DialogPTNProduCicloContent,
    PtnAprSemanaCiclComponent,
    PtnRegSemanaCiclComponent,
    PtnDispVerSemanaCiclComponent,

    //preparacion
    PTNPreparacionesComponent,
    DialogPTNPreparacionIngredientesContent,
    PtnPrepacionInternoComponent,
    PtnPrepacionDisponibleComponent,
    PtnPrepacionAprobacionesComponent,
    DialogPTNPreparacionIngredientesDisContent,
    PtnRegPreComponent,
    PtnAprPreComponent,





    //ptn productos
    PTNProductosComponent,
    NotificacionesComponent,
    ProductosDisponiblesComponent,
    ProductosProcesoAprobacionComponent,
    RegistroProductoComponent,
    ProductoMateriaPrimaComponent,
    ProductoComplementoIndustrializadoComponent,
    AprobacionProductosComponent,
    AprobacionProductoMateriaPrimaComponent,
    AprobacionProductoComplementoIndustrializadoComponent,


    //plan alistamiento
    RegistroAlistamientoComponent,
    PlanRutasComponent,
    SuministroRuralComponent,
    RegistroUnicoSuministroRuralComponent,
    PlanAlistamientoDocumentacionComponent,
    RegistroEstablecimientoComponent,
    DetalleProcesoContractualSuministroRuralComponent,
    CaracteristicasFinancierasSuministroRuralComponent,
    MinutaMaemLeveComponent,
    MinutasEnUsoComponent,
    PlanAlistamientoInicioOperacionComponent,
    ModalEditarComponenteComponent,
    ComposicionReglasMaerComponent,
    RegistroUnicoComponent,
    DetalleProcesoContractualComponent,
    DesplegableRutaComponent,
    InformacionRutaComponent,
    PlanRutasComponent,
    PlanAlistamientoMenuComponent,

    // minutas
    MinutaPatronMaemComponent,
    MinutaPatronMaerComponent,
    ComposicionReglasComponent,
    AporteNutricionalComponent,
    FooterPatronComponent,

    // Bolsa Comun

    BolsaComunTablaComponent,
    AporteNutricionalMaerComponent,
    FooterPatronMaerComponent,
    GrupoModalEditarComponentComponent,
    InformacionPresupuestalConsultaComponent,

    // Seguimiento
    ListParametroComponent,
    DialogParametroContent,
    DocViewerComponent,
    InformacionETCComponent,
    TablerosuapaComponent,

    // seguridad
    ListSeguridadELMAH_ErrorComponent,
    DialogSeguridadELMAH_ErrorContent,

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class PageModule {


}


