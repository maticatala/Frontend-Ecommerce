import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class EmailValidator {

  constructor(private authService: AuthService) {}

  validate(lastEmail: string | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;

      if (!email) return of(null);

      if (lastEmail) {
        if (email === lastEmail) return of(null);
      }

      return this.authService.findByEmail(email).pipe(
        map((emailTaken) => (emailTaken ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
