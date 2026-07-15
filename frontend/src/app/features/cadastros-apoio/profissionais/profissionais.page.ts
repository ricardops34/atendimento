import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profissionais-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Profissionais"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `,
})
export class ProfissionaisPage {
  readonly apiUrl = `${environment.apiUrl}/profissionais/search`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', key: true, width: '10%', filter: true },
    { property: 'nome', label: 'Profissional', filter: true },
    { property: 'user.name', label: 'Usuário do Sistema' },
    { property: 'userName', label: 'Usuário do Sistema', visible: false, filter: true, allowColumnsManager: false },
  ];

  readonly actions = {
    new: '/profissionais/novo',
    edit: '/profissionais/:id/editar',
    remove: true,
  };
}
