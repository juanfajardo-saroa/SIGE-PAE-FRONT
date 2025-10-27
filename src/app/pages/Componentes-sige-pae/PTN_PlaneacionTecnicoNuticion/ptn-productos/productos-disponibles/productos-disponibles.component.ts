import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { ProductosModel } from 'src/app/shared/model/Productos';
import { ProductosShortModel } from 'src/app/shared/model/ProductosShort';
import { SubGrupoAlimentosModel } from 'src/app/shared/model/SubGrupoAlimentos';
import { TiposAlimentosModel } from 'src/app/shared/model/TiposAlimentos';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { ProductosService } from 'src/app/shared/services/Productos.services';
import { TiposAlimentosService } from 'src/app/shared/services/TiposAlimentos.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-productos-disponibles',
  templateUrl: './productos-disponibles.component.html',
  styleUrls: ['./productos-disponibles.component.scss']
})
export class ProductosDisponiblesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  displayedColumns: string[] = ['NombreProducto', 'CaracterísticasNutricionales'];
  dataSource: MatTableDataSource<ProductosShortModel>;
  statesApproved: number[] = [3, 6];
  grupoAlimentosList: GrupoAlimentosModel[];
  selectSubGrupoAlimentosList: PA_SubGrupobyGrupoModel[];
  tiposAlimentosList: TiposAlimentosModel[];
  grupoAlimentoTotal = <GrupoAlimentosModel>{};
  subGrupoAlimentoTotal = <SubGrupoAlimentosModel>{};
  tipoAlimentoTotal = <TiposAlimentosModel>{};
  productosList: ProductosModel[];
  productosListUnion: ProductosShortModel[];
  productUnionTemp: ProductosShortModel;
  productZero: ProductosShortModel = {
    id: null,
    nombre: '',
    fechaRegistro: new Date(),
    iD_TipoAlimento: null,
    sID_TipoAlimento: '',
    iD_EstadoRegistro: null,
    sID_EstadoRegistro: ''
  };
  filterForm: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private productosService: ProductosService,
    private alimentosICBFService: AlimentosICBFService,
    private grupoAlimentosService: GrupoAlimentosService,
    private PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private tiposAlimentoService: TiposAlimentosService,
    private seguridadService: SeguridadService,
  ) {
    this.filterForm = this.fb.group({
      grupo: ['', Validators.required],
      subgrupo: ['', Validators.required],
      tipo: ['', Validators.required],
    });
    this.grupoAlimentoTotal.id = 0;
    this.grupoAlimentoTotal.nombre = 'Todos';
    this.subGrupoAlimentoTotal.id = 0;
    this.subGrupoAlimentoTotal.nombre = 'Todos';
    this.tipoAlimentoTotal.id = 0;
    this.tipoAlimentoTotal.nombre = 'Todos';
  }

  ngOnInit(): void {
    this.fillFilters();
    this.fillTable();
  }

  goToRegister() {
    this.router.navigate(['/RegistroProducto']);
  }

  fillFilters() {
    this.grupoAlimentosService.getGrupoAlimentosListFull().subscribe(
      (response: any) => {
        this.grupoAlimentosList = response;
      },
      (err) => {
      }
    );

    this.tiposAlimentoService.getTiposAlimentosListFull().subscribe(
      (response: any) => {
        this.tiposAlimentosList = response;
        this.tiposAlimentosList.push(this.tipoAlimentoTotal);
      },
      (err) => {
      }
    );
  }

  fillTable() {
    this.productosListUnion = [];
    this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
    this.dataSource.paginator = this.paginator;
    if (this.filterForm.get('tipo').value == 1) {

      this.alimentosICBFService.getAlimentosRelatioICBFListFilterByState(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesApproved).subscribe(
        (response: any) => {
          response.forEach(element => {
            if (response.length == 0) {
              this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
            }
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre
            this.productUnionTemp.fechaRegistro = new Date();
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.iD_TipoAlimento = element.iD_TipoAlimento;
            this.productUnionTemp.sID_TipoAlimento = element.sID_TiposAlimentos;
            var newobj = Object.assign({}, this.productUnionTemp)
            this.productosListUnion.push(newobj);
            // Ordenar productosListUnion alfabéticamente por nombre
            this.productosListUnion.sort((a, b) => {
              const nameA = a.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              const nameB = b.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              if (nameA < nameB) return -1; // A va antes que B
              if (nameA > nameB) return 1; // A va después que B
              return 0; // Son iguales
            });


            if (element == response[response.length - 1]) {
              this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
            }
          });
        },
        (err) => {
        }
      );
    } else if (this.filterForm.get('tipo').value == 2) {
      this.productosService.getProductosListRelationFilterByStates(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesApproved).subscribe(
        (response: any) => {
          response.forEach(element => {
            if (response.length == 0) {
              this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
            }
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre;
            this.productUnionTemp.fechaRegistro = element.fechaRegistro;
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.iD_TipoAlimento = element.iD_TiposAlimentos;
            this.productUnionTemp.sID_TipoAlimento = element.sID_TipoAlimento;
            var newobj = Object.assign({}, this.productUnionTemp)
            this.productosListUnion.push(newobj);
            // Ordenar productosListUnion alfabéticamente por nombre
            this.productosListUnion.sort((a, b) => {
              const nameA = a.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              const nameB = b.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              if (nameA < nameB) return -1; // A va antes que B
              if (nameA > nameB) return 1; // A va después que B
              return 0; // Son iguales
            });

            if (element == response[response.length - 1]) {
              this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
            }
          });
        },
        (err) => {
        }
      );
    } else if (this.filterForm.get('tipo').value == "" || this.filterForm.get('tipo').value == 0) {
      this.alimentosICBFService.getAlimentosRelatioICBFListFilterByState(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesApproved).subscribe(
        (response: any) => {
          response.forEach(element => {
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre
            this.productUnionTemp.fechaRegistro = new Date();
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.iD_TipoAlimento = element.iD_TipoAlimento;
            this.productUnionTemp.sID_TipoAlimento = element.sID_TipoAlimento;
            var newobj = Object.assign({}, this.productUnionTemp)
            this.productosListUnion.push(newobj);
            // Ordenar productosListUnion alfabéticamente por nombre
            this.productosListUnion.sort((a, b) => {
              const nameA = a.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              const nameB = b.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
              if (nameA < nameB) return -1; // A va antes que B
              if (nameA > nameB) return 1; // A va después que B
              return 0; // Son iguales
            });

          });
          this.productosService.getProductosListRelationFilterByStates(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesApproved).subscribe(
            (res: any) => {
              res.forEach(elem => {
                this.productUnionTemp = this.productZero;
                this.productUnionTemp.id = elem.id;
                this.productUnionTemp.nombre = elem.nombre
                this.productUnionTemp.fechaRegistro = elem.fechaRegistro;
                this.productUnionTemp.iD_EstadoRegistro = elem.iD_EstadoRegistro;
                this.productUnionTemp.iD_TipoAlimento = elem.iD_TiposAlimentos;
                this.productUnionTemp.sID_TipoAlimento = elem.sID_TiposAlimentos;
                var newobj = Object.assign({}, this.productUnionTemp)
                this.productosListUnion.push(newobj);
                // Ordenar productosListUnion alfabéticamente por nombre
                this.productosListUnion.sort((a, b) => {
                  const nameA = a.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
                  const nameB = b.nombre.toLowerCase(); // Convertir a minúsculas para evitar problemas de capitalización
                  if (nameA < nameB) return -1; // A va antes que B
                  if (nameA > nameB) return 1; // A va después que B
                  return 0; // Son iguales
                });

                if (elem == res[res.length - 1]) {
                  this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
                }
              });
              if (res.length == 0) {
                this.dataSource = new MatTableDataSource<ProductosShortModel>(this.productosListUnion);
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
              }
            },
            (err) => {
            }
          );
        },
        (err) => {
        }
      );
    }

  }

  onGrupoClick(value: any): void {
    this.PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(value).subscribe(
      (response: any) => {
        this.selectSubGrupoAlimentosList = response;
      },
      (err) => {
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: ProductosShortModel, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || ' ';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  goToDetail(idProducto: number, tipoAlimento: number) {
    if (tipoAlimento == 1) {
      this.router.navigate(['/PTNProductos'], { queryParams: { typeComponent: 1, action: 1, id: idProducto, type: tipoAlimento } });
    }
    else if (tipoAlimento == 2) {
      this.router.navigate(['/PTNProductos'], { queryParams: { typeComponent: 2, action: 1, id: idProducto, type: tipoAlimento } });
    }
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
