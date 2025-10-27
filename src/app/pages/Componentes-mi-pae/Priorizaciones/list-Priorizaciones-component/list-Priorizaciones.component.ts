import { TiposEstadosPriorizacionModel } from './../../../../shared/model/TiposEstadosPriorizacion';
import { Component, OnInit, Inject, Optional, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from "rxjs";
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriorizacionesModel } from 'src/app/shared/model/Priorizaciones';
import { PriorizacionesService } from 'src/app/shared/services/Priorizaciones.services';
import { PAPriorizacionesContratoService } from 'src/app/shared/services/PA_PriorizacionesContrato.services';
import { PAPriorizacionesContratoModel } from 'src/app/shared/model/PA_PriorizacionesContrato.model';
import { Router } from '@angular/router';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { SedesJornadaModel } from 'src/app/shared/model/SedesJornada';
import { TiposModalidadComplementoModel } from 'src/app/shared/model/TiposModalidadComplemento';
import { TiposModeloOperacionModel } from 'src/app/shared/model/TiposModeloOperacion';
import { TiposComplementoModel } from 'src/app/shared/model/TiposComplemento';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { SedesJornadaService } from 'src/app/shared/services/SedesJornada.services';
import { TiposEstadosPriorizacionService } from 'src/app/shared/services/TiposEstadosPriorizacion.services';
import { TiposModalidadComplementoService } from 'src/app/shared/services/TiposModalidadComplemento.services';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { NovedadesService } from 'src/app/shared/services/Novedades.services';
import { NovedadesModel } from 'src/app/shared/model/Novedades';
import { MessageService } from 'src/app/services/message.service';
import { SedesModelosOperacionService } from 'src/app/shared/services/SedesModelosOperacion.services';
import { SedesModelosOperacionModel } from 'src/app/shared/model/SedesModelosOperacion';
import { ModalidadModeloModel } from 'src/app/shared/model/ModalidadModelo';
import { ModalidadModeloService } from 'src/app/shared/services/ModalidadModelo.services';



@Component({
    selector: "app-list-Priorizaciones",
    templateUrl: "./list-Priorizaciones.component.html",
    styleUrls: ["./list-Priorizaciones.component.scss"],
})

export class ListPriorizacionesComponent implements OnInit, AfterViewInit, OnDestroy {

    private subs = new Subscription();
    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort) sort: MatSort = Object.create(null);

    searchText: any;
    totalCount = -1;
    Closed = -1;
    Inprogress = -1;
    Open = -1;
    isLoading = true;
    private apiurl = environment.baseUrlAPI_Priorizacion + "Priorizaciones";
    PriorizacionesDetail: PriorizacionesModel | null = null;
    PriorizacionesList: PriorizacionesModel[] = [];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC = environment.nameETC;
    novedadesList: NovedadesModel[];
    currentSede: number;

    private dataArray: any;
    displayedColumns: string[] = ["grado", "jornada", "modalidad", "modelo", "tipoRacion", "numeroComplementos", "action"];
    public dataSource!: MatTableDataSource<PAPriorizacionesContratoModel>;
    selection = new SelectionModel<PAPriorizacionesContratoModel>(true, []);

    constructor(public dialog: MatDialog,
        private PriorizacionesService: PriorizacionesService,
        private priorizacionesContratoService: PAPriorizacionesContratoService,
        private seguridadService: SeguridadService,
        private novedadesService: NovedadesService,
        private messageService: MessageService,
        public router: Router) {
        this.getSedeByUrl();
    }

    ngOnInit(): void {

        this.priorizacionesContratoService.getPA_Priorizaciones(this.currentSede).subscribe(
            (response: any) => {
                this.dataArray = response;
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<PAPriorizacionesContratoModel>(this.dataArray);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (err) => {
                this.isLoading = false;
            }
        );
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
    }

    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    getModulePermission(module: number, action: string): boolean {
        return this.seguridadService.getModulePermission(module, action);
    }

    ngAfterViewInit(): void {
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    }

    getSedeByUrl() {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        this.currentSede = Number(currentUrl[2]);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    btnCategoryClick(val: string): number {
        this.dataSource.filter = val.trim().toLowerCase();
        return this.dataSource.filteredData.length;

    }

    openDialog(action: string, obj: any): void {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogPriorizacionesContent, {
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Agregar') {
                this.addRowData(result.data);
            } else if (result.event === 'Actualizar') {
                this.updateRowData(result.data);
            } else if (result.event === 'Eliminar') {
                this.deleteRowData(result.data);
            }
        });
    }
    // tslint:disable-next-line - Disables all
    addRowData(row_obj: PriorizacionesModel): void {
        this.PriorizacionesService.addPriorizaciones(row_obj).subscribe(
            (response) => {
                this.ngOnInit();
            },
            (err) => {
            }
        );
    }

    // tslint:disable-next-line - Disables all
    updateRowData(row_obj: PriorizacionesModel): boolean | any {
        row_obj.iD_TipoEstadoPriorizacion = 1;
        this.PriorizacionesService.updatePriorizaciones(row_obj).subscribe(
            (response) => {
                this.ngOnInit();
            },
            (err) => {
            }
        );
    }

    // tslint:disable-next-line - Disables all
    deleteRowData(row_obj: PriorizacionesModel): boolean | any {
        row_obj.iD_TipoEstadoPriorizacion = 1;
        const ideliminar = row_obj.id;

        this.novedadesService.getNovedadesListFull().subscribe(
            (response: any) => {
                this.novedadesList = response;
                if (this.novedadesList.find(novedad => novedad.iD_Sede == ideliminar)) {
                    this.messageService.showError("Asegurese que no tenga novedades", 'top center');
                } else {
                    this.PriorizacionesService.deletePriorizaciones(ideliminar).subscribe(
                        (response) => {
                            this.ngOnInit();
                        },
                        (err) => {

                        }
                    );
                }
            },
            (err) => {
            }
        );



    }

    back() {
        this.router.navigateByUrl('/SedesBeneficiarias')
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
    irNovedades(row: PriorizacionesModel) {
        this.router.navigate(['Novedades'], { queryParams: { id: row.id, idP: this.currentSede } })
    }
}

@Component({
    // tslint:disable-next-line - Disables all
    selector: 'dialog-content',
    templateUrl: 'list-Priorizaciones.dialog.component.html',
    styleUrls: ["./list-Priorizaciones.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogPriorizacionesContent {
    action: string;
    // tslint:disable-next-line - Disables all
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    GradosSedesJornadasList: GradosSedesJornadasModel[];
    GradosSedesJornadasListBySede: GradosSedesJornadasModel[];
    selectGradosSedesJornadasListBySede: GradosSedesJornadasModel[];
    SedesJornadasList: SedesJornadaModel[];
    SedesJornadasListBySede: SedesJornadaModel[];
    IdSedesJornadasListBySede: number[] = [];
    TiposEstadosPriorizacionList: TiposEstadosPriorizacionModel[];
    TiposModalidadRacionList: TiposModalidadComplementoModel[];
    TiposModalidadRacionListTemp: TiposModalidadComplementoModel[];
    TiposModalidadRacionListForever: TiposModalidadComplementoModel[];
    TiposModeloOperacionList: TiposModeloOperacionModel[];
    TiposModeloOperacionListBySede: TiposModeloOperacionModel[];
    ModalidadModeloList: ModalidadModeloModel[];
    TiposRacionList: TiposComplementoModel[];
    TiposRacionListForever: TiposComplementoModel[];
    temp: TiposComplementoModel[];
    completarList = [
        { id: 1, nombre: "Matricula completa" },
        { id: 2, nombre: "Ceros (0)" }];

    currentSede: number;
    sedesModelosOperacionlist: SedesModelosOperacionModel[];
    previousJornada: number;
    constructor(public dialogRef: MatDialogRef<DialogPriorizacionesContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
        , private gradosSedesJornadasService: GradosSedesJornadasService
        , private sedesJornadasService: SedesJornadaService
        , private tiposEstadosPriorizacionService: TiposEstadosPriorizacionService
        , private tiposModalidadRacionService: TiposModalidadComplementoService
        , private tiposModeloOperacionService: TiposModeloOperacionService
        , private tiposRacionService: TiposComplementoService
        , private sedesModelosOperacionService: SedesModelosOperacionService
        , private modalidadModeloService: ModalidadModeloService
        , public router: Router

    ) {
        this.form = this.fb.group({
            id: [data.id],
            jornada: [this.previousJornada, Validators.required],
            iD_GradoSedeJornada: [data.iD_GradoSedeJornada, Validators.required],
            iD_TipoModalidadComplemento: [data.iD_TipoModalidadComplemento, Validators.required],
            iD_TipoModeloOperacion: [data.iD_TipoModelooperacion, Validators.required],
            iD_TipoComplemento: [data.iD_TipoComplemento],
            numeroComplementos: [data.numeroComplementos, Validators.required],
            auditoria: [''],
        });
        this.getSedeByUrl();
        this.sedesJornadasService.getSedesJornadaListRelation().subscribe(
            (response: any) => {
                this.SedesJornadasList = response;
                this.SedesJornadasListBySede = this.SedesJornadasList.filter(element => element.iD_Sede == this.currentSede);
                this.SedesJornadasListBySede.forEach(element => this.IdSedesJornadasListBySede.push(element.id));
                this.previousJornada = this.SedesJornadasListBySede.find(element => element.sID_Jornada == data.sID_jornada) ? this.SedesJornadasListBySede.find(element => element.sID_Jornada == data.sID_jornada).id : null;
                if (this.previousJornada) {
                    this.form.controls['jornada'].setValue(this.previousJornada);
                }
                this.gradosSedesJornadasService.getGradosSedesJornadasListRelation().subscribe(
                    (response: any) => {
                        this.GradosSedesJornadasList = response;
                        this.GradosSedesJornadasListBySede = this.GradosSedesJornadasList.filter(grado => this.IdSedesJornadasListBySede.includes(grado.iD_SedeJornada));
                        this.selectGradosSedesJornadasListBySede = this.GradosSedesJornadasListBySede
                    },
                    (err) => {
                    }
                );
            },
            (err) => {
            }
        );

        this.tiposEstadosPriorizacionService.getTiposEstadosPriorizacionList().subscribe(
            (response: any) => {
                this.TiposEstadosPriorizacionList = response;
            },
            (err) => {
            }
        );
        this.tiposModalidadRacionService.getTiposModalidadComplementoList().subscribe(
            (response: any) => {
                this.TiposModalidadRacionList = response;
                this.TiposModalidadRacionListForever = response;
            },
            (err) => {
            }
        );
        this.tiposModeloOperacionService.getTiposModeloOperacionList().subscribe(
            (response: any) => {
                this.TiposModeloOperacionList = response;
                this.sedesModelosOperacionService.getSedesModelosOperacionListBySede(this.currentSede).subscribe(
                    (response: any) => {
                        this.sedesModelosOperacionlist = response;
                        this.TiposModeloOperacionListBySede = [];
                        this.sedesModelosOperacionlist.forEach(element => {
                            this.TiposModeloOperacionListBySede.push(this.TiposModeloOperacionList.find(modelo => modelo.id == element.iD_TipoModeloOperacion));
                        });
                    },
                    (err) => {
                    }
                );
            },
            (err) => {
            }
        );
        this.tiposRacionService.getTiposComplementoList().subscribe(
            (response: any) => {
                this.TiposRacionList = response;
                this.TiposRacionListForever = response;
            },
            (err) => {
            }
        );





        this.local_data = { ...data };
        this.action = this.local_data.action;
    }
    onJornadaClick(value: any) {
        this.selectGradosSedesJornadasListBySede = this.GradosSedesJornadasListBySede.filter(element => element.iD_SedeJornada == value);
    }

    onTipoModalidadRacionClick(value: any) {
        if (value == 2) {
            this.temp = []
            this.TiposRacionList.forEach(tipoRacion => {
                if (tipoRacion.nombre != 'Almuerzo') {
                    this.temp.push(tipoRacion);
                }
            });
            this.TiposRacionList = this.temp;
        } else {
            this.TiposRacionList = this.TiposRacionListForever;
        }

    }

    onTipoModeloOperacionClick(value: any) {
        this.modalidadModeloService.getModalidadModeloListByModelo(value).subscribe(
            (response: any) => {
                this.ModalidadModeloList = response;
                this.TiposModalidadRacionListTemp = [];
                this.ModalidadModeloList.forEach(element => {
                    var modalidadTemp = this.TiposModalidadRacionListForever.find(modalidad => modalidad.id == element.iD_TipoModalidadComplemento);
                    if (modalidadTemp) {
                        this.TiposModalidadRacionListTemp.push(modalidadTemp);
                    }
                });
                this.TiposModalidadRacionList = this.TiposModalidadRacionListTemp;
            },
            (err) => {
            }
        );
    }

    doAction(): void {
        if (this.action == "Agregar") {
            this.form.value.iD_TipoEstadoPriorizacion = 3;
        }

        if (this.action == "Actualizar") {
            this.form.value.iD_TipoEstadoPriorizacion = this.data.iD_TipoEstadoPriorizacion;
        }
        this.dialogRef.close({ event: this.action, data: this.form.value });
    }

    closeDialog(): void {
        this.dialogRef.close({ event: 'Cancel' });
    }

    getSedeByUrl() {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        this.currentSede = Number(currentUrl[2]);
    }

}
