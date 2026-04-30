import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoHeaderActionTool,
  PoHeaderBrand,
  PoHeaderUser,
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
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  
  brand: PoHeaderBrand = { title: 'BJSOFT SAAS' };
  headerUser: PoHeaderUser = { name: 'Usuário', avatar: '' };
  actions: Array<PoHeaderActionTool> = [];

  ngOnInit() {
    this.setupProfile();
  }

  private setupProfile() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
    const initials = (user.name || 'U').substring(0, 1).toUpperCase();
    const defaultAvatar = \`https://ui-avatars.com/api/?name=\${initials}&background=7b1fa2&color=fff\`;

    this.headerUser = {
      name: user.name || 'Usuário Não Identificado',
      avatar: user.avatarUrl || defaultAvatar
    };

    this.actions = [
      { label: 'Sair', icon: 'an an-sign-out', click: () => this.logout() }
    ];
  }

  private logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
