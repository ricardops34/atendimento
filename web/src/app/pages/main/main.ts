import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { PoModule, PoMenuItem, PoToolbarAction, PoI18nService } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  template: `
    <div class="po-wrapper">
      <po-toolbar 
        id="saas-main-toolbar" 
        [p-title]="toolbarTitle"
        [p-profile]="profile"
        [p-profile-actions]="profileActions">
      </po-toolbar>
      
      <po-menu id="saas-main-menu" [p-menus]="menus"></po-menu>
      
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
      { label: this.literals.profile || 'Perfil', icon: 'po-icon-user', action: () => {} },
      { label: this.literals.logout || 'Sair', icon: 'po-icon-exit', type: 'danger', action: () => this.logout() }
    ];
  }

  loadDynamicMenu() {
    // Agora buscamos o menu do Backend para trazer as rotinas e entidades dinâmicas
    this.http.get(`${this.coreService.apiUrl}/menu`).subscribe({
      next: (menu: any) => {
        this.menus = menu;
      },
      error: () => {
        console.error('Falha ao carregar menu dinâmico, usando fallback básico.');
        this.menus = [{ label: 'Dashboard', link: '/app/dashboard', icon: 'po-icon-chart-area' }];
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
