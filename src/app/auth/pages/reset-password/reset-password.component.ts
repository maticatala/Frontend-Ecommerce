import { ValidatorsService } from './../../../shared/services/validators.service';
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';


@Component
({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent {

    private ValidatorsService = inject(ValidatorsService);
    private router = inject(Router)
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private _cusSnackbar = inject(CustomSnackbarService);

    public myForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.ValidatorsService.emailPattern)]]
    })


    onsubmit(): void {


      if (this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      };

      const formValue = this.myForm.value;
      console.log(formValue);
      this.authService.recover(formValue).subscribe({
        next: () => {
          this._cusSnackbar.openCustomSnackbar("done", "Correo enviado!", "Okay", 3000, 'success');
        },
        error: (e: any) => {
          this._cusSnackbar.openCustomSnackbar("error", "Correo electrónico no encontrado", "Okay", 3000, 'danger');
        }
      })

    }

}
