import { ValidatorsService } from '../../../shared/services/validators.service';
import { Component, inject, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';


@Component
({
  templateUrl: './set-password.component.html',
})

export class SetPasswordComponent {

    private validatorsService = inject(ValidatorsService);
    private router = inject(Router)
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private _cusSnackbar = inject(CustomSnackbarService);

    public myForm: FormGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
      ]
    });

    onsubmit(): void {


      if(!this.myForm.valid) return

      const resetPasswordToken = this.route.snapshot.paramMap.get('resetPasswordToken');

      if (!resetPasswordToken) return;

      const { password } = this.myForm.value;

      this.authService.resetPassword(resetPasswordToken, password).subscribe({
        next: () => {
          this._cusSnackbar.openCustomSnackbar("done", "Contraseña cambiada correctamente!", "Okay", 3000, 'success');
          this.router.navigateByUrl('auth/log-in');
        },
        error: (e:any) => {
          this._cusSnackbar.openCustomSnackbar("error", "Correo electrónico no encontrado", "Okay", 3000, 'danger');
        }
      });


    }


      public show = signal<boolean>(false);
      public password = signal('password');

      onShow(): void {
        if (!this.show()) this.password.set('text');
        else this.password.set('password');

        return this.show.set(!this.show());
      }

}
