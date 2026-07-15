import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rotinas-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Rotinas"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class RotinasPage {
  readonly apiUrl = `${environment.apiUrl}/routines/search`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'module.name', label: 'Modulo', visible: true },
    { property: 'name', label: 'Rotina', visible: true, filter: true },
    { property: 'key', label: 'Key', visible: true, filter: true },
    { property: 'path', label: 'Path', visible: true, filter: true },
    { property: 'isActive', label: 'Ativa', visible: true, type: 'boolean' },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/rotinas/novo',
    edit: 'configuracoes/rotinas/:id/editar',
    remove: true,
  };
}
