import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UsersService } from '../../services/users.service';
import { Roles } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  private fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<UserAddEditComponent>);
  private validatorsService = inject(ValidatorsService);
  private _cusSnackbar = inject(CustomSnackbarService);
  private usersService = inject(UsersService);

  public data = inject(MAT_DIALOG_DATA);
  public roles = Object.values(Roles);
  public hide = true;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.minLength(6)], []],
    password2: ['', [], []],
    rol: ['', [Validators.required], []]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });


  ngOnInit(): void {
    if (this.data) {
      this.myForm.get('password')?.clearValidators();
      this.myForm.get('password')?.updateValueAndValidity();
      // this.myForm.get('email')?.setAsyncValidators(this.emailValidator.validate())
    } else {
      this.myForm.get('password')?.setValidators([Validators.required, Validators.minLength(4)]);
      // this.myForm.get('email')?.setAsyncValidators(this.emailValidator.validate())
    }
    this.myForm.patchValue(this.data);
  }

  onFormSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    if (this.data) {
      const { password, password2, ...body } = this.myForm.value;

      if (password) body['password'] = password;

      this.updateUser(this.data.id, body);
    } else {
      const { password2, ...body } = this.myForm.value;

      this.createUser(body);
    }
  }

  private updateUser(id:number, body:any): void {
    this.usersService.updateUser(id, body).subscribe({
        next: (res: any) => {
          this._cusSnackbar.openCustomSnackbar("done", "User Modified Succesfully!", "Okay", 3000, 'success');
          this._dialogRef.close(true);//Permite recargar la lista de usuarios una vez actualizado un usuario
        },
        error: (e: any) => {
          console.log(e.error.message);
          this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Okay", 3000, 'danger');
        }
      })
  }

//! REVISAR ESTAS CONSULTAS HTTP, DEBERIA HACERLO CON EL AUTH SERVICE Y NO CON EL usersServie

  private createUser(body:any): void {
    this.usersService.createUser(body).subscribe({
        next: (res: any) => {
          this._cusSnackbar.openCustomSnackbar("done", "User Added Succesfully!", "Okay", 3000, 'success');
          this._dialogRef.close(true); //Permite recargar la lista de usuarios una vez creado un usuario
        },
        error: (e: any) => {
          this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Okay", 3000, 'danger');
        }
      })
  }


}
