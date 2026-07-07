import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Contratos"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `,
})
export class ContratosPage {
  readonly apiUrl = `${environment.apiUrl}/contratos/search`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', isKey: true, width: '10%' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'cliente.nome', label: 'Cliente' },
    { property: 'tipo', label: 'Tipo' },
    { property: 'dtInicio', label: 'Data Início', type: 'date' },
    { property: 'dtFim', label: 'Data Fim', type: 'date' },
  ];

  readonly actions = {
    new: '/contratos/novo',
    edit: '/contratos/:id/editar',
    remove: true,
  };
}
