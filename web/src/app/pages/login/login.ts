import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoPageLogin } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PoModule, PoPageLoginModule],
  template: `
    <po-page-login
      [p-product-name]="customConfig.title"
      [p-logo]="customConfig.logo"
      [p-secondary-logo]="customConfig.secondaryLogo"
      (p-login-submit)="loginSubmit($event)"
    >
    </po-page-login>
  `
})
export class LoginComponent implements OnInit {
  // Configuração padrão do seu SaaS (Plano Básico)
  customConfig: any = {
    title: 'Seu SaaS - Login',
    background: 'login-bg.png',
    logo: 'logo.png',
    secondaryLogo: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadBranding();
  }

  loadBranding() {
    // Exemplo: 'cliente1.saas.bjsoft.com.br' -> ['cliente1', 'saas', 'bjsoft', 'com', 'br']
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    // Pega a primeira parte se houver mais de 2 partes (ex: cliente1.saas...)
    // Se for apenas localhost, usa 'admin' como padrão para testes
    const domain = parts.length > 2 ? parts[0] : 'admin';
    
    // Determina a URL da API (Local vs Nuvem)
    const apiUrl = hostname.includes('localhost') ? 'http://localhost:3000' : '/api';
    
    this.http.get(`${apiUrl}/public/branding/${domain}`).subscribe({
      next: (res: any) => {
        if (res.loginConfig) {
          this.customConfig = {
            title: res.loginConfig.title || res.name,
            background: res.loginConfig.background || this.customConfig.background,
            logo: res.logoUrl || this.customConfig.logo,
            secondaryLogo: res.loginConfig.secondaryLogo || ''
          };
        }
        // Salva o ID do tenant detectado para as próximas requisições
        localStorage.setItem('tenantId', res.id);
      },
      error: () => {
        console.warn('Usando branding padrão do sistema.');
      }
    });
  }

  loginSubmit(formData: PoPageLogin) {
    console.log('Login solicitado:', formData);
    // Simulação de login bem-sucedido
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('permissions', JSON.stringify(['SUPER_ADMIN']));
    this.router.navigate(['/admin/dashboard']);
  }
}
