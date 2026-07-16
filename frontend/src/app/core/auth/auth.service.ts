import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { EmpresaStateService } from './empresa-state.service';
import { environment } from '../../../environments/environment';

// O token de sessão vai só no cookie httpOnly setado pelo backend — o
// JavaScript nunca tem acesso a ele (proteção contra roubo via XSS).
// Esta chave de localStorage guarda só uma "dica" não sensível de UI,
// pra rotas guardadas no frontend não precisarem esperar uma chamada de
// rede antes de decidir se mostram a tela ou redirecionam pro login. Quem
// garante a autorização de verdade é sempre o backend, em cada requisição.
const LOGGED_IN_HINT = 'logged_in_hint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private empresaState = inject(EmpresaStateService);

  private readonly API_URL = environment.apiUrl || 'http://localhost:3000';

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(res => {
        if (res && res.user) {
          localStorage.setItem(LOGGED_IN_HINT, '1');
          this.empresaState.setSession(res);
        }
      })
    );
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/auth/me`).pipe(
      tap(res => {
        if (res) {
          localStorage.setItem(LOGGED_IN_HINT, '1');
          this.empresaState.setSession({ user: res });
        }
      })
    );
  }

  switchEmpresa(empresaId: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/switch-empresa`, { empresaId }).pipe(
      tap(res => {
        if (res && res.user) {
          localStorage.setItem(LOGGED_IN_HINT, '1');
          this.empresaState.setSession(res);
        }
      })
    );
  }

  updateProfile(data: { avatar?: string; password?: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/me`, data).pipe(
      tap(res => {
        if (res) {
          this.empresaState.setSession({ user: res });
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/logout`, {}).pipe(
      tap(() => this.clearLocalSession())
    );
  }

  // Limpeza só do estado local (sem chamar o backend) — usada quando uma
  // requisição já voltou 401, ou seja, o cookie já não é mais válido.
  clearLocalSession() {
    localStorage.removeItem(LOGGED_IN_HINT);
    this.empresaState.clearSession();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(LOGGED_IN_HINT) === '1';
  }
}
