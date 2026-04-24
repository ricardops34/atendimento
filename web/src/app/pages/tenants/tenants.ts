import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      id="saas-tenants-table"
      p-title="Gestão de Clientes (SaaS Admin)"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent {
  
  // URL Dinâmica para funcionar em Local e na Nuvem
  get apiUrl() {
    const hostname = window.location.hostname;
    return hostname.includes('localhost') 
      ? 'http://localhost:3000/tenants' 
      : '/api/tenants';
  }

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6 },
    { property: 'domain', label: 'Domínio', filter: true, gridColumns: 6 },
    { 
      property: 'status', 
      label: 'Status', 
      type: 'label', 
      options: [
        { value: 'ACTIVE', label: 'Ativo', color: 'color-10' },
        { value: 'OVERDUE', label: 'Atrasado', color: 'color-07' },
        { value: 'SUSPENDED', label: 'Suspenso', color: 'color-01' }
      ],
      filter: true
    },
    { property: 'planId', label: 'Plano ID', visible: false },
    { property: 'createdAt', label: 'Data Cadastro', type: 'date', visible: true }
  ];
}
