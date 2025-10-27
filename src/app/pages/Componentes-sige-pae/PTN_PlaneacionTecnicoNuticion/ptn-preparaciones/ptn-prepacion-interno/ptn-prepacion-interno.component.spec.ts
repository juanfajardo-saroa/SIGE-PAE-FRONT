import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnPrepacionInternoComponent } from './ptn-prepacion-interno.component';

describe('PtnPrepacionInternoComponent', () => {
  let component: PtnPrepacionInternoComponent;
  let fixture: ComponentFixture<PtnPrepacionInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnPrepacionInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnPrepacionInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
