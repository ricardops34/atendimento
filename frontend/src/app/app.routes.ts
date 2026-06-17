import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'agendamentos/lista', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'empresas',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cadastros-apoio/empresas/empresas.page').then((m) => m.EmpresasPage),
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
