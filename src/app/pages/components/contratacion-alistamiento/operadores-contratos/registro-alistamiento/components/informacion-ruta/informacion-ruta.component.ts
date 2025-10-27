import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Observable } from 'rxjs';
import {
  Instituciones,
  Municipio,
  PlanAlistamientoService,
  ProductosRuta,
  SedeRuta,
  SedesIE,
} from 'src/app/shared/services/plan-alistamiento.service';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-informacion-ruta',
  templateUrl: './informacion-ruta.component.html',
  styleUrls: ['./informacion-ruta.component.scss'],
})
export class InformacionRutaComponent implements OnInit {
  readonly SI: string = 'si';
  readonly NO: string = 'no';

  @Input() set modoEdicion(editar: boolean) {
    if(editar) {
      this.cargarSedesEnRutaExistentes();
      this.formSedesArray.push(this.formSede());
      this.getPeriodicidad();
    }
    this.editar = editar;
  }
  @Input() sedesPorAsignar: number;
  @Input() infoSedesRuta: SedeRuta[];
  @Input() productosRuta: ProductosRuta[];
  @Output() cambiarModoVista: EventEmitter<boolean> = new EventEmitter();
  @Output() infoRutas: EventEmitter<any> = new EventEmitter();
  @Output() infoProductos: EventEmitter<any> = new EventEmitter();
  editar: boolean;
  idPlanAlistamiento: number;
  idInstitucionEd: number;
  entregaViveres: string;
  municipios: any;
  instituciones: any[] = [];
  sedes: any[] = [];
  periodicidadEntrega: any[] = [];
  formEntregaProductos: FormGroup;
  formSedesRuta: FormGroup;
  institucionSeleccionada: any = 'Seleccione';
  filtroMunicipios: Observable<any[]>;
  filtroInstituciones: Observable<any[]>;
  filtroSedes: Observable<any[]>;
  inputMunicipio = new FormControl('');
  inputInstitucion = new FormControl('');
  inputSedes = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private mensajeServicio: MessageService,
    private planAlistamientoService: PlanAlistamientoService
  ) {}

  ngOnInit(): void {

    this.planAlistamientoService.idPlan.subscribe((valor) => {
      this.idPlanAlistamiento = valor;
    });

    this.getInfoMunicipios();

    this.inicializarFormularioSedes();

    this.formEntregaProductos = this.formBuilder.group({
      viveres: [null, Validators.required],
      insumosAseo: [null, Validators.required],
      combustible: [null, Validators.required],
      agua: [null, Validators.required],
    });
    this.getPeriodicidad();
  }

  inicializarFormularioSedes(): void {
    this.formSedesRuta = this.formBuilder.group({
      sedes: this.formBuilder.array([]),
    });
  }

  formSede(): FormGroup {
    return this.formBuilder.group({
      municipio: [null, Validators.required],
      institucionEducativa: [null, Validators.required],
      sede: [null, Validators.required],
      ordenRuta: [null, Validators.required],
      combustible: [null, Validators.required],
      agua: [null, Validators.required],
    });
  }

  getPeriodicidad(): void {
    this.planAlistamientoService
      .getPeriodicidad()
      .subscribe((dataPeriodicidad) => {
        this.periodicidadEntrega = dataPeriodicidad;
        this.getProductos(this.productosRuta);
      });
  }

  agregarSedeARuta(): void {
    if (this.formSedesArray.status === 'VALID') {
      this.validarSedesPorAsignar();
    } else {
      this.showAlert();
    }
  }

  validarSedesPorAsignar(): void {
    if (this.sedesPorAsignar > this.formSedesArray.length) {
      this.formSedesArray.push(this.formSede());
    } else {
      this.mensajeServicio.showWarning(
        'No puede asignar más sedes',
        'top center'
      );
    }
  }

  validarSelect(element: string): boolean {
    return (this.formEntregaProductos.get(element).value === null || this.formEntregaProductos.get(element).value === undefined) &&
      this.formEntregaProductos.get(element).touched
      ? true
      : false;
  }

  validarSelectSedes(indice: number, element: string): boolean {
    return this.formSedesArray.controls[indice].get(element).value === null &&
      this.formSedesArray.controls[indice].get(element).touched
      ? true
      : false;
  }

  modoVerInformacionRuta(): void {
    this.cambiarModoVista.emit(false);
    this.editar = false;
    this.formEntregaProductos.reset();
    this.formSedesRuta.reset();
    this.formSedesArray.clear();
    this.inputMunicipio.reset();
    this.inputInstitucion.reset();
    this.inputSedes.reset();
  }

  getInfoMunicipios(): void {
    this.planAlistamientoService
      .getInfoMunicipios(this.idPlanAlistamiento)
      .subscribe((dataMunicipios) => {
        this.municipios = dataMunicipios;
        this.filtroMunicipios = this.inputMunicipio.valueChanges.pipe(
          startWith(''),
          map((valor) => this.filtrarMunicipios(valor || ''))
        );

      });
  }

  getInstituciones(indice: number): void {
    if (this.formularioSedes) {
      let municipioSeleccionado = this.formularioSedes[indice].municipio;

      this.instituciones[indice] = municipioSeleccionado.instituciones;

      this.filtroInstituciones = this.inputInstitucion.valueChanges.pipe(
        startWith(''),
        map((valor) => this.filtrarInstituciones(valor || ''))
      );
    }
  }

  getSedes(indice: number): void {
    let institucionSeleccionada = this.formularioSedes[indice].institucionEducativa;

    this.sedes[indice] = institucionSeleccionada.sedes;

    this.filtroSedes = this.inputSedes.valueChanges.pipe(
      startWith(''),
      map((valor) => this.filtrarSedes(valor || ''))
    );
  }

  private filtrarMunicipios(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.municipios.filter((municipio: Municipio) =>
      municipio.municipio.toLowerCase().includes(filtro)
    );
  }

  private filtrarInstituciones(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.instituciones[0].filter((institucion: Instituciones) =>
      institucion.institucionEducativa.toLowerCase().includes(filtro)
    );
  }

  private filtrarSedes(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.sedes[0].filter((sede: SedesIE) =>
      sede.sede.toLowerCase().includes(filtro)
    );
  }

  cargarSedesEnRutaExistentes(): void {
    if(this.infoSedesRuta.length > 0) {
      this.infoSedesRuta.forEach((sedeRuta: SedeRuta) => {
        const municipio: any = this.municipios.find(municipio => municipio.municipio == sedeRuta.municipio);
        const institucionEducativa: any = municipio.instituciones.find(institucion => institucion.institucionEducativa == sedeRuta.institucionEdu);
        const sede: any = institucionEducativa.sedes.find(sede => sede.sede == sedeRuta.sede);
        const formSedeRutaExistente: FormGroup = this.formBuilder.group({
          municipio: municipio,
          institucionEducativa: institucionEducativa,
          sede: sede,
          ordenRuta: sedeRuta.ordenRuta,
          combustible: sedeRuta.recibeGas ? this.SI : this.NO,
          agua: sedeRuta.recibeAgua ? this.SI : this.NO,
        });
        this.formSedesArray.push(formSedeRutaExistente);
        this.instituciones.push(municipio.instituciones);
        this.sedes.push(institucionEducativa.sedes);
      });
    }
  }

  guardarRuta(): void {
    if (this.formEntregaProductos.valid) {
      this.mensajeServicio.showInfo(
        'Se han guardado los cambios',
        'top center'
      );
      this.infoRutas.emit(this.formularioSedes);
      const infoProductos = {
        viveres: this.viveres,
        insumosAseo: this.insumosAseo,
        combustible: this.combustible,
        agua: this.agua,
      };
      this.infoProductos.emit(infoProductos);
      this.modoVerInformacionRuta();
    } else {
      this.formEntregaProductos.markAllAsTouched();
      this.formSedesRuta.markAllAsTouched()
      this.showAlert();
      /* this.mensajeServicio.showWarning(
        'Complete todos los campos requeridos',
        'top center'
      ); */
    }
  }

  cancelarEdicionRuta(): void{
    this.getProductos(this.productosRuta);
    const infoProductos = {
      viveres: this.viveres,
      insumosAseo: this.insumosAseo,
      combustible: this.combustible,
      agua: this.agua,
    };
    this.infoProductos.emit(infoProductos);
    this.modoVerInformacionRuta();
  }

  showAlert(): void {;
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px !important; position: absolute !important; top: 8% !important; right: 20px !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem;">Debe diligenciar todos los campos del formulario para poder continuar. </p> ',
      showConfirmButton: false,
      showCancelButton: false,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#FF0000',
      denyButtonColor: '#009922',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: false,
      denyButtonText: `Aceptar`,
    }).then((result) => {

    })
  }

  getProductos(productosRuta : any): void {

    for(let i=0; i<productosRuta.length; i++){
      if (productosRuta[i].producto=='Viveres')
      {
        this.formEntregaProductos.get('viveres').setValue(productosRuta[i].iD_TipoPeriocidad!=0 ? this.periodicidadEntrega.find(o => o.id === productosRuta[i].iD_TipoPeriocidad): null)  ;
      }
      else if (productosRuta[i].producto=='Insumos de Aseo')
      {
        this.formEntregaProductos.get('insumosAseo').setValue(productosRuta[i].iD_TipoPeriocidad!=0 ? this.periodicidadEntrega.find(o => o.id === productosRuta[i].iD_TipoPeriocidad): null);
      }
      else if (productosRuta[i].producto=='Gas/Combustible')
      {
        this.formEntregaProductos.get('combustible').setValue(productosRuta[i].iD_TipoPeriocidad!=0 ? this.periodicidadEntrega.find(o => o.id === productosRuta[i].iD_TipoPeriocidad): null);
      }
      else if (productosRuta[i].producto=='Agua')
      {
        this.formEntregaProductos.get('agua').setValue(productosRuta[i].iD_TipoPeriocidad!=0 ? this.periodicidadEntrega.find(o => o.id === productosRuta[i].iD_TipoPeriocidad): null);
      }
    }
  }

  get viveres() {
    return this.formEntregaProductos.get('viveres').value;
  }
  get insumosAseo() {
    return this.formEntregaProductos.get('insumosAseo').value;
  }
  get combustible() {
    return this.formEntregaProductos.get('combustible').value;
  }
  get agua() {
    return this.formEntregaProductos.get('agua').value;
  }
  get formularioSedes() {
    return this.formSedesRuta.get('sedes').value;
  }

  get formSedesArray() {
    return this.formSedesRuta.get('sedes') as FormArray;
  }
}
