import { computed, effect, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanMatchFn  = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  let response: boolean = true;

  //Esto nos permite saber la ruta a la que se queria dirigir
  // const url = state.url;
  // localStorage.setItem('url', url);

  authService.checkAuthStatus().subscribe(() => {
    if (authService.authStatus() === AuthStatus.authenticated) {
      response = true;
    }

    response = false;
    router.navigateByUrl('/auth/login');
  });

  return response;
};
