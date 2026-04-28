import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainComponent } from './pages/main/main';
import { DashboardComponent } from './pages/main/dashboard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: MainComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      
      // Gestão SaaS (Admin Master)
      { path: 'tenants', loadComponent: () => import('./pages/admin/tenants/tenants').then(m => m.TenantsComponent) },
      { path: 'tenants/new', loadComponent: () => import('./pages/admin/tenants/tenants-edit').then(m => m.TenantsEditComponent) },
      { path: 'tenants/edit/:id', loadComponent: () => import('./pages/admin/tenants/tenants-edit').then(m => m.TenantsEditComponent) },
      
      { path: 'plans', loadComponent: () => import('./pages/admin/plans/plans').then(m => m.PlansComponent) },
      { path: 'plans/new', loadComponent: () => import('./pages/admin/plans/plans-edit').then(m => m.PlansEditComponent) },
      { path: 'plans/edit/:id', loadComponent: () => import('./pages/admin/plans/plans-edit').then(m => m.PlansEditComponent) },
      
      { path: 'metadata-editor', loadComponent: () => import('./pages/admin/metadata-editor/metadata-list').then(m => m.MetadataListComponent) },
      { path: 'metadata-editor/edit/:entity', loadComponent: () => import('./pages/admin/metadata-editor/metadata-editor').then(m => m.MetadataEditorComponent) },

      // Gestão da Empresa (Admin Local / Tenant)
      { path: 'users', loadComponent: () => import('./pages/admin/users/users').then(m => m.UsersComponent) },
      { path: 'users/new', loadComponent: () => import('./pages/admin/users/users-edit').then(m => m.UsersEditComponent) },
      { path: 'users/edit/:id', loadComponent: () => import('./pages/admin/users/users-edit').then(m => m.UsersEditComponent) },
      
      { path: 'roles', loadComponent: () => import('./pages/admin/roles/roles').then(m => m.RolesComponent) },
      { path: 'roles/new', loadComponent: () => import('./pages/admin/roles/roles-edit').then(m => m.RolesEditComponent) },
      { path: 'roles/edit/:id', loadComponent: () => import('./pages/admin/roles/roles-edit').then(m => m.RolesEditComponent) },
    ]
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dynamic/:entity', loadComponent: () => import('./pages/dynamic/dynamic-page').then(m => m.DynamicPageComponent) }
    ]
  }
];
