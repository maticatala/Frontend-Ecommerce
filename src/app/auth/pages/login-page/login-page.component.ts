import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    email: ['root@root.com', [Validators.required], []],
    password: ['123456', [Validators.required, Validators.minLength(4)], []],
  });

  public show = signal<boolean>(false);
  public password = signal('password');

  onShow(): void {
    if (!this.show()) this.password.set('text');
    else this.password.set('password');

    return this.show.set(!this.show());
  }

  onSubmit(): void {
    const { email, password } = this.myForm.value;

    if (this.myForm.invalid) return

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard')
      });
  }
}
