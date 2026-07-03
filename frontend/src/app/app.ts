import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoBreadcrumbModule,
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoHeaderActionTool,
  PoHeaderModule,
  PoMenuItem,
  PoMenuModule,
  PoModalComponent,
  PoModalModule,
  PoPageModule,
  PoNotificationService,
  PoToolbarAction,
} from '@po-ui/ng-components';
import { ViewChild } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { TenantStateService } from './core/auth/tenant-state.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PoMenuModule,
    PoPageModule,
    PoHeaderModule,
    PoBreadcrumbModule,
    PoModalModule,
    PoFieldModule,
    PoButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('switchTenantModal', { static: false }) switchTenantModal?: PoModalComponent;
  @ViewChild('profileModal', { static: false }) profileModal?: PoModalComponent;
  private authService = inject(AuthService);
  private tenantState = inject(TenantStateService);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);
  private readonly breadcrumbLabels: Record<string, string> = {
    clientes: 'Clientes',
    profissionais: 'Profissionais',
    contratos: 'Contratos',
    configuracoes: 'Configuracoes',
    empresas: 'Empresas',
    modulos: 'Modulos',
    rotinas: 'Rotinas',
    perfis: 'Perfis',
    menus: 'Menus',
    usuarios: 'Usuarios',
    estados: 'Estados',
    municipios: 'Municípios',
    ceps: 'CEPs',
    agendamentos: 'Agendamentos',
    lista: 'Lista de Atendimentos',
    calendario: 'Calendario'
  };

  public isAuthenticated = signal(false);
  public headerBrand = { logo: '/logo_bj.png', smallLogo: '/logo_bj.png', title: 'BJ - Atendimento', link: '/' };
  public profileActions: PoToolbarAction[] = [];
  public headerActionsTools: PoHeaderActionTool[] = [];
  public headerUser: any = undefined;
  public breadcrumb = signal<PoBreadcrumb>({ items: [] });
  public tenantOptions: PoComboOption[] = [];
  public selectedTenantId: number | null = null;
  public avatarOptions: PoComboOption[] = Array.from({ length: 12 }, (_, index) => {
    const avatar = `avatar_${String(index + 1).padStart(2, '0')}.png`;
    return { label: avatar, value: avatar };
  });
  public profileForm: any = { name: '', email: '', tenantName: '', profileName: '', avatar: 'avatar_01.png', password: '', confirmPassword: '' };
  public menus = signal<PoMenuItem[]>([]);

  private readonly menuCatalog: Record<string, PoMenuItem> = {
    home: { label: 'Inicio', shortLabel: 'INI', icon: 'an an-house', link: '/' },
    companies: { label: 'Clientes', shortLabel: 'CLI', icon: 'an an-buildings', link: '/clientes' },
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
        { label: 'Empresas', shortLabel: 'EMP', icon: 'an an-buildings', link: '/configuracoes/empresas' },
        { label: 'Modulos', shortLabel: 'MOD', icon: 'an an-squares-four', link: '/configuracoes/modulos' },
        { label: 'Rotinas', shortLabel: 'ROT', icon: 'an an-list-checks', link: '/configuracoes/rotinas' },
        { label: 'Perfis', shortLabel: 'PRF', icon: 'an an-identification-card', link: '/configuracoes/perfis' },
        { label: 'Menus', shortLabel: 'MNU', icon: 'an an-tree-structure', link: '/configuracoes/menus' },
        { label: 'Usuarios', shortLabel: 'USR', icon: 'an an-users-three', link: '/configuracoes/usuarios' },
        { label: 'Estados', shortLabel: 'EST', icon: 'an an-map-pin', link: '/configuracoes/estados' },
        { label: 'Municipios', shortLabel: 'MUN', icon: 'an an-map-trifold', link: '/configuracoes/municipios' },
        { label: 'CEPs', shortLabel: 'CEP', icon: 'an an-mailbox', link: '/configuracoes/ceps' }
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
    this.updateBreadcrumb(this.router.url);

    effect(() => {
      this.syncSessionState(this.tenantState.user());
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateBreadcrumb(event.urlAfterRedirects));

    if (this.authService.isAuthenticated()) {
      this.authService.me().subscribe();
    }
  }

  buildMenus(allowedModules: string[], dynamicMenus: PoMenuItem[] = []): PoMenuItem[] {
    const normalizedDynamicMenus = this.cloneMenus(dynamicMenus);
    const menus: PoMenuItem[] = [];

    if (normalizedDynamicMenus.length > 0) {
      menus.push(...normalizedDynamicMenus);
    } else {
      menus.push({ ...this.menuCatalog['home'] });

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
      action: item.action,
      subItems: item.subItems ? this.cloneMenus(item.subItems) : undefined
    }));
  }

  private syncSessionState(user: any) {
    this.isAuthenticated.set(!!user);

    if (user) {
      const availableTenants = user.availableTenants || [];
      this.selectedTenantId = user.tenant?.id ?? availableTenants.find((item: any) => item.isDefault)?.tenantId ?? null;
      this.tenantOptions = availableTenants.map((item: any) => ({
        label: item.tenantName,
        value: item.tenantId
      }));
      this.profileActions = this.buildProfileActions(availableTenants);
      this.headerActionsTools = [];
      this.profileForm = {
        name: user.name || '',
        email: user.email || '',
        tenantName: user.tenant?.name || '',
        profileName: user.profile || '',
        avatar: user.avatar || 'avatar_01.png',
        password: '',
        confirmPassword: ''
      };
      this.headerUser = {
        avatar: `/avatar/${user.avatar || 'avatar_01.png'}`,
        customerBrand: '/logo_bj.png',
        items: this.profileActions.map((item) => ({
          label: item.label,
          action: item.action!
        })),
        status: 'positive'
      };

      this.menus.set(this.buildMenus(user.modules || [], user.menus || []));
      return;
    }

    this.profileActions = [];
    this.headerActionsTools = [];
    this.headerUser = undefined;
    this.tenantOptions = [];
    this.selectedTenantId = null;
    this.menus.set([]);
    this.breadcrumb.set({ items: [] });
  }

  private buildProfileActions(availableTenants: any[]): PoToolbarAction[] {
    const actions: PoToolbarAction[] = [];

    actions.push({
      label: 'Meu perfil',
      icon: 'an an-user-circle',
      action: () => this.openProfileModal()
    });

    if (availableTenants.length > 1) {
      actions.push({
        label: 'Trocar empresa',
        icon: 'an an-buildings',
        action: () => this.openSwitchTenantModal()
      });
    }

    actions.push({
      label: 'Sair',
      icon: 'an an-sign-out',
      action: () => this.logout()
    });

    return actions;
  }

  openProfileModal() {
    this.profileModal?.open();
  }

  openSwitchTenantModal() {
    this.switchTenantModal?.open();
  }

  confirmSwitchTenant() {
    if (!this.selectedTenantId) {
      return;
    }

    this.authService.switchEmpresa(this.selectedTenantId).subscribe({
      next: () => this.switchTenantModal?.close(),
    });
  }

  saveProfile() {
    if (this.profileForm.password || this.profileForm.confirmPassword) {
      if (this.profileForm.password !== this.profileForm.confirmPassword) {
        this.poNotification.warning('A confirmação da senha está diferente.');
        return;
      }
    }

    const payload: any = {
      avatar: this.profileForm.avatar,
    };

    if (this.profileForm.password?.trim()) {
      payload.password = this.profileForm.password.trim();
    }

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        this.poNotification.success('Perfil atualizado com sucesso.');
        this.profileForm.password = '';
        this.profileForm.confirmPassword = '';
        this.profileModal?.close();
      },
      error: () => this.poNotification.error('Erro ao atualizar perfil.')
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateBreadcrumb(url: string) {
    if (!this.authService.isAuthenticated()) {
      this.breadcrumb.set({ items: [] });
      return;
    }

    const path = url.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);
    const items: PoBreadcrumbItem[] = [{ label: 'Inicio', link: '/agendamentos/lista' }];
    let currentPath = '';

    for (const segment of segments) {
      if (segment === 'login') {
        continue;
      }

      currentPath += `/${segment}`;
      items.push({
        label: this.breadcrumbLabels[segment] || this.toLabel(segment),
        link: currentPath
      });
    }

    if (items.length > 1) {
      delete items[items.length - 1].link;
    }

    this.breadcrumb.set({ items });
  }

  private toLabel(value: string) {
    return value
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
