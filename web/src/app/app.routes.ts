import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainComponent } from './pages/main/main';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/main/main').then(m => m.MainComponent) },
      
      // ADMIN SAAS
      { path: 'tenants', loadComponent: () => import('./pages/tenants/tenants').then(m => m.TenantsComponent) },
      
      // CLIENTE SAAS
      { path: 'users', loadComponent: () => import('./pages/users/users').then(m => m.UsersComponent) },
      { path: 'roles', loadComponent: () => import('./pages/roles/roles').then(m => m.RolesComponent) }
    ]
  }
];
