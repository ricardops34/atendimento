import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-menus-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Menu"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class MenusPage {
  readonly apiUrl = `${environment.apiUrl}/menus/search`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'label', label: 'Menu', visible: true, filter: true },
    { property: 'module.name', label: 'Modulo', visible: true },
    { property: 'routine.name', label: 'Rotina', visible: true },
    { property: 'link', label: 'Link', visible: true, filter: true },
    { property: 'isActive', label: 'Ativo', visible: true, type: 'boolean' },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/menus/novo',
    edit: 'configuracoes/menus/:id/editar',
    remove: true,
  };
}
