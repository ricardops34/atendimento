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
      <!-- O menu lateral DEVE existir para o po-wrapper calcular 100% da área -->
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true"
        [p-collapsed]="isCollapsed">
      </po-menu>

      <!-- RENDERIZAÇÃO DAS PÁGINAS -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
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

  ngOnInit() {
    this.setupHeader();
    this.loadMenus();
  }

  private setupHeader() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
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
