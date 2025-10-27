import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.scss']
})
export class RegistroProductoComponent implements OnInit {
  
  tipoProductoList: any = [
    { id: 1, selected: false, descripcion: 'Materia prima', image: '../../../../../assets/iconos_PAE/PNG/Iconos_PAE-294.png', imageSelected: '../../../../../assets/iconos_PAE/PNG/Iconos_PAE-286.png' },
    { id: 2, selected: false, descripcion: 'Producto para complemento industrializado', image: '../../../../../assets/iconos_PAE/PNG/Iconos_PAE-83.png', imageSelected: '../../../../../assets/iconos_PAE/PNG/Íconos_PAE-190.png' }
  ];
  typeForm: FormGroup;
  
  constructor(private router: Router,
    private fb: FormBuilder,
    ) {
    this.typeForm = this.fb.group({
      tipo: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmitClick() {
    if(this.typeForm.valid){
      if(this.typeForm.get('tipo').value == 1){
        this.goToMateriaPrima();
      } else if (this.typeForm.get('tipo').value == 2) {
        this.goToIndustrializado();
      }
    }
  }

  goToIndustrializado() {
    this.router.navigate(['/RegistroProductoComplementoIndustrializado']);
  }

  goToMateriaPrima() {
    this.router.navigate(['/RegistroProductoMateriaPrima']);
  }

  goToBack() {
    this.router.navigate(['/PTNProductos'])
  }

  onTypeClick() {
    if(this.typeForm.get('tipo').value == 1){
      this.tipoProductoList[0].selected = true;
      this.tipoProductoList[1].selected = false;
    } else if (this.typeForm.get('tipo').value == 2) {
      this.tipoProductoList[0].selected = false;
      this.tipoProductoList[1].selected = true;
    }
  }
}
