import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoI18nService,
  PoComponentsModule,
  PoPageModule
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule, PoPageModule],
  template: `
    <div class="po-wrapper">
      <po-header 
        [p-brand]="brand"
        [p-actions-tools]="toolbarActions"
        [p-header-user]="profile"
        (p-collapsed-menu)="isCollapsed = !isCollapsed">
      </po-header>
      
      <po-menu 
        id="saas-main-menu" 
        [p-menus]="menus"
        p-filter
        [p-collapsed]="isCollapsed"
        p-automatic-toggle>
        
        <div p-menu-header class="po-p-3 po-text-center">
          <div class="po-font-subtitle po-text-color-01">Bem-vindo,</div>
          <div class="po-font-title po-text-primary po-mb-2">{{ user.name }}</div>
          <hr class="po-hr" />
        </div>
      </po-menu>
      
      <div class="po-main-container" style="padding-top: 50px;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .po-main-container {
      padding-top: 50px;
      height: calc(100vh - 50px);
      overflow-y: auto;
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
  defaultAvatar = 'avatar-default.png';

  brand: any = {
    logo: 'logo.png',
    title: 'Sistema SaaS'
  };

  profile: any = {
    title: 'Usuário',
    actions: []
  };

  toolbarActions: Array<any> = [];

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
      subtitle: this.user.role?.name || (this.user.role === 'SUPER_ADMIN' ? 'Admin Master' : 'Administrador'),
      avatar: this.user.avatarUrl || this.defaultAvatar,
      actions: []
    };
  }

  setupProfileActions() {
    this.profile.actions = [
      { label: this.literals.profile || 'Perfil', icon: 'an an-user', action: () => { } },
      { label: this.literals.logout || 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
    ];
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu`).subscribe({
      next: (res: any) => {
        this.menus = res.menus;
        
        // No po-header, as ferramentas são dinâmicas. 
        // Vamos reservar o primeiro item para o "App Launcher" (Grid de Apps)
        const apps = res.actions.filter((a: any) => a.icon === 'an an-grid-four');
        const tools = res.actions.filter((a: any) => a.icon !== 'an an-grid-four');

        this.toolbarActions = [];

        // Se houver apps, cria o lançador (Grid)
        if (apps.length > 0) {
          this.toolbarActions.push({
            label: 'Apps',
            icon: 'an an-grid-four',
            items: apps.map((app: any) => ({
              label: app.label,
              action: () => { if (app.url) this.router.navigate([app.url]); }
            }))
          });
        }

        // Adiciona as outras ferramentas (Notificações, Configurações, etc)
        tools.forEach((tool: any) => {
          this.toolbarActions.push({
            label: tool.label,
            icon: tool.icon,
            action: () => { if (tool.url) this.router.navigate([tool.url]); }
          });
        });

        this.checkMasterMenu();
      },
      error: () => {
        console.error('Falha ao carregar menu dinâmico');
        this.menus = [
          { label: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line' },
          { label: 'Usuários', link: '/app/users', icon: 'an an-users' },
          { label: 'Filiais', link: '/app/branches', icon: 'an an-building' }
        ];
        this.checkMasterMenu();
      }
    });
  }

  checkMasterMenu() {
    if (this.user.role === 'SUPER_ADMIN') {
      const masterMenu: PoMenuItem = {
        label: 'Gestão SaaS Master',
        icon: 'an an-gear',
        subItems: [
          { label: 'Empresas (Tenants)', link: '/saas/tenants' },
          { label: 'Planos de Assinatura', link: '/saas/plans' },
          { label: 'Matriz de Recursos', link: '/saas/plans/matrix' },
          { label: 'Catálogo de Rotinas', link: '/saas/routines' },
          { label: 'Arquitetura / Metadados', link: '/saas/metadata-editor' },
        ]
      };

      const publicDataMenu: PoMenuItem = {
        label: 'Dados Públicos RFB',
        icon: 'an an-share-nodes',
        subItems: [
          { label: 'Empresas (RFB)', link: '/saas/cnpj/empresas' },
          { label: 'Estabelecimentos', link: '/saas/cnpj/estabelecimentos' },
          { label: 'CNAEs (Fiscal)', link: '/app/auxiliary/cnaes' },
          { label: 'Países (BACEN)', link: '/app/auxiliary/countries' },
          { label: 'Estados (IBGE)', link: '/app/auxiliary/states' },
          { label: 'Municípios (IBGE)', link: '/app/auxiliary/cities' },
          { label: 'CEPs (Cache)', link: '/app/auxiliary/ceps' }
        ]
      };

      if (!this.menus.find(m => m.label === masterMenu.label)) {
        this.menus.push(masterMenu);
      }
      if (!this.menus.find(m => m.label === publicDataMenu.label)) {
        this.menus.push(publicDataMenu);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
