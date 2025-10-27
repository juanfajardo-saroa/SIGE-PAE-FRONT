import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnRegSemanaCiclComponent } from './ptn-reg-semana-cicl.component';

describe('PtnRegSemanaCiclComponent', () => {
  let component: PtnRegSemanaCiclComponent;
  let fixture: ComponentFixture<PtnRegSemanaCiclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnRegSemanaCiclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnRegSemanaCiclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
