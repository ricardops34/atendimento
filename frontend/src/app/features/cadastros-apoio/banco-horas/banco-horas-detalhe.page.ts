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
import { BancoHorasExtrato, BancoHorasService } from '../../../core/services/banco-horas.service';

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
        <div class="po-row">
          <po-datepicker
            class="po-md-2"
            p-label="Data Inicial"
            [ngModel]="periodo.dataInicial"
            (ngModelChange)="periodo.dataInicial = $event"
            name="extratoDataInicial">
          </po-datepicker>
          <po-datepicker
            class="po-md-2"
            p-label="Data Final"
            [ngModel]="periodo.dataFinal"
            (ngModelChange)="periodo.dataFinal = $event"
            name="extratoDataFinal">
          </po-datepicker>
          <po-checkbox
            class="po-md-3"
            name="extratoOcultarValor"
            p-label="Ocultar valores financeiros"
            [ngModel]="ocultarValor"
            (ngModelChange)="ocultarValor = $event">
          </po-checkbox>
          <div class="po-md-5" style="display: flex; gap: 8px; align-items: flex-end; padding-bottom: 4px;">
            <po-button p-label="Atualizar" p-icon="an an-arrows-clockwise" (p-click)="carregarExtrato()"></po-button>
            <po-button p-label="PDF" p-icon="an an-file-pdf" [p-loading]="exportando === 'pdf'" (p-click)="exportar('pdf')"></po-button>
            <po-button p-label="Excel" p-icon="an an-file-xls" [p-loading]="exportando === 'xls'" (p-click)="exportar('xls')"></po-button>
          </div>
        </div>

        <div class="po-row" *ngIf="extrato">
          <po-info class="po-md-3" p-label="Saldo Anterior" [p-value]="resumo('saldoAnterior', 'valorSaldoAnterior')"></po-info>
          <po-info class="po-md-3" p-label="(+) Créditos" [p-value]="resumo('totalCreditos', 'valorTotalCreditos')"></po-info>
          <po-info class="po-md-3" p-label="(-) Débitos" [p-value]="resumo('totalDebitos', 'valorTotalDebitos')"></po-info>
          <po-info class="po-md-3" p-label="(=) Saldo Final" [p-value]="resumo('saldoFinal', 'valorSaldoFinal')"></po-info>
        </div>

        <po-table
          [p-columns]="ocultarValor ? colunasExtratoHoras : colunasExtratoCompleto"
          [p-items]="linhasExtrato">
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
  extrato: BancoHorasExtrato | null = null;
  linhasExtrato: any[] = [];
  lancando = false;
  exportando: 'pdf' | 'xls' | null = null;
  ocultarValor = false;
  periodo: { dataInicial: string | null; dataFinal: string | null } = this.periodoMesAtual();

  novoDebito: any = {
    data: null,
    horas: null,
    descricao: '',
  };

  readonly colunasExtratoHoras: Array<any> = [
    { property: 'dataFmt', label: 'Data' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'creditoFmt', label: 'Crédito (h)' },
    { property: 'debitoFmt', label: 'Débito (h)' },
    { property: 'saldoFmt', label: 'Saldo (h)' },
  ];

  readonly colunasExtratoCompleto: Array<any> = [
    ...this.colunasExtratoHoras,
    { property: 'valorCreditoFmt', label: 'Crédito (R$)' },
    { property: 'valorDebitoFmt', label: 'Débito (R$)' },
    { property: 'valorSaldoFmt', label: 'Saldo (R$)' },
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
    this.carregarExtrato();
  }

  carregarExtrato() {
    this.bancoHorasService.extrato(this.id, this.periodo).subscribe({
      next: (data) => {
        this.extrato = data;
        this.linhasExtrato = this.montarLinhas(data);
      },
      error: () => {
        this.poNotification.error('Erro ao carregar o extrato.');
      },
    });
  }

  exportar(format: 'pdf' | 'xls') {
    this.exportando = format;
    this.bancoHorasService.exportarExtrato(this.id, format, this.periodo, this.ocultarValor).subscribe({
      next: (blob) => {
        this.exportando = null;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extrato_banco_horas.${format === 'xls' ? 'xlsx' : 'pdf'}`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: async (err) => {
        this.exportando = null;
        let message = 'Erro ao exportar o extrato.';
        if (err?.error instanceof Blob) {
          try {
            message = JSON.parse(await err.error.text()).message || message;
          } catch { }
        }
        this.poNotification.error(message);
      },
    });
  }

  resumo(horasKey: keyof BancoHorasExtrato, valorKey: keyof BancoHorasExtrato): string {
    if (!this.extrato) return '';
    const horas = `${this.formatHoras(Number(this.extrato[horasKey]))} h`;
    return this.ocultarValor ? horas : `${horas}  |  R$ ${this.formatValor(Number(this.extrato[valorKey]))}`;
  }

  private montarLinhas(ext: BancoHorasExtrato): any[] {
    const linhas: any[] = [
      {
        dataFmt: '',
        descricao: 'Saldo anterior',
        creditoFmt: '',
        debitoFmt: '',
        saldoFmt: this.formatHoras(ext.saldoAnterior),
        valorCreditoFmt: '',
        valorDebitoFmt: '',
        valorSaldoFmt: this.formatValor(ext.valorSaldoAnterior),
      },
    ];
    for (const m of ext.movimentos) {
      linhas.push({
        dataFmt: this.formatData(m.data),
        descricao: m.descricao || (m.tipo === 'CREDITO' ? 'Crédito de horas' : 'Débito de horas'),
        creditoFmt: m.credito ? this.formatHoras(m.credito) : '',
        debitoFmt: m.debito ? this.formatHoras(m.debito) : '',
        saldoFmt: this.formatHoras(m.saldo),
        valorCreditoFmt: m.credito ? this.formatValor(m.valorCredito) : '',
        valorDebitoFmt: m.debito ? this.formatValor(m.valorDebito) : '',
        valorSaldoFmt: this.formatValor(m.valorSaldo),
      });
    }
    linhas.push({
      dataFmt: '',
      descricao: 'Totais do período',
      creditoFmt: this.formatHoras(ext.totalCreditos),
      debitoFmt: this.formatHoras(ext.totalDebitos),
      saldoFmt: this.formatHoras(ext.saldoFinal),
      valorCreditoFmt: this.formatValor(ext.valorTotalCreditos),
      valorDebitoFmt: this.formatValor(ext.valorTotalDebitos),
      valorSaldoFmt: this.formatValor(ext.valorSaldoFinal),
    });
    return linhas;
  }

  private periodoMesAtual() {
    const hoje = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    const ym = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}`;
    return { dataInicial: `${ym}-01`, dataFinal: `${ym}-${pad(ultimoDia)}` };
  }

  private formatHoras(v: number): string {
    const neg = v < 0;
    const abs = Math.abs(v || 0);
    let h = Math.floor(abs);
    let m = Math.round((abs - h) * 60);
    if (m === 60) {
      h += 1;
      m = 0;
    }
    return `${neg ? '-' : ''}${h}:${String(m).padStart(2, '0')}`;
  }

  private formatValor(v: number): string {
    return (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  private formatData(d: string): string {
    if (!d) return '';
    const date = new Date(d.length === 10 ? `${d}T00:00:00.000Z` : d);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
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
