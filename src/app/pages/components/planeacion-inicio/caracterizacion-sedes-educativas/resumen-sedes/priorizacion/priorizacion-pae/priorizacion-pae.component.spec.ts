import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizacionPaeComponent } from './priorizacion-pae.component';

describe('PriorizacionPaeComponent', () => {
  let component: PriorizacionPaeComponent;
  let fixture: ComponentFixture<PriorizacionPaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorizacionPaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorizacionPaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
