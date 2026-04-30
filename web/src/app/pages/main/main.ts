import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoI18nService,
  PoComponentsModule,
  PoPageModule,
  PoToolbarProfile
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule, PoPageModule],
  template: `
    <div class="po-wrapper">
      <!-- Toolbar Premium -->
      <po-toolbar 
        [p-title]="toolbarTitle"
        [p-profile]="profile"
        [p-profile-actions]="profileActions"
        [p-actions]="toolbarActions">
      </po-toolbar>

      <!-- Menu com Filtro e Identificação -->
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
        
        <div class="menu-header-custom">
          <div class="user-info">
            <span class="user-name">{{ user.name || 'Usuário' }}</span>
            <span class="user-role">{{ profile.subtitle }}</span>
          </div>
        </div>
      </po-menu>

      <!-- Container de Conteúdo -->
      <po-page-default [p-title]="pageTitle">
        <router-outlet></router-outlet>
      </po-page-default>
    </div>
  `,
  styles: [`
    .menu-header-custom {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      background-color: #fafafa;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }
    .user-role {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    :host ::ng-deep .po-menu-header {
      display: none; /* Remove header padrão do menu para usar o custom */
    }
  `]
})
export class MainComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private poI18n = inject(PoI18nService);

  menus: Array<PoMenuItem> = [];
  isCollapsed = false;
  toolbarTitle = 'BJSOFT SAAS';
  pageTitle = 'Dashboard';
  literals: any = {};
  user: any = {};
  
  profile: PoToolbarProfile = { title: '', subtitle: '', avatar: '' };
  profileActions: Array<any> = [];
  toolbarActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.loadUserData();
    this.setupProfileActions();
    this.loadDynamicMenu();

    this.poI18n.getLiterals({ context: 'admin' }).subscribe({
      next: (literals: any) => {
        this.literals = literals.menu || {};
        this.setupProfileActions();
      },
      error: () => console.warn('I18n: Usando fallbacks.')
    });
  }

  loadUserData() {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : {};
    const initials = (this.user.name || 'U').substring(0, 1).toUpperCase();
    const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=7b1fa2&color=fff`;

    this.profile = {
      title: this.user.name || 'Usuário',
      subtitle: this.user.level === 9 ? 'Administrador Master' : (this.user.role?.name || 'Acesso Limitado'),
      avatar: this.user.avatarUrl || defaultAvatar,
    };
  }

  setupProfileActions() {
    this.profileActions = [
      { label: this.literals.profile || 'Perfil', icon: 'an an-user', action: () => { } },
      { label: this.literals.logout || 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
    ];
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
        this.menus = res.sidebar || [];

        if (res.toolbar) {
          this.toolbarActions = res.toolbar.map((item: any) => ({
            label: item.label,
            icon: item.icon,
            action: (action: PoToolbarAction) => {
              if (item.link) this.router.navigate([item.link]);
            }
          }));
        }
      },
      error: () => {
        console.error('Falha ao carregar menus dinâmicos');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
