import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizacionMaemComponent } from './priorizacion-maem.component';

describe('PriorizacionMaemComponent', () => {
  let component: PriorizacionMaemComponent;
  let fixture: ComponentFixture<PriorizacionMaemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorizacionMaemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorizacionMaemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
