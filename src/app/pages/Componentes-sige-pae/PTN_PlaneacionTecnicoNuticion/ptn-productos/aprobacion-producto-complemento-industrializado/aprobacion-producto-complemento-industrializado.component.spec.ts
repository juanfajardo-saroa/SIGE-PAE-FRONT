import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionProductoComplementoIndustrializadoComponent } from './aprobacion-producto-complemento-industrializado.component';

describe('AprobacionProductoComplementoIndustrializadoComponent', () => {
  let component: AprobacionProductoComplementoIndustrializadoComponent;
  let fixture: ComponentFixture<AprobacionProductoComplementoIndustrializadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionProductoComplementoIndustrializadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionProductoComplementoIndustrializadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
