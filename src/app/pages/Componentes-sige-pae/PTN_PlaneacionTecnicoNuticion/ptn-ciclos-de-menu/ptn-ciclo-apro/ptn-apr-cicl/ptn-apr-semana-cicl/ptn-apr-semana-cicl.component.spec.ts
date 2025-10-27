import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnAprSemanaCiclComponent } from './ptn-apr-semana-cicl.component';

describe('PtnAprSemanaCiclComponent', () => {
  let component: PtnAprSemanaCiclComponent;
  let fixture: ComponentFixture<PtnAprSemanaCiclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnAprSemanaCiclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnAprSemanaCiclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
