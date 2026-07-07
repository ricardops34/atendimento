import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-feriados-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Feriados"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `,
})
export class FeriadosPage {
  readonly apiUrl = `${environment.apiUrl}/feriados/search`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', isKey: true, width: '10%' },
    { property: 'data', label: 'Data', type: 'date', width: '15%' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'tipo', label: 'Tipo', type: 'label', labels: [
      { value: 'N', label: 'Nacional', color: 'color-10' },
      { value: 'E', label: 'Estadual', color: 'color-08' },
      { value: 'M', label: 'Municipal', color: 'color-07' }
    ]},
    { property: 'fixo', label: 'Fixo', type: 'boolean' }
  ];

  readonly actions = {
    new: '/feriados/novo',
    edit: '/feriados/:id/editar',
    remove: true,
  };
}
