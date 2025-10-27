import { AfterViewInit, Component, Inject, OnInit, Optional, } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AspNetUsersService } from '../AspNetUsers/AspNetUsers.services';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SeguridadService } from '../seguridad.service';
import { MessageService } from 'src/app/services/message.service';
import { credencialesUsuario, respuestaAutenticacion } from '../seguridad';
import { TipoDocumentoIdenModel } from '../AspNetUsers/TipoDocumentoIden';
import { TipoDocumentoIdenService } from 'src/app/shared/services/TipoDocumentoIden.services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ForgotPasswordDto } from './forgotPasswordDto';
import { environment } from 'src/environments/environment';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;
  public selected: number = 1;
  public valordefault: string = '1';
  public showPassword: boolean = false;
  private readonly llaveToken = 'token';
  private readonly llaveRol = 'RolBase';
  private readonly llaveKeyBase = 'KeyBase';
  TipoDocumentoIdenList: TipoDocumentoIdenModel[] = [];

  private subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private seguridadService: SeguridadService,
    private messageservice: MessageService,
    public _authService: AspNetUsersService,
    private TipoDocumentoIdenService: TipoDocumentoIdenService,
    private _router: Router,
    private vigenciasService: VigenciasService
  ) {


    localStorage.setItem('Inicio', 'true');
    localStorage.setItem('KeylayoutB', 'No');
    let tok = localStorage.getItem('token');
    let tok_exp = Number(localStorage.getItem('token-expiracion'))
    // console.log(localStorage.getItem('token'));
    if (tok === undefined || tok === '' || tok === null) {
      localStorage.setItem('Inicio', 'true');
    } else {
      var expirationDate = new Date(tok_exp * 1000)
      //console.log(expirationDate,new Date());
      if (expirationDate < new Date()) {
        localStorage.setItem('Inicio', 'true');
      } else {
        this._router.navigate(['/sistemas']);
      }


    }
    //localStorage.clear();
    this.TipoDocumentoIdenService.getTipoDocumentoIdenList().subscribe(
      (response: any) => {
        this.TipoDocumentoIdenList = response;
        //        console.log(this.TipoDocumentoIdenList);
      },
      (err) => {
        console.log('Error en cargar los registros de tipo de documento', err);
      }
    );

    this.loginForm = new FormGroup({
      documentType: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

  }

  public dataArray: any;

  errores: string[] = [];

  ngOnInit(): void {

    //localStorage.clear();
  }

  public validateControl = (controlName: string) => {
    return (
      this.loginForm.controls[controlName].invalid &&
      this.loginForm.controls[controlName].touched
    );
  };

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  public loginUserNEW = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: credencialesUsuario = {
      password: login.password,
      documento: login.document,
      tipodocumento: login.documentType,
    };

    this._authService.loginUser(userForAuth).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this._router.navigate([this._returnUrl]);
      },
      (error) => {
        this.errorMessage = error;
        this.showError = true;
      }
    );
  };

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };





    const userForAuth: credencialesUsuario = {
      password: login.password,
      documento: login.document,
      tipodocumento: login.documentType,
    };
    this._authService.loginUser(userForAuth).subscribe(
      (res) => {
        localStorage.clear();
        localStorage.setItem('Inicio', 'true')
        this.seguridadService.guardarToken(res);


        // console.log('RA',localStorage.getItem('RolUapa'))
        if (localStorage.getItem(this.llaveRol) == environment.RolBaseUapa || localStorage.getItem(this.llaveKeyBase) == environment.KeyBaseUapa || localStorage.getItem('RolUapa') == 'Si' || localStorage.getItem('RolUapa') == 'SI') {

          localStorage.setItem('Inicio', 'false');
          localStorage.setItem('MenuSigenaUapa', 'true');
          localStorage.setItem('SistemaSelect', 'sgnUAPA');
          localStorage.setItem('RolSuperUapa', 'Si');
          localStorage.setItem('nombreSistema', 'Módulo Administrativo - Unidad Administrativa Especial de Alimentación Escolar');
          localStorage.setItem('Sistema', 'true');
          localStorage.setItem('Ubicacion', 'UApA');
          localStorage.setItem('nombredeUbicacionActualizado', 'si')
          localStorage.setItem('KeylayoutA', 'Si');
          localStorage.setItem('KeylayoutB', 'No');
          localStorage.setItem('KeylayoutC', 'Si');
          this.vigenciasService.AsyncgetVigenciasList().then(
            async (response: any) => {
              this.dataArray = response.filter(items => items.vigenciaActual === true);
              localStorage.setItem('VigNoSeleccionada', this.dataArray[1].id);
              localStorage.setItem('VigSeleccionada', this.dataArray[0].id);
              localStorage.setItem('VigSeleccionadaJson', JSON.stringify(this.dataArray[0]));
            },
            (err) => {
              console.log("-----> error en cargar los registros", err);
            }
          );
          // console.log('Login vigencias selecciona inicia permsos',localStorage.getItem('VigSeleccionada'));
          this.seguridadService.ValidateFullPermissions();

          this._router.navigate(['/iniciosgn']).then(() => {
            window.location.reload();
          });

          //iniciouapa


        }
        else {

          localStorage.setItem('KeylayoutB', 'Si');
          localStorage.setItem('KeylayoutC', 'Si');

          this._router.navigate(['/sistemas']);

        }









      },
      (error) => {
        this.errorMessage = error;
        this.showError = false;
        this.messageservice.showQuestion(
          'Usuario o contraseña incorrecta',
          'top right'
        );
        /* console.log(this.messageservice,'Usuario o contraseña incorrecta') */

      }
    );
  };




  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogForgotPassword, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Enviar') {
        this.sendLink(result.data);
      }
    });
  }

  sendLink(formObj: any): void {
    const forgotPassDto: ForgotPasswordDto = {
      email: formObj.email,
      clientURI: environment.siGEPaeUrl + 'reset',
    };
    this._authService.forgotPassword(forgotPassDto).subscribe(
      (res) => {
       
        if (!res) {
          
          Swal.fire({
            showCloseButton: true,
            html:
              '<img style="height: 30px !important; position: absolute !important; top: 20% !important; right: 5% !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-15b.png" height="50px" width="auto">' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA; margin: 0%">Hemos enviado un mensaje al correo electrónico registrado. </p> ' +
              '<p style="text-align: left!important; font-size: 13px; color:#005ACA;">Siga los pasos para recuperar su contraseña. </p> ',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#E2ECFD',
            cancelButtonColor: '#005ACA',
            denyButtonColor: '#005ACA',
            confirmButtonText: 'Enviar de nuevo',
            cancelButtonText: 'Iniciar sesión',
            showDenyButton: false,
            denyButtonText: `Iniciar sesión`,
          }).then((result) => {
            if (result.isDenied) {
              this._authService.forgotPassword(forgotPassDto).subscribe(
                (_) => {
      
                },
                (err) => {
                  this.showError = true;
                  this.errorMessage = err;
                }
              );
            }
            else {
              this._router.navigate(['/Login']);
            }
          })
        }
      },
      (err) => {
        this.showError = true;
        this.errorMessage = err;
      }
    );
  }
}

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.dialog.html',
  styleUrls: ['./forgot-password.dialog.scss'],
})
export class DialogForgotPassword {
  action: string;
  local_data: any;
  forgotPasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogForgotPassword>,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  doAction(): void {
    this.dialogRef.close({
      event: this.action,
      data: this.forgotPasswordForm.value,
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
