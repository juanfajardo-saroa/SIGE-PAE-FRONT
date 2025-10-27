import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnAprCiclComponent } from './ptn-apr-cicl.component';

describe('PtnAprCiclComponent', () => {
  let component: PtnAprCiclComponent;
  let fixture: ComponentFixture<PtnAprCiclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnAprCiclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnAprCiclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
