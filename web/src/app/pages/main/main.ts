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
  templateUrl: './main.html'
})
export class MainComponent implements OnInit {
  private coreService = inject(CoreService);
  private router = inject(Router);
  private http = inject(HttpClient);

  readonly items: Array<PoMenuItem> = [];

  isCollapsed = false;
  menus: Array<PoMenuItem> = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');

  userRole = this.user.level === 9 ? 'Administrador SaaS' : 'Acesso Padrão';
  profileAvatar = this.user.avatarUrl || '/avatar-default.png';
  brandLogo = '/logo.png';

  brand: PoHeaderBrand = {
    title: 'BJSOFT SAAS',
    logo: 'logo.png',
  };

  headerUser: PoHeaderUser = {
    avatar: this.profileAvatar,
    customerBrand: this.brandLogo,
    items: [
      { label: 'Perfil', action: () => { } },
      { label: 'Sair', action: () => this.logout() }
    ]
  };

  actions: Array<PoHeaderActionTool> = [
    { icon: 'an an-gear', tooltip: 'Configurações', action: () => { } },
    { icon: 'an an-bell', tooltip: 'Notificações', badge: 3, action: () => { } }
  ];

  ngOnInit() {
    this.loadDynamicMenu();
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
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
