import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  console.log('authGuard:', route.url.join('/'), 'isAuth?', isAuth);

  if (isAuth) {
    return true;
  }

  console.log('authGuard: Redirecionando para /login');
  return router.createUrlTree(['/login']);
};
