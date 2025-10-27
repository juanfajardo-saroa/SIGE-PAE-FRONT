import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { CriteriosPriorizacionModel } from 'src/app/shared/model/CriteriosPriorizacion';
import { CriteriosPriorizacionService } from 'src/app/shared/services/CriteriosPriorizacion.services';

@Component({
  selector: 'app-custom-criterios-priorizacion',
  templateUrl: './custom-criterios-priorizacion.component.html',
  styleUrls: ['./custom-criterios-priorizacion.component.scss']
})
export class CustomCriteriosPriorizacionComponent implements OnInit {

  //Columnas que se van a manejar en la mat-table
  columnNames = ['nombre'];

  //Determina si el formulario esta en modo de edición.
  esEdicion: boolean = false;

  //Listado de los criterios de priorización
  criterios: CriteriosPriorizacionModel[] | undefined;


  //Arreglo con los criterios modificados
  criteriosModificados: Array<CriteriosPriorizacionModel> = [];

  constructor(private servicio: CriteriosPriorizacionService, private seguridadService: SeguridadService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCriterios().subscribe(criterios => this.criterios = criterios);
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  /**
   * Activa el modo de edición de los criterios de priorización.
   */
  onEditar() {
    this.esEdicion = true;
  }

  /**
   * Guarda los cambios realizados en el activo de los criterios de priorización
   */
  onGuardar() {
    if (this.criteriosModificados.length == 0) {
      this.messageService.showInfo("No hay cambios en los criterios de priorización", 'top center')
    }
    else {

      this.criteriosModificados.forEach(
        c => {

          let criterio = this.copiarModelo(c);


          this.servicio.updateCriteriosPriorizacion(criterio).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (err) => {
            });
        }
      )

      //alert(`Se van a guardar ${this.criteriosModificados.length} cambios`);
      this.criteriosModificados.length = 0;
    }

    //alert("Se guardaron los cambios");


    this.esEdicion = false;
  }


  /**
   * Permite copiar un modelo para realizar la actualización
   * @param c modelo de criterio de priorización
   * @returns copia del modelo unicamente con la informaicón que se va a actualizar
   */
  private copiarModelo(c: CriteriosPriorizacionModel) {
    return new CriteriosPriorizacionModel(
      c.id,
      c.prioridad,
      c.nombre,
      c.activo,
      "",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  /**
   * Permite capturar el evento de cambio del checkbox
   * @param event evento de cambio del checkbox
   */
  selectionChange(event: MatCheckboxChange): void {

    let id = +event.source.value;

    //se busca en elemento  en el arreglo
    let criterio = this.criterios.find(c => c.id == id);

    if (criterio) {
      criterio.activo = event.checked;

      if (!this.criteriosModificados.includes(criterio))
        this.criteriosModificados.push(criterio);
    }

  }

  /**
   * Obtiene el listado de criterios del servicio en un formato de arreglo
   * @returns arreglo del modelo
   */
  getCriterios(): Observable<Array<CriteriosPriorizacionModel>> {

    return this.servicio.getCriteriosPriorizacionList().pipe(
      map((result: any) => this.mapResultToModel(result))
    );
  }

  /**
   * Mapea el resultado dado por el API en un arreglo.
   * @param result  es el arreglo dado por el servicio
   * @returns Un arreglo con el modelo ordenado por la prioridad
   */
  mapResultToModel(result: CriteriosPriorizacionModel[]): any {

    var arreglo: Array<CriteriosPriorizacionModel> = [];
    result.forEach((item) =>
      arreglo.push(item)
    );

    //Ahora se ordenan

    arreglo.sort((c1, c2) => c1.prioridad - c2.prioridad);

    return arreglo;
  }



}
