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
      [p-background]="customConfig.background"
      [p-title]="customConfig.title"
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
    background: 'https://po-ui.io/assets/graphics/background-02.png',
    logo: 'assets/logo.png',
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
    // Detecta o domínio atual (ex: cliente-a.localhost)
    const domain = window.location.hostname;
    
    this.http.get(`http://localhost:3000/public/branding/${domain}`).subscribe({
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
    this.router.navigate(['/dashboard']);
  }
}
