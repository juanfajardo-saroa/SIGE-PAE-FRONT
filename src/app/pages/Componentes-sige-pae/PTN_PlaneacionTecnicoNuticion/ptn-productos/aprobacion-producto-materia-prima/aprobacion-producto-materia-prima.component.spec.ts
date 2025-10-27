import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionProductoMateriaPrimaComponent } from './aprobacion-producto-materia-prima.component';

describe('AprobacionProductoMateriaPrimaComponent', () => {
  let component: AprobacionProductoMateriaPrimaComponent;
  let fixture: ComponentFixture<AprobacionProductoMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionProductoMateriaPrimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionProductoMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
