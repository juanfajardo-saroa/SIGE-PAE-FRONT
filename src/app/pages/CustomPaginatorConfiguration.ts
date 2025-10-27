import { MatPaginatorIntl } from "@angular/material/paginator";
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

          customPaginatorIntl.itemsPerPageLabel="Registros por página";
          customPaginatorIntl.nextPageLabel="Siguiente";
          customPaginatorIntl.previousPageLabel="Anterior";
          customPaginatorIntl.firstPageLabel="Primero";
          customPaginatorIntl.lastPageLabel="Último";

  return customPaginatorIntl;
}