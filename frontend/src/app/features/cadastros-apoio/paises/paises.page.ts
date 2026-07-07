import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-paises-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Países"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `,
})
export class PaisesPage {
  readonly apiUrl = `${environment.apiUrl}/paises/search`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'Código', isKey: true, width: '10%' },
    { property: 'nome', label: 'Nome' },
    { property: 'sigla', label: 'Sigla', width: '15%' },
  ];

  readonly actions = {
    new: '/configuracoes/paises/novo',
    edit: '/configuracoes/paises/:id/editar',
    remove: true,
  };
}
