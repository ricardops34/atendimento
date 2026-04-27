import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoNotificationService, PoModule, PoI18nService } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { forkJoin } from 'rxjs';

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
  
  // Literais que virão do arquivo de tradução
  literals: any = {};
  
  productName: string = ''; // Virá do branding ou i18n
  background: string = 'login-bg.png';
  logo: string = 'logo.png';
  welcome: string = '';

  ngOnInit() {
    this.loadLiterals();
    this.loadBranding();
  }

  loadLiterals() {
    // Busca as traduções do contexto 'login'
    this.poI18n.getLiterals({ context: 'login' }).subscribe(literals => {
      this.literals = literals;
      this.welcome = this.literals.welcome;
    });
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
          // Se houver branding customizado, usa ele, senão usa o padrão do i18n
          this.productName = res.loginConfig?.title || this.literals.description;
          this.logo = res.logoUrl || this.logo;
          if (res.id) localStorage.setItem('tenantId', res.id);
        }
      },
      error: () => {
        this.productName = this.literals.description;
        console.warn('Tenant não encontrado pela URL. Usando configurações padrão.');
      }
    });
  }

  loginSubmit() {
    if (!this.userEmail || !this.userPassword) {
      this.poNotification.warning(this.literals.fillFields);
      return;
    }

    this.loading = true;
    
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
        
        if (res.user.role === 'SUPER_ADMIN' || res.user.role === 'SAAS_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/app/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err.error?.message || this.literals.loginError;
        this.poNotification.error(errorMsg);
      }
    });
  }

  forgotPassword() {
    this.poNotification.information('Recuperação de senha em desenvolvimento.');
  }
}
