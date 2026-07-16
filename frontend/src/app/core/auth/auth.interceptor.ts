import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// O token de sessão vai em cookie httpOnly — o navegador anexa ele sozinho
// em toda requisição pro backend, desde que a requisição vá com
// withCredentials. Não existe mais header Authorization manual aqui.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const cloned = req.clone({ withCredentials: true });

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearLocalSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
