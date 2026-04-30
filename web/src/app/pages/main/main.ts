import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
  PoComponentsModule
} from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule],
  template: `
    <div class="po-wrapper">
      <po-toolbar 
        p-title="BJSOFT SAAS"
        [p-profile]="profile"
        [p-profile-actions]="profileActions"
        [p-actions]="toolbarActions">
      </po-toolbar>

      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
        <ng-template p-menu-header-template>
          <!-- Perfil no Menu -->
          <div class="menu-profile-header" *ngIf="!isCollapsed">
            <po-avatar [p-src]="profile.avatar || ''" p-size="md"></po-avatar>
            <div class="menu-profile-info">
              <span class="profile-name">{{ profile.title }}</span>
              <span class="profile-role">{{ profile.subtitle }}</span>
            </div>
          </div>
        </ng-template>
      </po-menu>

      <!-- O PO-UI recomenda que o outlet fique solto no wrapper -->
      <!-- Cada página filha (ex: Dashboard) deve ter seu próprio po-page-default -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .menu-profile-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--color-neutral-light-05);
      border-bottom: 1px solid var(--color-neutral-light-20);
    }
    .menu-profile-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .profile-name {
      font-family: var(--font-family-theme);
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-bold);
      color: var(--color-neutral-dark-90);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .profile-role {
      font-family: var(--font-family-theme);
      font-size: 11px;
      color: var(--color-neutral-dark-70);
      text-transform: uppercase;
    }
  `]
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private coreService = inject(CoreService);

  isCollapsed = true; // Força o recolhimento inicial
  menus: Array<PoMenuItem> = [];
  profile: PoToolbarProfile = { title: 'Usuário', subtitle: 'Acesso', avatar: '' };
  profileActions: Array<PoToolbarAction> = [];
  toolbarActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.setupProfile();
    this.loadMenus();
  }

  private setupProfile() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
    const initials = (user.name || 'U').substring(0, 1).toUpperCase();
    const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=7b1fa2&color=fff`;

    this.profile = {
      title: user.name || 'Usuário Não Identificado',
      subtitle: user.level === 9 ? 'Administrador Master' : 'Acesso Limitado',
      avatar: user.avatarUrl || defaultAvatar
    };

    this.profileActions = [
      { label: 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
    ];
  }

  private loadMenus() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
        // REGRA DE OURO DO PO-UI: Se um menu de primeiro nível não tiver ícone,
        // o componente INTEIRO bloqueia o modo colapsado.
        this.menus = (res.sidebar || []).map((menuItem: any) => ({
          ...menuItem,
          icon: menuItem.icon || 'an an-folder' // Fallback obrigatório
        }));

        if (res.toolbar) {
          this.toolbarActions = res.toolbar.map((item: any) => ({
            label: item.label,
            icon: item.icon,
            action: () => {
              if (item.link) this.router.navigate([item.link]);
            }
          }));
        }
      },
      error: () => console.error('Erro ao carregar menus')
    });
  }

  private logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
