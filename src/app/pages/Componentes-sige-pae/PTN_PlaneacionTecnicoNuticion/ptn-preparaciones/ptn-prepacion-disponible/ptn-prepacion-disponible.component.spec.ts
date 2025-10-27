import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnPrepacionDisponibleComponent } from './ptn-prepacion-disponible.component';

describe('PtnPrepacionDisponibleComponent', () => {
  let component: PtnPrepacionDisponibleComponent;
  let fixture: ComponentFixture<PtnPrepacionDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnPrepacionDisponibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnPrepacionDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
