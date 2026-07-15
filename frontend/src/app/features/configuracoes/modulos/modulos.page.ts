import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modulos-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Modulos"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class ModulosPage {
  readonly apiUrl = `${environment.apiUrl}/modules/search`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Modulo', visible: true, filter: true },
    { property: 'key', label: 'Key', visible: true, filter: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/modulos/novo',
    edit: 'configuracoes/modulos/:id/editar',
    remove: true,
  };
}
