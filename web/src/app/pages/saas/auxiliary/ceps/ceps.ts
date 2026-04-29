import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-ceps',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Cadastro Global: CEPs (Cache Local)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CepsComponent {
  private coreService = inject(CoreService);
  readonly serviceApi = `${this.coreService.apiUrl}/auxiliary/cep`;
  
  readonly actions: PoPageDynamicTableActions = {
    remove: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'code', label: 'CEP', gridColumns: 2, filter: true, mask: '99999-999' },
    { property: 'address', label: 'Logradouro', gridColumns: 4, filter: true },
    { property: 'neighborhood', label: 'Bairro', gridColumns: 3, filter: true },
    { property: 'city.name', label: 'Cidade', gridColumns: 3, filter: true }
  ];
}
