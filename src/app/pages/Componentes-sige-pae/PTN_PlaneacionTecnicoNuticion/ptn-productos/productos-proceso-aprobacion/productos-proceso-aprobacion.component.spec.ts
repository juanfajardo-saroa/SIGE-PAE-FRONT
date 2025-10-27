import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosProcesoAprobacionComponent } from './productos-proceso-aprobacion.component';

describe('ProductosProcesoAprobacionComponent', () => {
  let component: ProductosProcesoAprobacionComponent;
  let fixture: ComponentFixture<ProductosProcesoAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosProcesoAprobacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosProcesoAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
