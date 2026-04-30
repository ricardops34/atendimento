import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoToolbarAction,
  PoToolbarProfile,
  PoComponentsModule
} from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule],
  template: `
    <div class="po-wrapper">
      <!-- 1. APENAS A TOOLBAR -->
      <po-toolbar 
        p-title="BJSOFT SAAS"
        [p-profile]="profile"
        [p-profile-actions]="profileActions">
      </po-toolbar>

      <!-- 2. RENDERIZAÇÃO DAS PÁGINAS -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  
  profile: PoToolbarProfile = { title: 'Usuário', subtitle: '', avatar: '' };
  profileActions: Array<PoToolbarAction> = [];

  ngOnInit() {
    this.setupProfile();
  }

  private setupProfile() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
    const initials = (user.name || 'U').substring(0, 1).toUpperCase();
    const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=7b1fa2&color=fff`;

    this.profile = {
      title: user.name || 'Usuário',
      subtitle: user.level === 9 ? 'Admin Master' : 'Acesso Limitado',
      avatar: user.avatarUrl || defaultAvatar
    };

    this.profileActions = [
      { label: 'Sair', icon: 'an an-sign-out', type: 'danger', action: () => this.logout() }
    ];
  }

  private logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
