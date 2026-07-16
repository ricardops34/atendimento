import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

// O token de sessão vai em cookie httpOnly — o navegador anexa ele sozinho
// em toda requisição pro backend, desde que a requisição vá com
// withCredentials. Não existe mais header Authorization manual aqui.
//
// withCredentials só pode ir nas chamadas pro NOSSO backend — em APIs de
// terceiros (BrasilAPI, ViaCEP) isso quebra o CORS, porque APIs públicas
// gratuitas normalmente respondem com Access-Control-Allow-Origin: "*", e o
// navegador rejeita essa combinação quando a requisição pede credenciais.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isOwnApi = req.url.startsWith(environment.apiUrl);
  const cloned = isOwnApi ? req.clone({ withCredentials: true }) : req;

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
