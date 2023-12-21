import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isAdminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  console.log("test");

  return authService.checkAuthStatus()
    .pipe(
      map((res) => {
        return authService.currentUser()?.rol === 'admin' ? true : router.createUrlTree([''])
      })
    );

  // if (authService.currentUser()?.rol === 'admin') return true;

  // router.navigateByUrl('');
  // return false;
};
