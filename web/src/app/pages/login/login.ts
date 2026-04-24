import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoPageLoginModule, PoPageLogin } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PoPageLoginModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  
  loading: boolean = false;
  
  // URL base dinâmica: Localhost (Dev) vs /api (Produção/VPN)
  private readonly apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000' 
    : '/api';

  // Propriedades individuais para o template
  productName: string = 'Meu SaaS';
  background: string = '/login-bg.png';
  logo: string = '/assets/logo.png';
  secondaryLogo: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.loadBranding();
  }

  loadBranding() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    const domain = parts.length > 2 ? parts[0] : 'admin';
    
    this.http.get(`${this.apiUrl}/public/branding/${domain}`).subscribe({
      next: (res: any) => {
        if (res && res.loginConfig) {
          this.productName = res.loginConfig.title || res.name;
          this.background = res.loginConfig.background || this.background;
          this.logo = res.logoUrl || this.logo;
          this.secondaryLogo = res.loginConfig.secondaryLogo || '';
        }
        if (res && res.id) {
          localStorage.setItem('tenantId', res.id);
        }
      },
      error: () => {
        console.warn('Usando branding padrão do sistema.');
      }
    });
  }

  loginSubmit(formData: PoPageLogin) {
    this.loading = true;
    
    const loginPayload = {
      email: formData.login,
      password: formData.password,
      tenantId: localStorage.getItem('tenantId')
    };

    this.http.post(`${this.apiUrl}/auth/login`, loginPayload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('permissions', JSON.stringify(res.permissions || []));
        
        this.poNotification.success(`Bem-vindo, ${res.user.name}!`);
        
        if (res.user.role === 'SUPER_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/app/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.poNotification.error(err.error?.message || 'Erro ao realizar login. Verifique suas credenciais.');
      }
    });
  }
}
