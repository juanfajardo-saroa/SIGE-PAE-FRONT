import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizacionMaerComponent } from './priorizacion-maer.component';

describe('PriorizacionMaerComponent', () => {
  let component: PriorizacionMaerComponent;
  let fixture: ComponentFixture<PriorizacionMaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorizacionMaerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorizacionMaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
