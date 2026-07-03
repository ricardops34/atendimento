import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'agendamentos/lista', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/clientes/clientes.page').then((m) => m.ClientesPage),
  },
  {
    path: 'profissionais',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/profissionais/profissionais.page').then((m) => m.ProfissionaisPage),
  },
  {
    path: 'contratos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/contratos/contratos.page').then((m) => m.ContratosPage),
  },
  {
    path: 'feriados',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/feriados/feriados.page').then((m) => m.FeriadosPage),
  },
  {
    path: 'configuracoes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/configuracoes.page').then((m) => m.ConfiguracoesPage),
  },
  {
    path: 'configuracoes/empresas',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/empresas/empresas.page').then((m) => m.ConfigEmpresasPage),
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
  {
    path: 'configuracoes/estados',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/estados/estados.page').then((m) => m.EstadosPage),
  },
  {
    path: 'configuracoes/municipios',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/municipios/municipios.page').then((m) => m.MunicipiosPage),
  },
  {
    path: 'configuracoes/ceps',
    canActivate: [authGuard],
    loadComponent: () => import('./features/configuracoes/ceps/ceps.page').then((m) => m.CepsPage),
  },
  { 
    path: 'agendamentos/lista', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/agendamentos/lista/lista').then((m) => m.Lista),
  },
  { 
    path: 'agendamentos/calendario', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/agendamentos/calendario/calendario').then((m) => m.Calendario),
  }
];
