import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateUtilService {

    public formatearFecha(fecha: string): string {
        return formatDate(new Date(fecha), 'dd-MMM-yyyy', 'es-COL').replace('.', '').toUpperCase();
    }
}