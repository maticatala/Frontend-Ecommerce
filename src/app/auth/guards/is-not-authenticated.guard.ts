import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  // authService.checkAuthStatus().subscribe(() => {
  //   if (authService.authStatus() === AuthStatus.authenticated) {
  //     router.navigateByUrl('/dashboard');
  //   }

  // });

  return authService.checkAuthStatus()
    .pipe(
      map((res) => {
        console.log('is not authenticated guard', res);
        return !res || router.createUrlTree(['/dashboard']);
      })
  );


};

