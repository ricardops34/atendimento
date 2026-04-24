import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Gestão de Clientes (Tenants)"
      p-service-api="http://localhost:3000/tenants"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent {
  readonly fields = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6, required: true },
    { property: 'domain', label: 'Subdomínio (.seusaas.com)', filter: true, gridColumns: 6, required: true },
    { property: 'planId', label: 'ID do Plano', gridColumns: 6, required: true }, // Futuramente usaremos um LookUp
    { property: 'isActive', label: 'Status Ativo', type: 'boolean', gridColumns: 2 },
    { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false },
  ];
}
