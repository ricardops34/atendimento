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
      <!-- Toolbar Moderna -->
      <po-toolbar 
        [p-title]="toolbarTitle"
        [p-profile]="profile"
        [p-profile-actions]="profileActions"
        [p-actions]="toolbarActions">
      </po-toolbar>

      <!-- Sidebar Area -->
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
        
        <ng-template p-menu-header-template>
          <div class="menu-user-section" *ngIf="!isCollapsed">
            <po-avatar [p-src]="profile.avatar || ''" p-size="md"></po-avatar>
            <div class="user-details">
              <span class="user-name">{{ user.name || 'Usuário' }}</span>
              <span class="user-level">{{ profile.subtitle }}</span>
            </div>
          </div>
        </ng-template>
      </po-menu>

      <!-- Área de Conteúdo -->
      <po-page-default [p-title]="pageTitle">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </po-page-default>
    </div>
  `,
  styles: [`
    .menu-user-section {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      margin-bottom: 8px;
    }
    .user-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: #212529;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .user-level {
      font-size: 11px;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .content-wrapper {
      margin-top: -20px; /* Ajuste para encostar no header da página */
    }
    :host ::ng-deep .po-menu {
      background-color: #ffffff;
    }
    :host ::ng-deep .po-menu-header {
       display: none; /* Esconde o header padrão do PO-UI */
    }
  `]
})
export class MainComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private poI18n = inject(PoI18nService);

  menus: Array<PoMenuItem> = [];
  isCollapsed = true; // Inicia recolhido conforme solicitado
  toolbarTitle = 'BJSOFT SAAS';
  pageTitle = '';
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
