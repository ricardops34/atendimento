import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-config-empresas-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Empresas"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class ConfigEmpresasPage {
  readonly apiUrl = `${environment.apiUrl}/empresas`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Empresa', visible: true, filter: true },
    { property: 'slug', label: 'Slug', visible: true, filter: true },
    { property: 'cnpj', label: 'CNPJ', visible: true, filter: true }
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/empresas/novo',
    edit: 'configuracoes/empresas/:id/editar',
    remove: true,
  };
}
