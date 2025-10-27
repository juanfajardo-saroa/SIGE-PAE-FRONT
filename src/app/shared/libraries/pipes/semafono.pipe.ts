import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semaforo'
})

export class SemaforoPipe implements PipeTransform {

  transform(value: string): any {
    
    let nameclass = ''; 

    if(value != 'Sin definir'){
      if(value == 'Difícil' || value=='Incompleta'){
        nameclass = 'red';
      }else if(value == 'Fácil' || value=='Aprobada'){
        nameclass = 'green';
      }else if(value == 'Medio' || value == 'Por Aprobar'){
        nameclass = 'yellow';
      }
      else if(value == 'sin diligenciar' || value == 'Creacion')
      {
        nameclass = 'gray';
      }
    }

    return '<div class="'+ nameclass +'"></div>';

  }

}
