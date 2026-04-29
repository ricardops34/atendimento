import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
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
      [p-page-custom-actions]="pageCustomActions"
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
    edit: '/saas/cnpj/empresas/edit/:id',
    remove: false,
    removeAll: false
  };

  readonly pageCustomActions: Array<any> = [
    { label: 'Sincronizar com RFB', action: this.syncData.bind(this), icon: 'an an-cloud-arrow-down' }
  ];

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

  private http = inject(HttpClient);
  private poNotification = inject(PoNotificationService);

  syncData() {
    this.poNotification.information('Iniciando sincronização massiva com a RFB. Este processo pode levar alguns minutos e roda em background.');
    
    // Configuração de exemplo para a carga de 2024-05 (ajustável conforme necessidade)
    const payload = {
      type: 'ESTABELECIMENTOS',
      folder: '2024-05',
      files: ['Estabelecimentos0.zip', 'Estabelecimentos1.zip', 'Estabelecimentos2.zip']
    };

    this.http.post(`${this.coreService.apiUrl}/cnpj/import/start`, payload).subscribe({
      next: () => this.poNotification.success('Tarefa de importação agendada com sucesso!'),
      error: (err) => this.poNotification.error('Erro ao iniciar importação: ' + (err.message || 'Erro interno'))
    });
  }
}
