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
      <po-toolbar 
        id="saas-main-toolbar" 
        [p-title]="toolbarTitle"
        [p-profile]="profile"
        [p-profile-actions]="profileActions">
      </po-toolbar>
      
      <po-menu 
        id="saas-main-menu" 
        [p-menus]="menus"
        [p-filter]="true"
        [p-automatic-toggle]="true">
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
  private poI18n = inject(PoI18nService);

  menus: Array<PoMenuItem> = [];
  toolbarTitle = 'Sistema SaaS';
  literals: any = {};
  
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  profile = {
    title: this.user.name || 'Usuário',
    avatar: '',
    subtitle: this.user.role === 'SUPER_ADMIN' ? 'Admin Master' : 'Administrador'
  };

  profileActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.poI18n.getLiterals({ context: 'admin' }).subscribe((literals: any) => {
      this.literals = literals.menu || {};
      this.setupProfileActions();
      this.loadDynamicMenu();
    });
  }

  setupProfileActions() {
    this.profileActions = [
      { label: this.literals.profile || 'Perfil', icon: 'an an-user', action: () => {} },
      { label: this.literals.logout || 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
    ];
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu`).subscribe({
      next: (menu: any) => {
        this.menus = menu;
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
          {
            label: 'Dados Públicos CNPJ',
            subItems: [
              { label: 'Empresas (RFB)', link: '/saas/cnpj/empresas' },
              { label: 'Estabelecimentos', link: '/saas/cnpj/estabelecimentos' }
            ]
          },
          {
            label: 'Cadastros Auxiliares',
            subItems: [
              { label: 'Países (BACEN)', link: '/app/auxiliary/countries' },
              { label: 'Estados (IBGE)', link: '/app/auxiliary/states' },
              { label: 'Municípios (IBGE)', link: '/app/auxiliary/cities' },
              { label: 'CNAEs (Fiscal)', link: '/app/auxiliary/cnaes' },
              { label: 'CEPs (Cache)', link: '/app/auxiliary/ceps' }
            ]
          }
        ]
      };

      if (!this.menus.find(m => m.label === masterMenu.label)) {
        this.menus.push(masterMenu);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
