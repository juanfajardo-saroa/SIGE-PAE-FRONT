import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTNPreparacionesComponent } from './ptn-preparaciones.component';

describe('PTNPreparacionesComponent', () => {
  let component: PTNPreparacionesComponent;
  let fixture: ComponentFixture<PTNPreparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTNPreparacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PTNPreparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
