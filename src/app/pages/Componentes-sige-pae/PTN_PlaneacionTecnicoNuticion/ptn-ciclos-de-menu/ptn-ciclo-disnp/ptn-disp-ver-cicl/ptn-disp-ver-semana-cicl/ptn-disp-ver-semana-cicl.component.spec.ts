import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnDispVerSemanaCiclComponent } from './ptn-disp-ver-semana-cicl.component';

describe('PtnDispVerSemanaCiclComponent', () => {
  let component: PtnDispVerSemanaCiclComponent;
  let fixture: ComponentFixture<PtnDispVerSemanaCiclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnDispVerSemanaCiclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnDispVerSemanaCiclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
