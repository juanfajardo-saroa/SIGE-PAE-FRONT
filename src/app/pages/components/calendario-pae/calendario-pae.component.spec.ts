import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioPaeComponent } from './calendario-pae.component';

describe('CalendarioPaeComponent', () => {
  let component: CalendarioPaeComponent;
  let fixture: ComponentFixture<CalendarioPaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioPaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioPaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
