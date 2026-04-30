import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoHeaderActionTool,
  PoHeaderBrand,
  PoHeaderUser,
  PoMenuItem,
  PoComponentsModule
} from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule],
  template: `
    <!-- HEADER PREMIUM DO PO-UI -->
    <po-header
      [p-brand]="brand"
      [p-header-user]="headerUser"
      [p-actions-tools]="actions">
    </po-header>

    <div class="po-wrapper">
      <!-- O menu lateral com template nativo para o avatar -->
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
        
        <ng-template p-menu-header-template>
          <div class="menu-profile-header" *ngIf="!isCollapsed">
            <po-avatar [p-src]="menuUser.avatar" p-size="md"></po-avatar>
            <div class="menu-profile-info">
              <span class="profile-name">{{ menuUser.name }}</span>
              <span class="profile-role">{{ menuUser.role }}</span>
            </div>
          </div>
        </ng-template>

      </po-menu>

      <!-- RENDERIZAÇÃO DAS PÁGINAS -->
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
  
  isCollapsed = true;
  menus: Array<PoMenuItem> = [];

  brand: PoHeaderBrand = { title: 'BJSOFT SAAS' };
  headerUser: PoHeaderUser = { avatar: '', customerBrand: '', items: [] };
  actions: Array<PoHeaderActionTool> = [];
  
  menuUser = { name: '', role: '', avatar: '' };

  ngOnInit() {
    this.setupHeader();
    this.loadMenus();
  }

  private setupHeader() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
    // Configuração para o menu lateral (novo)
    this.menuUser = {
      name: user.name || 'Usuário Não Identificado',
      role: user.level === 9 ? 'Administrador SAAS' : 'Acesso Padrão',
      avatar: user.avatarUrl || 'avatar-default.png'
    };

    // 1. ÁREA DO USUÁRIO (Lado direito: Avatar + Menu Dropdown)
    this.headerUser = {
      avatar: user.avatarUrl || 'avatar-default.png',
      customerBrand: '', // Obrigatório pela interface
      items: [
        { label: user.name || 'Meu Perfil', action: () => {} },
        { label: 'Sair do Sistema', action: () => this.logout() }
      ]
    };

    // 2. AÇÕES E NOTIFICAÇÕES (Ícones soltos no Header)
    this.actions = [
      { 
        icon: 'an an-gear', 
        tooltip: 'Configurações', 
        action: () => {} 
      },
      { 
        icon: 'an an-squares-four', 
        tooltip: 'Aplicativos', 
        action: () => {} 
      },
      { 
        icon: 'an an-chat-circle', 
        tooltip: 'Mensagens', 
        badge: 5, 
        action: () => {} 
      }
    ];
  }

  private loadMenus() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
        // Regra do Menu Colapsado: Todos precisam ter ícone
        this.menus = (res.sidebar || []).map((menuItem: any) => ({
          ...menuItem,
          icon: menuItem.icon || 'an an-folder'
        }));
      },
      error: () => console.error('Erro ao carregar menus')
    });
  }

  private logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
