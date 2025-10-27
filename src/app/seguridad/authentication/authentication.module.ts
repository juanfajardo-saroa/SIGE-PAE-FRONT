import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatCardModule,
} from '@angular/material/card';
import {
    MatInputModule
} from '@angular/material/input';
import {
    MatCheckboxModule
} from '@angular/material/checkbox';
import {
    MatButtonModule
} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            // { path: 'register', component: RegisterUserComponent },
            //{ path: 'login', component: LoginComponent },
            { path: 'forgotpassword', component: ForgotPasswordComponent }
          ])
    ],
    declarations: [
        ErrorComponent,
        ForgotComponent,
        LockscreenComponent,
        //LoginComponent,
        RegisterComponent,
        //ForgotPasswordComponent
    ]
})
export class AuthenticationModule { }
