import { TestBed, inject } from '@angular/core/testing';

import { PasswordConfirmationValidatorService } from './password-confirmation-validator.service';

describe('PasswordConfirmationValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordConfirmationValidatorService]
    });
  });

  it('debe crear componente', inject([PasswordConfirmationValidatorService], (service: PasswordConfirmationValidatorService) => {
    expect(service).toBeTruthy();
  }));
});