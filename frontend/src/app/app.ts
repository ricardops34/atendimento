import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarAction,
  PoToolbarModule,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { AuthService } from './core/auth/auth.service';
import { TenantStateService } from './core/auth/tenant-state.service';

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
    { label: 'Sair', icon: 'an an-sign-out', action: () => this.logout() }
  ];
  public menus = signal<PoMenuItem[]>([]);

  private readonly menuCatalog: Record<string, PoMenuItem> = {
    home: { label: 'Inicio', shortLabel: 'INI', icon: 'an an-house', link: '/' },
    companies: { label: 'Empresas', shortLabel: 'EMP', icon: 'an an-buildings', link: '/empresas' },
    professionals: { label: 'Profissionais', shortLabel: 'PRO', icon: 'an an-user', link: '/profissionais' },
    contracts: { label: 'Contratos', shortLabel: 'CON', icon: 'an an-file-text', link: '/contratos' },
    'appointments-list': {
      label: 'Lista de Atendimentos',
      shortLabel: 'LST',
      icon: 'an an-list-dashes',
      link: '/agendamentos/lista'
    },
    'appointments-calendar': {
      label: 'Calendario',
      shortLabel: 'CAL',
      icon: 'an an-calendar-blank',
      link: '/agendamentos/calendario'
    },
    settings: {
      label: 'Configuracoes',
      shortLabel: 'CFG',
      icon: 'an an-gear',
      subItems: [
        { label: 'Tenants', shortLabel: 'TEN', icon: 'an an-buildings', link: '/configuracoes/tenants' },
        { label: 'Modulos', shortLabel: 'MOD', icon: 'an an-squares-four', link: '/configuracoes/modulos' },
        { label: 'Rotinas', shortLabel: 'ROT', icon: 'an an-list-checks', link: '/configuracoes/rotinas' },
        { label: 'Perfis', shortLabel: 'PRF', icon: 'an an-identification-card', link: '/configuracoes/perfis' },
        { label: 'Menus', shortLabel: 'MNU', icon: 'an an-tree-structure', link: '/configuracoes/menus' },
        { label: 'Usuarios', shortLabel: 'USR', icon: 'an an-users-three', link: '/configuracoes/usuarios' }
      ]
    },
    logout: {
      label: 'Sair',
      shortLabel: 'SAI',
      icon: 'an an-sign-out',
      action: () => this.logout()
    }
  };

  constructor() {
    this.syncSessionState(this.tenantState.user());

    effect(() => {
      this.syncSessionState(this.tenantState.user());
    });

    if (this.authService.isAuthenticated()) {
      this.authService.me().subscribe();
    }
  }

  buildMenus(allowedModules: string[], dynamicMenus: PoMenuItem[] = []): PoMenuItem[] {
    const menus: PoMenuItem[] = [{ ...this.menuCatalog['home'] }];

    const normalizedDynamicMenus = this.cloneMenus(dynamicMenus);

    if (normalizedDynamicMenus.length > 0) {
      menus.push(...normalizedDynamicMenus);
    } else {
      for (const moduleKey of allowedModules) {
        const menuItem = this.menuCatalog[moduleKey];

        if (menuItem) {
          menus.push({ ...menuItem });
        }
      }
    }

    menus.push({ ...this.menuCatalog['logout'] });

    return menus;
  }

  private cloneMenus(items: PoMenuItem[]): PoMenuItem[] {
    return items.map((item) => ({
      ...item,
      subItems: item.subItems ? this.cloneMenus(item.subItems) : undefined
    }));
  }

  private syncSessionState(user: any) {
    this.isAuthenticated.set(!!user);

    if (user) {
      this.profile = {
        title: user.name,
        subtitle: user.tenant?.name
      };

      this.menus.set(this.buildMenus(user.modules || [], user.menus || []));
      return;
    }

    this.profile = { title: '', subtitle: '' };
    this.menus.set([]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
