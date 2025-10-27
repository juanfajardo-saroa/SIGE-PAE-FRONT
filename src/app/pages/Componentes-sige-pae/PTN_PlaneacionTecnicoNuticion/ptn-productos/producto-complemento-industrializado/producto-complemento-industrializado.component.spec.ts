import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComplementoIndustrializadoComponent } from './producto-complemento-industrializado.component';

describe('ProductoComplementoIndustrializadoComponent', () => {
  let component: ProductoComplementoIndustrializadoComponent;
  let fixture: ComponentFixture<ProductoComplementoIndustrializadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoComplementoIndustrializadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComplementoIndustrializadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
