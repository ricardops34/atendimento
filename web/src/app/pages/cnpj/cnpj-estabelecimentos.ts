import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-cnpj-estabelecimentos',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Dados Públicos: Estabelecimentos (RFB)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CnpjEstabelecimentosComponent {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/cnpj/estabelecimentos`;
  
  readonly actions: PoPageDynamicTableActions = {
    remove: false,
    removeAll: false
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'cnpjFull', label: 'CNPJ Completo', gridColumns: 3, filter: true, mask: '99.999.999/9999-99' },
    { property: 'nomeFantasia', label: 'Nome Fantasia', gridColumns: 5, filter: true },
    { property: 'situacaoCadastral', label: 'Situação', gridColumns: 2, options: [
      { label: 'Nula', value: '01' },
      { label: 'Ativa', value: '02' },
      { label: 'Suspensa', value: '03' },
      { label: 'Inapta', value: '04' },
      { label: 'Baixada', value: '08' }
    ]},
    { property: 'cnaeFiscalPrincipal', label: 'CNAE Principal', gridColumns: 2, filter: true },
    { property: 'municipio', label: 'Município', gridColumns: 3, filter: true },
    { property: 'uf', label: 'UF', gridColumns: 1, filter: true }
  ];
}
