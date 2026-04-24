import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      id="saas-users-table"
      p-title="Gestão de Usuários"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class UsersComponent {

  get apiUrl() {
    const hostname = window.location.hostname;
    return hostname.includes('localhost') 
      ? 'http://localhost:3000/users' 
      : '/api/users';
  }

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6 },
    { property: 'email', label: 'E-mail', filter: true, gridColumns: 6 },
    { 
      property: 'role', 
      label: 'Nível de Acesso', 
      type: 'label', 
      options: [
        { value: 'SAAS_ADMIN', label: 'SaaS Master', color: 'color-07' },
        { value: 'TENANT_ADMIN', label: 'Admin Cliente', color: 'color-10' },
        { value: 'USER', label: 'Operador', color: 'color-01' }
      ],
      filter: true
    },
    { property: 'status', label: 'Status', type: 'boolean', filter: true }
  ];
}
