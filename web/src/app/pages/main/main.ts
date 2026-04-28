import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { PoModule, PoMenuItem, PoToolbarAction, PoI18nService } from '@po-ui/ng-components';
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
  private poI18n = inject(PoI18nService);

  menus: Array<PoMenuItem> = [];
  toolbarTitle = 'Sistema SaaS';
  literals: any = {};
  
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  profile = {
    title: this.user.name || 'Usuário',
    subtitle: this.user.role === 'SUPER_ADMIN' ? 'Admin Master' : 'Administrador'
  };

  profileActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.poI18n.getLiterals({ context: 'admin' }).subscribe((literals: any) => {
      this.literals = literals.menu || {};
      this.setupProfileActions();
      this.loadMenu();
    });
  }

  setupProfileActions() {
    this.profileActions = [
      { label: this.literals.profile || 'Perfil', icon: 'po-icon-user', action: () => {} },
      { label: this.literals.logout || 'Sair', icon: 'po-icon-exit', type: 'danger', action: () => this.logout() }
    ];
  }

  loadMenu() {
    const role = this.user.role;
    const level = this.user.level || 1;
    
    // Menu Base Comum
    this.menus = [
      { label: 'Dashboard', link: '/app/dashboard', icon: 'po-icon-chart-area' }
    ];

    // Se for Nível 9 (Admin do Cliente ou Super Admin), libera as ferramentas de design
    if (level >= 9) {
      this.menus.push({ 
        label: 'Configurações', 
        icon: 'po-icon-settings',
        subItems: [
          { label: 'Editor de Telas', link: '/admin/metadata-editor', icon: 'po-icon-grid' },
          { label: 'Usuários', link: '/app/users', icon: 'po-icon-user' },
          { label: 'Perfis de Acesso', link: '/app/roles', icon: 'po-icon-ok' },
        ]
      });
    }

    // Menu Exclusivo do Super Admin (Dono do SaaS)
    if (role === 'SUPER_ADMIN') {
      this.menus.push({ 
        label: 'Gestão SaaS', 
        icon: 'po-icon-company',
        subItems: [
          { label: 'Empresas', link: '/admin/tenants', icon: 'po-icon-users' },
          { label: 'Planos', link: '/admin/plans', icon: 'po-icon-finance' },
        ]
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
