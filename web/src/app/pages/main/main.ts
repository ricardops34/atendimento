import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoMenuItem,
  PoComponentsModule,
  PoPageModule,
  PoHeaderModule,
  PoHeaderBrand,
  PoHeaderUser,
  PoHeaderActionTool
} from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule, PoPageModule, PoHeaderModule],
  template: `
    <po-header
      [p-brand]="brand"
      [p-header-user]="headerUser"
      [p-actions-tools]="actions"
      [p-menus]="menus">
    </po-header>

    <div class="po-wrapper">
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
        
        <div *p-menu-header-template class="menu-profile-header">
          <div class="avatar-container">
            <img [src]="profileAvatar" class="profile-avatar-img" alt="Avatar">
          </div>
          <div class="menu-profile-info">
            <span class="profile-name">{{ user.name || 'Usuário' }}</span>
            <span class="profile-role">{{ userRole }}</span>
          </div>
        </div>
      </po-menu>
      
      <div class="po-main-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    /* Cabeçalho do Perfil no Menu */
    .menu-profile-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 4px;
    }

    .avatar-container {
      width: 40px;
      height: 40px;
      border-radius: 50%; /* Mudado para redondo para um look mais padrão e limpo */
      overflow: hidden;
      border: 2px solid #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .profile-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .menu-profile-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .profile-name {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .profile-role {
      font-size: 10px;
      font-weight: 500;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Ajustes Finos nos Itens do Menu */
    :host ::ng-deep .po-menu-item-link {
      height: 40px !important;
      margin: 2px 8px !important;
      border-radius: 6px !important;
      color: #475569 !important; /* Cor cinza slate para itens normais */
      border: none !important; /* Remove bordas estranhas */
    }

    /* Item Selecionado - Azul Padrão PO-UI */
    :host ::ng-deep .po-menu-item-selected .po-menu-item-link {
      background-color: #0054a6 !important;
      color: #ffffff !important;
    }

    :host ::ng-deep .po-menu-item-selected .po-menu-item-link .po-icon {
      color: #ffffff !important;
    }

    /* Ajuste de Subitens (Nível 2) */
    :host ::ng-deep .po-menu-subitems .po-menu-item-link {
      padding-left: 12px !important; /* Reduz o recuo excessivo */
      font-size: 13px !important;
    }

    /* Hover Suave */
    :host ::ng-deep .po-menu-item-link:hover {
      background-color: #f1f5f9 !important;
      color: #0f172a !important;
    }

    /* Cor dos ícones */
    :host ::ng-deep .po-icon {
      color: #64748b;
    }
  `]
})
export class MainComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);

  isCollapsed = false;
  menus: Array<PoMenuItem> = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  userRole = this.user.level === 9 ? 'Administrador SaaS' : 'Acesso Padrão';
  profileAvatar = this.user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (this.user.name || 'User') + '&background=0054a6&color=fff';

  brand: PoHeaderBrand = { 
    title: 'BJSOFT SAAS',
    logo: 'logo.png',
  };

  headerUser: PoHeaderUser = {
    avatar: this.profileAvatar,
    customerBrand: '',
    items: [
      { label: 'Perfil', action: () => { } },
      { label: 'Sair', action: () => this.logout() }
    ]
  };

  actions: Array<PoHeaderActionTool> = [
    { icon: 'an an-gear', tooltip: 'Configurações', action: () => {} },
    { icon: 'an an-bell', tooltip: 'Notificações', badge: 3, action: () => {} }
  ];

  ngOnInit() {
    this.loadDynamicMenu();
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
        // Função recursiva para garantir ícones em todos os níveis
        const mapIcons = (items: Array<any>): Array<PoMenuItem> => {
          return (items || []).map(item => ({
            ...item,
            icon: item.icon || 'an an-folder',
            subItems: item.subItems ? mapIcons(item.subItems) : undefined
          }));
        };

        this.menus = mapIcons(res.sidebar || []);
      },
      error: () => {
        console.error('Erro ao carregar menus');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
