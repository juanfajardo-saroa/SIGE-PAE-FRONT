import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semaforoContratos'
})
export class SemaforoContratosPipe implements PipeTransform {

  transform(value: string): any {
    let nameclass = '';

    if (value != 'Sin definir') {
      if (value == 'Difícil' || value == 'Rechazado') {
        nameclass = 'red';
      } else if (value == 'Fácil' || value == 'Aprobada') {
        nameclass = 'green';
      } else if (value == 'Incompleta') {
        nameclass = 'orange';
      }
      else if (value == 'Medio' || value == 'Por Aprobar') {
        nameclass = 'yellow';
      }
      else if (value == 'sin diligenciar' || value == 'Creacion' || value == 'Pendiente') {
        nameclass = 'gray';
      }
    }

    return '<div class="' + nameclass + '"></div>';
  }

}
