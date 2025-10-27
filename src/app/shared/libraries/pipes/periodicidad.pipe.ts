import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodicidad',
})
export class PeriodicidadPipe implements PipeTransform {
  transform(periodicidad: number): string {
    if (!periodicidad) {
      return '';
    }

    switch (periodicidad) {
      case 1:
        return 'Mensuales';
        break;
      case 2:
        return 'Trimestral';
        break;
      case 3:
        return 'Semestral';
        break;
      default:
        return 'sin periodicidad';
    }
  }
}
