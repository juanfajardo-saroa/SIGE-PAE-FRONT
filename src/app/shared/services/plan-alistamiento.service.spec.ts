import { TestBed } from '@angular/core/testing';

import { PlanAlistamientoService } from './plan-alistamiento.service';

describe('PlanAlistamientoService', () => {
  let service: PlanAlistamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAlistamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
