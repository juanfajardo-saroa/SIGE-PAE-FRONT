import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ResetPasswordDto } from './ResetPasswordDto';

import { AspNetUsersService } from '../../AspNetUsers/AspNetUsers.services';
import { PasswordConfirmationValidatorService } from './password-confirmation-validator.service';
import { environment } from 'src/environments/environment.prod';
//import { AuthenticationService } from './../../shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  
  private _token: string;
  private _email: string;

  constructor(private _authService: AspNetUsersService, private _passConfValidator: PasswordConfirmationValidatorService, private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%&()=,.;:*@])[A-Za-z0-9!#$%&()=,.;:*@]{8,}$')]),
      confirm: new FormControl('')
    });
    this.resetPasswordForm.get('confirm').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))]);
    
      this._token = this._route.snapshot.queryParams['token'];
      this._email = this._route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }
  
  backToLogin() {
    this.router.navigateByUrl('/Login');
  }
 
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }
  
  public resetPassword = (resetPasswordFormValue) => {
    this.showError = this.showSuccess = false;
  
    const resetPass = { ... resetPasswordFormValue };
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token,
      email: this._email
    }
  
    this._authService.resetPassword(resetPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      window.location.replace(environment.baseUrlFront);
    },
    error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }



}