import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Cadastro Global: Países (BACEN)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CountriesComponent {
  private coreService = inject(CoreService);
  readonly serviceApi = `${this.coreService.apiUrl}/auxiliary/countries`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/saas/auxiliary/countries/new',
    edit: '/saas/auxiliary/countries/edit/:id',
    remove: true,
    removeAll: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'code', label: 'Código BACEN', gridColumns: 3, filter: true },
    { property: 'name', label: 'Nome do País', gridColumns: 6, filter: true },
    { property: 'isoCode', label: 'Sigla ISO', gridColumns: 3 }
  ];
}
