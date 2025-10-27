import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnDispVerCiclComponent } from './ptn-disp-ver-cicl.component';

describe('PtnDispVerCiclComponent', () => {
  let component: PtnDispVerCiclComponent;
  let fixture: ComponentFixture<PtnDispVerCiclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnDispVerCiclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnDispVerCiclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
