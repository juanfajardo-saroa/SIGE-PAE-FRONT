import { Component, OnInit } from '@angular/core';
import { ForgotPasswordDto } from './forgotPasswordDto';
//import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AspNetUsersService } from '../../AspNetUsers/AspNetUsers.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;
  constructor(private _authService: AspNetUsersService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }
  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: environment.siGEPaeUrl + 'reset'
    }
    this._authService.forgotPassword(forgotPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
        this.successMessage = 'The link has been sent, please check your email to reset your password.'
      },
        err => {
          this.showError = true;
          this.errorMessage = err;
        })
  }

}
