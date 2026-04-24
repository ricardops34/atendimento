import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const permissionsJson = localStorage.getItem('permissions');
    const permissions: string[] = permissionsJson ? JSON.parse(permissionsJson) : [];

    // 1. Se não há token, vai para o login
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Verifica permissão específica da rota (se houver)
    const requiredPermission = route.data['permission'];

    if (requiredPermission) {
      const hasPermission = permissions.includes(requiredPermission) || permissions.includes('SUPER_ADMIN');
      
      if (!hasPermission) {
        console.warn(`Acesso negado para a rota ${state.url}. Permissão requerida: ${requiredPermission}`);
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
