import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { ContratoService } from '../../../core/services/contrato.service';

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
      [p-table-custom-actions]="tableCustomActions"
    >
    </po-page-dynamic-table>
  `,
})
export class ContratosPage {
  private contratoService = inject(ContratoService);
  private notification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/contratos/search`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', key: true, width: '10%' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'cliente.nome', label: 'Cliente' },
    { property: 'tipo', label: 'Tipo' },
    { property: 'dtInicio', label: 'Data Início', type: 'date' },
    { property: 'dtFim', label: 'Data Fim', type: 'date' },
    {
      property: 'bloqueadoStatus',
      label: 'Bloqueado',
      type: 'label',
      labels: [
        { value: 'Sim', label: 'Sim', color: 'color-07' },
        { value: 'Não', label: 'Não', color: 'color-10' },
      ],
    },
  ];

  readonly actions = {
    new: '/contratos/novo',
    edit: '/contratos/:id/editar',
    remove: (_id: string, resource: any) => !resource.temAgendamentos,
  };

  readonly tableCustomActions = [
    {
      label: 'Bloquear',
      icon: 'an an-lock',
      visible: (resource: any) => !resource.bloqueado,
      action: (resource: any) => this.alterarBloqueio(resource, true),
    },
    {
      label: 'Ativar',
      icon: 'an an-lock-open',
      visible: (resource: any) => resource.bloqueado,
      action: (resource: any) => this.alterarBloqueio(resource, false),
    },
  ];

  private alterarBloqueio(resource: any, bloqueado: boolean) {
    this.contratoService.update(resource.id, { bloqueado }).subscribe({
      next: () => {
        resource.bloqueado = bloqueado;
        resource.bloqueadoStatus = bloqueado ? 'Sim' : 'Não';
        this.notification.success(
          bloqueado ? 'Contrato bloqueado com sucesso.' : 'Contrato ativado com sucesso.',
        );
      },
      error: () => this.notification.error('Erro ao alterar o status do contrato.'),
    });
  }
}
