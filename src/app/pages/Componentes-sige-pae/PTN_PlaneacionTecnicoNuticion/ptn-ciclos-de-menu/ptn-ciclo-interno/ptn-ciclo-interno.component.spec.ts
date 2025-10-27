import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnCicloInternoComponent } from './ptn-ciclo-interno.component';

describe('PtnCicloInternoComponent', () => {
  let component: PtnCicloInternoComponent;
  let fixture: ComponentFixture<PtnCicloInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnCicloInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnCicloInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
