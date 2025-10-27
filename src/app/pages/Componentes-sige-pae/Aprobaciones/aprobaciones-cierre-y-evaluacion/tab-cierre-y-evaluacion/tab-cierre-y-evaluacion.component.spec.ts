import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCierreYEvaluacionComponent } from './tab-cierre-y-evaluacion.component';

describe('TabCierreYEvaluacionComponent', () => {
  let component: TabCierreYEvaluacionComponent;
  let fixture: ComponentFixture<TabCierreYEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCierreYEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCierreYEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
