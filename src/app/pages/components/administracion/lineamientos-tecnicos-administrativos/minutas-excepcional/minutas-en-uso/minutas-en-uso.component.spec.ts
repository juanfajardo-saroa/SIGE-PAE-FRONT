import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutasEnUsoComponent } from './minutas-en-uso.component';

describe('MinutasEnUsoComponent', () => {
  let component: MinutasEnUsoComponent;
  let fixture: ComponentFixture<MinutasEnUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutasEnUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutasEnUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
