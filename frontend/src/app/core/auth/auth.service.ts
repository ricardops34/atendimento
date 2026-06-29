import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { TenantStateService } from './tenant-state.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tenantState = inject(TenantStateService);

  private readonly API_URL = environment.apiUrl || 'http://localhost:3000';

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(res => {
        if (res && res.accessToken) {
          localStorage.setItem('access_token', res.accessToken);
          this.tenantState.setSession(res);
        }
      })
    );
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/auth/me`).pipe(
      tap(res => {
        if (res) {
          this.tenantState.setSession({ user: res });
        }
      })
    );
  }

  switchEmpresa(empresaId: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/switch-empresa`, { empresaId }).pipe(
      tap(res => {
        if (res && res.accessToken) {
          localStorage.setItem('access_token', res.accessToken);
          this.tenantState.setSession(res);
        }
      })
    );
  }

  updateProfile(data: { avatar?: string; password?: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/me`, data).pipe(
      tap(res => {
        if (res) {
          this.tenantState.setSession({ user: res });
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.tenantState.clearSession();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuth = !!token && token !== 'null' && token !== 'undefined';
    console.log('AuthService.isAuthenticated -> token:', token, 'isAuth?', isAuth);
    return isAuth;
  }
}
