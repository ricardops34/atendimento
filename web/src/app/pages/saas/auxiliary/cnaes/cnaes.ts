import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-cnaes',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Catálogo Global: CNAEs"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CnaesComponent {
  private coreService = inject(CoreService);
  readonly serviceApi = `${this.coreService.apiUrl}/auxiliary/cnaes`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/saas/auxiliary/cnaes/new',
    edit: '/saas/auxiliary/cnaes/edit/:id',
    remove: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'code', label: 'Código CNAE', gridColumns: 3, filter: true },
    { property: 'description', label: 'Descrição da Atividade', gridColumns: 9, filter: true }
  ];
}
