import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnCicloAproComponent } from './ptn-ciclo-apro.component';

describe('PtnCicloAproComponent', () => {
  let component: PtnCicloAproComponent;
  let fixture: ComponentFixture<PtnCicloAproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnCicloAproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnCicloAproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
