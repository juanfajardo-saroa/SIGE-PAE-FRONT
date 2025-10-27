
import { SeguridadService } from './../../../../../seguridad/seguridad.service';
import { PA_BuscarPreparacionRequest } from './../../../../../shared/services/PA_BuscarPreparaciones.services';
import { IngredientesPreparacionService } from './../../../../../shared/services/PA_IngredientesPreparacion.services';
import { SubGrupoAlimentosService } from 'src/app/shared/services/SubGrupoAlimentos.services';
import { TiposComponenteService } from './../../../../../shared/services/TiposComponente.services';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { NivelEducativoService } from 'src/app/shared/services/NivelEducativo.services';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PreparacionesModel } from 'src/app/shared/model/Preparaciones';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IngredientesService } from 'src/app/shared/services/Ingredientes.services';
import { PA_BuscarPreparacionesService } from 'src/app/shared/services/PA_BuscarPreparaciones.services';
import { PA_AporteNutricionalIngredientesRequest, PA_AporteNutricionalIngredientesService } from 'src/app/shared/services/PA_AporteNutricionalIngredientes.services';
import { PA_AporteNutricionalIngredientesDetRequest, PA_AporteNutricionalIngredientesDetService } from 'src/app/shared/services/PA_AporteNutricionalIngredientesDet.services';
import { PA_NivelEducstivoPesoServidoPivService } from 'src/app/shared/services/PA_NivelEducativoPesoServidoPiv.services';
import { PA_AportesComponentePreparacionService } from 'src/app/shared/services/PA_AportesComponentePreparacion.services';
import { PA_AportesComponentePreparacionDetRequest, PA_AportesComponentePreparacionDetService } from 'src/app/shared/services/PA_AporteComponentePreparacionDet.services';
import uniqWith from 'lodash/uniqWith';
import get from 'lodash/get';
import { TiposComplementoService } from 'src/app/shared/services/TiposComplemento.services';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { DecimalPipe } from '@angular/common';
import { PA_PreparacionComplementosGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionComplementosGetAllWithRelation.services';
import { PA_PreparacionesGetAllWithRelationService } from 'src/app/shared/services/PA_PreparacionesGetAllWithRelation.services';
import { PA_ComponentesPreparacionGetAllWithRelationService } from 'src/app/shared/services/PA_ComponentesPreparacionGetAllWithRelation.services';
import { PesoServidoPreparacionService } from 'src/app/shared/services/PesoServidoPreparacion.services';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';

@Component({
  selector: 'app-ptn-prepacion-disponible',
  templateUrl: './ptn-prepacion-disponible.component.html',
  styleUrls: ['./ptn-prepacion-disponible.component.scss']
})
export class PtnPrepacionDisponibleComponent implements OnInit {


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  isLoading = true;
  decimalPipe = new DecimalPipe(navigator.language);

  idETC: number = Number(localStorage.getItem('IdUbicacion') ?? "0");
  dataArray: any;
  public viewActiva: number = 0;
  displayedColumns: string[] = ['Nombre', 'Caracteristicas'];
  displayedColumnsIngredientes: string[] = ['Nombre'];
  displayedColumnsNeto: string[] = ['Nombre', 'Valor'];
  displayedColumnsDos: string[] = ['Nivel', 'pesoal', 'pesoampm'];
  displayedColumnsUna: string[] = ['Nivel', 'peso'];
  displayedColumnsMAER: string[] = ['peso'];
  displayedColumnsComponentePAE: string[] = ['Componente', 'peso'];
  displayedColumnsComponenteGABA: string[] = ['grupo', 'subgrupo', 'peso'];
  NivelEducativoList: any[] = [];
  GrupoAlimentoList: any[] = [];
  SubGrupoAlimentoList: any[] = [];
  SubGrupoAlimentoListT: any[] = [];
  contenidoRespuesta1: string = '';
  nombreProducto: string = '';
  idPreparacion = 0;
  aporteNutrcional: boolean = false;

  private dataArrayPreparacion: any;
  complementosList: any;
  public nuevoArray = []
  public nuevoArrayPeso = []
  nombreIngrediente: string = ''
  idIngrediente = 0;
  idAlimentoICF = 0;
  grado = 0;
  grado2 = 0;
  grado3 = 0;

  nombreModelo: string = ''
  nombreComplemento: string = ''
  selGrupo = -1;
  selSubGrupo = -1;
  selTipo = -1;
  spans = {};
  idModeloOperacion = 0;
  //peso servido
  maem2: boolean = false;
  maem1a: boolean = false;
  maem1b: boolean = false;
  maer1: boolean = false;

  PesoNeto: boolean = false;
  PesoNeto1: boolean = false;
  componente: boolean = false;
  Gaba: boolean = false;
  Gaba1: boolean = false;
  pesoNetoText = '';
  TipoModelos = 0;
  cantModelo = 0;
  guiaPreparacion = '';
  pathguia = '';
  dataSource = new MatTableDataSource<PreparacionesModel>();

  tipoPreparacion: any[] = [
    { id: 1, nombre: 'Mixta', estado: true },
    { id: 0, nombre: 'Simple', estado: false },
  ];
  dataSourceIngredientes: any[] = [];
  equivalencia: any[] = []
  energia: any[] = []
  macro: any[] = []
  micro: any[] = []
  peso: any[] = []
  peso2: any[] = []
  peso3: any[] = []
  tabs = [];
  selectedTabIndex: number = 0;
  selected = new FormControl(0);
  iD_TipoComplemento = 0;
  dataSourceComponentePAE: any[] = []
  dataSourceGABA: any[] = [];
  AporteNutricionalIngredientesDetParams:PA_AporteNutricionalIngredientesDetRequest={}
  AporteNutricionalIngredientesParams:PA_AporteNutricionalIngredientesRequest={}
 busquedaPreparacionParams: PA_BuscarPreparacionRequest = {};
 AportesComponentePreparacionDetParams:PA_AportesComponentePreparacionDetRequest={}
 nombreEstado: string = '';
 colorEstado: string = '';
 ComponenteN:Number=null;
 largo: boolean = false;
 short: boolean = false;
 idtab=0;
 public dataComponentes: any = {
  id: 0,
  iD_Preparacion: this.idPreparacion,
  iD_TipoComponente: 0,
  nombre: '',
};
public dataComponentesBebida: any = {
  id: 0,
  iD_Preparacion: this.idPreparacion,
  iD_TipoComponente: 8,
  nombre: '',
};
public dataComponentesMas: any[] = []
public TiposComponentesList: any = [];
selectedPizzas = null;
 constructor(public dialog: MatDialog,
    private _NivelEducativoService: NivelEducativoService,
    private servicios: RepositoriosExtendService,
    private _GrupoAlimentosService: GrupoAlimentosService,
    private _SubGrupoAlimentosService: SubGrupoAlimentosService,
    private router: Router,
    private _PA_BuscarPreparacionesService: PA_BuscarPreparacionesService,
    private _IngredientesPreparacionService: IngredientesPreparacionService,
    private _PA_AporteNutricionalIngredientesService: PA_AporteNutricionalIngredientesService,
    private _IngredientesService: IngredientesService,
    private _PA_AporteNutricionalIngredientesDetService: PA_AporteNutricionalIngredientesDetService,
    private _PA_NivelEducstivoPesoServidoPivService: PA_NivelEducstivoPesoServidoPivService,
    private _PA_AportesComponentePreparacionService: PA_AportesComponentePreparacionService,
    private _PA_AportesComponentePreparacionDetService:PA_AportesComponentePreparacionDetService,
    private route: ActivatedRoute,
    private seguridadService:SeguridadService,
    private _TiposComponenteService: TiposComponenteService,
    private _PA_SubGrupobyGrupoService:PA_SubGrupobyGrupoService,
    private _PA_PreparacionComplementosGetAllWithRelationService: PA_PreparacionComplementosGetAllWithRelationService,
    private _PA_PreparacionesGetAllWithRelationService:PA_PreparacionesGetAllWithRelationService,
    private _PA_ComponentesPreparacionGetAllWithRelationService:PA_ComponentesPreparacionGetAllWithRelationService,
    private _PesoServidoPreparacionService: PesoServidoPreparacionService,
  ) {
    this.AportesComponentePreparacionDetParams.ID_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
    this.route.queryParams.subscribe(params => {
      this.idtab = +params.tab;

    });
    if(this.idtab==1){
      this.viewActiva == 1;

    }else{
      this.viewActiva == 0
    }
  }

  ngOnInit(): void {

    this._NivelEducativoService.getNivelEducativoList().subscribe(
      (response: any) => {

        this.NivelEducativoList = response;
        this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
    this._GrupoAlimentosService.getGrupoAlimentosList().subscribe(
      (response: any) => {

        this.GrupoAlimentoList = response;
        this.GrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
    this._SubGrupoAlimentosService.getSubGrupoAlimentosList().subscribe(
      (response: any) => {

        this.SubGrupoAlimentoListT = response;
        this.SubGrupoAlimentoListT.sort((firstItem, secondItem) => firstItem.id - secondItem.id);

      },
      (err) => {
      }
    );
    this.busquedaPreparacionParams.ID_ETC=this.idETC;
    this.busquedaPreparacionParams.ID_EstadoPreparacion=3;
    this.BuscarPreparacion(this.busquedaPreparacionParams)

  }
  BuscarPreparacion(obj: any): void {
    this._PA_BuscarPreparacionesService.getPA_BuscarPreparacionesList(obj).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        if (this.busquedaPreparacionParams.ID_TipoPreparacion == 0) {
          this.dataArray = response.filter(item => item.iD_TipoPreparacion == 0);
        } else {
          this.dataArray = response;
        }
  
        // Convertir en un objeto para eliminar duplicados (si es necesario)
        const arr = {};
        for (let i = 0, len = this.dataArray.length; i < len; i++) {
          arr[this.dataArray[i]['iD_Preparacion']] = this.dataArray[i];
        }
  
        // Volver a convertir el objeto en un array
        this.dataArray = Object.values(arr);
  
        // Ordenar alfabéticamente por la propiedad deseada (por ejemplo, 'nombre')
        this.dataArray.sort((a, b) => {
          const nameA = a.nombrePreparacion.toLowerCase(); // Asegúrate de usar la propiedad correcta
          const nameB = b.nombrePreparacion.toLowerCase(); // Asegúrate de usar la propiedad correcta
          if (nameA < nameB) {
            return -1; // nameA va antes que nameB
          }
          if (nameA > nameB) {
            return 1; // nameA va después que nameB
          }
          return 0; // Son iguales
        });
  
        // Si deseas mantener el orden de fecha después de alfabéticamente,
        // primero ordena alfabéticamente y luego por fecha.
        //this.dataArray.sort((a, b) => new Date(b.fechaPreparacion).getTime() - new Date(a.fechaPreparacion).getTime());
  
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PreparacionesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  
  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);

  }
  openDialog(action: string, obj: any): void {

    //localStorage.setItem('nombredeUbicacionActualizado','si')
    this.router.navigate(['/RegistroPreparacion'])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    filterValue = filterValue.toUpperCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }


  direccionar(data: any) {
    this.viewActiva = 1;
    this.nombreProducto = data.nombrePreparacion;
    this.idPreparacion = data.iD_Preparacion;
    this.nombreEstado = data.estadoPreparacion;
    this.colorEstado = data.colorEstadoPreparacion;

    this.traerDatos(data.iD_Preparacion);

  }
  traerDatos(id: number) {

    this._TiposComponenteService.getTiposComponenteList().subscribe(
      (response: any) => {

        this.TiposComponentesList = response;
        this.TiposComponentesList.sort(function (a, b) {
          const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
          const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });


      },
      (err) => {
      }
    );
    this._PA_PreparacionComplementosGetAllWithRelationService.getPA_PreparacionComplementosGetAllWithRelationList(id).subscribe(
      (response: any) => {
        this.complementosList = response

        this.nuevoArray = [];
        var arrayTemporal = [];
        if (this.complementosList.length == 0) {
          this.nombreComplemento = 'N/A';
          
        } else {
          
          const datosAgrupados: { [idPreparacion: number]: any } = {};

          // Iterar sobre la lista de complementos
          for (const complemento of this.complementosList) {
              const idPreparacion = complemento.iD_Preparacion;
          
              // Verificar si el ID de preparación ya existe en el objeto de datos agrupados
              if (!datosAgrupados.hasOwnProperty(idPreparacion)) {
                  // Si no existe, crear una nueva entrada en el objeto de datos agrupados
                  datosAgrupados[idPreparacion] = {
                      iD_Preparacion: idPreparacion,
                      iD_TipoComplemento: [],
                      sID_TipoComplemento: new Set()
                  };
              }
          
              // Agregar el ID de tipo de complemento y el nombre al conjunto para eliminar duplicados
              datosAgrupados[idPreparacion].iD_TipoComplemento.push(complemento.iD_TipoComplemento);
              datosAgrupados[idPreparacion].sID_TipoComplemento.add(complemento.sID_TipoComplemento);
          }
          
          // Convertir el conjunto de nombres de tipo de complemento de cada entrada en un array
          for (const idPreparacion in datosAgrupados) {
              datosAgrupados[idPreparacion].sID_TipoComplemento = Array.from(datosAgrupados[idPreparacion].sID_TipoComplemento);
          }
          
          // Obtener los valores del objeto de datos agrupados como una lista
          const datosUnidos = Object.values(datosAgrupados);

          this.nombreComplemento = datosUnidos[0].sID_TipoComplemento;
          this.tabs = datosUnidos[0].sID_TipoComplemento

          let com = this.tabs[this.selectedTabIndex];
          let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
          this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
          this.cantModelo = 0;
          this.TipoModelos = 0;
          this.aporteNutrcional = false;
          this.componente =false;
          this.Gaba=false;
          this.Gaba1=false;
          
        }



      },
      (err) => {
      });
    this._IngredientesPreparacionService.getPA_IngredientesPreparacionlList(this.idETC, id).subscribe(
      (response: any) => {
        this.dataSourceIngredientes = response;
      },
      (err) => {
      }
    );
    this._PA_PreparacionesGetAllWithRelationService.getPA_PreparacionesGetAllWithRelationList(id).subscribe(
      (response: any) => {
        this.dataArrayPreparacion = response;

        this.nombreModelo = this.dataArrayPreparacion[0].sID_TipoModeloOperacion;
        this.idModeloOperacion = this.dataArrayPreparacion[0].iD_TipoModeloOperacion;
        this.guiaPreparacion = this.dataArrayPreparacion[0].guiaPreparacion;
        this.pathguia = this.dataArrayPreparacion[0].pathGuia
        this.component(id)
      },
      (err) => {
      });
    
   
    
    
  }
  component(id:number){
    this._PA_ComponentesPreparacionGetAllWithRelationService.getPA_ComponentesPreparacionGetAllWithRelationList(id).subscribe(
      async (response: any) => {

        let h = response;

        if (this.dataArrayPreparacion[0].preparacionBebida == true || this.dataArrayPreparacion[0].preparacionBebida  == 'True') {
          this.dataComponentesBebida.id = h[0].id;
          this.dataComponentesBebida.iD_Preparacion = h[0].iD_Preparacion;
          this.dataComponentesBebida.iD_TipoComponente = h[0].iD_TipoComponente;
          this.dataComponentesBebida.nombre = h[0].sID_TipoComponente

        } else {
          if (this.dataArrayPreparacion[0].preparacionMixta == true || this.dataArrayPreparacion[0].preparacionMixta == 'True') {
            this.dataComponentesMas = h;
          } else {
            this.dataComponentes.id = h[0].id;
            this.dataComponentes.iD_Preparacion = h[0].iD_Preparacion;
            this.dataComponentes.iD_TipoComponente = h[0].iD_TipoComponente;
            this.dataComponentes.nombre = h[0].sID_TipoComponente
          }
        }
        await this.traerpeso() 
      },
      (err) => {
      }
    );
  }

  traerpeso() {
   
        if (this.dataArrayPreparacion[0].iD_TipoModeloOperacion == 1) {
         
          this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
            async (response: any) => {
              // Ordenar el array `response` por `id` de menor a mayor
              response.sort((a: any, b: any) => a.id - b.id);
          
              const seen = new Set();
              const deletePromises = response.map(async (item: any) => {
                const combo = `${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`;
                if (seen.has(combo)) {
                  // Si la combinación ya existe, elimina el elemento duplicado
                  return this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
                } else {
                  // Si la combinación no existe, agregarla al conjunto
                  seen.add(combo);
                  return Promise.resolve(); // No hacer nada si no es duplicado
                }
              });
          
              // Esperar a que todas las operaciones de eliminación terminen
              await Promise.all(deletePromises);
          
              // Procesar la lista filtrada después de la eliminación
              const listaFiltrada = response.filter((item: any) => seen.has(`${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`));
          
              // Llamar a this.PesoServido() solo después de que todas las eliminaciones hayan terminado
              await this.PesoServido();
            },
            (error) => {
              console.error('Error al obtener la lista de Peso Servido Preparacion', error);
            }
          );
          
    
        } else if (this.dataArrayPreparacion[0].iD_TipoModeloOperacion == 2) {
          this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
            async (response: any) => {
              // Ordenar el response de menor a mayor basado en una propiedad, por ejemplo 'id'
              let sortedResponse = response.sort((a: any, b: any) => a.id - b.id);
          
          
              // Si hay más de un dato, eliminar los elementos de la cola
              if (sortedResponse.length > 1) {
                // Eliminar los elementos a partir del segundo hasta el final
                let itemsToDelete = sortedResponse.slice(1); // Obtiene todos menos el primero
                for (let item of itemsToDelete) {
                  await this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
                }
              }
          
              // Continuar con el procesamiento después de la eliminación si es necesario
              await this.PesoServido();
            }
          );
          
    
        } else if (this.dataArrayPreparacion[0].iD_TipoModeloOperacion == 3) {
          let t1 = this.tabs[0];
          if (t1 == 'Complemento AM/PM' ||t1 == 'Complemento Almuerzo' ) {
            this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
              async (response: any) => {
                // Ordenar el array `response` por `id` de menor a mayor
                response.sort((a: any, b: any) => a.id - b.id);
            
                const seen = new Set();
                const deletePromises = response.map(async (item: any) => {
                  const combo = `${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`;
                  if (seen.has(combo)) {
                    // Si la combinación ya existe, elimina el elemento duplicado
                    return this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
                  } else {
                    // Si la combinación no existe, agregarla al conjunto
                    seen.add(combo);
                    return Promise.resolve(); // No hacer nada si no es duplicado
                  }
                });
            
                // Esperar a que todas las operaciones de eliminación terminen
                await Promise.all(deletePromises);
            
                // Procesar la lista filtrada después de la eliminación
                const listaFiltrada = response.filter((item: any) => seen.has(`${item.iD_TipoComplemento}-${item.iD_TipoNivelEducativo}`));
            
                // Llamar a this.PesoServido() solo después de que todas las eliminaciones hayan terminado
                await this.PesoServido();
              },
              (error) => {
                console.error('Error al obtener la lista de Peso Servido Preparacion', error);
              }
            );
          }  else {
            this._PesoServidoPreparacionService.getPesoServidoPreparacionListfilter(this.idPreparacion).subscribe(
              async (response: any) => {
                // Ordenar el response de menor a mayor basado en una propiedad, por ejemplo 'id'
                let sortedResponse = response.sort((a: any, b: any) => a.id - b.id);
            
            
                // Si hay más de un dato, eliminar los elementos de la cola
                if (sortedResponse.length > 1) {
                  // Eliminar los elementos a partir del segundo hasta el final
                  let itemsToDelete = sortedResponse.slice(1); // Obtiene todos menos el primero
                  for (let item of itemsToDelete) {
                    await this._PesoServidoPreparacionService.deletePesoServidoPreparacion(item.id).toPromise();
                  }
                }
            
                // Continuar con el procesamiento después de la eliminación si es necesario
                await this.PesoServido();
              }
            );
          }
        }
        
       
    
    
      }
  RegresarAprobaciones() {
    this.viewActiva = 0;
    this.maem2 = false;
    this.maem1a = false;
    this.maem1b = false;
    this.cantModelo = 0;
    this.TipoModelos = 0;
    this.peso = [];
    this.peso2 = [];
    this.peso3 = [];
    this.aporteNutrcional = false;
    //this.dataSource = new MatTableDataSource<PreparacionesModel>(this.dataArray);
    this.BuscarPreparacion(this.busquedaPreparacionParams)
  }

  addRowDataIngredientes(row_obj): void {

  }
  openingredienteDetalle(myRowData: any) {
    this.aporteNutrcional = false;
    this.cantModelo = 0;
    this.TipoModelos = 0;
    this.NivelEducativoList = this.NivelEducativoList

    this.nombreIngrediente = myRowData.nombreIngrediente;
    this.idAlimentoICF = myRowData.iD_AlimentosICBF;

    if (this.idModeloOperacion == 1) {
      let cant = this.nombreComplemento.length
      if (cant == 1) {
        this.aporteNutrcional = true;
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
        
      } else if (cant == 2) {
        this.aporteNutrcional = true;
        this.cantModelo = 2;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
       
      } else { }


    } else if (this.idModeloOperacion == 2) {
      this.aporteNutrcional = true;
      this.TipoModelos = 2;
      this.equivalencia = [];
      this.energia = [];
      this.macro =[];
      this.micro = [];
      this.aporteNutricionalMAER();
     
    } else if(this.idModeloOperacion == 3){
      let cant = this.nombreComplemento

       if (cant == 'Complemento Almuerzo') {
        this.aporteNutrcional = true;
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
       
      } else if (cant == 'Complemento AM/PM') {
        this.aporteNutrcional = true;
        this.cantModelo = 1;
        this.TipoModelos = 1;
        this.PesoNeto1 = false;
        
      } else {
        this.aporteNutrcional = true;
        this.TipoModelos = 2;
        this.aporteNutricionalMAER();
        
       }
     }else{}

     if(this.grado !=0){this.onNivelEducativoChange1_1(this.grado)}else{}
  }
  aporteNutricionalMAER(){
    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, null, null).subscribe(
      (response: any) => {
        this.idIngrediente = response[0].id;

        this.PesoNeto1 = false;
        this.aporteDet()
      },
      (err) => {
      }
    );
  }
  aporteDet(){
    this.AporteNutricionalIngredientesParams.ID_ETC=this.idETC;
    this.AporteNutricionalIngredientesParams.ID_Ingrediente=this.idIngrediente;
    this.AporteNutricionalIngredientesParams.ID_Preparacion=this.idPreparacion;
    this._PA_AporteNutricionalIngredientesService.getPA_AporteNutricionalIngredientesList(this.AporteNutricionalIngredientesParams).subscribe(
      (response: any) => {
        if(response.length ==0){
          this.pesoNetoText=''
        }else{
          this.pesoNetoText = response[0].pesoNeto;
        }


        let m3
        response.find(object => {
          m3 = Object.keys(object)
          for (let caja in response) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (pesoNeto == true && porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: response[0].pesoBruto,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: response[0].porcentajeComestible,
              });
            } else { }

          }

        });




        this.micromacroeneMAER();
        this.PesoNeto1 = true;
      },
      (err) => {
      }
    );
  }
  myTabFocusChange(tabChangeEvent: any): void {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.PesoNeto1 = false;

  }
  myTabFocusChange2(tabChangeEvent: any) {

    this.selectedTabIndex = tabChangeEvent


    let com = this.tabs[tabChangeEvent];
    let com2 = this.complementosList.filter(item => item.sID_TipoComplemento == com)
    this.iD_TipoComplemento = com2[0].iD_TipoComplemento;
    this.componente = false;
    this.Gaba=false;
    this.Gaba1=false;

  }

  openDialogIngredientes(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogPTNPreparacionIngredientesDisContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowDataIngredientes(result.data);
      } else if (result.event === 'Actualizar') {
        //this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        //this.deleteRowData(result.data);
      } else if (result.event === 'Cerrar') {
        // this.ngOnInit();
      }
    });



  }
  onNivelEducativoChange1(event: any): void {

    this.grado = event[0].value;
    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        if(response==0){

          this.PesoNeto1 = false;

        }else{
          this.idIngrediente = response[0].id;

          this.PesoNeto1 = false;
          this.aporteNutricional();
        }

      },
      (err) => {
      }
    );

  }
  onNivelEducativoChange1_1(event: any): void {

    this.grado = event;
    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        if(response==0){

          this.PesoNeto1 = false;

        }else{
          this.idIngrediente = response[0].id;

          this.PesoNeto1 = false;
          this.aporteNutricional();
        }

      },
      (err) => {
      }
    );

  }
  onNivelEducativoChange2(event: any): void {
    this.grado2 = event[0].value;
    this.componente =false;
    this.Gaba=false;
    this.Gaba1=false;
    this.dataSourceComponentePAE=[];
    this._PA_AportesComponentePreparacionService.getPA_AportesComponentePreparacionList(this.idETC, this.idModeloOperacion, this.idPreparacion, this.iD_TipoComplemento, this.grado2).subscribe(
      (response: any) => {
        let j = response;
        this.dataSourceComponentePAE=[];
        if (this.dataArrayPreparacion[0].preparacionBebida == true || this.dataArrayPreparacion[0].preparacionBebida == 'True') {

          j.forEach(element2 => {
            if (this.dataComponentesBebida.iD_TipoComponente == element2.iD_TipoComponente) {
              this.dataSourceComponentePAE.push({
                componente: 'Bebida',
                pesoNeto: element2.pesoNeto
              })
            } else {
              this.dataSourceComponentePAE.push({
                componente: 'Bebida',
                pesoNeto: 0
              })
            }
          });
          const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (elemento.componente === valorActual.componente) {
                  return {
                    ...elemento,
                    pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                  }
                }

                return elemento;
              });
            }

            return [...acumulador, valorActual];
          }, []);
          this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item=>item.componente != undefined)


        } else {

          if (this.dataArrayPreparacion[0].preparacionMixta == true || this.dataArrayPreparacion[0].preparacionMixta == 'True'){
            this.dataSourceComponentePAE = [];
            this.dataComponentesMas.forEach(item => {
              j.forEach(element2 => {
                if (item.iD_TipoComponente == element2.iD_TipoComponente) {
                  this.dataSourceComponentePAE.push({
                    componente: element2.componente,
                    pesoNeto: element2.pesoNeto
                  })
                } else {
                  this.dataSourceComponentePAE.push({
                    componente: item.sID_TipoComponente,
                    pesoNeto: 0
                  })
                }
              });
            })

          const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (elemento.componente === valorActual.componente) {
                  return {
                    ...elemento,
                    pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                  }
                }

                return elemento;
              });
            }

            return [...acumulador, valorActual];
          }, []);
          this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item => item.componente != undefined)

          }else{
            this.dataSourceComponentePAE = [];
            j.forEach(element2 => {
              if (this.dataComponentes.iD_TipoComponente == element2.iD_TipoComponente) {
                this.dataSourceComponentePAE.push({
                  componente: element2.componente,
                  pesoNeto: element2.pesoNeto
                })
              } else {
                this.dataSourceComponentePAE.push({
                  componente:this.dataComponentes.nombre,
                  pesoNeto: 0
                })
              }
            });
       
          const miFrecuenciaSinDuplicados = this.dataSourceComponentePAE.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(elemento => elemento.componente === valorActual.componente);
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (elemento.componente === valorActual.componente) {
                  return {
                    ...elemento,
                    pesoNeto: elemento.pesoNeto + valorActual.pesoNeto
                  }
                }

                return elemento;
              });
            }

            return [...acumulador, valorActual];
          }, []);
          this.dataSourceComponentePAE = miFrecuenciaSinDuplicados.filter(item => item.componente != undefined)
          }

          }

        this.gabadata();
        this.componente = true;
        this.Gaba = true;
        this.Gaba1 = false;
      },
      (err) => {
      }
    );

  }
  gabadata(){
    this.AportesComponentePreparacionDetParams.ID_ETC = Number(localStorage.getItem('IdUbicacion') ?? "0");
    this.AportesComponentePreparacionDetParams.iD_Preparacion = this.idPreparacion;
    this.AportesComponentePreparacionDetParams.id_TipoModeloOperacion = this.idModeloOperacion;
    if (this.idModeloOperacion == 1) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;

    } else if (this.idModeloOperacion == 2) {
      this.AportesComponentePreparacionDetParams.ID_Complemento = null;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
    } else if(this.idModeloOperacion == 3){
      let cant = this.nombreComplemento

       if (cant == 'Complemento Almuerzo'||cant == 'Complemento AM/PM') {
      this.AportesComponentePreparacionDetParams.ID_Complemento = this.iD_TipoComplemento;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = this.grado2;
      }  else {
        this.AportesComponentePreparacionDetParams.ID_Complemento = null;
      this.AportesComponentePreparacionDetParams.ID_TipoNivelEducativo = null;
       }
    }else{}

    this._PA_AportesComponentePreparacionDetService.gePA_AporteNutricionalIngredientesDetList(this.AportesComponentePreparacionDetParams).subscribe(
      (response: any) => {
        this.dataSourceGABA = response;
        this.spans = Object.assign({}, {
          grupoAlimentos: this.spanDeep(['iD_GrupoAlimentos','grupoAlimentos'], this.dataSourceGABA),
          subGrupoAlimentos: this.spanDeep(['iD_GrupoAlimentos','grupoAlimentos','subGrupoAlimentos'], this.dataSourceGABA),
        });
        let cant = this.nombreComplemento.length

        if (this.idModeloOperacion == 1) {
          let t1 = this.tabs[0];
          let t2 = this.tabs[1];
          if (cant == 2) {
            if ((t1 == 'Complemento AM/PM' && t2 == 'Complemento Almuerzo')||(t2 == 'Complemento AM/PM' && t1 == 'Complemento Almuerzo')) {
              this.ComponenteN = 2;

            } else { }
          } else if (cant == 1) {
            if (t1 == 'Complemento AM/PM') {
              this.ComponenteN = 1;
            } else {
              this.ComponenteN = 1;
            }
          } else { }
        } else if (this.idModeloOperacion == 2) {

          this.ComponenteN = 3;
        } else if (this.idModeloOperacion == 3) {
          let t1 = this.tabs[0];
          if (t1 == 'Complemento AM/PM') {
            this.ComponenteN = 1;
          } else if(t1=='Complemento Almuerzo') {
            this.ComponenteN = 1;
          }else{
            this.ComponenteN = 3;
          }
         }else{

         }

      },
      (err) => {
      }
    );

  }

  getRowSpan(path, idx) {
    if (idx === undefined) {

    } else {
      return this.spans[path][idx];
    }

  }
  spanDeep(paths: string[] | null, data: any[]) {

    if (!paths.length) {
      return [...data]
        .fill(0)
        .fill(data.length, 0, 1);
    }

    const copyPaths = [...paths];
    const path = copyPaths.shift();

    const uniq = uniqWith(data, (a, b) => get(a, path) === get(b, path)).map(item => get(item, path));

    return uniq
      .map(uniqItem => this.spanDeep(copyPaths, data.filter(item => uniqItem === get(item, path))))
      .flat(paths.length);
  }
  onNivelEducativoChange(event: any): void {
    this.grado3 = event[0].value;

    this._IngredientesService.getIngredientesListfilter(this.idPreparacion, this.idAlimentoICF, this.grado3, this.iD_TipoComplemento).subscribe(
      (response: any) => {
        this.idIngrediente = response[0].id;

        this.PesoNeto1 = false;
        this.aporteNutricional();
      },
      (err) => {
      }
    );


  }
  aporteNutricional(){
    this.AporteNutricionalIngredientesParams.ID_ETC=this.idETC;
    this.AporteNutricionalIngredientesParams.ID_Ingrediente=this.idIngrediente;
    this.AporteNutricionalIngredientesParams.ID_Preparacion=this.idPreparacion;
    this.AporteNutricionalIngredientesParams.ID_TipoComponente =this.iD_TipoComplemento;
    if(this.TipoModelos == 1 && this.cantModelo==1){
      this.AporteNutricionalIngredientesParams.ID_TipoNivelEducativo=this.grado
    }else if(this.TipoModelos == 1 && this.cantModelo==2){
      this.AporteNutricionalIngredientesParams.ID_TipoNivelEducativo=this.grado3
    }else if(this.TipoModelos == 2){

    }

    this._PA_AporteNutricionalIngredientesService.getPA_AporteNutricionalIngredientesList(this.AporteNutricionalIngredientesParams).subscribe(
      (response: any) => {

        this.pesoNetoText = response[0].pesoNeto;

        let m3
        response.find(object => {
          m3 = Object.keys(object)
          for (let caja in response) {
            let pesoNeto = m3.includes('pesoNeto')
            let porcentajeComestible = m3.includes('porcentajeComestible')
            this.equivalencia = [];
            if (pesoNeto == true && porcentajeComestible == true) {
              this.equivalencia.push({
                nombre: 'Peso bruto (g):',
                valor: response[0].pesoBruto,
              });
              this.equivalencia.push({
                nombre: 'Porcentaje comestible (%):',
                valor: response[0].porcentajeComestible,
              });
            } else { }

          }

        });




        this.micromacroene();
        this.PesoNeto1 = true;
      },
      (err) => {
      }
    );
  }
  micromacroene() {
   // id_etc es id_etc,
   //id_ingrediente es id_ingrediente,
    //id_tipocomponente es id_tipocomplemento,
    //id_preparacion es id_niveleducativo,
    //id:tiponiveleducativo es id_modelooperacion
    this.AporteNutricionalIngredientesDetParams.ID_ETC=this.idETC;
    this.AporteNutricionalIngredientesDetParams.ID_Ingrediente=this.idIngrediente;
    this.AporteNutricionalIngredientesDetParams.ID_TipoComponente= this.iD_TipoComplemento;

    this.AporteNutricionalIngredientesDetParams.ID_TipoNivelEducativo = this.idModeloOperacion
    if(this.TipoModelos == 1 && this.cantModelo==1){
      this.AporteNutricionalIngredientesDetParams.ID_Preparacion= this.grado;
    }else if(this.TipoModelos == 1 && this.cantModelo==2){
      this.AporteNutricionalIngredientesDetParams.ID_Preparacion= this.grado3;
    }else if(this.TipoModelos == 2){

    }

    this._PA_AporteNutricionalIngredientesDetService.gePA_AporteNutricionalIngredientesDetList(this.AporteNutricionalIngredientesDetParams ).subscribe(
      (response: any) => {
        this.energia = response.filter(item => item.iD_TipoNivelNutriente == 3);
        this.macro = response.filter(item => item.iD_TipoNivelNutriente == 1);
        this.micro = response.filter(item => item.iD_TipoNivelNutriente == 2);

      },
      (err) => {
      }
    );

  }
  PesoServido() {
    this._PA_NivelEducstivoPesoServidoPivService.getPA_NivelEducativoPesoServidoPivList(this.idETC, this.idPreparacion).subscribe(
      (response: any) => {
        if (response.length == 0) {
          this._NivelEducativoService.getNivelEducativoList().subscribe(
            (response: any) => {
      
              this.NivelEducativoList = response;
              this.NivelEducativoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
              this.NivelEducativoList.forEach(item => {
                this.peso.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
                this.peso2.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
                this.peso3.push({
    
                  iD_TipoNivelEducativo: item.id,
                  nivelEducativo: item.nombre,
                  complementoAlmuerzo: null,
                  complementoAM_PM: null,
                  complementoAlmuerzoCualificado: null,
                  sinComplemento: null,
    
                })
              })
              var arr = {};
    
              for (var i = 0, len = this.peso.length; i < len; i++)
                arr[this.peso[i]['iD_TipoNivelEducativo']] = this.peso[i];
    
              this.peso = new Array();
              for (var key in arr)
                this.peso.push(arr[key])
    
              var arr1 = {};
    
              for (var i = 0, len = this.peso2.length; i < len; i++)
                arr1[this.peso2[i]['iD_TipoNivelEducativo']] = this.peso2[i];
    
              this.peso2 = new Array();
              for (var key in arr1)
                this.peso2.push(arr1[key])
              var arr2 = {};
    
              for (var i = 0, len = this.peso3.length; i < len; i++)
                arr2[this.peso3[i]['iD_TipoNivelEducativo']] = this.peso3[i];
    
              this.peso3 = new Array();
              for (var key in arr2)
                this.peso3.push(arr2[key])
      
            },
            (err) => {
            }
          );
          

        } else {
          this.peso = response;
          this.peso2 = response;
          this.peso3 = response;
        }
        let cant = this.nombreComplemento.length

        if (this.idModeloOperacion == 1) {
          let t1 = this.tabs[0];
          let t2 = this.tabs[1];
          if (cant == 2) {
            if ((t1 == 'Complemento AM/PM' && t2 == 'Complemento Almuerzo')||(t2 == 'Complemento AM/PM' && t1 == 'Complemento Almuerzo')) {
              this.maem2 = true;
              this.maem1a = false;
              this.maem1b = false;
              this.maer1 = false;
              this.gabadata();
            } else { }
          } else if (cant == 1) {
            if (t1 == 'Complemento AM/PM') {
              this.maem2 = false;
              this.maem1a = false;
              this.maem1b = true;
              this.maer1 = false;
              this.gabadata();
            } else {
              this.maem2 = false;
              this.maem1a = true;
              this.maem1b = false;
              this.maer1 = false;
              this.gabadata();
            }
          } else { }
        } else if (this.idModeloOperacion == 2) {
          this.maem2 = false;
          this.maem1a = false;
          this.maem1b = false;
          this.maer1 = true;
          this.gabadata();
        } else if (this.idModeloOperacion == 3){
          let t1 = this.tabs[0];
          if (t1 == 'Complemento AM/PM') {
            this.maem2 = false;
            this.maem1a = false;
            this.maem1b = true;
            this.maer1 = false;
            this.gabadata();
          } else if(t1=='Complemento Almuerzo') {
            this.maem2 = false;
            this.maem1a = true;
            this.maem1b = false;
            this.maer1 = false;
            this.gabadata();
          }else{
            this.maem2 = false;
          this.maem1a = false;
          this.maem1b = false;
          this.maer1 = true;
          this.gabadata();
          }
         }else{}

      },
      (err) => {
      }
    );
  }
  micromacroeneMAER() {
    // id_etc es id_etc, id_ingrediente es id_ingrediente,
    //id_tipocomponente es id_tipocomplemento, id_preparacion es id_niveleducativo,
    //id:tiponiveleducativo es id_modelooperacion
    this.AporteNutricionalIngredientesDetParams.ID_ETC=this.idETC;
    this.AporteNutricionalIngredientesDetParams.ID_Ingrediente=this.idIngrediente;
    this.AporteNutricionalIngredientesDetParams.ID_TipoNivelEducativo = this.idModeloOperacion

    this._PA_AporteNutricionalIngredientesDetService.gePA_AporteNutricionalIngredientesDetList(this.AporteNutricionalIngredientesDetParams ).subscribe(
      (response: any) => {
        this.energia = response.filter(item => item.iD_TipoNivelNutriente == 3);
        this.macro = response.filter(item => item.iD_TipoNivelNutriente == 1);
        this.micro = response.filter(item => item.iD_TipoNivelNutriente == 2);

      },
      (err) => {
      }
    );

  }
  downloadFile(obj: any): void {
    if (obj === '-' || obj === '' || obj === null) {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="position: absolute !important ; top: 25px !important; right: 40px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
          '<p style="text-align: center!important; font-size: 13px; color:#005ACA;">No tiene soporte para ver </p> ',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isDenied) {

        }
      })

    } else {
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: null, fileName: obj, cnx: environment.cnxBS, container: environment.containerDS };
      (this.servicios.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: this.getType(obj) });
          saveAs(blob, obj);
        },
        (err) => {
        }
      )
    }
  };
  getType(_response: any): string {
    let fileName = _response;
    //file type extension
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == ".txt") {
      fileType = "text/plain";
    }
    if (checkFileType == ".pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == ".doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == ".png") {
      fileType = "image/png";
    }
    if (checkFileType == ".jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".gif") {
      fileType = "image/gif";
    }
    if (checkFileType == ".csv") {
      fileType = "text/csv";
    }
    return fileType;
  }

  selectionGrupo(id: number) {
    if (id == -1) {
      this.selSubGrupo=-1
      this.busquedaPreparacionParams.ID_GrupoAlimentos= null;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = null;

    } else {
      this._PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(id).subscribe(
        (response: any) => {

          this.SubGrupoAlimentoList = response;
          this.SubGrupoAlimentoList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
  
        },
        (err) => {
        }
      )
      /* this.SubGrupoAlimentoList = this.SubGrupoAlimentoListT.filter(item => item.iD_GrupoAlimento == id); */

    }


  }
  onchangeGrupoAlimentos(selGrupo: number, selSubGrupo: number, selTipo: any) {
this.busquedaPreparacionParams.ID_ETC = this.idETC;
this.busquedaPreparacionParams.ID_EstadoPreparacion= 3;

    if (selTipo == true) {

      this.busquedaPreparacionParams.ID_TipoPreparacion= 1;
    } else if (selTipo == false) {

      this.busquedaPreparacionParams.ID_TipoPreparacion= 0;
    } else {
      this.busquedaPreparacionParams.ID_ETC = this.idETC;
      this.busquedaPreparacionParams.ID_TipoPreparacion = null;
    }
    let grupo = 0
    if (selGrupo == -1) {

      this.busquedaPreparacionParams.ID_GrupoAlimentos= null;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos = null;
      grupo = null;
    } else {
      grupo = selGrupo;
      this.busquedaPreparacionParams.ID_GrupoAlimentos= selGrupo;

    }
    let subgrupo = 0
    if (selSubGrupo == -1) {
      subgrupo = null;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos= null;
    } else {
      subgrupo = selSubGrupo;
      this.busquedaPreparacionParams.ID_SubGrupoAlimentos= selSubGrupo;
    }
    this.busquedaPreparacionParams.ID_ETC = this.idETC;
    if (selTipo == true) {


      this.busquedaPreparacionParams.ID_TipoPreparacion = 1;
    } else if (selTipo == false) {

      this.busquedaPreparacionParams.ID_TipoPreparacion = 0;
    } else {
      this.busquedaPreparacionParams.ID_ETC = this.idETC;
      this.busquedaPreparacionParams.ID_TipoPreparacion = null;
    }



    this._PA_BuscarPreparacionesService.getPA_BuscarPreparacionesList(this.busquedaPreparacionParams).subscribe(
      (response: any) => {
        // id tipo estado 1 por aprobar, 2 rechazado, 3 aprobado, 6 pendiente
        if(this.busquedaPreparacionParams.ID_TipoPreparacion == 0){

          this.dataArray = response.filter(item =>item.iD_TipoPreparacion==0 );
        }else{
          this.dataArray = response;
        }
        var arr = {};

        for (var i = 0, len = this.dataArray.length; i < len; i++)
          arr[this.dataArray[i]['iD_Preparacion']] = this.dataArray[i];

        this.dataArray = new Array();
        for (var key in arr)
          this.dataArray.push(arr[key]);

          this.dataArray.sort(function (a, b) {

            return new Date(b.fechaPreparacion).getTime() - new Date(a.fechaPreparacion).getTime();

          });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<PreparacionesModel>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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


      },
      (err) => {
        this.isLoading = false;
      }
    );



  }

  /* public onFileSelectedGuiaPreparacion(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let nombre = fileupload.name
      let sinEspa = nombre.replace(/ /g, "")
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerBS };

      this.addFileBlobRepositorios(_fileUpload);
    }
  } */
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'ptn-prepacion-disponible-ingredientes-d.dialog.component.html',
  styleUrls: ["./ptn-prepacion-disponible-ingredientes-d.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogPTNPreparacionIngredientesDisContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  maxfileerror: any;
  // Listas relacionales
  form: FormGroup;
  public tipoRacionList: any = [];
  favoriteSeason: string;
  constructor(public dialogRef: MatDialogRef<DialogPTNPreparacionIngredientesDisContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tiposRacionService: TiposComplementoService,
  ) {

    this.form = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      fechaActualizacion: [data.fechaActualizacion, Validators.required],
      descripcionDiagnostico: [data.descripcionDiagnostico, Validators.required],
      pathDiasnosticoSituacion: [data.pathDiasnosticoSituacion, Validators.required],
      auditoria: [''],
    });
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.tiposRacionService.getTiposComplementoList().subscribe(
      (response: any) => {

        this.tipoRacionList = response;
        this.tipoRacionList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
      },
      (err) => {
      });

  }
  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  Buscar() {

  }


}
