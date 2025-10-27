import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabsedes',
  templateUrl: './tabsedes.component.html',
  styleUrls: ['./tabsedes.component.scss']
})
export class TabsedesComponent implements OnInit {

  constructor(private seguridadService: SeguridadService, private route: ActivatedRoute,) { }

  ActiveAlertMatriz: boolean = false;
  selectedTabIndex: number;
  idtab = 0;
  myTabFocusChange(selectedTabIndex: number) {
    console.log(selectedTabIndex);
    
    if (selectedTabIndex == 2) {
      this.ngOnInit();
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="height: 30px!important;position: absolute!important; top: 15% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png">' +
          '<p  style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem; margin-top: 2rem;">La matriz de riesgo estará disponible cuando se haya ' +
          'completado la información de diagnóstico de infraestructura ' +
          'y acceso.</p>',
        /*  text: 'La matriz de riesgo estará disponible cuando se haya completado la información de diagnostico de infraestructura y acceso.', */
      });
      this.selectedTabIndex = 2;
    }

    /* alert('Tab position: ' + selectedTabIndex); */
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idtab = + params.tab;


      if (this.idtab === 2) {
        Swal.fire({
          showCloseButton: true,
          html:
            '<img style="height: 30px!important;position: absolute!important; top: 15% !important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png">' +
            '<p style="text-align: left!important; font-size: 12px; color:#005ACA; margin-right: 2rem; margin-top: 2rem;">La matriz de riesgo estará disponible cuando se haya ' +
            'completado la información de diagnóstico de infraestructura ' +
            'y acceso.</p>',
        });
        this.selectedTabIndex = this.idtab;
      } else if (this.idtab === 0) {
        this.selectedTabIndex = this.idtab;
      } else if (this.idtab === 1) {
        this.selectedTabIndex = this.idtab;
      } else if (this.idtab === 3) {
        this.selectedTabIndex = this.idtab;

      } else {
        //       console.log('no tiene tabs');

      }
    });
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }
}
