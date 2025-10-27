import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Instituciones,
  Municipio,
  PlanAlistamientoService,
  ProductosRuta,
  Ruta,
  SedeRuta,
  SedesIE,
} from 'src/app/shared/services/plan-alistamiento.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

export interface infoRuta {
  municipio: Municipio;
  institucionEducativa: Instituciones;
  sede: SedesIE;
  ordenRuta: number;
  combustible: string | boolean;
  agua: string | boolean;
}

export interface infoprod {
  iD_Ruta: number,
  Productos: ProductosRuta;
  iD_TipoPeriocidad: number;

}

export interface RutaEliminar {
  numeroRuta: number;
  sedesRuta: number;
}
@Component({
  selector: 'app-desplegable-ruta',
  templateUrl: './desplegable-ruta.component.html',
  styleUrls: ['./desplegable-ruta.component.scss'],
})
export class DesplegableRutaComponent implements OnInit, OnChanges {
  @Input() numeroRuta!: number;
  @Input() numRuta!: number;
  @Input() sedesPorAsignar!: number;
  @Input() modeloOperacion?: string;
  @Input() inactivar?: boolean;
  @Input() rutas: any = []
  @Output() rutaEliminar: EventEmitter<RutaEliminar> = new EventEmitter();
  @Output() rutaAgregada: EventEmitter<boolean> = new EventEmitter();
  panelAbierto: boolean = false;
  modoEdicionRuta: boolean = false;
  sedesRuta: number = 0;
  infoSedesRuta: SedeRuta[];
  productosRuta: ProductosRuta[];

  constructor(
    private planAlistamientoService: PlanAlistamientoService,     
    private _seguridadService: SeguridadService,
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    //this.modoEdicionRuta = this.inactivar;
    this.getProductosRuta();
    this.planAlistamientoService
      .getSedesPorRuta(this.numeroRuta)
      .subscribe((data) => {
        this.infoSedesRuta = data;
        this.sedesRuta = this.infoSedesRuta.length;
      });
  }

  getProductosRuta() {

    this.planAlistamientoService
      .getProductosRuta(this.numeroRuta)
      .subscribe((data) => {
        this.productosRuta = data;
      });
  }

  editarRuta(): void {
    this.modoEdicionRuta = !this.modoEdicionRuta;
  }

  guardarRuta(formularioSedes: []) {
    let infoRutas: Ruta[] = [];
    formularioSedes.forEach((sede: infoRuta, index) => {
      if (sede.sede!==null)
      {
      let dataRuta = {
        iD_Ruta: this.numeroRuta,
        numRuta: this.numRuta,
        iD_Sede: sede.sede?.iD_Sede,
        numeracion: sede.ordenRuta === null ? 0 : sede.ordenRuta,
        recibeGas: sede.combustible === 'si' ? true : false,
        recibeAgua: sede.agua === 'si' ? true : false,
        estado: true,
        auditoria: LocalStorage.getAuditoria('')
      };
      infoRutas.push(dataRuta);
    }
    });
    this.planAlistamientoService.eliminarRuta(this.numeroRuta, 1).subscribe(() => {
      this.planAlistamientoService.agregarPlanRutas(infoRutas).subscribe(response => {
        if (response.success) {
            //this.ngOnInit();
            setTimeout(() => {
              this.rutaAgregada.emit(true);
            }, 3000);
        }
      });
    });
  }

  guardarProductosRuta(infoProductos: any) {

    /*let productosRuta: any[] = [];
     infoProductos.forEach((prod: infoprod, index) => {
      let productos = {
        iD_Ruta: this.numeroRuta,
        iD_TipoProductoRuta: prod.Productos[index].iD_TipoProductoRuta,
        iD_TipoPeriocidad:  prod.Productos[index].iD_TipoPeriocidad,
        auditoria:  LocalStorage.getAuditoria('')
      };
      productosRuta.push(productos);
    }); */

    const productosRuta: any[] = [
      [
        {
          iD_TipoProductoRuta: 1,
          iD_Ruta: this.numeroRuta,
          producto: 'Viveres',
          iD_TipoPeriocidad: infoProductos.viveres.id,
          auditoria: LocalStorage.getAuditoria(''),
        },
      ],
      [
        {
          iD_TipoProductoRuta: 2,
          iD_Ruta: this.numeroRuta,
          producto: 'InsumosAseo',
          iD_TipoPeriocidad: infoProductos.insumosAseo.id,
          auditoria: LocalStorage.getAuditoria(''),
        },
      ],
      [
        {
          iD_TipoProductoRuta: 3,
          iD_Ruta: this.numeroRuta,
          producto: 'Gas/Combustible',
          iD_TipoPeriocidad: infoProductos.combustible.id,
          auditoria: LocalStorage.getAuditoria(''),
        },
      ],
      [
        {
          iD_TipoProductoRuta: 4,
          iD_Ruta: this.numeroRuta,
          producto: 'Agua',
          iD_TipoPeriocidad: infoProductos.agua.id,
          auditoria: LocalStorage.getAuditoria(''),
        },
      ],
    ];
    this.planAlistamientoService
    .agregarProductosRuta(productosRuta)
    .subscribe((res) => {
      this.getProductosRuta();
    });

  }

  modoVerInformacionRuta(bool: boolean): void {
    this.modoEdicionRuta = bool;
  }

  eliminarRuta(): void {
    this.rutaEliminar.emit({
      numeroRuta: this.numeroRuta,
      sedesRuta: this.sedesRuta,
    });
  }

  getModulePermission(module: number, action: string): boolean {
    return this._seguridadService.getModulePermission(module, action);
  }

}