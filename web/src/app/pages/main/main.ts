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
    subtitle: this.user.role === 'SUPER_ADMIN' ? 'Admin Master' : 'Colaborador'
  };

  profileActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.poI18n.getLiterals({ context: 'admin' }).subscribe(literals => {
      this.literals = literals.menu;
      this.setupProfileActions();
      this.loadMenu();
    });
  }

  setupProfileActions() {
    this.profileActions = [
      { label: this.literals.profile, icon: 'po-icon-user', action: () => {} },
      { label: this.literals.logout, icon: 'po-icon-exit', type: 'danger', action: () => this.logout() }
    ];
  }

  loadMenu() {
    const role = this.user.role;
    
    if (role === 'SUPER_ADMIN') {
      this.menus = [
        { label: this.literals.dashboard, link: '/admin/dashboard', icon: 'po-icon-chart-area' },
        { 
          label: 'Módulos Dinâmicos', 
          icon: 'po-icon-document-filled',
          subItems: [
            { label: 'Veículos (Dinâmico)', link: '/app/dynamic/veiculos', icon: 'po-icon-steering-wheel' },
          ]
        },
        { 
          label: this.literals.business, 
          icon: 'po-icon-company',
          subItems: [
            { label: this.literals.tenants, link: '/admin/tenants', icon: 'po-icon-users' },
            { label: this.literals.plans, link: '/admin/plans', icon: 'po-icon-finance' },
          ]
        },
        { 
          label: this.literals.security, 
          icon: 'po-icon-security',
          subItems: [
            { label: this.literals.users, link: '/app/users', icon: 'po-icon-user' },
            { label: this.literals.roles, link: '/app/roles', icon: 'po-icon-ok' },
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
            { label: 'Dashboard', link: '/app/dashboard', icon: 'po-icon-chart-area' }
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
