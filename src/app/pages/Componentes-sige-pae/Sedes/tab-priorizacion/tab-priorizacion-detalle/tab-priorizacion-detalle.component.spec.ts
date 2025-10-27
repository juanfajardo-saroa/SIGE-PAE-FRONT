import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPriorizacionDetalleComponent } from './tab-priorizacion-detalle.component';

describe('TabPriorizacionDetalleComponent', () => {
  let component: TabPriorizacionDetalleComponent;
  let fixture: ComponentFixture<TabPriorizacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPriorizacionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPriorizacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
