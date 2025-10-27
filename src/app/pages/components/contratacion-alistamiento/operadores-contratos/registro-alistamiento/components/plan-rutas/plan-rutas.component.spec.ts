import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRutasComponent } from './plan-rutas.component';

describe('PlanRutasComponent', () => {
  let component: PlanRutasComponent;
  let fixture: ComponentFixture<PlanRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
