import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Clientes"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class ClientesPage {
  readonly apiUrl = `${environment.apiUrl}/clientes`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'documento', label: 'CPF/CNPJ', visible: true, filter: true },
    { property: 'nome', label: 'Cliente (Nome Fantasia)', visible: true, filter: true },
    { property: 'telefone', label: 'Telefone', visible: true, filter: false },
    { property: 'cidade', label: 'Cidade', visible: true, filter: false }
  ];

  actions: PoPageDynamicTableActions = {
    new: 'clientes/novo',
    edit: 'clientes/:id/editar',
    remove: true,
  };
}

