import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent {

  colorAzulPrimario: string = '#005ACA';

  mostrarMensaje(mensaje: string, textoBotonConfirmacion: string, textoBotonDenegacion: string) {
    return Swal.fire({
      showCloseButton: true,
      html:
        '<img style="position: absolute!important; top: 25px !important; right: 40px !important" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px !important" width="auto">' +
        '<p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important; margin-top: 10px">' + mensaje +'</p>',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: this.colorAzulPrimario,
      cancelButtonColor: this.colorAzulPrimario,
      denyButtonColor: this.colorAzulPrimario,
      confirmButtonText: textoBotonConfirmacion,
      denyButtonText: textoBotonConfirmacion,
      cancelButtonText: textoBotonDenegacion,
    });
  }

}
