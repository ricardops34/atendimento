import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { App } from './app';
import { AuthService } from './core/auth/auth.service';
import { EmpresaStateService } from './core/auth/empresa-state.service';
import { PoBreadcrumbModule, PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';
import { routes } from './app.routes';

describe('App', () => {
  const createEmpresaState = (user: any = null) => ({
    user: () => user,
  });

  const createRouter = () => ({
    navigate: vi.fn(),
    events: of({}),
    url: '/agendamentos/lista',
    parseUrl: vi.fn(() => ({
      root: {
        children: {
          primary: {
            segments: [{ path: 'agendamentos' }, { path: 'lista' }]
          }
        }
      }
    }))
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: EmpresaStateService,
          useValue: createEmpresaState(),
        },
        {
          provide: Router,
          useValue: createRouter(),
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('does not expose standalone Configuracao or Menus x Rotinas routes', () => {
    expect(routes.some((route) => route.path === 'configuracoes')).toBe(false);
    expect(routes.some((route) => route.path?.startsWith('configuracoes/menus-rotinas'))).toBe(false);
  });

  it('builds authenticated menus with icon and shortLabel', () => {
    const fixture = TestBed.createComponent(App);
    const menus: PoMenuItem[] = (fixture.componentInstance as any).buildMenus([
      'companies',
      'professionals',
      'contracts',
      'appointments-list',
      'appointments-calendar',
    ]);

    expect(menus).not.toHaveLength(0);
    expect(menus.every((menu: PoMenuItem) => !!menu.icon && !!menu.shortLabel)).toBe(true);
    expect(
      menus.every((menu: PoMenuItem) => typeof menu.icon === 'string' && menu.icon.startsWith('an an-'))
    ).toBe(true);
    expect(menus.at(-1)?.label).toBe('Sair');
    expect(typeof menus.at(-1)?.action).toBe('function');
  });

  it('does not wrap authenticated routed pages in po-page-default', async () => {
    TestBed.resetTestingModule();
    TestBed.overrideComponent(App, {
      remove: {
        imports: [PoMenuModule, PoPageModule, PoToolbarModule, PoBreadcrumbModule]
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: EmpresaStateService,
          useValue: createEmpresaState({
            name: 'Administrador',
            empresa: { name: 'Empresa Demo' },
            modules: ['appointments-list'],
            menus: [
              {
                label: 'Lista de Atendimentos',
                shortLabel: 'LST',
                icon: 'an an-list-dashes',
                link: '/agendamentos/lista'
              }
            ]
          }),
        },
        {
          provide: Router,
          useValue: createRouter(),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('po-menu')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('po-page-default')).toBeNull();
  });

  it('prefers menu items returned by session over the static catalog', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: EmpresaStateService,
          useValue: createEmpresaState({
            name: 'Administrador',
            empresa: { name: 'Empresa Demo' },
            modules: ['settings'],
            availableEmpresas: [
              { empresaId: 1, empresaName: 'Empresa Demo', isDefault: true },
              { empresaId: 2, empresaName: 'Empresa 2', isDefault: false }
            ],
            menus: [
              {
                label: 'Configuracoes',
                shortLabel: 'CFG',
                icon: 'an an-gear',
                subItems: [
                  {
                    label: 'Usuarios',
                    shortLabel: 'USR',
                    icon: 'an an-users-three',
                    link: '/configuracoes/usuarios'
                  }
                ]
              }
            ]
          }),
        },
        {
          provide: Router,
          useValue: createRouter(),
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const menus = fixture.componentInstance.menus();

    expect(menus[0]).toEqual({
      label: 'Inicio',
      shortLabel: 'INI',
      icon: 'an an-house',
      link: '/dashboard'
    });
    expect(menus[1]).toEqual({
      label: 'Configuracoes',
      shortLabel: 'CFG',
      icon: 'an an-gear',
      subItems: [
        {
          label: 'Usuarios',
          shortLabel: 'USR',
          icon: 'an an-users-three',
          link: '/configuracoes/usuarios'
        }
      ]
    });
    expect(menus.at(-1)?.label).toBe('Sair');
  });

  it('shows switch empresa action when session has more than one empresa', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: EmpresaStateService,
          useValue: createEmpresaState({
            name: 'Administrador',
            empresa: { name: 'Empresa Demo' },
            modules: ['settings'],
            availableEmpresas: [
              { empresaId: 1, empresaName: 'Empresa Demo', isDefault: true },
              { empresaId: 2, empresaName: 'Empresa 2', isDefault: false }
            ],
            menus: []
          }),
        },
        {
          provide: Router,
          useValue: createRouter(),
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance.profileActions.some((item: any) => item.label === 'Trocar empresa')).toBe(true);
  });

  it('builds breadcrumb from current route and keeps the last item without link', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: EmpresaStateService,
          useValue: createEmpresaState({
            name: 'Administrador',
            empresa: { name: 'Empresa Demo' },
            modules: ['appointments-list'],
            availableEmpresas: [],
            menus: []
          }),
        },
        {
          provide: Router,
          useValue: createRouter(),
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const breadcrumb = fixture.componentInstance.breadcrumb();

    expect(breadcrumb.items.map((item: any) => item.label)).toEqual([
      'Inicio',
      'Agendamentos',
      'Lista de Atendimentos'
    ]);
    expect(breadcrumb.items[0].link).toBe('/dashboard');
    expect(breadcrumb.items.at(-1)?.link).toBeUndefined();
  });
});
