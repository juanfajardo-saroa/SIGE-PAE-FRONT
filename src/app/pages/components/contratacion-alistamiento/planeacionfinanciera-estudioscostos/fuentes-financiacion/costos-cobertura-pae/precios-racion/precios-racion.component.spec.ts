import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosRacionComponent } from './precios-racion.component';

describe('PreciosRacionComponent', () => {
  let component: PreciosRacionComponent;
  let fixture: ComponentFixture<PreciosRacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosRacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosRacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
