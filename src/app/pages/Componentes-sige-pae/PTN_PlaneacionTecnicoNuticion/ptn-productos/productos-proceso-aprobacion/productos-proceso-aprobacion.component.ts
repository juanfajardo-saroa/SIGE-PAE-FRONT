import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoAlimentosModel } from 'src/app/shared/model/GrupoAlimentos';
import { SubGrupoAlimentosModel } from 'src/app/shared/model/SubGrupoAlimentos';
import { TiposAlimentosModel } from 'src/app/shared/model/TiposAlimentos';
import { GrupoAlimentosService } from 'src/app/shared/services/GrupoAlimentos.services';
import { TiposAlimentosService } from 'src/app/shared/services/TiposAlimentos.services';
import { ProductosService } from 'src/app/shared/services/Productos.services';
import { ProductosModel } from 'src/app/shared/model/Productos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductosShortModel } from 'src/app/shared/model/ProductosShort';
import { AlimentosICBFService } from 'src/app/shared/services/AlimentosICBF.services';
import { Router } from '@angular/router';
import { PA_SubGrupobyGrupoService } from 'src/app/shared/services/PA_SubGrupobyGrupo.services';
import { PA_SubGrupobyGrupoModel } from 'src/app/shared/model/PA_SubGrupobyGrupo';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-productos-proceso-aprobacion',
  templateUrl: './productos-proceso-aprobacion.component.html',
  styleUrls: ['./productos-proceso-aprobacion.component.scss']
})
export class ProductosProcesoAprobacionComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  decimalPipe = new DecimalPipe(navigator.language);
  displayedColumns: string[] = ['NombreProducto', 'FechaRegistroProducto', 'TipoProducto', 'EstadoProducto'];

  grupoAlimentosList: GrupoAlimentosModel[];
  subGrupoAlimentosList: SubGrupoAlimentosModel[];
  selectSubGrupoAlimentosList: PA_SubGrupobyGrupoModel[];
  tiposAlimentosList: TiposAlimentosModel[];
  filterForm: FormGroup;
  productosList: ProductosModel[];
  dataSource: MatTableDataSource<ProductosShortModel>;
  idETC: number = Number(localStorage.getItem('IdUbicacion'));
  statesInProcess: number[] = [1, 2, 7, 8];
  productosListUnion: ProductosShortModel[];
  productUnionTemp: ProductosShortModel;
  grupoAlimentoTotal = <GrupoAlimentosModel>{};
  subGrupoAlimentoTotal = <SubGrupoAlimentosModel>{};
  tipoAlimentoTotal = <TiposAlimentosModel>{};
  productZero: ProductosShortModel = {
    id: null,
    nombre: '',
    fechaRegistro: new Date(),
    iD_TipoAlimento: null,
    sID_TipoAlimento: '',
    iD_EstadoRegistro: null,
    sID_EstadoRegistro: ''
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productosService: ProductosService,
    private alimentosICBFService: AlimentosICBFService,
    private grupoAlimentosService: GrupoAlimentosService,
    private PA_SubGrupobyGrupoService: PA_SubGrupobyGrupoService,
    private tiposAlimentoService: TiposAlimentosService) {
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

  onGrupoClick(value: any): void {
    this.PA_SubGrupobyGrupoService.getPA_SubGrupobyGrupoList(value).subscribe(
      (response: any) => {
        this.selectSubGrupoAlimentosList = response;
      },
      (err) => {
      }
    );
  }

  fillTable() {
    this.productosListUnion = [];
    if (this.filterForm.get('tipo').value == 1) {
      this.alimentosICBFService.getAlimentosRelatioICBFListFilterByState(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesInProcess).subscribe(
        (response: any) => {
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
          response.forEach(element => {
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre
            this.productUnionTemp.fechaRegistro = new Date();
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.sID_EstadoRegistro = element.sID_EstadoRegistro;
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
      this.productosService.getProductosListRelationFilterByStates(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesInProcess).subscribe(
        (response: any) => {
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
          response.forEach(element => {
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre;
            this.productUnionTemp.fechaRegistro = element.fechaRegistro;
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.sID_EstadoRegistro = element.sID_EstadoRegistro;
            this.productUnionTemp.iD_TipoAlimento = element.iD_TiposAlimentos;
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
    } else if (this.filterForm.get('tipo').value == "" || this.filterForm.get('tipo').value == 0) {
      this.alimentosICBFService.getAlimentosRelatioICBFListFilterByState(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesInProcess).subscribe(
        (response: any) => {
          response.forEach(element => {
            this.productUnionTemp = this.productZero;
            this.productUnionTemp.id = element.id;
            this.productUnionTemp.nombre = element.nombre
            this.productUnionTemp.fechaRegistro = new Date();
            this.productUnionTemp.iD_EstadoRegistro = element.iD_EstadoRegistro;
            this.productUnionTemp.sID_EstadoRegistro = element.sID_EstadoRegistro;
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
          this.productosService.getProductosListRelationFilterByStates(this.filterForm.get('subgrupo').value, this.filterForm.get('tipo').value, this.statesInProcess).subscribe(
            (res: any) => {
              res.forEach(elem => {
                this.productUnionTemp = this.productZero;
                this.productUnionTemp.id = elem.id;
                this.productUnionTemp.nombre = elem.nombre
                this.productUnionTemp.fechaRegistro = elem.fechaRegistro;
                this.productUnionTemp.iD_EstadoRegistro = elem.iD_EstadoRegistro;
                this.productUnionTemp.sID_EstadoRegistro = elem.sID_EstadoRegistro;
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
  goToDetail(row: any) {
    if (row.iD_TipoAlimento == 1) {
      this.router.navigate(['/PTNProductos'], { queryParams: { typeComponent: 1, action: 2, id: row.id, type: row.iD_TipoAlimento } });
    }
    else if (row.iD_TipoAlimento == 2) {
      this.router.navigate(['/PTNProductos'], { queryParams: { typeComponent: 2, action: 2, id: row.id, type: row.iD_TipoAlimento } });
    }
  }

  getStateColor(id: number): string {
    switch (id) {
      case 1:
        return "yellowCircle";
        break;
      case 2:
        return "redCircle";
        break;
      default:
        return "yellowCircle";
        break;
    }
  }
}
