import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAlistamientoInicioOperacionComponent } from './plan-alistamiento-inicio-operacion.component';

describe('PlanAlistamientoInicioOperacionComponent', () => {
  let component: PlanAlistamientoInicioOperacionComponent;
  let fixture: ComponentFixture<PlanAlistamientoInicioOperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAlistamientoInicioOperacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAlistamientoInicioOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
