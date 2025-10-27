import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroInput',
})
export class FiltroInputPipe implements PipeTransform {
  transform(items: any[], textoBusqueda: string): any[] {
    if (!items) {
      return [];
    }
    if (!textoBusqueda) {
      return items;
    }

    textoBusqueda = textoBusqueda.toLocaleLowerCase();
    return items.filter((item) => {
      return item.toLocaleLowerCase().includes(textoBusqueda);
    });
  }
}
