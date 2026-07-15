import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-perfis-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Perfis"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class PerfisPage {
  readonly apiUrl = `${environment.apiUrl}/profiles/search`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Perfil', visible: true, filter: true },
    { property: 'menu.title', label: 'Menu', visible: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/perfis/novo',
    edit: 'configuracoes/perfis/:id/editar',
    remove: true,
  };
}
