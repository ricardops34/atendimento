import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Cadastro Global: Municípios (IBGE)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CitiesComponent {
  private coreService = inject(CoreService);
  readonly serviceApi = `${this.coreService.apiUrl}/auxiliary/cities`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/app/auxiliary/cities/new',
    edit: '/app/auxiliary/cities/edit/:id',
    remove: true,
    removeAll: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'code', label: 'Código IBGE', gridColumns: 3, filter: true },
    { property: 'name', label: 'Nome do Município', gridColumns: 4, filter: true },
    { property: 'state.uf', label: 'UF', gridColumns: 2, filter: true },
    { property: 'cnpjCode', label: 'Código RFB', gridColumns: 2, filter: true },
    { property: 'stateId', label: 'ID Estado', visible: false }
  ];
}
