import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPlaneacionFinancieraComponent } from './tab-planeacion-financiera.component';

describe('TabPlaneacionFinancieraComponent', () => {
  let component: TabPlaneacionFinancieraComponent;
  let fixture: ComponentFixture<TabPlaneacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPlaneacionFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPlaneacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
