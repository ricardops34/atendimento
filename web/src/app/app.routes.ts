import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainComponent } from './pages/main/main';
import { DashboardComponent } from './pages/main/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tenants', loadComponent: () => import('./pages/tenants/tenants').then(m => m.TenantsComponent) },
    ]
  },
  {
    path: 'app',
    component: MainComponent,
    children: [
      { path: 'users', loadComponent: () => import('./pages/users/users').then(m => m.UsersComponent) },
      { path: 'roles', loadComponent: () => import('./pages/roles/roles').then(m => m.RolesComponent) }
    ]
  }
];
