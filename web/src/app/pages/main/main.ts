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
      <po-toolbar 
        [p-title]="toolbarTitle"
        [p-actions]="toolbarActions"
        [p-profile]="profile"
        [p-profile-actions]="profileActions"
        (p-collapsed-menu)="isCollapsed = !isCollapsed">
      </po-toolbar>
      
      <po-menu 
        id="saas-main-menu" 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed"
        [p-automatic-toggle]="true">
        
        <div p-menu-header class="po-p-3 po-text-center">
          <div class="po-font-subtitle po-text-color-01">Bem-vindo,</div>
          <div class="po-font-title po-text-primary po-mb-2">{{ user.name }}</div>
          <hr class="po-hr" />
        </div>
      </po-menu>
      
      <div class="po-main-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    po-toolbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
    }
    .po-main-container {
      padding-top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      background-color: #f5f5f5;
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
  toolbarTitle = 'Sistema SaaS';
  literals: any = {};

  user = JSON.parse(localStorage.getItem('user') || '{}');
  defaultAvatar = 'https://ui-avatars.com/api/?name=' + (this.user.name || 'User') + '&background=0054a6&color=fff';

  brand: any = {
    logo: 'https://po-ui.io/assets/po-logos/po_logo_white.svg',
    title: 'Sistema SaaS'
  };

  profile: PoToolbarProfile = {
    title: 'Usuário',
    avatar: this.defaultAvatar,
  };

  profileActions: Array<any> = [];
  toolbarActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.setupProfile();
    this.poI18n.getLiterals({ context: 'admin' }).subscribe((literals: any) => {
      this.literals = literals.menu || {};
      this.setupProfileActions();
      this.loadDynamicMenu();
    });
  }

  setupProfile() {
    this.profile = {
      title: this.user.name || 'Usuário',
      subtitle: this.user.role?.name || (this.user.level === 9 ? 'Admin Master' : 'Administrador'),
      avatar: this.user.avatarUrl || this.defaultAvatar,
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
