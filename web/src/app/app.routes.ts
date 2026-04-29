import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainComponent } from './pages/main/main';
import { DashboardComponent } from './pages/main/dashboard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      
      // === ADMINISTRAÇÃO DO SAAS (MASTER) ===
      { 
        path: 'saas', 
        children: [
          { path: 'tenants', loadComponent: () => import('./pages/saas/tenants/tenants').then(m => m.TenantsComponent) },
          { path: 'tenants/new', loadComponent: () => import('./pages/saas/tenants/tenants-edit').then(m => m.TenantsEditComponent) },
          { path: 'tenants/edit/:id', loadComponent: () => import('./pages/saas/tenants/tenants-edit').then(m => m.TenantsEditComponent) },
          
          { path: 'plans', loadComponent: () => import('./pages/saas/plans/plans').then(m => m.PlansComponent) },
          { path: 'plans/matrix', loadComponent: () => import('./pages/saas/plans/plan-matrix').then(m => m.PlanMatrixComponent) },
          { path: 'plans/new', loadComponent: () => import('./pages/saas/plans/plans-edit').then(m => m.PlansEditComponent) },
          { path: 'plans/edit/:id', loadComponent: () => import('./pages/saas/plans/plans-edit').then(m => m.PlansEditComponent) },
          
          { path: 'metadata-editor', loadComponent: () => import('./pages/saas/metadata-list').then(m => m.MetadataListComponent) },
          { path: 'metadata-editor/edit/:entity', loadComponent: () => import('./pages/saas/metadata-editor').then(m => m.MetadataEditorComponent) },

          { path: 'routines', loadComponent: () => import('./pages/saas/routines/routines').then(m => m.RoutinesComponent) },
          { path: 'routines/new', loadComponent: () => import('./pages/saas/routines/routines-edit').then(m => m.RoutinesEditComponent) },
          { path: 'routines/edit/:id', loadComponent: () => import('./pages/saas/routines/routines-edit').then(m => m.RoutinesEditComponent) },

          // --- Dados Públicos CNPJ ---
          { path: 'cnpj/empresas', loadComponent: () => import('./pages/cnpj/cnpj-empresas').then(m => m.CnpjEmpresasComponent) },
          { path: 'cnpj/empresas/edit/:id', loadComponent: () => import('./pages/cnpj/cnpj-view').then(m => m.CnpjViewComponent) },
          { path: 'cnpj/estabelecimentos', loadComponent: () => import('./pages/cnpj/cnpj-estabelecimentos').then(m => m.CnpjEstabelecimentosComponent) },
        ]
      },

      // === SISTEMA (OPERACIONAL / CLIENT ADMIN) ===
      {
        path: 'app',
        children: [
          { path: 'users', loadComponent: () => import('./pages/sistema/admin/users/users').then(m => m.UsersComponent) },
          { path: 'users/new', loadComponent: () => import('./pages/sistema/admin/users/users-edit').then(m => m.UsersEditComponent) },
          { path: 'users/edit/:id', loadComponent: () => import('./pages/sistema/admin/users/users-edit').then(m => m.UsersEditComponent) },
          
          { path: 'roles', loadComponent: () => import('./pages/sistema/admin/roles/roles').then(m => m.RolesComponent) },
          { path: 'roles/new', loadComponent: () => import('./pages/sistema/admin/roles/roles-edit').then(m => m.RolesEditComponent) },
          { path: 'roles/edit/:id', loadComponent: () => import('./pages/sistema/admin/roles/roles-edit').then(m => m.RolesEditComponent) },

          { path: 'branches', loadComponent: () => import('./pages/sistema/admin/branches/branches').then(m => m.BranchesComponent) },
          { path: 'branches/new', loadComponent: () => import('./pages/sistema/admin/branches/branches-edit').then(m => m.BranchesEditComponent) },
          { path: 'branches/edit/:id', loadComponent: () => import('./pages/sistema/admin/branches/branches-edit').then(m => m.BranchesEditComponent) },

          { path: 'dynamic/:entity', loadComponent: () => import('./pages/sistema/shared/dynamic-page').then(m => m.DynamicPageComponent) },

          // --- Cadastros Auxiliares (Sincronizados) ---
          { path: 'auxiliary/countries', loadComponent: () => import('./pages/sistema/auxiliary/countries/countries').then(m => m.CountriesComponent) },
          { path: 'auxiliary/states', loadComponent: () => import('./pages/sistema/auxiliary/states/states').then(m => m.StatesComponent) },
          { path: 'auxiliary/cities', loadComponent: () => import('./pages/sistema/auxiliary/cities/cities').then(m => m.CitiesComponent) },
          { path: 'auxiliary/ceps', loadComponent: () => import('./pages/sistema/auxiliary/ceps/ceps').then(m => m.CepsComponent) },
          { path: 'auxiliary/cnaes', loadComponent: () => import('./pages/sistema/auxiliary/cnaes/cnaes').then(m => m.CnaesComponent) },
        ]
      }
    ]
  }
];
