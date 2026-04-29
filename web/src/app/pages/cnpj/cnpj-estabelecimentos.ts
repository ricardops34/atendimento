import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-cnpj-estabelecimentos',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Busca Unificada: Dados Públicos CNPJ"
      [p-breadcrumb]="breadcrumb"
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

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Dados Públicos RFB', link: '/saas/cnpj/empresas' },
      { label: 'Busca Unificada' }
    ]
  };
  
  readonly actions: PoPageDynamicTableActions = {
    edit: '/saas/cnpj/empresas/edit/:id', // Redireciona para a view unificada
    remove: false,
    removeAll: false,
    custom: [
      { 
        label: 'Sincronizar com RFB', 
        icon: 'an an-cloud-arrow-down', 
        action: () => this.syncData(),
        type: 'default'
      }
    ]
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'situacaoCadastral', label: 'Situação', gridColumns: 2, filter: true, options: [
      { label: 'Ativa', value: '02' },
      { label: 'Baixada', value: '08' },
      { label: 'Suspensa', value: '03' },
      { label: 'Inapta', value: '04' }
    ]},
    { property: 'cnpjFull', label: 'CNPJ', gridColumns: 3, filter: true, mask: '99.999.999/9999-99' },
    { property: 'nomeFantasia', label: 'Nome Fantasia', gridColumns: 4, filter: true },
    { property: 'uf', label: 'UF', gridColumns: 1, filter: true },
    { property: 'municipio', label: 'Município', gridColumns: 2, filter: true },
    { property: 'cnaeFiscalPrincipal', label: 'CNAE Principal', gridColumns: 2, filter: true },
    
    // Campos Extras para Filtros apenas
    { property: 'cnae', label: 'Filtrar por CNAE (Qualquer)', visible: false, filter: true },
    { property: 'cep', label: 'Filtrar por CEP', visible: false, filter: true, mask: '99999-999' }
  ];

  syncData() {
    // Aqui chamaríamos o endpoint de importação
    alert('Iniciando sincronização massiva com a RFB. Este processo roda em background.');
  }
}
