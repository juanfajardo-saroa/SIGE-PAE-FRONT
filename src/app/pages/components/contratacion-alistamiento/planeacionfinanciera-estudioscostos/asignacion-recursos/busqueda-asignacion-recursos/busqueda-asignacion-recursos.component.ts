import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AsignacionRecursosApiService  } from '../../../../../../shared/services/asignacion-recursos-api.service';
import { MasterDataApiService  } from '../../../../../../shared/services/master-data-api.service';

@Component({
  selector: 'app-busqueda-asignacion-recursos',
  /* providers: [
    AsignacionRecursosApiService,
    MasterDataApiService,
  ] ,*/
  templateUrl: './busqueda-asignacion-recursos.component.html',
  styleUrls: ['./busqueda-asignacion-recursos.component.sass']
})
export class BusquedaAsignacionRecursosComponent implements OnInit,OnDestroy {

  myForm: FormGroup = new FormGroup({
    idFuenteRecurso: new FormControl({value: null, disabled: true }, [Validators.required]),
    idFuenteCHIP: new FormControl({ value: null, disabled: true }, [Validators.required]),
    nombre: new FormControl({ value: null, disabled: true }, [Validators.required]),
    valorPresupuestal: new FormControl({ value: null, disabled: true }, [Validators.required]),
    archivoResolucion: new FormControl(null)
  });

  get idFuenteRecurso(){
    return this.myForm.get('idFuenteRecurso');
  }
  get idFuenteCHIP(){
    return this.myForm.get('idFuenteCHIP');
  }
  get nombre(){
    return this.myForm.get('nombre');
  }
  get valorPresupuestal(){
    return this.myForm.get('valorPresupuestal');
  }
  get archivoResolucion(){
    return this.myForm.get('archivoResolucion');
  }

  public idETC: number = Number(localStorage.getItem('IdUbicacion') ?? 0);
  private subs = new Subscription() 
  public dataSource : any;
  public dataSourceETC : any;

  public listAsignaciones: any;
  public listFuentesRecursos: any;
  public listFuentesCHIP: any;
  public listETC : any;

  public idSearch: number = 0;
  public entity : any = {
    nombreArchivoResolucion: ''
  };
  public sumatoriaETC : number = 0;
  public nombreResolucion: string = '';
  public disabled: boolean = true;

  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;


  constructor(
    private _asignacionRecursosApiService : AsignacionRecursosApiService,
    private _masterDataApiService : MasterDataApiService,
  ) { }

  ngOnInit(): void {
    this.get_AsignacionRecursosPublicadas();
    this.get_ETCs();
    this.get_FuentesCHIP();
    this.get_FuentesFinanciacion();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  get_AsignacionRecursosPublicadas(){
    this._asignacionRecursosApiService.VerAsignacionRecursosPublicadas(this.idETC)
    .subscribe(response => {
      if(response.success){
        this.listAsignaciones = response.result;
        if(this.listAsignaciones.length > 0){
          this.idSearch = this.listAsignaciones[0].id;
          this.getAsignacionRecurso(this.idSearch);
        }
      }
    });
  }

  get_ETCs(){
    this._masterDataApiService.get_ETCs()
    .subscribe(response => {
      if(response.success){
        this.listETC = response.result;
      }
    });
  }

  get_FuentesCHIP(){
    this._asignacionRecursosApiService.get_FuenteIngresos(1)
    .subscribe(response => {
      this.listFuentesCHIP = response.result;
    });
  }

  get_FuentesFinanciacion(){
    this._asignacionRecursosApiService.get_FuentesFinanciacion()
    .subscribe(response => {
      this.listFuentesRecursos = response.result;
    });
  }


  changeIdSearch(id: any){
    this.idSearch = id;
    this.getAsignacionRecurso(id);
  }

  filtrar(){
    this.getAsignacionRecurso(this.idSearch);
  }

  setMyForm(){
    this.myForm = new FormGroup({
      idFuenteRecurso: new FormControl({value: this.entity.idFuenteRecurso, disabled: this.disabled}, [Validators.required]),
      idFuenteCHIP: new FormControl({ value:this.entity.idFuenteCHIP, disabled: this.disabled }, [Validators.required]),
      nombre: new FormControl({ value:this.entity.nombre, disabled: this.disabled }, [Validators.required]),
      valorPresupuestal: new FormControl({ value:this.entity.valorPresupuestal, disabled: this.disabled }, [Validators.required]),
      archivoResolucion: new FormControl(null)
    });
  }

  getAsignacionRecurso(id: number){
    this.nombreResolucion = '';
    this._asignacionRecursosApiService.GetAsignacionRecurso(id)
    .subscribe(response => {
      if(response.success){
        let element = response.result;

        this.entity = {
          id: element.id,
          idFuenteRecurso: element.iD_FuenteFinanciacion,
          idFuenteCHIP: element.iD_TipoFuenteChip,
          nombre: element.nombreResolucion,
          valorPresupuestal: element.valorPresupuestal,
          iD_EstadoResolucion: element.iD_EstadoResolucion,
          nombreArchivoResolucion: element.nombreArchivoResolucion
        };

        this.nombreResolucion = this.entity.nombre;

        this.dataSourceETC = [];
        this.sumatoriaETC = 0;
        for(let i = 0; i < element.distribucionAsignacionRecursos.length; i++){
          this.dataSourceETC.push({
            iD_ETC: element.distribucionAsignacionRecursos[i].iD_ETC,
            valorAsignado: element.distribucionAsignacionRecursos[i].valorAsignado
          });

          this.sumatoriaETC += element.distribucionAsignacionRecursos[i].valorAsignado;
        }
        this.setMyForm();
      }
    });
  }

  sumarValoresETC(){
    this.sumatoriaETC = 0;

    for(let i = 0; i < this.dataSourceETC.length; i++){
      if(this.dataSourceETC[i].valorAsignado != undefined){
        this.sumatoriaETC += this.dataSourceETC[i].valorAsignado;
      }
      else{
        this.sumatoriaETC = 0;
        return;
      }
    }
  }

}
