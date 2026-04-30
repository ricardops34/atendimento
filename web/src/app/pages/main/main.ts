import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoMenuItem,
  PoToolbarAction,
  PoComponentsModule,
  PoPageModule,
  PoToolbarProfile
} from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule, PoPageModule],
  template: `
    <div class="po-wrapper">
      <po-toolbar 
        p-title="Sistema SaaS"
        [p-actions]="toolbarActions"
        [p-profile]="profile"
        [p-profile-actions]="profileActions">
      </po-toolbar>
      
      <po-menu 
        [p-menus]="menus"
        [p-filter]="true">
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

  menus: Array<PoMenuItem> = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  
  profile: PoToolbarProfile = {
    title: this.user.name || 'Usuário',
    avatar: this.user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (this.user.name || 'User') + '&background=0054a6&color=fff',
  };

  profileActions: Array<any> = [
    { label: 'Perfil', icon: 'an an-user', action: () => { } },
    { label: 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
  ];
  
  toolbarActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.loadDynamicMenu();
  }

  loadDynamicMenu() {
    this.http.get(`${this.coreService.apiUrl}/menu/user-menu`).subscribe({
      next: (res: any) => {
        this.menus = res.sidebar || [];
        if (res.toolbar) {
          this.toolbarActions = res.toolbar.map((item: any) => ({
            label: item.label,
            icon: item.icon,
            action: () => { if (item.link) this.router.navigate([item.link]); }
          }));
        }
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
