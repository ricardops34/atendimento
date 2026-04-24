import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoModule, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Dashboard', link: '/dashboard', icon: 'po-icon-home' },
    
    // Grupo Admin do SaaS
    { label: 'SaaS Admin', icon: 'po-icon-settings', subItems: [
      { label: 'Clientes (Tenants)', link: '/tenants', icon: 'po-icon-company' },
      { label: 'Configurações Globais', icon: 'po-icon-world' }
    ]},

    // Grupo do Cliente
    { label: 'Minha Empresa', icon: 'po-icon-company', subItems: [
      { label: 'Usuários', link: '/users', icon: 'po-icon-users' },
      { label: 'Papéis e Acesso', link: '/roles', icon: 'po-icon-lock' }
    ]},

    { label: 'Sair', action: () => window.location.href = '/login', icon: 'po-icon-exit' },
  ];
}
