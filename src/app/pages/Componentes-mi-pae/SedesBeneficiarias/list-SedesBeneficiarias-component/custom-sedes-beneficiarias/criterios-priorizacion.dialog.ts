import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CriteriosPriorizacionModel } from 'src/app/shared/model/CriteriosPriorizacion';
import { CriteriosPriorizacionService } from 'src/app/shared/services/CriteriosPriorizacion.services';

import { DialogData } from './DialogData';


@Component({
  selector: 'app-criterios-priorizacion',
  templateUrl: './criterios-priorizacion.dialog.html',
  styleUrls: ["./criterios-priorizacion.dialog.scss"],
})
export class CriteriosPriorizacionDialog implements OnInit {

  columnNames = ['nombre'];
  criterios$: Observable<CriteriosPriorizacionModel[]> | undefined;

  constructor(public dialogRef: MatDialogRef<CriteriosPriorizacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicio: CriteriosPriorizacionService
  ) { }

  ngOnInit(): void {
    this.criterios$ = this.getCriterios();
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
    result.forEach((item) => {
      if (item.activo) {
        arreglo.push(item)
      }
    }
    );

    //Ahroa se ordenan

    arreglo.sort((c1, c2) => c1.prioridad - c2.prioridad);

    return arreglo;
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
