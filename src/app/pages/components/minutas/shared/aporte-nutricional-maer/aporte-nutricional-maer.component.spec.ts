import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AporteNutricionalMaerComponent } from './aporte-nutricional-maer.component';

describe('AporteNutricionalMaerComponent', () => {
  let component: AporteNutricionalMaerComponent;
  let fixture: ComponentFixture<AporteNutricionalMaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AporteNutricionalMaerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AporteNutricionalMaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
