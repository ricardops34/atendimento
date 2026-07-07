import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-estados-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Estados"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class EstadosPage {
  readonly apiUrl = `${environment.apiUrl}/estados`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'Cód. IBGE', key: true, visible: true, filter: true },
    { property: 'nome', label: 'Estado', visible: true, filter: true },
    { property: 'sigla', label: 'Sigla', visible: true, filter: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/estados/novo',
    edit: 'configuracoes/estados/:id/editar',
    remove: true,
  };
}
