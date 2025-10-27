import { PACService } from './../../../../shared/services/PAC.services';
import { NotificacionModel } from './../../../../shared/model/Notificacion';

import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngresosModel } from 'src/app/shared/model/Ingresos';
import { MesesModel } from 'src/app/shared/model/Meses';
import { PlanGirosModel } from 'src/app/shared/model/PlanGiros';
import { IngresosService } from 'src/app/shared/services/Ingresos.services';
import { MesesService } from 'src/app/shared/services/Meses.services';
import { PlanGirosService } from 'src/app/shared/services/PlanGiros.services';
import { AprobacionesModel } from 'src/app/shared/model/Aprobaciones';
import { AprobacionesService } from 'src/app/shared/services/Aprobaciones.services';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { ETCModel } from 'src/app/shared/model/ETC';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AccionesAprobacionModel } from 'src/app/shared/model/AccionesAprobacion';
import { AccionesAprobacionService } from 'src/app/shared/services/AccionesAprobacion.services';
import { DiagnosticoAprobacionesModel } from 'src/app/shared/model/DiagnosticoAprobaciones';
import { AprobacionesGetAllWithRelService } from 'src/app/shared/services/AprobacionesGetAllWithRel.services';
import { GetAprobacionesGetAllWithRelModel } from 'src/app/shared/model/PA_AprobacionesGetAllWithRel.Model';
import { NotificacionService } from 'src/app/shared/services/Notificacion.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { SistemaModel } from 'src/app/shared/model/Sistema';
import { SistemaService } from 'src/app/shared/services/Sistema.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PACModel } from 'src/app/shared/model/PACModel';
@Component({
  selector: 'app-anual-principal',
  templateUrl: './anual-principal.component.html',
  styleUrls: ['./anual-principal.component.scss']
})
export class AnualPrincipalComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  decimalPipe = new DecimalPipe(navigator.language);
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  private apiurl = environment.baseUrlAPI + "PlanGiros";
  PlanGirosDetail: PACModel | null = null;
  PlanGirosList: PACModel[] = [];
  ETCList: ETCModel[] = []
  ingresoList: IngresosModel[] = [];
  mesesList: MesesModel[] = [];
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = localStorage.getItem('Ubicacion');
  nombrePAC = environment.nombrePAC;
  consultarResoluciones = environment.consultarResoluciones;
  ingresoTotal: number = 0;
  solicitadoTotal: number = 0;
  transferidoTotal: number = 0;
  diferenciaTotal: number = 0;
  idAprobaciones = 0;
  idSedesUbicacion = 0;
  private dataArray: any;
  displayedColumns: string[] = ["siD_ETC", "mes", "giroProyectado", "giroConfirmado", "fecha", "orden", "diferencia", 'action'];
  public dataSource!: MatTableDataSource<PACModel>;
  public dataSourceAprobaciones: MatTableDataSource<DiagnosticoAprobacionesModel>;
  displayedColumnsAprobaciones: string[] = ["fecha", "responsable", "rol", "accion", "observaciones"];
  selection = new SelectionModel<PACModel>(true, []);
  form: FormGroup;
  aprobar = [];
  lista = [];
  idETC: string;
  private dataArrayAprobaciones: any;
  AccionesAprobacionList: AccionesAprobacionModel[];
  AccionesAprobacionesList: AccionesAprobacionModel[];
  UsersList: GetAprobacionesGetAllWithRelModel[];
 
  
  constructor(
    public dialog: MatDialog,
    private PlanGirosService: PlanGirosService,
    private servicioIngreso: IngresosService,
    private servicioETC: ETCService,
    private meses: MesesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private AccionesAprobacionService: AccionesAprobacionService,
    private serviciosp: AprobacionesGetAllWithRelService,
    private aprobacionesService: AprobacionesService,
    private seguridadService:SeguridadService,
    private router: Router,
    private _PACService:PACService,
  ) {
    
    this.fillTable()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idAprobaciones = +params.id;
      this.idSedesUbicacion = +params.idubicacion;

    });
    
    

    this.servicioIngreso.getIngresosList().subscribe(
      (response: any) => {

        this.ingresoList = response.filter(item => item.iD_Vigencia == 1)
        let initialValue = 0;

        this.ingresoList.forEach((item) => {
          initialValue += item.valor;
        });
        this.ingresoTotal = initialValue

      },
      (err) => {
      }
    );
    this.servicioETC.getETCList().subscribe(
      (response: any) => {
        this.ETCList = response

      },
      (err) => {
        this.isLoading = false;
      }
    );
    this.meses.getMesesList().subscribe(
      (response: any) => {

        this.mesesList = response

      },
      (err) => {
      }
    );
    

    //this.fillTableAprobaciones()
   
  }
  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    this.dataSource.paginator = this.paginator;
  }

  

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;

  }
  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);
    
  }
  openInfraesturaDetalle() {
   
    this.router.navigate(['/asignacionrecursos'])
   
  }
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogAnualPrincipalContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: PlanGirosModel): void {
    this.PlanGirosService.addPlanGiros(row_obj).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: PlanGirosModel): boolean | any {
    this.PlanGirosService.updatePlanGiros(row_obj).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: PlanGirosModel): boolean | any {
    const ideliminar = row_obj.id;

    this.PlanGirosService.deletePlanGiros(ideliminar).subscribe(
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
  
  fillTable(){

    this._PACService.getPACListRelation().subscribe(
      (response: any) => {
        this.dataArray = response;

        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PACModel>(this.dataArray);
        
        let initialValue = 0;
        let initialValue2 = 0;
        let initialValue3 = 0;
        response.forEach((item) => {
          initialValue += item.giroProyectado;
          initialValue2 += item.giroConfirmado;
           
        });
        this.solicitadoTotal = initialValue;
        this.transferidoTotal = initialValue2;
        response.forEach((item2) => {
          if(item2.giroConfirmado!==null){
            let diferencia = item2.giroConfirmado-item2.giroProyectado;
            initialValue3+= diferencia
           }
        });
        this.diferenciaTotal = initialValue3;

        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primero";
        this.paginator._intl.lastPageLabel = "Último";
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
        };
        this.dataSource.sort = this.sort;

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
 
 
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'anual-principal.dialog.component.html',
  styleUrls: ["./anual-principal.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogAnualPrincipalContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales
  ETCList: ETCModel[];
  MesList: MesesModel[];
  AprobacionesList: any;
  lista = [];
 

  constructor(public dialogRef: MatDialogRef<DialogAnualPrincipalContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PlanGirosModel,
    private fb: FormBuilder,
    private eTCService: ETCService,
    public meses: MesesService,
    private aprobacionesService: AprobacionesService,
    public dialog: MatDialog,
    private notificacionService: NotificacionService,
  ) {

   
    this.form = this.fb.group({
      id: [data.id],
      iD_ETC: [data.iD_ETC],
      siD_ETC: [''],
      mes: [data.mes],
      giroProyectado: [data.giroProyectado, Validators.required],
      giroConfirmado: [data.giroConfirmado],
      auditoria: [''],
      sID: [''],
      sID_ETC: [''],
      sMes: [''],
      idVigencia: [data.idVigencia],
      sidVigencia: [''],
      fechaTransferencia: [data.fechaTransferencia],
      numeroOrden: [0],
      filtro: [''],
      pathSoporteGiro: [''],
    });


    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    //this.dialogRef.close({ event: this.action, data: this.form.value });
    Swal.fire({
      title:
        '<p style="text-align: center!important; font-size: 20px; color:#005ACA;">(Está acción no se puede revertir) </p> ',

      confirmButtonText: 'Actualizar',
      confirmButtonColor: '#005BCB',
      cancelButtonColor: '#005BCB',
      showCancelButton: true,
      showConfirmButton: true,
      //showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.dialogRef.close({ event: this.action, data: this.form.value });
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
 
}


