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
    .menu-profile-header {
      padding: 20px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 8px;
    }

    .avatar-container {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid #fff;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
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
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .profile-role {
      font-size: 11px;
      font-weight: 500;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    :host ::ng-deep .po-menu-item-link {
      border-radius: 8px;
      margin: 2px 8px;
      transition: all 0.2s ease;
    }

    :host ::ng-deep .po-menu-item-link:hover {
      background-color: #f1f5f9;
      transform: translateX(4px);
    }

    :host ::ng-deep .po-menu-item-selected {
      background-color: #0054a6 !important;
      color: #fff !important;
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
    logo: 'logo.png', // Ajustar caminho se necessário
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
        this.menus = (res.sidebar || []).map((item: any) => ({
          ...item,
          icon: item.icon || 'an an-folder'
        }));
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
