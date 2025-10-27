import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnCicloDisnpComponent } from './ptn-ciclo-disnp.component';

describe('PtnCicloDisnpComponent', () => {
  let component: PtnCicloDisnpComponent;
  let fixture: ComponentFixture<PtnCicloDisnpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnCicloDisnpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnCicloDisnpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
