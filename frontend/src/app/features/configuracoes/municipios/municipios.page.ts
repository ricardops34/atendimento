import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-municipios-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Municípios"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class MunicipiosPage {
  readonly apiUrl = `${environment.apiUrl}/municipios`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'Cód. IBGE', key: true, visible: true, filter: true },
    { property: 'nome', label: 'Município', visible: true, filter: true },
    { property: 'estado.sigla', label: 'Estado', visible: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/municipios/novo',
    edit: 'configuracoes/municipios/:id/editar',
    remove: true,
  };
}
