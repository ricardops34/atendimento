import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule, PoToolbarProfile, PoToolbarAction } from '@po-ui/ng-components';
import { AuthService } from './core/auth/auth.service';
import { TenantStateService } from './core/auth/tenant-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PoMenuModule, PoPageModule, PoToolbarModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  private tenantState = inject(TenantStateService);
  private router = inject(Router);

  public isAuthenticated = signal(false);
  public profile: PoToolbarProfile = { title: '', subtitle: '' };
  public profileActions: PoToolbarAction[] = [
    { label: 'Sair', icon: 'po-icon-exit', action: () => this.logout() }
  ];

  public menus = signal<PoMenuItem[]>([]);

  constructor() {
    effect(() => {
      const user = this.tenantState.user();
      this.isAuthenticated.set(!!user);

      if (user) {
        this.profile = {
          title: user.name,
          subtitle: user.tenant?.name
        };

        const allowedModules = user.modules || [];
        const dynamicMenus: PoMenuItem[] = [];

        dynamicMenus.push({ label: 'Início', icon: 'po-icon-home', link: '/' });

        if (allowedModules.includes('companies')) {
          dynamicMenus.push({ label: 'Empresas', icon: 'po-icon-company', link: '/empresas' });
        }
        if (allowedModules.includes('professionals')) {
          dynamicMenus.push({ label: 'Profissionais', icon: 'po-icon-user', link: '/profissionais' });
        }
        if (allowedModules.includes('contracts')) {
          dynamicMenus.push({ label: 'Contratos', icon: 'po-icon-document-filled', link: '/contratos' });
        }
        if (allowedModules.includes('appointments-list')) {
          dynamicMenus.push({ label: 'Lista de Atendimentos', icon: 'po-icon-list', link: '/agendamentos/lista' });
        }
        if (allowedModules.includes('appointments-calendar')) {
          dynamicMenus.push({ label: 'Calendário', icon: 'po-icon-calendar', link: '/agendamentos/calendario' });
        }

        this.menus.set(dynamicMenus);
      }
    });

    if (this.authService.isAuthenticated()) {
      this.authService.me().subscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
