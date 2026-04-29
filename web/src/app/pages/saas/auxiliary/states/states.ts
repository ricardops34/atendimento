import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Cadastro Global: Estados (IBGE)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class StatesComponent {
  private coreService = inject(CoreService);
  readonly serviceApi = `${this.coreService.apiUrl}/auxiliary/states`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/saas/auxiliary/states/new',
    edit: '/saas/auxiliary/states/edit/:id',
    remove: true,
    removeAll: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'code', label: 'Código IBGE', gridColumns: 3, filter: true },
    { property: 'uf', label: 'UF (Sigla)', gridColumns: 2, filter: true },
    { property: 'name', label: 'Nome do Estado', gridColumns: 7, filter: true }
  ];
}
