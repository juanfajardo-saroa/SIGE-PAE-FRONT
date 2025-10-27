import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMateriaPrimaComponent } from './producto-materia-prima.component';

describe('ProductoMateriaPrimaComponent', () => {
  let component: ProductoMateriaPrimaComponent;
  let fixture: ComponentFixture<ProductoMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoMateriaPrimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
