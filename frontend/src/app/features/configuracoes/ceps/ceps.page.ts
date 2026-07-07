import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-ceps-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="CEPs"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class CepsPage {
  readonly apiUrl = `${environment.apiUrl}/ceps`;

  fields: PoPageDynamicTableField[] = [
    { property: 'cep', label: 'CEP', key: true, visible: true, filter: true },
    { property: 'logradouro', label: 'Logradouro', visible: true, filter: true },
    { property: 'bairro', label: 'Bairro', visible: true, filter: true },
    { property: 'municipio.nome', label: 'Município', visible: true },
    { property: 'estado.sigla', label: 'UF', visible: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/ceps/novo',
    edit: 'configuracoes/ceps/:id/editar',
    remove: true,
  };
}
