import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoHeaderActionTool,
  PoHeaderBrand,
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
  actions: Array<PoHeaderActionTool> = [];

  ngOnInit() {
    this.setupProfile();
  }

  private setupProfile() {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};
    
    this.actions = [
      { label: user.name || 'Meu Perfil', icon: 'an an-user', action: () => {} },
      { label: 'Sair', icon: 'an an-sign-out', action: () => this.logout() }
    ];
  }

  private logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

