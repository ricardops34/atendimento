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
        
        <div *p-menu-header-template class="po-p-2">
          <div class="po-font-title">Bem-vindo,</div>
          <div class="po-font-title">
            <b>{{ user.name || 'Usuário' }}</b>
          </div>
        </div>
      </po-menu>
      
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

  isCollapsed = false;
  menus: Array<PoMenuItem> = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  userRole = this.user.level === 9 ? 'Administrador SaaS' : 'Acesso Padrão';
  profileAvatar = this.user.avatarUrl || '/avatar-default.png';

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
        // Mapeia ícones recursivamente para manter o alinhamento padrão do PO-UI
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
