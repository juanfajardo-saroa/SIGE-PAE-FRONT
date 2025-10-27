import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableRutaComponent } from './desplegable-ruta.component';

describe('DesplegableRutaComponent', () => {
  let component: DesplegableRutaComponent;
  let fixture: ComponentFixture<DesplegableRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesplegableRutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
