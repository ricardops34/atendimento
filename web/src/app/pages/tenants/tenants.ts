import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoPageDynamicTableOptions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Gestão de Clientes (SaaS Admin)"
      p-service-api="http://localhost:3000/tenants"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent {
  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6 },
    { property: 'domain', label: 'Domínio', filter: true, gridColumns: 6 },
    { 
      property: 'plan', 
      label: 'Plano', 
      type: 'label', 
      options: [
        { value: 'STANDARD', label: 'Standard', color: 'color-01' },
        { value: 'PRO', label: 'Pro', color: 'color-07' },
        { value: 'ENTERPRISE', label: 'Enterprise', color: 'color-10' }
      ],
      filter: true,
      gridColumns: 6 
    },
    { property: 'isActive', label: 'Ativo', type: 'boolean', filter: true, gridColumns: 6 },
    { property: 'createdAt', label: 'Data Cadastro', type: 'date', visible: true }
  ];
}
