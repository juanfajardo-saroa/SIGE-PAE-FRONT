import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProcesoContractualComponent } from './detalle-proceso-contractual.component';

describe('DetalleProcesoContractualComponent', () => {
  let component: DetalleProcesoContractualComponent;
  let fixture: ComponentFixture<DetalleProcesoContractualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProcesoContractualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProcesoContractualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
