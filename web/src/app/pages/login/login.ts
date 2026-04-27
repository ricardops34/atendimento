import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoNotificationService, PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    PoModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  
  loading: boolean = false;
  userEmail: string = '';
  userPassword: string = '';
  rememberMe: boolean = false;
  
  private readonly apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000' 
    : '/api';

  // Branding com caminhos corrigidos
  productName: string = 'Acesse o sistema usando suas credenciais.';
  background: string = 'login-bg.png';
  logo: string = 'logo.png'; // Caminho corrigido (está na raiz do public)
  welcome: string = 'Boas-vindas';

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
        if (res) {
          this.productName = res.loginConfig?.title || this.productName;
          this.logo = res.logoUrl || this.logo;
          localStorage.setItem('tenantId', res.id);
        }
      },
      error: () => {
        console.warn('Usando branding padrão do sistema.');
      }
    });
  }

  loginSubmit() {
    if (!this.userEmail || !this.userPassword) {
      this.poNotification.warning('Por favor, preencha e-mail e senha.');
      return;
    }

    this.loading = true;
    
    const loginPayload = {
      email: this.userEmail,
      password: this.userPassword,
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

  forgotPassword() {
    this.poNotification.information('Funcionalidade de recuperação de senha em desenvolvimento.');
  }
}
