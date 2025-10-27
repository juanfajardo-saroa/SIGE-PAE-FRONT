import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutaMaemLeveComponent } from './minuta-maem-leve.component';

describe('MinutaMaemLeveComponent', () => {
  let component: MinutaMaemLeveComponent;
  let fixture: ComponentFixture<MinutaMaemLeveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutaMaemLeveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutaMaemLeveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
