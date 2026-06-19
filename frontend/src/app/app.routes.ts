import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'inicio',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },

  // ── Clientes ──────────────────────────────────────────────────────────────
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas.page').then((m) => m.EmpresasPage),
  },
  {
    path: 'clientes/novo',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas-edit.page').then((m) => m.EmpresasEditPage),
  },
  {
    path: 'clientes/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas-detail.page').then((m) => m.EmpresasDetailPage),
  },
  {
    path: 'clientes/:id/editar',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas-edit.page').then((m) => m.EmpresasEditPage),
  },
  {
    path: 'clientes/:id/excluir',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas-excluir.page').then((m) => m.EmpresasExcluirPage),
  },

  // ── Profissionais ─────────────────────────────────────────────────────────
  {
    path: 'profissionais',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais.page').then((m) => m.ProfissionaisPage),
  },
  {
    path: 'profissionais/novo',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais-edit.page').then((m) => m.ProfissionaisEditPage),
  },
  {
    path: 'profissionais/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais-detail.page').then((m) => m.ProfissionaisDetailPage),
  },
  {
    path: 'profissionais/:id/editar',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais-edit.page').then((m) => m.ProfissionaisEditPage),
  },
  {
    path: 'profissionais/:id/excluir',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais-excluir.page').then((m) => m.ProfissionaisExcluirPage),
  },

  // ── Contratos ─────────────────────────────────────────────────────────────
  {
    path: 'contratos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos.page').then((m) => m.ContratosPage),
  },
  {
    path: 'contratos/novo',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos-edit.page').then((m) => m.ContratosEditPage),
  },
  {
    path: 'contratos/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos-detail.page').then((m) => m.ContratosDetailPage),
  },
  {
    path: 'contratos/:id/editar',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos-edit.page').then((m) => m.ContratosEditPage),
  },
  {
    path: 'contratos/:id/excluir',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos-excluir.page').then((m) => m.ContratosExcluirPage),
  },

  // ── Configurações ─────────────────────────────────────────────────────────
  {
    path: 'configuracoes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/configuracoes.page').then((m) => m.ConfiguracoesPage),
  },
  {
    path: 'configuracoes/empresas',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/tenants/tenants.page').then((m) => m.TenantsPage),
  },
  {
    path: 'configuracoes/modulos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/modulos/modulos.page').then((m) => m.ModulosPage),
  },
  {
    path: 'configuracoes/rotinas',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/rotinas/rotinas.page').then((m) => m.RotinasPage),
  },
  {
    path: 'configuracoes/perfis',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/perfis/perfis.page').then((m) => m.PerfisPage),
  },
  {
    path: 'configuracoes/menus',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/menus/menus.page').then((m) => m.MenusPage),
  },
  {
    path: 'configuracoes/usuarios',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/usuarios/usuarios.page').then((m) => m.UsuariosPage),
  },

  // ── Agendamentos ──────────────────────────────────────────────────────────
  {
    path: 'agendamentos/lista',
    canActivate: [authGuard],
    loadComponent: () => import('./features/agendamentos/lista/lista').then((m) => m.Lista),
  },
  {
    path: 'agendamentos/calendario',
    canActivate: [authGuard],
    loadComponent: () => import('./features/agendamentos/calendario/calendario').then((m) => m.Calendario),
  },
];
