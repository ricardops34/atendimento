import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from '../../../core/auth/auth.service';
import { PoPageLoginCustomField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, switchMap, of, catchError } from 'rxjs';

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
      switchMap(email =>
        this.EMAIL_RE.test(email)
          ? this.http.post<{ label: string; value: number }[]>(`${this.API_URL}/auth/empresa-options`, { email }).pipe(
              catchError(() => of([]))
            )
          : of([])
      )
    ).subscribe((options: any) => {
      this.customField = { ...this.customField, options };
    });
  }

  onEmailChange(email: any) {
    this.emailChange$.next(typeof email === 'string' ? email : '');
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
