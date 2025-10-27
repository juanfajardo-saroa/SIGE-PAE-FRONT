import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizacionPaepiComponent } from './priorizacion-paepi.component';

describe('PriorizacionPaepiComponent', () => {
  let component: PriorizacionPaepiComponent;
  let fixture: ComponentFixture<PriorizacionPaepiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorizacionPaepiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorizacionPaepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
