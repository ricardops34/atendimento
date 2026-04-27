import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { PoModule, PoMenuItem, PoToolbarAction } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  template: `
    <div class="po-wrapper">
      <po-toolbar 
        id="saas-main-toolbar" 
        [p-title]="toolbarTitle"
        [p-profile]="profile"
        [p-profile-actions]="profileActions">
      </po-toolbar>
      
      <po-menu id="saas-main-menu" [p-menus]="menus"></po-menu>
      
      <div class="po-main-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);

  menus: Array<PoMenuItem> = [];
  toolbarTitle = 'Sistema SaaS - Gestão Administrativa';
  
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  profile = {
    title: this.user.name || 'Usuário',
    subtitle: this.user.role === 'SUPER_ADMIN' ? 'Administrador Master' : 'Colaborador'
  };

  profileActions: Array<PoToolbarAction> = [
    { label: 'Meu Perfil', icon: 'po-icon-user', action: () => {} },
    { label: 'Sair do Sistema', icon: 'po-icon-exit', type: 'danger', action: () => this.logout() }
  ];

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    const role = this.user.role;
    
    if (role === 'SUPER_ADMIN') {
      this.menus = [
        { label: 'Painel de Controle', link: '/admin/dashboard', icon: 'po-icon-chart-area' },
        { 
          label: 'Gestão de Clientes', 
          icon: 'po-icon-company',
          subItems: [
            { label: 'Empresas (Tenants)', link: '/admin/tenants', icon: 'po-icon-users' },
            { label: 'Planos e Preços', link: '/admin/plans', icon: 'po-icon-finance' },
          ]
        },
        { 
          label: 'Segurança e Acesso', 
          icon: 'po-icon-security',
          subItems: [
            { label: 'Usuários do Sistema', link: '/app/users', icon: 'po-icon-user' },
            { label: 'Níveis de Permissão', link: '/app/roles', icon: 'po-icon-ok' },
          ]
        }
      ];
    } else {
      this.http.get(`${this.coreService.apiUrl}/menu`).subscribe({
        next: (res: any) => {
          this.menus = res;
        },
        error: () => {
          this.menus = [
            { label: 'Início', link: '/app/dashboard', icon: 'po-icon-chart-area' }
          ];
        }
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
