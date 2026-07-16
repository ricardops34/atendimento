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
  readonly apiUrl = `${environment.apiUrl}/paises`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'Código', key: true, width: '10%', filter: true },
    { property: 'nome', label: 'Nome', filter: true },
    { property: 'sigla', label: 'Sigla', width: '15%', filter: true },
  ];

  readonly actions = {
    new: '/configuracoes/paises/novo',
    edit: '/configuracoes/paises/:id/editar',
    remove: true,
  };
}
