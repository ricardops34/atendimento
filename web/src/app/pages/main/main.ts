import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoModule, PoMenuItem } from '@po-ui/ng-components';
import { PoToolbarModule, PoMenuModule } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule, PoToolbarModule, PoMenuModule],
  template: `
    <div class="po-wrapper">
      <po-toolbar p-title="Seu SaaS - Control Panel"></po-toolbar>
      <po-menu [p-menus]="menus"></po-menu>
      <po-page-default>
        <router-outlet></router-outlet>
      </po-page-default>
    </div>
  `
})
export class MainComponent implements OnInit {
  menus: Array<PoMenuItem> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    const tenantId = localStorage.getItem('tenantId');
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    
    // Se for um Administrador do SaaS, carrega o menu Master
    if (permissions.includes('SAAS_ADMIN') || permissions.includes('SUPER_ADMIN')) {
      this.menus = [
        { label: 'Dashboard Admin', link: '/admin/dashboard', icon: 'po-icon-chart-area' },
        { 
          label: 'Gestão de Negócio', 
          icon: 'po-icon-company',
          subItems: [
            { label: 'Clientes (Tenants)', link: '/admin/tenants', icon: 'po-icon-users' },
            { label: 'Planos e Preços', link: '/admin/plans', icon: 'po-icon-finance' },
          ]
        },
        { 
          label: 'Infraestrutura', 
          icon: 'po-icon-settings',
          subItems: [
            { label: 'Logs Globais', link: '/admin/logs', icon: 'po-icon-list' },
            { label: 'Saúde do Sistema', link: '/admin/health', icon: 'po-icon-gas' },
          ]
        }
      ];
    } else {
      // Caso contrário, carrega o menu dinâmico do cliente
      this.http.get(`http://localhost:3000/menu`, {
        headers: { 'x-tenant-id': tenantId || '' }
      }).subscribe((res: any) => {
        this.menus = res;
      });
    }
  }
}
