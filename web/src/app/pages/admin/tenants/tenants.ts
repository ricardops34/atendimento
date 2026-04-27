import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { CoreService } from '../../../core/services/core.service'; // Caminho corrigido

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Gestão de Clientes (Tenants)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/tenants`;

  readonly fields = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6, required: true },
    { property: 'domain', label: 'Subdomínio (.bjsoft.com.br)', filter: true, gridColumns: 6, required: true },
    { property: 'planId', label: 'ID do Plano', gridColumns: 6, required: true },
    { property: 'isActive', label: 'Status Ativo', type: 'boolean', gridColumns: 2 },
    { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false },
  ];
}
