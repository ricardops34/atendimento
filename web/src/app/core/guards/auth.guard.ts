import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // 1. Verifica se está logado
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Verifica permissão para a rota /admin
  if (state.url.startsWith('/admin')) {
    if (user.role !== 'SUPER_ADMIN') {
      router.navigate(['/app/dashboard']); // Redireciona usuários comuns
      return false;
    }
  }

  return true;
};
