import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoNotificationService, PoModule } from '@po-ui/ng-components';
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

  loading: boolean = false;
  userEmail: string = '';
  userPassword: string = '';
  rememberMe: boolean = false;
  
  productName: string = 'Acesse o sistema usando suas credenciais.';
  background: string = 'login-bg.png';
  logo: string = 'logo.png';
  welcome: string = 'Boas-vindas';

  ngOnInit() {
    this.loadBranding();
  }

  loadBranding() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // Se for localhost ou sistema.bjsoft, tenta buscar o 'admin' por padrão se não houver subdomínio claro
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
        console.warn('Tenant não encontrado pela URL. Usando configurações padrão.');
      }
    });
  }

  loginSubmit() {
    if (!this.userEmail || !this.userPassword) {
      this.poNotification.warning('Por favor, preencha e-mail e senha.');
      return;
    }

    this.loading = true;
    
    // Prepara o payload. Se o tenantId não existir no localStorage, o backend deve tratar o login global.
    const loginPayload: any = {
      email: this.userEmail,
      password: this.userPassword
    };

    const tenantId = localStorage.getItem('tenantId');
    if (tenantId) {
      loginPayload.tenantId = tenantId;
    }

    this.http.post(`${this.coreService.apiUrl}/auth/login`, loginPayload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('permissions', JSON.stringify(res.permissions || []));
        
        this.poNotification.success(`Bem-vindo, ${res.user.name}!`);
        
        // Redirecionamento baseado na Role
        if (res.user.role === 'SUPER_ADMIN' || res.user.role === 'SAAS_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/app/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err.error?.message || 'Erro ao realizar login. Verifique suas credenciais.';
        this.poNotification.error(errorMsg);
      }
    });
  }

  forgotPassword() {
    this.poNotification.information('Funcionalidade de recuperação de senha em desenvolvimento.');
  }
}
