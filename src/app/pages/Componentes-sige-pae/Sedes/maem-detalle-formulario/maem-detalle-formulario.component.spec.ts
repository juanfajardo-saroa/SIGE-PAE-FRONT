import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaemDetalleFormularioComponent } from './maem-detalle-formulario.component';

describe('MaemDetalleFormularioComponent', () => {
  let component: MaemDetalleFormularioComponent;
  let fixture: ComponentFixture<MaemDetalleFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaemDetalleFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaemDetalleFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
