import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAlistamientoDocumentacionComponent } from './plan-alistamiento-documentacion.component';

describe('PlanAlistamientoDocumentacionComponent', () => {
  let component: PlanAlistamientoDocumentacionComponent;
  let fixture: ComponentFixture<PlanAlistamientoDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAlistamientoDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAlistamientoDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
