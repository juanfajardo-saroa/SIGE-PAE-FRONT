import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContratacionYAlistamientoComponent } from './tab-contratacion-y-alistamiento.component';

describe('TabContratacionYAlistamientoComponent', () => {
  let component: TabContratacionYAlistamientoComponent;
  let fixture: ComponentFixture<TabContratacionYAlistamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabContratacionYAlistamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContratacionYAlistamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
