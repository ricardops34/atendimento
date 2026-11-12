import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoFieldModule,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
  PoTableModule,
} from '@po-ui/ng-components';
import { BancoHorasService } from '../../../core/services/banco-horas.service';

const MODO_EXCEDENTE_LABEL: Record<string, string> = {
  BANCO: 'Banco de Horas',
  BLOQUEIO: 'Bloquear lançamento',
};

@Component({
  selector: 'app-banco-horas-detalhe-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule, PoInfoModule, PoTableModule],
  template: `
    <po-page-default p-title="Banco de Horas" (p-back)="voltar()">
      <div class="po-row" *ngIf="registro">
        <po-info class="po-md-3" p-label="Contrato" [p-value]="registro.contrato?.descricao"></po-info>
        <po-info class="po-md-3" p-label="Profissional" [p-value]="registro.profissional?.nome"></po-info>
        <po-info class="po-md-3" p-label="Máx. Horas/Mês" [p-value]="registro.maxHorasMes ?? 'Sem limite'"></po-info>
        <po-info class="po-md-3" p-label="Modo Excedente" [p-value]="getModoExcedenteLabel(registro.modoExcedente)"></po-info>
      </div>
      <div class="po-row" *ngIf="registro">
        <po-info class="po-md-3" p-label="Saldo Atual (h)" [p-value]="registro.saldoBancoHoras"></po-info>
      </div>

      <div style="margin-top: 16px; border-top: 1px solid #ddd; padding-top: 12px;">
        <p style="font-weight: 600; margin-bottom: 8px;">Lançar Baixa (Compensação)</p>
        <div class="po-row">
          <po-datepicker
            class="po-md-3"
            p-label="Data *"
            [ngModel]="novoDebito.data"
            (ngModelChange)="novoDebito.data = $event"
            name="debitoData">
          </po-datepicker>
          <po-decimal
            class="po-md-2"
            p-label="Horas *"
            [ngModel]="novoDebito.horas"
            (ngModelChange)="novoDebito.horas = $event"
            name="debitoHoras"
            [p-decimals-length]="2">
          </po-decimal>
          <po-input
            class="po-md-5"
            p-label="Descrição / Motivo"
            [ngModel]="novoDebito.descricao"
            (ngModelChange)="novoDebito.descricao = $event"
            name="debitoDescricao"
            p-placeholder="Ex: folga compensada em 10/11">
          </po-input>
          <div class="po-md-2" style="display: flex; align-items: flex-end; padding-bottom: 4px;">
            <po-button p-label="Lançar Baixa" p-icon="an an-minus-circle" [p-loading]="lancando" (p-click)="lancarDebito()"></po-button>
          </div>
        </div>
      </div>

      <div style="margin-top: 16px; border-top: 1px solid #ddd; padding-top: 12px;">
        <p style="font-weight: 600; margin-bottom: 8px;">Extrato</p>
        <po-table
          [p-columns]="colunasExtrato"
          [p-items]="extrato"
          p-sort="true">
        </po-table>
      </div>
    </po-page-default>
  `,
})
export class BancoHorasDetalhePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bancoHorasService = inject(BancoHorasService);
  private poNotification = inject(PoNotificationService);

  id!: number;
  registro: any = null;
  extrato: any[] = [];
  lancando = false;

  novoDebito: any = {
    data: null,
    horas: null,
    descricao: '',
  };

  readonly colunasExtrato: Array<any> = [
    { property: 'data', label: 'Data', type: 'date' },
    { property: 'tipo', label: 'Tipo', type: 'label', labels: [
      { value: 'CREDITO', label: 'Crédito (excedente)', color: 'color-08' },
      { value: 'DEBITO', label: 'Débito (compensação)', color: 'color-07' },
    ]},
    { property: 'horas', label: 'Horas', type: 'number' },
    { property: 'descricao', label: 'Descrição' },
  ];

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.carregar();
  }

  carregar() {
    this.bancoHorasService.findOne(this.id).subscribe({
      next: (data) => {
        this.registro = data;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar registro de banco de horas.');
        this.router.navigate(['/banco-horas']);
      },
    });
    this.bancoHorasService.extrato(this.id).subscribe({
      next: (data) => {
        this.extrato = data || [];
      },
      error: () => {
        this.poNotification.error('Erro ao carregar o extrato.');
      },
    });
  }

  getModoExcedenteLabel(value: string | null | undefined): string {
    if (!value) return 'Não configurado';
    return MODO_EXCEDENTE_LABEL[value] || value;
  }

  lancarDebito() {
    const horas = Number(this.novoDebito.horas);
    if (!this.novoDebito.data || !horas || horas <= 0) {
      this.poNotification.warning('Preencha a data e uma quantidade de horas maior que zero.');
      return;
    }

    this.lancando = true;
    this.bancoHorasService
      .lancarDebito(this.id, {
        data: this.novoDebito.data,
        horas,
        descricao: this.novoDebito.descricao?.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.poNotification.success('Baixa lançada com sucesso.');
          this.lancando = false;
          this.novoDebito = { data: null, horas: null, descricao: '' };
          this.carregar();
        },
        error: (err) => {
          this.lancando = false;
          const message = err?.error?.message || 'Erro ao lançar a baixa.';
          this.poNotification.error(Array.isArray(message) ? message.join(' ') : message);
        },
      });
  }

  voltar() {
    this.router.navigate(['/banco-horas']);
  }
}
