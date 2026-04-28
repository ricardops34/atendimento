import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoNotificationService, PoModule, PoI18nService, PoSelectOption } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private poNotification = inject(PoNotificationService);
  private poI18n = inject(PoI18nService);

  loading: boolean = false;
  userEmail: string = '';
  userPassword: string = '';
  rememberMe: boolean = false;

  // Iniciamos com chaves vazias para garantir que o sistema busque do JSON
  literals: any = {
    user: '',
    userPlaceholder: '',
    password: '',
    passwordPlaceholder: '',
    enter: '',
    forgotPassword: '',
    rememberMe: ''
  };
  selectedLanguage: string = 'pt-br';

  languageOptions: Array<PoSelectOption> = [
    { label: 'Português (BR)', value: 'pt-br' },
    { label: 'English (US)', value: 'en-us' },
    { label: 'Español (ES)', value: 'es-es' }
  ];

  productName: string = 'BJ Software';
  background: string = 'login-bg.png';
  logo: string = 'logo.png';
  welcome: string = '';

  ngOnInit() {
    console.log('LoginComponent: ngOnInit iniciado');
    this.selectedLanguage = this.poI18n.getLanguage();
    console.log('Idioma detectado:', this.selectedLanguage);
    this.loadLiterals(this.selectedLanguage);
    this.loadBranding();
  }

  loadLiterals(lang?: string) {
    const targetLang = lang || this.poI18n.getLanguage();
    console.log(`Tentando carregar literais para o idioma: ${targetLang}`);
    
    this.poI18n.getLiterals({ context: 'login', language: targetLang }).subscribe({
      next: (literals) => {
        console.log('Literais carregadas com sucesso:', literals);
        this.literals = { ...literals };
        this.welcome = this.literals.welcome || '';
      },
      error: (err) => {
        console.error('ERRO CRÍTICO ao carregar literais:', err);
        // Se houver erro, podemos carregar um padrão mínimo para não travar a tela
        if (targetLang === 'pt-br') {
          this.literals = { user: 'Usuário', password: 'Senha', enter: 'Entrar' };
        }
      }
    });
  }

  changeLanguage(lang: string) {
    this.poI18n.setLanguage(lang);
    this.selectedLanguage = lang;
    this.loadLiterals(lang);
  }

  loadBranding() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    let domain = 'admin';
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'sistema') {
      domain = parts[0];
    }

    this.http.get(`${this.coreService.apiUrl}/public/branding/${domain}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.productName = res.loginConfig?.title || this.productName;
          this.logo = res.logoUrl || this.logo;
          if (res.id) localStorage.setItem('tenantId', res.id);
        }
      },
      error: () => {
        console.warn('Branding não carregado.');
      }
    });
  }

  loginSubmit() {
    if (!this.userEmail || !this.userPassword) {
      this.poNotification.warning(this.literals.fillFields || 'Preencha os campos');
      return;
    }

    this.loading = true;
    const loginPayload: any = {
      email: this.userEmail,
      password: this.userPassword
    };

    const tenantId = localStorage.getItem('tenantId');
    if (tenantId) loginPayload.tenantId = tenantId;

    this.http.post(`${this.coreService.apiUrl}/auth/login`, loginPayload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('permissions', JSON.stringify(res.permissions || []));

        this.poNotification.success(`Bem-vindo, ${res.user.name}!`);

        if (res.user.role === 'SUPER_ADMIN' || res.user.role === 'SAAS_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/app/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err.error?.message || this.literals.loginError || 'Erro de login';
        this.poNotification.error(errorMsg);
      }
    });
  }

  forgotPassword() {
    this.poNotification.information('Recuperação de senha em desenvolvimento.');
  }
}
