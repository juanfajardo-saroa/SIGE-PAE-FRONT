import { Component, OnInit, Inject, Optional, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from "rxjs";
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratosModel } from 'src/app/shared/model/Contratos';
import { EstadoQuincenaModel } from 'src/app/shared/model/EstadoQuincena';
import { GradosSedesJornadasModel } from 'src/app/shared/model/GradosSedesJornadas';
import { OperadoresModel } from 'src/app/shared/model/Operadores';
import { ContratosService } from 'src/app/shared/services/Contratos.services';
import { EstadoQuincenaService } from 'src/app/shared/services/EstadoQuincena.services';
import { GradosSedesJornadasService } from 'src/app/shared/services/GradosSedesJornadas.services';
import { OperadoresService } from 'src/app/shared/services/Operadores.services';
import { QuincenaEntregaRacionesModel } from 'src/app/shared/model/QuincenaEntregaRaciones';
import { QuincenaEntregaRacionesService } from 'src/app/shared/services/QuincenaEntregaRaciones.services';
import { QuincenaEntregaRacionesExtendModel } from 'src/app/shared/model/QuincenaEntregaRacionesExtend';



@Component({
    selector: "app-list-QuincenaEntregaRacionesExtend",
    templateUrl: "./list-QuincenaEntregaRacionesExtend.component.html",
    styleUrls: ["./list-QuincenaEntregaRacionesExtend.component.scss"],
})

export class ListQuincenaEntregaRacionesExtendComponent implements OnInit, OnDestroy {

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
    private apiurl = environment.baseUrlAPI_Seguimiento + "QuincenaEntregaRaciones";
    QuincenaEntregaRacionesDetail: QuincenaEntregaRacionesModel | null = null;
    QuincenaEntregaRacionesList: QuincenaEntregaRacionesModel[] = [];
    currentYear = new Date().getFullYear();
    dateToday: number = Date.now();
    nombreETC = environment.nameETC;
    idETC = environment.idETC;
    nombreOperador = environment.nombreOperador;
    idOperador = environment.nombreOperador;
    private dataArray: any;
    displayedColumns: string[] = ['select', "id", "iD_EstadoQuincena", "siD_EstadoQuincena", "iD_Contrato", "siD_Contrato", "iD_Operador", "siD_Operador", "iD_GradoSedeJornada", "siD_GradoSedeJornada", "auditoria", 'action'];
    public dataSource!: MatTableDataSource<QuincenaEntregaRacionesModel>;
    selection = new SelectionModel<QuincenaEntregaRacionesModel>(true, []);


    constructor(public dialog: MatDialog, public QuincenaEntregaRacionesService: QuincenaEntregaRacionesService) { }

    ngOnInit(): void {


    }

    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
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
        const dialogRef = this.dialog.open(DialogQuincenaEntregaRacionesExtendContent, {
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Add') {
                this.addRowData(result.data);
            } else if (result.event === 'Update') {
                this.updateRowData(result.data);
            } else if (result.event === 'Delete') {
                this.deleteRowData(result.data);
            }
        });
    }
    // tslint:disable-next-line - Disables all
    addRowData(row_obj: QuincenaEntregaRacionesExtendModel): void {
        this.QuincenaEntregaRacionesService.addQuincenaEntregaRaciones(row_obj).subscribe(
            (response) => {
                this.ngOnInit();
            },
            (err) => {
            }
        );
    }

    // tslint:disable-next-line - Disables all
    updateRowData(row_obj: QuincenaEntregaRacionesExtendModel): boolean | any {
        this.QuincenaEntregaRacionesService.updateQuincenaEntregaRaciones(row_obj).subscribe(
            (response) => {
                this.ngOnInit();
            },
            (err) => {
            }
        );
    }

    // tslint:disable-next-line - Disables all
    deleteRowData(row_obj: QuincenaEntregaRacionesExtendModel): boolean | any {
        const ideliminar = row_obj.id;

        this.QuincenaEntregaRacionesService.deleteQuincenaEntregaRaciones(ideliminar).subscribe(
            (response) => {
                this.ngOnInit();
            },
            (err) => {

            }
        );

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
}

@Component({
    // tslint:disable-next-line - Disables all
    selector: 'dialog-content',
    templateUrl: 'list-QuincenaEntregaRacionesExtend.dialog.component.html',
    styleUrls: ["./list-QuincenaEntregaRacionesExtend.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogQuincenaEntregaRacionesExtendContent {
    action: string;
    // tslint:disable-next-line - Disables all
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';
    // instancia del formulario
    form: FormGroup;

    // Listas relacionales
    ContratosList: ContratosModel[];
    EstadoQuincenaList: EstadoQuincenaModel[];
    GradosSedesJornadasList: GradosSedesJornadasModel[];
    OperadoresList: OperadoresModel[];



    constructor(public dialogRef: MatDialogRef<DialogQuincenaEntregaRacionesExtendContent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: QuincenaEntregaRacionesModel,
        private fb: FormBuilder
        , private contratosService: ContratosService
        , private estadoQuincenaService: EstadoQuincenaService
        , private gradosSedesJornadasService: GradosSedesJornadasService
        , private operadoresService: OperadoresService

    ) {

        this.contratosService.getContratosList().subscribe(
            (response: any) => {
                this.ContratosList = response;
            },
            (err) => {
            }
        );
        this.estadoQuincenaService.getEstadoQuincenaList().subscribe(
            (response: any) => {
                this.EstadoQuincenaList = response;
            },
            (err) => {
            }
        );
        this.gradosSedesJornadasService.getGradosSedesJornadasList().subscribe(
            (response: any) => {
                this.GradosSedesJornadasList = response;
            },
            (err) => {
            }
        );
        this.operadoresService.getOperadoresList().subscribe(
            (response: any) => {
                this.OperadoresList = response;
            },
            (err) => {
            }
        );


        this.form = this.fb.group({
            id: [data.id],
            iD_EstadoQuincena: [data.iD_EstadoQuincena],
            iD_Contrato: [data.iD_Contrato, Validators.required],
            iD_GradoSedeJornada: [data.iD_GradoSedeJornada, Validators.required],
            auditoria: [''],
        });



        this.local_data = { ...data };
        this.action = this.local_data.action;
    }

    doAction(): void {
        this.dialogRef.close({ event: this.action, data: this.form.value });
    }

    closeDialog(): void {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
