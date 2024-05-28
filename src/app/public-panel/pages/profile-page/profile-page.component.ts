import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CustomSnackbarService } from '../../../shared/components/custom-snackbar/custom-snackbar.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private _cusSnackbar = inject(CustomSnackbarService);

  public myForm: FormGroup = this.fb.group({
    email: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    firstName: [{ value: null, disabled: true }, [Validators.required]],
    lastName: [{ value: null, disabled: true }, [Validators.required]],
  });

  constructor(){}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.myForm.patchValue(user!);
    this.myForm.get('firstName')?.enable();
    this.myForm.get('lastName')?.enable();
  }

  onFormSubmit(){
    this.authService.updateUser(this.myForm.value).subscribe({
      next: (res) => {
        this.myForm.markAsPristine();
        this._cusSnackbar.openCustomSnackbar("done", `Usuario modificado correctamente`, "Okay", 3000, 'success');
      },
      error: (e) => {
        const message = e.error.message;
        this._cusSnackbar.openCustomSnackbar("error", `${message}`, "Okay", 3000, 'danger');
      }
    })
  }
}
