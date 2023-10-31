import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  private authService = inject(AuthService);

  validate(control: AbstractControl): Observable<ValidationErrors | null>  {

    const email = control.value;

    if (!email) of(false);

    return this.authService.findByEmail(email)
    .pipe(
      map(emailTaken => emailTaken ? { emailTaken: true } : null),
      catchError(() => of(null)) // Manejar errores de la petición HTTP
    );

  }

}
