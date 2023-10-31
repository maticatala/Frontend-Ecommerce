import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ new EmailValidator() ]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)], []],
    password2: ['', [Validators.required], []]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });

  public show = signal<boolean>(false);
  public password = signal('password');

  onShow(): void {
    if (!this.show()) this.password.set('text');
    else this.password.set('password');

    return this.show.set(!this.show());
  }


  onSubmit(): void {
    const { email, password, firstName, lastName } = this.myForm.value;
    const name = firstName + ' ' + lastName;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.myForm.markAsDirty();
      this.myForm.markAsPristine();
      this.myForm.markAsTouched();
      return;
    };

    this.authService.register(email, password, name)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      }
    });

  }
}
