import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from '../../../core/auth/auth.service';
import { PoPageLoginCustomField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, switchMap, of, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoTemplatesModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private readonly API_URL = environment.apiUrl || 'http://localhost:3000';

  private emailChange$ = new Subject<string>();
  private readonly EMAIL_RE = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  customField: PoPageLoginCustomField = {
    property: 'empresaId',
    placeholder: 'Selecione a Empresa',
    options: []
  };

  constructor() {
    this.emailChange$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      tap(email => console.log('[Login] Email após debounce:', email)),
      switchMap(email => {
        if (!this.EMAIL_RE.test(email)) {
          console.log('[Login] Falhou no Regex:', email);
          return of([]);
        }
        console.log('[Login] Buscando empresas para:', email);
        return this.http.post<{ label: string; value: number }[]>(`${this.API_URL}/auth/empresa-options`, { email }).pipe(
          tap(res => console.log('[Login] Resposta da API:', res)),
          catchError((err) => {
            console.error('[Login] Erro na API:', err);
            return of([]);
          })
        );
      })
    ).subscribe((options: any) => {
      console.log('[Login] Atualizando customField com:', options);
      this.customField = { ...this.customField, options };
      this.cdr.detectChanges();
    });
  }

  onEmailChange(event: any) {
    let email = typeof event === 'string' ? event : (event?.login || '');
    email = email.trim();
    console.log('[Login] onEmailChange disparado! Valor extraído:', email);
    this.emailChange$.next(email);
  }

  loginSubmit(formData: any) {
    this.authService.login({
      email: formData.login,
      password: formData.password,
      empresaId: formData.customField || undefined
    }).subscribe({
      next: (res) => {
        if (res?.requiresEmpresaSelection) {
          this.poNotification.warning('Selecione a empresa e clique em Entrar novamente.');
          return;
        }
        this.poNotification.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.poNotification.error(err.error?.message || 'Falha na autenticação');
      }
    });
  }
}
