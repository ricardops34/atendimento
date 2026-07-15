import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { FeriadoService } from '../../../core/services/feriado.service';

@Component({
  selector: 'app-feriados-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageDynamicTableModule, PoButtonModule, PoFieldModule, PoModalModule],
  template: `
    <div style="display: flex; justify-content: flex-end; padding: 8px 16px 0;">
      <po-button p-label="Gerar Nacionais" p-icon="an an-calendar-plus" p-kind="tertiary" (p-click)="openGerarNacionais()"></po-button>
    </div>
    <po-page-dynamic-table
      p-title="Feriados"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>

    <po-modal p-title="Gerar Feriados Nacionais" #gerarNacionaisModal>
      <p>Isso criará automaticamente os feriados fixos e as datas móveis (Carnaval, Páscoa, Sexta-Feira Santa, Corpus Christi) do ano informado.</p>
      <div class="po-row">
        <po-number class="po-md-6" p-label="Ano *" [(ngModel)]="ano" name="ano"></po-number>
      </div>
      <po-modal-footer>
        <po-button p-label="Gerar" p-kind="primary" [p-loading]="gerando" (p-click)="gerarNacionais()"></po-button>
      </po-modal-footer>
    </po-modal>
  `,
})
export class FeriadosPage {
  @ViewChild('gerarNacionaisModal', { static: true }) gerarNacionaisModal!: PoModalComponent;
  private feriadoService = inject(FeriadoService);
  private poNotification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/feriados/search`;

  ano = new Date().getFullYear();
  gerando = false;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', key: true, width: '10%', filter: true },
    { property: 'data', label: 'Data', type: 'date', width: '15%' },
    { property: 'descricao', label: 'Descrição', filter: true },
    { property: 'tipo', label: 'Tipo', type: 'label', filter: true, labels: [
      { value: 'N', label: 'Nacional', color: 'color-10' },
      { value: 'E', label: 'Estadual', color: 'color-08' },
      { value: 'M', label: 'Municipal', color: 'color-07' }
    ]},
    { property: 'fixo', label: 'Fixo', type: 'boolean', filter: true },
    { property: 'ano', label: 'Ano', type: 'number', visible: false, filter: true, allowColumnsManager: false },
    { property: 'dataDe', label: 'Data de', type: 'date', visible: false, filter: true, allowColumnsManager: false },
    { property: 'dataAte', label: 'Data até', type: 'date', visible: false, filter: true, allowColumnsManager: false },
  ];

  readonly actions = {
    new: '/feriados/novo',
    edit: '/feriados/:id/editar',
    remove: true,
  };

  openGerarNacionais() {
    this.gerarNacionaisModal.open();
  }

  gerarNacionais() {
    if (!this.ano) {
      this.poNotification.warning('Informe o ano.');
      return;
    }
    this.gerando = true;
    this.feriadoService.gerarNacionais(Number(this.ano)).subscribe({
      next: () => {
        this.poNotification.success('Feriados nacionais gerados com sucesso.');
        this.gerando = false;
        this.gerarNacionaisModal.close();
        window.location.reload();
      },
      error: () => {
        this.poNotification.error('Erro ao gerar feriados nacionais.');
        this.gerando = false;
      },
    });
  }
}
