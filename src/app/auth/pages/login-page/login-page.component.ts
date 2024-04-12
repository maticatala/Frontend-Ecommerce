import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private _cusSnackbar = inject(CustomSnackbarService);

  public myForm: FormGroup = this.fb.group({
    email: ['root@root.com', [Validators.required], []],
    password: ['123456', [Validators.required], []],
    keepLogged: [false]
  });

  public show = signal<boolean>(false);
  public password = signal('password');

  onShow(): void {
    if (!this.show()) this.password.set('text');
    else this.password.set('password');

    return this.show.set(!this.show());
  }

  onSubmit(): void {
    const { email, password, keepLogged } = this.myForm.value;

    if (this.myForm.invalid) return

    this.authService.login(email, password, keepLogged)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (e:any) => {
          this._cusSnackbar.openCustomSnackbar("error", "Correo electrónico o contraseña incorrectos", "Okay", 3000, 'danger');
        }
      });
  }
}
